import { Piece } from "./piece";
import Stack from "./stack";

export enum Color {
    WHITE = "WHITE",
    BLACK = "BLACK",
}
class Player {
    private _name: string;
    private _color: Color;
    private _killedPieces: Piece[];

    constructor(name: string, color: Color) {
        this._name = name;
        this._color = color;
        this._killedPieces = [];
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    get killedPieces() {
        return this._killedPieces;
    }
}

export default Player;