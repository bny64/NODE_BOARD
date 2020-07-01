define([], function(){
	
	'use strict';
	
	function Module(){
		
		
		const vp = arguments[0].getGlobalVal();
		const pandora = new arguments[1]('bot', arguments);
		
		let reqParam;
		
		const whiteExt = ['jpeg', 'jpg', 'gif', 'png'];
		
		//--------------------substantial logic--------------------//
		
		
		
				
		//--------------------init--------------------//
		pandora.$('#contents').summernote({
			width : '70%',
			height : '400px',
			align : 'center',
			toolbar: [
			    ['style', ['bold', 'italic', 'underline', 'clear']],
			    ['font', ['strikethrough', 'superscript', 'subscript']],
			    ['fontsize', ['fontsize']],
			    ['color', ['color']],
			    ['para', ['ul', 'ol', 'paragraph']],
			    ['height', ['height']]
			]
		});
		
		pandora.bx.ajaxSend({
			url : '/board/getBoard.do',
			data : {
				listNo : document.getElementById('listNo').value				
			},
			callback : setInitData
		});
		//--------------------init--------------------//
		
		
		
		
		//--------------------event--------------------//
		/*비밀번호 사용 여부 이벤트*/
		document.querySelectorAll('[name="passYn"]').forEach(function(elements){
			
			elements.addEventListener('click', function(){
				const type = this.value;
				const passTag = document.getElementById('boardPassDiv');
				
				if(type==='Y'){
					passTag.style.display = '';
				}else{
					passTag.style.display = 'none';
				}
			});
			
		});
		
		/*파일 변경 버튼 이벤트*/
		document.getElementById('fileBtn').addEventListener('click', function(){
			
			let fileStatus = document.getElementById('fileStatus');
			const divTag = document.getElementById('fileDiv');
			const fileBtnTag = document.getElementById('fileBtn');
			
			if(fileStatus.value==='L'){
				if(document.getElementById('fileOrgNm').value){
					if(confirm('파일을 삭제하시겠습니까?')){
						fileStatus.value = 'D';
						document.getElementById('fileNm').textContent = '없음';
						fileBtnTag.textContent = '파일 추가';
						document.getElementById('fileDelRvBtn').style.display = '';
						document.getElementById('fileWarn').style.display = 'none';
					}
				}else{
					document.getElementById('fileDiv').style.display = '';
				}			
			}else if(fileStatus.value==='D'){
				alert('파일을 추가 하시면 기존에 있던 파일은 복구할 수 없습니다.\n기존파일을 복구하시려면 새로고침을 해주세요.');
				document.getElementById('fileDiv').style.display = '';
			}
			
		});
		
		/*파일 되돌리기 버튼 이벤트*/
		document.getElementById('fileDelRvBtn').addEventListener('click', function(){
			document.getElementById('fileStatus').value = 'L';
			this.style.display = 'none';
			document.getElementById('fileNm').textContent = document.getElementById('fileOrgNm').value;
			document.getElementById('fileBtn').textContent = '파일 삭제';
			document.getElementById('fileWarn').style.display = '';
			document.getElementById('fileDiv').style.display = 'none';
			
		});
		
		/*파일 입력 변경 이벤트*/
		document.getElementById('boardFile').addEventListener('change', function(){
			
			document.getElementById('fileStatus').value = 'U';
			
			if(this.files.length>0){
				
				const fileInfo = this.files[0];
				
				document.getElementById('fileBtn').style.display = 'none';
				document.getElementById('fileNm').textContent = this.files[0].name;
				document.getElementById('fileDelRvBtn').style.display = 'none';
				
				let fileExt = fileInfo.name.substring(fileInfo.name.lastIndexOf('.')+1, fileInfo.name.length);
				if(!fileValidateCheck(fileExt)){
					
					let msg = whiteExt.join(', ');
					
					msg = msg.substring(0, msg.length-2);
					element.value = '';
					alert(msg);
					
					return;
				}
				
				if(fileInfo.size > 10000000){
					element.value = '';
					alert('10MB까지 저장 가능합니다.');			
				}
				
			}else{
				document.getElementById('fileNm').textContent = '없음';
			}		
		});
		
		/*수정 버튼 이벤트*/
		document.getElementById('modifyBtn').addEventListener('click', function(){
			
			if(!validateCheck()) return;
			
			pandora.bx.ajaxForm({
				form : pandora.$('#modifyBoardForm'),
				url : '/board/modifyBoard.do',
				promise : true			
			}).then(function(result){
				if(result.msgCode==='U0000'){
					if(document.getElementById('boardFile').files.length>0){
						//썸네일 파일 저장 후 불러오는 시간 고려
						alert('파일을 저장중 입니다. 잠시만 기다려 주세요.');
						setTimeout(function(){
							alert(result.msg);
							location.href = '/board/boardList.do';
						},3000);
					}else{
						alert(result.msg);
						location.href = '/board/boardList.do';
					}
				}
			}).catch(function(error){
				alert(error.msg);
			});
		});
		//--------------------event--------------------//	
		
		
		
		
		//--------------------function--------------------//		
		function setInitData(result){
			
			if(result.msgCode==='S0000'){
			
				const board = result.board;				
				
				document.getElementById('title').value = board.title;
				pandora.$('#contents').summernote('code', board.contents);
				document.getElementById('viewYn').selectedIndex = (board.viewYn === 'Y' ? 1 : board.viewYn === 'N' ? 2 : 0);
				
				const passYnIdx = board.passwordYn === 'Y' ? 0 : board.passwordYn === 'N' ? 2 : 1;
				if(passYnIdx===2) document.getElementById('passNC').disabled = true;
					
				
				document.querySelectorAll('[name="passYn"]')[passYnIdx].checked = true;
				
				document.getElementById('listNo').value = board.listNo;
				
				if(board.orgFileName){
					document.getElementById('fileOrgNm').value = board.orgFileName;
					document.getElementById('fileNm').textContent = board.orgFileName;
					document.getElementById('fileBtn').textContent = '파일 삭제';
					document.getElementById('fileWarn').style.display = '';
				} 
			}
		}

		/*게시글 유효성 검사*/
		function validateCheck(){
			
			if(!document.getElementById('title').value.trim()){
				alert('제목을 입력하세요.');
				return false;
			} else if(!document.getElementById('contents').value.trim()){
				alert('내용을 입력하세요.');
				return false;
			} else if(!document.getElementById('viewYn').value.trim()){
				alert('글 공개여부를 선택해주세요.');
				return false;
			} else if(document.querySelector('input[type="radio"][name="passYn"]:checked').value==='passY'){
				if(!document.getElementById('boardPass').value) alert('비밀번호를 입력해주세요.');
				document.getElementById('boardPass').focus();
				return false;
			}
			
			reqParam = {
				title : document.getElementById('title').value,
				contents : document.getElementById('contents').value,
				viewYn : document.getElementById('viewYn').value,
				passwordYn : document.querySelector('input[type="radio"][name="passYn"]:checked').value,
				password : document.getElementById('boardPass').value
			};		
			
			return true;
			
		}
		
		/*파일 확장자 유효성 검사*/
		function fileValidateCheck(fileExt){
			
			for(let index in whiteExt){
				if(whiteExt[index]===fileExt) return true;			
			}
			
			return false;
		}
		//--------------------function--------------------//
		
		
		
		
		//--------------------substantial logic--------------------//
		
	}
	
	return Module;
	
});