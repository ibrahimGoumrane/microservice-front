"use client";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { TextField } from "./text-field";
import { FieldConfig, State } from "@/lib/schemas/base";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  form: UseFormReturn;
  state: State;
  fieldConfig?: FieldConfig;
}

const PasswordField = ({ form, state, fieldConfig }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <FormField
      name={fieldConfig?.name || "password"}
      control={form.control}
      render={({ field }) => (
        <TextField
          label={fieldConfig?.label || "Password"}
          field={field}
          state={state}
          placeholder={fieldConfig?.placeholder || "••••••••"}
          type={showPassword ? "text" : "password"}
          required={fieldConfig?.required}
          className={fieldConfig?.className}
          helpText={fieldConfig?.helpText}
          afterelement={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handlePasswordVisibility}
              className={cn(
                "h-full px-3 hover:bg-transparent text-muted-foreground hover:text-foreground",
                "transition-colors duration-200"
              )}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={16} className="shrink-0" />
              ) : (
                <Eye size={16} className="shrink-0" />
              )}
            </Button>
          }
        />
      )}
    />
  );
};

export default PasswordField;
