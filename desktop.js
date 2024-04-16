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

    icon.addEventListener("dragstart", drag);
    icon.addEventListener("drop", drop);
    icon.addEventListener("dragover", allowDrop);
    icon.addEventListener("dragleave", disallowDrop); 


    icon.onclick = function() {

        icon.style.backgroundColor = "";

        if (icon.innerHTML == "") {
            icon.draggable = true;
            icon.innerHTML = "<img class='icon-image' src='images/ned.png'>";
        } else {
            icon.innerHTML = "";
            icon.draggable = false;
        }
    }

    tile.appendChild(icon);
    
    return tile;
}

function createTiles(quantity) {

    for (i = 0; i < rows; i++) {
        for (j=0; j < columns; j++) {
            let tileElement = createTile();
            
            const zIndex = i*columns + (rows-j);

            tileElement.style.zIndex = zIndex;
            tileElement.firstChild.style.zIndex = zIndex + 1; //nessecary so that the tile underneath will not get dragged along with the icon. I have no idea why that happens and it took me hours to figure this out.

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