
// Variable that stores cities inputs;
let jsonButtonsName = [];

// Function that creates buttons using city names stored in an array, and attachs
// an on.click event that injects the button value to search-input and trigger
// a click on search-button
function createButtons (array) {
    $('#history').empty();

    array.forEach(element => {
        $('#history').append(
            $(`<button type="button" class="cities btn btn-secondary btn-lg btn-block">${element}</button>`));
    });

    $("button.cities").on("click", function(event) {
        event.preventDefault();
        let click = $(this)[0].innerText;
        $('#search-input').val(click);
        $('#search-button').trigger("click");
        $('#search-input').val('');
    });
}

// Function that gets the cities from local storage and calls the createButtons
// function
function start () {
    jsonButtonsName = JSON.parse(localStorage.getItem('jsonButtonsName')) || [];
    createButtons(jsonButtonsName);
}

// Function that checks if jsonButtonsName already contains a city, if not it pushs
// the new city to it and save the updated array to local storage
function buttonsCity (city) {
    if (city != '' && jsonButtonsName.includes(city) != true) {        
        jsonButtonsName.push(city); 
        localStorage.setItem('jsonButtonsName', JSON.stringify(jsonButtonsName));
        createButtons(jsonButtonsName);
    }
}

// Function that creates a div with the forecast data
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


// The following 5 functions change the indexes of the array returned from openweather
// according to the current time of the day. The forecast are updated every 3 hours
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


// Main on click event that triggers the api calls
$("#search-button").on("click", function(event) {
    event.preventDefault();

    let city = $('#search-input').val();
    buttonsCity(city);   

    let queryGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=3b515d44aff736d8b6cbd98468bd1dfb";

    // First api call, used to get data to trigger second api call (the one that
    // returns the actual weather data)
    $.ajax({
        url: queryGeoURL,
        method: "GET"
    })
    .then(function(response) {
        let lat = response[0].lat;            
        let lon = response[0].lon;

        // Api endpoint that returns current weather
        let queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=3b515d44aff736d8b6cbd98468bd1dfb";

        // Api endpoint that returns 5 days forecast 
        let queryWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid=3b515d44aff736d8b6cbd98468bd1dfb";

        // Ajax api call that returns current weather data
        $.ajax({
            url: queryCurrentURL,
            method: "GET"
        })
        .then(function(response) {
            
            // Populate today's div
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
            
            // Ajax api call that returns 5 days forecast data
            $.ajax({
                url: queryWeatherURL,
                method: "GET"
            })
            .then(function(response) {

                // Populate forecast's div                
                $('#forecast').empty();                
                let currentHour = moment().format("H");
                
                // Forecast data for first day 
                let day1 = moment(response.list[1].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i1 = getIndexDay1(currentHour);

                let image1 = response.list[i1].weather[0].description;
                let temp1 = response.list[i1].main.temp;
                let wind1 = response.list[i1].wind.speed;
                let humidity1 = response.list[i1].main.humidity;

                forecastDiv(day1, image1, temp1, wind1, humidity1);
                
                // Forecast data for second day
                let day2 = moment(response.list[9].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i2 = getIndexDay2(currentHour);

                let image2 = response.list[i2].weather[0].description;
                let temp2 = response.list[i2].main.temp;
                let wind2 = response.list[i2].wind.speed;
                let humidity2 = response.list[i2].main.humidity;

                forecastDiv(day2, image2, temp2, wind2, humidity2);

                // Forecast data for third day
                let day3 = moment(response.list[17].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i3 = getIndexDay3(currentHour);

                let image3 = response.list[i3].weather[0].description;
                let temp3 = response.list[i3].main.temp;
                let wind3 = response.list[i3].wind.speed;
                let humidity3 = response.list[i3].main.humidity;

                forecastDiv(day3, image3, temp3, wind3, humidity3);

                // Forecast data for fourth day
                let day4 = moment(response.list[25].dt_txt, "YYYY-MM-DD HH:mm:ss").format("DD/M/YYYY");
                let i4 = getIndexDay4(currentHour);

                let image4 = response.list[i4].weather[0].description;
                let temp4 = response.list[i4].main.temp;
                let wind4 = response.list[i4].wind.speed;
                let humidity4 = response.list[i4].main.humidity;

                forecastDiv(day4, image4, temp4, wind4, humidity4);

                // Forecast data for fifth day
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

// Function call to get data for local storage and load it to the page
start();