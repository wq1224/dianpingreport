$.getJSON("shops/getAllTypes").done(function( type_result ) {
    var pie_chart_option = {
        title : {
            text: 'Type of Restaurants',
            subtext: 'the type of the restaurants with more than one comment',
            x:'center'
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
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: type_result.data.map( x => {x["name"] = x.foodtype; return x}),
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
    if (pie_chart_option && typeof pie_chart_option === "object") {
        pie_chart.setOption(pie_chart_option, true);
    }
})