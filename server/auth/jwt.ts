import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required for authentication');
}

const JWT_SECRET = process.env.JWT_SECRET;

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export function generateToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  // Check for token in Authorization header or cookie
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  const cookieToken = req.cookies?.auth_token;
  
  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const decoded = verifyToken(token);
    const user = await storage.getUser(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token - user not found' });
    }

    // Add user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    const user = await storage.getUser(decoded.userId);
    
    if (user) {
      (req as any).user = user;
    }
  } catch (error) {
    // Ignore invalid tokens for optional auth
  }

  next();
}