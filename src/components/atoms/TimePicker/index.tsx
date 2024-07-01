"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "../../../lib/time-picker-input";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
  variant?: "default" | "sea";
}

export function TimePicker({ date, setDate, label, variant }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <Label htmlFor="hours" className="text-xs">
        {label}
      </Label>
      <div className="flex items-end gap-2">
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="hours"
            date={date}
            className={`${
              variant === "sea" &&
              "text-primary-sea bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:text-primary-sea"
            }`}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
        </div>
        <div className="grid gap-1 text-center">
          <TimePickerInput
            picker="minutes"
            date={date}
            className={`${
              variant === "sea" &&
              "text-primary-sea bg-secondary-sea border-primary-sea focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:text-primary-sea"
            }`}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            onRightFocus={() => secondRef.current?.focus()}
          />
        </div>
      </div>
    </div>
  );
}
