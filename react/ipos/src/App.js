import React from 'react';
import ToDoList from './ToDoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="app" className="layout">
        <div className="sell">
          <div className="nav">
            <div className="nav-l pad-l">销售统计</div>
            <div className="nav-m">
              <span>实时查询</span>
              <span>历史查询</span>
            </div>
            <div className="nav-r">
              日期
            </div>
            <div className="clear"></div>
          </div>

          <div className="clearfloat">
            <div className="selldetail border-r">
              <div className="oto-details oto-total">线上、线下销售合计</div>
              <div className="oto-details pad-l pad-r amount">
                <span>销售额</span>
                <span className="shuliang">0.00</span>
              </div>
              <div className="oto-details pad-l pad-r number">
                <span>销售单数</span>
                <span className="shuliang">0笔</span>
              </div>
              <div className="oto-details pad-l pad-r quantity">
                <span>销售数量</span>
                <span className="shuliang">0件</span>
              </div>
            </div>
            <div className="selldetail">
              图表
            </div>
          </div>

          <div className="classify">
            <ToDoList></ToDoList>
          </div>
        </div>

        <div className="mt">
          <div className="member-wp pad-l">员工销售统计</div>
          <div className="member-details">
            表格
          </div>
        </div>
      </div>
    );
  }
}

export default App;
