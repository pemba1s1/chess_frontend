import Board from "./board";
import Move from "./move";
import Player, { Color } from "./player";
import Stack from "./stack";

enum GameStatus {
    WHITE_WINS = "WHITE_WINS",
    BLACK_WINS = "BLACK_WINS",
    IN_PROGRESS = "IN_PROGRESS",
    STALEMATE = "STALEMATE",
    FORFEIT = "FORFEIT",
    RESIGNATION = "RESIGNATION",
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
}

export default Chess;
