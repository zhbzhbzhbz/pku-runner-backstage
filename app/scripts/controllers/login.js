'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')
    .controller('LoginCtrl', ['$scope', '$location', '$localStorage', 'AdminAuthFactory', '$state', '$rootScope', 'ngDialog', function ($scope, $location, $localStorage, AdminAuthFactory, $state, $rootScope, ngDialog) {

        $scope.loginData = $localStorage.getObject('admininfo','{}');
    
        $scope.doLogin = function() {
            if($scope.rememberMe)
                $localStorage.storeObject('admininfo',$scope.loginData);

            AdminAuthFactory.preLogin($scope.preLoginData);
            ngDialog.close();
            

    };
            
}]);
