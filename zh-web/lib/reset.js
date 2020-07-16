<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Document</title>
    <style>
    </style>
</head>
<body>
    <div>hello</div>
    <script>
        /*方案一*/
        (function(window,document,$,undefined) {
            var obj = {
                init: function() {
                    this.initEvent();
                    this.initTable();
                    this.initDatePicker();
                    this.renderClassifySel();
                },
                initEvent: function(){
                    $('#newBookBtn').on('click', this.onNewBookBtnClick);
                    $('#saveBtn').on('click', this.onSaveBtnClick);
                }
            };

            obj.init();
        })(window,document,jQuery)

        /*方案二*/
        !function(window,document,$,undefined) {
            var init = function() {
                bindEvent();
            };
            var bindEvent = function() {
                $('#newBookBtn').on('click', onNewBookBtnClick);
                $('#saveBtn').on('click', onSaveBtnClick);
            }

            $(document).ready(init);
        }(window,document,jQuery)
        
        /*移动端*/
        (function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) { return; }
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
        
        /*document.addEventListener("touchstart", function(e) {
          e.preventDefault();
        })*/
        window.onload = function() {
          var wp = document.querySelector(".wp");
          wp.addEventListener("touchmove", function(e) {
            console.log(e.touches);
          })
        }
    </script>
</body>
</html>