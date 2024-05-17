import { create } from "zustand";
import Chess from "../lib/chess";
import Square from "../lib/Square";

export type ChessStore = {
    chess: Chess;
}
const useChessStore = create<ChessStore>((set) => ({
    chess: new Chess(),
}));

export default useChessStore;