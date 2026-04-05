"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export type LinkItem = {
  name: string;
  href: string;
};

type Props = {
  title: string;
  className?: string;
  links: LinkItem[];
};

export function RowLinks({ title, className, links }: Props) {
  return (
    <Card className={`mt-5 p-2 px-0 ${className}`}>
      <CardContent>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <div className="font-bold inline-flex pl-2 pr-2">{title}</div>
              {links.map((link) => (
                <NavigationMenuLink
                  key={link.name}
                  className={`${navigationMenuTriggerStyle()} font-normal py-0`}
                  href={link.href}
                >
                  {link.name}
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </CardContent>
    </Card>
  );
}
