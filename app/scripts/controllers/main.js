'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')
    .controller('MainCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', '$state', '$rootScope', function ($scope, $location, $localStorage, AuthFactory, $state, $rootScope) {

        $scope.loggedIn = AuthFactory.isAuthenticated();
        
        console.log("loggedIn: " + $scope.loggedIn);
        
        if($scope.loggedIn) {
            $state.go('app.student', {}, {reload: true});
        }

            
        
        
        $scope.userCredentials = $localStorage.getObject('userinfo','{}');
        console.log("userCredentials: ");
        console.log($scope.userCredentials);
                             
        var url = $location.absUrl();
        var token = "";
        
        
        if(url.indexOf("token=") < 0) {
            console.log("normal state!");
        }
        else {

            token = url.substring(url.indexOf("token=")+6,url.indexOf("#!/")+0);
            console.log(token);
            $scope.loginData = {};
            console.log("loginData: ");
            console.log($scope.loginData);
            $scope.loginData.access_token = token;
            AuthFactory.login($scope.loginData);                

            
            //if($scope.rememberMe)
                //$localStorage.storeObject('userinfo',$scope.loginData);
        }
            
  
        
        $scope.gotoIAAA = function () {
            
            $scope.userCredentials = $localStorage.getObject('userinfo','{}');
            console.log("userCredentials: ");
            console.log($scope.userCredentials);
            if($scope.userCredentials.id)
                $state.go('app.about', {}, {reload: true});
            else {
                console.log("go to IAAA!");
                document.write("<form action='https://iaaa.pku.edu.cn/iaaa/oauth.jsp' method=post name='formx1' style='display:none'>");
                document.write("<input type=hidden name='appID' value='PKU_Runner'>");
                document.write("<input type=hidden name='appName' value='PKU Runner APP'>");
                document.write("<input type=hidden name='redirectUrl' value='http://pkuzone.jios.org:10201/dist/'>");
                document.write("</form>");
                document.formx1.submit();
            }
            
        };
            
        
        
    
}]);
