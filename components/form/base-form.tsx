"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { cloneElement, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { TextField } from "./text-field";
import { SelectField } from "./select-field";
import { FileField } from "./file-field";
import { TextareaField } from "./textarea-field";
import { RadioField } from "./radio-field";
import { FieldConfig, State } from "@/lib/schema/base";

interface BaseFormProps {
  initialState: State;
  action: (
    prevState: State,
    formData: FormData,
    revalidatePaths?: string[]
  ) => Promise<State>;
  schema: ZodSchema;
  fields: FieldConfig[];
  submitText?: string | React.ReactNode;
  loadingText?: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  handleCancel?: () => void;
  actionType?: "create" | "update" | "delete";
  defaultValues?: Record<string, any>;
  onSuccessToast?: (data: string) => void;
  onErrorToast?: (error: string) => void;
  children?: React.ReactNode;
  className?: string;
}

function BaseForm({
  initialState,
  action,
  schema,
  fields,
  submitText = "Submit",
  loadingText = "Submitting...",
  actionType = "create",
  cancelText,
  handleCancel,
  defaultValues = {},
  onSuccessToast,
  onErrorToast,
  className,
  children,
}: BaseFormProps) {
  // Form with client-side validation
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      // Don't set default values for file inputs
      if (field.type === "file") {
        acc[field.name] = null;
      } else {
        acc[field.name] = defaultValues[field.name] || "";
      }
      return acc;
    }, {} as Record<string, any>),
  });
  //Log the form state for debugging
  // const formValues = form.watch();
  // console.log("Form values:", formValues);
  // Form state with server action
  const [state, formAction] = useActionState(action, initialState);

  // React to successful form submission
  useEffect(() => {
    if (state.success && onSuccessToast) {
      onSuccessToast(state.data?.message || "Action successful!");
    }
  }, [state.success]);
  // React to errors
  useEffect(() => {
    if (Object.keys(state.errors).length > 0 && onErrorToast) {
      const errorMessage =
        state.errors.general instanceof Array
          ? state.errors.general[0]
          : state.errors.general;
      onErrorToast(errorMessage || "An error occurred");
    }
  }, [state.errors]);
  return (
    <Form {...form}>
      <form action={formAction} className=" max-h-[800px] overflow-y-auto space-y-4 p-4">
        {/* General error message */}
        {!onErrorToast &&
          state.errors &&
          "general" in state.errors &&
          state.errors.general instanceof Array && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
              {state.errors.general[0]}
            </div>
          )}
        <div className={className + " space-y-4"}>
          {/* Form fields */}
          {fields.map((fieldConfig) =>
            fieldConfig.customRender ? (
              cloneElement(fieldConfig.customRender(form, state), {
                key: fieldConfig.name,
              })
            ) : (
              <FormField
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={form.control}
                render={({ field }) => {
                  switch (fieldConfig.type) {
                    case "select":
                      return (
                        <SelectField
                          label={fieldConfig.label}
                          field={field}
                          state={state}
                          options={fieldConfig.options!}
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                          disabled={fieldConfig.disabled}
                          helpText={fieldConfig.helpText}
                          className={fieldConfig.className}
                          onValueChange={fieldConfig.onValueChange}
                        />
                      );
                    case "file":
                      return (
                        <FileField
                          label={fieldConfig.label}
                          field={field}
                          state={state}
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                          disabled={fieldConfig.disabled}
                          helpText={fieldConfig.helpText}
                          className={fieldConfig.className}
                          accept={fieldConfig.accept}
                          multiple={fieldConfig.multiple}
                          variant={fieldConfig.variant}
                          initialFiles={defaultValues[fieldConfig.name]}
                        />
                      );
                    case "textarea":
                      return (
                        <TextareaField
                          label={fieldConfig.label}
                          field={field}
                          state={state}
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                          disabled={fieldConfig.disabled}
                          helpText={fieldConfig.helpText}
                          className={fieldConfig.className}
                          rows={fieldConfig.rows}
                        />
                      );
                    case "radio":
                      return (
                        <RadioField
                          label={fieldConfig.label}
                          field={field}
                          state={state}
                          options={fieldConfig.options!}
                          required={fieldConfig.required}
                          disabled={fieldConfig.disabled}
                          helpText={fieldConfig.helpText}
                          className={fieldConfig.className}
                          layout={fieldConfig.layout}
                        />
                      );
                    default:
                      return (
                        <TextField
                          label={fieldConfig.label}
                          type={fieldConfig.type}
                          field={field}
                          state={state}
                          placeholder={fieldConfig.placeholder}
                          required={fieldConfig.required}
                          helpText={fieldConfig.helpText}
                          className={fieldConfig.className}
                        />
                      );
                  }
                }}
              />
            )
          )}
        </div>

        {/* Additional custom content */}
        {children}

        {/* Submit button */}
        <SubmitButton
          cancelText={cancelText}
          submitText={submitText}
          loadingText={loadingText}
          handleCancel={() => {
            if (typeof cancelText === "string") {
              form.reset();
            }
            if (handleCancel) {
              handleCancel();
            }
          }}
          actionType={actionType}
        />
      </form>
    </Form>
  );
}
interface SubmitButtonProps {
  submitText: string | React.ReactNode;
  loadingText: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  actionType: "create" | "update" | "delete";
  handleCancel?: () => void;
}

function SubmitButton({
  submitText,
  loadingText,
  cancelText,
  handleCancel,
  actionType,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  // Determine what content to display
  const content = pending ? loadingText : submitText;

  // Check if content is a string to apply different rendering
  const isStringContent = typeof content === "string";

  // check if the cancelText is a string
  const isCancelTextString = cancelText && typeof cancelText === "string";

  return (
    <div className="flex gap-2">
      {cancelText && isCancelTextString ? (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleCancel}
        >
          {cancelText}
        </Button>
      ) : (
        cancelText
      )}
      {isStringContent ? (
        <Button
          type="submit"
          variant={actionType === "delete" ? "destructive" : "default"}
          className={`w-full`}
          disabled={pending}
        >
          <span>{content}</span>
        </Button>
      ) : (
        // If ReactNode, render directly
        content
      )}
    </div>
  );
}

export default BaseForm;
