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
var ShopBarChart = React.createClass({
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
    if(JSON.stringify(this.props.seriesValue) == "{}"){
        return
    }
    this.chart = echarts.init(this.refs.shop, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    if(JSON.stringify(this.props.seriesValue) == "{}"){
        return
    }
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['shop'] == 'undefined'){
      myChart = echarts.init(document.getElementById('shop'))
      myCharts.shop = myChart
    }else{
      myChart = myCharts['shop']
    }
    // var myChart = echarts.init(document.getElementById('shop'));
    var value = this.props.series;
    var values = this.props.seriesValue;
    
    var day =[],order_count=[],avg_count=[],avg_amount=[],avg_price=[];
    for(var i = 0 ;i<value.length;i++){
      day.push(value[i].order_day);
      avg_amount.push(value[i].avg_sale_amount);
      avg_count.push(value[i].avg_sale_count);
      order_count.push(value[i].order_count);
      avg_price.push(value[i].avg_price);
    }
    var colors = ['#4A90E2','#A5B9EA'];
    option = {
      color: colors,
      animation: needAnimation,
      tooltip: {
          trigger: 'axis',
      },
      grid: {
          right: '20%'
      },
      
      legend: {
          data:[lang_obj[lang]['price_k'],lang_obj[lang]['price_j'],lang_obj[lang]['day_piece_quantity'],lang_obj[lang]['pattern_rate']]
      },
      xAxis: [
          {
            type: 'category',
            splitLine:{
              show:[true]
            },
            axisLabel: {
              interval: 0,
              margin:10,
              rotate:30
            },
            data: day
          }
      ],
      yAxis: [
        {
              type: 'value',
              name: lang_obj[lang]['day_piece_quantity'],
              min: 0,
              max: values.sale_analysis_max,
              interval: values.sale_analysis_interval,
              position: 'right',
              axisLine: {
                  lineStyle: {
                      color: '#4A90E2'
                  }
              },
              axisLabel: {
                  formatter: '{value}'
              }
          },
          {
              type: 'value',
              name: lang_obj[lang]['pattern_rate'],
              min: 0,
              max: values.bag_rate_max,
              interval: values.bag_rate_interval,
              position: 'right',
              offset: 80,
              axisLine: {
                  lineStyle: {
                      color: '#A5B9EA'
                  }
              },
              axisLabel: {
                  formatter: '{value}'
              }
          },
          {
              type: 'value',
              name: lang_obj[lang]['yuan'],
              min: 0,
              max: values.sale_price_max,
              interval: values.sale_price_interval,
              position: 'left',
              axisLabel: {
                  formatter: '{value}'
              }
          }
          
      ],
      series: [
          {
              name:lang_obj[lang]['day_piece_quantity'],
              type:'bar',
              barGap: 0,
              areaStyle: {
                normal: {
                    color:['#4A90E2'],
                }
              },
              data:order_count
          },
          {
              name:lang_obj[lang]['pattern_rate'],
              type:'bar',
              barGap: 0,
              yAxisIndex: 1,
              areaStyle: {
                normal: {
                    color:['#A5B9EA'],
                }
              },
              data:avg_count
          },
          {
              name:lang_obj[lang]['price_k'],
              type:'line',
              yAxisIndex: 2,
              color:['#FDB87D'],
              data:avg_amount
          },
          {
              name:lang_obj[lang]['price_j'],
              type:'line',
              yAxisIndex: 2,
              color:['#7ED321'],
              data:avg_price
          }
      ]
  };

  console.log('######', values)
  if(JSON.stringify(values) == "{}"){
    return
  }
  myChart.clear()
    myChart.setOption(option, true);
  },
  refreshChart(){
    this.renderChart();
    if(!!this.chart){
        this.chart.resize();
    }
  },
  render(){
    return(
      <div ref = "shop" id = "shop"></div>  
    )
  }
})
module.exports = ShopBarChart;