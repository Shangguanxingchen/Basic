import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import '../css/index.css';
import $ from 'jquery';
import moment from 'moment';
var Reflux = require('reflux');
var ReceiptsStore = require('../store/ReceiptsStore');
import {Row, Col, DatePicker,Radio, Icon, Table, Select ,Checkbox, Input} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;
var ReceiptsStore = require('../store/ReceiptsStore');
var ReceiptsAction = require('../actions/ReceiptsAction');

module.exports = React.createClass({
  getDefaultProps(){
    return{
      placeholder:{
        product_bar_code:'请输入商品条码',
        bar_code:'请输入条形码'
      },
      // title:标题,h_title:二级标题
      conditionContent:{
        sum_level:{
          title:'汇总级别',
          h_title:'',
          id:'type_code',
          name:'type_name',
        },
        product_kind:{
          title:'商品类型',
          h_title:'',
          id:'type_code',
          name:'type_name'
        },
      },
    }
  },
  getInitialState(){
    return{
      checked: true,
      up:false,
      mask:false,
      loading:false,

      which:'',
      condition:[
        [{
          text:'汇总级别',
          button:'span',
          type:'sum_level'
        },{
          text:'含金额',
          button:'checkbox',
          type:'checkbox'
        },{
          text:'展开筛选',
          button:'a',
          type:'up_down'
        }],
        [{
          text:false,
          placeholder:'请输入商品条码',
          type:'product_bar_code'
        },{
          text:'商品类型',
          type:'product_kind'
        },{
          text:'查询',
          button:'button',//true表示Button元素包裹
          type:'search'
        }]
      ],//筛选条件的文字, type数据
      screen_width:0,  //屏幕宽度
      data:{
        sum_level:{data:[],text:'',value:'no'},
        product_kind:{data:[],text:'',value:'no'}
      },
      table:{
        columns:[],
        dataSource:[],
        footer(){
          return ''
        },
        merge_index:[]
      },
      pagination:{
        pageSize:20,
        total:0,
        showTotal(){
          return ''
        },
        onChange:function(){},
        current:1,
        onShowSizeChange:function(){},
        showSizeChanger:true
      }

    }
  },

  componentWillMount(){
    //获取前一周的日期
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 7);
    var dateArray = []; 
    var dateTemp; 
    var flag = 1; 
    for (var i = 0; i < 7; i++) {
        dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
        dateArray.push(dateTemp);
    }
    let [Year, Month, Day] = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
    Month = String(Month).length == 1 ? ('0' + Month) : Month;
    Day = String(Day).length == 1 ? ('0' + Day) : Day;
    let [date_start, date_end] = [Year + '-' + dateArray[0] + '-' + Day, Year + '-' + Month + '-' + Day];

    if(sessionStorage.getItem('start_2_1')){
      date_start = sessionStorage.getItem('start_2_1')
    }
    if(sessionStorage.getItem('end_2_1')){
      date_end = sessionStorage.getItem('end_2_1')
    }

    this.setState({
      start: date_start,
      end: date_end,
    })
  },
  componentDidMount(){
    $(function(){
      FastClick.attach(document.body);
    });
    // var shop_id = this.getShopId();
    var width = window.screen.width;
    // 获取shop_id user_id
    var shop_id = this.getShopId('shop_id=');
    var user_id = this.getShopId('user_id');
    var limit = this.state.pagination.pageSize;
    var current_page = this.state.pagination.current;
    var shop_ids = [shop_id];
    var table_arg = {
      limit:limit,
      current_page:current_page,
      shop_ids:shop_ids
    }

    this.setState({
      screen_width:width,
    })

  },
  onStartChange(date, string){
    this.state.start = string;
  },
  onEndChange(date, string){
    this.state.end = string;
  },

  render(){
    let [start, end, format] =
            [this.state.start, this.state.end, 'YYYY-MM-DD', this.props.condition, this.state.text]
    return(
      <div>
        <div className={this.state.up ? 'animate_up condition' : 'animate_down animate_downs condition'}>
        <Col span={13}>
          <div className="select_date">
            日期：<DatePicker defaultValue={moment(start, format)} format={format} onChange={self.onStartChange} /> - <DatePicker defaultValue={moment(end, format)} format={format} onChange={self.onEndChange} />
          </div>
        </Col>
          {this.filterCondition(this.state.condition, this.state.up)}
        </div>
        <div className="table_wrap">
          <div className="table">
            {/*<Table scroll={{x:this.state.screen_width}} />*/}
          </div>
        </div>
        <div className={this.state.mask ? 'active modal_condition' : 'modal_condition'}>
            <div className="popup_box"></div>
            <div className="right_box">
              {this.filterContext(this.state.which)}
            </div>
        </div>
      </div>
    )
  },
  //通过url获取shop_id
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

  //处理点击事件, 根据type值区分点击了哪一个按钮
  handleClick(e){
    var self = this;
    var type = e.target.dataset.type;
    console.log(type);
    if(type == 'up_down'){
      this.setState({
        up : !this.state.up
      })
    }else if(type == 'search'){
      console.log('判断选框',this.state.checked);
    }else if(type == 'sure' || type == 'cancel'  ){
      this.setState({
        mask: false
      })
    }else{
      this.setState({
        mask:true,
        which:type
      })
    }
  },
  // select选择器切换选项
  onChanges(value){
    var placeholder = this.props.placeholder;
    var condition = this.state.condition;
    condition[1][0]['placeholder'] = placeholder[value];
    condition[1][0]['type'] = value;
    this.setState({
      condition:condition
    })
  },
  onCheckChange(e){
    var self = this;
    var checked = `${e.target.checked}`;
    this.setState({
      checked:e.target.checked
    })
  },
  // 生成筛选条件元素
  filterCondition(state, up){
    var self = this;
    var className = ['parent', 'common_title', 'button'];
    var element = state.map(function(item,index){
      return <Row key={index} className={index == 0 ? 'up_down' :''}>
        {
          item.map(function(item1,index1){
            if(item1.text){
              if(item1.hasOwnProperty('button')){
                switch (item1.button){
                  case 'span':
                    return <Col span={4} key={index1}>
                      <span className="high_select" data-type={item1.type} onClick={self.handleClick}>{item1.text}</span>
                    </Col>
                    break;
                  case 'checkbox':
                    return <Col span={3} key={index1}>
                      <Checkbox  checked={self.state.checked} data-type={item1.type} onChange={self.onCheckChange}>{item1.text}</Checkbox>
                    </Col>
                    break;
                  case 'a':
                    return <Col span={4} key={index1} style={{textAlign:'right',paddingRight:'20px'}}>
                      <a data-type = {item1.type} onClick={self.handleClick}>{item1.text}<Icon type={up ? 'up' : 'down'}/></a>
                    </Col>
                    break;
                  case 'button':
                    return <Col span={3} key={item1}>
                      <button className={className[2]} data-type={item1.type} onClick={self.handleClick} size='large'>
                        {item1.text}
                      </button>
                    </Col>
                    break;
                }
              }else{
                return <Col span={10} key={index1}>
                  <span className={className[0]}>
                    <span className={className[1]} data-type={item1.type}>{item1.text}</span>
                    <span data-type={item1.type} onClick={self.handleClick}>
                      {self.filterConditionInnerText(item1.type)}
                    </span>
                    <Icon type = 'right'/>
                  </span>
                </Col>
              }
            }else{
              return <Col span={11} key={index1}>
                <Select onChange = {self.onChanges}  defaultValue='product_bar_code' className='select'>
                    <Option value='product_bar_code'>商品码</Option>
                    <Option value='bar_code'>条形码</Option>
                </Select>
                <input type="text" data-type={item1.type} placeholder={item1.placeholder} />
              </Col>
            }
          })
        }

      </Row>
    })
    return element
  },
  
  filterConditionInnerText(type){
    var data = this.state.data;
    if(type == 'range_kucun'){
      return this.state.range_kucun.list[this.state.range_kucun.value].text
    }else{
        // return data[type].text.join(' ')
    }
  },
  //点击筛选条件的元素后,显示对应的内容
  filterContext(which){
    var self = this;
    if(which){
      var conditionContent = this.props.conditionContent[which];
      return <div className="filter_wrap">
        <div className="filter_top">
          {conditionContent.title}
        </div>
        <div className="filter_body">
          <div>{conditionContent.h_title}</div>
          <ul>
            <li>
              <span className="all" data-type={which} data-name={conditionContent.name}></span>(已选)
            </li>
            {this.filterContextBody(which)}
          </ul>
        </div>
        <div className="filter_footer">
          <div className="cancel" data-type="cancel" onClick={self.handleClick}>取消</div>
          <div className="sure" ref="sure" data-type="sure" onClick={this.handleClick}>确定</div>
        </div>
      </div>
    }
  },
  //点击筛选条件, 显示对应内容的   主体内容   注意: 返回<li></li>元素
  filterContextBody(which){
    var element = null;
    var style = {display:'block'};
    var data = [],checked = [];
    var conditionContent = this.props.conditionContent[which];

  }
  
});

















