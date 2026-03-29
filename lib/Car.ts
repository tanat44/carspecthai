import { promises as fs } from "fs";
import { parse } from "yaml";
import { UNDEFINED_NAME } from "./consts";
import { Spec } from "./Spec";
import { Trim } from "./Trim";
import { YmlFile } from "./types";
import { readYmlVariable } from "./utils";

const THIS_YEAR = new Date().getFullYear();

export class Car {
  filename: string = "";
  name: string = UNDEFINED_NAME;
  manufacture: string = "";
  spec?: Spec;
  trims: Map<string, Trim> = new Map();

  static async readYml(file: YmlFile): Promise<Car> {
    // fetch variable files
    const variableText = await readYmlVariable();

    // fetch this car spec and parse yml
    const text = (await fs.readFile(file.path)).toString();
    const data = parse(variableText + "\n" + text);

    const car = new Car();
    car.filename = file.name;
    car.name = data.name;
    car.manufacture = data.manufacture;
    car.spec = Spec.parse(data);

    // parse trims
    const trims = new Map();
    for (const trimData of data.trims) {
      const trim = Trim.parse(trimData, car);
      trims.set(trim.slug, trim);
    }
    car.trims = trims;

    return car;
  }

  get yearsOld(): number {
    if (!this?.spec?.releaseDate) return Infinity;

    const releaseYear = new Date(this.spec.releaseDate).getFullYear();
    return THIS_YEAR - releaseYear;
  }
}
