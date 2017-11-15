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
	var res=ajaxPromise("banner.json")
	res.then(function(value){
		var json=JSON.parse(value);
		for (var key in json) {
			if(key=="0"){
				var len=json[key];
				var str="";
				for (var i=0;i<len.length;i++) {
					str+=`<div class="active">
								<a href="new.html">
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
			}else{
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
				},4000)
			}
		}
	})
		content.children[0].addEventListener("mouseover",function(e){
			clearTimeout(time)
			time=setTimeout(event.bind(this,e,"active boxMove",-8),200)
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true
		})
		content.children[0].addEventListener("mouseout",function(e){
			event.bind(this,e,"active",0)()
			e.stopPropagation?e.stopPropagation():e.cancelBubble=true
		})	
	for (var j=1;j<content.children.length-1;j++) {
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
				if((target.className=="des" ||target.tagName=="IMG")){
					target.parentNode.parentNode.className=cls;
					startMove(target.parentNode.parentNode,{"top":top})
				}
			}
		}
	function out(len,str,key){
		for (var i=0;i<len.length;i++) {
					if(i==0 || i==5){
						str+=`<div class="active" style="margin-top:12px; height:298px">
								<a href="#">
								<img src="img/${len[i].src}" alt=""/>
								</a>
							</div>`
					}else{
						str+=`<div class="active1">
								<a href="#">
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
})()
