var testingAngluarApp = angular.module('testingAngularApp', []);

testingAngluarApp.controller('testingAngularCtrl', function ($scope, $http, $timeout, $q) {

  $scope.title = "Testing AngularJS Applications";
  $scope.color = 'red';


  $scope.destinations = [];
  $scope.newDestination = {
    city: undefined,
    country: undefined
  };

  $scope.addDestination = function () {
    $scope.destinations.push(
    {
      city: $scope.newDestination.city,
      country: $scope.newDestination.country
    });
  };

  $scope.removeDestination = function (index) {
    if($scope.destinations.length === 0)
    return;

    $scope.destinations.splice(index, 1);
  }

  // Weather API
  var weatherAPIurl = 'http://api.openweathermap.org/data/2.5/weather?q=',
      weatherAPIkey = '&appid=' + '188946ef3a1a518080641674e6ddeaed';

  $scope.errorMsg = undefined;

  $scope.getWeather = function (destination) {
    $http.get(weatherAPIurl + destination.city + ',' + destination.country + weatherAPIkey)
    .then(function success(response) {
      if(response){
        // Assign a new object to the destination object
        // Note that it is bounded to the scope object
        destination.climate = {}; 
        destination.climate.weather = response.data.weather[0].main;
        destination.climate.temp = Math.round(response.data.main.temp - 273);
        // console.log(response);
      } 
    }, function reject(reason) {
      $scope.errorMsg = 'Invalid location';
      console.log(reason);
    })
  }

  $scope.$watch('errorMsg', function () {
    if($scope.errorMsg){
      $timeout(function () {
        $scope.errorMsg = undefined;
      }, 3000)
    }
  })

});



testingAngluarApp.directive('card', function () {
    return {
        scope: {
           color: '@' 
        },
        transclude: true,
        template:'<div class="card {{ color }}" ng-transclude> </div>'
    }
})
