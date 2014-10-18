    var isk_EverySync_LPL = function (dv,dd) {

        var thisClass = new Object;

        var thisName = "LPL";
        var thisVer = dv;
        var thisExp = _getTime();
        var thisData = [];
        var thisLevel1 = [];
        var thisLevel2 = [];
        var thisLevel3 = [];
        var thisLevel4 = [];

        thisClass.load = function (d) {
            if (_chkLocalCache() == -1) {
                window.localStorage.clear();
                _initialCache();
            } else {
                _loadCache();
            }
            _loadData();
            _loadUI();
        };

        function _chkLocalCache() {
            if (_getCache("plname") == null) {
                return -1;
            }
            if (_getCache("plver") != thisVer) {
                return -1;
            }
            if (_getCache("expires") == "" || (new Date(_getCache("expires")).getTime() - _getTime().getTime()) < 0) {
                return -1;
            }
            return 0;
        };

        function _initialCache() {
            thisExp.setDate(thisExp.getDate() + 1);
            thisData = dd;
            alert(thisData[2]);
            _setCache();
        };

        function _loadCache() {
            thisExp.setDate(thisExp.getDate() + 1);
            thisData = [_getCache("pldata1"), _getCache("pldata2"), _getCache("pldata3"), _getCache("pldata4")];
            _setCache();
        };

        function _loadData() {
            thisLevel1 = thisData[0].split(",");
            thisLevel2 = thisData[1].split(",");
            thisLevel3 = thisData[2].split(",");
            thisLevel4 = thisData[3].split(",");
        };

        function _loadUI() {
            var ss = '';
            ss += "<li class=\"datas\"><input type=\"checkbox\" class=\"dckb togAll\"><span class=\"dckl\">ALL</span></li>";
            $.each(thisLevel1,function(key,item){
                ss += "<li class=\"datas\"><input type=\"checkbox\" class=\"dckb\" data-id=\"" + item.split("||")[0] + "\" value=\"" + item.split("||")[0] + "\"><span class=\"dckl\">" + item.split("||")[1] + "</span></li>";
            });
            $("#dl_level1").append(ss);
            ss = '';
            $.each(thisLevel2,function(key,item){
                ss += "<li class=\"datas\"><input type=\"checkbox\" class=\"dckb\" data-id=\"" + item.split("||")[0] + "\" value=\"" + item.split("||")[0] + "\"><span class=\"dckl\">" + item.split("||")[1] + "</span></li>";
            });
            $("#dl_level2").append(ss);
            ss = '';
            $.each(thisLevel3,function(key,item){
                ss += "<li class=\"datas\"><input type=\"checkbox\" class=\"dckb\" data-id=\"" + item.split("||")[0] + "\" value=\"" + item.split("||")[0] + "\"><span class=\"dckl\">" + item.split("||")[1] + "</span></li>";
            });
            $("#dl_level3").append(ss);
            ss = '';
            $.each(thisLevel4,function(key,item){
                ss += "<li class=\"datas\"><input type=\"checkbox\" class=\"dckb\" data-id=\"" + item.split("||")[0] + "\" value=\"" + item.split("||")[0] + "\"><span class=\"dckl\">" + item.split("||")[1] + "</span></li>";
            });
            $("#dl_level4").append(ss);
        };


        function _getCache(cName) {
            if (window.localStorage.getItem(cName)) {
                return window.localStorage.getItem(cName);
            }
            return null;
        };

        function _setCache() {
            window.localStorage.setItem("plname", thisName);
            window.localStorage.setItem("plver", thisVer);
            window.localStorage.setItem("pldata1", thisData[0]);
            window.localStorage.setItem("pldata2", thisData[1]);
            window.localStorage.setItem("pldata3", thisData[2]);
            window.localStorage.setItem("pldata4", thisData[3]);
            window.localStorage.setItem("expires", thisExp);
        };

        function _getTime() {
            var fmt = "2000-01-01 23:59:59";
            var dt = Date.parse(fmt.replace(/-/g, "/"));
            var setfmt = new Date(dt);
            return new Date();
        };
		
        return thisClass;

    };