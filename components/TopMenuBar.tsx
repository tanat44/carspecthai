import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Gallery } from "@/lib/Gallery";
import { MessageCircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { RankingMenu } from "./metric/RankingMenu";
import { PairMenu } from "./pair/PairMenu";
import { VisualizeMenu } from "./visualize/VisualizeMenu";

type Props = {
  gallery: Gallery;
};

export function TopMenuBar({ gallery }: Props) {
  return (
    <div className="flex flex-row">
      <Menubar className="w-full sm:w-fit">
        <RankingMenu />
        <PairMenu gallery={gallery} />
        <VisualizeMenu />
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/about" className="flex flex-row">
              ทำไปทำไม
              <MessageCircleQuestionMark size={16} className="ml-1" />
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
