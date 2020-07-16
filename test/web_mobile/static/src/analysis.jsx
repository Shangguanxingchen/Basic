var React = require('react');
var ReactDOM = require('react-dom');

// var Index = require('./component/Index');

var Header = require('./component/Header');
var Salessummary = require('./component/Salessummary');
var KucunQuery = require('./component/KucunQuery');
var Follow = require('./component/Follow');

import SalesAnalysis from './component/SalesAnalysis'
import StoreKuCun from './component/StoreKuCun1'
import NowSales from './component/NowSales'
import OtherExcel from './component/OtherExcel'
import ProductSort from './component/ProductSort1'
import OnlineKucun from './component/OnlineKucun'
import SalesKucun from './component/SalesKuCun1'
import StoreXiaoCun from './component/StoreXiaoCun1'
import Receipts from './component/Receipts'
import PanDian from './component/PanDian'
import SaleCircle from './component/SaleCircle'
import SaleTotal from './component/SaleTotal'
import SaleDay from './component/SaleDay'
import PayMent from './component/PayMent'
import OnlinePay from './component/OnlinePay'
import SaleTotals from './component/SaleTotals'
{/*import PayTotal from './component/PayTotal';*/}

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';


ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={Header}>
                {/*<IndexRedirect to="/kucunchaxun"/>
                <Route path="/kucunchaxun" component={KucunQuery}/>
                <Route path="/mendiankucun" component={KucunSummary}/>
                <Route path="/zaitukucun" component={OnlineKucun}/>
                <Route path="/lingshoukucun" component={Follow}/>
                <Route path="/lingshouchaxun" component={Follow}/>
                <Route path="/shangpinpaihang" component={ProductSort}/>
                <Route path="/xiaoshouzhoubao" component={Salessummary}/>
                <Route path="/yuangongchaxun" component={Follow}/>
                <Route path="/xiaoshoufenxi" component={SalesAnalysis}/>
                <Route path="/dangrixiaoshou" component={NowSales}/>
                <Route path="/yewudanju" component={Follow}/>
                <Route path="/qitabaobiao" component={OtherExcel}/>*/}

                <IndexRedirect to="/kucunhuizong" />
                <Route path="/kucunhuizong" title="门店库存" component={StoreKuCun} />
                <Route path="/zaitukucun" title="在途库存" component={OnlineKucun} />
                <Route path="/lingshoukucun" title="销售库存" component={SalesKucun} />
                <Route path="/salecircle" title="销售环比" component={SaleCircle} />
                <Route path="/saletotal" title="销售统计" component={SaleTotal} />
                <Route path="/saleday" title="销售日报" component = {SaleDay} />
                <Route path="/shangpinpaihang" title="商品排行" component={ProductSort} />
                <Route path="/lingshouhuizong" title="门店库存" component={Salessummary} />
                <Route path="/xiaoshoufenxi" title="销售分析" component={SalesAnalysis} />
                <Route path="/dangrixiaoshou" title="门店库存" component={NowSales} />
                <Route path="/yewudanju" title="业务单据" component={Receipts} />
                <Route path="/storexiaocun" title="店面进销存" component={StoreXiaoCun} />
                <Route path="/pandian" title="门店库存" component ={PanDian} />
                <Route path="/qitabaobiao" title="门店库存" component={OtherExcel} />
                <Route path="/saletotals" title="商场折扣统计" component={SaleTotals} />
                <Route path="/payment" title="付款方式查销售" component={PayMent} />
                <Route path="/onlinepay" title="在线支付" component={OnlinePay} />
                {/*<Route path="/paytotal" component={PayTotal} />*/}
            </Route>

        </Router>

    ), document.querySelector("#main")
)