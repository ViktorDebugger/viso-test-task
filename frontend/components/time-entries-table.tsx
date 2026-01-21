"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  hours: number;
  workDescription: string;
  createdAt: string;
}

interface TimeEntriesTableProps {
  entries: TimeEntry[];
}

interface GroupedEntries {
  [date: string]: TimeEntry[];
}

const ITEMS_PER_PAGE = 5;

export const TimeEntriesTable = ({ entries }: TimeEntriesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const groupedEntries = useMemo(() => {
    const grouped: GroupedEntries = {};
    entries.forEach((entry) => {
      const dateKey = formatDate(entry.date);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(entry);
    });
    return grouped;
  }, [entries]);

  const sortedDates = useMemo(() => {
    return Object.keys(groupedEntries).sort((a, b) => {
      const dateA = new Date(groupedEntries[a][0].date);
      const dateB = new Date(groupedEntries[b][0].date);
      return dateB.getTime() - dateA.getTime();
    });
  }, [groupedEntries]);

  const getTotalHoursForDate = (date: string) => {
    return groupedEntries[date].reduce((sum, entry) => sum + entry.hours, 0);
  };

  const grandTotal = useMemo(() => {
    return entries.reduce((sum, entry) => sum + entry.hours, 0);
  }, [entries]);

  const totalPages = Math.ceil(sortedDates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDates = sortedDates.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (entries.length === 0) {
    return (
      <p className="text-center text-zinc-400">
        No time entries yet. Create your first one!
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {currentDates.map((date) => {
          const dateEntries = groupedEntries[date];
          const totalHours = getTotalHoursForDate(date);

          return (
            <div key={date} className="overflow-x-auto">
              <div className="mb-2 flex items-center justify-between rounded-t-md bg-zinc-800/50 px-4 py-2">
                <h3 className="text-sm font-semibold text-white">{date}</h3>
                <span className="text-sm text-[#22c55e]">
                  Total: {totalHours} {totalHours === 1 ? "hour" : "hours"}
                </span>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                    <TableHead className="w-1/4 text-zinc-300">
                      Project
                    </TableHead>
                    <TableHead className="w-24 text-zinc-300">Hours</TableHead>
                    <TableHead className="text-zinc-300">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dateEntries.map((entry) => (
                    <TableRow
                      key={entry.id}
                      className="border-zinc-700 hover:bg-zinc-800/50"
                    >
                      <TableCell className="w-1/4 text-white">
                        {entry.project}
                      </TableCell>
                      <TableCell className="w-24 text-white">
                        {entry.hours}
                      </TableCell>
                      <TableCell className="text-zinc-300">
                        {entry.workDescription}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>

      {/* Grand Total */}
      <div className="mt-6 flex justify-end border-t border-zinc-700 pt-4">
        <div className="rounded-md bg-[#22c55e]/10 px-6 py-3">
          <p className="text-sm text-zinc-400">Grand Total</p>
          <p className="text-2xl font-bold text-[#22c55e]">
            {grandTotal} {grandTotal === 1 ? "hour" : "hours"}
          </p>
        </div>
      </div>

      {sortedDates.length > ITEMS_PER_PAGE && (
        <div className="mt-4 flex items-center justify-between border-t border-zinc-700 pt-4">
          <p className="text-sm text-zinc-400">
            Showing page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="cursor-pointer border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(page)}
                    className={
                      currentPage === page
                        ? "cursor-pointer bg-[#22c55e] text-black hover:bg-[#16a34a]"
                        : "cursor-pointer border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="cursor-pointer border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
