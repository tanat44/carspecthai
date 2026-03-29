import { Car } from "./Car";
import { UNDEFINED_NAME } from "./consts";
import { Spec } from "./Spec";

export class Trim {
  name: string = UNDEFINED_NAME;
  car?: Car = undefined;
  spec?: Spec;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parse(data: any, car: Car): Trim {
    const trim = new Trim();
    trim.name = data.name;
    trim.car = car;
    trim.spec = Spec.parse(data);
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

  get priceText() {
    return this.spec?.priceText ?? this.car?.spec?.priceText;
  }

  get engine() {
    return this.spec?.engine ?? this.car?.spec?.engine;
  }

  get options() {
    return this.spec?.options ?? this.car?.spec?.options;
  }

  get performance() {
    return this.spec?.performance ?? this.car?.spec?.performance;
  }

  get physical() {
    return this.spec?.physical ?? this.car?.spec?.physical;
  }

  get price() {
    return this.spec?.price ?? this.car?.spec?.price;
  }

  get releaseDate() {
    console.log(123, this.name, this.car);
    return this.spec?.releaseDate ?? this.car?.spec?.releaseDate;
  }
}
