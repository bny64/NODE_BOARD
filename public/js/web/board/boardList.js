define([], function(){
	
	'use strict';
	
	function Module(){
		
		const pandora = new arguments[1]('bot', arguments);
		
		//--------------------substantial logic--------------------//
		let page = 1;
		let pageSize = 12;
		let boardCnt = 0;
		let pageNow = 1; //현재 페이지
		let pagingSize = 10; //한 번에 보여줄 페이지 갯수
		
		getBoardList();
		
		(function(){
			pandora.bx.ajaxSend({
				url : '/board/getNumOfBoards.do',
				callback:function(result){
					if(result.msgCode==='S0000'){						
						boardCnt = result.boardCnt;
						setPage();
					}
				}
			})
		})();
		
		function getBoardList(){
			
			document.querySelector('#boards').innerHTML = '';
			
			pandora.bx.ajaxSend({
				url : '/board/boardList.do',
				data : {
					page : page,
					pageSize : pageSize
				},
				callback:setBoardData
			});
		};
		
		function setBoardData(result){
			
			if(result.msgCode==='S0000'){
							
				document.getElementById('loadingDiv').style.display = 'none';
				document.getElementById('boards').style.display = '';
				
				if(result.boards.length>0){
					
					const html = [];
					
					let boardLen = result.boards.length;
					
					for(let i=0; i<boardLen; i++){
						
						const data = result.boards[i];
						html.push('<li class="one_quarter' + ((i+1)%4===1?' first':'') + '">');
						html.push(	'<a href="/board/viewBoard.do?listNo=' + data.listNo + '">');
						if(data.passwordYn==='Y') html.push('<img src="/images/main/other/lock.png" class="lock">');
						if(data.thumbImgFilePath) html.push('<img src="' +  data.thumbImgFilePath+ '/' + data.thumbFileName + '" alt="">');
						html.push(			'<span>' + data.title + '</span><br>');
						html.push(			'<span>' + data.id + '(' + data.name + ')</span><br>');
						html.push(			'<span>' + pandora.mmt(data.createdAt).format('YYYY-MM-DD HH:mm:ss') + '</span>');
						html.push(	'</a>');
						html.push('</li>');
						
					}
										
					document.querySelector('#boards').appendChild(document.createRange().createContextualFragment(html.join('')));
				}				
			}
			
		}
		
		function setPage(check){

			document.querySelector('#pageNavi').innerHTML = '';
			
			let startPoint = (pageNow - 1) * pagingSize + 1;
			
			let endPoint = pageNow * pagingSize < boardCnt/pageSize ? pageNow * pagingSize : Number.parseInt(boardCnt/pageSize + 1);
			const html = [];
			
			if(pageNow!==1){
				html.push('<li id="prev"><a href="javascript:void(0);">&laquo; Previous</a></li>');				
			}			
			
			for(var i = startPoint; i<=endPoint; i++){
				html.push('<li class="paging');
				if(i === startPoint && !check) html.push(' current');
				else if(i === endPoint && check) html.push(' current');
				html.push('"><a href="javascript:void(0);">' + i + '</a></li>');				
			}
			
			if(endPoint <= boardCnt/pageSize){
				html.push('<li id="next"><a href="javascript:void(0);">Next &raquo;</a></li>');
			}
						
			document.querySelector('#pageNavi').appendChild(document.createRange().createContextualFragment(html.join('')));
			
			const li_list = document.querySelectorAll('#pageNavi > li.paging');
			
			[].forEach.call(li_list, function(ele){
				
				ele.addEventListener('click', function(e){
					
					e.preventDefault();
					
					pandora.du.removeClass(document.querySelector('#pageNavi > li.current'), 'current');
					
					pandora.du.addClass(ele, 'current');
					
					if(this.innerText!==page){
						
						page = this.innerText;						
						getBoardList();
						
					}
				});
			});
			
			const prev = document.querySelector('#prev');
			const next = document.querySelector('#next');
			
			if(prev){
				prev.addEventListener('click', function(){					
					page = (pageNow-2) * pagingSize + 1;
					pageNow--;					
					setPage();
					getBoardList();
					
				});
			}
			
			if(next){
				next.addEventListener('click', function(){
					page = pageNow * pagingSize + 1;
					pageNow++;
					setPage('next');
					getBoardList();
				});
			}
		}
		
		//--------------------substantial logic--------------------//
	};
	
	return Module;
	
});
