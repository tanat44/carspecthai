import { TableDemo } from "@/components/TableDemo";
import { CarLibrary } from "@/lib/CarLibrary";
import { getAllCarFiles } from "@/lib/utils";

type Slug = string[];

type Props = {
  slug?: Slug;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: Slug }>;
}) {
  const { slug } = await params;
  console.log(slug);
  // const carFiles = await getAllCarFiles();

  // // get detail spec of requested cars
  // const carsPromises: Promise<Car>[] = [];
  // carNames.forEach((name) => {
  //   const file = carFiles.get(name);
  //   if (file) {
  //     carsPromises.push(Car.readYml(file));
  //   }
  // });
  // const cars = await Promise.all(carsPromises);

  return (
    <>
      <TableDemo />
    </>
  );
}

export async function generateStaticParams() {
  // for testing ssg buiid
  // return [{ slug: ["asdf", "1234"] }];

  const files = await getAllCarFiles();
  const lib = await CarLibrary.load(files);
  const slugs: Props[] = [];
  const cars = lib.allCars;
  cars.forEach((car) => {
    car.trims.values().forEach((trim) => {
      slugs.push({ slug: [car.filename, trim.slug] });
    });
  });
  return slugs;
}
