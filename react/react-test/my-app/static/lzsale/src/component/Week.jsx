import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col} from 'antd';
import { DatePicker ,Spin } from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import moment from 'moment'
import lang_obj from '../lang/language.js';
var Reflux = require('reflux');
var $ = require('jquery');

import ShopBarChart from './ShopBarChart.jsx';
import BubbleChartWeek from './BubbleChartWeek.jsx';
import PieChart from './PieChart.jsx';

import EditorChart1 from './EditorChart1.jsx';
import EditorChart2 from './EditorChart2.jsx';
import EditorChart3 from './EditorChart3.jsx';
import EditorChart4 from './EditorChart4.jsx';
import EditorChart5 from './EditorChart5.jsx';

import EditorChartWeek1 from './EditorChartWeek1.jsx';
import EditorChartWeek2 from './EditorChartWeek2.jsx';
import EditorChartWeek3 from './EditorChartWeek3.jsx';
import EditorChartWeek4 from './EditorChartWeek4.jsx';
import EditorChartWeek5 from './EditorChartWeek5.jsx';

import RingChart1 from './RingChart1.jsx';
import RingChart2 from './RingChart2.jsx';
import RingChart3 from './RingChart3.jsx';
import RingChart4 from './RingChart4.jsx';

import RingChartWeek1 from './RingChartWeek1.jsx';
import RingChartWeek2 from './RingChartWeek2.jsx';
import RingChartWeek3 from './RingChartWeek3.jsx';

import WeekAction from '../actions/WeekAction.jsx';
import WeekStore from '../stores/WeekStore.jsx';


var Week = React.createClass({
  mixins:[Reflux.listenTo(WeekStore,'onStatusChange')],
  getInitialState(){
    var language = lang_obj.get_lang('lang');
    // if( (typeof language == 'undefined') || (language != 'en'&&language != 'zh-Hant') ){
    //   language = 'cn'
    // }
    return{
      lang: language,
      new_shopdata:{},//跨店对比
      search_shopdata:{},
      search_thanshop:{},
      brand_data:[],//对比品牌
      target_brand_data:[],
      new_shopbasket:[],//购物篮
      max_min:{},
      new_shopactive:[],

      products:[],//商品排行
      category:[],//大类top5
      
      orderby:[],//门店排行
      brand_list:[],//品牌列表
      brand_id:!!sessionStorage.getItem('brand_id')? Number(sessionStorage.getItem('brand_id')) : -1,
      brand_name:!!sessionStorage.getItem('brand_name')? sessionStorage.getItem('brand_name') : 'All',
      max:{},
      loading:false,
    }
  },
  onStatusChange(data){
    // 初始页面
    var week_one = sessionStorage.getItem('week_one'),
        week_two = sessionStorage.getItem('week_two'),
        week_three = sessionStorage.getItem('week_three'),
        week_four = sessionStorage.getItem('week_four');
      console.log('week_two', week_two, $('.circle_loading2'))
      // if(week_one == '1' && week_two == '1' && week_three == '1' && week_four == '1'){
      //   // $('.circle_loading5').hide();
      //   $('.circle_loading1').hide();
      //   $('.circle_loading2').hide();
      //   $('.circle_loading3').hide();
      //   $('.circle_loading4').hide();
      // }

    var one = sessionStorage.getItem('search1'),
        two = sessionStorage.getItem('search2'),
        three = sessionStorage.getItem('search3'),
        four = sessionStorage.getItem('search4'),
        five = sessionStorage.getItem('week_tab');

      if(one == '1' && two == '1' && three == '1' && four == '1'){
        // $('.circle_loading5').hide();
        $('.circle_loading1').hide();
        $('.circle_loading2').hide();
        $('.circle_loading3').hide();
        $('.circle_loading4').hide();
      }

    if(data){
      // console.log(888888, data.max_min)
      // if(sessionStorage.getItem('week_two')=='1'){
      //   $('.circle_loading2').hide()
      // }
      // if(sessionStorage.getItem('week_three')=='1'){
      //   $('.circle_loading3').hide()
      // }
      // if(data.new_shopdata.target_shop_data){
      //   data.new_shopdata.target_shop_data.sale_amount = '1234567890123.00'
      // }
      this.setState({
        new_shopdata:data.new_shopdata,
        search_shopdata:data.new_shopdata.shop_data,
        search_thanshop:data.new_shopdata.target_shop_data,
        // brand_data:data.new_shopdata.brand_data,
        // target_brand_data:data.new_shopdata.target_brand_data,
        new_shopbasket:data.new_shopbasket,
        max_min:data.max_min,
        new_shopactive:data.new_shopactive,


        search:data.search,
        products:data.products.product_data,
        category:data.products.category_data,
        
        orderby:data.orderby,
        brand_list:data.brand_list,
        max:data.max
      })
    }
    // if(this.state.products.length == 0 && this.state.category.length == 0){
    //   $('nodata_img').show();
    //   $('.shop_order').hide();
    // }else{
    //   $('.shop_order').show();
    //   $('nodata_img').hide();
    // }
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

  },
  componentDidMount(){

    $('.circle_loading1').show();
    $('.circle_loading2').show();
    console.log('7777', $('.circle_loading2'))
    $('.circle_loading3').show();
    $('.circle_loading4').show();
    // $('.circle_loading5').show();

    sessionStorage.setItem('week_one','0');
    sessionStorage.setItem('week_two','0');
    sessionStorage.setItem('week_three','0');
    sessionStorage.setItem('week_four','0');

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
    
    var nowDate = new Date();
    // var didDate = 7 * 24 *60 * 60 *1000;
    // var now_did = nowDate - didDate;
    // var time = new Date(now_did);
    nowDate.setDate(nowDate.getDate() - (nowDate.getDay() + 6) % 7);
    var nowDate_year = nowDate.getFullYear();
    var nowDate_month = nowDate.getMonth()+1;
    var nowDate_day = nowDate.getDate();
    if(String(nowDate_month).length == 1){
        nowDate_month = '0' + nowDate_month;
    }if(String(nowDate_day).length == 1){
        nowDate_day = '0' + nowDate_day;
    }
    var start_date = nowDate_year + '-' + nowDate_month + '-' + nowDate_day; 
    nowDate.setDate(nowDate.getDate() + 6);
    var will_year = nowDate.getFullYear();
    var will_month = nowDate.getMonth()+1;
    var will_day = nowDate.getDate();
    if(String(will_month).length == 1){
        will_month = '0' + will_month;
    }if(String(will_day).length == 1){
        will_day = '0' + will_day;
    }
    var end_date = will_year + '-' + will_month + '-' + will_day;
    if(sessionStorage.getItem('start_date')){
        start_date = sessionStorage.getItem('start_date')
    }
    if(sessionStorage.getItem('end_date')){
        end_date = sessionStorage.getItem('end_date')
    }
    var shop_id = this.getShopId('shop_id=');
    var obj = {};
    obj.shop_id = shop_id;
    obj.start_date = start_date;
    obj.end_date = end_date;
    
    if(!!Three.shopData){
      // if(Three.shopData.target_shop_data){
      //   Three.shopData.target_shop_data.sale_amount = '1234567890123.00'
      // }
      this.setState({
        new_shopdat:Three.shopData,
        search_shopdata:Three.shopData.shop_data,
        search_thanshop:Three.shopData.target_shop_data,
        // brand_data:Three.shopData.brand_data,
        // target_brand_data:Three.shopData.target_brand_data,
      });
      sessionStorage.setItem('week_one','1')
      $('.circle_loading1').hide();
    }else{
      var obj2 = {};
      obj2.shop_id = shop_id;
      obj2.start_date = start_date;
      obj2.end_date = end_date;
      obj2.brand_id = !!sessionStorage.getItem('brand_id')? Number(sessionStorage.getItem('brand_id')) : -1
      WeekAction.shopData(obj2);
    }
    console.log(11111)
    if(!!Three.shopBasket){
      this.setState({
        new_shopbasket:Three.shopBasket.sale_analysis,
        max_min:Three.shopBasket.max_min
      });
      sessionStorage.setItem('week_two','1')
      $('.circle_loading2').hide();
      console.log(22222)
    }else{
      if(this.state.brand_id==-1){
        WeekAction.shopBasket(obj);
        console.log(44444)
      }else{
        $('.circle_loading2').hide();
        console.log(33333)
      }
    }

    if(!!Three.shopActive){
      this.setState({
        new_shopactive:Three.shopActive,
      });
      sessionStorage.setItem('week_three','1')
      $('.circle_loading3').hide();
    }else{
      if(this.state.brand_id==-1){
        WeekAction.shopActive(obj);
      }else{
        $('.circle_loading3').hide();
      }
    }

    if(!!Three.product){
      this.setState({
        products:Three.product.product_data,
        category:Three.product.category_data,
        max_min:Three.product.max_min
      });
      sessionStorage.setItem('week_four','1')
      $('.circle_loading4').hide();
    }else{
      if(this.state.brand_id==-1){
        WeekAction.product(obj);
      }else{
        $('.circle_loading4').hide();
      }
    }
    // if(sessionStorage.getItem('week_start_date')){
      
    // }
    
    this.setState({
      year:Year,
      year_month : year_month, //年月
      year_month_day : year_month_day, //年月日
      start_date: start_date,
      end_date: end_date,
    })

    var {products,category,new_shopactive} = this.state;
    var one = sessionStorage.getItem('search1'),
        two = sessionStorage.getItem('search2'),
        three = sessionStorage.getItem('search3'),
        four = sessionStorage.getItem('search4'),
        five = sessionStorage.getItem('week_tab');

        if(two=='1'){
          $('.circle_loading2').hide();
        }
        if(three=='1'){
          $('.circle_loading3').hide();
        }
      // if(one == '1' && two == '1' && three == '1' && four == '1' && five == '1'){
      //   $('.circle_loading5').hide();
      //   $('.circle_loading1').hide();
      //   $('.circle_loading2').hide();
      //   $('.circle_loading3').hide();
      //   $('.circle_loading4').hide();

      // }

    var week_one = sessionStorage.getItem('week_one'),
        week_two = sessionStorage.getItem('week_two'),
        week_three = sessionStorage.getItem('week_three'),
        week_four = sessionStorage.getItem('week_four');

        if(week_two=='1'){
          $('.circle_loading2').hide();
        }
        if(week_three=='1'){
          $('.circle_loading3').hide();
        }
      // if(week_one == '1' && week_two == '1' && week_three == '1' && week_four == '1'){
      //   // $('.circle_loading5').hide();
      //   $('.circle_loading1').hide();
      //   $('.circle_loading2').hide();
      //   $('.circle_loading3').hide();
      //   $('.circle_loading4').hide();
      // }
      
      if(this.state.brand_id!=-1){
        $('.content_3').hide()
        $('.content_4').hide()
      }else{
        $('.content_3').show()
        $('.content_4').show()
      }

    // if(products.length == 0 && category.length == 0){
    //   $('nodata_img').show();
    //   $('.shop_order').hide();
    // }else{
    //   $('.shop_order').show();
    //   $('nodata_img').hide();
    // }

  },
  onStartChange(e){
    var dateString = e.target.value;
    var nowDate = new Date(dateString).getTime();
    var willDate = 7 * 24 *60 * 60 *1000;
    var now_will = nowDate + willDate;
    var time = new Date(now_will);
    var will_year = time.getFullYear();
    var will_month = time.getMonth()+1;
    var will_day = time.getDate();
    if(String(will_month).length == 1){
        will_month = '0' + will_month;
    }if(String(will_day).length == 1){
        will_day = '0' + will_day;
    }
    var EndDate = will_year +'-'+ will_month +'-'+ will_day;
    this.getWeek(String(dateString));
  },
  getLastDay(year,month){
    var new_year = year;
    var new_month= month++;
    if(month>12){
      new_month -=12;
      new_year++;
    }
    var new_date = new Date(new_year,new_month,1);
    var date_count = (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月天数
    sessionStorage.setItem('date_count',date_count)
    return date_count;

  },
  // onEndChange(e){
  //   var dateString = e.target.value;
  //   this.setState({
  //       end_date: dateString
  //   })
  // },
  brand_show(e){
    // $('.circle_loading_a').show();
    $('.brand_list_right').show();
    $('.background').show();
    // if(!!sessionStorage.getItem('brand_id')){
    //   this.setState({
    //     brand_id:sessionStorage.getItem('brand_id')
    //   })
    // }else{
    //   this.setState({
    //     brand_id:-1
    //   })
    // }
    // 调用一次
    if(this.state.brand_list.length==0){
      WeekAction.brandList({shop_id:this.getShopId('shop_id=')});
    }
  },
  orderBy(e){
    $('.circle_loading_a').show();
    var {start_date,end_date} = this.state;
    $(e.target).addClass('click');
    $('.block_right').show();
    $('.background').show();
    var shop_id = this.getShopId('shop_id=');
    var obj = {};
    obj.shop_id = shop_id;
    obj.start_date = start_date;
    obj.end_date = end_date;
    obj.brand_id = !!sessionStorage.getItem('brand_id')? Number(sessionStorage.getItem('brand_id')) : -1
    WeekAction.order(obj);
    if($('.block_right .content ul:first li').hasClass('pk_img')){
      
    }else{
      setTimeout(function(){
        $('.block_right .content ul:first li:first').show();
        $('.block_right .content ul:first').addClass('thanOrder');
      },500)
    }
  },
  message(){
    $('.orderBy').click();
  },
  selectTab(e){
    var {start_date,end_date} = this.state;
    var {products,category} = this.state;
    sessionStorage.setItem('week_tab','0');
    $('.bg_wrap').show();
    $('.circle_loading4').show();

    $(e.target).addClass('active').siblings().removeClass('active');
    // 判断缓存
    if($(e.target).hasClass('click')){
      return;
    }
    $(e.target).addClass('click').siblings().removeClass('click');
    var _item = '' ,_item2 = '';
    switch(e.target.dataset.type){
      case '0':
        _item = 'tab1';
      break;
      case '1':
        _item2 = 'tab2';
      break;
    }
    var tab1 = JSON.parse(sessionStorage.getItem(_item));
    var tab2 = JSON.parse(sessionStorage.getItem(_item2));
    var flag = false;
    if(tab1){
      $('.bg_wrap').hide();
      $('.circle_loading4').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        products:tab1.product_data,
        category:tab1.category_data
      })
      sessionStorage.setItem('week_tab','1');
      flag = true;
    }else if(tab2){
      $('.bg_wrap').hide();
      $('.circle_loading4').hide();
      $('.tab li.click').removeClass('click');
      this.setState({
        products:tab2.product_data,
        category:tab2.category_data
      })
      sessionStorage.setItem('week_tab','1');
      flag = true;
    }
    if(flag){
      return;
    }
    
    // -----------------------------------
    var shop_id = this.getShopId('shop_id=');
    var obj = {};
    obj.shop_id = shop_id;
    obj.start_date = start_date;
    obj.end_date = end_date;
    obj.on_discount = Number(e.target.dataset.type);
    if(this.state.brand_id==-1){
      WeekAction.product(obj);
    }
    sessionStorage.setItem('selectTab',e.target.dataset.type);
  },
  search(){
    if(!!sessionStorage.getItem('brand_id') && sessionStorage.getItem('brand_id')!=-1){
      $('.content_3').hide()
      $('.content_4').hide()
    }else{
      $('.content_3').show()
      $('.content_4').show()
    }

    var {start_date,end_date} = this.state;
    // $('.circle_loading5').show();
    $('.circle_loading1').show();
    $('.circle_loading2').show();
    console.log(6666)
    $('.circle_loading3').show();
    $('.circle_loading4').show();

    var shop_id = this.getShopId('shop_id=');
    var obj = {};
    obj.shop_id = shop_id;
    obj.start_date = start_date;
    obj.end_date = end_date;
    // obj.brand_id = !!sessionStorage.getItem('brand_id')? Number(sessionStorage.getItem('brand_id')) : -1

    sessionStorage.setItem('search1', '0');
    sessionStorage.setItem('search2', '0');
    sessionStorage.setItem('search3', '0');
    sessionStorage.setItem('search4', '0');

    sessionStorage.removeItem('tab1');
    sessionStorage.removeItem('tab2');

    var obj2 = {};
    obj2.shop_id = shop_id;
    obj2.start_date = start_date;
    obj2.end_date = end_date;
    obj2.brand_id = !!sessionStorage.getItem('brand_id')? Number(sessionStorage.getItem('brand_id')) : -1
    WeekAction.shopData(obj2);
    if(!sessionStorage.getItem('brand_id') || sessionStorage.getItem('brand_id')==-1){
      WeekAction.shopBasket(obj);
      WeekAction.shopActive(obj);
      WeekAction.product(obj);
    }
  },
  close(){
    $('.background').hide();
    $(".block_right").hide();
    $('.brand_list_right').hide();
    this.setState({
      brand_name: sessionStorage.getItem('brand_name')
    })
  },
  clickBrand(e){
    this.setState({
      brand_id: e.target.dataset.id
    })
    sessionStorage.setItem('brand_id', e.target.dataset.id);
    sessionStorage.setItem('brand_name', e.target.dataset.name);
  },
  clickBrandConfirm(){
    this.setState({
      brand_name: sessionStorage.getItem('brand_name')
    })
    $('.background').hide();
    $('.brand_list_right').hide();
    // this.search()
  },
  clickCancel(){
    $('.background').hide();
    $('.brand_list_right').hide();
  },
  clickShop(e){
    $(e.target).parent().addClass('thanOrder').siblings().removeClass('thanOrder');
    sessionStorage.setItem('than_shop_id',e.target.dataset.type);
    sessionStorage.setItem('thanIndex',e.target.dataset.index);
    $(e.target).parent().find('.pk_img').show().parent().siblings().find('.pk_img').hide();
  },
  thanShop(){
    var {start_date,end_date} = this.state;
    var shop_id = this.getShopId('shop_id=');
    var obj = {};
    obj.shop_id = shop_id;
    obj.start_date = start_date;
    obj.end_date = end_date;
    var than_shop_id = Number(sessionStorage.getItem('than_shop_id'));
    obj.target_shop_id = than_shop_id;
    obj.brand_id = !!sessionStorage.getItem('brand_id')? Number(sessionStorage.getItem('brand_id')) : -1
    // $('.circle_loading5').show();
    $('.circle_loading1').show();
    console.log(sessionStorage.getItem('search1'))
    $('.block_right').hide();
    $('.background').hide();
    WeekAction.shopData(obj);
  },
  getWeek(dateString){
    var date = new Date(dateString);
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    if(String(month).length == 1){
        month = '0' + month;
    }if(String(day).length == 1){
        day = '0' + day;
    }
    var start_date = year +'-'+ month + '-' + day;
    date.setDate(date.getDate() + 6);
    var year_end = date.getFullYear();
    var month_end = date.getMonth()+1;
    var day_end = date.getDate();
    if(String(month_end).length == 1){
        month_end = '0' + month_end;
    }if(String(day_end).length == 1){
        day_end = '0' + day_end;
    }
    
    var end_date = year_end + '-' + month_end + '-' + day_end;
    this.setState({
      start_date:start_date,
      end_date:end_date
    })
    sessionStorage.setItem('week_start_date',start_date);
    sessionStorage.setItem('week_end_date',end_date);
  },
  handleLeft(e){
    var {start_date} = this.state;
    var nowDate = new Date( String(e.target.dataset.type) );
    var oldDate = new Date(nowDate.getTime() - 1*24*60*60*1000);
    var year_left = oldDate.getFullYear();
    var month_left = oldDate.getMonth()+1;
    var day_left = oldDate.getDate();
    if(String(month_left).length == 1){
        month_left = '0' + month_left;
    }if(String(day_left).length == 1){
        day_left = '0' + day_left;
    }
    var end_date = year_left + '-' + month_left + '-' + day_left;
    this.getWeek(String(end_date));
    $('.input_date .jiantou.show').hide();
    $('.input_date .jiantou.hide').show();
  },
  handleRight(e){
    // 获取当前年月日
    var {end_date} = this.state;
    var date = new Date();
    var Year = date.getFullYear();
    var Month = date.getMonth() + 1;
    var Day = date.getDate();

    if(String(Month).length == 1){
        Month = '0' + Month;
    }if(String(Day).length == 1){
        Day = '0' + Day;
    }
    var now_date = Year + '-' + Month + '-' + Day ;
    
    var nowDate = new Date( String(e.target.dataset.type) );


    var date2 = new Date(String(e.target.dataset.type));
    date2.setDate(nowDate.getDate() + 8);
    if(date2 > date ){
      $('.input_date .jiantou.show').show();
      $('.input_date .jiantou.hide').hide();
    }else{
      $('.input_date .jiantou.show').hide();
      $('.input_date .jiantou.hide').show();
    }
    var oldDate = new Date(String(e.target.dataset.type));
    oldDate.setDate(nowDate.getDate() + 1);
    var year_left = oldDate.getFullYear();
    var month_left = oldDate.getMonth()+1;
    var day_left = oldDate.getDate();
    if(String(month_left).length == 1){
        month_left = '0' + month_left;
    }if(String(day_left).length == 1){
        day_left = '0' + day_left;
    }
    var end_date = year_left + '-' + month_left + '-' + day_left;
    this.getWeek(String(end_date));
  },
  clickHelp(e){
    $('.background').show();
    $('body').css('overflow','hidden');
    if(e.target.dataset.set == 'one'){
      $('.help-modeWeek-one').show();
    }else if(e.target.dataset.set == 'two'){
      $('.help-modeWeek-two').show();
    }else if(e.target.dataset.set == 'three'){
      $('.help-modeWeek-three').show();
    }else if(e.target.dataset.set == 'four'){
      $('.help-modeWeek-four').show();
    }else if(e.target.dataset.set == 'five'){
      $('.help-modeWeek-five').show();
    }
  },

  render(){
    var self = this;
    var {new_shopdata,new_shopbasket,new_shopactive,year_month_day,year_month,start_date,end_date,search,search_shopdata,search_thanshop,brand_data,target_brand_data,orderby,brand_list,products,category,max_min,max, lang} = this.state;
    var index = 0;
    var format = 'YYYY-MM-DD';
    // var Brand_data1 = Array.isArray(brand_data.slice(0,1))? brand_data.slice(0,1).map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li  className="ring_week"><RingChart1 series={item}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }): <div></div>
    // var Brand_data2 = Array.isArray(brand_data.slice(1,2))? brand_data.slice(1,2).map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li  className="ring_week"><RingChart2 series={item}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }):<div></div>
    // var Brand_data3 = Array.isArray(brand_data.slice(2,3))? brand_data.slice(2,3).map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li  className="ring_week"><RingChart3 series={item}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }): <div></div> 
    // var Brand_data4 = Array.isArray(brand_data.slice(3,4))? brand_data.slice(3,4).map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li  className="ring_week"><RingChart4 series={item}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }):<div></div>

    // var target_brand_data1 = target_brand_data.slice(0,1);
    // var target_brand_data2 = target_brand_data.slice(1,2);
    // var target_brand_data3 = target_brand_data.slice(2,3);

    // var Brand_datas1 = Array.isArray(target_brand_data1)? target_brand_data1.map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li className="ring_week"><RingChartWeek1 series={item.sale_amount}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }):<div></div>
    // var Brand_datas2 = Array.isArray(target_brand_data3)? target_brand_data3.map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li className="ring_week"><RingChartWeek2 series={item.sale_amount}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }):<div></div>
    // var Brand_datas3 = Array.isArray(target_brand_data3)? target_brand_data3.map((item,index) => {
    //   return(
    //     <ul className="store_a" key={index}>
    //       <li>{item.brand}</li>
    //       <li className="ring_week"><RingChartWeek3 series={item.sale_amount}/></li>
    //       <li>{item.huan_ratio}</li>
    //       <li>{item.tong_ratio}</li>
    //     </ul>
    //   )
    // }): <div></div>
    if(lang == 'en'){
      if(!!category){
        if(category.length == 0){
          $('.category_nodata.en').show();
          $('.category_hasdata').hide();
        }else{
          $('.category_nodata.en').hide();
          $('.category_hasdata').show();
        }
      }
    }else{
      if(!!category){
        if(category.length == 0){
          $('.category_nodata.cn').show();
          $('.category_hasdata').hide();
        }else{
          $('.category_nodata.cn').hide();
          $('.category_hasdata').show();
        }
      }
    }
    
    var category1=[],category2=[],category3=[],category4=[],category5=[];
    if(!!category){
      if(category.length != 0){
        category1 = category.slice(0,1);
        category2 = category.slice(1,2);
        category3 = category.slice(2,3);
        category4 = category.slice(3,4);
        category5 = category.slice(4,5);
      }
    }
  
    var Thumbnail_url ;

    var Category1 = Array.isArray(category1)? category1.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span><img src="static/lzsale/src/img/order.png" /></span><br/><span style={{marginLeft:'5px'}}>{index+1}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.category_name}</p>
            <div className ="product_chart"><EditorChart1 series={category1} seriesValue={max}/></div>
          </li>
        </div>
      )
    }):<div></div>
    var Category2 = Array.isArray(category2)? category2.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span><img src="static/lzsale/src/img/order2.png" /></span><br/><span style={{marginLeft:'5px'}}>{index+2}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.category_name}</p>
            <div className ="product_chart"><EditorChart2 series={category2} seriesValue={max}/></div>
          </li>
        </div>
      )
    }):<div></div>
    var Category3 = Array.isArray(category3)? category3.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span><img src="static/lzsale/src/img/order3.png" /></span><br/><span style={{marginLeft:'5px'}}>{index+3}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.category_name}</p>
            <div className ="product_chart"><EditorChart3 series={category3} seriesValue={max}/></div>
          </li>
        </div>
      )
    }):<div></div>
    var Category4 = Array.isArray(category4)? category4.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span></span><br/><span style={{marginLeft:'5px'}}>{index+4}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.category_name}</p>
            <div className ="product_chart"><EditorChart4 series={category4} seriesValue={max}/></div>
          </li>
        </div>
      )
    }):<div></div>
    var Category5 = Array.isArray(category5)? category5.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span></span><br/><span style={{marginLeft:'5px'}}>{index+5}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.category_name}</p>
            <div className ="product_chart"><EditorChart5 series={category5} seriesValue={max}/></div>
          </li>
        </div>
      )
    }):<div></div>

    if(lang == 'en'){
      if(!!products){
        if(products.length == 0){
          $('.product_nodata.en').show();
          $('.product_hasdata').hide();
        }else{
          $('.product_nodata.en').hide();
          $('.product_hasdata').show();
        }
      }
    } else if(lang == 'zh-Hant'){
      if(!!products){
        if(products.length == 0){
          $('.product_nodata.zh-Hant').show();
          $('.product_hasdata').hide();
        }else{
          $('.product_nodata.zh-Hant').hide();
          $('.product_hasdata').show();
        }
      }
    }else{
      if(!!products){
        if(products.length == 0){
          $('.product_nodata.cn').show();
          $('.product_hasdata').hide();
        }else{
          $('.product_nodata.cn').hide();
          $('.product_hasdata').show();
        }
      }
    }
    
    var product1=[],product2=[],product3=[],product4=[],product5=[];
    if(!!products){
      if(products.length != 0){
        product1 = products.slice(0,1);
        product2 = products.slice(1,2);
        product3 = products.slice(2,3);
        product4 = products.slice(3,4);
        product5 = products.slice(4,5);
      }
    }
    
    var Product1 = product1.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span><img src="static/lzsale/src/img/order.png" /></span><br/><span style={{marginLeft:'5px'}}>{index+1}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.product_name}</p>
            <div className="product_chart"><EditorChartWeek1 series={product1} seriesValue={max}/></div>
          </li>
        </div>
      )
    })
    var Product2 = product2.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span><img src="static/lzsale/src/img/order2.png" /></span><br/><span style={{marginLeft:'5px'}}>{index+2}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.product_name}</p>
            <div className="product_chart"><EditorChartWeek2 series={product2} seriesValue={max}/></div>
          </li>
        </div>
      )
    })
    var Product3 = product3.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span><img src="static/lzsale/src/img/order3.png" /></span><br/><span style={{marginLeft:'5px'}}>{index+3}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.product_name}</p>
            <div className="product_chart"><EditorChartWeek3 series={product3} seriesValue={max}/></div>
          </li>
        </div>
      )
    })
    var Product4 = product4.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span></span><br/><span style={{marginLeft:'5px'}}>{index+4}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.product_name}</p>
            <div className="product_chart"><EditorChartWeek4 series={product4} seriesValue={max}/></div>
          </li>
        </div>
      )
    })
    var Product5 = product5.map((item,index) => {
      Thumbnail_url = item.thumbnail_url ? item.thumbnail_url : "static/lzsale/src/img/img.png"
      return(
        <div className ="margin" key={index}>
          <li className="order" style={{width:'10%'}}><span></span><br/><span style={{marginLeft:'5px'}}>{index+5}</span></li>
          <li className="portal"><img style={{width:'100%',height:'100%'}} src = {Thumbnail_url}/></li>
          <li style={{width:'70%',overflow:'hidden',whiteiteSpace:'nowrap'}}>
            <p>{item.code}</p>
            <p style={{whiteSpace:"nowrap"}}>{item.product_name}</p>
            <div className="product_chart"><EditorChartWeek5 series={product5} seriesValue={max}/></div>
          </li>
        </div>
      )
    })


    var orderbyOne = orderby.slice(0,1);
    var OrderTitle = orderbyOne.map((item,index) => {
      return(
        <ul key = {index} className="orderOne">
          <li className="address"><img src="static/lzsale/src/img/address.png" /></li>
          <li>{item.rowid}</li>
          <li>{item.shop_code}</li>
          <li>{item.sale_amount}</li>
          <li>{item.huan_amount}</li>
          <li>{item.tong_amount}</li>
        </ul>
      )
    })
    var orders = orderby.slice(1,orderby.length);
    var Order = orders.map((item,index) => {
      // if(Number(sessionStorage.getItem('thanIndex'))){
      //   if(Number(sessionStorage.getItem('thanIndex')) == 0){
      //     $('.content ul').eq(index).addClass('thanOrder');
      //     $('.content ul .pk_img').eq(index).show();
      //   }
      // }
      // $('.content ul').eq(index).removeClass('thanOrder');
      $('.content ul .pk_img').eq(index).hide();
      if(Number(sessionStorage.getItem('than_shop_id'))){
        if(Number(sessionStorage.getItem('than_shop_id')) == item.shop_id){
          $('.content ul').eq(index).addClass('thanOrder').siblings().removeClass('thanOrder');
          $('.content ul .pk_img').eq(index).show();
        }
      }
      //console.log(Number(sessionStorage.getItem('than_shop_id')))
      return(
        <ul key = {index} data-type={item.shop_id} data-index = {index} onClick={self.clickShop}>
          <li className="pk_img"><img src="static/lzsale/src/img/pk.png" /></li>
          <li data-index = {index} data-type={item.shop_id} style={{marginLeft:'22px'}}>{item.rowid}</li>
          <li data-index = {index} data-type={item.shop_id}>{item.shop_code}</li>
          <li data-index = {index} data-type={item.shop_id}>{item.sale_amount}</li>
          <li data-index = {index} data-type={item.shop_id}>{item.huan_amount}</li>
          <li data-index = {index} data-type={item.shop_id}>{item.tong_amount}</li>
        </ul>
      )
    })
    
    var Brand = brand_list.map((item,index) => {
      return(
        <ul key = {index} data-id={item.id} data-name = {item.brand} onClick={self.clickBrand}>
          <li data-name = {item.brand} data-id={item.id}>{item.brand}</li>
          <li data-name = {item.brand} data-id={item.id} className={item.id==this.state.brand_id?'':'hidden'}><img data-name = {item.brand} data-id={item.id} src="static/lzsale/src/img/radio-on.png" /></li>
          <li data-name = {item.brand} data-id={item.id} className={item.id!=this.state.brand_id?'':'hidden'}><img data-name = {item.brand} data-id={item.id} src="static/lzsale/src/img/radio-off.png" /></li>
        </ul>
      )
    })
    
    $('.background').click(function(){
      // self.setState({
      //   brand_name: sessionStorage.getItem('brand_name')
      // })
      if(!!sessionStorage.getItem('brand_name')){
        $('.brand_name').text(sessionStorage.getItem('brand_name'))
      }
      
      $('.background').hide();
      $(".block_right").hide();
      $('.brand_list_right').hide();
      $('body').css("overflow","inherit");
      $('.help-modeWeek-one').hide();
      $('.help-modeWeek-two').hide();
      $('.help-modeWeek-three').hide();
      $('.help-modeWeek-four').hide();
      $('.help-modeWeek-five').hide();
    })

    $('.shop_a_red').hide();
    $('.shop_a_green').hide();
    $('.shop_b_red').hide();
    $('.shop_b_green').hide();
    $('.shop_a_red_tong').hide();
    $('.shop_a_green_tong').hide();
    $('.shop_b_red_tong').hide();
    $('.shop_b_green_tong').hide();

    // if(typeof search_shopdata=='undefined'){
    //   return(
    //     <div></div>
    //   )
    // }

    if(typeof search_shopdata!='undefined'){
      if(search_shopdata.sale_amount == search_thanshop.sale_amount){
        $('.shop_a_color').css({color:'#666'})
        $('.shop_b_color').css({color:'#666'})
      }else if(search_shopdata.sale_amount > search_thanshop.sale_amount){
        $('.shop_a_color').css({color:'#339966'})
        $('.shop_b_color').css({color:'#DA1E24'})
      }else{
        $('.shop_a_color').css({color:'#DA1E24'})
        $('.shop_b_color').css({color:'#339966'})
      }
      
      // 本店 销售金额环比
      if(search_shopdata.huan_ratio > '0'){
        $('.shop_a_red').hide();
        $('.shop_a_green').show();
      }else if(search_shopdata.huan_ratio == '--'){
        $('.shop_a_red').hide();
        $('.shop_a_green').hide();
      }else if(search_shopdata.huan_ratio < '0'){
        $('.shop_a_red').show();
        $('.shop_a_green').hide();
      }
      // 对比店 销售金额环比
      if(search_thanshop.huan_ratio > '0'){
        $('.shop_b_red').hide();
        $('.shop_b_green').show();
      }else if(search_thanshop.huan_ratio == '--'){
        $('.shop_b_green').hide();
        $('.shop_b_red').hide();
      }else if(search_thanshop.huan_ratio < '0'){
        $('.shop_b_green').hide();
        $('.shop_b_red').show();
      }
      // 本店 销售金额同比
      if(search_shopdata.tong_ratio  > '0'){
        $('.shop_a_red_tong').hide();
        $('.shop_a_green_tong').show();
      }else if(search_shopdata.tong_ratio  == '--'){
        $('.shop_a_red_tong').hide();
        $('.shop_a_green_tong').hide();
      }else if(search_shopdata.tong_ratio  < '0'){
        $('.shop_a_red_tong').show();
        $('.shop_a_green_tong').hide();
      }
      // 对比店 销售金额同比
      if(search_thanshop.tong_ratio > '0'){
        $('.shop_b_red_tong').hide();
        $('.shop_b_green_tong').show();
      }else if(search_thanshop.tong_ratio == '--'){
        $('.shop_b_green_tong').hide();
        $('.shop_b_red_tong').hide();
      }else if(search_thanshop.tong_ratio < '0'){
        $('.shop_b_green_tong').hide();
        $('.shop_b_red_tong').show();
      }
      
      // 本店 销售数量环比
      if(search_shopdata.huan_count_ratio > '0'){
        $('.shop_a_red_count').hide();
        $('.shop_a_green_count').show();
      }else if(search_shopdata.huan_count_ratio == '--'){
        $('.shop_a_red_count').hide();
        $('.shop_a_green_count').hide();
      }else if(search_shopdata.huan_count_ratio < '0'){
        $('.shop_a_red_count').show();
        $('.shop_a_green_count').hide();
      }
      // 对比店 销售数量环比
      if(search_thanshop.huan_count_ratio > '0'){
        $('.shop_b_red_count').hide();
        $('.shop_b_green_count').show();
      }else if(search_thanshop.huan_count_ratio == '--'){
        $('.shop_b_green_count').hide();
        $('.shop_b_red_count').hide();
      }else if(search_thanshop.huan_count_ratio < '0'){
        $('.shop_b_green_count').hide();
        $('.shop_b_red_count').show();
      }
      // 本店 销售数量同比
      if(search_shopdata.tong_count_ratio  > '0'){
        $('.shop_a_red_count_tong').hide();
        $('.shop_a_green_count_tong').show();
      }else if(search_shopdata.tong_count_ratio  == '--'){
        $('.shop_a_red_count_tong').hide();
        $('.shop_a_green_count_tong').hide();
      }else if(search_shopdata.tong_count_ratio  < '0'){
        $('.shop_a_red_count_tong').show();
        $('.shop_a_green_count_tong').hide();
      }
      // 对比店 销售数量同比
      if(search_thanshop.tong_count_ratio > '0'){
        $('.shop_b_red_count_tong').hide();
        $('.shop_b_green_count_tong').show();
      }else if(search_thanshop.tong_count_ratio == '--'){
        $('.shop_b_green_count_tong').hide();
        $('.shop_b_red_count_tong').hide();
      }else if(search_thanshop.tong_count_ratio < '0'){
        $('.shop_b_green_count_tong').hide();
        $('.shop_b_red_count_tong').show();
      }

      if(search_shopdata.rowid == search_thanshop.rowid){
        $('.store .than_a').show();
        $('.store .than_a_2').hide();
        $('.store .than_b').show();
        $('.store .than_b_2').hide();
      }else if(search_shopdata.rowid > search_thanshop.rowid){
        $('.store .than_a').hide();
        $('.store .than_a_2').show();
        $('.store .than_b').show();
        $('.store .than_b_2').hide();
      }else{
        $('.store .than_a').show();
        $('.store .than_a_2').hide();
        $('.store .than_b').hide();
        $('.store .than_b_2').show();
      }
    }

    if(lang == 'en'){
      if(!!new_shopactive){
        if(!!new_shopactive.now_promotion_data_in || !!new_shopactive.now_promotion_data_out){
          if(new_shopactive.now_promotion_data_in.length == 0 || new_shopactive.now_promotion_data_out.length == 0){
            $('.hasdata.week_hasdata1').hide();
            $('.nodata.week_img1.en').show();
          }else{
            $('.nodata.week_img1.en').hide();
            $('.hasdata.week_hasdata1').show();
          }
        }

        if(!!new_shopactive.last_promotion_data_in || !!new_shopactive.last_promotion_data_out){
          if(new_shopactive.last_promotion_data_in.length == 0 || new_shopactive.last_promotion_data_out.length == 0){
            $('.hasdata.week_hasdata2').hide();
            $('.nodata2.week_img2.en').show();
          }else{
            $('.nodata2.week_img2.en').hide();
            $('.hasdata.week_hasdata2').show();
          }
        }
      }
    }else if(lang == 'zh-Hant'){
      if(!!new_shopactive){
        if(!!new_shopactive.now_promotion_data_in || !!new_shopactive.now_promotion_data_out){
          if(new_shopactive.now_promotion_data_in.length == 0 || new_shopactive.now_promotion_data_out.length == 0){
            $('.hasdata.week_hasdata1').hide();
            $('.nodata.week_img1.zh-Hant').show();
          }else{
            $('.nodata.week_img1.zh-Hant').hide();
            $('.hasdata.week_hasdata1').show();
          }
        }

        if(!!new_shopactive.last_promotion_data_in || !!new_shopactive.last_promotion_data_out){
          if(new_shopactive.last_promotion_data_in.length == 0 || new_shopactive.last_promotion_data_out.length == 0){
            $('.hasdata.week_hasdata2').hide();
            $('.nodata2.week_img2.zh-Hant').show();
          }else{
            $('.nodata2.week_img2.zh-Hant').hide();
            $('.hasdata.week_hasdata2').show();
          }
        }
      }
    }else{
      if(!!new_shopactive){
        if(!!new_shopactive.now_promotion_data_in || !!new_shopactive.now_promotion_data_out){
          if(new_shopactive.now_promotion_data_in.length == 0 || new_shopactive.now_promotion_data_out.length == 0){
            $('.hasdata.week_hasdata1').hide();
            $('.nodata.week_img1.cn').show();
          }else{
            $('.nodata.week_img1.cn').hide();
            $('.hasdata.week_hasdata1').show();
          }
        }

        if(!!new_shopactive.last_promotion_data_in || !!new_shopactive.last_promotion_data_out){
          if(new_shopactive.last_promotion_data_in.length == 0 || new_shopactive.last_promotion_data_out.length == 0){
            $('.hasdata.week_hasdata2').hide();
            $('.nodata2.week_img2.cn').show();
          }else{
            $('.nodata2.week_img2.cn').hide();
            $('.hasdata.week_hasdata2').show();
          }
        }
      }
    }

    // if(lang == 'en'){
    //   $('.orderBy .order_en').show();
    //   $('.orderBy .order_cn').hide();
    // }else{
    //   $('.orderBy .order_en').hide();
    //   $('.orderBy .order_cn').show();
    // }
    
    return(
      <div id = 'big_block'>
        <div className="circle_loading5">
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

        <div className="block_right" style={{zIndex:'30'}}>
          <p>{lang_obj[lang]['store_sale_rank']}
            <span className="help" data-set="five" onClick={self.clickHelp}>
              <img data-set="five" src="static/lzsale/src/img/help.png" alt="" />
            </span>
          </p>
          <ul className = "bg">
            <li>{lang_obj[lang]['rank']}</li>
            <li>{lang_obj[lang]['store_code']}</li>
            <li>{lang_obj[lang]['this_stage_sale']}</li>
            <li>{lang_obj[lang]['cir_sale']}</li>
            <li>{lang_obj[lang]['same_sale']}</li>
          </ul>
          
          {OrderTitle}
          <p style={{borderBottom:'1px solid #eaeaea',margin:'0 15px'}}>{lang_obj[lang]['choose_store_to_pk']}</p>
          <div className="content" style={{height:'62%'}}>
            {Order}
          </div>
          <div className="message" onClick={self.message}>加载失败,点击请重试</div>
          <div className ="footer">
            <button className="pk" onClick ={self.thanShop}>{lang_obj[lang]['pk']}</button>
            <button className="close" onClick={self.close}>{lang_obj[lang]['cancel']}</button>
          </div>

          <div className="circle_loading_a">
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
        <div className="brand_list_right" style={{zIndex:'30'}}>
          <ul>
            <li onClick={self.clickCancel}><img style={{width: '18px'}} src="static/lzsale/src/img/left.png" alt=""/></li>
            <li>{lang_obj[lang]['brand']}</li>
            <li onClick={self.clickBrandConfirm} style={{color:'#1296DB'}}>{lang_obj[lang]['confirm']}</li>
          </ul>
          <ul>
            <li>{lang_obj[lang]['please_select_brand']}</li>
          </ul>
          {Brand}
        </div>
        <Row type = "flex" className = "content_1 BG">
          <Col span = {18} className="tab tab3" style={{width:"25%",display: 'flex',justifyContent: 'flex-start',alignItems: 'center'}}>
            <label htmlFor="" style={{margin:'0 15px'}}>{lang_obj[lang]['brand']}</label>
            <div onClick={self.brand_show} style={{top:'3%',border: '1px solid #748292',background: '#fff',borderRadius: '4px',height: '36px',lineHeight: '36px', minWidth:"170px",paddingLeft:'10px',paddingRight:'20px',position:'relative'}}>
              <span className="brand_name">{this.state.brand_name}</span> 
              <img src ="static/lzsale/src/img/select.png" style={{width: '10px',position: 'absolute',right: '7px',top: '8px'}}/>
            </div>
          </Col>
          <Col span = {18} className="tab tab3" style={{width:"75%"}}>
            <ul className="input_date">
              <li style={{top:'8%', padding:'0'}}>{lang_obj[lang]['cycle']}</li>
              <li className="jiantou" onClick={self.handleLeft} data-type={start_date}><img data-type={start_date} src ="static/lzsale/src/img/left.png"/></li>
              <li style={{top:'8%'}}><span style={{marginRight:'10px'}}>{start_date}</span>{lang_obj[lang]['to']}<span style={{marginLeft:'10px'}}>{end_date}</span></li>
              <li className="jiantou hide" style={{left:'-4%'}} onClick={self.handleRight} data-type = {end_date}><img data-type = {end_date} src ="static/lzsale/src/img/right.png"/></li>
              <li className="jiantou show" style={{left:'-4%'}}><img src ="static/lzsale/src/img/right_hui.png"/></li>
              <li style={{left:'-4%',padding:'0 10px'}}>
                {/*<DatePicker defaultValue={moment(start_date, format)}  onChange={self.onStartChange} /><span style={{margin:'0 10px'}}>-</span><DatePicker value={moment(end_date, format)}  onChange={self.onEndChange} />*/}

                {/*<input type='date' value = {start_date} onChange={self.onStartChange}/>
                <img style={{left:'10%'}} src="static/lzsale/src/img/date.png" />*/}
              </li>
              <li className="search" onClick = {self.search}>{lang_obj[lang]['search']}</li>
            </ul>
          </Col>
        </Row>
        <Row type = "flex" className = "content_1 BG">
          <Col  span = {6} className="header" style={{width:"100%"}}>
            <span className="blue_block"></span>{lang_obj[lang]['other_pk']}
            <span className="help" data-set="one" onClick={self.clickHelp}>
              <img data-set="one" src="static/lzsale/src/img/help.png" alt="" />
            </span>
          </Col>
          
          {/* 左 */}
          <Col span={12} className = "store">
            {/* 店名 */}
            <div style={{borderBottom: '1px solid #E5E5E5'}}>
              <p style={{height:'50px', 'lineHeight': '50px',marginBottom: '0'}} className="shop_name">
                <span style={{fontSize: '16px', marginRight: '15px'}} >{lang_obj[lang]['current_shop']}</span> 
                {search_shopdata.shop_code}&nbsp;&nbsp; {search_shopdata.shop_name}</p>
            </div>
            {/* 排名，金额，数量 */}
            <div style={{width:'100%',marginTop: '12px', display: 'flex',textAlign: 'center',fontSize: '16px'}}>
              <div style={{width:'20%'}}>
                <div style={{fontSize:'22px',height:'40px'}}>{search_shopdata.rowid}</div>
                <div className="than_a">{lang_obj[lang]['champion']}<img src="static/lzsale/src/img/champion.png"/></div>
                <div className="than_a_2">{lang_obj[lang]['rank']}</div>
              </div>
              <div style={{width:'60%'}}>
                <div className="numbers shop_a_color" style={{height:'40px',fontSize:(search_shopdata.sale_amount+'').split('.')[0].length>11?'24px':'26px'}}>{Number(search_shopdata.sale_amount).toLocaleString()}</div>
                <div>{lang_obj[lang]['sale_money_j']}</div>
              </div>
              <div style={{width:'20%'}}>
                <div style={{height:'40px', color: '#34495E',fontSize: (search_shopdata.sale_amount+'').split('.')[0].length>11?'24px':'26px'}}>{Number(search_shopdata.sale_count).toLocaleString()}</div>
                <div>{lang_obj[lang]['sale_quantity']}</div>
              </div>
            </div>
            {/* 环比，同比 */}
            <div style={{width:'100%',display: 'flex',textAlign: 'center',fontSize: '16px',alignItems: 'baseline',marginTop: '30px'}}>
              <div style={{width:'20%'}}>
                <div className="huan_tong">{lang_obj[lang]['cir_compare']}</div>
                <div className="huan_tong" style={{marginTop: '8px'}}>{lang_obj[lang]['same_compare']} </div>
              </div>
              <div style={{width:'60%'}} className="huan_tong_style">
                {/* 销售金额环比，同比 */}
                <div>
                  <img className="shop_a_green" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_a_red" src="static/lzsale/src/img/red.png"/>
                  <span>{search_shopdata.huan_ratio}</span> 
                </div>
                <div style={{marginTop: '8px'}}>
                  <img className="shop_a_green_tong" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_a_red_tong" src="static/lzsale/src/img/red.png"/>
                  {search_shopdata.tong_ratio}
                </div>
              </div>
              <div style={{width:'20%'}} className="huan_tong_style">
                {/* 销售数量环比，同比 */}
                <div>
                  <img className="shop_a_green_count" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_a_red_count" src="static/lzsale/src/img/red.png"/>
                  {search_shopdata.huan_count_ratio}
                </div>
                <div style={{marginTop: '8px'}}>
                  <img className="shop_a_green_count_tong" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_a_red_count_tong" src="static/lzsale/src/img/red.png"/>
                  {search_shopdata.tong_count_ratio}
                </div>
              </div>
            </div>
          </Col>

          {/* 右 */}
          <Col span={12} className = "store">
            {/* 店名 */}
            <div className="shop_name_div" style={{borderBottom: '1px solid #E5E5E5'}}>
              <p style={{height:'50px', 'lineHeight': '50px',marginBottom: '0'}} className="shop_name">
                <span style={{fontSize: '16px', marginRight: '15px'}} >{lang_obj[lang]['than_shop']}</span> 
                {search_thanshop.shop_code}&nbsp;&nbsp; {search_thanshop.shop_name}</p>
              <div onClick={self.orderBy} style={{width:'22%',color: '#1296DB',textAlign: 'right'}}>
                <img className="order_en" style={{width:'22px',marginRight:'10px'}} src="static/lzsale/src/img/exchange.png"/>
                <span>{lang_obj[lang]['exchange']}</span>
              </div>
            </div>
            {/* 排名，金额，数量 */}
            <div style={{width:'100%',marginTop: '12px', display: 'flex',textAlign: 'center',fontSize: '16px'}}>
              <div style={{width:'20%'}}>
                <div style={{fontSize:'22px',height:'40px'}}>{search_thanshop.rowid}</div>
                <div className="than_b">{lang_obj[lang]['champion']}<img src="static/lzsale/src/img/champion.png"/></div>
                <div className="than_b_2">{lang_obj[lang]['rank']}</div>
              </div>
              <div style={{width:'60%'}}>
                <div className="numbers shop_b_color" style={{height:'40px',fontSize: (search_thanshop.sale_amount+'').split('.')[0].length>11?'24px':'26px'}}>{Number(search_thanshop.sale_amount).toLocaleString()}</div>
                <div>{lang_obj[lang]['sale_money_j']}</div>
              </div>
              <div style={{width:'20%'}}>
                <div style={{height:'40px',color: '#34495E',fontSize: (search_thanshop.sale_amount+'').split('.')[0].length>11?'24px':'26px'}}>{Number(search_thanshop.sale_count).toLocaleString()}</div>
                <div>{lang_obj[lang]['sale_quantity']}</div>
              </div>
              {/* <div className="circle_loading1">
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
              </div> */}
            </div>
            {/* 环比，同比 */}
            <div style={{width:'100%',display: 'flex',textAlign: 'center',fontSize: '16px',alignItems: 'baseline',marginTop: '30px'}}>
              <div style={{width:'20%'}}>
                <div className="huan_tong">{lang_obj[lang]['cir_compare']}</div>
                <div className="huan_tong" style={{marginTop: '8px'}}>{lang_obj[lang]['same_compare']} </div>
              </div>
              {/* 对比店 销售金额环比，同比 */}
              <div style={{width:'60%'}} className="huan_tong_style">
                <div>
                  <img className="shop_b_green" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_b_red" src="static/lzsale/src/img/red.png"/>
                  {search_thanshop.huan_ratio}
                </div>
                <div style={{marginTop: '8px'}}>
                  <img className="shop_b_green_tong" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_b_red_tong" src="static/lzsale/src/img/red.png"/>
                  {search_thanshop.tong_ratio}
                </div>
              </div>
              <div style={{width:'20%'}} className="huan_tong_style">
                <div>
                  <img className="shop_b_green_count" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_b_red_count" src="static/lzsale/src/img/red.png"/>
                  {search_thanshop.huan_count_ratio}
                </div>
                <div style={{marginTop: '8px'}}>
                  <img className="shop_b_green_count_tong" src="static/lzsale/src/img/green.png"/>
                  <img className="shop_b_red_count_tong" src="static/lzsale/src/img/red.png"/>
                  {search_thanshop.tong_count_ratio}</div>
              </div>
            </div>
            {/* <p style={{width:'80%',height:'55px'}}>{lang_obj[lang]['store_b']} {search_thanshop.shop_code}{search_thanshop.shop_name}</p>
            <p className="number"><img className="than_b" src="static/lzsale/src/img/order.png" />NO.{search_thanshop.rowid}</p>
            <p className="numbers shop_b_color"><b className="b_icon_left "></b>{search_thanshop.sale_amount}</p>
            <p>{lang_obj[lang]['sale_money_j']}</p>
            <div style={{padding:'10px'}}><span className="circle_ran">{lang_obj[lang]['cir_compare']} 
              <img className="shop_b_green" src="static/lzsale/src/img/green.png"/><img className="shop_b_red" src="static/lzsale/src/img/red.png"/>
              <span style={{fontSize:'25px',marginLeft:'25px'}}>{search_thanshop.huan_ratio}</span></span><span>{lang_obj[lang]['same_compare']} 
                <img className="shop_b_green_tong" src="static/lzsale/src/img/green.png"/><img className="shop_b_red_tong" src="static/lzsale/src/img/red.png"/>
                <span style={{fontSize:'25px',marginLeft:'25px'}}>{search_thanshop.tong_ratio}</span></span></div>
            <div className="orderBy" onClick={self.orderBy}>
              <img className="order_cn" src="static/lzsale/src/img/btn.png"/>
              <img className="order_en" src="static/lzsale/src/img/btn_en.png"/>
            </div> */}
          </Col>
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
          <Col  span = {24} className="header">
            <span className="blue_block"></span>{lang_obj[lang]['cash_analysis']}
            <span className="help" data-set="two" onClick={self.clickHelp}>
              <img data-set="two" src="static/lzsale/src/img/help.png" alt="" />
            </span>
          </Col>
          <ShopBarChart series={new_shopbasket} seriesValue={max_min}/>

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
          <Col  span = {24} className="header">
            <span className="blue_block"></span>{lang_obj[lang]['activity_analysis']}
            <span className="help" data-set="three" onClick={self.clickHelp}>
              <img data-set="three" src="static/lzsale/src/img/help.png" alt="" />
            </span>
          </Col>
          <Col span={12} style={{borderRight:'1px solid #eaeaea',padding:'10px 10px 15px 10px',height:'450px'}}>
            <div className="hasdata week_hasdata1">
              <BubbleChartWeek series={new_shopactive}/>
            </div>
            <div className="nodata week_img1 cn"><img src="static/lzsale/src/img/nodata.png" /></div>
            <div className="nodata week_img1 en"><img src="static/lzsale/src/img/nodata_img.png" /></div>
            <div className="nodata week_img1 zh-Hant"><img src="static/lzsale/src/img/nodata_zh_Hant.png" /></div>
            <p  className="week_p" style={{textAlign:'center'}}>{lang_obj[lang]['this_week']} {start_date} {lang_obj[lang]['to']} {end_date}</p>
          </Col>
          <Col span={12} style={{padding:'10px 10px 15px 10px',height:'450px'}}>
            <div className="hasdata week_hasdata2">
              <PieChart series={new_shopactive} />
            </div>
            <div className="nodata2 week_img2 cn"><img src="static/lzsale/src/img/nodata.png" /></div>
            <div className="nodata2 week_img2 en"><img src="static/lzsale/src/img/nodata_img.png" /></div>
            <div className="nodata2 week_img2 zh-Hant"><img src="static/lzsale/src/img/nodata_zh_Hant.png" /></div>
            <p className="week_p" style={{textAlign:'center'}}>{lang_obj[lang]['last_stage']} {new_shopactive.start_date} {lang_obj[lang]['to']} {new_shopactive.end_date}</p>
          </Col>

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
        <Row type = "flex" className = "content_1 content_4 BG">
          <Col  span = {12} className="header"><span className="blue_block"></span>{lang_obj[lang]['product_sale_rank']}
            <span className="help" data-set="four" onClick={self.clickHelp}>
              <img data-set="four" src="static/lzsale/src/img/help.png" alt="" />
            </span>
          </Col>
          <Col span={12} className = "tab">
            <ul onClick = {self.selectTab}>
              <li data-type = '0' className="active" style={{borderTopLeftRadius: '4px',borderBottomLeftRadius: '4px'}}>{lang_obj[lang]['positive_product']}</li>
              <li data-type = '1' style={{borderTopRightRadius: '4px',borderBottomRightRadius: '4px'}}>{lang_obj[lang]['activity_product']}</li>
            </ul>
            <div className="new_product"></div>

          </Col>
          <Col span={12} className="shop_order">
            <p style={{paddingTop:'20px'}}>{lang_obj[lang]['big_category_rank']}</p>
            <div className="category_hasdata">
              <ul>
                {Category1}
                {Category2}
                {Category3}
                {Category4}
                {Category5}
              </ul>
            </div>
            <div className="category_nodata cn">
              <img src="static/lzsale/src/img/nodata.png" />
            </div>
            <div className="category_nodata en">
              <img src="static/lzsale/src/img/nodata_img.png" />
            </div>
            <div className="category_nodata zh-Hant">
              <img src="static/lzsale/src/img/nodata_zh_Hant.png" />
            </div>
          </Col>
          <Col span={12} className="shop_order">
            <p style={{paddingTop:'20px'}}>{lang_obj[lang]['single_rank']}</p>
            <div className="product_hasdata">
              <ul>
                {Product1}
                {Product2}
                {Product3}
                {Product4}
                {Product5}
               </ul>
            </div>
            <div className="product_nodata cn">
              <img src="static/lzsale/src/img/nodata.png" />
            </div>
            <div className="product_nodata en">
              <img src="static/lzsale/src/img/nodata_img.png" />
            </div>
            <div className="product_nodata zh-Hant">
              <img src="static/lzsale/src/img/nodata_zh_Hant.png" />
            </div>
          </Col>

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
        </Row>
      </div> 
    )
  }
})


module.exports = Week