/*鼠标移上吸顶的选项的效果*/
$("#good-right-xiding ul a").click(function(){
	$(this).addClass("good-xiding-active").siblings().removeClass("good-xiding-active");
	//$(this).css({'border-right':'1px solid #eee','border-left':'1px solid #eee'});
//	$(this).siblings().css({'border-right':'1px solid #fff','border-left':'1px solid #fff'})
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
var oSmallImg = $(".small-img-box").find('img');
//点击每个小图遍历
for(var i=0;i<oSmallImg.length;i++){
	oSmallImg[i].index = i;
	oSmallImg[i].onclick = function(){
		//所有的小图class样式先清空
		for(var i=0;i<oSmallImg.length;i++){
			oSmallImg[i].className = ""
		}
		//当前小图class样式
		this.className = "fangdajing-active";
		//改变当前小图时，显示当前的中图和大图
		//../img/goodDetail/152022_02_02.jpg
		$(".middle-img").attr("src","../img/goodDetail/1520220"+parseInt(this.index+1)+".jpg");
		$(".big-img").attr("src","../img/goodDetail/1520220"+parseInt(this.index+1)+".jpg");
	}
}
var oMiddleImgBox = $(".middle-img-box");
var oImagesZoom = $(".image-zoom");
var oBigImgBox = $(".big-img-box");
var oBigImg = $(".big-img");

//鼠标移上中图时
oMiddleImgBox.mousemove(function(e){
	oImagesZoom.css("display","block");//显示遮罩
	oBigImgBox.css("display","block");//显示大图
	//得到遮罩到中图边框的距离=pageX到根节点距离-遮罩的宽高/2-中图的根节点距离
	var l = e.pageX-oImagesZoom.width()/2-oMiddleImgBox.offset().left;
	var t = e.pageY-oImagesZoom.height()/2-oMiddleImgBox.offset().top;
	if(l<0){//判断是否到边界
		l = 0;
	}else if(l>oMiddleImgBox.width()-oImagesZoom.width()){
		//左边界
		l=oMiddleImgBox.width()-oImagesZoom.width();
	}
	if(t<0){//判断是否到边界
		t = 0;
	}else if(t>oMiddleImgBox.height()-oImagesZoom.height()){
		//下边界
		t=oMiddleImgBox.height()-oImagesZoom.height();
	}
	//将距离范围赋值给遮罩
	oImagesZoom.css("left",l+"px");
	oImagesZoom.css("top",t+"px");
	//大图的宽高比大图的盒子宽高 大
	var al = l*(oBigImg.width()/oMiddleImgBox.width());//得到大图与中图的比例
	var at = t*(oBigImg.height()/oMiddleImgBox.height());//得到大图与中图的比例
	oBigImg.css("left",-al + "px");
	oBigImg.css("top",-at + "px");
})
//鼠标移除中图
oMiddleImgBox.mouseout(function(){
	oImagesZoom.css("display","none");
	oBigImgBox.css("display","none");
})

/*加入购物车信息*/
//点击数量加减
var goodNum = $('.good-car-num').html();
$('.good-detail-add').click(function(){
	goodNum++;
	$('.good-car-num').html(goodNum);
})
$('.good-detail-sub').click(function(){
	if(goodNum>0){
		goodNum--;
		$('.good-car-num').html(goodNum);
	}else{
		goodNum = 0;
	}
})
//点击加入购物车
$('.good-car-add').click(function(){
	
	var goodId = $(this)[0].id;
	var goods = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};
	var goodName = $(this).attr('name');
	var goodPrice = $('.good-detail-off').find('i').html();
	var goodSrc = $('.goodcar-detail-img').attr('src');
	if(goodId in goods){
		goods[goodId].num += goodNum;
	}else{
		goods[goodId] = {
			id:goodId,
			src:goodSrc,
			name:goodName,
			price:goodPrice,
			num:goodNum
		}
	}
	$.cookie('cars',JSON.stringify(goods),{expires:7,path:"/"});
	$('.good-car-num').html('1');
})
