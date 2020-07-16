
var week_start_date, week_end_date, week_start_date1, PreDate, year_month_day;
jQuery(function()
{
	var $ = jQuery;
	var date1='',date2='';
	if (!window['console'])
	{
		window.console = {};
		window.console.log = function(){};
	}
		
	/*
	define a new language named "custom"
	*/
	var lang = getUrlParameter('lang');
	var date = new Date();
  var Year = date.getFullYear();
  var Month = date.getMonth() + 1;
  var Day = date.getDate();


  if(String(Month).length == 1){
      Month = '0' + Month;
  }if(String(Day).length == 1){
      Day = '0' + Day;
  }
  year_month_day = Year + '-' + Month + '-' + Day ;

  var set_month_date = date.setDate(1);
  var set_month_year = date.getFullYear();
  var set_month_month = date.getMonth() + 1;
  var set_month_day = date.getDate();
  set_month_month = ('0' + set_month_month).substr(-2);
  set_month_day = ('0' + set_month_day).substr(-2);
  var month_start_date = set_month_year + '-' + set_month_month + '-' + set_month_day;
	//最后一天
	var last_month = date.getMonth();
	var last_month_count = ++last_month;
	var new_last = new Date(date.getFullYear(),last_month_count,1);
	var oneDay = 1000*60*60*24;
	var last_month_date = new Date(new_last - oneDay);
	var set_month_last_day = last_month_date.getDate();
	set_month_last_day = ('0'+set_month_last_day).substr(-2);
	var month_end_date =  set_month_year + '-' + set_month_month + '-' + set_month_last_day;
	$.dateRangePickerLanguages['custom'] = 
	{
		'selected': 'Choosed:', 
		'days': 'Days',
		'apply': 'Close',
		'week-1' : 'Mon',
		'week-2' : 'Tue',
		'week-3' : 'Wed',
		'week-4' : 'Thu',
		'week-5' : 'Fri',
		'week-6' : 'Sat',
		'week-7' : 'Sun',
		'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
		'shortcuts' : 'Shortcuts',
		'past': 'Past',
		'7days' : '7days',
		'14days' : '14days',
		'30days' : '30days',
		'previous' : 'Previous',
		'prev-week' : 'Week',
		'prev-month' : 'Month',
		'prev-quarter' : 'Quarter',
		'prev-year' : 'Year',
		'less-than' : 'Date range should longer than %d days',
		'more-than' : 'Date range should less than %d days',
		'default-more' : 'Please select a date range longer than %d days',
		'default-less' : 'Please select a date range less than %d days',
		'default-range' : 'Please select a date range between %d and %d days',
		'default-default': 'This is costom language'
	};
	
	$('input[name=mode]').change(function(e){
		var ele_id = $('.wrapper').attr('data-id');
		// $('#'+ele_id).attr('data-mode',$(this).val());
		var o = $('#'+ele_id).data('dateRangePicker');
		if(typeof o == 'object'){
			o.destroy();
		}

		$('.datepicker').each(function(){
			var o = $(this).data('dateRangePicker');
			if(typeof o == 'object'){
				o.destroy();
			}
		})

		if($(this).val() == 'day'){
			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'week'){
			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'month'){
			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'customize'){
			$(e.target).parent().addClass('active').parents().siblings().find('label.block').removeClass('active')
			$('.shopForce').hide();
		}

		var date1 = $('#'+ele_id).attr('data-date1');
		var date2 = $('#'+ele_id).attr('data-date2');
		switch($(this).val()){
			case 'month':
				$('#'+ele_id).dateRangePicker(
				{	
					startOfWeek: 'monday',
					batchMode: 'month',
					singleMonth: true,
					language:lang,
					showShortcuts: false,
					inline:true,
					container: '#pickerContainer',
					alwaysOpen:true,
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var date2 = obj.date2;
					var year2 = obj.date2.getFullYear();
					var month2 = obj.date2.getMonth()+1;
					var day2 = obj.date2.getDate();
					month2 = ('0'+month2).substr(-2);
					day2 = ('0'+day2).substr(-2);
					var month_start = year + '-' + month + '-' + day;
					var month_end = year2 + '-' + month2 + '-' + day2;

					$('.wrapper').attr('data-date1',month_start);
					$('.wrapper').attr('data-date2',month_end);
					$('#'+ele_id).attr('data-date1',month_start);
					$('#'+ele_id).attr('data-date2',month_end);
					$('#'+ele_id).attr('data-mode','month');
					$('.wrapper').attr('data-mode','month');
				})
				// if(date1 == undefined || date2 == undefined){
				// 	$('#'+ele_id).data('dateRangePicker').setStart(month_start_date);
				// 	$('#'+ele_id).data('dateRangePicker').setEnd(month_end_date);
				// }else{
				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
				// 	$('#'+ele_id).data('dateRangePicker').setEnd(date2);
				// }

			break;
			case 'week':
				$('#'+ele_id).dateRangePicker(
				{
				startOfWeek: 'monday',
				batchMode: 'week',
				singleMonth: true,
				language:lang,
				showShortcuts: false,
				inline:true,
				container: '#pickerContainer', 
				alwaysOpen:true 
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var date2 = obj.date2;
					var year2 = obj.date2.getFullYear();
					var month2 = obj.date2.getMonth()+1;
					var day2 = obj.date2.getDate();
					month2 = ('0'+month2).substr(-2);
					day2 = ('0'+day2).substr(-2);
					var week_start = year + '-' + month + '-' + day;
					var week_end = year2 + '-' + month2 + '-' + day2;
					$('.wrapper').attr('data-date1',week_start);
					$('.wrapper').attr('data-date2',week_end);
					$('#'+ele_id).attr('data-date1',week_start);
					$('#'+ele_id).attr('data-date2',week_end);
					$('#'+ele_id).attr('data-mode','week');
					$('.wrapper').attr('data-mode','week');
				})

				// if(date1 == undefined || date2 == undefined){
				// 	$('#'+ele_id).data('dateRangePicker').setStart(week_start_date);
				// 	$('#'+ele_id).data('dateRangePicker').setEnd(week_end_date);
				// }else{
				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
				// 	$('#'+ele_id).data('dateRangePicker').setEnd(date2);
				// }

			break;
			case 'day':
				$('#'+ele_id).dateRangePicker(
				{
				startOfWeek: 'monday',
				singleDate:true,
				singleMonth:true,
				language:lang,
				showShortcuts: false,
				inline:true,
				container: '#pickerContainer', 
				alwaysOpen:true 
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var day_date = year + '-' + month + '-' + day;
					$('.wrapper').attr('data-date1',day_date);
					$('.wrapper').attr('data-date2',day_date);
					$('.wrapper').attr('data-mode','day');
					$('#'+ele_id).attr('data-date1',day_date);
					$('#'+ele_id).attr('data-date2',day_date);
					$('#'+ele_id).attr('data-mode','day');
				})
				// if(date1 == undefined){
				// 	$('#'+ele_id).data('dateRangePicker').setStart(year_month_day);
				// }else{
				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
				// }
			break;
			case 'customize':
				$('#'+ele_id).dateRangePicker(
				{
				startOfWeek: 'monday',
				// startDate:'2018-07-20',
				// endDate:'2018-07-27',
				language:lang,
				showShortcuts: false,
				inline:true,
				container: '#pickerContainer', 
				alwaysOpen:true 
				}).unbind('datepicker-change').bind('datepicker-change',function(event,obj){
					var date1 = obj.date1;
					var year = obj.date1.getFullYear();
					var month = obj.date1.getMonth()+1;
					var day = obj.date1.getDate();
					month = ('0'+month).substr(-2);
					day = ('0'+day).substr(-2);
					var date2 = obj.date2;
					var year2 = obj.date2.getFullYear();
					var month2 = obj.date2.getMonth()+1;
					var day2 = obj.date2.getDate();
					month2 = ('0'+month2).substr(-2);
					day2 = ('0'+day2).substr(-2);
					var range_start = year + '-' + month + '-' + day;
					var range_end = year2 + '-' + month2 + '-' + day2;

					$('.wrapper').attr('data-date1',range_start);
					$('.wrapper').attr('data-date2',range_end);
					$('.wrapper').attr('data-mode','customize');
					$('#'+ele_id).attr('data-date1',range_start);
					$('#'+ele_id).attr('data-date2',range_end);
					$('#'+ele_id).attr('data-mode','customize');
				})
				// if(date1 == undefined || date2 == undefined){
				// 	$('#'+ele_id).data('dateRangePicker').setStart(year_month_day);
				// 	$('#'+ele_id).data('dateRangePicker').setEnd(year_month_day);
				// }else{
				// 	$('#'+ele_id).data('dateRangePicker').setStart(date1);
				// 	$('#'+ele_id).data('dateRangePicker').setEnd(date2);
				// }
			break;
		}
		$('#'+ele_id).data('dateRangePicker').clear();

	});
	
	$('.datepicker').click(function(e){
		if(e.target.className.indexOf('not_click')!=-1){
			return
		}
    $('.wrapper').attr('data-id',$(this).attr('id'));
    if($(this).attr('id') == 'datepicker'){
    	sessionStorage.setItem('datepicker',$(this).attr('id'));
    }else{
    	sessionStorage.setItem('datepicker1',$(this).attr('id'));
    }
    sessionStorage.setItem('Alldatepicker',$(this).attr('id'));

   	
		var val = $(this).attr('data-mode');
		if(!!!val){
			if(typeof(report) != "undefined"){
				if(report == 'form5'||report == 'form6'||report == 'form21'){
					val = 'day';
				}
			}else{
				val = 'week';
			}
		}
		
		$('input[name=mode][value='+val+']').prop('checked',true);
		$('input[name=mode][value='+val+']').change();

		var date1 = $(this).attr('data-date1');
		var date2 = $(this).attr('data-date2');
		if(!!date1 && !!date2){
			$(this).data('dateRangePicker').setDateRange(date1,date2);	
		}
		$('#bg').show();
    $('.wrapper').show();
    $('body').css('overflow','hidden');
	})


// 日历确定button
	$('#date_sure').click(function(e){
		var type = $('.wrapper').attr('data-mode');
		$('#bg').hide();
		$('.wrapper').hide();
		// 销售对比的日期逻辑（周期1变更，周期2跟着变）
		if(typeof form_id != 'undefined' && form_id=='form4' && $('.datepicker')[1].className.indexOf('not_click')!=-1){
			if(type == 'day'){
				date1 = $(e.target).parents('.wrapper').attr('data-date1');
				date2 = '';
				if(tong_huan_type == 'huan'){
					$('.date_text2 .start').text(getDateNum(date1, -1));
					$('.date_text2 .end').text(date2);
					$('.date_text2 .icondate').hide();
				}else if(tong_huan_type == 'tong'){
					$('.date_text2 .start').text(getLastYearDay(date1));
					$('.date_text2 .end').text(date2);
					$('.date_text2 .icondate').hide();
				}
				
				$('.date_text1 .start').text(date1);
				$('.date_text1 .end').text(date2);
				$('.date_text1 .icondate').hide();
				
			}else if(type == 'week' || type == "month" || type == 'customize'){
				date1 = $(e.target).parents('.wrapper').attr('data-date1');
	      date2 = $(e.target).parents('.wrapper').attr('data-date2');
				if(tong_huan_type == 'huan'){
					var huan_date = dateHuanDate(date1,date2)
					$('.date_text2 .start').text(huan_date[0]);
					$('.date_text2 .end').text(huan_date[1]);
					$('.date_text2 .icondate').show();
				}else if(tong_huan_type == 'tong'){
					$('.date_text2 .start').text(getLastYearDay(date1));
					$('.date_text2 .end').text(getLastYearDay(date2,true));
					$('.date_text2 .icondate').show();
				}
	      $('.date_text1 .start').text(date1);
	      $('.date_text1 .end').text(date2);
	      $('.date_text1 .icondate').show();
			}
		}else if(sessionStorage.getItem('Alldatepicker') == 'datepicker'){
			if(type == 'day'){
				date1 = $(e.target).parents('.wrapper').attr('data-date1');
	      date2 = '';
	      $('.date_text2 .start').text(date1);
	      $('.date_text2 .end').text(date2);
				$('.date_text2 .icondate').hide();
			}else if(type == 'week' || type == "month" || type == 'customize'){
				date1 = $(e.target).parents('.wrapper').attr('data-date1');
	      date2 = $(e.target).parents('.wrapper').attr('data-date2');
	      $('.date_text2 .start').text(date1);
	      $('.date_text2 .end').text(date2);
	      $('.date_text2 .icondate').show();
			}
			sessionStorage.setItem('date_text2_start', date1)
			sessionStorage.setItem('date_text2_end', date2)
		}else{
			if(type == 'day'){
				date1 = $(e.target).parents('.wrapper').attr('data-date1');
	      date2 = '';
	      $('.date_text1 .start').text(date1);
	      $('.date_text1 .end').text(date2);
	      $('.date_text1 .icondate').hide();
			}else if(type == 'week' || type == "month" || type == 'customize'){
				date1 = $(e.target).parents('.wrapper').attr('data-date1');
	      date2 = $(e.target).parents('.wrapper').attr('data-date2');
	      $('.date_text1 .start').text(date1);
	      $('.date_text1 .end').text(date2);
	      $('.date_text1 .icondate').show();
			}
		}
		
		var ele_id = $('.wrapper').attr('data-id');
		// $('#'+ele_id).attr('data-mode',$(this).val());
		var o = $('#'+ele_id).data('dateRangePicker');
		if(typeof o == 'object'){
			o.destroy();
		}
		
	})
	// // 获取周
  var date = new Date(year_month_day);
  date.setDate(date.getDate() - (date.getDay() + 6) % 7);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if(String(month).length == 1){
      month = '0' + month;
  }if(String(day).length == 1){
      day = '0' + day;
	}
  week_start_date = year +'-'+ month + '-' + day;
  date.setDate(date.getDate() + 6);
  var year_end = date.getFullYear();
  var month_end = date.getMonth()+1;
  var day_end = date.getDate();
  if(String(month_end).length == 1){
      month_end = '0' + month_end;
  }if(String(day_end).length == 1){
      day_end = '0' + day_end;
  }
  
  week_end_date = year_end + '-' + month_end + '-' + day_end;
  $('.date_text1 .start').text(week_start_date);
	$('.date_text1 .end').text(week_end_date);
	// form5，form6
	$('.today .start').text(year_month_day);
	$('.today .icondate').hide();
	// $('.date_line').hide();
	$('.today .end').text('');
	// 取前一天
	var preDate = week_start_date;
	preDate = preDate.replace(/-/g,'/');
	var pre_date1 = new Date(preDate);
	var time = pre_date1.getTime();
	var preDate = new Date(time - 24*60*60*1000);
	var preDate_year = preDate.getFullYear();
  var preDate_month = preDate.getMonth()+1;
  var preDate_day = preDate.getDate();
  if(String(preDate_month).length == 1){
      preDate_month = '0' + preDate_month;
  }if(String(preDate_day).length == 1){
      preDate_day = '0' + preDate_day;
  }
  PreDate = preDate_year + '-' + preDate_month + '-' + preDate_day;
	var date1 = new Date(PreDate);
  date1.setDate((date1.getDate() - (date.getDay() + 6) % 7));
  var year = date1.getFullYear();
  var month = date1.getMonth()+1;
  var day = date1.getDate();
  if(String(month).length == 1){
      month = '0' + month;
  }if(String(day).length == 1){
      day = '0' + day;
  }

  week_start_date1 = year +'-'+ month + '-' + day;
	$('.date_text2 .start').text(week_start_date1);
	$('.date_text2 .end').text(PreDate);
	sessionStorage.setItem('date_text2_start', week_start_date1)
	sessionStorage.setItem('date_text2_end', PreDate)
});

	// 返回相差天数
	function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
		var dateSpan,
				tempDate,
				iDays;
		sDate1 = Date.parse(sDate1);
		sDate2 = Date.parse(sDate2);
		dateSpan = sDate2 - sDate1;
		dateSpan = Math.abs(dateSpan);
		iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		return iDays
	};
	
	// 返回环期
	function dateHuanDate(start_date, end_date){
		var days = datedifference(start_date, end_date)
		var huan_start = new Date(start_date)
		huan_start.setDate(huan_start.getDate()- days-1)
		var huan_end = new Date(end_date)
		huan_end.setDate(huan_end.getDate()-days-1)
		return [huan_start.Format('yyyy-MM-dd'), huan_end.Format('yyyy-MM-dd')]
	}
	// 是否是日期
	function check_date(date){
		return (new Date(date).getDate()==date.substring(date.length-2));
	}
	// 传入日期所在周
	function getWeek(year_month_day){
		var date = new Date(year_month_day);
		date.setDate(date.getDate() - (date.getDay() + 6) % 7);
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		if(String(month).length == 1){
				month = '0' + month;
		}if(String(day).length == 1){
				day = '0' + day;
		}
		var week_start_date = year +'-'+ month + '-' + day;
		date.setDate(date.getDate() + 6);
		var year_end = date.getFullYear();
		var month_end = date.getMonth()+1;
		var day_end = date.getDate();
		if(String(month_end).length == 1){
				month_end = '0' + month_end;
		}if(String(day_end).length == 1){
				day_end = '0' + day_end;
		}
		var week_end_date = year_end + '-' + month_end + '-' + day_end;
		return [week_start_date, week_end_date]
	}

	// 返回传入日期对应的去年日期
	function getLastYearDay(year_month_day, add_flg){
		var last_year_week_date = year_month_day.substring(0,4)-1 + year_month_day.substring(4, year_month_day.length)
		if(!check_date(last_year_week_date)){
			if(add_flg){
				last_year_week_date = getDateNum(last_year_week_date,0)
			}else{
				last_year_week_date = last_year_week_date.substring(0,last_year_week_date.length-2) + (last_year_week_date.substring(last_year_week_date.length-2, last_year_week_date.length)-1)
			}
		}
		return last_year_week_date
	}

	// 返回传入日期加num
	function getDateNum(year_month_day, num){
		var date = new Date(year_month_day)
		date.setDate(date.getDate()+num)
		return date.Format('yyyy-MM-dd')
	}
	// 返回传入日期的去年同比日期
	function getTongDate(year_month_day){
		var last_year_week_date = getLastYearDay(year_month_day)
		var date = new Date(last_year_week_date)
		date.setDate(date.getDate() + 6);
		return [last_year_week_date, date.Format('yyyy-MM-dd')]
	}
