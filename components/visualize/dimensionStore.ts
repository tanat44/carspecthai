import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { create } from "zustand";

interface State {
  frontViewRef: Layer | undefined;
  sideViewRef: Layer | undefined;
  selectedCar: string | undefined;
  setFrontViewRef: (ref: Layer) => void;
  setSideViewRef: (ref: Layer) => void;
  selectCar: (car: string) => void;
}

export const useDimensionStore = create<State>((set) => ({
  frontViewRef: undefined,
  sideViewRef: undefined,
  selectedCar: undefined,
  setFrontViewRef: (ref) => set(() => ({ frontViewRef: ref })),
  setSideViewRef: (ref) => set(() => ({ sideViewRef: ref })),
  selectCar: (car) =>
    set((state) => {
      const front = (state.frontViewRef?.children.length ?? 0) - 1;
      const back = 0;

      // remove color of old selection
      const oldCar = state.selectedCar;
      if (oldCar !== undefined) {
        const frontLine = state.frontViewRef?.findOne(
          `#${oldCar}`,
        ) as Konva.Line;
        frontLine?.stroke("black");
        frontLine?.zIndex(back);
        const sideLine = state.sideViewRef?.findOne(`#${oldCar}`) as Konva.Line;
        sideLine?.stroke("black");
        sideLine?.zIndex(back);
      }

      // set color of new selection
      const frontLine = state.frontViewRef?.findOne(`#${car}`) as Konva.Line;
      frontLine?.stroke("red");
      frontLine.zIndex(front);
      const sideLine = state.sideViewRef?.findOne(`#${car}`) as Konva.Line;
      sideLine?.stroke("red");
      sideLine.zIndex(front);
      return { selectedCar: car };
    }),
}));
