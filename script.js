// Raccolta dati dal DOM
const container = document.getElementById('grid-container')
// Al click del pulsante play genero 100 caselle
function play() {
    /* Richiamo funzione per stabilire il livello e quante celle devono stare su una riga */
    levels()
    /* Controllo per evitare che si crei un numero di celle ripetuto */
    if (container.querySelectorAll('.grid').length >= levels()) {
        alert('Campo minato già generato! per generarne uno nuovo la pagina verrà aggiornata!')
        location.reload()
        return
    }
  
    for (let i = 1; i <= levels(); i++) {
        const grid = document.createElement('div')
        /* Controllo per stabilire il numero di celle su una riga */
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

// Al click di ogni cella stampiamo in console il numero di essa e coloriamola di azzurro
function cellClick(grid, index) {
    if (grid.classList.contains('azure-click')) {
        grid.classList.remove('azure-click', 'click')
    } else {
        grid.classList.add('azure-click', 'click') 
    }
    console.log(index) 
}

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