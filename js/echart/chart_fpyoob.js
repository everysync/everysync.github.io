define(['echarts','echarts/chart/line','echarts/chart/bar'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };
        function LvFpyOob(container,chartType){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.chartType = chartType;
            this.factoryName = 'LENOVO';
            this.fbyType = 0;
            this.letter = 'A';
            this.chartMp = 0;
            this.chartData = null;
            this.getChartData(0);
        }
        iheritPrototype(LvFpyOob, MyChart);
        LvFpyOob.prototype.getChartData = function(drawFlag){
            switch(this.chartType){
                case "timeLine":
                    this.getChartDataTimeLine(drawFlag); break;
                case "timeLine_2":
                    this.getChartDataTimeLine_2(drawFlag); break;
                case "line":
                    this.getChartDataLine(drawFlag); break;
                default:break;
            }
        };
        LvFpyOob.prototype.bindEvents = function () {//绑定相关事件
            var self = this;
            switch(this.chartType){
                case "timeLine":
                    this.chart.on(lvChart.ecConfig.EVENT.CLICK, function(param){
                        page_modules.loadinto("moduleHtml/FPY_OOB_In.html", ".eachBlck" ,"demopagec-2-2","fpyoob_in");
                    }); 
                    break;
                default:break;
            }
        };
        LvFpyOob.prototype._setOptionTimeLine = function(mydata){
            var option = {
                color: ["rgba(64,241,248,1)", 'rgba(64,241,248,0.5)'],
                timeline:{
                    y2:30,
                    data:['1','2','3','4','5','6', '7','8','9','10','11','12'], 
                    label : {
                        'interval':0,
                        textStyle: {
                            color: 'rgba(255,255,255,0.65)'
                        },
                        formatter : function(s) {
                            var month = ['', 'Jay.','Feb.','Mar.','Apr.','May.','Jun.', 'Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'];
                            return month[s];
                        }
                    },
                    symbol:'emptyCircle',
                    lineStyle:{color: 'rgba(255,255,255,0.7)', width: 1, type: 'solid'},
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
                        tooltip : {'trigger':'axis','axisPointer':{'type':'none'}},
                        color:["rgba(64,241,248,1)",'rgba(255, 241, 0, 1)','rgba(255,255,252,0.7)','rgba(255, 241, 0, 0.7)'],
                        legend : {
                            x:'right',
                            y:120,
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
                            'y':180,
                            'x2':70,
                            'y2':130,
                            borderWidth:0
                        },
                        xAxis : [{
                            'type':'category',
                            'axisLabel':{'interval':0,'rotate':-45,'textStyle':{color: 'rgba(255,255,255,0.65)'}},
                            'axisLine':{show : false,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                            'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                            'splitLine':{show : false},
                            'data':mydata.xAxis
                        }],
                        yAxis : [
                            {
                                'type':'value',
                                'min':85,
                                'max':100,
                                'splitLine':{show : false},
                                'axisTick':{show : true,inside:true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLabel':{'textStyle':{color: 'rgba(255,255,255,0.65)'}},
                                'name':'FPY（%）',
                                'nameTextStyle':{color: '#E2F3F6'}
                            },
                            {
                                'type':'value',
                                'min':0,
                                'max':3,
                                'splitLine':{show : false},
                                'axisTick':{show : true,inside:true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLabel':{'textStyle':{color: 'rgba(255,255,255,0.65)'}},
                                'name':'OOB（%）',
                                'nameTextStyle':{color: '#E2F3F6'}
                            }
                        ],
                        series : [
                            {
                                'name':'FPY',
                                'type':'bar',
                                'barCategoryGap':'40%',
                                'data': []
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
                                            width: 2
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
            for(var i=0,len=mydata.series_bar_1.data[0].length; i<len; i++){
                if(mydata.series_bar_1.data[0][i] > mydata.series_bar_target){
                    option.options[0].series[0].data.push({
                            value: mydata.series_bar_1.data[0][i],
                            itemStyle : { 
                                normal: {
                                    color:option.color[1]
                                }
                            }
                        });
                }else{
                    option.options[0].series[0].data.push({
                        value: mydata.series_bar_1.data[0][i],
                        itemStyle : { 
                            normal: {
                                color:option.color[0]
                            }
                        }
                    });
                }
            }
            for (var i = 1; i < 12; i++) {
                for(var j=0,len=mydata.series_bar_1.data[i].length; j<len; j++){
                    if(mydata.series_bar_1.data[i][j] > mydata.series_bar_target){
                        mydata.series_bar_1.data[i][j]={
                                value: mydata.series_bar_1.data[i][j],
                                itemStyle : { 
                                    normal: {
                                        color:option.color[1]
                                    }
                                }
                            };
                    }else{
                        mydata.series_bar_1.data[i][j]={
                            value: mydata.series_bar_1.data[i][j],
                            itemStyle : { 
                                normal: {
                                    color:option.color[0]
                                }
                            }
                        };
                    }
                }
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
            option = null;
        };
        LvFpyOob.prototype.getChartDataTimeLine = function(drawFlag){
            var self = this;
            var mydata = {
              legend:['FPY','OOB','FPY Target','OOB Target'],
              xAxis:['TNID', 'CKSN', 'CKSD', 'WZSD', 'QSJD', 'BLDN', 'BJPD','SHPN', 'SHPD', 'HYPD', 'CDPD', 'WKSN', 'LCFC', 'PEGN','CCDN', 'WCDN', 'IUTN', 'INNB', 'WRGN', 'ITUD', 'BLDD'],
              series_bar_1:{name:'FPY',data:[]},
              series_line_1:{name:'OOB',data:[]},
              series_bar_target:92,
              series_line_target:1.5
            };
            for (var i = 12; i >= 0; i--) {
                var newBarArr = [],
                    newLineArr = [];
                for (var j = mydata.xAxis.length; j >= 0; j--) {
                    newBarArr.push(85+Math.floor(Math.random()*15));
                    newLineArr.push(Math.floor(Math.random()*3));
                };
                mydata.series_bar_1.data.push(newBarArr);
                mydata.series_line_1.data.push(newLineArr);
            };
            self._setOptionTimeLine(mydata);
            drawFlag&&self.resetOption();
        };

        //_setOptionTimeLine_2
        LvFpyOob.prototype._setOptionTimeLine_2 = function(mydata){
            var option = {
                color: ["rgba(64,241,248,1)", 'rgba(64,241,248,0.5)'],
                timeline:{
                    y2:30,
                    data:['1','2','3','4','5','6', '7','8','9','10','11','12'], 
                    label : {
                        'interval':0,
                        textStyle: {
                            color: 'rgba(255,255,255,0.65)'
                        },
                        formatter : function(s) {
                            var month = ['', 'Jay.','Feb.','Mar.','Apr.','May.','Jun.', 'Jul.','Aug.','Sept.','Oct.','Nov.','Dec.'];
                            return month[s];
                        }
                    },
                    symbol:'emptyCircle',
                    lineStyle:{color: 'rgba(255,255,255,0.7)', width: 1, type: 'solid'},
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
                        tooltip : {'trigger':'axis','axisPointer':{'type':'none'}},
                        color:["rgba(64,241,248,1)",'rgba(255, 241, 0, 1)','rgba(255,255,252,0.7)','rgba(255, 241, 0, 0.7)'],
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
                            'axisLabel':{'interval':0,'rotate':-45,'textStyle':{color: 'rgba(255,255,255,0.65)'}},
                            'axisLine':{show : false,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                            'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                            'splitLine':{show : false},
                            'data':mydata.series_bar_1.data[0].xAxis
                        }],
                        yAxis : [
                            {
                                'type':'value',
                                'min':85,
                                'max':100,
                                'splitLine':{show : false},
                                'axisTick':{show : true,inside:true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLabel':{'textStyle':{color: 'rgba(255,255,255,0.65)'}},
                                'name':'FPY（%）',
                                'nameTextStyle':{color: '#E2F3F6'}
                            },
                            {
                                'type':'value',
                                'min':0,
                                'max':3,
                                'splitLine':{show : false},
                                'axisTick':{show : true,inside:true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                                'axisLabel':{'textStyle':{color: 'rgba(255,255,255,0.65)'}},
                                'name':'OOB（%）',
                                'nameTextStyle':{color: '#E2F3F6'}
                            }
                        ],
                        series : [
                            {
                                'name':'FPY',
                                'type':'bar',
                                'barCategoryGap':'40%',
                                'data': []
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
                                            width: 2
                                        }
                                    }
                                },
                                'data': mydata.series_line_1.data[0].data
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
            var target1 = [],
                target2 = [];
            for(var i=0,len=mydata.series_bar_1.data[0].data.length; i<len; i++){
                if(mydata.series_bar_1.data[0].data[i] > mydata.series_bar_target){
                    option.options[0].series[0].data.push({
                            value: mydata.series_bar_1.data[0].data[i],
                            itemStyle : { 
                                normal: {
                                    color:option.color[1]
                                }
                            }
                        });
                }else{
                    option.options[0].series[0].data.push({
                        value: mydata.series_bar_1.data[0].data[i],
                        itemStyle : { 
                            normal: {
                                color:option.color[0]
                            }
                        }
                    });
                }
                target1.push(mydata.series_bar_target);
                target2.push(mydata.series_line_target);
            }
            for (var i = 1; i < 12; i++) {
                for(var j=0,len=mydata.series_bar_1.data[i].data.length; j<len; j++){
                    if(mydata.series_bar_1.data[i].data[j] <= mydata.series_bar_target || mydata.series_bar_1.data[i].data[j] == '-'){
                        mydata.series_bar_1.data[i].data[j]={
                            value: mydata.series_bar_1.data[i].data[j],
                            itemStyle : { 
                                normal: {
                                    color:option.color[0]
                                }
                            }
                        };
                    }else{
                        mydata.series_bar_1.data[i].data[j]={
                            value: mydata.series_bar_1.data[i].data[j],
                            itemStyle : { 
                                normal: {
                                    color:option.color[1]
                                }
                            }
                        };
                    }
                }
                option.options.push({
                    'xAxis': [{'data':mydata.series_bar_1.data[i].xAxis}],
                    series : [
                        {'data': mydata.series_bar_1.data[i].data},
                        {'data': mydata.series_line_1.data[i].data}
                    ]
                })
            };
            option.options[0].series[2].data = target1;
            option.options[0].series[3].data = target2; 
            this.option = option;
            this.loadStatus = true;
            option = null;
        };
        LvFpyOob.prototype.getChartDataTimeLine_2 = function(drawFlag){
            var self = this;
            var mydata = {
              legend:['FPY','OOB','FPY Target','OOB Target'],
              xAxis: ['wk41', 'wk40', 'wk39', 'wk38', 'wk37', 'wk36', 'wk35', 'wk34', 'wk33', 'wk32', 'wk31', 'wk30', 'wk29', 'wk28', 'wk27', 'wk26', 'wk25', 'wk24', 'wk23', 'wk22', 'wk21'],
              series_bar_1:{name:'FPY',data:[]},
              series_line_1:{name:'OOB',data:[]},
              series_bar_target:92,
              series_line_target:1.5
            };
            for (var i = 1; i <= 12; i++) {
                var newLineArr = [],
                    newBarArr = [],
                    monthArr = [],
                    len = new Date(2014,i,0).getDate();//获取某年某月的天数
                for (var j = 1; j <= len; j++) {
                    monthArr.push(i+'.'+j);
                    newBarArr.push(85+Math.floor(Math.random()*15));
                    newLineArr.push(Math.floor(Math.random()*3));
                };
                for (var k = len; k <= 30; k++) {//如果当月天数小于31天，需要补全
                    monthArr.push('-.-');
                    newBarArr.push('-');
                    newLineArr.push('-');
                };
                mydata.series_bar_1.data.push({'data':newBarArr,'xAxis':monthArr});
                mydata.series_line_1.data.push({'data':newLineArr,'xAxis':monthArr});
            };
            /*for (var i = 12; i >= 0; i--) {
                var newBarArr = [],
                    newLineArr = [];
                for (var j = mydata.xAxis.length; j >= 0; j--) {
                    newBarArr.push(85+Math.floor(Math.random()*15));
                    newLineArr.push(Math.floor(Math.random()*3));
                };
                mydata.series_bar_1.data.push(newBarArr);
                mydata.series_line_1.data.push(newLineArr);
            };*/
            self._setOptionTimeLine_2(mydata);
            drawFlag&&self.resetOption();
        };

        LvFpyOob.prototype._setOptionLine = function(mydata){
            var self = this;
            // require(["chart_line"],function(chartline){            
            //        self.line = chartline;                  
            //        self.line.init();
            // });
            var option = {
                color:["#fff"],
                title : {
                    text: '',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis',
                    backgroundColor:'rgba(0,0,0,0)',
                    axisPointer:{type : 'none'},
                    showContent:false,
                    showDelay:20,
                    position : function(p) {
                        // 位置回调
                    },
                    formatter:function(params,ticket,callback){
                        self.refreshPointData(self.chart.component.xAxis.getAxis(0).getIndexByName(params[0][1]));
                        self.chart.delMarkLine(0,'标线1');
                        self.chart.addMarkLine(0,{data :[[{name: '标线1', xAxis: params[0][1], yAxis: 0}, 
        {xAxis: params[0][1], yAxis: params[0][2]}]]});
                        // var h = $('#chart_fpy_Line').height()-self.chart.component.yAxis.getAxis(0).getCoord(params[0][2])-60;
                        // self.line.draw(self.chart.component.xAxis.getAxis(0).getCoord(params[0][1]),self.chart.component.yAxis.getAxis(0).getCoord(params[0][2]), h)
                        return '';
                    }
                },
                legend: {
                    y:-300,
                    data:["Ramp"]
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
                    'x2':50,
                    'y':30,
                    'y2':60,
                    borderWidth:0
                },
                xAxis : [
                    {
                        'type':'category',
                        boundaryGap : false,
                        'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisTick':{show : false,inside:true,length:10,lineStyle:{color: 'rgba(255,255,255,0.4)', width: 1, type: 'solid'}},
                        'splitLine':{show : false},
                        data : []
                    }
                ],
                yAxis : [
                    {                        
                        'type':'value',
                        'splitLine':{show : false},
                        'axisTick':{show : true,inside:true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                        'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                        'nameTextStyle':{color: '#E2F3F6'}
                    }
                ],
                series : [
                    {
                        name:'Ramp',
                        type:'line',
                        'smooth':true,
                        'symbol':'none',
                        itemStyle: {normal: {areaStyle: {
                                // 区域图，纵向渐变填充
                                color : (function (){
                                    var zrColor = require('zrender/tool/color');
                                    return zrColor.getLinearGradient(
                                        0, 200, 0, 400,
                                        [[0, 'rgba(255,255,255,0.2)'],[1, 'rgba(255,255,255,0.1)']]
                                    )
                                })()
                            }}},
                        data:[],
                        markPoint : {
                            symbolSize: 6,
                            data : []
                        },
                        markLine : {
                            symbol: ['none', 'circle'],
                            symbolSize: [0, 6],
                            itemStyle: 　{
                                normal: {
                                    label:{show:false},
                                    lineStyle:{color: 'rgba(255,255,255,0.35)', width: 2, type: 'solid'},
                                },
                                emphasis: {
                                    label:{show:false}
                                }
                            },
                            data : [
                                [
                                    {name: '标线1', xAxis: mydata[1].ProductId, yAxis: 0}, 
                                    {xAxis: mydata[1].ProductId, yAxis: mydata[1].fpyNumber}
                                ]
                            ]
                        } 
                    }
                ]
            }; 
            self.chartMp = 0;
            for (var i = 0,len=mydata.length; i < len; i++) {
                option.xAxis[0].data.push(mydata[i].ProductId);
                option.series[0].data.push(mydata[i].fpyNumber);
                //判断系列首字母
                if(mydata[i].ProductName.indexOf(self.letter) == 0){
                    option.series[0].markPoint.data.push({name: '标注'+self.chartMp, xAxis: mydata[i].ProductId, yAxis: 0});
                    self.chartMp++;
                }
            };   
            this.option = option;
            this.loadStatus = true;
            self.refreshPointData(1);
            return option;
        };
        LvFpyOob.prototype.getChartDataLine = function(drawFlag){
            var self = this;
            console.log(self);
            // $.ajax({
            //     type: "get",
            //     url: "jsonpcallback/jsonpcallback_fpyoob.js",
            //     dataType: "jsonp",
            //     jsonpCallback:"fpyoob"
            // }).done(function(data) {
            //     self.chartData = data;
            //     self._setOptionLine(self.chartData);
            //     drawFlag&&self.resetOption();
            // });
            var svt = [],
                sovp = [],
                ramp = [];
            for (var i = 0; i < 30; i++) {
                svt.push({
                    "ProductId": 'P'+(10100+i),
                    "ProductName": "C520s",
                    "Mfg": "Compal Brazil",
                    "Phase": "SVT",
                    "SS": "2014-09-03",
                    "InputQty": "2014-09-24",
                    "TOP1": 80+Math.floor(Math.random()*18),
                    "TOP2": 80+Math.floor(Math.random()*18),
                    "fpystatus": "down",
                    "fpyNumber": 50+Math.floor(Math.random()*10),
                    "oobNumber": 50+Math.floor(Math.random()*10),
                    "oobstatus": "up"
                });
                sovp.push({
                    "ProductId": 'P'+(10130+i),
                    "ProductName": "H520s",
                    "Mfg": "Compal Brazil",
                    "Phase": "SOVP",
                    "SS": "2014-09-03",
                    "InputQty": "2014-09-24",
                    "TOP1": 80+Math.floor(Math.random()*18),
                    "TOP2": 80+Math.floor(Math.random()*18),
                    "fpystatus": "down",
                    "fpyNumber": 80+Math.floor(Math.random()*18),
                    "oobNumber": 80+Math.floor(Math.random()*18),
                    "oobstatus": "up"
                });
                ramp.push({
                    "ProductId":'P'+(10160+i),
                    "ProductName": "Y520s",
                    "Mfg": "Compal Brazil",
                    "Phase": "RAMP",
                    "SS": "2014-09-03",
                    "InputQty": "2014-09-24",
                    "TOP1": 80+Math.floor(Math.random()*18),
                    "TOP2": 80+Math.floor(Math.random()*18),
                    "fpystatus": "down",
                    "fpyNumber": 50+Math.floor(Math.random()*10),
                    "oobNumber": 50+Math.floor(Math.random()*10),
                    "oobstatus": "up"
                });
            };
            self.chartData = svt.concat(sovp,ramp);
            self._setOptionLine(self.chartData);
            drawFlag&&self.resetOption();
        };
        //刷新图表底部的系列标记点
        LvFpyOob.prototype.refreshChartMarkPoint = function(){
            var self = this;
            for(var i=0;i<self.chartMp;i++){
                self.chart.delMarkPoint(0,'标注'+i);
            }
            self.chartMp = 0;
            var mdata = [];
            for (var i = 0,len=self.chartData.length; i < len; i++) {
                if(self.chartData[i].ProductName.indexOf(self.letter) == 0){
                    mdata.push({name: '标注'+self.chartMp, xAxis: self.chartData[i].ProductId, yAxis: 0});
                    self.chartMp++;
                }
            }; 
            if(mdata.length > 0){
                self.chart.addMarkPoint(0,{data :mdata});
            }
        };
        //刷新图表的标记线
        LvFpyOob.prototype.refreshChartMarkLine = function(){
            self.chart.delMarkLine(0,'标线1');
            mdata.push({name: '标注'+self.chartMp, xAxis: self.chartData[i].ProductId, yAxis: 0});
        };

        //刷新上部的点的信息
        LvFpyOob.prototype.refreshPointData = function(idx){
            var self = this;
            var colorCls = {SVT:'pagebgc-2',SOVP:'pagebgc-3',RAMP:'pagebgc-4'};
            $('#fpyoob_proInfo').html(
                '<h2 class="ebtd_h2">Product: <span>'+self.chartData[idx].ProductName+'</span></h2>'+
                '<h3 class="ebtd_h3">'+
                '    <span class="ebtd_down"><i class="ficon-icon_arrow_down"></i><em>'+self.chartData[idx].fpyNumber+'</em><b>%FPY</b></span>'+
                '    <span class="ebtd_up"><i class="ficon-icon_arrow_up"></i><em>'+self.chartData[idx].oobNumber+'</em><b>%OOB</b></span>'+
                '</h3>'+
                '<div class="ebtd_table">'+
                '    <div class="row">'+
                '        <div class="cell-th">MFG</div><div class="cell-td">'+self.chartData[idx].Mfg+'</div>'+
                '        <div class="cell-th">Phase</div><div class="cell-td">'+self.chartData[idx].Phase+'</div>'+
                '    </div>'+
                '    <div class="row">'+
                '        <div class="cell-th">SS</div><div class="cell-td">'+self.chartData[idx].SS+'</div>'+
                '        <div class="cell-th">Input Q\'ty</div><div class="cell-td">'+self.chartData[idx].InputQty+'</div>'+
                '    </div>'+
                '    <div class="row">'+
                '        <div class="cell-th">TOP1</div><div class="cell-td" colspan="3">'+self.chartData[idx].TOP1+'</div>'+
                '    </div>'+
                '    <div class="row">'+
                '        <div class="cell-th">TOP2</div><div class="cell-td" colspan="3">'+self.chartData[idx].TOP2+'</div>'+
                '    </div>'+
                '</div>'
            );
            if(self.chartData[idx].Phase != $("#fpy_module_name").text()){
                $("#fpy_module_name").text(self.chartData[idx].Phase);
            }
            if(!$(".demopagec-2").hasClass(colorCls[self.chartData[idx].Phase])){
                $(".demopagec-2").attr('class','eachBlck demopagec-2 '+colorCls[self.chartData[idx].Phase]+' section active');
            }
        };
        return LvFpyOob;
    }
);
