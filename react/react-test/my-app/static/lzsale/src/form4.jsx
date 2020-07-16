import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

var Store = require('./component/Store.jsx');

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Store tittle = '库存分析' />,
	document.getElementById('main4')
)
