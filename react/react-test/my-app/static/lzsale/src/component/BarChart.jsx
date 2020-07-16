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
var BarChart = React.createClass({
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
    this.chart = echarts.init(this.refs.barStore, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['barStore'] == 'undefined'){
      myChart = echarts.init(document.getElementById('barStore'))
      myCharts.barStore = myChart
    }else{
      myChart = myCharts['barStore']
    }
    // var myChart = echarts.init(document.getElementById('barStore'));
    var value = this.props.series;
    var values = this.props.serieValue;
    var name =[],sale_count = [],count = [];
    for(var i = 0 ;i<value.length;i++){
      // name.push(value[i].product_name);
      name.push(i+1);
      sale_count.push(value[i].sale_count);
      count.push(value[i].stock_count);
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
              data: name
          }
      ],
      yAxis: [
        {
            type: 'value',
            name: lang_obj[lang]['kucun_quantity_j'],
            min: 0,
            max: values.top10_stock_max,
            interval: values.top10_stock_interval,
            axisLabel: {
                formatter: '{value}'
            }
        },{
            type: 'value',
            name: lang_obj[lang]['sale_quantity_j'],
            min: 0,
            max: values.top10_sale_max,
            interval: values.top10_sale_interval,
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
            data:count
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
			<div ref = "barStore" id = "barStore"></div>	
		)
	}
})
module.exports = BarChart;