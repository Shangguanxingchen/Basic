/**
 * Created by zhousuyang on 16/12/11.
 */
import Reflux from 'reflux'
import ProductSortAction1 from '../actions/ProductSortAction1'
import helper from '../util/helper'

module.exports = Reflux.createStore({
    listenables: ProductSortAction1,
    obj: {data: []},
    onSum(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'sale_rank_group_level', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onStore(obj, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_shop_list', obj).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTable(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'product_sale_rank', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    },
})