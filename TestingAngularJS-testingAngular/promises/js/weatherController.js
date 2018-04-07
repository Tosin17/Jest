(function () {
    // WeatherController
    angular.module('practice')
    .controller('weatherController', ['$scope','weatherService', 
    function ($scope, weatherService) {

        $scope.destinations = [

            {city: "Lagos", country: "Nigeria"},
            {city: "Moscow", country: "Russia"},
            {city: "Ottawa", country: "Canada"},
            {city: "Nairobi", country: "kenya"}

        ]

        $scope.getDestinationWeather = function () {                       
            if(!$scope.selectCities){
                return
            }
            weatherService.getWeather($scope.selectCities)
            .then(function (response) {
                $scope.weather = response.data.weather[0].main;
                $scope.temp = response.data.main.temp;
                console.log($scope.weather);
            }, function () {
                $scope.errqMsg = 'Error!';
            })
        }
        
        
    }])

})()