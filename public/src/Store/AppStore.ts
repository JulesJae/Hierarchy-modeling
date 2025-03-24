import { create } from "zustand";
import Mesh from "../Core/Mesh/Mesh";


type AppState = {
  //state
  mesh: Mesh | null,
  gl?: WebGLRenderingContext,

  //actions
  updateMesh: (mesh: Mesh) => void,
  updateGl: (gl: WebGLRenderingContext) => void,

}

const useAppStore = create<AppState>((set) => ({
  mesh:  null,
  gl: undefined,

  updateMesh: (mesh) => set({ mesh: mesh }),
  updateGl: (gl) => set({ gl: gl }),
}));

export default useAppStore;
