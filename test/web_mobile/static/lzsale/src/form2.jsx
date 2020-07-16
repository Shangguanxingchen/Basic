import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

var Indicator = require('./component/Indicator.jsx');
var Day = require('./component/Day.jsx');
var Month = require('./component/Month.jsx'); 
// <Day />
// <Month />

ReactDOM.render(
	<div>
		<Indicator tittle='门店指标' />
	</div>
	,
	document.getElementById('main2')
)
