import clsx from "clsx";
import Image from "next/image";
import Chess from "../lib/chess";
import Square from "../components/square";

export default function Home() {
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const chess = new Chess();
  const board = chess.board.board;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {row.map((r) => (
        <div key={r} className="flex flex-row">
          {col.map((c) => (
            <div key={c} className="flex flex-col">
              <div className={clsx(
                "chess-cell",
                {
                  "bg-white": (r + c) % 2 === 0,
                  "bg-green-950": (r + c) % 2 !== 0,
                }
                )}>
                <div className="flex justify-center items-center h-full">
                  <Square spot={board[r][c]}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
