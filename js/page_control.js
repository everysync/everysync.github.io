define('page_control',[],function(){
	$(".app-init-page").on('click.search_tab','.seaSideNav span',function(){
		if($(this).closest('li').hasClass("current")){
			return false;
		}
		var moduleName = $(this).find("em").html();
		switch(moduleName){
			case "Q-STOP":
				page_modules.loadinto("moduleHtml/Qstop_Search.html", ".eachBlck" ,"pagebgc-1","page_search");
				break;
			case "FPY/OOB":
				page_modules.loadinto("moduleHtml/FPY_OOB_Search.html", ".eachBlck" ,"pagebgc-1","page_search");
				break;
			case "AUDIT":
				page_modules.loadinto("moduleHtml/Audit_Search.html", ".eachBlck" ,"pagebgc-1","page_search");
				break;
			case "FAI":
				page_modules.loadinto("moduleHtml/FAI_Search.html", ".eachBlck" ,"pagebgc-1","page_search");
				break;
			case "EC":
				page_modules.loadinto("moduleHtml/EC_Search.html", ".eachBlck" ,"pagebgc-1","page_search");
				break;
			default:break;
		}
	});
	function init(pageName){
		switch(pageName){
			case "page_audit":
				require(["page_audit"], function(page){
						page.init();
				});
				break;
			case "page_search":
				require(["page_search"], function(page){
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
		var inputNumsK = 0;
		var inputWrapK = 0;
		var audit_create = function() {
			var allinputWrap = $(".qsitem_ckb");
			var allinput = allinputWrap.find("input");
			var inputWrapNums = allinputWrap.length;
			var inputNums = allinput.length;

			$(".es_tabwrap").Tabs({
				event : 'click',			//事件类型  
				timeout : 0,				//设置事件延迟
				auto : 0,					//多少秒自动切换一次  
				tabBoxLayout:".layoutst_1",	//tabBox的子集
				findInSelf:true,			//用于元素都是处于同个HTML tag里面的时候调用方法
				callback : null				//回调函数
			});	

			allinputWrap.each(function(index,element) {
				if ($(this).data("created") === true) {return;}
				inputWrapK = inputWrapK +1
				this.setAttribute("id", "inputWrap"+inputWrapK);
				allinputWrap.find('input:eq(0)').attr("qusType","yes");
				allinputWrap.find('input:eq(1)').attr("qusType","no");
				$(this).data("created", true);
			});

			allinput.each(function(index,element) {
				var $this = $(this);
				if ($this.data("created") === true) {return;}
				inputNumsK = inputNumsK + 1
				var $parent = $this.parent();
				var attrName = $parent[0].getAttribute('id');
				this.setAttribute("name",attrName);
				this.setAttribute("id", "inputs"+inputNumsK);
				$this.wrap('<label for="'+$this[0].getAttribute("id")+'"></label>');
				$this.after('<span class="radioBoxStates"></span>');
				$this.data("created",true);
			})


			var $handleElement = $(".es_tabwrap_tabbox");
			$handleElement.off(".countckb");
			$handleElement.on("change.countckb", "input[type=radio]", function(e) {
				var $this = $(this);
				var isNo = allinput.filter(function() {
					var _this = $(this);
					if ( _this.attr("qusType") == "no" && _this.prop("checked") === true ) {
						return $this;
					}
				});
				var isYes = allinput.filter(function() {
					var _this = $(this);
					if ( _this.attr("qusType") == "yes" && _this.prop("checked") === true ) {
						return $this;
					}
				});
				isNo.closest(".qsitem_block").addClass("qsno").attr("isChecked",true);
				isYes.closest(".qsitem_block").removeClass("qsno").attr("isChecked",true);
				//触发事件
				var tempObj = {
					'alllist':allinputWrap.length,
					'yesbtnlength':isYes.length,
					'nobtnlength':isNo.length
				}
				$(document).trigger("chenklist",tempObj)
			})
			//初始化
			window.cuntNumInit = function() {
				var eachlayout = $(".layoutst_1");
				var tabs = $(".es_tabwrap_tab").find(".iTab");
				eachlayout.each(function(i,el) {
					var $this = $(this);
					var index = $this.index();
					var $k = $(el).find(".qsitem_block");
					var isnoChecked = $k.length - $k.filter(function() {
						if (this.getAttribute("isChecked") == 'true') {
							return $(this)
						}
					}).length;
					
					if (isnoChecked==0) {
						tabs.eq(index).find(".count").remove();
					} else {
						tabs.eq(index).find(".count").html(isnoChecked)
					}
				});	
			}
			cuntNumInit();
			//触发的事件监听
			/*$(document).on("chenklist", function(e,d) {
				console.log(d)
			})*/

		};

		audit_create();
		$(document).off("chenklist")
		$(document).on("chenklist", function(e,d) {
			var num =Math.floor((1-d.nobtnlength/d.alllist)*100);
			$("#yesyesye").html(num);
			$("#nonono").html( 100-num);
			cuntNumInit();
		});
		
		var createdbtn = function() {
			$("#addnewss").on("click", function(e) {
				function mokupconten(cont) {
					cont.load("moduleHtml/!!!popup_1.html #add_data_from", function() {
						var area = $("#acitveTabArea")
						var newtabs = area.find("p.pdtb15").eq(0).clone();
						area.html("");
						var tablength=$(".es_tabwrap_tab").find(".iTab").length;
						$(".es_tabwrap_tab").find(".iTab").each(function(i,el) {
							var $this = $(this);
							var text = $this.find(".auditBor").text();
							var newtabsc = newtabs.clone();
							if ($this.hasClass("cur")) {
								var _index = $(this).index();
								modalinit.cacheModals[0].find(".button-yes").data("currentIndex", _index);
								newtabsc.find(".button").addClass("active");
							}
							newtabsc.find(".button").html(text);
							area.append(newtabsc);
						});
						area.removeAttr("style");
						area.on("click", "p", function() {
							var _this = $(this);
							var _index = _this.index();
							_this.addClass("cur").siblings().removeClass("cur");
							_this.children(".button").addClass("active").end().siblings().children(".button").removeClass("active");
							modalinit.cacheModals[0].find(".button-yes").data("currentIndex", _index);
						});
						
						w_popLayoutfns.modalrefresh();
					});
				}
				function mokupbutton() {
					var btn_1 = '<div class="pm-button button-no">取消</div>';
					var btn_2 = '<div class="pm-button button-yes">添加</div>';
					return btn_1+ btn_2;
				}
				
				
				function mokupcallback(obj) {
					//console.log(obj)
					obj.on("click", ".button-no",function() {
						w_popLayoutfns.modalhide(0,true);
					}).on("click", ".button-yes", function() {
						var _valobj = obj.find("input.modal-text-input");
						if (_valobj.val().replace(/(^\s*)|(\s*$)/g, "") == "") {
							w_popLayoutfns.modalshow(0,"你什么都没写。",'<div class="pm-button button-no">不写了</div><div class="pm-button button-yes">重来</div>',function(obj) {
								obj.on("click", ".button-no", function() {
									w_popLayoutfns.modalhide(0,true);
								}).on("click",".button-yes", function() {
									showaddmodal();
								});
							})
							return;
						}
						
						
						//插入跟初始化选项
						var newtepm = $qustemplate.clone();
						$(".layoutst_1").eq($(this).data("currentIndex")).find(".Qualify_flex").append(newtepm.find("span.qsitem_ckf").html(_valobj.val()).end() );
						audit_create();
						cuntNumInit();
						flieUploadsmode();
						
						if ( $("#add_autofill_send").prop("checked") === true ) {
							$(".ctr_7").trigger("tap");
							var inputVal = "[通知]我增加了一条规则：" + _valobj.val();
							$(document).on("side_showed.add2input", function(e) {
								$("#chatInput").val(inputVal);
								$("#btnsend").trigger("click");
								setTimeout(function(){
									$(".pop_mask").trigger("tap");
								}, 1800)
								$(document).off(".add2input");
							})
							w_popLayoutfns.modalhide(0,true);
							
						} else if ($("#add_autofill").prop("checked") === true) {
							$(".ctr_7").trigger("tap");
							var inputVal = "[通知]我增加了一条规则：" + _valobj.val();
							$(document).on("side_showed.add2input", function(e) {
								$("#chatInput").val(inputVal);
								$(document).off(".add2input");
							})
							w_popLayoutfns.modalhide(0,true);
						}
						
						
					});
				}
				
				function showaddmodal() {
					w_popLayoutfns.modalshow(
						0,
						function(cont){mokupconten(cont)}, 
						mokupbutton(),
						function(obj) {mokupcallback(obj)}
					);	
				}
				showaddmodal();
			})
		};
		createdbtn();
		
		var qustemplate = 
			'<article class="qsitem_block">'+
			'	<div class="qsitem_t clearfix"><div class="qsremovebtn ficon-cancel"></div>'+
			'		<span class="qsitem_ckb">'+
			'			<input type="radio">'+
			'			<input type="radio">'+
			'		</span>'+
			'		<span class="qsitem_ckf">问题问题问题</span>'+
			'	</div>'+
			'	<div class="qsitem_qus_wrap_slide">'+
			'		<div class="qsitem_qus_wrap clearfix">'+
			'			<textarea name="" cols="" rows="" class="setYourWords"></textarea>'+
			'			<div class="uploadimg clearfix">'+
			'				<span><i>+</i> Images</span>'+
			'				<div class="syimg_wrap"><input type="file" multiple class="syimg"></div>'+
			'			</div>'+
			'		</div>'+
			'	</div>'+
			'</article>';	
		
		var $qustemplate = $(qustemplate);
		
		function editingel() {
			$("#delelemts").on("click", function(e) {
				var $this = $(this);
				if ($this.data("editing") === true ) {
					$(".qsitem_block").removeClass("qsedit");
					$this
						.data("editing",false)
						.width(42)
						.val("");
					cuntNumInit();
				} else {
					$(".qsitem_block").addClass("qsedit");
					$this
						.width(184)
						.data("editing",true)
						.val(" 完成编辑");
				}
				
			});
		}
		editingel();
		
		
		function deltingfunction() {
			$(".layoutst_1").on("click", ".qsremovebtn", function() {
				var $this = $(this);
				var $paretn = $this.closest(".qsitem_block");
				$paretn.on(animateEnd("delting"), function() {
					$paretn.remove();
				});
				$paretn.addClass("removing");
				
			});
		}
		deltingfunction();
		//上传Files
		window.flieUploadsmode = function() {
			$(".syimg").each(function(index, element) {
				if ($(element).data("mokeup") === true ) {return;}
				$(element).data("mokeup",true);
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
		};
		flieUploadsmode();
		fpyCreateInit();
	}
	function fpyCreateInit(){
		//切换角色
		$('#fpyCreatType').on('tap', '.iTab:not(.cur)',function(){
			$(this).addClass('cur').siblings().removeClass('cur');
		});
	}
	return {init:init};
});

define('page_search',[],function() {
	function init() {
		//加载product
		require(["isk_LPL"],function(isk){
			isk.init&&isk.init();
    	});
		$('#audit_search_btn').on("tap.audser",function(){
			page_modules.loadinto("moduleHtml/Audit_SearchResult.html", ".eachBlck" ,"pagebgc-3","audit_result",true);
		});
		$('#ec_search_btn').on("tap.ecser",function(){
			page_modules.loadinto("moduleHtml/EC_SearchResult.html", ".eachBlck" ,"pagebgc-5","ec_result",true);
		});
		$('#fai_search_btn').on("tap.faiser",function(){
			page_modules.params = {type:1};
			page_modules.loadinto("moduleHtml/FAI_SearchResult-1.html", ".eachBlck" ,"pagebgc-3","fai_result",true);
		});
		$('#fpyoob_search_btn').on("tap.fpyoobser",function(){
			page_modules.params = {type:1};
			page_modules.loadinto("moduleHtml/FPY_OOBSearchResult.html", ".eachBlck" ,"pagebgc-2","fpyoob_result",true);
		});
		$('#qstop_search_btn').on("click.qstopser",function(){
			var str = $("#searchForm").serialize();
			console.log(str);
			page_modules.params = {type:4};
			page_modules.loadinto("moduleHtml/Qstop_SearchResult.html", ".eachBlck" ,"pagebgc-1","qstop_result",true);
		});
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
		//包含全选的checkBox
		$(".cbHasAll").each(function(index,dom) {
			var cbinput =  $(dom).find("input[type='checkbox']");
			var formInput = $(dom).find('.icheckWarp').prev();
			cbinput.filter(".togAll").on('ifClicked', function(e){
			  if($(this).parent().hasClass('checked')){
			      cbinput.not('.togAll').iCheck('uncheck');
			  }else{
			      cbinput.not('.togAll').iCheck('check');
			  }
			  setTimeout(setCbInput,0);
			});
			cbinput.not('.togAll').on("ifToggled",function(e) {
				if($(this).parent().hasClass('checked')){
					cbinput.filter(".togAll").iCheck('uncheck');
			  	}
			  	setTimeout(setCbInput,0);
			});

			function setCbInput(){
				var input_id = '';
				var checkedList = $(dom).find(".checked input[type='checkbox']:not(.togAll)");
			    if(checkedList.length > 0){
			      if(checkedList.length == cbinput.length-1){
			        input_id = 'All  ';
			      }else{
			        $.each(checkedList, function( key, item ) {
			          input_id += $(item).attr('id')+',';
			        });
			      }
			    }
			    formInput.val(input_id);
			}
		});
		//开关选择按钮
		$(".ons_icon").each(function(index,dom){
			var ons =  $(dom).find("span");
			var input = $(dom).parent().prev();
			ons.on('click',function(){
				ons.toggleClass('stopHide');
				var val = input.val()=='1'?0:1
				input.val(val);
			});
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