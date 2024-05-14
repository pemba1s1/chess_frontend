import { useEffect, useState } from "react";
import Spot from "../lib/spot";

type SquareProps = {
    piece: string | null;
    onClick: () => void;
}
export default function Square({piece, onClick}: SquareProps) {
    return (
        <div className="flex justify-center items-center h-full" onClick={onClick}>{piece}</div>
    );
}