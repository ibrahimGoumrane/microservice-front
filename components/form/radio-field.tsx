"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";
import { BaseField, BaseFieldProps } from "./base-field";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioFieldProps extends BaseFieldProps {
  options: RadioOption[];
  layout?: "horizontal" | "vertical";
}

export function RadioField({
  label,
  field,
  state,
  className,
  disabled,
  helpText,
  options,
  layout = "vertical",
  ...props
}: RadioFieldProps) {
  // Ensure field value is always defined as a string
  const fieldValue = field.value ? String(field.value) : "";

  return (
    <BaseField
      label={label}
      field={field}
      state={state}
      className={className}
      helpText={helpText}
    >
      <RadioGroup
        disabled={disabled}
        value={fieldValue}
        onValueChange={field.onChange}
        className={layout === "horizontal" ? "flex space-x-4" : "space-y-2"}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${field.name}-${option.value}`}
            />
            <Label
              htmlFor={`${field.name}-${option.value}`}
              className="cursor-pointer"
            >
              {option.label}
              {option.description && (
                <span className="block text-sm text-muted-foreground">
                  {option.description}
                </span>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </BaseField>
  );
}
