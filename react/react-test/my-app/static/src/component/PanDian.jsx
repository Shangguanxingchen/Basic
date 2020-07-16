import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import $ from 'jquery';
import moment from 'moment';
var Reflux = require('reflux');
var PanDianStore = require('../store/PanDianStore');
var PanDianAction = require('../actions/PanDianAction');

import {Row, Col, DatePicker, Icon, Table, Checkbox, Input} from 'antd';

module.exports = React.createClass({
  mixins: [Reflux.listenTo(PanDianStore, 'onStatusChange')],
  onStatusChange(data){
      var [list, checked, text] = [this.state.lists, this.state.checked, this.state.text]
      if(data.condition == 'kind'){
            list[data['condition']] = data.list;
            for(let i=0; i<data.list.length; i++) {
                checked[data['condition']][i] = false;
                text[data['condition']][i] = '';
            }
            if(sessionStorage.getItem('checked_6')){
                var [checked_6, text_6] = [JSON.parse(sessionStorage.getItem('checked_6')), JSON.parse(sessionStorage.getItem('text_6'))];
                if(checked_6[data.condition].length == data.list.length){
                    checked[data.condition] = checked_6[data.condition];
                    text[data.condition] = text_6[data.condition];
                }
            }
            this.setState({
                lists: list,
                checked: checked,
                text: text
            })
        }else if(data.condition == 'high'){
          list.high = data.list;
          for(let i=0; i<data.list.length; i++){
              checked.high[i] = false;
          }
          if(sessionStorage.getItem('checked_4')){
              var checked_4 = JSON.parse(sessionStorage.getItem('checked_4'));
              if(checked_4.high.length == data.list.length){
                  checked.high = checked_4.high;
              }
          }
          this.setState({
              lists: list,
              checked: checked
          })
      }else if(data.condition == 'table'){
          var [dataList,total,total_amount, total_qty, head_columns, head_columns_key, dataSource, render_data]
              =
              [data.list,data.list.record_count,data.list.inventory_amount, data.list.inventory_count, [], [], data.list.records, []];
          if(data.list.hasOwnProperty('table_headers')){
              head_columns = data.list.table_headers;
              for(var i in head_columns){
                  for(var j in head_columns[i]){
                      head_columns_key.push(j);
                  }
              }
          }
          var array = [];
          //格式化表格数据
          for(var i in dataSource){
              var index = parseInt(i) + 1;
              array[i] = {};
              array[i]['key'] = i;
              array[i]['index'] = index;
              for(var j in head_columns_key){
                  array[i][head_columns_key[j]] = dataSource[i][head_columns_key[j]];
              }
          }
          var nums = 0, index_count=0;
          render_data[index_count] = {};
          //获取相同数据的首尾索引号
          if(dataSource.length>1){
              for(var i=1; i<dataSource.length; i++) {
                  if(dataSource[i-1]['order_created_at'] == dataSource[i]['order_created_at']){
                      nums++;
                      render_data[index_count]['start'] = i-nums;
                      render_data[index_count]['last'] = i;
                  }else{
                      nums = 0;
                      index_count++;
                      render_data[index_count] = {}
                  }
              }
          }
          // let pagination_data = this.table(array, total, total_amount, total_qty)
          this.setState({
              mask: false,
              total: total,
              dataList:dataList,
              total_amount: total_amount,
              total_qty: total_qty,
              dataSource: array,
              merge_index: render_data,
              head_columns: head_columns,
              head_columns_key: head_columns_key,
              // pagination_data: pagination_data
          })
      }
    },
    getDefaultProps(){
        return {
            condition: ['kind', 'high','store']
        }
    },
    getInitialState(){
        let page = sessionStorage.getItem('page_2_1') ? parseInt(sessionStorage.getItem('page_2_1')) : 1;
        let product_name = sessionStorage.getItem('product_name_2_1') ? sessionStorage.getItem('product_name_2_1') : '';
        let product_code = sessionStorage.getItem('product_code_2_1') ? sessionStorage.getItem('product_code_2_1') : '';
        let pageSize = sessionStorage.getItem('pageSize_2_1') ? parseInt(sessionStorage.getItem('pageSize_2_1')) : 20;
        return {
            mask: false,
            start: '',
            end: '',

            condition: {},//包含分类、高级选项
            lists: {'kind': [], 'high': [], 'store':[]},
            checked: {'kind': [], 'high': [],'store':[]},
            text: {'kind': [],'store':[]},

            //table 列表的数据
            currentPage: page,
            pageSize: pageSize,
            total: 0,
            total_amount: 0,
            total_qty: 0,
            head_columns: [],
            head_columns_key: [],
            dataSource: [],
            dataList:{},
            marge_index: [],

            product_name: product_name, //搜索的名称
            product_code: product_code, //搜索的编码

            search_product_code: false,


            screen_width: 0, //屏幕宽度
        }
    },
    componentWillMount(){
        let [Year, Month, Day] =
            [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
        Month = String(Month).length == 1 ? ('0' + Month) : Month;
        Day = String(Day).length == 1 ? ('0' + Day) : Day;
        let [date_start, date_end] = [Year + '-' + Month + '-' + Day, Year + '-' + Month + '-' + Day];
        if(sessionStorage.getItem('start_2_1')){
            date_start = sessionStorage.getItem('start_2_1')
        }
        if(sessionStorage.getItem('end_2_1')){
            date_end = sessionStorage.getItem('end_2_1')
        }
        this.setState({
            start: date_start,
            end: date_end
        })
    },
    componentDidMount(){
        $(function() {
            FastClick.attach(document.body);
         });
        let width = window.screen.width;
        this.state.screen_width = width*2+100;
        var condition = this.props.condition;
        PanDianAction.kind(condition[0]);
        PanDianAction.high(condition[1]);
        if(sessionStorage.getItem('ajax_6')){
            PanDianAction.table(JSON.parse(sessionStorage.getItem('ajax_6')));
        }
    },
    onStartChange(date, string){
        this.state.start = string;
        var obj = this.common_ajax(1, string);

        sessionStorage.setItem('start_2_1', string);
        sessionStorage.setItem('ajax_4', JSON.stringify(obj));

        PanDianAction.table(obj);
    },
    onEndChange(date, string){
        this.state.end = string;
        var obj = this.common_ajax(1, false, string);

        sessionStorage.setItem('end_2_1', string);
        sessionStorage.setItem('ajax_4', JSON.stringify(obj));

        PanDianAction.table(obj);
    },
    handleClick(e){
        let [type, titles]
            =
            [e.target.dataset.type, {title: '', h_title: '', id: '', name: '', condition: ''}];
        switch(type){
            case 'kind':
                titles.title = '内部分类';
                titles.h_title = '* 请选择同级的内部分类, 可多选';
                titles.id = 'category_id';
                titles.name = 'category_name';
                titles.condition = 'kind';
                break;
            case 'high':
                titles.title = '高级选项';
                titles.h_title = '* 勾选可显示项目';
                titles.id = 'type_code';
                titles.name = 'type_name';
                titles.condition = 'high';
                break;
            case 'store':
                titles.title = '店仓';
                titles.h_title = '* 请选择店仓';
                titles.id = 'shop_id';
                titles.name = 'shop_name';
                titles.code = 'shop_code';
                titles.condition = 'store';
                break;
        }
        this.setState({
            mask: true,
            condition: titles
        })
    },
    list_check(){
      var [checked, list, titles] = [this.state.checked, this.state.lists, this.state.condition];
      if(titles.hasOwnProperty('name')){
          var [data, isChecked, element] = [list[titles.condition], checked[titles.condition], ''];
          switch (titles.condition){
              case 'kind':
                  element = <Icon className="search" type="search" name="内部分类" kind="kind" onClick={this.inner_right_search} />
                  break;
              case 'store':
                  element = <Icon className="search" type="search" name="店仓" kind="store" onClick={this.inner_right_search} />
                  break;
          }
          return <div className="filter_wrap">
                  <div className="filter_top">
                      {titles.title}{element}
                  </div>
                  <div className="filter_body">
                      <div>{titles.h_title}</div>
                      <ul>
                          <li>
                              <span className="all" data-type={titles.condition} data-name={titles.name} onClick={this.selectAll}>
                                  {this.select(isChecked)}
                                  </span>(已选 {this.how_much(isChecked)})
                          </li>
                          {data.map((item, index) => {
                              if(item){
                                  return <li key={index} data-index={index} data-type={titles.condition} data-name={item[titles.name]} data-code={titles.code ? item[titles.code] : ''} data-ids={item[titles.id]}>
                                      <Checkbox checked={isChecked[index]} onClick={this.selectCheck}>
                                          {item[titles.name]}
                                          </Checkbox>
                                  </li>
                              }
                          })}
                      </ul>
                  </div>
                  <div className="filter_footer">
                    <div className="cancel" data-type="cancel" onClick={this.close}>取消</div>
                    <div className="sure" ref="sure" data-typ="sure" onClick={this.close}>确定</div>
                  </div>
              </div>
      }
    },
    close(e){
        var type = e.target.dataset.type;
        if(type == 'cancel'){
            this.setState({
                mask: false
            })
        }else{
            this.setState({
                mask: false
            })
            var obj = this.common_ajax();

            sessionStorage.setItem('ajax_4', JSON.stringify(obj));

            PanDianAction.table(obj);
        }
    },
    common_ajax(page, start, end, pageSize,product_code){
        var [list, checked] = [this.state.lists, this.state.checked];
        var [view_type_list, product_type, series_ids, limit, current_page, start_date, end_date, product_code, product_name]
            =
            [[], [], [], this.state.pageSize, this.state.currentPage, this.state.start, this.state.end,this.state.product_code, this.state.product_name];
        if(page){
            current_page = page;
        }
        if(start){
            start_date = start;
        }
        if(end){
            end_date = end;
        }
        if(pageSize){
            limit = pageSize;
        }
        if(product_code){
          product_code = product_code;
        }
        for(var i in checked['kind']){
            if(checked['kind'][i]){
                product_type.push(list['kind'][i].category_id);
            }
        }
        for(var i in checked['high']){
            if(checked['high'][i]){
                view_type_list.push(list['high'][i].type_code);
            }
        }
        for(var i in checked['store']){
            if(checked['store'][i]){
                shop_ids.push(list['store'][i].shop_id);
            }
        }
        return {
            'view_type_list': view_type_list,
            'limit': limit,
            'current_page': current_page,
            'start_date': start_date,
            'end_date': end_date,
            'product_type': product_type,
            'product_code':product_code,
            'product_name': product_name
        }
    },
    select(array){
        if(array.indexOf(false) > -1 || !array.length){
            return '全选';
        }
        return '取消全选';
    },
    how_much(array){
        let i = 0;
        for(let j in array){
            if(array[j]){
                i++;
            }
        }
        return i;
    },
    slideUp(){
        let _this = this;
        this.setState({
            up: !_this.state.up
        })
    },
    selectAll(e){
        var [checked, type, name, text, data] = [this.state.checked, e.target.dataset.type, e.target.dataset.name, this.state.text, this.state.lists];
        if(checked[type].indexOf(false) > -1){
            for(let i=0; i<checked[type].length; i++) {
                checked[type][i] = true;
            }
            if(text.hasOwnProperty(type)){
                for(var i in data[type]){
                    text[type][i] = data[type][i][name]
                }
            }
        }else{
            for(let i=0; i<checked[type].length; i++) {
                checked[type][i] = false;
            }
            if(text.hasOwnProperty(type)){
                for(let i=0; i<text[type].length; i++) {
                text[type][i] = '';
            }
            }
        }

        sessionStorage.setItem('checked_4', JSON.stringify(checked));
        sessionStorage.setItem('text_4', JSON.stringify(text));

        this.setState({
            checked: checked,
            text: text
        })
    },
    selectCheck(e){
      var obj = e.target.parentNode.parentNode.parentNode.dataset;
      var [index, type, name, checked, text] = [obj.index, obj.type, obj.name, this.state.checked, this.state.text];
      checked[type][index] = !checked[type][index];
      if(text.hasOwnProperty(type)){
          text[type][index] = checked[type][index] ? name : '';
      }

      sessionStorage.setItem('checked_4', JSON.stringify(checked));
      sessionStorage.setItem('text_4', JSON.stringify(text));

      this.setState({
          checked: checked,
          text: text
      })
    },
    render(){
        let [start, end, format, condition, text] =
            [this.state.start, this.state.end, 'YYYY-MM-DD', this.props.condition, this.state.text]
        return (
            <div>
                <div className={this.state.up ? "animate_up condition" : "animate_down condition"}>
                  <Row>
                      <Col className='datetime' span={9} style={{textAlign: 'right'}}>
                          日期: <DatePicker defaultValue={moment(start, format)} format={format} style={{marginLeft: '10px'}} onChange={this.onStartChange} /> - <DatePicker defaultValue={moment(end, format)} format={format} onChange={this.onEndChange} />
                      </Col>
                      <Col span={9} style={{paddingLeft: '30px'}}>
                          物品类型: <span className="inner_kind"><span onClick={this.handleClick} data-type={condition[0]} className="common">{text['kind'].join(' ')}</span><Icon type="right" /></span>
                      </Col>
                      <Col span={6} style={{paddingLeft: '30px'}}>
                          <p className="pick_up"><span className="up_down" onClick={this.slideUp}>收起条件<Icon className="up" type={this.state.up ? 'down' : 'up'} style={{marginRight:'0px'}} /><Icon className="search" type="search" onClick={this.search_product_code} style={{left:'25px'}}/></span></p>
                      </Col>
                  </Row>
                  <Row>
                      
                      <Col span={9} style={{paddingLeft: '20px'}}>
                          物品代码: <div className="inner_kind example-input">
                            <Input className="product_code" placeholder="编码" value={this.state.product_code} onChange={this.product_code} />
                              <Icon type="search" onClick={this.search_code} className="search" />
                          </div>
                      </Col>
                      <Col span={6} style={{paddingLeft: '30px'}}>
                          <a className="high_select" data-type={condition[1]} onClick={this.handleClick}>高级选项</a>
                      </Col>
                  </Row>
                </div>

                <div className="table_wrap">
                    <div className="table">
                        <Table footer={this.table().footer} scroll={{x: this.state.screen_width}} bordered pagination={this.table().pagination} columns={this.table().columns} dataSource={this.table().data} />
                    </div>
                </div>
                {/*黑色背景弹框*/}
                <div className={this.state.mask ? "active modal_condition" : "modal_condition"}>
                    <div className="popup_box"></div>
                    <div className="right_box">
                        {this.list_check()}
                    </div>
                </div>
                {/*收起条件后的搜索弹出框*/}
                <div className={this.state.search_product_code ? "search_bg active": "search_bg"}>
                    <div className="up_search_bg"></div>
                    <div className="up_search_box">
                        <Row>
                            <Col span={2} />
                            <Col span={2} className='back' onClick={this.back}><Icon type="left" />返回</Col>
                            <Col span={1} />
                            <Col span={19} className="search_key">
                                <Input className="product_name" placeholder="编码/商品" value={this.state.product_name} onChange={this.product_name} />
                                <Icon type="search" onClick={this.search_product} className="search" />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    },
    search_product_code(){
        this.setState({
            search_product_code: true
        })
    },
    back(){
        this.setState({
            search_product_code: false
        })
    },
    search_product(){
        var [text, obj] = [$(".product_name").val(), this.common_ajax(1)];
        obj.product_name = text;
        this.state.currentPage = 1;
        this.state.search_product_code = false;
        this.state.product_name = text;

        sessionStorage.setItem('ajax_4', JSON.stringify(obj));
        sessionStorage.setItem('product_name_4', text);

        PanDianAction.table(obj);
    },
    search_code(){
      var [text,obj] = [$(".product_code").val(), this.common_ajax(1)];
      obj.product_code = text;
      this.state.currentPage = 1;
      this.state.search_product_code = false;
      this.state.product_code = text;
      sessionStorage.setItem('ajax_3',JSON.stringify(obj));
      sessionStorage.setItem('product_code',text);

      PanDianAction.table(obj);
    },
    table(){
      var dataList = this.state.dataList;
      console.log('123',dataList);
        var [table_data,quantity,total_amount,total_qty,table]
            =
            [this.state.dataSource, this.state.total, this.state.total_amount, this.state.total_qty,
                {
                    columns: [],
                    data: [],
                    footer(){
                        return '暂无数据';
                    },
                    pagination: {}
                }
            ]
        table.footer = function () {
            if(table_data.length){
                return <div><span style={{display: 'inline-block', marginRight: '20px'}}>总账面数: {dataList.count_deserved_sum}</span> <span style={{display: 'inline-block', marginRight: '20px'}}>总实盘数: {dataList.count_available_sum}</span><span style={{display: 'inline-block', marginRight: '20px'}}>总差异数: {dataList.count_diff_sum }</span><span style={{display: 'inline-block', marginRight: '20px'}}>总差异金额数: {dataList.amount_diff_sum}</span></div>;
            }else{
                return '';
            }
        }
        table.columns = this.render_columns(this.state.merge_index);
        table.data = table_data;
        table.pagination = this.page(quantity);
        return table;
    },
    render_columns(arr){
        var [head_columns, head_columns_key, table_head] = [this.state.head_columns, this.state.head_columns_key, []];
        for(var i in head_columns_key){
            table_head[i] = {};
            table_head[i]['title'] = head_columns[i][head_columns_key[i]];
            table_head[i]['dataIndex'] = head_columns_key[i];
            table_head[i]['key'] = head_columns_key[i];
            if(head_columns_key[i] == 'order_created_at'){
                table_head[i]['fixed'] = 'left';
                table_head[i]['render'] = function (value, row, index) {
                    var obj = {children: value, props: {}};
                    if(arr.length){
                                for(var i in arr) {
                                    if(arr[i].hasOwnProperty('start')){
                                        if (index == arr[i].start) {
                                            obj.props.rowSpan = arr[i].last - arr[i].start + 1;
                                        }
                                        for(var j=arr[i].start+1; j<=arr[i].last; j++) {
                                            if(index == j) {
                                                obj.props.rowSpan = 0;
                                            }
                                        }
                                    }
                                }
                            }
                    return obj;
                }
            }
            if(head_columns_key[i] == 'product_code' || head_columns_key[i] == 'product_name' ){
                table_head[i]['fixed'] = 'left';
            }
        }
        table_head.unshift({title: '', dataIndex: 'index', key: 'index'})
        {/* *****************列头拼接************************ */}
        return table_head;
    },
    page(amount_data){
        var [_this, start, end, days] = [this, this.state.start, this.state.end, 0]
        function getDays(time1, time2) {
            var [start, end] = [Date.parse(time1)/1000, Date.parse(time2)/1000];
            var diff = end - start;
            return (diff/(24 * 60 * 60)) + 1;
        }
        days = getDays(start, end) > 0 ? getDays(start, end) : 0;
        var obj = {
            pageSize: 1,
            total: 0,
            showTotal() {
                return `查询${days}天, 共${obj.total}条数据, 共1页`;
            },
            onChange: function(){},
            current: _this.state.currentPage,
            onShowSizeChange: function () {},
            showSizeChanger: true
        }
        obj.pageSize = this.state.pageSize;
        obj.total = amount_data;
        var page = Math.ceil(obj.total/obj.pageSize);
        obj.showTotal = function () {
            return `查询${days}天, 共${obj.total}条数据, 共${page}页`;
        };
        obj.onChange = _this.changePage;
        obj.onShowSizeChange = _this.onShowSizeChange
        return obj;
    },
    changePage(page){
        this.state.currentPage = page;
        var obj = this.common_ajax(page, false, false, this.state.pageSize);

        sessionStorage.setItem('page_4', page);
        sessionStorage.setItem('ajax_4', JSON.stringify(obj));

        PanDianAction.table(obj);
    },
    onShowSizeChange(current, pageSize){
        sessionStorage.setItem('page_4', current);
        sessionStorage.setItem('pageSize_4', pageSize);
        var obj = this.common_ajax(current, false, false, pageSize);
        sessionStorage.setItem('ajax_4', JSON.stringify(obj));
        this.state.pageSize = pageSize;
        PanDianAction.table(obj);
    },
    product_name(e){
        this.setState({
            product_name: e.target.value
        })
    },
    product_code(e){
        this.setState({
            product_code: e.target.value
        })
    }
});