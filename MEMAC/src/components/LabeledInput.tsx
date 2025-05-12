import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabeledInputProps extends React.ComponentProps<typeof Input> {
  label: string;
}

export default function LabeledInput({ label, id, className, ...rest }: LabeledInputProps) {
  const localId = id || `input-${rest.name}`;
  return (
    <div className={className ? className : "flex flex-col gap-1"}>
      <Label htmlFor={localId} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input id={localId} {...rest} />
    </div>
  );
}
