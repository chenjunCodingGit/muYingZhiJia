/*空白搜索栏*/
$.get("../data/register/login-blank.json",function(data){
	$(".nav-blank>img").attr({src:data[0].src});//得到src
	$(".nav-blank>img").attr({alt:data[0].alt})//得到alt
	//console.log(data[0])
})

/*点击跳转到主页*/
$('.nav-blank').click(function(){
	location.href = 'index.html';
})

/*注册表单验证*/
//验证正则
var regs = {
	userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
	pwdRed:/^.{6,20}$/,
	numPwd:/\d/,
	strPwd:/[a-zA-z]/,
	tsPwd:/a-zA-Z0-9/,
	email:/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/,
	//tel:/^((\d3)|(\d{3}\-))?13[456789]\d{8}|15[89]\d{8}/
	tel:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/
}
//检查phone表单事件
$('#phone').on('keyup focus blur',function(evt){
	checkPhone(evt);
});
//检查密码表单事件
$('#registerPwd01').on('keyup focus blur',function(evt){
	checkPwd01(evt);
})
//检查第二次输入密码事件
$('#registerPwd02').on('keyup focus blur',function(evt){
	checkPwd02(evt);
})

//检查phone表单函数
function checkPhone(_e){
	var type;
	if(_e){//如果事件存在
		type = _e.type;
	}
	var values = $('#phone').val();
	//点击phone值为空时，提示信息
	if(type=='focus'){
		if(values==""){
			$('#phone').addClass('error');
			$('#phone').parent().find('i').addClass('error').addClass('register-phone-error').html('手机格式不对，请重新输入!');
			return false;
		}
	}
	//三个点击事件存在时，值为空提示
	if(values==""){
		$('#phone').addClass('error');
		$('#phone').parent().find('i').addClass('error').addClass('register-phone-error').html('手机格式不对，请重新输入!');
		return false;
	}else if(regs.tel.test(values) || regs.email.test(values)){//输入正确时
		$('#phone').removeClass('error');
		$('#phone').parent().find('i').removeClass('error').html('');
		//显示输入正确标志
		$('#phone').parent().find('em').addClass('right').addClass('register-phone-right');
		return true;//验证正确返回true
	}else{
		//移除正确标志
		$('#phone').parent().find('em').removeClass('right').removeClass('register-phone-right');
		//显示错误提示
		$('#phone').addClass('error');
		$('#phone').parent().find('i').addClass('error').addClass('register-phone-error').html('手机格式不对，请重新输入!');
		return false;
	}
}
//检查密码表单函数
function checkPwd01(_e){
	var type;
	if(_e){//如果事件存在
		type = _e.type;
	}
	//
	var values = $('#registerPwd01').val();
	if(type=='focus'){
		if(values==""){
			$('#registerPwd01').addClass('error');
			$('#registerPwd01').parent().find('i').addClass('error').html('密码长度限制为6-20位字符');
			return false;
		}
	}
	if(values==""){
		//显示提示
		$('#registerPwd01').addClass('error');
		$('#registerPwd01').parent().find('i').addClass('error').html('');
		return false;
	}else if(regs.pwdRed.test(values)){
		//显示输入正确标志
		$('#registerPwd01').parent().find('em').addClass('right');
		//移除密码错误提示
		$('#registerPwd01').removeClass('error');
		$('#registerPwd01').parent().find('i').removeClass('error').html('');
		//显示密码强度
		$('.pwd-style').css('display','block');
		var level = getPwdLevel(values);
		//验证密码强度
		switch (level){
			case 1:
				$('.pwd-style').find('span').eq(0).addClass('pwd-style01');
				break;
			case 2:
				$('.pwd-style').find('span').eq(0).addClass('pwd-style01');
				$('.pwd-style').find('span').eq(1).addClass('pwd-style02');
				break;
			case 3:
				$('.pwd-style').find('span').eq(0).addClass('pwd-style01');
				$('.pwd-style').find('span').eq(1).addClass('pwd-style02');
				$('.pwd-style').find('span').eq(2).addClass('pwd-style03');
				break;
		}
		return true;//验证正确返回true
	}else{
		//不显示正确标志
		$('#registerPwd01').parent().find('em').removeClass('right');
		//不显示密码强度
		$('.pwd-style').css('display','none');
		//显示错误提示
		$('#registerPwd01').addClass('error');
		$('#registerPwd01').parent().find('i').addClass('error').html('密码长度限制为6-20位字符');
		return false;
	}
}
//验证第二次输入密码
function checkPwd02(_e){
	var type;
	if(_e){
		type = _e.type;
	}
	var values = $('#registerPwd02').val();
	//验证获得焦点值为空时
	if(type=='focus'){
		if(values==''){
			$('#registerPwd02').addClass('error');
			$('#registerPwd02').parent().find('i').addClass('error').html('2次密码不一致，请重新输入');
			return false;
		}
	}
	
	//填入内容为空时
	if(values==''){
		$('#registerPwd02').addClass('error');
		$('#registerPwd02').parent().find('i').addClass('error').html('2次密码不一致，请重新输入');
		return false;
	}else if($('#registerPwd01').val()==values){
		//显示验证正确标志
		$('#registerPwd02').parent().find('em').addClass('right');
		//移除密码错误提示
		$('#registerPwd02').removeClass('error');
		$('#registerPwd02').parent().find('i').removeClass('error').html('');
		return true;//验证正确返回true
	}else{
		//不显示正确标志
		$('#registerPwd02').parent().find('em').removeClass('right');
		//显示错误提示
		$('#registerPwd02').addClass('error');
		$('#registerPwd02').parent().find('i').addClass('error').html('2次密码不一致，请重新输入');
		return false;
	}
}

/*插件加载验证码*/
$.idcode.setCode();//加载生成验证码方法
var i;
var registerCode = false;//输入验证码后返回值
$('#code-change').click(function(){
	var isBy = $.idcode.validateCode();
	i = $.idcode.getCode();
})
i = $.idcode.getCode();
$('#register-btn').click(function(){
	if(i==$('#registerCode').val()){
		registerCode = true;//验证正确返回true
	}else{
		$('.register-last-i').addClass('error').html('图片验证码格式错误');
	}
})

//点击注册
var isRegister = 1;
$('#register-btn').click(function(){
	if($('#registeryes')[0].checked){
		//去除同意协议栏错误
		$('.register-last-i').parent().find('i').removeClass('error').html('');
		//注册成功
		if(checkPhone()&&checkPwd01()&&checkPwd02()&&registerCode){
			//去除验证码错误提示
			$('.register-last-i').removeClass('error').html('');
			console.log('ok');
			
			//注册成功后将用户名 密码存入cookie
			var userInfo = $.cookie('user')? JSON.parse($.cookie('user')) : {};
			for(var i in userInfo){
				if(userInfo[i].userName == $('#phone').val()){
					isRegister = 0;
					alert('用户名已存在');
				}
			}
			if(isRegister==1){
				var date = Date.parse(new Date());
				userInfo[date] = {
					userName:$('#phone').val(),
					userPwd:$('#registerPwd02').val()
				}
				$.cookie("user",JSON.stringify(userInfo),{expires:7,path:"/"});//path:"/" 存到跟路径，可以和login共享
				
				location.href = '../html/login.html';
			}
			
		}else{
			$('.register-last-i').addClass('error').html('图片验证码格式错误');
		}
	}
	else{
		$('.register-last-i').removeClass('error').html('');
		$('.register-last-i').parent().find('i').addClass('error').html('您还没有同意用户协议');
	}
})

//验证密码强度函数
function getPwdLevel(pwd){
	var level = 0;
	var isNum = true,isStr = true,isTs = true;
	for(var i=0;i<pwd.length;i++){
		if(isNum&&regs.numPwd.test(pwd[i])){
			level++;
			isNum = false;
			continue;//（代码优化）如果已匹配完，就不往下执行
		}
		if(isStr&&regs.strPwd.test(pwd[i])){
			level++;
			isStr = false;
			continue;
		}
		if(isTs&&regs.tsPwd.test(pwd[i])){
			level++;
			isTs = false;
			continue;
		}
	}
	return level;
}
