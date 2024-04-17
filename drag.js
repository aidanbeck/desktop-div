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