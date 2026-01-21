import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  entryDate: date("entry_date").notNull(),
  project: text("project").notNull(),
  hours: integer("hours").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
