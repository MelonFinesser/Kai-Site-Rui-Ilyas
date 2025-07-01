# Kai Web Design Agency

## Overview

This is a full-stack web application for Kai Web Design Agency, built with React, Express, and TypeScript. The application features a marketing website with quote request forms for different web design services, using a modern tech stack with shadcn/ui components and Drizzle ORM for database management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components based on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Email Service**: Nodemailer for quote submission notifications
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions

### Database Design
- **Users Table**: Basic user authentication (id, username, password)
- **Quote Submissions Table**: Stores all quote requests with polymorphic design supporting multiple service types (SEO, custom design, business websites)

## Key Components

### Quote Management System
The application centers around three types of quote requests:
1. **SEO Services**: Website optimization quotes requiring existing website URLs
2. **Custom Design**: Fully custom website design with detailed requirements
3. **Business Websites**: E-commerce ready business websites with payment integration

### Form Validation
- Uses Zod schemas for runtime type safety and validation
- Shared schema definitions between client and server
- Type-safe form handling with React Hook Form

### Email Integration
- Automated email notifications for new quote submissions
- Customized email templates for different service types
- Environment-based email configuration for development/production

### UI/UX Features
- Responsive design optimized for all device sizes
- Smooth scrolling navigation between sections
- Tab-based quote forms with service-specific fields
- Toast notifications for user feedback
- Loading states and error handling

## Data Flow

1. **User Interaction**: Users navigate the marketing site and select a service type
2. **Form Submission**: Quote forms capture service-specific requirements
3. **Validation**: Client-side validation with Zod schemas before submission
4. **API Processing**: Express server validates and stores submissions in PostgreSQL
5. **Email Notification**: Automated emails sent to business for follow-up
6. **Storage**: All submissions stored with timestamps for tracking and analysis

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection pooling
- **@tanstack/react-query**: Powerful data synchronization for React
- **@radix-ui/***: Accessible, unstyled UI primitives
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **nodemailer**: Email sending capabilities
- **react-hook-form**: Performant forms with easy validation

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking across the entire stack
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

### Build Process
- Frontend builds to `dist/public` directory
- Backend builds with esbuild to `dist/index.js`
- Single deployment artifact containing both client and server

### Environment Configuration
- Database URL configuration through environment variables
- Email service credentials managed via environment variables
- Development/production mode detection for different behaviors

### Development Workflow
- Hot module replacement for rapid frontend development
- TypeScript compilation checking for type safety
- Database schema changes managed through Drizzle migrations

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.