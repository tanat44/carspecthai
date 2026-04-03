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

  //ref rear wheel
  if (wheelbase !== referenceWheelbase) {
    const refRear = new Konva.Circle({
      x: RADIUS + referenceWheelbase,
      y: RADIUS,
      radius: RADIUS,
      ...REF_RENDER_STYLE,
    });
    layer.add(refRear);
  }
  // front wheel
  const frontWheelCenter = {
    x: RADIUS,
    y: RADIUS,
  };
  const frontWheel = new Konva.Circle({
    ...frontWheelCenter,
    stroke: "black",
    opacity: 1,
    radius: RADIUS,
  });
  layer.add(frontWheel);

  // rear wheel
  const rearWheelCenter = {
    x: RADIUS + wheelbase,
    y: RADIUS,
  };
  const rearWheel = new Konva.Circle({
    ...rearWheelCenter,
    stroke: "black",
    opacity: 1,
    radius: RADIUS,
  });
  layer.add(rearWheel);

  // chassis line
  const chassis = new Konva.Line({
    points: [RADIUS * 2, RADIUS, wheelbase, RADIUS],
    stroke: "black",
    opacity: 0.7,
  });
  layer.add(chassis);
}
