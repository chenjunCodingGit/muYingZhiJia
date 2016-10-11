/*空白搜索栏*/
$.get("../data/login/login-blank.json",function(data){
	$(".nav-blank>img").attr({src:data[0].src});//得到src
	$(".nav-blank>img").attr({alt:data[0].alt})//得到alt
	//console.log(data[0])
})