//清空缓存
window.sessionStorage.clear();
//截取url
function urlId(name){
	var main = {};
	var urlSplit = window.location.href.split("?")[1];
	if(urlSplit!=""&&urlSplit!=undefined){
		var arr = urlSplit.split("&");
		for (var i = 0; i < arr.length ; i++) {
			main[arr[i].split("=")[0]] = arr[i].split("=")[1];
		}
	}
	return main[name];
}
if (urlId("partnerid") && urlId("key")) {
	var urls = "/"+urlId("partnerid")+"/"+urlId("key");
} else{
	var urls = "";
}
var auto = "";
ajaxFn();
function ajaxFn() {
	$.ajax({
		type:"get",
		url:"../v1/manager/common/live"+urls+auto,
		async:true,
		success:function (data) {
			//定时刷新
			auto = '?auto=1';
			setTimeout(ajaxFn,20000);
			if (data.resultcode == 1000) {
				if (data.lives.length == 0) {
					$("ul").html('<li style="text-align: center;line-height: 60px;">近期暂无比赛</li>');
				} else{
					var lis = '';
					for (var i in data.lives) {
						var that = data.lives[i];
						lis += '<li data-mainteamid="'+that.mainteamid+'" data-gameid="'+that.gameid+'"><header><p>'+statusFn(that.status)+'</p></header><div class="indexScore"><div class="left"><img src="'+that.hostteamlogo+'"/><p>'+nomainFn(that.hostteamname)+'</p></div><div class="center"><time>'+nomainFn(that.gametime)+'</time><p><span>'+noneFn(that.status,that.hostteamscore)+'</span>-<span>'+noneFn(that.status,that.clientteamscore)+'</span></p><i>'+nomainFn(that.leaguename)+'第'+nomainFn(that.gamesession)+'轮</i></div><div class="right"><img src="'+that.clientteamlogo+'"/><p>'+nomainFn(that.clientteamname)+'</p></div></div><div class="detail"><a href="'+enFn(that.status,that.lineupstatus,that.gameid)+'">English</a><a href="'+cnFn(that.status,that.lineupstatus,that.gameid)+'">中文</a></div></li>'
					}
					$("ul").html(lis);
				}					
			} else if (data.resultcode == 999){
				$("ul").html('<li style="text-align: center;line-height: 60px;">近期暂无比赛</li>');
			}else{
				alertFn(data.msg);
			}
		},
		error:function () {
			alertFn("请求出错");
		}
	});
}
function nomainFn(main) {
	if (main == undefined) {
		return '-';
	} else{
		return main;
	}
}
function statusFn (status) {
	return ["未开赛","进行中","已结束"][status];
}
function noneFn(status,score) {
	if (status == 0 || score == undefined) {
		return "";
	} else{
		return score;
	}
}
function cnFn (status,lineupstatus,gameid) {
	if (status == 1|| status == 2) {
		return "main.html?game="+gameid+"&lang=cn";
	} else{
//		if (lineupstatus == 1) {
			return "main.html?game="+gameid+"&lang=cn";
//		} else{
//			return "###";
//		}		
	}
}
function enFn (status,lineupstatus,gameid) {
	if (status == 1 || status == 2) {
		return "main.html?game="+gameid+"&lang=en";
	} else{
//		if (lineupstatus == 1) {
			return "main.html?game="+gameid+"&lang=en";
//		} else{
//			return "###";
//		}
	}
}
//是否有主队ID
$("ul").on("click",".detail a",function () {
	var mainteamid = $(this).parents("li").attr("data-mainteamid");
	if (mainteamid != "" && mainteamid != "undefined") {
		window.sessionStorage.setItem("mainteamid",mainteamid);		
	}
})
//点击a
/*$("ul").on("click",".detail a",function () {
	if ($(this).attr("href") == "###") {
		if ($(this).html() == "English") {
			alertFn("Not Started");
		} else{
			alertFn("未开赛");
		}		
	}
})*/
//提示框
function alertFn (main) {
	$("#hint").html(main);
	$("#hint").show();
	$("#hint").css("opacity","1");
	setTimeout(function () {
		$("#hint").css("opacity","0");
		$("#hint").hide();		
	},1000)
}

//分享
$.ajax({
	type:"post",
	url:"../v1/manager/common/signature/0",
	async:true,
	contentType:'application/json',
	data:JSON.stringify({url:window.location.href.split("#")[0]}),
	success:function (data) {
		weichart(data);
	},
	error:function () {
		console.log("微信分享请求错误");
	}
});
function weichart(data) {
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: data.appid, //必填，公众号的唯一标识
	    timestamp: data.timestamp,// 必填，生成签名的时间戳
	    nonceStr: data.noncestr, // 必填，生成签名的随机串
	    signature: data.signature,// 必填，签名，见附录1
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	wx.ready(function(){
		//朋友圈
		wx.onMenuShareTimeline({
		    title:"同道伟业实时报告",
		    link: window.location.href.split("#")[0],
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
		//好友
		wx.onMenuShareAppMessage({
		    title:"同道伟业实时报告", // 分享标题
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司', // 分享描述
		    link: window.location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png',// 分享图标
		    type: '',// 分享类型,music、video或link，不填默认为link
		    dataUrl: ''//如果type是music或video，则要提供数据链接，默认为空
		});
		//QQ好友
		wx.onMenuShareQQ({
		    title:"同道伟业实时报告",
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司',
		    link: window.location.href.split("#")[0],
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
		//QQ空间
		wx.onMenuShareQZone({
		    title:"同道伟业实时报告",
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司',
		    link: window.location.href.split("#")[0],
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
		//腾讯微博
		wx.onMenuShareWeibo({
		    title:"同道伟业实时报告",
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司',
		    link: window.location.href.split("#")[0],
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
	})		
}