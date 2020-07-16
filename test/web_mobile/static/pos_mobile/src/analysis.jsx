import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

var Header = require('./component/Header');
var Day = require('./component/Day');
var Month = require('./component/Month');

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
		(
    <Router history={hashHistory}>
      <Route path= "/" component = {Header} />
      <Route path= "/header" component = {Header} />
      <Route path = "/day" component = {Day} />
      <Route path = "/month" component = {Month} /> 
    </Router>
	),
	document.getElementById('main')
)
