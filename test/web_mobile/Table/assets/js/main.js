
$(document).on("change", '.input-checkbox input[type=radio],.input-checkbox input[type=checkbox]', function() {
        if($(this).prop('checked')){
            $(this).parents('.input-checkbox').addClass('checked');
        }else{
            $(this).parents('.input-checkbox').removeClass('checked');
        }

});
$(document).on("change", '.input-radio input[type=radio]', function() {
        var name = $(this).attr('name');
        $('.input-radio input[name='+name+']').not($(this)).parents('.input-radio').removeClass('checked');

        if($(this).prop('checked')){
            $(this).parents('.input-radio').addClass('checked');
        }else{
            $(this).parents('.input-radio').removeClass('checked');
        }

});

getBLen = function(str) {  
    if (str == null) return 0;  
    if (typeof str != "string"){  
        str += "";  
    }  
    return str.replace(/[^\x00-\xff]/g,"01").length;  
}
// 移除促销查询的记录
sessionStorage.removeItem('changeSelect');

function showError(str){
    $('.error').html(str);
}
function clearError(str){
    $('.error').html('');
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

    Date.prototype.Format = function(fmt)   
    { //author: meizz   
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  

var time = 10;
var is_search = true; // 查询按钮 true可点击 false不可点击
var ajax_count = 0;// 执行了几个ajax

var shop_id = getUrlParameter('shop_id');
var lang = getUrlParameter('lang');
var _siteId = getUrlParameter('site_id');
var _s = getUrlParameter('_s');

function time_interval_init(form_id, condi_ajax_count){
    var time_count_date = form_id + '_time_count_date';
    var time_count_s = form_id + '_time_count_s';
    var search_text = localStorage.getItem('search_text');
    if(localStorage.getItem(time_count_s)*1 > 0){
        time = localStorage.getItem(time_count_s)*1;
        time = time - Math.round(((new Date()).getTime()-(new Date(localStorage.getItem(time_count_date))).getTime())/1000); 
        if(time<=0){
            time = 10;
            is_search = true;
            $(".nx-btn-display")[0].innerHTML = search_text;
        }else{
            is_search = false;
            is_search = false;
            time = time -1;
            localStorage.setItem(time_count_s, time);
            $(".nx-btn-display")[0].innerHTML = search_text + ' (' + time+'s' + ')';
            $('.nx-btn-display').css('background','#b3b3b3');
            console.log($(".nx-btn-display")[0].innerHTML);
            var time_interval_init = setInterval(
                function(){
                    var d=new Date();
                    localStorage.setItem(time_count_date, d);
                    if(time!=0){
                        is_search = false;
                        time = time -1;
                        localStorage.setItem(time_count_s, time);
                        $(".nx-btn-display")[0].innerHTML = search_text + ' (' + time+'s' + ')';
                        $('.nx-btn-display').css('background','#b3b3b3');
                    }else{
                        is_search = true;
                        localStorage.setItem(time_count_s, time);
                        clearInterval(time_interval_init);
                        $(".nx-btn-display")[0].innerHTML = search_text;
                        if(ajax_count==condi_ajax_count){
                            $('.nx-btn-display').css('background','#0894ec');
                        }
                    }
                }
            ,1000);
        }
    }
}

function time_interval(time, form_id){
    time = 10;
    var time_count_date = form_id + '_time_count_date';
    var time_count_s = form_id + '_time_count_s';
    var search_text = $(".nx-btn-display")[0].innerHTML;
    localStorage.setItem('search_text', search_text);
    var time_interval = setInterval(
      function(){
        var d=new Date();
        localStorage.setItem(time_count_date, d);
        if(time!=0){
          // 倒计时显示
          is_search = false;
          time = time -1;
          localStorage.setItem(time_count_s, time);
         $(".nx-btn-display")[0].innerHTML = search_text + ' (' + time+'s' + ')';
         $('.nx-btn-display').css('background','#b3b3b3');
        }else{
          // 倒计时结束
          is_search = true;
          localStorage.setItem(time_count_s, time);
          clearInterval(time_interval);
          $(".nx-btn-display")[0].innerHTML = search_text;
          $('.nx-btn-display').css('background','#0894ec');
        }
      },
    1000);
}