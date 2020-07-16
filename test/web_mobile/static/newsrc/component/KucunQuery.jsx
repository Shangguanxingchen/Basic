import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css'
import '../css/common.css';

import { Row, Col, DatePicker, Icon, Table, Checkbox, Input } from 'antd';
import moment from 'moment';

var Reflux = require('reflux');
var KuCunQueryStore = require('../store/KuCunQueryStore');
var KucunQueryAction = require('../actions/KucunQueryAction');
var $ = require('jquery');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(KuCunQueryStore, 'onStatusChange')],
    onStatusChange(data){
        var [list, checked, text] = [this.state.lists, this.state.checked, this.state.text]
        if(data.condition == 'kind' || data.condition == 'brand' || data.condition == 'series' || data.condition == 'store'){
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
        }else if(data.condition == 'table'){
            var [total, total_amount, total_qty, head_columns, head_columns_key, dataSource]
                =
                [data.list.line_num, data.list.total_amount, data.list.total_qty, [], [], data.list.record_lines];
            if(data.list.hasOwnProperty('view_table_header')){
                head_columns = data.list.view_table_header;
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
            this.setState({
                mask: false,
                total: total,
                total_amount: total_amount,
                total_qty: total_qty,
                dataSource: array,
                head_columns: head_columns,
                head_columns_key: head_columns_key
            })
        }
    },
    getDefaultProps(){
        return {
            condition: ['kind', 'brand', 'series', 'store']
        }
    },
    getInitialState(){
        var page = sessionStorage.getItem('page_6') ? parseInt(sessionStorage.getItem('page_6')) : 1;
        var product_name = sessionStorage.getItem('product_name_6') ? sessionStorage.getItem('product_name_6') : '';
        var pageSize = sessionStorage.getItem('pageSize_6') ? parseInt(sessionStorage.getItem('pageSize_6')) : 20;
        return {
            up: false,
            mask: false,
            inner_search: false,
            inner_search_placeholder: '',//内部分类中点击搜索按钮是input框中出现的初始文字
            condition: {}, //包含了分类、品牌、系列、店仓的标题,id,name字段
            lists: {'kind': [], 'brand': [], 'series': [], 'store': []},
            checked: {'kind': [], 'brand': [], 'series': [], 'store': []},
            text: {'kind': [], 'brand': [], 'series': [], 'store': []},

            //table 列表的数据
            currentPage: page,
            pageSize: pageSize,
            total: 0,
            total_amount: 0,
            total_qty: 0,
            head_columns: [],
            head_columns_key: [],
            dataSource: [],
            // marge_index: [],

            product_name: product_name, //搜索的名称

            search_product_code: false,

            kind: '',
            search_result: [], //内部分类店仓点击搜索后返回的列表
            nums: 0, //搜索出来的多少条结果

        }
    },
    componentDidMount(){
        var condition = this.props.condition;
        KucunQueryAction.kind(condition[0]);
        KucunQueryAction.brand(condition[1]);
        KucunQueryAction.series(condition[2]);
        KucunQueryAction.store(condition[3]);

        if(sessionStorage.getItem('ajax_6')){
            KucunQueryAction.table(JSON.parse(sessionStorage.getItem('ajax_6')));
        }

        $(function() {
            FastClick.attach(document.body);
         });
    },
    slideUp(){
        var _this = this;
        this.setState({
            up: !_this.state.up
        })
    },
    handleClick(e){
        var [type, titles]
            =
            [e.target.dataset.type, {title: '', h_title: '', id: '', name: '', condition: '', code: ''}];
        switch(type){
            case 'kind':
                titles.title = '内部分类';
                titles.h_title = '* 请选择同级的内部分类, 可多选';
                titles.id = 'category_id';
                titles.name = 'category_name';
                titles.condition = 'kind';
                break;
            case 'brand':
                titles.title = '品牌';
                titles.h_title = '* 请选择统计的品牌, 可多选';
                titles.id = 'brand_id';
                titles.name = 'brand_name';
                titles.condition = 'brand';
                break;
            case 'series':
                titles.title = '商品系列';
                titles.h_title = '* 请选择统计的商品系列, 可多选';
                titles.id = 'series_id';
                titles.name = 'series_name';
                titles.condition = 'series';
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
    how_much(array){
        var i = 0;
        for(var j in array){
            if(array[j]){
                i++;
            }
        }
        return i;
    },
    inner_right_search(e){
        var obj = $(e.target)[0]['attributes'];
        var [kind, text] = [obj.kind.value, obj.name.value];
        this.setState({
            inner_search: true,
            kind: kind,
            inner_search_placeholder: text
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
            var obj = this.common_ajax();

            sessionStorage.setItem('ajax_6', JSON.stringify(obj));

            KucunQueryAction.table(obj);
        }
    },
    common_ajax(page, pageSize){
        var [list, checked] = [this.state.lists, this.state.checked];
        var [category_ids, brand_ids, series_ids, shop_ids, limit, current_page, product_name]
            =
            [[], [], [], [], this.state.pageSize, this.state.currentPage, this.state.product_name];
        if(page){
            current_page = page;
        }
        if(pageSize){
            limit = pageSize
        }
        for(var i in checked['brand']){
            if(checked['brand'][i]){
                brand_ids.push(list['brand'][i].brand_id);
            }
        }
        for(var i in checked['kind']){
            if(checked['kind'][i]){
                category_ids.push(list['kind'][i].category_id);
            }
        }
        for(var i in checked['series']){
            if(checked['series'][i]){
                series_ids.push(list['series'][i].series_id);
            }
        }
        for(var i in checked['store']){
            if(checked['store'][i]){
                shop_ids.push(list['store'][i].shop_id);
            }
        }
        return {
            'limit': limit,
            'current_page': current_page,
            'brand_ids': brand_ids,
            'series_ids': series_ids,
            'category_ids': category_ids,
            'shop_ids': shop_ids,
            'product_name': product_name
        }
    },
    select(array){
        if(array.indexOf(false) > -1 || !array.length){
            return '全选';
        }
        return '取消全选';
    },
    selectAll(e){
        var [checked, type, name, text, data] = [this.state.checked, e.target.dataset.type, e.target.dataset.name, this.state.text, this.state.lists];
        if(checked[type].indexOf(false) > -1){
            for(let i=0; i<checked[type].length; i++) {
                checked[type][i] = true;
            }
            if(text.hasOwnProperty(type)){
                for(let i in data[type]){
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
        sessionStorage.setItem('checked_6', JSON.stringify(checked));
        sessionStorage.setItem('text_6', JSON.stringify(text));

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
        this.setState({
            checked: checked,
            text: text
        })
    },
    selectCheckInner(e){
        var obj = e.target.parentNode.parentNode.parentNode.dataset;
        var [index, name, list, type, checked, text] = [obj.index, obj.name, this.state.lists, obj.type, this.state.checked, this.state.text]
        checked[type][index] = !checked[type][index];
        if(checked[type][index] == true){
            text[type][index] = name;
        }else{
            text[type][index] = '';
        }
        sessionStorage.setItem('checked_6', JSON.stringify(checked));
        sessionStorage.setItem('text_6', JSON.stringify(text));
        this.setState({
            checked: checked,
            text: text,
            inner_search: false
        })
        $(this.refs.input).val('');
        this.search_check();

    },
    search_check(){
        var [search_text, element, exists_data] = [$(this.refs.input).val(), <div></div>, []];
        var [kind, list, checked, nums] = [this.state.kind, this.state.lists, this.state.checked, this.state.nums];
        switch(kind){
            case 'kind':
                for(var i in list.kind){
                    if(String(list.kind[i]['category_name']).indexOf(search_text)>-1 && search_text.trim()){
                        exists_data.push({
                            text: list.kind[i],
                            status: checked.kind[i],
                            index: i
                        })
                    }
                }
                element = exists_data.map((item, index) => {
                    return <li key={index} data-index={item.index} data-type="kind" data-name={item.text.category_name}>
                        <Checkbox checked={item.status} onClick={this.selectCheckInner}>
                            {item.text.category_name}
                            </Checkbox>
                    </li>
                })
                break;
            case 'store':
                for(var i in list.store){
                    if(String(list.store[i]['shop_name']).indexOf(search_text)>-1 && search_text.trim()){
                        exists_data.push({
                            text: list.store[i],
                            status: checked.store[i],
                            index: i
                        })
                    }
                }
                element = exists_data.map((item, index) => {
                    return <li key={index} data-index={item.index} data-type="store" data-name={item.text.shop_name}>
                        <Checkbox checked={item.status} onClick={this.selectCheckInner}>
                            {item.text.shop_name}
                            </Checkbox>
                    </li>
                })
                break;
        }
        this.setState({
            search_result: element,
            nums: exists_data.length
        })
    },
    render(){
        var [condition, text] = [this.props.condition, this.state.text];
        return (
            <div>
                <div className={this.state.up ? "animate_up condition" : "animate_down condition"}>
                    <Row>
                        <Col span={9} style={{textAlign: 'right'}}>
                            内部分类: <span className="inner_kind"><span className="common" data-type={condition[0]} onClick={this.handleClick}>{text['kind'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            品牌: <span className="all_brand"><span onClick={this.handleClick} data-type={condition[1]} className="common">{text['brand'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={6} style={{paddingLeft: '30px'}}>
                            <p className="pick_up"><span className="up_down" onClick={this.slideUp}>收起条件<Icon className="up" type={this.state.up ? 'down' : 'up'} /></span><Icon className="search" type="search" onClick={this.search_product_code} /></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={9} style={{textAlign: 'right'}}>
                            系列: <span style={{textAlign: 'left'}} className="series"><span onClick={this.handleClick} data-type={condition[2]} className="common">{text['series'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            店仓: <span style={{textAlign: 'left'}} className="store"><span data-type="store" onClick={this.handleClick} className="common">{text['store'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                    </Row>
                </div>
                <div className="table_wrap">
                    <div className="table">
                        <Table footer={this.table().footer} bordered pagination={this.table().pagination} columns={this.table().columns} dataSource={this.table().data} />
                    </div>
                </div>
                {/*黑色背景弹框*/}
                <div className={this.state.mask ? "active modal_condition" : "modal_condition"}>
                    <div className="popup_box"></div>
                    <div className="right_box">
                        {this.list_check()}
                    </div>
                    <div className={this.state.inner_search ? "right_search_box active" : "right_search_box"}>{/*筛选条件中的搜索框*/}
                        <Row className="top">
                            <Col span={2} style={{textAlign: 'center'}}><Icon type="left" className="back_left" onClick={()=>{this.setState({inner_search: false})}}/></Col>
                            <Col span={22} className="right">
                                <input ref="input" placeholder={this.state.inner_search_placeholder}/><Icon type="search" onClick={this.search_check} className="trigger_click"/>
                            </Col>
                        </Row>
                        <p style={{padding: '15px 10px'}}>共{this.state.nums}条相关结果</p>
                        <div className="search_result">
                            <ul>
                                {this.state.search_result}
                            </ul>
                        </div>
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

        sessionStorage.setItem('ajax_6', JSON.stringify(obj));
        sessionStorage.setItem('product_name_6', text);

        KucunQueryAction.table(obj);
    },
    table(){
        var [table_data,quantity,total_amount,total_qty,table]
            =
            [this.state.dataSource, this.state.total, this.state.total_amount, this.state.total_qty,
                {
                    columns: [],
                    data: [],
                    footer(){
                        // return '暂无数据';
                        return '';
                    },
                    pagination: {}
                }
            ]
        table.columns = this.render_columns();
        table.data = table_data;
        table.pagination = this.page(quantity);
        return table;
    },
    render_columns(){
        var [head_columns, head_columns_key, table_head] = [this.state.head_columns, this.state.head_columns_key, []];
        //*****************列头拼接************************
        for(var i in head_columns_key){
            table_head[i] = {};
            table_head[i]['title'] = head_columns[i][head_columns_key[i]];
            table_head[i]['dataIndex'] = head_columns_key[i];
            table_head[i]['key'] = head_columns_key[i];
        }
        table_head.unshift({title: '', dataIndex: 'index', key: 'index'})
        //*****************列头拼接************************
        return table_head;
    },
    page(amount_data){
        var _this = this;
        var obj = {
            pageSize: 1,
            total: 0,
            onChange: function(){},
            current: _this.state.currentPage,
            onShowSizeChange: function () {},
            showSizeChanger: true
        }
        obj.pageSize = this.state.pageSize;
        obj.total = amount_data;
        obj.onChange = _this.changePage;
        obj.onChange = _this.changePage;
        obj.onShowSizeChange = _this.onShowSizeChange
        return obj;
    },
    changePage(page){
        this.state.currentPage = page;
        var obj = this.common_ajax(page);

        sessionStorage.setItem('page_6', page);
        sessionStorage.setItem('ajax_6', JSON.stringify(obj));

        KucunQueryAction.table(obj);
    },
    onShowSizeChange(current, pageSize){
        sessionStorage.setItem('page_6', current);
        sessionStorage.setItem('pageSize_6', pageSize);
        var obj = this.common_ajax(current, pageSize);
        sessionStorage.setItem('ajax_6', JSON.stringify(obj));
        this.state.pageSize = pageSize;
        KucunQueryAction.table(obj);
    },
    product_name(e){
        this.setState({
            product_name: e.target.value
        })
    }
})