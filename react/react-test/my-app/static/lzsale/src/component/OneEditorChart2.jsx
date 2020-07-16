import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
var needAnimation = false;
var EditorChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.Inditor2, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var myChart;
    if(typeof myCharts['Inditor2'] == 'undefined'){
      myChart = echarts.init(document.getElementById('Inditor2'))
      myCharts.Inditor2 = myChart
    }else{
      myChart = myCharts['Inditor2']
    }
    // var myChart = echarts.init(document.getElementById('Inditor2'));
    var value = this.props.series;
    var sale_amount = value.sold_amount;
    var zhibiao = value.week_indicator;
    // var num = ((sale_amount/zhibiao)*100).toFixed(2);
    var num;
    if(sale_amount == 0){
        num = 0;
    }else if(zhibiao == 0){
        num = '--';
    }else{
        num = ((sale_amount/zhibiao)*100).toFixed(2);
    }
  	option = {
      animation: needAnimation,
      "toolbox": {
        "show": false,
        "feature": {
            "mark": {
                "show": true
            },
            "restore": {
                "show": true
            },
            "saveAsImage": {
                "show": true
            }
        }
    },
    "series": [{
        "min":0,
        "max":150,
        "name": "指标",
        "type": "gauge",
        "startAngle": 180, //总的360，设置180就是半圆
        "endAngle": 0,
        "center": ["50%", "77%"], //整体的位置设置
        "radius": 130,
        "axisLine": {
            "lineStyle": {
                "width": 20, //柱子的宽度
                "color": [[0.2, "#ff8497"],[0.8, "#ffc0a7"], [1, "#59c0b6"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
            }
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "distance":-50,
            "textStyle": {
                color: 'auto'
            }
        },
        "splitLine": {
            "show": false
        },
        "pointer": {
            "width": 10, //指针的宽度
            "length": "80%", //指针长度，按照半圆半径的百分比
            "color": "#2d99e2"
        },
        "title": {
            "show": true,
            "offsetCenter": [25, "25%"], //标题位置设置
            "textStyle": { //标题样式设置
                "color": "#2d99e2",
                "fontSize": 15,
                "fontFamily": "微软雅黑",
                "fontWeight": "bold"
            }
        },
        "detail": {
            "show": false
        },
        "data": [{ //显示数据
            "value": num,
            "name": num + '%'
        }]
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
			<div ref = "Inditor2" id = "Inditor2"></div>	
		)
	}
})
module.exports = EditorChart;