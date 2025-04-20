import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { QueryCtx, MutationCtx, internalMutation } from "./_generated/server";
import jwt from "jsonwebtoken";

// JWT Secret - in production, this should be an environment variable
const JWT_SECRET = "your-secret-key-for-troski-web-app";
const JWT_EXPIRY = "24h"; // Token expires in 24 hours

// Simple password hashing function (for demo purposes)
// In production, use a proper hashing library like bcrypt
export function hashPassword(password: string): string {
  // This is a very basic hash - NOT SECURE for production
  // In real app, use bcrypt or similar
  return Buffer.from(password).toString("base64");
}

// Verify password
export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  return hashPassword(password) === hashedPassword;
}

// Generate JWT token
export function generateToken(
  userId: string,
  email: string,
  role: string
): string {
  return jwt.sign(
    {
      userId,
      email,
      role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

// Verify JWT token
export function verifyToken(
  token: string
): { userId: string; email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };
    return decoded;
  } catch (err) {
    return null;
  }
}

// Get user by email
export async function getUserByEmail(ctx: QueryCtx, email: string) {
  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first();

  if (!user) {
    return null;
  }

  const auth = await ctx.db
    .query("auth")
    .withIndex("by_user_id", (q) => q.eq("userId", user._id))
    .first();

  return { user, auth };
}

// Generate verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Check if email exists
export async function isEmailExists(
  ctx: QueryCtx,
  email: string
): Promise<boolean> {
  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first();

  return !!user;
}
