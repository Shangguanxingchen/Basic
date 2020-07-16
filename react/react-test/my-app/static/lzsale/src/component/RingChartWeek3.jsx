import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
import lang_obj from '../lang/language.js';
var RingChart = React.createClass({
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
    this.chart = echarts.init(this.refs.ring_week3, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart = echarts.init(document.getElementById('ring_week3'));
    var value = this.props.series;
  	option = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series : [
          {
              type: 'pie',
              radius : ['60%', '48%'],
              label: {
                  normal: {
                      position: 'center'
                  }  
              },
              data:[
                  {
                      value:value, name:lang_obj[lang]['occupancy'],
                      label: {
                          normal: {
                              formatter: '{d} %',
                              textStyle: {
                                  fontSize: 14
                              }
                          }
                      }
                  },
                  {
                      value:310, name:lang_obj[lang]['employed'],
                      tooltip: {
                          show: false
                      },
                      itemStyle: {
                          normal: {
                              color: '#999'
                          }
                      },
                      label: {
                          normal: {
                              formatter: '\n'
                          }
                      }
                  }
              ]
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
			<div ref = "ring_week3" id = "ring_week3"></div>	
		)
	}
})
module.exports = RingChart;