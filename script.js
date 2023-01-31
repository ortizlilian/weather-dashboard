// const buttonsName = [];
let jsonButtonsName = [];

function createButtons (array) {
    array.forEach(element => {
        $('#history').append(
            $(`<button type="button" class="btn btn-secondary btn-lg btn-block">${element}</button>`));
    });
}

function start () {
    jsonButtonsName = JSON.parse(localStorage.getItem('jsonButtonsName')) || [];
    createButtons(jsonButtonsName);
}

// const localButtons = JSON.parse(localStorage.getItem('array'));

function buttonsCity (city) {
    if (city != '' 
    // && jsonButtonsName.includes(jsonButtonsName.name) != true
    ) {
        // let button = 
        // $('#history').append(
        //     $(`<button type="button" class="btn btn-secondary btn-lg btn-block">${city}</button>`));

        // let newButton = {
        //     name: city,
        //     htmlButton: button 
        // };

        // buttonsName.push(city);
        // let buttonObject = localStorage.setItem(city, button);

        jsonButtonsName.push(city); 
        localStorage.setItem('jsonButtonsName', JSON.stringify(jsonButtonsName));
    }
}

function forecastDiv (day, image, temp, wind, humidity) {
    let weather = $(`<div class="col forecast-tiles">
                        <h3>${day}</h3>
                        <p>${image}</p>
                        <p>Temp: ${temp} C</p>
                        <p>Wind: ${wind} KPH</p>
                        <p>Humidity: ${humidity}</p>
                    </div>`);
    $('#forecast').append(weather);
}

function getIndexDay1 (currentHour) {
    let index = 0
    if (currentHour >= 0 && currentHour <= 2) {
        index = 0;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 1;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 2;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 3;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 4;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 5;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 6;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 7;
    } return index;
}

function getIndexDay2 (currentHour) {
    let index = 8
    if (currentHour >= 0 && currentHour <= 2) {
        index = 8;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 9;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 10;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 11;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 12;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 13;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 14;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 15;
    } return index;
}

function getIndexDay3 (currentHour) {
    let index = 16
    if (currentHour >= 0 && currentHour <= 2) {
        index = 16;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 17;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 18;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 19;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 20;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 21;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 22;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 23;
    } return index;
}

function getIndexDay4 (currentHour) {
    let index = 24
    if (currentHour >= 0 && currentHour <= 2) {
        index = 24;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 25;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 26;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 27;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 28;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 29;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 30;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 31;
    } return index;
}

function getIndexDay5 (currentHour) {
    let index = 32
    if (currentHour >= 0 && currentHour <= 2) {
        index = 32;   
    } else if (currentHour >= 3 && currentHour <= 5) {
        index = 33;        
    } else if (currentHour >= 6 && currentHour <= 8) {
        index = 34;
    } else if (currentHour >= 9 && currentHour <= 11) {
        index = 35;
    } else if (currentHour >= 12 && currentHour <= 14) {
        index = 36;
    } else if (currentHour >= 15 && currentHour <= 17) {
        index = 37;
    } else if (currentHour >= 18 && currentHour <= 20) {
        index = 38;
    } else if (currentHour >= 21 && currentHour <= 23) {
        index = 39;
    } return index;
}

$("#search-button").on("click", function(event) {
    event.preventDefault();

    let city = $('#search-input').val();
    buttonsCity(city);
    // createButtons(buttonsName);
    console.log(jsonButtonsName);
    

    let queryGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=3b515d44aff736d8b6cbd98468bd1dfb";

    $.ajax({
        url: queryGeoURL,
        method: "GET"
    })
    .then(function(response) {
        let lat = response[0].lat;            
        let lon = response[0].lon;
        let queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=3b515d44aff736d8b6cbd98468bd1dfb";
        let queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid=3b515d44aff736d8b6cbd98468bd1dfb";

        $.ajax({
            url: queryCurrentURL,
            method: "GET"
        })
        .then(function(response) {
            
            // Populate today div
            $('#today').empty();
            let currentDay = moment().format("DD/M/YYYY");
            let currentTemp = response.main.temp;
            let currentWind = response.wind.speed;
            let currentHumidity = response.main.humidity;
            
            let currentWeather = $(`<div>
                                        <h2>${city} (${currentDay})</h2>
                                        <p>Temp: ${currentTemp} C</p>
                                        <p>Wind: ${currentWind} KPH</p>
                                        <p>Humidity: ${currentHumidity}</p>
                                    </div>`);
            $('#today').append(currentWeather);
            
            $.ajax({
                url: queryWeatherURL,
                method: "GET"
            })
            .then(function(response) {

                // Populate forecast div
                console.log(response);
                $('#forecast').empty();                
                let currentHour = moment().format("H");
                
                let day1 = moment(response.list[1].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i1 = getIndexDay1(currentHour);

                let image1 = response.list[i1].weather[0].description;
                let temp1 = response.list[i1].main.temp;
                let wind1 = response.list[i1].wind.speed;
                let humidity1 = response.list[i1].main.humidity;

                forecastDiv(day1, image1, temp1, wind1, humidity1);

                let day2 = moment(response.list[9].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i2 = getIndexDay2(currentHour);

                let image2 = response.list[i2].weather[0].description;
                let temp2 = response.list[i2].main.temp;
                let wind2 = response.list[i2].wind.speed;
                let humidity2 = response.list[i2].main.humidity;

                forecastDiv(day2, image2, temp2, wind2, humidity2);

                let day3 = moment(response.list[17].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i3 = getIndexDay3(currentHour);

                let image3 = response.list[i3].weather[0].description;
                let temp3 = response.list[i3].main.temp;
                let wind3 = response.list[i3].wind.speed;
                let humidity3 = response.list[i3].main.humidity;

                forecastDiv(day3, image3, temp3, wind3, humidity3);

                let day4 = moment(response.list[25].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i4 = getIndexDay4(currentHour);

                let image4 = response.list[i4].weather[0].description;
                let temp4 = response.list[i4].main.temp;
                let wind4 = response.list[i4].wind.speed;
                let humidity4 = response.list[i4].main.humidity;

                forecastDiv(day4, image4, temp4, wind4, humidity4);

                let day5 = moment(response.list[33].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i5 = getIndexDay5(currentHour);

                let image5 = response.list[i5].weather[0].description;
                let temp5 = response.list[i5].main.temp;
                let wind5 = response.list[i5].wind.speed;
                let humidity5 = response.list[i5].main.humidity;

                forecastDiv(day5, image5, temp5, wind5, humidity5);                
            });
        });
    });
});

start();

// let localButtons = localStorage.setItem('array', JSON.stringify(buttonsName));

// createButtons(localButtons);


// Response from city api call
// lat = response[0].lat
// 51.5073219
// lon = response[0].lon
// -0.1276474

// Api call that returns current weather
// let queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=3b515d44aff736d8b6cbd98468bd1dfb"

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