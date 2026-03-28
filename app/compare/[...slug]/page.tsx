import { TableDemo } from "@/src/TableDemo";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: carIds } = await params;
  console.log(carIds);
  return (
    <>
      <TableDemo />
    </>
  );
}
