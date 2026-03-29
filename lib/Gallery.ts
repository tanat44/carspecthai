export type Gallery = {
  manufactures: GalleryManufacture[];
};

export type GalleryManufacture = {
  name: string;
  cars: GalleryCar[];
};

export type GalleryCar = {
  name: string;
  slug: string;
  trims: GalleryTrim[];
  releaseYear: number;
};

export type GalleryTrim = {
  name: string;
  slug: string;
  price: string;
};
