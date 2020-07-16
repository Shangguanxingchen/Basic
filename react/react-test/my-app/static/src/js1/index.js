// 获取时间
    var date = new Date();
    var didDate = date.setDate(date.getDate() - 6);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (String(month).length == 1) {
        month = '0' + month;
    }
    if (String(day).length == 1) {
        day = '0' + day;
    }
    var year_month_day = year + '-' + month + '-' + day + '';

    var nowDate = new Date();
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;
    var nowDay = nowDate.getDate();
    if (String(nowMonth).length == 1) {
        nowMonth = '0' + nowMonth;
    }
    if (String(nowDay).length == 1) {
        nowDay = '0' + nowDay;
    }
    var now_year_month_day = nowYear + '-' + nowMonth + '-' + nowDay + '';
    $('.start_date').html(year_month_day);
    $('.end_date').html(now_year_month_day);

// 通过url获取shop_id
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
var url = location.href;
sessionStorage.setItem('url', url);
// 搜索
if(getUrlParameter('code') == 'null' || getUrlParameter('code') == '' || getUrlParameter('code') == undefined){
    // productSearch(getUrlParameter('code'));   
}else{
    $('input[name=product_sku]').val(getUrlParameter('code'))
    productSearch(getUrlParameter('code')); 
}
$(document).ready(function() {
    var xhr;

    // input 清除
    $('.right .del').click(function(){
        $('input[name=product_sku]').val('');
    })
    var shop_id = getUrlParameter('shop_id');
    var lang = getUrlParameter('lang');
    var _siteId = getUrlParameter('site_id');
    var data = {
            limit: 8,
            offset: 0,
            shop_id: shop_id,
            start_date: year_month_day,
            end_date: now_year_month_day,
            sku: $('input[name=product_sku]').val()
        }
    
    $('.search').click(function() {
        $('.bg').show();
        $('.size').show();
        productSearch($('input[name=product_sku]').val());
        sessionStorage.setItem('code', $('input[name=product_sku]').val());
    })

    if (xhr) {
        xhr.abort();
    }
    xhr = $.ajax({
        url: '/nt_pos/web_mobile/api?object=nt.pos.html&method=product_best_seller',
        data: JSON.stringify(data),
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            $('.shopForce').hide();
            var str = '';
            for (i = 0; i < data.products.length; i++) {
                // var url = data.products[i]['image_url'];
                var name = data.products[i]['product_name'];
                var sale_price = data.products[i]['sale_price'];
                var rank = data.products[i]['rank'];
                var sku = data.products[i]['sku'];
                var url;
                var big_url = data.products[i]['image_url'];
                var url_img = data.products[i]['thumbnail_url'];
                if (big_url == '') {
                  if(url_img == ''){
                      if(langCode == 'en'){
                        url = "static/src/imgs1/temp_img.png"
                      }else if(langCode == 'zh-Hant'){
                        url = "static/src/imgs1/temp_img_zh.png"
                      }else{
                        url = "static/src/imgs1/temp.png"
                      }  
                  }else{
                    url = url_img
                  }
                }else{
                  url = big_url
                }
                // if (url == '') {
                //     if(langCode == "en"){
                //         url = "static/src/imgs1/temp_img.png"
                //     }else{
                //         url = "static/src/imgs1/temp.png"
                //     }
                   
                // }

                str += '<a href="product_detail.html?shop_id='+shop_id+'&type=' + sku + '&site_id=' + _siteId + '&lang=' + lang + '">\
      	        	<img src=' + url + ' alt="">\
                    <span class="sku">' + sku + '</span>\
      	      		<p>' + name + '</p>\
      	      		<div>\
      	            <span class="money">' + sale_price + '</span>\
      	            <span class="rank"><span class="text" tkey="rank"></span> <span class="rank_num">' + rank + '</span></span>\
      	          </div>\
      	    			</a>';
            }
            $('.index_body').html(str);
            $('.rank_num').each(function(){
              if($(this).html() <= '0'){
                $(this).text(_LANG_SHOW['none']);
                $(this).parents().addClass('ranks');
                $(this).prev().hide();
              }
            })
        },
        error: function() {
            console.log('error');
        },
        complete: function() {
            console.log('complete');
        },
        beforeSend: function() {}
    })


})
// 通过url获取shop_id
function getShopId(str) {
    var url = location.href;
    var index = url.indexOf(str) + 8, //等于号后面一个字符开始检测
        fixed_index = url.indexOf(str) + 8,
        reg = /\d/,
        i = 0, //标记shop_id后面有几个数字, 这一串完整的数字是id
        id = 0;

    function getNums(index) {
        if (reg.test(url.substr(index, 1))) {
            i++;
            getNums(++index);
        }
    }
    getNums(index);
    id = url.substr(fixed_index, i);
    return parseInt(id);
}

var shop_id = getShopId('shop_id=');
var lang = getUrlParameter('lang');
var _siteId = getUrlParameter('site_id');
function productSearch(sku){
        var data = {
            limit: 8,
            offset: 0,
            shop_id: shop_id,
            start_date: year_month_day,
            end_date: now_year_month_day,
            sku: sku
        }
        $.ajax({
            url: '/nt_pos/web_mobile/api?object=nt.pos.html&method=product_best_seller',
            data: JSON.stringify(data),
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
              $('.bg').hide();
              $('.size').hide();
              var str = '';
              for (i = 0; i < data.products.length; i++) {
                // var url = data.products[i]['image_url'];
                var name = data.products[i]['product_name'];
                var sale_price = data.products[i]['sale_price'];
                var rank = data.products[i]['rank'];
                var sku = data.products[i]['sku'];
                var url;
                var big_url = data.products[i]['image_url'];
                var url_img = data.products[i]['thumbnail_url'];
                if (big_url == '') {
                  if(url_img == ''){
                      if(langCode == 'en'){
                        url = "static/src/imgs1/temp_img.png"
                      }else if(langCode == 'zh-Hant'){
                        url = "static/src/imgs1/temp_img_zh.png"
                      }else{
                        url = "static/src/imgs1/temp.png"
                      }  
                  }else{
                    url = url_img
                  }
                }else{
                  url = big_url
                }

                var sku = data.products[i]['sku'];
                // if (url == '') {
                //     if(langCode == "en"){
                //         url = "static/src/imgs1/temp_img.png"
                //     }else{
                //         url = "static/src/imgs1/temp.png"
                //     }
                   
                // }
                // '&site_id='+_siteId
                str += '<a href="product_detail.html?shop_id='+shop_id+'&type=' + sku + '&site_id=' + _siteId +  '&lang=' + lang+ ' ">\
                    <img src=' + url + ' alt="">\
                    <span class="sku">' + sku + '</span>\
                    <p>' + name + '</p>\
                    <div>\
                        <span class="money">' + sale_price + '</span>\
                        <span class="rank"><span class="text" tkey="rank"></span> <span class="rank_num">' + rank + '</span></span>\
                    </div>\
                </a>';
                  
              }
              $('.index_body').html(str);
              $('.rank_num').each(function(){
                if($(this).html() <= '0'){
                    $(this).text(_LANG_SHOW['none']);
                    $(this).parents().addClass('ranks');
                    $(this).prev().hide();
                }
              })
            },
            error: function() {
                console.log('error');
            },
            complete: function() {
                console.log('complete');
            },
            beforeSend: function() {}
        })
}
