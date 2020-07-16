import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';

var GaugeDayChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:'',   // 是否简化显示,不显示各种线
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.gauge, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
  	var myChart = echarts.init(document.getElementById('gauges'));
    var values = this.props.series;
  	option = {
      tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          // restore: {},
          // saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: {formatter:values},
          data: [{value: values, name: ''}],
          axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
              width: 10
            }
          }
        }
      ]
    };

		myChart.setOption(option);
  },
  refreshChart(){
    this.renderChart();
    this.chart.resize();
  },
	render(){
		return(
			<div ref = "gauge" id = "gauges"></div>	
		)
	}
})
module.exports = GaugeDayChart;