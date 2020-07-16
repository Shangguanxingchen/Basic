
var $ = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

var Week = require('./component/Week.jsx');


ReactDOM.render(
  <Week tittle='门店周报' />,
	document.getElementById('main3')
)
