// 店员指标
var Reflux = require('reflux');
var IndiAtion = Reflux.createActions([
	'getMonth',
	'getWeek',
	'getDay',
	'getTrend',//年指标
	'getMember', //员工指标
	'getMemberIcon', //员工头像
	'getShopList',//门店详情

])
module.exports = IndiAtion;