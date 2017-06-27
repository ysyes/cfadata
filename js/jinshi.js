//语言版本
if (false) {
	//英文
	var language = {
		fen:"Mins",
		title:["Time Range","Time Range (GS)","Time Range (GC)","Goals Scored","Goals Conceded","Time/Mins","Total "],
		type:['Penalty','Set Piece','Dribble','Cross','Through Pass','Short Pass','Long Pass','Follow Shot','Others'],
		fangshi:["Type (GS)","Type (GC)"],
		nobuy:"Please consult the consulting center for related services",
		nomain:'No Data'
	}
}else{
	//中文
	var language = {
		fen:"分钟",
		title:["进/失球时间段","进球时间段","失球时间段","进球个数","失球个数","时间/分钟","总计 "],
		type:['点球','定位球','突破','传中','直塞','短传','长传','补射','其他'],
		fangshi:["进球方式","失球方式"],
		nobuy:"请到咨询中心咨询相关服务",
		nomain:'暂无数据'
	}
}
//点击生成数据
$("#box div").click(function () {
	//显示
	$("#myteam").show();
	
	var jintime = [];
	var shitime = [];
	var jintype = [];
	var shitype = [];
	$("#box input").each(function (idx) {
		if (idx < 6) {
			jintime.push(parseInt($(this).val()));
		} else if (idx < 12){
			shitime.push(parseInt($(this).val()));
		} else if (idx < 21){
			jintype.push(parseInt($(this).val()));
		} else {
			shitype.push(parseInt($(this).val()));
		}
	})
	var data = {"items":[[""],[jintime,shitime,jintype,shitype]],"msg":"成功","resultcode":1000}
	//进失时间段
	shijian(data.items,1);
	fangshi(data.items,1);
})

function shijian(items,idx) {	//idx 1:自己队；2：pk对
	//写入标题
	$("#myteam p").eq(0).html(items[0][idx - 1]);
	
	var chartsdata = {};
	var componentsdata = {};
	var downloadJsondata ={};
	var themeJsondata = {};
	var chartArr = ["0-15","16-30","31-45","46-60","61-75","76-90"];
	var downloadArr = ["0-15"+language.fen,"16-30"+language.fen,"31-45"+language.fen,"46-60"+language.fen,"61-75"+language.fen,"76-90"+language.fen];
	//进球时间
	for (var j = 0; j < items[idx][0].length; j++) {
		chartsdata[chartArr[j]] = items[idx][0][j];
		downloadJsondata[downloadArr[j]] = items[idx][0][j];
	}
	//失球时间
	for (var i = 0; i < items[idx][0].length; i++) {
		componentsdata[chartArr[i]] = items[idx][1][i];
		themeJsondata[downloadArr[i]] = items[idx][1][i];
	}
	
	
	var builderJson = {
		"charts": chartsdata,
		"components": componentsdata,
		"ie": 9743
	};
	var downloadJson = downloadJsondata;
	var themeJson = themeJsondata;
	//水印
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = canvas.height = 100;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.globalAlpha = 0.08;
	ctx.font = '20px Microsoft Yahei';
	ctx.translate(50, 50);
	ctx.rotate(-Math.PI / 4);
	option = {
		backgroundColor: {
			type: 'pattern',
			image: canvas,
			repeat: 'repeat'
		},
		tooltip: {},
		title: [{
			text: language.title[0],
			x: '25%',
			textAlign: 'center'
		}, {
			text: language.title[1],
			subtext: language.title[6] + Object.keys(downloadJson).reduce(function(all, key) {
				return all + downloadJson[key];
			}, 0),
			x: '75%',
			textAlign: 'center'
		}, {
			text: language.title[2],
			subtext: language.title[6] + Object.keys(themeJson).reduce(function(all, key) {
				return all + themeJson[key];
			}, 0),
			x: '75%',
			y: '50%',
			textAlign: 'center'
		}],
		grid: [{
			top: 50,
			width: '50%',
			bottom: '45%',
			left: 10,
			containLabel: true
		}, {
			top: '55%',
			width: '50%',
			bottom: 0,
			left: 10,
			containLabel: true
		}],
		xAxis: [{
			name: language.title[3],
			type: 'value',
//			max: 12,
			splitLine: {
				show: false
			}
		}, {
			name: language.title[4],
			type: 'value',
//			max: 12,
			gridIndex: 1,
			splitLine: {
				show: false
			}
		}],
		yAxis: [{
			name: language.title[5],
			type: 'category',
			data: Object.keys(builderJson.charts),
			axisLabel: {
				interval: 0,
				rotate: 30
			},
			splitLine: {
				show: false
			}
		}, {
			gridIndex: 1,
			type: 'category',
			data: Object.keys(builderJson.components),
			axisLabel: {
				interval: 0,
				rotate: 30
			},
			splitLine: {
				show: false
			}
		}],
		series: [{
			type: 'bar',
			stack: 'chart',
			z: 3,
			label: {
				normal: {
					position: 'right',
					show: true
				}
			},
			data: Object.keys(builderJson.charts).map(function(key) {
				return builderJson.charts[key];
			})
		}, {
			type: 'bar',
			stack: 'chart',
			silent: true,
			itemStyle: {
				normal: {
					color: '#eee'
				}
			},
			data: Object.keys(builderJson.charts).map(function(key) {
				return builderJson.all - builderJson.charts[key];
			})
		}, {
			type: 'bar',
			stack: 'component',
			xAxisIndex: 1,
			yAxisIndex: 1,
			z: 3,
			label: {
				normal: {
					position: 'right',
					show: true
				}
			},
			data: Object.keys(builderJson.components).map(function(key) {
				return builderJson.components[key];
			})
		}, {
			type: 'bar',
			stack: 'component',
			silent: true,
			xAxisIndex: 1,
			yAxisIndex: 1,
			itemStyle: {
				normal: {
					color: '#eee'
				}
			},
			data: Object.keys(builderJson.components).map(function(key) {
				return builderJson.all - builderJson.components[key];
			})
		}, {
			type: 'pie',
			radius: [0, '30%'],
			center: ['75%', '25%'],
			data: Object.keys(downloadJson).map(function(key) {
				return {
					name: key.replace('.js', ''),
					value: downloadJson[key]
				}
			})
		}, {
			type: 'pie',
			radius: [0, '30%'],
			center: ['75%', '75%'],
			data: Object.keys(themeJson).map(function(key) {
				return {
					name: key.replace('.js', ''),
					value: themeJson[key]
				}
			})
		}]
	}
	if (idx == 1) {
		echarts.init($("#shijian")[0]).setOption(option);
	} else if(idx ==2){
		echarts.init($("#shijianPK")[0]).setOption(option);
	}
	
}
//进失球方式
function fangshi(items,idx) {	//idx 1:自己队；2：pk对
	var fangshiArr = language.type;
	var jinqiuData = [];
	var shiqiuData = [];
	//进球方式
	for (var i = 0; i < items[idx][2].length; i++) {
		var jinObj = {};
		jinObj['value'] = items[idx][2][i];
		jinObj['name'] = fangshiArr[i];
		jinqiuData.push(jinObj);
	}
	//失球方式
	for (var j = 0; j < items[idx][3].length; j++) {
		var shiObj = {};
		shiObj['value'] = items[idx][3][j];
		shiObj['name'] = fangshiArr[j];
		shiqiuData.push(shiObj);
	}
	option = {
	    title : [{
		        text: language.fangshi[0],
		        x:'220'
		    },
		    {
		        text: language.fangshi[1],
		        right:'220'
		    }
		],
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        x : 'center',
	        y : 'bottom',
	        data:language.type
	    },
	    //下载用
	    /*toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {
	                show: true,
	                type: ['pie', 'funnel']
	            },
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },*/
	    calculable : true,
	    series : [
	        {
	            name:language.fangshi[0],
	            type:'pie',
	            radius : [30, 110],
	            center : ['25%', '50%'],
	            roseType : 'area',
	            data:jinqiuData
	        },
	        {
	            name:language.fangshi[1],
	            type:'pie',
	            radius : [30, 110],
	            center : ['75%', '50%'],
	            roseType : 'area',
	            data:shiqiuData
	        }
	    ]
	};
	if (idx == 1) {
		echarts.init($("#fangshi")[0]).setOption(option);
	} else if(idx ==2){
		echarts.init($("#fangshiPK")[0]).setOption(option);
	}
}