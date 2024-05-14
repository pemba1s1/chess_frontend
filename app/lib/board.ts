import Spot from "./spot";

class Board {
    private _board: Spot[][];
    private _defaultBoard: Spot[][] = [
        [new Spot("BR"), new Spot("BN"), new Spot("BB"), new Spot("BQ"), new Spot("BK"), new Spot("BB"), new Spot("BN"), new Spot("BR")],
        [new Spot("BP"), new Spot("BP"), new Spot("BP"), new Spot("BP"), new Spot("BP"), new Spot("BP"), new Spot("BP"), new Spot("BP")],
        [new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null)],
        [new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null)],
        [new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null)],
        [new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null), new Spot(null)],
        [new Spot("WP"), new Spot("WP"), new Spot("WP"), new Spot("WP"), new Spot("WP"), new Spot("WP"), new Spot("WP"), new Spot("WP")],
        [new Spot("WR"), new Spot("WN"), new Spot("WB"), new Spot("WQ"), new Spot("WK"), new Spot("WB"), new Spot("WN"), new Spot("WR")]
    ]

    constructor() {
        this._board = this._defaultBoard;
    }

    get board() {
        return this._board;
    }
}

export default Board;