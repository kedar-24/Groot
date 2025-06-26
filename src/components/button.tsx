import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";

// --- STYLES (using CVA) ---
const buttonVariants = cva(
  // Base styles applied to all variants
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
        secondary:
          "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]",
        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-900",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// --- PROPS ---
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asLink?: boolean;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// --- COMPONENT ---
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asLink = false,
      href,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {leftIcon && <span className="mr-2 h-4 w-4">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 h-4 w-4">{rightIcon}</span>}
      </>
    );

    const buttonClasses = clsx(buttonVariants({ variant, size, className }));

    if (asLink && href) {
      return (
        <Link href={href} className={buttonClasses} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
