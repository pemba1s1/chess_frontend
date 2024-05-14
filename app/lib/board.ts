import PieceCoordinate from "./pieceCoordinate";
import Spot from "./spot";

class Board {
    private _squares: Spot[][];
    private _from: PieceCoordinate | null = null;
    private _isMovable: Boolean = false;
    private _defaultBoard: Spot[][] = [
        [new Spot("BR", new PieceCoordinate(0,0)), new Spot("BN", new PieceCoordinate(0,1)), new Spot("BB", new PieceCoordinate(0,2)), new Spot("BQ", new PieceCoordinate(0,3)), new Spot("BK", new PieceCoordinate(0,4)), new Spot("BB", new PieceCoordinate(0,5)), new Spot("BN", new PieceCoordinate(0,6)), new Spot("BR", new PieceCoordinate(0,7))],
        [new Spot("BP", new PieceCoordinate(1,0)), new Spot("BP", new PieceCoordinate(1,1)), new Spot("BP", new PieceCoordinate(1,2)), new Spot("BP", new PieceCoordinate(1,3)), new Spot("BP", new PieceCoordinate(1,4)), new Spot("BP", new PieceCoordinate(1,5)), new Spot("BP", new PieceCoordinate(1,6)), new Spot("BP", new PieceCoordinate(1,7))],
        [new Spot(null, new PieceCoordinate(2,0)), new Spot(null, new PieceCoordinate(2,1)), new Spot(null, new PieceCoordinate(2,2)), new Spot(null, new PieceCoordinate(2,3)), new Spot(null, new PieceCoordinate(2,4)), new Spot(null, new PieceCoordinate(2,5)), new Spot(null, new PieceCoordinate(2,6)), new Spot(null, new PieceCoordinate(2,7))],
        [new Spot(null, new PieceCoordinate(3,0)), new Spot(null, new PieceCoordinate(3,1)), new Spot(null, new PieceCoordinate(3,2)), new Spot(null, new PieceCoordinate(3,3)), new Spot(null, new PieceCoordinate(3,4)), new Spot(null, new PieceCoordinate(3,5)), new Spot(null, new PieceCoordinate(3,6)), new Spot(null, new PieceCoordinate(3,7))],
        [new Spot(null, new PieceCoordinate(4,0)), new Spot(null, new PieceCoordinate(4,1)), new Spot(null, new PieceCoordinate(4,2)), new Spot(null, new PieceCoordinate(4,3)), new Spot(null, new PieceCoordinate(4,4)), new Spot(null, new PieceCoordinate(4,5)), new Spot(null, new PieceCoordinate(4,6)), new Spot(null, new PieceCoordinate(4,7))],
        [new Spot(null, new PieceCoordinate(5,0)), new Spot(null, new PieceCoordinate(5,1)), new Spot(null, new PieceCoordinate(5,2)), new Spot(null, new PieceCoordinate(5,3)), new Spot(null, new PieceCoordinate(5,4)), new Spot(null, new PieceCoordinate(5,5)), new Spot(null, new PieceCoordinate(5,6)), new Spot(null, new PieceCoordinate(5,7))],
        [new Spot("WP", new PieceCoordinate(6,0)), new Spot("WP", new PieceCoordinate(6,1)), new Spot("WP", new PieceCoordinate(6,2)), new Spot("WP", new PieceCoordinate(6,3)), new Spot("WP", new PieceCoordinate(6,4)), new Spot("WP", new PieceCoordinate(6,5)), new Spot("WP", new PieceCoordinate(6,6)), new Spot("WP", new PieceCoordinate(6,7))],
        [new Spot("WR", new PieceCoordinate(7,0)), new Spot("WN", new PieceCoordinate(7,1)), new Spot("WB", new PieceCoordinate(7,2)), new Spot("WQ", new PieceCoordinate(7,3)), new Spot("WK", new PieceCoordinate(7,4)), new Spot("WB", new PieceCoordinate(7,5)), new Spot("WN", new PieceCoordinate(7,6)), new Spot("WR", new PieceCoordinate(7,7))]
    ]

    constructor() {
        this._squares = this._defaultBoard;
    }

    get squares() {
        return this._squares;
    }

    set squares(board: Spot[][]) {
        this._squares = board;
    }

    get isMovable() {
        return this._isMovable;
    }

    get from() {
        return this._from;
    }

    resetBoard() {
        this._squares = this._defaultBoard;
    }

    getSpotFromCoordinate(coordinate: PieceCoordinate) {
        return this.squares[coordinate.x][coordinate.y];
    }

    selectSpot(from: PieceCoordinate) {
        console.log("Spot selected", from, this.getSpotFromCoordinate(from));
        this._from = from;
        this._isMovable = true;
    }

    movePiece(to: PieceCoordinate) {
        if (this.isMovable && this.from) {
            console.log("Moving piece", this.from, "to", to);
            this.squares[to.x][to.y].setPiece(this.squares[this.from?.x][this.from?.y].piece);
            this.squares[this.from?.x][this.from?.y].setPiece(null);
            this._from = null;
            this._isMovable = false;
        }
    }

}

export default Board;