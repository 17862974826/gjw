//obj-- 操作的元素    json {}  操作的target  和  attr    （多物体运动+缓冲+透明度+链式运动）
//callback  回调函数  
function startMove(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//如果为真   让定时器停止  
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){
				current = parseFloat( getStyle( obj,attr ) ) * 100 ;
			}else if( attr == "zIndex" ){
				current =parseInt( getStyle( obj, attr ) ) ;
			}else{
				current =parseInt( getStyle( obj, attr ) ) ;//每次调用定时器 获取操作的attr样式值
			}
			var speed = (json[attr] - current)/20;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			//如果操作的样式 ！=  目标值不相等   不能停止定时器  变flag为false
			if( current != json[attr] ){
				flag = false;
			}
			
			if( attr == "opacity" ){
				obj.style.opacity = (current+speed)/100;
			}else if( attr == "zIndex" ){
				obj.style.zIndex = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
		//循环结束后  判断开关变量的值 是否是true  如果是true  就停止定时器
		if( flag ){
			clearInterval( obj.timer );
			//上一个动作完成  进入到下一个动作  
			if( callback ){
				callback();//下一个动作执行
			}
		}
	},30)
}
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

