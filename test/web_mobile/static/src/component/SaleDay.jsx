/**
 * Created by zhousuyang on 16/12/13.
 */
import React from 'react'
import Reflux from 'reflux'
import moment from 'moment'
import {Row, Col, Input, Select, DatePicker, Checkbox, Radio, Icon, Button, Table, Switch} from 'antd'
import 'antd/dist/antd.min.css'
import '../css/index.css'
import '../css/common.css'
const Option = Select.Option;
const RadioGroup = Radio.Group;
import $ from 'jquery'
import SaleDayAction from '../actions/SaleDayAction'
import SaleDayStore from '../store/SaleDayStore'

module.exports = React.createClass({
    mixins: [Reflux.listenTo(SaleDayStore, 'onChangeStatus')],
    onChangeStatus(res, type){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        if(type == 'store'){
            filter_condition[type].data = res.data;
            var shop_id = this.getShopId('shop_id=');
            // for(var i=0; i<res.data.length; i++){
            //     filter_condition[type].checked[i] = false;
            //     filter_condition[type].text[i] = '';
            // }
            if(res.data[0].shop_id == shop_id){
                filter_condition[type].checked[0] = true;
                filter_condition[type].text[0] = res.data[0][conditionContent[type].name];
            }else{
                filter_condition[type].checked[0] = false;
                filter_condition[type].text[0] = '';
            }
            if(filter_condition[type].checked.indexOf(false) > -1){
                filter_condition[type].select_all = false;
            }else{
                filter_condition[type].select_all = true;
            }
        }else if(type == 'table'){
            var head_columns = res.data.table_headers;
            var head_columns_key = [], array = [];
            var dataSource = res.data.records;
            var nums = 0, index_count=0;
            var render_data = [];
            var {result, after_search, has_data, init, expand} = this.state;
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
                spin: false
            })
            render_data[index_count] = {};
            for(var i in head_columns){
                for(var j in head_columns[i]){
                    head_columns_key.push(j);
                }
            }
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
            //获取相同数据的首尾索引号
            if(dataSource.length>1){
                for(var i=1; i<dataSource.length; i++) {
                    if(dataSource[i-1]["ticket_no"] == dataSource[i]["ticket_no"]){
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
            this.table(res, array, render_data, head_columns, head_columns_key);
        }
    },
    //处理表格数据
    table(res, array, render_data, head_columns, head_columns_key){
        var {table, pagination} = this.state;
        table.dataSource = array;
        table.footer = function () {
            if(res.data.records.length){
                return <div>合计 |<span style={{display: 'inline-block', margin: '0 20px'}}>总数: {res.data.sum_sale_count}</span><span style={{display: 'inline-block', margin: '0 20px'}}>总金额: {res.data.sum_sale_amount}</span><span style={{display: 'inline-block', margin: '0 20px'}}>平均折扣: {res.data.avg_discount}</span></div>;
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
    render_columns(arr, head_columns, head_columns_key){
        var table_head = [];
        for(var i in head_columns_key){
            table_head[i] = {};
            table_head[i]['width'] = 200;
            if(i == 0){
                table_head[i]['fixed'] = 'left';
            }

            table_head[i]['title'] = head_columns[i][head_columns_key[i]];
            table_head[i]['dataIndex'] = head_columns_key[i];
            table_head[i]['key'] = head_columns_key[i];
            table_head[i]['className'] = head_columns_key[i];


            //合并
            if(head_columns_key[i] == 'card' || head_columns_key[i] == 'cash_ticket'
                || head_columns_key[i] == 'company_card' || head_columns_key[i] == 'coupon'
                || head_columns_key[i] == 'alipay' || head_columns_key[i] == 'wechat'
                || head_columns_key[i] == 'sale_man' || head_columns_key[i] == 'ticket_no'
                || head_columns_key[i] == 'sale_type' || head_columns_key[i] == 'is_makeup'
                || head_columns_key[i] == 'origin_order_no' || head_columns_key[i] == 'cash'
                || head_columns_key[i] == 'sum_amount'
            ){
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
        }
        return table_head;
    },
    changePage(page){
        this.state.pagination.current = page;
        var obj = this.ajax();
        this.setState({
            loading: true
        })
        sessionStorage.setItem('2_5_current', page);
        sessionStorage.setItem('2_5_obj', JSON.stringify(obj));
        SaleDayAction.table(obj, 'table')
    },
    onShowSizeChange(current, pageSize){
        this.state.pagination.current = current;
        this.state.pagination.pageSize = pageSize;
        var obj = this.ajax();
        this.setState({
            loading: true
        })
        sessionStorage.setItem('2_5_pageSize', pageSize);
        sessionStorage.setItem('2_5_obj', JSON.stringify(obj));
        SaleDayAction.table(obj, 'table')
    },
    getDefaultProps(){
        return {
            //title: 标题, h_title: 二级标题(提示文字), id: 后台的id属性名, name: 后台的name属性名, bar_code: 店仓的bar_code值(目前未用到此属性)
            conditionContent: {
                store: {
                    title: false,
                    h_title: '*请选择查询店仓, 可多选',
                    id: 'shop_id',
                    code: 'shop_code',
                    name: 'shop_name',
                },
            }
        }
    },
    getInitialState(){
        var start_date = sessionStorage.getItem('2_5_start_date') ? sessionStorage.getItem('2_5_start_date') : '';
        var end_date = sessionStorage.getItem('2_5_end_date') ? sessionStorage.getItem('2_5_end_date') : '';
        var pageSize = sessionStorage.getItem('2_5_pageSize') ? JSON.parse(sessionStorage.getItem('2_5_pageSize')) : 20;
        var current = sessionStorage.getItem('2_5_current') ? JSON.parse(sessionStorage.getItem('2_5_current')) : 1;
        var product_code = sessionStorage.getItem('2_5_product_code') ? sessionStorage.getItem('2_5_product_code') : '';
        return {
            height: 0, //condition
            height1: 0, //merge
            has_data: false, //点击查询, 有数据,条件合并;无数据,条件展开并且显示无匹配条件
            expand: true, //点击展开条件筛选
            init: {show: true, text: '请筛选条件并[查询]统计结果', footer: '共0条'},
            result: {show: false, text: '没有与条件匹配的结果', footer: '共0条'},
            after_search: false,
            store_input_text: '',  //店仓中搜索匹配内容的输入文字
            store_bg: false, //店仓中搜索匹配的控制状态码

            mask: false,
            which: '', //点击的是哪个筛选条件

            start_date: start_date, //日期
            end_date: end_date, //日期

            product_code: product_code,

            filter_condition: {
                store: {data: [], checked: [], text: [], select_all: false},
            },

            table: {
                columns: [],
                dataSource: [],
                footer(){
                    return '';
                },
                merge_index: []
            },
            pagination: {
                pageSize: pageSize,
                total: 0,
                showTotal(){
                    return ''
                },
                onChange: function () {},
                current: current,
                onShowSizeChange: function () {},
                showSizeChanger: true
            },
            is_desc: true,
            loading: false,
            spin: false,
            order_by: ''
        }
    },
    componentWillMount(){
      //获取前一周的日期
      var myDate = new Date(); //获取今天日期
      myDate.setDate(myDate.getDate() - 7);
      var dateArray = [];
      var dateTemp = '',date_start;
      let [Year,Years, Month, Day] = [new Date().getFullYear(),new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
      Month = String(Month).length == 1 ? ('0' + Month) : Month;
      Day = String(Day).length == 1 ? ('0' + Day) : Day;
      for (var i = 0; i < 7; i++) {
        var G_month =  String(myDate.getMonth()+1).length == 1 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1;
        var G_day = String(myDate.getDate()).length == 1 ? '0'+(myDate.getDate()) : myDate.getDate();
          dateTemp = G_month+"-"+ G_day;
          dateArray.push(dateTemp);
      }
      if(Number(G_day) >= 25 ){
        date_start = Years + '-' + dateArray[0];
      }else{
        date_start = Year + '-' + dateArray[0];
      }
      [date_start] = [Year + '-' + Month + '-' + Day];
      let [date_end] = [Year + '-' + Month + '-' + Day];
      if(sessionStorage.getItem('2_5_start_date')){
          date_start = sessionStorage.getItem('2_5_start_date')
      }
      if(sessionStorage.getItem('2_5_end_date')){
          date_end = sessionStorage.getItem('2_5_end_date')
      }
      this.setState({
        start_date: date_start,
        end_date: date_end,
      })

    },
    componentDidMount(){
        var height1 = document.body.clientHeight - document.querySelector('.nav_header').offsetHeight - document.querySelector('.merge').offsetHeight;
        var height = document.body.clientHeight - document.querySelector('.nav_header').offsetHeight - document.querySelector('.condition').offsetHeight;
        $(function () {
            FastClick.attach(document.body);
        });
        this.setState({
            height: height, //condition
            height1: height1, //merge
        })
        var shop_id = this.getShopId('shop_id=');
        var user_id = this.getShopId('user_id=');

        SaleDayAction.store({shop_id: shop_id, user_id: user_id},'store');
        if(sessionStorage.getItem('2_5_obj')){
            var obj = JSON.parse(sessionStorage.getItem('2_5_obj'));
            SaleDayAction.table(obj,'table');
        }
        var str = 'th.index,th.sale_count,th.sale_price,th.discount_ratio,th.real_amount,th.sum_amount,th.cash,th.card,th.cash_ticket,th.company_card,th.coupon,th.alipay,th.wechat';
        this.click_sort(str);
    },
    onStartChange(date, dateString){
        sessionStorage.setItem('2_5_start_date', dateString)
        this.setState({
            start_date: dateString
        })
    },
    onEndChange(date, dateString){
        sessionStorage.setItem('2_5_end_date', dateString)
        this.setState({
            end_date: dateString
        })
    },
    render(){
        var {after_search, has_data, store_bg,start_date, end_date, mask, which, filter_condition, product_code, with_the_mount, init, result, expand, height, height1, pagination, table} = this.state;
        var hh = 0, y = 0, format = 'YYYY-MM-DD';
        if(expand){
            hh = height;
            y = height - 190;//condition
        }else{
            hh = height1;
            y = height1 - 190;//merge
        }
        var x = table.columns.length * 200;
        var style = {height: hh}
        return (
            <div>
                <div className={after_search ? "hide condition" : "show condition"}>
                    <Row>
                        <Col span={12}>
                            <div className="common">
                                <span className="first" data-type="store" onClick={this.handleClick}>店仓: </span>
                                <span className="second" data-type="store" onClick={this.handleClick}>
                                    {this.text_store('store') ? this.word_content('store') : ''}
                                </span><Icon type="right"/>
                            </div>
                        </Col>
                        <Col span={12} className='select_date'>
                            <div className="date_time"><DatePicker defaultValue={moment(start_date, format)} onChange={this.onStartChange}/><span className="date_line">-</span><DatePicker defaultValue={moment(end_date, format)} onChange={this.onEndChange}/></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div></div>
                        </Col>
                        <Col span={12}>
                            <div className="common button" style={{textAlign:'right'}}>
                                <Button type='primary' onClick={this.search}>查询</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={has_data && after_search ? "show merge" : "hide merge"} onClick={this.expandCondition}>
                    {this.mergeResult()}
                    <Icon type="ellipsis" onClick={this.expandCondition} />
                </div>
                <div style={style} className={init.show ? 'show init_result' : 'hide init_result'}> {/*初始*/}
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
                <div style={style} className={result.show && !has_data ? 'show init_result' : 'hide init_result'}> {/*搜索后的状态*/}
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
                <div className={has_data ? 'table show' : 'table hide'}>
                    <Table scroll={{x:x,y:y}} bordered pagination={pagination} dataSource={table.dataSource} columns={table.columns} footer={table.footer}/>
                </div>
                {/*黑色背景弹框*/}
                <div className={mask ? "active modal_condition" : "modal_condition"}>
                    <div className="popup_box" onClick={this.hideFilterBody}></div>
                    <div className="right_box">
                        {this.filterContext(which)}
                    </div>
                </div>
            </div>
        )
    },
    word_content(type){
        var {filter_condition} = this.state;
        var array = [];
        for(var i in filter_condition[type].text){
            if(filter_condition[type].text[i]){
                array.push(filter_condition[type].text[i]);
            }
        }
        return array.join('/');
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
    text_kind_all(type){
        var {filter_condition} = this.state;
        var init = true;
        for(var i in filter_condition[type].checked){
            if(filter_condition[type].checked[i]){
                continue;
            }else{
                init = false;
            }
        }
        return init;
    },
    text_store(type){
        var {filter_condition} = this.state;
        for(var i in filter_condition[type].checked){
            if(filter_condition[type].checked[i]){
                return true
            }
        }
        return false
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
    filterStoreContextBody(str, type){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        var array = [];
        if(str.trim()){
            for(var i in filter_condition[type].data){
                if(filter_condition[type].data[i][conditionContent[type].name].indexOf(str)!=-1){
                    array.push({
                        index: i, //对应于原数据中的索引
                        data: filter_condition[type].data[i]
                    })
                }
            }
        }
        var element = array.map((item, index) => {
            return <li key={index} data-index={item.index} onClick={this.handleCheckboxLi} data-type={type} data-text={item.data[conditionContent[type].name]}>
                    {item.data[conditionContent[type].name]} <Checkbox onClick={this.handleCheckbox} checked={filter_condition[type].checked[item.index]} />
                </li>
        })
        if(array){
            element.unshift(<li key='special'>共{array.length}条数据符合, 请选择</li>)
        }
        return element;
    },
    storeInputText(e){
        this.setState({
            store_input_text: e.target.value
        })
    },
    searchStore(){
        var {store_input_text} = this.state;
        if(store_input_text){
            this.setState({
                // store_input_text: '',
                store_bg: true
            })
        }
    },
    cleanInputText(e){
        e.target.parentNode.querySelector('.ant-input').value = '';
        this.setState({
            store_input_text: ''
        })
    },
    close_store_bg(){
        this.setState({
            store_bg: false
        })
    },
    filterContext(which){
        var {store_bg, store_input_text} = this.state;
        if (which) {
            var conditionContent = this.props.conditionContent[which];
            var {filter_condition} = this.state;
            return <div className="filter_wrap">
                <div className="filter_top">
                    <Icon type="left" onClick={this.close} />{conditionContent.title}<a onClick={this.close}>完成</a>
                </div>
                <div className="filter_body">
                    <div>
                        {conditionContent.h_title} <br/>
                    </div>
                    <ul>
                        {this.filterContextBody(which)}
                    </ul>
                </div>
                <div className={store_bg ? 'show filter_body' : 'hide filter_body'}>
                    <ul>
                        {this.filterStoreContextBody(store_input_text, 'store')}
                    </ul>
                </div>
            </div>
        }
    },
    filterContextBody(which){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        var element = null;
        if(which == 'store'){
            element = filter_condition[which].data.map((item, index)=>{
                return <li key={index} data-index={index} onClick={this.handleCheckboxLi} data-type={which} data-text={item[conditionContent[which].name]}>
                    {which == 'store' ? '['+item[conditionContent[which].code]+']  ' : ''}{item[conditionContent[which].name]} <Checkbox onClick={this.handleCheckbox} checked={filter_condition[which].checked[index]} />
                </li>
            })
        }
        return element;
    },
    storeLevelRadio(e){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        filter_condition.store.value = e.target.value;
        filter_condition.store.text = filter_condition.store.data[parseInt(e.target.value)][conditionContent.store.name]
        sessionStorage.setItem('2_5_filter_condition', JSON.stringify(filter_condition))
        this.setState({
            filter_condition: filter_condition
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
    handleCheckbox(e){
        e.stopPropagation();
        var obj = e.target.parentNode.parentNode.parentNode.dataset;
        var {filter_condition} = this.state;
        filter_condition[obj.type].checked[obj.index] = !filter_condition[obj.type].checked[obj.index];
        if(filter_condition[obj.type].checked[obj.index]){
            filter_condition[obj.type].text[obj.index] = obj.text;
        }else{
            filter_condition[obj.type].text[obj.index] = '';
        }
        if(filter_condition[obj.type].checked.indexOf(false)>-1){
            filter_condition[obj.type].select_all = false
        }else{
            filter_condition[obj.type].select_all = true
        }
        sessionStorage.setItem('filter_condition_store_kucun', JSON.stringify(filter_condition));
        this.setState({
            filter_condition: filter_condition
        })
    },
    handleCheckboxLi(e){
        e.stopPropagation();
        var obj = e.target.dataset;
        var {filter_condition} = this.state;
        filter_condition[obj.type].checked[obj.index] = !filter_condition[obj.type].checked[obj.index];
        if(filter_condition[obj.type].checked[obj.index]){
            filter_condition[obj.type].text[obj.index] = obj.text;
        }else{
            filter_condition[obj.type].text[obj.index] = '';
        }
        if(filter_condition[obj.type].checked.indexOf(false)>-1){
            filter_condition[obj.type].select_all = false
        }else{
            filter_condition[obj.type].select_all = true
        }
        sessionStorage.setItem('filter_condition_store_kucun', JSON.stringify(filter_condition));
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
        sessionStorage.setItem('2_5_filter_condition', JSON.stringify(filter_condition))
        this.setState({
            filter_condition: filter_condition
        })
    },
    handleClick(e){
        this.setState({
            mask: true,
            which: e.target.dataset.type
        })
    },
    search(){
        var result = this.ajax();
        app.piwik_push(this.props.route.title + '(查询)');
        sessionStorage.setItem('2_5_obj', JSON.stringify(result));
        SaleDayAction.table(result, 'table');
    },
    expandCondition(){
        var {init, result} = this.state;
        init.show = false;
        result.show = false;
        this.setState({
            has_data: true,
            after_search: false,
            init: init,
            result: result,
            expand: true,
        })
    },
    handleProductCode(e){
        sessionStorage.setItem('2_5_product_code', e.target.value);
        this.setState({
            product_code: e.target.value
        })
    },
    close(){
        this.setState({
            mask: false
        })
    },
    hideFilterBody(){
        this.setState({
            mask: false
        })
    },
    ajax(){
        var obj = {};
        var shop_ids = [];
        var shop_id = this.getShopId('shop_id=');
        var {conditionContent} = this.props;
        var {pagination, start_date,order_by,is_desc, end_date, filter_condition} = this.state;
        obj.limit = pagination.pageSize;
        obj.current_page = pagination.current;
        obj.start_date = start_date;
        obj.end_date = end_date;
        for(var i in filter_condition.store.checked){
            if(filter_condition.store.checked[i]){
                shop_ids.push(filter_condition.store.data[i][conditionContent.store.id])
            }
        }
        if(!shop_ids.length){
            shop_ids.push(shop_id);
        }
        if(order_by){
            obj.order_by = order_by
            obj.is_desc = Number(is_desc);
        }
        obj.shop_ids = shop_ids;
        return obj;
    },
    sort(type){
        var obj = this.ajax();
        sessionStorage.setItem('2_5_obj', JSON.stringify(obj));
        SaleDayAction.table(obj, 'table');
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
    mergeResult(){
        var {product_code, filter_condition, start_date, end_date} = this.state;
        var str = '', kind_i = 0,store_i = [];
        str += '日期: ' + start_date + '至' + end_date + '; ';
        if(store_i.length > 1){
            str += '已选店仓: ' + store_i.length + '个;   ';
        }else if(store_i.length == 1){
            str += '[' + filter_condition.store.data[store_i[0]][conditionContent.store.code] + '];   '
        }

        
        return str;
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
})