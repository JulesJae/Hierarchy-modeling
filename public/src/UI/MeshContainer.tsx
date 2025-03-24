import React from 'react';
import useAppStore from '../Store/AppStore';
import SphereGeometry from '../Core/Mesh/SphereGeometry';
import CubeGeometry from '../Core/Mesh/CubeGeometry';

const geometries = {
  "CubeGeometry": SphereGeometry,
  "SphereGeometry": CubeGeometry
}

const MeshContainer: React.FC<any> = ({}) => {

  const { mesh, gl, updateMesh } = useAppStore();
  const changeMeshGeometry = () => {
    const geometryConstructor = geometries[mesh.geometry.getName()];
    if (mesh && geometryConstructor){
      mesh.setGeometry(new geometryConstructor(gl));
    }
  }
  let content = <>None. Click on dedicated robot part.</>

  if (mesh){
    content = <>
     <div>
      <p>geometry: {mesh.geometry.getName()}</p><br/>
      <p>
        <button onClick={changeMeshGeometry}>Change Geometry</button>
      </p>
     </div>
    </>
  }


  return <div className='mesh-container'>
    <h3>Animation availale</h3>
    <ul>
      <li><span className='animation-key'>w</span> <span className='animation-name'>Walk</span></li>
      <li><span className='animation-key'>j</span> <span className='animation-name'>Jump</span></li>
      <li><span className='animation-key'>r</span> <span className='animation-name'>Rest</span></li>
    </ul><br></br>
    <h3>Selected Mesh</h3>
    {content}
  </div>;
}

export default MeshContainer;