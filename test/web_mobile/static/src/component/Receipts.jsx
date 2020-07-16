/**
 * Created by zhousuyang on 16/12/10.
 */
import React from 'react'
import Reflux from 'reflux'
import {Row, Col, Input, Select, Checkbox, Radio, Icon, Button, Table, Switch, Spin ,DatePicker} from 'antd'
import 'antd/dist/antd.min.css'
import '../css/common.css'
import moment from 'moment';
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker } = DatePicker;
var ReceiptsStore = require('../store/ReceiptsStore');
var ReceiptsAction = require('../actions/ReceiptsAction');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(ReceiptsStore, 'onChangeStatus')],
    getDefaultProps(){
        return {
            //title: 标题, h_title: 二级标题(提示文字), id: 后台的id属性名, name: 后台的name属性名, bar_code: 店仓的bar_code值(目前未用到此属性)
            conditionContent: {
                sum: {
                    title: '汇总',
                    h_title: '*请选择需统计项目, 单选',
                    id: 'type_code',
                    name: 'type_name',
                },
                kind: {
                    title: '分类',
                    h_title: '*请选择统计分类',
                    id: 'type_code',
                    name: 'type_name',
                },
            }
        }
    },
    onChangeStatus(res, type){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        if(type == 'sum' || type == 'kind'){
            filter_condition[type].data = res.data;
            if(sessionStorage.getItem('4_1_filter_condition')){
                filter_condition = JSON.parse(sessionStorage.getItem('4_1_filter_condition'))
            }
            this.setState({
                filter_condition: filter_condition
            })
        }else if(type == 'table'){
          var head_columns = res.data.table_headers;
          var head_columns_key = [],array = [];
          var dataSource = res.data.records;
          var nums = 0, index_count = 0;
          var render_data=[];

          var {result, after_search, has_data, init, expand, footerData} = this.state;
          if(!!dataSource.length){
                has_data = true;
                result.show = false;
                after_search = true;
                expand = false;
            }else{
                this.state.result.show = true;
                has_data = false;
                after_search = false;
                expand = true;
            }
            init.show = false;
            this.setState({
                has_data: has_data,
                result: result,
                after_search: after_search,
                range_start: '',
                range_end: '',
                init: init,
                expand: expand,
                loading: false,
                spin: false,
                footerData:res.footer

            })

          render_data[index_count] = {};
          for(var i in head_columns){
            for(var j in head_columns[i]){
              head_columns_key.push(j);
            }
          }
          // 格式化表格数据
          for(var i in dataSource){
            var index = parseInt(i) + 1;
            array[i] = {};
            array[i]['key'] = i;
            array[i]['index'] = index;
            for(var j in head_columns_key){
              array[i][head_columns_key[j]] = dataSource[i][head_columns_key[j]];
            }
          }
          //获取相同数据的首尾索引号
          if(dataSource.length>1){
            for(var i = 1;i< dataSource.length;i++){
              if(dataSource[i-1]['stock_data'] == dataSource[i]['stock_data']){
                nums++;
                render_data[index_count]['state'] = i-nums;
                render_data[index_count]['last'] = i;
              }else{
                nums = 0;
                index_count++;
                render_data[index_count] = {}
              }
            }
          }
          this.table(res,array,render_data,head_columns,head_columns_key);
        }else{
          state[type].data = res.data;
          this.setState({
            data:state
          })
        }
      this.setState({
          filter_condition: filter_condition
      })
    },
    getInitialState(){
      var start_date = sessionStorage.getItem('4_1_start_date') ? sessionStorage.getItem('4_1_start_date') : '';
        var end_date = sessionStorage.getItem('4_1_end_date') ? sessionStorage.getItem('4_1_end_date') : '';
        var pageSize = sessionStorage.getItem('4_1_pageSize') ? JSON.parse(sessionStorage.getItem('4_1_pageSize')) : 20;
        var current = sessionStorage.getItem('4_1_current') ? JSON.parse(sessionStorage.getItem('4_1_current')) : 1;
        return {
            mask: false,
            which: '', //点击的是哪个筛选条件
            
            table: {
                columns: [],
                dataSource: [],
                footer(){
                    return '';
                },
                merge_index: []
            },
            pagination: {
                pageSize: 20,
                total: 0,
                showTotal(){
                    return ''
                },
                onChange: function () {},
                current: 1,
                onShowSizeChange: function () {},
                showSizeChanger: true
            },
            filter_condition: {
                sum: {data: [], value: 0, text: '单号'},
                kind: {data: [], value:0, text: '配货'},
            },
            start_date: start_date, //日期
            end_date: end_date, //日期
            expand:true,
            height: 0,
            height1: 0,
            has_data: false,
            after_search: false,
            init: {show: true, text: '请筛选条件并[查询]统计结果', footer: '共0条'},
            result: {show: false, text: '没有与条件匹配的结果', footer: '共0条'},
            loading: false,
            spin: false,
            is_desc: true,
            order_by: ''
            


        }
    },
    componentWillMount(){
      //获取前一周的日期
      var myDate = new Date(); //获取今天日期
      myDate.setDate(myDate.getDate() - 7);
      var dateArray = []; 
      var dateTemp,date_start;
      var flag = 1; 
      let [Year,Years, Month, Day] = [new Date().getFullYear(), new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
      Month = String(Month).length == 1 ? ('0' + Month) : Month;
      Day = String(Day).length == 1 ? ('0' + Day) : Day;
      for (var i = 0; i < 7; i++) {
        var G_month =  String(myDate.getMonth()+1).length == 1 ? '0' + (myDate.getMonth()+1) : myDate.getMonth()+1;
        var G_day = String(myDate.getDate()).length == 1 ? '0' +(myDate.getDate()) : myDate.getDate();
          dateTemp = G_month+"-"+ G_day;
          dateArray.push(dateTemp);
      }
      if(Number(G_day) >= 25 ){
        date_start = Years + '-' + dateArray[0];
      }else{
        date_start = Year + '-' + dateArray[0];
      }
      let [date_end] = [Year + '-' + Month + '-' + Day];
      if(sessionStorage.getItem('4_1_start_date')){
        date_start = sessionStorage.getItem('4_1_start_date')
      }
      if(sessionStorage.getItem('4_1_end_date')){
          date_end = sessionStorage.getItem('4_1_end_date')
      }
      this.setState({
        start_date: date_start,
        end_date: date_end,
      })

      var {pagination} = this.state;
      var shop_id = this.getShopId('shop_id=');
      var user_id = this.getShopId('user_id=');
      ReceiptsAction.sumLevel('sum');
      ReceiptsAction.proKind('kind');
        
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
    componentDidMount(){
        var {height, height1, has_data} = this.state;
        if(has_data){
            height1 = document.body.clientHeight - document.querySelector('.nav_header').offsetHeight - document.querySelector('.merge').offsetHeight;
        }else{
            height = document.body.clientHeight - document.querySelector('.nav_header').offsetHeight - document.querySelector('.condition').offsetHeight;
        }
        $(function () {
            FastClick.attach(document.body);
        });
        if(sessionStorage.getItem('4_1_obj')){
            var obj = JSON.parse(sessionStorage.getItem('4_1_obj'));
            ReceiptsAction.tableList(obj,'table');
        }
        this.setState({
            height: height,
            height1: height1
        })
        // 排序
        var str='th.date, th.count, th.amount,th.deliver_in_amount';
        this.click_sort(str);
    },
    onStartChange(date, dateString){
      sessionStorage.setItem('4_1_start_date', dateString)
      this.setState({
        start_date: dateString
      })
    },
    onEndChange(date, dateString){
      sessionStorage.setItem('4_1_end_date', dateString)
      this.setState({
        end_date: dateString
      })
    },
    render(){
        var {pro_code, pagination, table, store_bg, spin, loading, expand, after_search, height, height1, init, result, mask, which, filter_condition, has_data,product_code} = this.state;
        var hh = 0,y = 0;
        if(expand){
            hh = height;
            y = height - 140;
        }else{
            hh = height1;
            y = height1 - 140;
        }
        var x = table.columns.length * 200; 
        var style = {height: hh};
        let [start_date, end_date, format, condition, text] =
          [this.state.start_date, this.state.end_date, 'YYYY-MM-DD', this.props.condition, this.state.text];
        return (
             <Spin spinning={spin}>
              <div>
                <div className={after_search ? "hide condition" : "show condition"}>
                    <Row>
                      <Col span={12}>
                        <div className="common">
                          <span className="first" data-type="sum" onClick={this.handleClick}>汇总: </span><span className="second" data-type="sum" onClick={this.handleClick}>{filter_condition.sum.text}</span><Icon type="right"/>
                        </div>
                      </Col>
                      <Col span={12} className='select_date'>
                          <div className="date_time"><DatePicker defaultValue={moment(start_date, format)} onChange={this.onStartChange}/><span className="date_line">-</span><DatePicker defaultValue={moment(end_date, format)} onChange={this.onEndChange}/></div>
                      </Col>
                        
                    </Row>
                    <Row>
                      <Col span={12}>
                          <div className="common">
                              <span className="first" data-type="kind" onClick={this.handleClick}>分类: </span><span className="second" data-type="kind" onClick={this.handleClick}>{filter_condition.kind.text}</span><Icon type="right"/>
                          </div>
                      </Col>
                      <Col span={12}>
                        <div className="common product_code_wrap" style={{marginLeft:0,width:'90%'}}>
                            <span className="product_code_input">
                              <Icon type="search" className="seach_icon" />
                              <Input value={product_code} onChange={this.handleProductCode} style={{borderRadius:'0',height:'35px'}}placeholder="搜索商品编码"/>
                            </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <div></div>
                      </Col>
                      <Col span={12} style={{textAlign:'right'}}>
                        <div className="common button">
                            <Button type='primary' onClick={this.search}>查询</Button>
                        </div>
                      </Col>
                    </Row>
                </div>
                <div className={has_data  && after_search ? "show merge" : "hide merge"} onClick={this.expandCondition}>
                    {this.mergeResult()}
                    <Icon type="ellipsis" onClick={this.expandCondition} />
                </div>
                <div style={style} className={init.show ? 'show init_result' : 'hide init_result'}>
                    <div className="cus_content">
                        <p>
                            <img src="static/src/img/icon_search.png" alt=""/><br/>
                            <span>{init.text}</span>
                        </p>
                    </div>
                    <div className="cus_footer">
                        {init.footer}
                    </div>
                </div>
                <div style={style} className={result.show && !has_data ? 'show init_result' : 'hide init_result'}>
                    <div className="cus_content">
                        <p>
                            <img src="static/src/img/icon_search.png" alt=""/><br/>
                            <span>{result.text}</span>
                        </p>
                    </div>
                    <div className="cus_footer">
                        {result.footer}
                    </div>
                </div>
                <div className={init.show ? 'table hide' : result.show ? 'table hide' : 'table show'}>
                  <Table scroll={{x:x,y:y}} loading={loading} bordered pagination={pagination} dataSource={table.dataSource} columns={table.columns} footer={table.footer}/>

                </div>
                {/*黑色背景弹框*/}
                <div className={mask ? "active modal_condition" : "modal_condition"}>
                    <div className="popup_box" onClick={this.hideFilterBody}></div>
                    <div className="right_box">
                        {this.filterContext(which)}
                    </div>
                </div>
            </div>
          </Spin>
        )
    },
    // 处理表格数据
  table(res,array,render_data,head_columns,head_columns_key){
     var {table, pagination, footerData} = this.state;
    table.dataSource = array;
    table.footer = function(){
      if(res.data.records.length){
        var element = res.data.footer.map((item,index) => {
          return <div className="footerDiv" key = {index+1}><span>{item.type_name}:{item.type_mount}</span>
           </div>
        })
        element.unshift(<div className="footerHeadDiv" key='0'>合计 |</div>)
        return element;
       }else{
         return '';
       }

    };
    table.columns = this.render_columns(render_data, head_columns, head_columns_key);
      pagination.pageSize = res.data.limit;
      pagination.total = res.data.record_count;
      pagination.showTotal = function () {
          return `共${res.data.record_count}条数据, 共${res.data.page_count}页`;
      }
      pagination.onChange = this.changePage;
      pagination.onShowSizeChange = this.onShowSizeChange;
      this.setState({
          table: table,
          pagination: pagination,
          loading: false
      })
  },
  render_columns(arr,head_columns,head_columns_key){
    var table_head = [];
      for(var i in head_columns_key){
        table_head[i] = {};
        table_head[i]['width'] = 200;
        table_head[i]['title'] = head_columns[i][head_columns_key[i]];
        table_head[i]['dataIndex'] = head_columns_key[i];
        table_head[i]['key'] = head_columns_key[i];
        table_head[i]['className'] = head_columns_key[i];
      }
      return table_head;
  },
  changePage(page){
    this.state.pagination.current = page;
    var obj = this.ajax();
    this.setState({
      loading: true
    })
    sessionStorage.setItem('4_1_current', page);
    sessionStorage.setItem('4_1_obj', JSON.stringify(obj));
    ReceiptsAction.tableList(obj,'table');
  },
  onShowSizeChange(current,pageSize){
    this.state.pagination.current = current;
    this.state.pagination.pageSize = pageSize;
    var obj = this.ajax();
    this.setState({
      loading: true
    })
    sessionStorage.setItem('4_1_pageSize', pageSize);
    sessionStorage.setItem('4_1_obj', JSON.stringify(obj));
    ReceiptsAction.tableList(obj,'table');
  },
  text_sum(type){
      var {filter_condition} = this.state;
      filter_condition[type];
      this.setState({
        filter_condition: filter_condition
      })
  },
  text_kind(type){
      var {filter_condition} = this.state;
      for(var i in filter_condition[type].checked){
          if(filter_condition[type].checked[i]){
              return true
          }
      }
      return false
  },
  text_range(type){
      var {range} = this.state;
      var str = '';
      if(range.single){
          for(var i in range.list){
              if(range.list[i].checked){
                  str += range.list[i].text + '/';
              }
          }
          return str.trimrl();
      }else{
          return '自定义'
      }
  },
  searchCode(e){
      var {value} = e.target;
      var {pro_code} = this.state;
      pro_code.value = value;
      this.setState({
          pro_code: pro_code
      })
  },
  selectChange(value){
      var {pro_code} = this.state;
      pro_code.current = value;
      this.setState({
          pro_code: pro_code
      })
  },
  hideFilterBody(){
      this.setState({
          mask: false
      })
  },
  handleClick(e){
      this.setState({
          mask: true,
          which: e.target.dataset.type
      })
  },
  filterContext(which){
      var {store_bg, store_input_text} = this.state;
      if (which) {
          var conditionContent = this.props.conditionContent[which];
          var {filter_condition} = this.state;
          return <div className="filter_wrap">
              <div className="filter_top">
                  <Icon type="left" onClick={this.close} />{conditionContent.title ? conditionContent.title : <span className="search_store"><Input placeholder="搜索" onChange={this.storeInputText} /><Icon type="search" onClick={this.searchStore} /></span>}<a onClick={this.close}>完成</a>
              </div>
              <div className={store_bg ? "hide filter_body" : "show filter_body"}>
                  <div>
                      {conditionContent.h_title} <br/>
                  </div>
                  <ul>
                      {this.filterContextBody(which)}
                  </ul>
              </div>
              <div className={store_bg ? 'show' : 'hide'}>

              </div>
          </div>
      }
  },
  storeInputText(e){
      this.setState({
          store_input_text: e.target.value
      })
  },
  searchStore(){
      var {store_input_text, filter_condition} = this.state;
      this.setState({
          store_input_text: '',
          store_bg: false
      })
  },
  filterContextBody(which){
      var {range, filter_condition} = this.state;
      var {conditionContent} = this.props;
      var element = null;
      if(which == 'range'){
          element = range.list.map((item, index) => {
              if(item.hasOwnProperty('custom')){
                  return <li key={index} data-index={index}>
                      {item.text}<Checkbox checked={item.checked} onClick={this.onCustomCheckboxClick} />
                  </li>
              }else{
                  return <li key={index} className="last" data-index={index}>
                      {item.text}<Switch checked={!range.single} onChange={this.switchChange} />
                      <Row style={{marginTop: 20}}>
                          <Col span={11}><Input disabled={range.single} placeholder="-9999" onChange={this.inputStartChange} /></Col>
                          <Col span={2}><div style={{textAlign: 'center'}}>-</div></Col>
                          <Col span={11}><Input disabled={range.single} placeholder="9999" onChange={this.inputEndChange} /></Col>
                      </Row>
                  </li>
              }
          })
      }else if(which == 'sum'){
           element = <RadioGroup className="sum" value={filter_condition[which].value} onChange={this.sumLevelRadio}>
              {
                  filter_condition[which].data.map((item, index) => {
                      return <Radio key={index} style={{display: 'block'}} value={index}>
                          {item[conditionContent[which].name]}
                      </Radio>
                  })
              }
          </RadioGroup>
      }else if(which == 'kind'){
        element = <RadioGroup className="sum" value={filter_condition[which].value} onChange={this.productRadio}>
            {
              filter_condition[which].data.map((item, index) => {
                  return <Radio key={index} style={{display: 'block'}} value={index}>
                      {item[conditionContent[which].name]}
                  </Radio>
              })
            }
        </RadioGroup>
      }
      return element;
  },
  handleProductCode(e){
      sessionStorage.setItem('product_code', e.target.value);
      this.setState({
          product_code: e.target.value
      })
  },
  close(){
      this.setState({
          mask: false
      })
  },
  onCustomCheckboxClick(e){
      var index = e.target.parentNode.parentNode.parentNode.dataset.index;
      var {range} = this.state;
      range.list[index].checked = !range.list[index].checked;
      range.single = true;
      this.setState({
          range: range
      })
  },
  switchChange(checked){
      var {range} = this.state;
      range.single = !checked;
      for(var i in range.list){
          range.list[i].checked = false;
      }
      this.setState({
          range: range
      })
  },
  inputStartChange(e){
      this.setState({
          range_start: e.target.value
      })
  },
  inputEndChange(e){
      this.setState({
          range_end: e.target.value
      })
  },
  sumLevelRadio(e){
      var {filter_condition} = this.state;
      var {conditionContent} = this.props;
      filter_condition.sum.value = e.target.value;
      filter_condition.sum.text = filter_condition.sum.data[parseInt(e.target.value)][conditionContent.sum.name]
      sessionStorage.setItem('4_1_filter_condition', JSON.stringify(filter_condition))
      this.setState({
          filter_condition: filter_condition
      })
  },
  productRadio(e){
      var {filter_condition} = this.state;
      var {conditionContent} = this.props;
      filter_condition.kind.value = e.target.value;
      filter_condition.kind.text = filter_condition.kind.data[parseInt(e.target.value)][conditionContent.kind.name]
      sessionStorage.setItem('4_1_filter_condition', JSON.stringify(filter_condition))
      this.setState({
          filter_condition: filter_condition
      })
  },
  selectAll(e){
      var type = e.target.parentNode.parentNode.parentNode.dataset.type;
      var {filter_condition} = this.state;
      var {conditionContent} = this.props;
      filter_condition[type].select_all = !filter_condition[type].select_all;
      if(filter_condition[type].select_all){
          for(var i in filter_condition[type].checked){
              filter_condition[type].checked[i] = true;
              filter_condition[type].text[i] = filter_condition[type].data[i][conditionContent[type].name];
          }
      }else{
          for(var i in filter_condition[type].checked){
              filter_condition[type].checked[i] = false;
              filter_condition[type].text[i] = '';
          }
      }
      sessionStorage.setItem('4_1_filter_condition', JSON.stringify(filter_condition))
      this.setState({
          filter_condition: filter_condition
      })
  },
  search(){
      var result = this.ajax();
      app.piwik_push(this.props.route.title + '(查询)');
      sessionStorage.setItem('4_1_obj', JSON.stringify(result));
      this.setState({
        spin: true
      })

      ReceiptsAction.tableList(result,'table');
  },
  ajax(){
    var {product_code,pagination, start_date, end_date, filter_condition, order_by, is_desc} = this.state;
    var {conditionContent} = this.props;
    var obj = {};
    var conditionContent = this.props.conditionContent;
    var shop_id = [],receipt_type:'',group_level:'';
    if(typeof(filter_condition.sum.value) == 'number'){
      group_level = filter_condition.sum.data[filter_condition.sum.value][conditionContent.sum.id]
    }
    if(typeof(filter_condition.kind.value) == 'number'){
      receipt_type = filter_condition.kind.data[filter_condition.kind.value][conditionContent.kind.id]
    }
    if(order_by){
      obj.order_by = order_by
      obj.is_desc = Number(is_desc);
    }

    obj.product_code = product_code;
    obj.receipt_type = receipt_type;//单据
    obj.group_level = group_level;//分组
    obj.shop_id = this.getShopId('shop_id=');
    obj.limit = this.state.pagination.pageSize;
    obj.current_page = this.state.pagination.current;
    obj.start_date = this.state.start_date;
    obj.end_date = this.state.end_date;
    var str = JSON.stringify(obj);
    sessionStorage.obj = str;

    return obj;

  },
  sort(type){
    var obj = this.ajax();
    sessionStorage.setItem('4_1_obj', JSON.stringify(obj));
    ReceiptsAction.tableList(obj, 'table');
  },
  click_sort(str){
    var _this = this;
    $(document).on('click', str, function(e){
        var type = e.target.className ? e.target.className : e.target.parentNode.className;
        e.stopPropagation();
        _this.setState({
            is_desc: !_this.state.is_desc,
            spin: true,
            order_by: type
        })
        _this.sort(type);
    })
  },
  expandCondition(){
      var {init, result} = this.state;
      init.show = false;
      result.show = false;
      this.setState({
          has_data: false,
          after_search: false,
          init: init,
          result: result,
          expand: true,
      })
  },
  selectedNums(type){
      var {filter_condition} = this.state;
      var nums = 0;
      for(var i in filter_condition[type].checked){
          if(filter_condition[type].checked[i]){
              nums++;
          }
      }
      return nums;
  },
  mergeResult(){
      var {pro_code, filter_condition, range, range_start, range_end,start_date, end_date} = this.state;
      var str = '', store_i = 0, kind_i = 0, range_i = [];
      if(sessionStorage.getItem('4_1_start_date')){
        str += '时间:' + start_date + '至' + end_date + ';';
      }
      if(filter_condition.sum.text){
          str += '汇总: ' + filter_condition.sum.text + '; ';
      }
      if(filter_condition.kind.text){
          str += '分类: ' + filter_condition.kind.text + '; ';
      }
      if(sessionStorage.getItem('input')){
        str += '商品编码:' + sessionStorage.getItem('product_code') + ';';
      }
      return str;
  }
})
