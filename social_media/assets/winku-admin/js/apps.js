/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function (e) {
    e.fn.extend({
        slimScroll: function (f) {
            var a = e.extend({ width: "auto", height: "250px", size: "7px", color: "#000", position: "right", distance: "1px", start: "top", opacity: .4, alwaysVisible: !1, disableFadeOut: !1, railVisible: !1, railColor: "#333", railOpacity: .2, railDraggable: !0, railClass: "slimScrollRail", barClass: "slimScrollBar", wrapperClass: "slimScrollDiv", allowPageScroll: !1, wheelStep: 20, touchScrollStep: 200, borderRadius: "7px", railBorderRadius: "7px" }, f); this.each(function () {
                function v(d) {
                    if (r) {
                        d = d || window.event;
                        var c = 0; d.wheelDelta && (c = -d.wheelDelta / 120); d.detail && (c = d.detail / 3); e(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && n(c, !0); d.preventDefault && !k && d.preventDefault(); k || (d.returnValue = !1)
                    }
                } function n(d, g, e) {
                    k = !1; var f = b.outerHeight() - c.outerHeight(); g && (g = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), g = Math.min(Math.max(g, 0), f), g = 0 < d ? Math.ceil(g) : Math.floor(g), c.css({ top: g + "px" })); l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight()); g =
                        l * (b[0].scrollHeight - b.outerHeight()); e && (g = d, d = g / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), f), c.css({ top: d + "px" })); b.scrollTop(g); b.trigger("slimscrolling", ~~g); w(); p()
                } function x() { u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), 30); c.css({ height: u + "px" }); var a = u == b.outerHeight() ? "none" : "block"; c.css({ display: a }) } function w() {
                    x(); clearTimeout(B); l == ~~l ? (k = a.allowPageScroll, C != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1; C = l; u >= b.outerHeight() ? k = !0 : (c.stop(!0,
                        !0).fadeIn("fast"), a.railVisible && m.stop(!0, !0).fadeIn("fast"))
                } function p() { a.alwaysVisible || (B = setTimeout(function () { a.disableFadeOut && r || y || z || (c.fadeOut("slow"), m.fadeOut("slow")) }, 1E3)) } var r, y, z, B, A, u, l, C, k = !1, b = e(this); if (b.parent().hasClass(a.wrapperClass)) {
                    var q = b.scrollTop(), c = b.siblings("." + a.barClass), m = b.siblings("." + a.railClass); x(); if (e.isPlainObject(f)) {
                        if ("height" in f && "auto" == f.height) {
                            b.parent().css("height", "auto"); b.css("height", "auto"); var h = b.parent().parent().height(); b.parent().css("height",
                                h); b.css("height", h)
                        } else "height" in f && (h = f.height, b.parent().css("height", h), b.css("height", h)); if ("scrollTo" in f) q = parseInt(a.scrollTo); else if ("scrollBy" in f) q += parseInt(a.scrollBy); else if ("destroy" in f) { c.remove(); m.remove(); b.unwrap(); return } n(q, !1, !0)
                    }
                } else if (!(e.isPlainObject(f) && "destroy" in f)) {
                    a.height = "auto" == a.height ? b.parent().height() : a.height; q = e("<div></div>").addClass(a.wrapperClass).css({ position: "relative", overflow: "hidden", width: a.width, height: a.height }); b.css({
                        overflow: "hidden",
                        width: a.width, height: a.height
                    }); var m = e("<div></div>").addClass(a.railClass).css({ width: a.size, height: "100%", position: "absolute", top: 0, display: a.alwaysVisible && a.railVisible ? "block" : "none", "border-radius": a.railBorderRadius, background: a.railColor, opacity: a.railOpacity, zIndex: 90 }), c = e("<div></div>").addClass(a.barClass).css({
                        background: a.color, width: a.size, position: "absolute", top: 0, opacity: a.opacity, display: a.alwaysVisible ? "block" : "none", "border-radius": a.borderRadius, BorderRadius: a.borderRadius, MozBorderRadius: a.borderRadius,
                        WebkitBorderRadius: a.borderRadius, zIndex: 99
                    }), h = "left" == a.position ? { right: a.distance } : { left: a.distance }; m.css(h); c.css(h); b.wrap(q); b.parent().append(c); b.parent().append(m); a.railDraggable && c.bind("mousedown", function (a) { var b = e(document); z = !0; t = parseFloat(c.css("top")); pageY = a.pageY; b.bind("mousemove.slimscroll", function (a) { currTop = t + a.pageY - pageY; c.css("top", currTop); n(0, c.position().top, !1) }); b.bind("mouseup.slimscroll", function (a) { z = !1; p(); b.unbind(".slimscroll") }); return !1 }).bind("selectstart.slimscroll",
                        function (a) { a.stopPropagation(); a.preventDefault(); return !1 }); m.hover(function () { w() }, function () { p() }); c.hover(function () { y = !0 }, function () { y = !1 }); b.hover(function () { r = !0; w(); p() }, function () { r = !1; p() }); b.bind("touchstart", function (a, b) { a.originalEvent.touches.length && (A = a.originalEvent.touches[0].pageY) }); b.bind("touchmove", function (b) { k || b.originalEvent.preventDefault(); b.originalEvent.touches.length && (n((A - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), A = b.originalEvent.touches[0].pageY) });
                    x(); "bottom" === a.start ? (c.css({ top: b.outerHeight() - c.outerHeight() }), n(0, !0)) : "top" !== a.start && (n(e(a.start).position().top, null, !0), a.alwaysVisible || c.hide()); window.addEventListener ? (this.addEventListener("DOMMouseScroll", v, !1), this.addEventListener("mousewheel", v, !1)) : document.attachEvent("onmousewheel", v)
                }
            }); return this
        }
    }); e.fn.extend({ slimscroll: e.fn.slimScroll })
})(jQuery);





/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) { e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery) }(window, function (t, e) { "use strict"; function i(i, s, a) { function u(t, e, n) { var o, s = "$()." + i + '("' + e + '")'; return t.each(function (t, u) { var h = a.data(u, i); if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s); var d = h[e]; if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method"); var l = d.apply(h, n); o = void 0 === o ? l : o }), void 0 !== o ? o : t } function h(t, e) { t.each(function (t, n) { var o = a.data(n, i); o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o)) }) } a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function (t) { a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t)) }), a.fn[i] = function (t) { if ("string" == typeof t) { var e = o.call(arguments, 1); return u(this, t, e) } return h(this, t), this }, n(a)) } function n(t) { !t || t && t.bridget || (t.bridget = i) } var o = Array.prototype.slice, s = t.console, r = "undefined" == typeof s ? function () { } : function (t) { s.error(t) }; return n(e || t.jQuery), i }), function (t, e) { "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e() }("undefined" != typeof window ? window : this, function () { function t() { } var e = t.prototype; return e.on = function (t, e) { if (t && e) { var i = this._events = this._events || {}, n = i[t] = i[t] || []; return -1 == n.indexOf(e) && n.push(e), this } }, e.once = function (t, e) { if (t && e) { this.on(t, e); var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {}; return n[e] = !0, this } }, e.off = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = i.indexOf(e); return -1 != n && i.splice(n, 1), this } }, e.emitEvent = function (t, e) { var i = this._events && this._events[t]; if (i && i.length) { var n = 0, o = i[n]; e = e || []; for (var s = this._onceEvents && this._onceEvents[t]; o;) { var r = s && s[o]; r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n] } return this } }, t }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("get-size/get-size", [], function () { return e() }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e() }(window, function () { "use strict"; function t(t) { var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e); return i && e } function e() { } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0; h > e; e++) { var i = u[e]; t[i] = 0 } return t } function n(t) { var e = getComputedStyle(t); return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e } function o() { if (!d) { d = !0; var e = document.createElement("div"); e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box"; var i = document.body || document.documentElement; i.appendChild(e); var o = n(e); s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e) } } function s(e) { if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) { var s = n(e); if ("none" == s.display) return i(); var a = {}; a.width = e.offsetWidth, a.height = e.offsetHeight; for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; h > l; l++) { var f = u[l], c = s[f], m = parseFloat(c); a[f] = isNaN(m) ? 0 : m } var p = a.paddingLeft + a.paddingRight, y = a.paddingTop + a.paddingBottom, g = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom, _ = a.borderLeftWidth + a.borderRightWidth, I = a.borderTopWidth + a.borderBottomWidth, z = d && r, x = t(s.width); x !== !1 && (a.width = x + (z ? 0 : p + _)); var S = t(s.height); return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a } } var r, a = "undefined" == typeof console ? e : function (t) { console.error(t) }, u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], h = u.length, d = !1; return s }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e() }(window, function () { "use strict"; var t = function () { var t = Element.prototype; if (t.matches) return "matches"; if (t.matchesSelector) return "matchesSelector"; for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) { var n = e[i], o = n + "MatchesSelector"; if (t[o]) return o } }(); return function (e, i) { return e[t](i) } }), function (t, e) { "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) { return e(t, i) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector) }(window, function (t, e) { var i = {}; i.extend = function (t, e) { for (var i in e) t[i] = e[i]; return t }, i.modulo = function (t, e) { return (t % e + e) % e }, i.makeArray = function (t) { var e = []; if (Array.isArray(t)) e = t; else if (t && "number" == typeof t.length) for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t); return e }, i.removeFrom = function (t, e) { var i = t.indexOf(e); -1 != i && t.splice(i, 1) }, i.getParent = function (t, i) { for (; t != document.body;)if (t = t.parentNode, e(t, i)) return t }, i.getQueryElement = function (t) { return "string" == typeof t ? document.querySelector(t) : t }, i.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, i.filterFindElements = function (t, n) { t = i.makeArray(t); var o = []; return t.forEach(function (t) { if (t instanceof HTMLElement) { if (!n) return void o.push(t); e(t, n) && o.push(t); for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++)o.push(i[s]) } }), o }, i.debounceMethod = function (t, e, i) { var n = t.prototype[e], o = e + "Timeout"; t.prototype[e] = function () { var t = this[o]; t && clearTimeout(t); var e = arguments, s = this; this[o] = setTimeout(function () { n.apply(s, e), delete s[o] }, i || 100) } }, i.docReady = function (t) { var e = document.readyState; "complete" == e || "interactive" == e ? t() : document.addEventListener("DOMContentLoaded", t) }, i.toDashed = function (t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() }; var n = t.console; return i.htmlInit = function (e, o) { i.docReady(function () { var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"), u = document.querySelectorAll(".js-" + s), h = i.makeArray(a).concat(i.makeArray(u)), d = r + "-options", l = t.jQuery; h.forEach(function (t) { var i, s = t.getAttribute(r) || t.getAttribute(d); try { i = s && JSON.parse(s) } catch (a) { return void (n && n.error("Error parsing " + r + " on " + t.className + ": " + a)) } var u = new e(t, i); l && l.data(t, o, u) }) }) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize)) }(window, function (t, e) { "use strict"; function i(t) { for (var e in t) return !1; return e = null, !0 } function n(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } function o(t) { return t.replace(/([A-Z])/g, function (t) { return "-" + t.toLowerCase() }) } var s = document.documentElement.style, r = "string" == typeof s.transition ? "transition" : "WebkitTransition", a = "string" == typeof s.transform ? "transform" : "WebkitTransform", u = { WebkitTransition: "webkitTransitionEnd", transition: "transitionend" }[r], h = { transform: a, transition: r, transitionDuration: r + "Duration", transitionProperty: r + "Property", transitionDelay: r + "Delay" }, d = n.prototype = Object.create(t.prototype); d.constructor = n, d._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, d.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, d.getSize = function () { this.size = e(this.element) }, d.css = function (t) { var e = this.element.style; for (var i in t) { var n = h[i] || i; e[n] = t[i] } }, d.getPosition = function () { var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], s = this.layout.size, r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10), a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10); r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a }, d.layoutPosition = function () { var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right", r = i ? "right" : "left", a = this.position.x + t[o]; e[s] = this.getXValue(a), e[r] = ""; var u = n ? "paddingTop" : "paddingBottom", h = n ? "top" : "bottom", d = n ? "bottom" : "top", l = this.position.y + t[u]; e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this]) }, d.getXValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px" }, d.getYValue = function (t) { var e = this.layout._getOption("horizontal"); return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px" }, d._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, n = this.position.y, o = parseInt(t, 10), s = parseInt(e, 10), r = o === this.position.x && s === this.position.y; if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition(); var a = t - i, u = e - n, h = {}; h.transform = this.getTranslate(a, u), this.transition({ to: h, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, d.getTranslate = function (t, e) { var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"); return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)" }, d.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, d._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to); for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this) }, d.transition = function (t) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t); var e = this._transn; for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i]; for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0); if (t.from) { this.css(t.from); var n = this.element.offsetHeight; n = null } this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0 }; var l = "opacity," + o(a); d.enableTransition = function () { if (!this.isTransitioning) { var t = this.layout.options.transitionDuration; t = "number" == typeof t ? t + "ms" : t, this.css({ transitionProperty: l, transitionDuration: t, transitionDelay: this.staggerDelay || 0 }), this.element.addEventListener(u, this, !1) } }, d.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, d.onotransitionend = function (t) { this.ontransitionend(t) }; var f = { "-webkit-transform": "transform" }; d.ontransitionend = function (t) { if (t.target === this.element) { var e = this._transn, n = f[t.propertyName] || t.propertyName; if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) { var o = e.onEnd[n]; o.call(this), delete e.onEnd[n] } this.emitEvent("transitionEnd", [this]) } }, d.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1 }, d._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var c = { transitionProperty: "", transitionDuration: "", transitionDelay: "" }; return d.removeTransitionStyles = function () { this.css(c) }, d.stagger = function (t) { t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms" }, d.removeElem = function () { this.element.parentNode.removeChild(this.element), this.css({ display: "" }), this.emitEvent("remove", [this]) }, d.remove = function () { return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () { this.removeElem() }), void this.hide()) : void this.removeElem() }, d.reveal = function () { delete this.isHidden, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle"); e[i] = this.onRevealTransitionEnd, this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onRevealTransitionEnd = function () { this.isHidden || this.emitEvent("reveal") }, d.getHideRevealTransitionEndProperty = function (t) { var e = this.layout.options[t]; if (e.opacity) return "opacity"; for (var i in e) return i }, d.hide = function () { this.isHidden = !0, this.css({ display: "" }); var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle"); e[i] = this.onHideTransitionEnd, this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: e }) }, d.onHideTransitionEnd = function () { this.isHidden && (this.css({ display: "none" }), this.emitEvent("hide")) }, d.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, n }), function (t, e) { "use strict"; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, s) { return e(t, i, n, o, s) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item) }(window, function (t, e, i, n, o) { "use strict"; function s(t, e) { var i = n.getQueryElement(t); if (!i) return void (u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t))); this.element = i, h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e); var o = ++l; this.element.outlayerGUID = o, f[o] = this, this._create(); var s = this._getOption("initLayout"); s && this.layout() } function r(t) { function e() { t.apply(this, arguments) } return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e } function a(t) { if ("number" == typeof t) return t; var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2]; if (!i.length) return 0; i = parseFloat(i); var o = m[n] || 1; return i * o } var u = t.console, h = t.jQuery, d = function () { }, l = 0, f = {}; s.namespace = "outlayer", s.Item = o, s.defaults = { containerStyle: { position: "relative" }, initLayout: !0, originLeft: !0, originTop: !0, resize: !0, resizeContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }; var c = s.prototype; n.extend(c, e.prototype), c.option = function (t) { n.extend(this.options, t) }, c._getOption = function (t) { var e = this.constructor.compatOptions[t]; return e && void 0 !== this.options[e] ? this.options[e] : this.options[t] }, s.compatOptions = { initLayout: "isInitLayout", horizontal: "isHorizontal", layoutInstant: "isLayoutInstant", originLeft: "isOriginLeft", originTop: "isOriginTop", resize: "isResizeBound", resizeContainer: "isResizingContainer" }, c._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle); var t = this._getOption("resize"); t && this.bindResize() }, c.reloadItems = function () { this.items = this._itemize(this.element.children) }, c._itemize = function (t) { for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) { var s = e[o], r = new i(s, this); n.push(r) } return n }, c._filterFindItemElements = function (t) { return n.filterFindElements(t, this.options.itemSelector) }, c.getItemElements = function () { return this.items.map(function (t) { return t.element }) }, c.layout = function () { this._resetLayout(), this._manageStamps(); var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; this.layoutItems(this.items, e), this._isLayoutInited = !0 }, c._init = c.layout, c._resetLayout = function () { this.getSize() }, c.getSize = function () { this.size = i(this.element) }, c._getMeasurement = function (t, e) { var n, o = this.options[t]; o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0 }, c.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, c._getItemsForLayout = function (t) { return t.filter(function (t) { return !t.isIgnored }) }, c._layoutItems = function (t, e) { if (this._emitCompleteOnItems("layout", t), t && t.length) { var i = []; t.forEach(function (t) { var n = this._getItemLayoutPosition(t); n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n) }, this), this._processLayoutQueue(i) } }, c._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, c._processLayoutQueue = function (t) { this.updateStagger(), t.forEach(function (t, e) { this._positionItem(t.item, t.x, t.y, t.isInstant, e) }, this) }, c.updateStagger = function () { var t = this.options.stagger; return null === t || void 0 === t ? void (this.stagger = 0) : (this.stagger = a(t), this.stagger) }, c._positionItem = function (t, e, i, n, o) { n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i)) }, c._postLayout = function () { this.resizeContainer() }, c.resizeContainer = function () { var t = this._getOption("resizeContainer"); if (t) { var e = this._getContainerSize(); e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1)) } }, c._getContainerSize = d, c._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, c._emitCompleteOnItems = function (t, e) { function i() { o.dispatchEvent(t + "Complete", null, [e]) } function n() { r++, r == s && i() } var o = this, s = e.length; if (!e || !s) return void i(); var r = 0; e.forEach(function (e) { e.once(t, n) }) }, c.dispatchEvent = function (t, e, i) { var n = e ? [e].concat(i) : i; if (this.emitEvent(t, n), h) if (this.$element = this.$element || h(this.element), e) { var o = h.Event(e); o.type = t, this.$element.trigger(o, i) } else this.$element.trigger(t, i) }, c.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, c.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, c.stamp = function (t) { t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this)) }, c.unstamp = function (t) { t = this._find(t), t && t.forEach(function (t) { n.removeFrom(this.stamps, t), this.unignore(t) }, this) }, c._find = function (t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0 }, c._manageStamps = function () { this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this)) }, c._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, c._manageStamp = d, c._getElementOffset = function (t) { var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t), s = { left: e.left - n.left - o.marginLeft, top: e.top - n.top - o.marginTop, right: n.right - e.right - o.marginRight, bottom: n.bottom - e.bottom - o.marginBottom }; return s }, c.handleEvent = n.handleEvent, c.bindResize = function () { t.addEventListener("resize", this), this.isResizeBound = !0 }, c.unbindResize = function () { t.removeEventListener("resize", this), this.isResizeBound = !1 }, c.onresize = function () { this.resize() }, n.debounceMethod(s, "onresize", 100), c.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, c.needsResizeLayout = function () { var t = i(this.element), e = this.size && t; return e && t.innerWidth !== this.size.innerWidth }, c.addItems = function (t) { var e = this._itemize(t); return e.length && (this.items = this.items.concat(e)), e }, c.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, c.prepended = function (t) { var e = this._itemize(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, c.reveal = function (t) { if (this._emitCompleteOnItems("reveal", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.reveal() }) } }, c.hide = function (t) { if (this._emitCompleteOnItems("hide", t), t && t.length) { var e = this.updateStagger(); t.forEach(function (t, i) { t.stagger(i * e), t.hide() }) } }, c.revealItemElements = function (t) { var e = this.getItems(t); this.reveal(e) }, c.hideItemElements = function (t) { var e = this.getItems(t); this.hide(e) }, c.getItem = function (t) { for (var e = 0; e < this.items.length; e++) { var i = this.items[e]; if (i.element == t) return i } }, c.getItems = function (t) { t = n.makeArray(t); var e = []; return t.forEach(function (t) { var i = this.getItem(t); i && e.push(i) }, this), e }, c.remove = function (t) { var e = this.getItems(t); this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) { t.remove(), n.removeFrom(this.items, t) }, this) }, c.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) { t.destroy() }), this.unbindResize(); var e = this.element.outlayerGUID; delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace) }, s.data = function (t) { t = n.getQueryElement(t); var e = t && t.outlayerGUID; return e && f[e] }, s.create = function (t, e) { var i = r(s); return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i }; var m = { ms: 1, s: 1e3 }; return s.Item = o, s }), function (t, e) { "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer)) }(window, function (t) { "use strict"; function e() { t.Item.apply(this, arguments) } var i = e.prototype = Object.create(t.Item.prototype), n = i._create; i._create = function () { this.id = this.layout.itemGUID++, n.call(this), this.sortData = {} }, i.updateSortData = function () { if (!this.isIgnored) { this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random(); var t = this.layout.options.getSortData, e = this.layout._sorters; for (var i in t) { var n = e[i]; this.sortData[i] = n(this.element, this) } } }; var o = i.destroy; return i.destroy = function () { o.apply(this, arguments), this.css({ display: "" }) }, e }), function (t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)) }(window, function (t, e) { "use strict"; function i(t) { this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size) } var n = i.prototype, o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"]; return o.forEach(function (t) { n[t] = function () { return e.prototype[t].apply(this.isotope, arguments) } }), n.needsVerticalResizeLayout = function () { var e = t(this.isotope.element), i = this.isotope.size && e; return i && e.innerHeight != this.isotope.size.innerHeight }, n._getMeasurement = function () { this.isotope._getMeasurement.apply(this, arguments) }, n.getColumnWidth = function () { this.getSegmentSize("column", "Width") }, n.getRowHeight = function () { this.getSegmentSize("row", "Height") }, n.getSegmentSize = function (t, e) { var i = t + e, n = "outer" + e; if (this._getMeasurement(i, n), !this[i]) { var o = this.getFirstItemSize(); this[i] = o && o[n] || this.isotope.size["inner" + e] } }, n.getFirstItemSize = function () { var e = this.isotope.filteredItems[0]; return e && e.element && t(e.element) }, n.layout = function () { this.isotope.layout.apply(this.isotope, arguments) }, n.getSize = function () { this.isotope.getSize(), this.size = this.isotope.size }, i.modes = {}, i.create = function (t, e) { function o() { i.apply(this, arguments) } return o.prototype = Object.create(n), o.prototype.constructor = o, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o }, i }), function (t, e) { "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize) }(window, function (t, e) { var i = t.create("masonry"); return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = []; for (var t = 0; t < this.cols; t++)this.colYs.push(0); this.maxY = 0 }, i.prototype.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var t = this.items[0], i = t && t.element; this.columnWidth = i && e(i).outerWidth || this.containerWidth } var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, s = o / n, r = n - o % n, a = r && 1 > r ? "round" : "floor"; s = Math[a](s), this.cols = Math.max(s, 1) }, i.prototype.getContainerWidth = function () { var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i); this.containerWidth = n && n.innerWidth }, i.prototype._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil", n = Math[i](t.size.outerWidth / this.columnWidth); n = Math.min(n, this.cols); for (var o = this._getColGroup(n), s = Math.min.apply(Math, o), r = o.indexOf(s), a = { x: this.columnWidth * r, y: s }, u = s + t.size.outerHeight, h = this.cols + 1 - o.length, d = 0; h > d; d++)this.colYs[r + d] = u; return a }, i.prototype._getColGroup = function (t) { if (2 > t) return this.colYs; for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) { var o = this.colYs.slice(n, n + t); e[n] = Math.max.apply(Math, o) } return e }, i.prototype._manageStamp = function (t) { var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), s = o ? n.left : n.right, r = s + i.outerWidth, a = Math.floor(s / this.columnWidth); a = Math.max(0, a); var u = Math.floor(r / this.columnWidth); u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u); for (var h = this._getOption("originTop"), d = (h ? n.top : n.bottom) + i.outerHeight, l = a; u >= l; l++)this.colYs[l] = Math.max(d, this.colYs[l]) }, i.prototype._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var t = { height: this.maxY }; return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t }, i.prototype._getContainerFitWidth = function () { for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++; return (this.cols - t) * this.columnWidth - this.gutter }, i.prototype.needsResizeLayout = function () { var t = this.containerWidth; return this.getContainerWidth(), t != this.containerWidth }, i }), function (t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry) }(window, function (t, e) { "use strict"; var i = t.create("masonry"), n = i.prototype, o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 }; for (var s in e.prototype) o[s] || (n[s] = e.prototype[s]); var r = n.measureColumns; n.measureColumns = function () { this.items = this.isotope.filteredItems, r.call(this) }; var a = n._getOption; return n._getOption = function (t) { return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments) }, i }), function (t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function (t) { "use strict"; var e = t.create("fitRows"), i = e.prototype; return i._resetLayout = function () { this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth") }, i._getItemLayoutPosition = function (t) { t.getSize(); var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter; 0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY); var n = { x: this.x, y: this.y }; return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n }, i._getContainerSize = function () { return { height: this.maxY } }, e }), function (t, e) { "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode) }(window, function (t) { "use strict"; var e = t.create("vertical", { horizontalAlignment: 0 }), i = e.prototype; return i._resetLayout = function () { this.y = 0 }, i._getItemLayoutPosition = function (t) { t.getSize(); var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y; return this.y += t.size.outerHeight, { x: e, y: i } }, i._getContainerSize = function () { return { height: this.y } }, e }), function (t, e) { "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, o, s, r, a) { return e(t, i, n, o, s, r, a) }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode) }(window, function (t, e, i, n, o, s, r) {
    function a(t, e) { return function (i, n) { for (var o = 0; o < t.length; o++) { var s = t[o], r = i.sortData[s], a = n.sortData[s]; if (r > a || a > r) { var u = void 0 !== e[s] ? e[s] : e, h = u ? 1 : -1; return (r > a ? 1 : -1) * h } } return 0 } } var u = t.jQuery, h = String.prototype.trim ? function (t) { return t.trim() } : function (t) { return t.replace(/^\s+|\s+$/g, "") }, d = e.create("isotope", { layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0 }); d.Item = s, d.LayoutMode = r; var l = d.prototype; l._create = function () { this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"]; for (var t in r.modes) this._initLayoutMode(t) }, l.reloadItems = function () { this.itemGUID = 0, e.prototype.reloadItems.call(this) }, l._itemize = function () { for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) { var n = t[i]; n.id = this.itemGUID++ } return this._updateItemsSortData(t), t }, l._initLayoutMode = function (t) { var e = r.modes[t], i = this.options[t] || {}; this.options[t] = e.options ? o.extend(e.options, i) : i, this.modes[t] = new e(this) }, l.layout = function () { return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout() }, l._layout = function () { var t = this._getIsInstant(); this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0 }, l.arrange = function (t) { this.option(t), this._getIsInstant(); var e = this._filter(this.items); this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout() }, l._init = l.arrange, l._hideReveal = function (t) { this.reveal(t.needReveal), this.hide(t.needHide) }, l._getIsInstant = function () { var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited; return this._isInstant = e, e }, l._bindArrangeComplete = function () { function t() { e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems]) } var e, i, n, o = this; this.once("layoutComplete", function () { e = !0, t() }), this.once("hideComplete", function () { i = !0, t() }), this.once("revealComplete", function () { n = !0, t() }) }, l._filter = function (t) { var e = this.options.filter; e = e || "*"; for (var i = [], n = [], o = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) { var a = t[r]; if (!a.isIgnored) { var u = s(a); u && i.push(a), u && a.isHidden ? n.push(a) : u || a.isHidden || o.push(a) } } return { matches: i, needReveal: n, needHide: o } }, l._getFilterTest = function (t) { return u && this.options.isJQueryFiltering ? function (e) { return u(e.element).is(t) } : "function" == typeof t ? function (e) { return t(e.element) } : function (e) { return n(e.element, t) } }, l.updateSortData = function (t) { var e; t ? (t = o.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e) }, l._getSorters = function () { var t = this.options.getSortData; for (var e in t) { var i = t[e]; this._sorters[e] = f(i) } }, l._updateItemsSortData = function (t) { for (var e = t && t.length, i = 0; e && e > i; i++) { var n = t[i]; n.updateSortData() } }; var f = function () {
        function t(t) {
            if ("string" != typeof t) return t; var i = h(t).split(" "), n = i[0], o = n.match(/^\[(.+)\]$/), s = o && o[1], r = e(s, n), a = d.sortDataParsers[i[1]];
            return t = a ? function (t) { return t && a(r(t)) } : function (t) { return t && r(t) }
        } function e(t, e) { return t ? function (e) { return e.getAttribute(t) } : function (t) { var i = t.querySelector(e); return i && i.textContent } } return t
    }(); d.sortDataParsers = { parseInt: function (t) { return parseInt(t, 10) }, parseFloat: function (t) { return parseFloat(t) } }, l._sort = function () { var t = this.options.sortBy; if (t) { var e = [].concat.apply(t, this.sortHistory), i = a(e, this.options.sortAscending); this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t) } }, l._mode = function () { var t = this.options.layoutMode, e = this.modes[t]; if (!e) throw new Error("No layout mode: " + t); return e.options = this.options[t], e }, l._resetLayout = function () { e.prototype._resetLayout.call(this), this._mode()._resetLayout() }, l._getItemLayoutPosition = function (t) { return this._mode()._getItemLayoutPosition(t) }, l._manageStamp = function (t) { this._mode()._manageStamp(t) }, l._getContainerSize = function () { return this._mode()._getContainerSize() }, l.needsResizeLayout = function () { return this._mode().needsResizeLayout() }, l.appended = function (t) { var e = this.addItems(t); if (e.length) { var i = this._filterRevealAdded(e); this.filteredItems = this.filteredItems.concat(i) } }, l.prepended = function (t) { var e = this._itemize(t); if (e.length) { this._resetLayout(), this._manageStamps(); var i = this._filterRevealAdded(e); this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items) } }, l._filterRevealAdded = function (t) { var e = this._filter(t); return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches }, l.insert = function (t) { var e = this.addItems(t); if (e.length) { var i, n, o = e.length; for (i = 0; o > i; i++)n = e[i], this.element.appendChild(n.element); var s = this._filter(e).matches; for (i = 0; o > i; i++)e[i].isLayoutInstant = !0; for (this.arrange(), i = 0; o > i; i++)delete e[i].isLayoutInstant; this.reveal(s) } }; var c = l.remove; return l.remove = function (t) { t = o.makeArray(t); var e = this.getItems(t); c.call(this, t); for (var i = e && e.length, n = 0; i && i > n; n++) { var s = e[n]; o.removeFrom(this.filteredItems, s) } }, l.shuffle = function () { for (var t = 0; t < this.items.length; t++) { var e = this.items[t]; e.sortData.random = Math.random() } this.options.sortBy = "random", this._sort(), this._layout() }, l._noTransition = function (t, e) { var i = this.options.transitionDuration; this.options.transitionDuration = 0; var n = t.apply(this, e); return this.options.transitionDuration = i, n }, l.getFilteredItemElements = function () { return this.filteredItems.map(function (t) { return t.element }) }, d
});




/*===== Owl Carousel =====*/
!function (a, b, c, d) { function e(b, c) { this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function (a, b) { this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this) }, this)), a.each(e.Pipe, a.proxy(function (b, c) { this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) }) }, this)), this.setup(), this.initialize() } function f(a) { if (a.touches !== d) return { x: a.touches[0].pageX, y: a.touches[0].pageY }; if (a.touches === d) { if (a.pageX !== d) return { x: a.pageX, y: a.pageY }; if (a.pageX === d) return { x: a.clientX, y: a.clientY } } } function g(a) { var b, d, e = c.createElement("div"), f = a; for (b in f) if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b]; return [!1] } function h() { return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1] } function i() { return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0] } function j() { return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0] } function k() { return "ontouchstart" in b || !!navigator.msMaxTouchPoints } function l() { return b.navigator.msPointerEnabled } var m, n, o; m = { start: 0, startX: 0, startY: 0, current: 0, currentX: 0, currentY: 0, offsetX: 0, offsetY: 0, distance: null, startTime: 0, endTime: 0, updatedX: 0, targetEl: null }, n = { isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1 }, o = { _onDragStart: null, _onDragMove: null, _onDragEnd: null, _transitionEnd: null, _resizer: null, _responsiveCall: null, _goToLoop: null, _checkVisibile: null }, e.Defaults = { items: 3, loop: !1, center: !1, mouseDrag: !0, touchDrag: !0, pullDrag: !0, freeDrag: !1, margin: 0, stagePadding: 0, merge: !1, mergeFit: !0, autoWidth: !1, startPosition: 0, rtl: !1, smartSpeed: 250, fluidSpeed: !1, dragEndSpeed: !1, responsive: {}, responsiveRefreshRate: 200, responsiveBaseElement: b, responsiveClass: !1, fallbackEasing: "swing", info: !1, nestedItemSelector: !1, itemElement: "div", stageElement: "div", themeClass: "owl-theme", baseClass: "owl-carousel", itemClass: "owl-item", centerClass: "center", activeClass: "active" }, e.Width = { Default: "default", Inner: "inner", Outer: "outer" }, e.Plugins = {}, e.Pipe = [{ filter: ["width", "items", "settings"], run: function (a) { a.current = this._items && this._items[this.relative(this._current)] } }, { filter: ["items", "settings"], run: function () { var a = this._clones, b = this.$stage.children(".cloned"); (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = []) } }, { filter: ["items", "settings"], run: function () { var a, b, c = this._clones, d = this._items, e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0; for (a = 0, b = Math.abs(e / 2); b > a; a++)e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned"))) } }, { filter: ["width", "items", "settings"], run: function () { var a, b, c, d = this.settings.rtl ? 1 : -1, e = (this.width() / this.settings.items).toFixed(3), f = 0; for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++)a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f) } }, { filter: ["width", "items", "settings"], run: function () { var b, c, d = (this.width() / this.settings.items).toFixed(3), e = { width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding, "padding-left": this.settings.stagePadding || "", "padding-right": this.settings.stagePadding || "" }; if (this.$stage.css(e), e = { width: this.settings.autoWidth ? "auto" : d - this.settings.margin }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function (a) { return a > 1 }).length > 0) for (b = 0, c = this._coordinates.length; c > b; b++)e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e); else this.$stage.children().css(e) } }, { filter: ["width", "items", "settings"], run: function (a) { a.current && this.reset(this.$stage.children().index(a.current)) } }, { filter: ["position"], run: function () { this.animate(this.coordinates(this._current)) } }, { filter: ["width", "position", "items", "settings"], run: function () { var a, b, c, d, e = this.settings.rtl ? 1 : -1, f = 2 * this.settings.stagePadding, g = this.coordinates(this.current()) + f, h = g + this.width() * e, i = []; for (c = 0, d = this._coordinates.length; d > c; c++)a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c); this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass)) } }], e.prototype.initialize = function () { if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) { var b, c, e; if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1 } this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized") }, e.prototype.setup = function () { var b = this.viewport(), c = this.options.responsive, d = -1, e = null; c ? (a.each(c, function (a) { b >= a && a > d && (d = Number(a)) }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function (a, b) { return b.replace(/\b owl-responsive-\S+/g, "") }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", { property: { name: "settings", value: e } }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", { property: { name: "settings", value: this.settings } })) }, e.prototype.optionsLogic = function () { this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1) }, e.prototype.prepare = function (b) { var c = this.trigger("prepare", { content: b }); return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", { content: c.data }), c.data }, e.prototype.update = function () { for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) { return this[a] }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++; this._invalidated = {} }, e.prototype.width = function (a) { switch (a = a || e.Width.Default) { case e.Width.Inner: case e.Width.Outer: return this._width; default: return this._width - 2 * this.settings.stagePadding + this.settings.margin } }, e.prototype.refresh = function () { if (0 === this._items.length) return !1; (new Date).getTime(); this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed") }, e.prototype.eventsCall = function () { this.e._onDragStart = a.proxy(function (a) { this.onDragStart(a) }, this), this.e._onDragMove = a.proxy(function (a) { this.onDragMove(a) }, this), this.e._onDragEnd = a.proxy(function (a) { this.onDragEnd(a) }, this), this.e._onResize = a.proxy(function (a) { this.onResize(a) }, this), this.e._transitionEnd = a.proxy(function (a) { this.transitionEnd(a) }, this), this.e._preventClick = a.proxy(function (a) { this.preventClick(a) }, this) }, e.prototype.onThrottledResize = function () { b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate) }, e.prototype.onResize = function () { return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1 }, e.prototype.eventsRouter = function (a) { var b = a.type; "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a) }, e.prototype.internalEvents = function () { var c = (k(), l()); this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function (a) { this.eventsRouter(a) }, this)), this.$stage.on("dragstart", function () { return !1 }), this.$stage.get(0).onselectstart = function () { return !1 }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function (a) { this.eventsRouter(a) }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this)) }, e.prototype.onDragStart = function (d) { var e, g, h, i; if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1; if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0; else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1; this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function (a) { this.eventsRouter(a) }, this)) }, e.prototype.onDragMove = function (a) { var c, e, g, h, i, j; this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX))) }, e.prototype.onDragEnd = function (b) { var d, e, f; if (this.state.isTouch) { if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1; this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents") } }, e.prototype.removeClick = function (c) { this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function () { a(c).off("click.preventClick") }, 300) }, e.prototype.preventClick = function (b) { b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick") }, e.prototype.getTransformProperty = function () { var a, c; return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12] }, e.prototype.closest = function (b) { var c = -1, d = 30, e = this.width(), f = this.coordinates(); return this.settings.freeDrag || a.each(f, a.proxy(function (a, g) { return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c }, e.prototype.animate = function (b) { this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({ transform: "translate3d(" + b + "px,0px, 0px)", transition: this.speed() / 1e3 + "s" }) : this.state.isTouch ? this.$stage.css({ left: b + "px" }) : this.$stage.animate({ left: b }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function () { this.state.inMotion && this.transitionEnd() }, this)) }, e.prototype.current = function (a) { if (a === d) return this._current; if (0 === this._items.length) return d; if (a = this.normalize(a), this._current !== a) { var b = this.trigger("change", { property: { name: "position", value: a } }); b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", { property: { name: "position", value: this._current } }) } return this._current }, e.prototype.invalidate = function (a) { this._invalidated[a] = !0 }, e.prototype.reset = function (a) { a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"])) }, e.prototype.normalize = function (b, c) { var e = c ? this._items.length : this._items.length + this._clones.length; return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b)) }, e.prototype.relative = function (a) { return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0) }, e.prototype.maximum = function (a) { var b, c, d, e = 0, f = this.settings; if (a) return this._items.length - 1; if (!f.loop && f.center) b = this._items.length - 1; else if (f.loop || f.center) if (f.loop || f.center) b = this._items.length + f.items; else { if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position."; for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width(); (d = this.coordinates(e)) && !(d * revert >= c);)b = ++e } else b = this._items.length - f.items; return b }, e.prototype.minimum = function (a) { return a ? 0 : this._clones.length / 2 }, e.prototype.items = function (a) { return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]) }, e.prototype.mergers = function (a) { return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]) }, e.prototype.clones = function (b) { var c = this._clones.length / 2, e = c + this._items.length, f = function (a) { return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2 }; return b === d ? a.map(this._clones, function (a, b) { return f(b) }) : a.map(this._clones, function (a, c) { return a === b ? f(c) : null }) }, e.prototype.speed = function (a) { return a !== d && (this._speed = a), this._speed }, e.prototype.coordinates = function (b) { var c = null; return b === d ? a.map(this._coordinates, a.proxy(function (a, b) { return this.coordinates(b) }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c) }, e.prototype.duration = function (a, b, c) { return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed) }, e.prototype.to = function (c, d) { if (this.settings.loop) { var e = c - this.relative(this.current()), f = this.current(), g = this.current(), h = this.current() + e, i = 0 > g - h ? !0 : !1, j = this._clones.length + this._items.length; h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function () { this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update() }, this), 30) } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update() }, e.prototype.next = function (a) { a = a || !1, this.to(this.relative(this.current()) + 1, a) }, e.prototype.prev = function (a) { a = a || !1, this.to(this.relative(this.current()) - 1, a) }, e.prototype.transitionEnd = function (a) { return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated")) }, e.prototype.viewport = function () { var d; if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width(); else if (b.innerWidth) d = b.innerWidth; else { if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width."; d = c.documentElement.clientWidth } return d }, e.prototype.replace = function (b) { this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () { return 1 === this.nodeType }).each(a.proxy(function (a, b) { b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1) }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items") }, e.prototype.add = function (a, b) { b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", { content: a, position: b }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", { content: a, position: b }) }, e.prototype.remove = function (a) { a = this.normalize(a, !0), a !== d && (this.trigger("remove", { content: this._items[a], position: a }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", { content: null, position: a })) }, e.prototype.addTriggerableEvents = function () { var b = a.proxy(function (b, c) { return a.proxy(function (a) { a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c])) }, this) }, this); a.each({ next: this.next, prev: this.prev, to: this.to, destroy: this.destroy, refresh: this.refresh, replace: this.replace, add: this.add, remove: this.remove }, a.proxy(function (a, c) { this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel")) }, this)) }, e.prototype.watchVisibility = function () { function c(a) { return a.offsetWidth > 0 && a.offsetHeight > 0 } function d() { c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile)) } c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500)) }, e.prototype.preloadAutoWidthImages = function (b) { var c, d, e, f; c = 0, d = this, b.each(function (g, h) { e = a(h), f = new Image, f.onload = function () { c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize()) }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina") }) }, e.prototype.destroy = function () { this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd); for (var d in this._plugins) this._plugins[d].destroy(); (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () { }, this.$stage.off("dragstart", function () { return !1 })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap() }, e.prototype.op = function (a, b, c) { var d = this.settings.rtl; switch (b) { case "<": return d ? a > c : c > a; case ">": return d ? c > a : a > c; case ">=": return d ? c >= a : a >= c; case "<=": return d ? a >= c : c >= a } }, e.prototype.on = function (a, b, c, d) { a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c) }, e.prototype.off = function (a, b, c, d) { a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c) }, e.prototype.trigger = function (b, c, d) { var e = { item: { count: this._items.length, index: this.current() } }, f = a.camelCase(a.grep(["on", b, d], function (a) { return a }).join("-").toLowerCase()), g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({ relatedTarget: this }, e, c)); return this._supress[b] || (a.each(this._plugins, function (a, b) { b.onTrigger && b.onTrigger(g) }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g }, e.prototype.suppress = function (b) { a.each(b, a.proxy(function (a, b) { this._supress[b] = !0 }, this)) }, e.prototype.release = function (b) { a.each(b, a.proxy(function (a, b) { delete this._supress[b] }, this)) }, e.prototype.browserSupport = function () { if (this.support3d = j(), this.support3d) { this.transformVendor = i(); var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"]; this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : "" } this.state.orientation = b.orientation }, a.fn.owlCarousel = function (b) { return this.each(function () { a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b)) }) }, a.fn.owlCarousel.Constructor = e }(window.Zepto || window.jQuery, window, document), function (a, b) { var c = function (b) { this._core = b, this._loaded = [], this._handlers = { "initialized.owl.carousel change.owl.carousel": a.proxy(function (b) { if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function (a, b) { this.load(b) }, this); e++ < d;)this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h) }, this) }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers) }; c.Defaults = { lazyLoad: !1 }, c.prototype.load = function (c) { var d = this._core.$stage.children().eq(c), e = d && d.find(".owl-lazy"); !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) { var e, f = a(d), g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src"); this._core.trigger("load", { element: f, url: g }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () { f.css("opacity", 1), this._core.trigger("loaded", { element: f, url: g }, "lazy") }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function () { f.css({ "background-image": "url(" + g + ")", opacity: "1" }), this._core.trigger("loaded", { element: f, url: g }, "lazy") }, this), e.src = g) }, this)), this._loaded.push(d.get(0))) }, c.prototype.destroy = function () { var a, b; for (a in this.handlers) this._core.$element.off(a, this.handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c }(window.Zepto || window.jQuery, window, document), function (a) { var b = function (c) { this._core = c, this._handlers = { "initialized.owl.carousel": a.proxy(function () { this._core.settings.autoHeight && this.update() }, this), "changed.owl.carousel": a.proxy(function (a) { this._core.settings.autoHeight && "position" == a.property.name && this.update() }, this), "loaded.owl.lazy": a.proxy(function (a) { this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update() }, this) }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers) }; b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }, b.prototype.update = function () { this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass) }, b.prototype.destroy = function () { var a, b; for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b }(window.Zepto || window.jQuery, window, document), function (a, b, c) { var d = function (b) { this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = { "resize.owl.carousel": a.proxy(function (a) { this._core.settings.video && !this.isInFullScreen() && a.preventDefault() }, this), "refresh.owl.carousel changed.owl.carousel": a.proxy(function () { this._playing && this.stop() }, this), "prepared.owl.carousel": a.proxy(function (b) { var c = a(b.content).find(".owl-video"); c.length && (c.css("display", "none"), this.fetch(c, a(b.content))) }, this) }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) { this.play(a) }, this)) }; d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }, d.prototype.fetch = function (a, b) { var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube", d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"), e = a.attr("data-width") || this._core.settings.videoWidth, f = a.attr("data-height") || this._core.settings.videoHeight, g = a.attr("href"); if (!g) throw new Error("Missing video URL."); if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube"; else { if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported."); c = "vimeo" } d = d[6], this._videos[g] = { type: c, id: d, width: e, height: f }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]) }, d.prototype.thumbnail = function (b, c) { var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "", h = b.find("img"), i = "src", j = "", k = this._core.settings, l = function (a) { e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e) }; return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void ("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({ type: "GET", url: "http://vimeo.com/api/v2/video/" + c.id + ".json", jsonp: "callback", dataType: "jsonp", success: function (a) { f = a[0].thumbnail_large, l(f) } })) }, d.prototype.stop = function () { this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null }, d.prototype.play = function (b) { this._core.trigger("play", null, "video"), this._playing && this.stop(); var c, d, e = a(b.target || b.srcElement), f = e.closest("." + this._core.settings.itemClass), g = this._videos[f.attr("data-video")], h = g.width || "100%", i = g.height || this._core.$stage.height(); "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d) }, d.prototype.isInFullScreen = function () { var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement; return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0 }, d.prototype.destroy = function () { var a, b; this._core.$element.off("click.owl.video"); for (a in this._handlers) this._core.$element.off(a, this._handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Video = d }(window.Zepto || window.jQuery, window, document), function (a, b, c, d) { var e = function (b) { this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = { "change.owl.carousel": a.proxy(function (a) { "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value) }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) { this.swapping = "translated" == a.type }, this), "translate.owl.carousel": a.proxy(function () { this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap() }, this) }, this.core.$element.on(this.handlers) }; e.Defaults = { animateOut: !1, animateIn: !1 }, e.prototype.swap = function () { if (1 === this.core.settings.items && this.core.support3d) { this.core.speed(0); var b, c = a.proxy(this.clear, this), d = this.core.$stage.children().eq(this.previous), e = this.core.$stage.children().eq(this.next), f = this.core.settings.animateIn, g = this.core.settings.animateOut; this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({ left: b + "px" }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)) } }, e.prototype.clear = function (b) { a(b.target).css({ left: "" }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd() }, e.prototype.destroy = function () { var a, b; for (a in this.handlers) this.core.$element.off(a, this.handlers[a]); for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null) }, a.fn.owlCarousel.Constructor.Plugins.Animate = e }(window.Zepto || window.jQuery, window, document), function (a, b, c) {
    var d = function (b) {
        this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": a.proxy(function () {
                this.autoplay()
            }, this), "play.owl.autoplay": a.proxy(function (a, b, c) { this.play(b, c) }, this), "stop.owl.autoplay": a.proxy(function () { this.stop() }, this), "mouseover.owl.autoplay": a.proxy(function () { this.core.settings.autoplayHoverPause && this.pause() }, this), "mouseleave.owl.autoplay": a.proxy(function () { this.core.settings.autoplayHoverPause && this.autoplay() }, this)
        }, this.core.$element.on(this.handlers)
    }; d.Defaults = { autoplay: !1, autoplayTimeout: 5e3, autoplayHoverPause: !1, autoplaySpeed: !1 }, d.prototype.autoplay = function () { this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function () { this.play() }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval) }, d.prototype.play = function () { return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed) }, d.prototype.stop = function () { b.clearInterval(this.interval) }, d.prototype.pause = function () { b.clearInterval(this.interval) }, d.prototype.destroy = function () { var a, c; b.clearInterval(this.interval); for (a in this.handlers) this.core.$element.off(a, this.handlers[a]); for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null) }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document), function (a) { "use strict"; var b = function (c) { this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = { next: this._core.next, prev: this._core.prev, to: this._core.to }, this._handlers = { "prepared.owl.carousel": a.proxy(function (b) { this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")) }, this), "add.owl.carousel": a.proxy(function (b) { this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")) }, this), "remove.owl.carousel prepared.owl.carousel": a.proxy(function (a) { this._core.settings.dotsData && this._templates.splice(a.position, 1) }, this), "change.owl.carousel": a.proxy(function (a) { if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) { var b = this._core.current(), c = this._core.maximum(), d = this._core.minimum(); a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value } }, this), "changed.owl.carousel": a.proxy(function (a) { "position" == a.property.name && this.draw() }, this), "refreshed.owl.carousel": a.proxy(function () { this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation") }, this) }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers) }; b.Defaults = { nav: !1, navRewind: !0, navText: ["prev", "next"], navSpeed: !1, navElement: "div", navContainer: !1, navContainerClass: "owl-nav", navClass: ["owl-prev", "owl-next"], slideBy: 1, dotClass: "owl-dot", dotsClass: "owl-dots", dots: !0, dotsEach: !1, dotData: !1, dotsSpeed: !1, dotsContainer: !1, controlsClass: "owl-controls" }, b.prototype.initialize = function () { var b, c, d = this._core.settings; d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function (b) { var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index(); b.preventDefault(), this.to(c, d.dotsSpeed) }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function () { this.prev(d.navSpeed) }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function () { this.next(d.navSpeed) }, this)); for (c in this._overrides) this._core[c] = a.proxy(this[c], this) }, b.prototype.destroy = function () { var a, b, c, d; for (a in this._handlers) this.$element.off(a, this._handlers[a]); for (b in this._controls) this._controls[b].remove(); for (d in this.overides) this._core[d] = this._overrides[d]; for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null) }, b.prototype.update = function () { var a, b, c, d = this._core.settings, e = this._core.clones().length / 2, f = e + this._core.items().length, g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items; if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy) for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({ start: a - e, end: a - e + g - 1 }), b = 0, ++c), b += this._core.mergers(this._core.relative(a)) }, b.prototype.draw = function () { var b, c, d = "", e = this._core.settings, f = (this._core.$stage.children(), this._core.relative(this._core.current())); if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) { if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) { for (c = 0; c < this._controls.$indicators.children().length; c++)d += this._templates[this._core.relative(c)]; this._controls.$indicators.html(d) } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove(); this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active") } this._controls.$indicators.toggle(e.dots) }, b.prototype.onTrigger = function (b) { var c = this._core.settings; b.page = { index: a.inArray(this.current(), this._pages), count: this._pages.length, size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items) } }, b.prototype.current = function () { var b = this._core.relative(this._core.current()); return a.grep(this._pages, function (a) { return a.start <= b && a.end >= b }).pop() }, b.prototype.getPosition = function (b) { var c, d, e = this._core.settings; return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c }, b.prototype.next = function (b) { a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b) }, b.prototype.prev = function (b) { a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b) }, b.prototype.to = function (b, c, d) { var e; d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b }(window.Zepto || window.jQuery, window, document), function (a, b) { "use strict"; var c = function (d) { this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = { "initialized.owl.carousel": a.proxy(function () { "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation") }, this), "prepared.owl.carousel": a.proxy(function (b) { var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash"); this._hashes[c] = b.content }, this) }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function () { var a = b.location.hash.substring(1), c = this._core.$stage.children(), d = this._hashes[a] && c.index(this._hashes[a]) || 0; return a ? void this._core.to(d, !1, !0) : !1 }, this)) }; c.Defaults = { URLhashListener: !1 }, c.prototype.destroy = function () { var c, d; a(b).off("hashchange.owl.navigation"); for (c in this._handlers) this._core.$element.off(c, this._handlers[c]); for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null) }, a.fn.owlCarousel.Constructor.Plugins.Hash = c }(window.Zepto || window.jQuery, window, document);





/*===== Sticky Sidebar =====*/
/*!
 * scrollsWith v1.0.0 (https://falk-m.de)
 * Copyright 2011-2017 falk-m.de
 * Released under an MIT-style license.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var VERSION = "1.0.0",
        PLUGIN_NS = 'scollswith_plugin';

    /**
    * The default configuration, and available options to configure
    */

    var defaults = {
        dummy_attr: 'data-sidebar-dummy',
        bottom_dummy_attr: 'data-sidebar-bottom',
        attr_value: null,
        margin_top: 0,
        fixedClass: 'fixed',
        minWidth: 200,
    };

    $.fn.scrollsWith = function (method) {
        var $this = $(this),
            plugin = $this.data(PLUGIN_NS);

        //Check if we are already instantiated and trying to execute a method
        if (plugin && typeof method === 'string') {
            if (plugin[method]) {
                return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.scollsWith');
            }
        }
        //Else update existing plugin with new options hash
        else if (plugin && typeof method === 'object') {
            plugin['option'].apply(plugin, arguments);
        }

        //Else not instantiated and trying to pass init object (or nothing)
        else if (!plugin && (typeof method === 'object' || !method)) {
            return init.apply(this, arguments);
        }

        return $this;
    };

    /**
    * The version of the plugin
    * @readonly
    */
    $.fn.scrollsWith.version = VERSION;

    //Expose our defaults so a user could override the plugin defaults
    $.fn.scrollsWith.defaults = defaults;

    /**
* Initialise the plugin for each DOM element matched
* This creates a new instance of the main scrollsWith class for each DOM element, and then
* saves a reference to that instance in the elements data property.
* @internal
*/
    function init(options) {

        if (!options) {
            options = {};
        }

        //pass empty object so we dont modify the defaults
        options = $.extend({}, $.fn.scrollsWith.defaults, options);

        //For each element instantiate the plugin
        return this.each(function () {
            var $this = $(this);

            //Check we havent already initialised the plugin
            var plugin = $this.data(PLUGIN_NS);

            if (!plugin) {
                plugin = new scrollsWith(this, options);
                $this.data(PLUGIN_NS, plugin);
            }
        });
    }

    function scrollsWith(element, options) {
        var me = this;

        var uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        //take a local/instacne level copy of the options - should make it this.options really...
        var options = $.extend({}, options);

        var data = {
            max_top: 0,
            max_bottom: 0,
            left: 0,
            width: 0,
            fixed: false,
            enable_fixed: false,
        };

        //jQuery wrapped element for this instance
        var $element = $(element);
        var $dummy = null;
        var $dummy_bottom = null;

        var event_resize = function () {
            var scrollTop = $(window).scrollTop();

            $(window).off('scroll.' + uid);
            if ($(window).width() > options.minWidth && $(window).height() > $element.height() + (2 * options.margin_top)) {
                $(window).on('scroll.' + uid, function () { scoll_event(); });
                data.enable_fixed = true;
            } else {
                data.enable_fixed = false;
            }

            //offset bilden
            data.max_top = $dummy.offset().top;
            data.left = $dummy.offset().left;
            data.width = $dummy.width();

            data.max_bottom = $dummy_bottom.offset().top + $dummy_bottom.height();
            scoll_event();
        };

        var scoll_event = function () {
            var scrollTop = $(window).scrollTop();

            //sidebar positionieren
            if (!data.enable_fixed) {
                //wenn fixed aber auflösung zu klein, dann lösen
                if (data.fixed) {
                    console.log("unfix sidebar");
                    $element.removeClass(options.fixedClass);
                    $element.removeAttr("style");
                    data.fixed = false;
                }
                return;
            }
            else if (data.fixed && data.max_top - options.margin_top > scrollTop) {
                //lösen
                console.log("unfix sidebar");
                $element.removeClass(options.fixedClass);
                $element.removeAttr("style");
                data.fixed = false;
                return;
            }
            else if (!data.fixed && data.max_top - options.margin_top < scrollTop) {
                //fixen
                console.log("fix sidebar");
                $element.addClass(options.fixedClass);
                data.fixed = true;
            }
            else if (!data.fixed) {
                return;
            }

            //positionieren
            $element.css({
                position: 'fixed',
                top: options.margin_top,
                left: data.left,
                width: data.width
            });

            if (data.max_bottom - scrollTop < $element.height() + options.margin_top) {
                $element.css({
                    top: data.max_bottom - scrollTop - $element.height()
                });
            }
        };

        var construct = function () {

            options.attr_value = options.attr_value || $element.attr("id");

            $dummy = $("[" + options.dummy_attr + "='" + options.attr_value + "']");
            $dummy_bottom = $("[" + options.bottom_dummy_attr + "='" + options.attr_value + "']");

            if ($dummy.length == 0 || $dummy_bottom.length == 0) {
                console.log("element for scollsWith not available");
                return;
            }

            $(window).on('resize.' + uid, function () { event_resize(); });
            $(window).on('orientationchange.' + uid, function () { event_resize(); });
            event_resize();
        };

        //init
        construct();
    }

}));







/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */
+function (a) { "use strict"; function b(b) { return this.each(function () { var d = a(this), e = d.data("bs.toggle"), f = "object" == typeof b && b; e || d.data("bs.toggle", e = new c(this, f)), "string" == typeof b && e[b] && e[b]() }) } var c = function (b, c) { this.$element = a(b), this.options = a.extend({}, this.defaults(), c), this.render() }; c.VERSION = "2.2.0", c.DEFAULTS = { on: "On", off: "Off", onstyle: "primary", offstyle: "default", size: "normal", style: "", width: null, height: null }, c.prototype.defaults = function () { return { on: this.$element.attr("data-on") || c.DEFAULTS.on, off: this.$element.attr("data-off") || c.DEFAULTS.off, onstyle: this.$element.attr("data-onstyle") || c.DEFAULTS.onstyle, offstyle: this.$element.attr("data-offstyle") || c.DEFAULTS.offstyle, size: this.$element.attr("data-size") || c.DEFAULTS.size, style: this.$element.attr("data-style") || c.DEFAULTS.style, width: this.$element.attr("data-width") || c.DEFAULTS.width, height: this.$element.attr("data-height") || c.DEFAULTS.height } }, c.prototype.render = function () { this._onstyle = "btn-" + this.options.onstyle, this._offstyle = "btn-" + this.options.offstyle; var b = "large" === this.options.size ? "btn-lg" : "small" === this.options.size ? "btn-sm" : "mini" === this.options.size ? "btn-xs" : "", c = a('<label class="btn">').html(this.options.on).addClass(this._onstyle + " " + b), d = a('<label class="btn">').html(this.options.off).addClass(this._offstyle + " " + b + " active"), e = a('<span class="toggle-handle btn btn-default">').addClass(b), f = a('<div class="toggle-group">').append(c, d, e), g = a('<div class="toggle btn" data-toggle="toggle">').addClass(this.$element.prop("checked") ? this._onstyle : this._offstyle + " off").addClass(b).addClass(this.options.style); this.$element.wrap(g), a.extend(this, { $toggle: this.$element.parent(), $toggleOn: c, $toggleOff: d, $toggleGroup: f }), this.$toggle.append(f); var h = this.options.width || Math.max(c.outerWidth(), d.outerWidth()) + e.outerWidth() / 2, i = this.options.height || Math.max(c.outerHeight(), d.outerHeight()); c.addClass("toggle-on"), d.addClass("toggle-off"), this.$toggle.css({ width: h, height: i }), this.options.height && (c.css("line-height", c.height() + "px"), d.css("line-height", d.height() + "px")), this.update(!0), this.trigger(!0) }, c.prototype.toggle = function () { this.$element.prop("checked") ? this.off() : this.on() }, c.prototype.on = function (a) { return this.$element.prop("disabled") ? !1 : (this.$toggle.removeClass(this._offstyle + " off").addClass(this._onstyle), this.$element.prop("checked", !0), void (a || this.trigger())) }, c.prototype.off = function (a) { return this.$element.prop("disabled") ? !1 : (this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + " off"), this.$element.prop("checked", !1), void (a || this.trigger())) }, c.prototype.enable = function () { this.$toggle.removeAttr("disabled"), this.$element.prop("disabled", !1) }, c.prototype.disable = function () { this.$toggle.attr("disabled", "disabled"), this.$element.prop("disabled", !0) }, c.prototype.update = function (a) { this.$element.prop("disabled") ? this.disable() : this.enable(), this.$element.prop("checked") ? this.on(a) : this.off(a) }, c.prototype.trigger = function (b) { this.$element.off("change.bs.toggle"), b || this.$element.change(), this.$element.on("change.bs.toggle", a.proxy(function () { this.update() }, this)) }, c.prototype.destroy = function () { this.$element.off("change.bs.toggle"), this.$toggleGroup.remove(), this.$element.removeData("bs.toggle"), this.$element.unwrap() }; var d = a.fn.bootstrapToggle; a.fn.bootstrapToggle = b, a.fn.bootstrapToggle.Constructor = c, a.fn.toggle.noConflict = function () { return a.fn.bootstrapToggle = d, this }, a(function () { a("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle() }), a(document).on("click.bs.toggle", "div[data-toggle^=toggle]", function (b) { var c = a(this).find("input[type=checkbox]"); c.bootstrapToggle("toggle"), b.preventDefault() }) }(jQuery);
//# sourceMappingURL=bootstrap-toggle.min.js.map


/*! Select2 4.0.3 | https://github.com/select2/select2/blob/master/LICENSE.md */!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery) }(function (a) {
    var b = function () {
        if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd; var b; return function () { if (!b || !b.requirejs) { b ? c = b : b = {}; var a, c, d; !function (b) { function e(a, b) { return u.call(a, b) } function f(a, b) { var c, d, e, f, g, h, i, j, k, l, m, n = b && b.split("/"), o = s.map, p = o && o["*"] || {}; if (a && "." === a.charAt(0)) if (b) { for (a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.slice(0, n.length - 1).concat(a), k = 0; k < a.length; k += 1)if (m = a[k], "." === m) a.splice(k, 1), k -= 1; else if (".." === m) { if (1 === k && (".." === a[2] || ".." === a[0])) break; k > 0 && (a.splice(k - 1, 2), k -= 2) } a = a.join("/") } else 0 === a.indexOf("./") && (a = a.substring(2)); if ((n || p) && o) { for (c = a.split("/"), k = c.length; k > 0; k -= 1) { if (d = c.slice(0, k).join("/"), n) for (l = n.length; l > 0; l -= 1)if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) { f = e, h = k; break } if (f) break; !i && p && p[d] && (i = p[d], j = k) } !f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/")) } return a } function g(a, c) { return function () { var d = v.call(arguments, 0); return "string" != typeof d[0] && 1 === d.length && d.push(null), n.apply(b, d.concat([a, c])) } } function h(a) { return function (b) { return f(b, a) } } function i(a) { return function (b) { q[a] = b } } function j(a) { if (e(r, a)) { var c = r[a]; delete r[a], t[a] = !0, m.apply(b, c) } if (!e(q, a) && !e(t, a)) throw new Error("No " + a); return q[a] } function k(a) { var b, c = a ? a.indexOf("!") : -1; return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a] } function l(a) { return function () { return s && s.config && s.config[a] || {} } } var m, n, o, p, q = {}, r = {}, s = {}, t = {}, u = Object.prototype.hasOwnProperty, v = [].slice, w = /\.js$/; o = function (a, b) { var c, d = k(a), e = d[0]; return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), { f: e ? e + "!" + a : a, n: a, pr: e, p: c } }, p = { require: function (a) { return g(a) }, exports: function (a) { var b = q[a]; return "undefined" != typeof b ? b : q[a] = {} }, module: function (a) { return { id: a, uri: "", exports: q[a], config: l(a) } } }, m = function (a, c, d, f) { var h, k, l, m, n, s, u = [], v = typeof d; if (f = f || a, "undefined" === v || "function" === v) { for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1)if (m = o(c[n], f), k = m.f, "require" === k) u[n] = p.require(a); else if ("exports" === k) u[n] = p.exports(a), s = !0; else if ("module" === k) h = u[n] = p.module(a); else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k); else { if (!m.p) throw new Error(a + " missing " + k); m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k] } l = d ? d.apply(q[a], u) : void 0, a && (h && h.exports !== b && h.exports !== q[a] ? q[a] = h.exports : l === b && s || (q[a] = l)) } else a && (q[a] = d) }, a = c = n = function (a, c, d, e, f) { if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f); if (!a.splice) { if (s = a, s.deps && n(s.deps, s.callback), !c) return; c.splice ? (a = c, c = d, d = null) : a = b } return c = c || function () { }, "function" == typeof d && (d = e, e = f), e ? m(b, a, c, d) : setTimeout(function () { m(b, a, c, d) }, 4), n }, n.config = function (a) { return n(a) }, a._defined = q, d = function (a, b, c) { if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name"); b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c]) }, d.amd = { jQuery: !0 } }(), b.requirejs = a, b.require = c, b.define = d } }(), b.define("almond", function () { }), b.define("jquery", [], function () { var b = a || $; return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b }), b.define("select2/utils", ["jquery"], function (a) { function b(a) { var b = a.prototype, c = []; for (var d in b) { var e = b[d]; "function" == typeof e && "constructor" !== d && c.push(d) } return c } var c = {}; c.Extend = function (a, b) { function c() { this.constructor = a } var d = {}.hasOwnProperty; for (var e in b) d.call(b, e) && (a[e] = b[e]); return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a }, c.Decorate = function (a, c) { function d() { var b = Array.prototype.unshift, d = c.prototype.constructor.length, e = a.prototype.constructor; d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments) } function e() { this.constructor = d } var f = b(c), g = b(a); c.displayName = a.displayName, d.prototype = new e; for (var h = 0; h < g.length; h++) { var i = g[h]; d.prototype[i] = a.prototype[i] } for (var j = (function (a) { var b = function () { }; a in d.prototype && (b = d.prototype[a]); var e = c.prototype[a]; return function () { var a = Array.prototype.unshift; return a.call(arguments, b), e.apply(this, arguments) } }), k = 0; k < f.length; k++) { var l = f[k]; d.prototype[l] = j(l) } return d }; var d = function () { this.listeners = {} }; return d.prototype.on = function (a, b) { this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b] }, d.prototype.trigger = function (a) { var b = Array.prototype.slice, c = b.call(arguments, 1); this.listeners = this.listeners || {}, null == c && (c = []), 0 === c.length && c.push({}), c[0]._type = a, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments) }, d.prototype.invoke = function (a, b) { for (var c = 0, d = a.length; d > c; c++)a[c].apply(this, b) }, c.Observable = d, c.generateChars = function (a) { for (var b = "", c = 0; a > c; c++) { var d = Math.floor(36 * Math.random()); b += d.toString(36) } return b }, c.bind = function (a, b) { return function () { a.apply(b, arguments) } }, c._convertData = function (a) { for (var b in a) { var c = b.split("-"), d = a; if (1 !== c.length) { for (var e = 0; e < c.length; e++) { var f = c[e]; f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f] } delete a[b] } } return a }, c.hasScroll = function (b, c) { var d = a(c), e = c.style.overflowX, f = c.style.overflowY; return e !== f || "hidden" !== f && "visible" !== f ? "scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth : !1 }, c.escapeMarkup = function (a) { var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" }; return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function (a) { return b[a] }) }, c.appendMany = function (b, c) { if ("1.7" === a.fn.jquery.substr(0, 3)) { var d = a(); a.map(c, function (a) { d = d.add(a) }), c = d } b.append(c) }, c }), b.define("select2/results", ["jquery", "./utils"], function (a, b) { function c(a, b, d) { this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this) } return b.Extend(c, b.Observable), c.prototype.render = function () { var b = a('<ul class="select2-results__options" role="tree"></ul>'); return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b }, c.prototype.clear = function () { this.$results.empty() }, c.prototype.displayMessage = function (b) { var c = this.options.get("escapeMarkup"); this.clear(), this.hideLoading(); var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'), e = this.options.get("translations").get(b.message); d.append(c(e(b.args))), d[0].className += " select2-results__message", this.$results.append(d) }, c.prototype.hideMessages = function () { this.$results.find(".select2-results__message").remove() }, c.prototype.append = function (a) { this.hideLoading(); var b = []; if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" })); a.results = this.sort(a.results); for (var c = 0; c < a.results.length; c++) { var d = a.results[c], e = this.option(d); b.push(e) } this.$results.append(b) }, c.prototype.position = function (a, b) { var c = b.find(".select2-results"); c.append(a) }, c.prototype.sort = function (a) { var b = this.options.get("sorter"); return b(a) }, c.prototype.highlightFirstItem = function () { var a = this.$results.find(".select2-results__option[aria-selected]"), b = a.filter("[aria-selected=true]"); b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible() }, c.prototype.setClasses = function () { var b = this; this.data.current(function (c) { var d = a.map(c, function (a) { return a.id.toString() }), e = b.$results.find(".select2-results__option[aria-selected]"); e.each(function () { var b = a(this), c = a.data(this, "data"), e = "" + c.id; null != c.element && c.element.selected || null == c.element && a.inArray(e, d) > -1 ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false") }) }) }, c.prototype.showLoading = function (a) { this.hideLoading(); var b = this.options.get("translations").get("searching"), c = { disabled: !0, loading: !0, text: b(a) }, d = this.option(c); d.className += " loading-results", this.$results.prepend(d) }, c.prototype.hideLoading = function () { this.$results.find(".loading-results").remove() }, c.prototype.option = function (b) { var c = document.createElement("li"); c.className = "select2-results__option"; var d = { role: "treeitem", "aria-selected": "false" }; b.disabled && (delete d["aria-selected"], d["aria-disabled"] = "true"), null == b.id && delete d["aria-selected"], null != b._resultId && (c.id = b._resultId), b.title && (c.title = b.title), b.children && (d.role = "group", d["aria-label"] = b.text, delete d["aria-selected"]); for (var e in d) { var f = d[e]; c.setAttribute(e, f) } if (b.children) { var g = a(c), h = document.createElement("strong"); h.className = "select2-results__group"; a(h); this.template(b, h); for (var i = [], j = 0; j < b.children.length; j++) { var k = b.children[j], l = this.option(k); i.push(l) } var m = a("<ul></ul>", { "class": "select2-results__options select2-results__options--nested" }); m.append(i), g.append(h), g.append(m) } else this.template(b, c); return a.data(c, "data", b), c }, c.prototype.bind = function (b, c) { var d = this, e = b.id + "-results"; this.$results.attr("id", e), b.on("results:all", function (a) { d.clear(), d.append(a.data), b.isOpen() && (d.setClasses(), d.highlightFirstItem()) }), b.on("results:append", function (a) { d.append(a.data), b.isOpen() && d.setClasses() }), b.on("query", function (a) { d.hideMessages(), d.showLoading(a) }), b.on("select", function () { b.isOpen() && (d.setClasses(), d.highlightFirstItem()) }), b.on("unselect", function () { b.isOpen() && (d.setClasses(), d.highlightFirstItem()) }), b.on("open", function () { d.$results.attr("aria-expanded", "true"), d.$results.attr("aria-hidden", "false"), d.setClasses(), d.ensureHighlightVisible() }), b.on("close", function () { d.$results.attr("aria-expanded", "false"), d.$results.attr("aria-hidden", "true"), d.$results.removeAttr("aria-activedescendant") }), b.on("results:toggle", function () { var a = d.getHighlightedResults(); 0 !== a.length && a.trigger("mouseup") }), b.on("results:select", function () { var a = d.getHighlightedResults(); if (0 !== a.length) { var b = a.data("data"); "true" == a.attr("aria-selected") ? d.trigger("close", {}) : d.trigger("select", { data: b }) } }), b.on("results:previous", function () { var a = d.getHighlightedResults(), b = d.$results.find("[aria-selected]"), c = b.index(a); if (0 !== c) { var e = c - 1; 0 === a.length && (e = 0); var f = b.eq(e); f.trigger("mouseenter"); var g = d.$results.offset().top, h = f.offset().top, i = d.$results.scrollTop() + (h - g); 0 === e ? d.$results.scrollTop(0) : 0 > h - g && d.$results.scrollTop(i) } }), b.on("results:next", function () { var a = d.getHighlightedResults(), b = d.$results.find("[aria-selected]"), c = b.index(a), e = c + 1; if (!(e >= b.length)) { var f = b.eq(e); f.trigger("mouseenter"); var g = d.$results.offset().top + d.$results.outerHeight(!1), h = f.offset().top + f.outerHeight(!1), i = d.$results.scrollTop() + h - g; 0 === e ? d.$results.scrollTop(0) : h > g && d.$results.scrollTop(i) } }), b.on("results:focus", function (a) { a.element.addClass("select2-results__option--highlighted") }), b.on("results:message", function (a) { d.displayMessage(a) }), a.fn.mousewheel && this.$results.on("mousewheel", function (a) { var b = d.$results.scrollTop(), c = d.$results.get(0).scrollHeight - b + a.deltaY, e = a.deltaY > 0 && b - a.deltaY <= 0, f = a.deltaY < 0 && c <= d.$results.height(); e ? (d.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (d.$results.scrollTop(d.$results.get(0).scrollHeight - d.$results.height()), a.preventDefault(), a.stopPropagation()) }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) { var c = a(this), e = c.data("data"); return "true" === c.attr("aria-selected") ? void (d.options.get("multiple") ? d.trigger("unselect", { originalEvent: b, data: e }) : d.trigger("close", {})) : void d.trigger("select", { originalEvent: b, data: e }) }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (b) { var c = a(this).data("data"); d.getHighlightedResults().removeClass("select2-results__option--highlighted"), d.trigger("results:focus", { data: c, element: a(this) }) }) }, c.prototype.getHighlightedResults = function () { var a = this.$results.find(".select2-results__option--highlighted"); return a }, c.prototype.destroy = function () { this.$results.remove() }, c.prototype.ensureHighlightVisible = function () { var a = this.getHighlightedResults(); if (0 !== a.length) { var b = this.$results.find("[aria-selected]"), c = b.index(a), d = this.$results.offset().top, e = a.offset().top, f = this.$results.scrollTop() + (e - d), g = e - d; f -= 2 * a.outerHeight(!1), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f) } }, c.prototype.template = function (b, c) { var d = this.options.get("templateResult"), e = this.options.get("escapeMarkup"), f = d(b, c); null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f) }, c }), b.define("select2/keys", [], function () { var a = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 }; return a }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) { function d(a, b) { this.$element = a, this.options = b, d.__super__.constructor.call(this) } return b.Extend(d, b.Observable), d.prototype.render = function () { var b = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'); return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), b.attr("title", this.$element.attr("title")), b.attr("tabindex", this._tabindex), this.$selection = b, b }, d.prototype.bind = function (a, b) { var d = this, e = (a.id + "-container", a.id + "-results"); this.container = a, this.$selection.on("focus", function (a) { d.trigger("focus", a) }), this.$selection.on("blur", function (a) { d._handleBlur(a) }), this.$selection.on("keydown", function (a) { d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault() }), a.on("results:focus", function (a) { d.$selection.attr("aria-activedescendant", a.data._resultId) }), a.on("selection:update", function (a) { d.update(a.data) }), a.on("open", function () { d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a) }), a.on("close", function () { d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a) }), a.on("enable", function () { d.$selection.attr("tabindex", d._tabindex) }), a.on("disable", function () { d.$selection.attr("tabindex", "-1") }) }, d.prototype._handleBlur = function (b) { var c = this; window.setTimeout(function () { document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b) }, 1) }, d.prototype._attachCloseHandler = function (b) { a(document.body).on("mousedown.select2." + b.id, function (b) { var c = a(b.target), d = c.closest(".select2"), e = a(".select2.select2-container--open"); e.each(function () { var b = a(this); if (this != d[0]) { var c = b.data("element"); c.select2("close") } }) }) }, d.prototype._detachCloseHandler = function (b) { a(document.body).off("mousedown.select2." + b.id) }, d.prototype.position = function (a, b) { var c = b.find(".selection"); c.append(a) }, d.prototype.destroy = function () { this._detachCloseHandler(this.container) }, d.prototype.update = function (a) { throw new Error("The `update` method must be defined in child classes.") }, d }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) { function e() { e.__super__.constructor.apply(this, arguments) } return c.Extend(e, b), e.prototype.render = function () { var a = e.__super__.render.call(this); return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a }, e.prototype.bind = function (a, b) { var c = this; e.__super__.bind.apply(this, arguments); var d = a.id + "-container"; this.$selection.find(".select2-selection__rendered").attr("id", d), this.$selection.attr("aria-labelledby", d), this.$selection.on("mousedown", function (a) { 1 === a.which && c.trigger("toggle", { originalEvent: a }) }), this.$selection.on("focus", function (a) { }), this.$selection.on("blur", function (a) { }), a.on("focus", function (b) { a.isOpen() || c.$selection.focus() }), a.on("selection:update", function (a) { c.update(a.data) }) }, e.prototype.clear = function () { this.$selection.find(".select2-selection__rendered").empty() }, e.prototype.display = function (a, b) { var c = this.options.get("templateSelection"), d = this.options.get("escapeMarkup"); return d(c(a, b)) }, e.prototype.selectionContainer = function () { return a("<span></span>") }, e.prototype.update = function (a) { if (0 === a.length) return void this.clear(); var b = a[0], c = this.$selection.find(".select2-selection__rendered"), d = this.display(b, c); c.empty().append(d), c.prop("title", b.title || b.text) }, e }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) { function d(a, b) { d.__super__.constructor.apply(this, arguments) } return c.Extend(d, b), d.prototype.render = function () { var a = d.__super__.render.call(this); return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a }, d.prototype.bind = function (b, c) { var e = this; d.__super__.bind.apply(this, arguments), this.$selection.on("click", function (a) { e.trigger("toggle", { originalEvent: a }) }), this.$selection.on("click", ".select2-selection__choice__remove", function (b) { if (!e.options.get("disabled")) { var c = a(this), d = c.parent(), f = d.data("data"); e.trigger("unselect", { originalEvent: b, data: f }) } }) }, d.prototype.clear = function () { this.$selection.find(".select2-selection__rendered").empty() }, d.prototype.display = function (a, b) { var c = this.options.get("templateSelection"), d = this.options.get("escapeMarkup"); return d(c(a, b)) }, d.prototype.selectionContainer = function () { var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>'); return b }, d.prototype.update = function (a) { if (this.clear(), 0 !== a.length) { for (var b = [], d = 0; d < a.length; d++) { var e = a[d], f = this.selectionContainer(), g = this.display(e, f); f.append(g), f.prop("title", e.title || e.text), f.data("data", e), b.push(f) } var h = this.$selection.find(".select2-selection__rendered"); c.appendMany(h, b) } }, d }), b.define("select2/selection/placeholder", ["../utils"], function (a) { function b(a, b, c) { this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c) } return b.prototype.normalizePlaceholder = function (a, b) { return "string" == typeof b && (b = { id: "", text: b }), b }, b.prototype.createPlaceholder = function (a, b) { var c = this.selectionContainer(); return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c }, b.prototype.update = function (a, b) { var c = 1 == b.length && b[0].id != this.placeholder.id, d = b.length > 1; if (d || c) return a.call(this, b); this.clear(); var e = this.createPlaceholder(this.placeholder); this.$selection.find(".select2-selection__rendered").append(e) }, b }), b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) { function c() { } return c.prototype.bind = function (a, b, c) { var d = this; a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (a) { d._handleClear(a) }), b.on("keypress", function (a) { d._handleKeyboardClear(a, b) }) }, c.prototype._handleClear = function (a, b) { if (!this.options.get("disabled")) { var c = this.$selection.find(".select2-selection__clear"); if (0 !== c.length) { b.stopPropagation(); for (var d = c.data("data"), e = 0; e < d.length; e++) { var f = { data: d[e] }; if (this.trigger("unselect", f), f.prevented) return } this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {}) } } }, c.prototype._handleKeyboardClear = function (a, c, d) { d.isOpen() || (c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c) }, c.prototype.update = function (b, c) { if (b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length)) { var d = a('<span class="select2-selection__clear">&times;</span>'); d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d) } }, c }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) { function d(a, b, c) { a.call(this, b, c) } return d.prototype.render = function (b) { var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'); this.$searchContainer = c, this.$search = c.find("input"); var d = b.call(this); return this._transferTabIndex(), d }, d.prototype.bind = function (a, b, d) { var e = this; a.call(this, b, d), b.on("open", function () { e.$search.trigger("focus") }), b.on("close", function () { e.$search.val(""), e.$search.removeAttr("aria-activedescendant"), e.$search.trigger("focus") }), b.on("enable", function () { e.$search.prop("disabled", !1), e._transferTabIndex() }), b.on("disable", function () { e.$search.prop("disabled", !0) }), b.on("focus", function (a) { e.$search.trigger("focus") }), b.on("results:focus", function (a) { e.$search.attr("aria-activedescendant", a.id) }), this.$selection.on("focusin", ".select2-search--inline", function (a) { e.trigger("focus", a) }), this.$selection.on("focusout", ".select2-search--inline", function (a) { e._handleBlur(a) }), this.$selection.on("keydown", ".select2-search--inline", function (a) { a.stopPropagation(), e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented(); var b = a.which; if (b === c.BACKSPACE && "" === e.$search.val()) { var d = e.$searchContainer.prev(".select2-selection__choice"); if (d.length > 0) { var f = d.data("data"); e.searchRemoveChoice(f), a.preventDefault() } } }); var f = document.documentMode, g = f && 11 >= f; this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) { return g ? void e.$selection.off("input.search input.searchcheck") : void e.$selection.off("keyup.search") }), this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) { if (g && "input" === a.type) return void e.$selection.off("input.search input.searchcheck"); var b = a.which; b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && e.handleSearch(a) }) }, d.prototype._transferTabIndex = function (a) { this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1") }, d.prototype.createPlaceholder = function (a, b) { this.$search.attr("placeholder", b.text) }, d.prototype.update = function (a, b) { var c = this.$search[0] == document.activeElement; this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus() }, d.prototype.handleSearch = function () { if (this.resizeSearch(), !this._keyUpPrevented) { var a = this.$search.val(); this.trigger("query", { term: a }) } this._keyUpPrevented = !1 }, d.prototype.searchRemoveChoice = function (a, b) { this.trigger("unselect", { data: b }), this.$search.val(b.text), this.handleSearch() }, d.prototype.resizeSearch = function () { this.$search.css("width", "25px"); var a = ""; if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth(); else { var b = this.$search.val().length + 1; a = .75 * b + "em" } this.$search.css("width", a) }, d }), b.define("select2/selection/eventRelay", ["jquery"], function (a) { function b() { } return b.prototype.bind = function (b, c, d) { var e = this, f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"], g = ["opening", "closing", "selecting", "unselecting"]; b.call(this, c, d), c.on("*", function (b, c) { if (-1 !== a.inArray(b, f)) { c = c || {}; var d = a.Event("select2:" + b, { params: c }); e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented()) } }) }, b }), b.define("select2/translation", ["jquery", "require"], function (a, b) { function c(a) { this.dict = a || {} } return c.prototype.all = function () { return this.dict }, c.prototype.get = function (a) { return this.dict[a] }, c.prototype.extend = function (b) { this.dict = a.extend({}, b.all(), this.dict) }, c._cache = {}, c.loadPath = function (a) { if (!(a in c._cache)) { var d = b(a); c._cache[a] = d } return new c(c._cache[a]) }, c }), b.define("select2/diacritics", [], function () { var a = { "Ⓐ": "A", "Ａ": "A", "À": "A", "Á": "A", "Â": "A", "Ầ": "A", "Ấ": "A", "Ẫ": "A", "Ẩ": "A", "Ã": "A", "Ā": "A", "Ă": "A", "Ằ": "A", "Ắ": "A", "Ẵ": "A", "Ẳ": "A", "Ȧ": "A", "Ǡ": "A", "Ä": "A", "Ǟ": "A", "Ả": "A", "Å": "A", "Ǻ": "A", "Ǎ": "A", "Ȁ": "A", "Ȃ": "A", "Ạ": "A", "Ậ": "A", "Ặ": "A", "Ḁ": "A", "Ą": "A", "Ⱥ": "A", "Ɐ": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ⓑ": "B", "Ｂ": "B", "Ḃ": "B", "Ḅ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ɓ": "B", "Ⓒ": "C", "Ｃ": "C", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ƈ": "C", "Ȼ": "C", "Ꜿ": "C", "Ⓓ": "D", "Ｄ": "D", "Ḋ": "D", "Ď": "D", "Ḍ": "D", "Ḑ": "D", "Ḓ": "D", "Ḏ": "D", "Đ": "D", "Ƌ": "D", "Ɗ": "D", "Ɖ": "D", "Ꝺ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "ǲ": "Dz", "ǅ": "Dz", "Ⓔ": "E", "Ｅ": "E", "È": "E", "É": "E", "Ê": "E", "Ề": "E", "Ế": "E", "Ễ": "E", "Ể": "E", "Ẽ": "E", "Ē": "E", "Ḕ": "E", "Ḗ": "E", "Ĕ": "E", "Ė": "E", "Ë": "E", "Ẻ": "E", "Ě": "E", "Ȅ": "E", "Ȇ": "E", "Ẹ": "E", "Ệ": "E", "Ȩ": "E", "Ḝ": "E", "Ę": "E", "Ḙ": "E", "Ḛ": "E", "Ɛ": "E", "Ǝ": "E", "Ⓕ": "F", "Ｆ": "F", "Ḟ": "F", "Ƒ": "F", "Ꝼ": "F", "Ⓖ": "G", "Ｇ": "G", "Ǵ": "G", "Ĝ": "G", "Ḡ": "G", "Ğ": "G", "Ġ": "G", "Ǧ": "G", "Ģ": "G", "Ǥ": "G", "Ɠ": "G", "Ꞡ": "G", "Ᵹ": "G", "Ꝿ": "G", "Ⓗ": "H", "Ｈ": "H", "Ĥ": "H", "Ḣ": "H", "Ḧ": "H", "Ȟ": "H", "Ḥ": "H", "Ḩ": "H", "Ḫ": "H", "Ħ": "H", "Ⱨ": "H", "Ⱶ": "H", "Ɥ": "H", "Ⓘ": "I", "Ｉ": "I", "Ì": "I", "Í": "I", "Î": "I", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "İ": "I", "Ï": "I", "Ḯ": "I", "Ỉ": "I", "Ǐ": "I", "Ȉ": "I", "Ȋ": "I", "Ị": "I", "Į": "I", "Ḭ": "I", "Ɨ": "I", "Ⓙ": "J", "Ｊ": "J", "Ĵ": "J", "Ɉ": "J", "Ⓚ": "K", "Ｋ": "K", "Ḱ": "K", "Ǩ": "K", "Ḳ": "K", "Ķ": "K", "Ḵ": "K", "Ƙ": "K", "Ⱪ": "K", "Ꝁ": "K", "Ꝃ": "K", "Ꝅ": "K", "Ꞣ": "K", "Ⓛ": "L", "Ｌ": "L", "Ŀ": "L", "Ĺ": "L", "Ľ": "L", "Ḷ": "L", "Ḹ": "L", "Ļ": "L", "Ḽ": "L", "Ḻ": "L", "Ł": "L", "Ƚ": "L", "Ɫ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ꝇ": "L", "Ꞁ": "L", "Ǉ": "LJ", "ǈ": "Lj", "Ⓜ": "M", "Ｍ": "M", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ɯ": "M", "Ⓝ": "N", "Ｎ": "N", "Ǹ": "N", "Ń": "N", "Ñ": "N", "Ṅ": "N", "Ň": "N", "Ṇ": "N", "Ņ": "N", "Ṋ": "N", "Ṉ": "N", "Ƞ": "N", "Ɲ": "N", "Ꞑ": "N", "Ꞥ": "N", "Ǌ": "NJ", "ǋ": "Nj", "Ⓞ": "O", "Ｏ": "O", "Ò": "O", "Ó": "O", "Ô": "O", "Ồ": "O", "Ố": "O", "Ỗ": "O", "Ổ": "O", "Õ": "O", "Ṍ": "O", "Ȭ": "O", "Ṏ": "O", "Ō": "O", "Ṑ": "O", "Ṓ": "O", "Ŏ": "O", "Ȯ": "O", "Ȱ": "O", "Ö": "O", "Ȫ": "O", "Ỏ": "O", "Ő": "O", "Ǒ": "O", "Ȍ": "O", "Ȏ": "O", "Ơ": "O", "Ờ": "O", "Ớ": "O", "Ỡ": "O", "Ở": "O", "Ợ": "O", "Ọ": "O", "Ộ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Ɔ": "O", "Ɵ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ȣ": "OU", "Ⓟ": "P", "Ｐ": "P", "Ṕ": "P", "Ṗ": "P", "Ƥ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝓ": "P", "Ꝕ": "P", "Ⓠ": "Q", "Ｑ": "Q", "Ꝗ": "Q", "Ꝙ": "Q", "Ɋ": "Q", "Ⓡ": "R", "Ｒ": "R", "Ŕ": "R", "Ṙ": "R", "Ř": "R", "Ȑ": "R", "Ȓ": "R", "Ṛ": "R", "Ṝ": "R", "Ŗ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꝛ": "R", "Ꞧ": "R", "Ꞃ": "R", "Ⓢ": "S", "Ｓ": "S", "ẞ": "S", "Ś": "S", "Ṥ": "S", "Ŝ": "S", "Ṡ": "S", "Š": "S", "Ṧ": "S", "Ṣ": "S", "Ṩ": "S", "Ș": "S", "Ş": "S", "Ȿ": "S", "Ꞩ": "S", "Ꞅ": "S", "Ⓣ": "T", "Ｔ": "T", "Ṫ": "T", "Ť": "T", "Ṭ": "T", "Ț": "T", "Ţ": "T", "Ṱ": "T", "Ṯ": "T", "Ŧ": "T", "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ꞇ": "T", "Ꜩ": "TZ", "Ⓤ": "U", "Ｕ": "U", "Ù": "U", "Ú": "U", "Û": "U", "Ũ": "U", "Ṹ": "U", "Ū": "U", "Ṻ": "U", "Ŭ": "U", "Ü": "U", "Ǜ": "U", "Ǘ": "U", "Ǖ": "U", "Ǚ": "U", "Ủ": "U", "Ů": "U", "Ű": "U", "Ǔ": "U", "Ȕ": "U", "Ȗ": "U", "Ư": "U", "Ừ": "U", "Ứ": "U", "Ữ": "U", "Ử": "U", "Ự": "U", "Ụ": "U", "Ṳ": "U", "Ų": "U", "Ṷ": "U", "Ṵ": "U", "Ʉ": "U", "Ⓥ": "V", "Ｖ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "Ꝟ": "V", "Ʌ": "V", "Ꝡ": "VY", "Ⓦ": "W", "Ｗ": "W", "Ẁ": "W", "Ẃ": "W", "Ŵ": "W", "Ẇ": "W", "Ẅ": "W", "Ẉ": "W", "Ⱳ": "W", "Ⓧ": "X", "Ｘ": "X", "Ẋ": "X", "Ẍ": "X", "Ⓨ": "Y", "Ｙ": "Y", "Ỳ": "Y", "Ý": "Y", "Ŷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "Ẏ": "Y", "Ÿ": "Y", "Ỷ": "Y", "Ỵ": "Y", "Ƴ": "Y", "Ɏ": "Y", "Ỿ": "Y", "Ⓩ": "Z", "Ｚ": "Z", "Ź": "Z", "Ẑ": "Z", "Ż": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ȥ": "Z", "Ɀ": "Z", "Ⱬ": "Z", "Ꝣ": "Z", "ⓐ": "a", "ａ": "a", "ẚ": "a", "à": "a", "á": "a", "â": "a", "ầ": "a", "ấ": "a", "ẫ": "a", "ẩ": "a", "ã": "a", "ā": "a", "ă": "a", "ằ": "a", "ắ": "a", "ẵ": "a", "ẳ": "a", "ȧ": "a", "ǡ": "a", "ä": "a", "ǟ": "a", "ả": "a", "å": "a", "ǻ": "a", "ǎ": "a", "ȁ": "a", "ȃ": "a", "ạ": "a", "ậ": "a", "ặ": "a", "ḁ": "a", "ą": "a", "ⱥ": "a", "ɐ": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ⓑ": "b", "ｂ": "b", "ḃ": "b", "ḅ": "b", "ḇ": "b", "ƀ": "b", "ƃ": "b", "ɓ": "b", "ⓒ": "c", "ｃ": "c", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "ç": "c", "ḉ": "c", "ƈ": "c", "ȼ": "c", "ꜿ": "c", "ↄ": "c", "ⓓ": "d", "ｄ": "d", "ḋ": "d", "ď": "d", "ḍ": "d", "ḑ": "d", "ḓ": "d", "ḏ": "d", "đ": "d", "ƌ": "d", "ɖ": "d", "ɗ": "d", "ꝺ": "d", "ǳ": "dz", "ǆ": "dz", "ⓔ": "e", "ｅ": "e", "è": "e", "é": "e", "ê": "e", "ề": "e", "ế": "e", "ễ": "e", "ể": "e", "ẽ": "e", "ē": "e", "ḕ": "e", "ḗ": "e", "ĕ": "e", "ė": "e", "ë": "e", "ẻ": "e", "ě": "e", "ȅ": "e", "ȇ": "e", "ẹ": "e", "ệ": "e", "ȩ": "e", "ḝ": "e", "ę": "e", "ḙ": "e", "ḛ": "e", "ɇ": "e", "ɛ": "e", "ǝ": "e", "ⓕ": "f", "ｆ": "f", "ḟ": "f", "ƒ": "f", "ꝼ": "f", "ⓖ": "g", "ｇ": "g", "ǵ": "g", "ĝ": "g", "ḡ": "g", "ğ": "g", "ġ": "g", "ǧ": "g", "ģ": "g", "ǥ": "g", "ɠ": "g", "ꞡ": "g", "ᵹ": "g", "ꝿ": "g", "ⓗ": "h", "ｈ": "h", "ĥ": "h", "ḣ": "h", "ḧ": "h", "ȟ": "h", "ḥ": "h", "ḩ": "h", "ḫ": "h", "ẖ": "h", "ħ": "h", "ⱨ": "h", "ⱶ": "h", "ɥ": "h", "ƕ": "hv", "ⓘ": "i", "ｉ": "i", "ì": "i", "í": "i", "î": "i", "ĩ": "i", "ī": "i", "ĭ": "i", "ï": "i", "ḯ": "i", "ỉ": "i", "ǐ": "i", "ȉ": "i", "ȋ": "i", "ị": "i", "į": "i", "ḭ": "i", "ɨ": "i", "ı": "i", "ⓙ": "j", "ｊ": "j", "ĵ": "j", "ǰ": "j", "ɉ": "j", "ⓚ": "k", "ｋ": "k", "ḱ": "k", "ǩ": "k", "ḳ": "k", "ķ": "k", "ḵ": "k", "ƙ": "k", "ⱪ": "k", "ꝁ": "k", "ꝃ": "k", "ꝅ": "k", "ꞣ": "k", "ⓛ": "l", "ｌ": "l", "ŀ": "l", "ĺ": "l", "ľ": "l", "ḷ": "l", "ḹ": "l", "ļ": "l", "ḽ": "l", "ḻ": "l", "ſ": "l", "ł": "l", "ƚ": "l", "ɫ": "l", "ⱡ": "l", "ꝉ": "l", "ꞁ": "l", "ꝇ": "l", "ǉ": "lj", "ⓜ": "m", "ｍ": "m", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ɯ": "m", "ⓝ": "n", "ｎ": "n", "ǹ": "n", "ń": "n", "ñ": "n", "ṅ": "n", "ň": "n", "ṇ": "n", "ņ": "n", "ṋ": "n", "ṉ": "n", "ƞ": "n", "ɲ": "n", "ŉ": "n", "ꞑ": "n", "ꞥ": "n", "ǌ": "nj", "ⓞ": "o", "ｏ": "o", "ò": "o", "ó": "o", "ô": "o", "ồ": "o", "ố": "o", "ỗ": "o", "ổ": "o", "õ": "o", "ṍ": "o", "ȭ": "o", "ṏ": "o", "ō": "o", "ṑ": "o", "ṓ": "o", "ŏ": "o", "ȯ": "o", "ȱ": "o", "ö": "o", "ȫ": "o", "ỏ": "o", "ő": "o", "ǒ": "o", "ȍ": "o", "ȏ": "o", "ơ": "o", "ờ": "o", "ớ": "o", "ỡ": "o", "ở": "o", "ợ": "o", "ọ": "o", "ộ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "ɔ": "o", "ꝋ": "o", "ꝍ": "o", "ɵ": "o", "ƣ": "oi", "ȣ": "ou", "ꝏ": "oo", "ⓟ": "p", "ｐ": "p", "ṕ": "p", "ṗ": "p", "ƥ": "p", "ᵽ": "p", "ꝑ": "p", "ꝓ": "p", "ꝕ": "p", "ⓠ": "q", "ｑ": "q", "ɋ": "q", "ꝗ": "q", "ꝙ": "q", "ⓡ": "r", "ｒ": "r", "ŕ": "r", "ṙ": "r", "ř": "r", "ȑ": "r", "ȓ": "r", "ṛ": "r", "ṝ": "r", "ŗ": "r", "ṟ": "r", "ɍ": "r", "ɽ": "r", "ꝛ": "r", "ꞧ": "r", "ꞃ": "r", "ⓢ": "s", "ｓ": "s", "ß": "s", "ś": "s", "ṥ": "s", "ŝ": "s", "ṡ": "s", "š": "s", "ṧ": "s", "ṣ": "s", "ṩ": "s", "ș": "s", "ş": "s", "ȿ": "s", "ꞩ": "s", "ꞅ": "s", "ẛ": "s", "ⓣ": "t", "ｔ": "t", "ṫ": "t", "ẗ": "t", "ť": "t", "ṭ": "t", "ț": "t", "ţ": "t", "ṱ": "t", "ṯ": "t", "ŧ": "t", "ƭ": "t", "ʈ": "t", "ⱦ": "t", "ꞇ": "t", "ꜩ": "tz", "ⓤ": "u", "ｕ": "u", "ù": "u", "ú": "u", "û": "u", "ũ": "u", "ṹ": "u", "ū": "u", "ṻ": "u", "ŭ": "u", "ü": "u", "ǜ": "u", "ǘ": "u", "ǖ": "u", "ǚ": "u", "ủ": "u", "ů": "u", "ű": "u", "ǔ": "u", "ȕ": "u", "ȗ": "u", "ư": "u", "ừ": "u", "ứ": "u", "ữ": "u", "ử": "u", "ự": "u", "ụ": "u", "ṳ": "u", "ų": "u", "ṷ": "u", "ṵ": "u", "ʉ": "u", "ⓥ": "v", "ｖ": "v", "ṽ": "v", "ṿ": "v", "ʋ": "v", "ꝟ": "v", "ʌ": "v", "ꝡ": "vy", "ⓦ": "w", "ｗ": "w", "ẁ": "w", "ẃ": "w", "ŵ": "w", "ẇ": "w", "ẅ": "w", "ẘ": "w", "ẉ": "w", "ⱳ": "w", "ⓧ": "x", "ｘ": "x", "ẋ": "x", "ẍ": "x", "ⓨ": "y", "ｙ": "y", "ỳ": "y", "ý": "y", "ŷ": "y", "ỹ": "y", "ȳ": "y", "ẏ": "y", "ÿ": "y", "ỷ": "y", "ẙ": "y", "ỵ": "y", "ƴ": "y", "ɏ": "y", "ỿ": "y", "ⓩ": "z", "ｚ": "z", "ź": "z", "ẑ": "z", "ż": "z", "ž": "z", "ẓ": "z", "ẕ": "z", "ƶ": "z", "ȥ": "z", "ɀ": "z", "ⱬ": "z", "ꝣ": "z", "Ά": "Α", "Έ": "Ε", "Ή": "Η", "Ί": "Ι", "Ϊ": "Ι", "Ό": "Ο", "Ύ": "Υ", "Ϋ": "Υ", "Ώ": "Ω", "ά": "α", "έ": "ε", "ή": "η", "ί": "ι", "ϊ": "ι", "ΐ": "ι", "ό": "ο", "ύ": "υ", "ϋ": "υ", "ΰ": "υ", "ω": "ω", "ς": "σ" }; return a }), b.define("select2/data/base", ["../utils"], function (a) { function b(a, c) { b.__super__.constructor.call(this) } return a.Extend(b, a.Observable), b.prototype.current = function (a) { throw new Error("The `current` method must be defined in child classes.") }, b.prototype.query = function (a, b) { throw new Error("The `query` method must be defined in child classes.") }, b.prototype.bind = function (a, b) { }, b.prototype.destroy = function () { }, b.prototype.generateResultId = function (b, c) { var d = b.id + "-result-"; return d += a.generateChars(4), d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4) }, b }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
            function d(a, b) { this.$element = a, this.options = b, d.__super__.constructor.call(this) } return b.Extend(d, a), d.prototype.current = function (a) { var b = [], d = this; this.$element.find(":selected").each(function () { var a = c(this), e = d.item(a); b.push(e) }), a(b) }, d.prototype.select = function (a) {
                var b = this; if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
                if (this.$element.prop("multiple")) this.current(function (d) { var e = []; a = [a], a.push.apply(a, d); for (var f = 0; f < a.length; f++) { var g = a[f].id; -1 === c.inArray(g, e) && e.push(g) } b.$element.val(e), b.$element.trigger("change") }); else { var d = a.id; this.$element.val(d), this.$element.trigger("change") }
            }, d.prototype.unselect = function (a) { var b = this; if (this.$element.prop("multiple")) return a.selected = !1, c(a.element).is("option") ? (a.element.selected = !1, void this.$element.trigger("change")) : void this.current(function (d) { for (var e = [], f = 0; f < d.length; f++) { var g = d[f].id; g !== a.id && -1 === c.inArray(g, e) && e.push(g) } b.$element.val(e), b.$element.trigger("change") }) }, d.prototype.bind = function (a, b) { var c = this; this.container = a, a.on("select", function (a) { c.select(a.data) }), a.on("unselect", function (a) { c.unselect(a.data) }) }, d.prototype.destroy = function () { this.$element.find("*").each(function () { c.removeData(this, "data") }) }, d.prototype.query = function (a, b) { var d = [], e = this, f = this.$element.children(); f.each(function () { var b = c(this); if (b.is("option") || b.is("optgroup")) { var f = e.item(b), g = e.matches(a, f); null !== g && d.push(g) } }), b({ results: d }) }, d.prototype.addOptions = function (a) { b.appendMany(this.$element, a) }, d.prototype.option = function (a) { var b; a.children ? (b = document.createElement("optgroup"), b.label = a.text) : (b = document.createElement("option"), void 0 !== b.textContent ? b.textContent = a.text : b.innerText = a.text), a.id && (b.value = a.id), a.disabled && (b.disabled = !0), a.selected && (b.selected = !0), a.title && (b.title = a.title); var d = c(b), e = this._normalizeItem(a); return e.element = b, c.data(b, "data", e), d }, d.prototype.item = function (a) { var b = {}; if (b = c.data(a[0], "data"), null != b) return b; if (a.is("option")) b = { id: a.val(), text: a.text(), disabled: a.prop("disabled"), selected: a.prop("selected"), title: a.prop("title") }; else if (a.is("optgroup")) { b = { text: a.prop("label"), children: [], title: a.prop("title") }; for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) { var g = c(d[f]), h = this.item(g); e.push(h) } b.children = e } return b = this._normalizeItem(b), b.element = a[0], c.data(a[0], "data", b), b }, d.prototype._normalizeItem = function (a) { c.isPlainObject(a) || (a = { id: a, text: a }), a = c.extend({}, { text: "" }, a); var b = { selected: !1, disabled: !1 }; return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a) }, d.prototype.matches = function (a, b) { var c = this.options.get("matcher"); return c(a, b) }, d
        }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) { function d(a, b) { var c = b.get("data") || []; d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c)) } return b.Extend(d, a), d.prototype.select = function (a) { var b = this.$element.find("option").filter(function (b, c) { return c.value == a.id.toString() }); 0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a) }, d.prototype.convertToOptions = function (a) { function d(a) { return function () { return c(this).val() == a.id } } for (var e = this, f = this.$element.find("option"), g = f.map(function () { return e.item(c(this)).id }).get(), h = [], i = 0; i < a.length; i++) { var j = this._normalizeItem(a[i]); if (c.inArray(j.id, g) >= 0) { var k = f.filter(d(j)), l = this.item(k), m = c.extend(!0, {}, j, l), n = this.option(m); k.replaceWith(n) } else { var o = this.option(j); if (j.children) { var p = this.convertToOptions(j.children); b.appendMany(o, p) } h.push(o) } } return h }, d }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) { function d(a, b) { this.ajaxOptions = this._applyDefaults(b.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b) } return b.Extend(d, a), d.prototype._applyDefaults = function (a) { var b = { data: function (a) { return c.extend({}, a, { q: a.term }) }, transport: function (a, b, d) { var e = c.ajax(a); return e.then(b), e.fail(d), e } }; return c.extend({}, b, a, !0) }, d.prototype.processResults = function (a) { return a }, d.prototype.query = function (a, b) { function d() { var d = f.transport(f, function (d) { var f = e.processResults(d, a); e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f) }, function () { d.status && "0" === d.status || e.trigger("results:message", { message: "errorLoading" }) }); e._request = d } var e = this; null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null); var f = c.extend({ type: "GET" }, this.ajaxOptions); "function" == typeof f.url && (f.url = f.url.call(this.$element, a)), "function" == typeof f.data && (f.data = f.data.call(this.$element, a)), this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d() }, d }), b.define("select2/data/tags", ["jquery"], function (a) { function b(b, c, d) { var e = d.get("tags"), f = d.get("createTag"); void 0 !== f && (this.createTag = f); var g = d.get("insertTag"); if (void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)) for (var h = 0; h < e.length; h++) { var i = e[h], j = this._normalizeItem(i), k = this.option(j); this.$element.append(k) } } return b.prototype.query = function (a, b, c) { function d(a, f) { for (var g = a.results, h = 0; h < g.length; h++) { var i = g[h], j = null != i.children && !d({ results: i.children }, !0), k = i.text === b.term; if (k || j) return f ? !1 : (a.data = g, void c(a)) } if (f) return !0; var l = e.createTag(b); if (null != l) { var m = e.option(l); m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l) } a.results = g, c(a) } var e = this; return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d) }, b.prototype.createTag = function (b, c) { var d = a.trim(c.term); return "" === d ? null : { id: d, text: d } }, b.prototype.insertTag = function (a, b, c) { b.unshift(c) }, b.prototype._removeOldTags = function (b) { var c = (this._lastTag, this.$element.find("option[data-select2-tag]")); c.each(function () { this.selected || a(this).remove() }) }, b }), b.define("select2/data/tokenizer", ["jquery"], function (a) { function b(a, b, c) { var d = c.get("tokenizer"); void 0 !== d && (this.tokenizer = d), a.call(this, b, c) } return b.prototype.bind = function (a, b, c) { a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field") }, b.prototype.query = function (b, c, d) { function e(b) { var c = g._normalizeItem(b), d = g.$element.find("option").filter(function () { return a(this).val() === c.id }); if (!d.length) { var e = g.option(c); e.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([e]) } f(c) } function f(a) { g.trigger("select", { data: a }) } var g = this; c.term = c.term || ""; var h = this.tokenizer(c, this.options, e); h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), c.term = h.term), b.call(this, c, d) }, b.prototype.tokenizer = function (b, c, d, e) { for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function (a) { return { id: a.term, text: a.term } }; h < g.length;) { var j = g[h]; if (-1 !== a.inArray(j, f)) { var k = g.substr(0, h), l = a.extend({}, c, { term: k }), m = i(l); null != m ? (e(m), g = g.substr(h + 1) || "", h = 0) : h++ } else h++ } return { term: g } }, b }), b.define("select2/data/minimumInputLength", [], function () { function a(a, b, c) { this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { return b.term = b.term || "", b.term.length < this.minimumInputLength ? void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: b.term, params: b } }) : void a.call(this, b, c) }, a }), b.define("select2/data/maximumInputLength", [], function () { function a(a, b, c) { this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { return b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength ? void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: b.term, params: b } }) : void a.call(this, b, c) }, a }), b.define("select2/data/maximumSelectionLength", [], function () { function a(a, b, c) { this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { var d = this; this.current(function (e) { var f = null != e ? e.length : 0; return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength ? void d.trigger("results:message", { message: "maximumSelected", args: { maximum: d.maximumSelectionLength } }) : void a.call(d, b, c) }) }, a }), b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) { function c(a, b) { this.$element = a, this.options = b, c.__super__.constructor.call(this) } return b.Extend(c, b.Observable), c.prototype.render = function () { var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>'); return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b }, c.prototype.bind = function () { }, c.prototype.position = function (a, b) { }, c.prototype.destroy = function () { this.$dropdown.remove() }, c }), b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) { function c() { } return c.prototype.render = function (b) { var c = b.call(this), d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>'); return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c }, c.prototype.bind = function (b, c, d) { var e = this; b.call(this, c, d), this.$search.on("keydown", function (a) { e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented() }), this.$search.on("input", function (b) { a(this).off("keyup") }), this.$search.on("keyup input", function (a) { e.handleSearch(a) }), c.on("open", function () { e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function () { e.$search.focus() }, 0) }), c.on("close", function () { e.$search.attr("tabindex", -1), e.$search.val("") }), c.on("focus", function () { c.isOpen() && e.$search.focus() }), c.on("results:all", function (a) { if (null == a.query.term || "" === a.query.term) { var b = e.showSearch(a); b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide") } }) }, c.prototype.handleSearch = function (a) { if (!this._keyUpPrevented) { var b = this.$search.val(); this.trigger("query", { term: b }) } this._keyUpPrevented = !1 }, c.prototype.showSearch = function (a, b) { return !0 }, c }), b.define("select2/dropdown/hidePlaceholder", [], function () { function a(a, b, c, d) { this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d) } return a.prototype.append = function (a, b) { b.results = this.removePlaceholder(b.results), a.call(this, b) }, a.prototype.normalizePlaceholder = function (a, b) { return "string" == typeof b && (b = { id: "", text: b }), b }, a.prototype.removePlaceholder = function (a, b) { for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) { var e = b[d]; this.placeholder.id === e.id && c.splice(d, 1) } return c }, a }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) { function b(a, b, c, d) { this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1 } return b.prototype.append = function (a, b) { this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore) }, b.prototype.bind = function (b, c, d) { var e = this; b.call(this, c, d), c.on("query", function (a) { e.lastParams = a, e.loading = !0 }), c.on("query:append", function (a) { e.lastParams = a, e.loading = !0 }), this.$results.on("scroll", function () { var b = a.contains(document.documentElement, e.$loadingMore[0]); if (!e.loading && b) { var c = e.$results.offset().top + e.$results.outerHeight(!1), d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1); c + 50 >= d && e.loadMore() } }) }, b.prototype.loadMore = function () { this.loading = !0; var b = a.extend({}, { page: 1 }, this.lastParams); b.page++, this.trigger("query:append", b) }, b.prototype.showLoadingMore = function (a, b) { return b.pagination && b.pagination.more }, b.prototype.createLoadingMore = function () { var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'), c = this.options.get("translations").get("loadingMore"); return b.html(c(this.lastParams)), b }, b }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) { function c(b, c, d) { this.$dropdownParent = d.get("dropdownParent") || a(document.body), b.call(this, c, d) } return c.prototype.bind = function (a, b, c) { var d = this, e = !1; a.call(this, b, c), b.on("open", function () { d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function () { d._positionDropdown(), d._resizeDropdown() }), b.on("results:append", function () { d._positionDropdown(), d._resizeDropdown() })) }), b.on("close", function () { d._hideDropdown(), d._detachPositioningHandler(b) }), this.$dropdownContainer.on("mousedown", function (a) { a.stopPropagation() }) }, c.prototype.destroy = function (a) { a.call(this), this.$dropdownContainer.remove() }, c.prototype.position = function (a, b, c) { b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({ position: "absolute", top: -999999 }), this.$container = c }, c.prototype.render = function (b) { var c = a("<span></span>"), d = b.call(this); return c.append(d), this.$dropdownContainer = c, c }, c.prototype._hideDropdown = function (a) { this.$dropdownContainer.detach() }, c.prototype._attachPositioningHandler = function (c, d) { var e = this, f = "scroll.select2." + d.id, g = "resize.select2." + d.id, h = "orientationchange.select2." + d.id, i = this.$container.parents().filter(b.hasScroll); i.each(function () { a(this).data("select2-scroll-position", { x: a(this).scrollLeft(), y: a(this).scrollTop() }) }), i.on(f, function (b) { var c = a(this).data("select2-scroll-position"); a(this).scrollTop(c.y) }), a(window).on(f + " " + g + " " + h, function (a) { e._positionDropdown(), e._resizeDropdown() }) }, c.prototype._detachPositioningHandler = function (c, d) { var e = "scroll.select2." + d.id, f = "resize.select2." + d.id, g = "orientationchange.select2." + d.id, h = this.$container.parents().filter(b.hasScroll); h.off(e), a(window).off(e + " " + f + " " + g) }, c.prototype._positionDropdown = function () { var b = a(window), c = this.$dropdown.hasClass("select2-dropdown--above"), d = this.$dropdown.hasClass("select2-dropdown--below"), e = null, f = this.$container.offset(); f.bottom = f.top + this.$container.outerHeight(!1); var g = { height: this.$container.outerHeight(!1) }; g.top = f.top, g.bottom = f.top + g.height; var h = { height: this.$dropdown.outerHeight(!1) }, i = { top: b.scrollTop(), bottom: b.scrollTop() + b.height() }, j = i.top < f.top - h.height, k = i.bottom > f.bottom + h.height, l = { left: f.left, top: g.bottom }, m = this.$dropdownParent; "static" === m.css("position") && (m = m.offsetParent()); var n = m.offset(); l.top -= n.top, l.left -= n.left, c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - n.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l) }, c.prototype._resizeDropdown = function () { var a = { width: this.$container.outerWidth(!1) + "px" }; this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.position = "relative", a.width = "auto"), this.$dropdown.css(a) }, c.prototype._showDropdown = function (a) { this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown() }, c }), b.define("select2/dropdown/minimumResultsForSearch", [], function () { function a(b) { for (var c = 0, d = 0; d < b.length; d++) { var e = b[d]; e.children ? c += a(e.children) : c++ } return c } function b(a, b, c, d) { this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d) } return b.prototype.showSearch = function (b, c) { return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c) }, b }), b.define("select2/dropdown/selectOnClose", [], function () { function a() { } return a.prototype.bind = function (a, b, c) { var d = this; a.call(this, b, c), b.on("close", function (a) { d._handleSelectOnClose(a) }) }, a.prototype._handleSelectOnClose = function (a, b) { if (b && null != b.originalSelect2Event) { var c = b.originalSelect2Event; if ("select" === c._type || "unselect" === c._type) return } var d = this.getHighlightedResults(); if (!(d.length < 1)) { var e = d.data("data"); null != e.element && e.element.selected || null == e.element && e.selected || this.trigger("select", { data: e }) } }, a }), b.define("select2/dropdown/closeOnSelect", [], function () { function a() { } return a.prototype.bind = function (a, b, c) { var d = this; a.call(this, b, c), b.on("select", function (a) { d._selectTriggered(a) }), b.on("unselect", function (a) { d._selectTriggered(a) }) }, a.prototype._selectTriggered = function (a, b) { var c = b.originalEvent; c && c.ctrlKey || this.trigger("close", { originalEvent: c, originalSelect2Event: b }) }, a }), b.define("select2/i18n/en", [], function () { return { errorLoading: function () { return "The results could not be loaded." }, inputTooLong: function (a) { var b = a.input.length - a.maximum, c = "Please delete " + b + " character"; return 1 != b && (c += "s"), c }, inputTooShort: function (a) { var b = a.minimum - a.input.length, c = "Please enter " + b + " or more characters"; return c }, loadingMore: function () { return "Loading more results…" }, maximumSelected: function (a) { var b = "You can only select " + a.maximum + " item"; return 1 != a.maximum && (b += "s"), b }, noResults: function () { return "No results found" }, searching: function () { return "Searching…" } } }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) { function D() { this.reset() } D.prototype.apply = function (l) { if (l = a.extend(!0, {}, this.defaults, l), null == l.dataAdapter) { if (null != l.ajax ? l.dataAdapter = o : null != l.data ? l.dataAdapter = n : l.dataAdapter = m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) { var C = b(l.amdBase + "compat/query"); l.dataAdapter = j.Decorate(l.dataAdapter, C) } if (null != l.initSelection) { var D = b(l.amdBase + "compat/initSelection"); l.dataAdapter = j.Decorate(l.dataAdapter, D) } } if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) { if (l.multiple) l.dropdownAdapter = u; else { var E = j.Decorate(u, v); l.dropdownAdapter = E } if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) { var F = b(l.amdBase + "compat/dropdownCss"); l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F) } l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y) } if (null == l.selectionAdapter) { if (l.multiple ? l.selectionAdapter = e : l.selectionAdapter = d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) { var G = b(l.amdBase + "compat/containerCss"); l.selectionAdapter = j.Decorate(l.selectionAdapter, G) } l.selectionAdapter = j.Decorate(l.selectionAdapter, i) } if ("string" == typeof l.language) if (l.language.indexOf("-") > 0) { var H = l.language.split("-"), I = H[0]; l.language = [l.language, I] } else l.language = [l.language]; if (a.isArray(l.language)) { var J = new k; l.language.push("en"); for (var K = l.language, L = 0; L < K.length; L++) { var M = K[L], N = {}; try { N = k.loadPath(M) } catch (O) { try { M = this.defaults.amdLanguageBase + M, N = k.loadPath(M) } catch (P) { l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.'); continue } } J.extend(N) } l.translations = J } else { var Q = k.loadPath(this.defaults.amdLanguageBase + "en"), R = new k(l.language); R.extend(Q), l.translations = R } return l }, D.prototype.reset = function () { function b(a) { function b(a) { return l[a] || a } return a.replace(/[^\u0000-\u007E]/g, b) } function c(d, e) { if ("" === a.trim(d.term)) return e; if (e.children && e.children.length > 0) { for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) { var h = e.children[g], i = c(d, h); null == i && f.children.splice(g, 1) } return f.children.length > 0 ? f : c(d, f) } var j = b(e.text).toUpperCase(), k = b(d.term).toUpperCase(); return j.indexOf(k) > -1 ? e : null } this.defaults = { amdBase: "./", amdLanguageBase: "./i18n/", closeOnSelect: !0, debug: !1, dropdownAutoWidth: !1, escapeMarkup: j.escapeMarkup, language: C, matcher: c, minimumInputLength: 0, maximumInputLength: 0, maximumSelectionLength: 0, minimumResultsForSearch: 0, selectOnClose: !1, sorter: function (a) { return a }, templateResult: function (a) { return a.text }, templateSelection: function (a) { return a.text }, theme: "default", width: "resolve" } }, D.prototype.set = function (b, c) { var d = a.camelCase(b), e = {}; e[d] = c; var f = j._convertData(e); a.extend(this.defaults, f) }; var E = new D; return E }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) { function e(b, e) { if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) { var f = a(this.get("amdBase") + "compat/inputData"); this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f) } } return e.prototype.fromElement = function (a) { var c = ["select2"]; null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (a.prop("dir") ? this.options.dir = a.prop("dir") : a.closest("[dir]").prop("dir") ? this.options.dir = a.closest("[dir]").prop("dir") : this.options.dir = "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), a.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), a.data("data", a.data("select2Tags")), a.data("tags", !0)), a.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", a.data("ajaxUrl")), a.data("ajax--url", a.data("ajaxUrl"))); var e = {}; e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data(); var f = b.extend(!0, {}, e); f = d._convertData(f); for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]); return this }, e.prototype.get = function (a) { return this.options[a] }, e.prototype.set = function (a, b) { this.options[a] = b }, e }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
            var e = function (a, c) { null != a.data("select2") && a.data("select2").destroy(), this.$element = a, this.id = this._generateId(a), c = c || {}, this.options = new b(c, a), e.__super__.constructor.call(this); var d = a.attr("tabindex") || 0; a.data("old-tabindex", d), a.attr("tabindex", "-1"); var f = this.options.get("dataAdapter"); this.dataAdapter = new f(a, this.options); var g = this.render(); this._placeContainer(g); var h = this.options.get("selectionAdapter"); this.selection = new h(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, g); var i = this.options.get("dropdownAdapter"); this.dropdown = new i(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, g); var j = this.options.get("resultsAdapter"); this.results = new j(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown); var k = this; this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (a) { k.trigger("selection:update", { data: a }) }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), a.data("select2", this) }; return c.Extend(e, c.Observable), e.prototype._generateId = function (a) { var b = ""; return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = b.replace(/(:|\.|\[|\]|,)/g, ""), b = "select2-" + b }, e.prototype._placeContainer = function (a) { a.insertAfter(this.$element); var b = this._resolveWidth(this.$element, this.options.get("width")); null != b && a.css("width", b) }, e.prototype._resolveWidth = function (a, b) { var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i; if ("resolve" == b) { var d = this._resolveWidth(a, "style"); return null != d ? d : this._resolveWidth(a, "element") } if ("element" == b) { var e = a.outerWidth(!1); return 0 >= e ? "auto" : e + "px" } if ("style" == b) { var f = a.attr("style"); if ("string" != typeof f) return null; for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) { var j = g[h].replace(/\s/g, ""), k = j.match(c); if (null !== k && k.length >= 1) return k[1] } return null } return b }, e.prototype._bindAdapters = function () { this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container) }, e.prototype._registerDomEvents = function () { var b = this; this.$element.on("change.select2", function () { b.dataAdapter.current(function (a) { b.trigger("selection:update", { data: a }) }) }), this.$element.on("focus.select2", function (a) { b.trigger("focus", a) }), this._syncA = c.bind(this._syncAttributes, this), this._syncS = c.bind(this._syncSubtree, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA); var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver; null != d ? (this._observer = new d(function (c) { a.each(c, b._syncA), a.each(c, b._syncS) }), this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 })) : this.$element[0].addEventListener && (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1), this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1), this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1)) }, e.prototype._registerDataEvents = function () { var a = this; this.dataAdapter.on("*", function (b, c) { a.trigger(b, c) }) }, e.prototype._registerSelectionEvents = function () { var b = this, c = ["toggle", "focus"]; this.selection.on("toggle", function () { b.toggleDropdown() }), this.selection.on("focus", function (a) { b.focus(a) }), this.selection.on("*", function (d, e) { -1 === a.inArray(d, c) && b.trigger(d, e) }) }, e.prototype._registerDropdownEvents = function () { var a = this; this.dropdown.on("*", function (b, c) { a.trigger(b, c) }) }, e.prototype._registerResultsEvents = function () { var a = this; this.results.on("*", function (b, c) { a.trigger(b, c) }) }, e.prototype._registerEvents = function () { var a = this; this.on("open", function () { a.$container.addClass("select2-container--open") }), this.on("close", function () { a.$container.removeClass("select2-container--open") }), this.on("enable", function () { a.$container.removeClass("select2-container--disabled") }), this.on("disable", function () { a.$container.addClass("select2-container--disabled") }), this.on("blur", function () { a.$container.removeClass("select2-container--focus") }), this.on("query", function (b) { a.isOpen() || a.trigger("open", {}), this.dataAdapter.query(b, function (c) { a.trigger("results:all", { data: c, query: b }) }) }), this.on("query:append", function (b) { this.dataAdapter.query(b, function (c) { a.trigger("results:append", { data: c, query: b }) }) }), this.on("keypress", function (b) { var c = b.which; a.isOpen() ? c === d.ESC || c === d.TAB || c === d.UP && b.altKey ? (a.close(), b.preventDefault()) : c === d.ENTER ? (a.trigger("results:select", {}), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle", {}), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous", {}), b.preventDefault()) : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || c === d.DOWN && b.altKey) && (a.open(), b.preventDefault()) }) }, e.prototype._syncAttributes = function () { this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {}) }, e.prototype._syncSubtree = function (a, b) { var c = !1, d = this; if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) { if (b) if (b.addedNodes && b.addedNodes.length > 0) for (var e = 0; e < b.addedNodes.length; e++) { var f = b.addedNodes[e]; f.selected && (c = !0) } else b.removedNodes && b.removedNodes.length > 0 && (c = !0); else c = !0; c && this.dataAdapter.current(function (a) { d.trigger("selection:update", { data: a }) }) } }, e.prototype.trigger = function (a, b) { var c = e.__super__.trigger, d = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" }; if (void 0 === b && (b = {}), a in d) { var f = d[a], g = { prevented: !1, name: a, args: b }; if (c.call(this, f, g), g.prevented) return void (b.prevented = !0) } c.call(this, a, b) }, e.prototype.toggleDropdown = function () { this.options.get("disabled") || (this.isOpen() ? this.close() : this.open()) }, e.prototype.open = function () { this.isOpen() || this.trigger("query", {}) }, e.prototype.close = function () { this.isOpen() && this.trigger("close", {}) }, e.prototype.isOpen = function () { return this.$container.hasClass("select2-container--open") }, e.prototype.hasFocus = function () { return this.$container.hasClass("select2-container--focus") }, e.prototype.focus = function (a) { this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {})) }, e.prototype.enable = function (a) { this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == a || 0 === a.length) && (a = [!0]); var b = !a[0]; this.$element.prop("disabled", b) }, e.prototype.data = function () { this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'); var a = []; return this.dataAdapter.current(function (b) { a = b }), a }, e.prototype.val = function (b) { if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val(); var c = b[0]; a.isArray(c) && (c = a.map(c, function (a) { return a.toString() })), this.$element.val(c).trigger("change") }, e.prototype.destroy = function () {
                this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1), this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1), this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)), this._syncA = null, this._syncS = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
            }, e.prototype.render = function () { var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'); return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b }, e
        }), b.define("select2/compat/utils", ["jquery"], function (a) { function b(b, c, d) { var e, f, g = []; e = a.trim(b.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each(function () { 0 === this.indexOf("select2-") && g.push(this) })), e = a.trim(c.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each(function () { 0 !== this.indexOf("select2-") && (f = d(this), null != f && g.push(f)) })), b.attr("class", g.join(" ")) } return { syncCssClasses: b } }), b.define("select2/compat/containerCss", ["jquery", "./utils"], function (a, b) { function c(a) { return null } function d() { } return d.prototype.render = function (d) { var e = d.call(this), f = this.options.get("containerCssClass") || ""; a.isFunction(f) && (f = f(this.$element)); var g = this.options.get("adaptContainerCssClass"); if (g = g || c, -1 !== f.indexOf(":all:")) { f = f.replace(":all:", ""); var h = g; g = function (a) { var b = h(a); return null != b ? b + " " + a : a } } var i = this.options.get("containerCss") || {}; return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e }, d }), b.define("select2/compat/dropdownCss", ["jquery", "./utils"], function (a, b) { function c(a) { return null } function d() { } return d.prototype.render = function (d) { var e = d.call(this), f = this.options.get("dropdownCssClass") || ""; a.isFunction(f) && (f = f(this.$element)); var g = this.options.get("adaptDropdownCssClass"); if (g = g || c, -1 !== f.indexOf(":all:")) { f = f.replace(":all:", ""); var h = g; g = function (a) { var b = h(a); return null != b ? b + " " + a : a } } var i = this.options.get("dropdownCss") || {}; return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e }, d }), b.define("select2/compat/initSelection", ["jquery"], function (a) { function b(a, b, c) { c.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = c.get("initSelection"), this._isInitialized = !1, a.call(this, b, c) } return b.prototype.current = function (b, c) { var d = this; return this._isInitialized ? void b.call(this, c) : void this.initSelection.call(null, this.$element, function (b) { d._isInitialized = !0, a.isArray(b) || (b = [b]), c(b) }) }, b }), b.define("select2/compat/inputData", ["jquery"], function (a) { function b(a, b, c) { this._currentData = [], this._valueSeparator = c.get("valueSeparator") || ",", "hidden" === b.prop("type") && c.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), a.call(this, b, c) } return b.prototype.current = function (b, c) { function d(b, c) { var e = []; return b.selected || -1 !== a.inArray(b.id, c) ? (b.selected = !0, e.push(b)) : b.selected = !1, b.children && e.push.apply(e, d(b.children, c)), e } for (var e = [], f = 0; f < this._currentData.length; f++) { var g = this._currentData[f]; e.push.apply(e, d(g, this.$element.val().split(this._valueSeparator))) } c(e) }, b.prototype.select = function (b, c) { if (this.options.get("multiple")) { var d = this.$element.val(); d += this._valueSeparator + c.id, this.$element.val(d), this.$element.trigger("change") } else this.current(function (b) { a.map(b, function (a) { a.selected = !1 }) }), this.$element.val(c.id), this.$element.trigger("change") }, b.prototype.unselect = function (a, b) { var c = this; b.selected = !1, this.current(function (a) { for (var d = [], e = 0; e < a.length; e++) { var f = a[e]; b.id != f.id && d.push(f.id) } c.$element.val(d.join(c._valueSeparator)), c.$element.trigger("change") }) }, b.prototype.query = function (a, b, c) { for (var d = [], e = 0; e < this._currentData.length; e++) { var f = this._currentData[e], g = this.matches(b, f); null !== g && d.push(g) } c({ results: d }) }, b.prototype.addOptions = function (b, c) { var d = a.map(c, function (b) { return a.data(b[0], "data") }); this._currentData.push.apply(this._currentData, d) }, b }), b.define("select2/compat/matcher", ["jquery"], function (a) { function b(b) { function c(c, d) { var e = a.extend(!0, {}, d); if (null == c.term || "" === a.trim(c.term)) return e; if (d.children) { for (var f = d.children.length - 1; f >= 0; f--) { var g = d.children[f], h = b(c.term, g.text, g); h || e.children.splice(f, 1) } if (e.children.length > 0) return e } return b(c.term, d.text, d) ? e : null } return c } return b }), b.define("select2/compat/query", [], function () { function a(a, b, c) { c.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), a.call(this, b, c) } return a.prototype.query = function (a, b, c) { b.callback = c; var d = this.options.get("query"); d.call(null, b) }, a }), b.define("select2/dropdown/attachContainer", [], function () { function a(a, b, c) { a.call(this, b, c) } return a.prototype.position = function (a, b, c) { var d = c.find(".dropdown-wrapper"); d.append(b), b.addClass("select2-dropdown--below"), c.addClass("select2-container--below") }, a }), b.define("select2/dropdown/stopPropagation", [], function () { function a() { } return a.prototype.bind = function (a, b, c) { a.call(this, b, c); var d = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"]; this.$dropdown.on(d.join(" "), function (a) { a.stopPropagation() }) }, a }), b.define("select2/selection/stopPropagation", [], function () { function a() { } return a.prototype.bind = function (a, b, c) { a.call(this, b, c); var d = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"]; this.$selection.on(d.join(" "), function (a) { a.stopPropagation() }) }, a }), function (c) { "function" == typeof b.define && b.define.amd ? b.define("jquery-mousewheel", ["jquery"], c) : "object" == typeof exports ? module.exports = c : c(a) }(function (a) { function b(b) { var g = b || window.event, h = i.call(arguments, 1), j = 0, l = 0, m = 0, n = 0, o = 0, p = 0; if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) { if (1 === g.deltaMode) { var q = a.data(this, "mousewheel-line-height"); j *= q, m *= q, l *= q } else if (2 === g.deltaMode) { var r = a.data(this, "mousewheel-page-height"); j *= r, m *= r, l *= r } if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) { var s = this.getBoundingClientRect(); o = b.clientX - s.left, p = b.clientY - s.top } return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h) } } function c() { f = null } function d(a, b) { return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0 } var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice; if (a.event.fixHooks) for (var j = g.length; j;)a.event.fixHooks[g[--j]] = a.event.mouseHooks; var k = a.event.special.mousewheel = { version: "3.1.12", setup: function () { if (this.addEventListener) for (var c = h.length; c;)this.addEventListener(h[--c], b, !1); else this.onmousewheel = b; a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this)) }, teardown: function () { if (this.removeEventListener) for (var c = h.length; c;)this.removeEventListener(h[--c], b, !1); else this.onmousewheel = null; a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height") }, getLineHeight: function (b) { var c = a(b), d = c["offsetParent" in a.fn ? "offsetParent" : "parent"](); return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16 }, getPageHeight: function (b) { return a(b).height() }, settings: { adjustOldDeltas: !0, normalizeOffset: !0 } }; a.fn.extend({ mousewheel: function (a) { return a ? this.bind("mousewheel", a) : this.trigger("mousewheel") }, unmousewheel: function (a) { return this.unbind("mousewheel", a) } }) }), b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (a, b, c, d) { if (null == a.fn.select2) { var e = ["open", "close", "destroy"]; a.fn.select2 = function (b) { if (b = b || {}, "object" == typeof b) return this.each(function () { var d = a.extend(!0, {}, b); new c(a(this), d) }), this; if ("string" == typeof b) { var d, f = Array.prototype.slice.call(arguments, 1); return this.each(function () { var c = a(this).data("select2"); null == c && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), d = c[b].apply(c, f) }), a.inArray(b, e) > -1 ? this : d } throw new Error("Invalid arguments for Select2: " + b) } } return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c }), { define: b.define, require: b.require }
    }(), c = b.require("jquery.select2"); return a.fn.select2.amd = b, c
});


//! moment.js
//! version : 2.11.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (a, b) { "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b() }(this, function () {
    "use strict"; function a() { return Qc.apply(null, arguments) } function b(a) { Qc = a } function c(a) { return "[object Array]" === Object.prototype.toString.call(a) } function d(a) { return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a) } function e(a, b) { var c, d = []; for (c = 0; c < a.length; ++c)d.push(b(a[c], c)); return d } function f(a, b) { return Object.prototype.hasOwnProperty.call(a, b) } function g(a, b) { for (var c in b) f(b, c) && (a[c] = b[c]); return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), a } function h(a, b, c, d) { return za(a, b, c, d, !0).utc() } function i() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1 } } function j(a) { return null == a._pf && (a._pf = i()), a._pf } function k(a) { if (null == a._isValid) { var b = j(a); a._isValid = !(isNaN(a._d.getTime()) || !(b.overflow < 0) || b.empty || b.invalidMonth || b.invalidWeekday || b.nullInput || b.invalidFormat || b.userInvalidated), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour) } return a._isValid } function l(a) { var b = h(NaN); return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b } function m(a) { return void 0 === a } function n(a, b) { var c, d, e; if (m(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), m(b._i) || (a._i = b._i), m(b._f) || (a._f = b._f), m(b._l) || (a._l = b._l), m(b._strict) || (a._strict = b._strict), m(b._tzm) || (a._tzm = b._tzm), m(b._isUTC) || (a._isUTC = b._isUTC), m(b._offset) || (a._offset = b._offset), m(b._pf) || (a._pf = j(b)), m(b._locale) || (a._locale = b._locale), Sc.length > 0) for (c in Sc) d = Sc[c], e = b[d], m(e) || (a[d] = e); return a } function o(b) { n(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), Tc === !1 && (Tc = !0, a.updateOffset(this), Tc = !1) } function p(a) { return a instanceof o || null != a && null != a._isAMomentObject } function q(a) { return 0 > a ? Math.ceil(a) : Math.floor(a) } function r(a) { var b = +a, c = 0; return 0 !== b && isFinite(b) && (c = q(b)), c } function s(a, b, c) { var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0; for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && r(a[d]) !== r(b[d])) && g++; return g + f } function t() { } function u(a) { return a ? a.toLowerCase().replace("_", "-") : a } function v(a) { for (var b, c, d, e, f = 0; f < a.length;) { for (e = u(a[f]).split("-"), b = e.length, c = u(a[f + 1]), c = c ? c.split("-") : null; b > 0;) { if (d = w(e.slice(0, b).join("-"))) return d; if (c && c.length >= b && s(e, c, !0) >= b - 1) break; b-- } f++ } return null } function w(a) { var b = null; if (!Uc[a] && !m(module) && module && module.exports) try { b = Rc._abbr, require("./locale/" + a), x(b) } catch (c) { } return Uc[a] } function x(a, b) { var c; return a && (c = m(b) ? z(a) : y(a, b), c && (Rc = c)), Rc._abbr } function y(a, b) { return null !== b ? (b.abbr = a, Uc[a] = Uc[a] || new t, Uc[a].set(b), x(a), Uc[a]) : (delete Uc[a], null) } function z(a) { var b; if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Rc; if (!c(a)) { if (b = w(a)) return b; a = [a] } return v(a) } function A(a, b) { var c = a.toLowerCase(); Vc[c] = Vc[c + "s"] = Vc[b] = a } function B(a) { return "string" == typeof a ? Vc[a] || Vc[a.toLowerCase()] : void 0 } function C(a) { var b, c, d = {}; for (c in a) f(a, c) && (b = B(c), b && (d[b] = a[c])); return d } function D(a) { return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a) } function E(b, c) { return function (d) { return null != d ? (G(this, b, d), a.updateOffset(this, c), this) : F(this, b) } } function F(a, b) { return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN } function G(a, b, c) { a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c) } function H(a, b) { var c; if ("object" == typeof a) for (c in a) this.set(c, a[c]); else if (a = B(a), D(this[a])) return this[a](b); return this } function I(a, b, c) { var d = "" + Math.abs(a), e = b - d.length, f = a >= 0; return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d } function J(a, b, c, d) { var e = d; "string" == typeof d && (e = function () { return this[d]() }), a && (Zc[a] = e), b && (Zc[b[0]] = function () { return I(e.apply(this, arguments), b[1], b[2]) }), c && (Zc[c] = function () { return this.localeData().ordinal(e.apply(this, arguments), a) }) } function K(a) { return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "") } function L(a) { var b, c, d = a.match(Wc); for (b = 0, c = d.length; c > b; b++)Zc[d[b]] ? d[b] = Zc[d[b]] : d[b] = K(d[b]); return function (e) { var f = ""; for (b = 0; c > b; b++)f += d[b] instanceof Function ? d[b].call(e, a) : d[b]; return f } } function M(a, b) { return a.isValid() ? (b = N(b, a.localeData()), Yc[b] = Yc[b] || L(b), Yc[b](a)) : a.localeData().invalidDate() } function N(a, b) { function c(a) { return b.longDateFormat(a) || a } var d = 5; for (Xc.lastIndex = 0; d >= 0 && Xc.test(a);)a = a.replace(Xc, c), Xc.lastIndex = 0, d -= 1; return a } function O(a, b, c) { pd[a] = D(b) ? b : function (a) { return a && c ? c : b } } function P(a, b) { return f(pd, a) ? pd[a](b._strict, b._locale) : new RegExp(Q(a)) } function Q(a) { return a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) { return b || c || d || e }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") } function R(a, b) { var c, d = b; for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function (a, c) { c[b] = r(a) }), c = 0; c < a.length; c++)qd[a[c]] = d } function S(a, b) { R(a, function (a, c, d, e) { d._w = d._w || {}, b(a, d._w, d, e) }) } function T(a, b, c) { null != b && f(qd, a) && qd[a](b, c._a, c, a) } function U(a, b) { return new Date(Date.UTC(a, b + 1, 0)).getUTCDate() } function V(a, b) { return c(this._months) ? this._months[a.month()] : this._months[Ad.test(b) ? "format" : "standalone"][a.month()] } function W(a, b) { return c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[Ad.test(b) ? "format" : "standalone"][a.month()] } function X(a, b, c) { var d, e, f; for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) { if (e = h([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d; if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d; if (!c && this._monthsParse[d].test(a)) return d } } function Y(a, b) { var c; return a.isValid() ? "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), U(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a) : a } function Z(b) { return null != b ? (Y(this, b), a.updateOffset(this, !0), this) : F(this, "Month") } function $() { return U(this.year(), this.month()) } function _(a) { var b, c = a._a; return c && -2 === j(a).overflow && (b = c[sd] < 0 || c[sd] > 11 ? sd : c[td] < 1 || c[td] > U(c[rd], c[sd]) ? td : c[ud] < 0 || c[ud] > 24 || 24 === c[ud] && (0 !== c[vd] || 0 !== c[wd] || 0 !== c[xd]) ? ud : c[vd] < 0 || c[vd] > 59 ? vd : c[wd] < 0 || c[wd] > 59 ? wd : c[xd] < 0 || c[xd] > 999 ? xd : -1, j(a)._overflowDayOfYear && (rd > b || b > td) && (b = td), j(a)._overflowWeeks && -1 === b && (b = yd), j(a)._overflowWeekday && -1 === b && (b = zd), j(a).overflow = b), a } function aa(b) { a.suppressDeprecationWarnings === !1 && !m(console) && console.warn && console.warn("Deprecation warning: " + b) } function ba(a, b) { var c = !0; return g(function () { return c && (aa(a + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), c = !1), b.apply(this, arguments) }, b) } function ca(a, b) { Dd[a] || (aa(b), Dd[a] = !0) } function da(a) { var b, c, d, e, f, g, h = a._i, i = Ed.exec(h) || Fd.exec(h); if (i) { for (j(a).iso = !0, b = 0, c = Hd.length; c > b; b++)if (Hd[b][1].exec(i[1])) { e = Hd[b][0], d = Hd[b][2] !== !1; break } if (null == e) return void (a._isValid = !1); if (i[3]) { for (b = 0, c = Id.length; c > b; b++)if (Id[b][1].exec(i[3])) { f = (i[2] || " ") + Id[b][0]; break } if (null == f) return void (a._isValid = !1) } if (!d && null != f) return void (a._isValid = !1); if (i[4]) { if (!Gd.exec(i[4])) return void (a._isValid = !1); g = "Z" } a._f = e + (f || "") + (g || ""), sa(a) } else a._isValid = !1 } function ea(b) { var c = Jd.exec(b._i); return null !== c ? void (b._d = new Date(+c[1])) : (da(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b)))) } function fa(a, b, c, d, e, f, g) { var h = new Date(a, b, c, d, e, f, g); return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h } function ga(a) { var b = new Date(Date.UTC.apply(null, arguments)); return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b } function ha(a) { return ia(a) ? 366 : 365 } function ia(a) { return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0 } function ja() { return ia(this.year()) } function ka(a, b, c) { var d = 7 + b - c, e = (7 + ga(a, 0, d).getUTCDay() - b) % 7; return -e + d - 1 } function la(a, b, c, d, e) { var f, g, h = (7 + c - d) % 7, i = ka(a, d, e), j = 1 + 7 * (b - 1) + h + i; return 0 >= j ? (f = a - 1, g = ha(f) + j) : j > ha(a) ? (f = a + 1, g = j - ha(a)) : (f = a, g = j), { year: f, dayOfYear: g } } function ma(a, b, c) { var d, e, f = ka(a.year(), b, c), g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1; return 1 > g ? (e = a.year() - 1, d = g + na(e, b, c)) : g > na(a.year(), b, c) ? (d = g - na(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), { week: d, year: e } } function na(a, b, c) { var d = ka(a, b, c), e = ka(a + 1, b, c); return (ha(a) - d + e) / 7 } function oa(a, b, c) { return null != a ? a : null != b ? b : c } function pa(b) { var c = new Date(a.now()); return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()] } function qa(a) { var b, c, d, e, f = []; if (!a._d) { for (d = pa(a), a._w && null == a._a[td] && null == a._a[sd] && ra(a), a._dayOfYear && (e = oa(a._a[rd], d[rd]), a._dayOfYear > ha(e) && (j(a)._overflowDayOfYear = !0), c = ga(e, 0, a._dayOfYear), a._a[sd] = c.getUTCMonth(), a._a[td] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b)a._a[b] = f[b] = d[b]; for (; 7 > b; b++)a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b]; 24 === a._a[ud] && 0 === a._a[vd] && 0 === a._a[wd] && 0 === a._a[xd] && (a._nextDay = !0, a._a[ud] = 0), a._d = (a._useUTC ? ga : fa).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[ud] = 24) } } function ra(a) { var b, c, d, e, f, g, h, i; b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = oa(b.GG, a._a[rd], ma(Aa(), 1, 4).year), d = oa(b.W, 1), e = oa(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = oa(b.gg, a._a[rd], ma(Aa(), f, g).year), d = oa(b.w, 1), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > na(c, f, g) ? j(a)._overflowWeeks = !0 : null != i ? j(a)._overflowWeekday = !0 : (h = la(c, d, e, f, g), a._a[rd] = h.year, a._dayOfYear = h.dayOfYear) } function sa(b) { if (b._f === a.ISO_8601) return void da(b); b._a = [], j(b).empty = !0; var c, d, e, f, g, h = "" + b._i, i = h.length, k = 0; for (e = N(b._f, b._locale).match(Wc) || [], c = 0; c < e.length; c++)f = e[c], d = (h.match(P(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), Zc[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), T(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f); j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[ud] <= 12 && b._a[ud] > 0 && (j(b).bigHour = void 0), b._a[ud] = ta(b._locale, b._a[ud], b._meridiem), qa(b), _(b) } function ta(a, b, c) { var d; return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b } function ua(a) { var b, c, d, e, f; if (0 === a._f.length) return j(a).invalidFormat = !0, void (a._d = new Date(NaN)); for (e = 0; e < a._f.length; e++)f = 0, b = n({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], sa(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b)); g(a, c || b) } function va(a) { if (!a._d) { var b = C(a._i); a._a = e([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) { return a && parseInt(a, 10) }), qa(a) } } function wa(a) { var b = new o(_(xa(a))); return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b } function xa(a) { var b = a._i, e = a._f; return a._locale = a._locale || z(a._l), null === b || void 0 === e && "" === b ? l({ nullInput: !0 }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), p(b) ? new o(_(b)) : (c(e) ? ua(a) : e ? sa(a) : d(b) ? a._d = b : ya(a), k(a) || (a._d = null), a)) } function ya(b) { var f = b._i; void 0 === f ? b._d = new Date(a.now()) : d(f) ? b._d = new Date(+f) : "string" == typeof f ? ea(b) : c(f) ? (b._a = e(f.slice(0), function (a) { return parseInt(a, 10) }), qa(b)) : "object" == typeof f ? va(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b) } function za(a, b, c, d, e) { var f = {}; return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, wa(f) } function Aa(a, b, c, d) { return za(a, b, c, d, !1) } function Ba(a, b) { var d, e; if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return Aa(); for (d = b[0], e = 1; e < b.length; ++e)(!b[e].isValid() || b[e][a](d)) && (d = b[e]); return d } function Ca() { var a = [].slice.call(arguments, 0); return Ba("isBefore", a) } function Da() { var a = [].slice.call(arguments, 0); return Ba("isAfter", a) } function Ea(a) { var b = C(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0; this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = z(), this._bubble() } function Fa(a) { return a instanceof Ea } function Ga(a, b) { J(a, 0, 0, function () { var a = this.utcOffset(), c = "+"; return 0 > a && (a = -a, c = "-"), c + I(~~(a / 60), 2) + b + I(~~a % 60, 2) }) } function Ha(a, b) { var c = (b || "").match(a) || [], d = c[c.length - 1] || [], e = (d + "").match(Od) || ["-", 0, 0], f = +(60 * e[1]) + r(e[2]); return "+" === e[0] ? f : -f } function Ia(b, c) { var e, f; return c._isUTC ? (e = c.clone(), f = (p(b) || d(b) ? +b : +Aa(b)) - +e, e._d.setTime(+e._d + f), a.updateOffset(e, !1), e) : Aa(b).local() } function Ja(a) { return 15 * -Math.round(a._d.getTimezoneOffset() / 15) } function Ka(b, c) { var d, e = this._offset || 0; return this.isValid() ? null != b ? ("string" == typeof b ? b = Ha(md, b) : Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ja(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? $a(this, Va(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ja(this) : null != b ? this : NaN } function La(a, b) { return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset() } function Ma(a) { return this.utcOffset(0, a) } function Na(a) { return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ja(this), "m")), this } function Oa() { return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ha(ld, this._i)), this } function Pa(a) { return this.isValid() ? (a = a ? Aa(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0) : !1 } function Qa() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset() } function Ra() { if (!m(this._isDSTShifted)) return this._isDSTShifted; var a = {}; if (n(a, this), a = xa(a), a._a) { var b = a._isUTC ? h(a._a) : Aa(a._a); this._isDSTShifted = this.isValid() && s(a._a, b.toArray()) > 0 } else this._isDSTShifted = !1; return this._isDSTShifted } function Sa() { return this.isValid() ? !this._isUTC : !1 } function Ta() { return this.isValid() ? this._isUTC : !1 } function Ua() { return this.isValid() ? this._isUTC && 0 === this._offset : !1 } function Va(a, b) { var c, d, e, g = a, h = null; return Fa(a) ? g = { ms: a._milliseconds, d: a._days, M: a._months } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = Pd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = { y: 0, d: r(h[td]) * c, h: r(h[ud]) * c, m: r(h[vd]) * c, s: r(h[wd]) * c, ms: r(h[xd]) * c }) : (h = Qd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = { y: Wa(h[2], c), M: Wa(h[3], c), d: Wa(h[4], c), h: Wa(h[5], c), m: Wa(h[6], c), s: Wa(h[7], c), w: Wa(h[8], c) }) : null == g ? g = {} : "object" == typeof g && ("from" in g || "to" in g) && (e = Ya(Aa(g.from), Aa(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ea(g), Fa(a) && f(a, "_locale") && (d._locale = a._locale), d } function Wa(a, b) { var c = a && parseFloat(a.replace(",", ".")); return (isNaN(c) ? 0 : c) * b } function Xa(a, b) { var c = { milliseconds: 0, months: 0 }; return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c } function Ya(a, b) { var c; return a.isValid() && b.isValid() ? (b = Ia(b, a), a.isBefore(b) ? c = Xa(a, b) : (c = Xa(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : { milliseconds: 0, months: 0 } } function Za(a, b) { return function (c, d) { var e, f; return null === d || isNaN(+d) || (ca(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Va(c, d), $a(this, e, a), this } } function $a(b, c, d, e) { var f = c._milliseconds, g = c._days, h = c._months; b.isValid() && (e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && G(b, "Date", F(b, "Date") + g * d), h && Y(b, F(b, "Month") + h * d), e && a.updateOffset(b, g || h)) } function _a(a, b) { var c = a || Aa(), d = Ia(c, this).startOf("day"), e = this.diff(d, "days", !0), f = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse", g = b && (D(b[f]) ? b[f]() : b[f]); return this.format(g || this.localeData().calendar(f, this, Aa(c))) } function ab() { return new o(this) } function bb(a, b) { var c = p(a) ? a : Aa(a); return this.isValid() && c.isValid() ? (b = B(m(b) ? "millisecond" : b), "millisecond" === b ? +this > +c : +c < +this.clone().startOf(b)) : !1 } function cb(a, b) { var c = p(a) ? a : Aa(a); return this.isValid() && c.isValid() ? (b = B(m(b) ? "millisecond" : b), "millisecond" === b ? +c > +this : +this.clone().endOf(b) < +c) : !1 } function db(a, b, c) { return this.isAfter(a, c) && this.isBefore(b, c) } function eb(a, b) { var c, d = p(a) ? a : Aa(a); return this.isValid() && d.isValid() ? (b = B(b || "millisecond"), "millisecond" === b ? +this === +d : (c = +d, +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))) : !1 } function fb(a, b) { return this.isSame(a, b) || this.isAfter(a, b) } function gb(a, b) { return this.isSame(a, b) || this.isBefore(a, b) } function hb(a, b, c) { var d, e, f, g; return this.isValid() ? (d = Ia(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = B(b), "year" === b || "month" === b || "quarter" === b ? (g = ib(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : q(g)) : NaN) : NaN } function ib(a, b) { var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months"); return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) } function jb() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ") } function kb() { var a = this.clone().utc(); return 0 < a.year() && a.year() <= 9999 ? D(Date.prototype.toISOString) ? this.toDate().toISOString() : M(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : M(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") } function lb(b) { var c = M(this, b || a.defaultFormat); return this.localeData().postformat(c) } function mb(a, b) { return this.isValid() && (p(a) && a.isValid() || Aa(a).isValid()) ? Va({ to: this, from: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate() } function nb(a) { return this.from(Aa(), a) } function ob(a, b) { return this.isValid() && (p(a) && a.isValid() || Aa(a).isValid()) ? Va({ from: this, to: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate() } function pb(a) { return this.to(Aa(), a) } function qb(a) { var b; return void 0 === a ? this._locale._abbr : (b = z(a), null != b && (this._locale = b), this) } function rb() { return this._locale } function sb(a) { switch (a = B(a)) { case "year": this.month(0); case "quarter": case "month": this.date(1); case "week": case "isoWeek": case "day": this.hours(0); case "hour": this.minutes(0); case "minute": this.seconds(0); case "second": this.milliseconds(0) }return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this } function tb(a) { return a = B(a), void 0 === a || "millisecond" === a ? this : this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms") } function ub() { return +this._d - 6e4 * (this._offset || 0) } function vb() { return Math.floor(+this / 1e3) } function wb() { return this._offset ? new Date(+this) : this._d } function xb() { var a = this; return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()] } function yb() { var a = this; return { years: a.year(), months: a.month(), date: a.date(), hours: a.hours(), minutes: a.minutes(), seconds: a.seconds(), milliseconds: a.milliseconds() } } function zb() { return this.isValid() ? this.toISOString() : "null" } function Ab() { return k(this) } function Bb() { return g({}, j(this)) } function Cb() { return j(this).overflow } function Db() { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict } } function Eb(a, b) { J(0, [a, a.length], 0, b) } function Fb(a) { return Jb.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy) } function Gb(a) { return Jb.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4) } function Hb() { return na(this.year(), 1, 4) } function Ib() { var a = this.localeData()._week; return na(this.year(), a.dow, a.doy) } function Jb(a, b, c, d, e) { var f; return null == a ? ma(this, d, e).year : (f = na(a, d, e), b > f && (b = f), Kb.call(this, a, b, c, d, e)) } function Kb(a, b, c, d, e) { var f = la(a, b, c, d, e), g = ga(f.year, 0, f.dayOfYear); return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this } function Lb(a) { return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3) } function Mb(a) { return ma(a, this._week.dow, this._week.doy).week } function Nb() { return this._week.dow } function Ob() { return this._week.doy } function Pb(a) { var b = this.localeData().week(this); return null == a ? b : this.add(7 * (a - b), "d") } function Qb(a) { var b = ma(this, 1, 4).week; return null == a ? b : this.add(7 * (a - b), "d") } function Rb(a, b) { return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10) } function Sb(a, b) { return c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] } function Tb(a) { return this._weekdaysShort[a.day()] } function Ub(a) { return this._weekdaysMin[a.day()] } function Vb(a, b, c) { var d, e, f; for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) { if (e = Aa([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d; if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d; if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d; if (!c && this._weekdaysParse[d].test(a)) return d } } function Wb(a) { if (!this.isValid()) return null != a ? this : NaN; var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != a ? (a = Rb(a, this.localeData()), this.add(a - b, "d")) : b } function Xb(a) { if (!this.isValid()) return null != a ? this : NaN; var b = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == a ? b : this.add(a - b, "d") } function Yb(a) { return this.isValid() ? null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7) : null != a ? this : NaN } function Zb(a) { var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == a ? b : this.add(a - b, "d") } function $b() { return this.hours() % 12 || 12 } function _b(a, b) { J(a, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), b) }) } function ac(a, b) { return b._meridiemParse } function bc(a) { return "p" === (a + "").toLowerCase().charAt(0) } function cc(a, b, c) { return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM" } function dc(a, b) { b[xd] = r(1e3 * ("0." + a)) } function ec() { return this._isUTC ? "UTC" : "" } function fc() { return this._isUTC ? "Coordinated Universal Time" : "" } function gc(a) { return Aa(1e3 * a) } function hc() { return Aa.apply(null, arguments).parseZone() } function ic(a, b, c) { var d = this._calendar[a]; return D(d) ? d.call(b, c) : d } function jc(a) { var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()]; return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) { return a.slice(1) }), this._longDateFormat[a]) } function kc() { return this._invalidDate } function lc(a) { return this._ordinal.replace("%d", a) } function mc(a) { return a } function nc(a, b, c, d) { var e = this._relativeTime[c]; return D(e) ? e(a, b, c, d) : e.replace(/%d/i, a) } function oc(a, b) { var c = this._relativeTime[a > 0 ? "future" : "past"]; return D(c) ? c(b) : c.replace(/%s/i, b) } function pc(a) { var b, c; for (c in a) b = a[c], D(b) ? this[c] = b : this["_" + c] = b; this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source) } function qc(a, b, c, d) { var e = z(), f = h().set(d, b); return e[c](f, a) } function rc(a, b, c, d, e) { if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return qc(a, b, c, e); var f, g = []; for (f = 0; d > f; f++)g[f] = qc(a, f, c, e); return g } function sc(a, b) { return rc(a, b, "months", 12, "month") } function tc(a, b) { return rc(a, b, "monthsShort", 12, "month") } function uc(a, b) { return rc(a, b, "weekdays", 7, "day") } function vc(a, b) { return rc(a, b, "weekdaysShort", 7, "day") } function wc(a, b) { return rc(a, b, "weekdaysMin", 7, "day") } function xc() { var a = this._data; return this._milliseconds = me(this._milliseconds), this._days = me(this._days), this._months = me(this._months), a.milliseconds = me(a.milliseconds), a.seconds = me(a.seconds), a.minutes = me(a.minutes), a.hours = me(a.hours), a.months = me(a.months), a.years = me(a.years), this } function yc(a, b, c, d) { var e = Va(b, c); return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble() } function zc(a, b) { return yc(this, a, b, 1) } function Ac(a, b) { return yc(this, a, b, -1) } function Bc(a) { return 0 > a ? Math.floor(a) : Math.ceil(a) } function Cc() { var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data; return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * Bc(Ec(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = q(f / 1e3), i.seconds = a % 60, b = q(a / 60), i.minutes = b % 60, c = q(b / 60), i.hours = c % 24, g += q(c / 24), e = q(Dc(g)), h += e, g -= Bc(Ec(e)), d = q(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this } function Dc(a) { return 4800 * a / 146097 } function Ec(a) { return 146097 * a / 4800 } function Fc(a) { var b, c, d = this._milliseconds; if (a = B(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + Dc(b), "month" === a ? c : c / 12; switch (b = this._days + Math.round(Ec(this._months)), a) { case "week": return b / 7 + d / 6048e5; case "day": return b + d / 864e5; case "hour": return 24 * b + d / 36e5; case "minute": return 1440 * b + d / 6e4; case "second": return 86400 * b + d / 1e3; case "millisecond": return Math.floor(864e5 * b) + d; default: throw new Error("Unknown unit " + a) } } function Gc() { return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * r(this._months / 12) } function Hc(a) { return function () { return this.as(a) } } function Ic(a) { return a = B(a), this[a + "s"]() } function Jc(a) { return function () { return this._data[a] } } function Kc() { return q(this.days() / 7) } function Lc(a, b, c, d, e) { return e.relativeTime(b || 1, !!c, a, d) } function Mc(a, b, c) { var d = Va(a).abs(), e = Ce(d.as("s")), f = Ce(d.as("m")), g = Ce(d.as("h")), h = Ce(d.as("d")), i = Ce(d.as("M")), j = Ce(d.as("y")), k = e < De.s && ["s", e] || 1 >= f && ["m"] || f < De.m && ["mm", f] || 1 >= g && ["h"] || g < De.h && ["hh", g] || 1 >= h && ["d"] || h < De.d && ["dd", h] || 1 >= i && ["M"] || i < De.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j]; return k[2] = b, k[3] = +a > 0, k[4] = c, Lc.apply(null, k) } function Nc(a, b) { return void 0 === De[a] ? !1 : void 0 === b ? De[a] : (De[a] = b, !0) } function Oc(a) { var b = this.localeData(), c = Mc(this, !a, b); return a && (c = b.pastFuture(+this, c)), b.postformat(c) } function Pc() { var a, b, c, d = Ee(this._milliseconds) / 1e3, e = Ee(this._days), f = Ee(this._months); a = q(d / 60), b = q(a / 60), d %= 60, a %= 60, c = q(f / 12), f %= 12; var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds(); return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D" } var Qc, Rc, Sc = a.momentProperties = [], Tc = !1, Uc = {}, Vc = {}, Wc = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Xc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Yc = {}, Zc = {}, $c = /\d/, _c = /\d\d/, ad = /\d{3}/, bd = /\d{4}/, cd = /[+-]?\d{6}/, dd = /\d\d?/, ed = /\d\d\d\d?/, fd = /\d\d\d\d\d\d?/, gd = /\d{1,3}/, hd = /\d{1,4}/, id = /[+-]?\d{1,6}/, jd = /\d+/, kd = /[+-]?\d+/, ld = /Z|[+-]\d\d:?\d\d/gi, md = /Z|[+-]\d\d(?::?\d\d)?/gi, nd = /[+-]?\d+(\.\d{1,3})?/, od = /[0-9]*(a[mn]\s?)?['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\-]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, pd = {}, qd = {}, rd = 0, sd = 1, td = 2, ud = 3, vd = 4, wd = 5, xd = 6, yd = 7, zd = 8; J("M", ["MM", 2], "Mo", function () { return this.month() + 1 }), J("MMM", 0, 0, function (a) { return this.localeData().monthsShort(this, a) }), J("MMMM", 0, 0, function (a) { return this.localeData().months(this, a) }), A("month", "M"), O("M", dd), O("MM", dd, _c), O("MMM", od), O("MMMM", od), R(["M", "MM"], function (a, b) { b[sd] = r(a) - 1 }), R(["MMM", "MMMM"], function (a, b, c, d) { var e = c._locale.monthsParse(a, d, c._strict); null != e ? b[sd] = e : j(c).invalidMonth = a }); var Ad = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/, Bd = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), Cd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sept_Oct_Nov_Dec".split("_"), Dd = {}; a.suppressDeprecationWarnings = !1; var Ed = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/, Fd = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/, Gd = /Z|[+-]\d\d(?::?\d\d)?/, Hd = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], Id = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Jd = /^\/?Date\((\-?\d+)/i; a.createFromInputFallback = ba("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) { a._d = new Date(a._i + (a._useUTC ? " UTC" : "")) }), J(0, ["YY", 2], 0, function () { return this.year() % 100 }), J(0, ["YYYY", 4], 0, "year"), J(0, ["YYYYY", 5], 0, "year"), J(0, ["YYYYYY", 6, !0], 0, "year"), A("year", "y"), O("Y", kd), O("YY", dd, _c), O("YYYY", hd, bd), O("YYYYY", id, cd), O("YYYYYY", id, cd), R(["YYYYY", "YYYYYY"], rd), R("YYYY", function (b, c) { c[rd] = 2 === b.length ? a.parseTwoDigitYear(b) : r(b) }), R("YY", function (b, c) { c[rd] = a.parseTwoDigitYear(b) }), a.parseTwoDigitYear = function (a) { return r(a) + (r(a) > 68 ? 1900 : 2e3) }; var Kd = E("FullYear", !1); a.ISO_8601 = function () { }; var Ld = ba("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () { var a = Aa.apply(null, arguments); return this.isValid() && a.isValid() ? this > a ? this : a : l() }), Md = ba("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () { var a = Aa.apply(null, arguments); return this.isValid() && a.isValid() ? a > this ? this : a : l() }), Nd = Date.now || function () { return +new Date }; Ga("Z", ":"), Ga("ZZ", ""), O("Z", md), O("ZZ", md), R(["Z", "ZZ"], function (a, b, c) { c._useUTC = !0, c._tzm = Ha(md, a) }); var Od = /([\+\-]|\d\d)/gi; a.updateOffset = function () { }; var Pd = /(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Qd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/; Va.fn = Ea.prototype; var Rd = Za(1, "add"), Sd = Za(-1, "subtract"); a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"; var Td = ba("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) { return void 0 === a ? this.localeData() : this.locale(a) }); J(0, ["gg", 2], 0, function () { return this.weekYear() % 100 }), J(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100 }), Eb("gggg", "weekYear"), Eb("ggggg", "weekYear"), Eb("GGGG", "isoWeekYear"), Eb("GGGGG", "isoWeekYear"), A("weekYear", "gg"), A("isoWeekYear", "GG"), O("G", kd), O("g", kd), O("GG", dd, _c), O("gg", dd, _c), O("GGGG", hd, bd), O("gggg", hd, bd), O("GGGGG", id, cd), O("ggggg", id, cd), S(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) { b[d.substr(0, 2)] = r(a) }), S(["gg", "GG"], function (b, c, d, e) { c[e] = a.parseTwoDigitYear(b) }), J("Q", 0, "Qo", "quarter"), A("quarter", "Q"), O("Q", $c), R("Q", function (a, b) { b[sd] = 3 * (r(a) - 1) }), J("w", ["ww", 2], "wo", "week"), J("W", ["WW", 2], "Wo", "isoWeek"), A("week", "w"), A("isoWeek", "W"), O("w", dd), O("ww", dd, _c), O("W", dd), O("WW", dd, _c), S(["w", "ww", "W", "WW"], function (a, b, c, d) { b[d.substr(0, 1)] = r(a) }); var Ud = { dow: 0, doy: 6 }; J("D", ["DD", 2], "Do", "date"), A("date", "D"), O("D", dd), O("DD", dd, _c), O("Do", function (a, b) {
        return a ? b._ordinalParse : b._ordinalParseLenient
    }), R(["D", "DD"], td), R("Do", function (a, b) { b[td] = r(a.match(dd)[0], 10) }); var Vd = E("Date", !0); J("d", 0, "do", "day"), J("dd", 0, 0, function (a) { return this.localeData().weekdaysMin(this, a) }), J("ddd", 0, 0, function (a) { return this.localeData().weekdaysShort(this, a) }), J("dddd", 0, 0, function (a) { return this.localeData().weekdays(this, a) }), J("e", 0, 0, "weekday"), J("E", 0, 0, "isoWeekday"), A("day", "d"), A("weekday", "e"), A("isoWeekday", "E"), O("d", dd), O("e", dd), O("E", dd), O("dd", od), O("ddd", od), O("dddd", od), S(["dd", "ddd", "dddd"], function (a, b, c, d) { var e = c._locale.weekdaysParse(a, d, c._strict); null != e ? b.d = e : j(c).invalidWeekday = a }), S(["d", "e", "E"], function (a, b, c, d) { b[d] = r(a) }); var Wd = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Xd = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Yd = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"); J("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), A("dayOfYear", "DDD"), O("DDD", gd), O("DDDD", ad), R(["DDD", "DDDD"], function (a, b, c) { c._dayOfYear = r(a) }), J("H", ["HH", 2], 0, "hour"), J("h", ["hh", 2], 0, $b), J("hmm", 0, 0, function () { return "" + $b.apply(this) + I(this.minutes(), 2) }), J("hmmss", 0, 0, function () { return "" + $b.apply(this) + I(this.minutes(), 2) + I(this.seconds(), 2) }), J("Hmm", 0, 0, function () { return "" + this.hours() + I(this.minutes(), 2) }), J("Hmmss", 0, 0, function () { return "" + this.hours() + I(this.minutes(), 2) + I(this.seconds(), 2) }), _b("a", !0), _b("A", !1), A("hour", "h"), O("a", ac), O("A", ac), O("H", dd), O("h", dd), O("HH", dd, _c), O("hh", dd, _c), O("hmm", ed), O("hmmss", fd), O("Hmm", ed), O("Hmmss", fd), R(["H", "HH"], ud), R(["a", "A"], function (a, b, c) { c._isPm = c._locale.isPM(a), c._meridiem = a }), R(["h", "hh"], function (a, b, c) { b[ud] = r(a), j(c).bigHour = !0 }), R("hmm", function (a, b, c) { var d = a.length - 2; b[ud] = r(a.substr(0, d)), b[vd] = r(a.substr(d)), j(c).bigHour = !0 }), R("hmmss", function (a, b, c) { var d = a.length - 4, e = a.length - 2; b[ud] = r(a.substr(0, d)), b[vd] = r(a.substr(d, 2)), b[wd] = r(a.substr(e)), j(c).bigHour = !0 }), R("Hmm", function (a, b, c) { var d = a.length - 2; b[ud] = r(a.substr(0, d)), b[vd] = r(a.substr(d)) }), R("Hmmss", function (a, b, c) { var d = a.length - 4, e = a.length - 2; b[ud] = r(a.substr(0, d)), b[vd] = r(a.substr(d, 2)), b[wd] = r(a.substr(e)) }); var Zd = /[ap]\.?m?\.?/i, $d = E("Hours", !0); J("m", ["mm", 2], 0, "minute"), A("minute", "m"), O("m", dd), O("mm", dd, _c), R(["m", "mm"], vd); var _d = E("Minutes", !1); J("s", ["ss", 2], 0, "second"), A("second", "s"), O("s", dd), O("ss", dd, _c), R(["s", "ss"], wd); var ae = E("Seconds", !1); J("S", 0, 0, function () { return ~~(this.millisecond() / 100) }), J(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10) }), J(0, ["SSS", 3], 0, "millisecond"), J(0, ["SSSS", 4], 0, function () { return 10 * this.millisecond() }), J(0, ["SSSSS", 5], 0, function () { return 100 * this.millisecond() }), J(0, ["SSSSSS", 6], 0, function () { return 1e3 * this.millisecond() }), J(0, ["SSSSSSS", 7], 0, function () { return 1e4 * this.millisecond() }), J(0, ["SSSSSSSS", 8], 0, function () { return 1e5 * this.millisecond() }), J(0, ["SSSSSSSSS", 9], 0, function () { return 1e6 * this.millisecond() }), A("millisecond", "ms"), O("S", gd, $c), O("SS", gd, _c), O("SSS", gd, ad); var be; for (be = "SSSS"; be.length <= 9; be += "S")O(be, jd); for (be = "S"; be.length <= 9; be += "S")R(be, dc); var ce = E("Milliseconds", !1); J("z", 0, 0, "zoneAbbr"), J("zz", 0, 0, "zoneName"); var de = o.prototype; de.add = Rd, de.calendar = _a, de.clone = ab, de.diff = hb, de.endOf = tb, de.format = lb, de.from = mb, de.fromNow = nb, de.to = ob, de.toNow = pb, de.get = H, de.invalidAt = Cb, de.isAfter = bb, de.isBefore = cb, de.isBetween = db, de.isSame = eb, de.isSameOrAfter = fb, de.isSameOrBefore = gb, de.isValid = Ab, de.lang = Td, de.locale = qb, de.localeData = rb, de.max = Md, de.min = Ld, de.parsingFlags = Bb, de.set = H, de.startOf = sb, de.subtract = Sd, de.toArray = xb, de.toObject = yb, de.toDate = wb, de.toISOString = kb, de.toJSON = zb, de.toString = jb, de.unix = vb, de.valueOf = ub, de.creationData = Db, de.year = Kd, de.isLeapYear = ja, de.weekYear = Fb, de.isoWeekYear = Gb, de.quarter = de.quarters = Lb, de.month = Z, de.daysInMonth = $, de.week = de.weeks = Pb, de.isoWeek = de.isoWeeks = Qb, de.weeksInYear = Ib, de.isoWeeksInYear = Hb, de.date = Vd, de.day = de.days = Wb, de.weekday = Xb, de.isoWeekday = Yb, de.dayOfYear = Zb, de.hour = de.hours = $d, de.minute = de.minutes = _d, de.second = de.seconds = ae, de.millisecond = de.milliseconds = ce, de.utcOffset = Ka, de.utc = Ma, de.local = Na, de.parseZone = Oa, de.hasAlignedHourOffset = Pa, de.isDST = Qa, de.isDSTShifted = Ra, de.isLocal = Sa, de.isUtcOffset = Ta, de.isUtc = Ua, de.isUTC = Ua, de.zoneAbbr = ec, de.zoneName = fc, de.dates = ba("dates accessor is deprecated. Use date instead.", Vd), de.months = ba("months accessor is deprecated. Use month instead", Z), de.years = ba("years accessor is deprecated. Use year instead", Kd), de.zone = ba("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", La); var ee = de, fe = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, ge = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, he = "Invalid date", ie = "%d", je = /\d{1,2}/, ke = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, le = t.prototype; le._calendar = fe, le.calendar = ic, le._longDateFormat = ge, le.longDateFormat = jc, le._invalidDate = he, le.invalidDate = kc, le._ordinal = ie, le.ordinal = lc, le._ordinalParse = je, le.preparse = mc, le.postformat = mc, le._relativeTime = ke, le.relativeTime = nc, le.pastFuture = oc, le.set = pc, le.months = V, le._months = Bd, le.monthsShort = W, le._monthsShort = Cd, le.monthsParse = X, le.week = Mb, le._week = Ud, le.firstDayOfYear = Ob, le.firstDayOfWeek = Nb, le.weekdays = Sb, le._weekdays = Wd, le.weekdaysMin = Ub, le._weekdaysMin = Yd, le.weekdaysShort = Tb, le._weekdaysShort = Xd, le.weekdaysParse = Vb, le.isPM = bc, le._meridiemParse = Zd, le.meridiem = cc, x("en", { monthsParse: [/^jan/i, /^feb/i, /^mar/i, /^apr/i, /^may/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^oct/i, /^nov/i, /^dec/i], longMonthsParse: [/^january$/i, /^february$/i, /^march$/i, /^april$/i, /^may$/i, /^june$/i, /^july$/i, /^august$/i, /^september$/i, /^october$/i, /^november$/i, /^december$/i], shortMonthsParse: [/^jan$/i, /^feb$/i, /^mar$/i, /^apr$/i, /^may$/i, /^jun$/i, /^jul$/i, /^aug/i, /^sept?$/i, /^oct$/i, /^nov$/i, /^dec$/i], ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (a) { var b = a % 10, c = 1 === r(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"; return a + c } }), a.lang = ba("moment.lang is deprecated. Use moment.locale instead.", x), a.langData = ba("moment.langData is deprecated. Use moment.localeData instead.", z); var me = Math.abs, ne = Hc("ms"), oe = Hc("s"), pe = Hc("m"), qe = Hc("h"), re = Hc("d"), se = Hc("w"), te = Hc("M"), ue = Hc("y"), ve = Jc("milliseconds"), we = Jc("seconds"), xe = Jc("minutes"), ye = Jc("hours"), ze = Jc("days"), Ae = Jc("months"), Be = Jc("years"), Ce = Math.round, De = { s: 45, m: 45, h: 22, d: 26, M: 11 }, Ee = Math.abs, Fe = Ea.prototype; Fe.abs = xc, Fe.add = zc, Fe.subtract = Ac, Fe.as = Fc, Fe.asMilliseconds = ne, Fe.asSeconds = oe, Fe.asMinutes = pe, Fe.asHours = qe, Fe.asDays = re, Fe.asWeeks = se, Fe.asMonths = te, Fe.asYears = ue, Fe.valueOf = Gc, Fe._bubble = Cc, Fe.get = Ic, Fe.milliseconds = ve, Fe.seconds = we, Fe.minutes = xe, Fe.hours = ye, Fe.days = ze, Fe.weeks = Kc, Fe.months = Ae, Fe.years = Be, Fe.humanize = Oc, Fe.toISOString = Pc, Fe.toString = Pc, Fe.toJSON = Pc, Fe.locale = qb, Fe.localeData = rb, Fe.toIsoString = ba("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Pc), Fe.lang = Td, J("X", 0, 0, "unix"), J("x", 0, 0, "valueOf"), O("x", kd), O("X", nd), R("X", function (a, b, c) { c._d = new Date(1e3 * parseFloat(a, 10)) }), R("x", function (a, b, c) { c._d = new Date(r(a)) }), a.version = "2.11.0", b(Aa), a.fn = ee, a.min = Ca, a.max = Da, a.now = Nd, a.utc = h, a.unix = gc, a.months = sc, a.isDate = d, a.locale = x, a.invalid = l, a.duration = Va, a.isMoment = p, a.weekdays = uc, a.parseZone = hc, a.localeData = z, a.isDuration = Fa, a.monthsShort = tc, a.weekdaysMin = wc, a.defineLocale = y, a.weekdaysShort = vc, a.normalizeUnits = B, a.relativeTimeThreshold = Nc, a.prototype = ee; var Ge = a; return Ge
});



/*!
 * FullCalendar v2.6.1
 * Docs & License: http://fullcalendar.io/
 * (c) 2015 Adam Shaw
 */
! function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], a) : "object" == typeof exports ? module.exports = a(require("jquery"), require("moment")) : a(jQuery, moment)
}(function (a, b) {
    function c(a) {
        return Q(a, Ra)
    }

    function d(b) {
        var c, d = {
            views: b.views || {}
        };
        return a.each(b, function (b, e) {
            "views" != b && (a.isPlainObject(e) && !/(time|duration|interval)$/i.test(b) && -1 == a.inArray(b, Ra) ? (c = null, a.each(e, function (a, e) {
                /^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(a) ? (d.views[a] || (d.views[a] = {}), d.views[a][b] = e) : (c || (c = {}), c[a] = e)
            }), c && (d[b] = c)) : d[b] = e)
        }), d
    }

    function e(a, b) {
        b.left && a.css({
            "border-left-width": 1,
            "margin-left": b.left - 1
        }), b.right && a.css({
            "border-right-width": 1,
            "margin-right": b.right - 1
        })
    }

    function f(a) {
        a.css({
            "margin-left": "",
            "margin-right": "",
            "border-left-width": "",
            "border-right-width": ""
        })
    }

    function g() {
        a("body").addClass("fc-not-allowed")
    }

    function h() {
        a("body").removeClass("fc-not-allowed")
    }

    function i(b, c, d) {
        var e = Math.floor(c / b.length),
            f = Math.floor(c - e * (b.length - 1)),
            g = [],
            h = [],
            i = [],
            k = 0;
        j(b), b.each(function (c, d) {
            var j = c === b.length - 1 ? f : e,
                l = a(d).outerHeight(!0);
            j > l ? (g.push(d), h.push(l), i.push(a(d).height())) : k += l
        }), d && (c -= k, e = Math.floor(c / g.length), f = Math.floor(c - e * (g.length - 1))), a(g).each(function (b, c) {
            var d = b === g.length - 1 ? f : e,
                j = h[b],
                k = i[b],
                l = d - (j - k);
            d > j && a(c).height(l)
        })
    }

    function j(a) {
        a.height("")
    }

    function k(b) {
        var c = 0;
        return b.find("> span").each(function (b, d) {
            var e = a(d).outerWidth();
            e > c && (c = e)
        }), c++, b.width(c), c
    }

    function l(a, b) {
        return a.height(b).addClass("fc-scroller"), a[0].scrollHeight - 1 > a[0].clientHeight ? !0 : (m(a), !1)
    }

    function m(a) {
        a.height("").removeClass("fc-scroller")
    }

    function n(b) {
        var c = b.css("position"),
            d = b.parents().filter(function () {
                var b = a(this);
                return /(auto|scroll)/.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
            }).eq(0);
        return "fixed" !== c && d.length ? d : a(b[0].ownerDocument || document)
    }

    function o(a) {
        var b = a.offset();
        return {
            left: b.left,
            right: b.left + a.outerWidth(),
            top: b.top,
            bottom: b.top + a.outerHeight()
        }
    }

    function p(a) {
        var b = a.offset(),
            c = r(a),
            d = b.left + u(a, "border-left-width") + c.left,
            e = b.top + u(a, "border-top-width") + c.top;
        return {
            left: d,
            right: d + a[0].clientWidth,
            top: e,
            bottom: e + a[0].clientHeight
        }
    }

    function q(a) {
        var b = a.offset(),
            c = b.left + u(a, "border-left-width") + u(a, "padding-left"),
            d = b.top + u(a, "border-top-width") + u(a, "padding-top");
        return {
            left: c,
            right: c + a.width(),
            top: d,
            bottom: d + a.height()
        }
    }

    function r(a) {
        var b = a.innerWidth() - a[0].clientWidth,
            c = {
                left: 0,
                right: 0,
                top: 0,
                bottom: a.innerHeight() - a[0].clientHeight
            };
        return s() && "rtl" == a.css("direction") ? c.left = b : c.right = b, c
    }

    function s() {
        return null === Sa && (Sa = t()), Sa
    }

    function t() {
        var b = a("<div><div/></div>").css({
            position: "absolute",
            top: -1e3,
            left: 0,
            border: 0,
            padding: 0,
            overflow: "scroll",
            direction: "rtl"
        }).appendTo("body"),
            c = b.children(),
            d = c.offset().left > b.offset().left;
        return b.remove(), d
    }

    function u(a, b) {
        return parseFloat(a.css(b)) || 0
    }

    function v(a) {
        return 1 == a.which && !a.ctrlKey
    }

    function w(a, b) {
        var c = {
            left: Math.max(a.left, b.left),
            right: Math.min(a.right, b.right),
            top: Math.max(a.top, b.top),
            bottom: Math.min(a.bottom, b.bottom)
        };
        return c.left < c.right && c.top < c.bottom ? c : !1
    }

    function x(a, b) {
        return {
            left: Math.min(Math.max(a.left, b.left), b.right),
            top: Math.min(Math.max(a.top, b.top), b.bottom)
        }
    }

    function y(a) {
        return {
            left: (a.left + a.right) / 2,
            top: (a.top + a.bottom) / 2
        }
    }

    function z(a, b) {
        return {
            left: a.left - b.left,
            top: a.top - b.top
        }
    }

    function A(b) {
        var c, d, e = [],
            f = [];
        for ("string" == typeof b ? f = b.split(/\s*,\s*/) : "function" == typeof b ? f = [b] : a.isArray(b) && (f = b), c = 0; c < f.length; c++) d = f[c], "string" == typeof d ? e.push("-" == d.charAt(0) ? {
            field: d.substring(1),
            order: -1
        } : {
            field: d,
            order: 1
        }) : "function" == typeof d && e.push({
            func: d
        });
        return e
    }

    function B(a, b, c) {
        var d, e;
        for (d = 0; d < c.length; d++)
            if (e = C(a, b, c[d])) return e;
        return 0
    }

    function C(a, b, c) {
        return c.func ? c.func(a, b) : D(a[c.field], b[c.field]) * (c.order || 1)
    }

    function D(b, c) {
        return b || c ? null == c ? -1 : null == b ? 1 : "string" === a.type(b) || "string" === a.type(c) ? String(b).localeCompare(String(c)) : b - c : 0
    }

    function E(a, b) {
        var c, d, e, f, g = a.start,
            h = a.end,
            i = b.start,
            j = b.end;
        return h > i && j > g ? (g >= i ? (c = g.clone(), e = !0) : (c = i.clone(), e = !1), j >= h ? (d = h.clone(), f = !0) : (d = j.clone(), f = !1), {
            start: c,
            end: d,
            isStart: e,
            isEnd: f
        }) : void 0
    }

    function F(a, c) {
        return b.duration({
            days: a.clone().stripTime().diff(c.clone().stripTime(), "days"),
            ms: a.time() - c.time()
        })
    }

    function G(a, c) {
        return b.duration({
            days: a.clone().stripTime().diff(c.clone().stripTime(), "days")
        })
    }

    function H(a, c, d) {
        return b.duration(Math.round(a.diff(c, d, !0)), d)
    }

    function I(a, b) {
        var c, d, e;
        for (c = 0; c < Ua.length && (d = Ua[c], e = J(d, a, b), !(e >= 1 && ba(e))); c++);
        return d
    }

    function J(a, c, d) {
        return null != d ? d.diff(c, a, !0) : b.isDuration(c) ? c.as(a) : c.end.diff(c.start, a, !0)
    }

    function K(a, b, c) {
        var d;
        return N(c) ? (b - a) / c : (d = c.asMonths(), Math.abs(d) >= 1 && ba(d) ? b.diff(a, "months", !0) / d : b.diff(a, "days", !0) / c.asDays())
    }

    function L(a, b) {
        var c, d;
        return N(a) || N(b) ? a / b : (c = a.asMonths(), d = b.asMonths(), Math.abs(c) >= 1 && ba(c) && Math.abs(d) >= 1 && ba(d) ? c / d : a.asDays() / b.asDays())
    }

    function M(a, c) {
        var d;
        return N(a) ? b.duration(a * c) : (d = a.asMonths(), Math.abs(d) >= 1 && ba(d) ? b.duration({
            months: d * c
        }) : b.duration({
            days: a.asDays() * c
        }))
    }

    function N(a) {
        return Boolean(a.hours() || a.minutes() || a.seconds() || a.milliseconds())
    }

    function O(a) {
        return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
    }

    function P(a) {
        return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(a)
    }

    function Q(a, b) {
        var c, d, e, f, g, h, i = {};
        if (b)
            for (c = 0; c < b.length; c++) {
                for (d = b[c], e = [], f = a.length - 1; f >= 0; f--)
                    if (g = a[f][d], "object" == typeof g) e.unshift(g);
                    else if (void 0 !== g) {
                        i[d] = g;
                        break
                    }
                e.length && (i[d] = Q(e))
            }
        for (c = a.length - 1; c >= 0; c--) {
            h = a[c];
            for (d in h) d in i || (i[d] = h[d])
        }
        return i
    }

    function R(a) {
        var b = function () { };
        return b.prototype = a, new b
    }

    function S(a, b) {
        for (var c in a) U(a, c) && (b[c] = a[c])
    }

    function T(a, b) {
        var c, d, e = ["constructor", "toString", "valueOf"];
        for (c = 0; c < e.length; c++) d = e[c], a[d] !== Object.prototype[d] && (b[d] = a[d])
    }

    function U(a, b) {
        return Ya.call(a, b)
    }

    function V(b) {
        return /undefined|null|boolean|number|string/.test(a.type(b))
    }

    function W(b, c, d) {
        if (a.isFunction(b) && (b = [b]), b) {
            var e, f;
            for (e = 0; e < b.length; e++) f = b[e].apply(c, d) || f;
            return f
        }
    }

    function X() {
        for (var a = 0; a < arguments.length; a++)
            if (void 0 !== arguments[a]) return arguments[a]
    }

    function Y(a) {
        return (a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function Z(a) {
        return a.replace(/&.*?;/g, "")
    }

    function $(b) {
        var c = [];
        return a.each(b, function (a, b) {
            null != b && c.push(a + ":" + b)
        }), c.join(";")
    }

    function _(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    function aa(a, b) {
        return a - b
    }

    function ba(a) {
        return a % 1 === 0
    }

    function ca(a, b) {
        var c = a[b];
        return function () {
            return c.apply(a, arguments)
        }
    }

    function da(a, b) {
        var c, d, e, f, g = function () {
            var h = +new Date - f;
            b > h && h > 0 ? c = setTimeout(g, b - h) : (c = null, a.apply(e, d), c || (e = d = null))
        };
        return function () {
            e = this, d = arguments, f = +new Date, c || (c = setTimeout(g, b))
        }
    }

    function ea(c, d, e) {
        var f, g, h, i, j = c[0],
            k = 1 == c.length && "string" == typeof j;
        return b.isMoment(j) ? (i = b.apply(null, c), ga(j, i)) : O(j) || void 0 === j ? i = b.apply(null, c) : (f = !1, g = !1, k ? Za.test(j) ? (j += "-01", c = [j], f = !0, g = !0) : (h = $a.exec(j)) && (f = !h[5], g = !0) : a.isArray(j) && (g = !0), i = d || f ? b.utc.apply(b, c) : b.apply(null, c), f ? (i._ambigTime = !0, i._ambigZone = !0) : e && (g ? i._ambigZone = !0 : k && (i.utcOffset ? i.utcOffset(j) : i.zone(j)))), i._fullCalendar = !0, i
    }

    function fa(a, c) {
        var d, e, f = !1,
            g = !1,
            h = a.length,
            i = [];
        for (d = 0; h > d; d++) e = a[d], b.isMoment(e) || (e = Pa.moment.parseZone(e)), f = f || e._ambigTime, g = g || e._ambigZone, i.push(e);
        for (d = 0; h > d; d++) e = i[d], c || !f || e._ambigTime ? g && !e._ambigZone && (i[d] = e.clone().stripZone()) : i[d] = e.clone().stripTime();
        return i
    }

    function ga(a, b) {
        a._ambigTime ? b._ambigTime = !0 : b._ambigTime && (b._ambigTime = !1), a._ambigZone ? b._ambigZone = !0 : b._ambigZone && (b._ambigZone = !1)
    }

    function ha(a, b) {
        a.year(b[0] || 0).month(b[1] || 0).date(b[2] || 0).hours(b[3] || 0).minutes(b[4] || 0).seconds(b[5] || 0).milliseconds(b[6] || 0)
    }

    function ia(a, b) {
        return ab.format.call(a, b)
    }

    function ja(a, b) {
        return ka(a, pa(b))
    }

    function ka(a, b) {
        var c, d = "";
        for (c = 0; c < b.length; c++) d += la(a, b[c]);
        return d
    }

    function la(a, b) {
        var c, d;
        return "string" == typeof b ? b : (c = b.token) ? bb[c] ? bb[c](a) : ia(a, c) : b.maybe && (d = ka(a, b.maybe), d.match(/[1-9]/)) ? d : ""
    }

    function ma(a, b, c, d, e) {
        var f;
        return a = Pa.moment.parseZone(a), b = Pa.moment.parseZone(b), f = (a.localeData || a.lang).call(a), c = f.longDateFormat(c) || c, d = d || " - ", na(a, b, pa(c), d, e)
    }

    function na(a, b, c, d, e) {
        var f, g, h, i, j = a.clone().stripZone(),
            k = b.clone().stripZone(),
            l = "",
            m = "",
            n = "",
            o = "",
            p = "";
        for (g = 0; g < c.length && (f = oa(a, b, j, k, c[g]), f !== !1); g++) l += f;
        for (h = c.length - 1; h > g && (f = oa(a, b, j, k, c[h]), f !== !1); h--) m = f + m;
        for (i = g; h >= i; i++) n += la(a, c[i]), o += la(b, c[i]);
        return (n || o) && (p = e ? o + d + n : n + d + o), l + p + m
    }

    function oa(a, b, c, d, e) {
        var f, g;
        return "string" == typeof e ? e : (f = e.token) && (g = cb[f.charAt(0)], g && c.isSame(d, g)) ? ia(a, f) : !1
    }

    function pa(a) {
        return a in db ? db[a] : db[a] = qa(a)
    }

    function qa(a) {
        for (var b, c = [], d = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; b = d.exec(a);) b[1] ? c.push(b[1]) : b[2] ? c.push({
            maybe: qa(b[2])
        }) : b[3] ? c.push({
            token: b[3]
        }) : b[5] && c.push(b[5]);
        return c
    }

    function ra() { }

    function sa(a, b) {
        var c;
        return U(b, "constructor") && (c = b.constructor), "function" != typeof c && (c = b.constructor = function () {
            a.apply(this, arguments)
        }), c.prototype = R(a.prototype), S(b, c.prototype), T(b, c.prototype), S(a, c), c
    }

    function ta(a, b) {
        S(b.prototype || b, a.prototype)
    }

    function ua(a, b) {
        return a || b ? a && b ? a.component === b.component && va(a, b) && va(b, a) : !1 : !0
    }

    function va(a, b) {
        for (var c in a)
            if (!/^(component|left|right|top|bottom)$/.test(c) && a[c] !== b[c]) return !1;
        return !0
    }

    function wa(a) {
        var b = ya(a);
        return "background" === b || "inverse-background" === b
    }

    function xa(a) {
        return "inverse-background" === ya(a)
    }

    function ya(a) {
        return X((a.source || {}).rendering, a.rendering)
    }

    function za(a) {
        var b, c, d = {};
        for (b = 0; b < a.length; b++) c = a[b], (d[c._id] || (d[c._id] = [])).push(c);
        return d
    }

    function Aa(a, b) {
        return a.start - b.start
    }

    function Ba(c) {
        var d, e, f, g, h = Pa.dataAttrPrefix;
        return h && (h += "-"), d = c.data(h + "event") || null, d && (d = "object" == typeof d ? a.extend({}, d) : {}, e = d.start, null == e && (e = d.time), f = d.duration, g = d.stick, delete d.start, delete d.time, delete d.duration, delete d.stick), null == e && (e = c.data(h + "start")), null == e && (e = c.data(h + "time")), null == f && (f = c.data(h + "duration")), null == g && (g = c.data(h + "stick")), e = null != e ? b.duration(e) : null, f = null != f ? b.duration(f) : null, g = Boolean(g), {
            eventProps: d,
            startTime: e,
            duration: f,
            stick: g
        }
    }

    function Ca(a, b) {
        var c, d;
        for (c = 0; c < b.length; c++)
            if (d = b[c], d.leftCol <= a.rightCol && d.rightCol >= a.leftCol) return !0;
        return !1
    }

    function Da(a, b) {
        return a.leftCol - b.leftCol
    }

    function Ea(a) {
        var b, c, d, e = [];
        for (b = 0; b < a.length; b++) {
            for (c = a[b], d = 0; d < e.length && Ha(c, e[d]).length; d++);
            c.level = d, (e[d] || (e[d] = [])).push(c)
        }
        return e
    }

    function Fa(a) {
        var b, c, d, e, f;
        for (b = 0; b < a.length; b++)
            for (c = a[b], d = 0; d < c.length; d++)
                for (e = c[d], e.forwardSegs = [], f = b + 1; f < a.length; f++) Ha(e, a[f], e.forwardSegs)
    }

    function Ga(a) {
        var b, c, d = a.forwardSegs,
            e = 0;
        if (void 0 === a.forwardPressure) {
            for (b = 0; b < d.length; b++) c = d[b], Ga(c), e = Math.max(e, 1 + c.forwardPressure);
            a.forwardPressure = e
        }
    }

    function Ha(a, b, c) {
        c = c || [];
        for (var d = 0; d < b.length; d++) Ia(a, b[d]) && c.push(b[d]);
        return c
    }

    function Ia(a, b) {
        return a.bottom > b.top && a.top < b.bottom
    }

    function Ja(c, d) {
        function e() {
            U ? h() && (k(), i()) : f()
        }

        function f() {
            V = O.theme ? "ui" : "fc", c.addClass("fc"), O.isRTL ? c.addClass("fc-rtl") : c.addClass("fc-ltr"), O.theme ? c.addClass("ui-widget") : c.addClass("fc-unthemed"), U = a("<div class='fc-view-container'/>").prependTo(c), S = N.header = new Ma(N, O), T = S.render(), T && c.prepend(T), i(O.defaultView), O.handleWindowResize && (Y = da(m, O.windowResizeDelay), a(window).resize(Y))
        }

        function g() {
            W && W.removeElement(), S.removeElement(), U.remove(), c.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), Y && a(window).unbind("resize", Y)
        }

        function h() {
            return c.is(":visible")
        }

        function i(b) {
            ca++, W && b && W.type !== b && (S.deactivateButton(W.type), H(), W.removeElement(), W = N.view = null), !W && b && (W = N.view = ba[b] || (ba[b] = N.instantiateView(b)), W.setElement(a("<div class='fc-view fc-" + b + "-view' />").appendTo(U)), S.activateButton(b)), W && (Z = W.massageCurrentDate(Z), W.displaying && Z.isWithin(W.intervalStart, W.intervalEnd) || h() && (W.display(Z), I(), u(), v(), q())), I(), ca--
        }

        function j(a) {
            return h() ? (a && l(), ca++, W.updateSize(!0), ca--, !0) : void 0
        }

        function k() {
            h() && l()
        }

        function l() {
            X = "number" == typeof O.contentHeight ? O.contentHeight : "number" == typeof O.height ? O.height - (T ? T.outerHeight(!0) : 0) : Math.round(U.width() / Math.max(O.aspectRatio, .5))
        }

        function m(a) {
            !ca && a.target === window && W.start && j(!0) && W.trigger("windowResize", aa)
        }

        function n() {
            p(), r()
        }

        function o() {
            h() && (H(), W.displayEvents(ea), I())
        }

        function p() {
            H(), W.clearEvents(), I()
        }

        function q() {
            !O.lazyFetching || $(W.start, W.end) ? r() : o()
        }

        function r() {
            _(W.start, W.end)
        }

        function s(a) {
            ea = a, o()
        }

        function t() {
            o()
        }

        function u() {
            S.updateTitle(W.title)
        }

        function v() {
            var a = N.getNow();
            a.isWithin(W.intervalStart, W.intervalEnd) ? S.disableButton("today") : S.enableButton("today")
        }

        function w(a, b) {
            W.select(N.buildSelectSpan.apply(N, arguments))
        }

        function x() {
            W && W.unselect()
        }

        function y() {
            Z = W.computePrevDate(Z), i()
        }

        function z() {
            Z = W.computeNextDate(Z), i()
        }

        function A() {
            Z.add(-1, "years"), i()
        }

        function B() {
            Z.add(1, "years"), i()
        }

        function C() {
            Z = N.getNow(), i()
        }

        function D(a) {
            Z = N.moment(a).stripZone(), i()
        }

        function E(a) {
            Z.add(b.duration(a)), i()
        }

        function F(a, b) {
            var c;
            b = b || "day", c = N.getViewSpec(b) || N.getUnitViewSpec(b), Z = a.clone(), i(c ? c.type : null)
        }

        function G() {
            return N.applyTimezone(Z)
        }

        function H() {
            U.css({
                width: "100%",
                height: U.height(),
                overflow: "hidden"
            })
        }

        function I() {
            U.css({
                width: "",
                height: "",
                overflow: ""
            })
        }

        function J() {
            return N
        }

        function K() {
            return W
        }

        function L(a, b) {
            return void 0 === b ? O[a] : void (("height" == a || "contentHeight" == a || "aspectRatio" == a) && (O[a] = b, j(!0)))
        }

        function M(a, b) {
            var c = Array.prototype.slice.call(arguments, 2);
            return b = b || aa, this.triggerWith(a, b, c), O[a] ? O[a].apply(b, c) : void 0
        }
        var N = this;
        N.initOptions(d || {});
        var O = this.options;
        N.render = e, N.destroy = g, N.refetchEvents = n, N.reportEvents = s, N.reportEventChange = t, N.rerenderEvents = o, N.changeView = i, N.select = w, N.unselect = x, N.prev = y, N.next = z, N.prevYear = A, N.nextYear = B, N.today = C, N.gotoDate = D, N.incrementDate = E, N.zoomTo = F, N.getDate = G, N.getCalendar = J, N.getView = K, N.option = L, N.trigger = M;
        var P = R(La(O.lang));
        if (O.monthNames && (P._months = O.monthNames), O.monthNamesShort && (P._monthsShort = O.monthNamesShort), O.dayNames && (P._weekdays = O.dayNames), O.dayNamesShort && (P._weekdaysShort = O.dayNamesShort), null != O.firstDay) {
            var Q = R(P._week);
            Q.dow = O.firstDay, P._week = Q
        }
        P._fullCalendar_weekCalc = function (a) {
            return "function" == typeof a ? a : "local" === a ? a : "iso" === a || "ISO" === a ? "ISO" : void 0
        }(O.weekNumberCalculation), N.defaultAllDayEventDuration = b.duration(O.defaultAllDayEventDuration), N.defaultTimedEventDuration = b.duration(O.defaultTimedEventDuration), N.moment = function () {
            var a;
            return "local" === O.timezone ? (a = Pa.moment.apply(null, arguments), a.hasTime() && a.local()) : a = "UTC" === O.timezone ? Pa.moment.utc.apply(null, arguments) : Pa.moment.parseZone.apply(null, arguments), "_locale" in a ? a._locale = P : a._lang = P, a
        }, N.getIsAmbigTimezone = function () {
            return "local" !== O.timezone && "UTC" !== O.timezone
        }, N.applyTimezone = function (a) {
            if (!a.hasTime()) return a.clone();
            var b, c = N.moment(a.toArray()),
                d = a.time() - c.time();
            return d && (b = c.clone().add(d), a.time() - b.time() === 0 && (c = b)), c
        }, N.getNow = function () {
            var a = O.now;
            return "function" == typeof a && (a = a()), N.moment(a).stripZone()
        }, N.getEventEnd = function (a) {
            return a.end ? a.end.clone() : N.getDefaultEventEnd(a.allDay, a.start)
        }, N.getDefaultEventEnd = function (a, b) {
            var c = b.clone();
            return a ? c.stripTime().add(N.defaultAllDayEventDuration) : c.add(N.defaultTimedEventDuration), N.getIsAmbigTimezone() && c.stripZone(), c
        }, N.humanizeDuration = function (a) {
            return (a.locale || a.lang).call(a, O.lang).humanize()
        }, Na.call(N, O);
        var S, T, U, V, W, X, Y, Z, $ = N.isFetchNeeded,
            _ = N.fetchEvents,
            aa = c[0],
            ba = {},
            ca = 0,
            ea = [];
        Z = null != O.defaultDate ? N.moment(O.defaultDate).stripZone() : N.getNow(), N.getSuggestedViewHeight = function () {
            return void 0 === X && k(), X
        }, N.isHeightAuto = function () {
            return "auto" === O.contentHeight || "auto" === O.height
        }, N.freezeContentHeight = H, N.unfreezeContentHeight = I, N.initialize()
    }

    function Ka(b) {
        a.each(tb, function (a, c) {
            null == b[a] && (b[a] = c(b))
        })
    }

    function La(a) {
        var c = b.localeData || b.langData;
        return c.call(b, a) || c.call(b, "en")
    }

    function Ma(b, c) {
        function d() {
            var b = c.header;
            return n = c.theme ? "ui" : "fc", b ? o = a("<div class='fc-toolbar'/>").append(f("left")).append(f("right")).append(f("center")).append('<div class="fc-clear"/>') : void 0
        }

        function e() {
            o.remove(), o = a()
        }

        function f(d) {
            var e = a('<div class="fc-' + d + '"/>'),
                f = c.header[d];
            return f && a.each(f.split(" "), function (d) {
                var f, g = a(),
                    h = !0;
                a.each(this.split(","), function (d, e) {
                    var f, i, j, k, l, m, o, q, r, s;
                    "title" == e ? (g = g.add(a("<h2>&nbsp;</h2>")), h = !1) : ((f = (b.options.customButtons || {})[e]) ? (j = function (a) {
                        f.click && f.click.call(s[0], a)
                    }, k = "", l = f.text) : (i = b.getViewSpec(e)) ? (j = function () {
                        b.changeView(e)
                    }, p.push(e), k = i.buttonTextOverride, l = i.buttonTextDefault) : b[e] && (j = function () {
                        b[e]()
                    }, k = (b.overrides.buttonText || {})[e], l = c.buttonText[e]), j && (m = f ? f.themeIcon : c.themeButtonIcons[e], o = f ? f.icon : c.buttonIcons[e], q = k ? Y(k) : m && c.theme ? "<span class='ui-icon ui-icon-" + m + "'></span>" : o && !c.theme ? "<span class='fc-icon fc-icon-" + o + "'></span>" : Y(l), r = ["fc-" + e + "-button", n + "-button", n + "-state-default"], s = a('<button type="button" class="' + r.join(" ") + '">' + q + "</button>").click(function (a) {
                        s.hasClass(n + "-state-disabled") || (j(a), (s.hasClass(n + "-state-active") || s.hasClass(n + "-state-disabled")) && s.removeClass(n + "-state-hover"))
                    }).mousedown(function () {
                        s.not("." + n + "-state-active").not("." + n + "-state-disabled").addClass(n + "-state-down")
                    }).mouseup(function () {
                        s.removeClass(n + "-state-down")
                    }).hover(function () {
                        s.not("." + n + "-state-active").not("." + n + "-state-disabled").addClass(n + "-state-hover")
                    }, function () {
                        s.removeClass(n + "-state-hover").removeClass(n + "-state-down")
                    }), g = g.add(s)))
                }), h && g.first().addClass(n + "-corner-left").end().last().addClass(n + "-corner-right").end(), g.length > 1 ? (f = a("<div/>"), h && f.addClass("fc-button-group"), f.append(g), e.append(f)) : e.append(g)
            }), e
        }

        function g(a) {
            o.find("h2").text(a)
        }

        function h(a) {
            o.find(".fc-" + a + "-button").addClass(n + "-state-active")
        }

        function i(a) {
            o.find(".fc-" + a + "-button").removeClass(n + "-state-active")
        }

        function j(a) {
            o.find(".fc-" + a + "-button").attr("disabled", "disabled").addClass(n + "-state-disabled")
        }

        function k(a) {
            o.find(".fc-" + a + "-button").removeAttr("disabled").removeClass(n + "-state-disabled")
        }

        function l() {
            return p
        }
        var m = this;
        m.render = d, m.removeElement = e, m.updateTitle = g, m.activateButton = h, m.deactivateButton = i, m.disableButton = j, m.enableButton = k, m.getViewsWithButtons = l;
        var n, o = a(),
            p = []
    }

    function Na(c) {
        function d(a, b) {
            return !L || L > a || b > M
        }

        function e(a, b) {
            L = a, M = b, T = [];
            var c = ++R,
                d = Q.length;
            S = d;
            for (var e = 0; d > e; e++) f(Q[e], c)
        }

        function f(b, c) {
            g(b, function (d) {
                var e, f, g, h = a.isArray(b.events);
                if (c == R) {
                    if (d)
                        for (e = 0; e < d.length; e++) f = d[e], g = h ? f : s(f, b), g && T.push.apply(T, w(g));
                    S--, S || N(T)
                }
            })
        }

        function g(b, d) {
            var e, f, h = Pa.sourceFetchers;
            for (e = 0; e < h.length; e++) {
                if (f = h[e].call(K, b, L.clone(), M.clone(), c.timezone, d), f === !0) return;
                if ("object" == typeof f) return void g(f, d)
            }
            var i = b.events;
            if (i) a.isFunction(i) ? (K.pushLoading(), i.call(K, L.clone(), M.clone(), c.timezone, function (a) {
                d(a), K.popLoading()
            })) : a.isArray(i) ? d(i) : d();
            else {
                var j = b.url;
                if (j) {
                    var k, l = b.success,
                        m = b.error,
                        n = b.complete;
                    k = a.isFunction(b.data) ? b.data() : b.data;
                    var o = a.extend({}, k || {}),
                        p = X(b.startParam, c.startParam),
                        q = X(b.endParam, c.endParam),
                        r = X(b.timezoneParam, c.timezoneParam);
                    p && (o[p] = L.format()), q && (o[q] = M.format()), c.timezone && "local" != c.timezone && (o[r] = c.timezone), K.pushLoading(), a.ajax(a.extend({}, ub, b, {
                        data: o,
                        success: function (b) {
                            b = b || [];
                            var c = W(l, this, arguments);
                            a.isArray(c) && (b = c), d(b)
                        },
                        error: function () {
                            W(m, this, arguments), d()
                        },
                        complete: function () {
                            W(n, this, arguments), K.popLoading()
                        }
                    }))
                } else d()
            }
        }

        function h(a) {
            var b = i(a);
            b && (Q.push(b), S++, f(b, R))
        }

        function i(b) {
            var c, d, e = Pa.sourceNormalizers;
            if (a.isFunction(b) || a.isArray(b) ? c = {
                events: b
            } : "string" == typeof b ? c = {
                url: b
            } : "object" == typeof b && (c = a.extend({}, b)), c) {
                for (c.className ? "string" == typeof c.className && (c.className = c.className.split(/\s+/)) : c.className = [], a.isArray(c.events) && (c.origArray = c.events, c.events = a.map(c.events, function (a) {
                    return s(a, c)
                })), d = 0; d < e.length; d++) e[d].call(K, c);
                return c
            }
        }

        function j(b) {
            Q = a.grep(Q, function (a) {
                return !k(a, b)
            }), T = a.grep(T, function (a) {
                return !k(a.source, b)
            }), N(T)
        }

        function k(a, b) {
            return a && b && l(a) == l(b)
        }

        function l(a) {
            return ("object" == typeof a ? a.origArray || a.googleCalendarId || a.url || a.events : null) || a
        }

        function m(a) {
            a.start = K.moment(a.start), a.end ? a.end = K.moment(a.end) : a.end = null, x(a, n(a)), N(T)
        }

        function n(b) {
            var c = {};
            return a.each(b, function (a, b) {
                o(a) && void 0 !== b && V(b) && (c[a] = b)
            }), c
        }

        function o(a) {
            return !/^_|^(id|allDay|start|end)$/.test(a)
        }

        function p(a, b) {
            var c, d, e, f = s(a);
            if (f) {
                for (c = w(f), d = 0; d < c.length; d++) e = c[d], e.source || (b && (O.events.push(e), e.source = O), T.push(e));
                return N(T), c
            }
            return []
        }

        function q(b) {
            var c, d;
            for (null == b ? b = function () {
                return !0
            } : a.isFunction(b) || (c = b + "", b = function (a) {
                return a._id == c
            }), T = a.grep(T, b, !0), d = 0; d < Q.length; d++) a.isArray(Q[d].events) && (Q[d].events = a.grep(Q[d].events, b, !0));
            N(T)
        }

        function r(b) {
            return a.isFunction(b) ? a.grep(T, b) : null != b ? (b += "", a.grep(T, function (a) {
                return a._id == b
            })) : T
        }

        function s(d, e) {
            var f, g, h, i = {};
            if (c.eventDataTransform && (d = c.eventDataTransform(d)), e && e.eventDataTransform && (d = e.eventDataTransform(d)), a.extend(i, d), e && (i.source = e), i._id = d._id || (void 0 === d.id ? "_fc" + vb++ : d.id + ""), d.className ? "string" == typeof d.className ? i.className = d.className.split(/\s+/) : i.className = d.className : i.className = [], f = d.start || d.date, g = d.end, P(f) && (f = b.duration(f)), P(g) && (g = b.duration(g)), d.dow || b.isDuration(f) || b.isDuration(g)) i.start = f ? b.duration(f) : null, i.end = g ? b.duration(g) : null, i._recurring = !0;
            else {
                if (f && (f = K.moment(f), !f.isValid())) return !1;
                g && (g = K.moment(g), g.isValid() || (g = null)), h = d.allDay, void 0 === h && (h = X(e ? e.allDayDefault : void 0, c.allDayDefault)), t(f, g, h, i)
            }
            return i
        }

        function t(a, b, c, d) {
            d.start = a, d.end = b, d.allDay = c, u(d), Oa(d)
        }

        function u(a) {
            v(a), a.end && !a.end.isAfter(a.start) && (a.end = null), a.end || (c.forceEventDuration ? a.end = K.getDefaultEventEnd(a.allDay, a.start) : a.end = null)
        }

        function v(a) {
            null == a.allDay && (a.allDay = !(a.start.hasTime() || a.end && a.end.hasTime())), a.allDay ? (a.start.stripTime(), a.end && a.end.stripTime()) : (a.start.hasTime() || (a.start = K.applyTimezone(a.start.time(0))), a.end && !a.end.hasTime() && (a.end = K.applyTimezone(a.end.time(0))))
        }

        function w(b, c, d) {
            var e, f, g, h, i, j, k, l, m, n = [];
            if (c = c || L, d = d || M, b)
                if (b._recurring) {
                    if (f = b.dow)
                        for (e = {}, g = 0; g < f.length; g++) e[f[g]] = !0;
                    for (h = c.clone().stripTime(); h.isBefore(d);)(!e || e[h.day()]) && (i = b.start, j = b.end, k = h.clone(), l = null, i && (k = k.time(i)), j && (l = h.clone().time(j)), m = a.extend({}, b), t(k, l, !i && !j, m), n.push(m)), h.add(1, "days")
                } else n.push(b);
            return n
        }

        function x(b, c, d) {
            function e(a, b) {
                return d ? H(a, b, d) : c.allDay ? G(a, b) : F(a, b)
            }
            var f, g, h, i, j, k, l = {};
            return c = c || {}, c.start || (c.start = b.start.clone()), void 0 === c.end && (c.end = b.end ? b.end.clone() : null), null == c.allDay && (c.allDay = b.allDay), u(c), f = {
                start: b._start.clone(),
                end: b._end ? b._end.clone() : K.getDefaultEventEnd(b._allDay, b._start),
                allDay: c.allDay
            }, u(f), g = null !== b._end && null === c.end, h = e(c.start, f.start), c.end ? (i = e(c.end, f.end), j = i.subtract(h)) : j = null, a.each(c, function (a, b) {
                o(a) && void 0 !== b && (l[a] = b)
            }), k = y(r(b._id), g, c.allDay, h, j, l), {
                dateDelta: h,
                durationDelta: j,
                undo: k
            }
        }

        function y(b, c, d, e, f, g) {
            var h = K.getIsAmbigTimezone(),
                i = [];
            return e && !e.valueOf() && (e = null), f && !f.valueOf() && (f = null), a.each(b, function (b, j) {
                var k, l;
                k = {
                    start: j.start.clone(),
                    end: j.end ? j.end.clone() : null,
                    allDay: j.allDay
                }, a.each(g, function (a) {
                    k[a] = j[a]
                }), l = {
                    start: j._start,
                    end: j._end,
                    allDay: d
                }, u(l), c ? l.end = null : f && !l.end && (l.end = K.getDefaultEventEnd(l.allDay, l.start)), e && (l.start.add(e), l.end && l.end.add(e)), f && l.end.add(f), h && !l.allDay && (e || f) && (l.start.stripZone(), l.end && l.end.stripZone()), a.extend(j, g, l), Oa(j), i.push(function () {
                    a.extend(j, k), Oa(j)
                })
            }),
                function () {
                    for (var a = 0; a < i.length; a++) i[a]()
                }
        }

        function z(b) {
            var d, e = c.businessHours,
                f = {
                    className: "fc-nonbusiness",
                    start: "09:00",
                    end: "17:00",
                    dow: [1, 2, 3, 4, 5],
                    rendering: "inverse-background"
                },
                g = K.getView();
            return e && (d = a.extend({}, f, "object" == typeof e ? e : {})), d ? (b && (d.start = null, d.end = null), w(s(d), g.start, g.end)) : []
        }

        function A(a, b) {
            var d = b.source || {},
                e = X(b.constraint, d.constraint, c.eventConstraint),
                f = X(b.overlap, d.overlap, c.eventOverlap);
            return D(a, e, f, b)
        }

        function B(b, c, d) {
            var e, f;
            return d && (e = a.extend({}, d, c), f = w(s(e))[0]), f ? A(b, f) : C(b)
        }

        function C(a) {
            return D(a, c.selectConstraint, c.selectOverlap)
        }

        function D(a, b, c, d) {
            var e, f, g, h, i, j;
            if (null != b) {
                for (e = E(b), f = !1, h = 0; h < e.length; h++)
                    if (I(e[h], a)) {
                        f = !0;
                        break
                    }
                if (!f) return !1
            }
            for (g = K.getPeerEvents(a, d), h = 0; h < g.length; h++)
                if (i = g[h], J(i, a)) {
                    if (c === !1) return !1;
                    if ("function" == typeof c && !c(i, d)) return !1;
                    if (d) {
                        if (j = X(i.overlap, (i.source || {}).overlap), j === !1) return !1;
                        if ("function" == typeof j && !j(d, i)) return !1
                    }
                }
            return !0
        }

        function E(a) {
            return "businessHours" === a ? z() : "object" == typeof a ? w(s(a)) : r(a)
        }

        function I(a, b) {
            var c = a.start.clone().stripZone(),
                d = K.getEventEnd(a).stripZone();
            return b.start >= c && b.end <= d
        }

        function J(a, b) {
            var c = a.start.clone().stripZone(),
                d = K.getEventEnd(a).stripZone();
            return b.start < d && b.end > c
        }
        var K = this;
        K.isFetchNeeded = d, K.fetchEvents = e, K.addEventSource = h, K.removeEventSource = j, K.updateEvent = m, K.renderEvent = p, K.removeEvents = q, K.clientEvents = r, K.mutateEvent = x, K.normalizeEventDates = u, K.normalizeEventTimes = v;
        var L, M, N = K.reportEvents,
            O = {
                events: []
            },
            Q = [O],
            R = 0,
            S = 0,
            T = [];
        a.each((c.events ? [c.events] : []).concat(c.eventSources || []), function (a, b) {
            var c = i(b);
            c && Q.push(c)
        }), K.getBusinessHoursEvents = z, K.isEventSpanAllowed = A, K.isExternalSpanAllowed = B, K.isSelectionSpanAllowed = C, K.getEventCache = function () {
            return T
        }
    }

    function Oa(a) {
        a._allDay = a.allDay, a._start = a.start.clone(), a._end = a.end ? a.end.clone() : null
    }
    var Pa = a.fullCalendar = {
        version: "2.6.1",
        internalApiVersion: 3
    },
        Qa = Pa.views = {};
    a.fn.fullCalendar = function (b) {
        var c = Array.prototype.slice.call(arguments, 1),
            d = this;
        return this.each(function (e, f) {
            var g, h = a(f),
                i = h.data("fullCalendar");
            "string" == typeof b ? i && a.isFunction(i[b]) && (g = i[b].apply(i, c), e || (d = g), "destroy" === b && h.removeData("fullCalendar")) : i || (i = new pb(h, b), h.data("fullCalendar", i), i.render())
        }), d
    };
    var Ra = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
    Pa.intersectRanges = E, Pa.applyAll = W, Pa.debounce = da, Pa.isInt = ba, Pa.htmlEscape = Y, Pa.cssToStr = $, Pa.proxy = ca, Pa.capitaliseFirstLetter = _, Pa.getOuterRect = o, Pa.getClientRect = p, Pa.getContentRect = q, Pa.getScrollbarWidths = r;
    var Sa = null;
    Pa.intersectRects = w, Pa.parseFieldSpecs = A, Pa.compareByFieldSpecs = B, Pa.compareByFieldSpec = C, Pa.flexibleCompare = D, Pa.computeIntervalUnit = I, Pa.divideRangeByDuration = K, Pa.divideDurationByDuration = L, Pa.multiplyDuration = M, Pa.durationHasTime = N;
    var Ta = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        Ua = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    Pa.log = function () {
        var a = window.console;
        return a && a.log ? a.log.apply(a, arguments) : void 0
    }, Pa.warn = function () {
        var a = window.console;
        return a && a.warn ? a.warn.apply(a, arguments) : Pa.log.apply(Pa, arguments)
    };
    var Va, Wa, Xa, Ya = {}.hasOwnProperty,
        Za = /^\s*\d{4}-\d\d$/,
        $a = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
        _a = b.fn,
        ab = a.extend({}, _a);
    Pa.moment = function () {
        return ea(arguments)
    }, Pa.moment.utc = function () {
        var a = ea(arguments, !0);
        return a.hasTime() && a.utc(), a
    }, Pa.moment.parseZone = function () {
        return ea(arguments, !0, !0)
    }, _a.clone = function () {
        var a = ab.clone.apply(this, arguments);
        return ga(this, a), this._fullCalendar && (a._fullCalendar = !0), a
    }, _a.week = _a.weeks = function (a) {
        var b = (this._locale || this._lang)._fullCalendar_weekCalc;
        return null == a && "function" == typeof b ? b(this) : "ISO" === b ? ab.isoWeek.apply(this, arguments) : ab.week.apply(this, arguments)
    }, _a.time = function (a) {
        if (!this._fullCalendar) return ab.time.apply(this, arguments);
        if (null == a) return b.duration({
            hours: this.hours(),
            minutes: this.minutes(),
            seconds: this.seconds(),
            milliseconds: this.milliseconds()
        });
        this._ambigTime = !1, b.isDuration(a) || b.isMoment(a) || (a = b.duration(a));
        var c = 0;
        return b.isDuration(a) && (c = 24 * Math.floor(a.asDays())), this.hours(c + a.hours()).minutes(a.minutes()).seconds(a.seconds()).milliseconds(a.milliseconds())
    }, _a.stripTime = function () {
        var a;
        return this._ambigTime || (a = this.toArray(), this.utc(), Wa(this, a.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this
    }, _a.hasTime = function () {
        return !this._ambigTime
    }, _a.stripZone = function () {
        var a, b;
        return this._ambigZone || (a = this.toArray(), b = this._ambigTime, this.utc(), Wa(this, a), this._ambigTime = b || !1, this._ambigZone = !0), this
    }, _a.hasZone = function () {
        return !this._ambigZone
    }, _a.local = function () {
        var a = this.toArray(),
            b = this._ambigZone;
        return ab.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, b && Xa(this, a), this
    }, _a.utc = function () {
        return ab.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this
    }, a.each(["zone", "utcOffset"], function (a, b) {
        ab[b] && (_a[b] = function (a) {
            return null != a && (this._ambigTime = !1, this._ambigZone = !1), ab[b].apply(this, arguments)
        })
    }), _a.format = function () {
        return this._fullCalendar && arguments[0] ? ja(this, arguments[0]) : this._ambigTime ? ia(this, "YYYY-MM-DD") : this._ambigZone ? ia(this, "YYYY-MM-DD[T]HH:mm:ss") : ab.format.apply(this, arguments)
    }, _a.toISOString = function () {
        return this._ambigTime ? ia(this, "YYYY-MM-DD") : this._ambigZone ? ia(this, "YYYY-MM-DD[T]HH:mm:ss") : ab.toISOString.apply(this, arguments)
    }, _a.isWithin = function (a, b) {
        var c = fa([this, a, b]);
        return c[0] >= c[1] && c[0] < c[2]
    }, _a.isSame = function (a, b) {
        var c;
        return this._fullCalendar ? b ? (c = fa([this, a], !0), ab.isSame.call(c[0], c[1], b)) : (a = Pa.moment.parseZone(a), ab.isSame.call(this, a) && Boolean(this._ambigTime) === Boolean(a._ambigTime) && Boolean(this._ambigZone) === Boolean(a._ambigZone)) : ab.isSame.apply(this, arguments)
    }, a.each(["isBefore", "isAfter"], function (a, b) {
        _a[b] = function (a, c) {
            var d;
            return this._fullCalendar ? (d = fa([this, a]), ab[b].call(d[0], d[1], c)) : ab[b].apply(this, arguments)
        }
    }), Va = "_d" in b() && "updateOffset" in b, Wa = Va ? function (a, c) {
        a._d.setTime(Date.UTC.apply(Date, c)), b.updateOffset(a, !1)
    } : ha, Xa = Va ? function (a, c) {
        a._d.setTime(+new Date(c[0] || 0, c[1] || 0, c[2] || 0, c[3] || 0, c[4] || 0, c[5] || 0, c[6] || 0)), b.updateOffset(a, !1)
    } : ha;
    var bb = {
        t: function (a) {
            return ia(a, "a").charAt(0)
        },
        T: function (a) {
            return ia(a, "A").charAt(0)
        }
    };
    Pa.formatRange = ma;
    var cb = {
        Y: "year",
        M: "month",
        D: "day",
        d: "day",
        A: "second",
        a: "second",
        T: "second",
        t: "second",
        H: "second",
        h: "second",
        m: "second",
        s: "second"
    },
        db = {};
    Pa.Class = ra, ra.extend = function () {
        var a, b, c = arguments.length;
        for (a = 0; c > a; a++) b = arguments[a], c - 1 > a && ta(this, b);
        return sa(this, b || {})
    }, ra.mixin = function (a) {
        ta(this, a)
    };
    var eb = Pa.Emitter = ra.extend({
        callbackHash: null,
        on: function (a, b) {
            return this.getCallbacks(a).add(b), this
        },
        off: function (a, b) {
            return this.getCallbacks(a).remove(b), this
        },
        trigger: function (a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return this.triggerWith(a, this, b), this
        },
        triggerWith: function (a, b, c) {
            var d = this.getCallbacks(a);
            return d.fireWith(b, c), this
        },
        getCallbacks: function (b) {
            var c;
            return this.callbackHash || (this.callbackHash = {}), c = this.callbackHash[b], c || (c = this.callbackHash[b] = a.Callbacks()), c
        }
    }),
        fb = ra.extend({
            isHidden: !0,
            options: null,
            el: null,
            documentMousedownProxy: null,
            margin: 10,
            constructor: function (a) {
                this.options = a || {}
            },
            show: function () {
                this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
            },
            hide: function () {
                this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
            },
            render: function () {
                var b = this,
                    c = this.options;
                this.el = a('<div class="fc-popover"/>').addClass(c.className || "").css({
                    top: 0,
                    left: 0
                }).append(c.content).appendTo(c.parentEl), this.el.on("click", ".fc-close", function () {
                    b.hide()
                }), c.autoHide && a(document).on("mousedown", this.documentMousedownProxy = ca(this, "documentMousedown"))
            },
            documentMousedown: function (b) {
                this.el && !a(b.target).closest(this.el).length && this.hide()
            },
            removeElement: function () {
                this.hide(), this.el && (this.el.remove(), this.el = null), a(document).off("mousedown", this.documentMousedownProxy)
            },
            position: function () {
                var b, c, d, e, f, g = this.options,
                    h = this.el.offsetParent().offset(),
                    i = this.el.outerWidth(),
                    j = this.el.outerHeight(),
                    k = a(window),
                    l = n(this.el);
                e = g.top || 0, f = void 0 !== g.left ? g.left : void 0 !== g.right ? g.right - i : 0, l.is(window) || l.is(document) ? (l = k, b = 0, c = 0) : (d = l.offset(), b = d.top, c = d.left), b += k.scrollTop(), c += k.scrollLeft(), g.viewportConstrain !== !1 && (e = Math.min(e, b + l.outerHeight() - j - this.margin), e = Math.max(e, b + this.margin), f = Math.min(f, c + l.outerWidth() - i - this.margin),
                    f = Math.max(f, c + this.margin)), this.el.css({
                        top: e - h.top,
                        left: f - h.left
                    })
            },
            trigger: function (a) {
                this.options[a] && this.options[a].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        }),
        gb = Pa.CoordCache = ra.extend({
            els: null,
            forcedOffsetParentEl: null,
            origin: null,
            boundingRect: null,
            isHorizontal: !1,
            isVertical: !1,
            lefts: null,
            rights: null,
            tops: null,
            bottoms: null,
            constructor: function (b) {
                this.els = a(b.els), this.isHorizontal = b.isHorizontal, this.isVertical = b.isVertical, this.forcedOffsetParentEl = b.offsetParent ? a(b.offsetParent) : null
            },
            build: function () {
                var a = this.forcedOffsetParentEl || this.els.eq(0).offsetParent();
                this.origin = a.offset(), this.boundingRect = this.queryBoundingRect(), this.isHorizontal && this.buildElHorizontals(), this.isVertical && this.buildElVerticals()
            },
            clear: function () {
                this.origin = null, this.boundingRect = null, this.lefts = null, this.rights = null, this.tops = null, this.bottoms = null
            },
            ensureBuilt: function () {
                this.origin || this.build()
            },
            queryBoundingRect: function () {
                var a = n(this.els.eq(0));
                return a.is(document) ? void 0 : p(a)
            },
            buildElHorizontals: function () {
                var b = [],
                    c = [];
                this.els.each(function (d, e) {
                    var f = a(e),
                        g = f.offset().left,
                        h = f.outerWidth();
                    b.push(g), c.push(g + h)
                }), this.lefts = b, this.rights = c
            },
            buildElVerticals: function () {
                var b = [],
                    c = [];
                this.els.each(function (d, e) {
                    var f = a(e),
                        g = f.offset().top,
                        h = f.outerHeight();
                    b.push(g), c.push(g + h)
                }), this.tops = b, this.bottoms = c
            },
            getHorizontalIndex: function (a) {
                this.ensureBuilt();
                var b, c = this.boundingRect,
                    d = this.lefts,
                    e = this.rights,
                    f = d.length;
                if (!c || a >= c.left && a < c.right)
                    for (b = 0; f > b; b++)
                        if (a >= d[b] && a < e[b]) return b
            },
            getVerticalIndex: function (a) {
                this.ensureBuilt();
                var b, c = this.boundingRect,
                    d = this.tops,
                    e = this.bottoms,
                    f = d.length;
                if (!c || a >= c.top && a < c.bottom)
                    for (b = 0; f > b; b++)
                        if (a >= d[b] && a < e[b]) return b
            },
            getLeftOffset: function (a) {
                return this.ensureBuilt(), this.lefts[a]
            },
            getLeftPosition: function (a) {
                return this.ensureBuilt(), this.lefts[a] - this.origin.left
            },
            getRightOffset: function (a) {
                return this.ensureBuilt(), this.rights[a]
            },
            getRightPosition: function (a) {
                return this.ensureBuilt(), this.rights[a] - this.origin.left
            },
            getWidth: function (a) {
                return this.ensureBuilt(), this.rights[a] - this.lefts[a]
            },
            getTopOffset: function (a) {
                return this.ensureBuilt(), this.tops[a]
            },
            getTopPosition: function (a) {
                return this.ensureBuilt(), this.tops[a] - this.origin.top
            },
            getBottomOffset: function (a) {
                return this.ensureBuilt(), this.bottoms[a]
            },
            getBottomPosition: function (a) {
                return this.ensureBuilt(), this.bottoms[a] - this.origin.top
            },
            getHeight: function (a) {
                return this.ensureBuilt(), this.bottoms[a] - this.tops[a]
            }
        }),
        hb = Pa.DragListener = ra.extend({
            options: null,
            isListening: !1,
            isDragging: !1,
            originX: null,
            originY: null,
            mousemoveProxy: null,
            mouseupProxy: null,
            subjectEl: null,
            subjectHref: null,
            scrollEl: null,
            scrollBounds: null,
            scrollTopVel: null,
            scrollLeftVel: null,
            scrollIntervalId: null,
            scrollHandlerProxy: null,
            scrollSensitivity: 30,
            scrollSpeed: 200,
            scrollIntervalMs: 50,
            constructor: function (a) {
                a = a || {}, this.options = a, this.subjectEl = a.subjectEl
            },
            mousedown: function (a) {
                v(a) && (a.preventDefault(), this.startListening(a), this.options.distance || this.startDrag(a))
            },
            startListening: function (b) {
                var c;
                this.isListening || (b && this.options.scroll && (c = n(a(b.target)), c.is(window) || c.is(document) || (this.scrollEl = c, this.scrollHandlerProxy = da(ca(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), a(document).on("mousemove", this.mousemoveProxy = ca(this, "mousemove")).on("mouseup", this.mouseupProxy = ca(this, "mouseup")).on("selectstart", this.preventDefault), b ? (this.originX = b.pageX, this.originY = b.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(b))
            },
            listenStart: function (a) {
                this.trigger("listenStart", a)
            },
            mousemove: function (a) {
                var b, c, d = a.pageX - this.originX,
                    e = a.pageY - this.originY;
                this.isDragging || (b = this.options.distance || 1, c = d * d + e * e, c >= b * b && this.startDrag(a)), this.isDragging && this.drag(d, e, a)
            },
            startDrag: function (a) {
                this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(a))
            },
            dragStart: function (a) {
                var b = this.subjectEl;
                this.trigger("dragStart", a), (this.subjectHref = b ? b.attr("href") : null) && b.removeAttr("href")
            },
            drag: function (a, b, c) {
                this.trigger("drag", a, b, c), this.updateScroll(c)
            },
            mouseup: function (a) {
                this.stopListening(a)
            },
            stopDrag: function (a) {
                this.isDragging && (this.stopScrolling(), this.dragStop(a), this.isDragging = !1)
            },
            dragStop: function (a) {
                var b = this;
                this.trigger("dragStop", a), setTimeout(function () {
                    b.subjectHref && b.subjectEl.attr("href", b.subjectHref)
                }, 0)
            },
            stopListening: function (b) {
                this.stopDrag(b), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), a(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(b))
            },
            listenStop: function (a) {
                this.trigger("listenStop", a)
            },
            trigger: function (a) {
                this.options[a] && this.options[a].apply(this, Array.prototype.slice.call(arguments, 1))
            },
            preventDefault: function (a) {
                a.preventDefault()
            },
            computeScrollBounds: function () {
                var a = this.scrollEl;
                this.scrollBounds = a ? o(a) : null
            },
            updateScroll: function (a) {
                var b, c, d, e, f = this.scrollSensitivity,
                    g = this.scrollBounds,
                    h = 0,
                    i = 0;
                g && (b = (f - (a.pageY - g.top)) / f, c = (f - (g.bottom - a.pageY)) / f, d = (f - (a.pageX - g.left)) / f, e = (f - (g.right - a.pageX)) / f, b >= 0 && 1 >= b ? h = b * this.scrollSpeed * -1 : c >= 0 && 1 >= c && (h = c * this.scrollSpeed), d >= 0 && 1 >= d ? i = d * this.scrollSpeed * -1 : e >= 0 && 1 >= e && (i = e * this.scrollSpeed)), this.setScrollVel(h, i)
            },
            setScrollVel: function (a, b) {
                this.scrollTopVel = a, this.scrollLeftVel = b, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(ca(this, "scrollIntervalFunc"), this.scrollIntervalMs))
            },
            constrainScrollVel: function () {
                var a = this.scrollEl;
                this.scrollTopVel < 0 ? a.scrollTop() <= 0 && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && a.scrollTop() + a[0].clientHeight >= a[0].scrollHeight && (this.scrollTopVel = 0), this.scrollLeftVel < 0 ? a.scrollLeft() <= 0 && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && a.scrollLeft() + a[0].clientWidth >= a[0].scrollWidth && (this.scrollLeftVel = 0)
            },
            scrollIntervalFunc: function () {
                var a = this.scrollEl,
                    b = this.scrollIntervalMs / 1e3;
                this.scrollTopVel && a.scrollTop(a.scrollTop() + this.scrollTopVel * b), this.scrollLeftVel && a.scrollLeft(a.scrollLeft() + this.scrollLeftVel * b), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling()
            },
            stopScrolling: function () {
                this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop())
            },
            scrollHandler: function () {
                this.scrollIntervalId || this.scrollStop()
            },
            scrollStop: function () { }
        }),
        ib = hb.extend({
            component: null,
            origHit: null,
            hit: null,
            coordAdjust: null,
            constructor: function (a, b) {
                hb.call(this, b), this.component = a
            },
            listenStart: function (a) {
                var b, c, d, e = this.subjectEl;
                hb.prototype.listenStart.apply(this, arguments), this.computeCoords(), a ? (c = {
                    left: a.pageX,
                    top: a.pageY
                }, d = c, e && (b = o(e), d = x(d, b)), this.origHit = this.queryHit(d.left, d.top), e && this.options.subjectCenter && (this.origHit && (b = w(this.origHit, b) || b), d = y(b)), this.coordAdjust = z(d, c)) : (this.origHit = null, this.coordAdjust = null)
            },
            computeCoords: function () {
                this.component.prepareHits(), this.computeScrollBounds()
            },
            dragStart: function (a) {
                var b;
                hb.prototype.dragStart.apply(this, arguments), b = this.queryHit(a.pageX, a.pageY), b && this.hitOver(b)
            },
            drag: function (a, b, c) {
                var d;
                hb.prototype.drag.apply(this, arguments), d = this.queryHit(c.pageX, c.pageY), ua(d, this.hit) || (this.hit && this.hitOut(), d && this.hitOver(d))
            },
            dragStop: function () {
                this.hitDone(), hb.prototype.dragStop.apply(this, arguments)
            },
            hitOver: function (a) {
                var b = ua(a, this.origHit);
                this.hit = a, this.trigger("hitOver", this.hit, b, this.origHit)
            },
            hitOut: function () {
                this.hit && (this.trigger("hitOut", this.hit), this.hitDone(), this.hit = null)
            },
            hitDone: function () {
                this.hit && this.trigger("hitDone", this.hit)
            },
            listenStop: function () {
                hb.prototype.listenStop.apply(this, arguments), this.origHit = null, this.hit = null, this.component.releaseHits()
            },
            scrollStop: function () {
                hb.prototype.scrollStop.apply(this, arguments), this.computeCoords()
            },
            queryHit: function (a, b) {
                return this.coordAdjust && (a += this.coordAdjust.left, b += this.coordAdjust.top), this.component.queryHit(a, b)
            }
        }),
        jb = ra.extend({
            options: null,
            sourceEl: null,
            el: null,
            parentEl: null,
            top0: null,
            left0: null,
            mouseY0: null,
            mouseX0: null,
            topDelta: null,
            leftDelta: null,
            mousemoveProxy: null,
            isFollowing: !1,
            isHidden: !1,
            isAnimating: !1,
            constructor: function (b, c) {
                this.options = c = c || {}, this.sourceEl = b, this.parentEl = c.parentEl ? a(c.parentEl) : b.parent()
            },
            start: function (b) {
                this.isFollowing || (this.isFollowing = !0, this.mouseY0 = b.pageY, this.mouseX0 = b.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), a(document).on("mousemove", this.mousemoveProxy = ca(this, "mousemove")))
            },
            stop: function (b, c) {
                function d() {
                    this.isAnimating = !1, e.removeElement(), this.top0 = this.left0 = null, c && c()
                }
                var e = this,
                    f = this.options.revertDuration;
                this.isFollowing && !this.isAnimating && (this.isFollowing = !1, a(document).off("mousemove", this.mousemoveProxy), b && f && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
                    top: this.top0,
                    left: this.left0
                }, {
                    duration: f,
                    complete: d
                })) : d())
            },
            getEl: function () {
                var a = this.el;
                return a || (this.sourceEl.width(), a = this.el = this.sourceEl.clone().css({
                    position: "absolute",
                    visibility: "",
                    display: this.isHidden ? "none" : "",
                    margin: 0,
                    right: "auto",
                    bottom: "auto",
                    width: this.sourceEl.width(),
                    height: this.sourceEl.height(),
                    opacity: this.options.opacity || "",
                    zIndex: this.options.zIndex
                }).appendTo(this.parentEl)), a
            },
            removeElement: function () {
                this.el && (this.el.remove(), this.el = null)
            },
            updatePosition: function () {
                var a, b;
                this.getEl(), null === this.top0 && (this.sourceEl.width(), a = this.sourceEl.offset(), b = this.el.offsetParent().offset(), this.top0 = a.top - b.top, this.left0 = a.left - b.left), this.el.css({
                    top: this.top0 + this.topDelta,
                    left: this.left0 + this.leftDelta
                })
            },
            mousemove: function (a) {
                this.topDelta = a.pageY - this.mouseY0, this.leftDelta = a.pageX - this.mouseX0, this.isHidden || this.updatePosition()
            },
            hide: function () {
                this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
            },
            show: function () {
                this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
            }
        }),
        kb = Pa.Grid = ra.extend({
            view: null,
            isRTL: null,
            start: null,
            end: null,
            el: null,
            elsByFill: null,
            externalDragStartProxy: null,
            eventTimeFormat: null,
            displayEventTime: null,
            displayEventEnd: null,
            minResizeDuration: null,
            largeUnit: null,
            constructor: function (a) {
                this.view = a, this.isRTL = a.opt("isRTL"), this.elsByFill = {}, this.externalDragStartProxy = ca(this, "externalDragStart")
            },
            computeEventTimeFormat: function () {
                return this.view.opt("smallTimeFormat")
            },
            computeDisplayEventTime: function () {
                return !0
            },
            computeDisplayEventEnd: function () {
                return !0
            },
            setRange: function (a) {
                this.start = a.start.clone(), this.end = a.end.clone(), this.rangeUpdated(), this.processRangeOptions()
            },
            rangeUpdated: function () { },
            processRangeOptions: function () {
                var a, b, c = this.view;
                this.eventTimeFormat = c.opt("eventTimeFormat") || c.opt("timeFormat") || this.computeEventTimeFormat(), a = c.opt("displayEventTime"), null == a && (a = this.computeDisplayEventTime()), b = c.opt("displayEventEnd"), null == b && (b = this.computeDisplayEventEnd()), this.displayEventTime = a, this.displayEventEnd = b
            },
            spanToSegs: function (a) { },
            diffDates: function (a, b) {
                return this.largeUnit ? H(a, b, this.largeUnit) : F(a, b)
            },
            prepareHits: function () { },
            releaseHits: function () { },
            queryHit: function (a, b) { },
            getHitSpan: function (a) { },
            getHitEl: function (a) { },
            setElement: function (b) {
                var c = this;
                this.el = b, b.on("mousedown", function (b) {
                    a(b.target).is(".fc-event-container *, .fc-more") || a(b.target).closest(".fc-popover").length || c.dayMousedown(b)
                }), this.bindSegHandlers(), this.bindGlobalHandlers()
            },
            removeElement: function () {
                this.unbindGlobalHandlers(), this.el.remove()
            },
            renderSkeleton: function () { },
            renderDates: function () { },
            unrenderDates: function () { },
            bindGlobalHandlers: function () {
                a(document).on("dragstart sortstart", this.externalDragStartProxy)
            },
            unbindGlobalHandlers: function () {
                a(document).off("dragstart sortstart", this.externalDragStartProxy)
            },
            dayMousedown: function (a) {
                var b, c, d = this,
                    e = this.view,
                    f = e.opt("selectable"),
                    i = new ib(this, {
                        scroll: e.opt("dragScroll"),
                        dragStart: function () {
                            e.unselect()
                        },
                        hitOver: function (a, e, h) {
                            h && (b = e ? a : null, f && (c = d.computeSelection(d.getHitSpan(h), d.getHitSpan(a)), c ? d.renderSelection(c) : c === !1 && g()))
                        },
                        hitOut: function () {
                            b = null, c = null, d.unrenderSelection(), h()
                        },
                        listenStop: function (a) {
                            b && e.triggerDayClick(d.getHitSpan(b), d.getHitEl(b), a), c && e.reportSelection(c, a), h()
                        }
                    });
                i.mousedown(a)
            },
            renderEventLocationHelper: function (a, b) {
                var c = this.fabricateHelperEvent(a, b);
                this.renderHelper(c, b)
            },
            fabricateHelperEvent: function (a, b) {
                var c = b ? R(b.event) : {};
                return c.start = a.start.clone(), c.end = a.end ? a.end.clone() : null, c.allDay = null, this.view.calendar.normalizeEventDates(c), c.className = (c.className || []).concat("fc-helper"), b || (c.editable = !1), c
            },
            renderHelper: function (a, b) { },
            unrenderHelper: function () { },
            renderSelection: function (a) {
                this.renderHighlight(a)
            },
            unrenderSelection: function () {
                this.unrenderHighlight()
            },
            computeSelection: function (a, b) {
                var c = this.computeSelectionSpan(a, b);
                return c && !this.view.calendar.isSelectionSpanAllowed(c) ? !1 : c
            },
            computeSelectionSpan: function (a, b) {
                var c = [a.start, a.end, b.start, b.end];
                return c.sort(aa), {
                    start: c[0].clone(),
                    end: c[3].clone()
                }
            },
            renderHighlight: function (a) {
                this.renderFill("highlight", this.spanToSegs(a))
            },
            unrenderHighlight: function () {
                this.unrenderFill("highlight")
            },
            highlightSegClasses: function () {
                return ["fc-highlight"]
            },
            renderBusinessHours: function () { },
            unrenderBusinessHours: function () { },
            getNowIndicatorUnit: function () { },
            renderNowIndicator: function (a) { },
            unrenderNowIndicator: function () { },
            renderFill: function (a, b) { },
            unrenderFill: function (a) {
                var b = this.elsByFill[a];
                b && (b.remove(), delete this.elsByFill[a])
            },
            renderFillSegEls: function (b, c) {
                var d, e = this,
                    f = this[b + "SegEl"],
                    g = "",
                    h = [];
                if (c.length) {
                    for (d = 0; d < c.length; d++) g += this.fillSegHtml(b, c[d]);
                    a(g).each(function (b, d) {
                        var g = c[b],
                            i = a(d);
                        f && (i = f.call(e, g, i)), i && (i = a(i), i.is(e.fillSegTag) && (g.el = i, h.push(g)))
                    })
                }
                return h
            },
            fillSegTag: "div",
            fillSegHtml: function (a, b) {
                var c = this[a + "SegClasses"],
                    d = this[a + "SegCss"],
                    e = c ? c.call(this, b) : [],
                    f = $(d ? d.call(this, b) : {});
                return "<" + this.fillSegTag + (e.length ? ' class="' + e.join(" ") + '"' : "") + (f ? ' style="' + f + '"' : "") + " />"
            },
            getDayClasses: function (a) {
                var b = this.view,
                    c = b.calendar.getNow(),
                    d = ["fc-" + Ta[a.day()]];
                return 1 == b.intervalDuration.as("months") && a.month() != b.intervalStart.month() && d.push("fc-other-month"), a.isSame(c, "day") ? d.push("fc-today", b.highlightStateClass) : c > a ? d.push("fc-past") : d.push("fc-future"), d
            }
        });
    kb.mixin({
        mousedOverSeg: null,
        isDraggingSeg: !1,
        isResizingSeg: !1,
        isDraggingExternal: !1,
        segs: null,
        renderEvents: function (a) {
            var b, c = [],
                d = [];
            for (b = 0; b < a.length; b++)(wa(a[b]) ? c : d).push(a[b]);
            this.segs = [].concat(this.renderBgEvents(c), this.renderFgEvents(d))
        },
        renderBgEvents: function (a) {
            var b = this.eventsToSegs(a);
            return this.renderBgSegs(b) || b
        },
        renderFgEvents: function (a) {
            var b = this.eventsToSegs(a);
            return this.renderFgSegs(b) || b
        },
        unrenderEvents: function () {
            this.triggerSegMouseout(), this.unrenderFgSegs(), this.unrenderBgSegs(), this.segs = null
        },
        getEventSegs: function () {
            return this.segs || []
        },
        renderFgSegs: function (a) { },
        unrenderFgSegs: function () { },
        renderFgSegEls: function (b, c) {
            var d, e = this.view,
                f = "",
                g = [];
            if (b.length) {
                for (d = 0; d < b.length; d++) f += this.fgSegHtml(b[d], c);
                a(f).each(function (c, d) {
                    var f = b[c],
                        h = e.resolveEventEl(f.event, a(d));
                    h && (h.data("fc-seg", f), f.el = h, g.push(f))
                })
            }
            return g
        },
        fgSegHtml: function (a, b) { },
        renderBgSegs: function (a) {
            return this.renderFill("bgEvent", a)
        },
        unrenderBgSegs: function () {
            this.unrenderFill("bgEvent")
        },
        bgEventSegEl: function (a, b) {
            return this.view.resolveEventEl(a.event, b)
        },
        bgEventSegClasses: function (a) {
            var b = a.event,
                c = b.source || {};
            return ["fc-bgevent"].concat(b.className, c.className || [])
        },
        bgEventSegCss: function (a) {
            return {
                "background-color": this.getSegSkinCss(a)["background-color"]
            }
        },
        businessHoursSegClasses: function (a) {
            return ["fc-nonbusiness", "fc-bgevent"]
        },
        bindSegHandlers: function () {
            var b = this,
                c = this.view;
            a.each({
                mouseenter: function (a, c) {
                    b.triggerSegMouseover(a, c)
                },
                mouseleave: function (a, c) {
                    b.triggerSegMouseout(a, c)
                },
                click: function (a, b) {
                    return c.trigger("eventClick", this, a.event, b)
                },
                mousedown: function (d, e) {
                    a(e.target).is(".fc-resizer") && c.isEventResizable(d.event) ? b.segResizeMousedown(d, e, a(e.target).is(".fc-start-resizer")) : c.isEventDraggable(d.event) && b.segDragMousedown(d, e)
                }
            }, function (c, d) {
                b.el.on(c, ".fc-event-container > *", function (c) {
                    var e = a(this).data("fc-seg");
                    return !e || b.isDraggingSeg || b.isResizingSeg ? void 0 : d.call(this, e, c)
                })
            })
        },
        triggerSegMouseover: function (a, b) {
            this.mousedOverSeg || (this.mousedOverSeg = a, this.view.trigger("eventMouseover", a.el[0], a.event, b))
        },
        triggerSegMouseout: function (a, b) {
            b = b || {}, this.mousedOverSeg && (a = a || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", a.el[0], a.event, b))
        },
        segDragMousedown: function (a, b) {
            var c, d = this,
                e = this.view,
                f = e.calendar,
                i = a.el,
                j = a.event,
                k = new jb(a.el, {
                    parentEl: e.el,
                    opacity: e.opt("dragOpacity"),
                    revertDuration: e.opt("dragRevertDuration"),
                    zIndex: 2
                }),
                l = new ib(e, {
                    distance: 5,
                    scroll: e.opt("dragScroll"),
                    subjectEl: i,
                    subjectCenter: !0,
                    listenStart: function (a) {
                        k.hide(), k.start(a)
                    },
                    dragStart: function (b) {
                        d.triggerSegMouseout(a, b), d.segDragStart(a, b), e.hideEvent(j)
                    },
                    hitOver: function (b, h, i) {
                        a.hit && (i = a.hit), c = d.computeEventDrop(i.component.getHitSpan(i), b.component.getHitSpan(b), j), c && !f.isEventSpanAllowed(d.eventToSpan(c), j) && (g(), c = null), c && e.renderDrag(c, a) ? k.hide() : k.show(), h && (c = null)
                    },
                    hitOut: function () {
                        e.unrenderDrag(), k.show(), c = null
                    },
                    hitDone: function () {
                        h()
                    },
                    dragStop: function (b) {
                        k.stop(!c, function () {
                            e.unrenderDrag(), e.showEvent(j), d.segDragStop(a, b), c && e.reportEventDrop(j, c, this.largeUnit, i, b)
                        })
                    },
                    listenStop: function () {
                        k.stop()
                    }
                });
            l.mousedown(b)
        },
        segDragStart: function (a, b) {
            this.isDraggingSeg = !0, this.view.trigger("eventDragStart", a.el[0], a.event, b, {})
        },
        segDragStop: function (a, b) {
            this.isDraggingSeg = !1, this.view.trigger("eventDragStop", a.el[0], a.event, b, {})
        },
        computeEventDrop: function (a, b, c) {
            var d, e, f = this.view.calendar,
                g = a.start,
                h = b.start;
            return g.hasTime() === h.hasTime() ? (d = this.diffDates(h, g), c.allDay && N(d) ? (e = {
                start: c.start.clone(),
                end: f.getEventEnd(c),
                allDay: !1
            }, f.normalizeEventTimes(e)) : e = {
                start: c.start.clone(),
                end: c.end ? c.end.clone() : null,
                allDay: c.allDay
            }, e.start.add(d), e.end && e.end.add(d)) : e = {
                start: h.clone(),
                end: null,
                allDay: !h.hasTime()
            }, e
        },
        applyDragOpacity: function (a) {
            var b = this.view.opt("dragOpacity");
            null != b && a.each(function (a, c) {
                c.style.opacity = b
            })
        },
        externalDragStart: function (b, c) {
            var d, e, f = this.view;
            f.opt("droppable") && (d = a((c ? c.item : null) || b.target), e = f.opt("dropAccept"), (a.isFunction(e) ? e.call(d[0], d) : d.is(e)) && (this.isDraggingExternal || this.listenToExternalDrag(d, b, c)))
        },
        listenToExternalDrag: function (a, b, c) {
            var d, e = this,
                f = this.view.calendar,
                i = Ba(a),
                j = new ib(this, {
                    listenStart: function () {
                        e.isDraggingExternal = !0
                    },
                    hitOver: function (a) {
                        d = e.computeExternalDrop(a.component.getHitSpan(a), i), d && !f.isExternalSpanAllowed(e.eventToSpan(d), d, i.eventProps) && (g(), d = null), d && e.renderDrag(d)
                    },
                    hitOut: function () {
                        d = null
                    },
                    hitDone: function () {
                        h(), e.unrenderDrag()
                    },
                    dragStop: function () {
                        d && e.view.reportExternalDrop(i, d, a, b, c)
                    },
                    listenStop: function () {
                        e.isDraggingExternal = !1
                    }
                });
            j.startDrag(b)
        },
        computeExternalDrop: function (a, b) {
            var c = this.view.calendar,
                d = {
                    start: c.applyTimezone(a.start),
                    end: null
                };
            return b.startTime && !d.start.hasTime() && d.start.time(b.startTime), b.duration && (d.end = d.start.clone().add(b.duration)), d
        },
        renderDrag: function (a, b) { },
        unrenderDrag: function () { },
        segResizeMousedown: function (a, b, c) {
            var d, e = this,
                f = this.view,
                i = f.calendar,
                j = a.el,
                k = a.event,
                l = i.getEventEnd(k),
                m = new ib(this, {
                    distance: 5,
                    scroll: f.opt("dragScroll"),
                    subjectEl: j,
                    dragStart: function (b) {
                        e.triggerSegMouseout(a, b), e.segResizeStart(a, b)
                    },
                    hitOver: function (b, h, j) {
                        var m = e.getHitSpan(j),
                            n = e.getHitSpan(b);
                        d = c ? e.computeEventStartResize(m, n, k) : e.computeEventEndResize(m, n, k), d && (i.isEventSpanAllowed(e.eventToSpan(d), k) ? d.start.isSame(k.start) && d.end.isSame(l) && (d = null) : (g(), d = null)), d && (f.hideEvent(k), e.renderEventResize(d, a))
                    },
                    hitOut: function () {
                        d = null
                    },
                    hitDone: function () {
                        e.unrenderEventResize(), f.showEvent(k), h()
                    },
                    dragStop: function (b) {
                        e.segResizeStop(a, b), d && f.reportEventResize(k, d, this.largeUnit, j, b)
                    }
                });
            m.mousedown(b)
        },
        segResizeStart: function (a, b) {
            this.isResizingSeg = !0, this.view.trigger("eventResizeStart", a.el[0], a.event, b, {})
        },
        segResizeStop: function (a, b) {
            this.isResizingSeg = !1, this.view.trigger("eventResizeStop", a.el[0], a.event, b, {})
        },
        computeEventStartResize: function (a, b, c) {
            return this.computeEventResize("start", a, b, c)
        },
        computeEventEndResize: function (a, b, c) {
            return this.computeEventResize("end", a, b, c)
        },
        computeEventResize: function (a, b, c, d) {
            var e, f, g = this.view.calendar,
                h = this.diffDates(c[a], b[a]);
            return e = {
                start: d.start.clone(),
                end: g.getEventEnd(d),
                allDay: d.allDay
            }, e.allDay && N(h) && (e.allDay = !1, g.normalizeEventTimes(e)), e[a].add(h), e.start.isBefore(e.end) || (f = this.minResizeDuration || (d.allDay ? g.defaultAllDayEventDuration : g.defaultTimedEventDuration), "start" == a ? e.start = e.end.clone().subtract(f) : e.end = e.start.clone().add(f)), e
        },
        renderEventResize: function (a, b) { },
        unrenderEventResize: function () { },
        getEventTimeText: function (a, b, c) {
            return null == b && (b = this.eventTimeFormat), null == c && (c = this.displayEventEnd), this.displayEventTime && a.start.hasTime() ? c && a.end ? this.view.formatRange(a, b) : a.start.format(b) : ""
        },
        getSegClasses: function (a, b, c) {
            var d = a.event,
                e = ["fc-event", a.isStart ? "fc-start" : "fc-not-start", a.isEnd ? "fc-end" : "fc-not-end"].concat(d.className, d.source ? d.source.className : []);
            return b && e.push("fc-draggable"), c && e.push("fc-resizable"), e
        },
        getSegSkinCss: function (a) {
            var b = a.event,
                c = this.view,
                d = b.source || {},
                e = b.color,
                f = d.color,
                g = c.opt("eventColor");
            return {
                "background-color": b.backgroundColor || e || d.backgroundColor || f || c.opt("eventBackgroundColor") || g,
                "border-color": b.borderColor || e || d.borderColor || f || c.opt("eventBorderColor") || g,
                color: b.textColor || d.textColor || c.opt("eventTextColor")
            }
        },
        eventToSegs: function (a) {
            return this.eventsToSegs([a])
        },
        eventToSpan: function (a) {
            return this.eventToSpans(a)[0]
        },
        eventToSpans: function (a) {
            var b = this.eventToRange(a);
            return this.eventRangeToSpans(b, a)
        },
        eventsToSegs: function (b, c) {
            var d = this,
                e = za(b),
                f = [];
            return a.each(e, function (a, b) {
                var e, g = [];
                for (e = 0; e < b.length; e++) g.push(d.eventToRange(b[e]));
                if (xa(b[0]))
                    for (g = d.invertRanges(g), e = 0; e < g.length; e++) f.push.apply(f, d.eventRangeToSegs(g[e], b[0], c));
                else
                    for (e = 0; e < g.length; e++) f.push.apply(f, d.eventRangeToSegs(g[e], b[e], c))
            }), f
        },
        eventToRange: function (a) {
            return {
                start: a.start.clone().stripZone(),
                end: (a.end ? a.end.clone() : this.view.calendar.getDefaultEventEnd(null != a.allDay ? a.allDay : !a.start.hasTime(), a.start)).stripZone()
            }
        },
        eventRangeToSegs: function (a, b, c) {
            var d, e = this.eventRangeToSpans(a, b),
                f = [];
            for (d = 0; d < e.length; d++) f.push.apply(f, this.eventSpanToSegs(e[d], b, c));
            return f
        },
        eventRangeToSpans: function (b, c) {
            return [a.extend({}, b)]
        },
        eventSpanToSegs: function (a, b, c) {
            var d, e, f = c ? c(a) : this.spanToSegs(a);
            for (d = 0; d < f.length; d++) e = f[d], e.event = b, e.eventStartMS = +a.start, e.eventDurationMS = a.end - a.start;
            return f
        },
        invertRanges: function (a) {
            var b, c, d = this.view,
                e = d.start.clone(),
                f = d.end.clone(),
                g = [],
                h = e;
            for (a.sort(Aa), b = 0; b < a.length; b++) c = a[b], c.start > h && g.push({
                start: h,
                end: c.start
            }), h = c.end;
            return f > h && g.push({
                start: h,
                end: f
            }), g
        },
        sortEventSegs: function (a) {
            a.sort(ca(this, "compareEventSegs"))
        },
        compareEventSegs: function (a, b) {
            return a.eventStartMS - b.eventStartMS || b.eventDurationMS - a.eventDurationMS || b.event.allDay - a.event.allDay || B(a.event, b.event, this.view.eventOrderSpecs)
        }
    }), Pa.isBgEvent = wa, Pa.dataAttrPrefix = "";
    var lb = Pa.DayTableMixin = {
        breakOnWeeks: !1,
        dayDates: null,
        dayIndices: null,
        daysPerRow: null,
        rowCnt: null,
        colCnt: null,
        colHeadFormat: null,
        updateDayTable: function () {
            for (var a, b, c, d = this.view, e = this.start.clone(), f = -1, g = [], h = []; e.isBefore(this.end);) d.isHiddenDay(e) ? g.push(f + .5) : (f++, g.push(f), h.push(e.clone())), e.add(1, "days");
            if (this.breakOnWeeks) {
                for (b = h[0].day(), a = 1; a < h.length && h[a].day() != b; a++);
                c = Math.ceil(h.length / a)
            } else c = 1, a = h.length;
            this.dayDates = h, this.dayIndices = g, this.daysPerRow = a, this.rowCnt = c, this.updateDayTableCols()
        },
        updateDayTableCols: function () {
            this.colCnt = this.computeColCnt(), this.colHeadFormat = this.view.opt("columnFormat") || this.computeColHeadFormat()
        },
        computeColCnt: function () {
            return this.daysPerRow
        },
        getCellDate: function (a, b) {
            return this.dayDates[this.getCellDayIndex(a, b)].clone()
        },
        getCellRange: function (a, b) {
            var c = this.getCellDate(a, b),
                d = c.clone().add(1, "days");
            return {
                start: c,
                end: d
            }
        },
        getCellDayIndex: function (a, b) {
            return a * this.daysPerRow + this.getColDayIndex(b)
        },
        getColDayIndex: function (a) {
            return this.isRTL ? this.colCnt - 1 - a : a
        },
        getDateDayIndex: function (a) {
            var b = this.dayIndices,
                c = a.diff(this.start, "days");
            return 0 > c ? b[0] - 1 : c >= b.length ? b[b.length - 1] + 1 : b[c]
        },
        computeColHeadFormat: function () {
            return this.rowCnt > 1 || this.colCnt > 10 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
        },
        sliceRangeByRow: function (a) {
            var b, c, d, e, f, g = this.daysPerRow,
                h = this.view.computeDayRange(a),
                i = this.getDateDayIndex(h.start),
                j = this.getDateDayIndex(h.end.clone().subtract(1, "days")),
                k = [];
            for (b = 0; b < this.rowCnt; b++) c = b * g, d = c + g - 1, e = Math.max(i, c), f = Math.min(j, d), e = Math.ceil(e), f = Math.floor(f), f >= e && k.push({
                row: b,
                firstRowDayIndex: e - c,
                lastRowDayIndex: f - c,
                isStart: e === i,
                isEnd: f === j
            });
            return k
        },
        sliceRangeByDay: function (a) {
            var b, c, d, e, f, g, h = this.daysPerRow,
                i = this.view.computeDayRange(a),
                j = this.getDateDayIndex(i.start),
                k = this.getDateDayIndex(i.end.clone().subtract(1, "days")),
                l = [];
            for (b = 0; b < this.rowCnt; b++)
                for (c = b * h, d = c + h - 1, e = c; d >= e; e++) f = Math.max(j, e), g = Math.min(k, e), f = Math.ceil(f), g = Math.floor(g), g >= f && l.push({
                    row: b,
                    firstRowDayIndex: f - c,
                    lastRowDayIndex: g - c,
                    isStart: f === j,
                    isEnd: g === k
                });
            return l
        },
        renderHeadHtml: function () {
            var a = this.view;
            return '<div class="fc-row ' + a.widgetHeaderClass + '"><table><thead>' + this.renderHeadTrHtml() + "</thead></table></div>"
        },
        renderHeadIntroHtml: function () {
            return this.renderIntroHtml()
        },
        renderHeadTrHtml: function () {
            return "<tr>" + (this.isRTL ? "" : this.renderHeadIntroHtml()) + this.renderHeadDateCellsHtml() + (this.isRTL ? this.renderHeadIntroHtml() : "") + "</tr>"
        },
        renderHeadDateCellsHtml: function () {
            var a, b, c = [];
            for (a = 0; a < this.colCnt; a++) b = this.getCellDate(0, a), c.push(this.renderHeadDateCellHtml(b));
            return c.join("")
        },
        renderHeadDateCellHtml: function (a, b, c) {
            var d = this.view;
            return '<th class="fc-day-header ' + d.widgetHeaderClass + " fc-" + Ta[a.day()] + '"' + (1 == this.rowCnt ? ' data-date="' + a.format("YYYY-MM-DD") + '"' : "") + (b > 1 ? ' colspan="' + b + '"' : "") + (c ? " " + c : "") + ">" + Y(a.format(this.colHeadFormat)) + "</th>"
        },
        renderBgTrHtml: function (a) {
            return "<tr>" + (this.isRTL ? "" : this.renderBgIntroHtml(a)) + this.renderBgCellsHtml(a) + (this.isRTL ? this.renderBgIntroHtml(a) : "") + "</tr>"
        },
        renderBgIntroHtml: function (a) {
            return this.renderIntroHtml()
        },
        renderBgCellsHtml: function (a) {
            var b, c, d = [];
            for (b = 0; b < this.colCnt; b++) c = this.getCellDate(a, b), d.push(this.renderBgCellHtml(c));
            return d.join("")
        },
        renderBgCellHtml: function (a, b) {
            var c = this.view,
                d = this.getDayClasses(a);
            return d.unshift("fc-day", c.widgetContentClass), '<td class="' + d.join(" ") + '" data-date="' + a.format("YYYY-MM-DD") + '"' + (b ? " " + b : "") + "></td>"
        },
        renderIntroHtml: function () { },
        bookendCells: function (a) {
            var b = this.renderIntroHtml();
            b && (this.isRTL ? a.append(b) : a.prepend(b))
        }
    },
        mb = Pa.DayGrid = kb.extend(lb, {
            numbersVisible: !1,
            bottomCoordPadding: 0,
            rowEls: null,
            cellEls: null,
            helperEls: null,
            rowCoordCache: null,
            colCoordCache: null,
            renderDates: function (a) {
                var b, c, d = this.view,
                    e = this.rowCnt,
                    f = this.colCnt,
                    g = "";
                for (b = 0; e > b; b++) g += this.renderDayRowHtml(b, a);
                for (this.el.html(g), this.rowEls = this.el.find(".fc-row"), this.cellEls = this.el.find(".fc-day"), this.rowCoordCache = new gb({
                    els: this.rowEls,
                    isVertical: !0
                }), this.colCoordCache = new gb({
                    els: this.cellEls.slice(0, this.colCnt),
                    isHorizontal: !0
                }), b = 0; e > b; b++)
                    for (c = 0; f > c; c++) d.trigger("dayRender", null, this.getCellDate(b, c), this.getCellEl(b, c))
            },
            unrenderDates: function () {
                this.removeSegPopover()
            },
            renderBusinessHours: function () {
                var a = this.view.calendar.getBusinessHoursEvents(!0),
                    b = this.eventsToSegs(a);
                this.renderFill("businessHours", b, "bgevent")
            },
            renderDayRowHtml: function (a, b) {
                var c = this.view,
                    d = ["fc-row", "fc-week", c.widgetContentClass];
                return b && d.push("fc-rigid"), '<div class="' + d.join(" ") + '"><div class="fc-bg"><table>' + this.renderBgTrHtml(a) + '</table></div><div class="fc-content-skeleton"><table>' + (this.numbersVisible ? "<thead>" + this.renderNumberTrHtml(a) + "</thead>" : "") + "</table></div></div>"
            },
            renderNumberTrHtml: function (a) {
                return "<tr>" + (this.isRTL ? "" : this.renderNumberIntroHtml(a)) + this.renderNumberCellsHtml(a) + (this.isRTL ? this.renderNumberIntroHtml(a) : "") + "</tr>"
            },
            renderNumberIntroHtml: function (a) {
                return this.renderIntroHtml()
            },
            renderNumberCellsHtml: function (a) {
                var b, c, d = [];
                for (b = 0; b < this.colCnt; b++) c = this.getCellDate(a, b), d.push(this.renderNumberCellHtml(c));
                return d.join("")
            },
            renderNumberCellHtml: function (a) {
                var b;
                return this.view.dayNumbersVisible ? (b = this.getDayClasses(a), b.unshift("fc-day-number"), '<td class="' + b.join(" ") + '" data-date="' + a.format() + '">' + a.date() + "</td>") : "<td/>"
            },
            computeEventTimeFormat: function () {
                return this.view.opt("extraSmallTimeFormat")
            },
            computeDisplayEventEnd: function () {
                return 1 == this.colCnt
            },
            rangeUpdated: function () {
                this.updateDayTable()
            },
            spanToSegs: function (a) {
                var b, c, d = this.sliceRangeByRow(a);
                for (b = 0; b < d.length; b++) c = d[b], this.isRTL ? (c.leftCol = this.daysPerRow - 1 - c.lastRowDayIndex, c.rightCol = this.daysPerRow - 1 - c.firstRowDayIndex) : (c.leftCol = c.firstRowDayIndex, c.rightCol = c.lastRowDayIndex);
                return d
            },
            prepareHits: function () {
                this.colCoordCache.build(), this.rowCoordCache.build(), this.rowCoordCache.bottoms[this.rowCnt - 1] += this.bottomCoordPadding
            },
            releaseHits: function () {
                this.colCoordCache.clear(), this.rowCoordCache.clear()
            },
            queryHit: function (a, b) {
                var c = this.colCoordCache.getHorizontalIndex(a),
                    d = this.rowCoordCache.getVerticalIndex(b);
                return null != d && null != c ? this.getCellHit(d, c) : void 0
            },
            getHitSpan: function (a) {
                return this.getCellRange(a.row, a.col)
            },
            getHitEl: function (a) {
                return this.getCellEl(a.row, a.col)
            },
            getCellHit: function (a, b) {
                return {
                    row: a,
                    col: b,
                    component: this,
                    left: this.colCoordCache.getLeftOffset(b),
                    right: this.colCoordCache.getRightOffset(b),
                    top: this.rowCoordCache.getTopOffset(a),
                    bottom: this.rowCoordCache.getBottomOffset(a)
                }
            },
            getCellEl: function (a, b) {
                return this.cellEls.eq(a * this.colCnt + b)
            },
            renderDrag: function (a, b) {
                return this.renderHighlight(this.eventToSpan(a)), b && !b.el.closest(this.el).length ? (this.renderEventLocationHelper(a, b), this.applyDragOpacity(this.helperEls), !0) : void 0
            },
            unrenderDrag: function () {
                this.unrenderHighlight(), this.unrenderHelper()
            },
            renderEventResize: function (a, b) {
                this.renderHighlight(this.eventToSpan(a)), this.renderEventLocationHelper(a, b)
            },
            unrenderEventResize: function () {
                this.unrenderHighlight(), this.unrenderHelper()
            },
            renderHelper: function (b, c) {
                var d, e = [],
                    f = this.eventToSegs(b);
                f = this.renderFgSegEls(f), d = this.renderSegRows(f), this.rowEls.each(function (b, f) {
                    var g, h = a(f),
                        i = a('<div class="fc-helper-skeleton"><table/></div>');
                    g = c && c.row === b ? c.el.position().top : h.find(".fc-content-skeleton tbody").position().top, i.css("top", g).find("table").append(d[b].tbodyEl), h.append(i), e.push(i[0])
                }), this.helperEls = a(e)
            },
            unrenderHelper: function () {
                this.helperEls && (this.helperEls.remove(), this.helperEls = null)
            },
            fillSegTag: "td",
            renderFill: function (b, c, d) {
                var e, f, g, h = [];
                for (c = this.renderFillSegEls(b, c), e = 0; e < c.length; e++) f = c[e], g = this.renderFillRow(b, f, d), this.rowEls.eq(f.row).append(g), h.push(g[0]);
                return this.elsByFill[b] = a(h), c
            },
            renderFillRow: function (b, c, d) {
                var e, f, g = this.colCnt,
                    h = c.leftCol,
                    i = c.rightCol + 1;
                return d = d || b.toLowerCase(), e = a('<div class="fc-' + d + '-skeleton"><table><tr/></table></div>'), f = e.find("tr"), h > 0 && f.append('<td colspan="' + h + '"/>'), f.append(c.el.attr("colspan", i - h)), g > i && f.append('<td colspan="' + (g - i) + '"/>'), this.bookendCells(f), e
            }
        });
    mb.mixin({
        rowStructs: null,
        unrenderEvents: function () {
            this.removeSegPopover(), kb.prototype.unrenderEvents.apply(this, arguments)
        },
        getEventSegs: function () {
            return kb.prototype.getEventSegs.call(this).concat(this.popoverSegs || [])
        },
        renderBgSegs: function (b) {
            var c = a.grep(b, function (a) {
                return a.event.allDay
            });
            return kb.prototype.renderBgSegs.call(this, c)
        },
        renderFgSegs: function (b) {
            var c;
            return b = this.renderFgSegEls(b), c = this.rowStructs = this.renderSegRows(b), this.rowEls.each(function (b, d) {
                a(d).find(".fc-content-skeleton > table").append(c[b].tbodyEl)
            }), b
        },
        unrenderFgSegs: function () {
            for (var a, b = this.rowStructs || []; a = b.pop();) a.tbodyEl.remove();
            this.rowStructs = null
        },
        renderSegRows: function (a) {
            var b, c, d = [];
            for (b = this.groupSegRows(a), c = 0; c < b.length; c++) d.push(this.renderSegRow(c, b[c]));
            return d
        },
        fgSegHtml: function (a, b) {
            var c, d, e = this.view,
                f = a.event,
                g = e.isEventDraggable(f),
                h = !b && f.allDay && a.isStart && e.isEventResizableFromStart(f),
                i = !b && f.allDay && a.isEnd && e.isEventResizableFromEnd(f),
                j = this.getSegClasses(a, g, h || i),
                k = $(this.getSegSkinCss(a)),
                l = "";
            return j.unshift("fc-day-grid-event", "fc-h-event"), a.isStart && (c = this.getEventTimeText(f), c && (l = '<span class="fc-time">' + Y(c) + "</span>")), d = '<span class="fc-title">' + (Y(f.title || "") || "&nbsp;") + "</span>", '<a class="' + j.join(" ") + '"' + (f.url ? ' href="' + Y(f.url) + '"' : "") + (k ? ' style="' + k + '"' : "") + '><div class="fc-content">' + (this.isRTL ? d + " " + l : l + " " + d) + "</div>" + (h ? '<div class="fc-resizer fc-start-resizer" />' : "") + (i ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        renderSegRow: function (b, c) {
            function d(b) {
                for (; b > g;) k = (r[e - 1] || [])[g], k ? k.attr("rowspan", parseInt(k.attr("rowspan") || 1, 10) + 1) : (k = a("<td/>"), h.append(k)), q[e][g] = k, r[e][g] = k, g++
            }
            var e, f, g, h, i, j, k, l = this.colCnt,
                m = this.buildSegLevels(c),
                n = Math.max(1, m.length),
                o = a("<tbody/>"),
                p = [],
                q = [],
                r = [];
            for (e = 0; n > e; e++) {
                if (f = m[e], g = 0, h = a("<tr/>"), p.push([]), q.push([]), r.push([]), f)
                    for (i = 0; i < f.length; i++) {
                        for (j = f[i], d(j.leftCol), k = a('<td class="fc-event-container"/>').append(j.el), j.leftCol != j.rightCol ? k.attr("colspan", j.rightCol - j.leftCol + 1) : r[e][g] = k; g <= j.rightCol;) q[e][g] = k, p[e][g] = j, g++;
                        h.append(k)
                    }
                d(l), this.bookendCells(h), o.append(h)
            }
            return {
                row: b,
                tbodyEl: o,
                cellMatrix: q,
                segMatrix: p,
                segLevels: m,
                segs: c
            }
        },
        buildSegLevels: function (a) {
            var b, c, d, e = [];
            for (this.sortEventSegs(a), b = 0; b < a.length; b++) {
                for (c = a[b], d = 0; d < e.length && Ca(c, e[d]); d++);
                c.level = d, (e[d] || (e[d] = [])).push(c)
            }
            for (d = 0; d < e.length; d++) e[d].sort(Da);
            return e
        },
        groupSegRows: function (a) {
            var b, c = [];
            for (b = 0; b < this.rowCnt; b++) c.push([]);
            for (b = 0; b < a.length; b++) c[a[b].row].push(a[b]);
            return c
        }
    }), mb.mixin({
        segPopover: null,
        popoverSegs: null,
        removeSegPopover: function () {
            this.segPopover && this.segPopover.hide()
        },
        limitRows: function (a) {
            var b, c, d = this.rowStructs || [];
            for (b = 0; b < d.length; b++) this.unlimitRow(b), c = a ? "number" == typeof a ? a : this.computeRowLevelLimit(b) : !1, c !== !1 && this.limitRow(b, c)
        },
        computeRowLevelLimit: function (b) {
            function c(b, c) {
                f = Math.max(f, a(c).outerHeight())
            }
            var d, e, f, g = this.rowEls.eq(b),
                h = g.height(),
                i = this.rowStructs[b].tbodyEl.children();
            for (d = 0; d < i.length; d++)
                if (e = i.eq(d).removeClass("fc-limited"), f = 0, e.find("> td > :first-child").each(c), e.position().top + f > h) return d;
            return !1
        },
        limitRow: function (b, c) {
            function d(d) {
                for (; d > w;) j = t.getCellSegs(b, w, c), j.length && (m = f[c - 1][w], s = t.renderMoreLink(b, w, j), r = a("<div/>").append(s), m.append(r), v.push(r[0])), w++
            }
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = this,
                u = this.rowStructs[b],
                v = [],
                w = 0;
            if (c && c < u.segLevels.length) {
                for (e = u.segLevels[c - 1], f = u.cellMatrix, g = u.tbodyEl.children().slice(c).addClass("fc-limited").get(), h = 0; h < e.length; h++) {
                    for (i = e[h], d(i.leftCol), l = [], k = 0; w <= i.rightCol;) j = this.getCellSegs(b, w, c), l.push(j), k += j.length, w++;
                    if (k) {
                        for (m = f[c - 1][i.leftCol], n = m.attr("rowspan") || 1, o = [], p = 0; p < l.length; p++) q = a('<td class="fc-more-cell"/>').attr("rowspan", n), j = l[p], s = this.renderMoreLink(b, i.leftCol + p, [i].concat(j)), r = a("<div/>").append(s), q.append(r), o.push(q[0]), v.push(q[0]);
                        m.addClass("fc-limited").after(a(o)), g.push(m[0])
                    }
                }
                d(this.colCnt), u.moreEls = a(v), u.limitedEls = a(g)
            }
        },
        unlimitRow: function (a) {
            var b = this.rowStructs[a];
            b.moreEls && (b.moreEls.remove(), b.moreEls = null), b.limitedEls && (b.limitedEls.removeClass("fc-limited"), b.limitedEls = null)
        },
        renderMoreLink: function (b, c, d) {
            var e = this,
                f = this.view;
            return a('<a class="fc-more"/>').text(this.getMoreLinkText(d.length)).on("click", function (g) {
                var h = f.opt("eventLimitClick"),
                    i = e.getCellDate(b, c),
                    j = a(this),
                    k = e.getCellEl(b, c),
                    l = e.getCellSegs(b, c),
                    m = e.resliceDaySegs(l, i),
                    n = e.resliceDaySegs(d, i);
                "function" == typeof h && (h = f.trigger("eventLimitClick", null, {
                    date: i,
                    dayEl: k,
                    moreEl: j,
                    segs: m,
                    hiddenSegs: n
                }, g)), "popover" === h ? e.showSegPopover(b, c, j, m) : "string" == typeof h && f.calendar.zoomTo(i, h)
            })
        },
        showSegPopover: function (a, b, c, d) {
            var e, f, g = this,
                h = this.view,
                i = c.parent();
            e = 1 == this.rowCnt ? h.el : this.rowEls.eq(a), f = {
                className: "fc-more-popover",
                content: this.renderSegPopoverContent(a, b, d),
                parentEl: this.el,
                top: e.offset().top,
                autoHide: !0,
                viewportConstrain: h.opt("popoverViewportConstrain"),
                hide: function () {
                    g.segPopover.removeElement(), g.segPopover = null, g.popoverSegs = null
                }
            }, this.isRTL ? f.right = i.offset().left + i.outerWidth() + 1 : f.left = i.offset().left - 1, this.segPopover = new fb(f), this.segPopover.show()
        },
        renderSegPopoverContent: function (b, c, d) {
            var e, f = this.view,
                g = f.opt("theme"),
                h = this.getCellDate(b, c).format(f.opt("dayPopoverFormat")),
                i = a('<div class="fc-header ' + f.widgetHeaderClass + '"><span class="fc-close ' + (g ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span><span class="fc-title">' + Y(h) + '</span><div class="fc-clear"/></div><div class="fc-body ' + f.widgetContentClass + '"><div class="fc-event-container"></div></div>'),
                j = i.find(".fc-event-container");
            for (d = this.renderFgSegEls(d, !0), this.popoverSegs = d, e = 0; e < d.length; e++) this.prepareHits(), d[e].hit = this.getCellHit(b, c), this.releaseHits(), j.append(d[e].el);
            return i
        },
        resliceDaySegs: function (b, c) {
            var d = a.map(b, function (a) {
                return a.event
            }),
                e = c.clone(),
                f = e.clone().add(1, "days"),
                g = {
                    start: e,
                    end: f
                };
            return b = this.eventsToSegs(d, function (a) {
                var b = E(a, g);
                return b ? [b] : []
            }), this.sortEventSegs(b), b
        },
        getMoreLinkText: function (a) {
            var b = this.view.opt("eventLimitText");
            return "function" == typeof b ? b(a) : "+" + a + " " + b
        },
        getCellSegs: function (a, b, c) {
            for (var d, e = this.rowStructs[a].segMatrix, f = c || 0, g = []; f < e.length;) d = e[f][b], d && g.push(d), f++;
            return g
        }
    });
    var nb = Pa.TimeGrid = kb.extend(lb, {
        slotDuration: null,
        snapDuration: null,
        snapsPerSlot: null,
        minTime: null,
        maxTime: null,
        labelFormat: null,
        labelInterval: null,
        colEls: null,
        slatEls: null,
        nowIndicatorEls: null,
        colCoordCache: null,
        slatCoordCache: null,
        constructor: function () {
            kb.apply(this, arguments), this.processOptions()
        },
        renderDates: function () {
            this.el.html(this.renderHtml()), this.colEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr"), this.colCoordCache = new gb({
                els: this.colEls,
                isHorizontal: !0
            }), this.slatCoordCache = new gb({
                els: this.slatEls,
                isVertical: !0
            }), this.renderContentSkeleton()
        },
        renderHtml: function () {
            return '<div class="fc-bg"><table>' + this.renderBgTrHtml(0) + '</table></div><div class="fc-slats"><table>' + this.renderSlatRowHtml() + "</table></div>"
        },
        renderSlatRowHtml: function () {
            for (var a, c, d, e = this.view, f = this.isRTL, g = "", h = b.duration(+this.minTime); h < this.maxTime;) a = this.start.clone().time(h), c = ba(L(h, this.labelInterval)), d = '<td class="fc-axis fc-time ' + e.widgetContentClass + '" ' + e.axisStyleAttr() + ">" + (c ? "<span>" + Y(a.format(this.labelFormat)) + "</span>" : "") + "</td>", g += '<tr data-time="' + a.format("HH:mm:ss") + '"' + (c ? "" : ' class="fc-minor"') + ">" + (f ? "" : d) + '<td class="' + e.widgetContentClass + '"/>' + (f ? d : "") + "</tr>", h.add(this.slotDuration);
            return g
        },
        processOptions: function () {
            var c, d = this.view,
                e = d.opt("slotDuration"),
                f = d.opt("snapDuration");
            e = b.duration(e), f = f ? b.duration(f) : e, this.slotDuration = e, this.snapDuration = f, this.snapsPerSlot = e / f, this.minResizeDuration = f, this.minTime = b.duration(d.opt("minTime")), this.maxTime = b.duration(d.opt("maxTime")), c = d.opt("slotLabelFormat"), a.isArray(c) && (c = c[c.length - 1]), this.labelFormat = c || d.opt("axisFormat") || d.opt("smallTimeFormat"), c = d.opt("slotLabelInterval"), this.labelInterval = c ? b.duration(c) : this.computeLabelInterval(e)
        },
        computeLabelInterval: function (a) {
            var c, d, e;
            for (c = Db.length - 1; c >= 0; c--)
                if (d = b.duration(Db[c]), e = L(d, a), ba(e) && e > 1) return d;
            return b.duration(a)
        },
        computeEventTimeFormat: function () {
            return this.view.opt("noMeridiemTimeFormat")
        },
        computeDisplayEventEnd: function () {
            return !0
        },
        prepareHits: function () {
            this.colCoordCache.build(), this.slatCoordCache.build()
        },
        releaseHits: function () {
            this.colCoordCache.clear()
        },
        queryHit: function (a, b) {
            var c = this.snapsPerSlot,
                d = this.colCoordCache,
                e = this.slatCoordCache,
                f = d.getHorizontalIndex(a),
                g = e.getVerticalIndex(b);
            if (null != f && null != g) {
                var h = e.getTopOffset(g),
                    i = e.getHeight(g),
                    j = (b - h) / i,
                    k = Math.floor(j * c),
                    l = g * c + k,
                    m = h + k / c * i,
                    n = h + (k + 1) / c * i;
                return {
                    col: f,
                    snap: l,
                    component: this,
                    left: d.getLeftOffset(f),
                    right: d.getRightOffset(f),
                    top: m,
                    bottom: n
                }
            }
        },
        getHitSpan: function (a) {
            var b, c = this.getCellDate(0, a.col),
                d = this.computeSnapTime(a.snap);
            return c.time(d), b = c.clone().add(this.snapDuration), {
                start: c,
                end: b
            }
        },
        getHitEl: function (a) {
            return this.colEls.eq(a.col)
        },
        rangeUpdated: function () {
            this.updateDayTable()
        },
        computeSnapTime: function (a) {
            return b.duration(this.minTime + this.snapDuration * a)
        },
        spanToSegs: function (a) {
            var b, c = this.sliceRangeByTimes(a);
            for (b = 0; b < c.length; b++) this.isRTL ? c[b].col = this.daysPerRow - 1 - c[b].dayIndex : c[b].col = c[b].dayIndex;
            return c
        },
        sliceRangeByTimes: function (a) {
            var b, c, d, e, f = [];
            for (c = 0; c < this.daysPerRow; c++) d = this.dayDates[c].clone(), e = {
                start: d.clone().time(this.minTime),
                end: d.clone().time(this.maxTime)
            }, b = E(a, e), b && (b.dayIndex = c, f.push(b));
            return f
        },
        updateSize: function (a) {
            this.slatCoordCache.build(), a && this.updateSegVerticals([].concat(this.fgSegs || [], this.bgSegs || [], this.businessSegs || []))
        },
        computeDateTop: function (a, c) {
            return this.computeTimeTop(b.duration(a - c.clone().stripTime()))
        },
        computeTimeTop: function (a) {
            var b, c, d = this.slatEls.length,
                e = (a - this.minTime) / this.slotDuration;
            return e = Math.max(0, e), e = Math.min(d, e), b = Math.floor(e), b = Math.min(b, d - 1), c = e - b, this.slatCoordCache.getTopPosition(b) + this.slatCoordCache.getHeight(b) * c
        },
        renderDrag: function (a, b) {
            if (b) {
                this.renderEventLocationHelper(a, b);
                for (var c = 0; c < this.helperSegs.length; c++) this.applyDragOpacity(this.helperSegs[c].el);
                return !0
            }
            this.renderHighlight(this.eventToSpan(a))
        },
        unrenderDrag: function () {
            this.unrenderHelper(), this.unrenderHighlight()
        },
        renderEventResize: function (a, b) {
            this.renderEventLocationHelper(a, b)
        },
        unrenderEventResize: function () {
            this.unrenderHelper()
        },
        renderHelper: function (a, b) {
            this.renderHelperSegs(this.eventToSegs(a), b)
        },
        unrenderHelper: function () {
            this.unrenderHelperSegs()
        },
        renderBusinessHours: function () {
            var a = this.view.calendar.getBusinessHoursEvents(),
                b = this.eventsToSegs(a);
            this.renderBusinessSegs(b)
        },
        unrenderBusinessHours: function () {
            this.unrenderBusinessSegs()
        },
        getNowIndicatorUnit: function () {
            return "minute"
        },
        renderNowIndicator: function (b) {
            var c, d = this.spanToSegs({
                start: b,
                end: b
            }),
                e = this.computeDateTop(b, b),
                f = [];
            for (c = 0; c < d.length; c++) f.push(a('<div class="fc-now-indicator fc-now-indicator-line"></div>').css("top", e).appendTo(this.colContainerEls.eq(d[c].col))[0]);
            d.length > 0 && f.push(a('<div class="fc-now-indicator fc-now-indicator-arrow"></div>').css("top", e).appendTo(this.el.find(".fc-content-skeleton"))[0]), this.nowIndicatorEls = a(f)
        },
        unrenderNowIndicator: function () {
            this.nowIndicatorEls && (this.nowIndicatorEls.remove(), this.nowIndicatorEls = null)
        },
        renderSelection: function (a) {
            this.view.opt("selectHelper") ? this.renderEventLocationHelper(a) : this.renderHighlight(a)
        },
        unrenderSelection: function () {
            this.unrenderHelper(), this.unrenderHighlight()
        },
        renderHighlight: function (a) {
            this.renderHighlightSegs(this.spanToSegs(a))
        },
        unrenderHighlight: function () {
            this.unrenderHighlightSegs()
        }
    });
    nb.mixin({
        colContainerEls: null,
        fgContainerEls: null,
        bgContainerEls: null,
        helperContainerEls: null,
        highlightContainerEls: null,
        businessContainerEls: null,
        fgSegs: null,
        bgSegs: null,
        helperSegs: null,
        highlightSegs: null,
        businessSegs: null,
        renderContentSkeleton: function () {
            var b, c, d = "";
            for (b = 0; b < this.colCnt; b++) d += '<td><div class="fc-content-col"><div class="fc-event-container fc-helper-container"></div><div class="fc-event-container"></div><div class="fc-highlight-container"></div><div class="fc-bgevent-container"></div><div class="fc-business-container"></div></div></td>';
            c = a('<div class="fc-content-skeleton"><table><tr>' + d + "</tr></table></div>"), this.colContainerEls = c.find(".fc-content-col"), this.helperContainerEls = c.find(".fc-helper-container"), this.fgContainerEls = c.find(".fc-event-container:not(.fc-helper-container)"), this.bgContainerEls = c.find(".fc-bgevent-container"), this.highlightContainerEls = c.find(".fc-highlight-container"), this.businessContainerEls = c.find(".fc-business-container"), this.bookendCells(c.find("tr")), this.el.append(c)
        },
        renderFgSegs: function (a) {
            return a = this.renderFgSegsIntoContainers(a, this.fgContainerEls), this.fgSegs = a, a
        },
        unrenderFgSegs: function () {
            this.unrenderNamedSegs("fgSegs")
        },
        renderHelperSegs: function (a, b) {
            var c, d, e;
            for (a = this.renderFgSegsIntoContainers(a, this.helperContainerEls), c = 0; c < a.length; c++) d = a[c], b && b.col === d.col && (e = b.el, d.el.css({
                left: e.css("left"),
                right: e.css("right"),
                "margin-left": e.css("margin-left"),
                "margin-right": e.css("margin-right")
            }));
            this.helperSegs = a
        },
        unrenderHelperSegs: function () {
            this.unrenderNamedSegs("helperSegs")
        },
        renderBgSegs: function (a) {
            return a = this.renderFillSegEls("bgEvent", a), this.updateSegVerticals(a), this.attachSegsByCol(this.groupSegsByCol(a), this.bgContainerEls), this.bgSegs = a, a
        },
        unrenderBgSegs: function () {
            this.unrenderNamedSegs("bgSegs")
        },
        renderHighlightSegs: function (a) {
            a = this.renderFillSegEls("highlight", a), this.updateSegVerticals(a), this.attachSegsByCol(this.groupSegsByCol(a), this.highlightContainerEls), this.highlightSegs = a
        },
        unrenderHighlightSegs: function () {
            this.unrenderNamedSegs("highlightSegs")
        },
        renderBusinessSegs: function (a) {
            a = this.renderFillSegEls("businessHours", a), this.updateSegVerticals(a), this.attachSegsByCol(this.groupSegsByCol(a), this.businessContainerEls), this.businessSegs = a
        },
        unrenderBusinessSegs: function () {
            this.unrenderNamedSegs("businessSegs")
        },
        groupSegsByCol: function (a) {
            var b, c = [];
            for (b = 0; b < this.colCnt; b++) c.push([]);
            for (b = 0; b < a.length; b++) c[a[b].col].push(a[b]);
            return c
        },
        attachSegsByCol: function (a, b) {
            var c, d, e;
            for (c = 0; c < this.colCnt; c++)
                for (d = a[c], e = 0; e < d.length; e++) b.eq(c).append(d[e].el)
        },
        unrenderNamedSegs: function (a) {
            var b, c = this[a];
            if (c) {
                for (b = 0; b < c.length; b++) c[b].el.remove();
                this[a] = null
            }
        },
        renderFgSegsIntoContainers: function (a, b) {
            var c, d;
            for (a = this.renderFgSegEls(a), c = this.groupSegsByCol(a), d = 0; d < this.colCnt; d++) this.updateFgSegCoords(c[d]);
            return this.attachSegsByCol(c, b), a
        },
        fgSegHtml: function (a, b) {
            var c, d, e, f = this.view,
                g = a.event,
                h = f.isEventDraggable(g),
                i = !b && a.isStart && f.isEventResizableFromStart(g),
                j = !b && a.isEnd && f.isEventResizableFromEnd(g),
                k = this.getSegClasses(a, h, i || j),
                l = $(this.getSegSkinCss(a));
            return k.unshift("fc-time-grid-event", "fc-v-event"), f.isMultiDayEvent(g) ? (a.isStart || a.isEnd) && (c = this.getEventTimeText(a), d = this.getEventTimeText(a, "LT"), e = this.getEventTimeText(a, null, !1)) : (c = this.getEventTimeText(g), d = this.getEventTimeText(g, "LT"), e = this.getEventTimeText(g, null, !1)), '<a class="' + k.join(" ") + '"' + (g.url ? ' href="' + Y(g.url) + '"' : "") + (l ? ' style="' + l + '"' : "") + '><div class="fc-content">' + (c ? '<div class="fc-time" data-start="' + Y(e) + '" data-full="' + Y(d) + '"><span>' + Y(c) + "</span></div>" : "") + (g.title ? '<div class="fc-title">' + Y(g.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (j ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
        },
        updateSegVerticals: function (a) {
            this.computeSegVerticals(a), this.assignSegVerticals(a)
        },
        computeSegVerticals: function (a) {
            var b, c;
            for (b = 0; b < a.length; b++) c = a[b], c.top = this.computeDateTop(c.start, c.start), c.bottom = this.computeDateTop(c.end, c.start)
        },
        assignSegVerticals: function (a) {
            var b, c;
            for (b = 0; b < a.length; b++) c = a[b], c.el.css(this.generateSegVerticalCss(c))
        },
        generateSegVerticalCss: function (a) {
            return {
                top: a.top,
                bottom: -a.bottom
            }
        },
        updateFgSegCoords: function (a) {
            this.computeSegVerticals(a), this.computeFgSegHorizontals(a), this.assignSegVerticals(a), this.assignFgSegHorizontals(a)
        },
        computeFgSegHorizontals: function (a) {
            var b, c, d;
            if (this.sortEventSegs(a), b = Ea(a), Fa(b), c = b[0]) {
                for (d = 0; d < c.length; d++) Ga(c[d]);
                for (d = 0; d < c.length; d++) this.computeFgSegForwardBack(c[d], 0, 0)
            }
        },
        computeFgSegForwardBack: function (a, b, c) {
            var d, e = a.forwardSegs;
            if (void 0 === a.forwardCoord)
                for (e.length ? (this.sortForwardSegs(e), this.computeFgSegForwardBack(e[0], b + 1, c), a.forwardCoord = e[0].backwardCoord) : a.forwardCoord = 1, a.backwardCoord = a.forwardCoord - (a.forwardCoord - c) / (b + 1), d = 0; d < e.length; d++) this.computeFgSegForwardBack(e[d], 0, a.forwardCoord)
        },
        sortForwardSegs: function (a) {
            a.sort(ca(this, "compareForwardSegs"))
        },
        compareForwardSegs: function (a, b) {
            return b.forwardPressure - a.forwardPressure || (a.backwardCoord || 0) - (b.backwardCoord || 0) || this.compareEventSegs(a, b)
        },
        assignFgSegHorizontals: function (a) {
            var b, c;
            for (b = 0; b < a.length; b++) c = a[b], c.el.css(this.generateFgSegHorizontalCss(c)), c.bottom - c.top < 30 && c.el.addClass("fc-short")
        },
        generateFgSegHorizontalCss: function (a) {
            var b, c, d = this.view.opt("slotEventOverlap"),
                e = a.backwardCoord,
                f = a.forwardCoord,
                g = this.generateSegVerticalCss(a);
            return d && (f = Math.min(1, e + 2 * (f - e))), this.isRTL ? (b = 1 - f, c = e) : (b = e, c = 1 - f), g.zIndex = a.level + 1, g.left = 100 * b + "%", g.right = 100 * c + "%", d && a.forwardPressure && (g[this.isRTL ? "marginLeft" : "marginRight"] = 20), g
        }
    });
    var ob = Pa.View = ra.extend({
        type: null,
        name: null,
        title: null,
        calendar: null,
        options: null,
        el: null,
        displaying: null,
        isSkeletonRendered: !1,
        isEventsRendered: !1,
        start: null,
        end: null,
        intervalStart: null,
        intervalEnd: null,
        intervalDuration: null,
        intervalUnit: null,
        isRTL: !1,
        isSelected: !1,
        eventOrderSpecs: null,
        scrollerEl: null,
        scrollTop: null,
        widgetHeaderClass: null,
        widgetContentClass: null,
        highlightStateClass: null,
        nextDayThreshold: null,
        isHiddenDayHash: null,
        documentMousedownProxy: null,
        isNowIndicatorRendered: null,
        initialNowDate: null,
        initialNowQueriedMs: null,
        nowIndicatorTimeoutID: null,
        nowIndicatorIntervalID: null,
        constructor: function (a, c, d, e) {
            this.calendar = a, this.type = this.name = c, this.options = d, this.intervalDuration = e || b.duration(1, "day"), this.nextDayThreshold = b.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.isRTL = this.opt("isRTL"), this.eventOrderSpecs = A(this.opt("eventOrder")), this.documentMousedownProxy = ca(this, "documentMousedown"), this.initialize()
        },
        initialize: function () { },
        opt: function (a) {
            return this.options[a]
        },
        trigger: function (a, b) {
            var c = this.calendar;
            return c.trigger.apply(c, [a, b || this].concat(Array.prototype.slice.call(arguments, 2), [this]))
        },
        setDate: function (a) {
            this.setRange(this.computeRange(a))
        },
        setRange: function (b) {
            a.extend(this, b), this.updateTitle()
        },
        computeRange: function (a) {
            var b, c, d = I(this.intervalDuration),
                e = a.clone().startOf(d),
                f = e.clone().add(this.intervalDuration);
            return /year|month|week|day/.test(d) ? (e.stripTime(), f.stripTime()) : (e.hasTime() || (e = this.calendar.time(0)), f.hasTime() || (f = this.calendar.time(0))), b = e.clone(), b = this.skipHiddenDays(b), c = f.clone(), c = this.skipHiddenDays(c, -1, !0), {
                intervalUnit: d,
                intervalStart: e,
                intervalEnd: f,
                start: b,
                end: c
            }
        },
        computePrevDate: function (a) {
            return this.massageCurrentDate(a.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1)
        },
        computeNextDate: function (a) {
            return this.massageCurrentDate(a.clone().startOf(this.intervalUnit).add(this.intervalDuration))
        },
        massageCurrentDate: function (a, b) {
            return this.intervalDuration.as("days") <= 1 && this.isHiddenDay(a) && (a = this.skipHiddenDays(a, b), a.startOf("day")), a
        },
        updateTitle: function () {
            this.title = this.computeTitle()
        },
        computeTitle: function () {
            return this.formatRange({
                start: this.calendar.applyTimezone(this.intervalStart),
                end: this.calendar.applyTimezone(this.intervalEnd)
            }, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"))
        },
        computeTitleFormat: function () {
            return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL"
        },
        formatRange: function (a, b, c) {
            var d = a.end;
            return d.hasTime() || (d = d.clone().subtract(1)), ma(a.start, d, b, c, this.opt("isRTL"))
        },
        setElement: function (a) {
            this.el = a, this.bindGlobalHandlers()
        },
        removeElement: function () {
            this.clear(), this.isSkeletonRendered && (this.unrenderSkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove()
        },
        display: function (b) {
            var c = this,
                d = null;
            return this.displaying && (d = this.queryScroll()), this.calendar.freezeContentHeight(), this.clear().then(function () {
                return c.displaying = a.when(c.displayView(b)).then(function () {
                    c.forceScroll(c.computeInitialScroll(d)), c.calendar.unfreezeContentHeight(), c.triggerRender()
                })
            })
        },
        clear: function () {
            var b = this,
                c = this.displaying;
            return c ? c.then(function () {
                return b.displaying = null, b.clearEvents(), b.clearView()
            }) : a.when()
        },
        displayView: function (a) {
            this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), a && this.setDate(a), this.render && this.render(), this.renderDates(), this.updateSize(), this.renderBusinessHours(), this.startNowIndicator()
        },
        clearView: function () {
            this.unselect(), this.stopNowIndicator(), this.triggerUnrender(), this.unrenderBusinessHours(), this.unrenderDates(), this.destroy && this.destroy()
        },
        renderSkeleton: function () { },
        unrenderSkeleton: function () { },
        renderDates: function () { },
        unrenderDates: function () { },
        triggerRender: function () {
            this.trigger("viewRender", this, this, this.el)
        },
        triggerUnrender: function () {
            this.trigger("viewDestroy", this, this, this.el)
        },
        bindGlobalHandlers: function () {
            a(document).on("mousedown", this.documentMousedownProxy)
        },
        unbindGlobalHandlers: function () {
            a(document).off("mousedown", this.documentMousedownProxy)
        },
        initThemingProps: function () {
            var a = this.opt("theme") ? "ui" : "fc";
            this.widgetHeaderClass = a + "-widget-header", this.widgetContentClass = a + "-widget-content", this.highlightStateClass = a + "-state-highlight"
        },
        renderBusinessHours: function () { },
        unrenderBusinessHours: function () { },
        startNowIndicator: function () {
            var a, c, d, e = this;
            this.opt("nowIndicator") && (a = this.getNowIndicatorUnit(), a && (c = ca(this, "updateNowIndicator"), this.initialNowDate = this.calendar.getNow(), this.initialNowQueriedMs = +new Date, this.renderNowIndicator(this.initialNowDate), this.isNowIndicatorRendered = !0, d = this.initialNowDate.clone().startOf(a).add(1, a) - this.initialNowDate, this.nowIndicatorTimeoutID = setTimeout(function () {
                e.nowIndicatorTimeoutID = null, c(), d = +b.duration(1, a), d = Math.max(100, d), e.nowIndicatorIntervalID = setInterval(c, d)
            }, d)))
        },
        updateNowIndicator: function () {
            this.isNowIndicatorRendered && (this.unrenderNowIndicator(), this.renderNowIndicator(this.initialNowDate.clone().add(new Date - this.initialNowQueriedMs)))
        },
        stopNowIndicator: function () {
            this.isNowIndicatorRendered && (this.nowIndicatorTimeoutID && (clearTimeout(this.nowIndicatorTimeoutID), this.nowIndicatorTimeoutID = null), this.nowIndicatorIntervalID && (clearTimeout(this.nowIndicatorIntervalID), this.nowIndicatorIntervalID = null), this.unrenderNowIndicator(), this.isNowIndicatorRendered = !1)
        },
        getNowIndicatorUnit: function () { },
        renderNowIndicator: function (a) { },
        unrenderNowIndicator: function () { },
        updateSize: function (a) {
            var b;
            a && (b = this.queryScroll()), this.updateHeight(a), this.updateWidth(a), this.updateNowIndicator(), a && this.setScroll(b)
        },
        updateWidth: function (a) { },
        updateHeight: function (a) {
            var b = this.calendar;
            this.setHeight(b.getSuggestedViewHeight(), b.isHeightAuto())
        },
        setHeight: function (a, b) { },
        computeScrollerHeight: function (a) {
            var b, c, d = this.scrollerEl;
            return b = this.el.add(d), b.css({
                position: "relative",
                left: -1
            }), c = this.el.outerHeight() - d.height(), b.css({
                position: "",
                left: ""
            }), a - c
        },
        computeInitialScroll: function (a) {
            return 0
        },
        queryScroll: function () {
            return this.scrollerEl ? this.scrollerEl.scrollTop() : void 0
        },
        setScroll: function (a) {
            return this.scrollerEl ? this.scrollerEl.scrollTop(a) : void 0
        },
        forceScroll: function (a) {
            var b = this;
            this.setScroll(a), setTimeout(function () {
                b.setScroll(a)
            }, 0)
        },
        displayEvents: function (a) {
            var b = this.queryScroll();
            this.clearEvents(), this.renderEvents(a), this.isEventsRendered = !0, this.setScroll(b), this.triggerEventRender()
        },
        clearEvents: function () {
            var a;
            this.isEventsRendered && (a = this.queryScroll(), this.triggerEventUnrender(), this.destroyEvents && this.destroyEvents(), this.unrenderEvents(), this.setScroll(a), this.isEventsRendered = !1)
        },
        renderEvents: function (a) { },
        unrenderEvents: function () { },
        triggerEventRender: function () {
            this.renderedEventSegEach(function (a) {
                this.trigger("eventAfterRender", a.event, a.event, a.el)
            }), this.trigger("eventAfterAllRender")
        },
        triggerEventUnrender: function () {
            this.renderedEventSegEach(function (a) {
                this.trigger("eventDestroy", a.event, a.event, a.el)
            })
        },
        resolveEventEl: function (b, c) {
            var d = this.trigger("eventRender", b, b, c);
            return d === !1 ? c = null : d && d !== !0 && (c = a(d)), c
        },
        showEvent: function (a) {
            this.renderedEventSegEach(function (a) {
                a.el.css("visibility", "")
            }, a)
        },
        hideEvent: function (a) {
            this.renderedEventSegEach(function (a) {
                a.el.css("visibility", "hidden")
            }, a)
        },
        renderedEventSegEach: function (a, b) {
            var c, d = this.getEventSegs();
            for (c = 0; c < d.length; c++) b && d[c].event._id !== b._id || d[c].el && a.call(this, d[c])
        },
        getEventSegs: function () {
            return []
        },
        isEventDraggable: function (a) {
            var b = a.source || {};
            return X(a.startEditable, b.startEditable, this.opt("eventStartEditable"), a.editable, b.editable, this.opt("editable"))
        },
        reportEventDrop: function (a, b, c, d, e) {
            var f = this.calendar,
                g = f.mutateEvent(a, b, c),
                h = function () {
                    g.undo(), f.reportEventChange()
                };
            this.triggerEventDrop(a, g.dateDelta, h, d, e), f.reportEventChange()
        },
        triggerEventDrop: function (a, b, c, d, e) {
            this.trigger("eventDrop", d[0], a, b, c, e, {})
        },
        reportExternalDrop: function (b, c, d, e, f) {
            var g, h, i = b.eventProps;
            i && (g = a.extend({}, i, c), h = this.calendar.renderEvent(g, b.stick)[0]), this.triggerExternalDrop(h, c, d, e, f)
        },
        triggerExternalDrop: function (a, b, c, d, e) {
            this.trigger("drop", c[0], b.start, d, e), a && this.trigger("eventReceive", null, a)
        },
        renderDrag: function (a, b) { },
        unrenderDrag: function () { },
        isEventResizableFromStart: function (a) {
            return this.opt("eventResizableFromStart") && this.isEventResizable(a)
        },
        isEventResizableFromEnd: function (a) {
            return this.isEventResizable(a)
        },
        isEventResizable: function (a) {
            var b = a.source || {};
            return X(a.durationEditable, b.durationEditable, this.opt("eventDurationEditable"), a.editable, b.editable, this.opt("editable"))
        },
        reportEventResize: function (a, b, c, d, e) {
            var f = this.calendar,
                g = f.mutateEvent(a, b, c),
                h = function () {
                    g.undo(), f.reportEventChange()
                };
            this.triggerEventResize(a, g.durationDelta, h, d, e), f.reportEventChange()
        },
        triggerEventResize: function (a, b, c, d, e) {
            this.trigger("eventResize", d[0], a, b, c, e, {})
        },
        select: function (a, b) {
            this.unselect(b), this.renderSelection(a), this.reportSelection(a, b)
        },
        renderSelection: function (a) { },
        reportSelection: function (a, b) {
            this.isSelected = !0, this.triggerSelect(a, b)
        },
        triggerSelect: function (a, b) {
            this.trigger("select", null, this.calendar.applyTimezone(a.start), this.calendar.applyTimezone(a.end), b)
        },
        unselect: function (a) {
            this.isSelected && (this.isSelected = !1, this.destroySelection && this.destroySelection(), this.unrenderSelection(), this.trigger("unselect", null, a))
        },
        unrenderSelection: function () { },
        documentMousedown: function (b) {
            var c;
            this.isSelected && this.opt("unselectAuto") && v(b) && (c = this.opt("unselectCancel"), c && a(b.target).closest(c).length || this.unselect(b))
        },
        triggerDayClick: function (a, b, c) {
            this.trigger("dayClick", b, this.calendar.applyTimezone(a.start), c)
        },
        initHiddenDays: function () {
            var b, c = this.opt("hiddenDays") || [],
                d = [],
                e = 0;
            for (this.opt("weekends") === !1 && c.push(0, 6), b = 0; 7 > b; b++)(d[b] = -1 !== a.inArray(b, c)) || e++;
            if (!e) throw "invalid hiddenDays";
            this.isHiddenDayHash = d
        },
        isHiddenDay: function (a) {
            return b.isMoment(a) && (a = a.day()), this.isHiddenDayHash[a]
        },
        skipHiddenDays: function (a, b, c) {
            var d = a.clone();
            for (b = b || 1; this.isHiddenDayHash[(d.day() + (c ? b : 0) + 7) % 7];) d.add(b, "days");
            return d
        },
        computeDayRange: function (a) {
            var b, c = a.start.clone().stripTime(),
                d = a.end,
                e = null;
            return d && (e = d.clone().stripTime(), b = +d.time(), b && b >= this.nextDayThreshold && e.add(1, "days")), (!d || c >= e) && (e = c.clone().add(1, "days")), {
                start: c,
                end: e
            }
        },
        isMultiDayEvent: function (a) {
            var b = this.computeDayRange(a);
            return b.end.diff(b.start, "days") > 1
        }
    }),
        pb = Pa.Calendar = ra.extend({
            dirDefaults: null,
            langDefaults: null,
            overrides: null,
            options: null,
            viewSpecCache: null,
            view: null,
            header: null,
            loadingLevel: 0,
            constructor: Ja,
            initialize: function () { },
            initOptions: function (a) {
                var b, e, f, g;
                a = d(a), b = a.lang, e = qb[b], e || (b = pb.defaults.lang, e = qb[b] || {}), f = X(a.isRTL, e.isRTL, pb.defaults.isRTL), g = f ? pb.rtlDefaults : {}, this.dirDefaults = g, this.langDefaults = e, this.overrides = a, this.options = c([pb.defaults, g, e, a]), Ka(this.options), this.viewSpecCache = {}
            },
            getViewSpec: function (a) {
                var b = this.viewSpecCache;
                return b[a] || (b[a] = this.buildViewSpec(a))
            },
            getUnitViewSpec: function (b) {
                var c, d, e;
                if (-1 != a.inArray(b, Ua))
                    for (c = this.header.getViewsWithButtons(), a.each(Pa.views, function (a) {
                        c.push(a)
                    }), d = 0; d < c.length; d++)
                        if (e = this.getViewSpec(c[d]), e && e.singleUnit == b) return e
            },
            buildViewSpec: function (a) {
                for (var d, e, f, g, h = this.overrides.views || {}, i = [], j = [], k = [], l = a; l;) d = Qa[l], e = h[l], l = null, "function" == typeof d && (d = {
                    "class": d
                }), d && (i.unshift(d), j.unshift(d.defaults || {}), f = f || d.duration, l = l || d.type), e && (k.unshift(e), f = f || e.duration, l = l || e.type);
                return d = Q(i), d.type = a, d["class"] ? (f && (f = b.duration(f), f.valueOf() && (d.duration = f, g = I(f), 1 === f.as(g) && (d.singleUnit = g, k.unshift(h[g] || {})))), d.defaults = c(j), d.overrides = c(k), this.buildViewSpecOptions(d), this.buildViewSpecButtonText(d, a), d) : !1
            },
            buildViewSpecOptions: function (a) {
                a.options = c([pb.defaults, a.defaults, this.dirDefaults, this.langDefaults, this.overrides, a.overrides]), Ka(a.options)
            },
            buildViewSpecButtonText: function (a, b) {
                function c(c) {
                    var d = c.buttonText || {};
                    return d[b] || (a.singleUnit ? d[a.singleUnit] : null)
                }
                a.buttonTextOverride = c(this.overrides) || a.overrides.buttonText, a.buttonTextDefault = c(this.langDefaults) || c(this.dirDefaults) || a.defaults.buttonText || c(pb.defaults) || (a.duration ? this.humanizeDuration(a.duration) : null) || b
            },
            instantiateView: function (a) {
                var b = this.getViewSpec(a);
                return new b["class"](this, a, b.options, b.duration)
            },
            isValidViewType: function (a) {
                return Boolean(this.getViewSpec(a))
            },
            pushLoading: function () {
                this.loadingLevel++ || this.trigger("loading", null, !0, this.view)
            },
            popLoading: function () {
                --this.loadingLevel || this.trigger("loading", null, !1, this.view)
            },
            buildSelectSpan: function (a, b) {
                var c, d = this.moment(a).stripZone();
                return c = b ? this.moment(b).stripZone() : d.hasTime() ? d.clone().add(this.defaultTimedEventDuration) : d.clone().add(this.defaultAllDayEventDuration), {
                    start: d,
                    end: c
                }
            }
        });
    pb.mixin(eb), pb.defaults = {
        titleRangeSeparator: " — ",
        monthYearFormat: "MMMM YYYY",
        defaultTimedEventDuration: "02:00:00",
        defaultAllDayEventDuration: {
            days: 1
        },
        forceEventDuration: !1,
        nextDayThreshold: "09:00:00",
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: !0,
        weekNumbers: !1,
        weekNumberTitle: "W",
        weekNumberCalculation: "local",
        scrollTime: "06:00:00",
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        timezoneParam: "timezone",
        timezone: !1,
        isRTL: !1,
        buttonText: {
            prev: "prev",
            next: "next",
            prevYear: "prev year",
            nextYear: "next year",
            year: "year",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        buttonIcons: {
            prev: "left-single-arrow",
            next: "right-single-arrow",
            prevYear: "left-double-arrow",
            nextYear: "right-double-arrow"
        },
        theme: !1,
        themeButtonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e",
            prevYear: "seek-prev",
            nextYear: "seek-next"
        },
        dragOpacity: .75,
        dragRevertDuration: 500,
        dragScroll: !0,
        unselectAuto: !0,
        dropAccept: "*",
        eventOrder: "title",
        eventLimit: !1,
        eventLimitText: "more",
        eventLimitClick: "popover",
        dayPopoverFormat: "LL",
        handleWindowResize: !0,
        windowResizeDelay: 200
    }, pb.englishDefaults = {
        dayPopoverFormat: "dddd, MMMM D"
    }, pb.rtlDefaults = {
        header: {
            left: "next,prev today",
            center: "",
            right: "title"
        },
        buttonIcons: {
            prev: "right-single-arrow",
            next: "left-single-arrow",
            prevYear: "right-double-arrow",
            nextYear: "left-double-arrow"
        },
        themeButtonIcons: {
            prev: "circle-triangle-e",
            next: "circle-triangle-w",
            nextYear: "seek-prev",
            prevYear: "seek-next"
        }
    };
    var qb = Pa.langs = {};
    Pa.datepickerLang = function (b, c, d) {
        var e = qb[b] || (qb[b] = {});
        e.isRTL = d.isRTL, e.weekNumberTitle = d.weekHeader, a.each(rb, function (a, b) {
            e[a] = b(d)
        }), a.datepicker && (a.datepicker.regional[c] = a.datepicker.regional[b] = d, a.datepicker.regional.en = a.datepicker.regional[""], a.datepicker.setDefaults(d))
    }, Pa.lang = function (b, d) {
        var e, f;
        e = qb[b] || (qb[b] = {}), d && (e = qb[b] = c([e, d])), f = La(b), a.each(sb, function (a, b) {
            null == e[a] && (e[a] = b(f, e))
        }), pb.defaults.lang = b
    };
    var rb = {
        buttonText: function (a) {
            return {
                prev: Z(a.prevText),
                next: Z(a.nextText),
                today: Z(a.currentText)
            }
        },
        monthYearFormat: function (a) {
            return a.showMonthAfterYear ? "YYYY[" + a.yearSuffix + "] MMMM" : "MMMM YYYY[" + a.yearSuffix + "]"
        }
    },
        sb = {
            dayOfMonthFormat: function (a, b) {
                var c = a.longDateFormat("l");
                return c = c.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), b.isRTL ? c += " ddd" : c = "ddd " + c, c
            },
            mediumTimeFormat: function (a) {
                return a.longDateFormat("LT").replace(/\s*a$/i, "a")
            },
            smallTimeFormat: function (a) {
                return a.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a");
            },
            extraSmallTimeFormat: function (a) {
                return a.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
            },
            hourFormat: function (a) {
                return a.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
            },
            noMeridiemTimeFormat: function (a) {
                return a.longDateFormat("LT").replace(/\s*a$/i, "")
            }
        },
        tb = {
            smallDayDateFormat: function (a) {
                return a.isRTL ? "D dd" : "dd D"
            },
            weekFormat: function (a) {
                return a.isRTL ? "w[ " + a.weekNumberTitle + "]" : "[" + a.weekNumberTitle + " ]w"
            },
            smallWeekFormat: function (a) {
                return a.isRTL ? "w[" + a.weekNumberTitle + "]" : "[" + a.weekNumberTitle + "]w"
            }
        };
    Pa.lang("en", pb.englishDefaults), Pa.sourceNormalizers = [], Pa.sourceFetchers = [];
    var ub = {
        dataType: "json",
        cache: !1
    },
        vb = 1;
    pb.prototype.getPeerEvents = function (a, b) {
        var c, d, e = this.getEventCache(),
            f = [];
        for (c = 0; c < e.length; c++) d = e[c], b && b._id === d._id || f.push(d);
        return f
    };
    var wb = Pa.BasicView = ob.extend({
        dayGridClass: mb,
        dayGrid: null,
        dayNumbersVisible: !1,
        weekNumbersVisible: !1,
        weekNumberWidth: null,
        headContainerEl: null,
        headRowEl: null,
        initialize: function () {
            this.dayGrid = this.instantiateDayGrid()
        },
        instantiateDayGrid: function () {
            var a = this.dayGridClass.extend(xb);
            return new a(this)
        },
        setRange: function (a) {
            ob.prototype.setRange.call(this, a), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(a)
        },
        computeRange: function (a) {
            var b = ob.prototype.computeRange.call(this, a);
            return /year|month/.test(b.intervalUnit) && (b.start.startOf("week"), b.start = this.skipHiddenDays(b.start), b.end.weekday() && (b.end.add(1, "week").startOf("week"), b.end = this.skipHiddenDays(b.end, -1, !0))), b
        },
        renderDates: function () {
            this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows())
        },
        renderHead: function () {
            this.headContainerEl = this.el.find(".fc-head-container").html(this.dayGrid.renderHeadHtml()), this.headRowEl = this.headContainerEl.find(".fc-row")
        },
        unrenderDates: function () {
            this.dayGrid.unrenderDates(), this.dayGrid.removeElement()
        },
        renderBusinessHours: function () {
            this.dayGrid.renderBusinessHours()
        },
        renderSkeletonHtml: function () {
            return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '"><div class="fc-day-grid-container"><div class="fc-day-grid"/></div></td></tr></tbody></table>'
        },
        weekNumberStyleAttr: function () {
            return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
        },
        hasRigidRows: function () {
            var a = this.opt("eventLimit");
            return a && "number" != typeof a
        },
        updateWidth: function () {
            this.weekNumbersVisible && (this.weekNumberWidth = k(this.el.find(".fc-week-number")))
        },
        setHeight: function (a, b) {
            var c, d = this.opt("eventLimit");
            m(this.scrollerEl), f(this.headRowEl), this.dayGrid.removeSegPopover(), d && "number" == typeof d && this.dayGrid.limitRows(d), c = this.computeScrollerHeight(a), this.setGridHeight(c, b), d && "number" != typeof d && this.dayGrid.limitRows(d), !b && l(this.scrollerEl, c) && (e(this.headRowEl, r(this.scrollerEl)), c = this.computeScrollerHeight(a), this.scrollerEl.height(c))
        },
        setGridHeight: function (a, b) {
            b ? j(this.dayGrid.rowEls) : i(this.dayGrid.rowEls, a, !0)
        },
        prepareHits: function () {
            this.dayGrid.prepareHits()
        },
        releaseHits: function () {
            this.dayGrid.releaseHits()
        },
        queryHit: function (a, b) {
            return this.dayGrid.queryHit(a, b)
        },
        getHitSpan: function (a) {
            return this.dayGrid.getHitSpan(a)
        },
        getHitEl: function (a) {
            return this.dayGrid.getHitEl(a)
        },
        renderEvents: function (a) {
            this.dayGrid.renderEvents(a), this.updateHeight()
        },
        getEventSegs: function () {
            return this.dayGrid.getEventSegs()
        },
        unrenderEvents: function () {
            this.dayGrid.unrenderEvents()
        },
        renderDrag: function (a, b) {
            return this.dayGrid.renderDrag(a, b)
        },
        unrenderDrag: function () {
            this.dayGrid.unrenderDrag()
        },
        renderSelection: function (a) {
            this.dayGrid.renderSelection(a)
        },
        unrenderSelection: function () {
            this.dayGrid.unrenderSelection()
        }
    }),
        xb = {
            renderHeadIntroHtml: function () {
                var a = this.view;
                return a.weekNumbersVisible ? '<th class="fc-week-number ' + a.widgetHeaderClass + '" ' + a.weekNumberStyleAttr() + "><span>" + Y(a.opt("weekNumberTitle")) + "</span></th>" : ""
            },
            renderNumberIntroHtml: function (a) {
                var b = this.view;
                return b.weekNumbersVisible ? '<td class="fc-week-number" ' + b.weekNumberStyleAttr() + "><span>" + this.getCellDate(a, 0).format("w") + "</span></td>" : ""
            },
            renderBgIntroHtml: function () {
                var a = this.view;
                return a.weekNumbersVisible ? '<td class="fc-week-number ' + a.widgetContentClass + '" ' + a.weekNumberStyleAttr() + "></td>" : ""
            },
            renderIntroHtml: function () {
                var a = this.view;
                return a.weekNumbersVisible ? '<td class="fc-week-number" ' + a.weekNumberStyleAttr() + "></td>" : ""
            }
        },
        yb = Pa.MonthView = wb.extend({
            computeRange: function (a) {
                var b, c = wb.prototype.computeRange.call(this, a);
                return this.isFixedWeeks() && (b = Math.ceil(c.end.diff(c.start, "weeks", !0)), c.end.add(6 - b, "weeks")), c
            },
            setGridHeight: function (a, b) {
                b = b || "variable" === this.opt("weekMode"), b && (a *= this.rowCnt / 6), i(this.dayGrid.rowEls, a, !b)
            },
            isFixedWeeks: function () {
                var a = this.opt("weekMode");
                return a ? "fixed" === a : this.opt("fixedWeekCount")
            }
        });
    Qa.basic = {
        "class": wb
    }, Qa.basicDay = {
        type: "basic",
        duration: {
            days: 1
        }
    }, Qa.basicWeek = {
        type: "basic",
        duration: {
            weeks: 1
        }
    }, Qa.month = {
        "class": yb,
        duration: {
            months: 1
        },
        defaults: {
            fixedWeekCount: !0
        }
    };
    var zb = Pa.AgendaView = ob.extend({
        timeGridClass: nb,
        timeGrid: null,
        dayGridClass: mb,
        dayGrid: null,
        axisWidth: null,
        headContainerEl: null,
        noScrollRowEls: null,
        bottomRuleEl: null,
        bottomRuleHeight: null,
        initialize: function () {
            this.timeGrid = this.instantiateTimeGrid(), this.opt("allDaySlot") && (this.dayGrid = this.instantiateDayGrid())
        },
        instantiateTimeGrid: function () {
            var a = this.timeGridClass.extend(Ab);
            return new a(this)
        },
        instantiateDayGrid: function () {
            var a = this.dayGridClass.extend(Bb);
            return new a(this)
        },
        setRange: function (a) {
            ob.prototype.setRange.call(this, a), this.timeGrid.setRange(a), this.dayGrid && this.dayGrid.setRange(a)
        },
        renderDates: function () {
            this.el.addClass("fc-agenda-view").html(this.renderSkeletonHtml()), this.renderHead(), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = a('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)")
        },
        renderHead: function () {
            this.headContainerEl = this.el.find(".fc-head-container").html(this.timeGrid.renderHeadHtml())
        },
        unrenderDates: function () {
            this.timeGrid.unrenderDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.unrenderDates(), this.dayGrid.removeElement())
        },
        renderSkeletonHtml: function () {
            return '<table><thead class="fc-head"><tr><td class="fc-head-container ' + this.widgetHeaderClass + '"></td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container"><div class="fc-time-grid"/></div></td></tr></tbody></table>'
        },
        axisStyleAttr: function () {
            return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
        },
        renderBusinessHours: function () {
            this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours()
        },
        unrenderBusinessHours: function () {
            this.timeGrid.unrenderBusinessHours(), this.dayGrid && this.dayGrid.unrenderBusinessHours()
        },
        getNowIndicatorUnit: function () {
            return this.timeGrid.getNowIndicatorUnit()
        },
        renderNowIndicator: function (a) {
            this.timeGrid.renderNowIndicator(a)
        },
        unrenderNowIndicator: function () {
            this.timeGrid.unrenderNowIndicator()
        },
        updateSize: function (a) {
            this.timeGrid.updateSize(a), ob.prototype.updateSize.call(this, a)
        },
        updateWidth: function () {
            this.axisWidth = k(this.el.find(".fc-axis"))
        },
        setHeight: function (a, b) {
            var c, d;
            null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), m(this.scrollerEl), f(this.noScrollRowEls), this.dayGrid && (this.dayGrid.removeSegPopover(), c = this.opt("eventLimit"), c && "number" != typeof c && (c = Cb), c && this.dayGrid.limitRows(c)), b || (d = this.computeScrollerHeight(a), l(this.scrollerEl, d) ? (e(this.noScrollRowEls, r(this.scrollerEl)), d = this.computeScrollerHeight(a), this.scrollerEl.height(d)) : (this.scrollerEl.height(d).css("overflow", "hidden"), this.bottomRuleEl.show()))
        },
        computeInitialScroll: function () {
            var a = b.duration(this.opt("scrollTime")),
                c = this.timeGrid.computeTimeTop(a);
            return c = Math.ceil(c), c && c++, c
        },
        prepareHits: function () {
            this.timeGrid.prepareHits(), this.dayGrid && this.dayGrid.prepareHits()
        },
        releaseHits: function () {
            this.timeGrid.releaseHits(), this.dayGrid && this.dayGrid.releaseHits()
        },
        queryHit: function (a, b) {
            var c = this.timeGrid.queryHit(a, b);
            return !c && this.dayGrid && (c = this.dayGrid.queryHit(a, b)), c
        },
        getHitSpan: function (a) {
            return a.component.getHitSpan(a)
        },
        getHitEl: function (a) {
            return a.component.getHitEl(a)
        },
        renderEvents: function (a) {
            var b, c, d = [],
                e = [],
                f = [];
            for (c = 0; c < a.length; c++) a[c].allDay ? d.push(a[c]) : e.push(a[c]);
            b = this.timeGrid.renderEvents(e), this.dayGrid && (f = this.dayGrid.renderEvents(d)), this.updateHeight()
        },

        getEventSegs: function () {
            return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : [])
        },
        unrenderEvents: function () {
            this.timeGrid.unrenderEvents(), this.dayGrid && this.dayGrid.unrenderEvents()
        },
        renderDrag: function (a, b) {
            return a.start.hasTime() ? this.timeGrid.renderDrag(a, b) : this.dayGrid ? this.dayGrid.renderDrag(a, b) : void 0
        },
        unrenderDrag: function () {
            this.timeGrid.unrenderDrag(), this.dayGrid && this.dayGrid.unrenderDrag()
        },
        renderSelection: function (a) {
            a.start.hasTime() || a.end.hasTime() ? this.timeGrid.renderSelection(a) : this.dayGrid && this.dayGrid.renderSelection(a)
        },
        unrenderSelection: function () {
            this.timeGrid.unrenderSelection(), this.dayGrid && this.dayGrid.unrenderSelection()
        }
    }),
        Ab = {
            renderHeadIntroHtml: function () {
                var a, b = this.view;
                return b.opt("weekNumbers") ? (a = this.start.format(b.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + b.widgetHeaderClass + '" ' + b.axisStyleAttr() + "><span>" + Y(a) + "</span></th>") : '<th class="fc-axis ' + b.widgetHeaderClass + '" ' + b.axisStyleAttr() + "></th>"
            },
            renderBgIntroHtml: function () {
                var a = this.view;
                return '<td class="fc-axis ' + a.widgetContentClass + '" ' + a.axisStyleAttr() + "></td>"
            },
            renderIntroHtml: function () {
                var a = this.view;
                return '<td class="fc-axis" ' + a.axisStyleAttr() + "></td>"
            }
        },
        Bb = {
            renderBgIntroHtml: function () {
                var a = this.view;
                return '<td class="fc-axis ' + a.widgetContentClass + '" ' + a.axisStyleAttr() + "><span>" + (a.opt("allDayHtml") || Y(a.opt("allDayText"))) + "</span></td>"
            },
            renderIntroHtml: function () {
                var a = this.view;
                return '<td class="fc-axis" ' + a.axisStyleAttr() + "></td>"
            }
        },
        Cb = 5,
        Db = [{
            hours: 1
        }, {
            minutes: 30
        }, {
            minutes: 15
        }, {
            seconds: 30
        }, {
            seconds: 15
        }];
    return Qa.agenda = {
        "class": zb,
        defaults: {
            allDaySlot: !0,
            allDayText: "all-day",
            slotDuration: "00:30:00",
            minTime: "00:00:00",
            maxTime: "24:00:00",
            slotEventOverlap: !0
        }
    }, Qa.agendaDay = {
        type: "agenda",
        duration: {
            days: 1
        }
    }, Qa.agendaWeek = {
        type: "agenda",
        duration: {
            weeks: 1
        }
    }, Pa
});



/**
 * Created by ezgoing on 14/9/2014.
 */

"use strict";
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    var cropbox = function (options, el) {
        var el = el || $(options.imageBox),
            obj =
            {
                state: {},
                ratio: 1,
                options: options,
                imageBox: el,
                thumbBox: el.find(options.thumbBox),
                spinner: el.find(options.spinner),
                image: new Image(),
                getDataURL: function () {
                    var width = this.thumbBox.width(),
                        height = this.thumbBox.height(),
                        canvas = document.createElement("canvas"),
                        dim = el.css('background-position').split(' '),
                        size = el.css('background-size').split(' '),
                        dx = parseInt(dim[0]) - el.width() / 2 + width / 2,
                        dy = parseInt(dim[1]) - el.height() / 2 + height / 2,
                        dw = parseInt(size[0]),
                        dh = parseInt(size[1]),
                        sh = parseInt(this.image.height),
                        sw = parseInt(this.image.width);

                    canvas.width = width;
                    canvas.height = height;
                    var context = canvas.getContext("2d");
                    context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
                    var imageData = canvas.toDataURL('image/png');
                    return imageData;
                },
                getBlob: function () {
                    var imageData = this.getDataURL();
                    var b64 = imageData.replace('data:image/png;base64,', '');
                    var binary = atob(b64);
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], { type: 'image/png' });
                },
                zoomIn: function () {
                    this.ratio *= 1.1;
                    setBackground();
                },
                zoomOut: function () {
                    this.ratio *= 0.9;
                    setBackground();
                }
            },
            setBackground = function () {
                var w = parseInt(obj.image.width) * obj.ratio;
                var h = parseInt(obj.image.height) * obj.ratio;

                var pw = (el.width() - w) / 2;
                var ph = (el.height() - h) / 2;

                el.css({
                    'background-image': 'url(' + obj.image.src + ')',
                    'background-size': w + 'px ' + h + 'px',
                    'background-position': pw + 'px ' + ph + 'px',
                    'background-repeat': 'no-repeat'
                });
            },
            imgMouseDown = function (e) {
                e.stopImmediatePropagation();

                obj.state.dragable = true;
                obj.state.mouseX = e.clientX;
                obj.state.mouseY = e.clientY;
            },
            imgMouseMove = function (e) {
                e.stopImmediatePropagation();

                if (obj.state.dragable) {
                    var x = e.clientX - obj.state.mouseX;
                    var y = e.clientY - obj.state.mouseY;

                    var bg = el.css('background-position').split(' ');

                    var bgX = x + parseInt(bg[0]);
                    var bgY = y + parseInt(bg[1]);

                    el.css('background-position', bgX + 'px ' + bgY + 'px');

                    obj.state.mouseX = e.clientX;
                    obj.state.mouseY = e.clientY;
                }
            },
            imgMouseUp = function (e) {
                e.stopImmediatePropagation();
                obj.state.dragable = false;
            },
            zoomImage = function (e) {
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio *= 1.1 : obj.ratio *= 0.9;
                setBackground();
            }

        obj.spinner.show();
        obj.image.onload = function () {
            obj.spinner.hide();
            setBackground();

            el.bind('mousedown', imgMouseDown);
            el.bind('mousemove', imgMouseMove);
            $(window).bind('mouseup', imgMouseUp);
            el.bind('mousewheel DOMMouseScroll', zoomImage);
        };
        obj.image.src = options.imgSrc;
        el.on('remove', function () { $(window).unbind('mouseup', imgMouseUp) });

        return obj;
    };

    jQuery.fn.cropbox = function (options) {
        return new cropbox(options, this);
    };
}));



/*===== Jalendar =====*/
!function (a) { a.fn.jalendar = function (e) { function t() { S[1] = N(A); var e = new Date; e.setFullYear(D, M, 0); var t = e.getDay() + C; v.find(".header h1").html(o[l.lang][M] + " " + D + '<div class="total-bar"></div>'), v.find(".day").html("&nbsp;").removeAttr("data-date").removeClass("this-month have-event disable-selecting"); for (var r = 0; r < 42 - (t + S[M]); r++)v.find(".day").eq(t + S[M] + r).html("<span>" + (r + 1) + "</span>"); for (var r = 0; r < t; r++) { var d = void 0 == S[M - 1] ? S[11] : S[M - 1]; v.find(".day").eq(r).html("<span>" + (d - t + (r + 1)) + "</span>") } for (var r = 1; r <= S[M]; r++) { t++; var i, s = M + 1; l.dayWithZero === !0 && (r = r < 10 ? "0" + r : r), l.monthWithZero === !0 && (s = M < 9 ? "0" + (M + 1) : M + 1), "dd-mm-yyyy" == l.dateType ? i = r + "-" + s + "-" + D : "mm-dd-yyyy" == l.dateType ? i = s + "-" + r + "-" + D : "yyyy-mm-dd" == l.dateType ? i = D + "-" + s + "-" + r : "yyyy-dd-mm" == l.dateType && (i = D + "-" + r + "-" + s), "linker" == l.type ? v.find(".day").eq(t - 1).addClass("this-month").attr("data-date", i).html('<span><a href="' + l.customUrl + i + '">' + r + "</a></span>") : v.find(".day").eq(t - 1).addClass("this-month").attr("data-date", i).html("<span>" + r + "</span>"); var y = Math.round(new Date(D + "/" + M + "/" + r + " 00:00:00").getTime() / 1e3), u = Math.round(new Date(m + "/" + p + "/" + h + " 00:00:00").getTime() / 1e3); 1 == l.selectingBeforeToday && y > u && v.find(".day").eq(t - 1).addClass("disable-selecting"), 1 == l.selectingAfterToday && y < u && v.find(".day").eq(t - 1).addClass("disable-selecting"), v.find(".days").attr("data-month", s).attr("data-year", D) } M == w.getMonth() && D == w.getFullYear() ? v.find(".day.this-month").removeClass("today").eq(k - 1).addClass("today") : v.find(".day.this-month").removeClass("today").attr("style", ""), v.find(".added-event").each(function (e) { a(this).attr("data-id", e); var t = a(this).attr("data-date"); v.find('.this-month[data-date="' + t + '"]').append(c("div", "event-single").attr("data-id", e).append(c("a", "").attr("href", a(this).attr("data-link")).attr("target", "blank").text(a(this).attr("data-title")))), v.find(".day").has(".event-single").addClass("have-event") }), n(), null !== l.dayColor && v.find(".day span, .day span a").css({ color: l.dayColor }), null !== l.titleColor && v.find(".header h1, .header .prv-m, .header .nxt-m, .event-single p, h3, .close-button").css({ color: l.titleColor }), null !== l.weekColor && v.find("h2").css({ color: l.weekColor }), null !== l.todayColor && v.find(".day.this-month.today span, .day.this-month.today span a").css({ color: l.todayColor }), "#fff" != l.color && "#ffffff" != l.color && "white" != l.color || v.find(".header h1, .header .prv-m, .header .nxt-m, .day.today span, h2, .event-single p, h3, .close-button").css({ "text-shadow": "none" }) } function n() { var e = v.find(".this-month .event-single").length; 0 == e && v.find(".total-bar").hide(0), v.find(".total-bar").text(e), v.find(".events h3 span").text(a(".jalendar .day.selected .event-single").length) } function r() { v.find(".day").removeClass("selected").removeAttr("style"), v.find(".add-event").removeClass("selected").height(0) } function d() { if (v.find(".day").removeClass("first-range range last-range"), null !== E) if (0 == v.find('[data-date="' + I.val() + '"]').length) { if (j < Number(v.find(".days").attr("data-month")) && z >= Number(v.find(".days").attr("data-year")) || z < Number(v.find(".days").attr("data-year")) ? E = 0 : (j > Number(v.find(".days").attr("data-month")) && z <= Number(v.find(".days").attr("data-year")) || z > Number(v.find(".days").attr("data-year"))) && (E = 42), null !== F) { if (z == L && j == x) return !1; var a = parseInt(v.find(".days").attr("data-year"), 10), e = parseInt(v.find(".days").attr("data-month"), 10); (z < a && L > a || x > e && L >= a && z < a || j < e && z == a && x > e && L == a || j < e && L > a && z == a || j < e && z == a && x > e && L >= a) && v.find(".day").addClass("range") } } else E = v.find('[data-date="' + I.val() + '"]').index() } function i() { v.find('.day[data-date="' + I.val() + '"]').addClass("first-range"), v.find('.day[data-date="' + P.val() + '"]').addClass("last-range"), v.find('.day[data-date="' + I.val() + '"]').nextUntil('.day[data-date="' + P.val() + '"]').addClass("range"), v.find('.day[data-date="' + P.val() + '"]').length > 0 && (v.find(".day.first-range").length > 0 ? v.find(".day.first-range").nextUntil(".day.last-range").addClass("range") : v.find(".day.last-range").prevUntil(".day:eq(0)").addClass("range")) } var l = a.extend({ customDay: new Date, color: "#3aa4d1", color2: "", lang: "EN", type: "", customUrl: "#", dateType: "dd-mm-yyyy", dayWithZero: !0, monthWithZero: !0, sundayStart: !1, dayColor: null, titleColor: null, weekColor: null, todayColor: null, selectingBeforeToday: !1, selectingAfterToday: !1, done: null }, e), s = {}, o = {}, y = {}, u = {}; s.EN = new Array("شنبه", "یک شنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه"), s.TR = new Array("Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Pzr"), s.ES = new Array("Lun", "Mar", "Mié", "Jue", "Vie", "Såb", "Dom"), s.DE = new Array("Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"), s.FR = new Array("Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"), s.IT = new Array("Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dim"), s.FIL = new Array("Lun", "Mar", "Miy", "Huw", "Biy", "Sab", "Lin"), s.RU = new Array("Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"), s.NL = new Array("Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"), s.ZH = new Array("星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"), s.HI = new Array("रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"), s.PT = new Array("Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"), s.PL = new Array("po", "wt", "sr", "cz", "pi", "so", "ni"), o.EN = new Array("بهمن", "اسفند", "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی"), o.TR = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"), o.ES = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"), o.DE = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"), o.FR = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aoút", "Septembre", "Octobre", "Novembre", "Décembre"), o.IT = new Array("Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Guigno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"), o.FIL = new Array("Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"), o.RU = new Array("Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"), o.NL = new Array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"), o.ZH = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"), o.HI = new Array("जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"), o.PT = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"), o.PL = new Array("styczen", "luty", "marzec", "kwiecien", "maj", "czerwiec", "lipiec", "sierpien", "wrzesien", "pazdziernik", "listopad", "grudzien"), y.EN = "Event(s)", y.TR = "Etkinlik", y.ES = "Evento(s)", y.DE = "Tätigkeit", y.FR = "Activité(s)", y.IT = "Attività", y.FIL = "Aktibidad", y.RU = "Деятельность", y.NL = "Activiteit(en)", y.ZH = "事件", y.HI = "परिणाम", y.PT = "Eventos", y.PL = "Działalność", u.EN = "Close", u.TR = "Kapat", u.ES = "Cerrar", u.DE = "Schließen", u.FR = "Fermer", u.IT = "Chiudere", u.FIL = "Isara", u.RU = "Закрывать", u.NL = "Sluiten", u.ZH = "關閉", u.HI = "बंद करे", u.PT = "Fechar", u.PL = "Zamknąć"; var f = new Date, h = f.getDate(), p = f.getMonth(), m = f.getFullYear(), v = a(this), c = function (e, t) { return a(document.createElement(e)).addClass(t) }, g = "" === l.color2 ? l.color : l.color2; v.append(a('<input type="hidden" class="data1" /><input type="hidden" class="data2" />'), c("div", "jalendar-container").append(c("div", "jalendar-pages").append(c("div", "header").append(c("a", "prv-m").append(c("i", "fa fa-angle-right")), c("h1"), c("a", "nxt-m").append(c("i", "fa fa-angle-left")), c("div", "day-names")), c("div", "days"), c("div", "add-event").append(c("div", "events").append(c("h3", "").html("<span></span> " + y[l.lang]), c("div", "events-list")), c("div", "close-button").text(u[l.lang]))).attr("style", "background-color:" + l.color + "; background: -webkit-gradient(linear, left top, left bottom, from(" + l.color + "), to(" + g + ")); background: -webkit-linear-gradient(top, " + l.color + ", " + g + "); background : -moz-linear-gradient(top, " + l.color + ", " + g + "); background: -ms-linear-gradient(top, " + l.color + ", " + g + "); background: -o-linear-gradient(top, " + l.color + ", " + g + ");"))), "range" == l.type && v.find(".jalendar-pages").addClass("range").append(c("input", "first-range-data").attr({ type: "hidden" }), c("input", "last-range-data").attr({ type: "hidden" })); for (var b = 0; b < 42; b++)v.find(".days").append(c("div", "day")); var C = 0; 1 == l.sundayStart && (v.find(".day-names").append(c("h2").text(s[l.lang][6])), C = 1); for (var b = C; b < 7; b++)v.find(".day-names").append(c("h2").text(s[l.lang][b - C])); var A, w = new Date(l.customDay), D = w.getFullYear(), k = w.getDate(), M = w.getMonth(), T = function (a) { var e = new Date; return e.setYear(a), e.setMonth(1), e.setDate(29), 29 == e.getDate() }, N = function (a) { return a = T(D) === !0 ? 29 : 28 }, S = new Array(31, N(A), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31), E = null, F = null, j = null, x = null, z = null, L = null; t(); var J = new Array(v.find(".prv-m"), v.find(".nxt-m")), I = (v.find(".jalendar .close-button"), v.find("input.first-range-data")), P = v.find("input.last-range-data"); J[1].on("click", function () { M >= 11 ? (M = 0, D++) : M++, t(), r(), "range" == l.type && (d(), i()) }), J[0].on("click", function () { dayClick = v.find(".this-month"), 0 === M ? (M = 11, D--) : M--, t(), r(), "range" == l.type && (d(), i()) }), v.on("click", ".close-button", function (a) { a.preventDefault(), v.find(".add-event").removeClass("selected").height(0), v.find(".this-month.selected").removeClass("selected") }), v.on("click", ".this-month:not(.disable-selecting)", function () { function e(a) { a.parent().find(".day").removeClass("first-range").removeClass("range").removeClass("last-range"), a.addClass("first-range"), I.val(a.attr("data-date")), E = v.find('[data-date="' + v.find(".first-range").attr("data-date") + '"]').index(), j = Number(v.find(".days").attr("data-month")), z = Number(v.find(".days").attr("data-year")), F = null, P.val("") } function t(a) { a.addClass("last-range"), P.val(a.attr("data-date")), F = v.find(".last-range").index(), x = Number(v.find(".days").attr("data-month")), L = Number(v.find(".days").attr("data-year")) } if ("selector" == l.type) return v.find("input.data1").val(a(this).data("date")), a(this).parent().find(".selected").removeClass("selected"), a(this).addClass("selected"), v.parent().is(".jalendar-input") && (v.parent().find("input").removeClass("selected"), v.parent(".jalendar-input").find("input").val(a(this).data("date"))), null !== l.done && l.done.call(this), !1; if ("range" == l.type) { a(this).parent().find(".first-range"), a(this).parent().find(".last-range"); if (null !== E) if (null !== F) e(a(this)); else { if (E > a(this).index()) return e(a(this)), !1; t(a(this)), v.find("input.data1").val(I.val()), v.find("input.data2").val(P.val()), v.parent().is(".jalendar-input") && (v.parent().find("input").removeClass("selected"), v.parent(".jalendar-input").find("input").val(v.find("input.data1").val() + ", " + v.find("input.data2").val())), null !== l.done && l.done.call(this) } else e(a(this)); return v.on({ mouseenter: function () { return null !== E && void ("" === P.val() && (v.find(".day").removeClass("range last-range"), a(this).index() > E && a(this).hasClass("this-month") && (a(this).addClass("last-range"), a(this).parent().find(".day:eq(" + E + ")").nextUntil(".this-month.last-range").addClass("range")))) }, mouseleave: function () { "" === P.val() && a(this).parent().find(".day").removeClass("last-range").removeClass("range") } }, ".range .day.this-month"), !1 } var n = a(this).find(".event-single"); v.find(".events .event-single").remove(), r(), "" === l.type && (v.find("input.data1").val(a(this).data("date")), a(this).addClass("selected"), v.find(".add-event").find(".events-list").html(n.clone()), v.parent().is(".jalendar-input") && v.parent(".jalendar-input").find("input").val(a(this).data("date")), v.find(".events .event-single").length >= 0 && v.find(".events h3 span").html(v.find(".events .event-single").size()), v.find(".add-event").addClass("selected").height(v.find(".add-event .events").height() + 59)) }), v.parent().is(".jalendar-input") && v.parent(".jalendar-input").find('input[type="text"], .jalendar').on("click", function (e) { e.stopPropagation(), a(this).addClass("selected") }), a("html").on("click", function () { a(".jalendar-input input").removeClass("selected") }) } }(jQuery);








/**
* wickedpicker v0.4.1 - A simple jQuery timepicker.
* Copyright (c) 2015-2017 Eric Gagnon - http://github.com/wickedRidge/wickedpicker
* License: MIT
*/

(function ($, window, document) {

    "use strict";

    if (typeof String.prototype.endsWith != 'function') {
        /*
         * Checks if this string end ends with another string
         *
         * @param {string} the string to be checked
         *
         * @return {bool}
         */
        String.prototype.endsWith = function (string) {
            return string.length > 0 && this.substring(this.length - string.length, this.length) === string;
        }
    }

    /*
     * Returns if the user agent is mobile
     *
     * @return {bool}
     */
    var isMobile = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    var today = new Date();

    var pluginName = "wickedpicker",
        defaults = {
            now: today.getHours() + ':' + today.getMinutes(),
            twentyFour: false,
            upArrow: 'wickedpicker__controls__control-up',
            downArrow: 'wickedpicker__controls__control-down',
            close: 'wickedpicker__close',
            hoverState: 'hover-state',
            title: 'انتخاب ساعت',
            showSeconds: false,
            timeSeparator: ' : ',
            secondsInterval: 1,
            minutesInterval: 1,
            beforeShow: null,
            afterShow: null,
            show: null,
            clearable: false
        };

    /*
     * @param {object} The input object the timepicker is attached to.
     * @param {object} The object containing options
     */
    function Wickedpicker(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);

        this.element.addClass('hasWickedpicker');
        this.element.attr('onkeypress', 'return false;');
        this.element.attr('aria-showingpicker', 'false');
        this.createPicker();
        this.timepicker = $('.wickedpicker');
        this.up = $('.' + this.options.upArrow.split(/\s+/).join('.'));
        this.down = $('.' + this.options.downArrow.split(/\s+/).join('.'));
        this.separator = $('.wickedpicker__controls__control--separator');
        this.hoursElem = $('.wickedpicker__controls__control--hours');
        this.minutesElem = $('.wickedpicker__controls__control--minutes');
        this.secondsElem = $('.wickedpicker__controls__control--seconds');
        this.meridiemElem = $('.wickedpicker__controls__control--meridiem');
        this.close = $('.' + this.options.close.split(/\s+/).join('.'));

        //Create a new Date object based on the default or passing in now value
        var time = this.timeArrayFromString(this.options.now);
        this.options.now = new Date(today.getFullYear(), today.getMonth(), today.getDate(), time[0], time[1], time[2]);
        this.selectedHour = this.parseHours(this.options.now.getHours());
        this.selectedMin = this.parseSecMin(this.options.now.getMinutes());
        this.selectedSec = this.parseSecMin(this.options.now.getSeconds());
        this.selectedMeridiem = this.parseMeridiem(this.options.now.getHours());
        this.setHoverState();
        this.attach(element);
        this.setText(element);
    }

    $.extend(Wickedpicker.prototype, {

        /*
         * Show given input's timepicker
         *
         * @param {object} The input being clicked
         */
        showPicker: function (element) {
            //If there is a beforeShow function, then call it with the input calling the timepicker and the
            // timepicker itself
            if (typeof this.options.beforeShow === 'function') {
                this.options.beforeShow(element, this.timepicker);
            }
            var timepickerPos = $(element).offset();

            $(element).attr({ 'aria-showingpicker': 'true', 'tabindex': -1 });
            this.setText(element);
            this.showHideMeridiemControl();
            if (this.getText(element) !== this.getTime()) {

                // Check meridiem 
                var text = this.getText(element);
                var meridiem = /\s\w\w$/.test(text) ? text.substr(-2, 2) : null;
                var inputTime = text.replace(/\s\w\w$/, '').split(this.options.timeSeparator);
                var newTime = {};
                newTime.hours = inputTime[0];
                newTime.minutes = inputTime[1];
                if (this.options.showSeconds) {
                    newTime.seconds = inputTime[2];
                    newTime.meridiem = meridiem;
                } else {
                    newTime.meridiem = meridiem;
                }
                this.setTime(newTime);
            }
            this.timepicker.css({
                'z-index': this.element.css('z-index') + 1,
                position: 'absolute',
                left: timepickerPos.left,
                top: timepickerPos.top + $(element)[0].offsetHeight
            }).show();
            //If there is a show function, then call it with the input calling the timepicker and the
            // timepicker itself
            if (typeof this.options.show === 'function') {
                this.options.show(element, this.timepicker);
            }

            this.handleTimeAdjustments(element);
        },

        /*
         * Hides the timepicker that is currently shown if it is not part of the timepicker
         *
         * @param {Object} The DOM object being clicked on the page
         * 
         * BeinnLora: added trigger function to call on closing/hiding timepicker. 
         */
        hideTimepicker: function (element) {
            this.timepicker.hide();
            if (typeof this.options.afterShow === 'function') {
                this.options.afterShow(element, this.timepicker);
            }
            var pickerHidden = {
                start: function () {
                    var setShowPickerFalse = $.Deferred();
                    $('[aria-showingpicker="true"]').attr('aria-showingpicker', 'false');
                    return setShowPickerFalse.promise();
                }
            };

            function setTabIndex(index) {
                setTimeout(function () {
                    $('[aria-showingpicker="false"]').attr('tabindex', index);
                }, 400);
            }

            pickerHidden.start().then(setTabIndex(0));
        },

        /*
         * Create a new timepicker. A single timepicker per page
         */
        createPicker: function () {
            if ($('.wickedpicker').length === 0) {
                var picker = '<div class="wickedpicker"><p class="wickedpicker__title">' + this.options.title + '<span class="wickedpicker__close"></span></p><ul class="wickedpicker__controls"><li class="wickedpicker__controls__control"><span class="' + this.options.upArrow + '"></span><span class="wickedpicker__controls__control--hours" tabindex="-1">00</span><span class="' + this.options.downArrow + '"></span></li><li class="wickedpicker__controls__control--separator"><span class="wickedpicker__controls__control--separator-inner">:</span></li><li class="wickedpicker__controls__control"><span class="' + this.options.upArrow + '"></span><span class="wickedpicker__controls__control--minutes" tabindex="-1">00</span><span class="' + this.options.downArrow + '"></span></li>';
                if (this.options.showSeconds) {
                    picker += '<li class="wickedpicker__controls__control--separator"><span class="wickedpicker__controls__control--separator-inner">:</span></li><li class="wickedpicker__controls__control"><span class="' + this.options.upArrow + '"></span><span class="wickedpicker__controls__control--seconds" tabindex="-1">00</span><span class="' + this.options.downArrow + '"></span> </li>';
                }
                picker += '<li class="wickedpicker__controls__control"><span class="' + this.options.upArrow + '"></span><span class="wickedpicker__controls__control--meridiem" tabindex="-1">AM</span><span class="' + this.options.downArrow + '"></span></li></ul></div>';
                $('body').append(picker);
                this.attachKeyboardEvents();
            }
        },

        /*
         * Hides the meridiem control if this timepicker is a 24 hour clock
         */
        showHideMeridiemControl: function () {
            if (this.options.twentyFour === false) {
                $(this.meridiemElem).parent().show();
            }
            else {
                $(this.meridiemElem).parent().hide();
            }
        },

        /*
         * Hides the seconds control if this timepicker has showSeconds set to true
         */
        showHideSecondsControl: function () {
            if (this.options.showSeconds) {
                $(this.secondsElem).parent().show();
            }
            else {
                $(this.secondsElem).parent().hide();
            }
        },

        /*
         * Bind the click events to the input
         *
         * @param {object} The input element
         */
        attach: function (element) {
            var self = this;

            if (this.options.clearable) {
                self.makePickerInputClearable(element);
            }

            $(element).attr('tabindex', 0);
            $(element).on('click focus', function (event) {
                //Prevent multiple firings
                if ($(self.timepicker).is(':hidden')) {
                    self.showPicker($(this));
                    window.lasTimePickerControl = $(this); //Put the reference on this timepicker into global scope for unsing that in afterShow function
                    $(self.hoursElem).focus();
                }
            });

            //Handle click events for closing Wickedpicker
            var clickHandler = function (event) {
                //Only fire the hide event when you have to
                if ($(self.timepicker).is(':visible')) {
                    //Clicking the X
                    if ($(event.target).is(self.close)) {
                        self.hideTimepicker(window.lasTimePickerControl);
                    } else if ($(event.target).closest(self.timepicker).length || $(event.target).closest($('.hasWickedpicker')).length) { //Clicking the Wickedpicker or one of it's inputs
                        event.stopPropagation();
                    } else {   //Everything else
                        self.hideTimepicker(window.lasTimePickerControl);
                    }
                    window.lasTimePickerControl = null;
                }
            };
            $(document).off('click', clickHandler).on('click', clickHandler);
        },

        /**
         * Added keyboard functionality to improve usabil
         */
        attachKeyboardEvents: function () {
            $(document).on('keydown', $.proxy(function (event) {
                switch (event.keyCode) {
                    case 9:
                        if (event.target.className !== 'hasWickedpicker') {
                            $(this.close).trigger('click');
                        }
                        break;
                    case 27:
                        $(this.close).trigger('click');
                        break;
                    case 37: //Left arrow
                        if (event.target.className !== this.hoursElem[0].className) {
                            $(event.target).parent().prevAll('li').not(this.separator.selector).first().children()[1].focus();
                        } else {
                            $(event.target).parent().siblings(':last').children()[1].focus();
                        }
                        break;
                    case 39: //Right arrow
                        if (event.target.className !== this.meridiemElem[0].className) {
                            $(event.target).parent().nextAll('li').not(this.separator.selector).first().children()[1].focus();
                        } else {
                            $(event.target).parent().siblings(':first').children()[1].focus();
                        }
                        break;
                    case 38: //Up arrow
                        $(':focus').prev().trigger('click');
                        break;
                    case 40: //Down arrow
                        $(':focus').next().trigger('click');
                        break;
                    default:
                        break;
                }
            }, this));
        },

        /*
         * Set the time on the timepicker
         *
         * @param {object} The date being set
         */
        setTime: function (time) {
            this.setHours(time.hours);
            this.setMinutes(time.minutes);
            this.setMeridiem(time.meridiem);
            if (this.options.showSeconds) {
                this.setSeconds(time.seconds);
            }
        },

        /*
         * Get the time from the timepicker
         */
        getTime: function () {
            return [this.formatTime(this.getHours(), this.getMinutes(), this.getMeridiem(), this.getSeconds())];
        },

        /*
         * Set the timpicker's hour(s) value
         *
         * @param {string} hours
         */
        setHours: function (hours) {
            var hour = new Date();
            hour.setHours(hours);
            var hoursText = this.parseHours(hour.getHours());
            this.hoursElem.text(hoursText);
            this.selectedHour = hoursText;
        },

        /*
         * Get the hour(s) value from the timepicker
         *
         * @return {integer}
         */
        getHours: function () {
            var hours = new Date();
            hours.setHours(this.hoursElem.text());
            return hours.getHours();
        },

        /*
         * Returns the correct hour value based on the type of clock, 12 or 24 hour
         *
         * @param {integer} The hours value before parsing
         *
         * @return {string|integer}
         */
        parseHours: function (hours) {
            return (this.options.twentyFour === false) ? ((hours + 11) % 12) + 1 : (hours < 10) ? '0' + hours : hours;
        },

        /*
         * Sets the timpicker's minutes value
         *
         * @param {string} minutes
         */
        setMinutes: function (minutes) {
            var minute = new Date();
            minute.setMinutes(minutes);
            var minutesText = minute.getMinutes();
            var min = this.parseSecMin(minutesText);
            this.minutesElem.text(min);
            this.selectedMin = min;
        },

        /*
         * Get the minutes value from the timepicker
         *
         * @return {integer}
         */
        getMinutes: function () {
            var minutes = new Date();
            minutes.setMinutes(this.minutesElem.text());
            return minutes.getMinutes();
        },


        /*
         * Return a human-readable minutes/seconds value
         *
         * @param {string} value seconds or minutes
         *
         * @return {string|integer}
         */
        parseSecMin: function (value) {
            return ((value < 10) ? '0' : '') + value;
        },

        /*
         * Set the timepicker's meridiem value, AM or PM
         *
         * @param {string} The new meridiem
         */
        setMeridiem: function (inputMeridiem) {
            var newMeridiem = '';
            if (inputMeridiem === undefined) {
                var meridiem = this.getMeridiem();
                newMeridiem = (meridiem === 'PM') ? 'AM' : 'PM';
            } else {
                newMeridiem = inputMeridiem;
            }
            this.meridiemElem.text(newMeridiem);
            this.selectedMeridiem = newMeridiem;
        },

        /*
         * Get the timepicker's meridiem value, AM or PM
         *
         * @return {string}
         */
        getMeridiem: function () {
            return this.meridiemElem.text();
        },

        /*
         * Set the timepicker's seconds value
         *
         * @param {string} seconds
         */
        setSeconds: function (seconds) {
            var second = new Date();
            second.setSeconds(seconds);
            var secondsText = second.getSeconds();
            var sec = this.parseSecMin(secondsText);
            this.secondsElem.text(sec);
            this.selectedSec = sec;
        },

        /*
         * Get the timepicker's seconds value
         *
         * return {string}
         */
        getSeconds: function () {
            var seconds = new Date();
            seconds.setSeconds(this.secondsElem.text());
            return seconds.getSeconds();
        },

        /*
         * Get the correct meridiem based on the hours given
         *
         * @param {string|integer} hours
         *
         * @return {string}
         */
        parseMeridiem: function (hours) {
            return (hours > 11) ? 'PM' : 'AM';
        },

        /*
         * Handles time incrementing and decrementing and passes
         * the operator, '+' or '-', the input to be set after the change
         * and the current arrow clicked, to decipher if hours, ninutes, or meridiem.
         *
         * @param {object} The input element
         */
        handleTimeAdjustments: function (element) {
            var timeOut = 0;
            //Click and click and hold timepicker incrementer and decrementer
            $(this.up).add(this.down).off('mousedown click touchstart').on('mousedown click', {
                'Wickedpicker': this,
                'input': element
            }, function (event) {
                if (event.which != 1) return false;
                var operator = (this.className.indexOf('up') > -1) ? '+' : '-';
                var passedData = event.data;
                if (event.type == 'mousedown') {
                    timeOut = setInterval($.proxy(function (args) {
                        args.Wickedpicker.changeValue(operator, args.input, this);
                    }, this, { 'Wickedpicker': passedData.Wickedpicker, 'input': passedData.input }), 200);
                } else {
                    passedData.Wickedpicker.changeValue(operator, passedData.input, this);
                }
            }).bind('mouseup touchend', function () {
                clearInterval(timeOut);
            });
        },

        /*
         * Change the timepicker's time base on what is clicked
         *
         * @param {string} The + or - operator
         * @param {object} The timepicker's associated input to be set post change
         * @param {object} The DOM arrow object clicked, determines if it is hours,
         * minutes, or meridiem base on the operator and its siblings
         */
        changeValue: function (operator, input, clicked) {
            var target = (operator === '+') ? clicked.nextSibling : clicked.previousSibling;
            var targetClass = $(target).attr('class');
            if (targetClass.endsWith('hours')) {
                this.setHours(eval(this.getHours() + operator + 1));
            } else if (targetClass.endsWith('minutes')) {
                this.setMinutes(eval(this.getMinutes() + operator + this.options.minutesInterval));
            } else if (targetClass.endsWith('seconds')) {
                this.setSeconds(eval(this.getSeconds() + operator + this.options.secondsInterval));
            } else {
                this.setMeridiem();
            }
            this.setText(input);
        },


        /*
         * Sets the give input's text to the current timepicker's time
         *
         * @param {object} The input element
         */
        setText: function (input) {
            $(input).val(this.formatTime(this.selectedHour, this.selectedMin, this.selectedMeridiem, this.selectedSec)).change();
        },

        /*
         * Get the given input's value
         *
         * @param {object} The input element
         *
         * @return {string}
         */
        getText: function (input) {
            return $(input).val();
        },

        /*
         * Returns the correct time format as a string
         *
         * @param {string} hour
         * @param {string} minutes
         * @param {string} meridiem
         *
         * @return {string}
         */
        formatTime: function (hour, min, meridiem, seconds) {
            var formattedTime = hour + this.options.timeSeparator + min;
            if (this.options.twentyFour) {
                formattedTime = hour + this.options.timeSeparator + min;
            }
            if (this.options.showSeconds) {
                formattedTime += this.options.timeSeparator + seconds;
            }
            if (this.options.twentyFour === false) {
                formattedTime += ' ' + meridiem;
            }
            return formattedTime;
        },

        /**
         *  Apply the hover class to the arrows and close icon fonts
         */
        setHoverState: function () {
            var self = this;
            if (!isMobile()) {
                $(this.up).add(this.down).add(this.close).hover(function () {
                    $(this).toggleClass(self.options.hoverState);
                });
            }
        },

        /**
         * Wrapping the given input field with the clearable container
         * , add a span that will contain the x, and bind the clear
         * input event to the span
         *
         * @param input
         */
        makePickerInputClearable: function (input) {
            $(input).wrap('<div class="clearable-picker"></div>').after('<span data-clear-picker>&times;</span>');

            //When the x is clicked, clear its sibling input field
            $('[data-clear-picker]').on('click', function (event) {
                $(this).siblings('.hasWickedpicker').val('');
            });
        },

        /**
         * Convert the options time string format
         * to an array
         *
         * returns => [hours, minutes, seconds]
         *
         * @param stringTime
         * @returns {*}
         */
        timeArrayFromString: function (stringTime) {
            if (stringTime.length) {
                var time = stringTime.split(':');
                time[2] = (time.length < 3) ? '00' : time[2];
                return time;
            }
            return false;
        },

        //public functions
        /*
         * Returns the requested input element's value
         */
        _time: function () {
            var inputValue = $(this.element).val();
            return (inputValue === '') ? this.formatTime(this.selectedHour, this.selectedMin, this.selectedMeridiem, this.selectedSec) : inputValue;
        },
        _hide: function () {
            this.hideTimepicker(this.element);
        }
    });

    //optional index if multiple inputs share the same class
    $.fn[pluginName] = function (options, index) {
        if (!$.isFunction(Wickedpicker.prototype['_' + options])) {
            return this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Wickedpicker(this, options));
                }
            });
        }
        else if ($(this).hasClass('hasWickedpicker')) {
            if (index !== undefined) {
                return $.data($(this)[index], 'plugin_' + pluginName)['_' + options]();
            }
            else {
                return $.data($(this)[0], 'plugin_' + pluginName)['_' + options]();
            }
        }
    };

})(jQuery, window, document);
