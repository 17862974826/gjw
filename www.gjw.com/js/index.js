//轮播图
(function(){
	var arr=["f3e9ce","9300e4","cb0a4f","019def","e9c942","d21358"]
	var ban=document.getElementsByClassName("banner")[0];
	var wrap=document.getElementById("binner_wrap");
	var banImg=ban.getElementsByClassName("cimg")
	var oul=document.getElementsByClassName("index")[0];
	var list=document.getElementsByClassName("index")[0].children;
	var len=0;
	var time=null;
	time=setInterval(autoPlay,3000)
	function autoPlay(){
		len++;
		if(len==banImg.length){
			len=0;
		}
		for (var i=0;i<banImg.length;i++) {
			startMove(banImg[i],{"opacity":0});
			list[i].style.background="#3c3226"
		}
		startMove(banImg[len],{"opacity":100});
		wrap.style.background="#"+arr[len]
		list[len].style.backgroundColor="#C70225"
	}
	oul.addEventListener("mouseover",function(e){
		clearInterval(time)
		var e=e||event
		var target=e.target||e.srcElement;
		if(target!=this){
			len=target.innerHTML-2;
			autoPlay()
		}
	},false)
	oul.addEventListener("mouseout",function(e){
		time=setInterval(autoPlay,3000)
	},false);
	
})();
//二级列表
(function(){
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
	
})();
//ajax请求
(function(){
	var boss=document.getElementsByClassName("boss");
	var oul=boss[0].getElementsByClassName("bossul")
	var time=null;
	var time2=null;
	var content=document.getElementById("content_wrap")
	var res=ajaxPromise("index.json")
	res.then(function(value){
		var json=JSON.parse(value);
		for (var key in json) {
			if(key=="0"){
				var len=json[key];
				var str="";
				for (var i=0;i<len.length;i++) {
					str+=`<div class="active">
								<a href="detail.html?id=shop${key+i}" style="display:block">
								<img src="img/${len[i].src}" alt=""/>
								<div class="des">
									<p>${len[i].name}</p>	
									<span>${len[i].price}</span>
								</div>
								</a>
						</div>`
				}
				content.children[0].innerHTML=str;
			}else if(key=="1"){
				var len=json[key];
				var str="";
				out(len,str,key)
			}else if(key=="2"){
				var len=json[key];
				var str="";
				out(len,str,key)
			}else if(key=="3"){
				var len=json[key];
				var str="";
				out(len,str,key)
			}
			else if(key=="4"){
				var len=json[key];
				var str="";
				out(len,str,key)
			}else if(key=="5"){
				var len=json[key];
				var str="";
				out(len,str,key)
			}else if(key=="6"){
				var _left=0;
				var len=json[key];
				var str="";
				var start=0;
				var end=5;
				var all=document.createDocumentFragment();
				var size=~~json[key].length/5;
				for (var j=0;j<size;j++) {
					str="";
					var ul=document.createElement("ul");
					ul.className="bossul";
					ul.style.left=_left+"px";
					_left+=1200;
					for (var i=start;i<end;i++) {
						if(i<json[key].length){
							str+=`<li>
											<img src="img/${len[i].src}"/>
											<div>${len[i].indicate}</div>
											<div>${len[i].price}</div>
											<div>${len[i].commit}</div>
										</li>`
						}
					}
					if(end<=json[key].length){
						end+=5;
					}
					start+=5;
					ul.innerHTML+=str;
					all.appendChild(ul);
				}
				boss[0].appendChild(all);
				var _left=1200;
				time2=setInterval(function(){
					for (var i=0;i<oul.length;i++) {
						if(oul[0].offsetLeft==0){
							startMove(oul[i],{"left":(i-1)*_left})
						}else{
							startMove(oul[i],{"left":i*_left})
						}
						
					}
				},15000)
			}else{
				var len=json[key];
				var str="";
				for (var i=0;i<len.length;i++){
					str+=`<div class="aud">
								<a href="#">
								<img src="img/${len[i].src}" alt=""/>
								<div>
									<p>${len[i].name}</p>	
								</div>
								</a>
							</div>`
				}
				content.children[key].innerHTML+=str;
			}
		}
	})
		content.children[0].addEventListener("mouseover",function(e){
			event.bind(this,e,"active boxMove",-8)()
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true
		})
		content.children[0].addEventListener("mouseout",function(e){
			event.bind(this,e,"active",0)()
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true
		})	
	for (var j=1;j<content.children.length-2;j++) {
		content.children[j].addEventListener("mouseover",function(e){
			clearTimeout(time)
			time=setTimeout(event.bind(this,e,"active1 boxMove",-8),200)
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true
		})
		content.children[j].addEventListener("mouseout",function(e){
			event.bind(this,e,"active1",0)()
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true
		})	
	}
	function event(e,cls,top,tar){
			var e=e||event;
			var target=e.target||e.srcElement;
			if(target!=tar){
				if(target.tagName=="IMG" || target.className=="des"){
					target.parentNode.parentNode.className=cls;
					startMove(target.parentNode.parentNode,{"top":top})
				}
			}
		}
	function out(len,str,key){
		for (var i=0;i<len.length;i++) {
					if(i==0 || i==5){
						str+=`<div class="active" style="margin-top:12px; height:298px">
								<a>
								<img src="img/${len[i].src}" alt=""/>
								</a>
							</div>`
					}else{
						str+=`<div class="active1">
								<a href="detail.html?id=shop${'0'+i}">
								<img src="img/${len[i].src}" alt=""/>
								<div class="des1">
									<p>${len[i].name}</p>	
									<span>${len[i].price}</span>
								</div>
								</a>
							</div>`
					}
				}
		content.children[key].innerHTML+=str;
	}
})();
//吸顶,menu效果
(function(){
	var time=null;
	var timer=null;
	var _top=null;
	var last=document.getElementsByClassName("menu-last")[0];
	var fixTop=document.getElementById("fixTop");
	var con=document.getElementById("content_wrap");
	window.onscroll=function(){
		_top=document.documentElement.scrollTop|| document.body.scrollTop;
		clearTimeout(time)
		time=setTimeout(function(){
			if(_top>con.offsetTop){
				fixTop.style.display="block"
			}else{
				fixTop.style.display="none"
			}
		},40)
	}
	last.onclick=function(){
		timer=setInterval(function(){
			_top-=5;
			document.documentElement.scrollTop=document.body.scrollTop=_top;
			if(_top<=0){
				clearInterval(timer)
			}
		},1)
	}
	
})();
//尾部效果
(function(){
	var time=null;
	var _top=0;
	var list=document.getElementsByClassName("fb_ul")[0];
	time=setInterval(function(){
		if(_top==-30){
			list.style.top=0+"px";
			_top=0;
		}else{
			_top-=15;
		}
		startMove(list,{"top":_top})
	},2000)
})();
//操作cookie
(function(){
	var obj=null;
	var uname=null;
	var pwd=null;
	var status=document.getElementsByClassName("h_right")[0].children[0];
	setCookie("count",0,10);
	var cookie=document.cookie;
	var arr=cookie.split("; ");
	for (var i=0;i<arr.length;i++) {
		var item=arr[i].split("=");
		if(item[0].indexOf("user")!=-1 && JSON.parse(item[1]).inline==1){
			var title=item[0];
			uname=JSON.parse(item[1]).username;
			pwd=JSON.parse(item[1]).pwd;
			status.innerHTML="欢迎 "+uname+"<a href='login.html' style='margin:0;background:none;color:##948e20'> 用户登录</a>"
			status.style.color="#C70225";
			break;
		}else if(item[0]=="count"){
			return 
		}
	}
})()
