import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col} from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import moment from 'moment'
var Reflux = require('reflux');
const { MonthPicker, RangePicker } = DatePicker;
var $ = require('jquery');

import OneEditorChart from './OneEditorChart.jsx';
import OneEditorChart2 from './OneEditorChart2.jsx';
import OneEditorChart3 from './OneEditorChart3.jsx';

import MemberChart1 from './MemberChart1.jsx';
import MemberChart2 from './MemberChart2.jsx';
import MemberChart3 from './MemberChart3.jsx';
import MemberChart4 from './MemberChart4.jsx';
import MemberChart5 from './MemberChart5.jsx';


import GaugeChart from './GaugeChart.jsx';
import GaugeDayChart from './GaugeDayChart.jsx';
import AreaLineChart from './AreaLineChartIndi.jsx';
import BarChart from './BarChartDay.jsx';
import BarCharts from './BarChartMonth.jsx';

import HeaderAction from '../actions/IndiAction.jsx';
import HeaderStore from '../stores/IndiStore.jsx'

import lang_obj from '../lang/language.js';

var Header = React.createClass({
  mixins:[Reflux.listenTo(HeaderStore,'onStatusChange')],
  getInitialState(){

    console.log('componentWillMount');
    var language = lang_obj.get_lang('lang');
    // if( (typeof language == 'undefined') || (language != 'en'&&language != 'zh-Hant') ){
    //   language = 'cn'
    // }
    return{
      lang: language,
      day_all:{},
      week_all:{},
      month_all:{},
      month_indicator:'--',  //月指标量
      month_done:'--',      //月已完成
      month_dones:'--',     //月完成率
      day_indicator:'--',  //日指标量
      day_done:'--',      //日已完成
      day_dones:'--',     //日完成率
      week_indicator:'--',  //周指标量
      week_done:'--',      //周已完成
      week_dones:'--',     //周完成率
      member:[],
      membericon:[],
      header:[],
      shop_list:[],
      table_headers_list:[],
      // date_str:lang_obj[language]['today'],
      avg_amount:'--',
      max_min:{},
      join:'',
      getWeek:'--',
      start_date:'--',
      end_date:'--'
    }
  },
  onStatusChange(data){

    console.log('onStatusChange');
    var one = sessionStorage.getItem('two_one'),
        two = sessionStorage.getItem('two_two'),
        three = sessionStorage.getItem('two_three'),
        four = sessionStorage.getItem('two_four'),
        five = sessionStorage.getItem('two_five');
    if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1'){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.circle_loading1').hide();
      $('.circle_loading2').hide();
    }

    if(data){
      if(typeof data.day_indicator.sold_amount == 'number'){
        data.day_indicator.sold_amount = (data.day_indicator.sold_amount).toFixed(2);
      }
      if(typeof data.week_indicator.sold_amount == 'number'){
        data.week_indicator.sold_amount = (data.week_indicator.sold_amount).toFixed(2);
      }
      if(typeof data.month_indicator.sold_amount == 'number'){
        data.month_indicator.sold_amount = (data.month_indicator.sold_amount).toFixed(2);
      }

      this.setState({
        day_all:data.day_indicator,
        week_all:data.week_indicator,
        month_all:data.month_indicator,
        month_indicator:data.month_indicator.month_indicator,
        month_done:data.month_indicator.sold_amount,
        month_dones:data.month_indicator.complete_rate,
        day_indicator:data.day_indicator.day_indicator,
        day_done:data.day_indicator.sold_amount,
        day_dones:data.day_indicator.complete_rate,
        week_indicator:data.week_indicator.week_indicator,
        week_done:data.week_indicator.sold_amount,
        week_dones:data.week_indicator.complete_rate,
        year_indicator:data.year_indicator,
        max_min:data.max_min,
        member :data.member.data,
        avg_amount:data.member.avg_sold_amount,
        // date_str:lang_obj[this.state.lang]['today'],
        members: data.members,
        membericon:data.membericon,
        header:data.header,
        shop_list:data.shop_list.records,
        table_headers_list:data.shop_list.table_headers,
        join:data.join
      })
    }
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
    console.log('componentWillMount');
    $('.circle_loading').show();
    $('.circle_loading1').show();
    $('.circle_loading2').show();
    sessionStorage.setItem('two_one', '0')
    sessionStorage.setItem('two_two', '0')
    sessionStorage.setItem('two_three', '0')
    sessionStorage.setItem('two_four', '0')
    sessionStorage.setItem('two_five', '0')
    // 获取年月日
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();

    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    var nowDate_year = date.getFullYear();
    var nowDate_month = date.getMonth()+1;
    var nowDate_day = date.getDate();
    if(String(nowDate_month).length == 1){
        nowDate_month = '0' + nowDate_month;
    }if(String(nowDate_day).length == 1){
        nowDate_day = '0' + nowDate_day;
    }
    var start_date = nowDate_year + '-' + nowDate_month + '-' + nowDate_day; 
    date.setDate(date.getDate() + 6);
    var will_year = date.getFullYear();
    var will_month = date.getMonth()+1;
    var will_day = date.getDate();
    if(String(will_month).length == 1){
        will_month = '0' + will_month;
    }if(String(will_day).length == 1){
        will_day = '0' + will_day;
    }
    var end_date = will_year + '-' + will_month + '-' + will_day;

    var year_month = Year + '-' + Month;
    var year_months = Year + '-' + Month;
    var thisDay = Year + '-' + Month; 
    var date_str = lang_obj[this.state.lang]['today'];
    var year_month_day = Year + '-' + Month + '-' + Day ;

    var shopday = Year + '-' + Month;
    var year_month_days = Year + '-' + Month + '-' + Day;
    var shop_id = this.getShopId('shop_id=');
    var obj_month = {},obj_day = {},obj_year = {},obj_member = {};

    if(!! Two.getDay){
      this.setState({
        day_indicator:Two.getDay.day_indicator,
        day_done:Two.getDay.sold_amount,
        day_dones:Two.getDay.complete_rate,
      })
      sessionStorage.setItem('two_one','1');
    }else{
      obj_day.shop_id = shop_id;
      obj_day.day = year_month_days;
      HeaderAction.getDay(obj_day);
    }

    if(!! Two.getMonth){
      this.setState({
        month_all:Two.getMonth.month_indicator,
        month_indicator:Two.getMonth.month_indicator,
        month_done:Two.getMonth.sold_amount,
        month_dones:Two.getMonth.complete_rate,
      })
      sessionStorage.setItem('two_two','1');
    }else{
      obj_month.shop_id = shop_id;
      obj_month.year = Year;
      obj_month.month = Number(Month);
      HeaderAction.getMonth(obj_month);
    }

    if(!! Two.getWeek){
      this.setState({
        week_indicator:Two.getWeek.week_indicator,
        week_done:Two.getWeek.sold_amount,
        week_dones:Two.getWeek.complete_rate,
      })
      sessionStorage.setItem('two_three','1');
    }else{
      HeaderAction.getWeek({shop_id:shop_id});
    }

    if(!! Two.getTrend){
      this.setState({
        year_indicator:Two.getTrend.data,
        max_min:Two.getTrend.max_min,
      })
      sessionStorage.setItem('two_four','1');
    }else{
      obj_year.shop_id = shop_id;
      obj_year.date = year_month_day;
      obj_year.type = 'day';
      HeaderAction.getTrend(obj_year);
    }

    if(!! Two.getMember){
      this.setState({
        member:Two.getMember.data,
        avg_amount:Two.getMember.avg_sold_amount,
      })
      sessionStorage.setItem('two_five','1');
    }else{
      var types = sessionStorage.getItem('selectChart') ? sessionStorage.getItem('selectChart') : 'day';
      obj_member.shop_id = shop_id;
      obj_member.day = year_month_days;
      obj_member.type = types;
      HeaderAction.getMember(obj_member);
    }

    // 计算当前日期在本月份的周数  
    Date.prototype.getWeekOfMonth = function(weekStart) {  
        weekStart = (weekStart || 0) - 0;  
        if(isNaN(weekStart) || weekStart > 6)  
            weekStart = 0;  
      
        var dayOfWeek = this.getDay();  
        var day = this.getDate();  
        return Math.ceil((day - dayOfWeek - 1) / 7) + ((dayOfWeek >= weekStart) ? 1 : 0);  
    }
    var getWeek = (new Date()).getWeekOfMonth(); 

    // sessionStorage 
    sessionStorage.setItem('selectChart','day');
    this.setState({
      date:thisDay,
      dates:thisDay,
      year:Year,
      year_month : year_month, //年月
      year_months: year_month,
      year_month_day : year_month_day, //年月日
      year_month_days: year_month_days,
      date_str : date_str,
      shopday:shopday, //年月
      getWeek : getWeek,
      start_date:start_date,
      end_date:end_date
    })
  },
  componentDidMount(){
    console.log('componentDidMount');
    // $(function() {
    //   FastClick.attach(document.body);
    // });
    var one = sessionStorage.getItem('two_one'),
        two = sessionStorage.getItem('two_two'),
        three = sessionStorage.getItem('two_three'),
        four = sessionStorage.getItem('two_four'),
        five = sessionStorage.getItem('two_five');

    if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1'){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.circle_loading1').hide();
      $('.circle_loading2').hide();
    }
    var two_tab1 = sessionStorage.getItem('two_tab1'),
        two_tab2 = sessionStorage.getItem('two_tab2');

    if(two_tab1 == '1' && two_tab2 == '1'){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.circle_loading1').hide();
      $('.circle_loading2').hide();
    }
    var types = sessionStorage.getItem('selectChart') ? sessionStorage.getItem('selectChart') : 'day';
    this.selectChart(types);
  },
  handleClick:function(){
    var self = this;
    $('.right_nav ul').addClass('active');
  },
  selectTabs(e){
    var {year_month_day} = this.state;
    // var {date_str} = this.state;

    $(e.target).addClass('active').siblings().removeClass('active');
    if($(e.target).hasClass('click')){
      return;
    }
    $('.circle_loading1').show();
    $(e.target).addClass('click').siblings().removeClass('click');
    var shop_id = this.getShopId('shop_id=');
    // 本地存储日,周,月的缓存
    var _item = '' ,_item2 = '',_item3 = '';
    switch(e.target.dataset.type){
      case 'day':
        _item = 'select_day_sale_i';
      break;
      case 'week':
        _item3 = 'select_week_sale_i';
      break;
      case 'month':
        _item2 = 'select_month_sale_i';
      break;
    }
    var sale_day = JSON.parse(sessionStorage.getItem(_item));
    var sale_week = JSON.parse(sessionStorage.getItem(_item3));
    var sale_month = JSON.parse(sessionStorage.getItem(_item2));
    var flag = false; 
    if(sale_day){
      $('.circle_loading1').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        year_indicator:sale_day.data,
        max_min:sale_day.max_min,
      })
      flag = true;
    }else if(sale_week){
      $('.circle_loading1').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        year_indicator:sale_week.data,
        max_min:sale_week.max_min,
      })
      flag = true;
    }else if(sale_month){
      $('.circle_loading1').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        year_indicator:sale_month.data,
        max_min:sale_month.max_min,
      })
      flag = true;
    }
    if(flag){
      return;
    }
    var shop_id = this.getShopId('shop_id');
    HeaderAction.getTrend({shop_id:shop_id,date:year_month_day,type:e.target.dataset.type});
  },
  selectTab(e){
    $(e.target).addClass('active').siblings().removeClass('active');
    if($(e.target).hasClass('click')){
      return;
    }
    $('.bg_wrap').show();
    $('.circle_loading2').show();
    sessionStorage.setItem('two_tab1','0');
    $(e.target).addClass('click').siblings().removeClass('click');
    sessionStorage.setItem('selectChart',e.target.dataset.type);
    var shop_id = this.getShopId('shop_id=');
    // 本地存储日,周,月的缓存
    var _item = '' ,_item2 = '',_item3 = '';
    switch(e.target.dataset.type){
      case 'day':
        _item = 'select_day_i';
        var date_str = lang_obj[this.state.lang]['today'];
        this.setState({
          date_str: date_str,
          year_month_day:this.state.year_month_days
        })
      break;
      case 'week':
        _item3 = 'select_week_i';
        var getWeek = (new Date()).getWeekOfMonth();
        var date_str = lang_obj[this.state.lang]['base'] + lang_obj[this.state.lang]['week1'] + ' ' + getWeek + ' ' + lang_obj[this.state.lang]['week2'];
        this.setState({
          date_str: date_str,
          year_month_day: this.state.start_date + '/' + this.state.end_date
        })
      break;
      case 'month':
        _item2 = 'select_month_i';
        var date_str = lang_obj[this.state.lang]['now_month'];
        this.setState({
          date_str: date_str,
          year_month_day : this.state.dates
        })
      break;
    }
    var sale_day = JSON.parse(sessionStorage.getItem(_item));
    var sale_week = JSON.parse(sessionStorage.getItem(_item3));
    var sale_month = JSON.parse(sessionStorage.getItem(_item2));
    var flag = false; 
    if(sale_day){
      $('.bg_wrap').hide();
      $('.circle_loading2').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        member: sale_day.data,
        avg_amount:sale_day.avg_sold_amount,
      })
      flag = true;
    }else if(sale_week){
      $('.bg_wrap').hide();
      $('.circle_loading2').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        member:sale_week.data,
        avg_amount:sale_week.avg_sold_amount,
      })
      flag = true;
    }else if(sale_month){
      $('.bg_wrap').hide();
      $('.circle_loading2').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        member:sale_month.data,
        avg_amount:sale_month.avg_sold_amount,
      })
      flag = true;
    }
    if(flag){
      return;
    }

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
    var element = null,member_id = [], i = 0;
    $.each(member,function(item,index){
      var member_num = item+1 ;
      member_id.push(index.employee_id);
      sessionStorage.setItem('member_num',member_num);
    })
    var memberArr = member.slice(0,5);
    memberArr =  memberArr.reverse();
    element = memberArr.map((item,index) =>{
      i++;
      return <li key={i} onClick = {this.memberIcon}><img data-id = {member_id[index]} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/>
      </li>
    })
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
    $('.right_blocks').css('display','block');
    var year_month_days = Year + '-' + Month + '-' + Day;
    var obj_memberIcon = {};
    var employee_id = e.target.dataset.id;
    obj_memberIcon.shop_id = this.getShopId('shop_id=');
    obj_memberIcon.day = year_month_days;
    obj_memberIcon.type = sessionStorage.getItem('selectChart');
    obj_memberIcon.employee_id = parseInt(employee_id);
    var memberName = e.target.dataset.name;
    this.setState({
      memberName: memberName
    })
    HeaderAction.getMemberIcon(obj_memberIcon);
  },
  memberBtnBlock(e){
    var i = 0,element = null;
    element = Array.isArray(this.state.member)? this.state.member.map((item,index) =>{
      i++;
      return <li key={i} onClick = {this.memberIcons} data-id = {item.employee_id} data-name ={item.employee_name}><img data-id = {item.employee_id} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/>{item.employee_name}{item.shopkeeper}<div className="add"><img  className="add_left" style={{width:'15px'}} src="static/lzsale/src/img/left1.png" /></div>
      </li>
    }):<div></div> 
    if($('.right_block .left ul li').hasClass('active')){
      
    }else{
      $('.right_block .left ul li:first-child').addClass('active');
      $('.right_block .left ul li:first-child').find('.add').show();
    }

    return element;
  },
  memberIcons(e){
    $('.circle_loading_b').show();
    var {year_month_days,dates} = this.state;
    $(e.target).addClass('active').siblings().removeClass('active');
    $(e.target).find('.add').show().parent('li').siblings().find('.add').hide()
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    $('.all').css('display','block');
    var year_month_days = Year + '-' + Month + '-' + Day;
    var obj_memberIcon = {};
    var employee_id = e.target.dataset.id;
    sessionStorage.setItem('memberId',employee_id);
    obj_memberIcon.shop_id = this.getShopId('shop_id=');
    if(dates){
      obj_memberIcon.day = dates;
    }else{
      obj_memberIcon.day = year_month_days;
    }
    obj_memberIcon.type = sessionStorage.getItem('selectChart');
    obj_memberIcon.employee_id = parseInt(employee_id);
    var memberName = e.target.dataset.name;
    this.setState({
      memberName: memberName
    })

    HeaderAction.getMemberIcon(obj_memberIcon);
  },
  memberBtn(){
    $('.all').show();
    $('.background').show();
    $('body').css({overflow:'hidden'});
    $('.circle_loading_b').show();
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
    var shopday = Year + '-' + Month;

    var obj_memberIcon = {};
    obj_memberIcon.shop_id = this.getShopId('shop_id=');
    obj_memberIcon.day = year_month_days;
    obj_memberIcon.type = sessionStorage.getItem('selectChart');
    obj_memberIcon.employee_id = this.state.member[0].employee_id;
    HeaderAction.getMemberIcon(obj_memberIcon);
    this.setState({
      dates:shopday,
      year_months:shopday
    })
    // $('.content_block li:first').addClass('active');
    // $('.content_block li:first .add').show();
  },
  oneMore(){
    // 查看更多详情
    $('.circle_loading_a').show();
    var {year_month,date} = this.state;
    var target = '';
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();
    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    var shopday = Year + '-' + Month;
    var shop_id = this.getShopId('shop_id=');
    $('.background').show();
    $('.one_block').show();
    $('body').css({overflow:'hidden'});
    if(sessionStorage.getItem('select_type')){
      target = sessionStorage.getItem('select_type');
    }else{
      target = 'day'
    }
    HeaderAction.getShopList({date:shopday,shop_id:shop_id,type:target});
    this.setState({
      date:shopday,
      year_month:shopday
    })
  },
  onChange:function(e){
    // 查看更多详情  日期
    var {year_month,date} = this.state;
    this.setState({
      date:e.target.value,
    })
  },
  moreSearch:function(){
    var {date} = this.state;
    var obj = {};
    obj.date = date;
    obj.shop_id = this.getShopId('shop_id=');
    if(sessionStorage.getItem('select_type')){
      obj.type = sessionStorage.getItem('select_type');
    }else{
      obj.type = 'day';
    }
    $('.circle_loading_a').show();
    HeaderAction.getShopList(obj);
    this.setState({
      year_month:date
    })
  },
  onChanges:function(e){
    var {year_month,dates} = this.state;
    this.setState({
      dates:e.target.value,
    })
  },
  moreSearchs:function(){
    var {dates} = this.state;
    var obj_memberIcon = {},employee_id;
    obj_memberIcon.shop_id = this.getShopId('shop_id=');
    obj_memberIcon.day = dates;
    obj_memberIcon.type = sessionStorage.getItem('selectChart');
    if(sessionStorage.getItem('memberId')){
      employee_id = parseInt(sessionStorage.getItem('memberId'))
    }else{
      employee_id = this.state.member[0].employee_id
    }
    $('.circle_loading_b').show();
    obj_memberIcon.employee_id =  employee_id;
    HeaderAction.getMemberIcon(obj_memberIcon);
    this.setState({
      year_months:dates,
    })
  },
  shopList(e){
    $('.circle_loading_a').show();
    $('.one_block_a ul li:first-child').addClass('active');
    var {shopday,date} = this.state;
    $(e.target).addClass('active').siblings().removeClass('active');
    $(e.target).find('.add').show().parent('li').siblings().find('.add').hide()
    var obj ={};
    if(date){
      obj.date = date;
    }else{
      obj.date = shopday;
    }
    obj.shop_id = this.getShopId('shop_id=');
    obj.type = e.target.dataset.type;
    sessionStorage.setItem('select_type',e.target.dataset.type);
    HeaderAction.getShopList(obj);
  },
  clickHelp(e){
    $('.background').show();
    $('body').css('overflow','hidden');
    if(e.target.dataset.set == 'one'){
      $('.help-modeTwo-one').show();
    }else if(e.target.dataset.set == 'two'){
      $('.help-modeTwo-two').show();
    }else if(e.target.dataset.set == 'three'){
      $('.help-modeTwo-three').show();
    }else if(e.target.dataset.set == 'four'){
      $('.help-modeTwo-four').show();
    }else if(e.target.dataset.set == 'five'){
      $('.help-modeTwo-five').show();
    }
  },
  
  render(){
    var self = this;
    var {lang} = this.state;
    var i = 0,member_icon = [],FixBlockArr = [];
    var format = 'YYYY-MM';
    var {day_all,week_all,month_all,date,dates,year,year_month ,year_months,month_indicator ,month_done ,month_dones ,year_month_day ,date_str,year_month_days ,day_indicator ,day_done ,day_dones, week_indicator,week_dones,week_done,year_indicator,max_min,member,members,membericon,header,memberName,shop_list,table_headers_list,avg_amount,join,start_date,end_date,getWeek} = this.state;
    $('.background').click(function(){
      $('.all').hide();
      $('.background').hide();
      $(".one_block").hide();
      $('.right_block.right_blocks').hide();
      $('.right_block.all').hide();
      $('body').css('overflow','inherit');
      $('.help-modeTwo-one').hide();
      $('.help-modeTwo-two').hide();
      $('.help-modeTwo-three').hide();
      $('.help-modeTwo-four').hide();
      $('.help-modeTwo-five').hide();
    })

    $('.content_1').click(function(){
      $('.tab').removeClass('active');
      $('.right_block.right_blocks').css('display','none');
      $('.right_block.all').css('display','none');
    })
    var Header = header.map((item,index) => {
      return(
        <li className='add_photo'>{item.table_name}</li>
      )
    })
    
    var FixBlock = membericon.map((item,index) => {
      return (
        <div key={index}>
          <li>{item.date}</li>
          <li>{item.complete}</li>
          <li>{item.contribute}</li>
          <li>{item.indicator}</li>
          <li>{item.sold_amount}</li>
        </div>
      )
      
    })
    var FixBlocks = membericon.map((item,index) => {
      if(item.complete == '--'){
        $('.other_header').removeClass('other_color');
      }
      if(item.complete <= '50%'){
        $('.other_header').removeClass('other_colors');
        $('.other_header').addClass('other_color');
      }else{
        $('.other_header').removeClass('other_color');
        $('.other_header').addClass('other_colors');
      }
      return (
        <ul key={index}>
          <li>{item.date}</li>
          <li>{item.indicator}</li>
          <li>{item.sold_amount}</li>
          <li className="other_header">{item.complete}</li>
          <li>{item.contribute}</li>
          <li>{item.rank}</li>
        </ul>
      )
      
    })
    var memberArr1 = [],memberArr2 = [],memberArr3 = [],memberArr4 = [],memberArr5 = [];
    if(Array.isArray(member)){
      memberArr1 = member.slice(0,1),
      memberArr2 = member.slice(1,2),
      memberArr3 = member.slice(2,3);
      memberArr4 = member.slice(3,4);
      memberArr5 = member.slice(4,5);
    }
    var ThreeBlock1 = memberArr1.map((item,index) => {
      if(item.sold_amount < avg_amount){
        $('.low1').addClass('low_color');
      }else{
        $('.low1').removeClass('low_color');
      }
    {/*<br /> {item.shopkeeper} 店长*/}
      return(
        <ul className= "member_line" key={index}>
          <li style={{fontSize:"30px",fontStyle:"italic",color:'#222'}} >1<span className="one"><img  data-id = {item.employee_id} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/></span></li>
          <li>{item.employee_name}</li>
          <li className="low1">{(item.sold_amount).toFixed(2)}</li>
          <li>{item.indicator}</li>
          <li>{item.contribute}</li>
          <li style={{width:'33%',textAlign:'left'}}><span className="Chart"><MemberChart1 series={memberArr1}/></span></li>
        </ul>
      )
    })
    var ThreeBlock2 = memberArr2.map((item,index) => {
      if(item.sold_amount < avg_amount){
        $('.low2').addClass('low_color');
      }else{
        $('.low2').removeClass('low_color');
      }
      return(
        <ul className= "member_line" key={index}>
          <li style={{fontSize:"30px",fontStyle:"italic",color:'#222'}} >2<span className="one"><img data-id = {item.employee_id} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/></span></li>
          <li>{item.employee_name}</li>
          <li className="low2">{(item.sold_amount).toFixed(2)}</li>
          <li>{item.indicator}</li>
          <li>{item.contribute}</li>
          <li style={{width:'33%',textAlign:'left'}}><span className="Chart"><MemberChart2 series={memberArr2}/></span></li>
        </ul>
      )
    })
    
    var ThreeBlock3 = memberArr3.map((item,index) => {
      if(item.sold_amount < avg_amount){
        $('.low3').addClass('low_color');
      }else{
        $('.low3').removeClass('low_color');
      }
      return(
        <ul className= "member_line" key={index}>
          <li style={{fontSize:"30px",fontStyle:"italic",color:'#222'}} >3<span className="one"><img data-id = {item.employee_id} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/></span></li>
          <li>{item.employee_name}</li>
          <li className="low3">{(item.sold_amount).toFixed(2)}</li>
          <li>{item.indicator}</li>
          <li>{item.contribute}</li>
          <li style={{width:'33%',textAlign:'left'}}><span className="Chart"><MemberChart3 series={memberArr3}/></span></li>
        </ul>
      )
    })
    
    var ThreeBlock4 = memberArr4.map((item,index) => {
      if(item.sold_amount < avg_amount){
        $('.low4').addClass('low_color');
      }else{
        $('.low4').removeClass('low_color');
      }
      return(
        <ul className= "member_line" key={index}>
          <li style={{fontSize:"30px",fontStyle:"italic",color:'#222'}} >4<span className="one"><img data-id = {item.employee_id} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/></span></li>
          <li>{item.employee_name}</li>
          <li className="low4">{(item.sold_amount).toFixed(2)}</li>
          <li>{item.indicator}</li>
          <li>{item.contribute}</li>
          <li style={{width:'33%',textAlign:'left'}}><span className="Chart"><MemberChart4 series={memberArr4}/></span></li>
        </ul>
      )
    })
    var ThreeBlock5 = memberArr5.map((item,index) => {
      if(item.sold_amount < avg_amount){
        $('.low5').addClass('low_color');
      }else{
        $('.low5').removeClass('low_color');
      }
      return(
        <ul className= "member_line" key={index}>
          <li style={{fontSize:"30px",fontStyle:"italic",color:'#222'}} >5<span className="one"><img data-id = {item.employee_id} data-name ={item.employee_name} src="static/lzsale/src/img/shops.png"/></span></li>
          <li>{item.employee_name}</li>
          <li className="low5">{(item.sold_amount).toFixed(2)}</li>
          <li>{item.indicator}</li>
          <li>{item.contribute}</li>
          <li style={{width:'33%',textAlign:'left'}}><span className="Chart"><MemberChart5 series={memberArr5}/></span></li>
        </ul>
      )
    })
    var table_header = Array.isArray(table_headers_list) ? table_headers_list.map((item,index) => {
      return(
        <div key={index}> 
          <li>{item.date}</li>
          <li>{item.indicator}</li>
          <li>{item.sold_amount}</li>
          <li>{item.complete_rate}</li>
          <li>{item.rank}</li>
        </div>
      )
    }) : <div></div>;

    var ShopDay = Array.isArray(shop_list)?shop_list.map((item,index) => {
      if(item.complete_rate == '--'){
        $('.one_block_b ul').eq(index).find('.other').removeClass('other_color');
      }else if(item.complete_rate > '80%'){
        $('.one_block_b ul').eq(index).find('.other').addClass('other_colors');
      }else{
        $('.one_block_b ul').eq(index).find('.other').addClass('other_color');
      }
      return(
        <ul className="one_block_content" key= {index}>
          <li>{item.date}</li>
          <li>{item.indicator}</li>
          <li>{item.sold_amount}</li>
          <li className='other'>{item.complete_rate}</li>
          <li>{item.rank}</li>
        </ul>
      )

    }): <div></div>
    return(
      <div>
        <Row type = "flex" className="nav_headers BG">
          <Col span={10} className="header">
            <span className="blue_block"></span><div className = "title">{lang_obj[lang]['store_sale_target']}<span style={{color:'#666',padding:'0 20px',fontSize: '18px'}}>{year_month_days}</span>
            <span className="help" data-set="one" onClick={self.clickHelp}><img className="size" data-set="one" src="static/lzsale/src/img/help.png" alt="" style={{height:'30px'}}/></span>
            </div>
          </Col>
          {/*<Col span={14}>
            <div className = "right_nav" onClick = {this.handleClick}>
              设置指标<img src="static/lzsale/src/img/seting.png" className="imgs" />
              <div>
                <ul className="tab">
                  <a href = "#/day"><li className="tab_bottom">门店日指标</li></a>
                  <a href = "#/month"><li>店员月指标</li></a>
                </ul>
              </div>
            </div>
          </Col>*/}
        </Row>
        <Row type = "flex" className = "content_1 block1 BG" style ={{marginTop:'0',marginBottom:'0'}}>
          <Col span={8}>
            <p className="title" style={{textAlign:'center',marginLeft:'-32%'}}><span >{lang_obj[lang]['today']}</span></p>
            <p>{lang_obj[lang]['sales_volume']}<span className="money style_shop">{day_done}</span></p>
            <p>{lang_obj[lang]['index_quantity']}<span className="style_shop">{day_indicator}</span></p>
            <OneEditorChart series={day_all}/>
          </Col>
          <div className="line_right"></div>
          <Col span={8}>
            <p className="title" ><span>{lang_obj[lang]['base']}{lang_obj[lang]['week1']}                {getWeek}                {lang_obj[lang]['week2']} </span></p>
            <p><span className="money style_shop">{week_done}</span></p>
            <p><span className="style_shop">{week_indicator}</span></p>
            <OneEditorChart2 series={week_all}/>
          </Col>
          <div className="line_right"></div>
          <Col span={8} style={{width:'32%'}}>
            <p className="title"><span>{lang_obj[lang]['now_month']}</span></p>
            <p><span className="money style_shop">{month_done}</span></p>
            <p><span className="style_shop">{month_indicator}</span></p>
            <OneEditorChart3 series={month_all}/>
          </Col>

          <div className="circle_loading">
            <div className="loader loader--style2" title="1">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 50 50" style={{enableBackground:"new 0 0 50 50"}} xmlSpace="preserve">
              <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>
        </Row>

        <Row type = 'flex' style ={{margin:'0 10px'}} className="BG">
          <Col span ={24} style={{border: "1px solid #eaeaea",borderTop:0}}><button className="more" onClick={this.oneMore}>{lang_obj[lang]['more_detail']}</button></Col>
        </Row>
        <div className="one_block">
          <div className="one_block_a">
            <input type = 'month' onChange={this.onChange} value = {date} />
            <button onClick={this.moreSearch}>{lang_obj[lang]['search']}</button>
            {/*<MonthPicker onChange={this.onChange} defaultValue={moment(date, format)} />*/}
            <ul onClick = {this.shopList}>
              <li data-type = 'day'>{lang_obj[lang]['day_target_search']}<div className="add" style={{display:'block'}}><img  className="add_left" style={{width:'15px'}} src="static/lzsale/src/img/left1.png" /></div></li>
              <li data-type = 'week'>{lang_obj[lang]['week_target_search']}<div className="add"><img  className="add_left" style={{width:'15px'}} src="static/lzsale/src/img/left1.png" /></div></li>
              <li data-type = 'month'>{lang_obj[lang]['month_target_search']}<div className="add"><img  className="add_left" style={{width:'15px'}} src="static/lzsale/src/img/left1.png" /></div></li>
            </ul>
          </div>
          <div className="one_block_b">
            <div className="fix_header">
              <p><span style={{marginRight:'10px'}}>{year_month}</span>{lang_obj[lang]['target']}
              <span className="help" data-set="four" onClick={self.clickHelp} style={{float:'right'}}><img data-set="four" src="static/lzsale/src/img/help.png" style={{top:0}}/></span>
              </p>
              <hr/>
              <ul style={{background:'#f7f8fa'}}>
                {table_header}
              </ul>
            </div>
              
            <div className="content_block content_blocks">
              {ShopDay}
            </div>
          </div>
          <div className="circle_loading_a" style={{paddindTop:'30%'}}>
            <div className="loader loader--style2" title="1">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 50 50" style={{enableBackground:"new 0 0 50 50"}} xmlSpace="preserve">
              <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>
        </div>


        <Row type = "flex" className="nav_headers BG">
          <Col span={14} className ="header">
            <span className="blue_block"></span><div className = "title">{lang_obj[lang]['sale_target_k_pic']}
            <span className="help" onClick={self.clickHelp} data-set="two"><img className="size" data-set="two" src="static/lzsale/src/img/help.png" alt="" style={{width:'40px!important',height:'30px'}}/></span>
            </div>
          </Col>
          <Col span = {10} className="shop_header">
            <ul onClick = {this.selectTabs}>
              <li data-type = "day" className="day active">{lang_obj[lang]['day']}</li>
              <li data-type = "week">{lang_obj[lang]['week']}</li>
              <li data-type = "month" className="month" style={{borderRight:'1px solid #1296db'}}>{lang_obj[lang]['month']}</li>
            </ul>
          </Col>
        </Row>
        <Row type = "flex" className = "content_1 BG" style={{margin:'0 10px 10px 10px'}}>
          <span style={{position:'absolute',left:'17%',marginTop:'28px',fontSize:'14px'}}>{year}{lang_obj[lang]['year']}</span>
          <AreaLineChart series = {year_indicator} seriesValue = {max_min}/>

          <div className="circle_loading1">
            <div className="loader loader--style2" title="1">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 50 50" style={{enableBackground:"new 0 0 50 50"}} xmlSpace="preserve">
              <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>
        </Row>
        
        <Row type = "flex" className = "nav_headers BG" style={{height:'60px'}}>
          <Col span = {14} className="shop_header header">
            <span className="blue_block"></span><div className="title">{lang_obj[lang]['staff_sale_target']}
            <span className="help" data-set="three" onClick={self.clickHelp}><img className="size" data-set="three" src="static/lzsale/src/img/help.png" alt="" style={{width:'40px!important',height:'30px'}}/></span>
            </div>
          </Col>
          <Col span = {10} className="shop_header">
            <ul onClick = {this.selectTab}>
              <li data-type = "day" className="day active">{lang_obj[lang]['day']}</li>
              <li data-type = "week">{lang_obj[lang]['week']}</li>
              <li data-type = "month" className="month" style={{borderRight:'1px solid #1296db'}}>{lang_obj[lang]['month']}</li>
            </ul>

          </Col>
        </Row>
        <Row type = "flex" className = "content_1 BG" style={{margin:'0 10px 0px 10px'}}>
          <Col span = {24}>
          {/* 1234567 */}
            <p className="three_block"><span style={{marginRight:'10px',color:'#1296db'}}>{date_str}</span><span>{year_month_day}</span><span style={{color:'#1296db',fontSize:'20px'}}>{lang_obj[lang]['average_money_person']}:{avg_amount}</span></p>
            <ul className= "member_line">
              <li>{lang_obj[lang]['rank']}</li>
              <li>{lang_obj[lang]['name']}</li>
              <li>{lang_obj[lang]['sales_volume']}</li>
              <li>{lang_obj[lang]['index_quantity']}</li>
              <li>{lang_obj[lang]['contribute_rate']}</li>
              <li style={{width:'33%',textAlign:'left'}}>{lang_obj[lang]['complate_rate']}</li>
            </ul>
            {ThreeBlock1}
            {ThreeBlock2}
            {ThreeBlock3}
            {ThreeBlock4}
            {ThreeBlock5}
          </Col>

          <div className="bg_wrap"></div>
          <div className="circle_loading2">
            <div className="loader loader--style2" title="1">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 50 50" style={{enableBackground:"new 0 0 50 50"}} xmlSpace="preserve">
              <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>

        </Row>
        <Row type = 'flex' style ={{margin:'0 10px'}} className="BG">
          <Col span ={24} style={{border: "1px solid #eaeaea",borderTop:0}}><button className="more" onClick = {this.memberBtn}>{lang_obj[lang]['more_staff_target']}</button></Col>
        </Row>

        <div className="right_block all BG">
          <div className="left">
            <div>
              <input type="month" onChange={this.onChanges} value={dates}/>
              <button onClick={this.moreSearchs}>{lang_obj[lang]['search']}</button>
            </div>
            <ul className = "content_block">
              {this.memberBtnBlock()}
            </ul>
          </div>
          <div className="right">
            <div className="fix_header">
              <p><span><span style={{marginRight:'10px'}}>{year_months}</span>{lang_obj[lang]['target']}</span><span style={{float:'right'}}></span>
              <span className="help" data-set="five" onClick={self.clickHelp} style={{float:'right',marginTop:'-10px'}}><img data-set="five" src="static/lzsale/src/img/help.png" style={{top:0}} alt="" /></span>
              </p>
              <hr />
              <ul style = {{background:'#f7f8fa'}} className = "header">
                {Header}
              </ul>
            </div>
            <div className = "content_block content_blocks">
             {FixBlocks}
            </div>
          </div>
          <div className="circle_loading_b">
            <div className="loader loader--style2" title="1">
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 50 50" style={{enableBackground:"new 0 0 50 50"}} xmlSpace="preserve">
              <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            </div>
          </div>

        </div>
      </div> 
    )

  }
})

module.exports = Header