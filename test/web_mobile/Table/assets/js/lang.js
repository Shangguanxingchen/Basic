
var arr = location.search.substr(1).split('&');
// 移除促销查询的记录
sessionStorage.removeItem('changeSelect');

function getParam(arr,type){
	var str = '';
	for(var i in arr){
		var key = arr[i].split('=');
		if(key[0] == type){
			str = key[1];
		}		
	}
	return str;
}
var shop_id = getParam(arr, 'shop_id');
translate(_LANG_SHOW);
// var translate_interval = setInterval(function(){
// 	if(typeof _LANG_SHOW != 'undefined'){
// 		if(!!_LANG_SHOW){
// 			translate(_LANG_SHOW);
// 			clearInterval(translate_interval)
// 		}
// 	}
// }, 10)

