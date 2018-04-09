(function () {
   
    angular.module('practice')
    .controller('calcResultController', function ($scope, $stateParams, $state) {
        
        console.log("State object",$state);
        console.log("All states",$state.get());
        console.log("calc state",$state.get('calc'));

        $scope.heading = 'Result';

        // if ($stateParams.result) {
        //     $scope.result = $stateParams.result;
        // }

        if ($state.params.result) {
            $scope.result = $state.params.result;
        }

        $scope.back = function () {
            $state.go('calc');
        }

    })

})()