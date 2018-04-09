(function () {
   
    angular.module('practice')
    .controller('passDataController', function ($scope, $stateParams) {
        $scope.heading = 'Register User';
        $scope.content = 'Student name: ' + $stateParams.stdName + ' Student email: ' + $stateParams.stdEmail;
    })

})()