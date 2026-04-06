"use client";

import Link from "next/link";
import {
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";

export type LinkMenu = {
  name: string;
  href: string;
};

export type GroupMenu = {
  name: string;
  links: LinkMenu[];
};

type Props = {
  title: string;
  groups: GroupMenu[];
};

export function TopMenu({ title, groups }: Props) {
  return (
    <MenubarMenu>
      <MenubarTrigger>{title}</MenubarTrigger>
      <MenubarContent className="w-44">
        {groups.map((group, index) => (
          <div key={group.name}>
            <MenubarGroup>
              {group.links.map((link) => (
                <MenubarItem key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </MenubarItem>
              ))}
            </MenubarGroup>
            {index !== groups.length - 1 && <MenubarSeparator />}
          </div>
        ))}
      </MenubarContent>
    </MenubarMenu>
  );
}
