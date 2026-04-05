export type VisualData<T> = {
  carFullname: string;
  trim: {
    carSlug: string;
    slug: string;
  };
  data?: T;
};
