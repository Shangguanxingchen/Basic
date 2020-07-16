var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();


var para = QueryString;


var m_allProduct = angular.module('allProduct', []);
m_allProduct.controller('productList', ['$scope', '$http', function ($scope, $http) {
    var data = {name: '', categ_id: 1, shop_id: '3', limit: 20, offset: 1};
    var url = API_URL_PREFIX + API_URL['PRODUCT_LIST'];
    var data2 = {data:data,url:url};
    data.headers = {'X-EL-KEY' : T};
    
    $http.post('../ajax.php',data2).
        success(function(data) {
            $scope.posts = data.data.res;
        }).error(function(data,status,headers,config){
            //_error_handle(data,status,headers,config);
        });
}])


var m_productDetail = angular.module('productDetail', []);
m_productDetail.controller('productDetail', ['$scope', '$http', function ($scope, $http) {
    $scope.qty = 1;
    
    $scope.addToCart = function(user){
        

        var data = {sku: para.sku, ruid: 0, quantity: $scope.qty,cur_selected_variants:{}};
        var url = API_URL_PREFIX + API_URL['ADD_TO_CART'];
        var data2 = {data:data,url:url};
        data.headers = {'X-EL-KEY' : T};

        $http.post('../ajax.php',data2).
            success(function(data) {
                console.log(data);
            }).error(function(data,status,headers,config){
                //_error_handle(data,status,headers,config);
            });
    }
    
    $scope.purchase = function(user){
        var data = {sku: para.sku, ruid: 0, quantity: $scope.qty,cur_selected_variants:{}};
        var url = API_URL_PREFIX + API_URL['FAST_ORDER'];
        var data2 = {data:data,url:url};
        data.headers = {'X-EL-KEY' : T};

        $http.post('../ajax.php',data2).
            success(function(data) {
                console.log(data);
            }).error(function(data,status,headers,config){
                //_error_handle(data,status,headers,config);
            });
    }
    
}])



var m_shoppingCart = angular.module('shoppingCart', []);
m_shoppingCart.controller('shoppingCart', ['$scope', '$http', function ($scope, $http) {
    $scope.qty = 1;
    
    
    $scope.purchase = function(user){
        var data = {selected: [178]};
        var url = API_URL_PREFIX + API_URL['CART_TO_ORDER'];
        var data2 = {data:data,url:url};
        data.headers = {'X-EL-KEY' : T};

        $http.post('../ajax.php',data2).
            success(function(data) {
                window.location.href = 'Orders-pay.html';
            }).error(function(data,status,headers,config){
                //_error_handle(data,status,headers,config);
            });
    }
    
}])


var m_Caculator = angular.module('Caculator', []);
m_Caculator.controller('Caculator', ['$scope', '$http', function ($scope, $http) {
    $scope.qty = 1;
    
   
    $scope.confirm = function(){
        var data = {"addr_id":"576","coupon":"","delivery":"online-pick","payment_type":"","lat":"","lng":"","shop_id":0,"point_discount":0};
        var url = API_URL_PREFIX + API_URL['CONFIRM_ORDER'];
        var data2 = {data:data,url:url};
        data.headers = {'X-EL-KEY' : T};

        $http.post('../ajax.php',data2).
            success(function(data) {
                window.location.href = 'Orders-pay.html';
            }).error(function(data,status,headers,config){
                //_error_handle(data,status,headers,config);
            });
    }
}])

