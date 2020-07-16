/**
 * Created by zhousuyang on 17/4/11.
 */

$(document).ready(function () {
    var td_stock,td_size,td_color,tittle_text;
    // 获取时间
    var date = new Date();
    var didDate = date.setDate(date.getDate()-6);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(String(month).length == 1){
      month = '0' + month;
    }
    if(String(day).length == 1){
      day = '0' + day;
    }
    var year_month_day = year + '-' + month + '-' + day +'';

      var nowDate = new Date();
      var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth()+1;
    var nowDay = nowDate.getDate();
    if(String(nowMonth).length == 1){
      nowMonth = '0' + nowMonth;
    }
    if(String(nowDay).length == 1){
      nowDay = '0' + nowDay;
    } 
    var now_year_month_day = nowYear + '-' + nowMonth + '-' + nowDay + '';
    $('.start_date').html(year_month_day);
    $('.end_date').html(now_year_month_day);

    var LastedSevenDays = document.getElementById('charts');
    var lineColor = '#E0E4E8',
        xyColor = '#748292',
        xyBorder = '#2185C5';

    var body_height = $("body").height(),
        img_width = $('.big_img').width(),
        img_height = $('.big_img').height(),
        client_width = $(window).width(),
        client_height = $(window).height();

    var header_height = $('.near_store .header').height(),
        body_title_height = $('.near_store .body .title').height(),
        footer_height = $('.near_store .footer').height();

    var diff = client_height - header_height - body_title_height - footer_height + 'px';

    var header_height_kc = $('.kucun .header').height(),
        footer_height_kc = $('.kucun .footer').height();

    var diff_kc = client_height - header_height_kc - footer_height_kc + 'px';

    var near_store_search_array = [];

    // 通过url获取shop_id
    // function getShopId(str){
    //     var url = location.href;
    //     var index = url.indexOf(str) + 8,//等于号后面一个字符开始检测
    //         fixed_index = url.indexOf(str) + 8,
    //         reg = /\d/,
    //         i = 0, //标记shop_id后面有几个数字, 这一串完整的数字是id
    //         id = 0;
    //     function getNums(index) {
    //         if(reg.test(url.substr(index, 1))){
    //             i++;
    //             getNums(++index);
    //         }
    //     }
    //     getNums(index);
    //     id = url.substr(fixed_index, i);
    //     return parseInt(id);
    // }
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
    // 通过url获取type
    function getType(str){
        var url = location.href;
        var index = url.indexOf(str) + 5,//等于号后面一个字符开始检测
            fixed_index = url.indexOf(str) + 5,
            reg = /\d/,
            i = 0, //标记shop_id后面有几个数字, 这一串完整的数字是id
            id = 0;
        function getNums(index) {
            if(reg.test(url.substr(index, 1))){
                i++;
                getNums(++index);
            }
        }
        getNums(index);
        id = url.substr(fixed_index, i);
        return parseInt(id);
    }
    var shop_id = getUrlParameter('shop_id')*1;
    var type = getUrlParameter('type').slice(0,9);
    var product_id = getUrlParameter('product_id')*1;
    var from = getUrlParameter('from');

    //本店库存ajax数据
    var data_stock = {
      shop_id:shop_id,
      sku:type+''
    }

    //返回按钮
    var url = sessionStorage.getItem('url');
    if(!!!url  || (!!from && (from == 'none'))){
        $('header a').remove();
    }else{
        var url = sessionStorage.getItem('url');
        var index_pro = url.lastIndexOf('shop_id');
        var start_url = url.substring(0, index_pro);
        var lang = getUrlParameter('lang');
        var _siteId = getUrlParameter('site_id');
        var code = sessionStorage.getItem('code');
        $('header a').click(function(){
            // location.href = start_url + '/index1.html?shop_id='+shop_id;
            location.href = start_url + 'shop_id=' + shop_id + '&lang=' + lang + '&site_id=' + _siteId +'&code=' + code;
        })
    }
    




    /**
     * 初始化某些元素的样式
     */
    function init() {
        // $('.bg_wrap').css('height', body_height);
        $('.bg_wrap').css('height', client_height);
        $('.near_store').css('height', client_height);
        $('.kucun').css('height', client_height);
        $('.near_store .body ul').css('height', diff);
        $('.kucun .body ul').css('height', diff_kc);

        /**
         * 促销内容多少决定展开图标是否显示
         */
        var height = $('.product .body p .content').height();
        if(height > 30){
            $('.product .body a').show();
            $('.product .body p .content').css({
                'height': '30px',
                'whiteSpace': 'nowrap',
                'visibility': 'visible',
                'overflow': 'hidden'
            });
        }else{
            $('.product .body a').hide();
            $('.product .body p .content').css({
                'visibility': 'visible'
            });
        }


        /**
         * 点击展开图标
         */
        $('.product .body a').click(function () {
            var str = $(this).find('img').attr('src');
            if(str === 'static/imgs/down.png'){
                $('.product .body p .content').css({
                    'height': 'auto',
                    'whiteSpace': 'pre-wrap'
                });
                $(this).find('img').attr('src', 'static/imgs/up.png')
            }else{
                $('.product .body p .content').css({
                    'height': '30px',
                    'whiteSpace': 'nowrap',
                    'visibility': 'visible',
                    'overflow': 'hidden'
                });
                $(this).find('img').attr('src', 'static/imgs/down.png')
            }
        })


        /**
         * 商品详情图片预览大图
         */
        $('.product .left').click(function () {
            var top = $(window).scrollTop() + (client_height - 540) / 2 + 'px';
            var left = $(window).scrollLeft() + (client_width - 540) / 2 + 'px';

            $('.bg_wrap').show();

            $('.big_img').css({
                top: top,
                left: left
            }).show();
        })

        $(window).scroll(function () {
            if($('.checkbox_lists').css('display') === 'block'){
                $(window).scrollTop(0);
            }

            var top = $(window).scrollTop() + (client_height - 540) / 2 + 'px';
            var left = $(window).scrollLeft() + (client_width - 540) / 2 + 'px';

            $('.big_img').css({
                top: top,
                left: left
            });
        })

        /**
         * 附近店铺设置
         */
        $('.store a').click(function () {
            $('.near_store .body ul').empty();
            $('.bg_wrap').show();
            $('.checkbox_lists').show();
            $('.near_store').show();
            neighbour_store(
                '/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_neighbour_shop_list',
                {shop_id: shop_id},
                near_store_callback
                );
        })

        // 附近店铺ajax请求
        function neighbour_store(url, data, callback){
            $.ajax({
                url: url,
                data: JSON.stringify(data),
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(res){
                callback(res);
            })
        }

        function near_store_callback(data){
            near_store_search_array = data.neighbour_shop;
            var str = '', num = 0;
            for(var i in near_store_search_array){
                if(near_store_search_array[i]['is_neighbour']){
                    num ++;
                    str += '<li data-code="'+ near_store_search_array[i]['code'] +'"><div><span>['+ near_store_search_array[i]['code'] + ']' +near_store_search_array[i]['name'] +'</span><input type="checkbox" checked /></div></li>';
                }else{
                    str += '<li data-code="'+ near_store_search_array[i]['code'] +'"><div><span>['+ near_store_search_array[i]['code'] + ']' +near_store_search_array[i]['name'] +'</span><input type="checkbox" /></div></li>';
                }
            }
            $('.near_store .body ul').append(str);
            $('.near_store .footer .num').text(num);

            if(select_all()){
                $('.near_store .body .select_all').prop('checked', true);
            }else{
                $('.near_store .body .select_all').prop('checked', false);
            }
        }

        //确定
        $('.checkbox_lists .footer button').click(function(){

            var shop_codes = [];
            var len = near_store_search_array.length;

            for(var i = 0; i < len; i++){
                if(near_store_search_array[i]['is_neighbour']){
                    shop_codes.push('' + near_store_search_array[i]['code']);
                }
            }
            $('.checkbox_lists').hide();

            modify_kucun('/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_neighbour_shop_update', {shop_id: shop_id, shop_codes: shop_codes}, modify_kucun_callback);
        })

        function modify_kucun(url, data, callback){
            $.ajax({
                url: url,
                type: 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(res){
                callback(res, true);
            }).fail(function(res){
                callback(res, false);
            })
        }
        function modify_kucun_callback(data, bool){
            if(bool){
                $('.save_result').text(_LANG_SHOW['success']);
                setTimeout(function(){
                    $('.save_result').text('');
                    $('.near_store').hide();
                    $('.bg_wrap').hide();
                }, 1000)
            }else{
                $('.save_result').text(_LANG_SHOW['fail']);
            }
        }

        //搜索
        $('.checkbox_lists .search button').click(function(){
            var search = $('.checkbox_lists .search input').val();
            var arr = [], str = '';
            //$('.near_store .body ul').empty();
            $('.near_store .body ul li').hide();
            $('.near_store .body ul li').addClass('hidden');


            if(search.trim()){
                for(var i in near_store_search_array){
                        
                    if(near_store_search_array[i]['code'].toLowerCase().indexOf(search.toLowerCase()) >=0 || near_store_search_array[i]['name'].indexOf(search) >= 0){
                        arr.push(near_store_search_array[i]);

                        $('li[data-code="'+near_store_search_array[i]['code']+'"]').show();
                        $('li[data-code="'+near_store_search_array[i]['code']+'"]').removeClass('hidden');

                    }
                }
                // for(var i in arr){
                //     if(arr[i]['is_neighbour']){
                //         str += '<li data-code="'+ arr[i]['code'] +'"><div><span>['+ arr[i]['code'] + ']' +arr[i]['name'] +'</span><input type="checkbox" checked /></div></li>';
                //     }else{
                //         str += '<li data-code="'+ arr[i]['code'] +'"><div><span>['+ arr[i]['code'] + ']' +arr[i]['name'] +'</span><input type="checkbox" /></div></li>';
                //     }
                // }
                // $('.near_store .body ul').append(str);

                if(select_all()){
                    $('.near_store .body .select_all').prop('checked', true);
                }

            }else{
              $('.near_store .body ul li').show();
              $('.near_store .body ul li').removeClass('hidden');

                // neighbour_store(
                // '/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_neighbour_shop_list',
                // {shop_id: shop_id},
                // near_store_callback
                // );
            }

            if($('.near_store .body li:not(".hidden") input:not(":checked")').length > 0){
                $('.near_store .body .select_all').prop('checked', false);
            }else{

                $('.near_store .body .select_all').prop('checked', true);
            }
        })



        $(document).on('click', '.checkbox_lists .near_store .body ul input', function(e){
            var num = + $('.near_store .footer .num').text(),
                index = $(this).parents('li').index();
            if($(this).prop('checked')){
                near_store_search_array[index]['is_neighbour'] = true;
                num ++;
                if(select_all()){
                    $('.near_store .body .select_all').prop('checked', true);
                }
            }else{
                near_store_search_array[index]['is_neighbour'] = false;
                num --;
                $('.near_store .body .select_all').prop('checked', false);
            }
            $('.near_store .footer .num').text(num);
        })

        /**
         * 商品详情：本店库存、周边库存、同城库存 ---- 点击效果
         */
         var first_not_popup = 0;

        $('.footer .tab a').click(function () {
            tittle_text = $(this).html();

            var index = $(this).index();
            first_not_popup = index;

            if(!$(this).hasClass('active')){
                $('table.active').hide();
                $('.loader').show();
                $('.loading').show();
                if(index == 0){
                    kucun('/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_product_stock_qty', data_stock, our_store_kucun_callback,index);
                }else if(index == 1){
                    kucun('/nt_pos/web_mobile/api?object=nt.pos.html&method=neighbour_shop_product_stock', data_stock, our_store_kucun_callback,index);
                    // sessionStorage.setItem('tab_1',index);

                }else if(index == 2){
                    kucun('/nt_pos/web_mobile/api?object=nt.pos.html&method=superior_office_shop_stock', data_stock, our_store_kucun_callback,index);
                    // sessionStorage.setItem('tab_2',index);
                }
            }

            $(this).addClass('active').siblings().removeClass('active');
            $('.footer .size table').eq(index).addClass('active').siblings().removeClass('active');
        })

        $('.bg_wrap, .checkbox_lists .back, .kucun .back').click(function () {
            $('.bg_wrap').hide();
            $('.big_img').hide();
            $('.checkbox_lists').hide();
            $('.near_store').hide();
            $('.kucun').hide();
        })

        /**
         * 点击table表中的td弹出具体信息
         */
        $(document).on('click', '.footer table tbody td:not(:first-child)', function(e){
          var sku = e.target.dataset.sku;
          var quantity = e.target.dataset.quantity;
          var index = $(this).index(); 
          td_stock = $(e.target).html();
          td_size = $(this).parents().eq(0).find('td:first-child').text();
          td_color = $('table tr:first-child').find('th').eq(index).text();
            if(first_not_popup == 0 || $(this).hasClass('no_store') ){
                return ;
            }
            if($(this).html() <= '0'){
              return;
            }
            $('.bg_wrap').show();
            $('.checkbox_lists').show();
            $('.kucun').show();
            $('.footer table td').removeClass('active');
            $('.kucun .header .tittle').text(tittle_text);
            $(this).addClass('active');
            if(first_not_popup == 1){
              single_product_kucun(
                  '/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_product_stock_detail',
                  {shop_id: shop_id, sku: sku, detail_type: 'neighbour'},
                  popup_around_or_same_city
                  );
            }else if(first_not_popup == 2){
                single_product_kucun(
                    '/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_product_stock_detail',
                    {shop_id: shop_id, sku: sku, detail_type: 'superior_office'},
                    popup_around_or_same_city
                    );
            }

        })

        //同城、周边  在点击td情况下弹出的内容
        function single_product_kucun(url, data, callback){
            $.ajax({
                url: url,
                data: JSON.stringify(data),
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(res){
                callback(res);
            })
        }

        //周边  点击td弹出的内容
        function popup_around_or_same_city(data){
            var num = 0;
            // $('kucun .body ul').empty();
            // if(sessionStorage.getItem('tab_1')){
            //     $('.kucun .header span').text('周边库存');
            // }else if(sessionStorage.getItem('tab_2')){
            //     $('.kucun .header span').text('同城库存');
            // }

            var shops = data.shop,
                sku = '',
                str = '',
                header = '';
                header += '<div class="div"><p class="box"><span tkey="size">'+ _LANG_SHOW['size'] +'</span><span class="size"></span></p>\
                <p class="box"><span tkey="color">'+ _LANG_SHOW['color'] +'</span><span class="color"></span></p>\
                <p class="box"><span tkey="self">'+ _LANG_SHOW['self'] +'</span>:<span class="stock"></span></p></div>';
            for(var i in shops){
                str += '<li><div><span>[' + shops[i]["shop_code"] + ']</span><span style="margin-left:20px;width: 280px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">'+ shops[i]["shop_name"] +'</span><span class="shops_num"><span tkey="qty">'+ _LANG_SHOW['qty'] +'</span>：<span class="num" style="color:#1296DB">'+ shops[i]["quantity"] +'</span></span></div></li>';
                num += shops[i]["quantity"];
                sku = shops[i]["sku"];
            }
            var stock1 = _LOCAL_STORE_DATA[sku]['quantity']; //td_stock;
            var size1 = td_size;
            var color1 = td_color;
            $('.kucun .body .body_header').html(header);
            $('.kucun .body ul').html(str);
            $('.kucun .body .stock').text(stock1);
            $('.kucun .body .size').text(size1);
            $('.kucun .body .color').text(color1);
            $('.kucun .footer .num').text(num);
        }



        /**
         * 全选效果
         */
        $('.near_store .body .select_all').click(function () {
            var bool = $(this).prop('checked');
            var len = $(document).find('.near_store .body li').length;

            var arr = [];
            if(bool){
                $('.near_store .body li:not(".hidden") input').prop('checked', true);
            }else{
                $('.near_store .body li:not(".hidden") input').prop('checked', false);
            }

            for(var i=0; i<len; i++){
                arr[i] = {};
                arr[i]['code'] = $(document).find('.near_store .body li:not(".hidden")').eq(i).data('code');
                if(bool){
                    arr[i]['is_neighbour'] = true;
                }else{
                    arr[i]['is_neighbour'] = false;
                }
            }

            for(var i in arr){
                for(var j in near_store_search_array){
                    if(arr[i]['code'] == near_store_search_array[j]['code']){
                        near_store_search_array[j]['is_neighbour'] = arr[i]['is_neighbour'];
                    }
                }
            }

            var nums = select_nums();
            $('.near_store .footer .num').text(nums);
        })

        $('.near_store .body li input').click(function (e) {
            if(select_all()){
                $('.near_store .body .select_all').prop('checked', true);
            }else{
                $('.near_store .body .select_all').prop('checked', false);
            }

            var nums = select_nums();
            $('.near_store .footer .num').text(nums);
        })

    }
    
    // 参数
    var data = {
      start_date:year_month_day,
      end_date:now_year_month_day,
      shop_id:shop_id,
      sku:type+''
    }
    
    $('.table .product').hide();
    $('.table .loader_product').show();
    // 商品详情信息
    $.ajax({
        url: '/nt_pos/web_mobile/api?object=nt.pos.html&method=product_detail_info',
        data: JSON.stringify(data),
        type: 'POST',
          dataType : "json",
          contentType: "application/json",
        success:  function(data){

          var str = '',rank = '',promotion = '';
          var url;
          var big_url = data.image_url;
          var url_img = data.thumbnail_url
          if (big_url == '') {
            if(url_img == ''){
                if(langCode == 'en'){
                  url = "static/src/imgs1/temp_img.png"
                  // big_url = "static/src/imgs1/temp_img.png"
                }else if(langCode == 'zh-Hant'){
                    url = "static/src/imgs1/temp_img_zh.png"
                }else{
                  url = "static/src/imgs1/temp.png"
                  // big_url = "static/src/imgs1/temp.png"
                }  
            }else{
                url = url_img
            }
          }else{
            url = big_url
          }
          str += '<img src="'+ url +'">'
            $('.left').html(str);
          var big_img = '';
          big_img += '<img src='+url+'>' 
          $('.big_img').html(big_img);
          $('.top10 .title .strong .title').text(data.category_name);
          var sku = getUrlParameter('type');
          rank += '<div>\
                        <p style="padding:10px 0">'+ type +'</p>\
                        <p style="padding:10px 0">'+ data.product_name +'</p>\
                        <div>\
                            <span class="money">'+ data.sale_price +'</span>\
                            <span class="time"><span tkey="date">'+ _LANG_SHOW['date'] +'</span>: '+ data.active_date +'</span>\
                        </div>\
                    </div>\
                    '
          $('.right .header .rank').html(rank);
          $('.right .body .content').html(data.products_promotion);

        },
        error: function(){
        },
        complete: function(){
            $('.table .loader_product').hide();
            $('.table .product').show();
        },
        beforeSend: function(){}
    })
    // 商品详情排名
    $.ajax({
        url: '/nt_pos/web_mobile/api?object=nt.pos.html&method=get_product_rank',
        data: JSON.stringify(data),
        type: 'POST',
          dataType : "json",
          contentType: "application/json",
        success:  function(data){
          var rank = '';
          rank += '<div class="min" style="padding:10px 0;">\
                        <div style="margin-right:30px">\
                            <img src="static/src/imgs1/bin.png">\
                            <span tkey="best">'+ _LANG_SHOW['best'] +'</span>\
                            <span class="num hot">'+ data.rank +'</span>\
                        </div>\
                        <img src="static/src/imgs1/bin.png">\
                        <span tkey="catg">'+ _LANG_SHOW['catg'] +'</span>\
                        <span class="num category">'+ data.category_rank +'</span>\
                    </div>\
                    '
          $('.right .rank_block').html(rank);

          if(data.rank < 0){
            $('.hot').text(_LANG_SHOW['none']);
          }
          if(data.category_rank < 0){
            $('.num.category').text(_LANG_SHOW['none']);
          }
        },
        error: function(){
        },
        complete: function(){
        },
        beforeSend: function(){}
    })
    /**
     * 城市近7日销量
     */
    var chart_date = [],sale = [];
    $.ajax({
        url: '/nt_pos/web_mobile/api?object=nt.pos.html&method=superior_office_product_sales',
        data: JSON.stringify(data),
        type: 'POST',
          dataType : "json",
          contentType: "application/json",
        success:  function(data){
          for(i=0;i<data.sales.length;i++){
            chart_date.push(data.sales[i]['res_date'].slice(5));
            sale.push(data.sales[i]['quantity'])
            lasted_seven_days_sales(LastedSevenDays,chart_date,sale)
          }
        },
        error: function(){
        },
        complete: function(){
        },
        beforeSend: function(){}
    })
    function lasted_seven_days_sales(dom,chart_date,sale) {
        var myChart = echarts.init(dom);
        var name = "";
        name = _LANG_SHOW['qtys']
        var option = {
            title: {
            },
            tooltip: {},
            grid: {
                left: '50',
                top: '10',
                right: '40',
                bottom: '50'
            },
            xAxis: {
                boundaryGap: false,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: xyColor
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: xyColor
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: lineColor
                    }
                },
                data: chart_date
            },
            yAxis: {
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: xyColor
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: xyColor
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: lineColor
                    }
                }
            },
            series: [{
                name: name,
                type: 'line',
                smooth: true,
                symbolSize: 8,
                lineStyle: {
                    normal: {
                        color: xyBorder,
                        width: 1
                    }
                },
                itemStyle: {
                    normal: {
                        color: xyBorder,
                        borderWidth: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: xyBorder,
                        opacity: 0.2
                    }
                },
                data: sale
            }]
        };
        myChart.setOption(option);
    }
    //  城市近七日销量排行 TOP10
      var data = {
        limit:10,
        offset:0,
        start_date:year_month_day,
        end_date:now_year_month_day,
        shop_id:shop_id,
        sku:type+''
      }
      $.ajax({
          url: '/nt_pos/web_mobile/api?object=nt.pos.html&method=product_category_rank',
          data: JSON.stringify(data),
          type: 'POST',
            dataType : "json",
            contentType: "application/json",
          success:  function(data){
            var str = '';
            for(i=0;i<data.products.length;i++){
                // var url = data.products[i]['image_url'];
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
                var name = data.products[i]['product_name'];
                var sale_quantity = data.products[i]['sale_quantity'];
                var rank = data.products[i]['rank'];
                var sku = data.products[i]['sku'];
                // if(url == ''){
                //   if(langCode == 'en'){
                //     url = "static/src/imgs1/temp_img.png"
                //   }else{
                //     url = "static/src/imgs1/temp.png"
                //   }
                // }
                  
                str += '<div class="div">\
                  <img src='+ url+'>\
                  <p>'+ sku +'</p>\
                  <p class="name">'+ name +'</p>\
                  <div>\
                    <span class="sales"><span tkey="qty">'+ _LANG_SHOW['qty'] +'</span>:'+ sale_quantity +'</span>\
                  </div>\
                  </div>';
              }
            $('.ten_product').html(str);
          },
          error: function(){
          },
          complete: function(){
          },
          beforeSend: function(){}
      })

    /**
     * 判断是否全选中
     */
    function select_all() {
        var len = $(document).find('.near_store .body li input').length;
        for(var i = 0; i < len; i++){
            if(!$(document).find('.near_store .body li').eq(i).find('input').prop('checked')) {
                return false;
            }
        }
        return true;
    }

    /**
     * 计算选中多少个input
     */
    function select_nums() {
        var len = $(document).find('.near_store .body li input').length,
            nums = 0;
        for(var i = 0; i < len; i++){
            if($(document).find('.near_store .body li').eq(i).find('input').prop('checked')) {
                nums++;
            }
        }
        return nums;
    }

    init();
    // lasted_seven_days_sales(LastedSevenDays);

    //本店库存、周边库存、同城库存----ajax请求
    function kucun(url, data, callback,index){
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: 'POST',
              dataType : "json",
              contentType: "application/json",
            success:  function(data){
              callback(data);
              if(index == 1 || index ==2){
                for(var i = 0;i<data.stock.length;i++){
                  $('.detail .footer .size table td').addClass('actives');
                  $('.detail .footer .size table td:nth-child(1)').removeClass('actives');
                }

                $('.detail .footer .size table td').each(function(){
                  if($(this).html() <= '0'){
                    $(this).removeClass('actives');
                  }
                })
              } 
            },
            error: function(){
            },
            complete: function(){
              $('.loader').hide();
              $('.loading').hide();
              $('table.active').show();
            },
            beforeSend: function(){}
        })
    }

    //本店
    $('.loader').show();
    $('.loading').show();
    kucun('/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_product_stock_qty', data_stock, our_store_kucun_callback2);

    var _LOCAL_STORE_DATA = {};
    function our_store_kucun_callback2(data){
        var stock = data.stock;
        for(var k in stock){
            _LOCAL_STORE_DATA[stock[k]['sku']] = stock[k];
        }
        our_store_kucun_callback(data);
    }

    //本店库存、周边库存、同城库存----回调函数
    function our_store_kucun_callback(data){
       
        $('.footer .size table thead tr').empty();

        var color_list = data.color_list,
            size_list = data.size_list,
            stock = data.stock;
        var thead = '<th></th>';
        //表头
        for(var i in color_list){
            thead += '<th data-id="' + color_list[i].id + '">' + color_list[i].name + '</th>';
        }
        $('.footer .size table thead tr').append(thead);

        format_table_body(color_list, size_list, stock);
    }

    /**
    *   格式化表格内容 + 添加表格内容到页面
    * color_list: 色值， size_list: 表头（尺寸）, stock: 表格格式化前的内容数据
    */
    function format_table_body(color_list, size_list, stock){
        $('.footer .size table tbody').empty();
        var tbody_list = [], tbody = '';
        for(var i in size_list){
            tbody_list[i] = {}; //每一行都是一个对象，color_name: 颜色名, data: 具体库存数据(stock)
            tbody_list[i]['color_name'] = size_list[i]['name'];
            tbody_list[i]['data'] = [];
            for(var j in color_list){
                for(var k in stock){
                    if(stock[k].size == size_list[i].id && stock[k].color == color_list[j].id){
                        tbody_list[i]['data'][j] = stock[k];
                    }
                }
            }
        }
        for(var i in tbody_list){
            tbody += '<tr><td>' + tbody_list[i]['color_name'] + '</td>';
            for(var j in tbody_list[i]['data']){
                if(tbody_list[i]['data'][j]['sku'] != '/'){
                    tbody += '<td data-color="' + tbody_list[i]['data'][j]['color'] + '" data-quantity="' + tbody_list[i]['data'][j]['quantity'] + '" data-sku="' + tbody_list[i]['data'][j]['sku'] + '" data-size="' + tbody_list[i]['data'][j]['size'] + '">' + tbody_list[i]['data'][j]['quantity'] + '</td>';
                }else{
                    tbody += '<td class="no_store" data-color="' + tbody_list[i]['data'][j]['color'] + '" data-quantity="' + tbody_list[i]['data'][j]['quantity'] + '" data-sku="' + tbody_list[i]['data'][j]['sku'] + '" data-size="' + tbody_list[i]['data'][j]['size'] + '" >--</td>';
                }
            }
            tbody += '</tr>';
        }

        $('.footer .size table tbody').append(tbody);
        init_td_click();
    }




    function init_td_click(){

        $('.footer table tbody td:not(:first-child)').click(function(e){
          var sku = e.target.dataset.sku;
          var quantity = e.target.dataset.quantity;
          var first_not_popup = 0;
          var index = $(this).index(); 
          td_stock = $(e.target).html();
          td_size = $(this).parents().eq(0).find('td:first-child').text();
          td_color = $('table tr:first-child').find('th').eq(index).text();
            if(first_not_popup == 0 || $(this).hasClass('no_store') ){
                return ;
            }
            if($(this).html() <= '0'){
              return;
            }
            $('.bg_wrap').show();
            $('.checkbox_lists').show();
            $('.kucun').show();
            $('.footer table td').removeClass('active');
            $(this).addClass('active');
            if(first_not_popup == 1){
              single_product_kucun(
                  '/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_product_stock_detail',
                  {shop_id: shop_id, sku: sku, detail_type: 'neighbour'},
                  popup_around_or_same_city
                  );
            }else if(first_not_popup == 2){
                single_product_kucun(
                    '/nt_pos/web_mobile/api?object=nt.pos.html&method=shop_product_stock_detail',
                    {shop_id: shop_id, sku: sku, detail_type: 'superior_office'},
                    popup_around_or_same_city
                    );
            }

        })
    }
})



