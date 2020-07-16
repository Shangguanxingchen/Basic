
var app = angular.module("libraryapp", []);

app.controller("maincontroller", function($scope, $http) {

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
                
               $('#saveBtn').removeClass('submiting');
               $('#bookDialog').modal("hide");
               $scope.book = {};
               
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