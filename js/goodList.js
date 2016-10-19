/*点击切换商品列表页面*/
$('.list-pre').click(function(){
	$('.goodlist01').css("display","block")//切换页面
	$('#list-click-btn').html("1")//显示当前页页码
	$('.goodlist02').css("display","none")//切换页面
	$('#list-wrap-div02').removeClass("click-color-active")//移除另外一个class
	$('#list-wrap-div01').addClass("click-color-active")//添加当前一个class
})
$('.list-next').click(function(){
	$('.goodlist02').css("display","block")//切换页面
	$('#list-click-btn').html("2"); //显示当前页页码
	$('.goodlist01').css("display","none")//切换页面
	$('#list-wrap-div01').removeClass("click-color-active")//移除另外一个class
	$('#list-wrap-div02').addClass("click-color-active")//添加当前一个class
})
$('.list-click-tab').each(function(){
	$(this).click(function(){
		$(this).addClass("click-color-active").siblings().removeClass("click-color-active");
		$('#list-click-btn').html($(this).html())
		console.log($(this).eq(0))
		$('.goodlist0'+$(this).html()).css("display","block").siblings().css("display","none")
	})
})

/*点击添加到购物车*/
$('.goodlist-one').click(function(){
	var goodId = $(this)[0].id;
	var goods = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};
	var goodName = $(this).find('p2').html();
	var goodPrice = $(this).find('p4').find('i').html();
	var goodSrc = $(this).find('img').attr('src');
	if(goodId in goods){
		goods[goodId].num++;
	}else{
		goods[goodId] = {
			id:goodId,
			src:goodSrc,
			name:goodName,
			price:goodPrice,
			num:1
		}
	}
	$.cookie('cars',JSON.stringify(goods),{expires:7,path:"/"});
})
