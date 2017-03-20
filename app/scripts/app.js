'use strict';

/**
 * @ngdoc overview
 * @name pkuRunnerApp
 * @description
 * # pkuRunnerApp
 *
 * Main module of the application.
 */
angular.module('pkuRunnerApp', ['ui.router','ngResource','ngDialog'])
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
            });
        

    
        $urlRouterProvider.otherwise('/');
    })
;