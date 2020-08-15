var apiKey = "be4ba16383051ea85211fa8b62bcb28a"

var prevSearch = JSON.parse(localStorage.getItem("weather")) || []
console.log(prevSearch)

function showWeather(city) {
    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey)
        .then(function (res) {
            $("#currentWeather").empty()
            console.log(res)
            var jumbotron = $("<div>").addClass("jumbotron ")
            var cityName = $("<h2>").text(res.name + " (" + moment.unix(res.dt).format('L') + ')')
            var img = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + res.weather[0].icon + ".png")
            cityName.append(img)
            var tempText = $("<div>").text("Temperature: " + res.main.temp + " F°")
            var humidity = $("<div>").text("Humidity: " + res.main.humidity + " %")
            var wind = $("<div>").text("Wind Speed: " + res.wind.speed + "")
            $.get("https://api.openweathermap.org/data/2.5/uvi?lat=" + res.coord.lat + "&lon=" + res.coord.lon + "&appid=" + apiKey)
                .then(function (uvRes) {
                    console.log(uvRes)
                    var uv = $("<div>").text("UV Index: " + uvRes.value)
                    if (uvRes.value > 7) {
                        uv.attr("style", "color: red")
                    if (uvRes.vlue <= 7 && uvRes.value >= 4) {
                        uv.attr("style", "color : orange")
                    uvRes.value < 4
                        uv.attr("style", "color: green")
                    }
                    }
                    
                    jumbotron.append(cityName, tempText, humidity, wind, uv)
                    $("#currentWeather").append(jumbotron)
                })
        })
            
        $.get("https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + apiKey)
        .then(function (response) {
            
    for (let i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("15:00:00") > 0 ) {
            var res = response.list[i]
            console.log(response.list[i])
            
        
        
            var card = $("<div>").addClass("card bg-primary col-md-2 text-light")
            var date = $("<div>").text("Date : " + res.dt_txt)
            var temp = $("<div>").text("Temp: " + response.list[i].main.temp + " F")
            var humidity = $("<div>").text("Humidity: " + res.main.humidity + " %")
            card.append(date, temp, humidity)
            $("#futureWeather").append(card)
        }
        
    }
})
}       
function renderList() {
    $("#citySearch").empty()
    for (let i = 0; i < prevSearch.length; i++) {
        var div = $("<div>").text(prevSearch[i])
        div.addClass("past text-center py-1 bg-light mb-1")
        div.attr("data-city", prevSearch[i])
        $("#citySearch").prepend(div)
    }
}
$(".btn-primary").on("click", function () {
    var city = $("#cityName").val()
    prevSearch.push(city)
    localStorage.setItem("weather", JSON.stringify(prevSearch))
    renderList()
    showWeather(city)
})
$("#citySearch").on("click", ".past", function () {
    var prevCityName = $(this).attr("data-city")
    showWeather(prevCityName)
})
function init() {
    showWeather(prevSearch[prevSearch.length - 1])
}
init()
renderList()