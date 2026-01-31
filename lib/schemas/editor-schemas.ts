import { z } from "zod"

// Campaign form schema
export const campaignSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  is_active: z.boolean(),
  message: z.object({
    amount: z.number().min(0, "Amount must be positive"),
    name: z.string().min(1, "Name is required"),
    phoneNumber: z.string().min(10, "Valid phone number required")
  })
});

// Promo info schema for structured content
export const promoInfoSchema = z.object({
  action: z.string().optional(), // e.g., "deposit", "play"
  url: z.string().optional(), // promo URL
  content: z.string().optional(), // Rich HTML content
  qualificationCriteria: z.array(z.string()).optional(),
  prizes: z.object({
    maxAmount: z.number().optional(),
    maxWinnings: z.number().optional(),
    dailyWinners: z.number().optional()
  }).optional(),
  gameTypes: z.array(z.string()).optional(), // e.g., ["crash", "sports", "virtual"]
  minimumOdds: z.number().optional(),
  timeRestrictions: z.object({
    startTime: z.date().optional(), // e.g., "07:00"
    endTime: z.date().optional(), // e.g., "11:00"
  }).optional()
});

// Enhanced promo form schema
export const promoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  carouselImage: z.string().or(z.literal("")),
  image: z.string().or(z.literal("")),
  start: z.date({}),
  end: z.date({}),
  terms_and_conditions: z.string().optional(), // Made optional to match Prisma schema
  amount: z.number().min(0, "Amount must be positive").optional().or(z.literal(undefined)),
  is_active: z.boolean(),
  info: promoInfoSchema.optional() // Add the info field
});

export type CampaignFormData = z.infer<typeof campaignSchema>
export type PromoFormData = z.infer<typeof promoSchema>
