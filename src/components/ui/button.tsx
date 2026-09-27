import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#187E91] text-white hover:bg-[#136B7C] shadow-sm hover:shadow-md hover:-translate-y-0.5",
        forest:
          "bg-[#244835] text-white hover:bg-[#1b3829] shadow-sm hover:shadow-md hover:-translate-y-0.5",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-600 shadow-sm",
        outline:
          "border border-stone-300/80 bg-white/90 text-stone-800 hover:bg-stone-50 hover:border-stone-400 hover:-translate-y-0.5 shadow-xs backdrop-blur-sm",
        outlineTeal:
          "border border-[#187E91]/40 bg-white/80 text-[#187E91] hover:bg-[#187E91]/10 hover:border-[#187E91] hover:-translate-y-0.5 shadow-xs",
        secondary:
          "bg-[#E3EFE7] text-[#244835] hover:bg-[#d4e6db] hover:-translate-y-0.5",
        ghost:
          "hover:bg-stone-100 text-stone-700 hover:text-stone-900",
        link:
          "text-[#187E91] underline-offset-4 hover:underline",
        glass:
          "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/25 shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-xs sm:text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-7 text-sm sm:text-[15px]",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
