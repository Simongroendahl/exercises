// Definerer variabler
const inputBox = document.getElementById("input_box");
const quantityBox = document.getElementById("input_quantity");
const listContainer = document.getElementById("list_container");
const completedListContainer = document.getElementById("completed_list_container");
const addButton = document.getElementById("addButton");
const listTitle = document.getElementById("listTitle");
const taskCount = document.getElementById("taskDisplayCount");

const asideMenu = document.getElementById("asideBar");
const contentBg = document.getElementById("contentContainer");
const groceryButton = document.getElementById("groceryButton");
const toDoButton = document.getElementById("toDoButton");

// Opsætning af eventlisteners
addButton.addEventListener("click", addTask);
inputBox.addEventListener("click", expandOptions);
groceryButton.addEventListener("click", () => listSwitcher('yellow'));
toDoButton.addEventListener("click", () => listSwitcher('purple'));

function expandOptions() {
    quantityBox.classList.remove("hide");
    quantityBox.classList.add("slide_left_ani");
}

function taskCountUpdater() {
    const taskCountDisplay = listContainer.getElementsByClassName("rowContainer").length;
    taskCount.innerHTML = taskCountDisplay;
}

function addTask() {
    console.log("Add Task is running");
    if (inputBox.value === '') {
        alert("No text was added. Try again");
    } else {
        let rowContainer = document.createElement("div");
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let quantity = quantityBox.value;
        if (quantity) {
            li.innerHTML += ` x${quantity} `;
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        let rowDivider = document.createElement("div");
        rowDivider.classList.add("row_divider_line");

        rowContainer.append(li, rowDivider);
        rowContainer.setAttribute("data-checked", "false");
        rowContainer.classList.add("added_to_list");
        rowContainer.classList.add("rowContainer");

        listContainer.appendChild(rowContainer);
        taskCountUpdater();

        setTimeout(() => {
            rowContainer.classList.remove("added_to_list");
            gemData(listContainer.getAttribute("data-filter"));
        }, 1000);
    }
    gemData(listContainer.getAttribute("data-filter"));
    inputBox.value = "";
    quantityBox.value = "";

    quantityBox.classList.add("hide");
}

// Eventlistener der tjekker om checkboxne er krydset af eller slettes.
listContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const rowContainer = event.target.parentElement;
        if (rowContainer) {
            if (event.target.classList.contains("checked")) {
                event.target.classList.remove("checked");
                rowContainer.setAttribute("data-checked", "false");
                listContainer.appendChild(rowContainer);
                taskCountUpdater();
            } else {
                event.target.classList.add("checked");
                rowContainer.setAttribute("data-checked", "true");
                completedListContainer.appendChild(rowContainer);
                taskCountUpdater();
            }
            gemData(listContainer.getAttribute("data-filter"));
            taskCountUpdater();

        }
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.parentElement.remove();
        taskCountUpdater();
        gemData(listContainer.getAttribute("data-filter"));
    }
});

completedListContainer.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        const rowContainer = event.target.parentElement;
        if (rowContainer) {
            event.target.classList.remove("checked");
            rowContainer.setAttribute("data-checked", "false");
            listContainer.appendChild(rowContainer);
            gemData(listContainer.getAttribute("data-filter"));
            taskCountUpdater();
        }
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.parentElement.remove();
        taskCountUpdater();
        gemData(listContainer.getAttribute("data-filter"));
        taskCountUpdater();
    }
});

// Save data to localStorage
function gemData(filter) {
    if (filter === "grocery-list") {
        console.log("grocery save");
        const listData = listContainer.innerHTML;
        const completedData = completedListContainer.innerHTML;
        localStorage.setItem("listData", listData);
        localStorage.setItem("completedData", completedData);
    } else if (filter === "to-do-list") {
        console.log("to do save");
        const toDoData = listContainer.innerHTML;
        const toDoCompleteData = completedListContainer.innerHTML;
        localStorage.setItem("toDoData", toDoData);
        localStorage.setItem("toDoCompleteData", toDoCompleteData);
    }
}

// Display data from localStorage
function visData(visFilter) {
    if (visFilter === "grocery-list") {
        const storedListData = localStorage.getItem("listData");
        const storedCompletedData = localStorage.getItem("completedData");
        if (storedListData) {
            listContainer.innerHTML = storedListData;
        }
        if (storedCompletedData) {
            completedListContainer.innerHTML = storedCompletedData;
        }
    } else if (visFilter === "to-do-list") {
        const storedToDoData = localStorage.getItem("toDoData");
        const storedToDoCompleteData = localStorage.getItem("toDoCompleteData");
        if (storedToDoData) {
            listContainer.innerHTML = storedToDoData;
        }
        if (storedToDoCompleteData) {
            completedListContainer.innerHTML = storedToDoCompleteData;
        }
    }
}

// List switcher function
function listSwitcher(category) {
    if (category === 'yellow') {
        farveUpdater('yellow');
        visData("grocery-list");
    } else if (category === 'purple') {
        farveUpdater('purple');
        visData("to-do-list");
    }
}

// Function to update the color theme
function farveUpdater(farve) {

    if (farve === "yellow") {
        asideMenu.setAttribute("data-theme", "yellow-theme");
        contentBg.setAttribute("data-theme", "yellow-theme");
        listContainer.setAttribute("data-filter", "grocery-list");
        completedListContainer.setAttribute("data-filter", "grocery-list-complete");
        listTitle.innerHTML = "Grocery List";
    } else if (farve === "purple") {
        asideMenu.setAttribute("data-theme", "purple-theme");
        contentBg.setAttribute("data-theme", "purple-theme");
        listContainer.setAttribute("data-filter", "to-do-list");
        completedListContainer.setAttribute("data-filter", "to-do-list-complete");
        listTitle.innerHTML = "To Do List";
    }
}

// Load data on page load
window.addEventListener("load", () => {
    defaultMode();
    visData(listContainer.getAttribute("data-filter"));
    taskCountUpdater();
});


// function taskCounter() {
//     //Task tæller test
//     const taskAmount = document.querySelectorAll(".rowContainer");
//     const taskCounter = taskAmount.length;
//     console.log(taskCounter);
// }

// Denne tæller nu, men tæller forkert.
// let taskRows = listContainer;
//     let taskCount = taskRows.getElementsByTagName('div').length;
//     console.log(taskCount);

// Set default mode
function defaultMode() {
    asideMenu.setAttribute("data-theme", "yellow-theme");
    contentBg.setAttribute("data-theme", "yellow-theme");
    listContainer.setAttribute("data-filter", "grocery-list");
    completedListContainer.setAttribute("data-filter", "grocery-list-complete");
}
