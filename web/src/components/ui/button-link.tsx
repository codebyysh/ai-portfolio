import Link from "next/link";

import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Link> &
  ButtonVariantProps & { className?: string }) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export function ButtonAnchor({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & ButtonVariantProps & { className?: string }) {
  return (
    <a className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
