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

export class Piece {
    private _color: Color;
    private _icon: string;

    constructor(color: Color, icon: string) {
        this._color = color;
        this._icon = icon;
    }

    get color() {
        return this._color;
    }

    get icon() {
        return this._icon;
    }
}

export class Pawn extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_PAWN);
            return;
        }
        super(color, PieceIconPath.B_PAWN);
    }
}

export class Rook extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_ROOK);
            return;
        }
        super(color, PieceIconPath.B_ROOK);
    }
}

export class Knight extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_KNIGHT);
            return;
        }
        super(color, PieceIconPath.B_KNIGHT);
    }
}

export class Bishop extends Piece { 
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_BISHOP);
            return;
        }
        super(color, PieceIconPath.B_BISHOP);
    }
}

export class Queen extends Piece {  
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_QUEEN);
            return;
        }
        super(color, PieceIconPath.B_QUEEN);
    }
}

export class King extends Piece {
    constructor(color: Color) {
        if (color === Color.WHITE) {
            super(color, PieceIconPath.W_KING);
            return;
        }
        super(color, PieceIconPath.B_KING);
    }
}

