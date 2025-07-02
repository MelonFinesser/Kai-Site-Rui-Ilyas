import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seoQuoteSchema, customQuoteSchema, businessQuoteSchema } from "@shared/schema";
import nodemailer from "nodemailer";

// Configure nodemailer (you would use environment variables in production)
const transporter = nodemailer.createTransport({
  // Configure with your email service
  service: 'gmail', // or your preferred service
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

async function sendQuoteEmail(submission: any) {
  const { serviceType, name, email, phone, businessLocation } = submission;
  
  let subject = '';
  let htmlContent = '';
  
  switch (serviceType) {
    case 'seo':
      subject = `New SEO Quote Request from ${name}`;
      htmlContent = `
        <h2>New SEO Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Location:</strong> ${businessLocation}</p>
        <p><strong>Website URL:</strong> ${submission.websiteUrl}</p>
        <p><strong>SEO Needs:</strong> ${submission.seoNeeds}</p>
      `;
      break;
    case 'custom':
      subject = `New Custom Design Quote Request from ${name}`;
      htmlContent = `
        <h2>New Custom Design Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Location:</strong> ${businessLocation}</p>
        <p><strong>Business Info:</strong> ${submission.businessInfo}</p>
        <p><strong>Business Schedule:</strong> ${submission.businessSchedule || 'Not provided'}</p>
        <p><strong>Services/Products:</strong> ${submission.servicesProducts}</p>
        <p><strong>Desired Features:</strong> ${submission.desiredFeatures?.join(', ') || 'None specified'}</p>
        ${submission.otherFeatures ? `<p><strong>Other Features:</strong> ${submission.otherFeatures}</p>` : ''}
        <p><strong>Special Requirements:</strong> ${submission.specialRequirements || 'None'}</p>
      `;
      break;
    case 'business':
      subject = `New Business Website Quote Request from ${name}`;
      const paymentMethodsText = submission.paymentMethods?.join(', ') || 'None selected';
      let paymentCredentials = '';
      
      if (submission.paymentMethods?.includes('paypal')) {
        paymentCredentials += `<p><strong>PayPal Business Email:</strong> ${submission.paypalBusinessEmail}</p>`;
      }
      if (submission.paymentMethods?.includes('stripe')) {
        paymentCredentials += `<p><strong>Stripe Publishable Key:</strong> ${submission.stripePublishableKey}</p>`;
        paymentCredentials += `<p><strong>Stripe Secret Key:</strong> ${submission.stripeSecretKey ? '[PROVIDED]' : '[NOT PROVIDED]'}</p>`;
      }
      
      htmlContent = `
        <h2>New Business Website Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Location:</strong> ${businessLocation}</p>
        <p><strong>Business Info:</strong> ${submission.businessInfo}</p>
        <p><strong>Business Schedule:</strong> ${submission.businessSchedule || 'Not provided'}</p>
        <p><strong>Services/Products:</strong> ${submission.servicesProducts}</p>
        <p><strong>Desired Features:</strong> ${submission.desiredFeatures?.join(', ') || 'None specified'}</p>
        ${submission.otherFeatures ? `<p><strong>Other Features:</strong> ${submission.otherFeatures}</p>` : ''}
        <p><strong>Payment Methods:</strong> ${paymentMethodsText}</p>
        ${paymentCredentials}
        <p><strong>Special Requirements:</strong> ${submission.specialRequirements || 'None'}</p>
      `;
      break;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'info@kaiwebdesign.com',
      subject,
      html: htmlContent
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    // Don't throw error to avoid breaking the submission process
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post('/api/quotes/seo', async (req, res) => {
    try {
      const validatedData = seoQuoteSchema.parse(req.body);
      const submission = await storage.createQuoteSubmission(validatedData);
      
      // Send email notification
      await sendQuoteEmail(submission);
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      res.status(400).json({ error: 'Invalid submission data' });
    }
  });

  app.post('/api/quotes/custom', async (req, res) => {
    try {
      const validatedData = customQuoteSchema.parse(req.body);
      const submission = await storage.createQuoteSubmission(validatedData);
      
      // Send email notification
      await sendQuoteEmail(submission);
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      res.status(400).json({ error: 'Invalid submission data' });
    }
  });

  app.post('/api/quotes/business', async (req, res) => {
    try {
      const validatedData = businessQuoteSchema.parse(req.body);
      const submission = await storage.createQuoteSubmission(validatedData);
      
      // Send email notification
      await sendQuoteEmail(submission);
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      res.status(400).json({ error: 'Invalid submission data' });
    }
  });

  app.get('/api/quotes', async (req, res) => {
    try {
      const submissions = await storage.getQuoteSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
