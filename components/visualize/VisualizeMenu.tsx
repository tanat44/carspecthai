"use client";

import { GroupMenu, TopMenu } from "@/components/TopMenu";

const groups: GroupMenu[] = [
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
