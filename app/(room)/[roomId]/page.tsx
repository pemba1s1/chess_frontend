'use client'
import PlayerCard from "@/app/components/player";
import SquareComponent from "@/app/components/square";
import Square from "@/app/lib/Square";
import { GameStatus } from "@/app/lib/chess";
import PieceCoordinate from "@/app/lib/pieceCoordinate";
import Player, { Color } from "@/app/lib/player";
import { Color as ProtoColor, GetRoomRequest } from "@/app/proto/chess_pb";
import useChessStore from "@/app/store"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

export default function Page({ params }: { params: { roomId: string } }) {
    const client = useChessStore((state) => state.gRPCClient);
    const row = [0, 1, 2, 3, 4, 5, 6, 7];
    const col = [0, 1, 2, 3, 4, 5, 6, 7];
    const chess = useChessStore((state) => state.chess);
    const turn = chess.playerTurn;
    const board = chess.board;
    const player = useChessStore((state) => state.player);
    const players = chess.players;
    const [squares,setSquares] = useState<Square[][]>(board.squares);
    const [selectedSquare, setSelectedSquare] = useState<PieceCoordinate | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<PieceCoordinate[]>([]);
    const [player1Ready, setPlayer1Ready] = useState(false);
    const [player2Ready, setPlayer2Ready] = useState(false);

    useEffect(() => {
        const roomRequest = new GetRoomRequest();
        roomRequest.setRoomid(params.roomId);
        const st = client.listenToRoom(roomRequest);
        st.on("data", (res) => {
            // Handle the data received from the stream
            console.log(res)
        });
        st.on("error", (err) => {
            // Handle any errors that occur during the stream
        });
        st.on("end", () => {
            // Handle the end of the stream
        });

        return () => {
            // Clean up the stream when the component unmounts
            st.cancel();
        };
    }, []);
    
    useEffect(() => {
        const roomRequest = new GetRoomRequest();
        roomRequest.setRoomid(params.roomId);
        
        client.getRoomInfo(roomRequest).then((res) => {
            const player1 = res.getPlayer1();
            const player2 = res.getPlayer2();
            if (player1?.getName() && !players[0]) {
                console.log("adding player 1")
                chess.addPlayer(new Player(player1.getName(), getColorName(player1.getColor())));
                setPlayer1Ready(true);
            }
            if (player2?.getName() && !players[1]) {
                console.log("adding player 2", player2.getName())
                chess.addPlayer(new Player(player2.getName(), getColorName(player2.getColor())));
                setPlayer2Ready(true);
                chess.playerTurn = Color.WHITE;
                chess.gameStatus = GameStatus.IN_PROGRESS;
            }
        })
    },[params.roomId])


    const updateBoard = (coordinate: PieceCoordinate) => {
        console.log(turn)
        console.log(player)
        if (turn != player?.color) {
            return
        }
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

    const startNewGame = () => {
    const newBoard = chess.newGame();
    setSelectedSquare(null);
    setPossibleMoves([]);
    setSquares([...newBoard.squares]);
    }

    function getColorName(colorValue: ProtoColor): Color {
        switch (colorValue) {
            case 0: return Color.WHITE;
            case 1: return Color.BLACK;
            default: return Color.WHITE;
        }
    }

    return (
        <main className="min-h-screen bg-[#E6F5E6]">
            <div className="flex justify-between items-center px-8 py-2 bg-white">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={50} height={50} />
                    <span className="text-lg font-bold">Chess</span>
                </Link>
                <span className="text-2xl font-bold">{chess.gameStatus}</span>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={startNewGame}>New Game</button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
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
        </main>
    );
}