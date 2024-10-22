

// const inputBox = document.getElementById("input_box");
// const quantityBox = document.getElementById("input_quantity");
// const listContainer = document.getElementById("list_container");
// const completedListContainer = document.getElementById("completed_list_container");
// const addButton = document.getElementById("addButton");

// addButton.addEventListener("click", addTask);
// inputBox.addEventListener("click", expandOptions);

// function expandOptions() {
//     quantityBox.classList.remove("hide");
// }

// function addTask() {
//     console.log("Add Task is running");
//     if(inputBox.value === '') {
//         alert("No text was added. Try again")
//     } else {
//         let rowContainer = document.createElement("div");
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;

//         let quantity = quantityBox.value;
//         if (quantity) {
//             li.innerHTML += ` x${quantity} `;
//         }

//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);

//         let rowDivider = document.createElement("div");
//         rowDivider.classList.add("row_divider_line");


//         rowContainer.appendChild(li);
//         rowContainer.appendChild(rowDivider);
//         rowContainer.setAttribute("checked-filter", "unchecked");



//         listContainer.appendChild(rowContainer);
//     }
//     inputBox.value = "";
//     quantityBox.value = "";

//     quantityBox.classList.add("hide");
//     gemData();
// }

// listContainer.addEventListener("click", function(listcheck){
//     console.log("Checkboxes will be checked off");
//     if(listcheck.target.tagName === "LI") {
//         listcheck.target.classList.toggle("checked");

//         if (listcheck.target.classList.contains("checked")) {
//             listcheck.target.setAttribute("checked-filter", "checked");
//         } else {
//             listcheck.target.removeAttribute("checked-filter");
//         }

//         gemData();
//         //sortList()
//     } else if(listcheck.target.tagName === "SPAN"){
//         listcheck.target.parentElement.parentElement.remove();
//         gemData();
//         // sortList()
//     }
// }, false);

// // Forsøg 2
// function removeOrphanRowDividers() {
//     const children = listContainer.children;
//     for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         // Check if the child is a row divider
//         if (child.classList.contains("row_divider_line")) {
//             // Check if its parent has a previous sibling that is an LI
//             const parentDiv = child.parentElement;
//             if (!parentDiv.parentElement ||
//                 parentDiv.parentElement.tagName !== "LI") {
//                 // Remove the row divider and its parent div
//                 parentDiv.remove();
//                 i--; // Decrement i to account for the removed element
//             }
//         }
//     }
// }

// function gemData() {
//     localStorage.setItem("data", listContainer.innerHTML);
// }

// function visData() {
//     listContainer.innerHTML = localStorage.getItem("data");
//     //localStorage.clear();
// }

// visData();



// removeOrphanRowDividers();


// FORSØG 2


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
    }
    inputBox.value = "";
    quantityBox.value = "";
    quantityBox.classList.add("hide");
    gemData();
}

// listContainer.addEventListener("click", function (event) {
//     console.log("Checkboxes will be checked off");
//     if (event.target.tagName === "LI") {
//         event.target.classList.toggle("checked");

//         const rowContainer = event.target.parentElement; // Get the rowContainer

//         if (event.target.classList.contains("checked")) {
//             rowContainer.setAttribute("data-checked", "true");
//             completedListContainer.appendChild(rowContainer); // Move to completedListContainer
//         } else {
//             rowContainer.setAttribute("data-checked", "false");
//             listContainer.appendChild(rowContainer); // Move back to listContainer
//         }

//         gemData();
//     } else if (event.target.tagName === "SPAN") {
//         event.target.parentElement.parentElement.remove();
//         gemData();
//     }
// }, false);

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
    localStorage.setItem("data", listContainer.innerHTML);
}

function visData() {
    listContainer.innerHTML = localStorage.getItem("data");
}

visData();
removeOrphanRowDividers();



