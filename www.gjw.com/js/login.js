window.onload=function(){
	new Login().init()
}
function Login(){
	this.flag=true;
	this.uname=document.getElementById("uname");
	this.pwd=document.getElementById("pwd");
	this.btn=document.getElementById("log-btn");
}
Login.prototype={
	init:function(){
		this.btn.onclick=function(){
			this.only();
			this.check();
		}.bind(this)
	},
	only:function(){
		var cookie=document.cookie;
		var arr=cookie.split("; ");
		for (var i=0;i<arr.length;i++) {
			var item=arr[i].split("=");
			var res=JSON.parse(item[1])
			console.log(res.shopping)
			var json={
					username:res.username,
					pwd:res.pwd,
					inline:0,
					shopping:res.shopping
			}
			setCookie(item[0],JSON.stringify(json),10);
		}
	},
	check:function(){
		var cookie=document.cookie;
		var arr=cookie.split("; ");
		for(var i=0;i<arr.length;i++){
			var item=arr[i].split("=")[0];
			var res=getCookie(item);
			res=JSON.parse(res)
			if(res.username==this.uname.value && res.pwd==this.pwd.value){
				var json={
					username:res.username,
					pwd:res.pwd,
					inline:1,
					shopping:res.shopping
				}
				setCookie(item,JSON.stringify(json),10);
				location.href="index.html";
				return 
			}else{
				this.flag=false;
			}
		}
		if(this.flag==false){
			alert("帐号或者密码错误")
		}
	}
}
