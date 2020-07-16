import '../common/lib';
import ReactDOM from 'react-dom';
import React from 'react';
import MenuList from '../component/Menu';
import '../component/App.less';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';

// 这里是需要显示的内容模板 About 和 Users
import { About } from '../component/master/About';
import { Users } from '../component/Users';


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={MenuList}>
            <IndexRoute component={About} />
            <Route path="about" component={About} />
            <Route path="users" component={Users} />
        </Route>
    </Router>
), document.getElementById("content"));