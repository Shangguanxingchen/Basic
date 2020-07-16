import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
import lang_obj from '../lang/language.js';
var needAnimation = false;
var BubbleChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
    }
  },
  getInitialState(){
	var language = lang_obj.get_lang('lang');
//   if( (typeof language == 'undefined') || language != 'en' ){
//     language = 'cn'
//   }
	return {
		lang: language
	}
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.bubble, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
	var {lang} = this.state;
    var myChart;
    if(typeof myCharts['bubble'] == 'undefined'){
      myChart = echarts.init(document.getElementById('bubble'))
      myCharts.bubble = myChart
    }else{
      myChart = myCharts['bubble']
    }
    // var myChart = echarts.init(document.getElementById('bubble'));
    var value = this.props.series;
    var data = value;
    var name = [];
    for(var i =0 ;i< data.length;i++){
    	for(var j = 0 ;j< data[i].length;j++){
    		name.push(data[i][j][3]);
    	}
    }
  	option = {
  		animation: needAnimation,
	    title: {
	        text: ''
	    },
	    legend: {
	        right: 30,
	        data: name
	    },
	    xAxis: {
	    		name: lang_obj[lang]['sales_volume'],
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        }
	    },
	    yAxis: {
	    	name: lang_obj[lang]['sales_quantity'],
	        splitLine: {
	            lineStyle: {
	                type: 'dashed'
	            }
	        },
	        scale: true
	    },
	    series: [{
        name: name[0],
        data: data[0],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(33, 133, 197, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(43, 169, 250)'
	            }, {
	                offset: 1,
	                color: 'rgb(8, 122, 195)'
	            }])
	        }
	      }
		    }, {
	      name: name[1],
	      data: data[1],
	      type: 'scatter',
	      symbolSize: function (data) {
	          return Math.sqrt(data[2]) / 5e2;
	      },
	      label: {
	          emphasis: {
	              show: true,
	              formatter: function (param) {
	                  return param.data[3];
	              },
	              position: 'top'
	          }
	      },
		    itemStyle: {
		      normal: {
		          shadowBlur: 10,
		          shadowColor: 'rgba(120, 36, 50, 0.5)',
		          shadowOffsetY: 5,
		          color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(251, 118, 123)'
	            }, {
	                offset: 1,
	                color: 'rgb(204, 46, 72)'
	            }])
		      }
		    }
    },{
        name: name[2],
        data: data[2],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(50, 74, 201, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(108, 130, 245)'
	            }, {
	                offset: 1,
	                color: 'rgb(50, 74, 201)'
	            }])
	        }
	      }
		    },{
        name: name[3],
        data: data[3],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(250, 87, 23, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(255, 170, 138)'
	            }, {
	                offset: 1,
	                color: 'rgb(250, 87, 23)'
	            }])
	        }
	      }
		    },{
        name: name[4],
        data: data[4],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(20, 180, 160, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(98, 216, 204)'
	            }, {
	                offset: 1,
	                color: 'rgb(20, 180, 160)'
	            }])
	        }
	      }
		    },{
        name: name[5],
        data: data[5],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(30, 145, 255, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(110, 180, 250)'
	            }, {
	                offset: 1,
	                color: 'rgb(30, 145, 255)'
	            }])
	        }
	      }
		    },{
        name: name[6],
        data: data[6],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(160, 48, 48, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(220, 120, 120)'
	            }, {
	                offset: 1,
	                color: 'rgb(160, 48, 48)'
	            }])
	        }
	      }
		    },{
        name: name[7],
        data: data[7],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(210, 30, 120, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(220, 98, 160)'
	            }, {
	                offset: 1,
	                color: 'rgb(210, 30, 120)'
	            }])
	        }
	      }
		    },{
        name: name[8],
        data: data[8],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(145, 49, 117, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(160, 88, 200)'
	            }, {
	                offset: 1,
	                color: 'rgb(145, 49, 117)'
	            }])
	        }
	      }
		    },{
        name: name[9],
        data: data[9],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
	    	itemStyle: {
	        normal: {
	            shadowBlur: 10,
	            shadowColor: 'rgba(69, 93, 122, 0.5)',
	            shadowOffsetY: 5,
	            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
	                offset: 0,
	                color: 'rgb(98, 138, 180)'
	            }, {
	                offset: 1,
	                color: 'rgb(69, 93, 122)'
	            }])
	        }
	      }
		    }]
  };
		myChart.setOption(option);
  },
  refreshChart(){
    this.renderChart();
    this.chart.resize();
  },
	render(){
		return(
			<div ref = "bubble" id = "bubble"></div>	
		)
	}
})
module.exports = BubbleChart;