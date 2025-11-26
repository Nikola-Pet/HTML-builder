import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("a-button", {
  variants: {
    variant: {
      primary: "a-button--brand-primary",
      secondary: "a-button--brand-secondary",
      tertiary: "a-button--brand-tertiary",
      neutralprimary: "a-button--neutral-primary",
      neutralsecondary: "a-button--neutral-secondary",
      neutraltertiary: "a-button--neutral-tertiary",
      destructiveprimary: "a-button--destructive-primary",
      destructivesecondary: "a-button--destructive-secondary",
      destructivetertiary: "a-button--destructive-tertiary",
    },
    fixed: {
      true: "-fixed",
    },
    small: {
      true: "-small",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, fixed, small, asChild = false, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, fixed, small, className }))} ref={ref} {...props}>
        {icon && <i className={`a-icon a-button__icon boschicon-bosch-ic-${icon}`}></i>}
        {children && <span className="a-button__label">{children}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
