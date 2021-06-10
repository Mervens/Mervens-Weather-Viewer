// flight api
// https://api.aviationstack.com/v1/flights?access_key=948e51626aced42c9950bda71c9c1676
// disposible variables
var btnAdd = document.querySelector(".btn");
var flightSlots = document.getElementById("download-button");
// Variables to keep
const hash = "access_key=948e51626aced42c9950bda71c9c1676";
var destCity;
let returnData;

// Function list

function getDestCity() {
  destCity = document.getElementById("city-input").value.toLowerCase().trim();
  document
    .createElement("div")
    .setAttribute("class", "container", "col", "align left", "m4");

  getFlightData();
}

var getFlightData = function () {
  fetch(
    "https://api.aviationstack.com/v1/airports?&limit=10&flight_status=active&" +
      hash +
      "&flight_date=2021-06-10&search=" +
      destCity
  ).then(function (response) {
    response.json().then(async function (cityData) {
      console.log(cityData);
      console.log(cityData.data[0].iata_code);
      let iaCode = cityData.data[0].iata_code;
      console.log(iaCode);
      var flightURL =
        "https://api.aviationstack.com/v1/routes?&limit=10&flight_status=active&arr_iata=" +
        iaCode +
        "&flight_date=2021-06-11&" +
        hash;
      const response2 = await fetch(flightURL);
      response2.json().then(function (flightData) {
        console.log(flightData.data[0]);
        flightData.data.forEach((element) => {
          var flightInfo = document.createElement("div");
          flightInfo.setAttribute("class", "card-panel");

          var br = document.createElement("br");
          var br1 = document.createElement("br");
          var br2 = document.createElement("br");

          var airline = document.createTextNode(
            "Airline: " + element.airline.name
          );
          var airport = document.createTextNode(
            "Departure: " + element.departure.airport
          );
          var time = document.createTextNode(
            "Arrival: " + element.arrival.time
          );
          var flight = document.createTextNode(
            "Flight: " + element.flight.number
          );
          flightInfo.appendChild(airline);
          flightInfo.appendChild(br);
          flightInfo.appendChild(airport);
          flightInfo.appendChild(br1);
          flightInfo.appendChild(time);
          flightInfo.appendChild(br2);
          flightInfo.appendChild(flight);

          // Location for flight data to be inserted ***NEEDS CONTAINERS***
          document.getElementById("insert-card").appendChild(flightInfo);
        });
      });
    });
    // addFlight();
  });
};

// This will generate the cards and flight data when I'm done tonight

function addFlight() {
  // var newFlight = document.getElementById("airline1");
  // newFlight.textContent = returnData.data[23].airline.name;
  // newAirport.textContent = returnData.data[23].departure.airport;
  // newArrival.textContent = returnData.data[23].arrival.time;
  // newTerminal.textContent = returnData.data[23].arrival.terminal;
  // flightSlots.appendChild(newFlight);
}
btnAdd.addEventListener("click", getDestCity);

// insert map code here
