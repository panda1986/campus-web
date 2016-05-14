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
        .when('/cross', {templateUrl: '/public/templates/temp_cross.html', controller: "Ccross"})
        .when('/error', {templateUrl: '/public/templates/temp_error.html'})
        .when('/cross/:termId/:classId/:beginTime/:overTime', {templateUrl: '/public/templates/temp_cross_detail.html', controller: "CcrossDetail"})
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

app_setting.controller("Ccross", ['$scope', 'BookApi', function($scope, BookApi) {
    $scope.terms = null;
    $scope.groups = null;
    $scope.grades = null;
    $scope.search = {
        term: null,
        termId: null,
        group: null,
        groupId: null,
        grade: null,
        gradeId: null
    };
    $scope.months_roams = null;

    var query_term_id = function() {
        for (var i = 0; i < $scope.terms.length; i++) {
            if ($scope.terms[i].termName == $scope.search.term) {
                return $scope.terms[i].termId;
            }
        }
    };
    var query_terms = function() {
        $scope.terms = [
            {"termId":"1", "termName":"16年第一学期"},
            {"termId":"2", "termName":"16年第二学期"}
        ];
        /*BookApi.query_terms(function(res) {

         });*/
    };

    var query_group_id = function() {
        for (var i = 0; i < $scope.groups.length; i++) {
            if ($scope.groups[i].groupName == $scope.search.group) {
                return $scope.groups[i].groupId;
            }
        }
    };
    var query_groups = function() {
        $scope.groups = [
            {"groupId":"1", "groupName":"第一套"},
            {"groupId":"2", "groupName":"第二套"}
        ];
        /*BookApi.query_groups(function(res) {

        });*/
    };

    var query_grade_id = function() {
        for (var i = 0; i < $scope.grades.length; i++) {
            if ($scope.grades[i].gradeName == $scope.search.grade) {
                return $scope.grades[i].gradeId;
            }
        }
    };
    var query_grades = function() {
        $scope.grades = [
            {"gradeId":"1", "gradeName":"1年级"},
            {"gradeId":"2", "gradeName":"2年级"}
        ];
        /*BookApi.query_grades(function(res) {

         });*/
    };

    $scope.on_select_changed = function() {
        $scope.termId = query_term_id();
        $scope.groupId = query_group_id();
        $scope.gradeIid = query_grade_id();
        query_roam($scope.termId, $scope.gradeIid, $scope.groupId);
    };

    var query_roam = function(termId, gradeId, groupId) {
        /*var roams = [
            {
                "classId": "1",
                "className": "一班",
                "beginTime": "2016-05-9 03:00",
                "overTime": "2016-05-16 02:59",
                "state": "1"
            },
            {
                "classId": "2",
                "className": "二班",
                "beginTime": "2016-05-16 03:00",
                "overTime": "2016-05-23 02:59",
                "state": "2"
            },
            {
                "classId": "3",
                "className": "三班",
                "beginTime": "2016-05-23 03:00",
                "overTime": "2016-05-30 02:59",
                "state": "3"
            }
        ];*/
        // need convert
        if (groupId == "1") {
            $scope.months_roams = {
                "5月份": [
                    {"classId": "3", "className": "三班", "beginTime": "2016-05-23 03:00", "overTime": "2016-05-30 02:59", "state": "3"},
                    {"classId": "2", "className": "二班", "beginTime": "2016-05-16 03:00", "overTime": "2016-05-23 02:59", "state": "2"},
                    {"classId": "1", "className": "一班", "beginTime": "2016-05-9 03:00", "overTime": "2016-05-16 02:59", "state": "1"}
                ],
                "4月份": [
                    {"classId": "3", "className": "三班", "beginTime": "2016-04-13 03:00", "overTime": "2016-04-13 02:59", "state": "0"},
                    {"classId": "2", "className": "二班", "beginTime": "2016-04-6 03:00", "overTime": "2016-04-6 02:59", "state": "2"},
                    {"classId": "1", "className": "一班", "beginTime": "2016-04-1 03:00", "overTime": "2016-04-1 02:59", "state": "3"}
                ]
            };
        } else {
            $scope.months_roams = {
                "3月份": [
                    {"classId": "3", "className": "三班", "beginTime": "2016-03-23 03:00", "overTime": "2016-03-30 02:59", "state": "4"},
                    {"classId": "2", "className": "二班", "beginTime": "2016-03-16 03:00", "overTime": "2016-03-23 02:59", "state": "0"},
                    {"classId": "1", "className": "一班", "beginTime": "2016-03-9 03:00", "overTime": "2016-03-16 02:59", "state": "1"}
                ],
                "2月份": [
                    {"classId": "3", "className": "三班", "beginTime": "2016-02-13 03:00", "overTime": "2016-02-13 02:59", "state": "2"},
                    {"classId": "2", "className": "二班", "beginTime": "2016-02-6 03:00", "overTime": "2016-02-6 02:59", "state": "4"},
                    {"classId": "1", "className": "一班", "beginTime": "2016-02-1 03:00", "overTime": "2016-02-1 02:59", "state": "0"}
                ]
            };
        }
    };

    query_terms();
    query_groups();
    query_grades();
    $scope.search.term = $scope.terms[0].termName;
    $scope.search.termId = $scope.terms[0].termId;
    $scope.search.group = $scope.groups[0].groupName;
    $scope.search.groupId =  $scope.groups[0].groupId;
    $scope.search.grade = $scope.grades[0].gradeName;
    $scope.search.gradeId = $scope.grades[0].gradeId;
    $scope.on_select_changed();
}]);

app_setting.controller("CcrossDetail", ['$scope', '$routeParams', '$uibModal', '$log', 'BookApi', function($scope, $routeParams, $uibModal, $log, BookApi) {
    $scope.detailTermId = $routeParams.termId;
    $scope.detailClassId = $routeParams.classId;
    $scope.detailBeginTime = $routeParams.beginTime;
    $scope.detailOverTime = $routeParams.overTime;
    $scope.detail_infos = null;
    $scope.borrow_all_value = false;
    $scope.return_all_value = false;

    var query_detail = function() {
        /*BookApi.query_detail( $scope.detailTermId, $scope.detailClassId, $scope.detailBeginTime, $scope.detailOverTime, function(res) {
            // convert res to detail_infos
        })*/
        $scope.detail_infos = [
            {
                "studentId": "1",
                "studentName": "小明",
                "bookId": "1",
                "bookName": "图书1",
                "bookNewId": "2",
                "bookNewName": "图书新",
                "borrowTime": "2016-05-16 08:00",
                "backTime": "2016-05-22 08:00",
                "state": "0"
            },
            {
                "studentId": "2",
                "studentName": "小白",
                "bookId": "2",
                "bookName": "图书2",
                "bookNewId": "3",
                "bookNewName": "图书2新",
                "borrowTime": "2016-05-16 08:00",
                "backTime": "2016-05-22 08:00",
                "state": "1"
            },
            {
                "studentId": "3",
                "studentName": "小白3",
                "bookId": "3",
                "bookName": "图书3",
                "bookNewId": "4",
                "bookNewName": "图书3新",
                "borrowTime": "2016-05-16 08:00",
                "backTime": "2016-05-22 08:00",
                "state": "2"
            }
        ];
        for (var  i = 0; i < $scope.detail_infos.length; i++) {
            var info = $scope.detail_infos[i];
            info.borrow_value = false;
            info.return_value = false;
            if (info.state !== "0") {
                info.borrow_value = true;
            }
            if (info.state == "2" || info.state == "3" || info.state == "4" || info.state == "5") {
                info.return_value = true;
            }
        }
    };
    var set_detail_borrow_status = function(state) {
        for (var  i = 0; i < $scope.detail_infos.length; i++) {
            var info = $scope.detail_infos[i];
            info.borrow_value = state;
        }
    };
    var set_detail_return_status = function(state) {
        for (var  i = 0; i < $scope.detail_infos.length; i++) {
            var info = $scope.detail_infos[i];
            info.return_value = state;
        }
    };

    $scope.on_borrow_all = function() {
        var msg = "";
        if (!$scope.borrow_all_value) {
            msg = "确定要设置为全部领取吗？"
        } else{
            msg = "确定要设置为全部未领取吗？"
        }

        var res = confirm(msg);
        if (res == true) {
            if (!$scope.borrow_all_value) {
                set_detail_borrow_status(true);
            } else {
                set_detail_borrow_status(false);
            }
            $scope.borrow_all_value = !$scope.borrow_all_value;
        }
    };
    $scope.on_return_all = function() {
        var msg = "";
        if (!$scope.return_all_value) {
            msg = "确定要设置为全部归还吗？"
        } else{
            msg = "确定要设置为全部未归还吗？"
        }

        var res = confirm(msg);
        if (res == true) {
            if (!$scope.return_all_value) {
                set_detail_return_status(true);
            } else {
                set_detail_return_status(false);
            }
            $scope.return_all_value = !$scope.return_all_value;
        }
    };
    $scope.on_borrow = function(k) {
        var info = $scope.detail_infos[k];
        info.borrow_value = !info.borrow_value;
    };
    $scope.on_return = function(k) {
        var info = $scope.detail_infos[k];
        info.return_value = !info.return_value;
    };
    $scope.on_replace = function(k) {
        var info = $scope.detail_infos[k];
        info.return_value = !info.return_value;
    };

    $scope.openModal = function (k) {
        var info = $scope.detail_infos[k];
        info.return_value = !info.return_value;

        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'modalInstanceCtrl',
            resolve: {
                oldBook: function () {
                    return info.bookName;
                }
            }
        });

        modalInstance.result.then(function (newBook) {
            info.bookNewName = newBook;
        }, function (reason) {
            $log.info('触发了dismiss方法' + reason);
        });
    };

    query_detail();
}]);

app_setting.controller('modalInstanceCtrl', function ($scope, $http, $uibModalInstance, oldBook) {
    $scope.replace_book = oldBook;
    $scope.new_book = "";
    $scope.ok = function () {
        $uibModalInstance.close($scope.new_book);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app_setting.filter("roam_button_status", function () {
    return function (v) {
        if (v == "0") {
            //已创建，未开始
            return"btn btn-xs btn-info";
        }
        if (v == "1") {
            //老师发书，轮转开始
            return"btn btn-xs btn-primary";
        }
        if (v == "2") {
            //2：老师收书，轮转正常结束，没有异常
            return"btn btn-xs btn-success";
        }
        if (v == "3") {
            //3：老师收书，轮转正常结束，有异常；
            return"btn btn-xs btn-warning";
        }
        if (v == "4") {
            //4：轮转不正常结束，当定时器开启时状态仍然是1，即老师没有手动结束
            return"btn btn-xs btn-danger";
        }
    };
}).filter("filter_all_class", function () {
    return function (v) {
        if (!v) {
            return "btn-xs btn-warning";
        }
        return "btn-xs btn-danger";
    };
}).filter("filter_borrow_all_status", function () {
    return function (v) {
        if (!v) {
            return "全部领取";
        }
        return "全部未领取";
    };
}).filter("filter_return_all_status", function () {
    return function (v) {
        if (!v) {
            return "全部归还";
        }
        return "全部未归还";
    };
}).filter("filter_borrow_status", function () {
    return function (v) {
        if (v == "0") {
            return "未借出";
        }
        if (v == "1") {
            return "已借出";
        }
        if (v == "2") {
            return "正常归还原书";
        }
        if (v == "3") {
            return "正常归还新书";
        }
        if (v == "4") {
            return "超时归还原书";
        }
        if (v == "5") {
            return "超时归还新书";
        }
        if (v == "6") {
            return "未归还";
        }
    };
});

app_setting.factory("BookApi", ["$http", function ($http) {
    return {
        query_groups: function (success) {
            $http.get("/group/1").success(success);
        },
        query_detail: function (termId, classId, beginTime, overTime, success) {
            $http.get("/group/n?termId=" + termId + "&classId=" + classId + "&beginTime=" + beginTime + "&overTime=" + overTime).success(success);
        }
    };
}]);

