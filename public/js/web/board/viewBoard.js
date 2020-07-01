define([], function(){
	
	'use strict';
	
	function Module(){
		
		const vp = arguments[0].getGlobalVal();
		const pandora = new arguments[1]('bot', arguments);
		
		//--------------------substantial logic--------------------//
		
		
		
		
		const listNo = document.querySelector('#listNo').value;
		//--------------------event--------------------//
		const delBtn = document.querySelector('#deleteBtn');
		const modBtn = document.querySelector('#modifyBtn');
		
		if(delBtn){
			delBtn.addEventListener('click', function(){
				if(confirm('정말 삭제하시겠습니까?')){
					pandora.bx.ajaxSend({
						url : '/board/deleteBoard.do',
						data : {
							listNo : listNo
						},
						promise : true
					}).then(function(result){
						if(result.msgCode==='D0000'){
							alert(result.msg);
							location.href = '/board/boardList.do';
						}
					}).catch(function(err){
						alert(error.msg);
					});
				}
			});
		}
		
		if(modBtn){
			modBtn.addEventListener('click', function(){
				location.href = '/board/modifyBoard.do?listNo='+listNo;
			});
		}
		
		document.querySelector('#backBtn').addEventListener('click', function(){
			location.href = '/board/boardList.do'
		});
		//--------------------event--------------------//
		
		
		
		
		
		//--------------------substantial logic--------------------//
		
	}
	
	return Module;
	
});