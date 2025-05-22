import { waitlistEntries, users, type WaitlistEntry, type InsertWaitlistEntry, type User, type InsertUser } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getWaitlistEntries(): Promise<WaitlistEntry[]>;
  getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined>;
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
}

// Memory storage implementation (fallback)
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlistEntries: Map<number, WaitlistEntry>;
  private userCurrentId: number;
  private waitlistCurrentId: number;

  constructor() {
    this.users = new Map();
    this.waitlistEntries = new Map();
    this.userCurrentId = 1;
    this.waitlistCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlistEntries.values());
  }

  async getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined> {
    return this.waitlistEntries.get(id);
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const id = this.waitlistCurrentId++;
    const createdAt = new Date();
    const entry: WaitlistEntry = { ...insertEntry, id, createdAt };
    this.waitlistEntries.set(id, entry);
    return entry;
  }
}

// PostgreSQL database storage implementation
export class PostgresStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return await this.db.select().from(waitlistEntries);
  }

  async getWaitlistEntry(id: number): Promise<WaitlistEntry | undefined> {
    const result = await this.db.select().from(waitlistEntries).where(eq(waitlistEntries.id, id));
    return result[0];
  }

  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const result = await this.db.insert(waitlistEntries).values(entry).returning();
    return result[0];
  }
}

// Use PostgreSQL storage if DATABASE_URL is available, otherwise fallback to memory storage
export const storage = process.env.DATABASE_URL 
  ? new PostgresStorage() 
  : new MemStorage();
