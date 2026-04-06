import { Visualization } from "@/components/visualize/Visualization";
import { CarLibrary } from "@/lib/CarLibrary";
import { getDimension } from "@/lib/Visual/getVisual";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

export default async function Page({ params }: { params: Promise<Props> }) {
  const library = await CarLibrary.instance();

  return (
    <>
      <Visualization gallery={library.gallery} data={getDimension(library)} />
    </>
  );
}
