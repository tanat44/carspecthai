"use client";

import { GroupItem, TopMenu } from "@/components/TopMenu";

const groups: GroupItem[] = [
  {
    name: "all",
    links: [
      {
        name: "มิติตัวถัง",
        href: `/visual`,
      },
    ],
  },
];

export function VisualizeMenu() {
  return <TopMenu groups={groups} title="Visualize" />;
}
