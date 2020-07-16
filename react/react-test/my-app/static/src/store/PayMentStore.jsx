import Reflux from 'reflux'
import PayMentAction from '../actions/PayMentAction'
import helper from '../util/helper'

module.exports = Reflux.createStore({
    listenables: PayMentAction,
    obj: {data: []},
    onSum(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_payment_records_type', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTable(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_payment_type', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    },
    onTables(table_arg,type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_payment_records', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    }
})