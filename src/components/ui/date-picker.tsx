import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  value: string;
  onChange: (date: string) => void;
}

export const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  const date = value ? new Date(value) : undefined;

  const handleDateChange = (selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate.toISOString());
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
};
