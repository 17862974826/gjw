function ajaxPromise(url,data){
	if( data ){
		url = url +"?" + data;
	}
	var promise = new Promise(function(success,failed){
		var ajax = new XMLHttpRequest();
		ajax.open("GET",url);
		ajax.send();
		ajax.onreadystatechange = function(){
			if( ajax.readyState == 4 && ajax.status == 200 ){//请求数据成功
				success(ajax.responseText);
			}
		}
		//假定  5000 后  服务器没有返回任何数据 请求失败
		setTimeout(function(){
			failed();
		},5000)
	});
	return promise;
}