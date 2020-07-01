define(function(){
	//전통적인 방식으로 객체 생성
	'use strict';
	
	var jsUtil = function(){
		this.validBrowser = ['edge', 'opera', 'chrome', 'firefox'];
	};
	
	jsUtil.prototype.browserCheck = function(){
		
		var agent = navigator.userAgent.toLowerCase();
		var name = navigator.appName;
        var browser;
    
	    // MS 계열 브라우저를 구분하기 위함.
	    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
	        browser = 'ie';
	        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
	            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
	            browser += parseInt(agent[1]);
	        } else { // IE 11+
	            if(agent.indexOf('trident') > -1) { // IE 11 
	                browser += 11;
	            } else if(agent.indexOf('edge/') > -1) { // Edge
	                browser = 'edge';
	            }
	        }
	    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
	        if(agent.indexOf('opr') > -1) { // Opera
	            browser = 'opera';
	        } else if(agent.indexOf('chrome') > -1) { // Chrome
	            browser = 'chrome';
	        } else { // Safari
	            browser = 'safari';
	        }
	    } else if(agent.indexOf('firefox') > -1) { // Firefox
	        browser = 'firefox';
	    }
	
	    // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
	    //document.getElementsByTagName('html')[0].className = browser;
	    
	    var browserLen = this.validBrowser.length;
	    for(var i=0; i<browserLen; i++){
	    	if(this.validBrowser[i]===browser) return true;
	    }
	    
	    return false;
	};	
	
	return new jsUtil();
});
/*(function(window){
	//브라우저 체크를 위해 var 타입.
	var jsUtil = function(){
		this.validBrowser = ['edge', 'opera', 'chrome', 'firefox'];
	};
	
	jsUtil.prototype.browserCheck = function(){
		 
		var agent = navigator.userAgent.toLowerCase();
		var name = navigator.appName;
        var browser;
    
	    // MS 계열 브라우저를 구분하기 위함.
	    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
	        browser = 'ie';
	        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
	            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
	            browser += parseInt(agent[1]);
	        } else { // IE 11+
	            if(agent.indexOf('trident') > -1) { // IE 11 
	                browser += 11;
	            } else if(agent.indexOf('edge/') > -1) { // Edge
	                browser = 'edge';
	            }
	        }
	    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
	        if(agent.indexOf('opr') > -1) { // Opera
	            browser = 'opera';
	        } else if(agent.indexOf('chrome') > -1) { // Chrome
	            browser = 'chrome';
	        } else { // Safari
	            browser = 'safari';
	        }
	    } else if(agent.indexOf('firefox') > -1) { // Firefox
	        browser = 'firefox';
	    }
	
	    // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
	    //document.getElementsByTagName('html')[0].className = browser;
	    
	    var browserLen = this.validBrowser.length;
	    for(var i=0; i<browserLen; i++){
	    	if(this.validBrowser[i]===browser) return true;
	    }
	    
	    return false;
	};
	
	window.jsUtil = new jsUtil();
	
})(window);*/