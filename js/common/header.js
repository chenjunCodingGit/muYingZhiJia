var b = $(".header_right dl b");
var aDl = $(".header_right dl")

for(var i=0;i<b.length;i++){
	aDl[i].index = i
	aDl[i].onmouseover = function(){
		if(this.index ==2){
			$(".third_dl b").css("display","none")
		}
		b[this.index].className = "hover"
	}
	aDl[i].onmouseout = function(){
		if(this.index ==2){
			$(".third_dl b").css("display","none")
		}
		b[this.index].className = "" 
	}
}

/*验证登录正确*/
var isLogin = $.cookie('loginOk')? JSON.parse($.cookie('loginOk')) : {};
var userInfo = $.cookie('user')? JSON.parse($.cookie('user')) : {};
if(isLogin.a==1){
		
		$('.headerName').html('欢迎 '+isLogin.name);
		$('.headerLogin').html('已登录');
		$('.headerReg').html('');
}