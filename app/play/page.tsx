'use client';
import clsx from "clsx";
import SquareComponent from "../components/square";
import PlayerCard from "../components/player";
import Square from "../lib/Square";
import { Suspense, useEffect, useState } from "react";
import PieceCoordinate from "../lib/pieceCoordinate";
import useChessStore from "../store";
import Link from "next/link";
import Image from "next/image";
import Player, { Color } from "../lib/player";
import { GameStatus } from "../lib/chess";

export default function ChessBoard() {
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const chess = useChessStore((state) => state.chess);
  const board = chess.board;
  const players = chess.players;
  const [squares,setSquares] = useState<Square[][]>(board.squares);
  const [selectedSquare, setSelectedSquare] = useState<PieceCoordinate | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<PieceCoordinate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chess.addPlayer(new Player("Player 1", Color.WHITE));
    chess.addPlayer(new Player("Player 2", Color.BLACK));
    chess.gameStatus = GameStatus.IN_PROGRESS;
    chess.playerTurn = Color.WHITE;
    setLoading(false);
  },[chess])

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
        setSquares([...board.squares]);
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

  const startNewGame = () => {
    const newBoard = chess.newGame();
    setSelectedSquare(null);
    setPossibleMoves([]);
    setSquares([...newBoard.squares]);
  }

  return (
    <main className="min-h-screen bg-[#E6F5E6]">
      <div className="flex justify-between items-center px-8 py-2 bg-white">
          <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <span className="text-lg font-bold">Chess</span>
          </Link>
          <span className="text-2xl font-bold">{chess.gameStatus}</span>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={startNewGame}>New Game</button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex relative flex-row items-center justify-between pt-6">        
          <PlayerCard player={players[0]}/>
          <div>
            {row.map((x) => (
              <div key={`x-${x}`} className="flex flex-row">
                {col.map((y) => (
                  <div key={`y-${y}`} className="flex flex-col">
                    <div className={clsx(
                      "chess-cell",
                      {
                        "bg-white": (x + y) % 2 === 0,
                        "bg-green-800": (x + y) % 2 !== 0,
                      }
                      )}>
                      <SquareComponent isPossibleMove={isPossibleMove(new PieceCoordinate(x, y))} isSelected={isSelected(new PieceCoordinate(x, y))} piece={squares[ x ][ y ].piece} onClick={() => updateBoard(new PieceCoordinate(x, y))}/>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <PlayerCard player={players[1]}/>
        </div>
      </Suspense>
    </main>
  );
}
