/**
 * AJAX function
 * AJAX 함수
 * */
define(['jquery'], function($){
	
	/**
	 * bAjax.ajaxSend : ajax send
	 * [bAjax.ajaxSend : ajax 전송]
	 * 
	 * bAjax.ajaxSendAll : ajax parallel send
	 * [bAjax.ajaxSendAll : ajax 병렬 전송]
	 * 
	 * bAjax.ajaxForm : ajax form send(It's made by jquery)
	 * [bAjax.ajaxForm : ajax form 전송]
	 * */
	
	class bAjax {
		
		constructor(){
			
		}
		
		/**
		 * asynchronous send function
		 * [비동기 호출 함수]
		 * if you input callback function in the settings value, callback function will be excuted
		 * [settings값에 callback 함수를 넣어주는 경우 callback 함수 실행]
		 * if there's no callback function, It will return promise
		 * [callback 함수 없는 경우는 promise를 리턴]
		 * */
		ajaxSend(settings){
						
			const that = this;
			let result = {};//result value
			const xhr = new XMLHttpRequest();
			
			const ajaxSetting = {				
				type : 'post', //reqeust type[reqeust 타입]
				url : '', //url
				async : true, //asynchronous status[비동기 여부]
				promise : false, //promise usage status[promise 사용 여부]
				data : {}, //request data
				mtnData : {}, //maintain data[유지되는 데이터]
				token : true, //json web token 토큰 값
				header : 'Content-type', //header type[헤더 타입]
				headerValue : 'application/json; charset=UTF-8', //header value[헤더 값]	
				dataType:'json',
				error : function(result){
					let msg = '요청 url : ' + result.url + '\nMessage : ' + result.msg 
						+ (result.msgCode ? ('\n코드 : ' + result.msgCode) : '') + (result.status===403 ? '\n세션이 만료되었습니다.' : '');
					alert(msg);
					if(result.status===403) location.reload();
				}
			};
			
			Object.assign(ajaxSetting, settings);
			
			xhr.open(ajaxSetting.type, ajaxSetting.url, ajaxSetting.async);
			xhr.setRequestHeader(ajaxSetting.header, ajaxSetting.headerValue);			
			
			/* if(ajaxSetting.token){
				const jsonToken = document.querySelector('#_token').getAttribute('content');				
				xhr.setRequestHeader('jwt', jsonToken);
			} */
			
			xhr.responseType = ajaxSetting.dataType;
			
			if(ajaxSetting.promise){
				
				return new Promise(function(resolve, reject){
					
					xhr.onreadystatechange = function(){		
						
						if(xhr.readyState===4){
							
							let resValue = xhr.response;										
							
							if(resValue){								
								if(xhr.responseType!=='json') resValue = JSON.parse(xhr.response);
								result = that.parseRtnType(resValue);
							}							

							result.status = xhr.status;
							
							//success
							if(xhr.status===200){						
								if(ajaxSetting.mtnData) result.mtnData = ajaxSetting.mtnData;
								resolve(result);
								
							//error
							}else{								
								result.url = xhr.responseURL;
								reject(result);
							}
						}					
					};
					
					xhr.send(JSON.stringify(ajaxSetting.data));
					
				});			
				
			}else{
				
				xhr.onreadystatechange = function(){
					
					if(xhr.readyState===4){
						
						let resValue = xhr.response;
												
						if(resValue){								
							if(xhr.responseType!=='json') resValue = JSON.parse(xhr.response);
							result = that.parseRtnType(resValue);
						}

						result.status = xhr.status;
						
						//success
						if(xhr.status===200){					
							if(ajaxSetting.mtnData) result.mtnData = ajaxSetting.mtnData;
							return ajaxSetting.callback(result);
						//error
						}else{
							
							result.url = xhr.responseURL;
							return ajaxSetting.error(result);
							
						}
					}				
				};
			
				xhr.send(JSON.stringify(ajaxSetting.data));				
			}
		}
		
		/**
		 * Form-type asynchronous send function
		 * [비동기 호출 함수(form)]
		 * 
		 * When you use this function by promise, have to set true on promise value(default => promise : false)
		 * [settings값에 promise로 사용할 경우 promise값을 true 설정(default -> promise : false)]
		 * */
		ajaxForm(settings){
			
			console.log('ENG:ajaxForm is used by JQUERY.\n'+'KOR:ajaxForm은 JQUERY를 사용합니다.\n'+'JPN:ajaxFormはjqueryを用います\n'+'CHN:ajaxForm使用jquery');
						
			const that = this;
			let result = {};//result value[결과 값]
			
			const ajaxSetting = {
				form : $('#form'), //form tag[form 태그]
				type : 'post', //request type[reqeust 타입]
				url : '', //url
				async : true, //asynchronous status[비동기 여부]
				enctype : 'multipart/form-data',
				promise : false, //promise usage status[promise 사용 여부]
				data : {}, //request data
				mtnData : {}, //maintain data[유지되는 데이터]
				token : true, //setting of spring security token value[spring security 토큰값 설정]						
				dataType:'json',
				beforeSend : function(xhr){ //spring secuirty token[spring security 토큰]
					
					if(document.getElementById('_csrf')){
						const csrfToken = document.querySelector('#_csrf').getAttribute('content');
						const csrfHeader = document.querySelector('#_csrf_header').getAttribute('content');
						xhr.setRequestHeader(csrfHeader, csrfToken);
					}					
					
				},				
				callback : function(){},				
				error : function(result){
					const error = that.parseRtnType(result);
					alert(error.msg);
				}				
			};
			
			Object.assign(ajaxSetting, settings);
			
			//promise : true
			if(ajaxSetting.promise){
				
				return new Promise(function(resolve, reject){
				
					ajaxSetting.success = function(result, textStatus){
						
						result = that.parseRtnType(result);
						
						result.status = textStatus;
						result.mtnData = ajaxSetting.mtnData;
						
						resolve(result);						
					}
					
					ajaxSetting.error = function(result){
						result = that.parseRtnType(result);
						reject(result);						
					}
					
					ajaxSetting.form.ajaxForm(ajaxSetting);					
					ajaxSetting.form.submit();					
				});
				
			//proise : false
			//use callback function(callback 함수 이용)
			}else{
				
				ajaxSetting.success = function(result, textStatus){
					
					result = that.parseRtnType(result);
					
					result.mtnData = ajaxSetting.mtnData;
					result.status = textStatus;
					
					ajaxSetting.callback(result);					
				}
				
				ajaxSetting.form.ajaxForm(ajaxSetting);
				ajaxSetting.form.submit();				
				
			}	
			
		}
		
		ajaxSendAll(...funcs){
			
			let i = 0;
			const promiseArr = [];
			
			for(; i<funcs.length; i++){
				promiseArr.push(this.ajaxSend(funcs[i]));
			}
			
			return Promise.all(promiseArr);
			
		}
		
		parseRtnType(resVal){
			
			const data = resVal;
			let returnValue = {};
			
			//When you send something by xhr[xhr로 요청할 때]
			if(data.map && typeof data.map !== 'function'){
				returnValue = data.map;
			//When you send something by ajax[ajax로 요청할 때]
			}else if(data.responseJSON){
				returnValue = data.responseJSON.map;
			//그 외
			}else{
				returnValue = resVal;
			} 
			
			return returnValue;
		}
	}
	
	return new bAjax();
	
});