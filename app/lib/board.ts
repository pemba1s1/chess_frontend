import PieceCoordinate from "./pieceCoordinate";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./piece";
import { Color } from "./player";
import Square from "./Square";

class Board {
    private _squares: Square[][];
    private _defaultBoard: Square[][] = [
        [
            new Square(new Rook(Color.BLACK), new PieceCoordinate(0,0)), 
            new Square(new Knight(Color.BLACK), new PieceCoordinate(0,1)), 
            new Square(new Bishop(Color.BLACK), new PieceCoordinate(0,2)), 
            new Square(new Queen(Color.BLACK), new PieceCoordinate(0,3)), 
            new Square(new King(Color.BLACK), new PieceCoordinate(0,4)), 
            new Square(new Bishop(Color.BLACK), new PieceCoordinate(0,5)), 
            new Square(new Knight(Color.BLACK), new PieceCoordinate(0,6)), 
            new Square(new Rook(Color.BLACK), new PieceCoordinate(0,7))
        ],
        [
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,0)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,1)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,2)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,3)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,4)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,5)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,6)), 
            new Square(new Pawn(Color.BLACK), new PieceCoordinate(1,7))
        ],
        [
            new Square(null, new PieceCoordinate(2,0)), 
            new Square(null, new PieceCoordinate(2,1)), 
            new Square(null, new PieceCoordinate(2,2)), 
            new Square(null, new PieceCoordinate(2,3)), 
            new Square(null, new PieceCoordinate(2,4)), 
            new Square(null, new PieceCoordinate(2,5)), 
            new Square(null, new PieceCoordinate(2,6)), 
            new Square(null, new PieceCoordinate(2,7))
        ],
        [
            new Square(null, new PieceCoordinate(3,0)), 
            new Square(null, new PieceCoordinate(3,1)), 
            new Square(null, new PieceCoordinate(3,2)), 
            new Square(null, new PieceCoordinate(3,3)), 
            new Square(null, new PieceCoordinate(3,4)), 
            new Square(null, new PieceCoordinate(3,5)), 
            new Square(null, new PieceCoordinate(3,6)), 
            new Square(null, new PieceCoordinate(3,7))
        ],
        [
            new Square(null, new PieceCoordinate(4,0)), 
            new Square(null, new PieceCoordinate(4,1)), 
            new Square(null, new PieceCoordinate(4,2)), 
            new Square(null, new PieceCoordinate(4,3)), 
            new Square(null, new PieceCoordinate(4,4)), 
            new Square(null, new PieceCoordinate(4,5)), 
            new Square(null, new PieceCoordinate(4,6)), 
            new Square(null, new PieceCoordinate(4,7))
        ],
        [
            new Square(null, new PieceCoordinate(5,0)), 
            new Square(null, new PieceCoordinate(5,1)), 
            new Square(null, new PieceCoordinate(5,2)), 
            new Square(null, new PieceCoordinate(5,3)), 
            new Square(null, new PieceCoordinate(5,4)), 
            new Square(null, new PieceCoordinate(5,5)), 
            new Square(null, new PieceCoordinate(5,6)), 
            new Square(null, new PieceCoordinate(5,7))
        ],
        [
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,0)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,1)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,2)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,3)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,4)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,5)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,6)), 
            new Square(new Pawn(Color.WHITE), new PieceCoordinate(6,7))
        ],
        [
            new Square(new Rook(Color.WHITE), new PieceCoordinate(7,0)), 
            new Square(new Knight(Color.WHITE), new PieceCoordinate(7,1)), 
            new Square(new Bishop(Color.WHITE), new PieceCoordinate(7,2)), 
            new Square(new Queen(Color.WHITE), new PieceCoordinate(7,3)), 
            new Square(new King(Color.WHITE), new PieceCoordinate(7,4)), 
            new Square(new Bishop(Color.WHITE), new PieceCoordinate(7,5)), 
            new Square(new Knight(Color.WHITE), new PieceCoordinate(7,6)), 
            new Square(new Rook(Color.WHITE), new PieceCoordinate(7,7))
        ]
    ]

    constructor() {
        this._squares = this._defaultBoard;
    }

    get squares() {
        return this._squares;
    }

    set squares(board: Square[][]) {
        this._squares = board;
    }

    resetBoard() {
        this._squares = this._defaultBoard;
    }

    getSquareFromCoordinate(coordinate: PieceCoordinate) {
        return this.squares[coordinate.x][coordinate.y];
    }

    movePiece(from: PieceCoordinate | null, to: PieceCoordinate) {
        if (to && from) {
            console.log("Moving piece", from, "to", to);
            this.squares[to.x][to.y].setPiece(this.squares[from.x][from.y].piece);
            this.squares[from.x][from?.y].setPiece(null);
        }
    }

}

export default Board;
