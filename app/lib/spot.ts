
class Spot {
    private _piece: string | null;

    constructor(piece: string | null) {
        this._piece = piece;
    }

    get piece() {
        return this._piece;
    }
}

export default Spot;