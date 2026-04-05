"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";

type Props = {
  href: string;
};

export function ButtonLink({
  href,
  children,
  ...props
}: Props & ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const router = useRouter();

  const overWriteClass =
    props.variant === "link"
      ? "px-1 m-0 h-0 text-inherit underline cursor-pointer"
      : "";

  return (
    <Button
      onClick={() => router.push(href)}
      {...props}
      className={`${props.className} ${overWriteClass}`}
    >
      {children}
    </Button>
  );
}
