import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

const Spyder = ({ spyderColor }) => {
  const rawGeometry = useLoader(STLLoader, "./pauk.stl"); 

  const geometry = useMemo(() => {
    rawGeometry.center();
    return rawGeometry;
  }, [rawGeometry]);

  return (
    <mesh geometry={geometry} scale={0.017} > 
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default Spyder;
