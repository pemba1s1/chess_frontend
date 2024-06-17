'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Mesh } from 'three'
import useChessStore from '../store'
import Player, { Color } from '../lib/player'
import PieceCoordinate from '../lib/pieceCoordinate'
import { GameStatus } from '../lib/chess'
import Square3D from '../components/square3D'
import PieceModal3D from '../components/pieceModal3D'


function ChessBoard() {
  const chess = useChessStore((state) => state.chess);
  const newGame = useChessStore((state) => state.newGame);
  const board = chess.board;
  const squares = board.squares;
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const chessBoardRef = useRef<Mesh>(null);
  const zaxis = [-10,-8,-6,-4,-2,0,2,4]
  const yaxis = [-10,-8,-6,-4,-2,0,2,4]
  
  const [selectedSquare, setSelectedSquare] = useState<PieceCoordinate | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<PieceCoordinate[]>([]);
  const [playerAdded, setPlayerAdded] = useState<Boolean>(false);

  useEffect(() => {
    if (playerAdded) return;
    chess.addPlayer(new Player("Player 1", Color.WHITE));
    chess.addPlayer(new Player("Player 2", Color.BLACK));
    chess.gameStatus = GameStatus.IN_PROGRESS;
    chess.playerTurn = Color.WHITE;
    setPlayerAdded(true);
  },[chess, playerAdded])

  const updateBoard = (coordinate: PieceCoordinate) => {
    if (!selectedSquare && squares[ coordinate.x ][ coordinate.y ].piece && chess.playerTurn == squares[ coordinate.x ][ coordinate.y ].piece?.color) {
      console.log("Selecting")
      setSelectedSquare(coordinate)
      setPossibleMoves(chess.calcPossibleMoves(coordinate));
      return;
    }

    if (selectedSquare?.x == coordinate.x && selectedSquare?.y == coordinate.y) {
      console.log("Deselecting")
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    if (selectedSquare && squares[ selectedSquare.x ][ selectedSquare.y ].piece?.color == squares[ coordinate.x ][ coordinate.y ].piece?.color) {
      console.log("Reselecting")
      setSelectedSquare(coordinate)      
      setPossibleMoves(chess.calcPossibleMoves(coordinate));
      return;
    }

    if (selectedSquare && isPossibleMove(coordinate)) {
      const res = chess.movePiece(selectedSquare, coordinate);
      if(res) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        chess.switchTurn();
      }
    }
  }

  const isSelected = (coordinate: PieceCoordinate) => {
    return selectedSquare?.x == coordinate.x && selectedSquare?.y == coordinate.y;
  }

  const isPossibleMove = (coordinate: PieceCoordinate) => {
    if (!selectedSquare) {
      return false;
    }
    return possibleMoves.some((move) => move.x === coordinate.x && move.y === coordinate.y);
  }

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

  return (
    <mesh ref={chessBoardRef}>
      {row.map((x) => (
          <mesh key={x} rotation={[Math.PI/3.2,0,0]} scale={[0.5,0.5,0.5]} position={[1.4,0,0]}>
            {col.map((y) => (
                <group onClick={() => updateBoard(new PieceCoordinate(x, y))} key={`${x}-${y}`}>
                  <Square3D color={getTileColor(new PieceCoordinate(x, y))} position={[yaxis[y],0,zaxis[x]]}/>
                  {squares[ x ][ y ].piece && <PieceModal3D piece={squares[ x ][ y ].piece} position={[yaxis[y],0,zaxis[x]]}/>}
                </group>
            ))}
          </mesh>
      ))}
    </mesh>
  )
}

export default function C3DPage() {
  return (
    <div className="flex relative min-h-screen">
      <Suspense fallback={<div>Loading 3D Models......</div>}>
        <Canvas shadows style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%", 
          height: "100%"
        }}>
          <ambientLight intensity={3} />
          <directionalLight castShadow/>
          <ChessBoard />
        </Canvas>
      </Suspense>
    </div>
  )
}