'use strict';

/**
 * @ngdoc overview
 * @name pkuRunnerApp
 * @description
 * # pkuRunnerApp
 *
 * Main module of the application.
 */
angular.module('pkuRunnerApp', ['ui.router','ngResource','ngDialog', 'smart-table'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/main.html',
                        controller  : 'MainCtrl'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.about', {
                url:'about',
                views: {
                    'content@': {
                        templateUrl : 'views/about.html',
                        controller  : 'AboutCtrl'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contact', {
                url:'contact',
                views: {
                    'content@': {
                        templateUrl : 'views/contact.html',
                        controller  : 'ContactCtrl'                  
                    }
                }
            })
    
            // route for the admin page
            .state('app.admin', {
                url:'admin',
                views: {
                    'content@': {
                        templateUrl : 'views/admin.html',
                        controller  : 'AdminCtrl'                  
                    }
                }
            })
    
            // route for the admin page
            .state('app.student', {
                url:'student',
                views: {
                    'content@': {
                        templateUrl : 'views/student.html',
                        controller  : 'StudentCtrl'                  
                    }
                }
            })
        
            // route for the admin page
            .state('app.faculty', {
                url:'faculty',
                views: {
                    'content@': {
                        templateUrl : 'views/faculty.html',
                        controller  : 'FacultyCtrl'                  
                    }
                }
            })
        
        ;
        

    
        $urlRouterProvider.otherwise('/');
    })
;