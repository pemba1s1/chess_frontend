"use client"

import { Color, GetRoomRequest, JoinRoomRequest, Player } from "@/app/proto/chess_pb";
import useChessStore from "@/app/store";
import { join } from "path";
import { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Join() {
    const [roomId, setRoomId] = useState('');
    const client = useChessStore((state) => state.gRPCClient);
    const router = useRouter();
    
    useEffect(() => {
        client.getRooms(new GetRoomRequest()).then((res) => {
            console.log(res.getRoomsList());
        });
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(roomId);
        const player = new Player();
        player.setName("Player 2");
        player.setColor(Color.BLACK);
        const joinRoomRequest = new JoinRoomRequest();
        joinRoomRequest.setRoomid(roomId);
        joinRoomRequest.setPlayer2(player);

        client.joinRoom(joinRoomRequest).then((res) => {
            router.push(`/${res.getRoomid()}`);
        })
        // Handle form submission logic here
    };
    return (
        <main className="flex relative min-h-screen flex-col items-center justify-center bg-chess text-black">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room Id"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}