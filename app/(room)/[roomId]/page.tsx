'use client'
import PlayerCard from "@/app/components/player";
import SquareComponent from "@/app/components/square";
import Square from "@/app/lib/Square";
import { GameStatus } from "@/app/lib/chess";
import PieceCoordinate from "@/app/lib/pieceCoordinate";
import Player, { Color } from "@/app/lib/player";
import { Color as ProtoColor, GetRoomRequest, MoveRequest, Player as ProtoPlayer, Coordinate, Move, RoomResponseStream } from "@/app/proto/chess_pb";
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
    const [player1Ready, setPlayer1Ready] = useState<Boolean>(false);
    const [player2Ready, setPlayer2Ready] = useState<Boolean>(false);
    const [isStreamReady, setIsStreamReady] = useState<Boolean>();

    useEffect(() => {
        if (!client) return;
        if (!player) return;
        if (isStreamReady) return;
        const roomRequest = new MoveRequest();
        roomRequest.setRoomid(params.roomId);
        const protoPlayer = new ProtoPlayer();
        protoPlayer.setName(player.name);
        protoPlayer.setColor(player.color == Color.WHITE ? ProtoColor.WHITE : ProtoColor.BLACK);
        roomRequest.setPlayer(protoPlayer);
        const st = client.listenToRoom(roomRequest);
        console.log("Listening to room")
        setIsStreamReady(true);

        st.on("data", (res) => {
            console.log(res)
            const player = res.getPlayer();
            const move = res.getMove();
            if (!player2Ready && player && !move) {
                console.log("adding player 2", player.getName())
                chess.addPlayer(new Player(player.getName(), getColorName(player.getColor())));
                setPlayer2Ready(true);
                chess.playerTurn = Color.WHITE;
                chess.gameStatus = GameStatus.IN_PROGRESS;
            }
            if (player && move) {
                const from = move.getFrom();
                const to = move.getTo();
                if (!from || !to) return;
                movePiece(new PieceCoordinate(from.getX(), from.getY()), new PieceCoordinate(to.getX(), to.getY()));
            }
        });
        st.on("error", (err) => {
            console.error("Stream errro", err)
        });
        st.on("end", () => {
            console.log("Stream ended")
        });
        return () => {
            st.cancel();
            setIsStreamReady(false);
        }
    }, [player, params.roomId, client]);
    
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
            movePiece(selectedSquare, coordinate);
            broadCastMove(selectedSquare, coordinate);
        }
    }

    const movePiece = (from: PieceCoordinate, to: PieceCoordinate) => {
        const res = chess.movePiece(from, to);
        if(res) {
            setSelectedSquare(null);
            setPossibleMoves([]);
            chess.switchTurn();
            setSquares([...board.squares]);
        }
    }

    const broadCastMove = (from: PieceCoordinate, to: PieceCoordinate) => {
        if (!player) return
        const moveRequest = new MoveRequest();
        moveRequest.setRoomid(params.roomId);
        const protoPlayer = new ProtoPlayer();
        protoPlayer.setName(player.name);
        protoPlayer.setColor(player.color == Color.WHITE ? ProtoColor.WHITE : ProtoColor.BLACK);
        moveRequest.setPlayer(protoPlayer);
        const f = new Coordinate();
        f.setX(from.x);
        f.setY(from.y);
        const t = new Coordinate();
        t.setX(to.x);
        t.setY(to.y);
        const move = new Move();
        move.setFrom(f);
        move.setTo(t);
        moveRequest.setMove(move);
        client.moves(moveRequest).then((res) => {
            console.log("Move sent", res)
        });
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