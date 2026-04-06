import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
export function Header({ children, className }: Props) {
  return (
    <div className="flex flex-row items-center gap-5">
      <Link href="/">
        <div className="h-20 w-20">
          <img
            src="/icon.png"
            alt="carspecthai.com"
            className="w-full h-full"
          />
        </div>
      </Link>
      <div className={`flex flex-col ${className}`}>{children}</div>
    </div>
  );
}
