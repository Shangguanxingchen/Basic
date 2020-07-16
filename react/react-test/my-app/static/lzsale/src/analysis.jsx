import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

var Header = require('./component/Header');
var Sale = require('./component/Sale');
var Week = require('./component/Week');
var Store = require('./component/Store');
var Indicator = require('./component/Indicator');
var Day = require('./component/Day');
var Month = require('./component/Month');


import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
		(
    <Router history={hashHistory}>
      <Route path="/" component={Header}>
      	// <IndexRedirect to="/sale" />
      	<Route path="/sale" tittle="销售日报" component={Sale} />
        <Route path="indicator" tittle="店员指标" component={Indicator} />
        <Route path = "/day" component = {Day} />
        <Route path = "/month" component = {Month} /> 
      	<Route path="/week" tittle="销售周报" component={Week} />
      	<Route path="/store" tittle="库存分析" component={Store} />
      </Route>
    </Router>
	),
	document.getElementById('main')
)
