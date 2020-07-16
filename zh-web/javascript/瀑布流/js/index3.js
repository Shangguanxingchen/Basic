!function() {
	/*1获取浏览器宽和高*/
    var cw = document.documentElement.clientWidth;
    
    
    /*2计算容器内最多可以容纳多少个DIV*/
    var default_width = 280+4;
    var div_num = Math.floor(cw/default_width);

    
    /*3剩余空间设置居中*/
    var wp = document.getElementById('wp');
    wp.style.width = default_width*div_num + 'px';
    wp.style.background = '#ccc';
    wp.style.margin = "0 auto";
    
    /*4循环创建元素*/
    createElement();
    function createElement() {
    	for (var i=0; i<7; i++) {
            var Imgs = document.createElement('img');
            Imgs.src = "./img/" + i + ".jpg";
            var Divs = document.createElement('div');
            Divs.appendChild(Imgs);
            
            /*8跟随内容*/
            wp.appendChild(Divs);
	    
        
            /*5初始化一个高度数组*/
            var arrHeight = [];
            
            arrHeight[i] = Divs[i].offsetHeight;
            //获取arrHeight最小值
            //var minH = Math.min.apply(null,arrHeight);
            /*6获得高度数组中最小的那列*/
            var minIndex = checkHeight(arrHeight);
            /*7设置DIV定位*/
            aDiv.style.position = "absolute";
            aDiv.style.top = arrHeight[minIndex].offsetHeight + 'px';
            aDiv.style.left = minIndex * default_width + 'px';
            //Divs.cssText = 'position:absolute;top:'+arrHeight[minIndex].offsetHeight+'px;left:'+minIndex * default_width+'px;';
            /*9更新高度数组*/
            arrHeight[minIndex] += Divs.offsetHeight;
        
        }
    }; 

    

    
}();

window.onscroll = function() {
    var st = document.documentElement.scrollTop || document.body.scrollTop;
    var ch = document.documentElement.clientHeight;
    var sh = document.body.height;
    if(st+ch > sh) {
        createElement();
    }
};

function checkHeight(obj) {
    var height = 100000,
    index = 0;
    
    for(var a=0; a<obj.length; a++) {
        var new_height = obj[a];
        if(new_height < height) {
            height = new_height;
            index = a;
        }
    }
    return index;
};