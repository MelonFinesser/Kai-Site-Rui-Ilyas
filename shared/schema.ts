import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quoteSubmissions = pgTable("quote_submissions", {
  id: serial("id").primaryKey(),
  serviceType: text("service_type").notNull(), // 'seo', 'custom', 'business'
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  businessLocation: text("business_location").notNull(),
  businessInfo: text("business_info"),
  businessSchedule: text("business_schedule"),
  servicesProducts: text("services_products"),
  websiteUrl: text("website_url"),
  seoNeeds: text("seo_needs"),
  desiredFeatures: text("desired_features").array(),
  specialRequirements: text("special_requirements"),
  paymentMethods: text("payment_methods").array(),
  paypalBusinessEmail: text("paypal_business_email"),
  stripePublishableKey: text("stripe_publishable_key"),
  stripeSecretKey: text("stripe_secret_key"),
  submittedAt: text("submitted_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuoteSubmissionSchema = createInsertSchema(quoteSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const seoQuoteSchema = insertQuoteSubmissionSchema.pick({
  name: true,
  phone: true,
  businessLocation: true,
  websiteUrl: true,
  seoNeeds: true,
}).extend({
  serviceType: z.literal('seo'),
});

export const customQuoteSchema = insertQuoteSubmissionSchema.pick({
  name: true,
  email: true,
  phone: true,
  businessLocation: true,
  businessInfo: true,
  businessSchedule: true,
  servicesProducts: true,
  desiredFeatures: true,
  specialRequirements: true,
}).extend({
  serviceType: z.literal('custom'),
});

export const businessQuoteSchema = insertQuoteSubmissionSchema.pick({
  name: true,
  email: true,
  phone: true,
  businessLocation: true,
  businessInfo: true,
  businessSchedule: true,
  servicesProducts: true,
  desiredFeatures: true,
  specialRequirements: true,
  paymentMethods: true,
  paypalBusinessEmail: true,
  stripePublishableKey: true,
  stripeSecretKey: true,
}).extend({
  serviceType: z.literal('business'),
  paymentMethods: z.array(z.enum(['paypal', 'stripe'])).min(1, 'Please select at least one payment method'),
  paypalBusinessEmail: z.string().email('Please enter a valid PayPal business email').optional(),
  stripePublishableKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethods.includes('paypal') && !data.paypalBusinessEmail) {
    return false;
  }
  if (data.paymentMethods.includes('stripe') && (!data.stripePublishableKey || !data.stripeSecretKey)) {
    return false;
  }
  return true;
}, {
  message: 'Please provide required credentials for selected payment methods',
  path: ['paymentMethods'],
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuoteSubmission = z.infer<typeof insertQuoteSubmissionSchema>;
export type QuoteSubmission = typeof quoteSubmissions.$inferSelect;
export type SeoQuote = z.infer<typeof seoQuoteSchema>;
export type CustomQuote = z.infer<typeof customQuoteSchema>;
export type BusinessQuote = z.infer<typeof businessQuoteSchema>;
