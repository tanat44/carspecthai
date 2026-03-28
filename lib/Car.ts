import { promises as fs } from "fs";
import { parse } from "yaml";
import { Trim } from "./Trim";
import { Engine, Physical, YmlFile } from "./types";
import { readYmlVariable } from "./utils";

const THIS_YEAR = new Date().getFullYear();

export class Car {
  filename: string = "";
  name?: string;
  manufacture: string = "";
  releaseDate?: string;
  physical?: Physical;
  engine?: Engine;
  performance?: Performance;
  trims: Map<string, Trim> = new Map();

  static async readYml(file: YmlFile): Promise<Car> {
    // fetch variable files
    const variableText = await readYmlVariable();

    // fetch this car spec and parse yml
    const text = (await fs.readFile(file.path)).toString();
    const object = parse(variableText + "\n" + text);

    const car = new Car();
    car.filename = file.name;
    car.name = object.name;
    car.manufacture = object.manufacture;
    car.releaseDate = new String(object.releaseDate).toString();
    car.physical = object.physical;
    car.engine = object.engine;
    car.performance = object.performance;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    car.trims = object?.trims.map((trim: any) => Trim.parse(trim));
    return car;
  }

  get yearsOld(): number {
    if (!this.releaseDate) return Infinity;

    const releaseYear = new Date(this.releaseDate).getFullYear();
    return THIS_YEAR - releaseYear;
  }

  priceText(trimName: string): string {
    const trim = this.trims.get(trimName);
    if (!trim) return "-";

    return trim.priceText;
  }
}
