import { create } from "zustand";
import Chess from "./lib/chess";
import { ChessClient } from "./proto/ChessServiceClientPb";
import Player from "./lib/player";

export type ChessStore = {
    chess: Chess;
    gRPCClient: ChessClient;
    player: Player | null;
    setPlayer: (player: Player) => void;
    newGame: () => void;
}
const useChessStore = create<ChessStore>((set) => ({
    chess: new Chess(),
    gRPCClient: new ChessClient(process.env.NEXT_PUBLIC_GRPC_ENDPOINT),
    player: null,
    setPlayer: (player: Player) => set(({ player })),
    newGame: () => set({chess: new Chess()}),
}));

export default useChessStore;