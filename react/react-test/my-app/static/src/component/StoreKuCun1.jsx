/**
 * Created by zhousuyang on 16/12/10.
 */
import React from 'react'
import Reflux from 'reflux'
import {Row, Col, Input, Select, Checkbox, Radio, Icon, Button, Table, Switch, Spin} from 'antd'
import 'antd/dist/antd.min.css'
import '../css/index.css'
import '../css/common.css'
const Option = Select.Option;
const RadioGroup = Radio.Group;
import $ from 'jquery'

import StoreKuCunAction1 from '../actions/StoreKuCunAction1'
import StoreKuCunStore1 from '../store/StoreKuCunStore1'

module.exports = React.createClass({
    mixins: [Reflux.listenTo(StoreKuCunStore1, 'onChangeStatus')],
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
                kind: {
                    title: '分类',
                    h_title: '*请选择统计分类',
                    id: 'type_code',
                    name: 'type_name',
                },
                range: {
                    title: '范围',
                    h_title: '*请选择存储统计范围',
                    id: 'id',
                    name: 'name',
                },
            }
        }
    },
    onChangeStatus(res, type){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        if(type == 'sum'){
            filter_condition[type].data = res.data;
        }else if(type == 'store'){
            filter_condition[type].data = res.data;
            var shop_id = this.getShopId('shop_id=');
            for(var i=0; i<res.data.length; i++){
                filter_condition[type].checked[i] = false;
                filter_condition[type].text[i] = '';
            }
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
        }else if(type == 'kind'){
            filter_condition[type].data = res.data;
            for(var i=0; i<res.data.length; i++){
                filter_condition[type].checked[i] = true;
                filter_condition[type].text[i] = res.data[i][conditionContent[type].name];
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
        if(sessionStorage.getItem('filter_condition_store_kucun')){
            filter_condition = JSON.parse(sessionStorage.getItem('filter_condition_store_kucun'))
        }
        this.setState({
            filter_condition: filter_condition
        })
    },
    getInitialState(){
        var obj = {
            list: [
                {text: '正', checked: true, custom: 'positive'},
                {text: '0', checked: false, custom: 'zero'},
                {text: '负', checked: true, custom: 'negative'},
                {text: '自定义'},
            ],
            single: true, //true,复选框    false,自定义
        };
        var pageSize = sessionStorage.getItem('pageSize_store_kucun') ? JSON.parse(sessionStorage.getItem('pageSize_store_kucun')) : 20;
        var current = sessionStorage.getItem('current_store_kucun') ? JSON.parse(sessionStorage.getItem('current_store_kucun')) : 1;
        var range = sessionStorage.getItem('range_store_kucun') ? JSON.parse(sessionStorage.getItem('range_store_kucun')) : obj;
        var merge_range_start = sessionStorage.getItem('merge_range_start_store_kucun') ? JSON.parse(sessionStorage.getItem('merge_range_start_store_kucun')) : '';
        var merge_range_end = sessionStorage.getItem('merge_range_end_store_kucun') ? JSON.parse(sessionStorage.getItem('merge_range_end_store_kucun')) : '';
        return {
            mask: false,
            which: '', //点击的是哪个筛选条件
            pro_code: {
                current: 'product_code',
                total: [
                    {key: 'product_code', text: '商品编码'},
                    {key: 'code', text: '条形码'}
                ],
                value: '', //记录输入框的搜索字符
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
            filter_condition: {
                sum: {data: [], value: 0, text: '品牌'},
                store: {data: [], checked: [], text: [], select_all: false},
                kind: {data: [], checked: [], text: [], select_all: false},
            },
            switch_check: false,
            range: range,
            range_start: '',
            range_end: '',

            merge_range_start: merge_range_start,  //展示在搜索结果的标题中   自定义起始
            merge_range_end: merge_range_end,  //展示在搜索结果的标题中   自定义结束

            height: 0,
            height1: 0,
            has_data: false, //点击查询, 有数据,条件合并;无数据,条件展开并且显示无匹配条件
            expand: true, //点击展开条件筛选
            init: {show: true, text: '请筛选条件并[查询]统计结果', footer: '共0条'},
            result: {show: false, text: '没有与条件匹配的结果', footer: '共0条'},
            after_search: false,

            store_input_text: '',  //店仓中搜索匹配内容的输入文字
            store_bg: false, //店仓中搜索匹配的控制状态码

            loading: false,
            spin: false,
            is_desc: true,
            order_by: ''
        }
    },
    componentWillMount(){
        var shop_id = this.getShopId('shop_id=');
        var user_id = this.getShopId('user_id=');
        StoreKuCunAction1.sum('sum');
        StoreKuCunAction1.store({shop_id: shop_id, user_id: user_id},'store');
        StoreKuCunAction1.kind('kind');
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
        var {height, height1, has_data, pagination} = this.state;
        height1 = document.body.clientHeight - document.querySelector('.nav_header').offsetHeight - document.querySelector('.merge').offsetHeight;
        height = document.body.clientHeight - document.querySelector('.nav_header').offsetHeight - document.querySelector('.condition').offsetHeight;
        $(function () {
            FastClick.attach(document.body);
        });
        // var shop_id = this.getShopId('shop_id=');
        // var user_id = this.getShopId('user_id=');
        // var obj = {};
        // obj.shop_ids = [shop_id];
        // obj.current_page = pagination.current;
        // obj.limit = pagination.pageSize;
        // StoreKuCunAction1.table(obj, 'table');
        this.setState({
            height: height, //condition
            height1: height1, //merge
        })
        if(sessionStorage.getItem('ajax_store_kucun')){
            var obj = JSON.parse(sessionStorage.getItem('ajax_store_kucun'));
            StoreKuCunAction1.table(obj, 'table');
        }
        this.click_sort('th.stock_amount, th.product_code, th.size, th.stock_count, th.stock_date');
    },
    render(){
        var {pro_code, pagination, table, store_bg, spin, loading, expand, after_search, height, height1, init, result, mask, which, filter_condition, has_data} = this.state;
        var hh = 0, y = 0;
        if(expand){
            hh = height;
            y = height - 190;//condition
        }else{
            hh = height1;
            y = height1 - 190;//merge
        }
        var x = table.columns.length * 200;
        var style = {height: hh}
        var selectBefore = (
            <Select onChange={this.selectChange} value={pro_code.current}>
                <Option value={pro_code.total[0].key}>{pro_code.total[0].text}</Option>
                <Option value={pro_code.total[1].key}>{pro_code.total[1].text}</Option>
            </Select>
        );
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
                        <Col span={12}>
                            <div className="common">
                                <span className="first" data-type="store" onClick={this.handleClick}>店仓: </span>
                                <span className="second" data-type="store" onClick={this.handleClick}>
                                    {this.text_store('store') ? this.word_content('store') : ''}
                                </span><Icon type="right"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="common">
                                <span className="first" data-type="range" onClick={this.handleClick}>范围: </span><span className="second" data-type="range" onClick={this.handleClick}>{this.text_range('range')}</span><Icon type="right"/>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="common">
                                <span className="first" data-type="kind" onClick={this.handleClick}>分类: </span><span className="second" data-type="kind" onClick={this.handleClick}>{this.text_kind_all('kind') ? '全部' : this.text_kind('kind') ? this.word_content('kind') : ''}</span><Icon type="right"/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="common special">
                                <Icon type="search" className={pro_code.value.trim() ? 'hide i' : 'show i'} />
                                <Input onChange={this.searchCode} placeholder="搜索" addonBefore={selectBefore}/>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="common button">
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
                    <Icon type="left" onClick={this.close} />{conditionContent.title ? conditionContent.title : <span className="search_store"><Input placeholder="搜索" onChange={this.storeInputText} /><Icon type="search" className="search_icon" onClick={this.searchStore} />{store_input_text ? <Icon type="close-circle-o" onClick={this.cleanInputText} /> : ''}</span>}
                    {store_bg ? <a onClick={this.close_store_bg}>确定</a> :  <a onClick={this.close}>完成</a>}
                </div>
                <div className={store_bg ? "hide filter_body" : "show filter_body"}>
                    <div>
                        {conditionContent.h_title} <br/>
                        {(which == 'store' || which == 'kind') ? <span data-type={which} className="has_selected">(已选 {this.selectedNums(which)})<Checkbox checked={filter_condition[which].select_all} onClick={this.selectAll} /></span> : ''}
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
    filterContextBody(which){
        var {range, filter_condition} = this.state;
        var {conditionContent} = this.props;
        var element = null;
        if(which == 'range'){
            element = range.list.map((item, index) => {
                if(item.hasOwnProperty('custom')){
                    return <li key={index} data-index={index} onClick={this.onCustomCheckboxClickLi}>
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
        }else if(which == 'store' || which == 'kind'){
            element = filter_condition[which].data.map((item, index)=>{
                return <li key={index} data-index={index} onClick={this.handleCheckboxLi} data-type={which} data-text={item[conditionContent[which].name]}>
                    {which == 'store' ? '['+item[conditionContent[which].code]+']  ' : ''}{item[conditionContent[which].name]} <Checkbox onClick={this.handleCheckbox} checked={filter_condition[which].checked[index]} />
                </li>
            })
        }
        return element;
    },
    close(){
        this.setState({
            mask: false
        })
    },
    onCustomCheckboxClick(e){
        e.stopPropagation();
        var index = e.target.parentNode.parentNode.parentNode.dataset.index;
        var {range} = this.state;
        range.list[index].checked = !range.list[index].checked;
        range.single = true;
        sessionStorage.setItem('range_store_kucun', JSON.stringify(range))
        this.setState({
            range: range,
        })
    },
    onCustomCheckboxClickLi(e){
        e.stopPropagation();
        var index = e.target.dataset.index;
        var {range} = this.state;
        range.list[index].checked = !range.list[index].checked;
        range.single = true;
        sessionStorage.setItem('range_store_kucun', JSON.stringify(range))
        this.setState({
            range: range,
        })
    },
    switchChange(checked){
        var {range} = this.state;
            range.single = !range.single;
            for(var i in range.list){
                range.list[i].checked = false;
            }
        sessionStorage.setItem('range_store_kucun', JSON.stringify(range))
        this.setState({
            range: range,
        })
    },
    inputStartChange(e){
        sessionStorage.setItem('merge_range_start_store_kucun', e.target.value);
        this.setState({
            range_start: e.target.value,
            merge_range_start: e.target.value,
        })
    },
    inputEndChange(e){
        sessionStorage.setItem('merge_range_end_store_kucun', e.target.value);
        this.setState({
            range_end: e.target.value,
            merge_range_end: e.target.value,
        })
    },
    sumLevelRadio(e){
        var {filter_condition} = this.state;
        var {conditionContent} = this.props;
        filter_condition.sum.value = e.target.value;
        filter_condition.sum.text = filter_condition.sum.data[parseInt(e.target.value)][conditionContent.sum.name]
        sessionStorage.setItem('filter_condition_store_kucun', JSON.stringify(filter_condition));
        this.setState({
            filter_condition: filter_condition
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
        sessionStorage.setItem('filter_condition_store_kucun', JSON.stringify(filter_condition));
        this.setState({
            filter_condition: filter_condition
        })
    },
    search(){
        app.piwik_push(this.props.route.title + '(查询)');
        // var {init} = this.state;
        // init.show = false;
        var result = this.ajax();
        sessionStorage.setItem('ajax_store_kucun', JSON.stringify(result));
        this.setState({
            spin: true
        })
        StoreKuCunAction1.table(result, 'table');
        // this.setState({
        //     range_start: '',
        //     range_end: '',
        //     init: init,
        //     after_search: true
        // })
    },
    ajax(){
        var {pro_code, filter_condition, range, range_start, range_end, pagination, order_by, is_desc} = this.state;
        var {conditionContent} = this.props;
        var obj = {};
        var type = pro_code.current; //product_code   bar_code
        var value = pro_code.value;
        obj[type] = value;
        obj.limit = pagination.pageSize;
        obj.current_page = pagination.current;

        var count_range = [];
        if (!range.single){//自定义输入
            obj.min_count = parseInt(range_start);
            obj.max_count = parseInt(range_end);
        }else{//正零负
            for(var i in range.list){
                if(range.list[i].checked){
                    count_range.push(range.list[i].custom)
                }
            }
        }

        obj.count_range = count_range;
        obj.is_multi = 0;// 0 单选, 1 复选,  后续添加此功能


        var view_type_list = [], shop_ids = [], product_type = [], shop_id = this.getShopId('shop_id=');
        if(typeof(filter_condition.sum.value) == 'number'){
            view_type_list.push(filter_condition.sum.data[filter_condition.sum.value][conditionContent.sum.id])
        }
        for(var i in filter_condition.store.checked){
            if(filter_condition.store.checked[i]){
                shop_ids.push(filter_condition.store.data[i][conditionContent.store.id])
            }
        }
        if(!shop_ids.length){
            shop_ids.push(shop_id);
        }
        for(var i in filter_condition.kind.checked){
            if(filter_condition.kind.checked[i]){
                product_type.push(filter_condition.kind.data[i][conditionContent.kind.id])
            }
        }
        if(order_by){
            obj.order_by = order_by
            obj.is_desc = Number(is_desc);
        }
        obj.view_type_list = view_type_list;
        obj.shop_ids = shop_ids;
        obj.product_type = product_type;

        return obj;
    },
    sort(type){
        // var {is_desc} = this.state;
        this.state.is_desc = !this.state.is_desc;
        this.state.spin = true;
        this.state.order_by = type;
        var obj = this.ajax();
        // obj.order_by = type;
        // obj.is_desc = Number(is_desc)
        sessionStorage.setItem('ajax_store_kucun', JSON.stringify(obj));
        StoreKuCunAction1.table(obj, 'table');
    },

    click_sort(str){
        var _this = this;
        $(document).on('click', str, function(e){
            var type = e.target.className ? e.target.className : e.target.parentNode.className;
            e.stopPropagation();
            // _this.setState({
            //     is_desc: !_this.state.is_desc,
            //     spin: true,
            //     order_by: type
            // })
            _this.sort(type);
        })
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
        var {pro_code, filter_condition, range, merge_range_start, merge_range_end} = this.state;
        var {conditionContent} = this.props;
        var str = '条件:  ', store_i = [], kind_i = 0, range_i = [];
        if(filter_condition.sum.text){
            str += filter_condition.sum.text + ';   ';
        }
        for(var i in filter_condition.store.checked){
            if(filter_condition.store.checked[i]){
                store_i.push(i);
            }
        }
        for(var i in filter_condition.kind.checked){
            if(filter_condition.kind.checked[i]){
                kind_i++;
            }
        }
        if(store_i.length > 1){
            str += '已选店仓: ' + store_i.length + '个;   ';
        }else if(store_i.length == 1){
            str += '[' + filter_condition.store.data[store_i[0]][conditionContent.store.code] + '];   '
        }
        if(kind_i){
            str += '已选分类: ' + kind_i + '个;   ';
        }
        if(range.single){
            for(var i in range.list){
                if(range.list[i].checked && range.list[i].hasOwnProperty('custom')){
                    range_i.push(range.list[i].text)
                }
            }
            if(range_i){
                str += range_i.join('/').trimrl() + ';   ';
            }
        }else if(merge_range_end && merge_range_start){
            str += merge_range_start + '--' + merge_range_end + ';   ';
        }
        if(pro_code.value.trim()){
            var i = 0;
            for(var j in pro_code.total){
                if(pro_code.total[j].key == pro_code.current){
                    i = j;
                }
            }
            str += pro_code.total[i].text + ": " + pro_code.value;
        }

        return str;
    },








    //处理表格数据
    table(res, array, render_data, head_columns, head_columns_key){
        var {table, pagination} = this.state;
        table.dataSource = array;
        table.footer = function () {
            if(res.data.records.length){
                return <div>合计 |<span style={{display: 'inline-block', margin: '0 20px'}}>库存数量: {res.data.stock_count_sum}</span> <span>库存金额: {res.data.stock_amount_sum}</span></div>;
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
        //*****************列头拼接************************
        for(var i in head_columns_key){
            table_head[i] = {};
            table_head[i]['width'] = 200;
            // if(head_columns_key[i] == 'shop_name' || head_columns_key[i] == 'product_code'){
            //     table_head[i]['fixed'] = 'left';
                // table_head[i]['title'] = head_columns[i][head_columns_key[i]];
                // table_head[i]['dataIndex'] = head_columns_key[i];
                // table_head[i]['key'] = head_columns_key[i];
                // continue;
            // }
            if(i == 0){
                table_head[i]['fixed'] = 'left';
            }

            table_head[i]['title'] = head_columns[i][head_columns_key[i]];
            table_head[i]['dataIndex'] = head_columns_key[i];
            table_head[i]['key'] = head_columns_key[i];
            table_head[i]['className'] = head_columns_key[i];
            // table_head[i].onCellClick = function () {
            //     return 1;
            // }
            // if(head_columns_key[i] == 'stock_date'){
                // table_head[i]['fixed'] = 'left';
            //     table_head[i]['render'] = function (value, row, index) {
            //         var obj = {children: value, props: {}};
            //         if(arr.length){
            //                     for(var i in arr) {
            //                         if(arr[i].hasOwnProperty('start')){
            //                             if (index == arr[i].start) {
            //                                 obj.props.rowSpan = arr[i].last - arr[i].start + 1;
            //                             }
            //                             for(var j=arr[i].start+1; j<=arr[i].last; j++) {
            //                                 if(index == j) {
            //                                     obj.props.rowSpan = 0;
            //                                 }
            //                             }
            //                         }
            //                     }
            //                 }
            //         return obj;
            //     }
            // }
            // if(head_columns_key[i] == 'shop_name'){
            //     table_head[i]['fixed'] = 'left';
            // }
            // if(head_columns_key[i] == 'product_code'){
            //     table_head[i]['fixed'] = 'left';
            // }
        }
        // table_head.unshift({title: '', dataIndex: 'index', key: 'index', fixed: 'left'})
        //*****************列头拼接************************
        return table_head;
    },
    changePage(page){
        this.state.pagination.current = page;
        var obj = this.ajax();
        sessionStorage.setItem('current_store_kucun', page);
        sessionStorage.setItem('ajax_store_kucun', JSON.stringify(obj));
        this.setState({
            loading: true
        })
        StoreKuCunAction1.table(obj, 'table')
    },
    onShowSizeChange(current, pageSize){
        this.state.pagination.current = current;
        this.state.pagination.pageSize = pageSize;
        var obj = this.ajax();
        sessionStorage.setItem('pageSize_store_kucun', pageSize);
        sessionStorage.setItem('ajax_store_kucun', JSON.stringify(obj));
        this.setState({
            loading: true
        })
        StoreKuCunAction1.table(obj, 'table')
    },
})
