var Reflux = require('reflux');
var OtherExcelAction = require('../actions/OtherExcelAction');
var helper = require('../util/helper');

var OtherExcelStore = Reflux.createStore({
	listenables: [OtherExcelAction],
	data:{
		condition: '',
    list: [],
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
    helper.request('report.adapter.pos.html', 'payment_type_view_list', {}).then(function (res) {
      console.log('筛选',res);
        _this.data = {
            condition: condition,
            list: res.data
        }
        _this.trigger(_this.data);

    })
  },
  onTable(obj){
    var _this = this;
    helper.request('report.adapter.pos.html', 'get_payment_type', obj).then(function(res){
      console.log('付款',res);
      _this.data = {
          condition: 'table',
          list: res
      }
      _this.trigger(_this.data);
    })
  }

}) 
module.exports = OtherExcelStore;