var Reflux = require('reflux');
var DayAction = require('../actions/DayAction');
var helper = require('../util/helper');
var objectAssign = require('object-assign');

var DayStore = Reflux.createStore({
	data:{
		param_day:{
			shop_id:'',
			day:''
		},
		day:{},
		dayLine:[],
		dayLines:[],
		param_setday:{
			shop_id:'',
			year:'',
			month:'',
			shop_day_indicators:[
				{
					day:'',
					day_indicator:''
				}
			]
		},
		setDay:{},

		// 店员月
		param_month:{
			shop_id:'',
			day:''
		},
		month:{},
		monthLine:[],
		param_setmonth:{
			shop_id:'',
			year:'',
			month:'',
			employee_month_indicators:[
				{
					employee_id:'',
					indicator:''
				}
			]
		},
		setMonth:{},

		indicator_unassign:'',

	},
	listenables:[DayAction],
	onGetDay:function(data){
		var self = this;
		var params = this.data.param_day = objectAssign(this.data.param_day, data);
		helper.request('report.adapter.pos.html','get_shop_day_indicator_of_month',params)
		.done(function(d){
			self.data.day = d;
			self.data.dayLine = d.data;
			self.data.dayLines = d.data;
			self.data.indicator_unassign = d.indicator_unassign;
			self.trigger(self.data);
		})
	},
	onSetDay:function(data){
		var self = this;
		var params = this.data.param_setday = objectAssign(this.data.param_setday, data);
		helper.request('report.adapter.pos.html','create_shop_day_indicator',params)
		.done(function(d){
			self.data.setDay = d;
			self.trigger(self.data);
		})
	},
	onGetMonth:function(data){
		var self = this;
		var params = this.data.param_month = objectAssign(this.data.param_month, data);
		helper.request('report.adapter.pos.html','get_employee_month_indicator_before_create',params)
		.done(function(d){
			self.data.month = d;
			self.data.monthLine = d.employee_indicators;
			self.trigger(self.data);
		})
	},
	onSetMonth:function(data){
		var self = this;
		var params = this.data.param_setmonth = objectAssign(this.data.param_setmonth, data);
		helper.request('report.adapter.pos.html','create_employee_month_indicator',params)
		.done(function(d){
			self.data.setMonth = d;
			self.trigger(self.data);
		})
	},


	

})
module.exports = DayStore;