
export enum Color {
    WHITE = "WHITE",
    BLACK = "BLACK",
}
class Player {
    private _name: string;
    private _color: Color;

    constructor(name: string, color: Color) {
        this._name = name;
        this._color = color;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }
}

export default Player;