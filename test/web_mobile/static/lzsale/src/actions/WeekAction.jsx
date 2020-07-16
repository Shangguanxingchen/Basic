var Reflux = require('reflux');
var WeekAction = Reflux.createActions([
	'shopData',
	'shopBasket',//购物篮
	'shopActive',//活动分析
	'order',//门店排行
	'product',//商品排行
	'brandList'//品牌列表
])
module.exports = WeekAction;