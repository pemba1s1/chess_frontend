import Board from "./board";
import Move from "./move";
import Player, { Color } from "./player";
import Stack from "./stack";
import PieceCoordinate from "./pieceCoordinate";
import { Piece, PieceType } from "./piece";

enum GameStatus {
    WHITE_WINS = "White Wins",
    BLACK_WINS = "Black Wins",
    IN_PROGRESS = "In Progress",
    STALEMATE = "Stalemate",
    FORFEIT = "Forfeit",
    RESIGNATION = "Resignation",
}
class Chess {
    private _board: Board;
    private _players: Player[];
    private _moves: Stack<Move>;
    private _gameStatus: GameStatus;
    private _playerTurn: Color;

    constructor() {
        this._board = new Board();
        this._players = [ new Player("Player 1", Color.WHITE), new Player("Player 2", Color.BLACK) ];
        this._moves = new Stack<Move>();
        this._gameStatus = GameStatus.IN_PROGRESS;
        this._playerTurn = Color.WHITE;
    }

    get board() {
        return this._board;
    }

    get players() {
        return this._players;
    }

    get moves() {
        return this._moves;
    }

    get gameStatus() {
        return this._gameStatus;
    }

    get playerTurn() {
        return this._playerTurn;
    }

    switchTurn() {
        this._playerTurn = this._playerTurn == Color.WHITE ? Color.BLACK : Color.WHITE;
    }

    movePiece(from: PieceCoordinate | null, to: PieceCoordinate) {
        if (!to || !from) {
            return;
        }
        const fromPiece = this.board.getSquareFromCoordinate(from).piece;
        const toPiece = this.board.getSquareFromCoordinate(to).piece;

        if(fromPiece?.color == toPiece?.color) {
            return;
        }

        if(toPiece) {
            this.killPiece(toPiece);
        }
        console.log("Moving piece", from, "to", to);
        this.board.squares[to.x][to.y].setPiece(this.board.squares[from.x][from.y].piece);
        this.board.squares[from.x][from?.y].setPiece(null);
        return true;
    }

    killPiece(piece: Piece) {
        if(piece.color == Color.BLACK) {
            this.players[0].killedPieces.push(piece);
            if (piece.type == PieceType.KING) {
                this._gameStatus = GameStatus.WHITE_WINS;
            }
        } else {
            this.players[1].killedPieces.push(piece);
            if (piece.type == PieceType.KING) {
                this._gameStatus = GameStatus.BLACK_WINS;
            }
        }
        console.log("Killed pieces", this.players[0].killedPieces, this.players[1].killedPieces);
    }
}

export default Chess;
