import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

const skeletonVariants = cva("animate-pulse bg-[var(--color-bg-muted)]", {
  variants: {
    shape: {
      text: "h-4 rounded-[var(--radius-sm)]",
      circular: "rounded-full",
      rectangular: "rounded-[var(--radius-md)]",
    },
  },
  defaultVariants: {
    shape: "text",
  },
});

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: number | string;
  height?: number | string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, width, height, style, ...props }, ref) => {
    const dimensionStyle: CSSProperties = {
      width,
      height,
      ...style,
    };

    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden="true"
        style={dimensionStyle}
        className={cn(skeletonVariants({ shape }), className)}
        {...props}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";