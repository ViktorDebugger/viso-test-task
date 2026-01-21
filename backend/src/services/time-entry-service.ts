import { eq, sql } from "drizzle-orm";
import { db } from "../db/client";
import { timeEntries } from "../db/schema";

export interface CreateTimeEntryInput {
  date: string;
  project: string;
  hours: number;
  workDescription: string;
}

export interface TimeEntryValidationError {
  message: string;
}

export interface TimeEntry {
  id: number;
  entryDate: string;
  project: string;
  hours: number;
  description: string;
  createdAt: Date;
}

export function validateCreateTimeEntryInput(
  input: CreateTimeEntryInput
): TimeEntryValidationError | null {
  const { date, project, hours, workDescription } = input;

  if (!date || !project || hours == null || !workDescription) {
    return { message: "All fields are required." };
  }

  if (typeof hours !== "number" || Number.isNaN(hours) || hours <= 0) {
    return { message: "Hours must be a positive number." };
  }

  const roundedHours = Math.round(hours);

  if (roundedHours > 24) {
    return { message: "Hours for a single entry cannot exceed 24." };
  }

  const entryDate = new Date(date);
  if (Number.isNaN(entryDate.getTime())) {
    return { message: "Invalid date format." };
  }

  return null;
}

export async function createTimeEntry(
  input: CreateTimeEntryInput
): Promise<TimeEntry> {
  const { date, project, hours, workDescription } = input;

  const roundedHours = Math.round(hours);
  const entryDate = new Date(date);
  const isoDate = entryDate.toISOString().slice(0, 10);

  const existing = await db
    .select({
      totalHours: sql<number>`COALESCE(SUM(${timeEntries.hours}), 0)`,
    })
    .from(timeEntries)
    .where(eq(timeEntries.entryDate, isoDate));

  const totalHoursForDay = (existing[0]?.totalHours ?? 0) + roundedHours;

  if (totalHoursForDay > 24) {
    throw new Error("Total hours per date cannot exceed 24.");
  }

  const [inserted] = await db
    .insert(timeEntries)
    .values({
      entryDate: isoDate,
      project,
      hours: roundedHours,
      description: workDescription,
    })
    .returning();

  return inserted as TimeEntry;
}

export async function getTimeEntries(): Promise<TimeEntry[]> {
  const entries = await db
    .select()
    .from(timeEntries)
    .orderBy(sql`${timeEntries.entryDate} DESC, ${timeEntries.createdAt} DESC`);

  return entries as TimeEntry[];
}
