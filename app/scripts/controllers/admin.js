'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')

    .controller('AdminCtrl', ['$scope', 'adminRecordFactory', 'adminUserFactory', 'AdminAuthFactory', '$state', function ($scope, adminRecordFactory, adminUserFactory, AdminAuthFactory, $state) {
        
        $scope.adminLoggedIn = AdminAuthFactory.isAdminAuthenticated();
        
        console.log("adminLoggedIn: " + $scope.adminLoggedIn);
        
        if(!$scope.adminLoggedIn)
            $state.go('app', {}, {reload: true});
        
        $scope.logout = function () {
            AdminAuthFactory.logout();
            $state.go('app', {}, {reload: true});
        };
        
        $scope.itemsByPage = 10;
        $scope.displayUsers = true;
        $scope.displayRanking = false;
        $scope.displayRecords = false;

        $scope.displayRankNum = 20;
        $scope.displayUserRecords = false;
        $scope.displayUserId = 1400000000;

        $scope.allUsers = [];
        $scope.allDepartments = [];
        $scope.allCourses = [];
        $scope.allTeachers = [];
        $scope.userRecords = [];

        const allStr = '------全部------';
        $scope.message='Loading ...';

        $scope.tab = 1;
        
        $scope.select = function (setTab) {
            $scope.tab = setTab;
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        
        $scope.recordTableReady = false;
        
        adminRecordFactory.get().$promise.then(
            function (response) {
                var records = response.data;
                
                var recordsSortByUser = {};
                for (var i = 0; i < records.length; i++) {
                    var userIdString = String(records[i].userId);
                    if (!recordsSortByUser.hasOwnProperty(userIdString)) {
                        recordsSortByUser[userIdString] = [];
                    }
                    recordsSortByUser[userIdString].push(records[i]);
                }
                
                $scope.recordsSortByUser = recordsSortByUser;
                $scope.recordTableReady = true;
            },
            function (response) {
                $scope.message = 'Error: ' + response.status + ' ' + response.statusText;
                console.log($scope.message);
            });
        
        $scope.userTableReady = false;
        
        adminUserFactory.get().$promise.then(
            function (response) {
                var users = response.data;

                var allDepartments = new Set();
                allDepartments.add(allStr);
                var allCourses = new Set();
                allCourses.add(allStr);
                var allTeachers = new Set();
                allTeachers.add(allStr);

                for (var i = 0; i < users.length; i++) {
                    if (users[i].department !== undefined) {
                        allDepartments.add(users[i].department);
                    }
                    if (users[i].course !== undefined) {
                        allCourses.add(users[i].course);
                    }
                    if (users[i].teacher !== undefined) {
                        allTeachers.add(users[i].teacher);
                    }
                }

                $scope.users = users;
                $scope.allUsers = users;
                $scope.allDepartments = Array.from(allDepartments);
                $scope.allCourses = Array.from(allCourses);
                $scope.allTeachers = Array.from(allTeachers);
                $scope.userTableReady = true;
            },
            function (response) {
                $scope.messageB = 'Error: ' + response.status + ' ' + response.statusText;
                console.log($scope.messageB);
            }
        );

        $scope.setDisplayUsers = function(show) {
            $scope.displayUsers = show;
            if (show) {
                $scope.setDisplayRanking(false);
                $scope.setDisplayRecords(false);
            }
        };

        $scope.setDisplayRanking = function(show) {
            $scope.displayRanking = show;
            if (show) {
                $scope.setDisplayUsers(false);
                $scope.setDisplayRecords(false);
            }
        };

        $scope.setDisplayRecords = function(show) {
            $scope.displayRecords = show;
            if (show) {
                $scope.setDisplayUsers(false);
                $scope.setDisplayRanking(false);
            }
        };

        $scope.setDisplayRankNum = function(num) {
            $scope.displayRankNum = num;
        };

        $scope.restoreData = function() {
            $scope.users = $scope.allUsers;
        };

        $scope.selectDepartment = function(dept) {
            if (dept === allStr) {
                $scope.users = $scope.allUsers;
            } else {
                $scope.users = $scope.allUsers.filter(function(user) {
                    return user.department === dept;
                });
            }
        };

        $scope.selectCourse = function(course) {
            if (course === allStr) {
                $scope.users = $scope.allUsers;
            } else {
                $scope.users = $scope.allUsers.filter(function(user) {
                    return user.course === course;
                });
            }
        };

        $scope.selectTeacher = function(tchr) {
            if (tchr === allStr) {
                $scope.users = $scope.allUsers;
            } else {
                $scope.users = $scope.allUsers.filter(function(user) {
                    return user.teacher === tchr;
                });
            }
        };

        $scope.searchById = function(id) {
            if (id === null) {
                $scope.users = $scope.allUsers;
            } else {
                $scope.users = $scope.allUsers.filter(function(user) {
                    return String(user.id).includes(id);
                });
            }
        };

        $scope.searchByName = function(name) {
            if (name === null) {
                $scope.users = $scope.allUsers;
            } else {
                $scope.users = $scope.allUsers.filter(function(user) {
                    return String(user.name).includes(name);
                });
            }
        };

        $scope.viewUser = function(id) {
            $scope.displayUserId = id;
            $scope.userRecords = $scope.recordsSortByUser[String(id)];
        };

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
    })
    .directive('tooltip', function(){
        var options = {
            container: 'body',
            html: true,
            placement: 'auto right',
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        };
        return {
            restrict: 'A',
            link: function(scope){
                // scope.$('[data-toggle="tooltip"]').hover(function(){
                    // on mouseenter
                    scope.$('[data-toggle="tooltip"]').tooltip(options);
                // }// , function(){
                    // on mouseleave
                    // scope.$('[data-toggle="tooltip"]').tooltip({
                    //     container: 'body',
                    //     html: 'true',
                    //     placement: 'auto right'
                    // });
                // }
                // );
            }
        };
    });
