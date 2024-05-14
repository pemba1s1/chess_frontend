import Spot from "../lib/spot";

type SquareProps = {
    spot: Spot;
}
export default function Square({spot}: SquareProps) {
    return <div>{spot.piece}</div>;
}