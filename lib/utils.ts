import { clsx, type ClassValue } from "clsx";
import { promises as fs } from "fs";
import path from "path";
import { twMerge } from "tailwind-merge";
import { parse } from "yaml";
import { YmlFile } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAllCarFiles(): Promise<Map<string, YmlFile>> {
  const prefix = [process.cwd(), "data", "cars"];
  const dir = path.join(...prefix);
  const files = await fs.readdir(dir, {
    withFileTypes: true,
    recursive: false,
  });
  const output = new Map<string, YmlFile>();
  files.forEach((file) => {
    if (file.isDirectory()) return;

    const name = file.name.replace(".yml", "");
    output.set(name, {
      name,
      path: path.join(...prefix, file.name),
    });
  });
  return output;
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
