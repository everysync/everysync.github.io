define(['echarts','echarts/chart/map'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };

        function LvMap(container){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.getChartData(1);
            this.shapeList = null;
            this.tip_idx = 1;
        }
        iheritPrototype(LvMap, MyChart);
        LvMap.prototype._setOption = function(mydata){
            var self = this;
            var option = {
                animation:true,
                animationDuration:600,
                backgroundColor:"rgba(0,0,0,0)",
                tooltip : {
                    show:false,
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
                        var result = params[5].name+':'+params[5].value;
                        return result;
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
                        clickable:false,
                        roam: false,
                        data: [], 
                        geoCoord: {
                            india:[81.18,16.54],
                            southAmerica:[92.18,16.54]
                        },
                        markPoint: {
                            clickable:false,
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
        LvMap.prototype.showTip = function(currname){//显示提示框
            $.each(this.shapeList,function(k,v){
                if(v.name == currname){
                    $(".map_tips").animate({'top':v.pos.y-35+'px','left':v.pos.x+'px'}, 200, function() {
                        $(".map_tips").show();
                    });
                    $(".map_tips").html(v.name);
                    return false;
                }
            });
        };
        LvMap.prototype.dispose = function(){//显示提示框
            this.chart.dispose();
            $(".map_tips").hide();
        };
        LvMap.prototype.bindEvents = function () {//绑定相关事件
            var self = this;
            this.chart.on(lvChart.ecConfig.EVENT.CLICK, function(param){
                if(param.seriesIndex > 0){
                    $(".mapDataDetail").filter('[data-cname="'+param.name+'"]').trigger('click');//模拟右侧列表相应项被点击了
                }
            });
            self.shapeList = [];
            setTimeout(function(){//获取地图上标注点的坐标，延时执行时因为直接执行shapeList为空，与页面执行速度有问题
                $.each(self.chart._chartList[1].shapeList,function(k,v){
                    if(v.clickable){
                        self.shapeList.push({name:v._echartsData._name,pos:{x:v.style.x + v.position[0],y:v.style.y + v.position[1]}});
                    }
                });
                $(".mapDataDetail").eq(self.tip_idx).trigger('click');//模拟
            },200);
        };
        LvMap.prototype.getChartData = function(drawFlag){//获取数据
            var self = this;
            $.ajax({
                type: "get",
                url: "jsonpcallback/jsonpcallback.js",
                dataType: "jsonp",
                jsonpCallback:"mapListData"
            }).done(function(data) {
                self._setRightList(data.mapListData);
                self._setOption(data.mapListData);
                drawFlag&&self.resetOption();
            });
        };
        LvMap.prototype._setRightList = function(MapArry) {//设置右侧列表
            var self = this;
            $(".mapSideBot").on("flick.diswheel mousewheel.diswheel DOMMouseScroll.diswheel touchmove.diswheel", function(e) {
                e.stopPropagation();
                return false;
            });
            var page_1_content = $(".demopagec-1");
            var $mslistwrap    = $(".mslist");
            var liTempWrap     = $("<div>").attr("id","wpt");
            var liTemplate     = 
                    '<div class="mapDataDetail">'+
                    '   <h2 class="mdh2">'+
                    '       <span class="mdh2_1">标题:</span>'+
                    '       <span class="mdh2_2">标题名</span>'+
                    '   </h2>'+
                    '   <ul class="mdhlist">'+
                    '       <li class="mdhli">'+
                    '           <span class="mli_l">名字</span>'+
                    '           <span class="mli_r">数据</span>'+
                    '       </li>'+
                    '   </ul>'+
                    '</div>';
            var MapArrylength = MapArry.length;
            var $a = $(liTemplate);
            for (var i=0; i<MapArrylength; i++) {
                var $kt = $(liTemplate);
                var $ktlist = $kt.find(".mdhlist");
                $kt.find(".mdh2_1").html(MapArry[i]['listTitle']+":");
                $kt.find(".mdh2_2").html(MapArry[i]['listName']);
                $kt.attr('data-cname',MapArry[i]['listName']);
                $ktlist.html("");
                $.each(MapArry[i]['listdata'], function(i,d) {
                    $ktlist.append(
                        $("<li>").addClass("mdhli").html(
                            '<span class="mli_l">'+ d[0] +'</span>'+' <span class="mli_r">'+ d[1] +'</span>'
                        )
                    );
                });
                liTempWrap.append( $('<li class="msEachlist swiper-slide"></li>').append($kt) );
            }
            $mslistwrap.html( liTempWrap.html() );
                
            //init swiper
            var $swiperTarget = $(".mapSideBot");
            var page_1_swiper = $swiperTarget.swiper({
                mode:'vertical',
                initialSlide:1,
                slidesPerView:'auto',
                visibilityFullFit:true,
                mousewheelControl:true,
                calculateHeight:true,
                slidesPerViewFit:true,
                centeredSlides:true,
                onSlideClick:function(sw) {
                    page_1_swiper.swipeTo(page_1_swiper.clickedSlideIndex);
                    var $sides = $(page_1_swiper.clickedSlide);
                    $sides
                        .addClass("swiper-slide-click-active")
                        .siblings()
                        .removeClass("swiper-slide-click-active");
                    self.tip_idx = page_1_swiper.clickedSlideIndex;
                    self.showTip($sides.find(".mdh2_2").text());
                }
            });
            $swiperTarget.on("transitionend.swiper webkitTransitionEnd.swiper oTransitionEnd.swiper", function(e) {
                e.stopPropagation();
            });
            //clean
            $mslistwrap   =null;
            liTempWrap    =null;
            liTemplate    =null;
            MapArrylength =null;
            $a            =null;
        };
        return LvMap;
    }
);