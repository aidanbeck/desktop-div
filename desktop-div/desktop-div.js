//I probably need to make a diagram/description of desktops, slots, icons, & iconImages 
//Should the middle "icon" element even exist? It is likely less performant
//"scale" should be more intuitive.

const desktopDiv = {

    /*
        Initialization Functions:
    */

    createDesktop(element, columns, rows, scale, measurement) {

        element.classList.add("🖥️DIV-desktop");
    
        element.style.setProperty("--columns", columns);
        element.style.setProperty("--rows", rows);
        element.style.setProperty("height", scale*rows);
    
        element.style.height = scale*rows + measurement;
        element.style.width = scale*columns + measurement;
    
        this.createSlots(element, columns, rows);
    },

    createSlots(desktop, columns, rows) {

        for (i = 0; i < rows; i++) {
            for (j=0; j < columns; j++) {

                let slotElement = this.createSlot(i+j);

                /*
                    Necessary so that the slot underneath will not get dragged along with the icon.
                    I have no idea why that happens and it took me hours to figure this out.
                */
                slotElement.firstChild.style.zIndex = i + 2; 
                
                desktop.appendChild(slotElement);
            }
            
        }
    },

    createSlot(index) {

        const slot = document.createElement("div");
        slot.classList.add("🖥️DIV-slot");
    
        const icon = document.createElement("div");
        icon.classList.add("🖥️DIV-icon");
    
        icon.addEventListener("click", this.clickIcon);
        icon.addEventListener("dragstart", this.pickupIcon);
        icon.addEventListener("drop", this.dropIcon);
        icon.addEventListener("dragover", this.hoverSlotWhileDragging);
        icon.addEventListener("dragleave", this.exitSlotWhileDragging);
    
        slot.appendChild(icon);
    
        return slot;
    },


    /*
        Drag & Drop & Click Handling:
    */

    pickupIcon(ev) {
        let data = "draggingid"; //this will eventually be the icon # type and it's location
        ev.dataTransfer.setData("text", data); //I could also store this in my own global variable instead

        //Sets the ID of the pickup icon to "draggingid" so the element can be searched later
        ev.target.id = data; 
    },

    dropIcon(ev) {
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

        desktopDiv.onDropFunction(ev.target, draggedIcon);
    },

    /*
        Fired while mouse is hovering over a slot (while dragging).
        This is necessary because dragging cancels the standard hover events.
    */
    hoverSlotWhileDragging(ev) {
    
        ev.preventDefault(); //not sure why *exactly* this is needed, but it gets rid of the 🚫 cursor, and dragging fails without it
        ev.target.classList.add("🖥️DIV-draggingOver");
    },

    // Fired when the mouse exits the bounds of a slot (while dragging)
    exitSlotWhileDragging(ev) {
        ev.target.classList.remove("🖥️DIV-draggingOver");
    },

    clickIcon(event) {

        const icon = event.target;
        desktopDiv.onClickFunction(icon);
    },


    /*
        Interfacing Functions:
    */

    createIconImage(icon, imageClass, imageSource) {

        icon.draggable = true; //It has an image now, so it should be draggable.
    
        const image = document.createElement("img");
    
        image.style.zIndex = icon.style.zIndex;
        image.classList.add("🖥️DIV-iconImage");
        image.classList.add(imageClass);
    
        /*
            This hack guarentees that a gif will start playing at the beginning.
            Without it, a gif will sync up with any identical gifs that already exist on the page.
            Could be unoptomized. Should this only happen if the image is a gif?
        */
        image.src = imageSource + '?id=' + Math.floor(Math.random() * 100);
    
        icon.appendChild(image);
    },

    removeIconImage(icon) {
        icon.innerHTML = ""; //remove <img> element
        icon.draggable = false; //it has no image now, so it should no longer be draggable.
    },

    /*
        Returns the index of an icon.
        Handy when using desktop-div as a gui for an array. With a click you can grab the index.
        To get the index of an icon instead of a slot, simply input "icon.parentNode".

        It may be more optimized to store the index inside of each slot in some cases.
    */
    getSlotIndex(slot) {
        const nodes = Array.prototype.slice.call( document.getElementsByClassName("🖥️DIV-slot") );
        const index = nodes.indexOf(slot);
    
        return index;
    },

    /*
        Re-mappable Function:
    */
    onClickFunction: function(icon) {},
    onDropFunction: function(icon, draggedIcon) {},
    
};