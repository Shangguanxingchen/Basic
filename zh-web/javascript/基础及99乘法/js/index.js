


/*var total=0;
for(var i=1; i<=100; i++) {
    total += i
    console.log(i);
}
console.log(total);*/

/*for
    求偶数*/
var total=0;
for(var i=1; i<=100; i++) {
    if(i % 2 ==0) {
   total += i 
   }
}
console.log(total);

 var total=0;
for(var i=2; i<=100; i+=2) {
    if(i % 2 ==0) {
   total += i 
   }
}
console.log(total);




   /* 求奇数*/
var total=0;
for(var i=1; i<=100; i++) {
    if(i % 2 !=0) {
   total += i
   }
}
console.log(total);

var total=0;
for(var i=1; i<=100; i+=2) {
    if(i % 2 !=0) {
   total += i
   }
}
console.log(total);



/*while
    求偶数*/
var total=0;
var i=1;
while (i<=100) {
    if(i % 2 ==0) {
    total += i;
  }
   i++; 
}
console.log(total);

/*do  while
    求偶数*/
var total=0;
var i=1;
do {
   if(i % 2 ==0) 
    total += i; 
   i++  
}   while (i<=100) ;
    
console.log(total);

var sum=0;
var s="abddefddkjiddkejskdiud";
var len=s.length;
for (var i=0; i<=len; i++) {
    if(s.charAt(i) == "d") {
    sum ++
    }
}  
console.log(sum);



var total=1;
for (var i=5; i>0 ;i--) {
    total*=i
}console.log(total);


/*function text() {
    alert("text");
}
text();

var text2=function () {
    alert("text2");
};
text2 ();*/

var getTotal=function(to) {
    var total=0;
    for (i=30; i<=to; i++){
        total += i;
    }
    return total;

};
var r = getTotal(90);
console.log(r);

var getTotal=function(to) {
    var total=0;
    for (i=3; i<=to; i++){
        if( i % 2 ==0) {
        total += i;
       }
    }
    return total;

};
var r = getTotal(50);
console.log(r);


/*任意数阶乘*/
var jiecheng = function(to) {
    var total=1;
    for (i=to; i>0; i--) {
        total *= i
    }
    return total;
};
var to=4;
var r=jiecheng(to);
console.log(r);


/*99乘法表*/
function do99() {
    document.write("<div>");

    for(j=1; j<=9; j++) {
        for(i=1; i<=j; i++) {
            document.write("<span>" + i + "&times;" + j + "=" + j * i + "</span>");
        }
        document.write("<br>");
    }

    document.write("</div>");

}
do99();


/*var obj = new Object();
var obj = new Object;*/
var obj ={
    name: "联想",
    type: "笔记本",
    price: 5900,
    getName:  function() {
    alert(this.price);
  }
};
/*console.log(obj.type);*/
/*obj.getName();*/
/*console.log(obj);*/
for (var key in obj) {
    console.log(obj[key]);
}


/*************************
2008年8月8日是星期几
******************************/
function getDate(date) {
   var d = new Date();
       d.setFullYear(2008);
       d.setMonth(7);
       d.setDate(8);
       //d.getDay();

   return d.getDay();
}

console.log(getDate());

/***********************************************
返回类似2016年07月21日 16:38:12 的日期时间格式
**************************************************/
function formatDate(date,isDateTime) {
   var y, M, d, h, m, s;
   y = date.getFullYear(),
   M = date.getMonth() + 1,
   d = date.getDate(),
   h = date.getHours(),
   m = date.getMinutes(),
   s = date.getSeconds();
   D = date.getDay();

   if(isDateTime) {
       return y + "年" + fill0(M) + "月" + fill0(d) + "日 " + fill0(h) + ":" + fill0(m) +":" + fill0(s);
   } else {
       return y + "年" + fill0(M) + "月" + fill0(d) + "日";
   }
}
function fill0(num) {
   return num < 10 ? "0" + num : num;
}
var d = formatDate(new Date(),true);
console.log(d);


//////////////////////上个月第一天//////////////////////
function getFirstDay() {
   var d = new Date();
   d.setMonth(d.getMonth() - 1);
   d.setDate(1);

   return formatDate(d);
}
var dd = getFirstDay();
console.log (dd);


//////////////////////上个月最后一天//////////////////////
function getLastDay() {
   var d = new Date();
   d.setDate(1);
   d.setDate(d.getDate(1) - 1);

   return formatDate(d);
}
var dd = getLastDay();
console.log (dd);

/////////下个月的今天是周几/////////////
function getNext() {
   var d = new Date();
   d.setMonth(d.getMonth() + 1);
   d.getDay();
   return d.getDay();
}
var dd = getNext();
console.log (dd);


///////////////////////////////
var mydiv = document.getElementById('zh');

mydiv.innerHTML = '<h1>测试一下</h1>'
console.log(mydiv);




////////////////////////////////////