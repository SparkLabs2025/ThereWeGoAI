import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- Itinerary Generator ---

export const TRAVEL_STYLES = ["adventure", "cultural", "beach", "food_wine", "nature", "mixed"] as const;
export const GROUP_TYPES = ["solo", "couple", "family", "friends"] as const;
export const BUDGET_LEVELS = ["budget", "moderate", "luxury"] as const;

export const URUGUAY_INTERESTS = [
  "Beaches",
  "Tango & Dance",
  "Wine Tasting",
  "Colonial Architecture",
  "Wildlife & Birding",
  "Carnival",
  "Mate Culture",
  "Gaucho Experiences",
  "Thermal Baths",
  "Football",
  "Fishing",
  "Art & Museums",
] as const;

export const itineraryRequestSchema = z.object({
  duration: z.number().int().min(2).max(21),
  travelStyle: z.enum(TRAVEL_STYLES),
  groupType: z.enum(GROUP_TYPES),
  budget: z.enum(BUDGET_LEVELS),
  interests: z.array(z.string()).min(1).max(8),
});

export type ItineraryRequest = z.infer<typeof itineraryRequestSchema>;

export interface ItineraryActivity {
  name: string;
  description: string;
  duration: string;
  type: string;
}

export interface ItineraryMeal {
  type: "breakfast" | "lunch" | "dinner";
  suggestion: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  location: string;
  title: string;
  description: string;
  activities: ItineraryActivity[];
  meals: ItineraryMeal[];
  accommodation: string;
  tips: string[];
}

export interface GeneratedItinerary {
  title: string;
  summary: string;
  totalDays: number;
  travelStyle: string;
  highlights: string[];
  days: ItineraryDay[];
  packingTips: string[];
  bestTimeToVisit: string;
  estimatedBudget: string;
}

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries).pick({
  name: true,
  email: true,
  company: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
