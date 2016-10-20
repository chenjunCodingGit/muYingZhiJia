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

/*动态加载图片*/
$.get('../data/goodList/goodlist.json',function(data){
	var j = 0;
	for(var i in data){
		$('.goodlist-one').eq(j)[0].id = data[i].id;
		$('.goodlist-one').eq(j).find('img').attr({src:data[i].img});
		$('.goodlist-one').eq(j).find('.goodlist-myp2').html(data[i].name);
		$('.goodlist-one').eq(j).find('.goodlist-myp3').html(data[i].tip);
		$('.goodlist-one').eq(j).find('.goodlist-myp4').find('i').html(data[i].price);
		j++;
	}
})

/*点击添加到购物车*/
$('.add-shop-car').click(function(){
	var goodId = $(this).parent().parent().parent()[0].id;
	var goods = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};
	var goodName = $(this).parent().parent().find('.goodlist-myp2').html();
	var goodPrice = $(this).parent().parent().find('.goodlist-myp4').find('i').html();
	var goodSrc = $(this).parent().parent().find('img').attr('src');
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
	
	
	/*得到购物车里所有数量,显示到slidebar02里*/
	var good = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};//得到cookie里面的数据，如果没有，设为空对象
	var goodid;
	var goodnum = 0;
	//console.log(good)
	for(var goodid in good){
		goodnum += Number(good[goodid].num);
		console.log(good[goodid].num);
	}
	$('.slidebar02-car-num').html(goodnum);
	
	
	//飞入购物车效果
    var offset = $(".slidebar02").offset();//end 为在结束元素加一个ID ，将结束元素设置为fixed；
    var addcar = $(this); 
    var img = addcar.parent().parent().find('img').eq(0).attr('src'); //定义图片地址
    //将图片地址赋值给飞入效果的图片
    var flyer = $('<img class="u-flyer" style="width:100px;height:100px;z-index:1000000;border-radius:50px" src="'+img+'">'); 
    flyer.fly({ 
        start: { 
            left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
            top: event.pageY-$(document).scrollTop() //开始位置（必填） 可视窗口的距离
        }, 
        end: { 
            left: offset.left+100, //结束位置（必填） 
            top: offset.top-$(document).scrollTop()+10, //结束位置（必填） 
            width: 0, //结束时宽度 
            height: 0 //结束时高度 
        }, 
        onEnd: function(){ //结束回调 
        	//contCarNum();//数量++回调函数  自己注释掉
//              $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息                
//              addcar.css("cursor","default").removeClass('orange').unbind('click'); 
            this.destory(); //移除dom 
        } 
    });
})

/*点击图片跳转*/
$('.goodlist-one img').click(function(){
	location.href = 'goodDetail.html';
	var imgId = $(this).parent().parent().parent()[0].id;
	$.cookie('carId',JSON.stringify(imgId),{expires:7,path:"/"});
})

/*得到购物车里所有数量,显示到slidebar02里*/
var good = $.cookie('cars')? JSON.parse($.cookie('cars')) : {};//得到cookie里面的数据，如果没有，设为空对象
var goodid;
var goodnum = 0;
//console.log(good)
for(var goodid in good){
	goodnum += Number(good[goodid].num);
	console.log(good[goodid].num);
}
$('.slidebar02-car-num').html(goodnum);
