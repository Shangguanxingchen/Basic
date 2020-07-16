/**
     * 根据小图显示大图
     */
    $scope.showPic = function() {

        var url = this.book.bookPic;

        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: '800px',
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: '<img src="../fileUploading/server/uploadImgs/'+url+'">'
        });

    };

/**
     * 上传图书封面
     */
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
    }