
$(function()
{

	if (!window['console'])
	{
		window.console = {};
		window.console.log = function(){};
	}
	function formatDate(date) {
	    var y = date.getFullYear();
	  	var m = date.getMonth() + 1; m = m >= 10 ? m : '0'+m;
	  	var d = date.getDate(); d = d >= 10 ? d : '0'+d;
	  	return y+'/'+m+'/'+d;
	}
	/*
	define a new language named "custom"
	*/
	var maxDateOfDay, maxDateOfWeek, maxDateOfMonth;
	var date = new Date();
	date.setDate(date.getDate() - 1);
	maxDateOfDay = formatDate(date) ;

	// var date1 = new Date();
	// date1.setDate(date1.getDate() - 1)
	// // date1.setDate(date1.getDate() - date1.getDay() + 1);
	// maxDateOfWeek = formatDate(date1);

	// var date2 = new Date();
	// // var date2 = new Date(date2.getFullYear(), date2.getMonth(), '01');
	// date2.setDate(date2.getDate() - 1)
	// maxDateOfMonth = formatDate(date2);
  	
	var date = new Date();
  var Year = date.getFullYear();
  var Month = date.getMonth() + 1;
  var Day = date.getDate();

	var selected_date = '';
	if($('.new_header ul li a')[2].className.indexOf("active") != -1){
		// 全渠道销售
		selected_date = maxDateOfDay;
		//$('.new_header ul li a')[1].className.indexOf("active") != -1 ? maxDateOfDay : ''
	}else if($('.new_header ul li a')[0].className.indexOf("active") != -1||$('.new_header ul li a')[1].className.indexOf("active") != -1){
		// 门店销售
		selected_date = Year + '/' + Month + '/' + Day;
	}

  var week_start_date,week_end_date;

  if(String(Month).length == 1){
      Month = '0' + Month;
  }if(String(Day).length == 1){
      Day = '0' + Day;
  }
  var year_month_day = Year + '-' + Month + '-' + Day ;

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
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'week'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'month'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').show();
		}else if($(this).val() == 'customize'){
			$(e.target).parent().addClass('active').parents().siblings().find('label').removeClass('active')
			$('.shopForce').hide();
		}
		var date1 = $('#'+ele_id).attr('data-date1');
		var date2 = $('#'+ele_id).attr('data-date2');
		if(langCodes == ''){
			langCodes = 'cn'
		}

		switch($(this).val()){
			case 'month':
				$('#'+ele_id).dateRangePicker(
				{
					startOfWeek: 'monday',
					batchMode: 'month',
					// startDate: maxDateOfMonth,
					endDate:$('.new_header ul li a')[2].className.indexOf("active") != -1 ? maxDateOfDay : '',
					// endDate:"2018-01-15",
					singleMonth: true,
					language:langCodes,
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

				sessionStorage.removeItem('select_day');
		        sessionStorage.removeItem('select_week');
		        sessionStorage.removeItem('select_month');

		        sessionStorage.removeItem('select_day_tong');
		        sessionStorage.removeItem('select_week_tong');
		        sessionStorage.removeItem('select_month_tong');

		        sessionStorage.removeItem('select_day_order');
		        sessionStorage.removeItem('select_week_order');
		        sessionStorage.removeItem('select_month_order');

		        sessionStorage.removeItem('select_day_vip');
		        sessionStorage.removeItem('select_week_vip');
		        sessionStorage.removeItem('select_month_vip');

		        sessionStorage.removeItem('select_day_rank');
		        sessionStorage.removeItem('select_week_rank');
		        sessionStorage.removeItem('select_month_rank');

		        sessionStorage.removeItem('select_day_rate');
		        sessionStorage.removeItem('select_week_rate');
		        sessionStorage.removeItem('select_month_rate');

		        sessionStorage.removeItem('select_day_ele');
		        sessionStorage.removeItem('select_week_ele');
		        sessionStorage.removeItem('select_month_ele');

		        sessionStorage.removeItem('select_day_salerank');
		        sessionStorage.removeItem('select_week_salerank');
		        sessionStorage.removeItem('select_month_salerank');
	      	
		      	if((!$('.datepicker')[0].dataset.date1 || $('.datepicker')[0].dataset.mode != 'month') && $('.new_header ul li a')[2].className.indexOf("active") != -1){
					$($('.datepicker')).data('dateRangePicker').setDateRange(maxDateOfDay.substring(0,8) + '01', maxDateOfDay);
				}
			break;
			case 'week':
				$('#'+ele_id).dateRangePicker(
				{
				startOfWeek: 'monday',
				batchMode: 'week',
				singleMonth: true,
				endDate:$('.new_header ul li a')[2].className.indexOf("active") != -1 ? maxDateOfDay : '',
				language:langCodes,
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
				
				sessionStorage.removeItem('select_day');
		        sessionStorage.removeItem('select_week');
		        sessionStorage.removeItem('select_month');

		        sessionStorage.removeItem('select_day_tong');
		        sessionStorage.removeItem('select_week_tong');
		        sessionStorage.removeItem('select_month_tong');

		        sessionStorage.removeItem('select_day_order');
		        sessionStorage.removeItem('select_week_order');
		        sessionStorage.removeItem('select_month_order');

		        sessionStorage.removeItem('select_day_vip');
		        sessionStorage.removeItem('select_week_vip');
		        sessionStorage.removeItem('select_month_vip');

		        sessionStorage.removeItem('select_day_rank');
		        sessionStorage.removeItem('select_week_rank');
		        sessionStorage.removeItem('select_month_rank');

		        sessionStorage.removeItem('select_day_rate');
		        sessionStorage.removeItem('select_week_rate');
		        sessionStorage.removeItem('select_month_rate');

		        sessionStorage.removeItem('select_day_ele');
		        sessionStorage.removeItem('select_week_ele');
		        sessionStorage.removeItem('select_month_ele');

			    sessionStorage.removeItem('select_day_salerank');
			    sessionStorage.removeItem('select_week_salerank');
			    sessionStorage.removeItem('select_month_salerank');
		      	if((!$('.datepicker')[0].dataset.date1 || $('.datepicker')[0].dataset.mode != 'week') && $('.new_header ul li a')[2].className.indexOf("active") != -1){
		      		var myDate = new Date(maxDateOfDay);
					myDate.setDate(myDate.getDate() - 6);
					$($('.datepicker')).data('dateRangePicker').setDateRange(formatDate(myDate), maxDateOfDay);
				}
			break;
			case 'day':
				$('#'+ele_id).dateRangePicker(
				{
				startOfWeek: 'monday',
				singleDate:true,
				singleMonth:true,
				// showDropdowns: true,
				// minDate: maxDateOfMonth,
				// maxDate: maxDateOfMonth,
				// startDate:maxDateOfMonth,
				// "startDate": "01/09/2018",
				"default": "01/09/2018",
				// defaultDate:selected_date,
				endDate:$('.new_header ul li a')[2].className.indexOf("active") != -1 ? maxDateOfDay : '',
				// endDate:$('.new_header ul li a')[1].className.indexOf("active") != -1 ? maxDateOfDay : '',
				language:langCodes,
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

				sessionStorage.removeItem('select_day');
		        sessionStorage.removeItem('select_week');
		        sessionStorage.removeItem('select_month');

		        sessionStorage.removeItem('select_day_tong');
		        sessionStorage.removeItem('select_week_tong');
		        sessionStorage.removeItem('select_month_tong');

		        sessionStorage.removeItem('select_day_order');
		        sessionStorage.removeItem('select_week_order');
		        sessionStorage.removeItem('select_month_order');

		        sessionStorage.removeItem('select_day_vip');
		        sessionStorage.removeItem('select_week_vip');
		        sessionStorage.removeItem('select_month_vip');

		        sessionStorage.removeItem('select_day_rank');
		        sessionStorage.removeItem('select_week_rank');
		        sessionStorage.removeItem('select_month_rank');

			    sessionStorage.removeItem('select_day_rate');
			    sessionStorage.removeItem('select_week_rate');
			    sessionStorage.removeItem('select_month_rate');

		      	sessionStorage.removeItem('select_day_ele');
		      	sessionStorage.removeItem('select_week_ele');
		      	sessionStorage.removeItem('select_month_ele');

		      	sessionStorage.removeItem('select_day_salerank');
		      	sessionStorage.removeItem('select_week_salerank');
		      	sessionStorage.removeItem('select_month_salerank');
					if((!$('.datepicker')[0].dataset.date1 || $('.datepicker')[0].dataset.mode != 'day') 
						&& ($('.new_header ul li a')[0].className.indexOf("active") != -1||$('.new_header ul li a')[1].className.indexOf("active") != -1|| $('.new_header ul li a')[2].className.indexOf("active") != -1)){
					//$($('.datepicker')).data('dateRangePicker').setDateRange(selected_date, selected_date);
				}
			break;
			case 'customize':
				$('#'+ele_id).dateRangePicker(
				{
				startOfWeek: 'monday',
				endDate:$('.new_header ul li a')[2].className.indexOf("active") != -1 ? maxDateOfDay : '',
				// maxDate:"2018/01/08",
				language:langCodes,
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
	$(document).on('click','.datepicker',function(){
		$('.wrapper').attr('data-id',$(this).attr('id'));
		// 解决第一次打开date pop 没有值直接查询，接口报错
		// if(!$('.wrapper').attr('data-mode')){
			if($(this).attr('id')=='datepicker1'||$(this).attr('id')=='datepicker1_1'||$(this).attr('id')=='datepicker2'||$(this).attr('id')=='datepicker3'){
				$('.wrapper').attr('data-mode', 'day');
				$('.wrapper').attr('data-date1', year_month_day);
			}else if($(this).attr('id')=='datepicker4'){
				$('.wrapper').attr('data-mode', 'month');
				$('.wrapper').attr('data-date1', year_month_day);
			}
		// }

		var val = $(this).attr('data-mode');

		if($(this).attr('id') == 'datepicker4'){
			if(!!!val){
				val = 'month';
				$('#dp-week').hide();
				$('#dp-day').hide();
				$('#dp-range').hide();
			}else{
				$('#dp-week').hide();
				$('#dp-day').hide();
				$('#dp-range').hide();
			}
		}else{
			if(!!!val){
					val = 'day';
					$('#dp-week').show();
					$('#dp-day').show();
					$('#dp-range').show();
			}else{
				$('#dp-week').show();
				$('#dp-day').show();
				$('#dp-range').show();
			}
		}
		
		$('input[name=mode][value='+val+']').prop('checked',true);
		$('input[name=mode][value='+val+']').change();

		var date1 = $(this).attr('data-date1');
		var date2 = $(this).attr('data-date2');

		// 初始值高亮
		if(!!date1 && !!date2){
			$(this).data('dateRangePicker').setDateRange(date1,date2);	
		}else if(!date1 && ($('.new_header ul li a')[0].className.indexOf("active") != -1||$('.new_header ul li a')[1].className.indexOf("active") != -1||$('.new_header ul li a')[2].className.indexOf("active") != -1)){
			if($(this).attr('id')!='datepicker4'){
				$(this).data('dateRangePicker').setDateRange(selected_date, selected_date);
			}
		}
		// if((!$('.datepicker')[0].dataset.date1 || $('.datepicker')[0].dataset.mode != 'month') && $('.new_header ul li a')[1].className.indexOf("active") != -1){
		// 	$($('.datepicker')).data('dateRangePicker').setDateRange(maxDateOfMonth.substring(0,8) + '01', maxDateOfMonth);
		// }

		$('.background').show();
	    $('.wrapper').show();
	    $('body').css('overflow','hidden');
	})

	$('#pickerBox .close').click(function(){
		$('#pickerBox').hide();
	});

	// 获取周
  var date = new Date(year_month_day);
  date.setDate(date.getDate() - (date.getDay() + 7) % 7);
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
	

});
