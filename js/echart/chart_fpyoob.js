define(['echarts','echarts/chart/line','echarts/chart/bar'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };
        function LvFpyOob(container){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.getChartData(0);
        }
        iheritPrototype(LvFpyOob, MyChart);
        LvFpyOob.prototype._setOptionTimeLine = function(mydata){
            var option = {
                timeline:{
                    y2:30,
                    data:['1','2','3','4','5','6', '7','8','9','10','11','12'], 
                    label : {
                        'interval':0,
                        textStyle: {
                            color: '#E2F3F6'
                        },
                        formatter : function(s) {
                            var month = ['', 'Jay.','Feb.','Mar.','Apr.','May.','Jun.', 'Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'];
                            return month[s];
                        }
                    },
                    symbol:'emptyCircle',
                    lineStyle:{color: '#E2F3F6', width: 1, type: 'solid'},
                    checkpointStyle:{
                        borderColor : '#076377',
                        borderWidth : 1
                    },
                    controlStyle:{
                        normal : { color : '#E2F3F6'},
                        emphasis : { color : '#E2F3F6'}
                    },  
                    autoPlay : false,
                    playInterval : 3000
                },
                options:[
                    {
                        title : {
                            'text':'',
                            x:40,
                            y:20,
                            textStyle:{
                                fontSize: 24, 
                                fontWeight: 'normal',
                                color: '#fff'
                            }
                        },
                        tooltip : {'trigger':'axis'},
                        color:['#B7E1EA','#FFF100','#E2F3F6','#E2F3F6'],
                        legend : {
                            x:'right',
                            y:100,
                            padding:25,
                            itemGap:25,
                            textStyle:{color: '#B7E1EA',fontSize:14},
                            'data':mydata.legend
                        },
                        toolbox : {
                            'show':false, 
                            orient : 'vertical',
                            x: 'right', 
                            y: 'center',
                            'feature':{
                                'mark':{'show':true},
                                'dataView':{'show':true,'readOnly':false},
                                'magicType':{'show':true,'type':['line','bar','stack','tiled']},
                                'restore':{'show':true},
                                'saveAsImage':{'show':true}
                            }
                        },
                        calculable : false,
                        animation:true,
                        animationDuration:600,
                        grid : {
                            'x':70,
                            'y':150,
                            'x2':70,
                            'y2':130,
                            borderWidth:0
                        },
                        xAxis : [{
                            'type':'category',
                            'axisLabel':{'interval':0,'rotate':-45,'textStyle':{color: '#E2F3F6'}},
                            'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                            'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                            'splitLine':{show : false},
                            'data':mydata.xAxis
                        }],
                        yAxis : [
                            {
                                'type':'value',
                                'splitLine':{show : false},
                                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                                'name':'FPY（%）',
                                'nameTextStyle':{color: '#E2F3F6'}
                            },
                            {
                                'type':'value',
                                'splitLine':{show : false},
                                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                                'name':'OOB（%）',
                                'nameTextStyle':{color: '#E2F3F6'}
                            }
                        ],
                        series : [
                            {
                                'name':'FPY',
                                'type':'bar',
                                'barCategoryGap':'40%',
                                'data': mydata.series_bar_1.data[0]
                            }, 
                            {
                                'name':'OOB',
                                'yAxisIndex':1,
                                'type':'line',
                                'smooth':true,
                                'symbol':'none',
                                'itemStyle': {
                                    'normal': {
                                        lineStyle: { // 系列级个性化折线样式
                                            width: 4
                                        }
                                    }
                                },
                                'data': mydata.series_line_1.data[0]
                            },
                            {
                                'name':'FPY Target',
                                'type':'line',
                                'yAxisIndex':0,
                                'symbol':'none',
                                'data': []
                            },
                            {
                                'name':'OOB Target',
                                'type':'line',
                                'symbol':'none',
                                'yAxisIndex':1,
                                'itemStyle': {
                                    'normal': {
                                        lineStyle: { // 系列级个性化折线样式
                                            type:'dotted'
                                        } 
                                    }
                                },
                                'data': []
                            }
                        ]
                    }
                ]
            };
            for (var i = 1; i < 12; i++) {
                option.options.push({
                    series : [
                        {'data': mydata.series_bar_1.data[i]},
                        {'data': mydata.series_line_1.data[i]}
                    ]
                })
            };
            var target1 = [],
                target2 = [];
            for (var i = 0; i < mydata.xAxis.length; i++) {
                target1.push(mydata.series_bar_target);
                target2.push(mydata.series_line_target);
            }
            option.options[0].series[2].data = target1;
            option.options[0].series[3].data = target2;  
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvFpyOob.prototype.getChartData = function(drawFlag){
            var self = this;
            var mydata = {
              legend:['FPY','OOB','FPY Target','OOB Target'],
              xAxis:['TNID', 'CKSN', 'CKSD', 'WZSD', 'QSJD', 'BLDN', 'BJPD','SHPN', 'SHPD', 'HYPD', 'CDPD', 'WKSN', 'LCFC', 'PEGN','CCDN', 'WCDN', 'IUTN', 'INNB', 'WRGN', 'ITUD', 'BLDD'],
              series_bar_1:{name:'FPY',data:[]},
              series_line_1:{name:'OOB',data:[]},
              series_bar_target:25,
              series_line_target:30
            };
            for (var i = 12; i >= 0; i--) {
                var newBarArr = [],
                    newLineArr = [];
                for (var j = mydata.xAxis.length; j >= 0; j--) {
                    newBarArr.push(Math.floor(Math.random()*100));
                    newLineArr.push(Math.floor(Math.random()*100));
                };
                mydata.series_bar_1.data.push(newBarArr);
                mydata.series_line_1.data.push(newLineArr);
            };
            self._setOptionTimeLine(mydata);
            drawFlag&&self.resetOption();
        };
        return LvFpyOob;
    }
);
     