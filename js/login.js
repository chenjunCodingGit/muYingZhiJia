/*空白搜索栏*/
$.get("../data/login/login-blank.json",function(data){
	$(".nav-blank>img").attr({src:data[0].src});//得到src
	$(".nav-blank>img").attr({alt:data[0].alt})//得到alt
	//console.log(data[0])
})

/*登录验证*/
//验证登录名是否合法
$('#userName').on('keyup blur',function(evt){
	checkName(evt);
});
//验证密码是否合法
$('#pwd').on('keyup blur',function(evt){
	checkPwd03(evt);
});
//验证登录名是否合法函数
function checkName(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	if($('#userName').val()==""){
		//值为空时，显示不能为空
		$('#userName').addClass('login-error-input').parent().find('i').addClass('login-error-i').html('账户不能为空');
		return false;	
	}else{
		//值不为空时，显示正常
		$('#userName').removeClass('login-error-input').parent().find('i').removeClass('login-error-i').html('');
		return true;
	}
}
//验证密码是否合法函数
function checkPwd03(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	if($('#pwd').val()==""){
		//值为空时，显示不能为空
		$('#pwd').addClass('login-error-input').parent().find('i').addClass('login-error-i').addClass('login-pwd-error').html('密码不能为空');
		return false;
	}else{
		//值不为空时，显示正常
		$('#pwd').removeClass('login-error-input').parent().find('i').removeClass('login-error-i').html('');
		return true;
	}
}
/*插件加载验证码*/
$.idcode.setCode();//加载生成验证码方法
var i;
var mobile = false;//输入验证码后返回值
$('#code-change-login').click(function(){
	var isBy = $.idcode.validateCode();
	i = $.idcode.getCode();
})
i = $.idcode.getCode();
$('#btn').click(function(){
	if(i==$('#mobile').val()){
		mobile = true;//验证正确赋值为true
	}else{
		$('#auth-code-i').addClass('login-error-i').addClass('login-mobile-error').html('图片验证码格式错误');	
	}
})

$('#btn').click(function(){
	if(checkName()&&checkPwd03()&&mobile){//输入是否合法
		$('#auth-code-i').removeClass('login-error-i').removeClass('login-mobile-error').html('');	
		var loginName = JSON.parse($.cookie('user')).userName;//得到cookie中的name
		var loginPwd = JSON.parse($.cookie('user')).userPwd;//得到cookie中的password
		console.log(loginName+" "+loginPwd)
		if($('#userName').val()==loginName && $('#pwd').val()==loginPwd){//成功登录
			//清除密码账户错误的提示
			$('#auth-code-i').removeClass('login-error-i').removeClass('login-mobile-error').html('');	
			//跳转到首页
			location.href = 'index.html';
		}else{
			//显示登录失败
			$('#auth-code-i').addClass('login-error-i').addClass('login-mobile-error').html('密码或账户错误');
		}
	}
})
