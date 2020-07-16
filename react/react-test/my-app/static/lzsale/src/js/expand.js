var app = {
    piwik_push: function (title) {
        _paq.push(['setDocumentTitle', title]);
        _paq.push(['trackPageView']);
    }
};

window.onload = function () {
    var startX = 0,
        startY = 0,
        endX = 0,
        endY = 0;
    document.ontouchstart = function (e) {
        startX = e.touches[0]['screenX']
        startY = e.touches[0]['screenY']
    }
    document.ontouchmove = function (e) {
        endX = e.changedTouches[0]['screenX']
        endY = e.changedTouches[0]['screenY']
        var x = endX - startX;
        var y = endY - startY;
        if(Math.abs(y) > 250){
            return false;
        }
    }
}