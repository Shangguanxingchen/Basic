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
var AreaLineChart = React.createClass({
	chart : null,
  getDefaultProps(){
    
    return {
      series:{},   // 是否简化显示,不显示各种线
      seriesValue:{}
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
    this.chart = echarts.init(this.refs.area, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['area'] == 'undefined'){
      myChart = echarts.init(document.getElementById('area'))
      myCharts.area = myChart
    }else{
      myChart = myCharts['area']
    }

    var value = this.props.series;
    var max_min = this.props.seriesValue;
    var day =[],amount=[],avg=[];
    for(var i = 0 ;i<value.length;i++){
      day.push(value[i].day);
      amount.push(value[i].amount);
      avg.push(value[i].avg_amount)
    }
  	option = {
      animation: needAnimation,
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:[lang_obj[lang]['average_sale_day'],lang_obj[lang]['money_sale_day']],
          right: '5px',
          top: '5px',
          color:['#34495e'],
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '1%',
          containLabel: true
      },
      xAxis :{
          type : 'category',
          name: lang_obj[lang]['day'],
          boundaryGap : false,
          splitLine:{//竖线
              show:[true]
          },
          data : day
      },
      yAxis :{
          type : 'value',
          name: lang_obj[lang]['money_y']
      },
      series : [
        {
          name: lang_obj[lang]['money_sale_day'],
          type: 'line',
          areaStyle: {normal: {
              opacity:0.6,
              color:['#2185c5'],
          }},
          color:['#2185c5'],
          data:amount
        },
        {
          name: lang_obj[lang]['average_sale_day'],
          type: 'line',
          lineStyle: {
              normal:{
                  type: 'dashed'
              }
          },
          itemStyle:{
              normal:{
                  opacity: 0
              }
          },
          data:avg
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