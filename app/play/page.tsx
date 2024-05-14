'use client';
import clsx from "clsx";
import SquareComponent from "../components/square";
import PlayerCard from "../components/player";
import Square from "../lib/Square";
import { useState } from "react";
import PieceCoordinate from "../lib/pieceCoordinate";
import useChessStore from "./store";

export default function Home() {
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const chess = useChessStore((state) => state.chess);
  const board = chess.board;
  const players = chess.players;
  const [squares,setSquares] = useState<Square[][]>(board.squares);

  const updateBoard = (coordinate: PieceCoordinate) => {
    if (!board.isMovable) {
      board.selectSquare(coordinate);
      return;
    }
    board.movePiece(coordinate);
    setSquares([...board.squares]);
  }

  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
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
                    "bg-green-950": (x + y) % 2 !== 0,
                  }
                  )}>
                  <SquareComponent piece={squares[ x ][ y ].piece} onClick={() => updateBoard(new PieceCoordinate(x, y))}/>
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
