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

export class Piece {
    private _color: Color;
    private _icon: string;
    private _type: string;

    constructor(color: Color, icon: string, type: string) {
        this._color = color;
        this._icon = icon;
        this._type = type;
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
}

export class Pawn extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_PAWN, PieceType.PAWN);
            return;
        }
        super(color, PieceIconPath.B_PAWN, PieceType.PAWN);
    }
}

export class Rook extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_ROOK, PieceType.ROOK);
            return;
        }
        super(color, PieceIconPath.B_ROOK, PieceType.ROOK);
    }
}

export class Knight extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_KNIGHT, PieceType.KNIGHT);
            return;
        }
        super(color, PieceIconPath.B_KNIGHT, PieceType.KNIGHT);
    }
}

export class Bishop extends Piece { 
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_BISHOP, PieceType.BISHOP);
            return;
        }
        super(color, PieceIconPath.B_BISHOP, PieceType.BISHOP);
    }
}

export class Queen extends Piece {  
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_QUEEN, PieceType.QUEEN);
            return;
        }
        super(color, PieceIconPath.B_QUEEN, PieceType.QUEEN);
    }
}

export class King extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_KING, PieceType.KING);
            return;
        }
        super(color, PieceIconPath.B_KING, PieceType.KING);
    }
}

