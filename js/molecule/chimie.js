//import math from './lib/math.min.js';
var ATOM_LIST = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
    "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca",
    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
    "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
    "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn",
    "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
    "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb",
    "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
    "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th",
    "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm",
    "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds",
    "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];
var MOLAR_LIST = [1.008, 4.003, 6.941, 9.012, 10.811, 12.011, 14.007, 15.999, 18.998, 20.180,
    22.990, 24.305, 26.982, 28.086, 30.974, 32.066, 35.453, 39.948, 39.098, 40.078,
    44.956, 47.880, 50.942, 51.996, 54.938, 55.847, 58.933, 58.690, 63.556, 65.390,
    69.723, 72.610, 74.922, 78.960, 79.904, 83.798, 85.467, 87.620, 88.906, 91.224,
    92.906, 95.940, 98.906, 101.070, 102.905, 106.420, 107.868, 112.411, 114.820, 118.710,
    121.750, 127.600, 126.904, 131.293, 132.905, 137.327, 138.906, 140.115, 140.908, 144.240,
    146.915, 150.360, 151.965, 157.250, 158.925, 162.500, 164.930, 167.260, 168.934, 173.040,
    174.967, 178.490, 180.948, 183.850, 186.207, 190.230, 192.217, 195.084, 196.967, 200.590,
    204.383, 207.200, 208.980, 208.982, 209.987, 222.018, 223.020, 226.025, 227.028, 232.038,
    231.036, 238.029, 237.048, 244.064, 243.061, 247.070, 247.070, 251.080, 252.083, 257.095,
    258.099, 259.101, 260.105, 261.108, 262.114, 263.118, 262.123, 265.000, 266.000, 269.000,
    272.000, 277.000, 286.000, 289.000, 289.000, 293.000, 294.000, 294.000];
// les méthodes statiques
function mélange(molécules) {
    var p = 1;
    for (var i = 0; i < molécules.length; i++) {
        p = p * molécules[i].getProduitFacteursPremiers();
    }
    return new Molécule(undefined, p);
}
function getMasseMolaire(formuleBrute) {
    var x = formuleBrute.replace(" ", "");
    for (var i = 0; i < ATOM_LIST.length; i++)
        if (ATOM_LIST[i].length == 2)
            x = x.replace(ATOM_LIST[i], "(" + MOLAR_LIST[i] + ")");
    for (var i = 0; i < ATOM_LIST.length; i++)
        if (ATOM_LIST[i].length == 1)
            x = x.replace(ATOM_LIST[i], "(" + MOLAR_LIST[i] + ")");
    for (var i = 0; i < 10; i++)
        x = x.replace(i + "(", i + "+(");
    x = x.replace(")(", ")+(");
    return Valeur(x);
}
function getMasseAtomique(symbole) {
    var x = symbole;
    for (var i = 0; i < ATOM_LIST.length; i++)
        if (ATOM_LIST[i] == x)
            return MOLAR_LIST[i];
    return Number.NaN;
}
