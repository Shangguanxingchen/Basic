!function(window,document,$,undefined) {

	/*$('#datetimepicker').datetimepicker({
		format: 'yyyy-mm-dd',
        minView:'month',
        language: 'zh-CN',
        autoclose:true,
	});*/
  $("#datetimeStart").datetimepicker({
    format: 'yyyy-mm-dd',
    minView:'month',
    language: 'zh-CN',
    autoclose:true,
    //startDate:new Date()
  }).on("changeDate",function(ev){  //值改变事件
    if(ev.date){
      $("#datetimeEnd").datetimepicker('setStartDate', new Date(ev.date.valueOf()));
    }else{
      $("#datetimeEnd").datetimepicker('setStartDate',null);
    }
  });
  $("#datetimeEnd").datetimepicker({
    format: 'yyyy-mm-dd',
    minView:'month',
    language: 'zh-CN',
    autoclose:true,
    //startDate:new Date()
  }).on("changeDate",function(ev){
    if(ev.date){
      $("#datetimeStart").datetimepicker('setEndDate', new Date(ev.date.valueOf()));
    }else{
      $("#datetimeStart").datetimepicker('setEndDate',new Date());
    }
  });         

  var data = [
        {"xianjin": 1, "card": 1, "wechart": "33","alipay":44, "yhlj":66, "total":888888888.88},
        {"xianjin": 2, "card": 1, "wechart": "33","alipay":44, "yhlj":66, "total":88},
        {"xianjin": 3, "card": 1, "wechart": "33","alipay":44, "yhlj":66, "total":88},
        {"xianjin": 4, "card": 1, "wechart": "33","alipay":44, "yhlj":66, "total":88},
        {"xianjin": 6, "card": 1, "wechart": "33","alipay":44, "yhlj":66, "total":88},
        {"xianjin": 5, "card": 1, "wechart": "33","alipay":44, "yhlj":66, "total":88}
      ];
  var params = {};

	var init = function() {
		initEvent();
	};

	var initEvent = function() {
		$('#query').on('click',onQueryBtnClick);
    $('#configBtn').on('click',onConfigBtnClick);
    $('#conformThead').on('click','th',orderByData);
	};

  var onConfigBtnClick = function() {
    var $configchecked = $('#wp input:checked');
    var params = [];
    for(var i=0; i<$configchecked.length; i++) {
      params.push($configchecked[i].value);
    };
    localStorage.setItem('key', JSON.stringify(params));
    location.href = "form.html";
  };

	var onQueryBtnClick = function() {
		var $shopCode = $('#shopCode').val(),
			  $datetimepicker = $('#datetimepicker').val();
    obj = JSON.parse(localStorage.getItem('key'));
    $('.header').html($shopCode + "商场确认函");
		getTableList(data);
	};

  var getTableList = function(data) {
    var trs = [];
    if (data.length == 0) {
      alert('暂无查询结果，请更换店铺重试！');
      return;
    }
    //获取表头
    var theadData = Object.keys(data[0]);
    var ths = ['<tr>'];
    for(var i=0; i<theadData.length; i++) {
      ths.push(
        '<th key='+"xianjin"+'>',theadData[i],'</th>',
      )
    }
    ths.push('</tr>')
    $('#conformThead').html(ths.join(''));
    //获取内容
    for(var j=0; j<data.length; j++) {
      trs.push('<tr id='+data[j].id+'>');
      for(var k=0; k<theadData.length; k++) {
        trs.push(
          '<td>',Number.formatAmount(data[j][theadData[k]]),'</td>',
        )
      };
      trs.push('</tr>');
    };
    trs.push(
      '<tr>',
        '<td class="t_a" colspan="2">',"合计",'</td>',
        '<td></td>',
        '<td></td>',
        '<td></td>',
        '<td></td>',
      '</tr>'
    );
    $('#conformTbody').html(trs.join(''));
  };

  //时间排序
  var orderByData = function() {
    var sort_ary;
    if ($(this).attr('sort') == 'desc') {
        //  逆序排序
        sort_ary = data.sort(compare($(this).attr('key'),-1));
        getTableList(sort_ary);
        $(this).attr('sort', 'asc'); 
    } else {
        //  正序排序
        sort_ary = data.sort(compare($(this).attr('key'),1));
        getTableList(sort_ary);
        $(this).attr('sort', 'desc');
    }
  };
  var compare = function(prop,type) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
      }
      if (val1 < val2) {
          return 0-type;
      } else if (val1 > val2) {
          return type;
      } else {
          return 0;
      }            
    } 
  };
  //千位符
  var Number = {
    formatAmount:function(num) {
      if(!num){
          return 0;
      }
      var num_top  = "";   
      var num_tail = "";
      var result = "";
      var re = new RegExp("^(-?\\d+)(\\.\\d+)$"); //判断是否是浮点数 
      if (re.test(num)){
        strSum = new String(num);
        if(strSum.indexOf(".") > -1) {                 
          num_tail = strSum.split(".")[1];  
          num_top = strSum.split(".")[0];
        }
        while (num_top.length > 3) {
          result = ',' + num_top.slice(-3) + result;
          num_top = num_top.slice(0, num_top.length - 3);
        }
        if (num_top) { 
          result = num_top + result +'.'+ num_tail; 
        }
      }else{
        num_top = new String(num);
        while (num_top.length > 3) {
          result = ',' + num_top.slice(-3) + result;
          num_top = num_top.slice(0, num_top.length - 3);
        }
        if (num_top) { 
          result = num_top + result; 
        }
      }
      return result;
    }
  };


	init();
}(window,document,jQuery);