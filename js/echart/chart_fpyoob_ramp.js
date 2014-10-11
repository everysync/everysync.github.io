define(['echarts','echarts/chart/line'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };
        function LvFpyOobRamp(container,chartType){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.chartType = chartType;
            this.getChartData(0);
        }
        iheritPrototype(LvFpyOobRamp, MyChart);
        LvFpyOobRamp.prototype._setOptionLine1 = function(mydata){
            var option = {
                color:["#fff"],
                title : {
                    text: '',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{
                        type : 'line',
                        lineStyle : {
                          color: '#fff',
                          width: 2,
                          type: 'solid'
                        },
                        crossStyle : {
                          color: '#fff',
                          width: 2,
                          type: 'solid'
                        }
                    }
                },
                legend: {
                    y:-300,
                    data:['成交']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                animation: false,
                calculable : false,
                grid : {
                    'x':70,
                    'x2':0,
                    'y':150,
                    'y2':70,
                    borderWidth:0
                },
                xAxis : [
                    {
                        'type':'category',
                        boundaryGap : false,
                        'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'splitLine':{show : false},
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        min:0,
                        max:100,
                        'type':'value',
                        'splitLine':{show : false},
                        'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                        'nameTextStyle':{color: '#E2F3F6'}
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        'smooth':true,
                        'symbol':'none',
                        itemStyle: {normal: {areaStyle: {
                                // 区域图，纵向渐变填充
                                color : (function (){
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, 200, 0, 400,
                                        [[0, 'rgba(255,255,255,0.2)'],[0.8, 'rgba(255,255,255,0.1)']]
                                    )
                                })()
                            }}},
                        data:[10, 12, 21, 30, 35, 33, 30]
                    }
                ]
            };    
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvFpyOobRamp.prototype._setOptionLine2 = function(mydata){
            var option = {
                color:["#fff"],
                title : {
                    text: '',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{
                        type : 'line',
                        lineStyle : {
                          color: '#fff',
                          width: 2,
                          type: 'solid'
                        },
                        crossStyle : {
                          color: '#fff',
                          width: 2,
                          type: 'solid'
                        }
                    }
                },
                legend: {
                    y:-300,
                    data:['成交']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                animation: false,
                calculable : false,
                grid : {
                    'x':0,
                    'x2':0,
                    'y':150,
                    'y2':70,
                    borderWidth:0
                },
                xAxis : [
                    {
                        'type':'category',
                        boundaryGap : false,
                        'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'splitLine':{show : false},
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        min:0,
                        max:100,
                        'type':'value',
                        'splitLine':{show : false},
                        'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                        'nameTextStyle':{color: '#E2F3F6'}
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        'smooth':true,
                        'symbol':'none',
                        itemStyle: {normal: {areaStyle: {
                                // 区域图，纵向渐变填充
                                color : (function (){
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, 200, 0, 400,
                                        [[0, 'rgba(255,255,255,0.2)'],[0.8, 'rgba(255,255,255,0.1)']]
                                    )
                                })()
                            }}},
                        data:[30, 29, 34, 40, 45, 50,46]
                    }
                ]
            };  
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvFpyOobRamp.prototype._setOptionLine3 = function(mydata){
            var option = {
                color:["#fff"],
                title : {
                    text: '',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer:{
                        type : 'line',
                        lineStyle : {
                          color: '#fff',
                          width: 2,
                          type: 'solid'
                        },
                        crossStyle : {
                          color: '#fff',
                          width: 2,
                          type: 'solid'
                        }
                    }
                },
                legend: {
                    y:-300,
                    data:['成交']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                animation: false,
                calculable : false,
                grid : {
                    'x':0,
                    'x2':0,
                    'y':150,
                    'y2':70,
                    borderWidth:0
                },
                xAxis : [
                    {
                        'type':'category',
                        boundaryGap : false,
                        'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'splitLine':{show : false},
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        min:0,
                        max:100,
                        'type':'value',
                        'splitLine':{show : false},
                        'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                        'nameTextStyle':{color: '#E2F3F6'}
                    }
                ],
                series : [
                    {
                        name:'成交',
                        type:'line',
                        'smooth':true,
                        'symbol':'none',
                        itemStyle: {normal: {areaStyle: {
                                // 区域图，纵向渐变填充
                                color : (function (){
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, 200, 0, 400,
                                        [[0, 'rgba(255,255,255,0.2)'],[0.8, 'rgba(255,255,255,0.1)']]
                                    )
                                })()
                            }}},
                        data:[46, 43, 38, 34, 39, 42, 48]
                    }
                ]
            };  
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvFpyOobRamp.prototype.getChartData = function(drawFlag){
            switch(this.chartType){
                case "line1":
                    this.getChartDataLine1(drawFlag);break;
                case "line2":
                    this.getChartDataLine2(drawFlag);break;
                case "line3":
                    this.getChartDataLine3(drawFlag);break;
                default:break;
            }
        };
        LvFpyOobRamp.prototype.getChartDataLine1 = function(drawFlag){
            var self = this;
            var mydata = {
              axisLineData:[20,30,40,50,60,70,80],
              data:[{value: 58, name: '仪表盘'}]
            };
            self._setOptionLine1(mydata);
            drawFlag&&self.resetOption();
        };
        LvFpyOobRamp.prototype.getChartDataLine2 = function(drawFlag){
            var self = this;
            var mydata = {
              axisLineData:[20,30,40,50,60,70,80],
              data:[{value: 58, name: '仪表盘'}]
            };
            self._setOptionLine2(mydata);
            drawFlag&&self.resetOption();
        };
        LvFpyOobRamp.prototype.getChartDataLine3 = function(drawFlag){
            var self = this;
            var mydata = {
              axisLineData:[20,30,40,50,60,70,80],
              data:[{value: 58, name: '仪表盘'}]
            };
            self._setOptionLine3(mydata);
            drawFlag&&self.resetOption();
        };
        return LvFpyOobRamp;
    }
);
                    