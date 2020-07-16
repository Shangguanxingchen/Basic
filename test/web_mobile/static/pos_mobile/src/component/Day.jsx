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

import DayAction from '../actions/DayAction';
import DayStore from '../stores/DayStore'

var Day = React.createClass({
  mixins:[Reflux.listenTo(DayStore,'onStatusChange')],
  getInitialState(){
    return{
      day:{},
      dayLine:[],
      dayLines:[],
      indicator_unassign:0,

    }
  },
  onStatusChange(data){
    this.setState({
      day:data.day,
      dayLine:data.dayLine,
      dayLines:data.dayLines,
      setDay:data.setDay,
      indicator_unassign:data.indicator_unassign
    })
    sessionStorage.setItem('old_value',JSON.stringify(this.state.dayLines))
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
    obj_day.day = year_month_days;
    DayAction.getDay(obj_day);
    this.setState({
      arrMonth: arrMonth,
      year_month_days:year_month_days
    })
    sessionStorage.setItem('day_index',(year_month).slice(0,7)[0]);
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
      if(item == Month){
        $('.Months li').eq(index).addClass('active');
      }
    })
  },
  handleClick(e){
    $(e.target).addClass('active').siblings().removeClass('active');
    var shop_id = this.getShopId('shop_id=');
    var day = e.target.dataset.days; 
    var day_index = e.target.dataset.index;
    sessionStorage.setItem('day_index',day_index);
    sessionStorage.setItem('days',day);
    DayAction.getDay({shop_id:shop_id,day:day});
    var n_day = (this.state.year_month_days).slice(0,7);
    var s_day = (e.target.dataset.days).slice(0,7);
    if(s_day < n_day){
      $('button').attr('disabled',true);
      $('button').css('background','#ccc');
    }else{
      $('button').attr('disabled',false);
      $('button').css('background','#26a9e2');
    }
  },
  handleChange(e){
    var value = e.target.value;
    var sum_value = {},sum_arr = [];
    var index = e.target.dataset.index; 
    var dayLine = this.state.dayLine;
    var count = Number(index)+1;
    // sum_arr.push(sum_value);
    dayLine[index].day_indicator = e.target.value;
    // 保存验证
    var sum = 0;
    this.state.dayLine.map(function(item){
      sum += Number(item.day_indicator);
      return sum;
    })
    
    this.setState({
      dayLine:dayLine,
    })
  },

  handleBlur(e){
    var index = e.target.dataset.index;
    var old_value = sessionStorage.getItem('old_value');
    var new_sum = 0 ,old_sum = 0,add_old_sum;
    this.state.dayLine.map(function(item){
      new_sum += Number(item.day_indicator);
      return new_sum;
    })
    var old_values = JSON.parse(old_value)
    old_values.map(function(item,index){
      old_sum += Number(item.day_indicator);
      return old_sum;
    })
    if(old_sum != 0){
      add_old_sum = old_sum;
    }else{
      add_old_sum = this.state.day.indicator_unassign;
    }

    var indicator_unassign = (add_old_sum - new_sum).toFixed(2);
    $('.content_h').css('paddingBottom','0');
    this.setState({
      indicator_unassign:indicator_unassign
    })
  },
  // myNumberic(e,len) {
  //     var obj=e.srcElement || e.target;
  //     var dot=obj.value.indexOf(".");//alert(e.which);
  //     len =(typeof(len)=="undefined")?2:len;
  //     var  key=e.keyCode|| e.which;
  //     if(key==8 || key==9 || key==46 || (key>=37  && key<=40))//这里为了兼容Firefox的backspace,tab,del,方向键
  //         return true;
  //     if (key<=57 && key>=48) { //数字
  //         if(dot==-1)//没有小数点
  //             return true;
  //         else if(obj.value.length<=dot+len)//小数位数
  //             return true;
  //         } else if((key==46) && dot==-1){//小数点
  //             return true;
  //     }       
  //     return false;
  // },
  handleFocus(e){
    var $this = $(this);
    $('.content_h').css('paddingBottom','300px');
  },
  handleSave(e){
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }

    var day = this.state.dayLine;
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
    set_obj.month = Number(sessionStorage.getItem('day_index'));
    set_obj.shop_day_indicators = ajax_paramas;
    // 保存判断
    var sum = 0;
    this.state.dayLine.map(function(item){
      sum += Number(item.day_indicator);
      return sum;
    })
    if(sum.toFixed(2) >= this.state.day.month_indicator){
       DayAction.setDay(set_obj);
    }else{
      $('#save_bg').css('display','block');
      $('.Close').css('display','block');
    }
    var sumValue = (this.state.day.month_indicator - sum ).toFixed(2);
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

    var day = this.state.dayLine;
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
    set_obj.month = Number(sessionStorage.getItem('day_index'));
    set_obj.shop_day_indicators = ajax_paramas;
    DayAction.setDay(set_obj);
    $('#save_bg').css('display','none');
    $('.succes').css('display','none');
  },
  handleKnow(){
    $('#save_bg').css('display','none');
    $('.btn_message').css('display','none');
  },
  render(){
    var self = this;
    var {arrMonth,day,dayLine,sumValue,indicator_unassign,year_month_days} = this.state;
    // 解决input键盘遮挡输入框
    // $('input[type="text"],textarea').bind('click', function () {
    //   var target = this;
    //   setTimeout(function(){
    //     target.scrollIntoViewIfNeeded();
    //     console.log('scrollIntoViewIfNeeded');
    //   },400);
    // });
    // $('input').bind('click',function(){
    //   var $this = $(this);
    //   $('.content_h').css('paddingBottom','300px');
    // })

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
    let Days = this.state.dayLine;
    let indexs = 0;
    for(let i in Days){
      if(Days[i].day == year_month_days){
        indexs = i;
      }
    }
    var n_days = (this.state.year_month_days).slice(0,7)[0];
    var Month = dayLine.map(function(item,index){
      i++;
      if(Number(sessionStorage.getItem('day_index')) < Number(n_days) ){
        return(
          <div key = {i}>
            <ul key = {i} className= 'content'>
              <li>{item.day}</li>
              <li style={{width:'40%',padding:'10px'}}>
                <input type="number" data-index = {index} value = {item.day_indicator} data-day = {item.day} onChange = {self.handleChange}  onBlur = {self.handleBlur} disabled className='disabled' style={{color: '#ccc'}}/>
              </li>
              <li>{item.rate}</li>
            </ul>
          </div>
        )
      }else{

        if(index < parseInt(indexs)){
          return(
            <div key = {i}>
              <ul key = {i} className= 'content'>
                <li>{item.day}</li>
                <li style={{width:'40%',padding:'10px'}}>
                  <input type="number" data-index = {index} value = {item.day_indicator} data-day = {item.day} onChange = {self.handleChange} onBlur = {self.handleBlur}  onBlur = {self.handleBlur} disabled className='disabled' style={{color: '#ccc'}}/>
                </li>
                <li>{item.rate}</li>
              </ul>
            </div>
          )
        }else{
          return(
            <div key = {i}>
              <ul key = {i} className= 'content'>
                <li>{item.day}</li>
                <li style={{width:'40%',padding:'10px'}}>
                  <input type="number" data-index = {index} value = {item.day_indicator} data-day = {item.day} onChange = {self.handleChange}  onFocus = {self.handleFocus} onBlur = {self.handleBlur} />
                </li>
                <li>{item.rate}</li>
              </ul>
            </div>
          )
        } 

      }
    })
    return(
      <div>
        {/*保存判断弹框*/}
        <div id="save_bg"></div> 
        <div className="btn_message Close">
          <p className="num">少于月指标量<span style={{color:'red'}}>{this.state.sumValue}</span></p>
          <p className="title">日指标量和需大于等于月指标量</p>
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
            <span>门店日指标设置</span>
          </Col>
        </Row>
        <Row type = "flex" className = "content_1 content_2">
          <Col span = {8} className = "left">
            <p style={{textAlign:'center',borderBottom:'1px solid #d5d5d5'}}>请选择月</p>
            <ul className="Months">{ArrMonth}</ul>
          </Col>
          <Col span = {16} className="right">
            <p style={{textAlign:'center',borderBottom:'1px solid #d5d5d5'}}>月指标量 <span style={{fontSize:'20px'}}>¥{day.month_indicator}</span>/<span style={{color:'red',fontSize:'20px'}}>未分配¥{indicator_unassign}</span></p>
            <ul>
              <li>日期</li>
              <li style={{width:'40%'}}>日指标量</li>
              <li>日占比</li>
            </ul>
            <div className = "content_h">
              {Month}
            </div>
            
            <div className="btn">
                <ul>
                  <button className="save" onClick={self.handleSave}>保存设置</button>
                  <a href ="#/header"><li onClick={self.handleClose}>取消</li></a>
                </ul>
              </div>
          </Col> 
        </Row>
      </div> 
    )


  }
})
module.exports = Day