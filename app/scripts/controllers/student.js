'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')
    .controller('StudentCtrl', ['$scope', '$rootScope', '$localStorage', 'AuthFactory', '$state', 'statusFactory', function ($scope, $rootScope, $localStorage, AuthFactory, $state, statusFactory) {
        

        $scope.loggedIn = AuthFactory.isAuthenticated();
        
        console.log("loggedIn: " + $scope.loggedIn);
        
        if(!$scope.loggedIn)
            $state.go('app', {}, {reload: true});
        
        $scope.userCredentials = $localStorage.getObject('userinfo','{}');
        console.log("userCredentials: ");
        console.log($scope.userCredentials);
        
        // change the id to acquire Gao Kun access
        $scope.userCredentials.id = 1501212454;
        
        
        $scope.logout = function () {
            
            $scope.loginData = {};
            console.log("loginData: ");
            console.log($scope.loginData);
            
            AuthFactory.logout();
            $state.go('app', {}, {reload: true});
        };
        
        
        $scope.status = statusFactory.get({
            id: $scope.userCredentials.id
        })
        .$promise.then(
            function (response) {
                $scope.status = response.data;
                $scope.showStatus = true;
                console.log($scope.status);
            },
            function (response) {
                $scope.message = "Error: cannot get data from server!";
            }
        );

    }]);
