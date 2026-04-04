import { promises as fs } from "fs";
import path from "path";
import { parse } from "yaml";
import { UNDEFINED_NAME } from "./consts";
import { GalleryCar } from "./Gallery";
import { Spec } from "./Spec";
import { Trim } from "./Trim";
import { readYmlVariable } from "./utils";

const THIS_YEAR = new Date().getFullYear();

export class Car {
  slug: string = UNDEFINED_NAME;
  name: string = UNDEFINED_NAME;
  manufacture: string = "";
  spec?: Spec;
  trims: Map<string, Trim> = new Map();
  original?: object;

  static async readYml(filePath: string): Promise<Car> {
    // fetch variable files
    const variableText = await readYmlVariable();

    // fetch this car spec and parse yml
    try {
      const text = (await fs.readFile(filePath)).toString();
      const data = parse(variableText + "\n" + text, { merge: true });
      data.slug = path.parse(filePath).name;
      return Car.parse(data);
    } catch (err) {
      console.error("error reading", filePath, err);
      throw err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parse(data: any): Car {
    const car = new Car();
    car.slug = data.slug;
    car.name = data.name;
    car.manufacture = data.manufacture;
    car.spec = Spec.parse(data);
    car.original = data;

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

  get galleryCar(): GalleryCar {
    return {
      name: this.name,
      slug: this.slug,
      releaseYear: this.spec?.releaseDate
        ? new Date(this.spec.releaseDate).getFullYear()
        : Infinity,
      trims: Array.from(this.trims.values()).map((trim) => trim.galleryTrim),
    };
  }
}
