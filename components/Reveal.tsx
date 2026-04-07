"use client";

import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const variants = {
    up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  direction = "up",
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => {
        const variants = {
          up: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
          left: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } },
          right: { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } },
          none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
        };
        return (
          <motion.div
            key={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[direction]}
            transition={{
              duration: 0.55,
              delay: i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
