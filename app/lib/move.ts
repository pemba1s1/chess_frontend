import PieceCoordinate from "./pieceCoordinate";

class Move {
    private _from: PieceCoordinate;
    private _to: PieceCoordinate;

    constructor(from: PieceCoordinate, to: PieceCoordinate) {
        this._from = from;
        this._to = to;
    }

    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }
}

export default Move;