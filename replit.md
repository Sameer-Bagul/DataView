# Market Insights Platform

## Project Overview
A comprehensive market research platform that generates detailed market reports, analyzes industry trends, and provides data-driven business insights. The platform uses AI-powered market research tools to create professional-grade reports with SWOT, PESTEL, and Porter's Five Forces analysis.

## Architecture
- **Frontend**: React with TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript in MVC architecture
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit OAuth with session management
- **Deployment**: Replit hosting

## Recent Changes (2025-01-28)
- ✅ Migrated from Replit Agent to standard Replit environment
- ✅ Implemented OAuth authentication using Replit Auth
- ✅ Converted server architecture from simple routes to MVC pattern
- ✅ Integrated PostgreSQL database replacing in-memory storage
- ✅ Updated frontend to use Replit Auth (removed custom login/signup)
- ✅ Created database schema with users, sessions, report_requests, and market_reports tables
- ✅ Added comprehensive authentication middleware and session management

## User Preferences
- Prefer secure, production-ready authentication over demo credentials
- Use modern web application patterns with proper client/server separation
- Minimize number of files and components where possible
- Focus on functionality over excessive customization

## Key Features
1. **Replit OAuth Authentication** - Secure authentication with automatic user management
2. **Market Report Generation** - AI-powered comprehensive market research reports
3. **Database Integration** - PostgreSQL with proper schema and relationships
4. **MVC Architecture** - Organized server structure with controllers and models
5. **Professional UI** - Clean, responsive interface with shadcn/ui components

## Database Schema
- **users**: Replit Auth user profiles (id, email, firstName, lastName, profileImageUrl)
- **sessions**: Session storage for authentication
- **report_requests**: User report generation requests
- **market_reports**: Generated market research reports with comprehensive data

## Security Features
- Replit OAuth integration with OpenID Connect
- Session-based authentication with PostgreSQL session store
- Protected API routes with authentication middleware
- Secure environment variable management

## Technical Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, wouter routing, TanStack Query
- **Backend**: Express.js, TypeScript, Passport.js, OpenID Client
- **Database**: PostgreSQL, Drizzle ORM, connection pooling
- **Development**: ESBuild, Hot reload, TypeScript compilation