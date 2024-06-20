import Player, { Color } from "../lib/player";
import PieceModal3D from "./pieceModal3D";

const axisForDeadPieces = [-11 ,-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4];

export default function KilledPieces3D({ player } : {player: Player}) {
  const killedPieces = player.killedPieces;
    
  const getPosition = (index: number) : [number, number, number] => {
    if (killedPieces[index].color === Color.WHITE) {
      return [ 9, 0, axisForDeadPieces[ index ] ];
    }
    return [-9.5,0,axisForDeadPieces[axisForDeadPieces.length - 1 - index]];
  }

  return (
    <group rotation={[Math.PI/3.2,0,0]} scale={0.5}>
      {killedPieces.map((piece, index) => (
        <PieceModal3D key={index} piece={piece} position={getPosition(index)}/>
      ))}
    </group>
  )
}