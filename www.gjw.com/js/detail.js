window.onload=function(){
	new Detail().init();
}
function Detail(){
	this.flag=true;
	this.item=null;
	this.uname=null;
	this.pwd=null;
	this.pro=null;
	this.href=null;
	this.pre=0;
	this.addC=null;
	this.count=1;
	this.size=1;
	this.storeNum=0;
	this.all=0;
	this.cal=document.getElementsByClassName("s-cal")[0].children[0];
	this.menu_in=document.getElementsByClassName("menu_in")[0];
	this.de_shop=this.menu_in.getElementsByClassName("de_shop")[0];
	this.shopping=document.getElementsByClassName("shopping")[0];
	this.txt2=document.getElementById("txt2");
	this.btn=document.getElementsByClassName("b2")[0];
	this.store=document.getElementsByClassName("store")[0];
	this.rand=document.getElementsByClassName("rand")[0];
	this.title=document.getElementsByClassName("title")[0];
	this.des=document.getElementsByClassName("des")[0];
	this.discount=document.getElementsByClassName("discount")[0];
	this.status=document.getElementsByClassName("h_right")[0].children[0];
	this.list=document.getElementsByClassName("list")[0];
	this.small=document.getElementsByClassName("small")[0];
	this.big=this.small.getElementsByClassName("big")[0];
	this.smallImg=this.small.children[0];
	this.mask=this.small.getElementsByClassName("mask")[0];
	this.bigImg=this.small.getElementsByClassName("bigImg")[0];
}
Detail.prototype={
	init:function(){
		this.getAjax();
		this.Change();
		this.move();
		this.getCookie();
		this.showList();
		this.getMore();
		this.menu();
		this.rand.onclick=function(){
			this.getMore();
		}.bind(this)
		this.calculate();
		this.addCar();
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
				this.pwd=JSON.parse(item[1]).pwd;
				this.item=item[0];
				for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
					this.all+=JSON.parse(item[1]).shopping[j].size*1	
				}
				this.cal.innerHTML=this.all;
				this.all=0;
				break;
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
		var str="";
		this.pro=ajaxPromise("detail.json");
		this.pro.then(function(res){
			var success=JSON.parse(res);
			for (var key in success) {
				if(key==that.getHref()){
					var data=success[key];
					str=`<li><img src="detail/${data.srcm1}"/></li>
							<li><img src="detail/${data.srcm2}"/></li>
							<li><img src="detail/${data.srcm3}"/></li>
							<li><img src="detail/${data.srcm4}"/></li>
							<li><img src="detail/${data.srcm5}"/></li>`
					that.smallImg.src=`detail/${data.srcs1}`;
					that.bigImg.src=`detail/${data.srcs1}`;
					that.title.innerHTML=data.name;
					that.discount.innerHTML=data.price;
					that.des.innerHTML=data.explain;
					that.addC=data.srcm1;
					break;
				}
				
			}
			that.add=
			that.list.innerHTML=str;
		})
	},
	getHref:function(){
		var search=location.search;
		return search.split("=")[1];
	},
	getMore:function(){
		var that=this;
		var str=""
		this.pro=ajaxPromise("random.json");
		this.pro.then(function(success){
			var res=JSON.parse(success);
			var num=that.random(0,5);
			if(this.pre==num){
				this.pre=num;
				num=that.random(0,5);
			}else{
				var all=res[that.random(0,5)];	
			}
			for (var i in all) {
				str+=`
						<li><a href="javascript:;">
							<img src="detail/${all[i].src}" alt=""/>
							<span>${all[i].des}</span>
							<i>${all[i].price}</i>
						</a></li>
					`
			}
			that.store.innerHTML=str;
		})
	},
	random:function(min,max){
		return Math.round(Math.random()*(max-min)+min)
	},
	menu:function(){
		var _top=null;
		window.onscroll=function(){
			_top=document.documentElement.scrollTop|| document.body.scrollTop;
		}
		var last=document.getElementsByClassName("menu-last")[0];
		last.onclick=function(){
			timer=setInterval(function(){
				_top-=5;
				document.documentElement.scrollTop=document.body.scrollTop=_top;
				if(_top<=0){
					clearInterval(timer)
				}
			},1)
		}
	},
	calculate:function(){
		this.btn.children[0].onclick=function(){
			if(this.txt2.value>=50){
				alert("单次购买不能超过50")
			}else{
				this.txt2.value=++this.count;	
			}
		}.bind(this)
		this.btn.children[1].onclick=function(){
			console.log(this.txt2)
			if(this.txt2.value<=1){
				this.txt2.value=1;
				alert("数量不能少于1")
			}else{
				this.txt2.value=--this.count;	
			}
		}.bind(this)
		this.txt2.onblur=function(){
			if(this.txt2.value<=1){
				alert("数量不能少于1");
				this.txt2.value=1;
			}else if(this.txt2.value>=50){
				alert("单次购买不能超过50");
				this.txt2.value=1;
			}
		}.bind(this)
	},
	addCar:function(){
		var that=this;
		this.shopping.onclick=function(){
			this.startPoint={
				x:90,
				y:-50
			};
			this.endPoint={
				x:400,
				y:-(this.shopping.offsetTop-(this.de_shop.offsetTop+document.documentElement.scrollTop+this.menu_in.offsetTop))
			};
			this.topPoint={
				x:250,
				y:-(this.shopping.offsetTop-(this.de_shop.offsetTop+document.documentElement.scrollTop+this.menu_in.offsetTop))-50
			}
			var div=document.createElement("div");
				div.className="addC";
				div.style.background=`url(detail/${this.addC})`;
				div.style.backgroundSize="100% 100%"
				this.shopping.appendChild(div);
			var x=this.startPoint.x;
			var y=this.startPoint.y
			var a = ((this.startPoint.y - this.endPoint.y) * (this.startPoint.x -this.topPoint.x) - (this.startPoint.y - this.topPoint.y) * (this.startPoint.x - this.endPoint.x)) / ((this.startPoint.x * this.startPoint.x - this.endPoint.x * this.endPoint.x) * (this.startPoint.x - this.topPoint.x)-(this.startPoint.x * this.startPoint.x - this.topPoint.x * this.topPoint.x) * (this.startPoint.x - this.endPoint.x));  
				
			var b = ((this.endPoint.y - this.startPoint.y) - a * (this.endPoint.x * this.endPoint.x - this.startPoint.x * this.startPoint.x)) / (this.endPoint.x - this.startPoint.x);  
					
			var c = this.startPoint.y - a * this.startPoint.x * this.startPoint.x - b *this.startPoint.x;
			div.time=setInterval(function(){
				x += 3;
				y =  a*x*x + b*x + c;
				if(x<this.endPoint.x){
						div.style.left=x+"px";
						div.style.top=y+"px";
				}else{
					clearInterval(div.time);
					div.remove();
				}
			}.bind(this),10)
			this.setCook()
		}.bind(this);
	},
	setCook:function(){
		this.arr=JSON.parse(getCookie(this.item)).shopping;
		this.storeNum=this.getHref();
		var shop=JSON.parse(getCookie(this.item)).shopping;
		if(shop.length!=0){
			for (var i=0;i<shop.length;i++) {	
				if(shop[i].store==this.storeNum){
					this.size=shop[i].size*1;
					this.size+=this.txt2.value*1;
					this.flag=false;
					break;
				}else{
					this.size=this.txt2.value*1;
				}
			}
			var json={
				"store":this.storeNum,
				"size":this.size,
			}
			if(!this.flag){
				this.arr.push(json)
				for (var i=0;i<this.arr.length;i++) {
					if(this.arr[i].store==this.storeNum){
						this.arr.splice(i,1);
					}
				}
			}else{
				this.arr.push(json)
			}
			var cookie={
					"username":this.uname,
					"pwd":this.pwd,
					"inline":1,
					"shopping":this.arr
				}	
			setCookie(this.item,JSON.stringify(cookie),10)	
		}else{
			this.size=this.txt2.value*1
			var json={
			"store":this.storeNum,
			"size":this.size,
			}
			this.arr.push(json);
			var cookie={
				"username":this.uname,
				"pwd":this.pwd,
				"inline":1,
				"shopping":this.arr
			}	
			setCookie(this.item,JSON.stringify(cookie),10)	
		}
		for (var j=0;j<JSON.parse(getCookie(this.item)).shopping.length;j++) {
				this.all+=JSON.parse(getCookie(this.item)).shopping[j].size*1	
		}
		this.cal.innerHTML=this.all;
		this.all=0;
	}
}
