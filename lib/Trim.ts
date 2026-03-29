import { UNDEFINED_NAME } from "./consts";
import { Options } from "./types";

export class Trim {
  name: string = UNDEFINED_NAME;
  price: number = 0;
  options?: Options;

  get priceText(): string {
    if (Math.floor(this.price / 1e6) > 0)
      return (this.price / 1e6).toFixed(3) + "ล้าน";
    return (this.price / 1e5).toFixed(3) + "แสน";
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parse(data: any): Trim {
    const trim = new Trim();
    trim.name = data.name;
    trim.price = data.price;
    trim.options = data.options;
    return trim;
  }

  get slug(): string {
    const slug = this.name
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
      .trim() // Trim spaces
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .slice(0, 50); // Limit to 50 characters
    return slug;
  }
}
