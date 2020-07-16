var Reflux = require('reflux');
var WeekAction = require('../actions/WeekAction.jsx');
var helper = require('../util/helper.jsx');
var objectAssign = require('object-assign');

var WeekStore = Reflux.createStore({
	data:{
		shopData:{shop_id:'',start_date:'',end_date:'',signature:_s},
		new_shopdata:{},
		shopBasket:{shop_id:'',start_date:'',end_date:'',signature:_s},
		new_shopbasket:[],
		max_min:{},
		shopActive:{shop_id:'',start_date:'',end_date:'',signature:_s},
		new_shopactive:{},

		week:{
			shop_id:'',
			start_date:'',
			end_date:''
		},
		order:{
			shop_id:'',
			start_date:'',
			end_date:'',
			signature:_s
		},
		orderby:[],//排行
		brand_list:[],//品牌
		search_shopdata:{},
		search_thanshop:{},
		brand_data:[],
		target_brand_data:[],
		sale_analysis:[],//购物篮分析
		product:{
			shop_id:'',
			start_date:'',
			end_date:'',
			on_discount:'',
			signature:_s
		},
		products:{},//商品排行
		
		max:{}
	},
	listenables:[WeekAction],
	onShopData:function(data){
		$('.circle_loading1').show();
		var self =this;
		var params = this.data.shopData = objectAssign(this.data.shopData,data);
		helper.request('report.adapter.pos.html','shop_sale_data',params)
		.done(function(d){
			sessionStorage.setItem('search1', '1');
			sessionStorage.setItem('week_one','1')
			console.log($('.circle_loading1'))
			$('.circle_loading1').hide();
			console.log(sessionStorage.getItem('search1'))
			self.data.new_shopdata = d;
			self.trigger(self.data);
			Three.shopData = d;
		})
		.always(function(d){
			// $('.circle_loading5').hide();
			$('.circle_loading1').hide();
			sessionStorage.setItem('week_one','1')
			sessionStorage.setItem('search1', '1');
			self.trigger();
		})
		.fail(function(d){
			$('.circle_loading1').hide();
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
	onShopBasket:function(data){
		$('.circle_loading2').show();
		var self =this;
		var params = this.data.shopBasket = objectAssign(this.data.shopBasket,data);
		helper.request('report.adapter.pos.html','shop_sale_analysis',params)
		.done(function(d){
			sessionStorage.setItem('week_two','1');
			sessionStorage.setItem('search2', '1');
			self.data.new_shopbasket = d.sale_analysis;
			self.data.max_min = d.max_min
			self.trigger(self.data);
			$('.background').hide();
			$(".block_right").hide();
			$('.circle_loading2').hide();
			console.log($('.circle_loading2'))
    	$('.ant-spin-nested-loading ').removeClass('ant-spin-nested-loading');
			$('.ant-spin.ant-spin-spinning').removeClass('ant-spin-spinning');
			Three.shopBasket = d;
		})
		.always(function(d){
			sessionStorage.setItem('week_two','1');
			sessionStorage.setItem('search2', '1');
			$('.circle_loading2').hide();
			console.log($('.circle_loading2'))
			console.log('circle_loading2')
			// $('.background').hide();
    		// $(".block_right").hide();
			self.trigger();
		})
		.fail(function(d){
			$('.circle_loading2').hide();
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
	onShopActive:function(data){
		$('.circle_loading3').show();
		var self =this;
		var params = this.data.shopActive = objectAssign(this.data.shopActive,data);
		helper.request('report.adapter.pos.html','sale_promotion_analysis',params)
		.done(function(d){
			sessionStorage.setItem('week_three','1');
			sessionStorage.setItem('search3', '1');
			self.data.new_shopactive = d;
			$('.circle_loading3').hide();
			self.trigger(self.data);
			Three.shopActive = d;
		})
		.always(function(d){
			sessionStorage.setItem('week_three','1');
			sessionStorage.setItem('search3', '1');
			$('.circle_loading3').hide();
			self.trigger();
		})
		.fail(function(d){
			$('.circle_loading3').hide();
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

	onOrder:function(data){
		var self = this;
		var params = this.data.order = objectAssign(this.data.order,data);
		helper.request('report.adapter.pos.html','area_shop_sale_rank',params)
		.done(function(d){
			$('.circle_loading_a').hide();
			$('.block_right .content').show();
			$('.block_right .footer').show();
			$('.message').hide();
			self.data.orderby = d;
			self.trigger(self.data);
			$('.orderBy').removeClass('click');
		})
		.always(function(d){
			$('.circle_loading_a').hide();
		})
		.fail(function(d){
			$('.circle_loading_a').hide();
			$('.block_right .content').hide();
			$('.block_right .footer').hide();
			$('.message').show();
			if(!!!d.responseJSON){
				return;
			}
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
	onProduct:function(data){
		$('.circle_loading4').show();
		var self = this;
		var params = this.data.product = objectAssign(this.data.product,data);
		helper.request('report.adapter.pos.html','shop_report_product_sale_rank',params)
		.done(function(d){
			sessionStorage.setItem('week_four','1');
			sessionStorage.setItem('search4', '1');
			$('.circle_loading4').hide();
			self.data.max = d.max_min;
			self.data.products = d;
			self.trigger(self.data);
			var _item ,_item2;
			switch(data.on_discount){
			  case 0:
			    _item = 'tab1';
			  break;
			  case 1:
			  	_item2 = 'tab2';
			  break;
			}
			sessionStorage.setItem(_item,JSON.stringify(d));
			sessionStorage.setItem(_item2,JSON.stringify(d));
			Three.product = d;
		})
		.always(function(d){
			sessionStorage.setItem('week_four','1');
			sessionStorage.setItem('search4', '1');
			sessionStorage.setItem('week_tab','1');
			$('.circle_loading4').hide();
			self.trigger();
		})
		.fail(function(d){
			$('.circle_loading4').hide();
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
	onBrandList:function(data){
		var self = this;
		var params = this.data.order = objectAssign({"shop_id": ''}, data);
		helper.request('report.adapter.pos.html','shop_prod_brand_list',params)
		.done(function(d){
			$('.circle_loading_a').hide();
			$('.brand_list_right').show();
			self.data.brand_list = d.brand_list;
			self.trigger(self.data);
			// $('.orderBy').removeClass('click');
		})
		.always(function(d){
			$('.circle_loading_a').hide();
		})
		.fail(function(d){
			$('.circle_loading_a').hide();
			$('.brand_list_right').show();
			if(!!!d.responseJSON){
				return;
			}
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
	}

})
module.exports = WeekStore;