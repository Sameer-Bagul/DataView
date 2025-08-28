import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { storage } from '../storage';
import { generateToken } from '../auth/jwt';
import { loginSchema, type LoginData } from '@shared/schema';

export class AuthController {
  // OAuth login (handled by passport)
  async oauthLogin(req: Request, res: Response) {
    // This will be handled by passport middleware
    res.redirect('/api/auth/oauth/google');
  }

  // OAuth callback
  async oauthCallback(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (!user) {
        return res.redirect('/login?error=oauth_failed');
      }

      const token = generateToken(user.id, user.email);
      
      // Set cookie and redirect to frontend
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      res.redirect('/');
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect('/login?error=oauth_failed');
    }
  }

  // Regular email/password login
  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = generateToken(user.id, user.email);

      // Set cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Register new user
  async register(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await storage.createUser({
        id: randomUUID(),
        email,
        password: hashedPassword,
        oauthProvider: 'local',
      });

      // Generate JWT token
      const token = generateToken(user.id, user.email);

      // Set cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({
        message: 'Registration successful',
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get current user
  async getCurrentUser(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Logout
  async logout(req: Request, res: Response) {
    try {
      // Clear cookie
      res.clearCookie('auth_token');
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}