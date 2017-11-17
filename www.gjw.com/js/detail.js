window.onload=function(){
	new Detail().init();
}
function Detail(){
	this.uname=null;
	this.pro=null;
	this.status=document.getElementsByClassName("h_right")[0].children[0];
	this.list=document.getElementsByClassName("list")[0];
	this.small=document.getElementsByClassName("small")[0];
	this.big=this.small.getElementsByClassName("big")[0];
	this.smallImg=this.small.getElementsByClassName("smallImg")[0];
	this.mask=this.small.getElementsByClassName("mask")[0];
	this.bigImg=this.small.getElementsByClassName("bigImg")[0];
}
Detail.prototype={
	init:function(){
		this.Change();
		this.move();
		this.getCookie();
		this.showList();
		this.getAjax()
	},
	Change:function(){
		var that=this;
		this.list.addEventListener("mouseover",function(e){
			var e=e||event;
			var target=e.target||e.srcElement;
			if(target.tagName=="IMG"){
				var src=target.src;
				var index=src.lastIndexOf("/")
				src=src.substring(index+2);
				that.smallImg.src="detail/s"+src;
				that.bigImg.src="detail/s"+src;
				for (var i=0;i<that.list.children.length;i++) {
					that.list.children[i].style.border="1px solid #f9f9f9"
				}
				target.parentNode.style.border="1px solid red"
			}
		})
	},
	move:function(){
		var that=this;
		this.small.onmouseenter=function(){
			that.big.style.display="block"
		}
		this.small.onmouseleave=function(){
			that.big.style.display="none";
		}
		this.small.addEventListener("mousemove",function(e){
			var e=e||event;
			var x=e.pageX-that.small.offsetLeft-that.mask.offsetWidth/2;
			var y=e.pageY-that.small.offsetTop-that.mask.offsetWidth/2;
			if(x<0){
				x=0;
			}else if(x>that.small.offsetWidth-that.mask.offsetWidth){
				x=that.small.offsetWidth-that.mask.offsetWidth;	
			}
			if(y<0){
				y=0;
			}else if(y>that.small.offsetHeight-that.mask.offsetHeight){
				y=that.small.offsetHeight-that.mask.offsetHeight;
			}
			var _left=that.bigImg.offsetWidth*x/(that.small.offsetWidth-2);
			var _top=that.bigImg.offsetHeight*y/(that.small.offsetHeight-2);
			that.mask.style.left=x+"px";
			that.mask.style.top=y+"px";
			that.bigImg.style.left=-_left+"px";
			that.bigImg.style.top=-_top+"px";
		})
	},
	getCookie:function(){
		var cookie=document.cookie;
		var arr=cookie.split("; ");
		for (var i=0;i<arr.length;i++) {
			var item=arr[i].split("=");
			if(item[0].indexOf("user")!=-1 && JSON.parse(item[1]).inline==1){
				this.uname=JSON.parse(item[1]).username;
			}
		}
		this.status.innerHTML="欢迎 "+this.uname+"<a href='login.html' style='margin:0;background:none;color:##948e20'> 用户登录</a>"
		this.status.style.color="#C70225";
	},
	showList:function(){
		var _top=0;
		var some=document.getElementsByClassName("some")[0];
		var children=some.children;
		var box=document.getElementsByClassName("someBox");
		for (var i=0;i<box.length;i++) {
			box[i].style.top=-_top+"px"
			_top+=45;
		}
		for (var i=0;i<children.length;i++) {
			children[i].onmouseover=function(j){
				return function(){
					box[j].style.display="block"
				}
			}(i)
			children[i].onmouseout=function(j){
				return function(){
					box[j].style.display="none"
				}
			}(i)
		}
	},
	getAjax:function(){
		var that=this;
		this.pro=ajaxPromise("http://127.0.0.1/www.gjw.com/detail.json");
		this.pro.then(function(res){
			var success=JSON.parse(res);
		})
	}
}
