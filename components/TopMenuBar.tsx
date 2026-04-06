import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MessageCircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { RankingMenu } from "./metric/RankingMenu";
import { VisualizeMenu } from "./visualize/VisualizeMenu";

export function TopMenuBar() {
  return (
    <div className="flex flex-row">
      <Menubar className="w-full sm:w-fit">
        <RankingMenu />
        <VisualizeMenu />
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/about" className="flex flex-row gap-1">
              ทำไปทำไม
              <MessageCircleQuestionMark size={16} className="ml-2" />
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
