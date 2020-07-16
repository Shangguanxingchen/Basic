import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
var needAnimation = false;
var MemberChart1 = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.member5, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var values = this.props.series;
    var myChart;
    if(typeof myCharts['member5'] == 'undefined'){
      myChart = echarts.init(document.getElementById('member5'))
      myCharts.member5 = myChart
    }else{
      myChart = myCharts['member5']
    }
    // var myChart = echarts.init(document.getElementById('member5'));
    var names = [],amount,zhibiao,complete;
    for(var i =0 ;i < values.length;i++){
      names.push(values[i].employee_name);
      amount = values[i].sold_amount;
      zhibiao = values[i].indicator;
    }
    if(zhibiao == 0 || amount == 0){
      complete = 0
    }else{
      complete = ((amount/zhibiao)*100).toFixed(2);
    }
    var data= [amount];
    var xMax=150;
  	option = {
      animation: needAnimation,
      tooltip:{
      show:false,
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
              label: {normal: {show: true,position: 'left',formatter: '{c}%'}},
              data:[{value:complete,itemStyle:{normal:{color:'#2699de'}}}]
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
      <div ref = "member5" id = "member5"></div>  
		)
	}
})
module.exports = MemberChart1;