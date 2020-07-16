import React from 'react';
import ReactDOM from 'react-dom';
import Zheader from './zh-header';
import Zfooter from './zh-footer';

 export default class App extends React.Component {
  render() {
    return (
      <div>
        <Zheader />
        <div>
        	<button onClick={activateLasers}>
			  激活按钮
			</button>
        </div>
        <Zfooter />
      </div>
    );
  }
}

 


