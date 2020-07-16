var Reflux = require('reflux');
var HeaderAction = require('../actions/HeaderAction');
var helper = require('../util/helper');
var objectAssign = require('object-assign');

var HeaderStore = Reflux.createStore({
	data:{
		param_month:{
			shop_id:'',
			year:'',
			month:'',
		},
		month_indicator:'',//月指标
		param_day:{
			shop_id:'',
			day:''
		},
		day_indicator:'',//日指标
		param_year:{
			shop_id:'',
			year:''
		},
		year_indicator:'',//年指标
		param_member:{
			shop_id:'',
			day:''
		},
		member:{}, //员工指标
		members:[],
		param_icon:{
			shop_id:'',
			day:'',
			type:'',
			employee_id:''
		},
		membericon:{}
	},
	listenables:[HeaderAction],
	onGetMonth:function(data){
		var self = this;
		var params = this.data.param_month = objectAssign(this.data.param_month, data);
		helper.request('report.adapter.pos.html','get_shop_month_sale_indicator_status',params)
		.done(function(d){
			self.data.month_indicator = d;
			self.trigger(self.data);
		})
	},
	onGetDay:function(data){
		var self = this;
		var params = this.data.param_day = objectAssign(this.data.param_day,data);
		helper.request('report.adapter.pos.html','get_shop_day_sale_indicator_status',params)
		.done(function(d){
			self.data.day_indicator = d;
			self.trigger(self.data);
		})
	},
	onGetTrend:function(data){
		var self = this;
		var params = this.data.param_year = objectAssign(this.data.param_year,data);
		helper.request('report.adapter.pos.html','get_shop_year_sale_trend',params)
		.done(function(d){
			self.data.year_indicator = d.data;
			self.trigger(self.data);
		})
	},
	onGetMember:function(data){
		var self = this;
		var params = this.data.param_member = objectAssign(this.data.param_member,data);
		helper.request('report.adapter.pos.html','get_employee_month_sale_indicator_status',params)
		.done(function(d){
			self.data.member = d;
			self.data.members = d;
			self.trigger(self.data);
		})
	},
	onGetMemberIcon:function(data){
		var self = this;
		var params = this.data.param_icon = objectAssign(this.data.param_icon,data);
		helper.request('report.adapter.pos.html','get_employee_sale_indicator',params)
		.done(function(d){
			self.data.membericon = d;
			self.trigger(self.data);
		})
	}

	

})
module.exports = HeaderStore;