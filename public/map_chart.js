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

var order_number = 12

function gen_html_code(items){
    html = ""
    for (i in items){
        html+="<div class='shop'>"
        seq = parseInt(i) + 1
        html+="<h4>" + seq + ". " + items[i].shopname + "</h4>"
        html+="<p><span>score: " + items[i].level + "</span>"
        html+="<span>comment number: " + items[i].commentnum + "</span>"
        html+="<span>average: " + items[i].avgcost + "</span>" 
        html+="<span>type: " + trans[items[i].foodtype] + "</span></p>"
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
        trigger: 'item',
        formatter: '{b}'
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
        return (item.foodtype == "小吃快餐") && item.isVendor == 1
    }

    function filter_work_lunch_2(item) {
        return item.foodtype != "小吃快餐" && item.isVendor == 1 && item.label.indexOf("工作餐") != -1
    }

    work_lunch1 = result.filter(filter_work_lunch_1).slice(0,order_number)
    work_lunch2 = result.filter(filter_work_lunch_2)
    
    $("#work_lunch_list").html(gen_html_code(work_lunch1))

    var map_work_lunch_option = _.cloneDeep(common_option)
    map_work_lunch_option.series[0]["data"] = work_lunch1
    map_work_lunch_option.series[0].label.normal.show = true

    if (map_work_lunch_option && typeof map_work_lunch_option === "object") {
        map_work_lunch.setOption(map_work_lunch_option, false);
    }

    //------------------------------------------------

    function filter_formal(item) {
        return item.avgcost >= 100 && item.label.indexOf("请客") != -1 && ["粤菜","本帮江浙菜","川菜","湘菜","其他美食"].includes(item.foodtype)
        
    }

    formal = result.filter(filter_formal).slice(0,order_number)
    
    $("#formal_list").html(gen_html_code(formal))

    var map_formal_option = _.cloneDeep(common_option)
    map_formal_option.series[0]["data"] = formal
    map_formal_option.series[0].label.normal.show = true

    if (map_formal_option && typeof map_formal_option === "object") {
        map_formal.setOption(map_formal_option, false);
    }

    //------------------------------------------------

    // function filter_informal(item) {
    //     return item.label.indexOf("请客") != -1 && ["粤菜","本帮江浙菜","川菜","湘菜","云南菜","其他美食"].includes(item.foodtype)
    // }

    //informal = result.filter(filter_informal)
    informal = result.slice(0,order_number)
    $("#informal_list").html(gen_html_code(informal))

    var map_informal_option = _.cloneDeep(common_option)
    map_informal_option.series[0]["data"] = informal
    map_informal_option.series[0].label.normal.show = true

    if (map_informal_option && typeof map_informal_option === "object") {
        map_informal.setOption(map_informal_option, false);
    }

    //------------------------------------------------
    function filter_date(item) {
        return item.avgcost >= 80 && ["粤菜","西餐","日本菜","东南亚菜"].includes(item.foodtype)
    }

    date = result.filter(filter_date).slice(0,order_number)
    
    $("#date_list").html(gen_html_code(date))

    var map_date_option = _.cloneDeep(common_option)
    map_date_option.series[0]["data"] = date
    map_date_option.series[0].label.normal.show = true

    if (map_date_option && typeof map_date_option === "object") {
        map_date.setOption(map_date_option, false);
    }

});