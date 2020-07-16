import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col} from 'antd';
import { DatePicker ,Spin, Button } from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import moment from 'moment'
import lang_obj from '../lang/language.js';

var Reflux = require('reflux');
var $ = require('jquery');
var needAnimation = false;
import AreaLineChart from './AreaLineChart.jsx';
import BubbleChart from './BubbleChart.jsx';
import SaleOnePageChart from './SaleOnePageChart.jsx';

import SaleAction from '../actions/SaleAction.jsx';
import SaleStore from '../stores/SaleStore.jsx';
var timeOut;
// var num_test = '123456789012.00'
var Sale = React.createClass({
  mixins:[Reflux.listenTo(SaleStore,'onStatusChange')],
  getInitialState(){
    var language = lang_obj.get_lang('lang');
    // if( (typeof language == 'undefined') || (language != 'en'&&language != 'zh-Hant')  ){
    //   language = 'cn'
    // }
    return{
      lang: language,
      new_saleIn:{
        sold_amount:'--',
        indicator:'--',
        complete_rate:'--',
        male_amount:'--',
        female_amount:'--'
      },
      new_tong:{
        tong_ratio:'--',
        huan_ratio:'--',
        tong_male_ratio:'--',
        tong_female_ratio:'--',
        huan_male_ratio:'--',
        huan_female_ratio:'--'
      },
      new_ordercount:{
        order_count:'--',
        vip_order_count:'--',
        order_amount_avg:'--'
      },
      new_vip:{
        vip_new:'--'
      },
      new_getrank:'--',
      new_bagrate:{
        sale_count:'--',
        sale_price_avg:'--',
        bag_rate:'--',
        male_sale_count:'--',
        female_sale_count:'--'
      },
      new_saleele:[],
      new_saletrend:{},
      new_salerank:[],
      new_saletrend_max:{},

      employee:[],
      max_min:{},
      loading:false,
    }
  },
  onStatusChange(data){

    var one = sessionStorage.getItem('one'),
        two = sessionStorage.getItem('two'),
        three = sessionStorage.getItem('three'),
        four = sessionStorage.getItem('four'),
        five = sessionStorage.getItem('five'),
        six = sessionStorage.getItem('six'),
        seven = sessionStorage.getItem('seven'),
        eight = sessionStorage.getItem('eight');

    if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1'){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
    }

    if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1' && six == '1' && seven == '1' && eight == '1'){
      $('.circle_loading4').hide();
    }


    if(data){
      this.setState({
        new_saleIn:{
          sold_amount:data.new_saleIn.sold_amount,
          // sold_amount:num_test,
          indicator:data.new_saleIn.indicator,
          complete_rate:data.new_saleIn.complete_rate,
          male_amount:data.new_saleIn.male_amount,
          female_amount:data.new_saleIn.female_amount,
        },
        new_tong:{
          tong_ratio:data.new_tong.tong_ratio,
          huan_ratio:data.new_tong.huan_ratio,
          tong_male_ratio:data.new_tong.tong_male_ratio,
          tong_female_ratio:data.new_tong.tong_female_ratio,
          huan_male_ratio:data.new_tong.huan_male_ratio,
          huan_female_ratio:data.new_tong.huan_female_ratio
        },
        new_ordercount:{
          order_count:data.new_ordercount.order_count,
          vip_order_count:data.new_ordercount.vip_order_count,
          order_amount_avg:data.new_ordercount.order_amount_avg
        },
        new_vip:{
          new_vip:data.new_vip.vip_new
        },
        new_getrank:data.new_getrank,
        new_bagrate:{
          sale_count:data.new_bagrate.sale_count,
          sale_price_avg:data.new_bagrate.sale_price_avg,
          bag_rate:data.new_bagrate.bag_rate,
          male_sale_count:data.new_bagrate.male_sale_count,
          female_sale_count:data.new_bagrate.female_sale_count,
        },
        new_saleele:data.new_saleele,
        new_saletrend:data.new_saletrend.month_trend,
        new_saletrend_max:data.new_saletrend.max_min,
        new_salerank:data.new_salerank,

        employee:data.employee, //员工销售统计
        month_trend:data.month_trend,//销售走势
        rank:data.rank,//大类销售排行
        max_min:data.max_min,//chart 最大与最小值

      })
    }

  },
  // 通过url获取门店shop_id
  getShopId(str){
    var url=location.href;
    var index = url.indexOf(str) +8,fixed_index = url.indexOf(str) +8,reg = /\d/,i =0,id=0;
    function getNums(index){
      if(reg.test(url.substr(index,1))){
        i++;
        getNums(++index);
      }
    }
    getNums(index);
    id = url.substr(fixed_index,i)
    return parseInt(id);
  },
  componentWillMount(){
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
    var year_month = Year + '年' + Month + '月'; 
    var year_month_day = Year + '-' + Month + '-' + Day ;

    var shop_id = this.getShopId('shop_id=');

    sessionStorage.setItem('one', '0')
    sessionStorage.setItem('two', '0')
    sessionStorage.setItem('three', '0')
    sessionStorage.setItem('four', '0')
    sessionStorage.setItem('five', '0')
    sessionStorage.setItem('six', '0')
    sessionStorage.setItem('seven', '0')
    sessionStorage.setItem('eight', '0')
    sessionStorage.setItem('nine', '0')
    if(sessionStorage.getItem('alltime')){
      year_month_day = sessionStorage.getItem('alltime');
    }else{
      year_month_day = year_month_day;
    }
    if(!!One.select_day){
      this.setState({
        new_saleIn:One.select_day
      });
      sessionStorage.setItem('one', '1')
    }else{
      SaleAction.saleIndicator({shop_id:shop_id,date:year_month_day,type:'day'});
    }

    if(!!One.select_day_tong){
      this.setState({
        new_tong:One.select_day_tong
      });
      sessionStorage.setItem('two', '1')
    }else{
      SaleAction.tongHuan({shop_id:shop_id,date:year_month_day,type:'day'})
    }

    if(!!One.select_day_order){
      this.setState({
        new_ordercount:One.select_day_order
      });
      sessionStorage.setItem('three', '1')
    }else{
      SaleAction.orderCount({shop_id:shop_id,date:year_month_day,type:'day'})
    }
    if(!!One.select_day_vip){
      this.setState({
        new_vip:One.select_day_vip
      });
      sessionStorage.setItem('four', '1')
    }else{
      SaleAction.vipCount({shop_id:shop_id,date:year_month_day,type:'day'})
    }

    if(!!One.select_day_rank){
      this.setState({
        new_getrank:One.select_day_rank
      })
      sessionStorage.setItem('nine', '1')
    }else{
      SaleAction.getRank({shop_id:shop_id,date:year_month_day,type:'day'})
    }

    if(!!One.select_day_rate){
      this.setState({
        new_bagrate:One.select_day_rate
      })
      sessionStorage.setItem('five', '1')
    }else{
      SaleAction.bagRate({shop_id:shop_id,date:year_month_day,type:'day'})
    }

    if(!!One.select_day_ele){
      this.setState({
        new_saleele:One.select_day_ele
      });
      sessionStorage.setItem('six', '1')
    }else{
      SaleAction.saleEle({shop_id:shop_id,date:year_month_day,type:'day'})
    }

    if(!!One.select_trend){
      this.setState({
        new_saletrend:One.select_trend.month_trend,
        new_saletrend_max:One.select_trend.max_min
      });
      sessionStorage.setItem('seven', '1')
    }else{
      SaleAction.saleTrend({shop_id:shop_id,date:year_month_day,type:'day'})
    }

    if(!!One.select_day_salerank){
      this.setState({
        new_salerank:One.select_day_salerank
      });
      sessionStorage.setItem('eight', '1')
    }else{
      SaleAction.saleRank({shop_id:shop_id,date:year_month_day,type:'day'})
    }
    this.setState({
      year:Year,
      year_month : year_month, //年月
      year_month_day : year_month_day, //年月日
      start_date:year_month_day
    })
    
  },
  componentDidMount(){
    var {year_month_day,year_month} = this.state;
    // 初始化日期
    $('.date_text1 .startDate').text(year_month_day);
    $('.date_text2 .startDate').text(year_month_day);
    $('.date_text3 .startDate').text(year_month_day);
    $('.date_text4 .startDate').text(year_month);
    var one = sessionStorage.getItem('one'),
        two = sessionStorage.getItem('two'),
        three = sessionStorage.getItem('three'),
        four = sessionStorage.getItem('four'),
        five = sessionStorage.getItem('five'),
        six = sessionStorage.getItem('six'),
        seven = sessionStorage.getItem('seven'),
        eight = sessionStorage.getItem('eight');

    if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1'){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();

      $('.circle_loading1').hide();
      $('.bg_wrap2').hide()
      $('.circle_loading2').hide();
      $('.bg_wrap3').hide();
      $('.circle_loading3').hide();
    }

    if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1' && six == '1' && seven == '1' && eight == '1'){
      $('.circle_loading4').hide();

      $('.bg_wrap2').hide()
      $('.circle_loading1').hide();
      $('.circle_loading2').hide();

      $('.bg_wrap3').hide();
      $('.circle_loading3').hide();

    }
  },
  selectDispatch(e){
    var ele_id = $('.wrapper').attr('data-id');
    var type = $('.wrapper').attr('data-mode');//$(e.target).parent().find('label.active').find('input').val();
    if(type == 'day'){
      var date1 = $(e.target).parents('.wrapper').attr('data-date1');
      var date2 = '';
    }else if(type == 'week' || type == "month" || type == 'customize'){
      var date1 = $(e.target).parents('.wrapper').attr('data-date1');
      var date2 = $(e.target).parents('.wrapper').attr('data-date2');
    }
    if(ele_id == 'datepicker1'){
      this.selectDate(type,date1,date2);
    }else if(ele_id == 'datepicker2'){
      this.selectTabTwo(type,date1,date2);
    }else if(ele_id == 'datepicker3'){
      this.selectTabThree(type,date1,date2);
    }else if(ele_id == 'datepicker4'){
      this.selectMonthTab(type,date1,date2);
    }
    $('body').css("overflow","inherit");    
    $('.wrapper').hide();
    $('.background').hide();

  },
  selectMonthTab(type,date1,date2){
    var shop_id = this.getShopId('shop_id=');
    if(type == "month"){
      $('.date_text4 .startDate').text(date1.split('-')[0] +  '年' + date1.split('-')[1]);
      // $('.date_text4 .endDate').text(date2);
      // $('.date_text4 .icondate').show();
    }
    $('.circle_loading2').show();
    SaleAction.saleTrend({shop_id:shop_id,date:date1,type:type})
  },
  selectDate(type,date1,date2){
    if(type == 'day'){
      $('.date_text1 .startDate').text(date1);
      $('.date_text1 .endDate').text(date2);
      $('.date_text1 .icondate').hide();
    }else if(type == 'week' || type == "month" || type == 'customize'){
      $('.date_text1 .startDate').text(date1);
      $('.date_text1 .endDate').text(date2);
      $('.date_text1 .icondate').show();
    }
    
    // var date1 = $(e.target).parents('.wrapper').attr('data-date1');
    // var date2 = $(e.target).parents('.wrapper').attr('data-date2');
      
    sessionStorage.setItem('one', '0')
    sessionStorage.setItem('two', '0')
    sessionStorage.setItem('three', '0')
    sessionStorage.setItem('four', '0')
    sessionStorage.setItem('five', '0')
    // loding
    $('.bg_wrap').show();
    $('.circle_loading').show();
    // 本地存储日,周,月的缓存
    sessionStorage.setItem('rember1',type);
    var shop_id = this.getShopId('shop_id=');

    var _item = '' ,_item2 = '' ,_item3 = '',_item_tong = '' ,_item2_tong = '' ,_item3_tong = '',_item_order = '' ,_item2_order = '' ,_item3_order = '',_item_vip = '' ,_item2_vip = '' ,_item3_vip = '',_item_rank = '' ,_item2_rank = '' ,_item3_rank = '',_item_rate = '' ,_item2_rate = '' ,_item3_rate = '';
    switch(type){
      case 'day':
        _item = 'select_day';
        _item_tong = 'select_day_tong';
        _item_order = 'select_day_order';
        _item_vip = 'select_day_vip';
        _item_rank = 'select_day_rank';
        _item_rate = 'select_day_rate';
        break;
      case 'week':
        _item2 = 'select_week';
        _item2_tong = 'select_week_tong';
        _item2_order = 'select_week_order';
        _item2_vip = 'select_week_vip';
        _item2_rank = 'select_week_rank';
        _item2_rate = 'select_week_rate';
        break;
      case 'month':
        _item3 = 'select_month';
        _item3_tong = 'select_month_tong';
        _item3_order = 'select_month_order';
        _item3_vip = 'select_month_vip';
        _item3_rank = 'select_month_rank';
        _item3_rate = 'select_month_rate';
        break;
    }
    var sale_day = JSON.parse(sessionStorage.getItem(_item));
    var sale_week = JSON.parse(sessionStorage.getItem(_item2));
    var sale_month = JSON.parse(sessionStorage.getItem(_item3));

    var sale_day_tong = JSON.parse(sessionStorage.getItem(_item_tong));
    var sale_week_tong = JSON.parse(sessionStorage.getItem(_item2_tong));
    var sale_month_tong = JSON.parse(sessionStorage.getItem(_item3_tong));

    var sale_day_order = JSON.parse(sessionStorage.getItem(_item_order));
    var sale_week_order = JSON.parse(sessionStorage.getItem(_item2_order));
    var sale_month_order = JSON.parse(sessionStorage.getItem(_item3_order));

    var sale_day_vip = JSON.parse(sessionStorage.getItem(_item_vip));
    var sale_week_vip = JSON.parse(sessionStorage.getItem(_item2_vip));
    var sale_month_vip = JSON.parse(sessionStorage.getItem(_item3_vip));

    var sale_day_rank = JSON.parse(sessionStorage.getItem(_item_rank));
    var sale_week_rank = JSON.parse(sessionStorage.getItem(_item2_rank));
    var sale_month_rank = JSON.parse(sessionStorage.getItem(_item3_rank));

    var sale_day_rate = JSON.parse(sessionStorage.getItem(_item_rate));
    var sale_week_rate = JSON.parse(sessionStorage.getItem(_item2_rate));
    var sale_month_rate = JSON.parse(sessionStorage.getItem(_item3_rate));

    var flag = false;

    if(sale_day){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleIn:{
          sold_amount:sale_day.sold_amount,
          // sold_amount:num_test,
          indicator:sale_day.indicator,
          complete_rate:sale_day.complete_rate,
          male_amount:data.sale_day.male_amount,
          female_amount:data.sale_day.female_amount,
        }
      })
      flag = true;
    }else if(sale_week){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleIn:{
          sold_amount:sale_week.sold_amount,
          // sold_amount:num_test,
          indicator:sale_week.indicator,
          complete_rate:sale_week.complete_rate,
          male_amount:data.sale_week.male_amount,
          female_amount:data.sale_week.female_amount,
        }
      })
      flag = true;
    }else if(sale_month){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleIn:{
          sold_amount:sale_month.sold_amount,
          // sold_amount:num_test,
          indicator:sale_month.indicator,
          complete_rate:sale_month.complete_rate,
          male_amount:data.sale_month.male_amount,
          female_amount:data.sale_month.female_amount,
        }
      })
      flag = true;
    }
    // 同比环比
    if(sale_day_tong){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_tong:{
          tong_ratio:sale_day_tong.tong_ratio,
          huan_ratio:sale_day_tong.huan_ratio,
          tong_male_ratio:sale_day_tong.tong_male_ratio,
          tong_female_ratio:sale_day_tong.tong_female_ratio,
          huan_male_ratio:sale_day_tong.huan_male_ratio,
          huan_female_ratio:sale_day_tong.huan_female_ratio
        }
      })
      flag = true;
    }else if(sale_week_tong){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_tong:{
          tong_ratio:sale_week_tong.tong_ratio,
          huan_ratio:sale_week_tong.huan_ratio,
          tong_male_ratio:sale_week_tong.tong_male_ratio,
          tong_female_ratio:sale_week_tong.tong_female_ratio,
          huan_male_ratio:sale_week_tong.huan_male_ratio,
          huan_female_ratio:sale_week_tong.huan_female_ratio
        }
      })
      flag = true;
    }else if(sale_month_tong){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_tong:{
          tong_ratio:sale_month_tong.tong_ratio,
          huan_ratio:sale_month_tong.huan_ratio,
          tong_male_ratio:sale_month_tong.tong_male_ratio,
          tong_female_ratio:sale_month_tong.tong_female_ratio,
          huan_male_ratio:sale_month_tong.huan_male_ratio,
          huan_female_ratio:sale_month_tong.huan_female_ratio
        }
      })
      flag = true;
    }
    // 销售订单
    if(sale_day_order){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_ordercount:{
          order_count:sale_day_order.order_count,
          vip_order_count:sale_day_order.vip_order_count,
          order_amount_avg:sale_day_order.order_amount_avg
        },
      })
      flag = true;
    }else if(sale_week_order){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_ordercount:{
          order_count:sale_week_order.order_count,
          vip_order_count:sale_week_order.vip_order_count,
          order_amount_avg:sale_week_order.order_amount_avg
        },
      })
      flag = true;
    }else if(sale_month_order){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_ordercount:{
          order_count:sale_month_order.order_count,
          vip_order_count:sale_month_order.vip_order_count,
          order_amount_avg:sale_month_order.order_amount_avg
        },
      })
      flag = true;
    }
    // 新增会员
    if(sale_day_vip){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_vip:{
          new_vip:sale_day_vip.vip_new
        }
      })
      flag = true;
    }else if(sale_week_vip){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_vip:{
          new_vip:sale_week_vip.vip_new
        }
      })
      flag = true;
    }else if(sale_month_vip){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_vip:{
          new_vip:sale_month_vip.vip_new
        }
      })
      flag = true;
    }
    // 排名
    if(sale_day_rank){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_getrank:sale_day_rank,
      })
      flag = true;
    }else if(sale_week_rank){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_getrank:sale_week_rank,
      })
      flag = true;
    }else if(sale_month_rank){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_getrank:sale_month_rank,
      })
      flag = true;
    }
    // 搭配率
    if(sale_day_rate){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_bagrate:{
          sale_count:sale_day_rate.sale_count,
          sale_price_avg:sale_day_rate.sale_price_avg,
          bag_rate:sale_day_rate.bag_rate,
          male_sale_count:sale_day_rate.male_sale_count,
          female_sale_count:sale_day_rate.female_sale_count,
        },
      })
      flag = true;
    }else if(sale_week_rate){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_bagrate:{
          sale_count:sale_week_rate.sale_count,
          sale_price_avg:sale_week_rate.sale_price_avg,
          bag_rate:sale_week_rate.bag_rate,
          male_sale_count:sale_day_rate.male_sale_count,
          female_sale_count:sale_day_rate.female_sale_count,
        },
      })
      flag = true;
    }else if(sale_month_rate){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_bagrate:{
          sale_count:sale_month_rate.sale_count,
          sale_price_avg:sale_month_rate.sale_price_avg,
          bag_rate:sale_month_rate.bag_rate,
          male_sale_count:sale_day_rate.male_sale_count,
          female_sale_count:sale_day_rate.female_sale_count,
        },
      })
      flag = true;
    }
    

    if(flag){
      return;
    }


    SaleAction.saleIndicator({shop_id:shop_id,type:type,start_date:date1,end_date:date2,date:date1})
    SaleAction.tongHuan({shop_id:shop_id,type:type,start_date:date1,end_date:date2,date:date1})
    SaleAction.orderCount({shop_id:shop_id,type:type,start_date:date1,end_date:date2,date:date1})
    SaleAction.vipCount({shop_id:shop_id,type:type,start_date:date1,end_date:date2,date:date1})
    SaleAction.getRank({shop_id:shop_id,type:type,start_date:date1,end_date:date2,date:date1})
    SaleAction.bagRate({shop_id:shop_id,type:type,start_date:date1,end_date:date2,date:date1})
    
  },
  selectTab(e){
    var {start_date} = this.state;
    $(e.target).addClass('active').siblings().removeClass('active');
    if($(e.target).hasClass('click')){
      return;
    }
    sessionStorage.setItem('one', '0')
    sessionStorage.setItem('two', '0')
    sessionStorage.setItem('three', '0')
    sessionStorage.setItem('four', '0')
    sessionStorage.setItem('five', '0')
    $('.bg_wrap').show();
    $('.circle_loading').show();
    var shop_id = this.getShopId('shop_id=');
    // 本地存储日,周,月的缓存
    sessionStorage.setItem('rember1',e.target.dataset.type);

    var _item = '' ,_item2 = '' ,_item3 = '',_item_tong = '' ,_item2_tong = '' ,_item3_tong = '',_item_order = '' ,_item2_order = '' ,_item3_order = '',_item_vip = '' ,_item2_vip = '' ,_item3_vip = '',_item_rank = '' ,_item2_rank = '' ,_item3_rank = '',_item_rate = '' ,_item2_rate = '' ,_item3_rate = '';
    switch(e.target.dataset.type){
      case 'day':
        _item = 'select_day';
        _item_tong = 'select_day_tong';
        _item_order = 'select_day_order';
        _item_vip = 'select_day_vip';
        _item_rank = 'select_day_rank';
        _item_rate = 'select_day_rate';
        break;
      case 'week':
        _item2 = 'select_week';
        _item2_tong = 'select_week_tong';
        _item2_order = 'select_week_order';
        _item2_vip = 'select_week_vip';
        _item2_rank = 'select_week_rank';
        _item2_rate = 'select_week_rate';
        break;
      case 'month':
        _item3 = 'select_month';
        _item3_tong = 'select_month_tong';
        _item3_order = 'select_month_order';
        _item3_vip = 'select_month_vip';
        _item3_rank = 'select_month_rank';
        _item3_rate = 'select_month_rate';
        break;
    }
    var sale_day = JSON.parse(sessionStorage.getItem(_item));
    var sale_week = JSON.parse(sessionStorage.getItem(_item2));
    var sale_month = JSON.parse(sessionStorage.getItem(_item3));

    var sale_day_tong = JSON.parse(sessionStorage.getItem(_item_tong));
    var sale_week_tong = JSON.parse(sessionStorage.getItem(_item2_tong));
    var sale_month_tong = JSON.parse(sessionStorage.getItem(_item3_tong));

    var sale_day_order = JSON.parse(sessionStorage.getItem(_item_order));
    var sale_week_order = JSON.parse(sessionStorage.getItem(_item2_order));
    var sale_month_order = JSON.parse(sessionStorage.getItem(_item3_order));

    var sale_day_vip = JSON.parse(sessionStorage.getItem(_item_vip));
    var sale_week_vip = JSON.parse(sessionStorage.getItem(_item2_vip));
    var sale_month_vip = JSON.parse(sessionStorage.getItem(_item3_vip));

    var sale_day_rank = JSON.parse(sessionStorage.getItem(_item_rank));
    var sale_week_rank = JSON.parse(sessionStorage.getItem(_item2_rank));
    var sale_month_rank = JSON.parse(sessionStorage.getItem(_item3_rank));

    var sale_day_rate = JSON.parse(sessionStorage.getItem(_item_rate));
    var sale_week_rate = JSON.parse(sessionStorage.getItem(_item2_rate));
    var sale_month_rate = JSON.parse(sessionStorage.getItem(_item3_rate));
    

    var flag = false;
    if(sale_day){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleIn:{
          sold_amount:sale_day.sold_amount,
          // sold_amount:num_test,
          indicator:sale_day.indicator,
          complete_rate:sale_day.complete_rate,
          male_amount:data.sale_day.male_amount,
          female_amount:data.sale_day.female_amount,
        }
      })
      flag = true;
    }else if(sale_week){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleIn:{
          sold_amount:sale_week.sold_amount,
          // sold_amount:num_test,
          indicator:sale_week.indicator,
          complete_rate:sale_week.complete_rate,
          male_amount:data.sale_week.male_amount,
          female_amount:data.sale_week.female_amount,
        }
      })
      flag = true;
    }else if(sale_month){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleIn:{
          sold_amount:sale_month.sold_amount,
          // sold_amount:num_test,
          indicator:sale_month.indicator,
          complete_rate:sale_month.complete_rate,
          male_amount:data.sale_month.male_amount,
          female_amount:data.sale_month.female_amount,
        }
      })
      flag = true;
    }
    // 同比环比
    if(sale_day_tong){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_tong:{
          tong_ratio:sale_day_tong.tong_ratio,
          huan_ratio:sale_day_tong.huan_ratio,
          tong_male_ratio:sale_day_tong.tong_male_ratio,
          tong_female_ratio:sale_day_tong.tong_female_ratio,
          huan_male_ratio:sale_day_tong.huan_male_ratio,
          huan_female_ratio:sale_day_tong.huan_female_ratio
        }
      })
      flag = true;
    }else if(sale_week_tong){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_tong:{
          tong_ratio:sale_week_tong.tong_ratio,
          huan_ratio:sale_week_tong.huan_ratio,
          tong_male_ratio:sale_week_tong.tong_male_ratio,
          tong_female_ratio:sale_week_tong.tong_female_ratio,
          huan_male_ratio:sale_week_tong.huan_male_ratio,
          huan_female_ratio:sale_week_tong.huan_female_ratio
        }
      })
      flag = true;
    }else if(sale_month_tong){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_tong:{
          tong_ratio:sale_month_tong.tong_ratio,
          huan_ratio:sale_month_tong.huan_ratio,
          tong_male_ratio:sale_month_tong.tong_male_ratio,
          tong_female_ratio:sale_month_tong.tong_female_ratio,
          huan_male_ratio:sale_month_tong.huan_male_ratio,
          huan_female_ratio:sale_month_tong.huan_female_ratio
        }
      })
      flag = true;
    }
    // 销售订单
    if(sale_day_order){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_ordercount:{
          order_count:sale_day_order.order_count,
          vip_order_count:sale_day_order.vip_order_count,
          order_amount_avg:sale_day_order.order_amount_avg
        },
      })
      flag = true;
    }else if(sale_week_order){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_ordercount:{
          order_count:sale_week_order.order_count,
          vip_order_count:sale_week_order.vip_order_count,
          order_amount_avg:sale_week_order.order_amount_avg
        },
      })
      flag = true;
    }else if(sale_month_order){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_ordercount:{
          order_count:sale_month_order.order_count,
          vip_order_count:sale_month_order.vip_order_count,
          order_amount_avg:sale_month_order.order_amount_avg
        },
      })
      flag = true;
    }
    // 新增会员
    if(sale_day_vip){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_vip:{
          new_vip:sale_day_vip.vip_new
        }
      })
      flag = true;
    }else if(sale_week_vip){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_vip:{
          new_vip:sale_week_vip.vip_new
        }
      })
      flag = true;
    }else if(sale_month_vip){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_vip:{
          new_vip:sale_month_vip.vip_new
        }
      })
      flag = true;
    }
    // 排名
    if(sale_day_rank){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_getrank:sale_day_rank,
      })
      flag = true;
    }else if(sale_week_rank){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_getrank:sale_week_rank,
      })
      flag = true;
    }else if(sale_month_rank){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_getrank:sale_month_rank,
      })
      flag = true;
    }
    // 搭配率
    if(sale_day_rate){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_bagrate:{
          sale_count:sale_day_rate.sale_count,
          sale_price_avg:sale_day_rate.sale_price_avg,
          bag_rate:sale_day_rate.bag_rate,
          male_sale_count:sale_day_rate.male_sale_count,
          female_sale_count:sale_day_rate.female_sale_count,
        },
      })
      flag = true;
    }else if(sale_week_rate){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_bagrate:{
          sale_count:sale_week_rate.sale_count,
          sale_price_avg:sale_week_rate.sale_price_avg,
          bag_rate:sale_week_rate.bag_rate,
          male_sale_count:sale_day_rate.male_sale_count,
          female_sale_count:sale_day_rate.female_sale_count,
        },
      })
      flag = true;
    }else if(sale_month_rate){
      $('.bg_wrap').hide();
      $('.circle_loading').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_bagrate:{
          sale_count:sale_month_rate.sale_count,
          sale_price_avg:sale_month_rate.sale_price_avg,
          bag_rate:sale_month_rate.bag_rate,
          male_sale_count:sale_day_rate.male_sale_count,
          female_sale_count:sale_day_rate.female_sale_count,
        },
      })
      flag = true;
    }
    

    if(flag){
      return;
    }


    SaleAction.saleIndicator({shop_id:shop_id,date:start_date,type:e.target.dataset.type})
    SaleAction.tongHuan({shop_id:shop_id,date:start_date,type:e.target.dataset.type})
    SaleAction.orderCount({shop_id:shop_id,date:start_date,type:e.target.dataset.type})
    SaleAction.vipCount({shop_id:shop_id,date:start_date,type:e.target.dataset.type})
    SaleAction.getRank({shop_id:shop_id,date:start_date,type:e.target.dataset.type})
    SaleAction.bagRate({shop_id:shop_id,date:start_date,type:e.target.dataset.type})
  },
  selectTabTwo(type,date1,date2){
    if(type == 'day'){
      $('.date_text2 .startDate').text(date1);
      $('.date_text2 .icondate').hide();
      $('.date_text2 .endDate').text(date2);
    }else if(type == 'week' || type == "month" || type == 'customize'){
      $('.date_text2 .startDate').text(date1);
      $('.date_text2 .endDate').text(date2);
      $('.date_text2 .icondate').show();
    }
    
    var {start_date} = this.state;
    sessionStorage.setItem('rember2',type);
    // $(e.target).addClass('active').siblings().removeClass('active');
    // if($(e.target).hasClass('click')){
    //   return;
    // }
    // $(e.target).addClass('click').siblings().removeClass('click');
    sessionStorage.setItem('one2', '0')
    $('.bg_wrap2').show();
    $('.circle_loading1').show();

    var shop_id = this.getShopId('shop_id=');
    // // 本地存储日,周,月的缓存
    var _item_ele = '' ,_item2_ele = '',_item3_ele = '';
    switch(type){
      case 'day':
        _item_ele = 'select_day_ele';
      break;
      case 'week':
        _item2_ele = 'select_week_ele';
      break;
      case 'month':
        _item3_ele = 'select_month_ele';
      break;
    }
    var sale_day = JSON.parse(sessionStorage.getItem(_item_ele));
    var sale_week = JSON.parse(sessionStorage.getItem(_item2_ele));
    var sale_month = JSON.parse(sessionStorage.getItem(_item3_ele));
    var flag = false;
    if(sale_day){
      $('.bg_wrap2').hide();
      $('.circle_loading1').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleele:sale_day,
      })
      flag = true;
    }else if(sale_week){
      $('.bg_wrap2').hide();
      $('.circle_loading1').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleele:sale_week
      })
      flag = true;
    }else if(sale_month){
      $('.bg_wrap2').hide();
      $('.circle_loading1').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_saleele:sale_month
      })
      flag = true;
    }
    if(flag){
      return;
    } 

    SaleAction.saleEle({shop_id:shop_id,date:start_date,type:type,start_date:date1,end_date:date2,date:date1})
   
  },
  selectTabThree(type,date1,date2){
    if(type == 'day'){
      $('.date_text3 .startDate').text(date1);
      $('.date_text3 .icondate').hide();
      $('.date_text3 .endDate').text(date2);
    }else if(type == 'week' || type == "month" || type == 'customize'){
      $('.date_text3 .startDate').text(date1);
      $('.date_text3 .endDate').text(date2);
      $('.date_text3 .icondate').show();
    }
  
    var {start_date} = this.state;
    sessionStorage.setItem('rember3',type);
    // $(e.target).addClass('active').siblings().removeClass('active');
    // if($(e.target).hasClass('click')){
    //   return;
    // }
    // $(e.target).addClass('click').siblings().removeClass('click');

    sessionStorage.setItem('one3', '0');
    $('.bg_wrap3').show();
    $('.circle_loading3').show();
    
    var shop_id = this.getShopId('shop_id=');
    // 本地存储日,周,月的缓存
    var _item_rank = '' ,_item2_rank = '',_item3_rank = '' ;
    switch(type){
      case 'day':
        _item_rank = 'select_day_salerank';
      break;
      case 'week':
        _item2_rank = 'select_week_salerank';
      break;
      case 'month':
        _item3_rank = 'select_month_salerank';
      break;
    }
    var sale_day = JSON.parse(sessionStorage.getItem(_item_rank));
    var sale_week = JSON.parse(sessionStorage.getItem(_item2_rank));
    var sale_month = JSON.parse(sessionStorage.getItem(_item3_rank));
    var flag = false;
    if(sale_day){
      $('.bg_wrap3').hide();
      $('.circle_loading3').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_salerank:sale_day,
      })
      flag = true;
    }else if(sale_week){
      $('.bg_wrap3').hide();
      $('.circle_loading3').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_salerank:sale_week
      })
      flag = true;
    }else if(sale_month){
      $('.bg_wrap3').hide();
      $('.circle_loading3').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        new_salerank:sale_month
      })
      flag = true;
    }
    if(flag){
      return;
    }

    var shop_id = this.getShopId('shop_id=');
    SaleAction.saleRank({shop_id:shop_id,date:start_date,type:type,start_date:date1,end_date:date2,date:date1})
  },
  onStartChange(e){
    sessionStorage.setItem('date_change',e.target.value);
    var that = this;
    var value = e.target.value;
    this.setState({
      start_date: value,
      inputValue:e.target.value
    })
    sessionStorage.setItem('alltime',e.target.value);
  },
  saleSearch(){
    var that = this;
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();

    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    var year_month_day = Year + '-' + Month + '-' + Day ;

    var {inputValue,start_date} = this.state;
    var value = inputValue;
    if(value == ''){
      return;
    }
    var date_change = sessionStorage.getItem('date_change');
    if(date_change == start_date){
      value = start_date
    }else{
      value = year_month_day
    }

    clearTimeout(timeOut);
    timeOut = setTimeout(function(){
      $('.circle_loading4').show();
      sessionStorage.setItem('one', '0')
      sessionStorage.setItem('two', '0')
      sessionStorage.setItem('three', '0')
      sessionStorage.setItem('four', '0')
      sessionStorage.setItem('five', '0')
      sessionStorage.setItem('six', '0')
      sessionStorage.setItem('seven', '0')
      sessionStorage.setItem('eight', '0')
      // sessionStorage.setItem('start_date', value);
      var dateString = value;
      sessionStorage.removeItem('select_day');
      sessionStorage.removeItem('select_week');
      sessionStorage.removeItem('select_month');

      sessionStorage.removeItem('select_day_tong');
      sessionStorage.removeItem('select_week_tong');
      sessionStorage.removeItem('select_month_tong');

      sessionStorage.removeItem('select_day_order');
      sessionStorage.removeItem('select_week_order');
      sessionStorage.removeItem('select_month_order');

      sessionStorage.removeItem('select_day_vip');
      sessionStorage.removeItem('select_week_vip');
      sessionStorage.removeItem('select_month_vip');

      sessionStorage.removeItem('select_day_rank');
      sessionStorage.removeItem('select_week_rank');
      sessionStorage.removeItem('select_month_rank');

      sessionStorage.removeItem('select_day_rate');
      sessionStorage.removeItem('select_week_rate');
      sessionStorage.removeItem('select_month_rate');

      sessionStorage.removeItem('select_day_ele');
      sessionStorage.removeItem('select_week_ele');
      sessionStorage.removeItem('select_month_ele');

      sessionStorage.removeItem('select_day_salerank');
      sessionStorage.removeItem('select_week_salerank');
      sessionStorage.removeItem('select_month_salerank');

      var rember1,rember2,rember3;
      if(sessionStorage.getItem('rember1')){
        rember1 = sessionStorage.getItem('rember1')
      }else{
        rember1 = 'day'
      }
      if(sessionStorage.getItem('rember2')){
        rember2 = sessionStorage.getItem('rember2')
      }else{
        rember2 = 'day'
      }
      if(sessionStorage.getItem('rember3')){
        rember3 = sessionStorage.getItem('rember3')
      }else{
        rember3 = 'day'
      }
      
      var shop_id = that.getShopId('shop_id=');
      SaleAction.saleIndicator({shop_id:shop_id,date:dateString,type:rember1})
      SaleAction.tongHuan({shop_id:shop_id,date:dateString,type:rember1})
      SaleAction.orderCount({shop_id:shop_id,date:dateString,type:rember1})
      SaleAction.vipCount({shop_id:shop_id,date:dateString,type:rember1})
      SaleAction.getRank({shop_id:shop_id,date:dateString,type:rember1})
      SaleAction.bagRate({shop_id:shop_id,date:dateString,type:rember1})
      SaleAction.saleEle({shop_id:shop_id,date:dateString,type:rember2})
      SaleAction.saleTrend({shop_id:shop_id,date:dateString,type:'day'})
      SaleAction.saleRank({shop_id:shop_id,date:dateString,type:rember3})

    },200)
    $('.background').hide();
    $('.wrapper').hide();
    $('body').css('overflow','inherit')
  },
  clickHelp(e){
    $('.background').show();
    $('body').css('overflow','hidden');
    if(e.target.dataset.set == 'one'){
      $('.help-modeOne-one').show();
    }else if(e.target.dataset.set == 'two'){
      $('.help-modeOne-two').show();
    }else if(e.target.dataset.set == 'three'){
      $('.help-modeOne-three').show();
    }else if(e.target.dataset.set == 'four'){
      $('.help-modeOne-four').show();
    }
  },


  render(){
    var self = this;
    var {new_saleIn,new_tong,new_ordercount,new_vip,new_bagrate,new_saleele,new_saletrend,new_saletrend_max,new_salerank,year_month_day,start_date,year_month,sale,month_trend,rank,max_min,new_getrank, lang} = this.state;

    var Employee,new_saleele_arr;
    var format = 'YYYY-MM-DD';
    var start_date_slice = start_date.substr(0,7);

    if($.isArray(new_saleele)){
      new_saleele_arr = new_saleele;
    }
    {/*Employee = rendernew_saleele_arr.map((item,index) => {
      return(
        <Col span = {5} key={index} className="right_line">
        <i style={{position: 'absolute',right: '10px',top: '1px'}}>No.</i>
        <i style={{position: 'absolute',right:'10px',fontSize: '24px',color: '#222222',fontStyle:' normal'}}>{index+1}</i>
        <span><img src="static/lzsale/src/img/shops.png" style={{width:'inherit' }}/></span><p className="sale_style">{item.employee_name}</p><p className="sale_style sale_styles">¥{item.sold_amount}</p>
        <p style={{textAlign:'left'}}>指标：{item.indicator}</p><p style={{textAlign:'left'}}>完成：{item.contribute}</p></Col>
      )
    })*/}

    Employee = new_saleele_arr.map((item,index) => {
      var className;
      className = 'colors' + (index % 5);
      return(
        <Col span = {6} key={index} className="right_line" style={{width:"230px"}}>
          <div className="NO">No.</div>
          <i className="ranking">{index+1}</i>
          <span className={className}>{item.employee_name.substr(0, 1)}</span>
          <p className="sale_style employee_name" style={{marginBottom:'auto'}}>{item.employee_name}</p>
          {/* {(lang!='zh-Hant'&&lang!='en')?'¥':''} */}
          <p className="sale_style sale_styles" style={{marginBottom:'auto'}}>{item.sold_amount}</p>
          <p className="employee_sale"><label>{lang_obj[lang]['target']}：</label>{item.indicator}</p>
          <p className="employee_sale"><label>{lang_obj[lang]['finish_short']}：</label>{item.complete}</p>
          <p className="employee_sale"><label>{lang_obj[lang]['pattern_rate']}：</label>{item.match_rate}</p>
          <p className="employee_sale"><label>{lang_obj[lang]['price_j']}：</label>{item.unit_price}</p>
          <p className="employee_sale"><label>{lang_obj[lang]['price_k']}：</label>{item.per_customer_transaction}</p>
        </Col>
      )
    })


    $('.background').click(function(){
      $('.background').hide();
      $('.wrapper').hide();
      $('body').css('overflow','inherit');
      $('.help-modeOne-one').hide();
      $('.help-modeOne-two').hide();
      $('.help-modeOne-three').hide();
      $('.help-modeOne-four').hide();
    })
    
    if(lang == 'en'){
      if(Array.isArray(new_saletrend).length == 0  || new_saletrend == undefined){
        $('.chart_img.a_1').hide();
        $('.nodata_img.a_1.en').show();
      }else{
        $('.chart_img.a_1').show();
        $('.nodata_img.a_1.en').hide();
      }
      if(Array.isArray(new_salerank)){
        if(new_salerank.length == 0){
          $('.nodata_img.a_2.en').show();
          $('.chart_img.a_2').hide();
        }else{
          $('.chart_img.a_2').show();
          $('.nodata_img.a_2.en').hide();
        }
      }
    } else if(lang == 'zh-Hant') {
      if(Array.isArray(new_saletrend).length == 0 || new_saletrend == undefined ){
        $('.chart_img.a_1').hide();
        $('.nodata_img.a_1.zh-Hant').show();
      }else{
        $('.chart_img.a_1').show();
        $('.nodata_img.a_1.zh-Hant').hide();
      }
      if(Array.isArray(new_salerank)){
        if(new_salerank.length == 0){
          $('.nodata_img.a_2.zh-Hant').show();
          $('.chart_img.a_2').hide();
        }else{
          $('.chart_img.a_2').show();
          $('.nodata_img.a_2.zh-Hant').hide();
        }
      }
    } else{
      if(Array.isArray(new_saletrend).length == 0 || new_saletrend == undefined ){
        $('.chart_img.a_1').hide();
        $('.nodata_img.a_1.cn').show();
      }else{
        $('.chart_img.a_1').show();
        $('.nodata_img.a_1.cn').hide();
      }
      if(Array.isArray(new_salerank)){
        if(new_salerank.length == 0){
          $('.nodata_img.a_2.cn').show();
          $('.chart_img.a_2').hide();
        }else{
          $('.chart_img.a_2').show();
          $('.nodata_img.a_2.cn').hide();
        }
      }
    }
    // var label_en_sty = {}
    // if(lang=='en'){
    //   label_en_sty ={lineHeight: 'initial', width: '72px', marginRight: '13px'} 
    // }
    return(
      <div className={this.state.loading ? 'loading position' :'hideloading position'}>
        <Row type = "flex" className = "content_1 BG">
          <Col  span = {14} className="header">
            <span className="blue_block"></span>
            {/*销售统计*/} {lang_obj[lang]['sale_analysis']}
            <span style={{position:'relative'}}>
              <span className="help" data-set="one" onClick={self.clickHelp}>
                <img data-set="one" src="static/lzsale/src/img/help.png" alt="" />
              </span>
            </span>
            {/*<button className="sale_btn" onClick={self.saleSearch}>{lang_obj[lang]['search']}</button>*/}
          </Col>
          <Col span = {10} className="tab">
            {/*<ul onClick = {self.selectTab}>
              <li data-type = 'day' className = "active border_right" style={{borderRight:0}}>{lang_obj[lang]['day']}</li>
              <li data-type = 'week' className="border_right" style={{borderRight:0}}>{lang_obj[lang]['week']}</li>
              <li data-type = 'month'>{lang_obj[lang]['month']}</li>
            </ul>*/}

            <div className="date_text date_text1">
              <span className="startDate"></span>
              <span className="icondate">/</span>
              <span className="endDate"></span>
            </div>
            <div id="datepicker1" className="alert_block datepicker">
              <img src="static/lzsale/src/img/date.png" />
            </div>
            <div className="bg_wrap"></div>
          </Col>

          <div className="wrapper">
            <div className="dataTab">
              <ul>
                <li id="dp-day">
                  <label for="mode_day" className="active">
                    <input name="mode" type="radio" value="day" id="mode_day" />{lang_obj[lang]['day']}
                  </label>
                </li>
                <li id="dp-week">
                  <label for="mode_week">
                    <input name="mode" type="radio" value="week" id="mode_week" />{lang_obj[lang]['week']}
                  </label>
                </li>
                <li id="dp-month">
                  <label for="mode_month">
                    <input name="mode" type="radio" value="month" id="mode_month" />{lang_obj[lang]['month']}
                  </label>
                </li>
                <li id="dp-range">
                  <label for="mode_range" style={{borderRight:'1px solid #1296db'}}>  
                    <input name="mode" type="radio" value="customize" id="mode_range" />{lang_obj[lang]['customize']}
                  </label>
                </li>
              </ul>
              <button onClick={self.selectDispatch}>{lang_obj[lang]['search']}</button>
            </div>
            <div className="picker" style={{width:'850px'}} id="pickerBox">
              <div style={{float:'left',width:'100%'}}>
                <div id="pickerContainer"></div>
                <div className="shopForce"><img src="static/lzsale/src/img/Group.png"/></div>
              </div>
            </div>
          </div>
          <Col span = {24} className="paddingLeft">
          <div style={{marginTop: '20px', marginBottom: '10px'}}>{lang_obj[lang]['district_rank_1']}<span style={{color: '#DA1E24', fontWeight: 'bolder'}}>{new_getrank}</span> {lang_obj[lang]['district_rank_2']}</div>
          </Col>

          <Col span = {9} className="paddingLeft sales_volume">
            <span className="label">{lang_obj[lang]['sales_volume_short']}</span>
            <b className="b_icon"></b><span className="num" style={{fontSize:(new_saleIn.sold_amount+'').split('.')[0].length>11?'28px':'34px'}}>{new_saleIn.sold_amount}</span>
          </Col>
          <Col span = {15} className="col_two" style={{lineHeight:'40px'}}>
            <Col span = {8} ><span>{lang_obj[lang]['sale_quantity_short']}</span><span className="size_24" style={{display:'flex'}}>{new_bagrate.sale_count}<b className="b_right">{lang!='en'?lang_obj[lang]['piece']:''}</b></span></Col>
            <Col span = {8} ><span>{lang_obj[lang]['same_growth_rate']}</span><span className="size_24">{new_tong.tong_ratio}</span></Col>
            <Col span = {8} ><span>{lang_obj[lang]['cir_growth_rate']}</span><span className="size_24" style={{fontSize: ((new_tong.huan_ratio + '').length > 7 ? '16px' : '24px')}}>{new_tong.huan_ratio}</span></Col>
          </Col>
          {/* <Col span = {12} className="paddingLeft" style={{height:'182px',borderBottom:'1px solid #eaeaea'}}>
            <span >{lang_obj[lang]['district_rank']}<span style={{paddingLeft:'20px',fontSize:'24px',color:'#34495e',fontFamily: 'PingFangSC-Medium'}}>NO.{new_getrank}</span><br/>
            <span style={{position:'relative',top:'10px'}}>{lang_obj[lang]['sales_volume']}</span>
            </span><b className="b_icon"></b><span className="num">{new_saleIn.sold_amount}</span>
          <div className="col_two" style={{marginTop:'31px','whiteSpace':'nowrap'}}>
            <div style={{width:'54%',float:"left"}}>{lang_obj[lang]['chain_store_sales']}<b style={{fontSize:'16px',marginLeft:'20px'}}></b><b className="size_24">{new_saleIn.indicator}</b></div>
            <div style={{display:'inline-block',marginLeft:'-2%'}}>{lang_obj[lang]['complate_rate']}<b style={{marginLeft:'20px'}} className="size_24">{new_saleIn.complete_rate}</b></div>
            </div>
          </Col>
          <Col span = {12} className="col_two" style={{lineHeight:'40px'}}>
            <div className="layout"><span>{lang_obj[lang]['cir_growth_rate']}</span><br/><span style={{paddingLeft:'50px'}} className="size_24">{new_tong.huan_ratio}</span>
            </div>
            <div className="layout"><span>{lang_obj[lang]['same_growth_rate']}</span><br/><span style={{paddingLeft:'50px'}} className="size_24">{new_tong.tong_ratio}</span>
            </div>
            <div className="layout_three"><span>{lang_obj[lang]['sale_order']}</span><br/><span style={{paddingLeft:'50px'}} className="size_24">{new_ordercount.order_count}<b className="b_right">{lang_obj[lang]['sheet']}</b></span>
            </div>
            <div className="layout_three"><span>{lang_obj[lang]['sale_quantity']}</span><br/><span style={{paddingLeft:'50px'}} className="size_24">{new_bagrate.sale_count}<b className="b_right">{lang_obj[lang]['piece']}</b></span>
            </div>
            <div className="layout_three"><span>{lang_obj[lang]['pattern_rate']}</span><br/><span style={{paddingLeft:'50px'}} className="size_24">{new_bagrate.bag_rate}<b className="b_right"></b></span>
            </div>
          </Col>
          
          <Col span = {6} className="right_line"><p style={{textAlign:'left'}}>{lang_obj[lang]['new_vip']}</p><p className="color_size"><span style={{fontSize:'36px',fontWeight:'600'}}>{new_vip.new_vip}</span> {lang_obj[lang]['people']}</p></Col>
          <Col span = {6} style={{padding:'10px 10px 10px 20px'}}><p style={{textAlign:'left'}}>{lang_obj[lang]['vip_sale']}</p><p className="color_size" style={{textAlign:'center',color:'#2185C5'}}><span style={{fontSize:'36px',color:'#2185C5',marginRight:'6px',fontWeight:'600'}}>{new_ordercount.vip_order_count}</span>{lang_obj[lang]['sheet']}</p></Col>
          <Col span = {6} className="right_line" style={{borderLeft:'1px solid #eaeaea',paddingLeft:'10px'}}><p style={{textAlign:'left'}}>{lang_obj[lang]['price_k']}</p><p className="size_24"><span style={{fontSize:'16px'}}></span>{new_ordercount.order_amount_avg}</p></Col>
          <Col span = {6} className="right_line"><p style={{textAlign:'left',paddingLeft:'0px'}}>{lang_obj[lang]['price_j']}</p><p className="size_24"><span style={{fontSize:'16px'}}></span>{new_bagrate.sale_price_avg}</p></Col>
           */}
           <Col span = {9} style={{marginTop: '12px', marginBottom: '17px', fontSize: '14px'}}>
            <div className="sexs_men">
              <label>{lang_obj[lang]['male']}</label><span>{new_saleIn.male_amount}</span>
            </div>
            <div className="sexs_women">
              <label>{lang_obj[lang]['female']}</label><span>{new_saleIn.female_amount}</span>
            </div>
          </Col>
          <Col span = {15} className="sale_sexs_right">
            <Col span = {8}>
              <div className="sexs_men">
                <label>{lang_obj[lang]['male_M']}</label><span>{new_bagrate.male_sale_count}</span>
              </div>
              <div className="sexs_women">
                <label>{lang_obj[lang]['female_F']}</label><span>{new_bagrate.female_sale_count}</span>
              </div>
            </Col>
            <Col span = {8}>
              <div className="sexs_men">
                <label>{lang_obj[lang]['male_M']}</label><span>{new_tong.tong_male_ratio}</span>
              </div>
              <div className="sexs_women">
                <label>{lang_obj[lang]['female_F']}</label><span>{new_tong.tong_female_ratio}</span>
              </div>
            </Col>
            <Col span = {8}>
              <div className="sexs_men">
                <label>{lang_obj[lang]['male_M']}</label><span>{new_tong.huan_male_ratio}</span>
              </div>
              <div className="sexs_women">
                <label>{lang_obj[lang]['female_F']}</label><span>{new_tong.huan_female_ratio}</span>
              </div>
            </Col>
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
        {/* 8个数据显示 */}
        <Row type = "flex" className = "content_1 BG sales_statistics">
          <Col span = {8}>
            <div className="item"><label>{lang_obj[lang]['chain_store_sales']}</label><b className="size_24">{new_saleIn.indicator}</b></div>
            <div className="border"></div>
            <div className="item"><label>{lang_obj[lang]['new_vip']}</label><span style={{color:'#8E50B7', display:'flex'}}><b className="size_24" style={{color:'#8E50B7'}}>{new_vip.new_vip}</b> {lang!='en'?lang_obj[lang]['people']:''}</span></div>
          </Col>
          <Col span = {6}>
            <div className="item"><label>{lang_obj[lang]['complate_rate_short']}</label><b className="size_24">{new_saleIn.complete_rate}</b></div>
            <div className="border"></div>
            <div className="item"><label>{lang_obj[lang]['vip_sale']}</label><span style={{color:'#8E50B7', display:'flex'}}><b className="size_24" style={{color:'#8E50B7'}}>{new_ordercount.vip_order_count}</b> {lang!='en'?lang_obj[lang]['sheet']:''}</span></div>
          </Col>
          <Col span = {5}>
            <div className="item"><label>{lang_obj[lang]['sale_order_short']}</label><b className="size_24">{new_ordercount.order_count}</b> {lang!='en'?lang_obj[lang]['sheet']:''}</div>
            <div className="border"></div>
            <div className="item"><label>{lang_obj[lang]['price_k']}</label><b className="size_24">{new_ordercount.order_amount_avg}</b></div>
          </Col>
          <Col span = {5}>
            <div className="item"><label>{lang_obj[lang]['pattern_rate']}</label><b className="size_24">{new_bagrate.bag_rate}</b><b className="b_right"></b></div>
            <div className="border" style={{width:'100%'}}></div>
            <div className="item"><label>{lang_obj[lang]['price_j']}</label><b className="size_24">{new_bagrate.sale_price_avg}</b></div>
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
        <Row type = "flex" className = "content_1 content_2 BG">
          <Col  span = {14} className="header">
            <span className="blue_block"></span>{lang_obj[lang]['staff_sale_analysis']}
            <span className="help" data-set="two" onClick={self.clickHelp}>
              <img data-set="two" src="static/lzsale/src/img/help.png"/>
            </span>
          </Col>
          <Col span = {10} className="tab">
            {/*<ul onClick = {self.selectTabTwo}>
              <li data-type = 'day' className="active border_right" style={{borderRight:0}}>{lang_obj[lang]['day']}</li>
              <li data-type = 'week' className="border_right" style={{borderRight:0}}>{lang_obj[lang]['week']}</li>
              <li data-type = 'month'>{lang_obj[lang]['month']}</li>
            </ul>*/}
            <div className="date_text date_text2">
              <span className="startDate"></span>
              <span className="icondate">/</span>
              <span className="endDate"></span>
            </div>
            <div id="datepicker2" className="alert_block datepicker">
              <img src="static/lzsale/src/img/date.png" />
            </div>
            <div className="bg_wrap2"></div>
          </Col>

          <div style={{width:'100%',height:'358px',overflowX:'scroll',display:'inline-flex'}}>{Employee}</div>

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
        <Row type = "flex" className = "content_1 content_3 BG">
          <Col  span = {14} className="header">
            <span className="blue_block"></span>{lang_obj[lang]['sale_trend']}
            <span className="help" data-set="three" onClick={self.clickHelp}>
              <img data-set="three" src="static/lzsale/src/img/help.png" alt="" />
            </span>
          </Col>
          <Col span = {10} className="tab">
            <div className="date_text date_text4">
              <span className="startDate"></span>
              <span className="icondate">/</span>
              <span className="endDate"></span>
            </div>
            <div id="datepicker4" className="alert_block datepicker" style={{top:'10px'}}>
              <img src="static/lzsale/src/img/date.png" />
            </div>
          </Col>
          <div className="chart_img a_1">
            <AreaLineChart series = {new_saletrend}/>
          </div>
          <div className="nodata_img a_1 cn">
            <img src="static/lzsale/src/img/nodata.png" /> 
          </div>
          <div className="nodata_img a_1 en">
            <img src="static/lzsale/src/img/nodata_img.png" /> 
          </div>
          <div className="nodata_img a_1 zh-Hant">
            <img src="static/lzsale/src/img/nodata_zh_Hant.png" /> 
          </div>

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


        <Row type = "flex" className = "content_1 content_3 BG">
          <Col  span = {14} className="header">
            <span className="blue_block"></span>
            {lang_obj[lang]['big_category_sale_rank']}
            <span className="help" data-set="four" onClick={self.clickHelp}>
              <img data-set="four" src="static/lzsale/src/img/help.png" alt="" />
            </span>
            {/*<span className="marginLeft">{start_date}</span>*/}
          </Col>
          <Col span = {10} className="tab">
            {/*<ul onClick = {self.selectTabThree}>
              <li data-type = 'day' className="active border_right" style={{borderRight:0}}>{lang_obj[lang]['day']}</li>
              <li data-type = 'week' className="border_right" style={{borderRight:0}}>{lang_obj[lang]['week']}</li>
              <li data-type = 'month'>{lang_obj[lang]['month']}</li>
            </ul>*/}
            <div className="date_text date_text3">
              <span className="startDate"></span>
              <span className="icondate">/</span>
              <span className="endDate"></span>
            </div>
            <div id="datepicker3" className="alert_block datepicker">
              <img src="static/lzsale/src/img/date.png" />
            </div>
            <div className="bg_wrap3"></div>
          </Col>
          <div className="chart_img a_2"><BubbleChart series={new_salerank} /></div>
          <div className='nodata_img a_2 cn'>
            <img src="static/lzsale/src/img/nodata.png" /> 
          </div>
          <div className='nodata_img a_2 en'>
            <img src="static/lzsale/src/img/nodata_img.png" /> 
          </div>
          <div className='nodata_img a_2 zh-Hant'>
            <img src="static/lzsale/src/img/nodata_zh_Hant.png" /> 
          </div>

          <div className="circle_loading3">
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

        <div className="circle_loading4">
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
    )

  }
})

module.exports = Sale