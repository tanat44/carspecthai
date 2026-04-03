import { clsx, type ClassValue } from "clsx";
import { promises as fs } from "fs";
import path from "path";
import { twMerge } from "tailwind-merge";
import { parse } from "yaml";

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
  if (Math.floor(price / 1e6) > 0)
    return trimTrailingZero((price / 1e6).toFixed(3)) + " ล้าน";
  return trimTrailingZero((price / 1e5).toFixed(3)) + " แสน";
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
