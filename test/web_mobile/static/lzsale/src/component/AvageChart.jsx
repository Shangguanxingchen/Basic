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
var AvageChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
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
    this.chart = echarts.init(this.refs.avage, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var {lang} = this.state;
    var myChart = echarts.init(document.getElementById('avage'));
    var value = this.props.series;
    var day =[],amount = [],count = [];
    for(var i = 0 ;i<value.length;i++){
      day.push(value[i].day);
      amount.push(value[i].sale_amount);
      count.push(value[i].stock_count);
    }
  	option = {
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
          feature: {
              // dataView: {show: true, readOnly: false},
              // magicType: {show: true, type: ['line', 'bar']},
              // restore: {show: true},
              // saveAsImage: {show: true}
          }
      },
      legend: {
          data:[lang_obj[lang]['store_sale_quantity'],lang_obj[lang]['store_kucun']]
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
            name: lang_obj[lang]['average_sale_quantity_money'],
            min: 0,
            max: 600,
            interval: 50,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: lang_obj[lang]['average_kucun_quantity'],
            min: 0,
            max: 30,
            interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        }
      ],
      series: [
        {
            name:lang_obj[lang]['store_kucun'],
            type:'bar',
            splitLine:{
              show:[true]
            },
            areaStyle: {normal: {
                opacity:0.4,
                color:['#2699de'],
            }},
            color:['#2699de'],
            data:count
        },
        {
            name:lang_obj[lang]['store_sale_quantity'],
            type:'line',
            yAxisIndex: 1,
            data:amount
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
			<div ref = "avage" id = "avage"></div>	
		)
	}
})
module.exports = AvageChart;