// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () { };
	var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());
; (function ($) {
	var settings = {
		selector: ' > li > a > img',
		dataPC: 'img-pc',
		dataMobile: 'img-mobile'
	},
	methods = {
		init: function (options) {
			var $this = $(this);
			settings = $.extend({}, settings, options);
			methods.reset.apply($this);
			$(window).on('resize', function (e) {
				//clearTimeout($.data(this, 'resizeTimerSlider'));
				//$.data(this, 'resizeTimerSlider', setTimeout(function () {
				methods.reset.apply($this);
				//}, 100));
			});
			return this;
		},
		reset: function () {
			var $this = $(this);
			var toMode = Modernizr.mq('(max-width: 768px)') ? 'Mobile' : 'PC';
			var oeMode = $this.data('mode');
			if (toMode != oeMode) {
				var dataName = toMode == 'PC' ? settings.dataPC : settings.dataMobile;
				//$this.parents('.bx-viewport').css('overflow', 'visible');
				$(settings.selector, $this).each(function (i, el) {
					$(el).prop('src', $(el).data(dataName));
				});
				$this.data('mode', toMode);
			}
		}
	};

	$.fn.aplusRwdSlider = function (methodOrOptions) {
		if (methods[methodOrOptions]) {
			return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + methodOrOptions + ' does not exist on jQuery.magicLine');
		}
	};
})(jQuery);

// Place any jQuery/helper plugins in here.


//tabs.js
; (function ($) {
	$.fn.tabs = function (options) {

		var defaults = {

		}

		if (this.length == 0) return this;

		// support mutltiple elements
		if (this.length > 1) {
			this.each(function () { $(this).tabs(options) });
			return this;
		}

		var el = this;

		var tabs = {};

		var init = function () {
			tabs.settings = $.extend({}, defaults, options);
			
			if ($(el).find('[data-href]').hasClass('active')) {
				var active = $(el).find('.active').data('href');
				$(active).fadeIn(300).siblings().hide();
			} else {
				$(el).find('[data-href]').eq(0).addClass('active');
				var active = $(el).find('[data-href]').eq(0).data('href');
				$(active).fadeIn(300).siblings().hide();
			}
		};

		var start = function () {
			init();
			$(el).find('[data-href]').on('click', function (e) {
				e.preventDefault();
				$(this).addClass('active').siblings().removeClass('active');
				var active = $(el).find('.active').data('href');
				$(active).fadeIn(300).siblings().hide();
			});
		};

		start();
		return this
	};

})(jQuery);

//marketChart.js
; (function ($) {
	$.fn.marketChart = function (options) {
		var defaults = {
			height: 400,
			tolerance: 100,
			interval: 200,
			speed: 500
		}

		if (this.length == 0) return this;

		// support mutltiple elements
		if (this.length > 1) {
			this.each(function () { $(this).marketChart(options) });
			return this;
		}

		var el = this;

		var marketChart = {};

		var init = function () {
			marketChart.settings = $.extend({}, defaults, options);
			if (marketChart.settings.series.length <= 0) {
				console.log('there\'s no data series to be found');
				return false;
			}
			var $stage = $('<div class="groupChart__stage"></div>'),
				$yAxis = $('<div class="groupChart__yAxis"></div>').css('height', marketChart.settings.height),
				$xAxis = $('<div class="groupChart__xAxis"></div>'),
				$seriesGroup = $('<div class="groupChart__seriesGroup"></div>').css('height', marketChart.settings.height),
				$grid = $('<ul class="groupChart__grid"></ul>').appendTo($seriesGroup);
			var categories_length = marketChart.settings.categories.length,
				series_length = marketChart.settings.series.length,
				categories = marketChart.settings.categories,
				series = marketChart.settings.series;

			var dataSets = [];
			for (i = 0; i < series_length; i++) {
				dataSets = dataSets.concat(series[i].data);
			}
			var dividend = Math.ceil(Math.max.apply(null, dataSets) / 10);
			var $yAxis_ul = $('<ul></ul>').appendTo($yAxis),
				$xAxis_ul = $('<ul></ul>').appendTo($xAxis),
				$seriesGroup_ul = $('<ul class="groupChart__bars"></ul>').appendTo($seriesGroup);
			var height = 100 / dividend + '%';
			for (i = 0; i < dividend; i++) {
				$('<li style="height:' + height + '">' + i * 10 + '%</li>').prependTo($yAxis_ul);
				$grid.append('<li style="height:' + height + '"></li>')
			}
			$('<li style="height:' + height + ';top:-' + height + '">' + dividend * 10 + '%</li>').prependTo($yAxis_ul);

			for (i = 0; i < categories_length; i++) {
				var width = 100 / categories_length + '%';
				$xAxis_ul.append('<li style="width:' + width + '"><span>' + categories[i] + '</span></li>');
				var thisBarContainer = $('<li style="width:' + width + '"></li>').appendTo($seriesGroup_ul);
				for (j = 0; j < series_length; j++) {
					var thisData = series[j].data[i];
					var thisBar = $('<div class="groupChart__bar" data-number="' + thisData + '"><span data-text="' + thisData.toFixed(1) + '%"></span></div>').appendTo(thisBarContainer);
					if (series[j].highLight) {
						thisBar.addClass('groupChart__bar--yuanta');
					}
				}
			}

			$stage.append($yAxis).append($seriesGroup).append($xAxis);
			el.append($stage);
		};
		var animate = function () {
			$('.groupChart__bar').each(function () {
				var ceiling = $('.groupChart__yAxis li').length - 1;
				var height = $(this).data('number') / ceiling * 10;
				var index = $(this).closest('li').index();
				var $this = $(this);
				$this.children('span').delay(index * marketChart.settings.interval).animate({ 'height': height + '%' }, marketChart.settings.speed);
				setTimeout(function () {
					$this.addClass('animated')
				}, index * marketChart.settings.interval + marketChart.settings.speed)
			});
			$(window).off('scroll.marketChart');
		};
		var start = function () {
			init();
			var offsetTop = el.offset().top;
			$(window).on('scroll.marketChart', function () {
				var scrollTop = $(this).scrollTop(),
					windowHeight = $(this).height();
				if (scrollTop > offsetTop - windowHeight + marketChart.settings.tolerance) {
					animate();
				}
			}).trigger('scroll');
		};

		start();
		return this
	};

})(jQuery);

