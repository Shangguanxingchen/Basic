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
    
    // if( (typeof language == 'undefined') || language != 'en' ){
    //   language = 'cn'
    // }
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
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['bubble'] == 'undefined'){
      myChart = echarts.init(document.getElementById('bubble'))
      myCharts.bubble = myChart
    }else{
      myChart = myCharts['bubble']
    }
    // var myChart = echarts.init(document.getElementById('bubble'));
    var now = this.props.series.now_promotion_data_in;
    var nows = this.props.series.now_promotion_data_out;
    var name = this.props.series.now_title;
    // 活动分析无数据展示默认图片
    // if(Array.isArray(now)){
    //   if(now.length == 0){
    //     $('.hasdata').hide();
    //     $('.nodata').show();
    //     return;
    //   }else{
    //     $('.hasdata').show();
    //     $('.nodata').hide();
    //   }
    // }
  	option = {
        animation: needAnimation,//禁止动画
        color: ['#ff8497','#1296db','#ff8497','#ffc0a7', '#59c0b6', '#99ccff', '#9dc8c8', '#cd7575', '#8ea1f0', '#cf56a1', '#913175', '#455d7a', '#e0eeff'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            x: 'top',
            data:name
        },
        series: [{
            name: lang_obj[lang]['activity_analysis'],
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'inner',
                    formatter: function(now){
                      for(var i in now.data){
                        return now.data.name + ":" + now.data.percent
                      }
                    },
                    textStyle: {
                        fontSize: 12,
                        color: '#000'
                    }
                }
            },
            data: now
        }, {
            name: lang_obj[lang]['activity_analysis'],
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
            normal: {
              position: 'inner',
              formatter: function(nows){
                for(var i in nows.data){
                        return nows.data.name + ":" + nows.data.percent
                      }
              },
              textStyle: {
                fontSize: 12,
                color: '#000'
              }
            }
        },
            data: nows
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