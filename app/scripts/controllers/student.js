'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')

    .controller('StudentCtrl', ['$scope', '$localStorage', 'AuthFactory', '$state', 'statusFactory', 'recordFactory', 'ngDialog', function ($scope, $localStorage, AuthFactory, $state, statusFactory, recordFactory, ngDialog) {
        
        // testing only
        // $scope.current = 13456;
        // $scope.target = 42000;
        // $scope.percentage = (100 * $scope.current / $scope.target).toFixed(2);
        $scope.percentage = 0;
        $scope.itemsByPage = 10;

        $scope.loggedIn = AuthFactory.isAuthenticated();
        
        console.log("loggedIn: " + $scope.loggedIn);
        
        if(!$scope.loggedIn)
            $state.go('app', {}, {reload: true});
        
        $scope.userCredentials = $localStorage.getObject('userinfo','{}');
        console.log("userCredentials: ");
        console.log($scope.userCredentials);
        
        // change the id to acquire Gao Kun access
        //$scope.userCredentials.id = 1501212454;
        
        
        $scope.logout = function () {
            
            $scope.loginData = {};
            console.log("loginData: ");
            console.log($scope.loginData);
            
            AuthFactory.logout();
            $state.go('app', {}, {reload: true});
        };
        
        
        $scope.status = statusFactory.get({
            userId: $scope.userCredentials.id
        })
        .$promise.then(
            function (response) {
                $scope.status = response.data;
                $scope.percentage = (100 * $scope.status.current / $scope.status.target).toFixed(2);
                $scope.showStatus = true;
                console.log($scope.status);
            },
            function (response) {
                $scope.message = "Error: cannot get data from server!";
            }
        );
        
        $scope.records = recordFactory.get({
            userId: $scope.userCredentials.id
        })
        .$promise.then(
            function (response) {
                $scope.records = response.data;
                $scope.showRecords = true;
            },
            function (response) {
                $scope.message = "Error: cannot get data from server!";
            }
        );
        
        $scope.getDetail = function (record) {
            
            console.log("click");
            console.log(record);

            $scope.records = recordFactory.get({
                userId: $scope.userCredentials.id, recordId: record.recordId
            })
            .$promise.then(
                function (response) {
                    if(response.success) {
                        console.log(response.data);
                        var message = '<div class="ngdialog-message"><div><h3>Record Detail</h3></div>' +'<div><p>' + response.data.detail + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
                        ngDialog.openConfirm({ template: message, plain: 'true'}); 
                    }
                    else {
                        var message = '<div class="ngdialog-message"><div><h3>Unsuccessful to get detail</h3></div>' +'<div><p>' +  response.code + '</p><p>' + response.message + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
                        ngDialog.openConfirm({ template: message, plain: 'true'}); 
                    }
                },
                function (response) {
                    $scope.message = "Error: cannot get data from server!";
                }
            );
            
        };

    }]);
