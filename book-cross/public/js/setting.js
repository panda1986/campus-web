/**
 * Created by lizhiqiang on 2016/5/8.
 */

var app_setting = angular.module("app_setting", ['ngAnimate', 'ngRoute', 'ui.bootstrap', 'ui.uploader']);

var links = {
    book: {}
};

//在程序配置阶段，设置路由提供器
app_setting.config(function ($routeProvider) {
    $routeProvider
        .when('/book', {templateUrl: '/public/templates/temp_book.html'})
        .when('/group', {templateUrl: '/public/templates/temp_group.html'})
        .when('/process', {templateUrl: '/public/templates/temp_process.html'})
        .when('/cross', {templateUrl: '/public/templates/temp_cross.html'})
        .when('/error', {templateUrl: '/public/templates/temp_error.html'})
        .otherwise({redirectTo: '/'});
});

app_setting.controller('ctrl_setting', function ($scope, $http, $log, uiUploader) {

    $scope.newbook = {
        name: "",
        storeTotal: 0,
        author: "",
        press: "",
        intro: ""
    };
    $scope.bookList = [];

    $scope.findBooks = function () {
        $http.get('/setting/book').then(function (response) {
            $scope.bookList = response.data.result;
        }, function (error) {
            $log.error(error);
        });
    };

    $scope.saveBook = function () {
        console.log($scope.newbook);
        $http.post("/setting/book/1", $scope.newbook)
            .success(function (data) {
                console.log(data);
            });
    };

    $scope.removeOneFile = function (file) {
        $log.info('deleting=' + file);
        uiUploader.removeFile(file);
    };
    $scope.removeAllFile = function () {
        uiUploader.removeAll();
    };

    $scope.uploadBook = function () {
        $log.info('uploading...');
        uiUploader.addFiles(document.getElementById('file1').files);
        uiUploader.startUpload({
            url: '/setting/book/2',
            concurrency: 2,
            onProgress: function (file) {
                $log.info(file.name + '=' + file.humanSize);
            },
            onCompleted: function (file, response) {
                $log.info(file.name + '--response--' + response);
            }
        });
    };
});

