var Reflux = require('reflux');
var helper = require('../util/helper');
var PanDianAction = require('../actions/PanDianAction');

var PanDianStore = Reflux.createStore({
	listenables:[PanDianAction],
	data:{
		condition:'',
		list:[]
	},
	onKind(condition){
		var _this = this;
		helper.request('report.adapter.pos.html', 'report_product_category_list', {}).then(function (res) {
          _this.data = {
              condition: condition,
              list: res.data
          }
          _this.trigger(_this.data);
      })
	},
	onHigh(condition){
		var _this = this;
		helper.request('report.adapter.pos.html', 'get_inventory_view_list', {}).then(function (res) {
          _this.data = {
              condition: condition,
              list: res.data
          }
          _this.trigger(_this.data);
      })
	},
	onTable(obj){
    var _this = this;
    helper.request('report.adapter.pos.html', 'get_inventory_info', obj).then(function(res){
      console.log('盘点报表',res);
      _this.data = {
          condition: 'table',
          list: res
      }
      _this.trigger(_this.data);
    })
  },
})
module.exports = PanDianStore