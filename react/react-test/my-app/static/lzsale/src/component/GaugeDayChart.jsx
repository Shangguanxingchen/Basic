import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
import lang_obj from '../lang/language.js';
var GaugeDayChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:'',   // 是否简化显示,不显示各种线
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
    this.chart = echarts.init(this.refs.gauge, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
    var {lang} = this.state;
  	var myChart = echarts.init(document.getElementById('gauges'));
    var values = this.props.series;
    var value;
    if(values >100){
      value = 100;
    }else{
      value = parseFloat(values);
    }
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
              name: lang_obj[lang]['operational_indicator'],
              type: 'gauge',
              detail : {  
                formatter:{values},
                textStyle: {         
                  fontSize:16,
                  fontWeight: 'bolder'   
                }  
              },  
              data: [{value: value}],
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  width: 10
                }
              }
          },
          
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