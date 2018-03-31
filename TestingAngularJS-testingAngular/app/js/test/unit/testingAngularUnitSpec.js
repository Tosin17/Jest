describe('Testing AngularJS Test Suite', function(){

  beforeEach(module('testingAngularApp'));

  describe('Testing AngularJS Controller', function () {
    // Declare these variables at the top so all it() would  have access to them
    var scope, ctrl, httpBackend, timeout;

    // Before each iteration make the following services available
    beforeEach(inject(function($controller, $rootScope, $httpBackend, $timeout) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      ctrl = $controller('testingAngularCtrl', {$scope:scope});
      httpBackend = $httpBackend;
      timeout = $timeout;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should initialize the title in the scope', function() {
      expect(scope.title).toBeDefined();
      expect(scope.title).toBe("Testing AngularJS Applications");
    });

    it('should add 2 destinations', function () {
      expect(scope.destinations).toBeDefined();
      expect(scope.destinations.length).toBe(0);

      scope.newDestination =
        {
          city : "London",
          country : "England"
        };

      scope.addDestination();

      expect(scope.destinations.length).toBe(1);
      expect(scope.destinations[0].city).toBe("London");
      expect(scope.destinations[0].country).toBe("England");

      scope.newDestination.city = "Frankfurt";
      scope.newDestination.country = "Germany";
      scope.addDestination();

      expect(scope.destinations.length).toBe(2);
      expect(scope.destinations[1].city).toBe("Frankfurt");
      expect(scope.destinations[1].country).toBe("Germany");
    });

    it('should remove destinations from destinations array', function () {

      scope.destinations = [        
        {
          city : "London",
          country : "England"
        },
        {
          city : "Lagos",
          country : "Nigeria"
        }
      ]

      scope.removeDestination(0); 
      expect(scope.destinations.length).toBe(1);
      expect(scope.destinations[0].city).toBe('Lagos');
      expect(scope.destinations[0].country).toBe('Nigeria');
      
    })

    it('it should get weather update for the right destinations', function () {
      
      var weatherAPIurl = 'http://api.openweathermap.org/data/2.5/weather?q=',
          weatherAPIkey = '&appid=' + '188946ef3a1a518080641674e6ddeaed';

      scope.destination = {
        city : 'Vancouver', country : 'Canada'
      }

    })

    it('It should display error message and remove it in time', function () {

      rootScope.errorMsg = 'Invalid location';
      rootScope.$apply(); // Trigger the digest cycle
      timeout.flush(); // Call timeout -- so it triggers its function
      
      expect(rootScope.errorMsg).toBe(undefined);
    })
    
  });

  describe('Test warmestDestinations filter', (function () {
    
    // Note that  inject(function ($filter) should appear at the 
    it('should return specified warm destinations', inject(function ($filter) {

      // Mock up the kind of object that is passed through 
      var destinations = [

        {
          city : "London",
          country : "England",
          climate: {
            weather: "clouds",
            temp: 300  
          }
        },

        {
          city : "Lagos",
          country : "Nigeria",
          climate: {
            weather: "clear",
            temp: 400  
          }
        },

        {
          city : "Moscow",
          country : "Russia",
          climate: {
            weather: "snow",
            temp: 3  
          }
        },

        {
          city : "Shangai",
          country : "China",
          climate: {
            weather: "Haze",
            temp: 7  
          }
        }

      ];

      // Pass the name of the filter
      var warmest = $filter('warmestDestinations');
      var warmestDestinations = [];
      
      expect(destinations.length).toBe(4);
      expect(warmestDestinations.length).toBe(0);
      
      // Note that warmest(destinations, 10) returns a value
      warmestDestinations = warmest(destinations, 10);

      expect(warmestDestinations.length).toBe(2);
      expect(warmestDestinations[0].city).toBe("London");
      expect(warmestDestinations[1].city).toBe("Lagos");

    }))

  }))

  describe('Test destinations directive', function () {  
    var scope, httpBackend, template, isolateScope;

    beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
      // Scope here is the parent controller's scope
      rootScope = $rootScope;
      scope = $rootScope.$new();
      httpBackend = $httpBackend;

      weatherAPIurl = "xyz";
      weatherAPIkey = "xyz";

      // Mock up the destination object
      scope.destination = {
        city: "Lagos",
        country: "Nigeria"
      }

      var elem = angular.element(
          '<destinations-directive'+
            'destination="destination"'+
            'weather-api-key="{{weatherApiKey}}"'+
            'weather-api-url="{{weatherApiUrl}}"'+
            'on-remove="removeDestination($index)">'+
          '</destinations-directive>'
      );
      
      template = $compile(elem)(scope);
      scope.$digest(); // Manually trigger the digest loop

      // Returns the isolate scope for the directive
      // isolateScope = elem.isolateScope(); 

    }))

    // it('should update the weather for a specific destination', function () {
      
    //   // Mock up expected response using httpBackend and expected processed result
    //   httpBackend.expectGET(weatherAPIurl + scope.destination.city + ',' + scope.destination.country + weatherAPIkey)
    //   .respond({
    //       weather: [{main:'Clear'},{description:'Clear sky'}],
    //       main: {temp: 282.65}
    //   });
      
    //   isolateScope.getWeather(scope.destination); // Trigger ng-click getWeather(destination)
    //   httpBackend.flush(); // Call or fire the httpBackend service..

    //   expect(scope.destination.climate.weather).toBe('Clear');
    //   expect(scope.destination.climate.temp).toBe(10);
    // })

  })

  



});
