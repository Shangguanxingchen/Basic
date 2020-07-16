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
      series:[[]],   // 是否简化显示,不显示各种线
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
    this.chart = echarts.init(this.refs.areas, 'dark');
    // this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
    var myChart;
    var {lang} = this.state;
    if(typeof myCharts['areas'] == 'undefined'){
      myChart = echarts.init(document.getElementById('areas'))
      myCharts.areas = myChart
    }else{
      myChart = myCharts['areas']
    }
  	// var myChart = echarts.init(document.getElementById('areas'));
    var values = this.props.series;
    var arr = [];
    for(let i in values){
     arr[i] = [];
     arr[i].push(values[i]['date']);
     arr[i].push(values[i]['indicator']);
     arr[i].push(values[i]['sold_amount']);
     arr[i].push(values[i]['indicator']);
     arr[i].push(values[i]['sold_amount']);
    }
    var new_value = arr;
   //  var max_min = this.props.seriesValue;
   //  var year = [], month_indicator = [], sold_amount = [];
   //  for(var i = 0;i < values.length; i++){
   //    year.push(values[i].month);
   //    month_indicator.push(values[i].month_indicator);
   //    sold_amount.push(values[i].sold_amount);
   //  }
   //  var text = new Date().getFullYear() + '年' + '指标完成率';
  	// option = {
   //    tooltip : {
   //        trigger: 'axis'
   //    },
   //    legend: {
   //        data:['指标量','销售额'],
   //        right:'5px',
   //        top:'5px'
   //    },
   //    xAxis :{
   //        type : 'category',
   //        name: '月',
   //        splitLine:{
   //          show:[true]
   //        },
   //        data : year
   //    },
   //    yAxis: [
   //      {
   //          type: 'value',
   //          name: '销售额（元）',
   //          min: 0,
   //          max: max_min.max,
   //          interval: max_min.interval,
   //          axisLabel: {
   //              formatter: '{value} '
   //          }
   //      }
   //  ],
   //    series : [
   //      {
   //          name:'销售额',
   //          type:'bar',
   //          areaStyle: {normal: {
   //            opacity:0.4,
   //            color:['#2699de'],
   //          }},
   //          color:['#2699de'],
   //          data:sold_amount
   //      },
   //      {
   //          name:'指标量',
   //          type:'line',
   //          data:month_indicator
   //      }
   //    ]
   //  };
   var data0 = splitData(new_value);
    function splitData(rawData) {
        var categoryData = [];
        var values2 = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i][0]);
            values2.push(rawData[i].slice(1));
        }
        return {
            categoryData: categoryData,
            values: values2
        };
    }

    var data_sale = [],data_indi = [];
    for(var i =0 ;i<values.length;i++){
      data_sale.push(values[i].indicator);
      data_indi.push(values[i].sold_amount);
    }

    var option = {
        animation: needAnimation,
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['']
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        formatter: function (params,ticket,callback) {
            var res = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[0].seriesName + ' : ' + params[0].value[1];
            }   res += '<br/>' + lang_obj[lang]['index_quantity'] + ' : ' + params[0].value[0];
            return res;
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : true,
            axisLine: {onZero: false},
            splitLine: {show: true},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            splitNumber: 20
        },
        yAxis: {
          name: lang_obj[lang]['index_quantity'],
          scale: true,
          splitArea: {
              show: false
          },
        },
        series: [
            {
                name: lang_obj[lang]['sales_volume'],
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                  normal: {
                      color: '#FF8497',
                      color0: '#59C0B6',
                      borderColor: '#FF8497',
                      borderColor0: '#59C0B6'
                  },
                  emphasis: {
                      color: 'black',
                      color0: '#444',
                      borderColor: 'black',
                      borderColor0: '#444'
                  }
              }
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
			<div ref = "areas" id = "areas"></div>	
		)
	}
})
module.exports = AreaLineChart;