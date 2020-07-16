import React from 'react';
import ReactDOM from 'react-dom';
import './zh-header.css';

export default class Zheader extends React.Component {
    render() {
	    return (
	        <div className = "header"> 
			    <div className = "wp">
			        <ul>
				        <li>首页</li>
				        <li>分类</li>
			        </ul>
			        <div>
			        	<input type="text" /> search 
			        </div>
			    </div>
		    </div>
		)   
    }
}


