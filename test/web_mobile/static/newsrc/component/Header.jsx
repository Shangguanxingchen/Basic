import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import 'antd/dist/antd.min.css';
import '../css/common.css';
import $ from 'jquery';

module.exports = React.createClass({
    getInitialState(){
        return {
            active: 3
        }
    },
    //点击列头改变对应状态值
    changeActive(e){
        var index = e.target.dataset.index;
        this.setState({
            active: index
        })
    },
    //导航栏
    nav(){
        var array = [
            {text: '商品排行', path: '#/shangpinpaihang'},
            {text: '日流水账', path: '#/liushuizhang'},
            {text: '销售日报', path: '#/xiaoshouribao'},
            {text: '销售汇总', path: '#/xiaoshouhuizong'},
            {text: '分类销售', path: '#/fenleixiaoshou'},
            {text: '库存查询', path: '#/kucunchaxun'},
            // {text: '在途查询', path: '#/zaituchaxun'},
            // {text: '零售查询', path: '#/lingshouchaxun'},
        ];

        var list = array.map((item, index)=> {
            return (
                <Col key={index} span={index == 1 ? 3 : 4}>
                    <a onClick={this.changeActive} href={item.path}
                       className={this.state.active == index ? "active" : ""}
                       data-index={index}
                    >
                        {item.text}
                    </a>
                </Col>
            )
        })
        return list;
    },
    render(){
        return (
            <div>
                <Row className="nav_header">
                    <Col span={1}/>
                    {this.nav()}
                </Row>

                {this.props.children}

            </div>
        )
    },
    componentDidMount(){
        $(function() {
            FastClick.attach(document.body);
         });
    }
})
