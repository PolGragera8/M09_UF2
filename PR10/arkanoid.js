/* CIRCULO */

// obtenir una referència al llenç
var ctx = $('#canvas')[0].getContext("2d");
//dibuixar un cercle
ctx.beginPath();
ctx.arc(75, 75, 10, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fill();

/* COLOR */

ctx.fillStyle = "#FF1C0A";
ctx.beginPath();
ctx.arc(100, 100, 100, 0, Math.PI * 2, true);
ctx.closePath();
ctx.fill();
//el rectangle es mig transparent
ctx.fillStyle = "rgba(255, 255, 0, .5)"
ctx.beginPath();
ctx.rect(15, 150, 120, 120);
ctx.closePath();
ctx.fill();


//INICI DEL CODI DE LA LLIBRERIA
var x = 150;
var y = 150;
var dx = 2;
var dy = 4;
var ctx;
var AMPLE;
var ALTURA;
var paddlex;
var paddleh = 10;
var paddlew = 75;
var intervalId = 0;
var fletxaDreta = false;
var fletxaEsquerra = false;
var canvasMinX = 0;
var canvasMaxX = 0;
var maons;
var NFILES;
var NCOLS;
var MAONSAMPLE;
var MAONSALTURA;
var FARCIT;

function init_maons() {
    NFILES = 5;
    NCOLS = 5;
    MAONSAMPLE = (AMPLE / NCOLS) - 1;
    MAONSALTURA = 15;
    FARCIT = 1;
    maons = new Array(NFILES);
    for (i = 0; i < NFILES; i++) {
        maons[i] = new Array(NCOLS);
        for (j = 0; j < NCOLS; j++) {
            maons[i][j] = 1;
        }
    }
}

//Activem fletxaDreta o fletxaDreta si les tecles dreta o esquerra són polsades
function onKeyDown(evt) {
    if (evt.keyCode == 39) fletxaDreta = true;
    else if (evt.keyCode == 37) fletxaEsquerra = true;
}
//i les desactivem quan les tecles dreta o esquerra són alliberades
function onKeyUp(evt) {
    if (evt.keyCode == 39) fletxaDreta = false;
    else if (evt.keyCode == 37) fletxaEsquerra = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function cercle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, AMPLE, ALTURA);
}

function init() {
    ctx = $('#canvas')[0].getContext("2d");
    AMPLE = $("#canvas").width()
    ALTURA = $("#canvas").height()
    paddlex = AMPLE / 2;
    intervalId = setInterval(dibuixa, 10);
    canvasMinX = $("#canvas").offset().left;
    canvasMaxX = canvasMinX + AMPLE;
    return intervalId;
}
//FINAL DEL CODI DE LA LLIBRERIA

/* TECLAT */
fletxaDreta = false;
fletxaEsquerra = false;
//Establir fletxaDreta o fletxaDreta si les tecles dreta o esquerra són polsades
function onKeyDown(evt) {
    if (evt.keyCode == 39) fletxaDreta = true;
    else if (evt.keyCode == 37) fletxaEsquerra = true;
}
//i les desactivem quan les tecles dreta o esquerra són alliberades
function onKeyUp(evt) {
    if (evt.keyCode == 39) fletxaDreta = false;
    else if (evt.keyCode == 37) fletxaEsquerra = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

/* RATON */
var canvasMinX;
var canvasMaxX;

function init_mouse() {}
canvasMinX = $("#canvas").offset().left;
canvasMaxX = canvasMinX + AMPLE;

function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = evt.pageX - canvasMinX;
    }
}
$(document).mousemove(onMouseMove);

//Movem el ratolí
function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = evt.pageX - canvasMinX;
    }
}
$(document).mousemove(onMouseMove);


function dibuixa() {
    clear();
    cercle(x, y, 10);
    //moure la pala si les tecles dreta o esquerra son polsades
    if (fletxaDreta) paddlex += 5;
    else if (fletxaEsquerra) paddlex -= 5;
    rect(paddlex, ALTURA - paddleh, paddlew, paddleh);

    //dibuixa els maons
    for (i = 0; i < NFILES; i++) {
        for (j = 0; j < NCOLS; j++) {
            if (maons[i][j] == 1) {
                rect((j * (MAONSAMPLE + FARCIT)) + FARCIT,
                    (i * (MAONSALTURA + FARCIT)) + FARCIT,
                    MAONSAMPLE, MAONSALTURA);
            }
        }
    }
    //hem colpejat un maó?
    alturafila = MAONSALTURA + FARCIT;
    amplecol = MAONSAMPLE + FARCIT;
    fila = Math.floor(y / alturafila);
    col = Math.floor(x / amplecol);
    // si és així, inverteix el sentit de la pilota i marca'l com trencat
    if (y < NFILES * alturafila && fila >= 0 && col >= 0 && maons[fila][col] == 1) {
        dy = -dy;
        maons[fila][col] = 0;
    }

    if (x + dx > AMPLE || x + dx < 0)
        dx = -dx;
    if (y + dy < 0)
        dy = -dy;
    else if (y + dy > ALTURA) {
        if (x > paddlex && x < paddlex + paddlew)
            dy = -dy;
        else
            //game over, final del joc per tant l'animació s'atura
            clearInterval(intervalId);
    }
    x += dx;
    y += dy;
}
init();
init_mouse();
init_maons();