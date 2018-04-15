(function () {
    angular.module('practice')
    .config(['$stateProvider', '$urlRouterProvider',
         function ($stateProvider, $urlRouterProvider) { 
             $stateProvider
             .state('route-views', {
                 url: '/',
                 views: {
                    '': { // Parent view must be an empty string so that it loads in <ui-view> 
                        templateUrl: 'templates/rv-dashboard.html',
                        controller: 'rv-dashboardController'
                    },
                    'employee-head@route-views': { // Child view named with parent suffix
                        templateUrl: 'templates/employee-heading.html',
                        controller: ''
                    },
                    'employee-list@route-views': { // Child view named with parent suffix
                        templateUrl: 'templates/employee-list.html',
                        controller: ''
                    }
                }
             })
             .state('otherwise', {
                 url: '*path',
                 templateUrl: 'templates/404.html'
             });
             
             // Redirect to home page if url is incorrect
             // $urlRouterProvider.otherwise('/');
 
        }
    ])
     
 })();
 