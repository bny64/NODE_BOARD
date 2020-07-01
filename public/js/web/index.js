define([], function(){
	
	function Module(){
		
		const pandora = new arguments[1]('mid', arguments);
		
		//--------------------substantial logic--------------------//
		let page = 1;
		let pageSize = 6;
		
		getBoardList();
		
		function getBoardList(){
						
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
				document.getElementById('indexBoards').style.display = '';
				
				if(result.boards.length>0){
					
					const html = [];
					
					let boardLen = result.boards.length;
				
					for(let i=0; i<boardLen; i++){
						
						const data = result.boards[i];
						
						html.push('<li class="one_third">');
						html.push(	'<figure>');
						html.push(		'<a href="/board/viewBoard.do?listNo=' + data.listNo + '">');
						if(data.thumbImgFilePath){
							html.push(		'<img style="width:338px;" src="' + data.thumbImgFilePath + '/' + data.thumbFileName + '" alt="">');
						}
						html.push(		'</a>');						
						html.push(		'<figcaption>');
						html.push(			'<h6 class="heading">' + data.title + '</h6>');
						html.push(			'<p>' + data.id + '(' + data.name + ')' + '</p>');
						html.push(		'</figcaption>');
						html.push(	'</figure>');
						
					}
										
					document.querySelector('#indexBoards').appendChild(document.createRange().createContextualFragment(html.join('')));
				}
				
			}
		}		
		//--------------------substantial logic--------------------//
		
	}
	
	return Module;
	
});