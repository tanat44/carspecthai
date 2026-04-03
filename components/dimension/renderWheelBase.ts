import Konva from "konva";
import { REF_RENDER_STYLE } from "./consts";

const RADIUS = 20;

export function renderWheelBase(
  ref: HTMLDivElement,
  wheelbase: number,
  referenceWheelbase: number,
) {
  const stage = new Konva.Stage({
    container: ref,
    width: Math.max(wheelbase, referenceWheelbase) + RADIUS * 2,
    height: RADIUS * 2.2,
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  // front wheel
  const frontWheel = new Konva.Circle({
    x: RADIUS,
    y: RADIUS,
    stroke: "black",
    opacity: 1,
    radius: RADIUS,
  });
  layer.add(frontWheel);

  // rear wheel
  const rearWheel = new Konva.Circle({
    x: RADIUS + wheelbase,
    y: RADIUS,
    stroke: "black",
    opacity: 1,
    radius: RADIUS,
  });
  layer.add(rearWheel);

  //ref rear wheel
  if (wheelbase !== referenceWheelbase) {
    const frontWheel = new Konva.Circle({
      x: RADIUS + referenceWheelbase,
      y: RADIUS,
      radius: RADIUS,
      ...REF_RENDER_STYLE,
    });
    layer.add(frontWheel);
  }
}
