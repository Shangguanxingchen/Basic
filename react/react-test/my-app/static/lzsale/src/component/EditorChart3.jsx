import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';

var EditorChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
      seriesValue:{}
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.editor3, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var values = this.props.series;
    var max = this.props.seriesValue;
    var myChart;
    if(typeof myCharts['editor3'] == 'undefined'){
      myChart = echarts.init(document.getElementById('editor3'))
      myCharts.editor3 = myChart
    }else{
      myChart = myCharts['editor3']
    }
    // var myChart = echarts.init(document.getElementById('editor3'));
    var names = [],amount;
    for(var i =0 ;i < values.length;i++){
      names.push(values[i].category_name);
      amount = values[i].sale_amount;
    }
    var data= [amount];
    var xMax=max.category_max;
  	option = {
      tooltip:{
      show:true,
      formatter:"{b} {c}"
    },
    grid:{
      left:50,
      top:50,
      bottom:'0',
      right:'0'
    },
      xAxis : [
          {
            max:xMax,
            type : 'value',
            axisTick: {show: false},
            axisLine: {show:false},
            axisLabel: {show:false},
            splitLine: {show: false}
          }
      ],
      yAxis : [
          {
            type : 'category',
            data : names,
            nameTextStyle:{color:'#b7ce9e',fontSize:'18px'},
            axisLabel: {show:false},
            axisTick: {show: false},
            axisLine: {show: false}
          }
      ],
      series : [
          { 
              name:' ',
              type: 'bar',
              barWidth:16,
              silent:true,
              itemStyle: {normal: {color: '#f9f9f9'}},
              barGap:'-100%',
              barCategoryGap:'50%',
              data: data.map(function(d){return xMax}),
          },
          {
              name:' ',
              type:'bar',
              barWidth:16,
              label: {normal: {show: false,position: 'right',formatter: '{c}%'}},
              data:[{value:amount,itemStyle:{normal:{color:'#1296db'}}}]
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

    // var value = this.props.series;

		return(
      <div ref = "editor3" id = "editor3"></div>  
		)
	}
})
module.exports = EditorChart;