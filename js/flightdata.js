// flight api
// https://api.aviationstack.com/v1/flights?access_key=948e51626aced42c9950bda71c9c1676
// disposible variables
var btnAdd = document.querySelector(".btn");
var flightSlots = document.getElementById("download-button");
// Variables to keep
var hash = "access_key=948e51626aced42c9950bda71c9c1676";
var destCity;
let returnData;
// Function list
function getDestCity() {
  destCity = document.getElementById("city-input").value.toLowerCase().trim();
  document.querySelector(".icon-block").setAttribute("class", "hide");
  document.createElement("div").setAttribute("class", "card-panel");

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
        "&flight_date=2021-06-10&" +
        hash;
      const response2 = await fetch(flightURL);
      response2.json().then(function (flightData) {
        console.log(flightData.data[0]);
        flightData.data.forEach((element) => {
          var help = document.createElement("div");
          help.setAttribute(
            "class",
            "card",
            "blue-text",
            "md4",
            "row",
            "hoverable"
          );
          var me = document.createTextNode(element.airline.name);
          help.appendChild(me);
          document.getElementById("insert-card").appendChild(help);
          // console.log("Airline: " + element.airline.name);
          // console.log("Departure: " + element.departure.airport);
          // console.log("Arrival: " + element.arrival.time);
          // console.log("Flight: " + element.flight.number);
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
