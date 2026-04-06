import { clsx, type ClassValue } from "clsx";
import { promises as fs } from "fs";
import path from "path";
import { twMerge } from "tailwind-merge";
import { parse } from "yaml";
import { ModelTrimSlug } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function carYmlDir() {
  return path.join(process.cwd(), "data", "cars");
}

export function carYmlPath(name: string) {
  return path.join(carYmlDir(), `${name}.yml`);
}

export async function getAllCarFilePaths(): Promise<string[]> {
  const dir = carYmlDir();
  const files = await fs.readdir(dir, {
    withFileTypes: true,
    recursive: false,
  });
  const paths: string[] = [];
  files.forEach((file) => {
    if (file.isDirectory() || !file.name.endsWith("yml")) return;
    paths.push(path.join(dir, file.name));
  });
  return paths;
}

export async function readYmlVariable(): Promise<string> {
  const filePath = path.join(process.cwd(), "data", "variables.yml");
  const text = (await fs.readFile(filePath)).toString();
  return text;
}

export async function readYml(path: string): Promise<object> {
  const text = (await fs.readFile(path)).toString();
  const object = parse(text);
  return object;
}

export function trimTrailingZero(text: string): string {
  let out = "";
  for (let i = text.length - 1; i >= 0; --i) {
    if (text.charAt(i) === "0") continue;
    out = text.charAt(i) + out;
  }
  if (out.charAt(out.length - 1) === ".") out = out.slice(0, out.length - 1);
  return out;
}

export function priceToText(price: number): string {
  const absPrice = Math.abs(price);
  if (Math.floor(absPrice / 1e6) > 0)
    return trimTrailingZero((absPrice / 1e6).toFixed(3)) + " ล้าน";
  else if (Math.floor(absPrice / 1e5) > 0)
    return trimTrailingZero((absPrice / 1e5).toFixed(3)) + " แสน";
  else if (Math.floor(absPrice / 1e4) > 0)
    return trimTrailingZero((absPrice / 1e4).toFixed(2)) + " หมื่น";
  return trimTrailingZero((absPrice / 1e3).toFixed(0)) + " พัน";
}

export function numberColorClassName(sign: number) {
  if (sign > 0) return "text-green-400";
  else if (sign < 0) return "text-red-400";
  return "text-black-400";
}

export function baseAssetPath(): string {
  const env = process.env.NODE_ENV;
  if (env == "development") {
    return "";
  }
  return "/data";
}

export function pathToQueryTrims(path: string): ModelTrimSlug[] {
  path = path.replace("/compare", "");
  const parts = path.split("?");
  const models = parts[0].split("/").filter((x) => x !== "");
  const search = new URLSearchParams(parts[1]);

  const output: ModelTrimSlug[] = [];
  for (let i = 0; i < models.length; i += 1) {
    const trim: ModelTrimSlug = {
      modelSlug: models[i],
      trimSlug: search.get(i.toString()) ?? undefined,
    };
    output.push(trim);
  }
  return output;
}

export function sortUndefined(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[],
  sortKey: string,
  reverse: boolean = false,
) {
  const output = [...data];
  const multiply = reverse ? -1 : 1;
  output.sort((a, b) => {
    if (!(sortKey in a) || !(sortKey in b)) return -Infinity;
    return multiply * (b[sortKey] - a[sortKey]);
  });
  return output;
}

export function minMax<T>(
  data: T[],
  accessor: (item: T) => number | undefined,
) {
  let min = Infinity;
  let max = -Infinity;
  data.forEach((item) => {
    const value = accessor(item);
    if (!value) return;
    if (value > max) max = value;
    if (value < min) min = value;
  });
  return { min, max };
}

export function generateCompareUrl(query: ModelTrimSlug[]) {
  let output: string = "/compare";
  let searchParam: string = "?";

  for (let i = 0; i < query.length; ++i) {
    output += `/${query[i].modelSlug}`;

    const trim = query[i].trimSlug;
    if (trim) searchParam += `${i}=${trim}&`;
  }
  return output + searchParam;
}
