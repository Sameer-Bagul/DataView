import type { Express } from "express";
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from './auth/oauth';
import { AuthController } from './controllers/authController';
import { ReportController } from './controllers/reportController';
import { authenticateToken, optionalAuth } from './auth/jwt';
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  
  // Session configuration for OAuth
  app.use(session({
    secret: process.env.JWT_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Auth controller instance
  const authController = new AuthController();

  // Auth routes
  app.post('/api/auth/login', authController.login);
  app.post('/api/auth/register', authController.register);
  app.post('/api/auth/logout', authController.logout);
  app.get('/api/auth/user', authenticateToken, authController.getCurrentUser);

  // OAuth routes
  app.get('/api/auth/oauth/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/api/auth/oauth/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    authController.oauthCallback
  );

  // Report routes (protected)
  app.post('/api/reports/generate', authenticateToken, ReportController.generateReport);
  app.get('/api/reports', authenticateToken, ReportController.getReports);
  app.get('/api/reports/:id', authenticateToken, ReportController.getReport);

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}