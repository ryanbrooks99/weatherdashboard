function pageStart() {

  // Setting variables 
  var inputEl = $("city-input");
  var searchEl = $("search-button");
  var clearHistoryEl = $("clear-history");
  var nameEl = $("city-name");
  var picEl = $("current-pic");
  var tempEl = $("temperature");
  var humidityEl = $("humidity");
  var windEl = $("wind-speed");
  var UVIndexEl = $("UV-index");
  var historyEl = $("history");
  
  var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  
  // console.log(searchHistory);
  
  
  
  searchEl.on("click", function (cityName) {
    var APIkey = "be4ba16383051ea85211fa8b62bcb28a";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
    console.log(queryURL)
  })
  
  






}

pageStart();

