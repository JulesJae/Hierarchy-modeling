import React from "react";
import useDebugStore from "../Store/DebugStore";

const Debug: React.FC<any> = ({  }) => {

  const { fps, cameraPosition, pickingId } = useDebugStore();
  
  return (
    <div className="debug-container">
      <p>FPS: {fps}</p>
      <p>Camera Position: x: { cameraPosition.x } y: { cameraPosition.y } z: { cameraPosition.z }</p>
      <p>PickingId: x: {pickingId}</p>
    </div>
  )
};

export default Debug;