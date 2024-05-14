
import { Piece } from "../lib/piece";
import Image from "next/image";

type SquareProps = {
    piece: Piece | null;
    onClick: () => void;
}
export default function SquareComponent({piece, onClick}: SquareProps) {
    return (
        <div className="flex justify-center items-center h-full" onClick={onClick}>
            {piece?.icon && <Image src={piece.icon} alt={piece.color} width={95} height={95}/>}
        </div>
    );
}