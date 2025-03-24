import React, { useEffect, useRef } from 'react';

const WebglCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <canvas id="react-canvas" style={{ width: "100%", height: "100%" }}/>
  )
}

export default WebglCanvas;