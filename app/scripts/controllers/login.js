'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')
    .controller('LoginCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', '$state', '$rootScope', function ($scope, $location, $localStorage, AuthFactory, $state, $rootScope) {

        $scope.loginData = $localStorage.getObject('userinfo','{}');
    
        $scope.doLogin = function() {
            //if($scope.rememberMe)
                //$localStorage.storeObject('userinfo',$scope.loginData);

            //AuthFactory.login($scope.loginData);

            //ngDialog.close();
            console.log("doLogin");

    };
            
}]);
