var Reflux = require('reflux');
var SalessummaryAction = require('../actions/SalessummaryAction');
var helper = require('../util/helper');

var SalessummaryStore = Reflux.createStore({
    listenables: [SalessummaryAction],
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
    onHigh(condition){
        var _this = this;
        helper.request('report.adapter.pos.html', 'report_view_type_list', {}).then(function (res) {
            _this.data = {
                condition: condition,
                list: res.data
            }
            _this.trigger(_this.data);
        })
    },
    onTable(obj){
        var _this = this;
        helper.request('report.adapter.pos.html', 'report_sale_report_list', obj).then(function(res){
            _this.data = {
                condition: 'table',
                list: res.data
            }
            _this.trigger(_this.data);
        })
    }
})

module.exports = SalessummaryStore;