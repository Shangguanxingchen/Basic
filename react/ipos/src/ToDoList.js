import React, {Component, Fragment} from 'react';

class ToDoList extends Component {
    constructor (props) {
        super(props);
        this.state = {
      		items:[
		        {text: "H1"},
		        {text: "导购宝"},
		        {text: "导购宝自提"},
		        {text: "小程序"}
		    ]
        };
    }
    
    render () {
    	return (
	      	<Fragment>
		        <ul>
		        	{this.state.items.map((item,index) => {
		        		return(
		        			<li key={index}>
					            <div className="classify-detail h60 lh60 pad-r">{item.text}</div>
					            <div className="classify-detail ">
					                <div className="pad-t4"><span>商品数量：0</span></div>
					                <div><span>订单数量：0</span></div>
					                <div><span>销售额：0.00</span></div>
					            </div>
				            </li>
		        		) 
		        	})}
		            
		        </ul>
	        </Fragment>
	    )
    }
  
}

export default ToDoList;