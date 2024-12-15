import { z } from "zod";

export const plantSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  type: z.enum(["Succulent", "Tropical", "Herb", "Cacti"], {
    message: "Type must be one of: Succulent, Tropical, Herb, Cacti",
  }),
  wateringFrequencyDays: z
    .number()
    .min(1, { message: "Watering frequency must be at least 1 day" }),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters long" }),
  lastWateredDate: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Last watered date must be a valid date",
    }),
});
