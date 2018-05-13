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

function gen_html_code(items){
    html = ""
    for (i in items){
        html+="<div class='shop'>"
        html+="<h4>" + items[i].shopname + "</h4>"
        // html+="<p>type: " + trans[items[i].foodtype] + "</p>"
        // html+="<p>level: " + items[i].level + "</p>"
        // html+="<p>comment number: " + items[i].commentnum + "</p>"
        // html+="<p>average: " + items[i].avgcost + "</p>" 
        html+="</div>"
    }
    return html
}

var common_option = {
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
            //data: result,
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
        },
        {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            //data: result,
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
                    color: '#dd6e26'
                }
            }
        }
    ]
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

    var map_chart_option = _.cloneDeep(common_option)
    map_chart_option.title["text"] = "Restaurant Location"
    map_chart_option.title["subtext"] = "data from dianping"
    map_chart_option.series[0]["data"] = result

    if (map_chart_option && typeof map_chart_option === "object") {
        map_chart.setOption(map_chart_option, false);
    }

    //-------------------------------------------------

    function filter_work_lunch_1(item) {
        return item.foodtype == "小吃快餐" && item.isVendor == 1
    }

    function filter_work_lunch_2(item) {
        return item.foodtype != "小吃快餐" && item.isVendor == 1 && item.label.indexOf("工作餐") != -1
    }

    work_lunch1 = result.filter(filter_work_lunch_1)
    work_lunch2 = result.filter(filter_work_lunch_2)
    
    $("#work_lunch_list").html(gen_html_code(work_lunch1))

    var map_work_lunch_option = _.cloneDeep(common_option)
    map_work_lunch_option.series[0]["data"] = work_lunch1
    map_work_lunch_option.series[1]["data"] = work_lunch2

    if (map_work_lunch_option && typeof map_work_lunch_option === "object") {
        map_work_lunch.setOption(map_work_lunch_option, false);
    }

    //------------------------------------------------
});