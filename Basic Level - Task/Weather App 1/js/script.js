
let cityChosen = document.querySelector(".form input[type='text']")
let search = document.querySelector(".form button[type='submit']")
let weatherImage = document.querySelector(".view .logo img")


// Give Temp, Wind, Humidity
let temp = document.querySelector(".details .temperature strong")
let wind = document.querySelector(".details .wind strong")
let humidity = document.querySelector(".details .humidity strong")

function infos(t, w, h) {
    temp.textContent = t.toFixed(0)
    wind.textContent = w
    humidity.textContent = h
}

// Status of Weather 
let status = document.querySelector(".view .status")

function statusOfWeather(s) {
    status.textContent = s
}

// Set Date 
let date = document.querySelector(".city-searched .date")

function setDate() {
    let now = new Date()
    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    date.textContent = `( ${day} / ${month} / ${year} )`
}

search.addEventListener("click", () => {

    if (cityChosen.value != "") {
        let apiKey = "69dc8580d9bde5983a3069f39d805395";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityChosen.value}&appid=${apiKey}`)
            .then(response => response.json())
            .then((result) => {
                let main = result.weather[0].main
                let description = result.weather[0].description
                let apiTemp = result.main.temp - 273.15
                let apiWind = result.wind.speed
                let apiHum = result.main.humidity
                let cityName = document.querySelector(".city-searched .name")

                cityName.textContent = result.name
                setDate()
                infos(apiTemp, apiWind, apiHum)
                statusOfWeather(description)
                ImageOfStatus(description, 0)

            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityChosen.value}&appid=${apiKey}`)
            .then(res => res.json())
            .then(json => {
                let date = document.querySelectorAll(".city-searched .date")
                let temp = document.querySelectorAll(".future .details .temperature strong")
                let wind = document.querySelectorAll(".future .details .wind strong")
                let humidity = document.querySelectorAll(".future .details .humidity strong")
                let firstDay = json.list[7]
                let secondDay = json.list[15]
                let thirdDay = json.list[23]
                let fourthDay = json.list[31]
                let fifthDay = json.list[39]

                setting(date, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                windLooping(wind, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                tempLooping(temp, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                humLooping(humidity, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                ImageOfStatus(firstDay.weather[0].description, 1)
                ImageOfStatus(secondDay.weather[0].description, 2)
                ImageOfStatus(thirdDay.weather[0].description, 3)
                ImageOfStatus(fourthDay.weather[0].description, 4)
                ImageOfStatus(fifthDay.weather[0].description, 5)

            })
        cityChosen.value = ""
    }
})

// Get Current Weather 
let current = document.querySelector(".choose-country .current")

current.addEventListener("click", () => {

    function success(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        let apiKey = "69dc8580d9bde5983a3069f39d805395"
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then(req => req.json())
            .then(jsonObj => {
                let main = jsonObj.weather[0].main
                let description = jsonObj.weather[0].description
                let apiTemp = jsonObj.main.temp - 273.15
                let apiWind = jsonObj.wind.speed
                let apiHum = jsonObj.main.humidity
                let cityName = document.querySelector(".city-searched .name")

                cityName.textContent = jsonObj.name
                setDate()
                infos(apiTemp, apiWind, apiHum)
                statusOfWeather(description)
                ImageOfStatus(description, 0)
            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
            .then(info => info.json())
            .then(get => {
                let date = document.querySelectorAll(".city-searched .date")
                let temp = document.querySelectorAll(".future .details .temperature strong")
                let wind = document.querySelectorAll(".future .details .wind strong")
                let humidity = document.querySelectorAll(".future .details .humidity strong")
                let firstDay = get.list[7]
                let secondDay = get.list[15]
                let thirdDay = get.list[23]
                let fourthDay = get.list[31]
                let fifthDay = get.list[39]


                setting(date, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                windLooping(wind, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                tempLooping(temp, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                humLooping(humidity, firstDay, secondDay, thirdDay, fourthDay, fifthDay)
                ImageOfStatus(firstDay.weather[0].description, 1)
                ImageOfStatus(secondDay.weather[0].description, 2)
                ImageOfStatus(thirdDay.weather[0].description, 3)
                ImageOfStatus(fourthDay.weather[0].description, 4)
                ImageOfStatus(fifthDay.weather[0].description, 5)
            })
    }

    navigator.geolocation.getCurrentPosition(success)
})

function afterBefore() {
    let info = document.querySelector("info")
    // info.classList.add("mini")
    weatherImage.parentElement.style.transform = 'scale(1)'
    weatherImage.parentElement.nextElementSibling.style.transform = 'scale(1)'

    document.querySelectorAll(".view .logo img").forEach((e) => {
        e.parentElement.style.transform = 'scale(1)'
    })
    document.querySelectorAll(".view").forEach((e) => {
        // e.style.width = 'fit-content'
        e.style.height = "131px"
    })
    document.querySelectorAll(".future .view").forEach((e) => {
        // e.style.width = 'fit-content'
        e.style.height = "61px"
    })
}

// Give The Percent of Humidity
function humLooping(h, firstDay, secondDay, thirdDay, fourthDay, fifthDay) {
    h.forEach((e) => {
        e.parentElement.dataset.i == "1" ? e.textContent = firstDay.main.humidity : ""
        e.parentElement.dataset.i == "2" ? e.textContent = secondDay.main.humidity : ""
        e.parentElement.dataset.i == "3" ? e.textContent = thirdDay.main.humidity : ""
        e.parentElement.dataset.i == "4" ? e.textContent = fourthDay.main.humidity : ""
        e.parentElement.dataset.i == "5" ? e.textContent = fifthDay.main.humidity : ""
    })
}

// Give The Celsius of Temperature
function tempLooping(t, firstDay, secondDay, thirdDay, fourthDay, fifthDay) {
    t.forEach((e) => {
        e.parentElement.dataset.i == "1" ? e.textContent = (firstDay.main.temp - 273.15).toFixed(0) : ""
        e.parentElement.dataset.i == "2" ? e.textContent = (secondDay.main.temp - 273.15).toFixed(0) : ""
        e.parentElement.dataset.i == "3" ? e.textContent = (thirdDay.main.temp - 273.15).toFixed(0) : ""
        e.parentElement.dataset.i == "4" ? e.textContent = (fourthDay.main.temp - 273.15).toFixed(0) : ""
        e.parentElement.dataset.i == "5" ? e.textContent = (fifthDay.main.temp - 273.15).toFixed(0) : ""
    })
}

// Give The Speed of Temperature
function windLooping(w, firstDay, secondDay, thirdDay, fourthDay, fifthDay) {
    w.forEach((e) => {
        e.parentElement.dataset.i == "1" ? e.textContent = firstDay.wind.speed : ""
        e.parentElement.dataset.i == "2" ? e.textContent = secondDay.wind.speed : ""
        e.parentElement.dataset.i == "3" ? e.textContent = thirdDay.wind.speed : ""
        e.parentElement.dataset.i == "4" ? e.textContent = fourthDay.wind.speed : ""
        e.parentElement.dataset.i == "5" ? e.textContent = fifthDay.wind.speed : ""
    })
}

// Set The Date of The Day 
function setting(d, firstDay, secondDay, thirdDay, fourthDay, fifthDay) {
    d.forEach((e) => {
        e.dataset.i == "1" ? e.textContent = `( ${firstDay.dt_txt.match(/\d{4}-\d{2}-\d{2}/)} )` : ""
        e.dataset.i == "2" ? e.textContent = "(" + " " + secondDay.dt_txt.substring(0, secondDay.dt_txt.search(/\s/)) + " " + ")" : ""
        e.dataset.i == "3" ? e.textContent = `( ${thirdDay.dt_txt.split(" ")[0]} )` : ""
        e.dataset.i == "4" ? e.textContent = `( ${fourthDay.dt_txt.match(/\d{4}-\d{2}-\d{2}/)} )` : ""
        e.dataset.i == "5" ? e.textContent = `( ${fifthDay.dt_txt.match(/\d{4}-\d{2}-\d{2}/)} )` : ""
    })
}

// The Photo of Weather's Status
function ImageOfStatus(m, n) {
    let weatherImage = document.querySelectorAll(".view .logo img")
    switch (m) {
        case 'clear sky':
            weatherImage[n].src = 'images/sun.png'
            afterBefore()
            break;
        case 'few clouds':
            weatherImage[n].src = 'images/few clouds.png'
            afterBefore()
            break;
        case 'scattered clouds':
            weatherImage[n].src = 'images/scattered clouds.png'
            afterBefore()
            break;
        case 'broken clouds':
            weatherImage[n].src = 'images/broken clouds.png'
            afterBefore()
            break;
        case 'shower rain':
            weatherImage[n].src = 'images/shower rain.png'
            afterBefore()
            break;
        case 'thunderstorm':
            weatherImage[n].src = 'images/thunderstorm.png'
            afterBefore()
            break;
        case 'snow':
            weatherImage[n].src = 'images/snow.png'
            afterBefore()
            break;
        case 'mist':
            weatherImage[n].src = 'images/mist.png'
            afterBefore()
            break;
        default:
            weatherImage[n].src = 'images/mist.png'
            afterBefore()
    }

}

