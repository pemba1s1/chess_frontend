import clsx from "clsx";
import Chess from "../lib/chess";
import Square from "../components/square";
import PlayerCard from "../components/player";

export default function Home() {
  const row = [0, 1, 2, 3, 4, 5, 6, 7];
  const col = [0, 1, 2, 3, 4, 5, 6, 7];
  const chess = new Chess();
  const board = chess.board.board;
  const players = chess.players;
  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
      <PlayerCard player={players[0]}/>
      <div>
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
      </div>
      <PlayerCard player={players[1]}/>
    </main>
  );
}
