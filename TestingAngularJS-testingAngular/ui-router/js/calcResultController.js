(function () {
   
    angular.module('practice')
    .controller('calcResultController', function ($scope, $stateParams, $state, $timeout) {
        
        console.log("State object",$state);
        console.log("All states",$state.get());
        console.log("calc state",$state.get('calc'));

        $scope.heading = 'Result';

        // if ($stateParams.result) {
        //     $scope.result = $stateParams.result;
        // }

        $scope.result = undefined;

        if ($state.params.result) {
            //Simulate a server  response
            $scope.isLoading = true;
            $timeout(function () {
                $scope.result = $state.params.result;
                $scope.isLoading = false;
            }, 3000)
        }

        $scope.back = function () {
            $state.go('calc');
        }

    })
    

})()