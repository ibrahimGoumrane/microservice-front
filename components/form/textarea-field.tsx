"use client";

import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { BaseField, BaseFieldProps } from "./base-field";

interface TextareaFieldProps extends BaseFieldProps {
  rows?: number;
  maxLength?: number;
}

export function TextareaField({
  label,
  field,
  state,
  placeholder,
  className,
  required,
  disabled,
  icon,
  helpText,
  rows = 3,
  maxLength,
  ...props
}: TextareaFieldProps) {
  // Ensure field value is always defined (empty string if undefined or null)
  const fieldValue = field.value ?? "";

  return (
    <BaseField
      label={label}
      field={field}
      state={state}
      className={className}
      icon={icon}
      helpText={helpText}
    >
      <Textarea
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={icon ? "pl-10" : ""}
        rows={rows}
        maxLength={maxLength}
        {...field}
        value={fieldValue}
        {...props}
      />
    </BaseField>
  );
}
