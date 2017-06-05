'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')
    .controller('StudentCtrl', ['$scope', '$rootScope', '$localStorage', 'AuthFactory', 'recordFactory', '$state', function ($scope, $rootScope, $localStorage, AuthFactory, recordFactory, $state) {
        

        $scope.loggedIn = AuthFactory.isAuthenticated();
        
        console.log("loggedIn: " + $scope.loggedIn);
        
        if(!$scope.loggedIn)
            $state.go('app', {}, {reload: true});
        
        $scope.userCredentials = $localStorage.getObject('userinfo','{}');
        console.log("userCredentials: ");
        console.log($scope.userCredentials);
        
        $scope.logout = function () {
            
            $scope.loginData = {};
            console.log("loginData: ");
            console.log($scope.loginData);
            
            AuthFactory.logout();
            $state.go('app', {}, {reload: true});
        };
        
        recordFactory.get().$promise.then(
            function (response) {
                var records = response.data;
                
                $scope.records = records;
                $scope.recordsReady = true;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                console.log($scope.message);
            });

    }]);
