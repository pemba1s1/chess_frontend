import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import PieceCoordinate from "../lib/pieceCoordinate";
import Square3D from "./square3D";
import PieceModal3D from "./pieceModal3D";
import useChessStore from "../store";
import PlayerCard3D from "./player3d";
import { Piece } from "../lib/piece";

const ChessBoard3D = () => {    
  const axis = [-10,-8,-6,-4,-2,0,2,4];
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const { 
    chess, 
    isSelected,
    isPossibleMove,
    updateBoard
  } = useChessStore();
  const board = chess.board;
  const squares = board.squares;

  const getTileColor = (coordinate: PieceCoordinate) => {
    const whiteColor = "#ffffff"
    const blackColor = "#166534"
    const selectedColor = "#fdba74"
    const possibleMoveColor = "#fde68a"
    if (isSelected(coordinate)) {
      return selectedColor;
    }
    if (isPossibleMove(coordinate)) {
      return possibleMoveColor;
    }
    return (coordinate.x + coordinate.y) % 2 === 0 ? whiteColor : blackColor;
  }

  const PieceModal = ({ x, y } : { x: number, y: number }) => {
    const piece: Piece | null = squares[ x ][ y ].piece;
    if (piece) {
      return <PieceModal3D piece={piece} position={[axis[y],0,axis[x]]}/>
    }
  }

  return (
    <mesh>
      {row.map((x) => (
          <mesh key={x} rotation={[Math.PI/3.2,0,0]} scale={[0.5,0.5,0.5]} position={[1.4,0,0]}>
            {col.map((y) => (
                <group onClick={(e) => { e.stopPropagation(); updateBoard(new PieceCoordinate(x, y)); }} key={`${x}-${y}`}>
                  <Square3D color={getTileColor(new PieceCoordinate(x, y))} position={[axis[y],0,axis[x]]}/>
                  <PieceModal x={x} y={y}/>
                </group>
            ))}
          </mesh>
      ))}
    </mesh>
  )
}


export default function Chess3D () {
  return (
    <Suspense fallback={<div>Loading 3D Models......</div>}>
      <div className="flex relative min-h-screen">
        <Canvas shadows style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%", 
          height: "100%"
        }}>
          <ambientLight intensity={3} />
          <directionalLight castShadow/>
          <ChessBoard3D />
          <PlayerCard3D />
        </Canvas>
      </div>
    </Suspense>
  )
}