$(function(){
    var weather = (function(){
        //cache dom
        var $weather = $(".weather-widget");
        var $h1 = $weather.find("h1");
        var $h2 = $weather.find("h2");
        var $h3 = $weather.find("h3");
        var $bg = $("html");
        var $slider = $weather.find(".switch");

        //variables
        var location;
        var weatherJSON;
        var temperatureUnit = "F";

        //bind events
        $slider.find("input").on("click", changeUnit);

        //load
        function load(){
            $h2.hide();
            $h3.hide();
            $slider.hide();
            update(function() {
                $h2.slideDown();
                $h3.slideDown();
                $slider.slideDown();
            });
        }

        //update
        function update(callback) {
            getLocation(function() {
                getWeather(function() {
                    updateUI();
                    updateBackground();
                    callback();
                });
            });
        }

        //get current location
        function getLocation(callback) {
            $.ajax({
                method: "GET",
                url: "http://ip-api.com/json",
                success: function(response) {
                    location = response;
                    callback();
                },
                error: function() {
                    console.log("Error: Unable to retrieve location information.");
                }
            });
        }

        //get json from open weather
        function getWeather(callback) {
            $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather?lat=" + location.lat + "&lon=" + location.lon + "&units=imperial&APPID=e6191dc25515677ac6b864ae00be0b24",
                success: function(response) {
                    weatherJSON = response;
                    callback();
                },
                error: function() {
                    console.log("Error: Unable to retrieve weather info.");
                }
            });
        }

        //update ui
        function updateUI() {
            $h1.text(weatherJSON.name + ", " + weatherJSON.sys.country);
            $h2.text(weatherJSON.main.temp.toFixed(2) + " °" +temperatureUnit);
            $h3.text(weatherJSON.weather[0].description);
        }

        //update background
        function updateBackground() {
            switch(weatherJSON.weather[0].main.toLowerCase()){
                case "thunderstorm":
                    $bg.css("background-image", "url('http://68.media.tumblr.com/063481f87ba3058c8bb235148df090b9/tumblr_nb8zykBVPC1qze3hdo1_r1_500.gif')");
                    break;
                case "drizzle":
                    $bg.css("background-image", "url('http://68.media.tumblr.com/09c6d90170076846bdb19de05e08a8ca/tumblr_ol3lldvM801qze3hdo1_r1_500.gif')");
                    break;
                case "rain":
                    $bg.css("background-image", "url('http://68.media.tumblr.com/a1971a640a7c31496b83b4368b7af2d3/tumblr_oa5kbyhVQh1qze3hdo1_500.gif')");
                    break;
                case "snow":
                    $bg.css("background-image", "url('http://68.media.tumblr.com/dba8930c075bf505728df757c37b4216/tumblr_oh8awjk7lA1qze3hdo1_r1_500.gif')");
                    break;
                case "clear":
                    $bg.css("background-image", "url('http://68.media.tumblr.com/74f3a108bc59636cc3e48cbd005216d8/tumblr_n9m262J4Lq1qze3hdo1_r2_500.gif')");
                    break;
                case "clouds":
                    $bg.css('background-image', "url('http://68.media.tumblr.com/734ba6db5941cd39f175f61ccf33b980/tumblr_nmvrs6ubl71qze3hdo1_r1_500.gif')");
                    break;
                default:
                    $bg.css("background-image", "url('http://68.media.tumblr.com/16dee2fb087bcacd529b9c455f145ca8/tumblr_n9zgffvOOr1qze3hdo2_r1_500.gif')");
            }
        }

        //change unit
        function changeUnit() {
            if(temperatureUnit == "F"){
                temperatureUnit = "C";
                weatherJSON.main.temp = (weatherJSON.main.temp - 32) / 1.8;
            }
            else{
                temperatureUnit = "F";
                weatherJSON.main.temp = weatherJSON.main.temp * 1.8 + 32;
            }
            $h2.fadeOut(200, function(){
                $selected = $slider.find(".unit span.selected");
                $selected.siblings().addClass("selected");
                $selected.removeClass("selected");
                updateUI();
                $h2.fadeIn(200);
            });
        }

        load();
    })();
});