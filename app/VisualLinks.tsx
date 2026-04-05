"use client";

import { LinkItem, RowLinks } from "@/components/RowLinks";

export function VisualLinks() {
  const links: LinkItem[] = [
    {
      name: "มิติตัวถัง",
      href: "/visual",
    },
  ];

  return <RowLinks links={links} title="Visualize" />;
}
