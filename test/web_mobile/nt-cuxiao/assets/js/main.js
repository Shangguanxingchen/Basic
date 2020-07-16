
$(document).on("change", '.input-checkbox input[type=radio],.input-checkbox input[type=checkbox]', function() {
        if($(this).prop('checked')){
            $(this).parents('.input-checkbox').addClass('checked');
        }else{
            $(this).parents('.input-checkbox').removeClass('checked');
        }

});



getBLen = function(str) {  
    if (str == null) return 0;  
    if (typeof str != "string"){  
        str += "";  
    }  
    return str.replace(/[^\x00-\xff]/g,"01").length;  
}


function showError(str){
    $('.error').html(str);
}
function clearError(str){
    $('.error').html('');
}

switch(langCode){
    case 'en':
        var _LANG = {
            "decimal":        "",
            "emptyTable":     "No Data",
            "info":           "Total <span>_TOTAL_</span> Items",
            "infoEmpty":      "",
            "infoFiltered":   "",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "_MENU_",
            "loadingRecords": "Loading...",
            "processing":     "Processing...",
            "search":         "Search:",
            "zeroRecords":    "No Data",
            "paginate": {
                "first":      "",
                "last":       "",
                "next":       "<img src='/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/icon-rt.svg'>",
                "previous":   "<img src='/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/icon-lt.svg'>"
            },
            "aria": {
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        };
    break;
    case 'zh-Hant':
        var _LANG = {
            "decimal":        "",
            "emptyTable":     "沒有數據",
            "info":           "共 <span>_TOTAL_</span> 條",
            "infoEmpty":      "",
            "infoFiltered":   "",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "_MENU_",
            "loadingRecords": "加載中...",
            "processing":     "處理中...",
            "search":         "搜索:",
            "zeroRecords":    "沒有數據",
            "paginate": {
                "first":      "",
                "last":       "",
                "next":       "<img src='/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/icon-rt.svg'>",
                "previous":   "<img src='/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/icon-lt.svg'>"
            },
            "aria": {
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        };
    break;
    default:
        var _LANG = {
            "decimal":        "",
            "emptyTable":     "没有数据",
            "info":           "共 <span>_TOTAL_</span> 条",
            "infoEmpty":      "",
            "infoFiltered":   "",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "_MENU_",
            "loadingRecords": "加载中...",
            "processing":     "处理中...",
            "search":         "搜索:",
            "zeroRecords":    "没有数据",
            "paginate": {
                "first":      "",
                "last":       "",
                "next":       "<img src='/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/icon-rt.svg'>",
                "previous":   "<img src='/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/icon-lt.svg'>"
            },
            "aria": {
                "sortAscending":  ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        };
    break;
}
var page_change;
if(langCode=='en'){
    page_change = ["10 /Page","20 /Page","50 /Page","80 /Page"];
}else if(langCode=='zh-Hant'){
    page_change = ["10 / 頁","20 / 頁","50 / 頁","80 / 頁"];
}else {
    page_change= ["10 / 页","20 / 页","50 / 页","80 / 页"];
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