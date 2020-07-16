/**
 * @description  基于IScroll实现的下拉刷新
 * @author dailc
 * @version 4.0
 * @time 2017-03-25
 * 皮肤类只会实现UI相关的hook函数
 * 皮肤 type2 ，不再基于mui的css，而是有自己的资源引用
 * 依赖 PullToRefresh_Skin_Css
 */
(function(exports) {
     var CommonTools = require('CommonTools_Core');
	var PullToRefreshBase = require('PullToRefresh_Core');
	/**
	 * 全局参数
	 */
	var CLASS_HIDDEN = 'hidden';

	/**
	 * 默认的设置参数
	 */
	var defaultSettingOptions = {
		//下拉有关
		down: {
			//下拉要大于多少长度后再下拉刷新
			height: 75,
			contentdown: '下拉可以刷新', //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: '释放立即刷新', //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: '正在刷新', //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			contentrefreshsuccess: '刷新成功', //可选，刷新成功的提示
			contentrefresherror: '刷新失败', //可选，刷新失败的提示-错误回调用到
			isSuccessTips: true,
			callback: CommonTools.noop
		},
		//上拉有关
		up: {
			//是否自动上拉加载-初始化是是否自动
			auto: false,
			//距离底部高度(到达该高度即触发)
			offset: 100,
			contentdown: '上拉显示更多',
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了',
			callback: CommonTools.noop
		},
		//IScroll配置相关
		scroll: {
			bounceTime: 500, //回弹动画时间
			//下拉刷新和上拉加载成功动画的时间
			successAnimationTime: 500
		},
		//注意,传给Mui时可以传 #id形式或者是  原生dom对象
		element: '#pullrefresh'
	};

	//创建一个Class对象
	//只需要关注默认的UI实现即可
	var PullToRefresh = PullToRefreshBase.PullToRefresh.extend({

		/*************************************
		 * 需要实现的实际效果
		 * 如果不像实现，可以设为null
		 * *************************/
		/**
		 * @description 生成下拉刷新提示，这个需要被具体实现
		 * 这个默认实现就直接在一个函数里面同时生成下拉和上拉提示了
		 */
		_initPullToRefreshTipsHook: function(enablePullDown, enablePullUp) {
			this._initPocket();
			this._checkHidden(enablePullDown, enablePullUp);
		},

		_checkHidden: function(enablePullDown, enablePullUp) {
			if(!enablePullUp) {
				this.bottomPocket&&this.bottomPocket.classList.add(CLASS_HIDDEN);
			}
			if(!enablePullDown) {
				this.topPocket&&this.topPocket.classList.add(CLASS_HIDDEN);
			}
		},

		/**
		 * @description 下拉过程中的钩子函数
		 * @param {Number} deltaY
		 * @param {Number} thresholdHeight 对应的高度阈值
		 */
		_pullingHook: function(deltaY, thresholdHeight) {
			//高度阈值
			if(deltaY >= thresholdHeight) {
				this._setCaption(true, this.options.down.contentover);
			} else if(deltaY < thresholdHeight) {
				this._setCaption(true, this.options.down.contentdown);
			}
		},
		/**
		 * @description 下拉刷新的成功动画，每次确保触发一次
		 */
		_pulldownLoaingAnimationHook: function() {
			this._setCaption(true, this.options.down.contentrefresh);
		},
		/**
		 * @description 下拉刷新的成功动画-动画完毕后可能的成功提示，每次确保触发一次
		 * 比如在成功里面提示加载了多少条数据，如果不需要可以传null，会直接走到end事件里
		 * @param {Function} done 这个可以提前结束动画-如果不想要的话
		 * @param {Boolean} isSuccess 是否请求成功
		 */
		_pulldownLoaingAnimationSuccessHook: function(done,isSuccess) {
			if(this.options.down.isSuccessTips) {
				this._setCaption(true,isSuccess?this.options.down.contentrefreshsuccess:this.options.down.contentrefresherror);
			} else {
				//否则直接没有成功提示
				done();
			}

		},
		/**
		 * @description 下拉刷新的动画完成后的回调，可以用来重置状态
		 */
		_pulldownLoaingAnimationEndHook: function() {
			this._setCaption(true, this.options.down.contentdown, true);

		},
		/**
		 * @description 上拉加载的成功动画，每次确保触发一次
		 */
		_pullupLoaingAnimationHook: function(isFinished) {
			this._setCaption(false, this.options.up.contentrefresh);
		},
		/**
		 * @description 上拉加载的成功动画-动画完毕后可能的成功提示，每次确保触发一次
		 */
		_pullupLoaingAnimationSuccessHook: function(isFinished) {
			if(isFinished) {
				this._setCaption(false, this.options.up.contentnomore);
			} else {
				this._setCaption(false, this.options.up.contentdown);
			}
			//this.bottomPocket.classList.remove(CLASS_VISIBILITY);
		},
		/**
		 * @description _disablePullUpHook
		 */
		_disablePullUpHook: function() {
			this.bottomPocket.className = 'pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
		},
		/**
		 * @description disablePullUpHook
		 */
		_enablePullUpHook: function() {
			this.bottomPocket.classList.remove(CLASS_HIDDEN);
			this._setCaption(false, this.options.up.contentdown);
		},
		/*一些是UI对应的实现*/
		/**
		 * @description 创建下拉提示
		 */
		_createTopPocket: function() {
			var pocket = document.createElement('div');
			pocket.style.visibility = 'hidden';
			pocket.className = 'pull-top-pocket';
			pocket.innerHTML = '<div class="pull-block"><div class="pull-loading-icon"></div><div class="pull-caption">' + this.options.down.contentdown + '</div></div>';
			return pocket;
		},
		/**
		 * @description 创建上拉提示
		 */
		_createBottomPocket: function() {
			var pocket = document.createElement('div');
			pocket.style.visibility = 'hidden';
			pocket.className = 'pull-bottom-pocket';
			pocket.innerHTML = '<div class="pull-block"><div class="pull-loading-icon"></div><div class="pull-caption">' + this.options.up.contentdown + '</div></div>';
			return pocket;
		},
		/**
		 * @description 初始化下拉刷新和上拉加载提示
		 */
		_initPocket: function() {
			//先改变wrap的皮肤
			this.wrapper.classList.add('pulltorefresh-type2');
			var options = this.options;
			if(options.down && options.down.hasOwnProperty('callback')) {
				if(!this.topPocket) {
					this.topPocket = this._createTopPocket();

					this.scrollWrap.insertBefore(this.topPocket, this.scrollWrap.firstChild);
				}
			}
			if(options.up && options.up.hasOwnProperty('callback')) {
				if(!this.bottomPocket) {
					this.bottomPocket = this._createBottomPocket();
					this.scrollWrap.appendChild(this.bottomPocket);
				}
			}
			//需要滑动到offset位置
			//这个如果不设置，下拉的提示就会位置不正确
			//需要设一个定时，否则可能计算失误,这里在返回到offset前就先隐藏了
			var self = this;
			setTimeout(function() {
				//暂时写死一个，用offset有时会有失误
				//self.topPocket.offsetHeight||0
				self.topPocket&&self._setOffsetY(74, function() {
					self.topPocket.style.visibility = 'visible';
					self.bottomPocket&&(self.bottomPocket.style.visibility = 'visible');
				});
			}, 0);
		},
		
		/**
		 * @description 设置caption
		 * @param {Object} isPulldown
		 * @param {Object} title
		 * @param {Object} reset
		 */
		_setCaption: function(isPulldown, title, reset) {
			if(this.loading) {
				return;
			}
			var pocket;
			if(isPulldown) {
				pocket = this.topPocket;

			} else {
				pocket = this.bottomPocket;
			}
			var label = pocket.querySelector('.pull-caption');
			var options = this.options;
			var self = this;
			if(pocket) {
				if(reset) {
					setTimeout(function() {
						pocket.className = 'pull-top-pocket ';
						label.innerHTML = options.down.contentdown;
					}, 100);
				} else {
					if(title !== this.lastTitle) {
						label.innerHTML = title;
						if(isPulldown) {
							if(title === options.down.contentrefresh) {
								pocket.className = 'pull-top-pocket loading';

							} else if(title === options.down.contentover) {
								pocket.className = 'pull-top-pocket flip';

							} else if(title === options.down.contentdown) {
								pocket.className = 'pull-top-pocket ';
							} else if(title === options.down.contentrefreshsuccess) {
								//优先显示tips
								label.innerHTML = self.successTips||title;
								pocket.className = 'pull-top-pocket success';
							} else if(title === options.down.contentrefresherror) {
								pocket.className = 'pull-top-pocket error';
							}
						} else {
							if(title === options.up.contentrefresh) {
								pocket.classList.remove('nomore');
								pocket.classList.add('loading');
							} else {
								pocket.classList.remove('loading');

								if(title === options.up.contentnomore) {
									pocket.classList.add('nomore');
								} else {
									pocket.classList.remove('nomore');
								}

							}

						}
						this.lastTitle = title;
					}
				}

			}
		},

	});

	/**
	 * @description 初始化下拉刷新组件
	 * @param {Object} element
	 * @param {JSON} options 传入的参数
	 * @return 返回的是一个下拉刷新对象
	 */
	exports.initPullToRefresh = function(element, options) {
		if(typeof element !== 'string' && !(element instanceof HTMLElement)) {
			//如果第一个不是options
			options = element;
			element = options['element'];
		}

		//合并默认参数,这个得用的默认参数
		options = CommonTools.extend(true, {}, defaultSettingOptions, options);
		return PullToRefreshBase.initPullToRefresh(PullToRefresh, element, options);
	};
	//兼容require
	if(typeof module != 'undefined' && module.exports) {
		module.exports = exports;
	} else if(typeof define == 'function' && (define.amd || define.cmd)) {
		define(function() { return exports; });
	} 
	//默认就暴露出来
	window.PullToRefreshSkinType2 = exports;
	
})({});