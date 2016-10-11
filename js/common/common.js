//抽离公用的html，实现同步
function loadHtml(url,targetId){
	$.ajax({
		url:url,
		async:false,//实现同步，才可以实现由上往下加载
		success:function(data){
			$("#"+targetId).html(data);
		}
	});
}
