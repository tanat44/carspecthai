import { Visualization } from "@/components/visual/Visualization";
import { CarLibrary } from "@/lib/CarLibrary";
import { getDimension } from "@/lib/Visual/getVisual";

type Props = {};

export default async function Page({ params }: { params: Promise<Props> }) {
  const library = await CarLibrary.instance();

  return (
    <>
      <Visualization gallery={library.gallery} data={getDimension(library)} />
    </>
  );
}
