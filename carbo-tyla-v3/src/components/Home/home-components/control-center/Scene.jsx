import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Spyder from "./Spyder";

const Scene = ({ color }) => {
  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false}/>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 5, 2]} intensity={1} />
      
      <Spyder spyderColor={color}/>
    </>
  );
};

export default Scene;