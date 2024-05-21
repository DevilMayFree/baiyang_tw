const CheckIE = function () {
    var userAgent = navigator.userAgent;
    return (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1);
};


/* 字體放大縮小功能
 * 
 * 處理方式 :
 * 1. 取得 cookie YuantaFontsize 紀錄的字體設定，分別為 0:原始大小 1:放大一級 2:放大二級
 * 2. 取得 .yContent 物件每個最底層的物件，並設定 class 名稱為 yElement，並透過 attribute data-ySize 紀錄原始字體大小
 * 3. 再透過 each 掃所有 .yElement 並依照預放大的級數進行處理
 * 
 * 注意事項 :
 * 1. 如果不是複製 #YFSTool 相關物件來進行字體放大縮小的話，不須載入 eYuantaSite.css
 * 2. 開放字體放大功能的區域虛設定 .yContent
 * 3. 因歷史包袱，有些底層物件並不是文字內容，可直接設定需放大縮小的物件為 .yElement
 * 4. 如果大區域開放放大功能，但其中某部分不開放的話，可以設定不開放的物件為 .notYuantaElt ，不開放的區域或物件都可設定
 * 
 * 使用參考 :
 * 1. yuanta.Portal\Views\Shared\_Header.cshtml
 * 2. yuanta.Portal\Views\Error\Index.cshtml
 * 
 * */
const YuantaFontSize = (function () {
    function YuantaFontSize() {
        window.YuantaFontSize = this;
        window.YuantaFontSize.elements = [];
        this.reloadYuantaEltSize();
        $('#YFSTool').show();
    };

    /*
     * 重設 cookie 設定的大小
     * */
    YuantaFontSize.prototype.reloadYuantaEltSize = function () {
        var _cookieFontsize = 0;
        if (isNaN(getCookie('YuantaFontsize')) === false) {
            if (getCookie('YuantaFontsize').trim() == '') {
                _cookieFontsize = 0;
            } else {
                _cookieFontsize = parseInt(getCookie('YuantaFontsize'));
            }
        };
        window.YuantaFontSize.setBodyClass(_cookieFontsize);
    };

    /*
     * 恢復預設字體大小
     * */
    YuantaFontSize.prototype.reYuantaEltSize = function () {
        window.YuantaFontSize.setBodyClass(0);
    };

    /*
     * 縮小字體大小
     * */
    YuantaFontSize.prototype.yuantaFontSize_ZoomOut = function (btn) {
        const _cookieFontsize = parseInt(getCookie('YuantaFontsize')) - 1;
        window.YuantaFontSize.setBodyClass(_cookieFontsize);
    };

    /*
     * 放大字體大小
     * */
    YuantaFontSize.prototype.yuantaFontSize_Enlarge = function (btn) {
        const _cookieFontsize = parseInt(getCookie('YuantaFontsize')) + 1;
        window.YuantaFontSize.setBodyClass(_cookieFontsize);
    };

    /*
     * 設定字體大小
     * */
    YuantaFontSize.prototype.setBodyClass = function (setSize) {
        //判斷是不是數字
        if (isNaN(parseInt(setSize)) == true) {
            return;
        };

        //判斷是否是增減極限
        if (setSize < 0 || setSize > 4) {
            if (setSize > 0) {
                setSize = 4;
            } else if (setSize < 0) {
                setSize = 0;
            }
        };

        setCookie('YuantaFontsize', setSize, 365);
        window.YuantaFontSize.load();
        $.each($('.yElement'), function (a, x) {
            const s = parseInt($(x).attr("data-ySize")) + setSize;
            $(x).css("fontSize", s);
        });
    };

    /*
     * 取得物件
     * */
    YuantaFontSize.prototype.load = function () {
        $.each($('.notYuantaElt'), function (a, b) {
            window.YuantaFontSize.setNotYuantaElt(b);
        });

        $.each($('.yContent *:not(.yElement, .notYuantaElt)'), function (a, b) {
            if ($(b.parentElement).hasClass('notYuantaElt') == false) {
                window.YuantaFontSize.getChildren(b);
            };
        });

        //額外設定 class 的物件 => 紀錄原始文字大小
        $.each($('.yElement:not([data-ySize])'), function (a, x) {
            const s = parseInt($(x).css("fontSize"));
            $(x).attr({ 'data-ySize': s });
        });
        $.each($('[data-ySize]:not(.yElement)'), function (a, x) {
            $(x).addClass('yElement');
        });
    };



    /*
     * 取得可放大縮小的物件
     * */
    YuantaFontSize.prototype.getChildren = function (e) {
        if ($(e).hasClass('yElement') == false && $(e).hasClass('notYuantaElt') == false && $(e)[0].hasAttribute('data-ysize') == false) {
            const s = parseInt($(e).css("fontSize"));
            $(e).addClass('yElement').attr({ 'data-ySize': s });
            if ($(e).children().length > 0 && $(e)[0].tagName.toUpperCase() != "SELECT" && $(e).find(':not(.notYuantaElt, .yElement)').length > 0) {
                $.each($(e).children(), function (a, x) {
                    window.YuantaFontSize.getChildren($(x));
                });
            };
        };
    };
    YuantaFontSize.prototype.setNotYuantaElt = function (e) {
        if ($(e).hasClass('notYuantaElt') == true) {
            if ($(e).children().length > 0 && $(e).find(':not(.notYuantaElt)').length > 0) {
                $.each($(e).children(), function (a, b) {
                    $(b).addClass('notYuantaElt');
                    window.YuantaFontSize.setNotYuantaElt(b);
                });
            };
        };
    };

    return YuantaFontSize;
}());

/*
 * 設定 cookie
 * */
const setCookie = function (cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/*
 * 取得 cookie
 * */
const getCookie = function (cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

