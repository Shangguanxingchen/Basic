import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

var Sale = require('./component/Sale.jsx');

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
	<Sale tittle='门店销售' />
  ,
	document.getElementById('main')
)
