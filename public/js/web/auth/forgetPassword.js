define([], function(){
		
	'use strict';
	
	function Module(){
		
		const pandora = new arguments[1]('bot', arguments);			
		//--------------------substantial logic--------------------//
		
		
		
		
		
		
		//--------------------event--------------------//
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
		
		document.querySelector('#resetPasswordBtn').addEventListener('click', function(){
			
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
			const userEmail = document.querySelector('#email').value;
			
			pandora.bx.ajaxSend({
				url : '/auth/forgetPassword.do',
				data : {
					id : userId,
					name : userName,
					email : userEmail
				},
				callback:function(result){
					if(result.msgCode==='U0000'){
						alert('초기화된 비밀번호는 ' + result.password + ' 입니다.');
						location.href = '/auth/login.do';
					}else{
						alert(result.msg);
					}
				}
			});
			
		});
		
		document.querySelector('#findEmailBtn').addEventListener('click', function(){
			location.href = '/auth/forgetEmail.do';
		});

		document.querySelector('#loginBtn').addEventListener('click', function(){
			location.href = '/auth/login.do';
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