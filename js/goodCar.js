/*解析商品详情页购物车的商品*/
//取cookie中的商品
var good = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};//得到cookie里面的数据，如果没有，设为空对象
var goodNum;//记录需要加入商品的数量
var goodId;//记录需要加入商品的goodId
var goodPrice;//记录需要加入商品的goodPrice
//遍历good中所有商品的goodId，并通过DOM操作加入到页面
for(goodId in good){
	goodNum = good[goodId].num;//商品的数量
	goodPrice = Number(good[goodId].price);//商品的价格
	var goodOne = $('<div class='+"shopcar-one"+" "+'data-id='+goodId+'>'+
	  '<div class="shopcar-one-img">'+
	  '<img src='+good[goodId].src+'/></div>'+
	  
	  '<span class="shopcar-one-describe">'+good[goodId].name+'</span>'+
	  '<span class="shopcar-one-price"><i>¥</i>'+'<em>'+good[goodId].price+'</em>'+'.00</span>'+
	  '<span class="shopcar-one-sub shopcar-gDetail-sub">-</span>'+
	  '<span class="shopcar-one-num shopcar-gDetail-num">'+goodNum+'</span>'+
	  '<span class="shopcar-one-add shopcar-gDetail-add">+</span>'+
	  '<span class="shopcar-one-prices"><em>¥</em>'+'<i class="shopcar-all-prices">'+goodNum*goodPrice+'</i>'+'.00</span>'+
	  '<span class="shopcar-one-del shopcar-gDetail-del">删除</span>'+
	  
	  '</div>');
	$('.shopcar-bottom').before(goodOne);//擦入到到页面
}

var allP = 0;//进入页面时，显示的总共的价格
//遍历刚进入页面时购物车里所有的价格
for(var j=0;j<$('.shopcar-all-prices').length;j++){
	allP += Number($('.shopcar-all-prices').eq(j).text());
}
$('.shopcar-total-pirce').html(allP);//总价页面显示
$('.shopcar-all-t').html(allP);//总价页面显示

//点击减号数量减减
$('.shopcar-one-sub').click(function(){
	var all = 0;//除了点击其他的总价
	var goodsNum = 0;//商品数量总数
	var conNum = Number($(this).parent().find('.shopcar-one-num').html());
	var aPrice = $(this).parent().find('.shopcar-one-price').find('em').text();//点击当前商品的价格
	var aNum = $(this).parent().find('.shopcar-one-num').html();//点击当前商品的数量
	aNum--;
	if(aNum>=0){
		$(this).parent().find('.shopcar-one-num').html(aNum);//在页面上改变当前的数量
		$(this).parent().find('.shopcar-one-prices').find('i').html(aNum*Number(aPrice));//页面上改变点击当前商品总的价格
		//遍历其他商品节点的总价
		for(var i=0;i<$(this).parent().siblings().length;i++){
			//计算其他商品总价
			all += Number($(this).parent().siblings().find('.shopcar-all-prices').eq(i).text());
			goodsNum += Number($(this).parent().siblings().find('.shopcar-one-num').eq(i).text());
		}
		//得到所有的价格总和
		var allPrice = aNum*Number(aPrice)+all;
		$('.shopcar-total-pirce').html(allPrice);//总和显示到页面
		$('.shopcar-all-t').html(allPrice);//总和显示到页面
		$('.shopcar-total-nums').html(goodsNum+conNum-1);
	}else{
		aNum = 0;
	}
	//得到该商品的id
	var agoodId = $(this).parent().attr('data-id');
	good[agoodId].num = aNum;//将cookie中该商品的id值改变
	$.cookie('cars',JSON.stringify(good),{expires:7,path:"/"});//将改变的值存入cookie
})
//点击加号数量加加
$('.shopcar-one-add').click(function(){
	var all = 0;
	var aPrice = $(this).parent().find('.shopcar-one-price').find('em').text();
	var aNum = $(this).parent().find('.shopcar-one-num').html();
	var goodsNum = 0;//商品数量总数
	var conNum = Number($(this).parent().find('.shopcar-one-num').html());

	aNum++;
	$(this).parent().find('.shopcar-one-num').html(aNum);
	$(this).parent().find('.shopcar-one-prices').find('i').html(aNum*Number(aPrice));
	//总计
	
	for(var i=0;i<$(this).parent().siblings().length;i++){
		all += Number($(this).parent().siblings().find('.shopcar-all-prices').eq(i).text());
		goodsNum += Number($(this).parent().siblings().find('.shopcar-one-num').eq(i).text());
	}
	var allPrice = aNum*Number(aPrice)+all;
	$('.shopcar-total-pirce').html(allPrice);
	$('.shopcar-all-t').html(allPrice);
	$('.shopcar-total-nums').html(goodsNum+conNum+1);
	
	var agoodId = $(this).parent().attr('data-id');
	good[agoodId].num = aNum;
	$.cookie('cars',JSON.stringify(good),{expires:7,path:"/"});
})
/*进入网页时，所有物品数量和*/
var allGoodsNum = 0;
for(goodId in good){
	 allGoodsNum += good[goodId].num;
}
$('.shopcar-total-nums').html(allGoodsNum);

/*点击删除从商品详情页来的商品*/
$('.shopcar-one-del').click(function(){
	//移除页面上的商品元素
	$(this).parent().remove();
	var goodId = $(this).parent().attr("data-id");//得到该商品的data-id属性
	var good01 = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};//
	delete good01[goodId];//通过id即可删除内容
	$.cookie('cars',JSON.stringify(good01),{expires:7,path:"/"});//删除cookie
	if($.cookie('cars')=='{}'){//cars为空也删除cookie
		$.cookie('cars','',{expires:-1,path:"/"});
	}
})
/*清空购物车所有东西*/
$('.shopcar-clear').click(function(){
	$('.shopcar-one').remove();//清空页面上的商品
	$.cookie('cars',JSON.stringify(good),{expires:-1,path:"/"});//删除全部商品的cookie
	$('.shopcar-total-pirce').html('00');//结算价格总和清零
	$('.shopcar-all-t').html('00');//结算价格总和清零
})

/**/
$('.shopcar-top-left').click(function(){
	location.href = 'index.html';
})


