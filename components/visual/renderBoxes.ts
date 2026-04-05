import { Dimension } from "@/lib/types";
import { minMax } from "@/lib/utils";
import { VisualData } from "@/lib/Visual/types";
import Konva from "konva";

const SCALE = 0.15;
const PAD = 1;

export function renderDimensions(
  ref: HTMLDivElement,
  data: VisualData<Dimension>[],
  widthAccessor: (trimData: VisualData<Dimension>) => number | undefined,
) {
  const { min: minWidth, max: maxWidth } = minMax(data, widthAccessor);
  const { min: minHeight, max: maxHeight } = minMax(
    data,
    (item) => item?.data?.height,
  );
  const stage = new Konva.Stage({
    container: ref,
    width: maxWidth * SCALE + 2 * PAD,
    height: maxHeight * SCALE + 2 * PAD,
    offset: { x: -PAD, y: -maxHeight * SCALE - PAD },
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  for (const trimData of data) {
    const w = (widthAccessor(trimData) ?? 0) * SCALE;
    const h = (trimData.data?.height ?? 0) * SCALE;
    const points: number[] = [0, 0, w, 0, w, -h, 0, -h, 0, 0];

    const line = new Konva.Line({
      points,
      stroke: "black",
      strokeWidth: 2,
      hitStrokeWidth: 2,
    });
    line.on("mouseover", (line) => {
      console.log(line);
      console.log(trimData.carFullname);
    });
    layer.add(line);

    const text = new Konva.Text({
      text: trimData.carFullname,
      x: 0,
      y: -h,
      width: w,
      align: "center",
      fontSize: 14,
    });
    layer.add(text);
  }
}
