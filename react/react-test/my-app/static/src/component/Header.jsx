import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import $ from 'jquery';

module.exports = React.createClass({

    getInitialState(){
        return {
            head_nav: [
                {
                    show: false,//true:列表展开, false,列表合起
                    list: [
                        {
                            'text': '库存查询',
                            'active': false, //独立处理,作为导航一级菜单,false: 表示并未点击,不添加特殊样式, true: 表示点击,添加新样式
                        },
                        {
                            'text': '门店库存',
                            'path': '#/kucunhuizong',
                            'active': false, //判定是否点击,若点击则为true并添加active类
                        },
                        // {
                        //     'text': '按销售尺码查库存',
                        //     'path': '#/zaitukucun',
                        //     'active': false,
                        // }
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '零售查询',
                        },
                        {
                            'text': '商品排行',
                            'path': '#/shangpinpaihang',
                            'active': false,
                        },
                        {
                            'text': '销售库存',
                            'path': '#/lingshoukucun',
                            'active': false,
                        },
                        {
                            'text': '销售环比',
                            'path': '#/salecircle',
                            'active': false,
                        },
                        {
                            'text':'销售统计',
                            'path':'#/saletotal',
                            'active':false,
                        },
                        {   
                            'text':'销售日报',
                            'path':'#/saleday',
                            'active':false,

                        }
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '员工查询',
                            'active': false,
                        },
                        {
                            'text': '销售分析',
                            'path': '#/xiaoshoufenxi',
                            'active': false,
                        }
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '业务单据',
                            'active': false,
                        },
                        {
                            'text': '业务单据',
                            'path':'#/yewudanju',
                            'active': false,
                        },
                        {
                            'text': '店面进销存',
                            'path':'#/storexiaocun',
                            'active': false,
                        }
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '其他报表',
                            'active': false,
                        },
                        {
                            'text':'商场折扣统计',
                            'path':'#/saletotals',
                            'active':false,
                        },{
                            'text':'付款方式查销售',
                            'path':'#/payment',
                            'active':false,
                        },{
                            'text':'在线支付',
                            'path':'#/onlinepay',
                            'active':false,
                        }
                    ]
                }
            ],
        }
    },
    componentDidMount(){
        $(function() {
            FastClick.attach(document.body);
         });
    },
    render(){
        return (
            <div>
                <Row className='nav_header'>
                    <Col span={1}/>
                    {this.nav()}
                    <Col span={3}/>
                </Row>
                <div onClick={this.hideNav}>
                    {this.props.children}
                </div>
            </div>
        );
    },
    hideNav(){
        var head_nav = this.state.head_nav;
        for(var i in head_nav){
            head_nav[i].show = false;
        }
        this.setState({
            head_nav: head_nav
        })
    },
    nav(){
        let array = this.state.head_nav;
        let element = array.map((item, index) => {
            return <Col span={4} key={index}><ul>
                {
                    item.list.map((obj, index2) => {
                        if(index2 == 0){
                            return <li key={index2} onClick={this.show_list} data-index={index} className={array[index]['list'][index2].active ? 'head_list has_clicks' : 'head_list'}>
                                    {obj.text}
                                    <i className={array[index]['list'][index2].active ? 'change_color' : 'init_color'}></i>
                                    <div className={this.show_class(index) + ' triggle'}></div>
                            </li>
                        }
                        return <li key={index2} className={this.show_class(index)}>
                            <a data-index={index} data-index2={index2} onClick={this.show_list_a} className={array[index]['list'][index2].active ? 'last_list' : ''} href={obj.path}>
                                {obj.text}
                            </a>
                        </li>
                    })
                }
            </ul></Col>
        })
        return element;
    },
    show_class(index){
        let array = this.state.head_nav;
        if(array[index].list.length == 1){
            return 'hide';
        }
        if(array[index].show){
            return 'show'
        }
        return 'hide'
    },
    show_list(e){
        let [index, head_nav] = [e.target.dataset.index, this.state.head_nav];
        for(let i in head_nav){ //显示还是隐藏
            if(i == index){
                head_nav[i].show = !head_nav[i].show //点击导航一级菜单, 显示/隐藏
                head_nav[i].list[0].active = true; //被点击的一级菜单,设为true,添加新样式
                continue;
            }
            head_nav[i].list[0].active = false; //其余一级菜单设为false,取消新样式
            head_nav[i].show = false;//其余一级菜单全部隐藏
        }
        this.setState({
            head_nav: head_nav
        })
    },
    show_list_a(e){
        let [index, index2, head_nav] = [e.target.dataset.index, e.target.dataset.index2, this.state.head_nav];
        app.piwik_push(head_nav[index]['list'][index2]['text'] + '(进入)');
        for(let i in head_nav){
            head_nav[i].show = false;//点击二级菜单,跳转的同时隐藏所有二级菜单
        }
        for(let i in head_nav){
            for(let j in head_nav[i].list){
                if(j>0){//注意,此处必须如此,因为一级菜单特殊处理
                    head_nav[i].list[j].active = false;//取消所有二级菜单的新样式
                }
            }
        }
        head_nav[index].list[index2].active = true; //被点击的二级菜单添加新样式
        this.setState({
            head_nav: head_nav
        })
    }
})