import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactNotification } from "./email";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification
      try {
        await sendContactNotification(submission);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue with the request, don't fail if email doesn't send
      }
      
      // Return success response
      return res.status(201).json({ 
        message: "Contact form submitted successfully", 
        submission 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      }
      
      // Handle other errors
      return res.status(500).json({ 
        message: "An error occurred while processing your request" 
      });
    }
  });

  // Get all contact submissions
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.status(200).json(submissions);
    } catch (error) {
      return res.status(500).json({ 
        message: "An error occurred while retrieving contact submissions" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
