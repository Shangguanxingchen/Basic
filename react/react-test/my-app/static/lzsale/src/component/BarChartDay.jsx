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
    var values = this.props.series;
    var memberArr = values.slice(0,5);
    var name = [],names = [],contribute = [],complete = [],indicator = [],sold_amount = [],avg_sold_amount=[];
    for(var i = 0;i < memberArr.length; i++){
      name.push(values[i].employee_name);
      contribute.push(parseFloat(values[i].contribute));
      complete.push(parseFloat(values[i].complete));
      sold_amount.push(values[i].sold_amount);
      indicator.push(values[i].indicator);
      avg_sold_amount.push(values[i].avg_sold_amount);
    }
  	option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: [lang_obj[lang]['month_target_progress'],lang_obj[lang]['month_complete_progress'],lang_obj[lang]['average_complete_progress'],lang_obj[lang]['month_contribute_progress'], lang_obj[lang]['complate_rate']]
        },
        toolbox: {
          show : true,
          feature : {
              // mark : {show: true},
              // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              // restore : {show: true},
          }
        },
        grid: {
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            normal: {
                show: true,
                position: 'insideLeft',
                color:'red',
            }
        },
        yAxis: {
            type: 'category',
            data: name,
            axisLine:{  
              lineStyle:{    
                width:1  
              }
            }  
        },  
        series: [
        {
              name: lang_obj[lang]['month_target_progress'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: indicator
          },
          {
              name: lang_obj[lang]['month_complete_progress'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: sold_amount
          },
          {
              name: lang_obj[lang]['average_complete_progress'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: avg_sold_amount
          },
          {
              name: lang_obj[lang]['month_contribute_progress'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: contribute
          },
          {
              name: lang_obj[lang]['complate_rate'],
              type: 'bar',
              stack: lang_obj[lang]['total'],
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: complete
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