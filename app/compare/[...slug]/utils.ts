import { ComparePageProps } from "./types";

export function recursiveModelGenerator(
  prevSlug: string[],
  modelSlugs: string[],
  deep: number,
  outputProps: ComparePageProps[],
) {
  if (deep == 0) return;

  modelSlugs.forEach((modelSlug) => {
    // ignore compare same model
    // const modelIndex = prevSlug.indexOf(modelSlug);
    // if (modelIndex > -1) {
    //   return;
    // }
    const newSlug = [...prevSlug, modelSlug];
    outputProps.push({ slug: newSlug });
    recursiveModelGenerator(newSlug, modelSlugs, deep - 1, outputProps);
  });
}
