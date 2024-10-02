const bc = [{ name: "Hvidevarer", link: "/hvidevarer" },
            { name: "Vaskemaskiner", link: "/hvidevarer/vaskemaskiner" },
            { name: "Bosch", link: "/hvidevarer/vaskemaskiner/bosch/" },];


const navList = document.getElementById("navList");
const generateButton = document.getElementById("generateButton");

window.addEventListener("load", debugTime);

function debugTime() {
    console.log("Page load");
}

generateButton.addEventListener("click", showTheCrumbs);

// function showBreadCrumbs(arr) {
//     console.log("Breadcrumbs everywhere");
//     arr.forEach((each) => {
//         navList.innerHTML += `<nav>
//         <li><a href=${each.link}>${each.name}</a></li><div>/</div>
//     </nav>`;
// });
// }

function showBreadCrumbs(arr) {
    console.log("Breadcrumbs everywhere");
    arr.forEach((each, index) => {
        if (index === arr.length - 1) {
            // Her sættes en conditional op, som kigger efter det sidste index led.
            navList.innerHTML += `<nav>
                <li>${each.name}</li>
            </nav>`;
        } else {
            // Her opsættes de resterende links med hyperlinks og skråstreger.
            navList.innerHTML += `<nav>
                <li><a href="${each.link}">${each.name}</a></li><div>/</div>
            </nav>`;
        }
    });
}


function showTheCrumbs() {
    console.log("The bread is here");
    showBreadCrumbs(bc);
    generateButton.removeEventListener("click", showTheCrumbs);
}