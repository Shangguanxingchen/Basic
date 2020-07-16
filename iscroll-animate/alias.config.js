// 框架核心的别名配置文件，请勿改动，该文件不能缺少
// 自定义别名请前往  common.config中
const path = require('path'); // 导入路径包
module.exports = {
	// 基于src根路径进行别名替换,使用项目根路径
	'CommonTools_Core': path.join(__dirname, "./src/core/tools/Tools.Common.js"),
	//下拉刷新基于的 IScroll
	'PullToRefresh_IScroll_Probe': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-IScroll-Probe.js"),
	//下拉刷新的核心文件
	'PullToRefresh_Core': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Core.js"),
	
	//下拉刷新的皮肤css
	'PullToRefresh_Skin_Css': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin.css"),
	//下拉刷新的皮肤  default 默认样式
	'PullToRefresh_Skin_Default': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Default.js"),
	//下拉刷新的皮肤  type1 默认样式
	'PullToRefresh_Skin_Type1': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Type1.js"),
	//下拉刷新的皮肤  type2 自定义图片
	'PullToRefresh_Skin_Type2': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Type2.js"),
	//下拉刷新的皮肤  type3 canvas球
	'PullToRefresh_Skin_Type3': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Type3.js"),
	//下拉刷新的皮肤  type4 css3弹性小球
	'PullToRefresh_Skin_Type4': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Type4.js"),
	//下拉刷新的皮肤  native 在ejs或钉钉环境下使用(可以直接使用原生提供的下拉刷新动画)
	'PullToRefresh_Skin_Native': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Native.js"),
	//下拉刷新的皮肤 mui default
	'PullToRefresh_Skin_Mui_Default': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Mui-Default.js"),
	//下拉刷新的皮肤 mui type1
	'PullToRefresh_Skin_Mui_Type1': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Mui-Type1.js"),
	//下拉刷新的皮肤 mui type2
	'PullToRefresh_Skin_Mui_Type2': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Mui-Type2.js"),
	//下拉刷新的皮肤 mui type3
	'PullToRefresh_Skin_Mui_Type3': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Skin-Mui-Type3.js"),
	
	//下拉刷新的业务实现(里面进一步封装，默认会对接口数据进行处理，业务开发时一般会使用这个，翻页逻辑里面自动处理)
	//一般一个业务实现+一个上面的皮肤  就是项目中最长用到的下拉刷新场景
	'PullToRefresh_Bizlogic_Core': path.join(__dirname, "./src/core/pulltorefresh/PullToRefresh-Bizlogic-Core.js"),

};