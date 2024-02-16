const wrapper = document.getElementsByClassName("DESKTOP-DIV")[0];

let tilePixels = 70;
let columns = Math.floor(document.body.clientWidth / tilePixels);
let rows = Math.floor(document.body.clientHeight / tilePixels);
rows = columns;

function createTile() {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.draggable = true;
    
    return tile;
}

function createTiles(quantity) {

    for (i = 0; i < rows; i++) {
        for (j=0; j < columns; j++) {
            let tileElement = createTile();

            if (j == 1 && i < 6) {
                tileElement.innerHTML = "<img class='timg' src='icon.png'><br>" + i + " - " + j;
            } else {
                tileElement.innerHTML = i + " - " + j;
            }
            
            //tileElement.style.zIndex = i*columns + (rows-j);
            wrapper.appendChild(tileElement);
        }
        
    }

}

createTiles(columns * rows);

const createGrid = () => {
    
    wrapper.innerHTML = "";
    columns = Math.floor(document.body.clientWidth / tilePixels);
    rows = Math.floor(document.body.clientHeight / tilePixels);
    rows = columns;

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
}

window.onresize = () => createGrid();

createGrid();