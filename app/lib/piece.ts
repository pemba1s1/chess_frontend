import { Color } from "./player";

enum PieceIconPath {
    B_PAWN = "/pieces/black/pawn.svg",
    B_ROOK = "/pieces/black/rook.svg",
    B_KNIGHT = "/pieces/black/knight.svg",
    B_BISHOP = "/pieces/black/bishop.svg",
    B_QUEEN = "/pieces/black/queen.svg",
    B_KING = "/pieces/black/king.svg",
    W_PAWN = "/pieces/white/pawn.svg",
    W_ROOK = "/pieces/white/rook.svg",
    W_KNIGHT = "/pieces/white/knight.svg",
    W_BISHOP = "/pieces/white/bishop.svg",
    W_QUEEN = "/pieces/white/queen.svg",
    W_KING = "/pieces/white/king.svg",
}

export enum PieceType {
    PAWN = "pawn",
    ROOK = "rook",
    KNIGHT = "knight",
    BISHOP = "bishop",
    QUEEN = "queen",
    KING = "king",
}

export enum NoOfSteps {
    ONE = 1,
    INFINITE = 8
}

export type Direction = {
    direction: number[][];
    steps: NoOfSteps;
}

export class Piece {
    protected _color: Color;
    protected _icon: string;
    protected _type: string;
    protected _moveDirection: Direction;

    constructor(color: Color, icon: string, type: string, moveDirection: Direction) {
        this._color = color;
        this._icon = icon;
        this._type = type;
        this._moveDirection = moveDirection;
    }

    get color(): Color {
        return this._color;
    }

    get icon(): string {
        return this._icon;
    }

    get type(): string {
        return this._type;
    }

    getMoveDirection(): Direction {
        return this._moveDirection;
    }
}

export class Pawn extends Piece {
    private _firstMoveDirection: Direction;
    private _killDirection: Direction;
    private _hasMoved: Boolean = false;
    constructor(color: Color) {
        const icon = color === Color.WHITE ? PieceIconPath.W_PAWN : PieceIconPath.B_PAWN;
        const direction: Direction = color === Color.WHITE ? { direction: [[-1, 0]], steps: NoOfSteps.ONE } : { direction: [[1, 0]], steps: NoOfSteps.ONE };
        super(color, icon, PieceType.PAWN, direction);
        
        this._firstMoveDirection = color === Color.WHITE ? { direction: [[-2, 0]], steps: NoOfSteps.ONE } : { direction: [[2, 0]], steps: NoOfSteps.ONE }; 
        this._killDirection = color === Color.WHITE ? { direction: [[-1, 1], [-1, -1]], steps: NoOfSteps.ONE } : { direction: [[1, 1], [1, -1]], steps: NoOfSteps.ONE };
        this._hasMoved = false;
    }

    set hasMoved(value: Boolean) {
        this._hasMoved = value;
    }

    get hasMoved(): Boolean {
        return this._hasMoved;
    }

    get killDirection(): Direction {
        return this._killDirection;
    }

    getMoveDirection(): Direction {
        if(!this.hasMoved) {
            return { direction: this._moveDirection.direction.concat(this._firstMoveDirection.direction), steps: NoOfSteps.ONE };
        }
        return super.getMoveDirection();
    }
}

export class Rook extends Piece {
    constructor(color: Color) {
        const icon = color === Color.WHITE ? PieceIconPath.W_ROOK : PieceIconPath.B_ROOK;
        const direction: Direction = { direction: [[1, 0], [0, 1], [-1, 0], [0, -1]], steps: NoOfSteps.INFINITE };
        super(color, icon, PieceType.ROOK, direction);
    }
}

export class Knight extends Piece {
    constructor(color: Color) {
        const icon = color === Color.WHITE ? PieceIconPath.W_KNIGHT : PieceIconPath.B_KNIGHT;
        const direction: Direction = { direction: [[2, 1], [1, 2], [-2, 1], [-1, 2], [2, -1], [1, -2], [-2, -1], [-1, -2]], steps: NoOfSteps.ONE };
        super(color, icon, PieceType.KNIGHT, direction);
    }
}

export class Bishop extends Piece { 
    constructor(color: Color) {
        const icon = color === Color.WHITE ? PieceIconPath.W_BISHOP : PieceIconPath.B_BISHOP;
        const direction: Direction = { direction: [[1, 1], [-1, 1], [1, -1], [-1, -1]], steps: NoOfSteps.INFINITE };
        super(color, icon, PieceType.BISHOP, direction);
    }
}

export class Queen extends Piece {  
    constructor(color: Color) {
        const icon = color === Color.WHITE ? PieceIconPath.W_QUEEN : PieceIconPath.B_QUEEN;
        const direction: Direction = { direction: [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]], steps: NoOfSteps.INFINITE };
        super(color, icon, PieceType.QUEEN, direction);
    }
}

export class King extends Piece {
    constructor(color: Color) {
        const icon = color === Color.WHITE ? PieceIconPath.W_KING : PieceIconPath.B_KING;
        const direction: Direction = { direction: [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]], steps: NoOfSteps.ONE };
        super(color, icon, PieceType.KING, direction);
    }
}

