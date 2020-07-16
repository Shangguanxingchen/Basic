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
var PieCharts = React.createClass({
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
    this.chart = echarts.init(this.refs.pies, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['pies'] == 'undefined'){
      myChart = echarts.init(document.getElementById('pies'))
      myCharts.pies = myChart
    }else{
      myChart = myCharts['pies']
    }
    // var myChart = echarts.init(document.getElementById('pies'));
    var value = this.props.series;
  	option = {
      animation: needAnimation,//禁止动画
      title : {
        x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} "
      },
      toolbox: {
          show : true,
          sImage : {show: true}
      },
      calculable : true,
      series : [
          {
              
            name:lang_obj[lang]['season_spread'],
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            label: {
              normal: {
                  show: true,
                  formatter: function(value){
                    return value.data.name +':'+ value.data.percent
                  },
              },
              emphasis: {
                  show: true
              }
            },
            data:value
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
			<div ref = "pies" id = "pies"></div>	
		)
	}
})
module.exports = PieCharts;