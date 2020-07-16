var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
}
function formatDate(date) {
    var y = date.getFullYear();
  	var m = date.getMonth() + 1; m = m >= 10 ? m : '0'+m;
  	var d = date.getDate(); d = d >= 10 ? d : '0'+d;
  	return y+'-'+m+'-'+d;
}
function showLoadingToast(msg){
        var $loadingToast = $('.data_content');
        if ($loadingToast.css('display') != 'none') return;
        if(typeof msg == 'undefined'){
            msg = '加载中...';
        }
        $loadingToast.find('.weui-toast__content').html(msg);
        $loadingToast.fadeIn(100);
}
function hideLoadingToast(){
        var $loadingToast = $('.data_content');
        if ($loadingToast.css('display') == 'none') return;
        $loadingToast.fadeOut(100);
}
// 报错提示
function _error_handle(data){
    if(!!!data){
        return;
    }
    if(!!data.code){
        if((data.code+"").substring(0,1) == 1){
                storage.removeItem('NXPB_TOKEN');
                alert('长期未操作，登录已经超时，请重新登录');
                window.location.href = 'login.html';
        }
        switch(data.code){
            case 100002:
                storage.removeItem('NXPB_TOKEN');
                window.location.href = 'login.html';
            break;
        }
    }
}
function translate(jsdata){	
	$("[tkey]").each (function (index){
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});

	$("[placeholder-key]").each (function (index){
		var strTr = jsdata [$(this).attr ('placeholder-key')];
	    $(this).attr ('placeholder',strTr);
	});
}

$('.dropdown-toggle').dropdown();
var storage = window.localStorage;
var shop_id = getUrlParameter('shop_id');
var langs = ['en','cn'];

var NtSF = angular.module('NtSF',[]);
NtSF.run(['$http', function($http) {
}]);
NtSF.controller('form5', ['$scope', '$http', function ($scope, $http) {
	//根据cn/en设定padding
	$scope._lang = getUrlParameter('lang');
	$scope.lang_style = {'padding': 8+'px'};
	if($scope._lang == 'en'){
		$scope.lang_style = {
			'padding': '0 8px'
		}
	};
	// if (langs.indexOf($scope._lang) != -1){
    //   $.getJSON('static/lang/'+$scope._lang+'.json', {},translate);
    // }else{
    //   $.getJSON('static/lang/cn.json', translate);
    // }
	// console.log('cn1');
	$scope.search_type = 'today';
	$('.background').click(function(){
		$('.wrapper').hide();
		$('.background').hide();
		$('body').css('overflow','');
	});
	
	$scope.getData = function(search_type){
		$('.circle_loading').show();
		$scope.yestoday_class = false;
		$scope.search_type = 'history';
		var startDate, endDate;
 		if(search_type=='today'){
 			$scope.today = formatDate(new Date());
 			startDate = $scope.today;
			endDate = $scope.today;
			$scope.startDate = $scope.today;
			$scope.search_type = 'today';
 		}else if(search_type=='yestoday' && !$('.wrapper').attr('data-date1')){ 			
			//昨天
			var day1 = new Date();
	 		day1.setDate(day1.getDate()-1);
			startDate = formatDate(day1);
			endDate = formatDate(day1);
			$scope.startDate = startDate;
			$('.wrapper').attr('data-date1','');
			$('.wrapper').attr('data-date2','');
			$scope.yestoday_class = true;
		}else{
			startDate = $('.wrapper').attr('data-date1');
			endDate = $('.wrapper').attr('data-date2');
			
			if(!startDate||!endDate){
				var day1 = new Date();
	 			day1.setDate(day1.getDate()-1);
				startDate = formatDate(day1);
				endDate = formatDate(day1);
			}
			$scope.startDate = startDate + '/' + endDate;
		}
		console.log($scope.startDate);
		$scope.loading = true;
		
		$scope.data = {
			"shop_id":shop_id,
		    "start_date" : startDate,
		    "end_date" : endDate
		}
		$('.background').click();
		var url = '/nt_project_lingzhi/web_mobile/api?object=nt.pos.html&method=shop_real_time_sale_report';
        var config = {};
        // config.headers = {'Token' : TOKEN};
        $http.post(url,$scope.data,config).
        success(function(data) {
            if(data.status != 'S'){
                _error_handle(data);
                return;
            }
            // 'OMNI_NT_POS': u'线下销售',
            // 'H5': u'H5',
            // 'MINIPROGRAM': u'小程序',
            // 'SAA_pickup': u'导购宝（自提/自主收银）',
            // 'SAA_express': u'导购宝（送货到家）',
            // 'OTHER': u'其他',
            $scope.data = data.data;

            //销售渠道销售统计
            var channel_sales = [
            	{
	                "product_count": 0,
	                "channel_name": "H5",
	                "amount": 0,
	                "order_count": 0,
	                "channel_code":"H5"
	            },
	            {
	                "product_count": 0,
	                "channel_name": "导购宝",
	                "channel_name2": "送货到家",
	                "amount": 0,
	                "order_count": 0,
	                "channel_code": "SAA_express"
	            },
	            {
	                "product_count": 0,
	                "channel_name": "导购宝",
	                "channel_name2": "自提/自助收银",
	                "amount": 0,
	                "order_count": 0,
	                "channel_code": "SAA_pickup"
	            },
	            {
	                "product_count": 0,
	                "channel_name": "小程序",
	                "amount": 0,
	                "order_count": 0,
	                "channel_code": "MINIPROGRAM"
	            }
            ];
            for(var i=0; i < $scope.data.channel_sales.length; i++){
            	switch($scope.data.channel_sales[i].channel_code){
	              	case 'H5':
	                	channel_sales[0] = $scope.data.channel_sales[i];
	              	break;
	              	case 'SAA_express':
	              		channel_sales[1] = $scope.data.channel_sales[i];
	              		channel_sales[1].channel_name = '导购宝';
	              		channel_sales[1].channel_name2 = '送货到家';
	              	break;
	              	case 'SAA_pickup':
	                	channel_sales[2] = $scope.data.channel_sales[i];
	              		channel_sales[2].channel_name = '导购宝';
	              		channel_sales[2].channel_name2 = '自提/自助收银';
	              	break;
	              	case 'MINIPROGRAM':
	                	channel_sales[3] = $scope.data.channel_sales[i];
	              	break;
	            }
            }
            $scope.data.channel_sales = channel_sales;

            
            for(var i=0; i < $scope.data.employee_sales.length; i++){
            	var user_channel_sales = [
	                {
	                    "product_count": 0,
	                    "channel_name": "H5",
	                    "amount": 0,
	                    "order_count": 0,
	                    "channel_code": "H5"
	                },{
	                    "product_count": 0,
	                    "channel_name": "导购宝",
		                "channel_name2": "送货到家",
	                    "amount": 0,
	                    "order_count": 0,
	                    "channel_code": "SAA_express"
	                },{
	                    "product_count": 0,
	                    "channel_name": "导购宝",
		                "channel_name2": "自提/自助收银",
	                    "amount": 0,
	                    "order_count": 0,
	                    "channel_code": "SAA_pickup"
	                },{
	                    "product_count": 0,
	                    "channel_name": "小程序",
	                    "amount": 0,
	                    "order_count": 0,
	                    "channel_code": "MINIPROGRAM"
	                },
	            ];
            	for(var j=0; j < $scope.data.employee_sales[i].user_channel_sales.length; j++){
	            	switch($scope.data.employee_sales[i].user_channel_sales[j].channel_code){
		              	case 'H5':
		                	user_channel_sales[0] = $scope.data.employee_sales[i].user_channel_sales[j];
		              	break;
		              	case 'SAA_express':
		              		user_channel_sales[1] = $scope.data.employee_sales[i].user_channel_sales[j];
		              	break;
		              	case 'SAA_pickup':
		                	user_channel_sales[2] = $scope.data.employee_sales[i].user_channel_sales[j];
		              	break;
		              	case 'MINIPROGRAM':
		                	user_channel_sales[3] = $scope.data.employee_sales[i].user_channel_sales[j];
		              	break;
		            }
		        }
		        $scope.data.employee_sales[i].user_channel_sales = user_channel_sales;
            }
            $scope.setEcharts();
            console.log('接口');
        }).error(function(data,status,headers,config){
            _error_handle(data);
        }).finally(function(){
            $scope.loading = false;
            // setTimeout(function() {
			// 	if (langs.indexOf($scope._lang) != -1){
			//       $.getJSON('static/lang/'+$scope._lang+'.json', {},translate);
			//     }else{
			//       $.getJSON('static/lang/cn.json', translate);
			//     }
			//     console.log('cn2');
			// }, 0);
			
            $('.circle_loading').hide();
        })
	}
	
	$scope.getData('today');
	
	$scope.setEcharts = function(){
		var sale_on_off = echarts.init(document.getElementById('sale_on_off'));
		option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    color: ['#FF9900', '#FFB97B'],
		    // legend: {
		    //     orient: 'vertical',
		    //     x: 'left',
		    //     data:['直接访问','邮件营销']
		    // },
		    series: [
		        {
		            name:$scope._lang=='cn'?'销售渠道':'Channel',
		            type:'pie',
		            radius: ['45%', '70%'],
		            // avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: true,
		                    formatter: "{d}%"
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            lableLine: {
		                normal: {
		                    show: false
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            data:[
		                {value: $scope.data.on_line_sales, name:$scope._lang!='en'?'线上销售额':'Online Amt.'},
		                {value: $scope.data.offline_sales, name:$scope._lang!='en'?'线下销售额':'Offline Amt.'}
		            ]
		        }
		    ]
		};
		// $scope.data.on_line_sales = 123456789013.00
		// $scope.data.offline_sales = 123456789061.00
	    sale_on_off.setOption(option);
	}
	

}])








