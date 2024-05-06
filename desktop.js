var randomImages = [

    //rocks
    "<img class='icon-image rock move-glow' src='images/rock.png'>",
    "<img class='icon-image rock move-glow' src='images/rock2.png'>",
    "<img class='icon-image rock move-glow' src='images/rock3.png'>",

    //plants
    "<img class='icon-image sapling default-glow' src='images/sapling.png'>",
    "<img class='icon-image shrub default-glow' src='images/shrub.png'>",
    "<img class='icon-image tree default-glow' src='images/tree.png'>",

    //unnatural
    "<img class='icon-image statue hostile-glow' src='images/statue.png'>",
    "<img class='icon-image ned player-glow' src='images/ned.png'>",
    "<img class='icon-image grave default-glow' src='images/grave.png'>"
]

var iconCount = 0;

function createTile() {
    const tile = document.createElement("div");
    tile.classList.add("tile");

    const icon = document.createElement("div");
    icon.classList.add("icon");

    icon.addEventListener("dragstart", pickupIcon);
    icon.addEventListener("drop", dropIcon);
    icon.addEventListener("dragover", hoverTileWhileDragging);
    icon.addEventListener("dragleave", exitTileWhileDragging);

    var random = Math.random()
    if (random > 0.5) {
        tile.classList.add("dirt");
    }

    if (random > 0.995) {
        icon.draggable = true;
        let index = Math.floor(Math.random() * randomImages.length);

        if (index == 6 || index == 7 || index == 8) {
            if (random > 0.999999) {
                index = 6; //rare statue
            } else {
                index = 5; //tree
            }
            
        }

        icon.innerHTML = randomImages[index];
        icon.firstChild.style.zIndex = getZIndex(icon) * 2;
    }

    if (iconCount == 16+16+16+2) {
        icon.draggable = true;
        icon.innerHTML = randomImages[8]; //gravestone
    }
    iconCount++;

    icon.onclick = function() {

        icon.style.backgroundColor = "";

        if (icon.innerHTML == "") {
            icon.draggable = true;
            let index = Math.floor(Math.random() * randomImages.length);
            if (index == 8) { //grave
                index = 3; //sapling
            }
            icon.innerHTML = randomImages[index];
            icon.firstChild.style.zIndex = getZIndex(icon) * 2; //why *2?
            
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

function createTiles(wrapper, columns, rows) {

    for (i = 0; i < rows; i++) {
        for (j=0; j < columns; j++) {
            let tileElement = createTile();
            
            //const zIndex = i*rows + (columns-j);

            //tileElement.style.zIndex = i + (1/j);
            tileElement.firstChild.style.zIndex = i + 2; //nessecary so that the tile underneath will not get dragged along with the icon. I have no idea why that happens and it took me hours to figure this out.
            wrapper.appendChild(tileElement);
        }
        
    }

}


const createGrid = (wrapper,columns,rows,scale) => {
    
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    wrapper.style.setProperty("height", scale*rows);

    wrapper.style.height = scale*rows + "px";
    wrapper.style.width = scale*columns + "px";

    createTiles(wrapper, columns, rows);
}

const chunk0 = document.getElementsByClassName("DESKTOP-DIV")[0]; //chunk0.style.zIndex = 0; //this number will be chunk y level
const chunk1 = document.getElementsByClassName("DESKTOP-DIV")[1]; //chunk1.style.zIndex = 0;
const chunk2 = document.getElementsByClassName("DESKTOP-DIV")[2]; //chunk2.style.zIndex = 1;

const chunk3 = document.getElementsByClassName("DESKTOP-DIV")[3]; //chunk3.style.visibility = "hidden";
const chunk4 = document.getElementsByClassName("DESKTOP-DIV")[4]; //chunk4.style.visibility = "hidden";
const chunk5 = document.getElementsByClassName("DESKTOP-DIV")[5]; //chunk5.style.visibility = "hidden";

const chunk6 = document.getElementsByClassName("DESKTOP-DIV")[6]; chunk6.style.visibility = "hidden";
const chunk7 = document.getElementsByClassName("DESKTOP-DIV")[7]; chunk7.style.visibility = "hidden";
const chunk8 = document.getElementsByClassName("DESKTOP-DIV")[8]; chunk8.style.visibility = "hidden";


var worldscale = camera.scale;
createGrid(chunk0, 16, 16, worldscale);
createGrid(chunk1, 16, 16, worldscale);
createGrid(chunk2, 16, 16, worldscale);

createGrid(chunk3, 16, 16, worldscale);
createGrid(chunk4, 16, 16, worldscale);
createGrid(chunk5, 16, 16, worldscale);

createGrid(chunk6, 16, 16, worldscale);
createGrid(chunk7, 16, 16, worldscale);
createGrid(chunk8, 16, 16, worldscale);

function scaleChunks(columns,rows,scale) {
    const elements = document.getElementsByClassName("DESKTOP-DIV");

    for (i = 0; i < elements.length; i++) {
        elements[i].style.height = scale*rows + "px";
        elements[i].style.width = scale*columns + "px";
    }
}