// 店员指标
var Reflux = require('reflux');
var IndiAction = require('../actions/IndiAction.jsx');
var helper = require('../util/helper.jsx');
var objectAssign = require('object-assign');

var IndiStore = Reflux.createStore({
	data:{
		param_month:{
			shop_id:'',
			year:'',
			month:'',
			signature:_s
		},
		month_indicator:'',//月指标
		param_day:{
			shop_id:'',
			day:'',
			signature:_s
		},
		day_indicator:'',//日指标
		param_year:{
			shop_id:'',
			date:'',
			type:'',
			signature:_s
		},
		week_indicator:'',//周指标
		param_week:{
			shop_id:'',
			signature:_s
		},
		year_indicator:'',//年指标
		param_member:{
			shop_id:'',
			day:'',
			signature:_s
		},
		member:{}, //员工指标
		members:[],
		param_icon:{
			shop_id:'',
			day:'',
			type:'',
			employee_id:'',
			signature:_s
		},
		membericon:[],
		header:[],
		shop_list:{},//门店详情
		shoplist:{
			type:'',
			date:'',
			shop_id:'',
			signature:_s
		},
		max_min:{},
		join:'',
	},
	listenables:[IndiAction],
	
	onGetDay:function(data){
		var self = this;
		var params = this.data.param_day = objectAssign(this.data.param_day,data);
		helper.request('report.adapter.pos.html','get_shop_day_sale_indicator_status',params)
		.done(function(d){
			sessionStorage.setItem('two_one', '1')
			self.data.day_indicator = d;
			self.trigger(self.data);
			Two.getDay = d;
		})
		.always(function(d){
			sessionStorage.setItem('two_one', '1')
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},
	onGetWeek:function(data){
		var self = this;
		var params = this.data.param_week = objectAssign(this.data.param_week,data);
		helper.request('report.adapter.pos.html','get_shop_week_sale_indicator_status',params)
		.done(function(d){
			sessionStorage.setItem('two_two', '1')
			self.data.week_indicator = d;
			self.trigger(self.data);
			Two.getWeek = d;
		})
		.always(function(d){
			sessionStorage.setItem('two_two', '1')
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},
	onGetMonth:function(data){
		var self = this;
		var params = this.data.param_month = objectAssign(this.data.param_month, data);
		helper.request('report.adapter.pos.html','get_shop_month_sale_indicator_status',params)
		.done(function(d){
			sessionStorage.setItem('two_three', '1')
			self.data.month_indicator = d;
			self.trigger(self.data);
			Two.getMonth = d;
		})
		.always(function(d){
			sessionStorage.setItem('two_three', '1')
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},
	onGetTrend:function(data){
		var self = this;
		var params = this.data.param_year = objectAssign(this.data.param_year,data);
		helper.request('report.adapter.pos.html','get_shop_sale_indicator_trend',params)
		.done(function(d){
			$('.circle_loading1').hide();
			sessionStorage.setItem('two_four','1')
			sessionStorage.setItem('two_tab2', '1');
			var arr = [];
			for(let i in d.data){
				arr[i] = [];
				arr[i].push(d.data[i]['date']);
				arr[i].push(d.data[i]['indicator']);
				arr[i].push(d.data[i]['sold_amount']);
				arr[i].push(d.data[i]['indicator']);
				arr[i].push(d.data[i]['sold_amount']);
			}
			self.data.max_min = d.max_min;
			self.data.year_indicator = d.data;
			// self.data.year_indicator = arr;
			Two.getTrend = d;
			var _item ,_item2,_item3 ;
			switch(data.type){
			  case 'day':
			    _item = 'select_day_sale_i';
			    Two.getTrend_day = d;
			  break;
			  case 'week':
			    _item3 = 'select_week_sale_i';
			    Two.getTrend_week = d;
			  break;
      	case 'month':
        	_item2 = 'select_month_sale_i';
        	Two.getTrend_month = d;
        break;
			}
			sessionStorage.setItem(_item,JSON.stringify(d));
			sessionStorage.setItem(_item2,JSON.stringify(d));
			sessionStorage.setItem(_item3,JSON.stringify(d));
			self.trigger(self.data);
		})
		.always(function(d){
			sessionStorage.setItem('two_four','1')
			// self.trigger();
			sessionStorage.setItem('two_tab2', '1')
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},
	onGetMember:function(data){
		var self = this;
		var params = this.data.param_member = objectAssign(this.data.param_member,data);
		helper.request('report.adapter.pos.html','get_employee_month_sale_indicator_status',params)
		.done(function(d){
			$('.bg_wrap').hide();
			$('.circle_loading2').hide();
			sessionStorage.setItem('two_five','1');
			sessionStorage.setItem('two_tab1', '1');
			self.data.member = d;
			self.data.members = d;
			self.trigger(self.data);

			Two.getMember = d;

			var _item ,_item2,_item3 ;
			switch(data.type){
			  case 'day':
			    _item = 'select_day_i';
			    Two.select_day = d;
			  break;
			  case 'week':
			    _item3 = 'select_week_i';
			    Two.select_week = d;
			  break;
      	case 'month':
        	_item2 = 'select_month_i';
        	Two.select_month = d;
        break;
			}
			sessionStorage.setItem(_item,JSON.stringify(d));
			sessionStorage.setItem(_item2,JSON.stringify(d));
			sessionStorage.setItem(_item3,JSON.stringify(d));
		})
		.always(function(d){
			sessionStorage.setItem('two_five','1')
			sessionStorage.setItem('two_tab1', '1')
			$('.bg_wrap').hide();
			$('.circle_loading2').hide();
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},
	onGetMemberIcon:function(data){
		var self = this;
		var params = this.data.param_icon = objectAssign(this.data.param_icon,data);
		helper.request('report.adapter.pos.html','get_employee_sale_indicator',params)
		.done(function(d){
			$('.circle_loading_b').hide();
			self.data.join = d.join_date;
			self.data.membericon = d.records;
			self.data.header = d.table_headers;
			self.trigger(self.data);
			// Two.jion = d.join_date;
			// Two.membericon = d.records;
			// Two.helper = d.table_headers;
		})
		.always(function(d){
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},
	onGetShopList:function(data){
		var self = this;
		var params = this.data.shoplist = objectAssign(this.data.shoplist,data);
		helper.request('report.adapter.pos.html','get_shop_indicator_list',params)
		.done(function(d){
			$('.circle_loading_a').hide();
			self.data.shop_list = d;
			self.trigger(self.data);
			// Two.shop_list = d;
		})
		.always(function(d){
			self.trigger();
		})
		.fail(function(d){
			if(d.responseJSON.code == -11){
				if(typeof js_bridge == 'object'){

	        js_bridge.callHandler('webviewForceRefresh', 
	            {   
	            }, function(response) {
	        })
				}
			}
			console.log('fali',d)
		})
	},

})
module.exports = IndiStore;
