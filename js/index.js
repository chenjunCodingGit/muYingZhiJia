//通过json得到图片的src、alt
$.get("../data/index/top_ad/top_ad.json",function(data){
	$("#topDd>img").attr({src:data[0].src});//得到src
	$("#topDd>img").attr({alt:data[0].alt})//得到alt
	//console.log(data[0])
})

//商品列表mian02 立即抢购
$.get("../data/index/main-top02.json",function(data){
	$(".main02-img01 img").attr({src:data[0].src});
	$(".main02-img01 img").attr({alt:data[0].alt});

	$(".main02-img02>a>img").attr({src:data[1].src});
	$(".main02-img02>a>img").attr({alt:data[1].alt});
	
	$(".main02-img>a>img").attr({src:data[2].src});
	$(".main02-img>a>img").attr({alt:data[2].alt});
})

//加载footer01的left的2张图片
$.get("../data/index/footer01/footer01.json",function(data){
	$(".footer01-img01>img").attr({src:data[0].src});
	$(".footer01-img01>img").attr({alt:data[0].alt});
	$(".footer01-img02>img").attr({src:data[1].src});
	$(".footer01-img02>img").attr({alt:data[1].alt});
	
})

/*轮播图*/
$('.prev').stop().animate({opacity:0});//按钮消失
$('.next').stop().animate({opacity:0});//按钮消失

var liLen = $('.box li').length;
var isNow = 1;//下标为1，第二张图片开始
var liWidth = $('.box li').eq(0).outerWidth();
$('.box').css("left",-$('.box li').eq(0).outerWidth());
/*点击右按钮*/
$('.next').click(function(){
	isNow++;
	if(isNow == liLen){
		$('.box').css({left:-liWidth+"px"});//无缝滚动
		isNow = 2;//下一张
	}
	tab();
})
/*点击右按钮*/
$('.prev').click(function(){
	isNow--;
	if(isNow == -1){
		$('.box').css({left:-liWidth*(liLen-2)+"px"});//无缝滚动
		isNow = liLen-3;//下一张
	}
	tab();
})

//点击某个圆点定位
for(var i=0;i<$('.nav div').length;i++){
	$('.nav div').index = i;
	$('.nav div').click(function(){
		isNow = $(this).index()+1;
		console.log($(this).index())
		tab();
	})
}

/*鼠标移上banner*/
/*$('#banner').onmouseover = function(){
	clearInterval($('#banner').timer);
}*/
$('#banner').mouseover(function(){
	clearInterval($('#banner')[0].timer);
	$('.prev').stop().animate({opacity:0.6});//按钮
	$('.next').stop().animate({opacity:0.6});//按钮
})
/*鼠标移出banner*/
$('#banner').mouseout(function(){
	/*autoPlay();*/
	$('.prev').stop().animate({opacity:0});//按钮消失
	$('.next').stop().animate({opacity:0});//按钮消失
})

autoPlay();
/*自动播放*/
function autoPlay(){
	clearInterval($('#banner')[0].timer);
	$('#banner')[0].timer = setInterval(function(){
		isNow++;
		if(isNow == liLen){
			$('.box').css("left",-liWidth+"px");
			isNow = 2;
		}
		tab();
	},2000)
}

function tab(){
	for(var i=0;i<$('.nav div').length;i++){
		$('.nav div').eq(i).removeClass("nav-active");//所有圆点先置为白色
	}
	
	//liLen=8
	var navIndex = 0;
	if(isNow == 0){
		navIndex = liLen-3;
	}else if(isNow == liLen-1){
		navIndex = 0;
	}else{
		navIndex = isNow -1;
	}
	
	$('.nav div').eq(navIndex).addClass("nav-active");
	//自动轮播
	$('.box').stop().animate({left:-$('.box li').eq(0).outerWidth()*isNow});
}

