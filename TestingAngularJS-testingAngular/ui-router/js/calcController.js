(function () {
   
    angular.module('practice')
    .controller('calcController', function ($scope, $state) {
        
        $scope.heading = 'Calculate';

        console.log($state);

        $scope.add = function () {
            if ($scope.a && $scope.b) {
                $scope.result = (parseInt($scope.a) + parseInt($scope.b)) * $state.current.data.multiplier;           
                $state.go('calcResult', {
                    result: $scope.result 
                });
            }
        }
    })

})()