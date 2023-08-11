//function shows and hides header hidden menu
const servises = document.getElementById("servises");
const hiddenMenu = document.getElementById("hidden-menu");

function toggle() {
  hiddenMenu.classList.toggle("hide");
  servises.classList.toggle("active");
}
