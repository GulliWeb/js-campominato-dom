// Raccolta dati dal DOM
const container = document.getElementById('grid-container')
let counter = 0 
let bombsField = []
let gameOver = false
let btnPlay = document.getElementById('btn-play')

// Funzione che al click del pulsante play inizia il gioco 
function play() {
    if (gameOver) {
        location.reload()
    }
    // Richiamo funzione per stabilire il livello e quante celle devono stare su una riga 
    const levelCount = levels()
    bombsField = CasualNumb(levelCount)

    container.innerHTML = ""
    // Controllo per evitare che si crei un numero di celle ripetuto 
    if (container.querySelectorAll('.grid').length >= levels()) {
        alert('Campo minato già generato! per generarne uno nuovo la pagina verrà aggiornata!')
        location.reload()
        return
    }
  
    for (let i = 1; i <= levels(); i++) {
        const grid = document.createElement('div')
        // Controllo per stabilire il numero di celle su una riga 
        if (levels() == 100) {
            grid.classList.add('grid-10','grid')
        } else if (levels() == 81) {
            grid.classList.add('grid-9', 'grid')
        } else if (levels() == 49) {
            grid.classList.add('grid-7', 'grid')
            
        }
        grid.classList.add('grid')
        grid.innerText = i
        container.appendChild(grid)

        grid.addEventListener('click' ,function() {
            cellClick(grid, i)
        })
    }    
    document.querySelector('footer').classList.add('d-visible')
}

// Funzione che al click di ogni cella stampiamo in console il numero di essa e coloriamola di azzurro
function cellClick(grid, index) {
    if (gameOver) {
        return
    }

    let score = document.querySelector('h3')
    if (grid.classList.contains('azure-click')) {
        return
    } else {
        grid.classList.add('azure-click', 'click') 
        counter++
    }

    // Controllo se il giocatore non ha ancora raggiunto il punteggio massimo 
    if (!bomb(index, bombsField)) {
        let maxScore = counter - 16
        if (counter == maxScore) {
            alert('Hai raggiunto il punteggio massimo, COMPLIMENTI HAI VINTO!')
            gameOver = true
            btnPlay.innerText = 'Restart'
            setCursorNotAllowed()
            return
        }
    }

    // Controllo per stabilire se l'utente ha calpestato una bomba e quindi terminare il gioco
    if (bomb(index, bombsField)) {
        grid.classList.add('grid-bomb')
        counter--
        let mess = document.getElementById('result-message')
        mess.innerText = 'hai calpestato una BOMBA, partita TERMINATA! il tuo punteggio finale è di: ' + counter + ' Punti'
        gameOver = true
        btnPlay.innerText = 'Restart'

        // Richiamo funzione per aggiunta cursore not allowed su tutte le griglie una volta che il gioco è terminato 
       setCursorNotAllowed()
    }

    score.innerText = `SCORE:${counter} `
    console.log(index) 
    return(index)
}

// Funzione che determina il livello del gioco, e quindi a sua volta, il numero di celle
function levels() {
    let level = document.getElementById('slc-dif')
    if (level.value == 1) {
        level = 100
    } else if (level.value == 2){
        level = 81
    } else if (level.value == 3)
        level  = 49
    return level
}

/* Funzione che genera 16 numeri casuali tra 1 e 16 non ripetuti fra loro */
function CasualNumb(max) {
    let bombCount = 16
    let bombsField = []

    while (bombsField.length < 16) {
        let rndNumber = Math.floor(Math.random() * bombCount) + 1
        if (!bombsField.includes(rndNumber)) {
            bombsField.push(rndNumber)
        }
    }
    console.log('Posizioni bombe: ' + bombsField)
    return(bombsField)
}

// Funzione che verifica se ho cliccato su una bomba 
function bomb(index, bombsField) {
   return bombsField.includes(index)
}

// Funzione che restarta il gioco
function restartGame() {
    gameOver = false; 
    counter = 0; 
    play(); 
}

 // Funzione che aggiunge cursore not allowed su tutte le griglie una volta che il gioco è terminato
function setCursorNotAllowed() {
     const allGrids = document.querySelectorAll('.grid')
     allGrids.forEach(grid => grid.style.cursor = 'not-allowed');
     return
}
