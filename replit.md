# replit.md

## Overview

This is a modern full-stack event management application built for a company called "Elevate Events" (though appears to be branded as "Futura Infotech" in the header). The application showcases event planning services through a professional landing page with sections for services, projects, gallery, testimonials, and contact functionality. The system includes a contact form submission feature with email notifications and database storage capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with a professional theme configuration (blue primary, light appearance)
- **UI Components**: Extensive use of Radix UI primitives with custom shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and scroll-based animations
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Email Service**: SendGrid for contact form notifications
- **Storage**: Dual storage implementation - memory storage for development/testing and database storage for production
- **API Design**: RESTful API with structured error handling and request logging

### Content Management
- **CMS**: Stackbit integration for visual editing capabilities
- **Content Storage**: Git-based content management with JSON files
- **Content Structure**: Modular sections (Hero, About, Services, Projects, Gallery, Testimonials, Contact)
- **Media Management**: External image hosting via Unsplash and YouTube for video content

### Database Schema
- **Users Table**: Basic user management (id, username, password)
- **Contact Submissions Table**: Stores contact form data (id, name, email, phone, event_type, message, submitted_at)
- **Migration Strategy**: Drizzle migrations with PostgreSQL dialect

### Authentication & Security
- **Form Validation**: Zod schemas for runtime type checking and validation
- **Error Handling**: Comprehensive error boundaries and validation error formatting
- **CORS**: Configured for cross-origin requests

## External Dependencies

### Core Infrastructure
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **Email Service**: SendGrid API for transactional emails
- **Media Hosting**: 
  - Unsplash for stock photography
  - YouTube for video content embedding

### Development Tools
- **CMS Platform**: Stackbit for visual content editing
- **Build Tools**: Vite for frontend bundling, esbuild for server compilation
- **Deployment**: Designed for production deployment with NODE_ENV configurations

### UI/UX Dependencies
- **Component Library**: Radix UI for accessible, unstyled components
- **Animation Library**: Framer Motion for interactive animations
- **Icon Library**: Lucide React for consistent iconography
- **Typography**: Google Fonts integration through CSS imports

### Third-party Integrations
- **Analytics**: Ready for analytics integration (structure supports it)
- **Social Media**: Prepared for social media link integration
- **SEO**: Meta tag management and semantic HTML structure