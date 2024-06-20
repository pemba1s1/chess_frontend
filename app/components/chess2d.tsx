import { Suspense } from "react"
import PlayerCard from "./player"
import useChessStore from "../store";
import clsx from "clsx";
import SquareComponent from "./square";
import PieceCoordinate from "../lib/pieceCoordinate";

export default function Chess2D () {  
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const { 
    chess,
    isSelected,
    isPossibleMove,
    updateBoard
  } = useChessStore();
  const board = chess.board;
  const players = chess.players;
  const squares = board.squares;
  
  return (
    <Suspense fallback={<div>Loading Chess.......</div>}>
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
  )
}