/**
 * 坐标转换，腾讯地图转换成百度地图坐标
 * @param lat 腾讯纬度
 * @param lon 腾讯经度
 * @return 返回结果：经度,纬度
 */
function map_tx2bd(seat){
    var x_pi=3.14159265358979324;
    var x = seat[0], y = seat[1];
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    
    //console.log("bd_lat:"+bd_lat);
    //console.log("bd_lon:"+bd_lon);
    return [bd_lon,bd_lat];
};



$.getJSON("shops/getAllShops").done(function( shop_result ) {
    result = shop_result.data
    max = result[0].level*result[0].commentnum
    min = result[result.length-1].level*result[result.length-1].commentnum
    temp = max - min
    result.forEach(data_change)
    function data_change(item,index,arr) {
        item["name"]  = item.shopname;
        item["value"] = map_tx2bd(item.poi.split(',').reverse())
        pri = item.level*item.commentnum
        nor = (pri - min)/temp
        item["value"].push(nor);
    }

    // var map_chart_option = _.cloneDeep(common_option)
    // map_chart_option.title["text"] = "Restaurant Location"
    // map_chart_option.title["subtext"] = "data from dianping"
    // map_chart_option.series["data"] = result

var map_chart_option = {
    backgroundColor: 'rgba(64, 74, 89,0.7)',
    title: {
        //text: 'Restaurant Location',
        //subtext: 'data from dianping',
        left: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 40
        }
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
        center: map_tx2bd([121.600989,31.204269]),
        type: 'map',
        zoom: 17.5,
        roam: false
    },
    series : [
        {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: result,
            // symbolSize: function (val) {
            //     return val[2]*50;
            // },
            showEffectOn: 'emphasis',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
        }
    ]
};
    if (map_chart_option && typeof map_chart_option === "object") {
        map_chart.setOption(map_chart_option, true);
    }

    // var map_work_lunch_option = _.cloneDeep(common_option)
    // map_work_lunch_option.title["text"] = "Working Lunch"
    // map_work_lunch_option.title["subtext"] = "data from dianping"
    // map_work_lunch_option.series["data"] = result
    // map_work_lunch_option.series["symbolSize"] = function (val) {
    //     return val[2]*50;
    // }

    // if (map_work_lunch_option && typeof map_work_lunch_option === "object") {
    //     map_work_lunch.setOption(map_work_lunch_option, true);
    // }
});