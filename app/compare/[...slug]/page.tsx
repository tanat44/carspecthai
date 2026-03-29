import { CompareTable } from "@/app/compare/[...slug]/CompareTable";
import { CarLibrary } from "@/lib/CarLibrary";
import { MAX_COMPARE_COUNT } from "@/lib/consts";
import { ModelTrimSlug } from "@/lib/types";
import { redirect, RedirectType } from "next/navigation";
import { Slug } from "./types";

type Props = {
  slug?: Slug;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: Slug }>;
}) {
  // parse slug into compare trims
  const { slug } = await params;
  if (slug.length % 2 !== 0) redirect("/", RedirectType.replace);
  const queryTrimSlugs: ModelTrimSlug[] = [];
  const queryModels = new Set<string>();
  for (let i = 0; i < slug.length; i += 2) {
    const trim: ModelTrimSlug = {
      modelSlug: slug[i],
      trimSlug: slug[i + 1],
    };
    queryTrimSlugs.push(trim);
    queryModels.add(slug[i]);
  }

  console.debug("query", queryTrimSlugs);

  // find trims
  const library = await CarLibrary.instance();
  const plainCars: object[] = [];
  for (const model of queryModels) {
    const car = library.findCar(model);
    if (car?.original) plainCars.push(car.original);
  }

  return (
    <>
      <CompareTable
        gallery={library.gallery}
        queryTrimSlugs={queryTrimSlugs}
        plainCars={plainCars}
      />
    </>
  );
}

function recursivePropsGenerator(
  prevSlug: string[],
  allTrims: ModelTrimSlug[],
  deep: number,
  outputProps: Props[],
) {
  if (deep == 0) return;

  allTrims.forEach((trim) => {
    const modelIndex = prevSlug.indexOf(trim.modelSlug);
    const trimIndex = prevSlug.indexOf(trim.trimSlug);
    if (trimIndex === modelIndex + 1) {
      return;
    }

    const newSlug = [...prevSlug, trim.modelSlug, trim.trimSlug];
    outputProps.push({ slug: newSlug });
    recursivePropsGenerator(newSlug, allTrims, deep - 1, outputProps);
  });
}

export async function generateStaticParams() {
  // for testing ssg buiid
  // return [{ slug: ["asdf", "1234"] }];

  const lib = await CarLibrary.instance();
  const props: Props[] = [];

  // generate ModelTrim
  const modelTrims: ModelTrimSlug[] = [];
  lib.allCars.forEach((car) => {
    car.trims.values().forEach((trim) => {
      modelTrims.push({ modelSlug: car.slug, trimSlug: trim.slug });
    });
  });
  recursivePropsGenerator([], modelTrims, MAX_COMPARE_COUNT, props);

  return props;
}
