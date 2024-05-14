
import { Piece } from "../lib/piece";
import Image from "next/image";
import PieceCoordinate from "../lib/pieceCoordinate";
import clsx from "clsx";

type SquareProps = {
    piece: Piece | null;
    isSelected: Boolean;
    onClick: () => void;
}
export default function SquareComponent({piece, onClick, isSelected}: SquareProps) {
    return (
        <div className={clsx(
            "flex justify-center items-center h-full",
            {
                "bg-orange-300": isSelected,
            }
            )} 
            onClick={onClick}
        >
            {piece?.icon && <Image src={piece.icon} alt={piece.color} width={95} height={95}/>}
        </div>
    );
}