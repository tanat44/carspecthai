"use client";

import { Gallery } from "@/lib/Gallery";
import { generateCompareUrl } from "@/lib/utils";
import Link from "next/link";
import {
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";

type Props = {
  gallery: Gallery;
};

export function PairMenu({ gallery }: Props) {
  return (
    <MenubarMenu>
      <MenubarTrigger>จับคู่</MenubarTrigger>
      <MenubarContent className="w-44">
        <MenubarGroup>
          <MenubarItem disabled>เลือกรถคันที่ 1</MenubarItem>
        </MenubarGroup>
        <MenubarSeparator />
        <MenubarGroup>
          {gallery.manufactures.map((man1) => (
            <MenubarSub key={`${man1.name}-first`}>
              <MenubarSubTrigger>{man1.name}</MenubarSubTrigger>
              <MenubarSubContent>
                {man1.cars.map((car1) => (
                  <MenubarSub key={`${car1.name}-second`}>
                    <MenubarSubTrigger>{car1.name}</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarGroup>
                        <MenubarItem disabled>เลือกรถคันที่ 2</MenubarItem>
                      </MenubarGroup>
                      <MenubarSeparator />
                      <MenubarGroup>
                        {gallery.manufactures.map((man2) => (
                          <MenubarSub key={`${man2.name}-second`}>
                            <MenubarSubTrigger>{man2.name}</MenubarSubTrigger>
                            <MenubarSubContent>
                              {man2.cars.map((car2) => (
                                <MenubarItem
                                  key={`${car2.name}-second`}
                                  disabled={car1 === car2}
                                >
                                  <Link
                                    href={generateCompareUrl([
                                      { modelSlug: car1.slug },
                                      { modelSlug: car2.slug },
                                    ])}
                                  >
                                    {car2.name}
                                  </Link>
                                </MenubarItem>
                              ))}
                            </MenubarSubContent>
                          </MenubarSub>
                        ))}
                      </MenubarGroup>
                    </MenubarSubContent>
                  </MenubarSub>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          ))}
        </MenubarGroup>
      </MenubarContent>
    </MenubarMenu>
  );
}
