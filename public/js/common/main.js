//set envirment in requirejs[requirejs 환경설정 셋팅]
require.config(requireConfig);

//js path[js 경로]
const jsFilePath = '/js/web';

//top file path[1단계 파일 경로]
const top_path = '/globalSvc.js';

const lsList = checkLoadJsLib();

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

function callback(){
	
	if(lsList){
		
		//add top definition[1단계 defintion 추가]
		lsList.lib.push(jsFilePath + top_path);
		
		//asynchronous send[비동기 호출]
		requirejs(lsList.lib, function(){
			
			//prevent usage of jquery in global scope[jquery가 전역에서 사용되는 것을 방지]
			jQuery.noConflict(true);

			//valuePipe
			let vp = arguments[0].getGlobalVal();
			
			//top definition[1단계 definition]
			const func_top = arguments[arguments.length-1];
					
			lsList.top_lib[0].push(jsFilePath + vp.middle_path);
			
			requirejs(lsList.top_lib[0], func_top);
			
		});
		
	}
	
}

//check libraries to load[로드해야할 js 라이브러리 확인]
function checkLoadJsLib(){
	
	let type = {
			top_lib : [['valuePipe', 'libFilter', 'bAjax','jsUtil'],['', '', 'bx', 'ju']],					//top
			mid_lib : [['valuePipe', 'libFilter'],['','']]													//middle
	};
	
	let first_url;
	
	if(location.pathname.indexOf('/',1) > -1) first_url = location.pathname.substring(0, location.pathname.indexOf('/',1));
	else first_url = location.pathname.substring(0, location.pathname.indexOf('.'));
	
	if(/^\/(index)$/.test(first_url)){
		
		type.lib = ['valuePipe', 'jquery', 'jqueryui', 'backtotop', 'popper', 'bootstrap', 'summernote'];
		type.mid_lib = [['valuePipe', 'libFilter', 'bAjax'],['','', 'bx']];
		
	}else if(/^\/(auth)$/.test(first_url)){
		
		type.lib = ['valuePipe', 'jquery', 'jqueryui', 'jqueryCookie', 'animsition', 'popper', 'bootstrap', 'select2', 'moment','daterangepicker', 'countdowntime', 'setDatepickerKor'];
		type.bot_lib = [['valuePipe', 'libFilter','jquery', 'bAjax','domUtil'],['','','$', 'bx','du']];		//bottom
		
	}else if(/^\/(board)$/.test(first_url)){
		
		type.lib = ['valuePipe','jquery', 'jqueryui', 'backtotop', 'popper', 'bootstrap','summernote'];		
		type.bot_lib = [['valuePipe', 'libFilter','jquery', 'moment', 'bAjax', 'domUtil'],['','','$', 'mmt','bx', 'du']];	//bottom
		
	}else{
		type = null;
	}
	
	return type;
};