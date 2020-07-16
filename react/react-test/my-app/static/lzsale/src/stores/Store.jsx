var Reflux = require('reflux');
var StoreAction = require('../actions/StoreAction.jsx');
var helper = require('../util/helper.jsx');
var objectAssign = require('object-assign');

var Store = Reflux.createStore({
	data:{
		store:{shop_id:'',signature:_s},
		category:[],//库存大类
		season:[],//季节大类
		saletop:[],//sale_top10
		max_min:{},
		superior:[],//日销售与日库存比较
		properties:[],//top10详情
		max_mins:{},

		storeAll:{},
		
	},
	listenables:[StoreAction],
	onStoreCategory:function(data){
		var self = this;
		var params = this.data.store = objectAssign(this.data.store,data);
		helper.request('report.adapter.pos.html','shop_category_inventory',params)
		.done(function(d){
			sessionStorage.setItem('store_one','1')
			self.data.category = d.data;
			self.trigger(self.data);
			Four.category = d.data;
		})
		.always(function(d){
			sessionStorage.setItem('store_one','1')
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
	onStoreSeason:function(data){
		var self = this;
		var params = this.data.store = objectAssign(this.data.store,data);
		helper.request('report.adapter.pos.html','shop_season_inventory',params)
		.done(function(d){
			sessionStorage.setItem('store_one','1')
			self.data.season = d.data;
			self.trigger(self.data);
			Four.season = d.data;
		})
		.always(function(d){
			sessionStorage.setItem('store_one','1')
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
	onStoreTop:function(data){
		var self = this;
		var params = this.data.store = objectAssign(this.data.store,data);
		helper.request('report.adapter.pos.html','shop_sale_inventory_top10',params)
		.done(function(d){
			sessionStorage.setItem('store_two','1')
			self.data.saletop = d.data;
			self.data.max_min = d.max_min;
			self.data.properties = d.properties;
			self.trigger(self.data);
			Four.top = d;
			// Four.max_min = d.max_min;
		})
		.always(function(d){
			sessionStorage.setItem('store_two','1')
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
	onStoreSaleDay:function(data){
		var self = this;
		var params = this.data.store = objectAssign(this.data.store,data);
		helper.request('report.adapter.pos.html','day_sale_inventory_analysis',params)
		.done(function(d){
			sessionStorage.setItem('store_three','1')
			self.data.superior = d.data;
			self.data.max_mins = d.max_min;
			self.trigger(self.data);
			Four.saleday = d;
			// Four.max_mins = d.max_min;
		})
		.always(function(d){
			sessionStorage.setItem('store_three','1')
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

	// onStore:function(data){
	// 	var self = this;
	// 	var params = this.data.store = objectAssign(this.data.store,data);
	// 	helper.request('report.adapter.pos.html','shop_inventory_analysis',params)
	// 	.done(function(d){
	// 		self.data.storeAll = d;
	// 		self.data.max_min = d.max_min;
	// 		self.data.category = d.category_status;
	// 		self.data.season = d.season_status;
	// 		self.data.sale = d.sale_top10;
	// 		self.data.superior = d.superior_trend;
	// 		self.data.month = d.month_trend;
	// 		self.trigger(self.data);
	// 	})
	// }
	
})
module.exports = Store;