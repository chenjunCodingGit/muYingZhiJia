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

/*放大镜*/
var oSmallImg = $(".small-img-box img");
for(var i=0;i<oSmallImg.length;i++){
	oSmallImg[i].index = i;
	oSmallImg[i].onclick = function(){
		for(var i=0;i<oSmallImg.length;i++){
			oSmallImg[i].className = ""
		}
		this.className = "fangdajing-active";
		//../img/goodDetail/152022_02_02.jpg
		$(".middle-img").attr("src","../img/goodDetail/152022_02_0"+parseInt(this.index+1)+".jpg");
		$(".big-img").attr("src","../img/goodDetail/152022_02_0"+parseInt(this.index+1)+".jpg");
	}
}
var oMiddleImgBox = $(".middle-img-box");
var oImagesZoom = $(".image-zoom");
var oBigImgBox = $(".big-img-box");
var oBigImg = $(".big-img");

oMiddleImgBox.mousemove(function(e){
	oImagesZoom.css("display","block");
	oBigImgBox.css("display","block");
	var l = e.pageX-oImagesZoom.width()/2-oMiddleImgBox.offset().left;
	var t = e.pageY-oImagesZoom.height()/2-oMiddleImgBox.offset().top;
	if(l<0){
		l = 0;
	}else if(l>oMiddleImgBox.width()-oImagesZoom.width()){
		l=oMiddleImgBox.width()-oImagesZoom.width();
	}
	if(t<0){
		t = 0;
	}else if(t>oMiddleImgBox.height()-oImagesZoom.height()){
		t=oMiddleImgBox.height()-oImagesZoom.height();
	}
	oImagesZoom.css("left",l+"px");
	oImagesZoom.css("top",t+"px");
	
	var al = l*(oBigImg.width()/oMiddleImgBox.width());
	var at = t*(oBigImg.height()/oMiddleImgBox.height());
	oBigImg.css("left",-al + "px");
	oBigImg.css("top",-at + "px");
})
oMiddleImgBox.mouseout(function(){
	oImagesZoom.css("display","none");
	oBigImgBox.css("display","none");
})