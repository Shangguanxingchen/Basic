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


    function _share(bridge,device){
        js_bridge = bridge;
        // 返回
        bridge.registerHandler('goBackJavascriptHandler', function(data, responseCallback) {
            bridge.callHandler('webviewCloseCallback', 
                {   
                }, function(response) {

            })
        })

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
    