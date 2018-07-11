'use strict';

/**
 * @ngdoc function
 * @name pkuRunnerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pkuRunnerApp
 */
angular.module('pkuRunnerApp')

    .controller('MainCtrl', ['$scope', '$location', '$localStorage', 'AuthFactory', '$state', 'ngDialog', 'AdminAuthFactory', function ($scope, $location, $localStorage, AuthFactory, $state, ngDialog, AdminAuthFactory) {

        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.adminLoggedIn = AdminAuthFactory.isAdminAuthenticated();

        console.log("loggedIn: " + $scope.loggedIn);
        console.log("adminLoggedIn: " + $scope.adminLoggedIn);


        if($scope.loggedIn) {
            $state.go('app.student', {}, {reload: true});
        }


        if($scope.adminLoggedIn) {
            $state.go('app.admin', {}, {reload: true});
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
                document.write("<input type=hidden name='redirectUrl' value='https://pkunewyouth.pku.edu.cn/public/dist'>");
                document.write("</form>");
                document.formx1.submit();
            }

        };

        $scope.openLogin = function () {
            ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginCtrl" });
        };



}]);
