function requireEcharts(needMap, requireCallback) {
    var paths = {
        'echarts': 'echart/echarts',
        'echarts/chart/pie': 'echart/echarts' // 把所需图表指向单文件
    };
    var pathArr = [
            'echarts',
            'echarts/chart/pie' // 按需加载所需图表
        ];

    if (needMap) {
        paths['echarts'] = 'echart/echarts-map';
        paths['echarts/chart/pie'] = 'echart/echarts-map';
        //pathArr.push('echarts/chart/map');
    }

    require.config({
        paths: paths
    });

    require(
        pathArr,
        requireCallback
    );
}

function MyChart(myEcharts, ecConfig, dom_id, option, flag, initFlag) {
    this.myEcharts = myEcharts;
    this.ecConfig = ecConfig;
    this.dom_id = dom_id; //渲染的位置id
    this.option = option; //chart option
    this.loading_flag = flag; //显示过渡效果标志 --0:不显示, 1:显示
    this.chart = '';
    if (initFlag) {
        this.init();
    }
    var dom = $("#"+dom_id);
    dom.css({"height":dom.height(),"width":dom.width(),"position":"relative","text-align":"left"});
}

MyChart.prototype.init = function () {
    this.chart = this.myEcharts.init(document.getElementById(this.dom_id));
    this.chart.on(this.ecConfig.EVENT.RESIZE, this.eConsole);
}

MyChart.prototype.resetOption = function () {
    this.chart = this.myEcharts.init(document.getElementById(this.dom_id));
    this.chart.setOption(this.option);
}

MyChart.prototype.eConsole = function (param) {
    //console.log(param);
}

MyChart.prototype.loadingData = function(){// 开始加载数据,显示过渡效果
    if (this.loading_flag) {
        this.chart.showLoading({
            text: 'loading',
            effect: 'whirling'
        });
    }
    this.getNewData();
}

MyChart.prototype.getDataBack = function(){//获取数据后,关闭过渡效果,重绘chart
    //---------正式使用时请注释----
    var curChart = this;
    // ajax return
    setTimeout(function() {
        if (curChart.loading_flag) {
            curChart.chart.hideLoading();
        }
    }, 2000);
    //-----------
//    if (this.loading_flag) {
//        this.chart.hideLoading();
//    }
    this.chart.setOption(this.option);
}                   
                    

MyChart.prototype.getNewData = function () {//加载数据
    // ajax --------
    this.getDataBack();
}