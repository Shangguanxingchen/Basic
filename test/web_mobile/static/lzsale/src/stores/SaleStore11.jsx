var Reflux = require('reflux');
var SaleAction = require('../actions/SaleAction.jsx');
var helper = require('../util/helper.jsx');
var objectAssign = require('object-assign');
var $ = require('jquery');

// var One = {};
var SaleStore = Reflux.createStore({
	data:{
		saleIndicator:{shop_id:'',date:'',type:'',signature:_s},
		new_saleIn:{},
		tongHuan:{shop_id:'',date:'',type:'',signature:_s},
		new_tong:{},
		orderCount:{shop_id:'',date:'',type:'',signature:_s},
		new_ordercount:{},
		vipCount:{shop_id:'',date:'',type:'',signature:_s},
		new_vip:{},
		bagRate:{shop_id:'',date:'',type:'',signature:_s},
		new_bagrate:{},
		saleTrend:{shop_id:'',date:'',type:'',signature:_s},
		new_saletrend:{},
		saleRank:{shop_id:'',date:'',type:'',signature:_s},
		new_salerank:[],
		saleEle:{shop_id:'',date:'',type:'',signature:_s},
		new_saleele:[],


		sales:{date:'',shop_id:'',type1:'day',type2:'',type3:'',signature:_s},
		month_trend:[],//销售走势
		employee:[],//员工销售统计
		rank:[],//大类销售排行
		max_min:{},
		getRank:{shop_id:'',date:'',type:'',signature:_s},//区排名
		new_getrank:''
	},
	listenables:[SaleAction],
	
	onSaleIndicator:function(data){//111
		var self =this;
		var params = this.data.saleIndicator = objectAssign(this.data.saleIndicator,data);
		helper.request('report.adapter.pos.html','get_sale_indicator',params)
		.done(function(d){
			sessionStorage.setItem('one', '1')
			self.data.new_saleIn = d.data;
			self.trigger(self.data);
			var _item ,_item2,_item3 ;
			switch(data.type){
			  case 'day':
			    _item = 'select_day';
			    One.select_day = d.data;
			  break;
			  case 'week':
			  	_item2 = 'select_week';
			    One.select_week = d.data;
			  break;
      	case 'month':
        	_item3 = 'select_month';
			    One.select_month = d.data;
        break;
			}
			sessionStorage.setItem(_item,JSON.stringify(d.data) );
			sessionStorage.setItem(_item2,JSON.stringify(d.data));
			sessionStorage.setItem(_item3,JSON.stringify(d.data));
		})
		.always(function(d){
			sessionStorage.setItem('one', '1')
			self.trigger(null);
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
			
		})


	},
	onTongHuan:function(data){//111
		var self =this;
		var params = this.data.tongHuan = objectAssign(this.data.tongHuan,data);
		helper.request('report.adapter.pos.html','get_tong_huan_ratio',params)
		.done(function(d){
			sessionStorage.setItem('two', '1')
			self.data.new_tong = d.data;
			self.trigger(self.data);
			var _item_tong ,_item2_tong,_item3_tong ;
			switch(data.type){
			  case 'day':
			    _item_tong = 'select_day_tong';
			    One.select_day_tong = d.data;
			  break;
			  case 'week':
			  	_item2_tong = 'select_week_tong';
			  	One.select_week_tong = d.data;

			  break;
      	case 'month':
        	_item3_tong = 'select_month_tong';
        	One.select_month_tong = d.data;

        break;
			}
			sessionStorage.setItem(_item_tong,JSON.stringify(d.data));
			sessionStorage.setItem(_item2_tong,JSON.stringify(d.data));
			sessionStorage.setItem(_item3_tong,JSON.stringify(d.data));
		})
		.always(function(d){
			sessionStorage.setItem('two', '1')
			self.trigger(null);
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
			// console.log('fali',d)
		})
	},
	onOrderCount:function(data){//111
		var self = this;
		var params = this.data.orderCount = objectAssign(this.data.orderCount,data);
		helper.request('report.adapter.pos.html','get_order_count',params)
		.done(function(d){
			sessionStorage.setItem('three', '1')
			self.data.new_ordercount = d.data;
			self.trigger(self.data);
			var _item_order ,_item2_order,_item3_order ;
			switch(data.type){
			  case 'day':
			    _item_order = 'select_day_order';
			    One.select_day_order = d.data;
			  break;
			  case 'week':
			  	_item2_order = 'select_week_order';
			  	One.select_week_order = d.data;

			  break;
      	case 'month':
        	_item3_order = 'select_month_order';
        	One.select_month_order = d.data;

        break;
			}
			sessionStorage.setItem(_item_order,JSON.stringify(d.data));
			sessionStorage.setItem(_item2_order,JSON.stringify(d.data));
			sessionStorage.setItem(_item3_order,JSON.stringify(d.data));
		})
		.always(function(d){
			sessionStorage.setItem('three', '1')
			self.trigger(null);
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
	onVipCount:function(data){//111
		var self = this;
		var params = this.data.vipCount = objectAssign(this.data.vipCount,data);
		helper.request('report.adapter.pos.html','get_new_vip_count',params)
		.done(function(d){
			sessionStorage.setItem('four', '1')
			self.data.new_vip = d.data;
			self.trigger(self.data);
			var _item_vip ,_item2_vip,_item3_vip ;
			switch(data.type){
			  case 'day':
			    _item_vip = 'select_day_vip';
			    One.select_day_vip = d.data;
			  break;
			  case 'week':
			  	_item2_vip = 'select_week_vip';
			  	One.select_week_vip = d.data;

			  break;
      	case 'month':
        	_item3_vip = 'select_month_vip';
        	One.select_month_vip = d.data;

        break;
			}
			sessionStorage.setItem(_item_vip,JSON.stringify(d.data));
			sessionStorage.setItem(_item2_vip,JSON.stringify(d.data));
			sessionStorage.setItem(_item3_vip,JSON.stringify(d.data));
		})
		.always(function(d){
			sessionStorage.setItem('four', '1')
			self.trigger(null);
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
	// onGetRank:function(data){
	// 	var self =this;
	// 	var params = this.data.getRank = objectAssign(this.data.getRank,data);
	// 	helper.request('report.adapter.pos.html','get_shop_rank',params)
	// 	.done(function(d){
	// 		self.data.new_getrank = d.data;
	// 		self.trigger(self.data);
	// 		var _item_rank ,_item2_rank,_item3_rank ;
	// 		switch(data.type){
	// 		  case 'day':
	// 		    _item_rank = 'select_day_rank';
	// 		    One.select_day_rank = d.data;
	// 		  break;
	// 		  case 'week':
	// 		  	_item2_rank = 'select_week_rank';
	// 		  	One.select_week_rank = d.data;

	// 		  break;
  //     	case 'month':
  //       	_item3_rank = 'select_month_rank';
  //       	One.select_month_rank = d.data;

  //       break;
	// 		}
	// 		sessionStorage.setItem(_item_rank,JSON.stringify(d.data));
	// 		sessionStorage.setItem(_item2_rank,JSON.stringify(d.data));
	// 		sessionStorage.setItem(_item3_rank,JSON.stringify(d.data));

	// 	})
	// 	.always(function(d){
	// 		sessionStorage.setItem('nine', '1')
	// 		self.trigger(null);
	// 	})
	// 	.fail(function(d){
	// 		if(d.responseJSON.code == -11){
	// 			if(typeof js_bridge == 'object'){

	//         js_bridge.callHandler('webviewForceRefresh', 
	//             {   
	//             }, function(response) {
	//         })
	// 			}
	// 		}
	// 		console.log('fali',d)
	// 	})
		
	// },
	onBagRate:function(data){//111
		var self = this;
		var params = this.data.bagRate = objectAssign(this.data.bagRate,data);
		helper.request('report.adapter.pos.html','get_bag_rate',params)
		.done(function(d){
			sessionStorage.setItem('five', '1')
			self.data.new_bagrate = d.data;
			self.trigger(self.data);

			var _item_rate ,_item2_rate,_item3_rate ;
			switch(data.type){
			  case 'day':
			    _item_rate = 'select_day_rate';
			    One.select_day_rate = d.data;
			  break;
			  case 'week':
			  	_item2_rate = 'select_week_rate';
			  	One.select_week_rate = d.data;

			  break;
      	case 'month':
        	_item3_rate = 'select_month_rate';
        	One.select_month_rate = d.data;

        break;
			}
			sessionStorage.setItem(_item_rate,JSON.stringify(d.data));
			sessionStorage.setItem(_item2_rate,JSON.stringify(d.data));
			sessionStorage.setItem(_item3_rate,JSON.stringify(d.data));
		})
		.always(function(d){
			sessionStorage.setItem('five', '1')
			self.trigger(null);
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
	onSaleEle:function(data){//111
		var self = this;
		var params = this.data.saleEle = objectAssign(this.data.saleEle,data);
		helper.request('report.adapter.pos.html','get_employee_rank',params)
		.done(function(d){
			$('.bg_wrap2').hide()
			$('.circle_loading1').hide();
			sessionStorage.setItem('six', '1')
			self.data.new_saleele = d.data;
			self.trigger(self.data);
			var _item_ele ,_item2_ele,_item3_ele ;
			switch(data.type){
			  case 'day':
			    _item_ele = 'select_day_ele';
			    One.select_day_ele = d.data;
			  break;
			  case 'week':
			  	_item2_ele = 'select_week_ele';
			  	One.select_week_ele = d.data;
			  break;
      	case 'month':
        	_item3_ele = 'select_month_ele';
        	One.select_month_ele = d.data;
        break;
			}
			sessionStorage.setItem(_item_ele,JSON.stringify(d.data));
			sessionStorage.setItem(_item2_ele,JSON.stringify(d.data));
			sessionStorage.setItem(_item3_ele,JSON.stringify(d.data));
		})
		.always(function(d){
			$('.bg_wrap2').hide()
			$('.circle_loading1').hide();
			sessionStorage.setItem('six', '1')
			self.trigger(null);
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
	// onSaleTrend:function(data){
	// 	var self = this;
	// 	var params = this.data.saleTrend = objectAssign(this.data.saleTrend,data);
	// 	helper.request('report.adapter.pos.html','get_sale_trend',params)
	// 	.done(function(d){
	// 		sessionStorage.setItem('seven', '1')
	// 		$('.circle_loading2').hide();
	// 		self.data.new_saletrend = d.data;
	// 		self.trigger(self.data);

	// 		var _item_trend = 'select_trend';
	// 		One.select_trend = d.data;

	// 		sessionStorage.setItem(_item_trend,JSON.stringify(d.data));
	// 	})
	// 	.always(function(d){
	// 		sessionStorage.setItem('seven', '1')
	// 		$('.circle_loading2').hide();
	// 		self.trigger(null);
	// 	})
	// 	.fail(function(d){
	// 		if(d.responseJSON.code == -11){
	// 			if(typeof js_bridge == 'object'){

	//         js_bridge.callHandler('webviewForceRefresh', 
	//             {   
	//             }, function(response) {
	//         })
	// 			}
	// 		}
	// 		console.log('fali',d)
	// 	})
	// },
	// onSaleRank:function(data){
	// 	var self = this;
	// 	var params = this.data.saleRank = objectAssign(this.data.saleRank,data);
	// 	helper.request('report.adapter.pos.html','get_category_rank',params)
	// 	.done(function(d){
	// 		$('.bg_wrap3').hide();
	// 		$('.circle_loading3').hide();
	// 		sessionStorage.setItem('eight', '1');
	// 		self.data.new_salerank = d.data;
	// 		self.trigger(self.data);

	// 		var _item_salerank ,_item2_salerank,_item3_salerank ;
	// 		switch(data.type){
	// 		  case 'day':
	// 		    _item_salerank = 'select_day_salerank';
	// 		    One.select_day_salerank = d.data;
	// 		  break;
	// 		  case 'week':
	// 		  	_item2_salerank = 'select_week_salerank';
	// 		  	One.select_week_salerank = d.data;

	// 		  break;
  //     	case 'month':
  //       	_item3_salerank = 'select_month_salerank';
  //       	One.select_month_salerank = d.data;

  //       break;
	// 		}
	// 		sessionStorage.setItem(_item_salerank,JSON.stringify(d.data));
	// 		sessionStorage.setItem(_item2_salerank,JSON.stringify(d.data));
	// 		sessionStorage.setItem(_item3_salerank,JSON.stringify(d.data));
	// 	})
	// 	.always(function(d){
	// 		sessionStorage.setItem('eight', '1');
	// 		$('.bg_wrap3').hide();
	// 		$('.circle_loading3').hide();
	// 		self.trigger(null);
	// 	})
	// 	.fail(function(d){
	// 		if(d.responseJSON.code == -11){
	// 			if(typeof js_bridge == 'object'){

	//         js_bridge.callHandler('webviewForceRefresh', 
	//             {   
	//             }, function(response) {
	//         })
	// 			}
	// 		}
	// 		console.log('fali',d)
	// 	})

	// },
	
	// onSale:function(data){
	// 	var self = this;
	// 	var params = this.data.sales = objectAssign(this.data.sales,data);
	// 	helper.request('report.adapter.pos.html','shop_sale_status_new',params)
	// 	.done(function(d){
	// 		$('.ant-spin-nested-loading ').removeClass('ant-spin-nested-loading');
	// 		$('.ant-spin.ant-spin-spinning').removeClass('ant-spin-spinning');
	// 		self.data.max_min = d.max_min;
	// 		self.data.sale = d.sale_data;
	// 		self.data.month_trend = d.month_trend;
	// 		self.data.employee = d.employee_top5;
	// 		self.data.rank = d.category_rank;
	// 		self.trigger(self.data);

  //   	var _item ,_item2,_item3 ;
	// 		switch(data.type1){
	// 		  case 'day':
	// 		    _item = 'select_day';
	// 		  break;
	// 		  case 'week':
	// 		  	_item2 = 'select_week';
	// 		  break;
  //     	case 'month':
  //       	_item3 = 'select_month';
  //       break;
	// 		}
	// 		sessionStorage.setItem(_item,JSON.stringify(d.sale_data));
	// 		sessionStorage.setItem(_item2,JSON.stringify(d.sale_data));
	// 		sessionStorage.setItem(_item3,JSON.stringify(d.sale_data));

	// 		var _Two ,_Two2,_Two3 ;
	// 		switch(data.type2){
	// 		  case 'day':
	// 		    _Two = 'select_day_two';
	// 		  break;
	// 		  case 'week':
	// 		  	_Two2 = 'select_week_two';
	// 		  break;
  //     	case 'month':
  //       	_Two3 = 'select_month_two';
  //       break;
	// 		}
	// 		sessionStorage.setItem(_Two,JSON.stringify(d.employee_top5));
	// 		sessionStorage.setItem(_Two2,JSON.stringify(d.employee_top5));
	// 		sessionStorage.setItem(_Two3,JSON.stringify(d.employee_top5));

	// 		var _Three ,_Three2,_Three3 ;
	// 		switch(data.type3){
	// 		  case 'day':
	// 		    _Three = 'select_day_three';
	// 		  break;
	// 		  case 'week':
	// 		  	_Three2 = 'select_week_three';
	// 		  break;
  //     	case 'month':
  //       	_Three3 = 'select_month_three';
  //       break;
	// 		}
	// 		sessionStorage.setItem(_Three,JSON.stringify(d.category_rank));
	// 		sessionStorage.setItem(_Three2,JSON.stringify(d.category_rank));
	// 		sessionStorage.setItem(_Three3,JSON.stringify(d.category_rank));
	// 		$('.tab li.click').removeClass('click');
	// 	})
	// }
	
})
module.exports = SaleStore;