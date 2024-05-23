//I probably need to make a diagram/description of slots vs icons vs images vs divs.
//desktop-div.js and structure.css should be moved into a "desktop-div" folder.
//Should the middle "icon" div even exist? It is likely less performant

function createSlot(index) {

    const slot = document.createElement("div");
    slot.classList.add("🖥️DIV-slot");

    const icon = document.createElement("div");
    icon.classList.add("🖥️DIV-icon");

    icon.addEventListener("click", clickIcon);
    icon.addEventListener("dragstart", pickupIcon);
    icon.addEventListener("drop", dropIcon);
    icon.addEventListener("dragover", hoverSlotWhileDragging);
    icon.addEventListener("dragleave", exitSlotWhileDragging);

    slot.appendChild(icon);

    return slot;
}

function createIconImage(icon, imageClass, imageSource) {

    icon.draggable = true; //It has an image now, so it should be draggable.

    const image = document.createElement("img");

    image.style.zIndex = getZIndex(icon) * 2; //why *2?
    image.classList.add("🖥️DIV-iconImage");
    image.classList.add(imageClass);

    /*
        This hack guarentees that a gif will start playing at the beginning.
        Without it, a gif will sync up with any identical gifs that already exist on the page.
        Could be unoptomized. Should this only happen if the image is a gif?
    */
    image.src = imageSource + '?id=' + Math.floor(Math.random() * 100);

    icon.appendChild(image);
}

function removeIconImage(icon) {
    icon.innerHTML = ""; //remove <img> element
    icon.draggable = false; //it has no image now, so it should no longer be draggable.
}

function clickIcon(event) {

    const icon = event.target;
    onClickFunction(icon);
}

// Empty function. The developer can redefine this to customize onClick behavior.
let onClickFunction = function(icon) {};

/*
    Returns the index of an icon.
    Handy when using desktop-div as a gui for an array. With a click you can grab the index.
    To get the index of an icon instead of a slot, simply input "icon.parentNode".

    It may be more optimized to store the index inside of each slot in some cases.
*/
function getSlotIndex(slot) {

    const nodes = Array.prototype.slice.call( document.getElementsByClassName("🖥️DIV-slot") );
    const index = nodes.indexOf(slot);

    return index;
}

function getZIndex(element) {

    var computedStyle = window.getComputedStyle(element);
    var zIndex = computedStyle.getPropertyValue('z-index');
    return parseInt(zIndex); //may not need
}

function createSlots(wrapper, columns, rows) {

    for (i = 0; i < rows; i++) {
        for (j=0; j < columns; j++) {
            let slotElement = createSlot(i+j);
            
            //const zIndex = i*rows + (columns-j);

            //slotElement.style.zIndex = i + (1/j);
            slotElement.firstChild.style.zIndex = i + 2; //necessary so that the slot underneath will not get dragged along with the icon. I have no idea why that happens and it took me hours to figure this out.
            wrapper.appendChild(slotElement);
        }
        
    }

}


const createGrid = (wrapper,columns,rows,scale) => {
    
    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    wrapper.style.setProperty("height", scale*rows);

    wrapper.style.height = scale*rows + "px";
    wrapper.style.width = scale*columns + "px";

    createSlots(wrapper, columns, rows);
}

window.addEventListener('resize', rescale);
function rescale() {
    // scaleChunks(chunk0,15*5,15,75);
    // scaleChunks(truck, 7, 11, 75);
}

function scaleChunks(chunk,columns,rows,scale) {
    const elements = chunk;

    for (i = 0; i < elements.length; i++) {
        elements[i].style.height = scale*rows + "px";
        elements[i].style.width = scale*columns + "px";
    }
}


//fired while mouse is hovering over a slot (while dragging)
//this is necessary because dragging cancels the standard hover events
function hoverSlotWhileDragging(ev) {
    
    ev.preventDefault(); //not sure why *exactly* this is needed, but it gets rid of the 🚫 cursor, and dragging fails without it
    ev.target.classList.add("🖥️DIV-draggingOver");
}

//fired when the mouse exits the bounds of a slot (while dragging)
function exitSlotWhileDragging(ev) {
    ev.target.classList.remove("🖥️DIV-draggingOver");
}
  
//fired when icon is picked up
function pickupIcon(ev) {
    let data = "draggingid"; //this will eventually be the icon # type and it's location
    ev.dataTransfer.setData("text", data); //I could also store this in my own global variable instead

    //Sets the ID of the pickup icon to "draggingid" so the element can be searched later
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
    ev.target.classList.remove("🖥️DIV-draggingOver");
    ev.target.appendChild(clonedIcon.firstChild);

    //delete original icon
    draggedIcon.innerHTML = "";
    draggedIcon.draggable = false;
    draggedIcon.removeAttribute('id');
    
    const nodes = Array.prototype.slice.call( document.getElementsByClassName("🖥️DIV-slot") );
    const oldIndex = nodes.indexOf( draggedIcon.parentNode );
    const newIndex = nodes.indexOf( ev.target.parentNode );

    _writeFromJS(oldIndex, 0);
    _writeFromJS(newIndex, draggedIcon.tile); // I believe .tile refers to the tile data, not the slot.
}