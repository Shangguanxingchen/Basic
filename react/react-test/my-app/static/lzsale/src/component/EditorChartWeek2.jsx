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
    this.chart = echarts.init(this.refs.editor_product2, 'dark');
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
    if(typeof myCharts['editor_product2'] == 'undefined'){
      myChart = echarts.init(document.getElementById('editor_product2'))
      myCharts.editor_product2 = myChart
    }else{
      myChart = myCharts['editor_product2']
    }
    // var myChart = echarts.init(document.getElementById('editor_product2'));
    var names = [],amount;
    for(var i =0 ;i < values.length;i++){
      names.push(values[i].product_name);
      amount = values[i].sale_amount;
    }
    var data= [amount];
    var xMax=max.product_max;
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
              data:[{value:amount,itemStyle:{normal:{color:'#59c3b6'}}}]
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
      <div ref = "editor_product2" id = "editor_product2"></div>     
		)
	}
})
module.exports = EditorChart;