$(function () {
	$('#btnBurger').on('click', function (e) {
        e.preventDefault();
	    resetActiveButtons(this);
		$('html').toggleClass('openMenu');
	});
	$('.header__nav:not(ul)').on('click', function (e) {
		$('html').toggleClass('openMenu');
	});
	$('.megaMenu a,.language__item').on('click', function (e) {
		if ($(this).attr('href') === '#') {
			e.stopPropagation();
		}
	});
    $('.toggleChild,.toggleChildTitle').on('click', function (e) {
		e.stopPropagation();
		var $li = $(this).closest('li');
		//if (!$li.hasClass('active') || !$(this).attr('href') || $(this).attr('href') === '#') {
		e.preventDefault();
		$li.toggleClass('active');
		//}
    });

    //open current menu item
    $("[data-id=openMega] a").each(function () {
        var a = $(this);
        if (location.href === this.href && !a.hasClass("language__item")) {
            a.css("color", "#f16f28");
            a.addClass("active");
            var p = a;
            do {
                p = p.parent().closest("li");
                if (p.length) p.addClass("active");
            } while (p.length);
            //只處理一筆
            return false;
        }
    });


	// 語系
    function resetActiveButtons(btn) {
        var h = $("html");
        if (btn.id !== "btnBurger" && h.hasClass('openMenu')) {
            h.removeClass("openMenu");
        }
        $(".header__button.active").not(btn).click();
    }
	$('#btnOpenLanguage').on('click', function (e) {
		e.preventDefault();
        e.stopPropagation();
	    resetActiveButtons(this);
	    $(this).toggleClass("active");
        $('.navTools,.header__languages').toggleClass('open');
	});
	$('#btnCloseLanguage').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
        $('.navTools,.header__languages').removeClass('open');
    });

    //搜尋
    $("#btnOpenSearch").on('click',
        function(e) {
            e.preventDefault();
            e.stopPropagation();
            resetActiveButtons(this);
            $(this).toggleClass("active");
            $('.header__searchBar').toggleClass('open');
        });
    $(".header__searchBar input").on("keypress",
        function(e) {
            if (e.which === 13) {
                location.href = $(this).attr("data-url") + encodeURIComponent(this.value);
            }
        });


	// 集團成員
	$('#btnGroup').on('click', function (e) {
		e.preventDefault();
		$('.footerMembers').toggleClass('openMember');
	});

	// Go to top
	var $goTop = $('.goTop');
	$(window).on('scroll', function () {
		var scrollTop = $(this).scrollTop();
		if (scrollTop >= 100) {
			$goTop.fadeIn();
		} else {
			$goTop.fadeOut();
		}
	}).trigger('scroll');
	$goTop.on('click', function () {
		$('body, html').animate({ 'scrollTop': 0 });
	});
});
