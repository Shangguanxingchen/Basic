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
      dataNum:null,   // 是否简化显示,不显示各种线
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
    var values = this.props.dataNum;
    option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
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
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        series: [
          {
              name: '直接访问',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
              name: '邮件营销',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: '联盟广告',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
              name: '视频广告',
              type: 'bar',
              stack: '总量',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
              name: '搜索引擎',
              type: 'bar',
              stack: '总量',
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
      <div ref = "bar" id = "bar"></div>  
    )
  }
})
module.exports = BarChart;