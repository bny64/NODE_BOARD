define([], function(){
	
	'use strict';
	
	function Module(){

		const pandora = new arguments[1]('mid', arguments);
		
		//valuePipe
		let vp = arguments[0].getGlobalVal();
		
		//----------FUNCTION SCOPE----------
		
		//----------FUNCTION SCOPE---------
		
		//bottom definition[3단계 definition]
		const func_bot = arguments[arguments.length-1];
		
		if(func_bot.name==='Module') requirejs(lsList.bot_lib[0], func_bot);
	};
	
	return Module;
});