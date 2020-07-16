var Reflux = require('reflux');
var SalesAnalysisAction = require('../actions/SalesAnalysisAction');
var helper = require('../util/helper');

var SalesAnalysisStore = Reflux.createStore({
	listenables: [SalesAnalysisAction],
  obj: {data: []},
  onSum(type){
      var _this = this;
      helper.request('report.adapter.pos.html', 'employee_sale_calc_type', {}).then(function (res) {
          _this.obj.data = res.data;
          _this.trigger(_this.obj,type);
      })
  },
  onDate(type){
      var _this = this;
      helper.request('report.adapter.pos.html', 'employee_sale_show_as', {}).then(function (res) {
          _this.obj.data = res;
          _this.trigger(_this.obj,type);

      })
  },
	onTable(obj,type){
    var _this = this;
    helper.request('report.adapter.pos.html', 'employee_sale_status', obj).then(function(res){
      _this.obj.data = res;
      _this.trigger(_this.obj,type);
    })
  }
})
module.exports = SalesAnalysisStore;