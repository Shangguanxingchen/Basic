import React from 'react';
import ReactDOM from 'react-dom';
var $ = require('jquery');

var Sale = require('./component/Sale11.jsx');

import {Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';

ReactDOM.render(
	<Sale tittle='销售简报' />
  ,
	document.getElementById('main')
)
