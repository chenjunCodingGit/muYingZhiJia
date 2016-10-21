//动态加载搜索栏中最左边的图片的路径
$.get(
	"../data/common/search/search_right.json",
	function(data){
		//var result = JSON.parse(data);
		$(".search_right img").attr("src",data[0].src)
		$(".search_right img").attr("alt",data[0].alt)
	}
) 

//动态加载搜索栏中   正
$.get(
	"../data/common/search/search_right.json",
	function(data){
		$(".s_mid_01 dt").css("background",data[2].background);
	}
)
//动态加载搜索栏中    荐
$.get(
	"../data/common/search/search_right.json",
	function(data){
		$(".s_mid_02 dt").css("background",data[3].background);
	}
)
//动态加载搜索栏中   专
$.get(
	"../data/common/search/search_right.json",
	function(data){
		$(".s_mid_03 dt").css("background",data[4].background);
	}
)

//动态加载搜索栏中搜索图标
$.get(
	"../data/common/search/search_right.json",
	function(data){
		$(".search_click").css("background",data[1].background);
	}
)

$('.search_right').click(function(){
	location.href = 'index.html'
})

/*百度搜索API*/
var searchkey = $("#searchMes");
searchkey.keyup(function(){
	$.ajax({
	url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+searchkey.val()+"&json=1&p=3",
	dataType:"jsonp",
	jsonp:"cb",
	success:function(data){
		var aData = data.s;
		console.log(data)
		var oUl = $(".tiplist");
		
		oUl.html("");
		for(var i in aData){
			var aLi = $("<li class='searchLi'></li>");
			aLi.html(aData[i]);
			oUl.append(aLi);
			
		}
		$('.searchLi').click(function(){
			console.log($(this).html())
			
			$("#searchMes").val($(this).html());
			$(".tiplist").css('display','none');
			//$(".tiplist").css('display','none');
		})
	}
})
})
/*$(window).click(function(){
	$(".tiplist").css('display','none');
})*/
searchkey.focus(function(){
	$(".tiplist").css('display','block');
})
searchkey.click(function(){
	$(".tiplist").css('display','block');
})

