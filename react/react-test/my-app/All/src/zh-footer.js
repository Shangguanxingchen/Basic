import React from 'react';
import ReactDOM from 'react-dom';

export default class Zfooter extends React.Component {
    render() {
	    return (
	        <div style = {footer}> Footer </div>
		)   
    }
};

var footer = {
	height: 50,
	lineHeight: '50px',
	color: 'blue',
	backgroundColor: '#ccc',
	textAlign: 'center',
	position: 'absolute',
	left: '0',
	bottom: '0',
	width: '100%'
}