import clsx from "clsx";
import Player, { Color } from "../lib/player";
import KilledPiece from "./killedPiece";

type PlayerCardProps = {
    player: Player;
}
export default function PlayerCard({player} : PlayerCardProps) {
    const killedPieces = player.killedPieces;
    return (
    <div className="flex flex-col items-center font-bold text-2xl min-h-screen w-full py-16">
        <p>{player.name}</p>
        <KilledPiece killedPieces={killedPieces}/>
    </div>);
}