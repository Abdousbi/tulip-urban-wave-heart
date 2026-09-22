import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Frame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("holo-frame", className)}>
      <span className="c tl" />
      <span className="c tr" />
      <span className="c bl" />
      <span className="c br" />
      {children}
    </div>
  );
}
