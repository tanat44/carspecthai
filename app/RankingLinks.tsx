"use client";

import { LinkItem, RowLinks } from "@/components/RowLinks";
import { METRIC_TYPES } from "@/lib/Metric/types";

export function RankingLinks() {
  const links: LinkItem[] = Object.entries(METRIC_TYPES).map(
    ([key, value]) => ({ name: value, href: `/ranking/${key}` }),
  );

  return <RowLinks links={links} title="จัดอันดับรุ่นรถตาม" />;
}
