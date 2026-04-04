import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export function Header({ children, className }: Props) {
  return (
    <div className="flex flex-row w-full gap-5 content-center mb-5">
      <Link href="/">
        <img
          src="/icon.png"
          alt="carspecthai.com"
          className="object-contain h-20"
        />
      </Link>
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  );
}
