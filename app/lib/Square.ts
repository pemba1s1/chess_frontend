import PieceCoordinate from "./pieceCoordinate";
import { Piece } from "./piece";

class Square {
    private _piece: Piece | null;
    private _coordinate: PieceCoordinate;

    constructor(piece: Piece | null, coordinate: PieceCoordinate) {
        this._piece = piece;
        this._coordinate = coordinate;
    }

    get piece() {
        return this._piece;
    }

    get coordinate() {
        return this._coordinate;
    }

    setPiece(piece: Piece | null) {
        this._piece = piece;
    }
}

export default Square;