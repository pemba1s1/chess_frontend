import { create } from "zustand";
import Chess from "./lib/chess";
import { ChessClient } from "./proto/ChessServiceClientPb";
import Player from "./lib/player";

export type ChessStore = {
    chess: Chess;
    gRPCClient: ChessClient;
    player: Player | null;
    setPlayer: (player: Player) => void;
}
const useChessStore = create<ChessStore>((set) => ({
    chess: new Chess(),
    gRPCClient: new ChessClient("http://localhost:8080"),
    player: null,
    setPlayer: (player: Player) => set(({ player })),
}));

export default useChessStore;