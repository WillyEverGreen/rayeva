import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-[#187E91] text-white shadow-sm",
        secondary:
          "border border-transparent bg-[#E3EFE7] text-[#244835]",
        forest:
          "border border-transparent bg-[#244835] text-white",
        outline:
          "border border-stone-300 text-stone-700 bg-white/60",
        outlineTeal:
          "border border-[#187E91]/30 text-[#187E91] bg-[#187E91]/5",
        gold:
          "border border-amber-300/40 bg-amber-50 text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
