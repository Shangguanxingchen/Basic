/**
 * Created by zhousuyang on 16/12/11.
 */
import Reflux from 'reflux'
import SaleTotalAction from '../actions/SaleTotalAction'
import helper from '../util/helper'
import $ from 'jquery'

module.exports = Reflux.createStore({
    listenables: SaleTotalAction,
    obj: {data: []},
    onSum(obj, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_shop_list', obj).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onDate(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'sale_statistics_group_type', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTable(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_sale_statistics', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    },
})