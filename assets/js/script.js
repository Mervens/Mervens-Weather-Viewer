// Initialize variables

function initPage() {

    var clear = document.getElementById("clear-history");

    var name = document.getElementById("city-name");

    var inpEl = document.getElementById("city-input");

    var searEl = document.getElementById("search-button");

    var searHist = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searHist);
    
    const APIKey = "74f8529dfd7d6450ad96fc23b67934d2";

    var currPEl = document.getElementById("current-pic");

    var currTEl = document.getElementById("temperature");

    var currHEl = document.getElementById("humidity");

    var currWEl = document.getElementById("wind-speed");

    var currUVEl = document.getElementById("UV-index");

    var histEl = document.getElementById("history");


function getWeather(cityName) {
//  Begins the function by using cityName on the weather API application

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);

//  Displays current conditions for city
            var currD = new Date(response.data.dt*1000);
            console.log(currD);
            var day = currD.getDate();
            var month = currD.getMonth() + 1;
            var year = currD.getFullYear();
            //latititude/longitude definition
            var lat = response.data.coord.lat;
            var lon = response.data.coord.lon;
            var UVURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVURL)
            .then(function(response){
                var UVLi = document.createElement("span");
                UVLi.setAttribute("class","badge badge-warning");
                UVLi.innerHTML = response.data[0].value;
                currUVEl.innerHTML = "UV Index: ";
                currUVEl.append(UVLi);
            });

            name.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            var weatherPic = response.data.weather[0].icon;
            currPEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currPEl.setAttribute("alt", response.data.weather[0].description);
            currTEl.innerHTML = "Temperature: " + response.data.main.temp + "&#176F";
            currHEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currWEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";



//  Collects response by user input to then use API and retrieve forecast

        var cityID = response.data.id;
        //5 Day Forecast link/city/unit
        var fcURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=imperial" + "&appid=" + APIKey;
        axios.get(fcURL)
        .then(function(response){

//  Now to display upcoming forecast.

            console.log(response);
            var fcEls = document.querySelectorAll(".forecast");
            for (i=0; i<fcEls.length; i++) {
                fcEls[i].innerHTML = "";

                var fcInd = i*8 + 4;
                var fcDate = new Date(response.data.list[fcInd].dt * 1000);
                var fcDay = fcDate.getDate();
                var fcMonth = fcDate.getMonth() + 1;
                var fcYear = fcDate.getFullYear();
                //Date
                var fcDate = document.createElement("p");
                fcDate.setAttribute("class","mt-3 forecast-date");
                fcDate.innerHTML = fcMonth + "/" + fcDay + "/" + fcYear;
                fcEls[i].append(fcDate);
                //Weather Icon
                var fcWeather = document.createElement("img");
                fcWeather.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[fcInd].weather[0].icon + "@2x.png");
                fcWeather.setAttribute("alt",response.data.list[fcInd].weather[0].description);
                fcEls[i].append(fcWeather);
                //Temp
                var fcTemp = document.createElement("p");
                fcTemp.innerHTML = "Temp: " + response.data.list[fcInd].main.temp + "&#176F";
                fcEls[i].append(fcTemp);
                //Humidity
                var fcHumidity = document.createElement("p");
                fcHumidity.innerHTML = "Humidity: " + response.data.list[fcInd].main.humidity + "%";
                fcEls[i].append(fcHumidity);
                //WindSpeed
                var fcWind = document.createElement("p");
                fcWind.innerHTML = "Wind Speed: " + response.data.list[fcInd].wind.speed + "MPH";
                fcEls[i].append(fcWind);
                }
            })
        }); 
    }

    searEl.addEventListener("click",function() {
        var searVal = inpEl.value;
        getWeather(searVal);
        searHist.push(searVal);

        localStorage.setItem("search", JSON.stringify(searHist));
        renderSearchHist();
    })

    function renderSearchHist() {
        //Search history list
        histEl.innerHTML = "";
        for (var i=0; i<searHist.length; i++) {
            //for searHist(length) = with each input create block
            var history = document.createElement("input");
            history.setAttribute("value", searHist[i]);
            history.setAttribute("class", "d-block form-control bg-white");
            history.addEventListener("click",function() {
                getWeather(history.value);
            })
            histEl.append(history);
        }
    }
    
    clear.addEventListener("click",function() {
        searHist = [];
        renderSearchHist();
    })

    renderSearchHist();
    if (searHist.length > 0) {
        getWeather(searHist[searHist.length - 1]);
    }


//  Saved responses show upon reloading page
}

initPage();