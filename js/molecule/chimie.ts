//import math from './lib/math.min.js';

const ATOM_LIST = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
  "Cs",
  "Ba",
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "Hf",
  "Ta",
  "W",
  "Re",
  "Os",
  "Ir",
  "Pt",
  "Au",
  "Hg",
  "Tl",
  "Pb",
  "Bi",
  "Po",
  "At",
  "Rn",
  "Fr",
  "Ra",
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
  "Rf",
  "Db",
  "Sg",
  "Bh",
  "Hs",
  "Mt",
  "Ds",
  "Rg",
  "Cn",
  "Nh",
  "Fl",
  "Mc",
  "Lv",
  "Ts",
  "Og",
];
const MOLAR_LIST = [
  1.008, 4.003, 6.941, 9.012, 10.811, 12.011, 14.007, 15.999, 18.998, 20.18,
  22.99, 24.305, 26.982, 28.086, 30.974, 32.066, 35.453, 39.948, 39.098, 40.078,
  44.956, 47.88, 50.942, 51.996, 54.938, 55.847, 58.933, 58.69, 63.556, 65.39,
  69.723, 72.61, 74.922, 78.96, 79.904, 83.798, 85.467, 87.62, 88.906, 91.224,
  92.906, 95.94, 98.906, 101.07, 102.905, 106.42, 107.868, 112.411, 114.82,
  118.71, 121.75, 127.6, 126.904, 131.293, 132.905, 137.327, 138.906, 140.115,
  140.908, 144.24, 146.915, 150.36, 151.965, 157.25, 158.925, 162.5, 164.93,
  167.26, 168.934, 173.04, 174.967, 178.49, 180.948, 183.85, 186.207, 190.23,
  192.217, 195.084, 196.967, 200.59, 204.383, 207.2, 208.98, 208.982, 209.987,
  222.018, 223.02, 226.025, 227.028, 232.038, 231.036, 238.029, 237.048,
  244.064, 243.061, 247.07, 247.07, 251.08, 252.083, 257.095, 258.099, 259.101,
  260.105, 261.108, 262.114, 263.118, 262.123, 265.0, 266.0, 269.0, 272.0,
  277.0, 286.0, 289.0, 289.0, 293.0, 294.0, 294.0,
];

// les méthodes statiques
function mélange(molécules: Molécule[]): Molécule {
  let p: bigint = <bigint>(<unknown>1);
  for (let i = 0; i < molécules.length; i++) {
    p = p * molécules[i].getProduitFacteursPremiers();
  }
  return new Molécule(undefined, p);
}
function getMasseMolaire(formuleBrute: String): number {
  let x = formuleBrute.replace(" ", "");
  for (let i = 0; i < ATOM_LIST.length; i++)
    if (ATOM_LIST[i].length == 2)
      x = x.replace(ATOM_LIST[i], "(" + MOLAR_LIST[i] + ")");
  for (let i = 0; i < ATOM_LIST.length; i++)
    if (ATOM_LIST[i].length == 1)
      x = x.replace(ATOM_LIST[i], "(" + MOLAR_LIST[i] + ")");
  for (let i = 0; i < 10; i++) x = x.replace(i + "(", i + "+(");
  x = x.replace(")(", ")+(");
  return Valeur(x);
}
function getMasseAtomique(symbole: String): number {
  let x = symbole;
  for (let i = 0; i < ATOM_LIST.length; i++)
    if (ATOM_LIST[i] == x) return MOLAR_LIST[i];
  return Number.NaN;
}
