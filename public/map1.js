var data = [
    {name: '瓷忆瓷文化餐厅(长泰广场店)', value: 100},
    {name: '晋家门(长泰店)', value: 100},
    {name: '左庭右院鲜牛肉火锅(汇智广场店)', value: 100}
];

var geoCoordMap = {
    '瓷忆瓷文化餐厅(长泰广场店)':[121.60095,31.20549],
    '晋家门(长泰店)':[121.602249,31.20546],
    '左庭右院鲜牛肉火锅(汇智广场店)':[121.60077997167168,31.203610779656316]
};

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
    
    console.log("bd_lat:"+bd_lat);
    console.log("bd_lon:"+bd_lon);
    return [bd_lon,bd_lat];
}
     
/**
 * 坐标转换，百度地图坐标转换成腾讯地图坐标
 * @param lat  百度坐标纬度
 * @param lon  百度坐标经度
 * @return 返回结果：纬度,经度
 */
/*public String map_bd2tx(double lat, double lon){
    double tx_lat;
    double tx_lon;
    double x_pi=3.14159265358979324;
    double x = lon - 0.0065, y = lat - 0.006;
    double z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    double theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    tx_lon = z * Math.cos(theta);
    tx_lat = z * Math.sin(theta);
    return tx_lat+","+tx_lon;
}*/

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = map_tx2bd(geoCoordMap[data[i].name]);
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

var map_chart_option = {
    //backgroundColor: '#404a59',
    title: {
        text: '全国主要城市空气质量',
        subtext: 'data from PM25.in',
        sublink: 'http://www.pm25.in',
        left: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
        center: [121.60740914992547,31.21160077420344],
        type: 'map',
        zoom: 18,
        roam: false
    },
    series : [
        {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            // symbolSize: function (val) {
            //     return val[2] / 10;
            // },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                }
            }
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#f4e925',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};