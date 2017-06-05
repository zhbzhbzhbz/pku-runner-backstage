'use strict';

angular.module('pkuRunnerApp')
        .constant('baseURL','http://localhost:3000')

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

        .factory('$localStorage', ['$window', function ($window) {
            return {
                store: function (key, value) {
                    $window.localStorage[key] = value;
                },
                get: function (key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                remove: function (key) {
                    $window.localStorage.removeItem(key);
                },
                storeObject: function (key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function (key, defaultValue) {
                    return JSON.parse($window.localStorage[key] || defaultValue);
                }
            };
        }])

        .factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
            var authFac = {};
            var TOKEN_KEY = 'userinfo';
            var isAuthenticated = false;
            var id = 0;
            var authToken = undefined;
            var name = "";
            var department = "";
            var isPESpecialty = false;
    

            function loadUserCredentials() {
                console.log("loadUserCredentials");
                var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
                if (credentials.id) {
                    useCredentials(credentials);
                }
            }
 
            function storeUserCredentials(credentials) {
                console.log("storeUserCredentials");
                $localStorage.storeObject(TOKEN_KEY, credentials);
                useCredentials(credentials);
            }
 
            function useCredentials(credentials) {
                console.log("useCredentials");
                console.log(credentials);
                isAuthenticated = true;
                id = credentials.id;
                authToken = credentials.token;
 
                // Set the token as header for your requests!
                $http.defaults.headers.common['Authorization'] = authToken;
            }
 
            function destroyUserCredentials() {
                authToken = undefined;
                id = 0;
                isAuthenticated = false;
                $http.defaults.headers.common['Authorization'] = authToken;
                $localStorage.remove(TOKEN_KEY);
                console.log("destroyUserCredentials");
                console.log("isAuthenticated: " + isAuthenticated);
            }
     
            authFac.login = function(loginData) {
                console.log(loginData);
                $resource(baseURL + "user")
                    .save(loginData,
                          function(response) {
                            console.log(response);
                            if(response.data) {
                                storeUserCredentials({id: response.data.id, token: response.data.access_token, name: response.data.name, department: response.data.department, isPESpecialty: response.data.isPESpecialty});
                                $rootScope.$broadcast('login:Successful');
                                console.log("ok");
                                window.location.href="http://pkuzone.jios.org:10201/dist/#!/student";
                            }
                            else {
                                var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.code + '</p><p>' + response.message + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
                                ngDialog.openConfirm({ template: message, plain: 'true'});
                                window.location.href="http://pkuzone.jios.org:10201/dist/";
                                
                            }
                            
                          },
                          function(response){
                            console.log(response);
                            isAuthenticated = false;
            
                            var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.data.err.message + '</p><p>' + response.data.err.name + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
            
                            ngDialog.openConfirm({ template: message, plain: 'true'});
                          }
        
                         );

            };
    
            authFac.logout = function() {
                //$resource(baseURL + "users/logout").get(function(response){
                //});
                destroyUserCredentials();
            };
    
    
            authFac.isAuthenticated = function() {
                return isAuthenticated;
            };
    
            //authFac.getUsername = function() {
                //return username;  
            //};

            loadUserCredentials();
    
            return authFac;
    
        }])

;
