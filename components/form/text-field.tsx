"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { BaseField, BaseFieldProps } from "./base-field";

interface TextFieldProps extends BaseFieldProps {
  type?: string; // Input type (text, email, password, etc.)
  autoComplete?: string; // Autocomplete attribute
  children?: React.ReactNode; // For additional elements like password toggle
}

export function TextField({
  label,
  field,
  state,
  placeholder,
  type = "text",
  className,
  required,
  disabled,
  icon,
  helpText,
  children,
  afterelement, // Optional element to add after the input
  beforeelement, // Optional element to add before the input
  ...props
}: TextFieldProps) {
  // Ensure field value is always defined (empty string if undefined or null)
  const fieldValue = field.value ?? "";

  if (type === "hidden") {
    return <Input type="hidden" {...field} value={fieldValue} {...props} />;
  }

  return (
    <BaseField
      label={label}
      field={field}
      state={state}
      className={className}
      icon={icon}
      helpText={helpText}
      afterelement={afterelement}
      beforeelement={beforeelement}
    >
      <Input
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        required={required}
        className={
          icon && afterelement
            ? "pl-10 pr-10"
            : icon
            ? "pl-10"
            : afterelement
            ? "pr-10"
            : ""
        }
        {...field}
        value={fieldValue}
        {...props}
      />
      {children}
    </BaseField>
  );
}
