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

        //$scope.loginData = $localStorage.getObject('admininfo','{}');
    
        $scope.doLogin = function() {
            //if($scope.rememberMe)
                //$localStorage.storeObject('userinfo',$scope.loginData);

            
            
            console.log("doLogin");
            console.log($scope.preLoginData);
            AdminAuthFactory.preLogin($scope.preLoginData);
            
            //var code = AdminAuthFactory.getLoginCode($scope.preLoginData);
            //console.log("code in controller: ");
            //console.log(code);
            //if(code) {
                //var encrypted = CryptoJS.SHA256($scope.preLoginData.username + code);
                //console.log(encrypted.toString(CryptoJS.enc.hex));
                //$scope.loginData.id = $scope.preLoginData.username;
                //$scope.loginData.password = encrypted.toString(CryptoJS.enc.hex);
                //AdminAuthFactory.login($scope.loginData);
            //}
            
            ngDialog.close();
            

    };
            
}]);
