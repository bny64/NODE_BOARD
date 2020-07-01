define([], function(){
	
	'use strict';
	
	function Module(){
		
		//const vp = arguments[0].getGlobalVal();
		const pandora = new arguments[1]('bot', arguments);
		
		// 생일 고르는 날짜 셋팅
		pandora.$("#birth").datepicker({
			onSelect : function() {
				const that = document.querySelector('#birth');
				if (that.value !== '')
					pandora.du.addClass(that, 'has-val');
				else
					pandora.du.removeClass(that, 'has-val');
			}
		});

		/**
		 * 이벤트
		 */
		// button #chkValId click 이벤트
		document.querySelector('#chkValId').addEventListener('click', function(e) {

			const that = this;
			let userId = document.querySelector('#id').value;

			if (userId === '') {
				document.querySelector('#id').value = '';
				alert('ID를 입력해 주세요.')
				return;
			}
			
			pandora.bx.ajaxSend({
			   url : '/auth/chkValId.do',
			   data : {id : userId},
			   token : false,
			   callback:function(result){
				   const data = result;
				   if(data.msgCode==='AC0001'){
					   let idTag = document.querySelector('#id');
					   idTag.value = '';
					   idTag.focus();
				   }else if(data.msgCode==='AC0000'){
					   document.querySelector('#checkValIdYn').value = 'Y';
				   }
				   alert(data.msg);
			   }
		   });
		});

		// input #id focus 이벤트
		document.querySelector('#id').addEventListener('focus', function() {
			const that = this;
			if (document.querySelector('#checkValIdYn').value === 'Y')
				that.value = '';
			document.querySelector('#checkValIdYn').value = 'N';
		});

		// button #chkValEmail click 이벤트
		document.querySelector('#chkValEmail').addEventListener('click',function () {
		    const that = this;
		    let userEmail = document.querySelector('#email').value;

	        if(!validate(document.querySelector('#email'))){		    	
		    	return;
		    }
	        else if (userEmail === '') {
	            document.querySelector('#email').value = '';
	            alert('이메일을 입력해 주세요.')
	            return;
	        }

	        pandora.bx.ajaxSend({
	            url: '/auth/chkValEmail.do',
	            data: {
	                email: userEmail
				},
				token : false,
	            callback: function (result) {
	                const data = result;
	                if (data.msgCode === 'EM0001') {
	                    let emailTag = document.querySelector('#email');
	                    emailTag.value = '';
	                    emailTag.focus();
	                } else if (data.msgCode === 'EM0000') {
	                    document.querySelector('#checkValEmailYn').value = 'Y';
	                }
	                alert(data.msg);
	            }
	        });
		});

		// input #email focus 이벤트
		document.querySelector('#email').addEventListener('focus', function() {
			const that = this;
			if (document.querySelector('#checkValEmailYn').value === 'Y')
				that.value = '';
			document.querySelector('#checkValEmailYn').value = 'N';
		});

		// IE, EDGE (X)
		/*
		 * document.querySelector('#birth').addEventListener('change', function(){
		 * const that = this; if(that.value!=='') domUtil.addClass(that, 'has-val');
		 * else domUtil.removeClass(that, 'has-val'); });
		 */

		// input blur 이벤트
		[].filter.call(document.querySelectorAll('.input100'), function(element) {
			return pandora.du.hasClass(element, 'datepicker') ? false : true;
		}).forEach(function(element) {
			element.addEventListener('blur', function() {
				if (element.value.trim() !== '') {
					pandora.du.addClass(element, 'has-val');
				} else {
					pandora.du.removeClass(element, 'has-val');
				}
			});
		});

		// input list
		const inputList = document.querySelectorAll('[data-validate].validate-input .input100');

		// join button
		const joinForm = document.querySelector('#joinForm');

		// input focus 이벤트
		inputList.forEach(function(element) {
			element.addEventListener('focus', function() {
				hideValidate(element);
			});
		});

		// button #joinBtn submit 이벤트
		joinForm.addEventListener('submit', function(e) {

			const that = this;
			let check = true;

			e.preventDefault();

			if (document.activeElement !== document.querySelector('.login100-form-btn#joinBtn')) return;

			inputList.forEach(function(element) {
				if (!validate(element)) {
					showValidate(element);
					check = false;
				}
			});

			if (!check)	return;

			if (document.querySelector('#checkValIdYn').value === 'N') {
				alert('ID를 중복체크 해주세요.');
				return;
			} else if (document.querySelector('#checkValEmailYn').value === 'N') {
				alert('이메일을 중복체크 해주세요.');
				return;
			}

			that.submit();

		});

		document.querySelector('#loginBtn').addEventListener('click', function() {
			location.href = '/auth/login.do';
		});

		/**
		 * 함수
		 */
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
	}
	
	return Module;
	
});