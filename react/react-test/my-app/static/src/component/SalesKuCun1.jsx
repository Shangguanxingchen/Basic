/**
 * Created by zhousuyang on 16/12/13.
 */
import React from 'react'
import Reflux from 'reflux'
import {Row, Col, Input, Select, Checkbox, Radio, Icon, Button, Table, Switch, Spin ,DatePicker} from 'antd'
import moment from 'moment'
import 'antd/dist/antd.min.css'
import '../css/index.css'
import '../css/common.css'
const Option = Select.Option;
const RadioGroup = Radio.Group;
import $ from 'jquery'
import SalesKuCunAction1 from '../actions/SalesKuCunAction1'
import SalesKuCunStore1 from '../store/SalesKuCunStore1'

module.exports = React.createClass({
    mixins: [Reflux.listenTo(SalesKuCunStore1, 'onChangeStatus')],
    onChangeStatus(res, type){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        if(type == 'sum'){
            filter_condition[type].data = res.data;
            if(sessionStorage.getItem('2_2_filter_condition_sale')){
                filter_condition = JSON.parse(sessionStorage.getItem('2_2_filter_condition_sale'))
            }
            this.setState({
                filter_condition: filter_condition
            })
        }else if(type == 'store'){
            filter_condition[type].data = res.data;
            var shop_id = this.getShopId('shop_id=');
            if(type == 'store' && res.data[0].shop_id == shop_id){
                filter_condition.store.value = 0;
                filter_condition.store.text = res.data[0].shop_name;
            }
            if(sessionStorage.getItem('2_2_filter_condition_store')){
                filter_condition = JSON.parse(sessionStorage.getItem('2_2_filter_condition_store'))
            }
            this.setState({
                filter_condition: filter_condition
            })
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
                    if(dataSource[i-1]['stock_date'] == dataSource[i]['stock_date']){
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
                return <div>合计|<span style={{display: 'inline-block', margin: '0 20px'}}>销售数量: {res.data.sale_count_sum}</span> <span style={{display: 'inline-block', marginRight: '20px'}}>销售金额: {res.data.sale_amount_sum}</span> <span style={{display: 'inline-block', marginRight: '20px'}}>库存数量: {res.data.stock_count_sum}</span> <span style={{display: 'inline-block', marginRight: '20px'}}>库存金额: {res.data.stock_amount_sum}</span></div>;
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
        }
        return table_head;
    },
    changePage(page){
        this.state.pagination.current = page;
        var obj = this.ajax();
        this.setState({
          loading: true
        })
        sessionStorage.setItem('2_2_current_sale', page);
        sessionStorage.setItem('2_2_obj', JSON.stringify(obj));
        SalesKuCunAction1.table(obj, 'table')
    },
    onShowSizeChange(current, pageSize){
        this.state.pagination.current = current;
        this.state.pagination.pageSize = pageSize;
        var obj = this.ajax();
        this.setState({
           loading: true
        })
        sessionStorage.setItem('2_2_pageSize_sale', pageSize);
        sessionStorage.setItem('2_2_obj', JSON.stringify(obj));
        SalesKuCunAction1.table(obj, 'table')
    },
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
        var start_date = sessionStorage.getItem('2_2start') ? sessionStorage.getItem('2_2start') : '';
        var end_date = sessionStorage.getItem('2_2end') ? sessionStorage.getItem('2_2end') : '';
        var pageSize = sessionStorage.getItem('2_2_pageSize_sale') ? JSON.parse(sessionStorage.getItem('2_2_pageSize_sale')) : 20;
        var current = sessionStorage.getItem('2_2_current_sale') ? JSON.parse(sessionStorage.getItem('2_2_current_sale')) : 1;
        var with_the_mount = sessionStorage.getItem('with_the_mount_kucun') ? JSON.parse(sessionStorage.getItem('with_the_mount_kucun')) : true;
        return {
            height: 0, //condition
            height1: 0, //merge
            has_data: false, //点击查询, 有数据,条件合并;无数据,条件展开并且显示无匹配条件
            expand: true, //点击展开条件筛选
            init: {show: true, text: '请筛选条件并[查询]统计结果', footer: '共0条'},
            result: {show: false, text: '没有与条件匹配的结果', footer: '共0条'},
            after_search: false,
            loading: false,
            spin: false,
            is_desc: true,


            mask: false,
            which: '', //点击的是哪个筛选条件

            with_the_mount: with_the_mount, //销售为零

            start_date: start_date, //日期
            end_date: end_date, //日期

            filter_condition: {
                sum: {data: [], value: 0, text: '品牌'},
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
        var G_day = String(myDate.getDate()).length == 1 ? '0'+ (myDate.getDate()) : myDate.getDate();
          dateTemp = G_month+"-"+ G_day;
          dateArray.push(dateTemp);
      }
      if(Number(G_day) >= 25 ){
        date_start = Years + '-' + dateArray[0];
      }else{
        date_start = Year + '-' + dateArray[0];
      }
      let [date_end] = [Year + '-' + Month + '-' + Day];
      if(sessionStorage.getItem('2_2start')){
          date_start = sessionStorage.getItem('2_2start')
      }
      if(sessionStorage.getItem('2_2end')){
          date_end = sessionStorage.getItem('2_2end')
      }
      var shop_id = this.getShopId('shop_id=');
      var user_id = this.getShopId('user_id=');
      SalesKuCunAction1.sum('sum');
      SalesKuCunAction1.store({shop_id: shop_id, user_id: user_id},'store');
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
        if(sessionStorage.getItem('2_2_obj')){
          var obj = JSON.parse(sessionStorage.getItem('2_2_obj'));
          SalesKuCunAction1.table(obj,'table');
        }

        // 排序
        var str = 'th.price,th.sale_count, th.sale_amount,th.stock_count,th.stock_amount';
        this.click_sort(str);
    },
    onStartChange(date, dateString){
        sessionStorage.setItem('2_2start', dateString)
        this.setState({
            start_date: dateString
        })
    },
    onEndChange(date, dateString){
        sessionStorage.setItem('2_2end', dateString)
        this.setState({
            end_date: dateString
        })
    },
    render(){
        var {pro_code, pagination, table, store_bg, spin, loading, expand, after_search, height, height1, init, result, mask, which, filter_condition, has_data,product_code, with_the_mount} = this.state;
        var hh = 0, y = 0, format = 'YYYY-MM-DD';
        if(expand){
            hh = height;
            y = height - 190;//condition
        }else{
            hh = height1;
            y = height1 - 190;//merge
        }
        var x = table.columns.length * 200;
        var style = {height: hh};
        let [start_date, end_date, condition, text] =
          [this.state.start_date, this.state.end_date, this.props.condition, this.state.text];
        return (
           <Spin spinning={spin}>
            <div>
                <div className={after_search ? "hide condition" : "show condition"}>
                    <Row>
                        <Col span={12}>
                            <div className="common"> {/*店仓*/}
                                <span className="first" data-type="store" onClick={this.handleClick}>店仓: </span>
                                <span className="second" data-type="store" onClick={this.handleClick}>
                                    {filter_condition.store.text}
                                </span><Icon type="right"/>
                            </div>
                        </Col>
                        <Col span={12} className='select_date'>
                            <div className="date_time"><DatePicker defaultValue={moment(start_date, 'YYYY-MM-DD')} onChange={this.onStartChange}/><span className="date_line">-</span><DatePicker defaultValue={moment(end_date, 'YYYY-MM-DD')} onChange={this.onEndChange}/></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="common">
                                <span className="first" data-type="sum" onClick={this.handleClick}>汇总: </span><span className="second" data-type="sum" onClick={this.handleClick}>
                                {filter_condition.sum.text}
                                </span><Icon type="right"/>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="common product_code_wrap" style={{width:'90%',marginLeft:0}}>  {/*物品代码*/}
                                <span className="product_code_input"><Icon type="search" className="seach_icon" />
                              <Input value={product_code} onChange={this.handleProductCode} style={{borderRadius:'0',height:'35px',boxShadow:'none'}} placeholder="搜索商品编码"/></span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="common checkbox_single">
                                <Checkbox onChange={this.handleTheMount} checked={with_the_mount}>销售为零</Checkbox>
                            </div>
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
                  <Table scroll={{x:x,y:y}} style={style} loading={loading} bordered pagination={pagination} dataSource={table.dataSource} columns={table.columns} footer={table.footer}/>

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
    handleTheMount(){
        var {with_the_mount} = this.state;
        with_the_mount = !with_the_mount;
        sessionStorage.setItem('with_the_mount_kucun', with_the_mount)
        this.setState({
            with_the_mount: with_the_mount
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
    text_store(type){
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
    filterContext(which){
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
                        {(which == 'kind') ? <span data-type={which} className="has_selected">(已选 {this.selectedNums(which)})<Checkbox checked={filter_condition[which].select_all} onClick={this.selectAll} /></span> : ''}
                    </div>
                    <ul>
                        {this.filterContextBody(which)}
                    </ul>
                </div>
            </div>
        }
    },
    filterContextBody(which){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        var element = null;
        if(which == 'sum'){
             element = <RadioGroup className="sum" value={filter_condition[which].value} onChange={this.sumLevelRadio}>
                {
                    filter_condition[which].data.map((item, index) => {
                        return <Radio key={index} style={{display: 'block'}} value={index}>
                            {item[conditionContent[which].name]}
                        </Radio>
                    })
                }
            </RadioGroup>
        }else if(which == 'store'){
            element = <RadioGroup className="sum" value={filter_condition[which].value} onChange={this.storeLevelRadio}>
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
    sumLevelRadio(e){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        filter_condition.sum.value = e.target.value;
        filter_condition.sum.text = filter_condition.sum.data[parseInt(e.target.value)][conditionContent.sum.name]
        sessionStorage.setItem('2_2_filter_condition_sale', JSON.stringify(filter_condition))
        this.setState({
            filter_condition: filter_condition
        })
    },
    storeLevelRadio(e){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        filter_condition.store.value = e.target.value;
        filter_condition.store.text = filter_condition.store.data[parseInt(e.target.value)][conditionContent.store.name]
        sessionStorage.setItem('2_2_filter_condition_store', JSON.stringify(filter_condition))
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
        sessionStorage.setItem('2_2_filter_condition_sale', JSON.stringify(filter_condition))
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
        sessionStorage.setItem('2_2_filter_condition_sale', JSON.stringify(filter_condition))
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
        sessionStorage.setItem('2_2_filter_condition_sale', JSON.stringify(filter_condition))
        this.setState({
            filter_condition: filter_condition
        })
    },
    search(){
        var result = this.ajax();
        app.piwik_push(this.props.route.title + '(查询)');
        sessionStorage.setItem('2_2_obj', JSON.stringify(result));
        this.setState({
            spin: true
        })
        SalesKuCunAction1.table(result, 'table');
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
        sessionStorage.setItem('product_code_sale_kucun', e.target.value);
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
    sort(type){
      // var {is_desc} = this.state;
      var obj = this.ajax();
      // obj.order_by = type;
      // obj.is_desc = Number(is_desc);
      sessionStorage.setItem('2_2_obj', JSON.stringify(obj));
      SalesKuCunAction1.table(obj, 'table');
    },
    ajax(){
        var obj = {};
        var shop_id = this.getShopId('shop_id=');
        var {conditionContent} = this.props;
        var {product_code,pagination, start_date, end_date, filter_condition, order_by, is_desc,with_the_mount} = this.state;
        obj.limit = pagination.pageSize;
        obj.current_page = pagination.current;
        obj.start_date = start_date;
        obj.show_empty_sale = Number(with_the_mount);
        obj.end_date = end_date;
        obj.product_code = product_code;
        // obj.with_the_mount = Number(with_the_mount);
        // obj.shop_ids = [shop_id];
        if(typeof(filter_condition.sum.value) == 'number'){
            obj.group_level = filter_condition.sum.data[filter_condition.sum.value][conditionContent.sum.id];
        }
        if(typeof(filter_condition.store.value) == 'number'){
            obj.shop_id = filter_condition.store.data[filter_condition.store.value][conditionContent.store.id];
        }
        if(order_by){
            obj.order_by = order_by
            obj.is_desc = Number(is_desc);
        }
        sessionStorage.setItem('2_2start',this.state.start_date);
        sessionStorage.setItem('2_2end',this.state.end_date);
        return obj;
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
        var {conditionContent} = this.props;
        var str = '条件:  ', store_i = 0;
        str += start_date + '至' + end_date + '; ';
        if(filter_condition.sum.text){
            str += filter_condition.sum.text + '; ';
        }
        if(filter_condition.store.text){
            str += filter_condition.store.text + '; ';
        }
        if(sessionStorage.getItem('with_the_mount_kucun') == 'true'){
            str += '销售为零';
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