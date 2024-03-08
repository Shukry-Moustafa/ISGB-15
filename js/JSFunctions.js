"use strict";




//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/



/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}


/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {
    // Kolla horisontella, vertikala och diagonal vinnande kombinationer
    if (this.checkHorizontal() || this.checkVertical() || this.checkDiagonalLeftToRight() || this.checkDiagonalRightToLeft()) {
        return this.currentPlayer === this.playerOne ? 1 : 2; // Returnera vinnarens nummer  // returnera 1 om playerOne vinner, 2 om playerTwo vinner
    } else if (this.checkForDraw()) {
        return 3; // Oavgjort om det inte finns fler tomma fält
    } else {
        return 0; // Inget avslut ännu
    }
}

/**
 * Kontrollerar horisontella vinnande kombinationer.
 * Returnerar true om det finns en vinnare, annars false.
 * loopen körs så länge i är mindre än 9
 * i kommer att vara 0, 3, 6 när loopen körs.
 */
oGameData.checkHorizontal = function() {
    for (let i = 0; i < 9; i += 3) {
        if (this.gameField[i] !== '' && this.gameField[i] === this.gameField[i + 1] && this.gameField[i + 1] === this.gameField[i + 2]) {
            return true;
        }
    }
    return false;
}

/**
 * Kontrollerar vertikala vinnande kombinationer.
 * Returnerar true om det finns en vinnare, annars false.
 * loopen körs så länge som i är mindre än 3.
 * värdet på i ökar med 1 efter varje iteration av loopen. i++ är samma sak som i = i + 1.
 */
oGameData.checkVertical = function() {
    for (let i = 0; i < 3; i++) {
        if (this.gameField[i] !== '' && this.gameField[i] === this.gameField[i + 3] && this.gameField[i + 3] === this.gameField[i + 6]) {
            return true;
        }
    }
    return false;
}

/**
 * Kontrollerar diagonal vinnande kombinationer (från vänster till höger).
 * Returnerar true om det finns en vinnare, annars false.
 */
oGameData.checkDiagonalLeftToRight = function() {
    if (this.gameField[0] !== '' && this.gameField[0] === this.gameField[4] && this.gameField[4] === this.gameField[8]) {
        return true;
    }
    return false;
}

/**
 * Kontrollerar diagonal vinnande kombinationer (från höger till vänster).
 * Returnerar true om det finns en vinnare, annars false.
 */
oGameData.checkDiagonalRightToLeft = function() {
    if (this.gameField[2] !== '' && this.gameField[2] === this.gameField[4] && this.gameField[4] === this.gameField[6]) {
        return true;
    }
    return false;
}

/**
 * Kontrollerar om spelet är oavgjort (inga tomma fält kvar).
 * Returnerar true om spelet är oavgjort, annars false.
 */
oGameData.checkForDraw = function() {
    for (let i = 0; i < this.gameField.length; i++) {
        if (this.gameField[i] === '') {
            return false; // Det finns minst ett tomt fält kvar
        }
    }
    return true; // Alla fält är ifyllda, det är oavgjort
}
