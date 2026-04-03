import { Size } from "@base-ui/react";
import { Car } from "./Car";
import { DRAW_SCALE, UNDEFINED_NAME } from "./consts";
import { GalleryTrim } from "./Gallery";
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static parsePlain(data: any): Trim {
    const trim = new Trim();
    trim.name = data.name;
    trim.car = Car.parse(data.car);
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

  get canvasFrontSize(): Size {
    return {
      width: (this.physical?.width ?? 0) * DRAW_SCALE,
      height: (this.physical?.height ?? 0) * DRAW_SCALE,
    };
  }

  get canvasSideSize(): Size {
    return {
      width: (this.physical?.length ?? 0) * DRAW_SCALE,
      height: (this.physical?.height ?? 0) * DRAW_SCALE,
    };
  }

  get fullName(): string {
    return `${this.car?.name} ${this.name}`;
  }

  get priceText() {
    return this.spec?.priceText ?? this.car?.spec?.priceText;
  }

  get engineText(): string | undefined {
    const fuelType = this.engine?.fuelType;
    let output = "";
    if (fuelType === "gasoline") output += "เครื่องยนต์เบนซิน";
    else if (fuelType === "diesel") output += "เครื่องยนต์ดีเซล";
    else if (fuelType === "electric") output += "ไฟฟ้า";

    if (this.engine?.hybrid) output += "ไฮบริด";

    return output === "" ? undefined : output;
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
    return this.spec?.releaseDate ?? this.car?.spec?.releaseDate;
  }

  get galleryTrim(): GalleryTrim {
    return {
      name: this.name,
      slug: this.slug,
      price: this.priceText ?? "-",
    };
  }
}
