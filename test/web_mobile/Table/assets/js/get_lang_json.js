
  var translate = function (jsdata){	
	  if(!!!jsdata){
		  return;
	  }
	  $("[tkey]").each (function (index){
		  var strTr = jsdata [$(this).attr ('tkey')];
		  $(this).html (strTr);
	  });
  
	  $("[placeholder-key]").each (function (index){
		  var strTr = jsdata [$(this).attr ('placeholder-key')];
		  $(this).attr ('placeholder',strTr);
	  });
  }
  
 //解析url
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
  };
  // var langs = ['en', 'cn', 'zh-Hant'];
  // var langCode  = getUrlParameter('lang');
  // var script=document.createElement('script');
  // script.async = false
  // // script.async = false;
  // script.defer = false; 
  // var head=document.getElementsByTagName('head')[0];
  // script.type='text/javascript'; 
  // if (langs.indexOf(langCode) != -1){
	//   script.src='lang/'+ langCode +'.js'; 
  // }else{
	//   script.src='lang/cn.js';
  // }
  // // script.onload = function(){
	// //   translate(_LANG_SHOW);
  // // } 
  // head.appendChild(script);

  var langs = ['en', 'cn', 'zh-Hant'];
	var langCode  = getUrlParameter('lang');
	var lang_src;
	if (langs.indexOf(langCode) != -1){
	  lang_src='lang/'+ langCode +'.js'; 
  }else{
	  lang_src='lang/cn.js';
  }
	document.write('<script src="'+lang_src+'"></script>');