import Konva from "konva";
import { REF_RENDER_STYLE, STAGE_PAD, THIS_RENDER_STYLE } from "./consts";

const RADIUS = 20;

export function renderWheelBase(
  ref: HTMLDivElement,
  wheelbase: number,
  referenceWheelbase: number,
  floorHeight: number,
  referenceFloorHeight: number,
) {
  const stage = new Konva.Stage({
    container: ref,
    width: Math.max(wheelbase, referenceWheelbase) + RADIUS * 2 + 2 * STAGE_PAD,
    height: RADIUS * 2.2 + 2 * STAGE_PAD,
    offset: { x: -STAGE_PAD, y: -STAGE_PAD },
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  // ref chassis
  if (floorHeight !== referenceFloorHeight) {
    const refChassis = new Konva.Line({
      points: [
        -STAGE_PAD,
        referenceFloorHeight + STAGE_PAD,
        stage.width(),
        referenceFloorHeight + STAGE_PAD,
      ],
      ...REF_RENDER_STYLE,
    });
    layer.add(refChassis);
  }

  // chassis
  const chassis = new Konva.Line({
    points: [
      -STAGE_PAD,
      floorHeight + STAGE_PAD,
      stage.width(),
      floorHeight + STAGE_PAD,
    ],
    ...THIS_RENDER_STYLE,
  });
  layer.add(chassis);

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
    ...THIS_RENDER_STYLE,
    radius: RADIUS,
  });
  layer.add(frontWheel);
  const frontWheelCap = new Konva.Circle({
    ...frontWheelCenter,
    fill: "white",
    radius: RADIUS - 1,
  });
  layer.add(frontWheelCap);

  // rear wheel
  const rearWheelCenter = {
    x: RADIUS + wheelbase,
    y: RADIUS,
  };
  const rearWheel = new Konva.Circle({
    ...rearWheelCenter,
    ...THIS_RENDER_STYLE,
    radius: RADIUS,
  });
  layer.add(rearWheel);
  const rearWheelCap = new Konva.Circle({
    ...rearWheelCenter,
    fill: "white",
    radius: RADIUS - 1,
  });
  layer.add(rearWheelCap);
}
