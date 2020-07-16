var app = angular.module("libraryapp", ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: 'views/index.html', controller: 'indexController'})
        .when('/users', {templateUrl: 'views/users.html', controller: 'usersController'})
        .when('/asset', {templateUrl: 'views/asset.html', controller: 'assetController'})
        .otherwise({redirectTo:'/'});
}]);

app.controller("maincontroller", function($scope, $http) {

    $('#navid li').on('click', function() {
        console.log(this);
        var $this = $(this);
        $this.addClass('active').siblings('.active').removeClass('active');
    });

    /*$scope.pData = {
        indexActive: true,
        usersActive: false,
        assetActive: false
    };

    $scope.maps = {
        '/': 'indexActive',
        '/users': 'usersActive',
        '/asset': 'assetActive'
    };

    $scope.setNavStatus = function(curr) {
        for (var key in $scope.pData) {
            $scope.pData[key] = false;
        }
        $scope.pData[$scope.maps[curr]] = true;
    };*/
});
app.controller("indexController", function($scope, $http) {

});
app.controller("usersController", function($scope, $http) {

    $scope.isUpdate = false;
    $scope.book = {};
    $scope.page = 0;
    $scope.pageSize = 3;
    $scope.total = 0;
    $scope.pms = {
        ids: [],
    };
    
    $scope.renderTable = function() {
        $scope.book.classify = "0";
        layer.load();
        
        //console.log($scope.book.classify);
        $http({
            url: 'api/books_list.php',
            method: 'get',
            params: {query: $scope.query, size: $scope.pageSize, page: $scope.page}
        }).success(function(response) {
            
            if(response.success) {
                $scope.bookList = response.data;
                $scope.total = response.total;
                $scope.pageArr = _.range($scope.getTotalPage());
                layer.closeAll();
                /*$scope.renderPaging();*/
            } else {
                $scope.bookList = [];
            }
            
        }).error();;
    };
    $scope.renderTable();

    $scope.savePic = function() {

        var fd = new FormData();
        var file = document.querySelector('input[type=file]').files[0];
        fd.append('pic', file);

        $http({
            method: 'post',
            url: '../fileUploading/server/step1.php',
            data: fd,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function(response) {
            if (response.success) {
                $scope.bookPicUrl = response.fileName;
            }
        });
    };

    $scope.onCheckboxClick = function($event) {
        var id = this.book.id;
            target = $event.target;
        //console.log(this);
       
        if (target.checked) {
            $scope.pms.ids.push(id);
        } else {
            var index = getIndex($scope.pms.ids, id);

            if (index > -1) {
                $scope.pms.ids.splice(index, 1);
            }
        }

        //console.log($scope.pms.ids);

    };
        
    function getIndex(arr, item) {
        var i, len;
        len = arr.length;
        for (i=0; i<len; i++) {
            if (arr[i] === item) {
                //console.log(i)
                return i;
            }
        }
        return -1;
    };

    $scope.newBook = function() {
        $scope.book = {};
        $scope.bookDlgTitle = "新增图书";
        $scope.isUpdate = false;
        $('#bookDialog').modal("show");
    };

    $scope.saveBook = function() {
        
        if($('#saveBtn').hasClass('submiting')) {
                return;
            }

        $('#saveBtn').addClass('submiting');
        //TODO checked
        $http({
            url: "api/books_add.php",
            method: "get",
            params: $scope.book
        }).success(function(response){
            if(response.success) {
               
               $('#bookDialog').modal("hide");
               $scope.book = {};
               $('#saveBtn').removeClass('submiting');
               
            } else {
                alert("您的网络好像有问题，请刷新重试！");
            }
            $scope.renderTable();
        });
        
    };

    $scope.delBook = function() {

        if(!confirm('确定要删除该图书吗？')) {
            return;
        }

        layer.load();
            $http({
                url: "api/books_del.php",
                method: "get",
                params: {ids: $scope.pms.ids.join(",")}
            }).success(function(response){
                if(response.success) {
                    $scope.renderTable();
                } else {
                    alert('删除失败，请刷新重试！');
                }
            });
    };

    $scope.updateBook = function() {

        var id = $scope.pms.ids[0];

        var bookList = this.bookList;

        var book = getObjById(bookList, id);
        
        $scope.book = book;
        
        $scope.bookDlgTitle = "修改图书";
        $scope.isUpdate = true;
        $('#bookDialog').modal("show");
        
    };

    $scope.doUpdateBook = function() {
        $http({
            url: "api/books_update.php",
            method: "get",
            params: $scope.book
        }).success(function(response){
            if(response.success) {
                
                $('#bookDialog').modal("hide");
            } else {
                alert('修改失败，请刷新重试！');
            }
            $scope.renderTable();
        });
        
    };

    $scope.searchBook = function() {
        $scope.renderTable();
    };

    /*$scope.renderPaging = function() {
        $scope.pageArr = _.range(0, $scope.getTotalPage());
    };*/

    $scope.getTotalPage = function() {

        return parseInt($scope.total / $scope.pageSize) + 1;
    };
    
    $scope.clickPagingLi = function() {
        $scope.page = this.tmpPage;
        $scope.renderTable();
    };
    
    $scope.firstPage = function() {
        $scope.page = 0;
        
    };

    $scope.lastPage = function() {
        $scope.page = getTotalPage() - 1;
        $scope.renderTable();
    };


    function getObjById(arr, id) {
        
        var i, len = arr.length;
        for (i=0; i<len; i++) {
            if (arr[i].id == id) {

                return arr[i];

            }
        }
        return null;
    }

});
app.controller("assetController", function($scope, $http) {
});