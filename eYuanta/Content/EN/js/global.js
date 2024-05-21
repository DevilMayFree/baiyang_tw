var models = {
};

var funcs = {
	goTop: function () {
		var $goTop = $('.goTop__action , .goTop__printer');
		$(window).on('scroll', function () {
			var scrollTop = $(this).scrollTop();
			if (scrollTop >= 100) {
				$goTop.fadeIn();
			} else {
				$goTop.fadeOut();
			}
		}).trigger('scroll');
		$goTop.on('click', function () {
			$('body,html').animate({ 'scrollTop': 0 });
		});
	},
	openMega: function () {
		$('[data-id="openMega"]')
			.mouseenter(function () {
				$('body').addClass('openMega');
			})
			.mouseleave(function () {
				$('body').removeClass('openMega');
			});
	},
	bodyClass: function () {
		$('[data-bodyclass]').each(function () {
			var classname = $(this).data('bodyclass');
			$(this).on('click', function (e) {
				e.stopPropagation();
				$('body').addClass(classname);
			})
			$(document).click(function () {
				$('body').removeClass(classname);
			});
		});
	},
	toggleActive: function () {
		$('[data-toggle]').on('click.toggle', function () {
			var target = $(this).data('toggle');
			$(target).toggleClass('active');
		});
	},
	switchLang: function(TW,CN,EN){
		var langs = ['TW','CN','EN'],
		   output = [TW, CN, EN];
		for (i = 0; i < langs.length; i++) {
			if ($('html').hasClass(langs[i])) {
				return output[i];
			}
		}
    },
    pdfExtLink: function() {
        $("body").on(
            "click",
            "a[href$='.pdf']",
            function() {
                $(this).attr("target", "_blank");
            });
    }
};
var pattern = {
	toCurrency: function (value) {
		return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	},
	max: function (arr) {
		return arr.reduce(function (a, b) {
			return Math.max(a, b);
		})
	},
	min: function (arr) {
		return arr.reduce(function (a, b) {
			return Math.min(a, b);
		})
	}
}
var chart = {
	bar: function (option) {
		var data = option.data,
			format = option.format ? option.format : 0,
			categories = option.categories,
			height = option.height;

		var seriesData = data.map(function (val, i, array) {
			var color = i === array.length - 1 ? '#0067b3' : '#38a8fd'
			return { y: Number(val), color: color }
		});

		return {
			chart: {
				type: 'column',
				backgroundColor: 'transparent',
				height: height,
				style: { "font-family": "'Droid Serif', '微軟正黑體', 'Microsoft JhengHei', sans-serif", }
			},
			title: {
				text: ""
			},
			subtitle: {
				enabled: false
			},
			xAxis: {
				categories: categories,
				crosshair: true,
				tickLength: 0,
				lineColor: "#b6b6b6",
				labels: {
					style: { "color": "#111", "font-size": "16px" }
				}
			},
			yAxis: {
				visible: false,
				min: pattern.min(data) * 0.9,
				max: pattern.max(data) * 1.1
			},
			tooltip: {
				enabled: false
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					groupPadding: 0.3,
					dataLabels: {
						enabled: true,
						style: {},
						formatter: function () {
							var val = this.y;
							return '<div style="font-family: \'Droid Serif\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif;color: #111; \
												font-size: 16px;font-weight:normal; padding-bottom:3px;">' + val.format(format) + '</div>';
						},
						useHTML: true
					}
				}
			},
			series: [{
				name: '',
				data: seriesData,

			}]
		}
	},
	line: function (option) {
		var data = option.data,
		format = option.format ? option.format : 0,
		categories = option.categories,
		height = option.height;

		var seriesData = data.map(function (val, i, array) {
			var color = i === array.length - 1 ? '#0067b3' : '#38a8fd'
			return { y: Number(val), color: color }
		});

		return {
			chart: {
				type: 'line',
				backgroundColor: 'transparent',
				height: height,
				style: { "font-family": "'Droid Serif', '微軟正黑體', 'Microsoft JhengHei', sans-serif", }
			},
			title: {
				text: ""
			},
			xAxis: {
				visible: true,
				categories: categories,
				crosshair: true,
				tickLength: 0,
				lineColor: "#b6b6b6",
				labels: {
					style: { "color": "#111", "font-size": "16px" }
				}
			},
			yAxis: {
				visible: false,
				min: pattern.min(data) * 0.8,
				max: pattern.max(data) * 1.2
			},
			tooltip: {
				enabled: false
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true,
						formatter: function () {
							var val = this.y;
							var year = this.x;
							var boxStyle = 'font-family: \'Droid Serif\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif;color: #111; \
												font-size: 16px;font-weight:normal; padding-bottom:10px';
							return '<div style="' + boxStyle + '">' + val.format(format) + '</div>';
						},
						useHTML: true
					}
				}
			},
			series: [{
				name: '',
				color: '#c3c3c3',
				lineWidth: 1,
				data: seriesData,
			}]
		}
	},
	groupBar: function (option) {
		var data = option.data,
			categories = option.categories,
			height = option.height;
		return {
			chart: {
				zoomType: 'xy',
				backgroundColor: 'transparent',
				height: height,
				spacingTop: 20,
				style: { "font-family": "'Droid Serif', '微軟正黑體', 'Microsoft JhengHei', sans-serif", }
			},
			title: {
				text: ""
			},
			subtitle: {
				enabled: false
			},
			xAxis: {
				categories: categories,
				crosshair: true,
				tickLength: 0,
				lineColor: "#b6b6b6",
				labels: {
					style: { "color": "#111", "font-size": "16px" }
				}
			},
			yAxis: [{
				visible: false,
				min: pattern.min(data[0].data) * 0.9,
				max: pattern.max(data[0].data) * 0.9,
			}, {
				visible: false,
				min: pattern.min(data[1].data) * 0.9,
				max: pattern.max(data[1].data) * 1.1,
				opposite: true
			}],
			tooltip: {
				enabled: false,
				shared: true
			},
			legend: {
				enabled: true,
				padding: 20,
				margin: 0,
				y: 40,
				useHTML: true,
				labelFormatter: function () {
					return '<div style="font-size:16px;font-weight:normal;position:relative;top:-6px;">' + this.name + '</div>';
				},
				symbolRadius: 0,
				squareSymbol: true
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					groupPadding: 0.25,
					dataLabels: {
						enabled: true,
						style: {},
						useHTML: true
					},
				}
			},
			series: [
				{
					type: 'column',
					color: '#0067b3',
					yAxis: 0,
					name: data[0].name,
					data: data[0].data,
					dataLabels: {
						formatter: function () {
							var val = this.y;
							return '<div style="font-family: \'Droid Serif\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif;color: #000; \
													font-size: 16px;font-weight:normal; padding-bottom:3px;visibility:visible;">' + val.format(2) + '</div>';
						},
					},
				
				},
				{
					type: 'line',
					color: '#bc935b',
					yAxis: 1,
					name: data[1].name,
					data: data[1].data,
					dataLabels: {
						formatter: function () {
							var val = this.y;
							return '<div style="font-family: \'Droid Serif\', \'微軟正黑體\', \'Microsoft JhengHei\', sans-serif;color: #fff; \
													font-size: 16px;font-weight:normal; padding-bottom:3px;visibility:visible;">' + val.format(2) + '</div>';
						},
					},
				}
			]
		}
	},
}

Number.prototype.format = function (n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};