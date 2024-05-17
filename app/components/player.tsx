import clsx from "clsx";
import Player, { Color } from "../lib/player";
import KilledPiece from "./killedPiece";

type PlayerCardProps = {
    player: Player;
}
export default function PlayerCard({player} : PlayerCardProps) {
    const killedPieces = player.killedPieces;
    return (
    <div className="flex flex-col items-center justify-start h-[90vh] font-bold text-2xl w-full py-16 text-black">
        <p>{player.name}</p>
        <KilledPiece killedPieces={killedPieces}/>
    </div>);
}