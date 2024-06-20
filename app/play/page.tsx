'use client';
import { useEffect } from "react";
import useChessStore from "../store";
import Link from "next/link";
import Image from "next/image";
import Player, { Color } from "../lib/player";
import { GameStatus } from "../lib/chess";
import Chess2D from "../components/chess2d";
import Chess3D from "../components/chess3d";

export default function ChessBoard() {
  const { 
    chess, 
    newGame, 
    playerAdded, 
    setPlayerAdded, 
    mode, 
    setMode,
  } = useChessStore();

  useEffect(() => {
    if (playerAdded) return;
    chess.addPlayer(new Player("Player 1", Color.WHITE));
    chess.addPlayer(new Player("Player 2", Color.BLACK));
    chess.gameStatus = GameStatus.IN_PROGRESS;
    chess.playerTurn = Color.WHITE;
    setPlayerAdded(true);
  },[chess, playerAdded])
  

  const toggleDimension = () => {
    setMode(mode === "2D" ? "3D" : "2D");
  }

  return (
    <main className="min-h-screen bg-[#E6F5E6]">
      <div className="flex justify-between items-center px-8 py-2 bg-white">
          <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={50} height={50} />
              <span className="text-lg font-bold">Chess</span>
          </Link>
          <span className="text-2xl font-bold">{chess.gameStatus}</span>
          <div>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md mr-2" onClick={toggleDimension}>{mode === "2D" ? "3D" : "2D"}</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={newGame}>New Game</button>
          </div>
      </div>
      { mode === "2D" ? <Chess2D /> : <Chess3D /> }
    </main>
  );
}
