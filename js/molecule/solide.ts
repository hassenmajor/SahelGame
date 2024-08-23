class Solide extends Corps {
  // les données
  private taille = 0;
  private age = Number.POSITIVE_INFINITY;

  public constructor(
    masse?: number,
    charge?: number,
    taille?: number,
    age?: number
  ) {
    super(masse, charge);
    if (taille) this.taille = taille;
    if (age) this.age = age;
  }

  public getDensité() {
    return this.masse / this.taille;
  }

  // Astres principaux
  public static TERRE = new Solide(5.98e24, 0, 2 * 6.37e6, 0);
  public static LUNE = new Solide(7.36e22, 0, 2 * 1.74e6, 0);
  public static SOLEIL = new Solide(1.99e30, 0, 2 * 6.96e8, 0);
}
