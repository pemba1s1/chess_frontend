import Spot from "../lib/spot";

type SquareProps = {
    spot: Spot;
}
export default function Square({spot}: SquareProps) {
    return <div className="square">{spot.piece}</div>;
}