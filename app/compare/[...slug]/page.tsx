import { Car } from "@/lib/Car";
import { getAllCarFiles } from "@/lib/utils";
import { TableDemo } from "@/src/TableDemo";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: carNames } = await params;
  const carFiles = await getAllCarFiles();

  // get detail spec of requested cars
  const carsPromises: Promise<Car>[] = [];
  carNames.forEach((name) => {
    const file = carFiles.get(name);
    if (file) {
      carsPromises.push(Car.readYml(file));
    }
  });
  const cars = await Promise.all(carsPromises);

  return (
    <>
      <TableDemo />
    </>
  );
}
