import { create } from "zustand";
import Chess from "./lib/chess";
import { ChessClient } from "./proto/ChessServiceClientPb";
import Player from "./lib/player";
import PieceCoordinate from "./lib/pieceCoordinate";

export type ChessStore = {
    chess: Chess;
    gRPCClient: ChessClient;
    player: Player | null;
    setPlayer: (player: Player) => void;
    newGame: () => void;
    selectedSquare: PieceCoordinate | null;
    setSelectedSquare: (selectedSquare: PieceCoordinate | null) => void;
    possibleMoves: PieceCoordinate[];
    setPossibleMoves: (possibleMoves: PieceCoordinate[]) => void;
    playerAdded: boolean;
    setPlayerAdded: (playerAdded: boolean) => void;
    mode: "2D" | "3D";
    setMode: (mode: "2D" | "3D") => void;
    isSelected: (coordinate: PieceCoordinate) => boolean;
    isPossibleMove: (coordinate: PieceCoordinate) => boolean;
    updateBoard: (coordinate: PieceCoordinate) => void;
}
const useChessStore = create<ChessStore>((set,get) => ({
    chess: new Chess(),
    gRPCClient: new ChessClient(process.env.NEXT_PUBLIC_GRPC_ENDPOINT || ""),
    player: null,
    setPlayer: (player: Player) => set(({ player })),
    newGame: () => {
        const { setPlayerAdded } = get();
        set({chess: new Chess()});
        setPlayerAdded(false);
    },
    selectedSquare: null,
    setSelectedSquare: (selectedSquare: PieceCoordinate | null) => set({ selectedSquare }),
    possibleMoves: [],
    setPossibleMoves: (possibleMoves: PieceCoordinate[]) => set({ possibleMoves }),
    playerAdded: false,
    setPlayerAdded: (playerAdded: boolean) => set({ playerAdded }),
    mode: "2D",
    setMode: (mode: "2D" | "3D") => set({ mode}),
    isSelected: (coordinate: PieceCoordinate) => {
        const { selectedSquare } = get();
        return selectedSquare?.x == coordinate.x && selectedSquare?.y == coordinate.y;
    },
    isPossibleMove: (coordinate: PieceCoordinate) => {
        const { selectedSquare, possibleMoves } = get();
        if (!selectedSquare) {
            return false;
        }
        return possibleMoves.some((move) => move.x === coordinate.x && move.y === coordinate.y);
    },
    updateBoard: (coordinate: PieceCoordinate) => {
        const { selectedSquare, chess, setSelectedSquare, setPossibleMoves, isPossibleMove } = get();
        const squares = chess.board.squares;
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
          }
        }
      }
}));

export default useChessStore;