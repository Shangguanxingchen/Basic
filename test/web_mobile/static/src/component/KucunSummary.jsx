/**
 * Created by zhousuyang on 16/11/22.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import $ from 'jquery';

import { Row, Col, Icon, Table, Checkbox, Input } from 'antd';

module.exports = React.createClass({
    getDefaultProps(){
        return {
            condition: ['store', 'brand', 'kind', 'high']
        }
    },
    getInitialState(){
        let page = sessionStorage.getItem('page_0_1') ? parseInt(sessionStorage.getItem('page_0_1')) : 1,
            pageSize = sessionStorage.getItem('pageSize_0_1') ? parseInt(sessionStorage.getItem('pageSize_0_1')) : 20,
            product_name = sessionStorage.getItem('product_name_0_1') ? parseInt(sessionStorage.getItem('product_name_0_1')) : '';
        return {
            up: false,
            mask: false,
            condition: {},
            lists: {'store': [], 'brand': [], 'kind': [], 'high': []},
            checked: {'store': [], 'brand': [], 'kind': [], 'high': []},
            text: {'store': [], 'brand': [], 'kind': [], 'high': []},

            currentPage: page,
            pageSize: pageSize,
            total: 0,
            total_amount: 0,
            total_qty: 0,
            head_columns: [],
            head_columns_key: [],
            dataSource: [],

            product_name: product_name,

            search_product_code: false,

            kind: '',
            search_result: [],
            nums: 0,

            search_width: 0,

        }
    },
    componentDidMount(){
        $(function () {
            FastClick.attach(document.body);
        });
    },
    slideUp(){
        let _this = this;
        this.setState({
            up: !_this.state.up
        })
    },
    handleClick(e){
        let [type, titles] =
            [
                e.target.dataset.type,
                {
                    title: '',
                    h_title: '',
                    id: '',
                    name: '',
                    condition: '',
                    code: ''
                }
            ];
        switch (type) {
            case 'store':
                titles.title = '店仓';
                titles.h_title = '* 请选择店仓';
                titles.id = 'shop_id';
                titles.name = 'shop_name';
                titles.code = 'shop_code';
                titles.condition = 'store';
                break;
            case 'brand':
                titles.title = '品牌';
                titles.h_title = '* 请选择统计的品牌, 可多选';
                titles.id = 'brand_id';
                titles.name = 'brand_name';
                titles.condition = 'brand';
                break;
            case 'kind':
                titles.title = '分类';
                titles.h_title = '* 请选择同级的分类, 可多选';
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
        }
        this.setState({
            mask: true,
            condition: titles
        })
    },
    how_much(array){
        let i = 0;
        for(let j in array) {
            if(array[j]){
                i++;
            }
        }
        return i;
    },
    inner_right_search(e){
        let obj = $(e.target)[0].attributes;
        let [kind, text] = [obj.kind.value, obj.name.value];
        this.setState({
            inner_search: true,
            kind: kind,
            inner_search_placeholder: text
        })
    },
    render(){
        let [condition, text] = [this.props.condition, this.state.text];
        return (
            <div>
                <div className={this.state.up ? 'animate_up condition' : 'animate_down condition'}>
                    <Row>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            店仓: <span style={{textAlign: 'left'}} className="store"><span data-type="store" onClick={this.handleClick} className="common">{text['store'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            品牌: <span className="all_brand"><span onClick={this.handleClick} data-type={condition[0]} className="common">{text['brand'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={6} style={{paddingLeft: '30px'}}>
                            <p className="pick_up"><span className="up_down" onClick={this.slideUp}>收起条件<Icon className="up" type={this.state.up ? 'down' : 'up'} /></span><Icon className="search" type="search" onClick={this.search_product_code} /></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={9} style={{textAlign: 'right'}}>
                            分类: <span className="inner_kind"><span className="common" data-type={condition[0]} onClick={this.handleClick}>{text['kind'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            <span className="range-before">库存范围:</span><span className="range"><input type="text"/> - <input type="text"/></span>
                        </Col>
                        <Col span={6} style={{paddingLeft: '30px'}}>
                            <a className="high_select" onClick={this.handleClick} data-type={condition[2]}>高级选项</a>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
});