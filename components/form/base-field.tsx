"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { State } from "@/lib/schema/base";
import { getErrorMessage } from "@/lib/utils/utils";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export interface BaseFieldProps {
  label?: string; // Field label
  field: ControllerRenderProps<FieldValues, string>; // Field object from form.control
  state: State; // Form state for error handling
  placeholder?: string; // Optional placeholder
  className?: string; // Additional CSS classes
  required?: boolean; // If the field is required
  disabled?: boolean; // If the field is disabled
  readOnly?: boolean; // If the field is read-only
  icon?: React.ReactNode; // Optional icon to display
  helpText?: React.ReactNode; // Optional help text
  description?: string; // Optional description text
  showErrorMessage?: boolean; // Whether to show error messages (defaults to true)
  afterelement?: React.ReactNode; // Optional element to add after the input
  beforeelement?: React.ReactNode; // Optional element to add before the input
}

export function BaseField({
  label,
  field,
  state,
  className,
  icon,
  helpText,
  description,
  showErrorMessage = true,
  afterelement,
  beforeelement,
  children,
}: BaseFieldProps & { children: React.ReactNode }) {
  const errorMessage = getErrorMessage(state, field.name);
  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      {description && <FormDescription>{description}</FormDescription>}
      <div className="relative">
        {beforeelement}
        <FormControl>
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            {children}
            {afterelement && (
              <div className="absolute inset-y-0 right-0 flex items-center">
                {afterelement}
              </div>
            )}
          </div>
        </FormControl>
        {typeof helpText === "string" ? (
          <div className="text-sm text-muted-foreground mt-1">{helpText}</div>
        ) : (
          helpText
        )}
      </div>
      {showErrorMessage && <FormMessage>{errorMessage}</FormMessage>}
    </FormItem>
  );
}
