var Reflux = require('reflux');
var HeaderAtion = Reflux.createActions([
	'getMonth',
	'getDay',
	'getTrend',//年指标
	'getMember', //员工指标
	'getMemberIcon', //员工头像

])
module.exports = HeaderAtion;