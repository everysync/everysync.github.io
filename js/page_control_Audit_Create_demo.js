var audit_create_buiding = {
	audit_create_build_checkBox:function(wrap) {
		
	}
};

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
		if ($(this).data("created") === 'true') {return;}
		this.setAttribute("id", "inputWrap"+index);
		allinputWrap.find('input:eq(0)').attr("qusType","yes");
		allinputWrap.find('input:eq(1)').attr("qusType","no");
		$(this).data("created", true);
	});

	allinput.each(function(index,element) {
		var $this = $(this);
		if ($this.data("created") === 'true' ) {return;}
		var $parent = $this.parent();
		var attrName = $parent[0].getAttribute('id');
		this.setAttribute("name",attrName);
		this.setAttribute("id", "inputs"+index);
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
	var eachlayout = $(".layoutst_1");
	eachlayout.each(function(i,el) {
		var $k = $(el).find(".qsitem_block");
		console.log($k.length);
		var isnoChecked = $k.length - $k.filter(function() {
			if (this.getAttribute("isChecked") == 'true') {
				return $(this)
			}
		}).length;
		console.log(isnoChecked)
	});
	
	//触发的事件监听
	/*$(document).on("chenklist", function(e,d) {
		console.log(d)
	})*/
	
};
$(function() {
	audit_create();
	
	$(document).on("chenklist", function(e,d) {
		var num =Math.floor((1-d.nobtnlength/d.alllist)*100);
		$("#yesyesye").html(num);
		$("#nonono").html( 100-num);
	});
	
	
});