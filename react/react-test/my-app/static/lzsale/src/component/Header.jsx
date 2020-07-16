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
                            'text': '门店销售',
                            'path': '#/sale',
                            'active': false, //判定是否点击,若点击则为true并添加active类
                        }
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '门店指标',
                            'path': '#/indicator',
                            'active': false,
                        },
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '门店周报',
                            'path': '#/week',
                            'active': false,
                        }
                    ]
                },{
                    show: false,
                    list: [
                        {
                            'text': '库存分析',
                            'path':'#/store',
                            'active': false,
                        }
                    ]
                }
            ],
        }
    },
    componentDidMount(){
        let arr = ['#/sale', '#/indicator', '#/week', '#/store'],
            url = window.location.href,
            flag = 0;
        for(let i in arr){
            if(url.indexOf(arr[i]) >= 0){
                flag = i;
            }
        }
        $('.nav_header a').removeClass('active');
        $('.nav_header a').eq(flag).addClass('active');
    },
    render(){
      return (
        <div>
          <Row className='nav_header Nav '>
            <Col span={2}/>
                {this.nav()}
            <Col span={2}/>
          </Row>
          <div onClick={this.hideNav} style={{paddingTop:'70px'}}>
              {this.props.children}
          </div>
        </div>
      )
    },
    nav(){
      var head_nav = this.state.head_nav;
      let element = head_nav.map((item,index) => {
        return <Col span={5} key={index}>
          {
            item.list.map((item1,index1) => {
              return <a  key={index1} data-index={index}  data-index1={index1} onClick ={this.show_list} className = 'color_header' href={item1.path} style={{display:'block',width:'100%',height:'100%'}}>{item1.text}</a>
            })
          }
        </Col>
      })
      return element;
    },
    show_list(e){
        $(e.target).addClass('active').parent().siblings().find('a').removeClass('active');
    },
    hideNav(){
      var head_nav = this.state.head_nav;
      for(var i in head_nav){
        head_nav[i].show = false;
      }
      this.setState({
        head_nav:head_nav
      })
    }
})