import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';

var BarChart = React.createClass({
	chart : null,
  getDefaultProps(){
    return {
      series:{},   // 是否简化显示,不显示各种线
    }
  },
  componentDidMount(){
    this.chart = echarts.init(this.refs.bar, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option,app,timeTicket;
  	var myChart = echarts.init(document.getElementById('bar'));
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
            data: ['月指标量','月完成量','人均完成量','月贡献', '完成率']
        },
        toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
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
              name: '月指标量',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: indicator
          },
          {
              name: '月完成量',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: sold_amount
          },
          {
              name: '人均完成量',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: avg_sold_amount
          },
          {
              name: '月贡献',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: contribute
          },
          {
              name: '完成率',
              type: 'bar',
              stack: '总量',
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
			<div ref = "bar" id = "bar"></div>	
		)
	}
})
module.exports = BarChart;