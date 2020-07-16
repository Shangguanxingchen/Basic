import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css'
import '../css/common.css';
import { Row, Col, DatePicker, Icon, Table, Checkbox, Input } from 'antd';
import SaleQueryAction from '../actions/SaleQueryAction'
import SaleQueryStore from '../store/SaleQueryStore'

var Reflux = require('reflux');
var $ = require('jquery');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(SaleQueryStore, 'onStatusChange')],
    onStatusChange(data){
        var [list, checked, text] = [this.state.list, this.state.checked, this.state.text];
        if(data.condition == 'brand' || data.condition == 'series' || data.condition == 'store'){
            list[data.condition] = data.list;
            checked[data.condition].length = data.list.length;
            text[data.condition].length = data.list.length;
            checked[data.condition].fill(false);
            text[data.condition].fill('');

            this.setState({
                list: list,
                checked: checked,
                text: text
            })
        }else if(data.condition == 'table'){
            console.log(data);
            this.setState({
                mask: false
            })
        }
    },
    getDefaultProps(){
        return {
            condition: ['brand', 'series', 'store']
        }
    },
    getInitialState(){
        return {
            mask: false,
            condition: [],//包含了品牌、系列的标题,id,name字段
            text: {'brand': [], 'series': [], 'store': []},
            checked: {'brand': [], 'series': [], 'store': []},
            list: {'brand': [], 'series': [], 'store': []},

            pageSize: 20,
            currentPage: 1,
            product_name: ''
        }
    },
    componentDidMount(){
        $(function() {
            FastClick.attach(document.body);
         });
        var condition = this.props.condition;
        SaleQueryAction.brand(condition[0]);
        SaleQueryAction.series(condition[1]);
        SaleQueryAction.store(condition[2]);
    },
    handleClick(e){
        var [type, titles]
            =
            [e.target.dataset.type, {title: '', h_title: '', id: '', name: '', condition: '', code: ''}];
        switch (type){
            case 'brand':
                titles.title = '商品类型';
                titles.h_title = '* 请选择统计的品牌, 可多选';
                titles.id = 'brand_id';
                titles.name = 'brand_name';
                titles.condition = 'brand';
                break;
            case 'series':
                titles.title = '商品编号';
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
    list_check(){
        var [list, checked, titles] = [this.state.list, this.state.checked, this.state.condition];
        if(titles.hasOwnProperty('name')){
            var [data, isChecked]
                =
                [list[titles.condition], checked[titles.condition]];
            return <div className="filter_wrap">
                    <div className="filter_top">
                        {titles.title}
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
                                    return <li key={index} data-index={index} data-type={titles.condition} data-name={item[titles.name]} data-ids={item[titles.id]}>
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
    how_much(array){
        var i = 0;
        for(var j in array){
            if(array[j]){
                i++;
            }
        }
        return i;
    },
    select(array){
        if(array.indexOf(false) > -1){
            return '全选';
        }
        return '取消全选';
    },
    selectAll(e){
        var [checked, type, name, text, data] = [this.state.checked, e.target.dataset.type, e.target.dataset.name, this.state.text, this.state.list];
        if(checked[type].indexOf(false) > -1){
            checked[type].fill(true);
            if(text.hasOwnProperty(type)){
                for(var i in data[type]){
                    text[type][i] = data[type][i][name]
                }
            }
        }else{
            checked[type].fill(false);
            if(text.hasOwnProperty(type)){
                text[type].fill('')
            }
        }

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
    close(e){
        var type = e.target.dataset.type;
        if(type == 'cancel'){
            this.setState({
                mask: false
            })
        }else{
            var obj = this.common_ajax();

            SaleQueryAction.table(obj);
        }
    },
    render(){
        var [condition, text] = [this.props.condition, this.state.text];
        return (
            <div>
                <div className="condition" style={{height: '60px'}}>
                    <Row>
                        <Col span={8} style={{paddingLeft: '20px'}}>
                            商品类型: <span className="inner_kind"><span className="common" data-type={condition[0]} onClick={this.handleClick}>{text['brand'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={8} style={{paddingLeft: '20px'}}>
                            商品编号: <span className="inner_kind"><span className="common" data-type={condition[1]} onClick={this.handleClick}>{text['series'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={8} style={{paddingLeft: '20px'}}>
                            店仓: <span className="inner_kind"><span className="common" data-type={condition[2]} onClick={this.handleClick}>{text['store'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                    </Row>
                </div>
                <div className="table_wrap">
                    <div className="table">
                        {/*<Table footer={this.table().footer} bordered pagination={this.table().pagination} columns={this.table().columns} dataSource={this.table().data} />*/}
                    </div>
                </div>
                {/*黑色背景弹框*/}
                <div className={this.state.mask ? "active modal_condition" : "modal_condition"}>
                    <div className="popup_box"></div>
                    <div className="right_box">
                        {this.list_check()}
                    </div>
                </div>
            </div>
        )
    },
    common_ajax(page){
        var [list, checked] = [this.state.list, this.state.checked];
        var [brand_ids, series_ids, shop_ids, limit, current_page, product_name]
            =
            [[], [], [], this.state.pageSize, this.state.currentPage, this.state.product_name];
        if(page){
            current_page = page;
        }
        for(var i in checked['brand']){
            if(checked['brand'][i]){
                brand_ids.push(list['brand'][i].brand_id);
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
            'shop_ids': shop_ids,
            'product_name': product_name
        }
    },
})