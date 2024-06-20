import { Text } from "@react-three/drei";
import useChessStore from "../store";
import KilledPieces3D from "./killedPiece3d";

export default function PlayerCard3D () {
  const { chess } = useChessStore();
  const players = chess.players;  

  return (
    <group>
      <mesh position={[-5,3.5,0]}>
        <Text fontSize={0.28} color="black" >{players[0].name}</Text>
      </mesh>
      <mesh position={[5,3.5,0]}>
        <Text fontSize={0.28} color="black">{players[1].name}</Text>
      </mesh>
      <mesh>
        <KilledPieces3D player={players[0]}/>
        <KilledPieces3D player={players[1]}/>
      </mesh>
    </group>
  )
}
