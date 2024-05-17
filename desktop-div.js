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
            icon.innerHTML = "<img class='icon-image examplefile' src='icon.png'>";
            icon.firstChild.style.zIndex = getZIndex(icon) * 2; //why *2?
            icon.firstChild.src = icon.firstChild.src + '?id=' + Math.floor(Math.random() * 100); //animation offset. Could be better way?

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

const chunk0 = document.getElementsByClassName("DESKTOP-DIV")[0];
createGrid(chunk0, 16, 8, 90);

function scaleChunks(columns,rows,scale) {
    const elements = document.getElementsByClassName("DESKTOP-DIV");

    for (i = 0; i < elements.length; i++) {
        elements[i].style.height = scale*rows + "px";
        elements[i].style.width = scale*columns + "px";
    }
}


//fired while mouse is hovering over a tile (while dragging)
//this is necessary because dragging cancels the standard hover events
function hoverTileWhileDragging(ev) {
    
    ev.preventDefault(); //not sure why *exactly* this is needed, but it gets rid of the 🚫 cursor, and dragging fails without it
    ev.target.classList.add("dragging-over");
}

//fired when the mouse exits the bounds of a tile (while dragging)
function exitTileWhileDragging(ev) {
    ev.target.classList.remove("dragging-over");
}
  
//fired when icon is picked up
function pickupIcon(ev) {

    let data = "draggingid"; //this will eventually be the tile # type and it's location
    ev.dataTransfer.setData("text", data); //I could also store this in my own global variable instead

    //Sets the ID of the pickup tile to "draggingid" so the element can be searched later
    ev.target.id = data; 
}

//fired when icon is dropped
function dropIcon(ev) {
    var data = ev.dataTransfer.getData("text"); //get data stored in drag (currently always "draggingid")

    //finds element with id "draggingid", then clones it
    let draggedIcon = document.getElementById(data);
    let clonedIcon = draggedIcon.cloneNode(true);

    //place cloned icon at target
    ev.target.innerHTML = "";
    ev.target.draggable = true;
    ev.target.classList.remove("dragging-over");
    ev.target.appendChild(clonedIcon.firstChild);

    //delete original icon
    draggedIcon.innerHTML = "";
    draggedIcon.draggable = false;
    draggedIcon.removeAttribute('id');
}