window.onload = function() {
    function setCookies(name, value, opts={}) {
        let cookieData = `${name}=${value};`;
        for(let key in opts) {
            optstr = `${key}=${opts[key]};`
            cookieData += optstr;
        }
        document.cookie = cookieData;
    };
    function  getCookie(name) {
        let cookiesArr = document.cookie.split("; ");
        for(let i=0; i<cookiesArr.length; i++) {
            cookieArr = cookiesArr[i].split("=");
            if(cookieArr[0] == name) {
                return cookieArr[1];
            }
        }
        return "";
    };
}