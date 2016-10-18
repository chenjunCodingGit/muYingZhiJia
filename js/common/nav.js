/*直邮专区*/
$('.nav-post-dd').mouseover(function(){
	$('.nav-europe').css("display","block")
})
$('.nav-post-dd').mouseout(function(){
	$('.nav-europe').css("display","none")
})

/*去边框*/
/*$('.nav02').mouseover(function(){
	$(this).css("border-right","none");
	$(this).siblings().css("border-right","1px solid #FF7700")
})*/

/*三级导航显示隐藏操作*/
/*$('#ui-nav').mouseover(function(){
	$('.nav02-ul').css("display","block");
})
//从二级导航移到三级导航
$('.nav02').mouseover(function(){
	$('.nav02-ul').css("display","block");
	$(this).children().eq(2).css("display","block");
	//移除第三级导航消失二三级导航
	$(this).children().eq(2).mouseout(function(){
		$(this).css("display","none");
		$('.nav02-ul').css("display","none");
	})
})
//移除二级导航还没移到三级导航，消失二级导航
$('.nav02-ul').mouseout(function(){
	$(this).css("display","none");
})*/

/*动态解析三级导航内容*/
$.get("../data/common/nav/nav-third.json",function(data){
	var a = 1;
	for(var i in data){
		if(i == "nav01"){
			var b = 1;var c = 1;
			for(var j in data[i]){
				if(j == "box0"+b){
					
					for(var k in data[i][j]){
						console.log(data[i][j][k])
						
						if(k == "text0"+c){
							
							for(var m in data[i][j][k]){
								console.log(data[i][j][k][m])
								var aCont = $('<a href="###"></a>').html(data[i][j][k][m]);
								console.log(c);
								$('.nav03').eq(c-1).append(aCont);
								
							}
						}
					}
				}
				b++;c++;
			}
		}
		a++;
	}
});

/*
 "text01":{
	"text11":"好奇",
	"class":"nav03-one",
	"href":"../../../html/goodDetail.html"
}
 * */
