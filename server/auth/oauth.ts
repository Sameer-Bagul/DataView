import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { randomUUID } from 'crypto';
import { storage } from '../storage';

if (!process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET) {
  throw new Error('OAuth credentials are required. Please set OAUTH_CLIENT_ID and OAUTH_CLIENT_SECRET');
}

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: "/api/auth/oauth/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let user = await storage.getUserByEmail(profile.emails?.[0]?.value || '');
    
    if (!user) {
      // Create new user
      user = await storage.createUser({
        id: randomUUID(),
        email: profile.emails?.[0]?.value || '',
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        profileImageUrl: profile.photos?.[0]?.value || '',
        oauthProvider: 'google',
        oauthId: profile.id,
      });
    } else {
      // Update existing user with OAuth info
      user = await storage.upsertUser({
        ...user,
        oauthProvider: 'google',
        oauthId: profile.id,
        profileImageUrl: profile.photos?.[0]?.value || user.profileImageUrl,
      });
    }

    return done(null, user);
  } catch (error) {
    return done(error, undefined);
  }
}));

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;