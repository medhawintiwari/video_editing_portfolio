"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LiquidMetal } from "@paper-design/shaders-react";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-electric disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-electric text-white hover:bg-blue-royal",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-border-default bg-transparent hover:bg-bg-container-1 hover:border-border-hover text-text-primary",
        secondary: "bg-bg-container-1 text-text-primary hover:bg-bg-container-2 border border-border-default hover:border-blue-electric/30",
        ghost: "hover:bg-bg-container-1 hover:text-text-primary text-text-secondary",
        link: "text-blue-electric underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
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

// Liquid Metal Button Specific implementation
const liquidButtonVariants = cva(
  "relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 overflow-hidden disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-electric hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  {
    variants: {
      variant: {
        default: "text-white",
        amber: "text-bg-primary",
      },
      size: {
        default: "h-12 px-8 text-sm",
        sm: "h-10 px-6 text-xs",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  asChild?: boolean;
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const shaderSettings = React.useMemo(() => {
      if (variant === 'amber') {
        return {
          colorBack: '#F59E0B',
          colorTint: '#D97706',
          speed: 0.2,
        };
      }
      return {
        colorBack: '#141B2B',
        colorTint: '#3B82F6',
        speed: 0.15,
      };
    }, [variant]);

    return (
      <Comp
        className={cn(liquidButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 z-0">
           <LiquidMetal {...shaderSettings} />
        </div>
        
        {/* Subtle border overlay */}
        <div className="absolute inset-0 z-10 rounded-md border border-white/10 pointer-events-none mix-blend-overlay"></div>
        
        <span className="relative z-20 mix-blend-difference">
          {children}
        </span>
      </Comp>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

export { Button, buttonVariants, LiquidButton, liquidButtonVariants };
