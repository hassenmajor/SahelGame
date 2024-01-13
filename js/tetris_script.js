class Tetriminos {
  static typeLettres = ["O", "I", "S", "Z", "L", "J", "T"];
  _type = -1;
  _points = new Array();
  _couleur = "";
  abscisse = 4;
  ordonnee = 0;
  isTimer = true;
  // types: O I S Z L J T
  constructor(type = -1) {
    if (type < 0 || type >= Tetriminos.typeLettres.length)
      type = Math.round(Math.random() * 7);
    this._type = type;
    //
    switch (type) {
      case 0: // O
        this._points = [
          [0, 0],
          [1, 0],
          [0, 1],
          [1, 1],
        ];
        this._couleur = "yellow";
        break;
      case 1: // I
        this._points = [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
        ];
        this._couleur = "cyan";
        break;
      case 2: // S
        this._points = [
          [1, 0],
          [2, 0],
          [0, 1],
          [1, 1],
        ];
        this._couleur = "green";
        break;
      case 3: // Z
        this._points = [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 1],
        ];
        this._couleur = "red";
        break;
      case 4: // L
        this._points = [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 2],
        ];
        this._couleur = "orange";
        break;
      case 5: // J
        this._points = [
          [1, 0],
          [1, 1],
          [1, 2],
          [0, 2],
        ];
        this._couleur = "blue";
        break;
      case 6: // T
        this._points = [
          [0, 0],
          [1, 0],
          [2, 0],
          [1, 1],
        ];
        this._couleur = "purple";
        break;
      default:
        break;
    }
  }

  tourner() {
    let nouveauPoints = this.points.slice();
    if (this.type == 1)
      // I
      for (let i = 0; i < this.points.length; i++) {
        let [x, y] = this.points[i];
        nouveauPoints[i] = [y, x];
      }
    else
      for (let i = 0; i < this.points.length; i++) {
        let [x, y] = this.points[i];
        [x, y] = [x - 1, y - 1];
        nouveauPoints[i] = [-y + 1, x + 1];
      }
    for (let i = 0; i < this.points.length; i++) {
      let [x, y] = nouveauPoints[i];
      if (
        x + this.abscisse < 0 ||
        x + this.abscisse >= 10 ||
        y + this.ordonnee < 0 ||
        y + this.ordonnee >= 20 ||
        pile.includes(x + this.abscisse + 10 * (y + this.ordonnee))
      )
        return;
    }
    this._points = nouveauPoints;
  }
  deplacer(mouvement) {
    for (let i = 0; i < this.points.length; i++) {
      let [x, y] = this.points[i];
      if (
        x + this.abscisse + mouvement < 0 ||
        x + this.abscisse + mouvement >= 10 ||
        pile.includes(x + this.abscisse + mouvement + 10 * (y + this.ordonnee))
      )
        return;
    }
    this.abscisse = this.abscisse + mouvement;
    return;
  }
  glisser() {
    for (let i = 0; i < this.points.length; i++) {
      let [x, y] = this.points[i];
      if (
        y + this.ordonnee + 1 >= 20 ||
        pile.includes(x + this.abscisse + 10 * (y + this.ordonnee + 1))
      ) {
        this.isTimer = false;
        actualiserPile();
        return;
      }
    }
    this.ordonnee = this.ordonnee + 1;
  }

  get type() {
    return this._type;
  }
  set type(type) {
    this._type = type;
  }

  get points() {
    return this._points;
  }

  get typeLettre() {
    return Tetriminos.typeLettres[this._type];
  }

  get couleur() {
    return this._couleur;
  }

  timer() {
    if (this.isTimer) {
      this.glisser();
      actualiserPiece(this);
      setTimeout(() => {
        this.timer();
      }, 400);
    }
  }
}

/* 
setInterval(() => {
  if (nouvelPiece.isTimer) {
    nouvelPiece.glisser();
    actualiserPiece(nouvelPiece);
  }
}, 400); */

const audioWinner = new Audio("raw/fairydust.wav");

// carte: 10 * 20
const grille = document.getElementsByClassName("case");
function morceau(x, y) {
  return grille[x + 10 * y];
}

//
let nouvelPiece = new Tetriminos();
let pile = [];
function nettoyerPile() {
  for (let i = 0; i < 20; i++)
    for (let j = 0; j < 10; j++)
      if (!pile.includes(j + 10 * i))
        morceau(j, i).style.background = "transparent";
}
function actualiserPiece(piece) {
  nettoyerPile();
  piece.points.forEach((point) => {
    let [x, y] = point;
    if (
      x + piece.abscisse >= 0 ||
      x + piece.abscisse < 10 ||
      y + piece.ordonnee >= 0 ||
      y + piece.ordonnee < 20 ||
      !pile.includes(j + 10 * i)
    )
      morceau(x + piece.abscisse, y + piece.ordonnee).style.background =
        piece.couleur;
  });
}
function actualiserPile() {
  nouvelPiece.points.forEach((point) => {
    let [x, y] = point;
    pile.push(x + nouvelPiece.abscisse + 10 * (y + nouvelPiece.ordonnee));
  });
  pile.sort((a, b) => b - a);
  //
  for (let i = 19; i >= 0; i--) {
    let isFull = true;
    for (let j = 9; j >= 0; j--) {
      if (!pile.includes(j + 10 * i)) isFull = false;
      else if (j + 10 * i < 40) {
        if (window.confirm("Game Over")) window.location.reload();
        return;
      }
    }
    if (isFull) {
      console.log("isFull", pile);
      audioWinner.play();
      pile = pile.filter((point) => point < i * 10 || point > i * 10 + 9);
      pile = pile.map((point) => {
        if (point < i * 10) {
          grille[point + 10].style.background = grille[point].style.background;
          grille[point].style.background = "transparent";
          return point + 10;
        }
        return point;
      });
      i++;
    }
  }
  console.log(pile);
  //
  nouvelPiece = new Tetriminos();
  nouvelPiece.timer();
}
nouvelPiece.timer();

function changerSens(bouton) {
  switch ("Arrow" + bouton.id) {
    case "ArrowDown":
      nouvelPiece.glisser();
      break;
    case "ArrowUp":
      nouvelPiece.tourner();
      break;
    case "ArrowRight":
      nouvelPiece.deplacer(1);
      break;
    case "ArrowLeft":
      nouvelPiece.deplacer(-1);
      break;
  }
}

const eventFunction = function (event) {
  if (nouvelPiece.isTimer)
    switch (event.key) {
      case "ArrowDown":
        nouvelPiece.glisser();
        break;
      case "ArrowUp":
        nouvelPiece.tourner();
        break;
      case "ArrowRight":
        nouvelPiece.deplacer(1);
        break;
      case "ArrowLeft":
        nouvelPiece.deplacer(-1);
        break;
    }
};
document.addEventListener("keydown", eventFunction);
