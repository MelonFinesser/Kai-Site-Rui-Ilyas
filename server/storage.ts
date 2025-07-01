import { users, quoteSubmissions, type User, type InsertUser, type QuoteSubmission, type InsertQuoteSubmission } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuoteSubmission(submission: InsertQuoteSubmission): Promise<QuoteSubmission>;
  getQuoteSubmissions(): Promise<QuoteSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quoteSubmissions: Map<number, QuoteSubmission>;
  private currentUserId: number;
  private currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.quoteSubmissions = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;
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
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuoteSubmission(insertSubmission: InsertQuoteSubmission): Promise<QuoteSubmission> {
    const id = this.currentQuoteId++;
    const submission: QuoteSubmission = { 
      ...insertSubmission, 
      id,
      submittedAt: new Date().toISOString()
    };
    this.quoteSubmissions.set(id, submission);
    return submission;
  }

  async getQuoteSubmissions(): Promise<QuoteSubmission[]> {
    return Array.from(this.quoteSubmissions.values());
  }
}

export const storage = new MemStorage();
