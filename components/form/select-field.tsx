import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseField, BaseFieldProps } from "./base-field";

interface Options {
  value: string; // Value of the option
  label: string; // Label to display for the option
}

interface SelectFieldsProps extends BaseFieldProps {
  options: Options[]; // Options for the select field
  onValueChange?: (value: string) => void; // Optional value change handler
}

export function SelectField({
  label,
  field,
  state,
  options,
  className,
  required,
  disabled,
  icon,
  helpText,
  placeholder = "Choose a value",
  onValueChange,
  ...props
}: SelectFieldsProps) {
  // Ensure field value is always defined as a string
  const fieldValue = field.value ? String(field.value) : undefined;

  // Handle value changes, ensuring it calls both our callback and field.onChange
  const handleValueChange = (value: string) => {
    field.onChange(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <BaseField
      label={label}
      field={field}
      state={state}
      className={className}
      icon={icon}
      helpText={helpText}
    >
      <Select
        value={fieldValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        required={required}
        name={field.name}
        {...props}
      >
        <SelectTrigger
          className={"w-full " + (icon ? "pl-10" : "")}
          onClick={(e) => e.stopPropagation()}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </BaseField>
  );
}
