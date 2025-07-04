import { CalendarIcon } from "lucide-react";

import { useState } from "react";
import { useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";

type Props = {
  placeholder?: string;
  className?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

const Datepicker = ({ value, placeholder, className, onChange }: Props) => {
  const [date, setDate] = useState<Date | undefined>(value);

  const onSelect = (date: Date | undefined) => {
    setDate(date);
    onChange?.(date);
  };

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? (
            format(date, "dd/MM/yyyy")
          ) : (
            <span>{placeholder ?? "dd/MM/yyyy"}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onSelect} />
      </PopoverContent>
    </Popover>
  );
};

export default Datepicker;
