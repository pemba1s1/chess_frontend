import clsx from "clsx";
import Player, { Color } from "../lib/player";

type PlayerCardProps = {
    player: Player;
}
export default function PlayerCard({player} : PlayerCardProps) {
    return (
    <div className={clsx(
        "flex justify-center font-bold text-2xl min-h-screen w-full py-16",
        {
            "items-start": player.color === Color.BLACK,
            "items-end": player.color === Color.WHITE,
        }
    )}>
        {player.name}
    </div>);
}