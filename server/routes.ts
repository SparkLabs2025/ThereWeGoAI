import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema, itineraryRequestSchema } from "@shared/schema";
import type { GeneratedItinerary } from "@shared/schema";
import { ZodError } from "zod";
import nodemailer from "nodemailer";
import Anthropic from "@anthropic-ai/sdk";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist subscription endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      // Validate request body
      const waitlistEntry = insertWaitlistEntrySchema.parse(req.body);
      
      // Store the entry
      const savedEntry = await storage.createWaitlistEntry(waitlistEntry);
      
      // Send notification email
      try {
        await sendNotificationEmail(waitlistEntry);
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        // Continue with the response even if email fails
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully added to waitlist", 
        id: savedEntry.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Error adding to waitlist:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to add to waitlist" 
        });
      }
    }
  });

  // Uruguay itinerary generation endpoint
  app.post("/api/itinerary/generate", async (req, res) => {
    try {
      const request = itineraryRequestSchema.parse(req.body);

      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

      const systemPrompt = `You are an expert Uruguay travel guide with deep knowledge of every region, attraction, restaurant, and hidden gem in the country. You create detailed, practical, and inspiring travel itineraries tailored to the traveler's specific preferences.

Always respond with a single valid JSON object matching exactly this TypeScript interface (no markdown, no code fences, just raw JSON):

{
  "title": string,
  "summary": string,
  "totalDays": number,
  "travelStyle": string,
  "highlights": string[],           // 4-6 trip highlights
  "days": Array<{
    "day": number,
    "location": string,
    "title": string,
    "description": string,
    "activities": Array<{
      "name": string,
      "description": string,
      "duration": string,
      "type": string
    }>,
    "meals": Array<{
      "type": "breakfast" | "lunch" | "dinner",
      "suggestion": string,
      "description": string
    }>,
    "accommodation": string,
    "tips": string[]
  }>,
  "packingTips": string[],          // 5-7 packing tips for Uruguay
  "bestTimeToVisit": string,
  "estimatedBudget": string
}

Include real Uruguayan locations, restaurants, and attractions. Be specific and practical.`;

      const budgetLabels: Record<string, string> = {
        budget: "budget-conscious (hostels, street food, free activities)",
        moderate: "mid-range (3-star hotels, local restaurants, some paid attractions)",
        luxury: "luxury (boutique hotels, fine dining, premium experiences)",
      };

      const userPrompt = `Generate a ${request.duration}-day Uruguay travel itinerary with these preferences:
- Travel style: ${request.travelStyle.replace("_", " & ")}
- Group type: ${request.groupType}
- Budget level: ${budgetLabels[request.budget]}
- Interests: ${request.interests.join(", ")}

Make the itinerary flow logically between locations to minimize backtracking. Include a mix of famous and off-the-beaten-path experiences. Each day should have 2-4 activities and 2-3 meal suggestions at real Uruguayan establishments.`;

      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 8192,
        system: [
          {
            type: "text",
            text: systemPrompt,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: [{ role: "user", content: userPrompt }],
      });

      const content = message.content[0];
      if (content.type !== "text") {
        throw new Error("Unexpected response type from Claude");
      }

      const itinerary: GeneratedItinerary = JSON.parse(content.text);
      res.json({ success: true, itinerary });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ success: false, message: "Invalid request", errors: error.errors });
      } else if (error instanceof SyntaxError) {
        console.error("Failed to parse itinerary JSON:", error);
        res.status(500).json({ success: false, message: "Failed to parse generated itinerary" });
      } else {
        console.error("Error generating itinerary:", error);
        res.status(500).json({ success: false, message: "Failed to generate itinerary" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendNotificationEmail(entry: { name: string, email: string, company: string }) {
  // Create a test (ethereal) account for development or use a real SMTP server in production
  const testAccount = await nodemailer.createTestAccount();
  
  // Configure transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || testAccount.user,
      pass: process.env.SMTP_PASS || testAccount.pass,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.FROM_EMAIL || '"ThereWeGo.AI Waitlist" <noreply@therewego.ai>',
    to: process.env.NOTIFICATION_EMAIL || "viktor@therewego.ai",
    subject: "New Waitlist Subscription",
    html: `
      <h1>New Waitlist Subscription</h1>
      <p>A new user has joined the waitlist:</p>
      <ul>
        <li><strong>Name:</strong> ${entry.name}</li>
        <li><strong>Email:</strong> ${entry.email}</li>
        <li><strong>Company:</strong> ${entry.company}</li>
      </ul>
    `,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  
  // Log email details in development
  if (process.env.NODE_ENV === "development") {
    console.log("Email sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  
  return info;
}
