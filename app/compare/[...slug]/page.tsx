import { CompareTable } from "@/app/compare/[...slug]/CompareTable";
import { CarLibrary } from "@/lib/CarLibrary";
import { MAX_COMPARE_COUNT } from "@/lib/consts";
import { METRIC_TYPES } from "@/lib/Metric/types";
import { ModelTrimSlug } from "@/lib/types";
import { baseAssetPath, slugToQueryTrims } from "@/lib/utils";
import { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { Slug } from "./types";

type Props = {
  slug?: Slug;
};

export default async function Page({ params }: { params: Promise<Props> }) {
  // parse slug into compare trims
  const { slug } = await params;
  if (!slug || slug.length % 2 !== 0) redirect("/", RedirectType.push);
  const queryTrimSlugs: ModelTrimSlug[] = slugToQueryTrims(slug);
  const queryModels = new Set<string>();
  queryTrimSlugs.forEach((trim) => queryModels.add(trim.modelSlug));
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
    Array.from(car.trims.values()).forEach((trim) => {
      modelTrims.push({ modelSlug: car.slug, trimSlug: trim.slug });
    });
  });
  recursivePropsGenerator([], modelTrims, MAX_COMPARE_COUNT, props);

  return props;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Props>;
}): Promise<Metadata> {
  const { slug } = await params;
  const queryTrims = slugToQueryTrims(slug as string[]);
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
