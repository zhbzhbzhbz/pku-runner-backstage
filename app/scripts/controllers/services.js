'use strict';

angular.module('pkuRunnerApp')

        .constant("baseURL", "http://pkuzone.jios.org:10201/")

        .factory('statusFactory', ['$resource', '$http', 'baseURL', function($resource, $http, baseURL) {
            
            // Set the token so you can login as Gao Kun
            //$http.defaults.headers.common['Authorization'] = '0bdc1af847e3357ec22bcaafbf508a32';
            
            return $resource(baseURL + 'record/status/:userId', null, {
                'update': {
                    method: 'PUT'
                }
            });
    
        }])

        .factory('recordFactory', ['$resource', '$http', 'baseURL', function($resource, $http, baseURL) {
            
            // Set the token so you can login as Gao Kun
            //$http.defaults.headers.common['Authorization'] = '0bdc1af847e3357ec22bcaafbf508a32';
            
            return $resource(baseURL + 'record/:userId/:recordId', null, {
                'update': {
                    method: 'PUT'
                }
            });
    
        }])

        .factory('adminRecordFactory', ['$resource', '$http', 'baseURL', function($resource, $http, baseURL) {
            
            return $resource(baseURL + 'admin/record', null, {
                'update': {
                    method: 'PUT'
                }
            });
    
        }])

        .factory('adminUserFactory', ['$resource', '$http', 'baseURL', function($resource, $http, baseURL) {
            
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
            var identityType = "";
    

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
                                storeUserCredentials({id: response.data.id, token: response.data.access_token, name: response.data.name, department: response.data.department, isPESpecialty: response.data.isPESpecialty, identityType: response.data.identityType});
                                $rootScope.$broadcast('login:Successful');
                                if(response.data.identityType = "学生")
                                    window.location.href="http://pkuzone.jios.org:10201/dist/#!/student";
                                else if(response.data.identityType = "职工")
                                    window.location.href="http://pkuzone.jios.org:10201/dist/#!/faculty";
                                else 
                                    console.log("who you are?");
                            }
                            else {
                                var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.code + '</p><p>' + response.message + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
                                ngDialog.openConfirm({ template: message, plain: 'true'});
<<<<<<< HEAD
                                window.location.href="http://pkuzone.jios.org:10201/dist/#!/";
=======
                                window.location.href="http://pkuzone.jios.org:10201/dist/";
>>>>>>> 9fa1f9525ca9275ecb3f17dcd68aa02c855281a6
                                
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


        .factory('AdminAuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
            var authFac = {};
            var TOKEN_KEY = 'auth';
            var isAdminAuthenticated = false;
    

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
                isAdminAuthenticated = true;
            }
 
            function destroyUserCredentials() {
                isAdminAuthenticated = false;
                $localStorage.remove(TOKEN_KEY);
                console.log("destroyUserCredentials");
                console.log("isAdminAuthenticated: " + isAdminAuthenticated);
            }
     
            authFac.preLogin = function(preLoginData) {
                
                console.log(preLoginData);
                $resource(baseURL + "admin/login")
                    .save({id:preLoginData.username},
                          function(response) {
                            console.log(response);
                            if(response.data) {
                                
                                var code = response.data;
                                console.log(code);
                                var encrypted = CryptoJS.SHA256(preLoginData.password + code);
                                console.log(encrypted.toString(CryptoJS.enc.hex));
                                var loginData = {};
                                loginData.id = preLoginData.username;
                                loginData.password = encrypted.toString(CryptoJS.enc.hex);
                                login(loginData);
                            }
                            else {
                                var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.code + '</p><p>' + response.message + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
                                ngDialog.openConfirm({ template: message, plain: 'true'});
                                
                                
                            }
                            
                          },
                          function(response){
                            console.log(response);
            
                            var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.data.err.message + '</p><p>' + response.data.err.name + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
            
                            ngDialog.openConfirm({ template: message, plain: 'true'});
                          }
        
                         );
                

            };
            
            function login(loginData) {
                console.log(loginData);
                $resource(baseURL + "admin/login")
                    .save(loginData,
                          function(response) {
                            console.log(response);
                            if(response.success) {
                                storeUserCredentials({id: loginData.id, password: loginData.password});
                                //$rootScope.$broadcast('login:Successful');
                                console.log("ok");
                                window.location.href="http://pkuzone.jios.org:10201/dist/#!/admin";
                            }
                            else {
                                var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.code + '</p><p>' + response.message + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
                                ngDialog.openConfirm({ template: message, plain: 'true'});
                                
                            }
                            
                          },
                          function(response){
                            console.log(response);
                            isAdminAuthenticated = false;
            
                            var message = '<div class="ngdialog-message"><div><h3>Login Unsuccessful</h3></div>' +'<div><p>' +  response.data.err.message + '</p><p>' + response.data.err.name + '</p></div>' + '<div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div>';
            
                            ngDialog.openConfirm({ template: message, plain: 'true'});
                          }
        
                         );

            };
    
            authFac.logout = function() {
                $resource(baseURL + "admin/logout").get(function(response){
                });
                destroyUserCredentials();
                window.location.href="http://pkuzone.jios.org:10201/dist/#!/";
            };
    
    
            authFac.isAdminAuthenticated = function() {
                return isAdminAuthenticated
            };
    
            //authFac.getUsername = function() {
                //return username;  
            //};

            //loadUserCredentials();
    
            return authFac;
    
        }])

;
