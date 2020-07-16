// var langs = ['en', 'cn'];

function get_lang(str){
	var obj = {};
	var arr = str.split('&');
	for(var i in arr){
		var tmp = arr[i].split('=');
		obj[tmp[0]] = tmp[1];
	}
	return obj;
}

// var translate = function (jsdata)
// {	
// 	$("[tkey]").each (function (index)
// 	{
// 		var strTr = jsdata [$(this).attr ('tkey')];
// 	    $(this).html (strTr);
// 	});
// }
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
var langCodes  = getUrlParameter('lang');

langCode = navigator.language.substr (0, 2);
// function change_lang(langCode){
// 	if (langs.indexOf(langCode) != -1){
// 		$.getJSON('static/lang/'+langCode+'.json', translate);
// 	}else{
// 		$.getJSON('static/lang/cn.json', translate);
// 	}
// }
var obj = get_lang(location.search.substr(1));
// change_lang(obj['lang']);
// setTimeout(
// 	translate(_LANG_SHOW)
// , 0);

translate(_LANG_SHOW)
console.log(_LANG_SHOW)