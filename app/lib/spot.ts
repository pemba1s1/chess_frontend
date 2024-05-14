import PieceCoordinate from "./pieceCoordinate";

class Spot {
    private _piece: string | null;
    private _coordinate: PieceCoordinate;

    constructor(piece: string | null, coordinate: PieceCoordinate) {
        this._piece = piece;
        this._coordinate = coordinate;
    }

    get piece() {
        return this._piece;
    }

    get coordinate() {
        return this._coordinate;
    }

    setPiece(piece: string | null) {
        this._piece = piece;
    }
}

export default Spot;