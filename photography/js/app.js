"use strict";
$(function() {
        FastClick.attach(document.body), svg4everybody()
    }),
    function(e) {
        function t() {
            localStorage.setItem("cookies", !0), e(".cookies").removeClass("cookies--visible")
        }
        var i = e("a, button, .cookies__cross-icon"),
            o = e(window),
            n = 400;
        localStorage.getItem("cookies") || e(".cookies").addClass("cookies--visible"), i.click(function() {
            t()
        }), o.scroll(function() {
            e(this).scrollTop() > n && t()
        })
    }(jQuery),
    function(e) {
        function t() {
            return e(window).width() > 1023 && e(window).height() > 840
        }
        e(".image-block__image").click(function() {
            if (t() && 0 !== e(this).parents(".slider__section--active").length) var i = e(this).offset().top,
                o = e(this).offset().left,
                n = e(this).get(0).getBoundingClientRect().height,
                s = e(this).get(0).getBoundingClientRect().width,
                c = e(this).attr("src"),
                a = s / n,
                r = e('<img class="image-block__full-screen-image">').attr("src", c).css("position", "absolute").css("top", i).css("left", o).css("height", n).appendTo("body").animate({
                    top: 0,
                    height: e(window).height(),
                    left: e(window).width() / 2 - e(window).height() * a / 2
                }, 300),
                l = e('<div class="image-block__full-screen-background">').appendTo("body").animate({
                    opacity: 1
                }, 200),
                d = e('<svg class="image-block__full-screen-close"><polygon fill-rule="evenodd" clip-rule="evenodd" points="16.264,2.122 14.142,0 8.132,6.01 2.121,0 0,2.121 6.01,8.132 0,14.142 2.122,16.264 8.132,10.253 14.142,16.264 16.264,14.142 10.253,8.132 "></polygon></svg>').css("left", e(".header__menu-icons").offset().left - 10).appendTo("body").click(function() {
                    l.animate({
                        opacity: 0
                    }, 300), r.animate({
                        opacity: 0
                    }, 300), d.animate({
                        opacity: 0
                    }, 300), setTimeout(function() {
                        l.remove(), r.remove(), d.remove()
                    }, 300)
                })
        })
    }(jQuery),
    function(e) {
        e(".header__menu").click(function() {
            e(".header__menu-icons").toggleClass("header__menu-icons--open"), e(".header__menu-text").toggleClass("header__menu-text--visible"), e(".menu").toggleClass("menu--visible"), e("body").toggleClass("body--no-scroll")
        })
    }(jQuery),
    function(e) {
        function t() {
            return e(window).width() > 1023 && e(window).height() > 840
        }

        function i() {
            var e = l.eq(h).find(".image-block"),
                t = d.find(".slider__current-caption");
            e.length > 0 ? t.html(e.find(".image-block__figcaption").html()) : t.html("")
        }

        function o() {
            var t = d.find(".slider__section--quote + .slider__section--quote"),
                i = 77;
            t.each(function(t, o) {
                var n = e(o),
                    s = e(".slider__section").eq(n.index() - 1).find(".text-block__quote-title").height();
                n.css("margin-top", i + s)
            })
        }

        function n() {
            var e = l.eq(h).attr("id");
            "undefined" != typeof e && (history.pushState ? history.pushState(null, null, "#" + e) : location.hash = "#" + e)
        }

        function s() {
            if (t()) {
                var s = d.width() / 12 * 3,
                    c = d.width() / 12 * 6;
                r.css("margin-left", s), r.css("width", c * l.length), l.css("width", c), u.css("width", d.width() / 12 * 3), i(), o(), n(), l.each(function(t, i) {
                    t >= h ? e(i).removeClass("slider__section--hidden") : e(i).addClass("slider__section--hidden")
                }), r.css("transform", "translateX(" + -h * c + "px)"), l.removeClass("slider__section--active"), l.eq(h).addClass("slider__section--active"), d.addClass("slider--initialized")
            } else r.attr("style", ""), u.attr("style", ""), l.attr("style", "")
        }

        function c() {
            return 0 === h ? void(window.location = e(".slider__button--previous").attr("href")) : (h--, void window.requestAnimationFrame(s))
        }

        function a() {
            return h + 1 >= l.length ? void(window.location = e(".slider__button--next").attr("href")) : (h++, void window.requestAnimationFrame(s))
        }
        var r = e(".slider__track"),
            l = e(".slider__section"),
            d = e(".slider"),
            u = e(".slider__header"),
            h = 0,
            f = 0;
        if (0 !== d.length) {
            e(".slider__button--previous").click(function() {
                return t() ? (c(), !1) : void 0
            }), e(".slider__button--next").click(function() {
                return t() ? (a(), !1) : void 0
            }), l.click(function(t) {
                var i = e(t.currentTarget).index();
                i !== h && (h = i, s())
            }), e(window).resize(function() {
                window.requestAnimationFrame(s)
            });
            var m = !1;
            if (m && (e(document).on("mousedown touchstart", ".slider", function(t) {
                    if (!(e(window).width() < 1024 || e(window).height() < 840)) {
                        var i = t.pageX || t.originalEvent.touches[0].pageX;
                        e(document).on("mousemove touchmove", ".slider", function(e) {
                            var t = e.pageX;
                            f = i - t, (f > 150 || 150 > f) && (e.stopPropagation(), e.preventDefault()), window.requestAnimationFrame(function() {
                                var e = -h * l.width() - f;
                                r.css("transform", "translateX(" + e + "px)")
                            })
                        })
                    }
                }), e(document).on("mouseup touchend", ".slider", function(t) {
                    e(document).off("mousemove touchmove"), console.log(f), f > 200 ? (a(), console.log()) : -150 > f ? c() : window.requestAnimationFrame(s)
                })), t() && "" != window.location.hash) {
                var _ = d.find(window.location.hash).index();
                h = _ > 0 ? _ : 0, r.css("transition-duration", "0s"), s(), setTimeout(function() {
                    r.css("transition-duration", "")
                })
            } else s()
        }
    }(jQuery);