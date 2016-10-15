/*鼠标移上吸顶的选项的效果*/
$("#good-right-xiding ul a").click(function(){
	$(this).addClass("good-xiding-active").siblings().removeClass("good-xiding-active");
	/*$(this).css({'border-right':'1px solid #eee','border-left':'1px solid #eee'});*/
/*	$(this).siblings().css({'border-right':'1px solid #fff','border-left':'1px solid #fff'})*/
	$('#good-xiding-pinglunNum').css('fontWeight','normal')
})
/*吸顶效果*/
var goodFixTop = $('#good-right-xiding').offset().top;
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop()
	if(scrollTop>=goodFixTop){
		$('#good-right-xiding').css({"position":"fixed","top":0})
	}else{
		$('#good-right-xiding').css("position","static");
	}
})
/*鼠标移上所有评论的选项的效果*/
$(".good-all-evaluate ul a").click(function(){
	$(this).addClass("good-all-active").siblings().removeClass("good-all-active");
	$('.good-all-evaluate ul a span').css('fontWeight','normal')
})