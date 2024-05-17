
import { Piece } from "../lib/piece";
import Image from "next/image";
import PieceCoordinate from "../lib/pieceCoordinate";
import clsx from "clsx";

type SquareProps = {
    piece: Piece | null;
    isSelected: Boolean;
    isPossibleMove: Boolean;
    onClick: () => void;
}
export default function SquareComponent({piece, onClick, isSelected, isPossibleMove}: SquareProps) {
    return (
        <div className={clsx(
            "flex justify-center items-center h-full",
            {
                "bg-orange-300": isSelected,
                "bg-amber-200": isPossibleMove,
            }
            )} 
            onClick={onClick}
        >
            {piece?.icon && <Image src={piece.icon} alt={piece.color} width={95} height={95}/>}
        </div>
    );
}