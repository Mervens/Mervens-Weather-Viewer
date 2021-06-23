// Initialize variables

function initPage() {

    var clear = document.getElementById("clear-history");

    var name = document.getElementById("city-name");

    var currPEl = document.getElementById("current-pic");

    var currTEl = document.getElementById("temperature");

    var currHEl = document.getElementById("humidity");

    var currWEl = document.getElementById("wind-speed");

    var currUVEl = document.getElementById("UV-index");

    var histEl = document.getElementById("history");

    var inpEl = document.getElementById("city-input");

    var searEl = document.getElementById("search-button");

    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);
    const APIKey = "74f8529dfd7d6450ad96fc23b67934d2";


    function getWeather(cityName) {

//  Begins the function by using cityName on the weather API application

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response){
            console.log(response);

//  Displays current conditions for city
            const currD = new Date(response.data.dt*1000);
            console.log(currD);
            const day = currD.getDate();
            const month = currD.getMonth() + 1;
            const year = currD.getFullYear();

            name.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currPEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currPEl.setAttribute("alt",response.data.weather[0].description);
            currTEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currHEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currWEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        axios.get(UVQueryURL)

        .then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currUVEl.innerHTML = "UV Index: ";
            currUVEl.append(UVIndex);
        });

//  Collects response by user input to then use API and retrieve forecast

        let cityID = response.data.id;
        //let 
        let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
        axios.get(forecastQueryURL)
        .then(function(response){

//  Now to display upcoming forecast.

            console.log(response);
            const forecastEls = document.querySelectorAll(".forecast");
            for (i=0; i<forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";

                const forecastIndex = i*8 + 4;
                const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                //Date
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                //Weather Icon
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                //Temp
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                forecastEls[i].append(forecastTempEl);
                //Humidity
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
                //WindSpeed
                const forecastWindEl = document.createElement("p");
                forecastWindEl.innerHTML = "Wind Speed: " + response.data.list[forecastIndex].wind.speed + "MPH";
                forecastEls[i].append(forecastWindEl);
                }
            })
        }); 
    }

    searEl.addEventListener("click",function() {
        const searchTerm = inpEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    clear.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

    function renderSearchHistory() {
        //Search history list
        histEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            //for searchHistory(length) = with each input create block
            var history = document.createElement("input");
            history.setAttribute("type","text");
            history.setAttribute("readonly",true);
            history.setAttribute("class", "form-control d-block bg-white");
            history.setAttribute("value", searchHistory[i]);
            history.addEventListener("click",function() {
                getWeather(history.value);
            })

            histEl.append(history);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }


//  Saved responses show upon reloading page

}
initPage();