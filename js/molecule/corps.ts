class Corps {
  // les données
  protected _masse = 1;
  protected _charge = 0;

  // les constructeurs
  constructor(masse?: number, charge?: number) {
    if (masse && charge) {
      this._masse = masse;
      this._charge = charge;
    } else if (masse) {
      this._masse = masse;
    }
  }

  public get masse(): number {
    return this._masse;
  }
  public get charge(): number {
    return this._charge;
  }
  protected set masse(masse: number) {
    this._masse = masse;
  }
  protected set charge(charge: number) {
    this._charge = charge;
  }

  // Particules élémentaires
  public static PROTON = new Corps(934, +1);
  public static ELECTRON = new Corps(511e-3, -1);
  public static NEUTRON = new Corps(939, 0);
}
