# ThereWeGo.AI Project Guide

## Overview

This project is a modern web application for ThereWeGo.AI, a company focused on elevating the insurance space with AI-driven solutions. The application consists of a landing page with a waitlist subscription feature that allows potential customers to sign up for updates.

The project uses a full-stack architecture with:
- React frontend built with Vite
- Express.js backend
- Drizzle ORM for database management (PostgreSQL ready)
- TypeScript throughout the codebase
- Tailwind CSS for styling with the shadcn/ui component library

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React using the Vite build system. It follows a modern component-based architecture with:

1. **Component Structure**:
   - UI components are organized using a separation of concerns:
     - Page components (`pages/`)
     - Reusable UI components (`components/`)
     - UI primitives from shadcn/ui (`components/ui/`)

2. **State Management**:
   - React Query (TanStack Query) is used for data fetching and mutation
   - React Context is used for theme management
   - React Hook Form for form handling

3. **Routing**:
   - Wouter is used for client-side routing

4. **Styling**:
   - Tailwind CSS with a custom theme configuration
   - Class variance authority (CVA) for component variants
   - Custom CSS variables for theming (light/dark mode support)

### Backend Architecture

The backend is built with Express.js in TypeScript and follows a modular structure:

1. **Server Setup**:
   - Express application with JSON parsing middleware
   - Route registration pattern
   - Error handling middleware

2. **API Endpoints**:
   - RESTful API design with `/api` prefix
   - Validation using Zod schemas

3. **Database Access**:
   - Drizzle ORM for database operations
   - PostgreSQL compatible schema
   - Schema validation with Drizzle Zod integration

4. **Development Configuration**:
   - Vite development server integration for HMR
   - Express middleware routing

## Key Components

### Frontend Components

1. **Landing Page Sections**:
   - HeroSection: Main promotional area
   - MissionSection: Company mission information
   - ValuePropositionSection: Key value offerings
   - VisionSection: Future outlook
   - SubscriptionSection: Waitlist form

2. **UI Component Library**:
   - Full shadcn/ui component system including:
     - Form elements (inputs, buttons, etc.)
     - Layout components (cards, containers)
     - Feedback components (toast notifications)
     - Modal components (dialogs, popovers)

3. **Theme Provider**:
   - Light/dark mode support with theme persistence

### Backend Components

1. **API Routes**:
   - Waitlist subscription endpoint for capturing user interest

2. **Storage Layer**:
   - Database schema defined with Drizzle ORM
   - Waitlist entries table schema
   - Storage interface abstraction with in-memory implementation

3. **Validation**:
   - Input validation using Zod schemas
   - Error handling for validation failures

## Data Flow

1. **Waitlist Subscription Flow**:
   - User fills out the waitlist form on the frontend
   - Form is validated with client-side validation (Zod + React Hook Form)
   - On submission, data is sent to `/api/waitlist` endpoint
   - Server validates the request using the shared schema
   - Data is stored in the database using Drizzle ORM
   - Success/error response is returned to the client
   - Toast notification is shown to the user

2. **Theme Management Flow**:
   - User preference for theme is stored in localStorage
   - ThemeProvider reads from storage on initial load
   - Theme changes are persisted automatically

## External Dependencies

### Frontend Dependencies

1. **UI & Styling**:
   - tailwindcss: Utility-first CSS framework
   - shadcn/ui: Component library based on Radix UI
   - class-variance-authority: For component variants
   - clsx/tailwind-merge: For conditional class names

2. **State & Data Management**:
   - @tanstack/react-query: Data fetching and state management
   - react-hook-form: Form state management
   - zod: Schema validation

3. **UI Components**:
   - Various Radix UI primitives (@radix-ui/*)
   - framer-motion: Animation library
   - lucide-react: Icon library

### Backend Dependencies

1. **Server**:
   - express: Web server framework
   - nodemailer: Email sending functionality

2. **Database**:
   - drizzle-orm: ORM for database access
   - @neondatabase/serverless: Serverless SQL for Postgres

3. **Utilities**:
   - zod: Schema validation
   - drizzle-zod: Integration between Drizzle and Zod

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

1. **Build Process**:
   - `npm run build` command:
     - Builds the frontend with Vite
     - Bundles the server with esbuild
     - Outputs to the `dist` directory

2. **Run Configuration**:
   - Development: `npm run dev` using tsx for TypeScript execution
   - Production: `node dist/index.js` for the built app

3. **Database Strategy**:
   - PostgreSQL database is expected to be available with a connection string in `DATABASE_URL` environment variable
   - Database schema is managed with Drizzle ORM
   - Migration command available: `npm run db:push`

4. **Environment Configuration**:
   - Different behavior based on NODE_ENV (development/production)
   - Database connection string required via environment variable

## Getting Started

To add new features to this project:

1. **Understanding the codebase**:
   - The `client/src` directory contains all frontend code
   - The `server` directory contains backend code
   - Shared types and schemas are in the `shared` directory

2. **Adding a new page**:
   - Create a new file in `client/src/pages`
   - Add the route to the `Router` component in `App.tsx`

3. **Adding a new API endpoint**:
   - Add the route handler in `server/routes.ts`
   - Create any necessary schemas in `shared/schema.ts`

4. **Database changes**:
   - Modify the schema in `shared/schema.ts`
   - Run `npm run db:push` to apply changes to the database

5. **Running the project**:
   - Development: `npm run dev`
   - Production build: `npm run build`
   - Production run: `npm run start`