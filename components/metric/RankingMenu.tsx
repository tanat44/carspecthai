"use client";

import { GroupMenu, TopMenu } from "@/components/TopMenu";
import { METRIC_TYPES } from "@/lib/Metric/types";

const groups: GroupMenu[] = [
  {
    name: "basic",
    links: [
      {
        name: METRIC_TYPES["price"],
        href: `/ranking/price`,
      },
      {
        name: METRIC_TYPES["accelTo100"],
        href: `/ranking/accelTo100`,
      },
      {
        name: METRIC_TYPES["length"],
        href: `/ranking/length`,
      },
      {
        name: METRIC_TYPES["floorHeight"],
        href: `/ranking/floorHeight`,
      },
      {
        name: METRIC_TYPES["passengerVolume"],
        href: `/ranking/passengerVolume`,
      },
      {
        name: METRIC_TYPES["turningRadius"],
        href: `/ranking/turningRadius`,
      },
    ],
  },
  {
    name: "ev",
    links: [
      {
        name: METRIC_TYPES["range"],
        href: `/ranking/range`,
      },
      {
        name: METRIC_TYPES["battery"],
        href: `/ranking/battery`,
      },
      {
        name: METRIC_TYPES["acCharge"],
        href: `/ranking/dcCharge`,
      },
    ],
  },
  {
    name: "ice",
    links: [
      {
        name: METRIC_TYPES["displacement"],
        href: `/ranking/displacement`,
      },
    ],
  },
];

export function RankingMenu() {
  return <TopMenu groups={groups} title="จัดอันดับรุ่นรถ" />;
}
