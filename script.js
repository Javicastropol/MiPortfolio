let menuVisible = false;
function mostrarOcultarMenu() {
  if (menuVisible) {
    document.getElementById("nav").classList = "";
    menuVisible = false;
  }
  else {
    document.getElementById("nav").classList = "responsive";
    menuVisible = true;
  }
}

function seleccionar() {
  document.getElementById("nav").classList = "";
  menuVisible = false;
}


function elementIsInView(element) {
    var top = element.offsetTop;
    var left = element.offsetLeft;
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    while (element.offsetParent) {
        element = element.offsetParent;
        top += element.offsetTop;
        left += element.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        top + height <= window.pageYOffset + window.innerHeight &&
        left + width <= window.pageXOffset + window.innerWidth
    );
}

window.addEventListener("scroll", function (e) {
  let elements = document.querySelectorAll(".barra-skill");
  elements.forEach((e) => { 
    if (elementIsInView(e)) { 
      let progreso_element = e.querySelector(".progreso");
      let width = progreso_element.getAttribute('data-progress_percent')+'%';
      progreso_element.style.width = width;
    }
  })
}, { passive: true });
