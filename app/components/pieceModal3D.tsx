
import { useEffect, useMemo, useRef } from "react";
import { Piece } from "../lib/piece";
import { Mesh, MeshStandardMaterial } from "three";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { Color } from "../lib/player";

export default function PieceModal3D ({piece, position}: {piece: Piece, position: [number, number, number]}) {
  const pieceModalRef = useRef<Mesh>(null);  
  const {scene} = useGLTF(piece.modelPath);
  const clone = useMemo(() => {
    const clonedScene = SkeletonUtils.clone(scene);
    if (piece.color === Color.WHITE) {
      clonedScene.traverse((object) => {
        if ((object as Mesh).isMesh) {
          (object as Mesh).material = new MeshStandardMaterial({ color: "#c0c2c1" });
        }
      });
    }
    return clonedScene;
  }, [scene, piece.color]);

  useEffect(() => {
    if (pieceModalRef.current) {
      pieceModalRef.current.castShadow = true;
      pieceModalRef.current.receiveShadow = true;
      if (piece.color === Color.WHITE) {
        pieceModalRef.current.rotateY(3)
      }
    }
  }, [piece.color]);


  return (
    <mesh ref={pieceModalRef} scale={26} position={position}>
      <primitive  object={clone}/>
    </mesh>
  )
}