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
//从一级导航移入显示
$('#ui-nav').mouseover(function(){
	$('.nav02-ul').css("display","block");
})
//从一级导航移入消失
$('#ui-nav').mouseout(function(){
	$('.nav02-ul').css("display","none");
})
//从二级导航移到三级导航
$('.nav02').mouseover(function(){
	$('.nav02-ul').css("display","block");
	$(this).children().eq(2).css("display","block");
	$(this).siblings().find(".ui-nav03").css("display","none");//找到该兄弟节点里面的三级导航
	//移除第三级导航消失二三级导航
	$(this).children().eq(2).mouseout(function(){
		$(this).css("display","none");
		$('.nav02-ul').css("display","none");
	})
})
//移除二级导航还没移到三级导航，消失二级导航
$('.nav02-ul').mouseout(function(){
	$(this).css("display","none");
})

/*动态解析三级导航内容*/
$.get("../data/common/nav/nav-third.json",function(data){
	var a = 1;//遍历nav0*  
	for(var i in data){
		if(i == "nav0"+a){
			var b = 1;//遍历box0*
			var c = 1;//由于执行到最后会调到该循环,遍历text0*
			for(var j in data[i]){
				if(j == "box0"+b){
					for(var k in data[i][j]){
						if(k == "title0"+b){
							//加载三级导航中的小标题,如：孕妇内衣
							//var aSpan = $('<span></span>').html(data[i]["box0"+b]["title0"+b]);
							//$('.nav02-ui0'+a).parent().find('.ui-nav03-ui0'+a).find('.nav03').eq(b-1).prepend(aSpan);
						}
						//加载三级导航小标签
						if(k == "text0"+c){
							for(var m in data[i][j][k]){
								//在所有.nav03下加入a标签
								var aCont = $('<a href="###"></a>').html(data[i][j][k][m]);
								$('.nav02-ui0'+a).parent().find('.ui-nav03-ui0'+a).find('.nav03').eq(c-1).append(aCont);
								//console.log(data[i][j][k])
								//第一个a标签加属性
								$('.nav03').eq(c-1).children().eq(1).attr({class:"nav03-one",href:"/html/goodList.html",target:"_blank"});
							}
						}
					}
				}
				b++;
				c++;
			}
		}
		a++;
	}
});

