// var langs = ['en', 'cn'];
var arr = location.search.substr(1).split('&');

// var getUrlParameter = function getUrlParameter(sParam) {
//     var sPageURL = decodeURIComponent(window.location.search.substring(1)),
//         sURLVariables = sPageURL.split('&'),
//         sParameterName,
//         i;

//     for (i = 0; i < sURLVariables.length; i++) {
//         sParameterName = sURLVariables[i].split('=');

//         if (sParameterName[0] === sParam) {
//             return sParameterName[1] === undefined ? true : sParameterName[1];
//         }
//     }
// };


// var translate = function (jsdata){	
// 	$("[tkey]").each (function (index){
// 		var strTr = jsdata [$(this).attr ('tkey')];
// 	    $(this).html (strTr);
// 	});

// 	$("[placeholder-key]").each (function (index){
// 		var strTr = jsdata [$(this).attr ('placeholder-key')];
// 	    $(this).attr ('placeholder',strTr);
// 	});
// }
var langCode  = getUrlParameter('lang');
langCode = navigator.language.substr (0, 2);
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
var langCode = getParam(arr, 'lang');

var shop_id = getParam(arr, 'shop_id');

translate(_LANG_SHOW);
// if (langs.indexOf(langCode) != -1){
// 	$.getJSON('lang/'+langCode+'.json', {},translate);
// }else{
// 	$.getJSON('lang/cn.json', translate);
// }

