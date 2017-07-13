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
$.ajax({
	type:"post",
	url:"../v1/manager/common/signature/"+urlId("game"),
	contentType:'application/json',
	data:JSON.stringify({url:window.location.href.split("#")[0]}),
	async:true,
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
		    title: data.name || "同道伟业实时报告",
		    link: 'https://www.cfadatabase.cn/footballdata/live/main.html?game='+urlId("game")+'&lang='+urlId("lang"),
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
		//好友
		wx.onMenuShareAppMessage({
		    title: data.name || "同道伟业实时报告", // 分享标题
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司', // 分享描述
		    link: 'https://www.cfadatabase.cn/footballdata/live/main.html?game='+urlId("game")+'&lang='+urlId("lang"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png',// 分享图标
		    type: '',// 分享类型,music、video或link，不填默认为link
		    dataUrl: ''//如果type是music或video，则要提供数据链接，默认为空
		});
		//QQ好友
		wx.onMenuShareQQ({
		    title: data.name || "同道伟业实时报告",
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司',
		    link: 'https://www.cfadatabase.cn/footballdata/live/main.html?game='+urlId("game")+'&lang='+urlId("lang"),
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
		//QQ空间
		wx.onMenuShareQZone({
		    title: data.name || "同道伟业实时报告",
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司',
		    link: 'https://www.cfadatabase.cn/footballdata/live/main.html?game='+urlId("game")+'&lang='+urlId("lang"),
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
		//腾讯微博
		wx.onMenuShareWeibo({
		    title: data.name || "同道伟业实时报告",
		    desc: '同道伟业是一家以足球大数据服务为驱动的数据业务和赛事版权营销公司',
		    link: 'https://www.cfadatabase.cn/footballdata/live/main.html?game='+urlId("game")+'&lang='+urlId("lang"),
		    imgUrl: 'https://www.cfadatabase.cn/footballdata/live/img/logo.png'
		});
	})		
}
$(".swiper-container").css("height",$(window).height() - 130);
//判断中英文
var language = urlId("lang");
//比赛状态
var teamtimeen = ["NoStart","Playing","End"];
var teamtimecn = ["未开赛","进行中","已结束"];
//标题
var titleen = ["Team","Player","Event","List"];
var titlecn = ["球队报告","球员报告","实时赛况","双方阵容"];
//传球方向
var teamlen1 = ["up","down","left","right"];
var teamlcn1 = ["向前","向后","向左","向右"];
var teamlen2 = ["pass","pass"];
var teamlcn2 = ["传球方向","传球占比"];
//进攻三区
var teamlen3 = ["attempt 3","attempt"];
var teamlcn3 = ["三区活动率","进攻三区活动占比"];
var teamlen4 = ["atmp","cen","def"];
var teamlcn4 = ["进攻","中场","防守"];
var teamlen5 = ["left","center","right"];
var teamlcn5 = ["左边","中间","右边"];
//球队传球方向
var teamlen6 = ["host","client"];
var teamlcn6 = ["主队","客队"];
//传球方向
var playerlen1 = ["up","down","left","right"];
var playerlcn1 = ["向前传球:","向后传球:","向左传球","向右传球"];
//h2标题
var playerlen2 = ["attempt 3","attempt","avgarea X,Y"];
var playerlcn2 = ["三区活动率","进攻三区活动占比","活动平均X轴、Y轴位置"];
var playerlen3 = ["defense","center","attempt"];
var playerlcn3 = ["防守","中场","进攻"];
//实时赛况底部状态说明
var fightingen = ["Goal","Penalty","Own","Yel","Red","Change"];
var fightingcn = ["进球","点球","乌龙","黄牌","红牌","换人"];
//阵容
var lineupen = ["Starting XI","Subs"];
var lineupcn = ["首发","替补"];
//中英文切换
if (language == "en") {
	//标题
	$("header p").each(function (idx) {
		$(this).html(titleen[idx]);
	});
	//球员
	$("#playerMain .fangxiang p").each(function (idx) {
		$(this).html(playerlen1[idx] + '<span></span>');
	})
	$("#playerMain h2").each(function (idx) {
		$(this).html(playerlen2[idx]);
	})
	$("#playerMain .sanqu p").each(function (idx) {
		if (idx < 3) {
			$(this).html(playerlen3[idx]);
		} else{
			$(this).html(teamlen5[idx - 3]);
		}		
	})
	//球队
	$(".teamMainfooter .teamchuan .teamMaintitle span").each(function (idx) {
		$(this).html(teamlen1[idx%4]);
	});
	$(".teamMainfooter .teamchuan .teamMaintitle li:nth-child(2)").each(function (idx) {
		$(this).html(teamlen2[idx]);
	});
	$(".teamMainfooter .sanqu .teamMaintitle li:nth-child(2)").each(function (idx) {
		$(this).html(teamlen3[idx]);
	})
	$(".teamMainfooter .sanqu .teamMaintitle span").each(function (idx) {
		if (idx < 6) {
			$(this).html(teamlen4[idx%3]);
		} else{
			$(this).html(teamlen5[idx%3]);
		}
		
	});
	$("#teamMain .teammap div ul li").each(function (idx) {
		$(this).html(teamlen6[idx]);
	})
	//实时赛况
	$(".fightingfooter span").each(function (idx) {
		$(this).html(fightingen[idx])
	})
	//阵容
	$("#lineup h3").each(function (idx) {
		$(this).html(lineupen[idx]);
	})
} else{
	//标题
	$("header p").each(function (idx) {
		$(this).html(titlecn[idx]);
	});
	//球员
	$("#playerMain .fangxiang p").each(function (idx) {
		$(this).html(playerlcn1[idx] + '<span></span>');
	});
	$("#playerMain h2").each(function (idx) {
		$(this).html(playerlcn2[idx]);
	});
	$("#playerMain .sanqu p").each(function (idx) {
		if (idx < 3) {
			$(this).html(playerlcn3[idx]);
		} else{
			$(this).html(teamlcn5[idx - 3]);
		}		
	});
	//球队
	$(".teamMainfooter .teamchuan .teamMaintitle span").each(function (idx) {
		$(this).html(teamlcn1[idx%4])
	})
	$(".teamMainfooter .teamchuan .teamMaintitle li:nth-child(2)").each(function (idx) {
		$(this).html(teamlcn2[idx]);
	});
	$(".teamMainfooter .sanqu .teamMaintitle li:nth-child(2)").each(function (idx) {
		$(this).html(teamlcn3[idx]);
	});
	$(".teamMainfooter .sanqu .teamMaintitle span").each(function (idx) {
		if (idx < 6) {
			$(this).html(teamlcn4[idx%3]);
		} else{
			$(this).html(teamlcn5[idx%3]);
		}
		
	});
	$("#teamMain .teammap div ul li").each(function (idx) {
		$(this).html(teamlcn6[idx]);
	})
	//实时赛况
	$(".fightingfooter span").each(function (idx) {
		$(this).html(fightingcn[idx])
	});	
	//阵容
	$("#lineup h3").each(function (idx) {
		$(this).html(lineupcn[idx]);
	})
}
//球员圆环
$("#chuanqiulv").radialIndicator({
	radius:100,
	barColor: '#ea68a2',
    barWidth: 20,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:55,
    fontWeight:'normal'
});
$("#banchangchuanqiu").radialIndicator({
	radius:100,
	barColor: '#00a0e9',
    barWidth: 20,
    barBgColor:'rgba(255,255,255,0.3)',
    initValue: 0,
    frameTime:15,
    roundCorner : true,
    percentage: true,
    fontColor:'white',
    fontSize:55,
    fontWeight:'normal'
});
//转变值
//$('#chuanqiulv').data('radialIndicator').animate(68);
//球队球员切换
$("header p").click(function () {
	$(this).addClass("check").siblings().removeClass("check");
	var idx = $("header p").index($(this));
	$(".swiper-slide").eq(idx).show().siblings().hide();
	if (idx == 1) {
		$("#playerSelect").show();
		//球员高度变化
		$(".swiper-container").css("height",$(window).height() - 171);
	} else{
		$("#playerSelect").hide();
		$(".swiper-container").css("height",$(window).height() - 130);		
	}
	if (idx == 2) {
		$(".fightingfooter").css("display","flex");
		$(".swiper-container").css("height",$(window).height() - 170);
	} else{
		$(".fightingfooter").css("display","none");
	}
})
//球队球员选择
$("#playerSelect div p").click(function () {
	$(this).parent().siblings().find("ul").slideUp();
	$(this).siblings("ul").slideToggle(200);
});
//选择球队
$("#playerSelect .teamName ul").on("click","li",function () {
	$("#playerSelect .teamName p span").html($(this).html())
	$("#playerSelect .teamName p").attr("data-id",$(this).attr("data-id"));
	$(this).addClass("check").siblings().removeClass("check");
	$(this).parent().slideUp();
	//球员转换
	teamChoose();
})
//选择球员
$("#playerSelect .playerName ul").on("click","li",function () {
	$("#playerSelect .playerName p span").html($(this).html());
	$("#playerSelect .playerName p").attr("data-id",$(this).attr("data-id"));
	$(this).addClass("check").siblings().removeClass("check");
	$(this).parent().slideUp();
	//球员数据加载
	playerFn();
})
//保存数据
var dataMain;
//球队传球
var teammapdata;
//请求数据
var titletype = true;
var auto2 = "";
var auto3 = "";
var auto4 = "";
ajaxFn();
function ajaxFn() {
	var gameid = urlId("game");
	var datas = {};
	if (window.sessionStorage.getItem("mainteamid")) {
		var datas = {mainteamid:window.sessionStorage.getItem("mainteamid")}
	}
	if (gameid) {
		$.ajax({
			type:"post",
			url:"../v1/manager/common/realtimereport/"+gameid+auto2,
			contentType:'application/json',
			data:JSON.stringify(datas),
			async:true,
			success:function (data) {
				if (data.type != 2) {
					auto2 = '?auto=2';
					setTimeout(ajaxFn,20000);
				}
				
				if (data.resultcode == 1000) {
					//传球线路图
					if () {
						
					} else{
						
					}
					
					if (data.type == 0) {
						if (titletype) {
							$("header p").eq(3).click();
							titletype = false;
						}
						$("#score img").eq(0).attr("src",data.team.hostteamlogo);
						$("#score img").eq(1).attr("src",data.team.clientteamlogo);
						if (language == "en") {
							$(".teamtime").html('<span>'+teamtimeen[data.type]+'</span><time></time>');
							$("#score .team span").eq(0).html(data.team.hostteamnameen);
							$("#score .team span").eq(1).html(data.team.clientteamnameen);
						} else{
							$(".teamtime").html('<span>'+teamtimecn[data.type]+'</span><time></time>');
							$("#score .team span").eq(0).html(data.team.hostteamname);
							$("#score .team span").eq(1).html(data.team.clientteamname);
						}
						//调取阵容
						lineupFn();
					} else{
						if (titletype) {
							$("header p").eq(0).click();
							titletype = false;
						}
						dataMain = data.realtimereport;
						var Datas = data.realtimereport;
						var teamlis = '';
						var teamNamelis = ''
						//比分数据项
						$("#score .score span").eq(0).html(Datas.teamInfos[0].team[0][2]);
						$("#score .score span").eq(1).html(Datas.teamInfos[1].team[0][2]);
						$("#score img").eq(0).attr("src",Datas.teamInfos[0].teamlogo);
						$("#score img").eq(1).attr("src",Datas.teamInfos[1].teamlogo);
						//英文
						if (language == "en") {
							if (data.type == 1) {
								$(".teamtime").html('<span>'+teamtimeen[data.type]+'</span><time>'+nomainFn(data.playingtime)+'&apos;</time>');
							} else{
								$(".teamtime").html('<span>'+teamtimeen[data.type]+'</span><time></time>');
							}
							$("#score .team span").eq(0).html(Datas.teamInfos[0].teamname);
							$("#score .team span").eq(1).html(Datas.teamInfos[1].teamname);
							//球队报告
							//球队前十项
							for (var i = 0; i < 16 ; i++) {
								teamlis += '<li><ul><li>'+Datas.teamInfos[0].team[i][2]+'</li><li>'+Datas.teamInfos[0].team[i][0]+'</li><li>'+Datas.teamInfos[1].team[i][2]+'</li></ul><div><span></span></div></li>'
							}
							//球队下面项
							for (var i = 16; i < 30 ; i++){
								$("#teamMain .teamMaindata li:nth-child(1) span").eq(i - 16).html(Datas.teamInfos[0].team[i][2]);
								$("#teamMain .teamMaindata li:nth-child(3) span").eq(i - 16).html(Datas.teamInfos[1].team[i][2]);
							}
							//球员球队筛选
							for (var j in Datas.playerInfos) {
								teamNamelis += '<li data-id="'+Datas.playerInfos[j].teamid+'">'+Datas.playerInfos[j].teamname+'</li>'
							}
						} else{//中文
							if (data.type == 1) {
								$(".teamtime").html('<span>'+teamtimecn[data.type]+'</span><time>'+nomainFn(data.playingtime)+'&apos;</time>');
							} else{
								$(".teamtime").html('<span>'+teamtimecn[data.type]+'</span><time></time>');
							}							
							$("#score .team span").eq(0).html(Datas.teamInfos[0].teamnamecn);
							$("#score .team span").eq(1).html(Datas.teamInfos[1].teamnamecn);
							//球队报告
							//前十项
							for (var i = 0; i < 16 ; i++) {
								teamlis += '<li><ul><li>'+Datas.teamInfos[0].team[i][2]+'</li><li>'+Datas.teamInfos[0].team[i][1]+'</li><li>'+Datas.teamInfos[1].team[i][2]+'</li></ul><div><span></span></div></li>'
							}
							//球队下面项
							for (var i = 16; i < 30 ; i++){
								$("#teamMain .teamMaindata li:nth-child(1) span").eq(i - 16).html(Datas.teamInfos[0].team[i][2]);
								$("#teamMain .teamMaindata li:nth-child(3) span").eq(i - 16).html(Datas.teamInfos[1].team[i][2]);
							}
							//球员球队筛选
							for (var j in Datas.playerInfos) {
								teamNamelis += '<li data-id="'+Datas.playerInfos[j].teamid+'">'+Datas.playerInfos[j].teamnamecn+'</li>'
							}
						}
						//调取实时赛况
						fightingFn();
						//调取阵容
						lineupFn();
						//写入球队报告
						$("#teamMain>ul").html(teamlis);
						//调取横向滑动
						barFn();
						//写入球员球队筛选
						$("#playerSelect .teamName ul").html(teamNamelis);
						
						//球员数据
						teamChoose();
					}						
				} else{
					console.log(data.msg);
				}
			},
			error:function () {
				console.log("请求出错");
			}
		});
	} else{
		window.location = "live.html";
	}		
}


function teamChoose() {
	var data = dataMain;
	var checkteam = true;
	//是否有选中球队
	$("#playerSelect .teamName ul li").each(function () {
		if ($("#playerSelect .teamName p").attr("data-id") == $(this).attr("data-id")) {
			$(this).addClass("check");
			checkteam = false;
		}
	})
	if (checkteam) {
		$("#playerSelect .teamName ul li").eq(0).addClass("check");
		$("#playerSelect .teamName p span").html($("#playerSelect .teamName ul li").eq(0).html());
		$("#playerSelect .teamName p").attr("data-id",$("#playerSelect .teamName ul li").eq(0).attr("data-id"));
	}
	var playerChooselis = ''
	for (var i in data.playerInfos) {
		if ($("#playerSelect .teamName p").attr("data-id") == data.playerInfos[i].teamid) {
			if (language == "en") {
				for (var j in data.playerInfos[i].playerobj) {
					playerChooselis += '<li data-id="'+data.playerInfos[i].playerobj[j].playerid+'">'+data.playerInfos[i].playerobj[j].playername+'</li>'
				}
			} else{
				for (var j in data.playerInfos[i].playerobj) {
					playerChooselis += '<li data-id="'+data.playerInfos[i].playerobj[j].playerid+'">'+data.playerInfos[i].playerobj[j].playernamecn+'</li>'
				}
			}				
		}
	}
	//写入球员筛选
	$("#playerSelect .playerName ul").html(playerChooselis);
	//是否有选中球员
	var checkplayer = true;
	$("#playerSelect .playerName ul li").each(function () {
		if ($("#playerSelect .playerName p").attr("data-id") == $(this).attr("data-id")) {
			$(this).addClass("check");
			checkplayer = false;
		}
	})
	if (checkplayer) {
		$("#playerSelect .playerName ul li").eq(0).addClass("check");
		$("#playerSelect .playerName p span").html($("#playerSelect .playerName ul li").eq(0).html());
		$("#playerSelect .playerName p").attr("data-id",$("#playerSelect .playerName ul li").eq(0).attr("data-id"));
	}
	//调取球员数据
	playerFn();
}
//球员报告写入
var swipertrue = true;
function playerFn() {
	var data = dataMain;
	for (var i in data.playerInfos) {
		if (data.playerInfos[i].teamid == $("#playerSelect .teamName p").attr("data-id")) {
			for (var j in data.playerInfos[i].playerobj) {
				if (data.playerInfos[i].playerobj[j].playerid == $("#playerSelect .playerName p").attr("data-id")) {
					//英文
					if (language == "en") {
						//上部
						for (var k = 0 ; k < 13; k ++) {
							$("#playerMain .main span").eq(k).html(data.playerInfos[i].playerobj[j].playerdata[k][2]);
							$("#playerMain .main p").eq(k).html(data.playerInfos[i].playerobj[j].playerdata[k][0]);
						}
						//传球成功
						for (var k = 13 ; k < 19; k ++) {
							if (k == 13) {
								$("#playerMain .chuanqiu p").eq(k - 13).html(data.playerInfos[i].playerobj[j].playerdata[k][0]);
								$('#chuanqiulv').data('radialIndicator').animate(data.playerInfos[i].playerobj[j].playerdata[k][2]);
							} else if (k == 16){
								$("#playerMain .chuanqiu p").eq(k - 13).html(data.playerInfos[i].playerobj[j].playerdata[k][0]);
								$('#banchangchuanqiu').data('radialIndicator').animate(data.playerInfos[i].playerobj[j].playerdata[k][2]);
							}else{
								$("#playerMain .chuanqiu p").eq(k - 13).html(data.playerInfos[i].playerobj[j].playerdata[k][0] + ':<span>'+data.playerInfos[i].playerobj[j].playerdata[k][2]+'</span>');
							}
						}
						
					//中文	
					} else{
						//上部
						for (var k = 0 ; k < 13; k ++) {
							$("#playerMain .main span").eq(k).html(data.playerInfos[i].playerobj[j].playerdata[k][2]);
							$("#playerMain .main p").eq(k).html(data.playerInfos[i].playerobj[j].playerdata[k][1]);
						}
						//传球成功
						for (var k = 13 ; k < 19; k ++) {
							if (k == 13) {
								$("#playerMain .chuanqiu p").eq(k - 13).html(data.playerInfos[i].playerobj[j].playerdata[k][1]);
								$('#chuanqiulv').data('radialIndicator').animate(data.playerInfos[i].playerobj[j].playerdata[k][2]);
							} else if (k == 16){
								$("#playerMain .chuanqiu p").eq(k - 13).html(data.playerInfos[i].playerobj[j].playerdata[k][1]);
								$('#banchangchuanqiu').data('radialIndicator').animate(data.playerInfos[i].playerobj[j].playerdata[k][2]);
							}else{
								$("#playerMain .chuanqiu p").eq(k - 13).html(data.playerInfos[i].playerobj[j].playerdata[k][1] + ':<span>'+data.playerInfos[i].playerobj[j].playerdata[k][2]+'</span>');
							}
						}
					}
					//传球方向
					for (var k = 19 ; k < 27; k ++) {
						if (k % 2 == 0) {
							$("#playerMain .fangxiang li>span").eq((k - 20)/2).html(data.playerInfos[i].playerobj[j].playerdata[k][2]+'%');
						} else{
							$("#playerMain .fangxiang p span").eq((k - 19)/2).html(data.playerInfos[i].playerobj[j].playerdata[k][2]);
						}
					}
					//三区
					for (var k = 27 ; k < 33; k ++) {
						$("#playerMain .sanqu span").eq(k - 27).html(data.playerInfos[i].playerobj[j].playerdata[k][2]+'%');
					}
					//位置
					for (var k = 33 ; k < 35; k ++) {
						$("#playerMain .weizhi span").eq(k - 33).html(data.playerInfos[i].playerobj[j].playerdata[k][2]);
					}
				}
			}
		}
	}
	//三区位置
	playerweizhiFn();
	if (swipertrue) {
		swiperFn();
	}
	swipertrue = false;
}
//swiper

function swiperFn() {
	var swiper = new Swiper('.swiper-container', {
	    scrollbar: '.swiper-scrollbar',
	    direction: 'vertical',
	    slidesPerView: 'auto',
	    mousewheelControl: true,
	    freeMode: true,
		roundLengths : true, //防止文字模糊
		initialSlide :0,
		observer:true,
		observeParents:true
	});
	$("header p").click(function () {
		swiper.slideTo(0);
		swiper.update();
	})
}
//球队对比条
function barFn() {
	$("#teamMain>ul span").each(function () {
		var number1 = parseInt($(this).parents("li").find("li").eq(0).html());
		var number2 = parseInt($(this).parents("li").find("li").eq(2).html());
		if (number1 + number2 != 0) {
			$(this).css("width",100*number1/(number1+number2) + "%");
		}		
	})
}
//球员位置
function playerweizhiFn() {
	var numX = $("#playerMain .weizhi span").eq(0).html();
	var numY = $("#playerMain .weizhi span").eq(1).html();
	$("#playerMain .weizhi li").css("left",155 * numX / 173);
	$("#playerMain .weizhi li").css("top",105 * numY / 113);
	if (numX < 0 && 155 * numX / 173 >= -70) {
		$("#playerMain .weizhi li p").addClass("left");
	} else if(155 * numX / 173 > 75){
		$("#playerMain .weizhi li p").addClass("left");
	}else {
		$("#playerMain .weizhi li p").removeClass("left");
	}
}

//实时赛况
//fightingFn();
function fightingFn() {
	var gameid = urlId("game");
	if (gameid) {
		$.ajax({
			type:"get",
			url:"../v1/manager/common/fighting/"+ gameid+auto3,
			//url:"saikuang.json",
			async:true,
			success:function (data) {
				if (data.resultcode == 1000) {
					auto3 = '?auto=3';
					//英文
					var lis = ''
					if (language == "en") {
						$(data.fightings.players).each(function () {
							lis += '<li class="'+["","zhuli","keli"][this.teamtype]+'"><p class="left"><span>'+mainNone(this.outplayernameen)+this.playernameen+'</span><img src="img/fighting0'+this.goaltype+'.png" /></p><time>'+this.goaltime+'&apos;</time><p class="right"><img src="img/fighting0'+this.goaltype+'.png" /><span>'+mainNone(this.outplayernameen)+this.playernameen+'</span></p></li>'
						})
					//中文	
					} else{
						$(data.fightings.players).each(function () {
							lis += '<li class="'+["","zhuli","keli"][this.teamtype]+'"><p class="left"><span>'+mainNone(this.outplayernamecn)+this.playernamecn+'</span><img src="img/fighting0'+this.goaltype+'.png" /></p><time>'+this.goaltime+'&apos;</time><p class="right"><img src="img/fighting0'+this.goaltype+'.png" /><span>'+mainNone(this.outplayernamecn)+this.playernamecn+'</span></p></li>'
						})
					}
					$("#fighting .main ul").html(lis);
					//如果阵容页刷新页面
					if ($("header p").index($("header .check")) == 2) {
						$("header .check").click();
					}
				} else{
					console.log(data.msg);
				}
			},
			error:function () {
				alert("实时赛况出错");
			}
		});
	} else{
		
	}
}
function mainNone(main) {
	if (main == undefined) {
		return ""
	} else{
		return main + "<br />";
	}
}
//阵容
//lineupFn();
function lineupFn() {
	var gameid = urlId("game");
	if (gameid) {
		$.ajax({
			type:"get",
			url:"../v1/manager/common/lineup/"+ gameid+auto4,
			//url:"zhenrong.json",
			async:true,
			success:function (data) {
				if (data.resultcode == 1000) {
					auto4 = '?auto=4';
					var zhulif = '<li><p>'+$("#score .team span").eq(0).html()+'</p><span>'+data.lineups.startinginfo.hoststartinginfo[0].lineup+'</span></li>';
					var kelif = '<li><p>'+$("#score .team span").eq(1).html()+'</p><span>'+data.lineups.startinginfo.clientstartinginfo[0].lineup+'</span></li>';
					var zhulis = '';
					var kelis = '';
					//英文
					if (language == "en") {
						//首发
						$(data.lineups.startinginfo.hoststartinginfo[0].players).each(function () {
							zhulif += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[1])+'</p></li>'
						});
						$(data.lineups.startinginfo.clientstartinginfo[0].players).each(function () {
							kelif += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[1])+'</p></li>'
						});
						//替补
						$(data.lineups.benchinfo.hostbenchinfo[0].players).each(function () {
							zhulis += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[1])+'</p></li>'
						});
						$(data.lineups.benchinfo.clientbenchinfo[0].players).each(function () {
							kelis += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[1])+'</p></li>'
						});
						
					//中文	
					} else{
						//首发
						$(data.lineups.startinginfo.hoststartinginfo[0].players).each(function () {
							zhulif += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[0])+'</p></li>'
						});
						$(data.lineups.startinginfo.clientstartinginfo[0].players).each(function () {
							kelif += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[0])+'</p></li>'
						});
						//替补
						$(data.lineups.benchinfo.hostbenchinfo[0].players).each(function () {
							zhulis += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[0])+'</p></li>'
						});
						$(data.lineups.benchinfo.clientbenchinfo[0].players).each(function () {
							kelis += '<li><span>'+nomainFn(this[2])+'</span><p>'+nomainFn(this[0])+'</p></li>'
						});
					}
					//首发替补写入
					$("#lineup .lineupF ul").eq(0).html(zhulif);
					$("#lineup .lineupF ul").eq(1).html(kelif);
					$("#lineup .lineupS ul").eq(0).html(zhulis);
					$("#lineup .lineupS ul").eq(1).html(kelis);
					
					//滑动
					if (swipertrue) {
						swiperFn();
					}
					swipertrue = false;
				} else{
					console.log(data.msg);
				}
			},
			error:function () {
				alert("阵容请求错误");
			}
		});
	} else{
		window.location = "live.html";
	}
}

function nomainFn(main) {
	if (main == undefined || main === "") {
		return "-";
	} else{
		return main;
	}
}
