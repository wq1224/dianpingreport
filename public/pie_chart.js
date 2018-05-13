var trans = {
    '其他美食':'other',
    '台湾菜':'Taiwan Cuisine',
    '日本菜':'Japanese Food',
    '粤菜':'Cantonese Cuisine',
    '本帮江浙菜':'Shanghai Local Cuisine',
    '蟹宴':'Crab Dish',
    '海鲜':'Seafood',
    '西北菜':'Northwest Cuisine',
    '小吃快餐':'Snack, Fast Food',
    '韩国料理':'Korean Food',
    '西餐':'Western-style Food',
    '咖啡厅':'Cafe',
    '面包甜点':'Bread, Dessert',
    '东南亚菜':'Southeast Asian cuisine',
    '川菜':'Sichuan Cuisine',
    '湘菜':'Hunan Cuisine',
    '烧烤':'BBQ',
    '火锅':'Hotpot',
    '素菜':'Vegetable Dish',
    '云南菜':'Yunnan Cuisine',
    '自助餐':'Buffet',
    '小龙虾':'Crayfish'
};
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
            data: type_result.data.map( x => trans[x.foodtype])
        },
        series : [
            {
                name: 'type',
                type: 'pie',
                radius : ['50%', '70%'],
                //center: ['50%', '60%'],
                data: type_result.data.map( x => {x["name"] = trans[x.foodtype]; return x}),
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