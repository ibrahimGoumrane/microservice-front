"use client";

/**
 * Enhanced FileField Component
 *
 * A modern, feature-rich file upload component with:
 * - Drag and drop functionality
 * - File validation (type, size, count)
 * - Image previews
 * - Multiple file support
 * - Accessibility features
 * - Two variants: "default" (basic input) and "dropzone" (modern UI)
 *
 * Usage:
 * <FileField
 *   field={field}
 *   state={state}
 *   label="Upload Documents"
 *   accept=".pdf,.doc,.docx"
 *   multiple={true}
 *   maxSize={10 * 1024 * 1024} // 10MB
 *   maxFiles={5}
 *   variant="dropzone"
 *   showPreview={true}
 * />
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { File, FileText, Image, Upload, X } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { BaseField, BaseFieldProps } from "./base-field";

interface FileFieldProps extends BaseFieldProps {
  accept?: string; // File types to accept
  multiple?: boolean; // Allow multiple files
  maxSize?: number; // Maximum file size in bytes
  maxFiles?: number; // Maximum number of files (for multiple)
  showPreview?: boolean; // Show file previews
  variant?: "default" | "dropzone"; // Visual variant
}

export function FileField({
  label,
  field,
  state,
  placeholder = "Choose files or drag and drop",
  className,
  required,
  disabled,
  icon,
  helpText,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  showPreview = true,
  variant = "default",
  ...props
}: FileFieldProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-4 h-4 text-blue-500" />;
    } else if (file.type === "application/pdf") {
      return <FileText className="w-4 h-4 text-red-500" />;
    } else if (file.type.includes("word") || file.type.includes("document")) {
      return <FileText className="w-4 h-4 text-blue-600" />;
    } else if (file.type.includes("sheet") || file.type.includes("excel")) {
      return <FileText className="w-4 h-4 text-green-600" />;
    }
    return <File className="w-4 h-4 text-gray-500" />;
  };

  // Validate files
  const validateFiles = (
    files: File[]
  ): { valid: File[]; errors: string[] } => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    files.forEach((file) => {
      // Check file size
      if (maxSize && file.size > maxSize) {
        newErrors.push(
          `${file.name} is too large. Maximum size is ${formatFileSize(
            maxSize
          )}`
        );
        return;
      }

      // Check file type
      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isValidType = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(type.replace("*", ".*"));
        });

        if (!isValidType) {
          newErrors.push(
            `${file.name} is not a valid file type. Accepted types: ${accept}`
          );
          return;
        }
      }

      validFiles.push(file);
    });

    // Check max files
    if (maxFiles && validFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      return { valid: validFiles.slice(0, maxFiles), errors: newErrors };
    }

    return { valid: validFiles, errors: newErrors };
  };

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const { valid, errors: validationErrors } = validateFiles(fileArray);

      setErrors(validationErrors);

      if (valid.length > 0) {
        const newFiles = multiple ? [...selectedFiles, ...valid] : valid;

        // Respect maxFiles limit
        const finalFiles = maxFiles ? newFiles.slice(0, maxFiles) : newFiles;

        setSelectedFiles(finalFiles);

        // Update form field
        if (multiple) {
          field.onChange(finalFiles);
        } else {
          field.onChange(finalFiles[0] || null);
        }
      }
    },
    [field, multiple, selectedFiles, maxFiles, validateFiles]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
    },
    [disabled, processFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    if (multiple) {
      field.onChange(newFiles);
    } else {
      field.onChange(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  // Helper function to check if file is an image
  const isImageFile = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  // Image preview component
  const ImagePreview = ({ file }: { file: File }) => {
    const [preview, setPreview] = useState<string>("");

    React.useEffect(() => {
      if (isImageFile(file)) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
      return () => setPreview("");
    }, [file]);

    if (!isImageFile(file) || !preview) return null;

    return (
      <div className="w-10 h-10 rounded border overflow-hidden bg-muted">
        <img
          src={preview}
          alt={file.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };

  if (variant === "default") {
    return (
      <BaseField
        label={label}
        field={field}
        state={state}
        className={className}
        icon={icon}
        helpText={helpText}
      >
        <Input
          type="file"
          name={field.name}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          onBlur={field.onBlur}
          ref={field.ref}
          className={icon ? "pl-10" : ""}
          {...props}
        />
        {required && selectedFiles.length === 0 && (
          <p className="text-destructive">This field is required</p>
        )}
      </BaseField>
    );
  }

  return (
    <BaseField
      label={label}
      field={field}
      state={state}
      className={className}
      icon={icon}
      helpText={helpText}
    >
      <div className="space-y-4">
        {/* Hidden input for form state management */}
        <Input
          ref={inputRef}
          type="file"
          name={field.name}
          disabled={disabled}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          onBlur={field.onBlur}
          className="hidden"
          {...props}
        />

        {/* Modern dropzone interface */}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ease-in-out cursor-pointer",
            "hover:border-primary/50 hover:bg-accent/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            dragActive && "border-primary bg-primary/10 scale-[1.02]",
            disabled && "opacity-50 cursor-not-allowed",
            errors.length > 0 && "border-destructive/50 bg-destructive/5",
            selectedFiles.length > 0 &&
              !dragActive &&
              "border-success/50 bg-success/5",
            // Add required field styling when no files are selected
            required && selectedFiles.length === 0 && "border-destructive/30",
            className
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={!disabled ? openFileDialog : undefined}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              openFileDialog();
            }
          }}
          aria-label={`File upload area. ${placeholder}. ${selectedFiles.length} files selected.`}
          aria-required={required}
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div
              className={cn(
                "mx-auto flex h-12 w-12 items-center justify-center rounded-full",
                dragActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              )}
            >
              <Upload className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                {dragActive ? "Drop files here" : placeholder}
                {required && selectedFiles.length === 0 && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </p>

              {!disabled && (
                <div className="space-y-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openFileDialog();
                    }}
                    className={cn(
                      required &&
                        selectedFiles.length === 0 &&
                        "border-destructive/50 text-destructive"
                    )}
                  >
                    Choose Files
                  </Button>

                  {(accept || maxSize || required) && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        {accept && `Accepted types: ${accept}`}
                        {accept && maxSize && " • "}
                        {maxSize && `Max size: ${formatFileSize(maxSize)}`}
                      </p>
                      {required && selectedFiles.length === 0 && (
                        <p className="text-xs text-destructive">
                          This field is required
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error messages */}
        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-xs text-destructive">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* File previews */}
        {showPreview && selectedFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Selected files ({selectedFiles.length}):
            </p>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-accent rounded-md text-sm"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    {isImageFile(file) ? (
                      <ImagePreview file={file} />
                    ) : (
                      getFileIcon(file)
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="truncate font-medium block">
                        {file.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>

                  {!disabled && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="ml-2 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseField>
  );
}
