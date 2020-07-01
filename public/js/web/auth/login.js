define([], function(){
		
	'use strict';
	
	function Module(){
		
		const pandora = new arguments[1]('bot', arguments);			
		//--------------------substantial logic--------------------//
		
		
		
		//--------------------init--------------------//
		const cookieId = pandora.$.cookie('userId');
		if(cookieId){			
			const inputEmail = document.querySelector('#email');
			pandora.du.addClass(inputEmail, 'has-val');
			inputEmail.value = cookieId;			
			document.querySelector('#ckb1').setAttribute('checked', true);
			chkIdMsg.style.display = '';
		}
		//--------------------init--------------------//
		
		
		
		
		
		//--------------------event--------------------//
		//input blur event
		document.querySelectorAll('.input100').forEach(function(element){
			element.addEventListener('blur', function(){
				if(element.value.trim()!== ''){
					pandora.du.addClass(element, 'has-val');
				}else{
					pandora.du.removeClass(element, 'has-val');
				}
			});
		});
		
		//input list
	   const inputList = document.querySelectorAll('[data-validate].validate-input .input100');
		
	   //input focus event
	   inputList.forEach(function(element){	   
		   element.addEventListener('focus', function(){
			   hideValidate(element);
		   });	   
	   });
	   
	   document.querySelectorAll('#email, #password').forEach(function(element){
		   element.addEventListener('keydown', function(e){
			   login(e);
		   });
	   });

	   document.querySelector('#loginBtn').addEventListener('click', function(e){
		login(e);
	   });
	   	   
	   document.querySelector('#ckb1').addEventListener('change', function(){
		   if(this.checked) chkIdMsg.style.display = '';
		   else chkIdMsg.style.display = 'none';
		});
	   //--------------------event--------------------//
	   

	   
	   
	   
	   //--------------------function--------------------//
		function login(e){

			if(e.type==='keydown'){
				if(!(e.which && e.which===13)) return;				
			}

			let check = true;
		   
			e.preventDefault();
			
			inputList.forEach(function(element){
				if(validate(element)===false){
					showValidate(element);
					check = false;
				}
			});
			
			if(!check) return;
			
			//set jquery cookie
			setCookie();
			
			pandora.bx.ajaxSend({
				url : '/auth/login.do',
				data : {
					email : document.getElementById('email').value,
					password : document.getElementById('password').value
				},
				token : false,
				callback : function(result){					
					if(result.msgCode==='OK') location.href = '/index.do';					
				}
			})
		}

	   function validate (input) {
	       if(input.getAttribute('type') == 'email' || input.getAttribute('name') == 'email') {
	           if(input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
	               return false;
	           }
	       }
	       else {
	           if(input.value.trim() == ''){
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
	   
	   function setCookie(){
		   
		   const checked = document.querySelector('#ckb1').checked;
		   if(checked){
			   const userId = document.querySelector('#email').value;
			   pandora.$.cookie('userId', userId, {expires:30, path:'/'});
		   }else{
			  if(pandora.$.cookie('userId')) pandora.$.removeCookie('userId', {path:'/'}); // => true
		   }
	   }
	 //--------------------function--------------------//
	   
	   
	   
	   
	   
	 //--------------------substantial logic--------------------//
	   
	}
	
   return Module;
});