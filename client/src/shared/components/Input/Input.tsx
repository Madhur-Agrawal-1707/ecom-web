import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id,
      label,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(errorText);

    const describedBy =
      [hasError ? errorId : null, helperText ? helperId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
            {required && (
              <span className="text-[var(--color-danger)]" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 flex items-center text-[var(--color-text-muted)]">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              "h-10 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] disabled:cursor-not-allowed disabled:opacity-60",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
              hasError &&
                "border-[var(--color-danger)] focus-visible:outline-[var(--color-danger)]",
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="pointer-events-none absolute right-3 flex items-center text-[var(--color-text-muted)]">
              {rightIcon}
            </span>
          )}
        </div>

        {hasError ? (
          <p id={errorId} role="alert" className="text-xs text-[var(--color-danger)]">
            {errorText}
          </p>
        ) : (
          helperText && (
            <p id={helperId} className="text-xs text-[var(--color-text-muted)]">
              {helperText}
            </p>
          )
        )}
      </div>
    );
  },
);

Input.displayName = "Input";