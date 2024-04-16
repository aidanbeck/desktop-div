function allowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add("dragging-over");    
}

function disallowDrop(ev) {
    ev.target.classList.remove("dragging-over");

}
  
function drag(ev) {

    let data = "draggingid"; //eventually this can hold item # or anything
    ev.target.id = data;
    ev.dataTransfer.setData("text", data);
}
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    let icon = document.getElementById(data);
    let clone = icon.cloneNode(true);

    ev.target.appendChild(clone.firstChild);
    ev.target.draggable = true;
    ev.target.classList.remove("dragging-over");

    icon.innerHTML = "";
    icon.draggable = false;
    icon.removeAttribute('id');
  }