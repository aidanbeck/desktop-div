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

//simple arrow key movement
var camera = {
    x:0,
    y:0,
    scale: 90, //worldscale
    element: document.body
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
        camera.y += camera.scale;
    } else if (event.key === 'ArrowDown' || event.key === 's') {
        camera.y -= camera.scale;
    } else if (event.key === 'ArrowLeft' || event.key === 'a') {
        camera.x += camera.scale;
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
        camera.x -= camera.scale;
    }

    camera.element.style.top = camera.y + 'px';
    camera.element.style.left = camera.x + 'px';

    if (camera.y <= -1401) {
        document.getElementsByClassName("DESKTOP-DIV")[0].style.visibility = "hidden";
        document.getElementsByClassName("DESKTOP-DIV")[1].style.visibility = "hidden";
        document.getElementsByClassName("DESKTOP-DIV")[2].style.visibility = "hidden";

        document.getElementsByClassName("DESKTOP-DIV")[6].style.visibility = "visible";
        document.getElementsByClassName("DESKTOP-DIV")[7].style.visibility = "visible";
        document.getElementsByClassName("DESKTOP-DIV")[8].style.visibility = "visible";
    } else {
        document.getElementsByClassName("DESKTOP-DIV")[0].style.visibility = "visible";
        document.getElementsByClassName("DESKTOP-DIV")[1].style.visibility = "visible";
        document.getElementsByClassName("DESKTOP-DIV")[2].style.visibility = "visible";

        document.getElementsByClassName("DESKTOP-DIV")[6].style.visibility = "hidden";
        document.getElementsByClassName("DESKTOP-DIV")[7].style.visibility = "hidden";
        document.getElementsByClassName("DESKTOP-DIV")[8].style.visibility = "hidden";
    }
});


//Scrolling & zooming
window.addEventListener("wheel", function(event) {

    const zoomStep = 8;

    if (event.deltaY > 0) {
        camera.scale-=camera.scale/zoomStep;
    } else {
        camera.scale+=camera.scale/zoomStep;
    }

    if (camera.scale > 400) {
        camera.scale = 400;
    }
    else if (camera.scale < 35) {
        camera.scale = 35;
    }

    scaleChunks(16,16,camera.scale);
    
});