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

export type LinkItem = {
  name: string;
  href: string;
};

export type GroupItem = {
  name: string;
  links: LinkItem[];
};

type Props = {
  title: string;
  groups: GroupItem[];
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
