window.onload=function(){
	new Register().init();
}
function Register(){
	this.count=getCookie("count");
	this.uname=document.getElementById("txt");
	this.pwd=document.getElementById("word");
	this.agn=document.getElementById("agn");
	this.validate=document.getElementById("vali");
	this.change=document.getElementsByClassName("change")[0];
	this.yzm=document.getElementById("yzm");
	this.mesc=document.getElementsByClassName("mes-c")[0];
	this.btn=document.getElementById("mesBtn");
	this.phone=document.getElementsByClassName("phone")[0];
	this.hint=document.getElementsByClassName("hint");
	this.word=document.getElementsByClassName("word")[0];
	this.again=document.getElementsByClassName("again")[0];
	this.yes=document.getElementById("yes");
}
Register.prototype={
	init:function(){
		this.flagName=null;
		this.flagPwd=null;
		this.flagAgain=null;
		this.flagyzm=null;
		this.testName=/^1[3578]\d{9}$/;
		this.testPwd=/\s+/g;
		var that=this;
		this.yes.onclick=function(){
			that.register()
		}
		this.btn.onclick=function(){
			that.message()
		}
		this.change.onclick=function(){
			that.Change();
		}
		this.validate.onblur=function(){
			that.checkyzm()
		}
		this.uname.onblur=function(){
			this.checkName();
		}.bind(this)
		this.uname.onfocus=function(){
			this.phone.style.border="0"
			this.phone.className="phone f1 focus";
		}.bind(this)
		this.pwd.onblur=function(){
			this.checkPwd();
			this.checkAgain()
		}.bind(this)
		this.pwd.onfocus=function(){
			this.word.style.border=0;
			this.word.className="word f1 focus";
		}.bind(this)
		this.agn.onblur=function(){
			this.checkAgain();
		}.bind(this)
		this.agn.onfocus=function(){
			this.again.style.border=0
			this.again.className="again f1 focus"
		}.bind(this)
		this.showData();
	},
	checkName:function(){
		if(this.testName.test(this.uname.value)){
			this.flagName=true;
			this.phone.className="phone f1 active";
			this.hint[0].innerHTML=""
		}else{
			this.flagName=false;
			this.phone.className="phone f1 error";
			this.hint[0].innerHTML="请输入正确的手机号";
		}
		
	},
	checkPwd:function(){
		if(this.testPwd.test(this.pwd.value) || (this.pwd.value.length<6 || this.pwd.value.length>20)){
			this.flagPwd=false;
			this.word.className="word f1 error";
			this.hint[1].innerHTML="请输入正确密码格式";
			this.pwd.value="";
		}else{
			this.flagPwd=true;
			this.word.className="word f1 active";
			this.hint[1].innerHTML=""
		}
	},
	checkAgain:function(){
		if(this.pwd.value==this.agn.value && this.agn.value!=""){
			this.flagAgain=true;
			this.again.className="again f1 active";
			this.hint[2].innerHTML=""
		}else{
			this.flagAgain=false;
			this.again.className="again f1 error";
			this.hint[2].innerHTML="两次密码不一致"
		}
	},
	checkyzm:function(){
		if(this.validate.value==this.str){
			this.flagyzm=true;
		}
	},
	random:function(min,max){
		return Math.round(Math.random()*(max-min)+min)
	},
	showData:function(){
		this.str=Math.random().toString(36).substring(2,7);
		this.yzm.innerHTML=this.str;
	},
	Change:function(){
		this.showData();
	},
	message:function(){
		this.mesc.innerHTML=this.random(10000,99999)
	},
	register:function(){
		this.count=this.random(0,1000)*1;
		if(this.flagName&&this.flagPwd&&this.flagAgain&&this.flagyzm&&this.mesc.innerHTML!=""){
			var json={
				username:this.uname.value,
				pwd:this.pwd.value,
				inline:0
			}
			if(document.cookie){
				var cookie=document.cookie;
				var arr=cookie.split("; ");
				for (var i=0;i<arr.length;i++) {
					var item=arr[i].split("=")[1];
					console.log(JSON.parse(item).username)
					if(JSON.parse(item).username==this.uname.value){
						alert("手机号已注册");
						return false;
					}
				}
			}
			alert("注册成功")
			setCookie("count",this.count,10);
			setCookie("user"+(this.count),JSON.stringify(json),10);
			location.reload();
		}else{
			alert("请按照规范填写可完成注册")
		}
	}
}
