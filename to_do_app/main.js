
const inputBox = document.getElementById("input_box");
const quantityBox = document.getElementById("input_quantity");
const listContainer = document.getElementById("list_container");
const completedListContainer = document.getElementById("completed_list_container");
const addButton = document.getElementById("addButton");

addButton.addEventListener("click", addTask);
inputBox.addEventListener("click", expandOptions);

function expandOptions() {
    quantityBox.classList.remove("hide");
}

function addTask() {
    console.log("Add Task is running");
    if (inputBox.value === '') {
        alert("No text was added. Try again");
    } else {
        let rowContainer = document.createElement("div");
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute("contenteditable", "true");

        let quantity = quantityBox.value;
        if (quantity) {
            li.innerHTML += ` x${quantity} `;
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        let rowDivider = document.createElement("div");
        rowDivider.classList.add("row_divider_line");

        rowContainer.appendChild(li);
        rowContainer.appendChild(rowDivider);
        rowContainer.setAttribute("data-checked", "false");

        listContainer.appendChild(rowContainer);
        gemData();
    }
    inputBox.value = "";
    quantityBox.value = "";
    quantityBox.classList.add("hide");

}

listContainer.addEventListener("blur", function(event) {
    if (event.target.tagName === "LI") {
        gemData(); // Save data when the user finishes editing
    }
}, true);

listContainer.addEventListener("click", function (event) {
    console.log("Checkboxes will be checked off");

    if (event.target.tagName === "LI") {
        const rowContainer = event.target.parentElement; // Get the rowContainer

        if (rowContainer) {
            if (event.target.classList.contains("checked")) {
                // Uncheck the task
                event.target.classList.remove("checked");
                rowContainer.setAttribute("data-checked", "false");
                listContainer.appendChild(rowContainer); // Move back to listContainer
            } else {
                // Check the task
                event.target.classList.add("checked");
                rowContainer.setAttribute("data-checked", "true");
                completedListContainer.appendChild(rowContainer); // Move to completedListContainer
            }

            gemData();
        }
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.parentElement.remove();
        gemData();
    }
}, false);

// Add an event listener to the completedListContainer to allow moving items back
completedListContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const rowContainer = event.target.parentElement; // Get the rowContainer

        if (rowContainer) {
            event.target.classList.remove("checked");
            rowContainer.setAttribute("data-checked", "false");
            listContainer.appendChild(rowContainer); // Move back to listContainer
            gemData();
        }
    }
});


function removeOrphanRowDividers() {
    const children = listContainer.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.classList.contains("row_divider_line")) {
            const parentDiv = child.parentElement;
            if (!parentDiv.parentElement ||
                parentDiv.parentElement.tagName !== "LI") {
                parentDiv.remove();
                i--;
            }
        }
    }
}

function gemData() {
    const listData = listContainer.innerHTML;
    const completedData = completedListContainer.innerHTML;

    localStorage.setItem("listData", listData);
    localStorage.setItem("completedData", completedData);
}

function visData() {
    const storedListData = localStorage.getItem("listData");
    const storedCompletedData = localStorage.getItem("completedData");

    if (storedListData) {
        listContainer.innerHTML = storedListData;
    }
    if (storedCompletedData) {
        completedListContainer.innerHTML = storedCompletedData;
    }
}

visData();
removeOrphanRowDividers();





// FARVE UPDATE


const asideMenu = document.getElementById("asideBar");
const contentBg = document.getElementById("contentContainer");
const groceryButton = document.getElementById("groceryButton");
const toDoButton = document.getElementById("toDoButton");

window.addEventListener("load", defaultMode);

function farveUpdater(farve) {
    if (farve === "yellow") {
        asideMenu.setAttribute("data-theme", "yellow-theme");
        contentBg.setAttribute("data-theme", "yellow-theme")
    } else if (farve === "purple") {
        asideMenu.setAttribute("data-theme", "purple-theme");
        contentBg.setAttribute("data-theme", "purple-theme");
};}

toDoButton.addEventListener("click", (nyFarve) => {
    farveUpdater(nyFarve.target.value);
});

groceryButton.addEventListener("click", (nyFarve) => {
    farveUpdater(nyFarve.target.value);
});



function defaultMode() {
    asideMenu.setAttribute("data-theme", "yellow-theme");
    contentBg.setAttribute("data-theme", "yellow-theme");
};




