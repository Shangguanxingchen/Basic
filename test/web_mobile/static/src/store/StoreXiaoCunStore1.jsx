/**
 * Created by zhousuyang on 16/12/11.
 */
import Reflux from 'reflux'
import StoreXIaoCunAction1 from '../actions/StoreXiaoCunAction1'
import helper from '../util/helper'

module.exports = Reflux.createStore({
    listenables: StoreXIaoCunAction1,
    obj: {data: []},
    onSum(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'shop_inventory_view_list', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onKind(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_product_types', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTable(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'shop_delivery_inventory', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    },
})