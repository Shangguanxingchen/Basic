/**
 * Created by zhousuyang on 16/11/22.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import $ from 'jquery';

import {Row, Col, DatePicker, Icon, Checkbox, Input, Table} from 'antd';
import moment from 'moment';

module.exports = React.createClass({
    getDefaultProps(){
        return {
            condition: ['store', 'kind', 'brand', 'high']
        }
    },
    getInitialState(){
        let page = sessionStorage.getItem('page_2_1') ? parseInt(sessionStorage.getItem('page_2_1')) : 1;
        let product_name = sessionStorage.getItem('product_name_2_1') ? sessionStorage.getItem('product_name_2_1') : '';
        let pageSize = sessionStorage.getItem('pageSize_2_1') ? parseInt(sessionStorage.getItem('pageSize_2_1')) : 20;
        return {
            up: false,
            mask: false,
            start: '',
            end: '',

            condition: {},//包含分类、高级选项
            lists: {'store': [], 'kind': [], 'brand': [], 'high': []},
            checked: {'store': [], 'kind': [], 'brand': [], 'high': []},
            text: {'store': [], 'kind': [], 'brand': []},

            //table 列表的数据
            currentPage: page,
            pageSize: pageSize,
            total: 0,
            total_amount: 0,
            total_qty: 0,
            head_columns: [],
            head_columns_key: [],
            dataSource: [],
            marge_index: [],

            product_name: product_name, //搜索的名称

            search_product_code: false,


            screen_width: 0, //屏幕宽度
            add_class: ['active ', '', '']
        }
    },
    componentDidMount(){
        $(function() {
            FastClick.attach(document.body);
         });
        let width = window.screen.width;
        this.state.screen_width = width*2;
    },
    handleClick(e){
        let [type, titles]
            =
            [e.target.dataset.type, {title: '', h_title: '', id: '', name: '', condition: ''}];
        switch(type){
            case 'store':
                titles.title = '店仓';
                titles.h_title = '* 请选择店仓';
                titles.id = 'shop_id';
                titles.name = 'shop_name';
                titles.code = 'shop_code';
                titles.condition = 'store';
                break;
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
    list_check(){
        let [checked, list, titles] = [this.state.checked, this.state.lists, this.state.condition];
        if(titles.hasOwnProperty('name')){
            let [data, isChecked] = [list[titles.condition], checked[titles.condition]];
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
            // var obj = this.common_ajax();

            // sessionStorage.setItem('ajax_4', JSON.stringify(obj));

            // SalessummaryAction.table(obj);
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
    handleSClick(e){
        let [index, add_class] = [e.target.dataset.index, this.state.add_class];
        for(let i in add_class){
            if(i == index){
                add_class[i] = 'active ';
                continue;
            }
            add_class[i] = '';
        }
        this.setState({
            add_class: add_class
        })
    },
    render(){
        let [condition, text, arr] =
            [this.props.condition, this.state.text, ['SPU', 'SKU', 'SKC']]
        return (
            <div>
                <div  className={this.state.up ? "animate_up condition" : "animate_down condition"}>
                    <Row>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            店仓: <span className="inner_kind"><span onClick={this.handleClick} data-type={condition[0]} className="common">{text['store'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            分类: <span className="inner_kind"><span onClick={this.handleClick} data-type={condition[1]} className="common">{text['kind'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={6} style={{paddingLeft: '30px'}}>
                            <p className="pick_up"><span className="up_down" onClick={this.slideUp}>收起条件<Icon className="up" type={this.state.up ? 'down' : 'up'} /></span><Icon className="search" type="search" onClick={this.search_product_code} /></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={9} style={{paddingLeft: '30px'}}>
                            品牌: <span className="inner_kind"><span onClick={this.handleClick} data-type={condition[2]} className="common">{text['brand'].join(' ')}</span><Icon type="right" /></span>
                        </Col>
                        <Col span={8} style={{paddingLeft: '30px'}}>
                            <a className="high_select" onClick={this.handleClick} data-type={condition[3]}>高级选项</a>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        {
                            arr.map((item, index) => {
                                return <Col span={8} key={index}>
                                        <div className={this.state.add_class[index] + "sss"} data-index={index} onClick={this.handleSClick}>SPU</div>
                                    </Col>
                            })
                        }
                    </Row>
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
    search_product(){
        // let [text, obj] = [$(".product_name").val(), this.common_ajax(1)];
        // obj.product_name = text;
        // this.state.currentPage = 1;
        // this.state.search_product_code = false;
        // this.state.product_name = text;
        this.setState({
            search_product_code: false
        })
    },
    search_product_code(){
        this.setState({
            search_product_code: true
        })
    }
})