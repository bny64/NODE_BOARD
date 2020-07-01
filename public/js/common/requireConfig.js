const requireConfig = {
	/**
	 * * [ paths 설정 ] * path 는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는
	 * 속성입니다. * "/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl 에 상대적으로 설정하게 됩니다. *
	 * 그리고 아래 exam, jQ 와 같이 별칭(alias)을 설정하여 사용하고 또한 스크립트 파일(모듈)의 .js 확장자는 붙여주지
	 * 않습니다. * 위와 같은 형태로 설정한 뒤에, define 에서 "exam/module" 로 불러오게 되면, * 스크립트 태그에서는
	 * 실제로는 src="aaaa/bbbb/module.js" 로 설정되게 됩니다. * path 는 또한 아래와 같이 특정 라이브러리 경로
	 * 선언을 위해 사용될 수 있는데, * path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명으로 매핑됩니다. * 정리 :
	 * 모듈의 별칭(Alias)을 설정하고 모듈의 단축 경로를 지정합니다.
	 */

	// 기준이 될 경로
	baseUrl : '/js',

	// 해당 파일의 경로 baseUrl + / +paths.xxx
	paths : {
		//----------------------------------------library----------------------------------------//
		jquery : 'lib/jquery/jquery.min', 							// jquery
		jqueryui : 'lib/jquery/jquery-ui', 							// jquery-ui
		jqueryForm : 'lib/jquery/jquery.form.min', 					// jquery-form
		jqueryCookie : 'lib/jquery/jquery-cookie.min',				// jquery-cookie
		animsition : 'lib/animsition/js/animsition.min', 			// animsition
		popper : 'lib/bootstrap/js/popper', 						// popper
		bootstrap : 'lib/bootstrap/js/bootstrap', 					// bootstrap
		select2 : 'lib/select2/select2.min', 						// select2
		moment : 'lib/daterangepicker/moment.min', 					// moment
		daterangepicker : 'lib/daterangepicker/daterangepicker',	// daterangepicker
		countdowntime : 'common/countdowntime/countdowntime', 		// countdowntime
		setDatepickerKor : 'common/datepicker/setDatepickerKor',	// setDatepickerKor
		summernote : 'lib/summernote/summernote-bs4', 				// summernote
		summernote_kor : 'lib/summernote/lang/summernote-ko-KR',	// summernte-kor
		backtotop : 'lib/jquery/jquery.backtotop',					// backtotop
		mobilemenu : 'lib/jquery/jquery.mobilemenu',				// mobilemenu
		//----------------------------------------util-------------------------------------------//
		bAjax : 'common/util/bAjax', 								// bAjax
		domUtil : 'common/util/domUtil', 							// domUtil
		jsUtil : 'common/util/jsUtil', 								// jsUtil
		libFilter : 'common/util/libFilter',						// libFilter		
		valuePipe: 'common/util/valuePipe'							// valuePipe
	},

	// 의존성 설정 deps:['paths에 정의된 이름'] -> 먼저 로드되야 할 파일
	// exports 전역으로 사용할 파일
	// 대부분의 라이브러리 파일들은 의존성 체크[AMD지원]를 하기 때문에 설정값에 넣어줄 필요가 없음.
	
	shim : {
		// jqueryui:{deps:['jquery']},
		// animsition:{deps:['jquery']},
		// popper:{deps:['jquery']},
		// bootstrap:{deps:['jquery','popper']}, -> 파일에서 설정해 놓음.
		// select2:{deps:['jquery']},
		// moment
		// daterangepicker:{deps:['jquery','moment']},
		// summernote
		
		//AMD지원 X		
		countdowntime : { deps : [ 'jquery' ] },
		backtotop : {deps : ['jquery'] },
		mobilemenu : {deps : ['jquery'] },
		setDatepickerKor : { deps : [ 'jquery', 'jqueryui' ] },
		summernote : { deps : ['bootstrap'] },
		//summernote 사용할 때 tooltip 메서드를 bootstrap에서 사용해야 하는데 jqueryui의 tooltip을 사용해서 bootstrap보다 jqueryui를 먼저 로드 시킴.
		bootstrap : { deps : ['jqueryui'] }, 
		summernote_kor : { deps : [ 'summrnote' ] },
		bAjax : { deps : [ 'jqueryForm' ] }
	}
}