import Reflux from 'reflux'
import SaleDayAction from '../actions/SaleDayAction'
import helper from '../util/helper'

module.exports = Reflux.createStore({
    listenables: SaleDayAction,
    obj: {data: []},
    onStore(obj,type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_shop_list', obj).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTable(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_sale_report', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    },
    onTables(table_arg,type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'shop_cut_payment', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    }
})