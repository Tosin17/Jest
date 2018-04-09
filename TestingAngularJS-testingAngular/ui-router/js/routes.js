(function () {
   angular.module('practice')
   .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) { 
            $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                controller: 'dashboardController'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'registerController'
            })
            .state('passData', {
                url: '/passData/:stdName/:stdEmail',
                templateUrl: 'templates/passData.html',
                controller: 'passDataController'
            })
            .state('passDataI', {
                url: '/passDataI?stdName&stdEmail',
                templateUrl: 'templates/passData.html',
                controller: 'passDataController'
            })
            .state('passDataSquash', {
                url: '/passDataSquash/:stdName/:stdEmail',
                templateUrl: 'templates/passData.html',
                controller: 'passDataController',
                params: {
                    stdName: { value: 'Michael Jared', squash: '-'},
                    stdEmail: { value: 'mff@erw.cc', squash: '~'}
                }
            })
            .state('calc', {
                url: '/calc',
                templateUrl: 'templates/calc.html',
                controller: 'calcController',
                data: {
                    multiplier: 10
                }
            })
            .state('calcResult', {
                url: '/calcResult/:result',
                templateUrl: 'templates/calcResult.html',
                controller: 'calcResultController'
            })
            .state('otherwise', {
                url: '*path',
                templateUrl: 'templates/404.html',
            });
            
            // Redirect to home page if url is incorrect
            //$urlRouterProvider.otherwise('/');

       }
   ]) 
})()