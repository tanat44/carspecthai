import { MessageCircleQuestionMark } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

type Props = {
  className?: string;
};

export function AboutButton({ className }: Props) {
  return (
    <ButtonLink
      href="/about"
      variant="outline"
      className={`absolute top-4 right-4 ${className}`}
    >
      <MessageCircleQuestionMark /> ทำไปทำไม
    </ButtonLink>
  );
}
