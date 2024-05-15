import Image from "next/image";
import { Piece } from "../lib/piece";

type KilledPieceProps = {
    killedPieces: Piece[];
}
export default function KilledPiece({killedPieces} : KilledPieceProps) {
    return (
        <div className="flex pt-5 flex-wrap">
            {killedPieces.map((piece, index) => (
                <div key={index} className="flex flex-col">
                    <Image src={piece.icon} alt={piece.color} width={50} height={50}/>
                </div>
            ))}
        </div>
    )
}