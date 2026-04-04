"use client";

import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { METRIC_TYPES, MetricType } from "@/lib/Metric/types";

export function RankingLinks() {
  return (
    <Card className="py-0 mt-5">
      <NavigationMenu className="px-4">
        <div className="pr-5">จัดอันดับตาม</div>
        <NavigationMenuList className="">
          <NavigationMenuItem className="">
            {Object.keys(METRIC_TYPES).map((metric) => (
              <NavigationMenuLink
                key={metric}
                className={`${navigationMenuTriggerStyle()}`}
                href={`/ranking/${metric}`}
              >
                {METRIC_TYPES[metric as MetricType]}
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
}
