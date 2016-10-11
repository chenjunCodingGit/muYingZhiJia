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