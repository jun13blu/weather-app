$(function(){
    var weather = function(){
        //cache dom
        var $weather = $(".weather-widget");
        var $h1 = $weather.find("h1");
        var $h2 = $weather.find("h2");
        var $h3 = $weather.find("h3");

        //bind events
        $("button").on("click", changeUnit);

        //update
        function update() {
            
        }

        //get current location
        function getLocation() {

        }

        //update ui
        function updateUI() {

        }

        //update background
        function updateBackground() {

        }

        //change unit
        function changeUnit() {

        }
    };
});