import { Request, Response } from "express";
import {
  createTimeEntry,
  CreateTimeEntryInput,
  getTimeEntries,
  validateCreateTimeEntryInput,
} from "../services/time-entry-service";

export async function createTimeEntryHandler(req: Request, res: Response) {
  const input = req.body as CreateTimeEntryInput;

  const validationError = validateCreateTimeEntryInput(input);
  if (validationError) {
    return res.status(400).json({ message: validationError.message });
  }

  try {
    const entry = await createTimeEntry(input);
    return res.status(201).json(entry);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Total hours")) {
      return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Failed to create time entry." });
  }
}

export async function getTimeEntriesHandler(_req: Request, res: Response) {
  try {
    const entries = await getTimeEntries();
    return res.json(entries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch time entries." });
  }
}
