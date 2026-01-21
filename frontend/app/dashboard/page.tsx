"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeEntriesTable } from "@/components/time-entries-table";

interface ApiTimeEntry {
  id: number;
  entryDate: string;
  project: string;
  hours: number;
  description: string;
  createdAt: string;
}

interface TableTimeEntry {
  id: string;
  date: string;
  project: string;
  hours: number;
  workDescription: string;
  createdAt: string;
}

export default function Dashboard() {
  const [entries, setEntries] = useState<TableTimeEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("http://localhost:8080/time-entries");
        if (!response.ok) {
          throw new Error("Failed to load time entries");
        }

        const data = (await response.json()) as ApiTimeEntry[];

        const mapped: TableTimeEntry[] = data.map((entry) => ({
          id: entry.id.toString(),
          date: entry.entryDate,
          project: entry.project,
          hours: entry.hours,
          workDescription: entry.description,
          createdAt: entry.createdAt,
        }));

        setEntries(mapped);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchEntries();
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <Card className="border border-zinc-700 bg-[#18181b] text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeEntriesTable entries={entries} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
