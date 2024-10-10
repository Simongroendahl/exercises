"use strict";

window.addEventListener("DOMContentLoaded", start);

// let animals;

const allAnimals = [];

const Animal = {
    name: "-default name-",
    desc: "-no description-",
    type: "-unknown-",
    age: 0
};

// We are not interested in manually rearranging data. Imagine this with..
// 10.000 data inputs. That would be tedious.

function start( ) {
    console.log("ready");

    loadJSON();
}

function loadJSON() {
    fetch("animals.json")
    .then( response => response.json() )
    .then( jsonData => {
        // animals = jsonData;

        // when loaded, display the list
        prepareObjects( jsonData );

    });
}

function prepareObjects( jsonData ) {
    jsonData.forEach( jsonObject => {
        //TODO: Create a new object with cleaned data. Store that
        // in the allAnimals array.
        // const animal = Object.create(Animal);


        // const fullname = jsonObject.fullname;

        // const firstSpace = fullname.indexOf(" ");
        // const secondSpace = fullname.indexOf(" ", firstSpace+1);
        // const lastSpace = fullname.lastIndexOf(" ");

        // const name = fullname.substring(0, firstSpace);
        // const desc = fullname.substring(secondSpace+1, lastSpace);
        // const type = fullname.substring(lastSpace+1);

        // console.log(`name: _${name}_
        //     desc: _${desc}_
        //     type: _${type}_`);
        // //

        // animal.name = name;
        // animal.desc = desc;
        // animal.type = type;

        // allAnimals.push(animal);
    });
    displayList();
}

function displayList() {
    // clear the list
    document.querySelector("#list").innerHTML = "";

    // build a new list
    allAnimals.forEach( displayAnimal );
}

function displayAnimal( animal ) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=fullname]").textContent = animal.fullname;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list").appendChild( clone );
}

