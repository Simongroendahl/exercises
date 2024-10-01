const vehicles = [
  { type: "Bus", fuel: "Diesel", passengers: 45, stops: ["Nørrebrogade", "Elmegade"] },
  { type: "Bil", fuel: "Benzin", passengers: 4, ownedBy: "Klaus" },
  { type: "Cykel", fuel: "Rugbrød", passengers: 0, ownedBy: "Jonas", isElectric: true },
  { type: "Bil", passengers: 5, ownedBy: "Elon", isElectric: true },
  { type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Fonda" },
  { type: "Cykel", fuel: "Rugbrød", passengers: 2, ownedBy: "Vingegård", isTandem: true },
  { type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Yolanda" },
  { type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Børge" },
  { type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Jonas" },
  { type: "Løbehjul", passengers: 1, isElectric: true },
];
const tbodyPointer = document.querySelector("tbody");
const electricButton = document.getElementById("electricFilter");
const twoSeatButton = document.getElementById("seatFilter");
const ownedByJonasButton = document.getElementById("jonasFilter");
const rhyebreadEngineButton = document.getElementById("rugbroedFilter");
const alleButton = document.getElementById("alleFilter");

window.addEventListener("load", tabelVises);

// showTheseVehicles(vehicles);

const onlyElec = vehicles.filter(electricVehicle);

//Page load & Vis tabel
function tabelVises() {
  console.log("Siden vises");
  showTheseVehicles(vehicles);
  electricButton.addEventListener("mousedown", electricFilter);
  twoSeatButton.addEventListener("mousedown", seatFilter);
  ownedByJonasButton.addEventListener("mousedown", jonasFilter);
  rhyebreadEngineButton.addEventListener("mousedown", rugbroedsFilter);
  alleButton.addEventListener("mousedown", visTabel);
}

function visTabel() {
  console.log("Vis tabel");
  tbodyPointer.innerHTML = '';
  showTheseVehicles(vehicles)
}

//Eldrevne køretøjer filter -- VIRKER

function electricVehicle(vehicle) {
  if(vehicle.isElectric === true) {
    return true;
  } else {
    return false;
  }
}

function electricFilter() {
  console.log("Electric Filter Time!");
  tbodyPointer.innerHTML = '';
  showTheseVehicles(vehicles.filter(electricVehicle));
}

//Fartøj med mere end 2 sæder -- VIRKER
function twoPlusSeats(seats) {
  if(seats.isTandem === true) {
    return true;
    } else {
    return false;
    }
}

function seatFilter() {
  console.log("Two seats, please!");
  tbodyPointer.innerHTML = '';
  showTheseVehicles(vehicles.filter(twoPlusSeats));
}


//Fartøj ejet af Jonas
function ejetAfJonas(ejet) {
  if(ejet.ownedBy === "Jonas") {
    return true;
  } else {
    return false;
  }
}

function jonasFilter() {
  console.log("Hej Jonas");
  tbodyPointer.innerHTML = '';
  showTheseVehicles(vehicles.filter(ejetAfJonas));
}

//Rugbrødsdreven fartøj
function rugbroedsMotor(rug) {
  if(rug.fuel === "Rugbrød") {
    return true;
  } else {
    return false;
  }
}

function rugbroedsFilter() {
  console.log("Rugbrødsfilter");
  tbodyPointer.innerHTML = '';
  showTheseVehicles(vehicles.filter(rugbroedsMotor));
}

// OG function
// function showTheseVehicles(arr) {
//   arr.forEach((each) => {
//     tbodyPointer.innerHTML += `<tr>
//   <td>${each.type}</td>
//   <td>${each.fuel}</td>
//   <td>${each.passengers}</td>
//   <td>${each.stops}</td>
//   <td>${each.ownedBy}</td>
//   <td>${each.isElectric}</td>
//   <td>${each.isTandem}</td>
// </tr>`;
//   });
// }

const makePretty = {
  undefined: "Ukendt",
}

// Test funktion, if-statements.
function showTheseVehicles(arr) {
  arr.forEach((each) => {
    tbodyPointer.innerHTML += `<tr>
      <td>${each.type || makePretty.undefined}</td>
      <td>${each.fuel || makePretty.undefined}</td>
      <td>${each.passengers !== undefined ? each.passengers : makePretty.undefined}</td>
      <td>${each.stops ? each.stops.join(', ') : makePretty.undefined}</td>
      <td>${each.ownedBy || makePretty.undefined}</td>
      <td>${each.isElectric === true ? "Ja" : makePretty.undefined}</td>
      <td>${each.isTandem === true ? "Ja" : makePretty.undefined}</td>
    </tr>`;
  });
}

// function samlerFilter(filter) =


