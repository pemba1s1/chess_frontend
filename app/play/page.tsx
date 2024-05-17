'use client';
import clsx from "clsx";
import SquareComponent from "../components/square";
import PlayerCard from "../components/player";
import Square from "../lib/square";
import { useState } from "react";
import PieceCoordinate from "../lib/pieceCoordinate";
import useChessStore from "./store";

export default function ChessBoard() {
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const chess = useChessStore((state) => state.chess);
  const board = chess.board;
  const players = chess.players;
  const [squares,setSquares] = useState<Square[][]>(board.squares);
  const [selectedSquare, setSelectedSquare] = useState<PieceCoordinate | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<PieceCoordinate[]>([]);

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

  return (
    <main className="flex min-h-screen flex-row items-center justify-between bg-gray-800">
      <PlayerCard player={players[0]}/>
      <div>
        <div className="mb-5 font-semibold text-xl">Game Status: {chess.gameStatus}</div>
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
    </main>
  );
}
