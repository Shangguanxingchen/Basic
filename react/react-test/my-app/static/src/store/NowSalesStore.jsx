var Reflux = require('reflux');
var NowSalesAction = require('../actions/NowSalesAction');
var helper = require('../util/helper');

var NowSalesStore = Reflux.createStore({
	listenables: [NowSalesAction],
  data: {
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
      helper.request('report.adapter.pos.html', 'employee_day_sale_type_list', {}).then(function (res) {
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
    helper.request('report.adapter.pos.html', 'employee_day_sale_analyse', obj).then(function(res){
      console.log('数据',res);
      _this.data = {
          condition: 'table',
          list: res
      }
      _this.trigger(_this.data);
    })
  }
})
module.exports = NowSalesStore;