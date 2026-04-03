import { Engine, Options, Physical } from "./types";
import { priceToText } from "./utils";

const THIS_YEAR = new Date().getFullYear();

export class Spec {
  engine?: Engine;
  options?: Options;
  performance?: Performance;
  physical?: Physical;
  price?: number = undefined;
  releaseDate?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parse(data: any): Spec {
    const spec = new Spec();
    spec.engine = data.engine;
    spec.options = data.options;
    spec.performance = data.performance;
    spec.physical = data.physical;
    spec.price = data.price;
    spec.releaseDate = new String(data.releaseDate).toString();
    return spec;
  }

  get yearsOld(): number {
    if (!this.releaseDate) return Infinity;

    const releaseYear = new Date(this.releaseDate).getFullYear();
    return THIS_YEAR - releaseYear;
  }

  get priceText(): string {
    if (!this.price) return "-";
    return priceToText(this.price);
  }
}
