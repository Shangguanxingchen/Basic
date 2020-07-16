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
var DayBarChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
      serieValue:{}
    }
  },
  getInitialState(){
    var language = lang_obj.get_lang('lang');
    
    // if( (typeof language == 'undefined') || language != 'en' ){
    //   language = 'cn'
    // }
    return {
      lang: language
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.day, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['day'] == 'undefined'){
      myChart = echarts.init(document.getElementById('day'))
      myCharts.day = myChart
    }else{
      myChart = myCharts['day']
    }
    // var myChart = echarts.init(document.getElementById('day'));
    var value = this.props.series;
    var values = this.props.serieValue;
    var day=[],sale_count=[],stock_count=[];
    for(var i = 0 ;i<value.length;i++){
      day.push(value[i].day);
      sale_count.push(value[i].sale_count);
      stock_count.push(value[i].stock_count)
    }
  	option = {
      animation: needAnimation,//禁止动画
      tooltip: {
        trigger: 'axis'
      },
      legend: {
          data:[lang_obj[lang]['kucun_quantity'],lang_obj[lang]['sale_quantity']]
      },
      xAxis: [
          {
              type: 'category',
              splitLine:{
                show:[true]
              },
              data: day
          }
      ],
      yAxis: [
        {
            type: 'value',
            name: lang_obj[lang]['kucun_quantity_j'],
            min: 0,
            max: values.month_trend_stock_max,
            interval: values.month_trend_stock_interval,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: lang_obj[lang]['sale_quantity_j'],
            min: 0,
            max: values.month_trend_sale_max,
            interval: values.month_trend_sale_interval,
            axisLabel: {
                formatter: '{value}'
            }
        }
      ],
      series: [
        {
            name:lang_obj[lang]['kucun_quantity'],
            type:'bar',
            areaStyle: {normal: {
                opacity:0.4,
                color:['#2699de'],
            }},
            color:['#2699de'],
            data:stock_count
        },
        {
            name:lang_obj[lang]['sale_quantity'],
            type:'line',
            yAxisIndex: 1,
            data:sale_count
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
			<div ref = "day" id = "day"></div>	
		)
	}
})
module.exports = DayBarChart;