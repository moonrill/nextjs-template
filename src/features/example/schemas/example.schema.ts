import { z } from "zod";

export const featureItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["architecture", "testing", "security", "performance"]),
  status: z.enum(["ready", "in-progress", "planned"]).default("ready"),
});

export type FeatureItem = z.infer<typeof featureItemSchema>;
