class Atome extends Corps {
  // les données d'instances
  private protons: number;
  private symbole: string;
  public nombrePremier: number;

  // les constructeurs
  constructor(Z?: number, symbole?: string) {
    super();
    if (Z) this.AtomeDepuisNombre(Z);
    else if (symbole) this.AtomeDepuisSymbole(symbole);
  }
  private AtomeDepuisNombre(Z: number): void {
    if (1 <= Z && Z <= 118) {
      this.protons = Z;
      this.symbole = ATOM_LIST[this.protons - 1];
      this.nombrePremier = NOMBRE_PREMIER[this.protons - 1];
      this.masse = MOLAR_LIST[this.protons - 1];
    }
  }
  private AtomeDepuisSymbole(symbole: string): void {
    for (let Z = 1; Z <= ATOM_LIST.length; Z++)
      if (ATOM_LIST[Z - 1] == symbole) {
        this.protons = Z;
        this.symbole = ATOM_LIST[this.protons - 1];
        this.nombrePremier = NOMBRE_PREMIER[this.protons - 1];
        this.masse = MOLAR_LIST[this.protons - 1];
      }
  }

  // les getteurs
  public getSymbole(): string {
    return this.symbole;
  }
  public getProtons(): number {
    return this.protons;
  }
  protected getNombrePremier(): number {
    return this.nombrePremier;
  }

  public equals(obj: Object): boolean {
    return (
      obj instanceof Atome &&
      (<Atome>obj).getNombrePremier() === this.nombrePremier
    );
  }

  public static valueOf(numerosAtomiques: number[]): Atome[] {
    let x: Atome[] = [];
    for (let i = 0; i < numerosAtomiques.length; i++)
      x.push(new Atome(numerosAtomiques[i]));
    return x;
  }
  public static binarySearch(a: Atome[], key: Atome): number {
    for (let i = 0; i < a.length; i++) if (a[i].equals(key)) return i;
    return -1;
  }
}
