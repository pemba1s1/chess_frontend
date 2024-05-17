import Board from "./board";
import Move from "./move";
import Player, { Color } from "./player";
import Stack from "./stack";
import PieceCoordinate from "./pieceCoordinate";
import { Direction, Pawn, Piece, PieceType } from "./piece";

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

    get board(): Board {
        return this._board;
    }

    get players(): Player[] {
        return this._players;
    }

    get moves(): Stack<Move> {
        return this._moves;
    }

    get gameStatus(): GameStatus {
        return this._gameStatus;
    }

    get playerTurn(): Color {
        return this._playerTurn;
    }

    switchTurn() {
        this._playerTurn = this._playerTurn == Color.WHITE ? Color.BLACK : Color.WHITE;
    }

    movePiece(from: PieceCoordinate | null, to: PieceCoordinate): Boolean {
        if (!to || !from) {
            return false;
        }
        const fromPiece = this.board.getSquareFromCoordinate(from).piece;
        const toPiece = this.board.getSquareFromCoordinate(to).piece;

        if(fromPiece?.color == toPiece?.color) {
            return false;
        }

        if(toPiece && this.isPieceKillable(to)) {
            this.killPiece(toPiece);
        }
        console.log("Moving piece", from, "to", to);
        this.board.squares[to.x][to.y].setPiece(fromPiece);
        this.board.squares[from.x][from?.y].setPiece(null);
        
        if(fromPiece?.type == PieceType.PAWN) {
            const pawn = fromPiece as Pawn;
            pawn.hasMoved = true;
        }
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

    calcPossibleMoves(from: PieceCoordinate): PieceCoordinate[] {
        const piece = this.board.getSquareFromCoordinate(from).piece;

        if(piece?.type == PieceType.PAWN) {
            return this.calcPossibleMovesForPawn(from, piece as Pawn);
        }
        
        const direction = piece?.getMoveDirection();
        const possibleMoves: PieceCoordinate[] = [];

        direction?.direction.forEach((dir) => {
            for(let i = 1; i <= direction.steps; i++) {
                const x = from.x + dir[0] * i;
                const y = from.y + dir[1] * i;
                const coordinate = new PieceCoordinate(x, y);

                if(x < 0 || x >= 8 || y < 0 || y >= 8 ) {
                    break;
                }

                if(this.coordinateHasPiece(coordinate)) {
                    this.isPieceKillable(coordinate) && possibleMoves.push(coordinate);
                    break;
                }

                possibleMoves.push(coordinate);
            }
        });        

        return possibleMoves;
    }

    calcPossibleMovesForPawn(from: PieceCoordinate, piece: Pawn): PieceCoordinate[] {
        const possibleMoves: PieceCoordinate[] = [];
        const killDirection = piece.killDirection;
        killDirection.direction.forEach((dir) => {
            const x = from.x + dir[0];
            const y = from.y + dir[1];
            const coordinate = new PieceCoordinate(x, y);
            if(x < 0 || x >= 8 || y < 0 || y >= 8 ) {
                return;
            }
            if(this.coordinateHasPiece(coordinate)) {
                this.isPieceKillable(coordinate) && possibleMoves.push(coordinate);
            }
        });

        const normalDirection = piece.getMoveDirection();
        normalDirection.direction.forEach((dir) => {
            const x = from.x + dir[0];
            const y = from.y + dir[1];
            const coordinate = new PieceCoordinate(x, y);
            if(x < 0 || x >= 8 || y < 0 || y >= 8 ) {
                    return;
            }
            if(!this.coordinateHasPiece(coordinate)) {
                possibleMoves.push(coordinate);
            }
        });
        return possibleMoves;
    }

    private coordinateHasPiece(coordinate: PieceCoordinate): Boolean {
        return this.board.getSquareFromCoordinate(coordinate).piece != null;
    }

    private isPieceKillable(coordinate: PieceCoordinate): Boolean {
        return this.board.getSquareFromCoordinate(coordinate).piece?.color != this.playerTurn;
    }
}

export default Chess;
