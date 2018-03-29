describe('Testing AngularJS Test Suite', function(){

  beforeEach(module('testingAngularApp'));

  describe('Testing AngularJS Controller', function () {
    var scope, ctrl, httpBackend, timeout;

    beforeEach(inject(function($controller, $rootScope, $httpBackend, $timeout) {
      scope = $rootScope.$new();
      ctrl = $controller('testingAngularCtrl', {$scope:scope});
      httpBackend = $httpBackend;
      timeout = $timeout;
    }));

    afterEach(function() {

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

      // Mock up expected response using httpBackend and expected processed result
      httpBackend.expectGET(weatherAPIurl + scope.destination.city + ',' + scope.destination.country + weatherAPIkey)
      .respond({
          weather: [{main:'Clear'},{description:'Clear sky'}],
          main: {temp: 282.65}
      });
      
      scope.getWeather(scope.destination); // Trigger ng-click getWeather(destination)
      httpBackend.flush(); // Call or fire the httpBackend service..

      expect(scope.destination.climate.weather).toBe('Clear');
      expect(scope.destination.climate.temp).toBe(10);

    })

    it('It should display error message and remove it in time', function () {

      scope.errorMsg = 'Invalid location';
      scope.$apply(); // Trigger the digest cycle
      timeout.flush(); // Call timeout -- so it triggers its function
      
      expect(scope.errorMsg).toBe(undefined);
    })
    
  });

});
