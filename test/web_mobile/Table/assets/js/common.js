    var js_bridge = '';
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }


    
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }
    var shop_id = getUrlParameter('shop_id') * 1;
    var flag = true, hide_timeout;
    // 通过sku获取详情（点击sku显示图片,url_only=1只返回图片）
    function getSku(sku,x,y,z){
        $('.tips').hide();
        clearTimeout(hide_timeout);
        
        if(flag){
            flag = false;
            $('#bg_img').show();
            $('#bg_img').click(function(){
                $('.tips').hide();
                $('#bg_img').hide();
            })
           $.ajax({
                url:"/nt_pos/web_mobile/api?object=nt.pos.html&method=product_detail_info",
                data:JSON.stringify({shop_id:shop_id,sku:sku,url_only:1}),
                type:'POST',
                dataType:"json",
                contentType:"application/json",
                success:function(data){
                    var url = '';
                    // if(data.thumbnail_url == ''){
                    //     if(data.image_url == ''){
                    //         url = "/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/temp.png"
                    //     }else{
                    //        url = data.image_url 
                    //     }
                    // }else{
                    //     url = data.thumbnail_url;
                    // }
                    if(data.image_url == ''){
                        if(data.thumbnail_url == ''){
                            url = "/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/temp.png"
                        }else{
                           url = data.thumbnail_url 
                        }
                    }else{
                        url = data.image_url;
                    }
                    
                    $('body .block_img').html('<div class="tips"><img src="'+url+'"/></div>');
                    
                    // add weixiumei #39699 2019/06/11
                    // 图片宽高从150px变为200px, 解决下面数据的弹出图片显示不全问题
                    if(window.innerHeight - y < 200){
                        y = window.innerHeight - 200
                    }
                    $('.tips').css({top:y-16,left:z-2});

                    hide_timeout = setTimeout(function(){
                        $('.tips').hide();
                        $('#bg_img').hide();
                        // $('#example_wrapper table tbody tr td:first-child').css('color','#1296db')
                    },9000)
                },
                error:function(d){
                    console.log('erro',d);
                },
                complete:function(){
                    flag = true;
                }
            })
        }
        

        // if(!!js_bridge){
        //     js_bridge.callHandler('getProductInfoCallback', 
        //     {code:sku}, function(response) {
        //         if(JSON.stringify(response) == "{}" || response.image_url == ''){
                    
        //         }else{
        //             sessionStorage.setItem('img',response.image_url)
        //         }
        //     })
        // }
        
    }

    function _share(bridge,device){
        js_bridge = bridge;
        // var sku = (!!sessionStorage.sku)? sessionStorage.sku:'';
        // js_bridge.callHandler('getProductInfoCallback', 
            // {code:sku}, function(response) {
            // sessionStorage.setItem('img','/nt_pos/web_mobile/static/lzsale/src/img/cuxiao/temp.png')
        // })

    }

    function init_jsbridge(){
        setupWebViewJavascriptBridge(function(bridge) {
            _share(bridge,'ios');
        })
        connectWebViewJavascriptBridge(function(bridge) {
            var uniqueId = 1
            _share(bridge,'android');
        })
    };

    $(document).ready(function(){
        init_jsbridge();
    })
    