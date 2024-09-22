import { TaskType } from "@/components/Task";
import { clsx, type ClassValue } from "clsx";
import { compareDesc, format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getYesterdaysDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString();
};

// Get all unique dates sorted from latest to earliest
export const getSortedDates = (tasks: TaskType[]) => {
  // Combine and extract unique dates
  const allDates = tasks
    .map((task) => format(parseISO(task.dueDate), "yyyy-MM-dd"))
    .filter((date, index, self) => date && self.indexOf(date) === index) // Filter out duplicates and empty dates
    .sort((a, b) => compareDesc(parseISO(a), parseISO(b))); // Sort from latest to earliest

  return allDates;
};

// Group tasks by dueDate
export const groupTasksByDate = (tasks: TaskType[]) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    const dateKey = task.dueDate
      ? format(parseISO(task.dueDate), "yyyy-MM-dd")
      : "No Date";
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, TaskType[]>);

  return groupedTasks;
};
