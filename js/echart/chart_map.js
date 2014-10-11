define(['echarts','echarts/chart/map'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };
        function LvMap(container){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.getChartData(1);
        }
        iheritPrototype(LvMap, MyChart);
        LvMap.prototype.tipCallback = function(){
            console.log(444);
        }
        LvMap.prototype._setOption = function(mydata){
            var self = this;
            var option = {
                animation:true,
                animationDuration:600,
                backgroundColor:"rgba(0,0,0,0)",
                tooltip : {
                    trigger: 'item',
                    backgroundColor:'#00FFB7',
                    borderRadius: 3,
                    textStyle:{ color:'#007F59' },
                    //backgroundColor:"rgba(0,0,0,0)",
                    showDelay:'300',
                    position : function(p) {
                        // 位置回调
                        //console.log && console.log(p);
                        //$(".map_tips").animate({'top':p[1]-20+'px','left':p[0]-50+'px'}, 200);
                        //$("#tip_l").css({'top':p[1]+'px','left':p[0]-50+'px'});
                        return [p[0]-50, p[1]-20];
                    },
                    //{Function}，传递参数列表如下：
                    //<Array> params : 数组内容同模板变量，[[a, b, c, d], [a1, b1, c1, d1], ...]
                    //<String> ticket : 异步回调标识
                    //<Function> callback : 异步回调，回调时需要两个参数，第一个为前面提到的ticket，第二个为填充内容html
                    formatter:function(params,ticket,callback){
                        //console.log(callback);
                        //$(".map_tips").html(params[5].name+':'+params[5].value);
                        var result = params[1][1]+'<br[5]>';
                        self.tipCallback();
                        return ticket;
                    }
                },
                // roamController: {
                //     show: false,
                //     x: 'right',
                //     mapTypeControl: {
                //         'china': true
                //     }
                // },
                series: [
                    {
                        tooltip : {
                            show:false
                        },
                        name: 'Top',
                        type: 'map',
                        mapType: 'china',
                        itemStyle:{
                            normal:{
                                borderColor:'rgba(46, 67, 79,1)',
                                borderWidth:1.5,
                                areaStyle:{
                                    color: 'rgba(161, 199, 212,1)'
                                }
                            }
                        },
                        mapLocation: {
                            x:'center',
                            //x: '5%',
                            y: 'center',
                            width: '90%',
                            height: '80%'
                        },
                        selectedMode: null,
                        hoverable: false,
                        roam: false,
                        data: [{name: '北京', selected: false }, {name: '天津', selected: false }, {name: '上海', selected: false }, {name: '重庆', selected: false }, {name: '河北', selected: false }, {name: '河南', selected: false }, {name: '云南', selected: false }, {name: '辽宁', selected: false }, {name: '黑龙江', selected: false }, {name: '湖南', selected: false }, {name: '安徽', selected: false }, {name: '山东', selected: false }, {name: '新疆', selected: false }, {name: '江苏', selected: false }, {name: '浙江', selected: false }, {name: '江西', selected: false }, {name: '湖北', selected: false }, {name: '广西', selected: false }, {name: '甘肃', selected: false }, {name: '山西', selected: false }, {name: '内蒙古', selected: false }, {name: '陕西', selected: false }, {name: '吉林', selected: false }, {name: '福建', selected: false }, {name: '贵州', selected: false }, {name: '广东', selected: false }, {name: '青海', selected: false }, {name: '西藏', selected: false }, {name: '四川', selected: false }, {name: '宁夏', selected: false }, {name: '海南', selected: false }, {name: '台湾', selected: false }, {name: '香港', selected: false }, {name: '澳门', selected: false }], 
                        geoCoord: {
                            india:[81.18,16.54],
                            southAmerica:[92.18,16.54]
                        },
                        markPoint: {
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    color:"#000",
                                    areaStyle:{},
                                    label: {
                                        show: false,
                                        position: 'outer'
                                    },
                                    labelLine: {
                                        show: false,
                                        lineStyle: {
                                            color: 'red'
                                        }
                                    }
                                }
                            },
                            data: [
                                {
                                    geoCoord : [81.18,16.54],
                                    name:'india',
                                    value: 'india',
                                    symbolSize: 40,
                                    symbol: 'image://images/india.png'
                                },
                                {
                                    geoCoord : [92.18,16.54],
                                    value: 'southAmerica',
                                    name:'southAmerica',
                                    symbolSize: 40,
                                    symbol: 'image://images/southAmerica.png'
                                }
                            ]
                        }
                    }, {
                        hoverable: false,
                        name: 'city',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        geoCoord: {
                        },
                        mapLocation: {
                            x: 'center',
                            //X: '5%',
                            y: 'center',
                            width: '90%',
                            height: '80%'
                        },
                        data: [],
                        markPoint: {
                            symbol: 'circle',
                            symbolSize: 6,
                            data: []
                        }
                    }
                ]      
            };
            var itemStyle = {};
            itemStyle.s1 = {
                normal: {
                    borderWidth: 2,
                    color: 'rgba(231,43,14,1)',
                    borderColor: 'rgba(255,255,255,1)',
                    label: { show: false, formatter:' '}
                }
            };
            itemStyle.s2 = {
                normal: {
                    borderWidth: 2,
                    color: 'rgba(255, 233, 0,1)',
                    borderColor: 'rgba(255, 149, 79,1)',
                    label: { show: false, formatter:' '}
                }
            };
            itemStyle.s3 = {
                normal: {
                    borderWidth: 2,
                    color: 'rgba(0, 251, 174,1)',
                    borderColor: 'rgba(255,255,255,1)',
                    label: { show: false, formatter:' '}
                }
            };
            var geoCoord = {},
                dataMark = [];
            for (var i = 0; i < mydata.length; i++) {
                var v = mydata[i];
                geoCoord[v['listName']] = v['geo'];
                dataMark.push({name: v['listName'], value: v['valu'], itemStyle: itemStyle[v.color]});
            }
            option.series[0].geoCoord = geoCoord;
            option.series[1].markPoint.data = dataMark;
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvMap.prototype.bindEvents = function () {
            this.chart.on(lvChart.ecConfig.EVENT.CLICK, function(param){
                if(param.seriesIndex > 0){
                    alert(param.name);
                }
            });
            console.log(this.chart);
            this.chart.component.tooltip.showTip({seriesIndex: "1", seriesName:'city', name:'Wistron_CD_NB'});
        };
        LvMap.prototype.getChartData = function(drawFlag){
            var self = this;
            $.ajax({
                type: "get",
                url: "jsonpcallback/jsonpcallback.js",
                dataType: "jsonp",
                jsonpCallback:"mapListData"
            }).done(function(data) {
                self._setOption(data.mapListData);
                drawFlag&&self.resetOption();
            });
        };

        return LvMap;
    }
);