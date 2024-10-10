"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

const settings = {
    filter: "all",
    sortBy: "name",
    sortDir: "asc"
}


function start( ) {
    console.log("ready");

    // TODO: Add event-listeners to filter and sort buttons
    registerButtons();
    loadJSON();
}

// Denne funktion finder alle elementer med data-action "filter", og..
// giver hver button en event-listener, som kalder selectFilter-funktionen.
function registerButtons() {
    document.querySelectorAll("[data-action='filter']")
    .forEach( button => button.addEventListener("click", selectFilter));
    document.querySelectorAll("[data-action='sort']")
    .forEach( button => button.addEventListener("click", selectSort));
}

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();

    // when loaded, prepare data objects
    prepareObjects( jsonData );
}

function prepareObjects( jsonData ) {
    allAnimals = jsonData.map( prepareObject );

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function prepareObject( jsonObject ) {
    const animal = Object.create(Animal);

    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

function selectFilter( event ) {
    const filter = event.target.dataset.filter;
    console.log(`User selected ${filter}`);
    // filterList(filter);
    setFilter(filter);
}

function setFilter( filter) {
    settings.filterBy = filter;
    buildList();
}

function filterList( filteredList ) {
    // let filteredList = allAnimals;

    if (settings.filterBy === "cat") {
        // laver en filtreret liste kun med katte
        filteredList = allAnimals.filter(isCat);
    }
    else if (settings.filterBy === "dog") {
        // laver en filtreret liste kun med hunde
        filteredList = allAnimals.filter(isDog);
    }

    return filteredList;
}

function isCat(animal) {
    return animal.type === "cat";
}

function isDog(animal) {
    return animal.type === "dog";
}

function selectSort( event ) {
    const sortBy = event.target.dataset.sort;
    const sortDir = event.target.dataset.sortDirection;

    // find "old" sortBy element, and remove .sortBy
    const oldElement = document.querySelector(`[data-sort='${settings.sortBy}']`);
    oldElement.classList.remove("sortby");

    // indicate active sort
    event.target.classList.add("sortby");

    // Toggle the direction afterwards by changing the HTML's dataset.
    if (sortDir === "asc") {
        event.target.dataset.sortDirection = "desc"
    } else {
        event.target.dataset.sortDirection = "asc";
    }
    console.log(`User selected ${sortBy} - ${sortDir}`);
    setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir) {
    settings.sortBy = sortBy;
    settings.sortDir = sortDir;

    buildList();
}

function sortList(sortedList) {
    // let sortedList = allAnimals;
    let direction = 1;

    if(settings.sortDir === "desc") {
        direction = -1;
    } else {
        direction = 1;
    };

    sortedList = sortedList.sort(sortByProperty);

    // Denne funktion er inde i sortList funktionen,
    // fordi den bruger "sortBy" parameteret i den ydre funktion.
    function sortByProperty( animalA, animalB) {
        console.log(`sortBy is ${settings.sortBy}`);
        if( animalA[settings.sortBy] < animalB[settings.sortBy]) {
            return -1 * direction;
        } else {
            return 1 * direction;
        }
    };


    return sortedList;
}


function sortByType( animalA, animalB) {
    if( animalA.type < animalB.type) {
        return -1;
    } else {
        return 1;
    }
};

function buildList() {
    const currentList = filterList(allAnimals);
    const sortedList = sortList(currentList);

    displayList(sortedList);
}

function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}


