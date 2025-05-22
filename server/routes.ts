import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { ZodError } from "zod";
import nodemailer from "nodemailer";

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
