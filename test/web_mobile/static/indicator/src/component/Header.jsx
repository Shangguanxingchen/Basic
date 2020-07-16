import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col} from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';

var Reflux = require('reflux');
var $ = require('jquery');

import GaugeChart from './GaugeChart.jsx';
import GaugeDayChart from './GaugeDayChart.jsx';
import AreaLineChart from './AreaLineChart.jsx';
import BarChart from './BarChart.jsx';
import BarCharts from './BarCharts.jsx';

import HeaderAction from '../actions/HeaderAction';
import HeaderStore from '../stores/HeaderStore'

var Header = React.createClass({
  mixins:[Reflux.listenTo(HeaderStore,'onStatusChange')],
  getInitialState(){
    return{
      month_indicator:0,  //月指标量
      month_done:0,      //月已完成
      month_dones:0,     //月完成率
      day_indicator:0,  //日指标量
      day_done:0,      //日已完成
      day_dones:0,     //日完成率
    }
  },
  onStatusChange(data){
    this.setState({
      month_indicator:data.month_indicator.month_indicator,
      month_done:data.month_indicator.sold_amount,
      month_dones:data.month_indicator.complete_rate,
      day_indicator:data.day_indicator.day_indicator,
      day_done:data.day_indicator.sold_amount,
      day_dones:data.day_indicator.complete_rate,
      year_indicator:data.year_indicator,
      member :data.member.data,
      members: data.members,

    })
  },
  // 通过url获取shop_id
  getShopId(str){
      var url = location.href;
      var index = url.indexOf(str) + 8,//等于号后面一个字符开始检测
          fixed_index = url.indexOf(str) + 8,
          reg = /\d/,
          i = 0, //标记shop_id后面有几个数字, 这一串完整的数字是id
          id = 0;
      function getNums(index) {
          if(reg.test(url.substr(index, 1))){
              i++;
              getNums(++index);
          }
      }
      getNums(index);
      id = url.substr(fixed_index, i);
      return parseInt(id);
  },
  componentWillMount(){
    // 获取年月日
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    
    var year_month = Year + '年' + Month + '月'; 
    var year_month_day = Year + '年' + Month + '月' + Day + '日' ;
    this.setState({
      year:Year,
      year_month : year_month, //年月
      year_month_day : year_month_day, //年月日
    })
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    var year_month_days = Year + '-' + Month + '-' + Day;
    var shop_id = this.getShopId('shop_id=');
    var obj_month = {},obj_day = {},obj_year = {},obj_member = {};

    obj_month.shop_id = shop_id;
    obj_month.year = Year;
    obj_month.month = Number(Month);
    HeaderAction.getMonth(obj_month);

    obj_day.shop_id = shop_id;
    obj_day.day = year_month_days;
    HeaderAction.getDay(obj_day);

    obj_year.shop_id = shop_id;
    obj_year.year = Year;
    HeaderAction.getTrend(obj_year);

    var types = sessionStorage.getItem('selectChart') ? sessionStorage.getItem('selectChart') : 'month';
    obj_member.shop_id = shop_id;
    obj_member.day = year_month_days;
    obj_member.type = types;
    HeaderAction.getMember(obj_member);

    // sessionStorage 
    sessionStorage.setItem('selectChart','month');

  },
  componentDidMount(){
    // $(function() {
    //   FastClick.attach(document.body);
    // });
    var types = sessionStorage.getItem('selectChart') ? sessionStorage.getItem('selectChart') : 'month';
    this.selectChart(types);
  },
  handleClick:function(){
    var self = this;
    $('.nav_header .right_nav ul').addClass('active');
  },
  selectTab(e){
    $(e.target).addClass('active').siblings().removeClass('active');
    sessionStorage.setItem('selectChart',e.target.dataset.type);
    this.selectChart(e.target.dataset.type);
  },
  selectChart(type){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    var obj_member = {};
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    var year_month_days = Year + '-' + Month + '-' + Day;
    var shop_id = this.getShopId('shop_id=');
    obj_member.shop_id = shop_id;
    obj_member.day = year_month_days;
    obj_member.type = type;
    HeaderAction.getMember(obj_member);
  },
  memberLi(){
    var {member} = this.state;
    var element = null,member_id = [];
    $.each(member,function(item,index){
      var member_num = item+1 ;
      member_id.push(index.employee_id);
      sessionStorage.setItem('member_num',member_num);
    })
    for(var i = 0; i < member_id.length;i++){
      for(var j = 0;j < member.length;j++){
        element =  <li key={i} onClick = {this.memberIcon}><img data-id = {member_id[i]} src="static/indicator/src/img/shop.png"/></li>
      }
    }
    return element;
  },
  memberIcon(e){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    var year_month_days = Year + '-' + Month + '-' + Day;
    var obj_memberIcon = {};
    var employee_id = e.target.dataset.id;
    obj_memberIcon.shop_id = this.getShopId('shop_id=');
    obj_memberIcon.day = year_month_days;
    obj_memberIcon.type = sessionStorage.getItem('selectChart');
    obj_memberIcon.employee_id = employee_id;

    HeaderAction.getMemberIcon(obj_memberIcon);

  },
	render(){
    var self = this;
    var i = 0,member_icon = [];
    var {year,year_month ,month_indicator ,month_done ,month_dones ,year_month_day ,day_indicator ,day_done ,day_dones, year_indicator,member,members} = this.state;
    $('.content_1').click(function(){
      $('.tab').removeClass('active');
    })
    
    return(
      <div>
        <Row type = "flex" className="nav_header">
          <Col span = {21}>
            <span>门店指标</span>
          </Col>
          <Col span={3}>
            <div className = "right_nav" onClick = {this.handleClick}>
              设置指标<img src="static/indicator/src/img/seting.png" className="imgs" />
              <div>
                <ul className="tab">
                  <a href = "#/day"><li className="tab_bottom">门店日指标</li></a>
                  <a href = "#/month"><li>店员月指标</li></a>
                </ul>
              </div>
            </div>
          </Col>
          </Row>
          <Row type = "flex" className = "content_1">
            <Col span = {8} className = "left">
              <p className = "title"><img src="static/indicator/src/img/title.png" />门店销售指标</p>
              <p><span className="font_color">本月</span> <span>{year_month}</span> </p>
              <p><span>指标量</span> <span className = "margin_left">¥{month_indicator}</span> </p>
              <p><span>已完成</span> <span className = "margin_left">¥{month_done}</span> </p>
              <p><span>完成率</span> <span className = "margin_left red">{month_dones}</span> </p>
              <div className = "line"></div>
              <p><span className="font_color">今日</span> <span>{year_month_day}</span> </p>
              <p><span>指标量</span> <span className = "margin_left">¥{day_indicator}</span> </p>
              <p><span>已完成</span> <span className = "margin_left">¥{day_done}</span> </p>
              <p><span>完成率</span> <span className = "margin_left green">{day_dones}</span> </p>
            </Col>
            <Col span = {16}>
              <Col span = {12} className = "left">
                <p>{year_month}<span className="marginLeft">指标完成率</span></p>
                <GaugeChart series = {month_dones}/>
                <div className = "lines"></div>
              </Col>
              <Col span = {12}>
                <p>{year_month_day}<span className="marginLeft">指标完成率</span></p>
                <GaugeDayChart series = {day_dones}/>
                <div className = "line"></div>
              </Col>

              <p style={{display:'inline-block'}}>{year}年<span className="marginLeft">指标完成率</span></p>
              <AreaLineChart series = {year_indicator}/>
            </Col> 
          </Row>
          <Row type = "flex" className = "content_1">
            <Col span = {19} className="shop_header">
              <p className = "title"><img src="static/indicator/src/img/title.png" />店员销售指标 <span className = "margin_left" style={{fontSize:'14px'}}>{year_month_day}</span></p>
            </Col>
            <Col span = {5} className="shop_header">
              <ul onClick = {this.selectTab}>
                <li data-type = "month" className="active">月</li>
                <li data-type = "day">日</li>
              </ul>
            </Col>
          </Row>
          <Row type = "flex">
            <Col span = {24} style={{paddingTop:'10px'}}>
              <BarChart series = {member}/>
              <ul className= "member_line">
                {this.memberLi()}
              </ul>
            </Col>
          </Row>
      </div> 
    )

  }
})

module.exports = Header