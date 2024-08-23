class Molécule extends Corps {
  // les données d'instances
  private formuleBrute: string;
  private produitFacteursPremiers: bigint;

  // les constructeurs
  constructor(
    formuleBrute?: string,
    produitFacteursPremiers?: bigint,
    elements?: Atome[],
    effectifs?: number[]
  ) {
    super();
    if (formuleBrute) this.MoléculeDepuisFormule(formuleBrute);
    else if (produitFacteursPremiers)
      this.MoléculeDepuisCode(produitFacteursPremiers);
    else if (elements && effectifs)
      this.MoléculeDepuisAtomes(elements, effectifs);
  }
  private MoléculeDepuisAtomes(elements: Atome[], effectifs: number[]): void {
    if (elements.length == effectifs.length) {
      this.produitFacteursPremiers = <bigint>(<unknown>1);
      for (let i = 0; i < effectifs.length; i++) {
        // Calculer le produit de facteurs premiers
        this.produitFacteursPremiers =
          this.produitFacteursPremiers *
          <bigint>(<unknown>Math.pow(elements[i].nombrePremier, effectifs[i]));
      }
      this.calculer();
    }
  }
  private MoléculeDepuisFormule(formuleBrute: string): void {
    let x = formuleBrute.replace(" ", "");
    // Calculer le produit de facteurs premiers
    // x = versExposant(x);
    for (let i = 0; i < ATOM_LIST.length; i++)
      if (ATOM_LIST[i].length == 2)
        while (x.indexOf(ATOM_LIST[i]) != -1)
          x = x.replace(
            new RegExp(ATOM_LIST[i]),
            "(" + NOMBRE_PREMIER[i] + ")"
          );
    for (let i = 0; i < ATOM_LIST.length; i++)
      if (ATOM_LIST[i].length == 1)
        while (x.indexOf(ATOM_LIST[i]) != -1)
          x = x.replace(
            new RegExp(ATOM_LIST[i]),
            "(" + NOMBRE_PREMIER[i] + ")"
          );
    for (let i of CHIFFRE) {
      while (x.indexOf(")" + i) != -1) x = x.replace(")" + i, ")^" + i);
      while (x.indexOf(i + "(") != -1) x = x.replace(i + "(", i + "*(");
    }
    this.produitFacteursPremiers = <bigint>(<unknown>Valeur(x));
    this.calculer();
  }
  private MoléculeDepuisCode(produitFacteursPremiers: bigint): void {
    this.produitFacteursPremiers = produitFacteursPremiers;
    this.calculer();
  }
  private calculer(): void {
    let elements = this.getAtomes();
    let effectifs = this.getEffectifs();
    this.masse = 0;
    this.formuleBrute = "";
    for (let i = 0; i < elements.length; i++) {
      // Calculer la masse molaire
      this.masse = this.masse + effectifs[i] * elements[i].masse;
      // Déterminer la formule brute
      if (effectifs[i] == 1)
        this.formuleBrute = this.formuleBrute + elements[i].getSymbole();
      else
        this.formuleBrute =
          this.formuleBrute +
          elements[i].getSymbole() +
          versIndice(effectifs[i] + "");
    }
  }

  // les getteurs
  public getFormuleBrute(): string {
    return this.formuleBrute;
  }
  public getProduitFacteursPremiers(): bigint {
    return this.produitFacteursPremiers;
  }

  public getAtomes(): Atome[] {
    let x = this.produitFacteursPremiers;
    let y: number[] = [];
    for (let i = 0; i < NOMBRE_PREMIER.length; i++) {
      if (x % <bigint>(<unknown>NOMBRE_PREMIER[i]) === <bigint>(<unknown>0))
        y.push(i + 1);
    }
    return Atome.valueOf(y);
  }
  public getEffectifs(): number[] {
    let x = this.getAtomes();
    let y: number[] = [];
    for (let i = 0; i < x.length; i++) y[i] = this.getEffectif(x[i]);
    return y;
  }
  public getEffectif(element: Atome): number {
    let x = this.produitFacteursPremiers;
    let y = 0;
    while (
      x % <bigint>(<unknown>element.nombrePremier) ===
      <bigint>(<unknown>0)
    ) {
      x = x / <bigint>(<unknown>element.nombrePremier);
      y++;
    }
    return y;
  }
  public getEffectifTotal(): number {
    let y = 0;
    for (const element of this.getAtomes()) y = y + this.getEffectif(element);
    return y;
  }

  public equals(obj: Object): boolean {
    return (
      obj instanceof Molécule &&
      (<Molécule>obj).getProduitFacteursPremiers() ===
        this.produitFacteursPremiers
    );
  }

  public static valueOf(element: Atome): Molécule {
    return new Molécule(undefined, undefined, [element], [1]);
  }
  public static valuesOf(formuleBrute: string[]): Molécule[] {
    let x = formuleBrute;
    let y: Molécule[] = [];
    for (let i = 0; i < x.length; i++) y[i] = new Molécule(x[i]);
    return y;
  }
}
