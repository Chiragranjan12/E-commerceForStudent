import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // All database routes have been removed
  // Only schema definitions remain in shared/schema.ts for design purposes

  return httpServer;
}
