import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col} from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';

var Reflux = require('reflux');
var $ = require('jquery');

import DayAction from '../actions/DayAction';
import DayStore from '../stores/DayStore'

var Day = React.createClass({
  mixins:[Reflux.listenTo(DayStore,'onStatusChange')],
  getInitialState(){
    return{
      month:{},
      monthLine:[],
      indicator_unassigns:0,
    }
  },
  onStatusChange(data){
    this.setState({
      month:data.month,
      monthLine:data.monthLine,
      setMonth:data.setMonth,
      indicator_unassigns:data.indicator_unassigns
    })
    sessionStorage.setItem('old_value_month',JSON.stringify(this.state.monthLine))
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
  
    // 取12个月
    var arrMonth = []; 
    for(var i=0; i<12;i++){
      var month_arr = i+1;
      arrMonth.push(month_arr);
    }

    var obj_day = {};
    obj_day.shop_id = shop_id;
    // if(sessionStorage.getItem('days')){
    //   obj_day.day = sessionStorage.getItem('days')
    // }else{
    //   obj_day.day = year_month_days;
    // }
    obj_day.day = year_month_days;
    DayAction.getMonth(obj_day);
    this.setState({
      arrMonth: arrMonth,
      year_month_days:year_month_days
    })
  },
  componentDidMount: function(){
    var self = this;
    var Year = new Date().getFullYear();//年
    var Month = new Date().getMonth() + 1;//月
    // $(function () {
    //   FastClick.attach(document.body);
    // });
    // 月份的active
    this.state.arrMonth.map(function(item,index){
      if(sessionStorage.getItem('month_index')){
        $('.Months li').eq(Number(sessionStorage.getItem('month_index'))).addClass('active');
      }else{
        if(item == Month){
          $('.Months li').eq(index).addClass('active');
        }
      }
      
    })
  },
  handleChange(e){
    var value = e.target.value;
    var index = e.target.dataset.index;  
    var monthLine = this.state.monthLine;
    monthLine[index].indicator = e.target.value;
    this.setState({
      monthLine:monthLine,
    })
  },
  handleClick(e){
    $(e.target).addClass('active').siblings().removeClass('active');
    var shop_id = this.getShopId('shop_id=');
    var day = e.target.dataset.days;
    var month_index = e.target.dataset.index;
    var n_day = (this.state.year_month_days).slice(0,7);
    var s_day = (e.target.dataset.days).slice(0,7); 
    if(s_day < n_day){
      $('.content li input').attr('disabled',true);
      $('.content li input').css('color','#ccc');
      $('button').attr('disabled',true);
      $('button').css('background','#ccc');
    }else{
      $('.content li input').attr('disabled',false);
      $('.content li input').css('color','#000');
      $('button').attr('disabled',false);
      $('button').css('background','#26a9e2');
    }
    sessionStorage.setItem('month_index',month_index);
    sessionStorage.setItem('days',day);
    DayAction.getMonth({shop_id:shop_id,day:day});
  },
  handleBlur(e){
    var index = e.target.dataset.index;
    var old_value = sessionStorage.getItem('old_value_month');
    var new_sum = 0 ,old_sum = 0,add_old_sum;
    this.state.monthLine.map(function(item){
      new_sum += Number(item.indicator);
      return new_sum;
    })
    var old_values = JSON.parse(old_value)
    old_values.map(function(item,index){
      old_sum += Number(item.indicator);
      return old_sum;
    })
    if(old_sum != 0){
      add_old_sum = old_sum;
    }else{
      add_old_sum = this.state.month.indicator_unassign;
    }
    var indicator_unassign = (add_old_sum - new_sum).toFixed(2);
    $('.content_h').css('paddingBottom','0');
    this.setState({
      indicator_unassigns:indicator_unassign
    })
  },
  handleFocus(e){
    var $this = $(this);
    $('.content_h').css('paddingBottom','300px');
  },
  handleSave(e){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    
    // if(String(Month).length == 1){
    //     Month = '0' + Month;
    // }if(String(Day).length == 1){
    //     Day = '0' + Day;
    // }
    var day = this.state.monthLine;
    var ajax_paramas = [];
    for(let i in day){
      if(day[i]){
        ajax_paramas.push(day[i])
      }
    }
    var shop_id = this.getShopId('shop_id=');
    var set_obj = {};
    set_obj.shop_id = shop_id;
    set_obj.year = Year;
    if(sessionStorage.getItem('month_index')){
      set_obj.month = Number(sessionStorage.getItem('month_index'));
    }else{
      set_obj.month = Month;
    }
    set_obj.employee_month_indicators = ajax_paramas;

    // 保存判断
    var sum = 0;
    this.state.monthLine.map(function(item){
      sum += Number(item.indicator);
      return sum;
    })
    if(sum.toFixed(2) < this.state.month.shop_month_indicator){
      $('#save_bg').css('display','block');
      $('.Close').css('display','block');
    }else{
      DayAction.setMonth(set_obj);
    }
    var sumValue = (this.state.month.shop_month_indicator - sum ).toFixed(2);
    this.setState({
      sumValue:sumValue
    })

  },
  handleSucces(){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }

    var day = this.state.monthLine;
    var ajax_paramas = [];
    for(let i in day){
      if(day[i]){
        ajax_paramas.push(day[i])
      }
    }
    var shop_id = this.getShopId('shop_id=');
    var set_obj = {};
    set_obj.shop_id = shop_id;
    set_obj.year = Year;
    if(sessionStorage.getItem('month_index')){
      set_obj.month = Number(sessionStorage.getItem('month_index'));
    }else{
      set_obj.month = Month;
    }
    set_obj.employee_month_indicators = ajax_paramas;
    DayAction.setMonth(set_obj);
    $('#save_bg').css('display','none');
    $('.succes').css('display','none');
  },
  handleKnow(){
    $('#save_bg').css('display','none');
    $('.btn_message').css('display','none');
  },
  render(){
    var self = this;
    var {arrMonth,month,monthLine,sumValue,indicator_unassigns} = this.state;
    // 解决input键盘遮挡输入框
    $('input[type="text"],textarea').on('click', function () {
      console.log(123);
      var target = this;
      setTimeout(function(){
        target.scrollIntoViewIfNeeded();
        console.log('scrollIntoViewIfNeeded');
      },400);
    });
    $('input').bind('click',function(){
      var $this = $(this);
      $('.content_h').css('paddingBottom','300px');
    })
    var i = 0;
    var ArrMonth = arrMonth.map(function(item,index){
      i++;
      var Year = new Date().getFullYear();
      var Months = index + 1;
      var indexs = index +1;
      if(String(Months).length == 1){
        Months = '0' + Months;
      }
      if(String(indexs).length == 1){
        indexs = '0' + indexs;
      }
      var day = Year + '-' + Months + '-' + indexs;
      return(
        <li key={i} data-index = {index+1} data-days = {day} onClick = {self.handleClick}>{item}月</li>
      )
    })
    var Month = monthLine.map(function(item,index){
      i++;
      return(
        <ul key = {i} className= 'content'>
          <li>{item.employee_name}</li>
          <li style={{width:'40%',padding:'10px'}}><input type="number" data-index = {index} value = {item.indicator} data-id = {item.employee_id} onChange = {self.handleChange} onFocus = {self.handleFocus} onBlur = {self.handleBlur} /></li>
          <li>{item.take_of}</li>
        </ul>
      )
    })
    return(
      <div>
        {/*保存判断弹框*/}
        <div id="save_bg"></div> 
        <div className="btn_message Close" style={{width:"310px"}}>
          <p className="num">少于月指标量<span style={{color:'red'}}>{this.state.sumValue}</span></p>
          <p className="title">店员月指标量和需大于等于月指标量</p>
          <p className="btn" onClick={this.handleKnow}>知道了</p>
        </div>
        <div className="btn_message succes">
          <img src="static/pos_mobile/src/img/success.png" />
          <p className="btn" onClick={this.handleKnow} style={{padding:'12px'}}>确定</p>
        </div>
        <Row type = "flex" className="nav_header">
          {/*<Col span = {2}>
            <a href ="#/header"><img src="static/indicator/src/img/left.png" className="img"/></a>
          </Col>*/}
          <Col span = {24}>
            <span>店员月指标设置</span>
          </Col>
        </Row>
        <Row type = "flex" className = "content_1 content_2">
          <Col span = {8} className = "left">
            <p style={{textAlign:'center',borderBottom:'1px solid #d5d5d5'}}>请选择月</p>
            <ul className="Months">{ArrMonth}</ul>
          </Col>
          <Col span = {16} className="right">
            <p style={{textAlign:'center',borderBottom:'1px solid #d5d5d5'}}>月指标量 <span style={{fontSize:'20px'}}>{month.shop_month_indicator}</span>/<span style={{color:'red',fontSize:'20px'}}>未分配¥{indicator_unassigns}</span></p>
            <ul>
              <li>日期</li>
              <li style={{width:'40%'}}>月指标量</li>
              <li>月占比</li>
            </ul>
            <div className = "content_h">
              {Month}
            </div>
            <div className="btn">
              <ul>
                <button className="save" onClick={this.handleSave}>保存设置</button>
                <a href ="#/header"><li onClick={this.handleClose}>取消</li></a>
              </ul>
            </div>
            
          </Col> 
        </Row>
      </div> 
    )


  }
})
module.exports = Day