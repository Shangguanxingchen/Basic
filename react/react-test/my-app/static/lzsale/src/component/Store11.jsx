import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col} from 'antd';
import { DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';

var Reflux = require('reflux');
var $ = require('jquery');
import lang_obj from '../lang/language.js';
import DayBarChart from './DayBarChart.jsx';
import BarChart from './BarChart.jsx';
import AvageChart from './AvageChart.jsx';
import PieChart from './PieChartStore.jsx'
import PieCharts from './PieCharts.jsx'
import StoreAction from '../actions/StoreAction.jsx';
import Store from '../stores/Store11.jsx';

var Header = React.createClass({
  mixins:[Reflux.listenTo(Store,'onStatusChange')],
  getInitialState(){
    var language = lang_obj.get_lang('lang');
    // if( (typeof language == 'undefined') || (language != 'en'&&language != 'zh-Hant') ){
    //   language = 'cn'
    // }
    return{
      lang: language,
      category:[],//库存大类
      season:[],//季节大类
      // saletop:[],//sale_top10
      max_min:{},
      superior:[],//日销售与日库存比较
      properties:[],
      max_mins:{},

      storeAll:{},
      
    }
  },
  onStatusChange(data){

    var one = sessionStorage.getItem('store_one'),
        two = sessionStorage.getItem('store_two'),
        three = sessionStorage.getItem('store_three');
      if(one == '1' && two == '1' && three == '1'){
        $('.circle_loading1').hide();
        $('.circle_loading2').hide();
        $('.circle_loading3').hide();
      }
    if(data){
      this.setState({
        category:data.category,
        season:data.season,
        // saletop:data.saletop,
        max_min:data.max_min,
        superior:data.superior,
        properties:data.properties,
        max_mins:data.max_mins,
        
        storeAll:data.storeAll,
        
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
    $('.circle_loading1').show();
    $('.circle_loading2').show();
    $('.circle_loading3').show();
    sessionStorage.setItem('store_one','0');
    sessionStorage.setItem('store_two','0');
    sessionStorage.setItem('store_three','0');
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
    var year_month = Year + '-' + Month; 
    var year_month_day = Year + '-' + Month + '-' + Day ;
    var shop_id = this.getShopId('shop_id=');

    if(!!Four.category){
      this.setState({
        category:Four.category,
      });
      sessionStorage.setItem('store_one','1');
    }else{
      StoreAction.storeCategory({shop_id:shop_id});
    }

    if(!!Four.season){
      this.setState({
        season:Four.season,
      });
      sessionStorage.setItem('store_one','1');
    }else{
      StoreAction.storeSeason({shop_id:shop_id});
    }

    if(!!Four.top){
      this.setState({
        // saletop:Four.top.data,
        max_min:Four.top.max_min,
        properties:Four.top.properties,
      });
      sessionStorage.setItem('store_two','1');
    }else{
      StoreAction.storeTop({shop_id:shop_id});
    }

    if(!!Four.saleday){
      this.setState({
        superior:Four.saleday.data,
        max_mins:Four.saleday.max_min,
      });
      sessionStorage.setItem('store_three','1');
    }else{
      StoreAction.storeSaleDay({shop_id:shop_id});
    }
    this.setState({
      year:Year,
      year_month : year_month, //年月
      year_month_day : year_month_day, //年月日
    })
  },
  componentDidMount(){
    var {category,season} = this.state; 
    var one = sessionStorage.getItem('store_one'),
        two = sessionStorage.getItem('store_two'),
        three = sessionStorage.getItem('store_three');

    if(one == '1' && two == '1' && three == '1'){
      $('.circle_loading1').hide();
      $('.circle_loading2').hide();
      $('.circle_loading3').hide();
    }

  },
  selectTab(e){
    $(e.target).addClass('active').siblings().removeClass('active');
    sessionStorage.setItem('selectTab',e.target.dataset.type);
  },
  clickHelp(e){
    $('.background').show();
    $('body').css('position','fixed');
    if(e.target.dataset.set == 'one'){
      $('.help-modeStore-one').show();
    }else if(e.target.dataset.set == 'two'){
      $('.help-modeStore-two').show();
    }else if(e.target.dataset.set == 'three'){
      $('.help-modeStore-three').show();
    }else if(e.target.dataset.set == 'four'){
      $('.help-modeStore-four').show();
    }else if(e.target.dataset.set == 'five'){
      $('.help-modeStore-five').show();
    }
  },
  render(){
    var self = this;
    var {year_month_day,year_month,category,season,superior,properties,month,storeAll,max_min,max_mins, lang} = this.state;
    var StoreData = Array.isArray(properties)? properties.map((item,index) =>{
      if(item.size != '' && item.size != null){
        $('.item_size').eq(index).show();
      }
      return(
        <div key = {index}>
          <li>{index+1}.<span style={{marginLeft:'10px'}}>{item.code}</span>
            <p>{item.name}</p>
            <p>{item.price}<span>;</span>{item.size}<span className="item_size">;</span>{item.color}</p>
          </li>
        </div>
      )
    }):<div>{lang_obj[lang]['tmp_no_data']}</div>

    $('.background').click(function(){
      $('.background').hide();
      $('body').css('position','inherit');
      $('.help-modeStore-one').hide();
      $('.help-modeStore-two').hide();
      $('.help-modeStore-three').hide();
      $('.help-modeStore-four').hide();
    })

    if(lang == 'en'){
      if(category.length == 0){
        $('.store_block1 .store_hasdata1').hide();
        $('.store_block1 .store_img1.en').show();
      }else{
        $('.store_block1 .store_hasdata1').show();
        $('.store_block1 .store_img1.en').hide();
      }
      if(season.length == 0){
        $('.store_block1 .store_hasdata2').hide();
        $('.store_block1 .store_img2.en').show();
      }else{
        $('.store_block1 .store_hasdata2').show();
        $('.store_block1 .store_img2.en').hide();
      }
      // if(saletop.length == 0){
      //   $('.store_data').hide();
      //   $('.store_img.en').show();
      //   $('.store_img.cn').hide();
      //   $('.store_img.zh-Hant').hide();
      // }else{
      //   $('.store_data').show();
      //   $('.store_img.en').hide();
      //   $('.store_img.cn').hide();
      //   $('.store_img.zh-Hant').hide();
      // }
    }else if(lang == 'zh-Hant'){
      if(category.length == 0){
        $('.store_block1 .store_hasdata1').hide();
        $('.store_block1 .store_img1.zh-Hant').show();
      }else{
        $('.store_block1 .store_hasdata1').show();
        $('.store_block1 .store_img1.zh-Hant').hide();
      }
      if(season.length == 0){
        $('.store_block1 .store_hasdata2').hide();
        $('.store_block1 .store_img2.zh-Hant').show();
      }else{
        $('.store_block1 .store_hasdata2').show();
        $('.store_block1 .store_img2.zh-Hant').hide();
      }
      // if(saletop.length == 0){
      //   $('.store_data').hide();
      //   $('.store_img.zh-Hant').show();
      //   $('.store_img.en').hide();
      //   $('.store_img.cn').hide();
      // }else{
      //   $('.store_data').show();
      //   $('.store_img.en').hide();
      //   $('.store_img.cn').hide();
      //   $('.store_img.zh-Hant').hide();
      // }
    }else{
      if(category.length == 0){
        $('.store_block1 .store_hasdata1').hide();
        $('.store_block1 .store_img1.cn').show();
      }else{
        $('.store_block1 .store_hasdata1').show();
        $('.store_block1 .store_img1.cn').hide();
      }
      if(season.length == 0){
        $('.store_block1 .store_hasdata2').hide();
        $('.store_block1 .store_img2.cn').show();
      }else{
        $('.store_block1 .store_hasdata2').show();
        $('.store_block1 .store_img2.cn').hide();
      }

      // if(saletop.length == 0){
      //   $('.store_data').hide();
      //   $('.store_img.cn').show();
      // }else{
      //   $('.store_data').show();
      //   $('.store_img.cn').hide();
      // }
    }

    
    return(
      <div>
        <Row type = "flex" className = "content_1 BG">
          <Col  span = {12} className="header pie" style={{borderBottom:'0',width:'50%',borderRight:"1px solid #eaeaea"}}>
          <div style={{borderBottom:'1px solid #eaeaea',padding:'10px 0'}}>  
            <span className="blue_block"></span>{lang_obj[lang]['kucun_big_category_spread']}<span className="marginLeft">{year_month}</span>
            <span className="help" data-set="one" onClick={self.clickHelp}><img data-set="one" src="static/lzsale/src/img/help.png" alt="" /></span>
          </div>
            <div className="store_block1">
              <div className="store_hasdata1">
                <PieChart series={category} />
              </div>
              <div className="store_three_img store_img1 cn"><img src="static/lzsale/src/img/nodata.png" /></div>
              <div className="store_three_img store_img1 en"><img src="static/lzsale/src/img/nodata_img.png" /></div>
              <div className="store_three_img store_img1 zh-Hant"><img src="static/lzsale/src/img/nodata_zh_Hant.png" /></div>
            </div>
          </Col>
            
          <Col span = {12} className="header pie store_hasdata2" style={{borderBottom:'0',width:'50%'}}>
            <div style={{borderBottom:'1px solid #eaeaea',padding:'10px 0'}}>
              <span className="blue_block"></span>{lang_obj[lang]['season_spread']}<span className="marginLeft">{year_month}</span>
              <span className="help" data-set="two" onClick={self.clickHelp}><img data-set="two" src="static/lzsale/src/img/help.png" alt="" /></span>
            </div>
            <div className="store_block1">
              <div className="store_hasdata2">
                <PieCharts series={season} />
              </div>
              <div className="store_three_img store_img2 cn"><img src="static/lzsale/src/img/nodata.png" /></div>
              <div className="store_three_img store_img2 en"><img src="static/lzsale/src/img/nodata_img.png" /></div>
              <div className="store_three_img store_img2 zh-Hant"><img src="static/lzsale/src/img/nodata_zh_Hant.png" /></div>
            </div>
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
            <span className="blue_block"></span>{lang_obj[lang]['sale_top10_product_and_product_analysis']}<span className="marginLeft">{year_month}</span>
            <span className="help" data-set="three" onClick={self.clickHelp}><img data-set="three" src="static/lzsale/src/img/help.png" alt="" /></span>
          </Col>
          <div className="store_data">
            <div className="store_left">
              <ul>
               {StoreData}
              </ul>
            </div> 
            {/* <BarChart series={saletop} serieValue={max_min}/> */}
          </div>
          <div className="store_img cn" style={{display:'block'}}>
            <img src="static/lzsale/src/img/nodata.png" />
          </div>
          <div className="store_img en">
            <img src="static/lzsale/src/img/nodata_img.png" />
          </div>
          <div className="store_img zh-Hant">
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
        {/* <Row type = "flex" className = "content_1 content_3 BG">
          <Col  span = {24} className="header">
            <span className="blue_block"></span>{lang_obj[lang]['store_day_sale_and_day_kucun_analysis']}<span className="marginLeft">{year_month}</span>
            <span className="help" data-set="four" onClick={self.clickHelp}><img data-set="four" src="static/lzsale/src/img/help.png" alt="" /></span>
          </Col>
          <DayBarChart series={superior} serieValue = {max_mins}/>

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
        </Row> */}
        {/*<Row type = "flex" className = "content_1 content_3 BG">
          <Col  span = {24} className="header">
            <span className="blue_block"></span>同办事处门店平均销量与平均库存分析<span className="marginLeft">{year_month}</span>
            <span className="help" data-set="five" onClick={self.clickHelp}><img data-set="five" src="static/lzsale/src/img/help.png" alt="" /></span>
          </Col>
          <AvageChart series={month}/>
        </Row> */}
      </div> 
    )

  }
})

module.exports = Header