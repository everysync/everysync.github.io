define('page_control',[],function(){
	$(".app-init-page").on('click.search_tab','.seaSideNav span',function(){
		if($(this).closest('li').hasClass("current")){
			return false;
		}
		var moduleName = $(this).find("em").html();
		switch(moduleName){
			case "Q-STOP":
				page_modules.loadinto("moduleHtml/Qstop_Search.html", ".eachBlck" ,"pagebgc-1","page_audit");
				break;
			case "FPY/OOB":
				page_modules.loadinto("moduleHtml/FPY_OOB_Search.html", ".eachBlck" ,"pagebgc-1","page_audit");
				break;
			case "AUDIT":
				page_modules.loadinto("moduleHtml/Audit_Search.html", ".eachBlck" ,"pagebgc-1","page_audit");
				break;
			case "FAI":
				page_modules.loadinto("moduleHtml/FAI_Search.html", ".eachBlck" ,"pagebgc-1","page_audit");
				break;
			case "EC":
				page_modules.loadinto("moduleHtml/EC_Search.html", ".eachBlck" ,"pagebgc-1","page_audit");
				break;
			default:break;
		}
	});
	function init(pageName){
		console.log('init');
		switch(pageName){
			case "page_audit":
				require(["page_audit"], function(page){
						page.init();
				});
				break;
			case "page_fai":
				require(["page_fai"], function(page){
						page.init();
				});
				break;
			case "audit_odm":
			case "fai_odm":
			case "fpyoob_in":
			case "audit_result":
			case "fai_result":
			case "fpyoob_result":
			case "qstop_result":
				require( ['page_chart_control'],function(page){
					page&&page.init(pageName);
					page = null;
				});
				break;
			default:break;
		}
	};
	return {init:init};
});

define('page_audit',[],function() {
	function init() {
		require(["icheck.min"],function() {
				var allLayout = $(".layoutst_1"); 
				var allradio = $("input[type=radio]");
				var eachTR = $(".Qualify_flex").find(".qsitem_ckb");
				var alltabw = $(".es_tabwrap_tab");
				var alltabs = alltabw.find(".iTab");
				
				$(".es_tabwrap").Tabs({
					event : 'tap',			//事件类型  
					timeout : 0,				//设置事件延迟
					auto : 0,					//多少秒自动切换一次  
					tabBoxLayout:".layoutst_1",	//tabBox的子集
					findInSelf:true,			//用于元素都是处于同个HTML tag里面的时候调用方法
					callback : null				//回调函数
				});
				
				eachTR.each(function(index, element) {
					var _name = "ons"+index;
					var _self = $(element);
					var _inps = _self.find("input[type=radio]");
					_inps.filter(":odd").addClass("qsno");
					_inps.filter(":even").addClass("qsyes");
					_inps.attr("name", _name);
					
				});
				
				allradio.iCheck({
					checkboxClass: 'icheckbox_esqs',
					radioClass: 'iradio_esqs',
					increaseArea: '20%' // optional
				});
					
				allradio.filter(".qsyes").on("ifChecked", function() {
					var _sfw = $(this).closest(".qsitem_block");
					_sfw.attr("class", "qsitem_block qsyes");
					setTimeout(function(){
						_sfw.closest(".layoutst_1").addClass("stopHide");
						_sfw.closest(".layoutst_1").removeClass("stopHide");
					},1000);
				});
				allradio.filter(".qsno").on("ifChecked", function() {
					$(this).closest(".qsitem_block").attr("class", "qsitem_block qsno");
				});
					
				var tabTabs = $(".es_tabwrap_tab_pos").find(".iTab"); // 缓存tab标签包裹
			
				var yes_score = 100;
				var  no_score = 1;
				var yesElm = $("#yesyesye");
				var  noElm = $("#nonono");
				allradio.on("ifToggled", function() {
					var layself = $(this);
					var noradio = allradio.filter(function(index) {
						var se = $(this);
						if (se.is(":checked") && se.hasClass("qsno")) {
							return se;
						}
					});
					yesElm.html(yes_score - noradio.length*no_score);
					noElm.html( noradio.length*no_score);
					
					var chl = layself.closest(".layoutst_1");
					var alliput = chl.find("input[type='radio']");
					var ckiput = alliput.filter(":checked");
					var tabcount = tabTabs.eq(layself.closest(".layoutst_1").index()).find(".count");
					
					tabcount.show();
					tabcount.html(
						(alliput.length/2) - (ckiput.length)
					);
					if (tabcount.html() == "0") {
						tabcount.hide();
					} else {
						//
					}
				});
				
				
				//上传Files
				$(".syimg").each(function(index, element) {
					element.onchange =function(e) {
						var _objs = e.target.files;
						if ( _objs.length > 0) {
							$(e.target.files).each(function (i) {
								var prew = $("<img>").attr('class','newAppendImg');
								var imgobj = _objs[i];
								var reader  = new FileReader();
								reader.onloadend = function () {
									prew.attr('src', reader.result);
								};
								reader.readAsDataURL(imgobj);
								$(element).closest(".uploadimg").prepend(prew).addClass("hasUploadImages");
							});
						} else {
							var wp = $(element).closest(".uploadimg");
							wp.find("img").remove();
							wp.removeClass("hasUploadImages");
						}
					};
				});
				
				
				var $schDetail = $(".schDetail");
				var chkinput =  $schDetail.find("radio");
				$(".checkStyle .thisIsNo").on('ifChecked', function(e){
					$(this).closest(".checkStyle").next(".Q_search").show();
				}).on('ifUnchecked', function(e) {
					$(this).closest(".checkStyle").next(".Q_search").hide();
				});
			
				$(".clearCheckbox").on("click", function() {
					allradio.iCheck('uncheck');
					$(".qsitem_block").removeClass("qsyes qsno");
					yesElm.html("0");
					noElm.html("0");
				});
				
				allLayout.each(function(index, element) {
					var _this = $(element);
					var alliput = _this.find("input[type='radio']");
					var ckiput = alliput.filter(":checked");
					alltabs.eq(_this.index()).find("span.count").html(alliput.length/2 - ckiput.length);
				});
							
				$('.form_radio,.form_check').iCheck({
					checkboxClass: 'icheckbox_flat',
					radioClass: 'iradio_flat',
					increaseArea: '20%' // optional
				});
		});
		require(["everysync"],function() {
			require(["isk/isk_EverySync_LPL_Data"],function() {
				var incData = new isk_EverySync_Data();
		  	var incFunct = new isk_EverySync_LPL(incData.thisVer, incData.thisData);
	    	incFunct.load();
	    });
    });
		$('#audit_search_btn').on("tap.audser",function(){
			page_modules.loadinto("moduleHtml/Audit_SearchResult.html", ".eachBlck" ,"pagebgc-3","audit_result");
		});
		$('#ec_search_btn').on("tap.ecser",function(){
			page_modules.loadinto("moduleHtml/EC_SearchResult.html", ".eachBlck" ,"pagebgc-5");
		});
		$('#fai_search_btn').on("tap.faiser",function(){
			page_modules.params = {type:1};
			page_modules.loadinto("moduleHtml/FAI_SearchResult-1.html", ".eachBlck" ,"pagebgc-3","fai_result");
		});
		$('#fpyoob_search_btn').on("tap.fpyoobser",function(){
			page_modules.params = {type:1};
			page_modules.loadinto("moduleHtml/FPY_OOBSearchResult.html", ".eachBlck" ,"pagebgc-2","fpyoob_result");
		});
		$('#qstop_search_btn').on("tap.qstopser",function(){
			page_modules.params = {type:4};
			page_modules.loadinto("moduleHtml/Qstop_SearchResult.html", ".eachBlck" ,"pagebgc-1","qstop_result");
		});
	}
	
	return {init:init};
});

define('page_fai',[],function() {
	function init() {
		alert('fai');
	}
	return {init:init};
});