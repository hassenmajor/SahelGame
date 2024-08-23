class Réaction {
  Réactifs: Molécule[];
  Produits: Molécule[];

  public static getRéaction(réactifs: string[], produits: string[]) {
    return new Réaction(
      Molécule.valuesOf(réactifs),
      Molécule.valuesOf(produits)
    );
  }
  public constructor(réactifs: Molécule[], produits: Molécule[]) {
    this.Réactifs = réactifs;
    this.Produits = produits;
  }

  public getCoéfficients(): number[] {
    let m: number[][] = Réaction.matriceRéaction(this.Réactifs, this.Produits);
    if (Déterminant(m) != 0) {
      let x: number[] = [];
      x.length = this.Réactifs.length + this.Produits.length;
      m = Inverse(m);
      for (let i = 0; i < x.length; i++) x[i] = m[i][0];
      return x;
    }
    return [];
  }
  private static matriceCarrée(systèmeLinéaire: number[][]): number[][] {
    let M = systèmeLinéaire;
    if (M.length == M[0].length) {
      return M;
    } else if (M.length > M[0].length) {
      for (let i = 1; i < M.length; i++)
        for (let k = i + 1; k < M.length; k++)
          if (Produit(M[i][0] / M[k][0], M[k]) === M[i]) {
            let m = [...M.slice(0, k), ...M.slice(k + 1, M.length)];
            return Réaction.matriceCarrée(m);
          }
    }
    return M;
  }
  private static matriceRéaction(
    Réactifs: Molécule[],
    Produits: Molécule[]
  ): number[][] {
    let l = mélange(Réactifs).getAtomes();
    if (l.length !== mélange(Produits).getAtomes().length) return [];
    // for (let a of mélange(Produits).getAtomes()) {
    //     if (l.indexOf(a)==-1)
    //         return [];
    // }
    let c = Réactifs.length + Produits.length;
    let x: number[][] = [[]];
    x.length = l.length + 1;
    x[0].length = c;
    x[0][0] = 1;
    for (let j = 1; j < c; j++) x[0][j] = 0;
    for (let i = 1; i < l.length + 1; i++) {
      x[i] = [];
      for (let j = 0; j < c; j++)
        if (j < Réactifs.length) x[i][j] = Réactifs[j].getEffectif(l[i - 1]);
        else x[i][j] = -Produits[j - Réactifs.length].getEffectif(l[i - 1]);
    }
    if (x.length === x[0].length) {
      return x;
    } else if (x.length > x[0].length) {
      x = Réaction.matriceCarrée(x);
      if (x.length == x[0].length) return x;
      let ProduitsPlus: Molécule[] = [];
      ProduitsPlus.length = Produits.length + 1;
      ProduitsPlus = Produits.slice(0, Produits.length);
      let L: Atome[] = [];
      let Espèce: Molécule[] = [];
      Espèce = [
        ...Réactifs.slice(0, Réactifs.length),
        ...Produits.slice(0, Produits.length),
      ];
      for (let i = 0; i < c; i++)
        if (Espèce[i].getAtomes().length == 1)
          L = [...L, Espèce[i].getAtomes()[0]];
      for (let i = 0; i < l.length; i++)
        if (Atome.binarySearch(L, l[i]) < 0) {
          ProduitsPlus[Produits.length] = Molécule.valueOf(l[i]);
          x = Réaction.matriceRéaction(Réactifs, ProduitsPlus);
          return x;
        }
    }
    return [];
  }

  public getRéactifs(): Molécule[] {
    return this.Réactifs;
  }
  public getProduits(): Molécule[] {
    return this.Produits;
  }
}
