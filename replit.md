# Market Research Dashboard

## Overview

This is a full-stack web application designed to display market research reports and analytics. The system receives market research data through webhook integrations with n8n automation and presents it in a comprehensive dashboard interface. The application specializes in visualizing market dynamics, competitor analysis, strategic insights, and industry trends through interactive charts and detailed analytics sections.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with a comprehensive design system using CSS variables
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **State Management**: TanStack Query (React Query) for server state management with optimistic updates
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Component Structure**: Modular dashboard components for different report sections (executive summary, market dynamics, competitor analysis, etc.)

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript for full-stack type safety
- **Data Storage**: In-memory storage with interface abstraction for future database integration
- **API Design**: RESTful endpoints with webhook support for external integrations
- **Schema Validation**: Zod for runtime type checking and data validation
- **Development**: Hot module replacement and runtime error overlay for development experience

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe queries
- **Schema**: Structured market reports table with JSONB fields for flexible data storage
- **Migration System**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL integration

### Data Flow
- **Webhook Integration**: n8n automation platform sends market research data via POST endpoints
- **Data Transformation**: Incoming webhook data is validated and transformed to internal schema format
- **Storage**: Market reports stored with structured metadata and flexible JSONB content fields
- **API Layer**: Express routes serve data to React frontend with proper error handling

### Chart and Visualization
- **Library**: Recharts for responsive, interactive data visualizations
- **Chart Types**: Area charts for market trends, pie charts for segmentation, bar charts for comparisons
- **Data Processing**: Client-side data transformation for chart-ready formats
- **Responsive Design**: Charts adapt to different screen sizes and orientations

## External Dependencies

- **Database**: Neon Database (serverless PostgreSQL) for production data storage
- **Automation**: n8n workflow automation platform for data ingestion
- **UI Components**: Radix UI headless components for accessibility and interaction patterns
- **Fonts**: Google Fonts (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono) for typography
- **Development Tools**: Replit integration for development environment and deployment
- **Chart Library**: Recharts for data visualization components
- **Form Handling**: React Hook Form with Hookform Resolvers for form validation
- **Date Utilities**: date-fns for date manipulation and formatting
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **CSS Processing**: PostCSS with Autoprefixer for cross-browser compatibility