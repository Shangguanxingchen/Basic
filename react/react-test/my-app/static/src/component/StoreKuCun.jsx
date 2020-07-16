import React from 'react';
import Reflux from 'reflux';
import 'antd/dist/antd.min.css';
import $ from 'jquery';
import {Row, Col, Icon, Radio, Select, Table, Checkbox, Spin} from 'antd';
import '../css/index.css';
const RadioGroup = Radio.Group;
const Option = Select.Option;

import StoreKuCunStore from '../store/StoreKuCunStore';
import StoreKuCunAction from '../actions/StoreKuCunAction';


module.exports = React.createClass({
    mixins: [Reflux.listenTo(StoreKuCunStore, 'onChangeStatus')],
    onChangeStatus(res, type){
        var state = this.state.data;
        var table = this.state.table;
        if (type == 'table'){
            var head_columns = res.data.table_headers;
            var head_columns_key = [], array = [];
            var dataSource = res.data.records;
            var nums = 0, index_count=0;
            var render_data = [];
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
        }else{
            state[type].data = res.data;
            if(type == 'range_store'){
                var shop_id = this.getShopId('shop_id=');
                if(res.data[0].shop_id == shop_id){
                    state[type].value = 0;
                    state[type].text = res.data[0].shop_name;
                }
            }
            this.setState({
                data: state
            })
        }
    },

    getDefaultProps(){
        return {
            placeholder: {
                product_bar_code: '请输入商品条码',
                bar_code: '请输入条形码'
            },

            //title: 标题, h_title: 二级标题(提示文字), id: 后台的id属性名, name: 后台的name属性名, bar_code: 店仓的bar_code值(目前未用到此属性)
            conditionContent: {
                high_select: {
                    title: '高级选项',
                    h_title: '',
                    id: 'id',
                    name: 'name',
                },
                sum_level: {
                    title: '汇总级别',
                    h_title: '',
                    id: 'type_code',
                    name: 'type_name',
                },
                range_store: {
                    title: '店铺范围',
                    h_title: '',
                    id: 'shop_id',
                    name: 'shop_name',
                },
                product_kind: {
                    title: '商品类型',
                    h_title: '',
                    id: 'type_code',
                    name: 'type_name',
                },
                range_kucun: {
                    title: '库存范围',
                    h_title: '',
                    id: 'id',
                    name: 'name',
                },
            },
        }
    },
    getInitialState(){
        return {
            up: false, //筛选条件收起,隐藏
            mask: false, //黑色遮罩隐藏、显示
            loading: false,

            which: '', //点击了哪一个筛选条件
            condition: [
                [{
                    text: false,//false,表示 input输入框
                    placeholder: '请输入商品条码',
                    type: 'product_bar_code'
                }, {
                    text: '高级选项', //无用,但是不要注释
                    button: 'span',
                    type: 'high_select'
                }, {
                    text: '展开筛选',//bool值为true表示具有click事件,非input框
                    button: 'a',//false表示普通元素包裹
                    type: 'up_down'//用来处理this.handleClick事件时,是点击了哪一个元素
                }],
                [{
                    text: '汇总级别: ',
                    type: 'sum_level'
                }, {
                    text: '店铺范围: ',
                    type: 'range_store'
                }],
                [{
                    text: '商品类型:',
                    type: 'product_kind'
                }, {
                    text: '库存范围:',
                    type: 'range_kucun'
                }, {
                    text: '查询',
                    button: 'button',//true表示Button元素包裹
                    type: 'search'
                }]
            ], //筛选条件的文字, type数据
            data: {
                // high_select: {data: [], checked: []},
                sum_level: {data: [], text: '' ,value: 'no'},
                range_store: {data: [], text: '', value: 'no'},
                product_kind: {data: [], text: '', value: 'no'}
            }, //数据是从后台获取的

            //库存范围。。单选
            range_kucun: {
                list: [
                    {text: '正', checked: false, custom: 'positive'},
                    {text: '零', checked: false, custom: 'zero'},
                    {text: '负', checked: false, custom: 'negative'},
                    {text: '自定义'},
                ],
                single: 1 //1,复选框    0,单选框,自定义
            },

            screen_width: 0, //屏幕宽度

            table: {
                columns: [],
                dataSource: [],
                footer(){
                    return '';
                },
                merge_index: [] //需要合并的列，，比如日期
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
            }
        }
    },
    componentDidMount(){
        $(function () {
            FastClick.attach(document.body);
        });
        var shop_id = this.getShopId('shop_id=');
        var user_id = this.getShopId('user_id=');
        var limit = this.state.pagination.pageSize;
        var current_page = this.state.pagination.current;
        var shop_ids = [shop_id];
        var table_arg = {
            limit: limit,
            current_page: current_page,
            shop_ids: shop_ids
        }
        StoreKuCunAction.rangeStore({shop_id: shop_id, user_id: user_id}, 'range_store');
        StoreKuCunAction.sumLevel('sum_level');
        StoreKuCunAction.proKind('product_kind');
        StoreKuCunAction.tableList(table_arg, 'table');
        var width = window.screen.width;
        this.setState({
            screen_width: width
        })
    },
    render(){
        return (
            <div>
                <Spin spinning={this.state.loading}>
                    <div className={this.state.up ? 'animate_up condition' : 'animate_down condition'}>
                        {this.filterCondition(this.state.condition, this.state.up)}
                    </div>
                    <div className="table_wrap">
                        <div className="table">
                            <Table bordered scroll={{x: this.state.screen_width}} pagination={this.state.pagination} dataSource={this.state.table.dataSource} columns={this.state.table.columns} footer={this.state.table.footer}/>
                        </div>
                    </div>
                    {/*黑色背景弹框*/}
                    <div className={this.state.mask ? "active modal_condition" : "modal_condition"}>
                        <div className="popup_box" onClick={this.hideFilterBody}></div>
                        <div className="right_box">
                            {this.filterContext(this.state.which)}
                        </div>
                    </div>
                </Spin>
            </div>
        )
    },

    //处理表格数据
    table(res, array, render_data, head_columns, head_columns_key){
        var table = this.state.table;
        var pagination = this.state.pagination;
        table.dataSource = array;
        table.footer = function () {
            if(res.data.records.length){
                return <div><span style={{display: 'inline-block', marginRight: '20px'}}>总销售数量: {res.data.stock_count_sum}</span> <span>总销售金额: {res.data.stock_amount_sum}</span></div>;
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
            if(head_columns_key[i] == 'shop_name' || head_columns_key[i] == 'product_code'){
                // console.log('ggggggf')
                table_head[i]['fixed'] = 'left';
                table_head[i]['title'] = head_columns[i][head_columns_key[i]];
                table_head[i]['dataIndex'] = head_columns_key[i];
                table_head[i]['key'] = head_columns_key[i];
                continue;
            }
            table_head[i]['title'] = head_columns[i][head_columns_key[i]];
            table_head[i]['dataIndex'] = head_columns_key[i];
            table_head[i]['key'] = head_columns_key[i];
            if(head_columns_key[i] == 'stock_date'){
                // table_head[i]['fixed'] = 'left';
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
        StoreKuCunAction.tableList(obj, 'table')
    },
    onShowSizeChange(current, pageSize){
        this.state.pagination.current = current;
        this.state.pagination.pageSize = pageSize;
        var obj = this.ajax();
        StoreKuCunAction.tableList(obj, 'table')
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
        var type = e.target.dataset.type;
        if (type == 'up_down') {
            this.setState({
                up: !this.state.up
            })
        } else if (type == 'search') {
            var result = this.ajax();
            this.setState({
                loading: true
            })
            StoreKuCunAction.tableList(result, 'table')
        } else if (type == 'sure' || type == 'cancel') {
            this.setState({
                mask: false
            })
        } else {
            this.setState({
                mask: true,
                which: type
            })
        }
    },

    //点击查询的ajax通用请求
    ajax(){
        var obj = {};
        var element = this.refs.input;// 商品条码。条形码
        var type = element.dataset.type; //product_code   bar_code
        var value = element.value;
        obj.limit = this.state.pagination.pageSize;
        obj.current_page = this.state.pagination.current;
        obj[type] = value;

        var range_kucun = this.state.range_kucun;
        var count_range = [], min_count = '', max_count = '';
        var start = this.refs.start, end = this.refs.end;
        if (range_kucun.single == 0){//自定义输入
            min_count = parseInt(start.value);
            max_count = parseInt(end.value);
        }else{//正零负
            for(var i in range_kucun.list){
                if(range_kucun.list[i].checked){
                    count_range.push(range_kucun.list[i].custom)
                }
            }
        }
        obj.min_count = min_count;
        obj.max_count = max_count;
        obj.count_range = count_range;
        obj.is_multi = 0;// 0 单选, 1 复选,  后续添加此功能

        var conditionContent = this.props.conditionContent;
        var data = this.state.data;
        var view_type_list = [], shop_ids = [], product_type = '';
        if(data.sum_level.value != 'no'){
            view_type_list.push(data.sum_level.data[data.sum_level.value][conditionContent.sum_level.id])
        }
        if(data.product_kind.value != 'no'){
            product_type = data.product_kind.data[data.product_kind.value][conditionContent.product_kind.id]
        }
        if(data.range_store.value != 'no'){
            shop_ids.push(data.range_store.data[data.range_store.value][conditionContent.range_store.id])
        }

        obj.view_type_list = view_type_list;
        obj.shop_ids = shop_ids;
        obj.product_type = product_type;

        return obj;
    },

    //select选择器切换选项
    onChange(value){
        var placeholder = this.props.placeholder;
        var condition = this.state.condition;
        condition[0][0]['placeholder'] = placeholder[value];
        condition[0][0]['type'] = value;
        this.setState({
            condition: condition
        })
    },

    //Raiod组件单选
    onRadioChange(e){
        var range_kucun = this.state.range_kucun;
        range_kucun.single = 0;
        for(var i in range_kucun.list){
            range_kucun.list[i].checked = false;
        }
        this.setState({
            range_kucun: range_kucun
        })
    },

    //库存范围多选框
    onCustomCheckboxClick(e){
        var range_kucun = this.state.range_kucun;
        var obj = e.target.parentNode.parentNode.parentNode.dataset;
        range_kucun.list[obj.index].checked = !range_kucun.list[obj.index].checked;
        range_kucun.single = 1;
        this.setState({
            range_kucun: range_kucun
        })
    },

    //汇总级别,店铺范围,商品类型单选
    sumLevelRadio(e){
        var data = this.state.data;
        data.sum_level.value = e.target.value;
        data.sum_level.text = data.sum_level.data[e.target.value][this.props.conditionContent.sum_level.name]
        this.setState({
            data: data
        })
    },
    rangeStoreRadio(e){
        var data = this.state.data;
        data.range_store.value = e.target.value;
        data.range_store.text = data.range_store.data[e.target.value][this.props.conditionContent.range_store.name]
        this.setState({
            data: data
        })
    },
    productKindRadio(e){
        var data = this.state.data;
        data.product_kind.value = e.target.value;
        data.product_kind.text = data.product_kind.data[e.target.value][this.props.conditionContent.product_kind.name]
        this.setState({
            data: data
        })
    },

    //Checkbox复选框
    onCheckboxClick(e){
        var obj = e.target.parentNode.parentNode.parentNode.dataset;
        var data = this.state.data;
        data[obj.type].checked[obj.index] = !data[obj.type].checked[obj.index];
        if(data[obj.type].hasOwnProperty('text')){
            if(data[obj.type].checked[obj.index]){
                data[obj.type].text[obj.index] = obj.text;
            }else{
                data[obj.type].text[obj.index] = '';
            }
        }
        this.setState({
            data: data
        })
    },

    //自定义选项
    customCheck(){},

    //生成筛选条件元素
    filterCondition(state, up){
        var className = ['parent', 'common_title', 'button'];
        var element = state.map((item1, index1)=> {
            return <Row key={index1} className={index1 == 0 ? 'up_down' : ''}>
                {
                    item1.map((item2, index2)=> {
                        if (item2.text) {
                            if (item2.hasOwnProperty('button')) {
                                switch (item2.button) {
                                    case 'span':
                                        return <Col span={10} key={index2}>
                                            {/*<span className="high_select" onClick={this.handleClick}*/}
                                                  {/*data-type={item2.type}>*/}
                                                {/*{item2.text}*/}
                                            {/*</span>*/}
                                        </Col>
                                        break;
                                    case 'a':
                                        return <Col span={4} key={index2}>
                                            <a data-type={item2.type} onClick={this.handleClick}>
                                                {item2.text}
                                            </a><Icon type={up ? 'up' : 'down'}/>
                                        </Col>
                                        break;
                                    case 'button':
                                        return <Col key={index2} span={4}>
                                            <button className={className[2]} onClick={this.handleClick}
                                                    data-type={item2.type} size="large">{item2.text}</button>
                                        </Col>
                                        break;
                                }
                            } else {
                                return <Col span={10} key={index2}>
                                    <span className={className[0]}>
                                        <span className={className[1]} onClick={this.handleClick}
                                              data-type={item2.type}>
                                            {item2.text}
                                        </span>
                                        <span onClick={this.handleClick} data-type={item2.type}>
                                            {this.filterConditionInnerText(item2.type)}
                                        </span>
                                        <Icon type="right"/>
                                    </span>
                                </Col>
                            }
                        } else {
                            return <Col span={10} key={index2}>
                                <Select onChange={this.onChange} defaultValue='product_bar_code' className='select'>
                                    <Option value='product_bar_code'>商品码</Option>
                                    <Option value='bar_code'>条形码</Option>
                                </Select>
                                <input type="text" ref="input" data-type={item2.type} placeholder={item2.placeholder}/>
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
            if(this.state.range_kucun.single){//1 复选
                var str = '';
                for(var i=0; i<this.state.range_kucun.list.length-1; i++){
                    if(this.state.range_kucun.list[i].checked){
                        str += this.state.range_kucun.list[i].text;
                    }
                }
                return str;
            }else{//0单选
                return this.state.range_kucun.list[this.state.range_kucun.list.length - 1].text;
            }
        }else{
            return data[type].text;
        }
    },

    //点击空白部分隐藏遮罩
    hideFilterBody(){
        this.setState({
            mask: false
        })
    },

    //点击筛选条件的元素后,显示对应的内容
    filterContext(which){
        if (which) {
            var conditionContent = this.props.conditionContent[which];
            return <div className="filter_wrap">
                <div className="filter_top">
                    {conditionContent.title}
                </div>
                <div className="filter_body">
                    <div>{conditionContent.h_title}</div>
                    <ul>
                        <li>
                            <span className="all" data-type={which} data-name={conditionContent.name}>
                            </span>
                            {/*(已选)*/}
                        </li>
                        {this.filterContextBody(which)}
                    </ul>
                </div>
                <div className="filter_footer">
                    <div className="cancel" data-type="cancel" onClick={this.handleClick}>取消</div>
                    <div className="sure" ref="sure" data-type="sure" onClick={this.handleClick}>确定</div>
                </div>
            </div>
        }
    },

    //点击筛选条件, 显示对应内容的   主体内容   注意: 返回<li></li>元素
    filterContextBody(which){
        var obj = this.state.range_kucun;
        var element = null;
        var style = {display: 'block'};
        var data = [], checked = [];
        var conditionContent = this.props.conditionContent[which];
        if(which!='range_kucun'){
            data = this.state.data[which].data;
            checked = this.state.data[which].checked;
        }
        if (which == 'range_kucun') {
            element = obj.list.map((item, index) => {
                if(item.hasOwnProperty('custom')){
                    return <li key={index} data-index={index}>
                        <Checkbox checked={item.checked} onClick={this.onCustomCheckboxClick}>{item.text}</Checkbox>
                    </li>
                }else{
                    return <li key={index} data-index={index}>
                        <RadioGroup value={obj.single} onChange={this.onRadioChange}>
                            <Radio value={0}>{item.text}</Radio>
                            <div className={obj.single == 0 ? 'show' : 'hide'}>
                                <input className="input_range" type="text" ref="start" placeholder="-999"/> - <input className="input_range" type="text" ref="end" placeholder="999"/>
                            </div>
                        </RadioGroup>
                    </li>
                }
            })
        }else if(which == 'sum_level'){
            element = <RadioGroup value={this.state.data[which].value} data-type={which} onChange={this.sumLevelRadio}>
                {
                    data.map((item, index) => {
                        return <Radio key={index} style={{display: 'block'}} value={index}>
                            {item[conditionContent.name]}
                        </Radio>
                    })
                }
            </RadioGroup>
        }else if(which == 'range_store'){
            element = <RadioGroup value={this.state.data[which].value} data-type={which} onChange={this.rangeStoreRadio}>
                {
                    data.map((item, index) => {
                        return <Radio key={index} style={{display: 'block'}} value={index}>
                            {item[conditionContent.name]}
                        </Radio>
                    })
                }
            </RadioGroup>
        }else if(which == 'product_kind'){
            element = <RadioGroup value={this.state.data[which].value} data-type={which} onChange={this.productKindRadio}>
                {
                    data.map((item, index) => {
                        return <Radio key={index} style={{display: 'block'}} value={index}>
                            {item[conditionContent.name]}
                        </Radio>
                    })
                }
            </RadioGroup>
        }
        return element;
    },

})

