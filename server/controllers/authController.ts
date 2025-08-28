import type { Request, Response } from "express";
import { storage } from "../storage";

export class AuthController {
  static async getUser(req: any, res: Response) {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
}