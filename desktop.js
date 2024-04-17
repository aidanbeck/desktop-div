const wrapper = document.getElementsByClassName("DESKTOP-DIV")[0];

let tilePixels = 70;
let columns = Math.floor(document.body.clientWidth / tilePixels);
let rows = Math.floor(document.body.clientHeight / tilePixels);
rows = columns;

var randomImages = [
    "<img class='icon-image ned player-glow' src='images/ned.png'>",

    "<img class='icon-image rock move-glow' src='images/rock.png'>",
    "<img class='icon-image rock move-glow' src='images/rock2.png'>",
    "<img class='icon-image rock move-glow' src='images/rock3.png'>",

    "<img class='icon-image statue hostile-glow' src='images/statue.png'>",

    "<img class='icon-image sapling default-glow' src='images/sapling.png'>",

    "<img class='icon-image shrub default-glow' src='images/shrub.png'>",

    "<img class='icon-image tree default-glow' src='images/tree.png'>",
]

function createTile() {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    const icon = document.createElement("div");
    icon.classList.add("icon");

    icon.addEventListener("dragstart", pickupIcon);
    icon.addEventListener("drop", dropIcon);
    icon.addEventListener("dragover", hoverTileWhileDragging);
    icon.addEventListener("dragleave", exitTileWhileDragging); 


    icon.onclick = function() {

        icon.style.backgroundColor = "";

        if (icon.innerHTML == "") {
            icon.draggable = true;
            let index = Math.floor(Math.random() * randomImages.length);
            icon.innerHTML = randomImages[index];
            icon.firstChild.style.zIndex = getZIndex(icon) * 2;
        } else {
            icon.innerHTML = "";
            icon.draggable = false;
        }
    }

    tile.appendChild(icon);
    
    return tile;
}

function getZIndex(element) {

    var computedStyle = window.getComputedStyle(element);
    var zIndex = computedStyle.getPropertyValue('z-index');
    return parseInt(zIndex); //may not need
}

function createTiles(quantity) {

    for (i = 0; i < rows; i++) {
        for (j=0; j < columns; j++) {
            let tileElement = createTile();
            
            const zIndex = i*columns + (rows-j);

            tileElement.style.zIndex = zIndex;
            tileElement.firstChild.style.zIndex = zIndex * 2; //nessecary so that the tile underneath will not get dragged along with the icon. I have no idea why that happens and it took me hours to figure this out.
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