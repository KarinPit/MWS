const startArrow = document.querySelector(".start-arrow");
const navbar = document.querySelector(".navbars");
const logoIcon = document.querySelector(".logo-icon p");

if (window.scrollY > 0) {
    navbar.style.background = "white";
    logoIcon.style.color = "#A0BBC7";
} else {
    navbar.style.background = "transparent";
    logoIcon.style.color = "black";
}

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        navbar.style.background = "white";
        logoIcon.style.color = "#A0BBC7";
        hideStartArrow()
    } else {
        navbar.style.background = "transparent";
        logoIcon.style.color = "black";
        showStartArrow()
    }
});

window.addEventListener("load", () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector(".loading-screen");
        if (loadingScreen) {
            loadingScreen.style.opacity = 0;

            // Wait for the transition to end before setting display to 'none'
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = "none";
            }, { once: true });
        }
    }, 2500);
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
