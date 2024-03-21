
const startArrow = document.querySelector(".start-arrow");
const navbar = document.querySelector(".navbars");
// const logoIcon = document.querySelector(".logo-icon p");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        hideStartArrow()
        navbar.style.background = "white";
        logoIcon.style.color = "#A0BBC7";
    } else {
        showStartArrow()
        navbar.style.background = "transparent";
        logoIcon.style.color = "black";
    }
});

function hideStartArrow() {
    if (startArrow) {
        startArrow.style.opacity = '0';
        startArrow.style.visibility = 'hidden';
    }
}
function showStartArrow() {
    if (startArrow) {
        startArrow.style.opacity = '1';
        startArrow.style.visibility = 'visible';
    }
}
