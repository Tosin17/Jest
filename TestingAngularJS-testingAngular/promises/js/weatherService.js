(function () {
   angular.module('practice')
   .factory('weatherService', ['$http', 
        function ($http) {

            var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=',
                weatherApiKey = '&appid=' + '188946ef3a1a518080641674e6ddeaed';

            return {

                getWeather: function (city, country) {
                    // Returns promise object -- (Without the return keyword, it won't work)
                    return $http.get(weatherApiUrl + city + ',' + country + weatherApiKey)
                    .then(function (response) {
                        return response;
                    }, function (reason) {
                        return reason;
                    })
                },

                getMultipleWeather: function () {
                    return;
                }

            }

       }
   ]) 
})()