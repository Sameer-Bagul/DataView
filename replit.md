# Market Insights Platform

## Project Overview
A comprehensive market research platform that generates detailed market reports, analyzes industry trends, and provides data-driven business insights. The platform uses AI-powered market research tools to create professional-grade reports with SWOT, PESTEL, and Porter's Five Forces analysis.

## Architecture
- **Frontend**: React with TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript in MVC architecture
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Google OAuth + JWT with session management
- **Deployment**: Replit hosting

## Recent Changes (2025-01-28)
- ✅ Migrated from Replit Agent to standard Replit environment
- ✅ Converted entire application from PostgreSQL to MongoDB
- ✅ Implemented Google OAuth + JWT authentication system
- ✅ Converted server architecture from simple routes to MVC pattern
- ✅ Integrated MongoDB database with Mongoose ODM
- ✅ Updated frontend with proper login/register pages and OAuth integration
- ✅ Created comprehensive MongoDB schema with Users, ReportRequests, and MarketReports collections
- ✅ Added JWT-based authentication with cookie and header support

## User Preferences
- Prefer secure, production-ready authentication over demo credentials
- Use modern web application patterns with proper client/server separation
- Minimize number of files and components where possible
- Focus on functionality over excessive customization

## Key Features
1. **Google OAuth + JWT Authentication** - Secure authentication with OAuth and local account support
2. **Market Report Generation** - AI-powered comprehensive market research reports
3. **MongoDB Integration** - NoSQL database with Mongoose ODM and proper schema validation
4. **MVC Architecture** - Organized server structure with controllers, authentication middleware, and models
5. **Professional UI** - Clean, responsive interface with shadcn/ui components and modern auth flows

## Database Schema (MongoDB Collections)
- **users**: User profiles with OAuth and local auth support (id, email, firstName, lastName, profileImageUrl, password, oauthProvider, oauthId)
- **reportrequests**: User report generation requests with status tracking
- **marketreports**: Generated market research reports with comprehensive analysis data

## Security Features
- Google OAuth integration with Passport.js
- JWT-based authentication with httpOnly cookies
- Protected API routes with comprehensive authentication middleware
- Password hashing with bcrypt for local accounts
- Secure environment variable management

## Technical Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, wouter routing, TanStack Query
- **Backend**: Express.js, TypeScript, Passport.js, JWT, bcrypt
- **Database**: MongoDB, Mongoose ODM, connection pooling
- **Development**: ESBuild, Hot reload, TypeScript compilation