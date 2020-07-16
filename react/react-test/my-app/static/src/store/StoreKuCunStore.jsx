/**
 * Created by zhousuyang on 16/12/7.
 */
import Reflux from 'reflux';
import StoreKuCunAction from '../actions/StoreKuCunAction';
import helper from '../util/helper';

module.exports = Reflux.createStore({
    listenables: [StoreKuCunAction],
    obj: {data: []},
    onRangeStore(obj, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'report_sale_shop_list', obj).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onSumLevel(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'shop_inventory_view_list', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onProKind(type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_product_types', {}).done(function (res) {
            _this.obj.data = res.data;
            _this.trigger(_this.obj, type)
        })
    },
    onTableList(table_arg, type){
        var _this = this;
        helper.request('report.adapter.pos.html', 'get_shop_inventory', table_arg).done(function (res) {
            _this.obj.data = res;
            _this.trigger(_this.obj, type);
        })
    }
})