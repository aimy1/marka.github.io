"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-sm shadow-accent/20",
      secondary:
        "bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]",
      ghost:
        "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100",
      outline:
        "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-9",
      lg: "text-sm px-6 py-3 h-11",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Link-compatible version
interface LinkButtonProps {
  href: string;
  variant?: "primary" | "ghost" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  target,
  rel,
}: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 select-none";

  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-hover active:scale-[0.98] shadow-sm shadow-accent/20",
    secondary:
      "bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]",
    ghost:
      "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100",
    outline:
      "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-4 py-2 h-9",
    lg: "text-sm px-6 py-3 h-11",
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}

export { Button };
export default Button;
