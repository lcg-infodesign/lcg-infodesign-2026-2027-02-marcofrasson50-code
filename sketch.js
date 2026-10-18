/*
esercitazione 2 - Glifi a forma di sistemi planetari
Ogni glifo ha un pianeta al centro (giallo, arancione o azzurro) con la metà destra in ombra,
da 1 a 3 orbite alla stessa distanza tra loro e da 0 a 2 lune bianche su ogni orbita.
Circa 1 pianeta su 3 ha un anello inclinato. Il caso decide quante orbite e lune ci sono,
dove stanno le lune, grandezza e colore del pianeta e se c'è l'anello.
Le lune girano piano, quelle delle orbite interne un po' più veloci di quelle esterne.
*/

let seme; 
let angolo = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); 
  frameRate(30); 
  seme = random(1000); 
}

function draw() {
  background(15, 20, 45); 

  randomSeed(seme);

  let numeroGlifi = 132; 
  let numeroColonne = ceil(sqrt(numeroGlifi)); 
  let numeroRighe = ceil(numeroGlifi / numeroColonne);
  let dimColonna = width / numeroColonne;
  let dimRiga = height / numeroRighe;
  let dimGlifo = dimRiga * 0.8;
  if (dimColonna < dimRiga) {
    dimGlifo = dimColonna * 0.8;
  }

  let colonna = 0;
  let riga = 0;

  for (let g = 0; g < numeroGlifi; g++) {
    let x = colonna * dimColonna + 0.5 * dimColonna; 
    let y = riga * dimRiga + 0.5 * dimRiga;

    sistemaPlanetario(x, y, dimGlifo);

    colonna = colonna + 1;
    if (colonna == numeroColonne) { 
      colonna = 0;
      riga = riga + 1;
    }
  }

  angolo = angolo + 0.5; //mezzo grado a ogni fotogramma
}

function sistemaPlanetario(_x, _y, _size) {
  push();
  translate(_x, _y); 

  //orbite e lune
  let numeroOrbite = ceil(random(3)); //1, 2 o 3 orbite

  for (let o = 1; o <= numeroOrbite; o++) {
    let raggioOrbita = (_size / 2) * (o / numeroOrbite);

    //orbita
    fill(0, 0, 0, 0);
    stroke(255, 70);
    strokeWeight(1);
    circle(0, 0, raggioOrbita * 2);

    //velocità delle lune su questa orbita
    //ogni orbita più interna va un po' più veloce (+0.3)
    let velocita = 1 + (numeroOrbite - o) * 0.3;

    //lune sull'orbita
    let numeroLune = ceil(random(3)) - 1; //0, 1 o 2 lune
    for (let l = 0; l < numeroLune; l++) {
      push(); 
      rotate(random(360) + angolo * velocita);
      translate(raggioOrbita, 0);
      noStroke();
      fill(230, 230, 240);
      circle(0, 0, random(_size / 20, _size / 10));
      pop();
    }
  }

  //pianeta
  let diametroPianeta = random(_size * 0.12, _size * 0.25);

  //colore del pianeta
  let tipo = ceil(random(3)); 
  //gialllo
  let r = 250;
  let gr = 220;
  let b = 110;
  if (tipo == 1) {
    //arancione
    r = 255;
    gr = 120;
    b = 80;
  } else if (tipo == 2) {
    //azzurro
    r = 90;
    gr = 200;
    b = 230;
  }

  noStroke();
  fill(r, gr, b);
  circle(0, 0, diametroPianeta);

  //ombra sulla metà destra
  fill(0, 70);
  arc(0, 0, diametroPianeta, diametroPianeta, -90, 90);

  //anello (circa 1 pianeta su 3)
  if (random(1) < 0.3) {
    push();
    rotate(random(-40, 40)); //inclinazione casuale
    fill(0, 0, 0, 0); 
    stroke(r, gr, b);
    strokeWeight(_size * 0.02);
    ellipse(0, 0, diametroPianeta * 1.9, diametroPianeta * 0.5);
    pop();
  }

  pop();
}
