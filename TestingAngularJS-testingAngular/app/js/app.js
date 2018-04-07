var testingAngluarApp = angular.module('testingAngularApp', []);

  testingAngluarApp.controller('testingAngularCtrl', function ($rootScope,$scope, $http, $timeout, $q) {

  $scope.title = "Testing AngularJS Applications";
  $scope.color = 'red';

  // Weather API
  $scope.weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=',
  $scope.weatherApiKey = '&appid=' + '188946ef3a1a518080641674e6ddeaed';

  $scope.removeDestination = function (index) {
    if($scope.destinations.length === 0)
    return;

    $scope.destinations.splice(index, 1);
  }
    
  $rootScope.errorMsg = undefined;

  $scope.destinations = [];
  $scope.newDestination = {
    city: undefined,
    country: undefined
  };

  $scope.addDestination = function () {
    $scope.destinations.push({
      city: $scope.newDestination.city,
      country: $scope.newDestination.country
    });
  };
 
  $rootScope.$watch('errorMsg', function () {
    if($rootScope.errorMsg){
      $timeout(function () {
        $rootScope.errorMsg = undefined;
      }, 3000)
    }
  })

  /**
   * DIRECTIVES TESTING BEGINS HERE
   */

  $scope.header = 'This is a Jumbotron';
  $scope.message = 'With a nice maessage...';

  // PROMISES
  // Note the $timeout service angular returns a promise
  function add(a, b) {
    return $timeout(function () {
      return a + b;
    }, 5)
  }

  // Returns a promise object
  console.log(add(5,3));

  // '.then' a method that all promises have
  add(5,3).then(function (result) {
    console.log(result);
  })

  // Promise chaining is using the result of the 
  // 1st promise to do more things
  add(3, 8).then(function (result) {
    console.log("------- Chaining Promises ---------")
    console.log("Chain 0 -- ", result);
    return result;
  }).then(function (result) {
    console.log("Chain 1 --", add(result, 8))
    return add(result, 8);
  }).then(function (result) {
    console.log("Chain 2 --", add(result, 6))
    return add(result, 6);
  }).then(function (result) {
    console.log("Chain 3 --", Array(result).join('*'));
    return Array(result).join('*');
  })

 
}); // End of controller

// Filters return a function
testingAngluarApp.filter('warmestDestinations', function () {

  // Filters return functions and accept an input
  // Receives the destinations array -- and the ng-repeat iterates through  
  // warmDests[] tracking the displayed index to output the last item on the array  
  return function (destinations, minimum) {
    var warmDests = [];
    
    angular.forEach(destinations, function (dest) {

      // If the climate property exists -- climate property only exists when updaeWeather() is called
      if(dest.climate && dest.climate.temp && dest.climate.temp >= minimum){
        warmDests.push(dest);  
      }
    })
    return warmDests;
  }
})

testingAngluarApp.filter('convertToCelcius', function () {
  
  // Filters return functions and accept an input
  return function (destinations) {
    var celcius = [];

    angular.forEach(destinations, function (dest) {
      if (dest.climate && dest.climate.temp) {
        dest.climate.temp = Math.round(dest.climate.temp - 273);
        celcius.push(dest);
      }
    })
   
    return celcius;
  }

})

testingAngluarApp.directive('destinationsDirective', function () {

      var controller = function ($http, $rootScope, $scope) {
        console.log($scope.weatherApiUrl)
        $scope.getWeather = function (destination) {
          $http.get($scope.weatherApiUrl + destination.city + ',' + destination.country + $scope.weatherApiKey)``
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
            $rootScope.errorMsg = 'Invalid location';
            console.log(reason);
          })
        }
      
      }
  
      // Directives return an object called the DDO --- Directive Definition Object
      return {
          scope: {
            destination: '=',
            weatherApiKey: '@',
            weatherApiUrl: '@',
            onRemove: '&'
          },
          template: '<span>{{destination.city}}, {{destination.country}}'+ 
                      '<span ng-if="destination.climate.weather"> --- {{destination.climate.weather }}, {{destination.climate.temp}}</span>'+
                      '<button ng-click="onRemove()">Remove</button>'+
                      '<button ng-click="getWeather(destination)">Update Weather</button>'+          
                    '</span>',
          controller: controller
      }

})

testingAngluarApp.directive('card', function () {
    return {
        scope: {
           color: '@' 
        },
        transclude: true,
        template:'<div class="card {{ color }}" ng-transclude> </div>'
    }
})

testingAngluarApp.directive('jumbotron', function () {
  return {
    templateUrl: 'template/jumbotron.html'      
  }
})

