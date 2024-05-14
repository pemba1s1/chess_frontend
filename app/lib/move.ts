import PieceCoordinate from "./pieceCoordinate";
import { Color } from "./player";

class Move {
    private _from: PieceCoordinate;
    private _to: PieceCoordinate;
    private _movedBy: Color;

    constructor(from: PieceCoordinate, to: PieceCoordinate, movedBy: Color) {
        this._from = from;
        this._to = to;
        this._movedBy = movedBy;
    }

    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }

    get movedBy() {
        return this._movedBy;
    }
}

export default Move;