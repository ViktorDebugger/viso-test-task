"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { timeEntrySchema, PROJECTS, type TimeEntryFormData } from "@/schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface EntryFormProps {
  inDialog?: boolean;
}

export const EntryForm = ({ inDialog = false }: EntryFormProps) => {
  const router = useRouter();
  const form = useForm<TimeEntryFormData>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      date: new Date(),
      project: PROJECTS[0],
      hours: 0,
      workDescription: "",
    },
  });

  const onSubmit = async (data: TimeEntryFormData) => {
    try {
      const response = await fetch("http://localhost:8080/time-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: data.date.toISOString(),
          project: data.project,
          hours: data.hours,
          workDescription: data.workDescription,
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { message?: string };
        throw new Error(errorBody.message ?? "Failed to save time entry");
      }

      toast.success("Time entry saved successfully!", {
        description: `${data.hours} hours logged for ${data.project}`,
        duration: 3000,
      });

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error while saving time entry.");
      }
    }
  };

  const formFields = (
    <FieldGroup className="gap-6">
      <Controller
        name="date"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="time-entry-date">Date</FieldLabel>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="time-entry-date"
                  variant="outline"
                  className={cn(
                    "focus-visible:border-ring focus-visible:ring-ring/50 w-full justify-start border-zinc-700 bg-transparent text-left font-normal text-white outline-none hover:bg-zinc-900 hover:text-white focus-visible:ring-[3px]",
                    !field.value && "text-muted-foreground"
                  )}
                  aria-invalid={fieldState.invalid}
                >
                  {field.value
                    ? field.value.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto border border-zinc-700 bg-[#18181b] p-0"
              >
                <Calendar
                  mode="single"
                  selected={field.value ?? undefined}
                  onSelect={(date) => field.onChange(date ?? null)}
                  className="bg-[#18181b] text-white"
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {fieldState.invalid && fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="project"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="time-entry-project">Project</FieldLabel>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  id="time-entry-project"
                  variant="outline"
                  className="focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full justify-between rounded-md border border-zinc-700 bg-transparent px-3 py-1 text-sm font-normal text-white outline-none hover:bg-zinc-900 hover:text-white focus-visible:ring-[3px]"
                  title={field.value || "Select project"}
                  aria-invalid={fieldState.invalid}
                >
                  <span>{field.value || "Select project"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-full bg-[#18181b] text-white"
              >
                <DropdownMenuRadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {PROJECTS.map((project) => (
                    <DropdownMenuRadioItem key={project} value={project}>
                      {project}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {fieldState.invalid && fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="hours"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="time-entry-hours">Hours</FieldLabel>
            <Input
              id="time-entry-hours"
              type="number"
              step="0.25"
              min={0}
              max={24}
              value={Number.isFinite(field.value) ? field.value : ""}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value === "" ? NaN : Number(value));
              }}
              aria-invalid={fieldState.invalid}
              className="[appearance:textfield] border-zinc-700 bg-transparent text-white placeholder:text-zinc-500 focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {fieldState.invalid && fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      <Controller
        name="workDescription"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="time-entry-work-description">
              Work description
            </FieldLabel>
            <Textarea
              id="time-entry-work-description"
              rows={5}
              placeholder="Describe the work you did..."
              {...field}
              aria-invalid={fieldState.invalid}
              className="border-zinc-700 bg-transparent text-white placeholder:text-zinc-500 focus-visible:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {fieldState.invalid && fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  );

  const formButtons = (
    <Field orientation="horizontal">
      <Button
        type="button"
        variant="outline"
        onClick={() => form.reset()}
        className="cursor-pointer border-zinc-700 bg-black text-zinc-200 hover:bg-zinc-900 hover:text-white"
      >
        Reset
      </Button>
      <Button
        type="submit"
        form="time-entry-form"
        className="cursor-pointer border border-[#22c55e] bg-black px-6 font-semibold text-[#22c55e] hover:bg-[#16a34a] hover:text-black"
      >
        Save
      </Button>
    </Field>
  );

  if (inDialog) {
    return (
      <form
        id="time-entry-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {formFields}
        {formButtons}
      </form>
    );
  }

  return (
    <Card className="w-full max-w-xl border border-zinc-700 bg-[#18181b] text-white shadow-lg">
      <CardHeader>
        <CardTitle>New Time Entry</CardTitle>
        <CardDescription className="text-zinc-400">
          Log your work for a specific date and project.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="time-entry-form" onSubmit={form.handleSubmit(onSubmit)}>
          {formFields}
        </form>
      </CardContent>

      <CardFooter>{formButtons}</CardFooter>
    </Card>
  );
};
