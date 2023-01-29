function buttonsCity(city) {
    if (city != '') {
        $('#history').append(
            $(`<button type="button" class="btn btn-secondary btn-lg btn-block">${city}</button>`));
    }
}

$("#search-button").on("click", function(event) {
    event.preventDefault();

    let city = $('#search-input').val();
    buttonsCity(city);

    let queryGeoURL = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=3b515d44aff736d8b6cbd98468bd1dfb";

        $.ajax({
            url: queryGeoURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);

            let lat = response[0].lat;            
            let lon = response[0].lon;
            let queryWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid=3b515d44aff736d8b6cbd98468bd1dfb";

            $.ajax({
                url: queryWeatherURL,
                method: "GET"
            })
            .then(function(response) {
                console.log(response);
                $('#today').empty();

                // let weatherCity = response.city.name;
                let currentDay = moment(response.list[0].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let currentTemp = response.list[0].main.temp;
                let currentWind = response.list[0].wind.speed;
                let currentHumidity = response.list[0].main.humidity;
                
                let currentWeather = $(`<div>
                                            <h2>${city} (${currentDay})</h2>
                                            <p>Temp: ${currentTemp} C</p>
                                            <p>Wind: ${currentWind} KPH</p>
                                            <p>Humidity: ${currentHumidity}</p>
                                        </div>`);
                $('#today').append(currentWeather);
            });
        });
});


// Response from city api call
// lat = response[0].lat
// 51.5073219
// lon = response[0].lon
// -0.1276474

// Response from 5 day forecast

// City = reponse.city.name
// Current day = moment(response.list[0].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
// Temp = response.list[0].main.temp
// Wind = response.list[0].wind.speed
// Humidity = response.list[0].main.humidity

// Forecast 5 days

// Forecast Day 1
// day = moment(response.list[1(2, 3, 4, 5, 6, 7, 8)].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
// image = response.list[1(2, 3, 4, 5, 6, 7, 8)].weather[0].description
// Temp = response.list[1(2, 3, 4, 5, 6, 7, 8)].main.temp
// Wind = response.list[1(2, 3, 4, 5, 6, 7, 8)].wind.speed
// Humidity = response.list[1(2, 3, 4, 5, 6, 7, 8)].main.humidity

// Forecast Day 2
// day = moment(response.list[9(10, 11, 12, 13, 14, 15, 16)].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
// image = response.list[9(10, 11, 12, 13, 14, 15, 16)].weather[0].description
// Temp = response.list[9(10, 11, 12, 13, 14, 15, 16)].main.temp
// Wind = response.list[9(10, 11, 12, 13, 14, 15, 16)].wind.speed
// Humidity = response.list[9(10, 11, 12, 13, 14, 15, 16)].main.humidity

// Forecast Day 3
// day = moment(response.list[17(18, 19, 20, 21, 22, 23, 24)].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
// image = response.list[17(18, 19, 20, 21, 22, 23, 24)].weather[0].description
// Temp = response.list[17(18, 19, 20, 21, 22, 23, 24)].main.temp
// Wind = response.list[17(18, 19, 20, 21, 22, 23, 24)].wind.speed
// Humidity = response.list[17(18, 19, 20, 21, 22, 23, 24)].main.humidity

// Forecast Day 4
// day = moment(response.list[25(26, 27, 28, 29, 30, 31, 32)].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
// image = response.list[25(26, 27, 28, 29, 30, 31, 32)].weather[0].description
// Temp = response.list[25(26, 27, 28, 29, 30, 31, 32)].main.temp
// Wind = response.list[25(26, 27, 28, 29, 30, 31, 32)].wind.speed
// Humidity = response.list[25(26, 27, 28, 29, 30, 31, 32)].main.humidity

// Forecast Day 5
// day = moment(response.list[33(34, 35, 36, 37, 38, 39, 40)].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
// image = response.list[33(34, 35, 36, 37, 38, 39, 40)].weather[0].description
// Temp = response.list[33(34, 35, 36, 37, 38, 39, 40)].main.temp
// Wind = response.list[33(34, 35, 36, 37, 38, 39, 40)].wind.speed
// Humidity = response.list[33(34, 35, 36, 37, 38, 39, 40)].main.humidity