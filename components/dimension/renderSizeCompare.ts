import { Size } from "@base-ui/react";
import Konva from "konva";
import { REF_RENDER_STYLE, STAGE_PAD, THIS_RENDER_STYLE } from "./consts";

export function renderSizeCompare(
  ref: HTMLDivElement,
  size: Size,
  referenceSize: Size,
  showReference: boolean,
) {
  const stageHeight = Math.max(size.height, referenceSize.height);
  const stage = new Konva.Stage({
    container: ref,
    width: Math.max(size.width, referenceSize.width) + 2 * STAGE_PAD,
    height: stageHeight + 2 * STAGE_PAD,
    offset: { x: -STAGE_PAD, y: -STAGE_PAD },
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  if (showReference) {
    const refDrawing = new Konva.Rect({
      x: 0,
      y: stageHeight - referenceSize.height,
      ...referenceSize,
      ...REF_RENDER_STYLE,
    });
    layer.add(refDrawing);
  }

  // draw front
  const front = new Konva.Rect({
    x: 0,
    y: stageHeight - size.height,
    ...size,
    ...THIS_RENDER_STYLE,
  });
  layer.add(front);
}
