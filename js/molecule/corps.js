var Corps = /** @class */ (function () {
    // les constructeurs
    function Corps(masse, charge) {
        // les données
        this._masse = 1;
        this._charge = 0;
        if (masse && charge) {
            this._masse = masse;
            this._charge = charge;
        }
        else if (masse) {
            this._masse = masse;
        }
    }
    Object.defineProperty(Corps.prototype, "masse", {
        get: function () {
            return this._masse;
        },
        set: function (masse) {
            this._masse = masse;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Corps.prototype, "charge", {
        get: function () {
            return this._charge;
        },
        set: function (charge) {
            this._charge = charge;
        },
        enumerable: false,
        configurable: true
    });
    // Particules élémentaires
    Corps.PROTON = new Corps(934e0, +1);
    Corps.ELECTRON = new Corps(511e-3, -1);
    Corps.NEUTRON = new Corps(939e0, 0);
    return Corps;
}());
