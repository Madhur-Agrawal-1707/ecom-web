import { forwardRef } from "react";
import { Input, type InputProps } from "../../../shared/components";
import { SearchIcon } from "../icons";

export type SearchBarProps = Omit<InputProps, "leftIcon" | "type">;

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder = "Search products...", "aria-label": ariaLabel, ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      placeholder={placeholder}
      aria-label={ariaLabel ?? "Search products"}
      leftIcon={<SearchIcon aria-hidden="true" />}
      {...props}
    />
  ),
);

SearchBar.displayName = "SearchBar";