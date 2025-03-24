import { create } from "zustand";

export type Point = {
  x: number,
  y: number,
  z: number
}

type DebugState = {
  //state
  fps: number,
  cameraPosition: Point,
  pickingId: number,

  //actions
  updateFps: (fps: number) => void,
  updateCameraPosition: (point: Point) => void,
  updatePickingId: (id: number) => void
}

const useDebugStore = create<DebugState>((set) => ({
  fps: 0,
  cameraPosition: { x: 0, y: 0, z: 0 },
  pickingId: -1,

  updateFps: (fps) => set({ fps }),
  updateCameraPosition: (point) => set({ cameraPosition: point }),
  updatePickingId: (id) => set({ pickingId: id }),
}));

export default useDebugStore;
