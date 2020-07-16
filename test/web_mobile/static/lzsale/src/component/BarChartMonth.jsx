import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
import lang_obj from '../lang/language.js';
var BarChart = React.createClass({
  chart : null,
  getDefaultProps(){
    return {
      dataNum:null,   // 是否简化显示,不显示各种线
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
    this.chart = echarts.init(this.refs.barDay, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
    var {lang} = this.state;
    var myChart = echarts.init(document.getElementById('barDay'));
    var values = this.props.dataNum;
    option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: [lang_obj[lang]['direct_invist'], lang_obj[lang]['email_sale'],lang_obj[lang]['lm_adv'],lang_obj[lang]['vedio_adv'],lang_obj[lang]['search_engine']]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: [lang_obj[lang]['monday'],lang_obj[lang]['tuesday'],lang_obj[lang]['wed'],lang_obj[lang]['thursday'],lang_obj[lang]['friday'],lang_obj[lang]['saturday'],lang_obj[lang]['sunday']]
        },
        series: [
          {
              name: lang_obj[lang]['direct_invist'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
              name: lang_obj[lang]['email_sale'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: lang_obj[lang]['lm_adv'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
              name: lang_obj[lang]['vedio_adv'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
              name: lang_obj[lang]['search_engine'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
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
      <div ref = "barDay" id = "barDay"></div>  
    )
  }
})
module.exports = BarChart;