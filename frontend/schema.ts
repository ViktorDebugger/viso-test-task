import * as z from "zod";

export const PROJECTS = [
  "Viso Internal",
  "Client A",
  "Client B",
  "Personal Development",
] as const;

export const timeEntrySchema = z.object({
  date: z.date({
    error: "Date is required",
  }),
  project: z.enum(PROJECTS, {
    error: "Project is required",
  }),
  hours: z
    .number({
      error: "Hours is required",
    })
    .positive("Hours must be a positive number")
    .max(24, "Hours cannot exceed 24 per day"),
  workDescription: z
    .string({
      error: "Work description is required",
    })
    .min(1, "Work description cannot be empty")
    .trim(),
});

export type TimeEntryFormData = z.infer<typeof timeEntrySchema>;
