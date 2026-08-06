import { forwardRef, type ElementType, type HTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

const typographyVariants = cva("text-[var(--color-text)]", {
  variants: {
    variant: {
      h1: "text-4xl font-semibold leading-tight",
      h2: "text-3xl font-semibold leading-tight",
      h3: "text-2xl font-semibold leading-snug",
      h4: "text-xl font-semibold leading-snug",
      body: "text-base leading-relaxed",
      bodySmall: "text-sm leading-relaxed",
      caption: "text-xs text-[var(--color-text-muted)]",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElementByVariant: Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  ElementType
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  bodySmall: "p",
  caption: "span",
};

export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: ElementType;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, ...props }, ref) => {
    const Component = as ?? defaultElementByVariant[variant];

    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        {...(props as ComponentPropsWithoutRef<typeof Component>)}
      />
    );
  },
);

Typography.displayName = "Typography";