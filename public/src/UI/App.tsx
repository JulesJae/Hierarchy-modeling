import React from "react";
import Scene3D from "./Scene3D";
import Debug from "./Debug";
import MeshContainer from "./MeshContainer";

const App: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative"}}>
      {/* Moteur Webgl */}
      <Scene3D id="scene"/>
      {/* UI React */}
      {/* <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 10,
        borderRadius: 5
      }}>
        <Debug />
      </div> */}
      <MeshContainer />

    </div>
  )
}

export default App;