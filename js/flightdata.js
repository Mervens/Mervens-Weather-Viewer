// flight api
// https://api.aviationstack.com/v1/flights?access_key=948e51626aced42c9950bda71c9c1676
// disposible variables
var btnAdd = document.querySelector(".btn");
var flightSlots = document.getElementById("download-button");
// Variables to keep
var hash = "access_key=948e51626aced42c9950bda71c9c1676";
var destCity;
var returnData;

// Function list
function getDestCity() {
  destCity = document.getElementById("city-input").value.toLowerCase().trim();
  console.log(destCity);
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
        returnData = flightData;
        console.log(flightData);
      });
    });
    addFlight();
  });
};

// This will generate the cards and flight data when I'm done tonight

function addFlight() {
  // var newFlight = document.getElementById("airline1");
  // var newAirport = document.getElementById("departure1");
  // var newArrival = document.getElementById("arrival1");
  // var newTerminal = document.getElementById("terminal1");
  // newFlight.textContent = returnData.data[23].airline.name;
  // newAirport.textContent = returnData.data[23].departure.airport;
  // newArrival.textContent = returnData.data[23].arrival.time;
  // newTerminal.textContent = returnData.data[23].arrival.terminal;
  // flightSlots.appendChild(newFlight);
}
btnAdd.addEventListener("click", getDestCity);

// insert map code here
