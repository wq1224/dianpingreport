$.getJSON("shops/getAllTypes").done(function( type_result ) {
    // type_result.data.sort(function(a,b){
    //     return a.value > b.value;
    // });
    var pie_chart_option = {
        color: ['#ff9340','#FFB073', '#BF8E30', '#A66D00', '#FF6F00','#FFA700',  '#BF6E30', '#A64800','#FFBD40', '#FFCF73', '#FD3F49',"#FD7279","#BC2F36","#A30008"],
        title : {
            text: 'Restaurant Types',
            subtext: 'the type of the restaurants with more than one comment',
            x:'center',
            textStyle: {
                color: '#f63',
                fontSize: 40
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: type_result.data.map( x => x.foodtype)
        },
        series : [
            {
                name: 'type',
                type: 'pie',
                radius : ['50%', '70%'],
                //center: ['50%', '60%'],
                data: type_result.data.map( x => {x["name"] = x.foodtype; return x}),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                }
            }
        ]
    };
    if (pie_chart_option && typeof pie_chart_option === "object") {
        pie_chart.setOption(pie_chart_option, true);
    }
})