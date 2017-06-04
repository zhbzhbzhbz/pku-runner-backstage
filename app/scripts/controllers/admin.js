'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')
    .controller('AdminCtrl', ['$scope', 'recordFactory', 'userFactory', function ($scope, recordFactory, userFactory) {
        
        $scope.itemsByPage = 10;
        $scope.tab = 1;
        
        $scope.select = function (setTab) {
            $scope.tab = setTab;
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        
        $scope.showTable = false;
        $scope.message='Loading ...';
        
        recordFactory.get().$promise.then(
            function (response) {
                $scope.records = response.data;
                $scope.showTable = true;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                console.log($scope.message);
            });
        
        $scope.showTableB = false;
        $scope.messageB='Loading ...';
        
        userFactory.get().$promise.then(
            function (response) {
                $scope.users = response.data;
                $scope.showTableB = true;
            },
            function (response) {
                $scope.messageB = 'Error: ' + response.status + ' ' + response.statusText;
                console.log($scope.messageB);
            });

    }])
    .directive('stRatio', function(){   // adjust width of columns
        return {
            link:function(scope, element, attr){
                var ratio=+(attr.stRatio);

                element.css('width', ratio+'%');
            }
        };
    })
    .directive('pageSelect', function() {
      return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope) {
          scope.$watch('currentPage', function(c) {
            scope.inputPage = c;
          });
        }
      };
    });
