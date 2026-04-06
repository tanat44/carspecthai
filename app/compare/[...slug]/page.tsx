import { CompareTable } from "@/app/compare/[...slug]/CompareTable";
import { CarLibrary } from "@/lib/CarLibrary";
import { MAX_COMPARE_COUNT } from "@/lib/consts";
import { METRIC_TYPES } from "@/lib/Metric/types";
import { baseAssetPath, pathToQueryTrims } from "@/lib/utils";
import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import { ComparePageProps } from "./types";
import { recursiveModelGenerator } from "./utils";

export default async function Page({
  params,
}: {
  params: Promise<ComparePageProps>;
}) {
  // parse slug into compare trims
  const { slug: queryModels } = await params;
  if (!queryModels) redirect("/", RedirectType.push);
  console.debug("query", queryModels);

  // find trims
  const library = await CarLibrary.instance();
  const plainCars: object[] = [];
  for (const model of queryModels) {
    const car = library.findCar(model);
    if (car?.original) plainCars.push(car.original);
  }

  return (
    <Suspense>
      <CompareTable
        gallery={library.gallery}
        queryModels={queryModels}
        plainCars={plainCars}
      />
    </Suspense>
  );
}

export async function generateStaticParams() {
  // for testing ssg buiid
  // return [{ slug: ["asdf", "1234"] }];

  const lib = await CarLibrary.instance();
  const props: ComparePageProps[] = [];

  // generate ModelTrim
  const modelSlugs: string[] = [];
  lib.allCars.forEach((car) => {
    modelSlugs.push(car.slug);
  });
  recursiveModelGenerator([], modelSlugs, MAX_COMPARE_COUNT, props);

  return props;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ComparePageProps>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug?.join("/") ?? "";
  const queryTrims = pathToQueryTrims(path);
  const lib = await CarLibrary.instance();
  const trims = queryTrims
    .map((query) => lib.findTrim(query.modelSlug, query.trimSlug))
    .filter((trim) => trim !== undefined);

  // add metadata
  let title = "เปรียบเทียบ ";
  const keywords: string[] = [];
  const imageLinks: string[] = [];
  const manufactures = new Set<string>();
  for (let i = 0; i < trims.length; ++i) {
    const trim = trims[i];
    keywords.push(trim.fullName);
    title += trim.fullName;
    if (i < trims.length - 1) title += " vs ";
    imageLinks.push(`${baseAssetPath()}/cars/photos/${trim.car?.slug}.png`);
    manufactures.add(trim.car?.manufacture ?? "");
  }

  // post processing
  keywords.map((keyword) => "สเปก" + keyword);
  keywords.unshift(title);
  keywords.push(...Array.from(manufactures), ...Object.keys(METRIC_TYPES));
  const description = `${keywords[0]} ราคา มิติตัวถัง ความสูงใต้ท้อง ปริมาตรห้องโดยสาร อัตราเร่ง0-100 ระยะทางต่อการชาร์จ WLTP`;

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    keywords,
    openGraph: {
      images: imageLinks,
    },
  };
}
