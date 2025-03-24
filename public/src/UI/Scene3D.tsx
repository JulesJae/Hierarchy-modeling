import React, { useEffect, useRef} from "react";
import WebGLViewer from "../WebGLViewer";
import useDebugStore, { Point } from "../Store/DebugStore";
import appStore from "../Store/AppStore";
import Mesh from "../Core/Mesh/Mesh";

const handleFps = (fps: number) => {
  useDebugStore.getState().updateFps(fps);
}

const handleCameraPosition = (position: Point) => {
  useDebugStore.getState().updateCameraPosition(position);
}

const handlePickingId = (id: number) => {
  useDebugStore.getState().updatePickingId(id);
}

const handleSelection = (mesh: Mesh) => {
  appStore.getState().updateMesh(mesh);

}

const Scene3D: React.FC<any> = ({ id }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webGLViewerRef = useRef<WebGLViewer>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const webGLViewer = new WebGLViewer(`#${canvas?.id}` as string);

    appStore.getState().updateGl(webGLViewer.getContext());

    webGLViewer.addEventListener("fps", handleFps);
    webGLViewer.addEventListener("pickingId", handlePickingId);
    webGLViewer.addEventListener("selection", handleSelection);
    webGLViewer.camera.addEventListener("cameraPosition", handleCameraPosition);

    webGLViewerRef.current = webGLViewer;

    const animate = (t: number) => {
      webGLViewer.render(t);
      requestAnimationFrame(animate);
    }

    // requestAnimationFrame(animate);

    //nettoyage in fine
    return () => { }
  }, []);

  return <canvas ref={canvasRef} id={id} style={{ width: "100%", height: "100%" }} />

}

export default Scene3D;