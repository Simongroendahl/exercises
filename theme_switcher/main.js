"use strict";

const bodyColor = document.querySelector("body");
const farveDropDownMenu = document.getElementById("farveValg");

window.addEventListener("load", defaultMode);

// Denne funktion startes når dropdown menuens værdi ændres og kigger derefter options value.
// Her kigger farveUpdater-funktionen efter værdien, som ændre bodyColor variablens attributes.

function farveUpdater(farve) {
    if (farve === "dark") {
        bodyColor.setAttribute("data-theme", "dark");
    } else if (farve === "hawaii") {
        bodyColor.setAttribute("data-theme", "hawaii");
    } else if (farve === "sunset") {
        bodyColor.setAttribute("data-theme", "sunset");
    }
    else {
        bodyColor.setAttribute("data-theme", "light");
    }
};

farveDropDownMenu.addEventListener("change", (nyFarve) => {
    farveUpdater(nyFarve.target.value);
});

function defaultMode() {
    bodyColor.setAttribute("data-theme", "light");
};




