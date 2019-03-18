$(function(){
	var $souvenir=$('#souvenir'),
		$controls=$souvenir.next(),
		timeLine;

	$.ajax({
		url:'data.json',
		type:'GET',
		dataType:'json',
		success:function(data){
			success(data);
		},
		error:function(e){
			console.log(e);
		}
	});

	function defaultEvent(){
		this.events=[];
		this.addEvent=function(event){
			this.events.push(event);
		};
		this.trigger=function(){
			this.events.length&&this.events.forEach(function(item){
				typeof item==="function"&&item();
			});
		}
	}
	var de=new defaultEvent;

	$('body').on('click',function(){
		de.trigger();
	});

	function success(data){
		timeLine=new TimeLine($souvenir,data);
		data.forEach(function(item){
			item.events.length&&control.createButtons(item.year);
		});
	}

	function controls(){
		var $thumb=$controls.children('.thumb'),
			$buttons=$controls.children('.buttons'),
			w=$controls.width(),
			h=$controls.height();
		$thumb.on('click',function(e){
			// e.stopPropagation();
			$thumb.addClass('bottom');
			$controls.stop(true).animate({
				width:$buttons.outerWidth(true),
				height:$buttons.outerHeight(true)
			},300);
			return false;
		});
		$buttons.on('click','.button',function(){
			var year=+$(this).html();
			timeLine.jumpToYear(year);
		});
		function back(){
			$thumb.hasClass('bottom')&&$controls.stop(true).animate({
				width:w,
				height:h
			},300,function(){
				$thumb.removeClass('bottom');
			});
		}
		de.addEvent(back);
		function createButtons(year){
			$buttons.append($('<p></p>',{'class':'button'}).html(year));
		}
		return {
			back:back,
			createButtons:createButtons
		};
	}
	var control=controls();

	// 测试用例
	// var data=[
	// 	{
	// 		"year":2018,
	// 		"events":[
	// 			{
	// 				"month":10,
	// 				"day":10,
	// 				"event":"aaa"
	// 			},
	// 			{
	// 				"month":10,
	// 				"day":11,
	// 				"event":"bbb"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"year":2019,
	// 		"events":[
	// 			{
	// 				"month":2,
	// 				"day":11,
	// 				"event":"ddd"
	// 			},
	// 			{
	// 				"month":1,
	// 				"day":10,
	// 				"event":"ccc"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"year":2016,
	// 		"events":[
	// 			{
	// 				"month":10,
	// 				"day":10,
	// 				"event":"aaa"
	// 			},
	// 			{
	// 				"month":10,
	// 				"day":11,
	// 				"event":"bbb"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"year":2014,
	// 		"events":[
	// 			{
	// 				"month":10,
	// 				"day":10,
	// 				"event":"aaa"
	// 			},
	// 			{
	// 				"month":10,
	// 				"day":11,
	// 				"event":"bbb"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"year":2015,
	// 		"events":[
	// 			{
	// 				"month":10,
	// 				"day":10,
	// 				"event":"aaa"
	// 			},
	// 			{
	// 				"month":10,
	// 				"day":11,
	// 				"event":"bbb"
	// 			}
	// 		]
	// 	},
	// 	{
	// 		"year":2012,
	// 		"events":[
	// 			{
	// 				"month":10,
	// 				"day":10,
	// 				"event":"aaa"
	// 			},
	// 			{
	// 				"month":10,
	// 				"day":11,
	// 				"event":"bbb"
	// 			}
	// 		]
	// 	},
	// ];
	// success(data);
});
