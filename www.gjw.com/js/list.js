window.onload=function(){
	new List().init()
}
function List(){
	this.pageCount=16;
	this.pageNum=1;
	this.status="茅台"
	this.page=document.getElementsByClassName("page")[0]
	this.allLi=document.getElementsByClassName("allLi")[0];
	this.inner=document.getElementsByClassName("inner")[0];
}
List.prototype={
	init:function(){
		this.showList()
		this.getAjax(this.status)
		this.animat();
		this.selec();
		this.backTop();
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
	getAjax(value){
		var title="";
		var str="";
		var res=ajaxPromise("list.json");
		res.then(function(success){
			var success=JSON.parse(success);
			for (var key in success) {
				console.log(key)
				title+=`<li>${key}</li>`;
				if(key==value){
					var data=success[key]
					for (var i=(this.pageNum-1)*this.pageCount;i<this.pageCount*this.pageNum;i++) {
						if(i<data.length){
							str+=`<li>
								<a href="detail.html?id=${data[i].id}">
								<div class="topImg">
									<img src="listImg/${data[i].src1}" alt=""/>
									<img src="listImg/${data[i].src2}" alt=""/>
								</div>
								<span class="name">${data[i].des}</span>
								<span class="price">${data[i].price}</span>
								<i>加入购物车</i>
								<span class="commit">
									评论:${data[i].commit}
								</span>
								</a>
							</li>`
						}
					}
					var pageAll=Math.ceil(data.length/this.pageCount);
					var frag=document.createDocumentFragment();
					for (var j=0;j<pageAll;j++) {
						var span=document.createElement("span");
						if(j==this.pageNum-1){
							span.className="pageNum"
						}
						span.innerHTML=(j+1);
						frag.appendChild(span)
					}
					this.page.innerHTML="";
					this.page.appendChild(frag);
				}
			}
			this.allLi.innerHTML=title;
			this.inner.innerHTML=str;
			this.pageCount=16;
			this.pageNum=1;
		}.bind(this))
	},
	animat:function(){
		this.inner.addEventListener("mousemove",function(e){
			var e=e||event;
			var target=e.target||e.srcElement;
			if(target.tagName=="IMG"){
				target.parentNode.parentNode.style.borderBottom="3px solid #c40000"
			}
		}.bind(this))
		this.inner.addEventListener("mouseout",function(e){
			var e=e||event;
			var target=e.target||e.srcElement;
			if(target.tagName=="IMG"){
				target.parentNode.parentNode.style.borderBottom="1px solid #ccc"
			}
		}.bind(this))
		this.page.addEventListener("click",function(e){
			var e=e||event;
			var target=e.target|| e.srcElement;
			if(target.tagName=="SPAN"){
				this.pageNum=target.innerHTML;
				this.getAjax(this.status);
			}
		}.bind(this))
	},
	selec:function(){
		var that=this;
		this.allLi.addEventListener("click",function(e){
			var e=e||event;
			var target=e.target|| e.srcElement;
			if(target!=this){
				that.status=target.innerHTML;
				that.getAjax(that.status)
			}
		})
	},
	backTop:function(){
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
	}
}
