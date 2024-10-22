

const inputBox = document.getElementById("input_box");
const listContainer = document.getElementById("list_container");
const addButton = document.getElementById("addButton");

addButton.addEventListener("click", addTask);

function addTask() {
    console.log("Add Task is running");
    if(inputBox.value === '') {
        alert("No text was added. Try again")
    } else {
        let rowContainer = document.createElement("div");
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        li.appendChild(span);
        rowContainer.appendChild(li);
        let rowDivider = document.createElement("div");
        rowDivider.classList.add("row_divider_line");
        rowContainer.appendChild(rowDivider);

        listContainer.appendChild(rowContainer);
    }
    inputBox.value = "";
    gemData();
}

listContainer.addEventListener("click", function(listcheck){
    console.log("Checkboxes will be checked off");
    if(listcheck.target.tagName === "LI") {
        listcheck.target.classList.toggle("checked");
        gemData();
    } else if(listcheck.target.tagName === "SPAN"){
        listcheck.target.parentElement.parentElement.remove();
        rowDivider.target.remove();


        gemData();
    }
}, false);

function removeOrphanRowDividers() {
    const children = listContainer.children;
    for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains("row_divider_line")) {

            if (!children[i].previousElementSibling ||
                children[i].previousElementSibling.tagName !== "LI") {
                children[i].remove();
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