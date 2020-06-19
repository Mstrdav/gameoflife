// VARIABLES
var precision = 100;
var cote;
var marquage;
var tableau = new Array(precision);
var prevTab = [];
var evolutionEnCours = false;
var frameR = 3;
var prevViv = 0;
var viv = 0;

function setup() {
    // La page est vide, on crée donc un canva qui a la taille de la page.
    createCanvas(document.body.clientWidth, document.body.clientHeight);
    background(0);
    smooth();
    stroke(255);
    strokeWeight(0.2);
    fill(0);
    frameRate(frameR);

    cote = width / precision;
    marquage = true;

    for (let i = 0; i < tableau.length; i++) {
        tableau[i] = new Array(parseInt(precision / width * height));
    }

    console.log(tableau);

    dessinerCadrillage();
}

function draw() {
    if (evolutionEnCours) {
        if (prevViv == viv) {
            frameR--;
            console.log('frameR down');
            if (frameR < 3) {
                frameR = 3;
            }
            frameRate(frameR);
        } else {
            prevViv = viv;
            frameR += 2;
            if (frameR > 30) {
                frameR = 30;
            }
            console.log('frameR up');
            frameRate(frameR);
        }
        evolution();
        if (viv == 0) {
            evolutionEnCours = false;
        }
    }
}

function mousePressed() {
    let posx = parseInt(mouseX / cote);
    let posy = parseInt(mouseY / cote);

    if (tableau[posx][posy] == 1) {
        tableau[posx][posy] = 0;
        fill(0);
        rect(posx * cote, posy * cote, cote, cote);
        //text(tableau[posx][posy], posx * cote, posy * cote);
    } else {
        tableau[posx][posy] = 1;
        fill(255);
        rect(posx * cote, posy * cote, cote, cote);
        //text(tableau[posx][posy], posx * cote, posy * cote);
    }
}

function reset() {
    console.log('reset !!');
    for (let i = 0; i < tableau.length; i++) {
        tableau[i] = new Array(parseInt(precision / width * height));
    }

    dessinerCadrillage();
}

function dessinerCadrillage() {
    let x = 0;
    while (x * cote < width) {
        let y = 0;
        while (y * cote < height) {
            if (tableau[x][y] == 1) {
                fill(255);
            } else {
                fill(0);
            }
            rect(x * cote, y * cote, cote, cote);
            //text(tableau[x][y], x * cote, y * cote);
            y++;
        }
        x++;
    }
}

function evolution() {
    viv = 0;
    //if (marquage) {
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {
            if (!(i == 0 || j == 0 || i == tableau.length - 1 || j == tableau[i].length - 1)) {
                checkVoisins(i, j);
            }
        }
    }
    /*    marquage = false;
    } else {
        marquage = true;*/
    for (let i = 0; i < tableau.length; i++) {
        for (let j = 0; j < tableau[i].length; j++) {
            if (!(i == 0 || j == 0 || i == tableau.length - 1 || j == tableau[i].length - 1)) {
                if (tableau[i][j] == 2) {
                    tableau[i][j] = 0;
                    fill(0);
                    rect(i * cote, j * cote, cote, cote);
                    //text(tableau[i][j], i * cote, j * cote);
                } else if (tableau[i][j] == 3) {
                    tableau[i][j] = 1;
                    fill(255);
                    rect(i * cote, j * cote, cote, cote);
                    //text(tableau[i][j], i * cote, j * cote);
                }
            }
        }
    }
    //}
}

function checkVoisins(x, y) {
    let compteurDeVivantes = 0;
    let celluleVivante = tableau[x][y] == 1;
    if (celluleVivante) {
        viv += 1;
    }

    if (tableau[x - 1][y - 1] == 1 || tableau[x - 1][y - 1] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x - 1][y] == 1 || tableau[x - 1][y] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x - 1][y + 1] == 1 || tableau[x - 1][y + 1] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x][y - 1] == 1 || tableau[x][y - 1] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x][y + 1] == 1 || tableau[x][y + 1] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x + 1][y - 1] == 1 || tableau[x + 1][y - 1] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x + 1][y] == 1 || tableau[x + 1][y] == 2) {
        compteurDeVivantes++;
    }
    if (tableau[x + 1][y + 1] == 1 || tableau[x + 1][y + 1] == 2) {
        compteurDeVivantes++;
    }

    if (compteurDeVivantes < 2 || compteurDeVivantes > 3) {
        if (celluleVivante) {
            tableau[x][y] = 2; // on tue la cellule
            fill(255, 0, 0);
            rect(x * cote, y * cote, cote, cote);
            //text(tableau[x][y], x * cote, y * cote);
            //console.log('[MORT] cellule en ' + x + ', ' + y + ' tuée.');
            //console.log('[MORT] voisins : ' + compteurDeVivantes);
        }
    } else if (compteurDeVivantes == 3) {
        if (!(celluleVivante)) {
            tableau[x][y] = 3; // naissance de la cellule
            fill(0, 0, 255);
            rect(x * cote, y * cote, cote, cote);
            //text(tableau[x][y], x * cote, y * cote);
            //console.log('[NAISSANCE] cellule en ' + x + ', ' + y + ' naissante.');
            //console.log('[NAISSANCE] voisins : ' + compteurDeVivantes);
        }
    }
}

function keyPressed() {
    if (keyCode == 32) {
        if (evolutionEnCours) {
            evolutionEnCours = false;
        } else {
            evolutionEnCours = true;
        }
    } else if (keyCode == BACKSPACE) {
        reset();
    } else {
        console.log('key: ' + keyCode);
        evolution();
    }
}
