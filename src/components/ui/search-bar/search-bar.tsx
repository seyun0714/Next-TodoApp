import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

function SearchBar({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div
      className={cn(
        "flex items-center w-full h-10 rounded-md border border-input bg-background px-3 shadow-sm",
        "focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
        className
      )}
    >
      <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
      <input
        type={type}
        className={cn(
          "w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...props}
      />
    </div>
  );
}

export { SearchBar };
