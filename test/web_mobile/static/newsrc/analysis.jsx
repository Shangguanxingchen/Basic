import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

import Header from './component/Header'
import Salessummary from './component/Salessummary'
import KucunQuery from './component/KucunQuery'
import Follow from './component/Follow'
import OnlineQuery from './component/OnlineQuery'
import SaleQuery from './component/SaleQuery'

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={Header}>
                <IndexRedirect to="/xiaoshouhuizong" />
                <Route path="/xiaoshouhuizong" component={Salessummary} />
                <Route path="/kucunchaxun" component={KucunQuery} />
                <Route path="/shangpinpaihang" component={Follow} />
                <Route path="/liushuizhang" component={Follow} />
                <Route path="/xiaoshouribao" component={Follow} />
                <Route path="/fenleixiaoshou" component={Follow} />
                {/*<Route path="/zaituchaxun" component={OnlineQuery} />*/}
                {/*<Route path="/lingshouchaxun" component={SaleQuery} />*/}
            </Route>
        </Router>
    ),
    document.querySelector("#main")
)