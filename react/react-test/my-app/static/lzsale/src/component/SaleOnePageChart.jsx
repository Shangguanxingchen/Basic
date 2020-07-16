import React from 'react';
import ReactDom from 'react-dom';
var $ = require('jquery');
var Reflux = require('reflux');
var echarts = require('echarts');
import '../css/common.css';
import '../libs/echarts/dark.js';
import '../libs/echarts/echarts.min.js';
import lang_obj from '../lang/language.js';

var SaleOnePageChart = React.createClass({
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
    this.chart = echarts.init(this.refs.saleOnePage, 'dark');
    this.refreshChart();
  },
  componentDidUpdate(){
    this.refreshChart();
  },
  renderChart(){
    var option;
    var {lang} = this.state;
    var myChart = echarts.init(document.getElementById('saleOnePage'));
    var value = this.props.series;
    var name=[];
    for(var i = 0 ;i<value.length;i++){
      name.push(value[i].name);
    }
  	option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            right : '20%',
            top : '20%',
            orient: 'vertical',
            data:name
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
            }
        },
        calculable : true,
        series : [
            {
                name: lang_obj[lang]['big_category'],
                type:'pie',
                radius : [30, 110],
                center : ['35%', '50%'],
                roseType : 'area',
                data:value
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
			<div ref = "saleOnePage" id = "saleOnePage"></div>	
		)
	}
})
module.exports = SaleOnePageChart;