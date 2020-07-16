import Reflux from 'reflux'
import SaleCircleAction from '../actions/SaleCircleAction'
import helper from '../util/helper'

module.exports = Reflux.createStore({
    listenables: SaleCircleAction,
    obj: {data: []},
    onSum(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'sale_chain_ratio_section', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTable(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'sale_chain_ratio', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    },
})