import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/*
 * Neutral dark frames that hold real screenshots. Their colors are fixed (not
 * tokens) so they look the same on dark and light sections.
 */

export function BrowserFrame({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#0d0d12] shadow-2xl shadow-black/40",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5"
      >
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/20" />
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] border border-white/15 bg-[#0d0d12] p-1.5 shadow-2xl shadow-black/50",
        className,
      )}
      {...props}
    >
      <div className="relative overflow-hidden rounded-[1.2rem]">{children}</div>
    </div>
  );
}
