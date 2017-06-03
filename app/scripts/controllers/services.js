'use strict';

angular.module('pkuRunnerApp')
        .constant('baseURL','http://localhost:3000/')

        .factory('recordFactory', ['$resource', '$http', 'baseURL', function($resource, $http, baseURL) {
            
            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = '83fb38535ad67826603f699b9d389885';
            
            return $resource(baseURL + 'admin/record', null, {
                'update': {
                    method: 'PUT'
                }
            });
    
        }])

        .factory('userFactory', ['$resource', '$http', 'baseURL', function($resource, $http, baseURL) {
            
            // Set the token as header for your requests!
            $http.defaults.headers.common['x-access-token'] = '83fb38535ad67826603f699b9d389885';
            
            return $resource(baseURL + 'admin/user', null, {
                'update': {
                    method: 'PUT'
                }
            });
    
        }])

;
