import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';

var AreaLineChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.area, 'dark');
    // this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
  	var myChart = echarts.init(document.getElementById('area'));
    var values = this.props.series;
    var year = [], month_indicator = [], sold_amount = [];
    for(var i = 0;i < values.length; i++){
      year.push(values[i].month);
      month_indicator.push(values[i].month_indicator);
      sold_amount.push(values[i].sold_amount);
    }
    var text = new Date().getFullYear() + '年' + '指标完成率';
  	option = {
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['指标量','完成量'],
          right:'5px',
          top:'5px'
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '1%',
          containLabel: true
      },
      xAxis :{
          type : 'category',
          boundaryGap : false,
          splitLine:{
            show:[true]
          },
          data : year
      },
      yAxis :{
          type : 'value'
      },
      series : [
        {
            name:'指标量',
            type:'line',
            areaStyle: {normal: {
              // opacity:0.4,
              // color:['#2699de'],
            }},
            // color:['#2699de'],
            data:month_indicator
        },
        {
            name:'完成量',
            type:'line',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
            areaStyle: {normal: {}},
            data:sold_amount
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
			<div ref = "area" id = "area"></div>	
		)
	}
})
module.exports = AreaLineChart;