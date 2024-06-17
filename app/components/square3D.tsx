
import { useEffect, useRef } from "react";
import { Mesh } from "three";

export default function Square3D({ color, position }: { color: string, position: [number, number, number]}) {
  const meshRef = useRef<Mesh>(null);
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.receiveShadow = true;
    }
  }, []);
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2,0.4,2]}/>
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
