import { Size } from "@base-ui/react";
import Konva from "konva";
import { REF_RENDER_STYLE } from "./consts";

export function renderSizeCompare(
  ref: HTMLDivElement,
  size: Size,
  referenceSize: Size,
  showReference: boolean,
) {
  const stage = new Konva.Stage({
    container: ref,
    width: Math.max(size.width, referenceSize.width),
    height: Math.max(referenceSize.height, referenceSize.height),
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  if (showReference) {
    const refDrawing = new Konva.Rect({
      x: 0,
      y: stage.height() - referenceSize.height,
      ...referenceSize,
      ...REF_RENDER_STYLE,
    });
    layer.add(refDrawing);
  }

  // draw front
  const front = new Konva.Rect({
    x: 0,
    y: stage.height() - size.height,
    ...size,
    fill: "transparent",
    stroke: "black",
    opacity: 1,
  });
  layer.add(front);
}
