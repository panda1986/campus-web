/**
 * Created by lizhiqiang on 2016/5/6.
 */
var app_index = angular.module("app_index", ['ngAnimate', 'ui.bootstrap']);

app_index.controller('ctrl_index', function ($scope, $uibModal, $log) {
    $scope.openModal = function (r) {

        $scope.role = r;
            var modalInstance = $uibModal.open({
                templateUrl: 'modalSign.html',
                controller: 'modalInstanceCtrl',
                resolve: {
                    role: function () {
                        return $scope.role;
                    }
                }
            });
        modalInstance.result.then(function (result) {
            $log.info('触发了close方法' + result);
        }, function (reason) {
            $log.info('触发了dismiss方法' + reason);
        });
    };
});


app_index.controller('modalInstanceCtrl', function ($scope, $http, $uibModalInstance, role) {
    $scope.userInfo = {
        "username": "",
        "password": "",
        "role": -1
    };

    $scope.signIn = function () {
        $scope.userInfo.role = role;
        $http.post("/sign/"+role, $scope.userInfo)
            .success(function (result) {

                if (result.code == 0) {

                    window.location.href = $scope.userInfo.role == 0 ? "/setting" : "/setting";
                } else if (result.code==400){
                    $log.error(result.message);

                }else {


                }
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
