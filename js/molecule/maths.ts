// Quelques constantes utiles
const CHIFFRE = "0123456789";
const LETTRE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SYMBOLE = "+-×÷";
const CHIFFRE_EXPOSANT =
  "\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079";
const CHIFFRE_INDICE =
  "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089";
const CHIFFRE_ROMAIN = "IVXLCDM";
const LETTRE_GREQUE =
  "\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039A" +
  "\u039B\u039C\u039D\u039E\u039F\u03A0\u03A1\u03A3\u03A4\u03A5" +
  "\u03A6\u03A7\u03A8\u03A9";
const NOMBRE_PREMIER = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
  613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
  709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
  821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
  919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
];

function versIndice(Expression: string): string {
  let x = Expression;
  for (let i = 0; i < 10; i++)
    while (x.indexOf(CHIFFRE.charAt(i)) != -1)
      x = x.replace(CHIFFRE.charAt(i), CHIFFRE_INDICE.charAt(i));
  return x;
}
function versExposant(Expression: string): string {
  let x = Expression;
  for (let i = 0; i < 10; i++)
    while (x.indexOf(CHIFFRE.charAt(i)) != -1)
      x = x.replace(CHIFFRE.charAt(i), CHIFFRE_EXPOSANT.charAt(i));
  return x;
}
function Valeur(Expression: string): number {
  let e = Expression;
  return math.evaluate(e);
}

// Calculer le produit d'une matrice et d'un scalaire
function Produit(Nombre: number, Matrice: number[]): number[] {
  let M: number[] = [];
  for (let i = 0; i < Matrice.length; i++) {
    M[i] = Nombre * Matrice[i];
  }
  return M;
}
function Produit_(Nombre: number, Matrice: number[][]): number[][] {
  let M: number[][] = [];
  for (let i = 0; i < Matrice.length; i++) {
    M[i] = [];
    for (let j = 0; j < Matrice[i].length; j++)
      M[i][j] = Nombre * Matrice[i][j];
  }
  return M;
}

// Calculer le déterminant d'une matrice carrée
function Déterminant(Matrice_carrée: number[][]) {
  let x = 0,
    M = Matrice_carrée;
  if (M.length == 1)
    if (M.length != M[0].length) return Number.NaN;
    else return M[0][0];
  else if (M.length == 2)
    if (M.length != M[0].length || M.length != M[1].length) return Number.NaN;
    else return M[0][0] * M[1][1] - M[1][0] * M[0][1];
  else
    for (let k = 0; k < M.length; k++) {
      if (M.length != M[k].length) return Number.NaN;
      let m: number[][] = [];
      m.length = M.length - 1;
      //
      for (let i = 0; i < m.length; i++) {
        m[i] = [];
        m[i].length = m.length;
        for (let j = 0; j < m[i].length; j++)
          if (i < k) m[i][j] = M[i][j + 1];
          else m[i][j] = M[i + 1][j + 1];
      }
      //
      if (k % 2 == 0) x = x + M[k][0] * Déterminant(m);
      else x = x - M[k][0] * Déterminant(m);
    }
  return x;
}
function Inverse(Matrice_carrée: number[][]): number[][] {
  let M = Matrice_carrée;
  let d = Déterminant(M);
  if (d != 0) return Produit_(1 / d, Transposée(Comatrice(M)));
  else return [[]];
}
function Identité(dimension: number): number[][] {
  if (dimension == 0) return [[]];
  else if (dimension == 1) return [[1]];
  else if (dimension > 1) {
    let M: number[][] = [];
    for (let i = 0; i < dimension; i++) {
      M[i] = [];
      for (let j = 0; j < dimension; j++)
        if (i == j) M[i][j] = 1;
        else M[i][j] = 0;
    }
    return M;
  }
  return [[]];
}
function Comatrice(Matrice_carrée: number[][]): number[][] {
  let M: number[][] = [];
  if (Matrice_carrée.length > 1) {
    for (let i = 0; i < Matrice_carrée.length; i++) {
      M[i] = [];
      if (Matrice_carrée.length != Matrice_carrée[i].length) return [[]];
      for (let j = 0; j < Matrice_carrée[0].length; j++)
        M[i][j] = Cofacteur(Matrice_carrée, i, j);
    }
    return M;
  } else return Identité(1);
}
function Cofacteur(
  Matrice_carrée: number[][],
  ligne: number,
  colonne: number
): number {
  return Math.pow(-1, ligne + colonne) * Mineur(Matrice_carrée, ligne, colonne);
}
function Mineur(
  Matrice_carrée: number[][],
  ligne: number,
  colonne: number
): number {
  let M: number[][] = [];
  M.length = Matrice_carrée.length - 1;
  for (let i = 0; i < M.length; i++) {
    M[i] = [];
    M[i].length = Matrice_carrée[i].length - 1;
    for (let j = 0; j < M[i].length; j++)
      if (i < ligne && j < colonne) M[i][j] = Matrice_carrée[i][j];
      else if (i < ligne && j >= colonne) M[i][j] = Matrice_carrée[i][j + 1];
      else if (i >= ligne && j < colonne) M[i][j] = Matrice_carrée[i + 1][j];
      else M[i][j] = Matrice_carrée[i + 1][j + 1];
  }
  return Déterminant(M);
}

// Calculer la transposée d'une matrice carrée
function Transposée(Matrice: number[][]): number[][] {
  let M: number[][] = [];
  M.length = Matrice.length;
  if (M.length > 0) {
    for (let i = 0; i < M.length; i++) {
      M[i] = [];
      M[i].length = Matrice[i].length;
      for (let j = 0; j < M[i].length; j++) M[i][j] = Matrice[j][i];
    }
    return M;
  } else return [];
}

// Retourne une fraction irréductible équivalente à la fraction donnée
function Fraction(Numérateur: number, Dénominateur: number): number[] {
  let n = PGCD(Numérateur, Dénominateur);
  return [Numérateur / n, Dénominateur / n];
}
function Fraction_(Elements: number[]): number[] {
  let n = PGCD_(Elements);
  let x: number[] = [];
  for (let i = 0; i < Elements.length; i++) x[i] = Elements[i] / n;
  return x;
}
function Fraction__(Elements: number[], ordre: number): number[] {
  let x = Elements;
  for (let i = 0; i < x.length; i++)
    if (Math.round(x[i]) !== x[i]) {
      let z = Fraction___(x[i], ordre);
      if (z === null) return null;
      x = Produit(z[1], x);
      x[i] = z[0];
    }
  return Fraction_(x);
}
function Fraction___(Nombre_décimal: number, ordre: number): number[] {
  let f: number[] = null;
  let x = "" + Nombre_décimal;
  if (parseInt(x) == Nombre_décimal) return [Nombre_décimal, 1];
  try {
    let n = x.indexOf(".");
    let m = x.indexOf("E");
    if (n != -1 && m == -1) {
      f = Fraction____(
        Nombre_décimal,
        ordre,
        x.substring(n + 1, x.length).length
      );
      if (Math.abs(f[0] / f[1] - Nombre_décimal) <= ordre) return f;
    } else return null;
  } catch (error) {
    return null;
  }
}
function Fraction____(
  Nombre_décimal: number,
  ordre: number,
  Longueur_décimale: number
): number[] {
  let x = Nombre_décimal + "";
  if (parseInt(x) == Nombre_décimal) return [parseInt(x), 1];
  if (Longueur_décimale < 10) {
    let k = Math.pow(10, Longueur_décimale);
    return Fraction(Nombre_décimal * k, k);
  }
  for (let i = 1; i < 10; i++) {
    let y = i + "";
    y = y + y + y + y;
    if (x.indexOf(y) != -1) {
      let f = Fraction___(Math.round(9 * Nombre_décimal), ordre);
      return Fraction(f[0], f[1] * 9);
    }
  }
  return null;
}
function PGCD_(nombres: number[]): number {
  let x = nombres[0];
  for (let n of nombres) x = PGCD(x, n);
  return x;
}
function PGCD(nombre1: number, nombre2: number): number {
  if (nombre1 == 0) return Math.abs(nombre2);
  else if (nombre2 == 0) return Math.abs(nombre1);
  let x = Math.max(Math.abs(nombre1), Math.abs(nombre2)),
    y = Math.min(Math.abs(nombre1), Math.abs(nombre2));
  let r = x % y;
  if (r == 0) return y;
  else return PGCD(y, r);
}
function PPCM(nombre1: number, nombre2: number): number {
  return (nombre1 * nombre2) / PGCD(nombre1, nombre2);
}
