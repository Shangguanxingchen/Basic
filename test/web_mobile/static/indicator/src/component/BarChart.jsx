import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';

var BarChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.bar, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
  	var myChart = echarts.init(document.getElementById('bar'));
    var values = this.props.series;
    var name = [],contribute = [],complete = [],indicator = [],sold_amount = [];
    for(var i = 0;i < values.length; i++){
      name.push(values[i].employee_name);
      contribute.push(values[i].contribute);
      complete.push(values[i].complete);
      sold_amount.push(values[i].sold_amount);
      indicator.push(values[i].indicator);
    }
  	option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['月贡献', '完成率','人均完成量','月完成量','月指标量']
        },
        grid: {
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: name
        },
        series: [
          {
              name: '月贡献',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: contribute
          },
          {
              name: '完成率',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: complete
          },
          {
              name: '人均完成量',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [220, 182, 191, 234, 290]
          },
          {
              name: '月完成量',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: sold_amount
          },
          {
              name: '月指标量',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: indicator
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
			<div ref = "bar" id = "bar"></div>	
		)
	}
})
module.exports = BarChart;