//点击新增
$("#title p").click(function () {
	$("#title ul").append('<li><input class="name" type="text" value="" placeholder="name"/>:<input class="num" type="number" value="0" /><i title="删除">×</i></li>')
});
//删除
$("#title ul").on("click","li i",function () {
	$(this).parent().remove();
})

//点击提交生成
$("#title div").click(function () {
	var data = [];
	var datas = [];
	$(".name").each(function (idx) {
		if ($(this).val() !== "" && $(".num").eq(idx).val() !== "") {
			data.push({
				value:$(".num").eq(idx).val(),
				name:$(this).val()
			});
			datas.push({
				name:$(this).val(),
				icon:'circle'
			});
		}
	});
	if (data.length > 0) {
		$("#box").show();
		boxFn(data,datas);
	}else{
		layer.msg("你想提什么？",function () {
			
		})
	}
})
//数据项
/*var data= [
	{value:12,name:"中超"},
	{value:15,name:"中甲"}
];
var datas= [
    {name:"中超",icon:'circle'},
    {name:"中甲",icon:'circle'}
]
boxFn(data,datas);*/
function boxFn(data,datas){
    var lastoption = {
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c}<br/>{d}%"
        },
        legend: {
            orient: 'vertical',
            left: '80%',
            top:'middle',
            right:'10%',
            itemWidth:15,
            itemGap:10,
            data: datas,
            textStyle:{
            	fontSize:18
            }
        },
        series : [
            {
                type: 'pie',
                radius : '65%',
                center: ['35%', '50%'],
                right:20,
                data:data,
                label:{
                    normal:{
                    	textStyle:{
			            	fontSize:18
			            },
                        formatter:'{b}: {c}'
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    var last = echarts.init($('#box')[0]);
    last.setOption(lastoption);
}