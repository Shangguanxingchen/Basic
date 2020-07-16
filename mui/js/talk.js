!function(window, document, undefined) {
	var init = function() {
		initTalkList();
		initEvent();
	};
	
	var initEvent = function() {
		document.getElementById('sendBtn').onclick = onSendBtnClick;
	};
	
	var onSendBtnClick = function() {
		var msgText = document.getElementById('msgText'),
			msg = msgText.value,
			url;
			
		// check
		
		url = 'http://localhost/wbc/api/talk_add.php?callback=abc&uid=1&msg=' + msg;
		
		request(url);
		msgText.value = '';
	};
	
	var initTalkList = function() {
		request('http://localhost/wbc/api/talk_list.php?callback=renderList');
	}; 
	
	var renderList = function(response) {
		var msgList = document.getElementById('msgList'),
		    data = response.data,
		    len = data.length,
		    arr = [];
		//console.log(response.data);    
		if (!response.success) {
			alert('请求失败');
			return;
		}
		    
		for(var i=0; i<len; i++) {
			arr.push(
				   '<li>',
				        data[i].msg,
				   '</li>'
			);
		}
		
		msgList.innerHTML = arr.join('');
	};
	
	var request = function(url) {
		var script = document.createElement('script');
		script.src = url;
		
		document.body.appendChild(script);
		document.body.removeChild(script);
	};
	
	/*setInterval(initTalkList, 1000);*/
	
	window.onload = init;
	window.renderList = renderList;
}(window, document);
