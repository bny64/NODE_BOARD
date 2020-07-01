define([], function(){
		
	'use strict';
	
	function Module(){
		
		const pandora = new arguments[1]('bot', arguments);			
		//--------------------substantial logic--------------------//
		
		
		
		
	   
		//--------------------event--------------------//		
		// input list
		const inputList = document.querySelectorAll('[data-validate].validate-input .input100');
		
		inputList.forEach(function(element){
			
			element.addEventListener('blur', function(){
			
				if (element.value.trim() !== '') {
					pandora.du.addClass(element, 'has-val');
				} else {
					pandora.du.removeClass(element, 'has-val');
				}
			});
		});
		
		document.querySelector('#findEmailBtn').addEventListener('click', function(){
			
			let check = true;
			
			inputList.forEach(function(element) {
				if (!validate(element)) {
					showValidate(element);
					check = false;
				}
			});
			
			if (!check)	return;
			
			const userId = document.querySelector('#id').value;
			const userName = document.querySelector('#name').value;
			
			pandora.bx.ajaxSend({
				url : '/auth/forgetEmail.do',
				data : {
					id : userId,
					name : userName
				},
				callback:function(result){
					if(result.msgCode==='S0002') alert(result.msg);
					else if(result.msgCode==='S0000'){
						alert('이메일은 ' + result.email + ' 입니다');
					}
				}
			});
		});
		
		document.querySelector('#loginBtn').addEventListener('click', function(){
			location.href = '/auth/login.do';
		});
		
		document.querySelector('#resetPasswordBtn').addEventListener('click', function(){
			location.href = '/auth/forgetPassword.do';
		});
		//--------------------event--------------------//
		
		
		
		
		
		//--------------------fucntion--------------------//
		function validate(input) {
			if (input.getAttribute('type') == 'email' || input.getAttribute('name') == 'email') {
				if (input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
					return false;
				}
			} else {
				if (input.value.trim() == '') {
					return false;
				}
			}
			
			return true;
		}

		function showValidate(input) {
			let thisAlert = input.parentNode;
			pandora.du.addClass(thisAlert, 'alert-validate');
		}

		function hideValidate(input) {
			let thisAlert = input.parentNode;
			pandora.du.removeClass(thisAlert, 'alert-validate');
		}
		//--------------------fucntion--------------------//
		
		
		
		
		
		//--------------------substantial logic--------------------//	   
	}
	
   return Module;
});