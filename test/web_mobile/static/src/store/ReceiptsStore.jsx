var Reflux = require('reflux');
var helper = require('../util/helper');
var ReceiptsAction = require('../actions/ReceiptsAction');

var ReceiptsStore = Reflux.createStore({
	listenables:[ReceiptsAction],
	obj:{data:[]},
	onSumLevel(type){
    var _this = this;
    helper.request('report.adapter.pos.html', 'operation_receipts_group_level', {}).done(function (res) {
        _this.obj.data = res.data;
        _this.trigger(_this.obj, type)
    })
  },
  onProKind(type){
    var _this = this;
    helper.request('report.adapter.pos.html','get_receipt_type',{}).done(function(res){
      _this.obj.data = res.data;
      _this.trigger(_this.obj,type);
    })
  },
  onTableList(table_arg,type){
    var _this = this;
    helper.request('report.adapter.pos.html','get_operation_receipts',table_arg).done(function(res){
      _this.obj.data = res;
      _this.trigger(_this.obj,type);
    })
  }

})
module.exports = ReceiptsStore