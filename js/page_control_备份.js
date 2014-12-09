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
			case "qstop_in":
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
		//加载product
		require(["isk_LPL"],function(isk){
			isk.init&&isk.init();
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
			var str = $("#searchForm").serialize();
			console.log(str);
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


define('isk_LPL',["isk/isk_LPL_Data","isk/isk_LPL_Function","icheck.min"],function(){
	var thisClass = new Object;
	var chkinput = null;
	thisClass.init = function(){
		//加载product，如果本地存储已经有了且没有过期就读取本地存储
		var incData = new isk_EverySync_Data();
		var incFunct = new isk_EverySync_LPL(incData.thisVer, incData.thisData);
		incFunct.load();
		$('.form_radio,.form_check').iCheck({
			checkboxClass: 'icheckbox_flat',
			radioClass: 'iradio_flat',
			increaseArea: '20%' // optional
		});

		var $odmDetail = $(".odmList");
		var odminput =  $odmDetail.find("input[type='checkbox']");
		odminput.filter(".togAll").on('ifClicked', function(e){
		  if($(this).parent().hasClass('checked')){
		      odminput.not('.togAll').iCheck('uncheck');
		  }else{
		      odminput.not('.togAll').iCheck('check');
		  }
		});
		odminput.not('.togAll').on("ifToggled",function(e) {
			if($(this).parent().hasClass('checked')){
				odminput.filter(".togAll").iCheck('uncheck');
		  }
		});

		//product多选框
		var $schDetail = $(".productList");
		chkinput =  $schDetail.find("input");
		chkinput.iCheck('check');

		var notStep1 = $("#dl_level2,#dl_level3,#dl_level4").find("input.dckb");
		chkinput.filter(".togAll").on('ifClicked', function(e){
		  if($(this).parent().hasClass('checked')){
		      $("#dl_level1").find("input.dckb").not('.togAll').iCheck('uncheck');
		      notStep1.closest('.proLabel').css('display','none');
		      notStep1.parent().removeClass('checked');
		  }else{
		      $("#dl_level1").find("input.dckb").not('.togAll').iCheck('check');
		      notStep1.closest('.proLabel').css('display','block');
		      notStep1.parent().addClass('checked');
		  }
		  setTimeout(setSteps,0);
		});
		setTimeout(setSteps,0);

		var dckb_chkinput = $schDetail.find("input.dckb").not('.togAll');
		dckb_chkinput.on('ifClicked', function(e){
		  if($(this).parent().hasClass('checked')){
		    showInput(this,'uncheck','none');
				chkinput.filter(".togAll").iCheck('uncheck');
		  }else{
		    showInput(this,'check','block');
		  }
		  setTimeout(setSteps,0);
		});
	}

	function setStep(lv_id,step_id,allFlag){
    var span_text = '',
        input_id = '';
    var dl_level = $(lv_id).find("input.dckb").not('.togAll');
    var checked = $(lv_id).find(".checked input.dckb").not('.togAll');
    if(checked.length > 0){
      if(checked.length == dl_level.length && allFlag){
        span_text = 'All  ';
        input_id = 'All  ';
      }else{
        $.each(checked, function( key, item ) {
          span_text += $(item).parents('.proLabel').find('span').html()+', ';
          input_id += $(item).attr('data-id').split("|")[2]+',';
        });
      }
    }
    span_text = span_text.substring(0,span_text.length-2);
    input_id = input_id.substring(0,input_id.length-1);
    $(step_id).parent().attr('data-text',span_text);
    $(step_id).parent().find('.pst_d').html(span_text);
    $(step_id).val(input_id);
	}
	
	//设置steps
  function setSteps(){
    setStep("#dl_level1",'#first_step_type',0);
    setStep("#dl_level2",'#second_step_type',0);
    setStep("#dl_level3",'#thrid_step_type',0);
    setStep("#dl_level4",'#fourth_step_type',1);
  }
    
  function showInput(item,opt,display){
		var data_id = $(item).attr('data-id').split("|");
		var level = parseInt(data_id[0])+1;
		var last_step = parseInt(data_id[1]);
		var next_step = parseInt(data_id[2]);
		if(level < 4){
			var qz = level+'|'+next_step+'|';
			var curr = chkinput.filter('input[data-id^="'+qz+'"]');
			curr.iCheck(opt).closest('.proLabel').css('display',display);
			curr.each(function(){
			    showInput(this,opt,display);
			});
		}
	}
	return thisClass;
});

define('isk_LPL_odm',[],function(){
	var thisClass = new Object;
	thisClass.init = function(){
		
	}
	return thisClass;
});