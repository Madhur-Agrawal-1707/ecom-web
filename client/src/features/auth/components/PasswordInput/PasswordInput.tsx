import { forwardRef, useId, useState } from "react";
import { Input, type InputProps } from "@/shared/components";
import { EyeIcon, EyeOffIcon } from "./icons";

export type PasswordInputProps = Omit<InputProps, "type" | "rightIcon">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleId = useId();

    return (
      <Input
        ref={ref}
        type={isVisible ? "text" : "password"}
        autoComplete={props.autoComplete ?? "current-password"}
        rightIcon={
          <button
            type="button"
            id={toggleId}
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            // Overrides the ancestor's pointer-events-none (set by Input's
            // rightIcon slot, which is otherwise decorative-only) so this
            // specific icon can still be clicked/focused.
            className="pointer-events-auto inline-flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            {isVisible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
          </button>
        }
        {...props}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";