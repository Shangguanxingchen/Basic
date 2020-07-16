var Reflux = require('reflux');
var helper = require('../util/helper');

import OnlineQueryAction from '../actions/OnlineQueryAction'

module.exports = Reflux.createStore({
    listenables: [OnlineQueryAction],
    data: {
        condition: '',
        list: []
    },
    onBrand(condition){
        var _this = this;
        helper.request('report.adapter.pos.html', 'report_product_brand_list', {}).then(function (res) {
            _this.data = {
                condition: condition,
                list: res.data
            }
            _this.trigger(_this.data);
        })
    },
    onSeries(condition){
        var _this = this;
        helper.request('report.adapter.pos.html', 'report_product_series_list', {}).then(function (res) {
            _this.data = {
                condition: condition,
                list: res.data
            }
            _this.trigger(_this.data);
        })
    },
    onTable(obj){
        var _this = this;
        helper.request('report.adapter.pos.html', 'report_stock_report_list', obj).then(function(res){
            _this.data = {
                condition: 'table',
                list: res.data
            }
            _this.trigger(_this.data);
        })
    },
})

