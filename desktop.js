const wrapper = document.getElementsByClassName("DESKTOP-DIV")[0];

let tilePixels = 70;
let columns = Math.floor(document.body.clientWidth / tilePixels);
let rows = Math.floor(document.body.clientHeight / tilePixels);
rows = columns;

function createTile() {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.draggable = true;

    tile.appendChild(icon);
    
    return tile;
}

function createTiles(quantity) {

    for (i = 0; i < rows; i++) {
        for (j=0; j < columns; j++) {
            let tileElement = createTile();
            
            tileElement.style.zIndex = i*columns + (rows-j);

            tileElement.onclick = function() {

                if (this.firstChild.innerHTML == "") {
                    this.firstChild.innerHTML = "<img class='icon-image' src='images/ned.png'>";
                } else {
                    this.firstChild.innerHTML = "";
                }
            }
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