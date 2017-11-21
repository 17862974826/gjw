window.onload=function(){
	new Shopping().init()
}
function Shopping(){
	this.brr=[];
	this.back=[];
	this.txt=document.getElementsByClassName("tgh");
	this.content=document.getElementsByClassName("content")[0]
	this.add=document.getElementsByClassName("add");
	this.redu=document.getElementsByClassName("redu");
	this.all=document.getElementsByClassName("all")[0];
	this.selec=document.getElementsByClassName("select");
	this.end=document.getElementsByClassName("right")[0];
	this.del_left=document.getElementsByClassName("left")[0];
	this.status=document.getElementsByClassName("h_left")[0];
}
Shopping.prototype={
	init:function(){
		this.sel();
		this.lister();
		this.getAjax();
		this.del()
	},
	sel:function(){
		this.all.onchange=function(){
			if(this.all.checked){
				[... this.selec].forEach(function(ele){
					ele.checked=true;
				})
			}else if(!this.all.checked){
				[... this.selec].forEach(function(ele){
					ele.checked=false;
				})
			}
		}.bind(this)
	},
	lister:function(){
		this.content.addEventListener("click",function(e){
			var e=e||event;
			var target=e.target||e.srcElement;
			var cookie=document.cookie;
			var arr=cookie.split("; ");
			var foo=[];
			if(target.className=="del"){
				for (var i=0;i<arr.length;i++) {
					var item=arr[i].split("=");
					if(JSON.parse(item[1]).inline==1){
						for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
							if(JSON.parse(item[1]).shopping[j].store!=target.id){
								foo.push(JSON.parse(item[1]).shopping[j])
							}
						}	
						var json={
							"username":JSON.parse(item[1]).username,
							"pwd":JSON.parse(item[1]).pwd,
							"inline":1,
							"shopping":foo
						}
						setCookie(item[0],JSON.stringify(json),10)
						this.getAjax();
					}				
				}
				return false;
			}
			if(target.className=="add"){
				var news=[];
				target.nextElementSibling.value=target.nextElementSibling.value*1+1;
				for (var i=0;i<arr.length;i++) {
					var item=arr[i].split("=");
					if(JSON.parse(item[1]).inline==1){
						var id=target.parentNode.parentNode.lastElementChild.firstElementChild.id
						for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
							news.push(JSON.parse(item[1]).shopping[j])
							if(JSON.parse(item[1]).shopping[j].store==id){
								var size=JSON.parse(item[1]).shopping[j].size;
								size=target.nextElementSibling.value*1;
								var change={
									"store":id,
									"size":size
								}
								foo.push(change);
							}
						}	
						for (var k=0;k<JSON.parse(item[1]).shopping.length;k++) {
							if(JSON.parse(item[1]).shopping[k].store==foo[0].store){
								for (var m=0;m<news.length;m++) {
									if(news[m].store==foo[0].store){
										news.splice(m,1);
										news.splice(m,0,foo[0])
									}
								}
							}
						}
						var json={
							"username":JSON.parse(item[1]).username,
							"pwd":JSON.parse(item[1]).pwd,
							"inline":1,
							"shopping":news
						}
						setCookie(item[0],JSON.stringify(json),10)
						this.getAjax();
						break;
					}				
				}
			}else if(target.className=="redu"){
				var news=[];
				if(target.previousElementSibling.value>1){
					target.previousElementSibling.value=target.previousElementSibling.value*1-1;
					for (var i=0;i<arr.length;i++) {
					var item=arr[i].split("=");
					if(JSON.parse(item[1]).inline==1){
						var id=target.parentNode.parentNode.lastElementChild.firstElementChild.id
						for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
							news.push(JSON.parse(item[1]).shopping[j])
							if(JSON.parse(item[1]).shopping[j].store==id){
								var size=JSON.parse(item[1]).shopping[j].size;
								size=target.previousElementSibling.value*1;
								var change={
									"store":id,
									"size":size
								}
								foo.push(change);
							}
						}	
						for (var k=0;k<JSON.parse(item[1]).shopping.length;k++) {
							if(JSON.parse(item[1]).shopping[k].store==foo[0].store){
								for (var m=0;m<news.length;m++) {
									if(news[m].store==foo[0].store){
										news.splice(m,1);
										news.splice(m,0,foo[0])
									}
								}
							}
						}
						var json={
							"username":JSON.parse(item[1]).username,
							"pwd":JSON.parse(item[1]).pwd,
							"inline":1,
							"shopping":news
						}
						setCookie(item[0],JSON.stringify(json),10)
						this.getAjax();
						break;
					}				
				}
					
				}else{
					alert("数量不能少于1")
				}
			}
		}.bind(this))
	},
	getCookie:function(){
		this.brr=[];
		var cookie=document.cookie;
		var arr=cookie.split("; ");
		for (var i=0;i<arr.length;i++) {
			var item=arr[i].split("=");
			if(JSON.parse(item[1]).inline==1){
				for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
					this.brr.push(JSON.parse(item[1]).shopping[j])
				}
			}
		}
	},
	getAjax:function(){
		var res=ajaxPromise("detail.json");
		res.then(function(success){
			this.getCookie();
			var success=JSON.parse(success);
			var str="";
			for (var attr in success) {
				for (var i=0;i<this.brr.length;i++) {
					if(attr==this.brr[i].store){
						var data=success[attr];
						this.cal1=data.price.substring(1)*this.brr[i].size;
						this.back.push(data.price.substring(1))
						str+=`<ul class="con clearfix">
							<li class="sel">
								<input type="checkbox" class="select" value="" />
							</li>
							<li class="shop1">
								<img src="detail/${data.srcm1}"/>
								<span>${data.name}</span>
							</li>
							<li class="price1">
								${data.price}
							</li>
							<li class="discount1">
							</li>
							<li class="count1">
								<span class="add">+</span>
								<input type="text" class="tgh" value=${this.brr[i].size} disabled="disabled" />
								<span class="redu">-</span>
							</li>
							<li class="cal1">
								${this.cal1}
							</li>
							<li class="ope1">
								<a href="#" class="del" id=${attr}>删除</a>
							</li>
						</ul>`
					}
				}
			}
			this.content.innerHTML=str;
			var all=0;
			var cookie=document.cookie;
			var arr=cookie.split("; ");
			for (var i=0;i<arr.length;i++) {
				var item=arr[i].split("=");
				if(JSON.parse(item[1]).inline==1){
					for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
						all+=this.back[j]*JSON.parse(item[1]).shopping[j].size
					}
				}
			}
			this.end.children[0].innerHTML=all;
		}.bind(this))
	},
	del:function(){
		var cookie=document.cookie;
		var arr=cookie.split("; ");
		var foo=[];
		var brr=[];
		var newArr=[];
		this.del_left.children[0].onclick=function(){
			Array.prototype.slice.call(this.selec).forEach(function(ele){
				if(ele.checked){
					var id=ele.parentNode.parentNode.lastElementChild.firstElementChild.id;
					brr.push(id)
				}
			}.bind(this))
			newArr.length=0;
			for (var i=0;i<arr.length;i++) {
				var item=arr[i].split("=");
				if(JSON.parse(item[1]).inline==1){
					for (var j=0;j<JSON.parse(item[1]).shopping.length;j++) {
						if(brr.indexOf(JSON.parse(item[1]).shopping[j].store)==-1){
							newArr.push(JSON.parse(item[1]).shopping[j])
						}
					}
					var json={
						"username":JSON.parse(item[1]).username,
						"pwd":JSON.parse(item[1]).pwd,
						"inline":1,
						"shopping":newArr
						}
						setCookie(item[0],JSON.stringify(json),10)
						this.getAjax();
				}
			}
		}.bind(this);
		this.del_left.children[1].onclick=function(){
			for (var i=0;i<arr.length;i++) {
				var item=arr[i].split("=");
				if(JSON.parse(item[1]).inline==1){
					var json={
						"username":JSON.parse(item[1]).username,
						"pwd":JSON.parse(item[1]).pwd,
						"inline":1,
						"shopping":[]
						}
						setCookie(item[0],JSON.stringify(json),10)
						this.getAjax();
						break;
				}
			}
		}.bind(this)
	}
}
