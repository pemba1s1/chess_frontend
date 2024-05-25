"use client";
import { Color as ProtoColor, CreateRoomRequest, Player as ProtoPlayer } from "@/app/proto/chess_pb";
import useChessStore from "@/app/store";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Player, { Color } from "@/app/lib/player";

export default function Create() {
    const client = useChessStore((state) => state.gRPCClient);
    const setPlayer = useChessStore((state) => state.setPlayer);
    const player = useChessStore((state) => state.player);
    const router = useRouter();
    const [roomId, setRoomId] = useState("");


    useEffect(() => {
        if (!client) return;
        if (roomId) return;
        const player = new ProtoPlayer();
        player.setName("Player 1");
        player.setColor(ProtoColor.WHITE);
        
        setPlayer(new Player("Player 1", Color.WHITE));
        const roomRequest = new CreateRoomRequest();
        roomRequest.setPlayer1(player);
        client.createRoom(roomRequest).then((res) => {
            setRoomId(res.getRoomid());
        });
    },[client]);

    useEffect(() => {
        if (player && roomId) {
            router.push(`/${roomId}`);
        }
    },[player , roomId]);

    function getColorName(colorValue: ProtoColor): Color {
        switch (colorValue) {
            case 0: return Color.WHITE;
            case 1: return Color.BLACK;
            default: return Color.WHITE;
        }
    }
    return (
        <main className="flex relative min-h-screen flex-col items-center justify-center bg-chess text-black">
            Creating a room...
        </main>
    );
}