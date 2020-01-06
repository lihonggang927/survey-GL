/*
 * ux.ManagedIFrame for ExtJS Library 3.1+ Copyright(c) 2008-2009 Active Group,
 * Inc. licensing@theactivegroup.com http://licensing.theactivegroup.com
 */
Ext.namespace("Ext.ux.plugin");
Ext.onReady(function() {
	var a = Ext.util.CSS;
	if (a) {
		a.getRule(".x-hide-nosize")
				|| a
						.createStyleSheet(".x-hide-nosize{height:0px!important;width:0px!important;border:none!important;zoom:1;}.x-hide-nosize * {height:0px!important;width:0px!important;border:none!important;zoom:1;}");
		a.refreshCache()
	}
});
(function() {
	var g = Ext.Element, b = Ext.lib.Anim, a = g.prototype;
	var f = "visibility", d = "display", c = "hidden", h = "none";
	var e = {};
	e.El = {
		setDisplayed : function(j) {
			var i = this;
			i.visibilityCls
					? (i[j !== false ? "removeClass" : "addClass"](i.visibilityCls))
					: a.setDisplayed.call(i, j);
			return i
		},
		isDisplayed : function() {
			return !(this.hasClass(this.visibilityCls) || this.isStyle(d, h))
		},
		fixDisplay : function() {
			var i = this;
			a.fixDisplay.call(i);
			i.visibilityCls && i.removeClass(i.visibilityCls)
		},
		isVisible : function(j) {
			var k = this.visible
					|| (!this.isStyle(f, c) && (this.visibilityCls ? !this
							.hasClass(this.visibilityCls) : !this.isStyle(d, h)));
			if (j !== true || !k) {
				return k
			}
			var l = this.dom.parentNode, i = /^body/i;
			while (l && !i.test(l.tagName)) {
				if (!Ext.fly(l, "_isVisible").isVisible()) {
					return false
				}
				l = l.parentNode
			}
			return true
		},
		isStyle : a.isStyle || function(i, j) {
			return this.getStyle(i) == j
		}
	};
	Ext.override(g.Flyweight, e.El);
	Ext.ux.plugin.VisibilityMode = function(j) {
		Ext.apply(this, j || {});
		var i = Ext.util.CSS;
		if (i && !Ext.isIE && this.fixMaximizedWindow !== false
				&& !Ext.ux.plugin.VisibilityMode.MaxWinFixed) {
			i.updateRule(".x-window-maximized-ct", "overflow", "");
			Ext.ux.plugin.VisibilityMode.MaxWinFixed = true
		}
	};
	Ext.extend(Ext.ux.plugin.VisibilityMode, Object, {
		bubble : true,
		fixMaximizedWindow : true,
		elements : null,
		visibilityCls : "x-hide-nosize",
		hideMode : "nosize",
		ptype : "uxvismode",
		init : function(m) {
			var j = this.hideMode || m.hideMode, l = this, i = Ext.Container.prototype.bubble, k = function() {
				var p = [this.collapseEl, this.actionMode].concat(l.elements
						|| []);
				Ext.each(p, function(q) {
							l.extend(this[q] || q)
						}, this);
				var n = {
					visFixed : true,
					animCollapse : false,
					animFloat : false,
					hideMode : j,
					defaults : this.defaults || {}
				};
				n.defaults.hideMode = j;
				Ext.apply(this, n);
				Ext.apply(this.initialConfig || {}, n)
			};
			m.on("render", function() {
						if (l.bubble !== false && this.ownerCt) {
							i.call(this.ownerCt, function() {
										this.visFixed
												|| this.on("afterlayout", k,
														this, {
															single : true
														})
									})
						}
						k.call(this)
					}, m, {
						single : true
					})
		},
		extend : function(i, j) {
			i && Ext.each([].concat(i), function(k) {
						if (k && k.dom) {
							if ("visibilityCls" in k) {
								return
							}
							Ext.apply(k, e.El);
							k.visibilityCls = j || this.visibilityCls
						}
					}, this);
			return this
		}
	});
	Ext.preg && Ext.preg("uxvismode", Ext.ux.plugin.VisibilityMode);
	Ext.provide && Ext.provide("uxvismode")
})();
(function() {
	var w = Ext.Element, ac, Q = Ext.lib.Dom, r = Ext.lib.Anim, y = Ext.EventManager, m = Ext.lib.Event, Y = document, M = function() {
	}, C = Object.prototype, h = C.toString, S = "[object HTMLDocument]";
	if (!Ext.elCache || parseInt(Ext.version.replace(/\./g, ""), 10) < 311) {
		//alert("Ext Release " + Ext.version + " is not supported")
	}
	Ext._documents = {};
	Ext._documents[Ext.id(document, "_doc")] = Ext.elCache;
	var W = Q.resolveDocumentCache = function(E, aA) {
		var ay = ao(E), aB = Ext.isDocument(ay) ? Ext.id(ay) : aA, A = Ext._documents[aB]
				|| null, az, ax;
		if (!A && ay && (ax = ay.parentWindow || ay.defaultView)) {
			if (az = ax.frameElement) {
				aB = az.id || az.name
			}
		}
		return A || Ext._documents[aB] || (aB ? Ext._documents[aB] = {} : null)
	}, T = Q.clearDocumentCache = function(A) {
		delete Ext._documents[A]
	};
	w.addMethods || (w.addMethods = function(A) {
		Ext.apply(w.prototype, A || {})
	});
	Ext.removeNode = function(aA) {
		var az = aA ? aA.dom || aA : null;
		if (az && az.tagName != "BODY") {
			var ax, ay, A = W(az), E;
			if ((ay = A[az.id]) && (ax = ay.el)) {
				if (ax.dom) {
					Ext.enableNestedListenerRemoval ? y.purgeElement(ax.dom,
							true) : y.removeAll(ax.dom)
				}
				delete A[az.id];
				delete ax.dom;
				delete ax._context;
				ax = null
			}
			(E = az.parentElement || az.parentNode) && E.removeChild(az);
			az = null
		}
	};
	var ae = function(aB, az) {
		var aA = typeof aB === "function" ? aB : function ay() {
		};
		var ax = aA._ovl;
		if (!ax) {
			ax = {
				base : aA
			};
			ax[aA.length || 0] = aA;
			aA = function ay() {
				var aE = arguments.callee._ovl;
				var aD = aE[arguments.length] || aE.base;
				return aD && aD != arguments.callee
						? aD.apply(this, arguments)
						: undefined
			}
		}
		var aC = [].concat(az);
		for (var E = 0, A = aC.length; E < A; ++E) {
			ax[aC[E].length] = aC[E]
		}
		aA._ovl = ax;
		var ay = null;
		return aA
	};
	Ext.applyIf(Ext, {
		overload : ae(ae, [function(A) {
							return ae(null, A)
						}, function(ax, E, A) {
							return ax[E] = ae(ax[E], A)
						}]),
		isArray : function(A) {
			return !!A && h.apply(A) == "[object Array]"
		},
		isObject : function(A) {
			return !!A && typeof A == "object"
		},
		isDocument : function(E, A) {
			var az = E ? E.dom || E : null;
			var ay = h.apply(az) == S || (az && az.nodeType == 9);
			if (ay && A) {
				try {
					ay = !!az.location
				} catch (ax) {
					return false
				}
			}
			return ay
		},
		isWindow : function(A) {
			var E = A ? A.dom || A : null;
			return E ? !!E.navigator || h.apply(E) == "[object Window]" : false
		},
		isIterable : function(A) {
			if (Ext.isArray(A) || A.callee) {
				return true
			}
			if (/NodeList|HTMLCollection/.test(h.call(A))) {
				return true
			}
			return ((typeof A.nextNode != "undefined" || A.item) && Ext
					.isNumber(A.length))
		},
		isElement : function(A) {
			return A && Ext.type(A) == "element"
		},
		isEvent : function(A) {
			return h.apply(A) == "[object Event]"
					|| (Ext.isObject(A) && !Ext.type(o.constructor) && (window.event
							&& A.clientX && A.clientX == window.event.clientX))
		},
		isFunction : function(A) {
			return !!A && typeof A == "function"
		},
		isEventSupported : function(ay, az) {
			var ax = {
				select : "input",
				change : "input",
				submit : "form",
				reset : "form",
				load : "img",
				error : "img",
				abort : "img"
			}, A = {}, aA = /^on/i, E = function(aD, aC) {
				var aB = Ext.getDom(aC);
				return (aB ? (Ext.isElement(aB) || Ext.isDocument(aB)
						? aB.nodeName.toLowerCase()
						: aC.self ? "#window" : aC || "#object") : aC || "div")
						+ ":" + aD
			};
			return function(aF, aH) {
				aF = (aF || "").replace(aA, "");
				var aG, aE = false;
				var aC = "on" + aF;
				var aB = (aH ? aH : ax[aF]) || "div";
				var aD = E(aF, aB);
				if (aD in A) {
					return A[aD]
				}
				aG = Ext.isString(aB) ? Y.createElement(aB) : aH;
				aE = (!!aG && (aC in aG));
				aE
						|| (aE = window.Event
								&& !!(String(aF).toUpperCase() in window.Event));
				if (!aE && aG) {
					aG.setAttribute && aG.setAttribute(aC, "return;");
					aE = Ext.isFunction(aG[aC])
				}
				A[aD] = aE;
				aG = null;
				return aE
			}
		}()
	});
	var u = function(A) {
		return w[(A.tagName || "-").toUpperCase()] || w
	};
	var ak;
	function ab(A, E) {
		if (!ak) {
			ak = new Ext.Element.Flyweight()
		}
		ak.dom = Ext.getDom(A, null, E);
		return ak
	}
	Ext.apply(Ext, {
				get : w.get = function(ax, az) {
					if (!ax) {
						return null
					}
					Ext.isDocument(az) || (az = Y);
					var E, aC, aB, A = W(az);
					if (typeof ax == "string") {
						aC = Ext.getDom(ax, null, az);
						if (!aC) {
							return null
						}
						if (A[ax] && A[ax].el) {
							E = A[ax].el;
							E.dom = aC
						} else {
							E = w.addToCache(new (u(aC))(aC, null, az))
						}
						return E
					} else {
						if (ax instanceof w) {
							A = W(ax);
							ax.dom = ax.getDocument().getElementById(ax.id)
									|| ax.dom;
							if (ax.dom) {
								(A[ax.id] || (A[ax.id] = {
									data : {},
									events : {}
								})).el = ax
							}
							return ax
						} else {
							if (ax.tagName || Ext.isWindow(ax)) {
								A = W(ax);
								aB = Ext.id(ax);
								if (A[aB] && (E = A[aB].el)) {
									E.dom = ax
								} else {
									E = w.addToCache(new (u(ax))(ax, null, az),
											null, A);
									ax.navigator && (A[aB].skipGC = true)
								}
								return E
							} else {
								if (Ext.isDocument(ax)) {
									if (!Ext.isDocument(ax, true)) {
										return false
									}
									A = W(ax);
									if (A[Ext.id(ax)] && A[ax.id].el) {
										return A[ax.id].el
									}
									var ay = function() {
									};
									ay.prototype = w.prototype;
									var aA = new ay();
									aA.dom = ax;
									aA.id = Ext.id(ax, "_doc");
									aA._isDoc = true;
									w.addToCache(aA, null, A);
									A[aA.id].skipGC = true;
									return aA
								} else {
									if (ax.isComposite) {
										return ax
									} else {
										if (Ext.isArray(ax)) {
											return Ext.get(az, az).select(ax)
										}
									}
								}
							}
						}
					}
					return null
				},
				getDom : function(E, A, az) {
					var ay = az || Y;
					if (!E || !ay) {
						return null
					}
					if (E.dom) {
						return E.dom
					} else {
						if (Ext.isString(E)) {
							var ax = ay.getElementById(E);
							if (ax && Ext.isIE && A) {
								if (E == ax.getAttribute("id")) {
									return ax
								} else {
									return null
								}
							}
							return ax
						} else {
							return E
						}
					}
				},
				getBody : function(E) {
					var A = Q.getDocument(E) || Y;
					return Ext.get(A.body || A.documentElement)
				},
				getDoc : Ext.overload([Ext.getDoc, function(A) {
							return Ext.get(A, A)
						}])
			});
	w.data = function(E, A, ax) {
		E = w.get(E);
		if (!E) {
			return null
		}
		var ay = W(E)[E.id].data;
		if (arguments.length == 2) {
			return ay[A]
		} else {
			return (ay[A] = ax)
		}
	};
	w.addToCache = function(E, ay, A) {
		ay = ay || E.id;
		var ax = A || W(E);
		ax[ay] = {
			el : E,
			data : {},
			events : {}
		};
		return E
	};
	var ag = {}, X = /(-[a-z])/gi, L = function(A, E) {
		return E.charAt(1).toUpperCase()
	}, I = /alpha\(opacity=(.*)\)/i, t = /^\s+|\s+$/g, aq = /marginRight/, j = Ext.isIE
			? "styleFloat"
			: "cssFloat", c = Y.defaultView, af = "visibilityMode", x = w.DISPLAY, q = "originalDisplay", D = "padding", ai = "margin", an = "border", P = "-left", au = "-right", Z = "-top", V = "-bottom", e = "-width", at = Math, F = "opacity", g = "visibility", a = "display", ap = "hidden", ad = "none", v = "isClipped", am = "overflow", K = "overflow-x", H = "overflow-y", O = "originalClip", s = "x-masked", U = "x-masked-relative", p = {
		l : an + P + e,
		r : an + au + e,
		t : an + Z + e,
		b : an + V + e
	}, al = {
		l : D + P,
		r : D + au,
		t : D + Z,
		b : D + V
	}, i = {
		l : ai + P,
		r : ai + au,
		t : ai + Z,
		b : ai + V
	}, aw = w.data, ah = Ext.getDom, B = Ext.get, b = Ext.DomHelper, z = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/, n = Ext.util.CSS, av = function(
			E) {
		var A = aw(E, q);
		if (A === undefined) {
			aw(E, q, A = "")
		}
		return A
	}, N = function(E) {
		var A = aw(E, af);
		if (A === undefined) {
			aw(E, af, A = 1)
		}
		return A
	};
	function k(A) {
		return ag[A] || (ag[A] = A == "float" ? j : A.replace(X, L))
	}
	w.addMethods({
		getDocument : function() {
			return this._context || (this._context = ao(this))
		},
		remove : function(E, A) {
			var ax = this.dom;
			this.isMasked() && this.unmask();
			if (ax) {
				Ext.removeNode(ax);
				delete this._context;
				delete this.dom
			}
		},
		appendChild : function(A, E) {
			return B(A, E || this.getDocument()).appendTo(this)
		},
		appendTo : function(A, E) {
			ah(A, false, E || this.getDocument()).appendChild(this.dom);
			return this
		},
		insertBefore : function(A, E) {
			(A = ah(A, false, E || this.getDocument())).parentNode
					.insertBefore(this.dom, A);
			return this
		},
		insertAfter : function(A, E) {
			(A = ah(A, false, E || this.getDocument())).parentNode
					.insertBefore(this.dom, A.nextSibling);
			return this
		},
		insertFirst : function(E, A) {
			E = E || {};
			if (E.nodeType || E.dom || typeof E == "string") {
				E = ah(E);
				this.dom.insertBefore(E, this.dom.firstChild);
				return !A ? B(E) : E
			} else {
				return this.createChild(E, this.dom.firstChild, A)
			}
		},
		replace : function(A, E) {
			A = B(A, E || this.getDocument());
			this.insertBefore(A);
			A.remove();
			return this
		},
		replaceWith : function(A, ax) {
			var E = this;
			if (A.nodeType || A.dom || typeof A == "string") {
				A = ah(A, false, ax || E.getDocument());
				E.dom.parentNode.insertBefore(A, E.dom)
			} else {
				A = b.insertBefore(E.dom, A)
			}
			var ay = W(E);
			Ext.removeNode(E.dom);
			E.id = Ext.id(E.dom = A);
			w.addToCache(E.isFlyweight ? new (u(E.dom))(E.dom, null, ay) : E);
			return E
		},
		insertHtml : function(E, ax, A) {
			var ay = b.insertHtml(E, this.dom, ax);
			return A ? Ext.get(ay, ao(ay)) : ay
		},
		setVisibilityMode : function(A) {
			aw(this.dom, af, A);
			return this
		},
		setVisible : function(az, E) {
			var ax = this, ay = ax.dom, A = N(this.dom) == x;
			if (!E || !ax.anim) {
				if (A) {
					ax.setDisplayed(az)
				} else {
					ax.fixDisplay();
					ay.style.visibility = az ? "visible" : ap
				}
			} else {
				if (az) {
					ax.setOpacity(0.01);
					ax.setVisible(true)
				}
				ax.anim({
							opacity : {
								to : (az ? 1 : 0)
							}
						}, ax.preanim(arguments, 1), null, 0.35, "easeIn",
						function() {
							if (!az) {
								ay.style[A ? a : g] = (A) ? ad : ap;
								Ext.fly(ay).setOpacity(1)
							}
						})
			}
			return ax
		},
		setDisplayed : function(A) {
			if (typeof A == "boolean") {
				A = A ? av(this.dom) : ad
			}
			this.setStyle(a, A);
			return this
		},
		fixDisplay : function() {
			var A = this;
			if (A.isStyle(a, ad)) {
				A.setStyle(g, ap);
				A.setStyle(a, av(this.dom));
				if (A.isStyle(a, ad)) {
					A.setStyle(a, "block")
				}
			}
		},
		enableDisplayMode : function(A) {
			this.setVisibilityMode(w.DISPLAY);
			if (!Ext.isEmpty(A)) {
				aw(this.dom, q, A)
			}
			return this
		},
		scrollIntoView : function(ax, aA) {
			var aF = this.getDocument();
			var aG = Ext.getDom(ax, null, aF) || Ext.getBody(aF).dom;
			var az = this.dom;
			var ay = this.getOffsetsTo(aG), aK = this.getScroll(), aC = ay[0]
					+ aK.left, aJ = ay[1] + aK.top, aH = aJ + az.offsetHeight, E = aC
					+ az.offsetWidth;
			var A = aG.clientHeight;
			var aD = parseInt(aG.scrollTop, 10);
			var aI = parseInt(aG.scrollLeft, 10);
			var aB = aD + A;
			var aE = aI + aG.clientWidth;
			if (az.offsetHeight > A || aJ < aD) {
				aG.scrollTop = aJ
			} else {
				if (aH > aB) {
					aG.scrollTop = aH - A
				}
			}
			aG.scrollTop = aG.scrollTop;
			if (aA !== false) {
				if (az.offsetWidth > aG.clientWidth || aC < aI) {
					aG.scrollLeft = aC
				} else {
					if (E > aE) {
						aG.scrollLeft = E - aG.clientWidth
					}
				}
				aG.scrollLeft = aG.scrollLeft
			}
			return this
		},
		contains : function(A) {
			try {
				return !A ? false : Q.isAncestor(this.dom, A.dom ? A.dom : A)
			} catch (E) {
				return false
			}
		},
		getScroll : function() {
			var aB = this.dom, aA = this.getDocument(), A = aA.body, ax = aA.documentElement, E, az, ay;
			if (Ext.isDocument(aB) || aB == A) {
				if (Ext.isIE && Q.docIsStrict(aA)) {
					E = ax.scrollLeft;
					az = ax.scrollTop
				} else {
					E = window.pageXOffset;
					az = window.pageYOffset
				}
				ay = {
					left : E || (A ? A.scrollLeft : 0),
					top : az || (A ? A.scrollTop : 0)
				}
			} else {
				ay = {
					left : aB.scrollLeft,
					top : aB.scrollTop
				}
			}
			return ay
		},
		getStyle : function() {
			var A = c && c.getComputedStyle ? function E(aD) {
				var aA = !this._isDoc ? this.dom : null, ax, az, ay, aB, aC = Ext.isWebKit, aB;
				if (!aA || !aA.style) {
					return null
				}
				aD = k(aD);
				if (aC && aq.test(aD)) {
					aB = this.getStyle(a);
					aA.style.display = "inline-block"
				}
				ay = (ax = aA.style[aD]) ? ax : (az = c
						.getComputedStyle(aA, "")) ? az[aD] : null;
				if (aC) {
					if (ay == "rgba(0, 0, 0, 0)") {
						ay = "transparent"
					} else {
						if (aB) {
							aA.style.display = aB
						}
					}
				}
				return ay
			}
					: function E(aB) {
						var az = !this._isDoc ? this.dom : null, ax, ay;
						if (!az || !az.style) {
							return null
						}
						if (aB == F) {
							if (az.style.filter.match) {
								if (ax = az.style.filter.match(I)) {
									var aA = parseFloat(ax[1]);
									if (!isNaN(aA)) {
										return aA ? aA / 100 : 0
									}
								}
							}
							return 1
						}
						aB = k(aB);
						return az.style[aB]
								|| ((ay = az.currentStyle) ? ay[aB] : null)
					};
			var E = null;
			return A
		}(),
		setStyle : function(az, ay) {
			if (this._isDoc || Ext.isDocument(this.dom)) {
				return this
			}
			var E, ax, A;
			if (!Ext.isObject(az)) {
				E = {};
				E[az] = ay;
				az = E
			}
			for (ax in az) {
				ay = az[ax];
				ax == F ? this.setOpacity(ay) : this.dom.style[k(ax)] = ay
			}
			return this
		},
		center : function(A) {
			return this.alignTo(A || this.getDocument(), "c-c")
		},
		mask : function(E, aA) {
			var aC = this, ay = aC.dom, aB = Ext.DomHelper, az = "ext-el-mask-msg", A, aD;
			if (aC.getStyle("position") == "static") {
				aC.addClass(U)
			}
			if ((A = aw(ay, "maskMsg"))) {
				A.remove()
			}
			if ((A = aw(ay, "mask"))) {
				A.remove()
			}
			aD = aB.append(ay, {
						cls : "ext-el-mask"
					}, true);
			aw(ay, "mask", aD);
			aC.addClass(s);
			aD.setDisplayed(true);
			if (typeof E == "string") {
				var ax = aB.append(ay, {
							cls : az,
							cn : {
								tag : "div"
							}
						}, true);
				aw(ay, "maskMsg", ax);
				ax.dom.className = aA ? az + " " + aA : az;
				ax.dom.firstChild.innerHTML = E;
				ax.setDisplayed(true);
				ax.center(aC)
			}
			if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
					&& aC.getStyle("height") == "auto") {
				aD.setSize(undefined, aC.getHeight())
			}
			return aD
		},
		unmask : function() {
			var ax = this, ay = ax.dom, A = aw(ay, "mask"), E = aw(ay,
					"maskMsg");
			if (A) {
				if (E) {
					E.remove();
					aw(ay, "maskMsg", undefined)
				}
				A.remove();
				aw(ay, "mask", undefined)
			}
			ax.removeClass([s, U])
		},
		isMasked : function() {
			var A = aw(this.dom, "mask");
			return A && A.isVisible()
		},
		getCenterXY : function() {
			return this.getAlignToXY(this.getDocument(), "c-c")
		},
		getAnchorXY : function(az, aE, aJ) {
			az = (az || "tl").toLowerCase();
			aJ = aJ || {};
			var aD = this, aG = this.getDocument(), E = aD.dom == aG.body
					|| aD.dom == aG, aH = aJ.width || E ? Q.getViewWidth(false,
					aG) : aD.getWidth(), aB = aJ.height || E ? Q.getViewHeight(
					false, aG) : aD.getHeight(), aI, A = Math.round, ax = aD
					.getXY(), aF = aD.getScroll(), aC = E ? aF.left : !aE
					? ax[0]
					: 0, aA = E ? aF.top : !aE ? ax[1] : 0, ay = {
				c : [A(aH * 0.5), A(aB * 0.5)],
				t : [A(aH * 0.5), 0],
				l : [0, A(aB * 0.5)],
				r : [aH, A(aB * 0.5)],
				b : [A(aH * 0.5), aB],
				tl : [0, 0],
				bl : [0, aB],
				br : [aH, aB],
				tr : [aH, 0]
			};
			aI = ay[az];
			return [aI[0] + aC, aI[1] + aA]
		},
		anchorTo : function(E, aA, ax, A, aC, aD) {
			var aB = this, az = aB.dom;
			function ay() {
				ab(az).alignTo(E, aA, ax, A);
				Ext.callback(aD, ab(az))
			}
			Ext.EventManager.onWindowResize(ay, aB);
			if (!Ext.isEmpty(aC)) {
				Ext.EventManager.on(window, "scroll", ay, aB, {
							buffer : !isNaN(aC) ? aC : 50
						})
			}
			ay.call(aB);
			return aB
		},
		getScroll : function() {
			var aB = this.dom, aA = this.getDocument(), A = aA.body, ax = aA.documentElement, E, az, ay;
			if (aB == aA || aB == A) {
				if (Ext.isIE && Q.docIsStrict(aA)) {
					E = ax.scrollLeft;
					az = ax.scrollTop
				} else {
					E = window.pageXOffset;
					az = window.pageYOffset
				}
				ay = {
					left : E || (A ? A.scrollLeft : 0),
					top : az || (A ? A.scrollTop : 0)
				}
			} else {
				ay = {
					left : aB.scrollLeft,
					top : aB.scrollTop
				}
			}
			return ay
		},
		getAlignToXY : function(ay, aK, aL) {
			var aX;
			ay = Ext.get(ay, aX = this.getDocument());
			if (!ay || !ay.dom) {
				throw "Element.getAlignToXY with an element that doesn't exist"
			}
			aL = aL || [0, 0];
			aK = (aK == "?" ? "tl-bl?" : (!/-/.test(aK) && aK != "" ? "tl-"
					+ aK : aK || "tl-bl")).toLowerCase();
			var aU = this, aR = aU.dom, aW, aV, aD, aC, aF, aP, aI, aG = Q
					.getViewWidth(false, aX)
					- 10, aQ = Q.getViewHeight(false, aX) - 10, E, az, aA, aB, aH, aJ, aT = aX.documentElement, aE = aX.body, aO = (aT.scrollLeft
					|| aE.scrollLeft || 0)
					+ 5, aN = (aT.scrollTop || aE.scrollTop || 0) + 5, aS = false, ax = "", A = "", aM = aK
					.match(/^([a-z]+)-([a-z]+)(\?)?$/);
			if (!aM) {
				throw "Element.getAlignToXY with an invalid alignment " + aK
			}
			ax = aM[1];
			A = aM[2];
			aS = !!aM[3];
			aW = aU.getAnchorXY(ax, true);
			aV = ay.getAnchorXY(A, false);
			aD = aV[0] - aW[0] + aL[0];
			aC = aV[1] - aW[1] + aL[1];
			if (aS) {
				aF = aU.getWidth();
				aP = aU.getHeight();
				aI = ay.getRegion();
				E = ax.charAt(0);
				az = ax.charAt(ax.length - 1);
				aA = A.charAt(0);
				aB = A.charAt(A.length - 1);
				aH = ((E == "t" && aA == "b") || (E == "b" && aA == "t"));
				aJ = ((az == "r" && aB == "l") || (az == "l" && aB == "r"));
				if (aD + aF > aG + aO) {
					aD = aJ ? aI.left - aF : aG + aO - aF
				}
				if (aD < aO) {
					aD = aJ ? aI.right : aO
				}
				if (aC + aP > aQ + aN) {
					aC = aH ? aI.top - aP : aQ + aN - aP
				}
				if (aC < aN) {
					aC = aH ? aI.bottom : aN
				}
			}
			return [aD, aC]
		},
		adjustForConstraints : function(ax, A, E) {
			return this.getConstrainToXY(A || this.getDocument(), false, E, ax)
					|| ax
		},
		getConstrainToXY : function(E, A, ax, az) {
			var ay = {
				top : 0,
				left : 0,
				bottom : 0,
				right : 0
			};
			return function(aB, aO, aD, aF) {
				var aS = this.getDocument();
				aB = Ext.get(aB, aS);
				aD = aD ? Ext.applyIf(aD, ay) : ay;
				var aN, aR, aM = 0, aL = 0;
				if (aB.dom == aS.body || aB.dom == aS) {
					aN = Q.getViewWidth(false, aS);
					aR = Q.getViewHeight(false, aS)
				} else {
					aN = aB.dom.clientWidth;
					aR = aB.dom.clientHeight;
					if (!aO) {
						var aK = aB.getXY();
						aM = aK[0];
						aL = aK[1]
					}
				}
				var aJ = aB.getScroll();
				aM += aD.left + aJ.left;
				aL += aD.top + aJ.top;
				aN -= aD.right;
				aR -= aD.bottom;
				var aP = aM + aN;
				var aA = aL + aR;
				var aC = aF
						|| (!aO ? this.getXY() : [this.getLeft(true),
								this.getTop(true)]);
				var aH = aC[0], aG = aC[1];
				var aI = this.dom.offsetWidth, aQ = this.dom.offsetHeight;
				var aE = false;
				if ((aH + aI) > aP) {
					aH = aP - aI;
					aE = true
				}
				if ((aG + aQ) > aA) {
					aG = aA - aQ;
					aE = true
				}
				if (aH < aM) {
					aH = aM;
					aE = true
				}
				if (aG < aL) {
					aG = aL;
					aE = true
				}
				return aE ? [aH, aG] : false
			}
		}(),
		getCenterXY : function() {
			return this.getAlignToXY(Ext.getBody(this.getDocument()), "c-c")
		},
		center : function(A) {
			return this.alignTo(A || Ext.getBody(this.getDocument()), "c-c")
		},
		findParent : function(aC, aB, E) {
			var az = this.dom, ay = this.getDocument(), A = ay.body, aA = 0, ax;
			if (Ext.isGecko && h.call(az) == "[object XULElement]") {
				return null
			}
			aB = aB || 50;
			if (isNaN(aB)) {
				ax = Ext.getDom(aB, null, ay);
				aB = Number.MAX_VALUE
			}
			while (az && az.nodeType == 1 && aA < aB && az != A && az != ax) {
				if (Ext.DomQuery.is(az, aC)) {
					return E ? Ext.get(az, ay) : az
				}
				aA++;
				az = az.parentNode
			}
			return null
		},
		clip : function() {
			var A = this, E = A.dom;
			if (!aw(E, v)) {
				aw(E, v, true);
				aw(E, O, {
							o : A.getStyle(am),
							x : A.getStyle(K),
							y : A.getStyle(H)
						});
				A.setStyle(am, ap);
				A.setStyle(K, ap);
				A.setStyle(H, ap)
			}
			return A
		},
		unclip : function() {
			var A = this, ax = A.dom;
			if (aw(ax, v)) {
				aw(ax, v, false);
				var E = aw(ax, O);
				if (E.o) {
					A.setStyle(am, E.o)
				}
				if (E.x) {
					A.setStyle(K, E.x)
				}
				if (E.y) {
					A.setStyle(H, E.y)
				}
			}
			return A
		},
		getViewSize : function() {
			var ax = this.getDocument(), ay = this.dom, A = (ay == ax || ay == ax.body);
			if (A) {
				var E = Ext.lib.Dom;
				return {
					width : E.getViewWidth(),
					height : E.getViewHeight()
				}
			} else {
				return {
					width : ay.clientWidth,
					height : ay.clientHeight
				}
			}
		},
		getStyleSize : function() {
			var az = this, A, ay, aB = this.getDocument(), aC = this.dom, E = (aC == aB || aC == aB.body), ax = aC.style;
			if (E) {
				var aA = Ext.lib.Dom;
				return {
					width : aA.getViewWidth(),
					height : aA.getViewHeight()
				}
			}
			if (ax.width && ax.width != "auto") {
				A = parseFloat(ax.width);
				if (az.isBorderBox()) {
					A -= az.getFrameWidth("lr")
				}
			}
			if (ax.height && ax.height != "auto") {
				ay = parseFloat(ax.height);
				if (az.isBorderBox()) {
					ay -= az.getFrameWidth("tb")
				}
			}
			return {
				width : A || az.getWidth(true),
				height : ay || az.getHeight(true)
			}
		}
	});
	Ext.isDefined(w.collectorThreadId) && clearInterval(w.collectorThreadId);
	function l() {
		if (!Ext.enableGarbageCollector) {
			clearInterval(w.collectorThreadId)
		} else {
			var A, ay, aA, az, ax = Ext.elCache;
			for (A in ax) {
				az = ax[A];
				if (az.skipGC) {
					continue
				}
				ay = az.el;
				aA = ay.dom;
				if (!aA || !aA.parentNode
						|| (!aA.offsetParent && !Y.getElementById(A))) {
					if (Ext.enableListenerCollection) {
						Ext.EventManager.removeAll(aA)
					}
					delete ax[A]
				}
			}
			if (Ext.isIE) {
				var E = {};
				for (A in ax) {
					E[A] = ax[A]
				}
				Ext.elCache = Ext._documents[Ext.id(document)] = E;
				E = null
			}
		}
	}
	if (Ext.enableGarbageCollector) {
		w.collectorThreadId = setInterval(l, 30000)
	}
	Ext.apply(Q, {
		getDocument : function(ax, ay) {
			var az = null;
			try {
				az = Ext.getDom(ax, null, null)
			} catch (E) {
			}
			var A = Ext.isDocument(az);
			if (A) {
				if (ay) {
					return Ext.isDocument(az, ay) ? az : null
				}
				return az
			}
			return az ? az.ownerDocument || az.document : null
		},
		docIsStrict : function(A) {
			return (Ext.isDocument(A) ? A : this.getDocument(A)).compatMode == "CSS1Compat"
		},
		getViewWidth : Ext.overload([Q.getViewWidth || function(A) {
				}, function() {
					return this.getViewWidth(false)
				}, function(A, E) {
					return A ? this.getDocumentWidth(E) : this
							.getViewportWidth(E)
				}]),
		getViewHeight : Ext.overload([Q.getViewHeight || function(A) {
				}, function() {
					return this.getViewHeight(false)
				}, function(A, E) {
					return A ? this.getDocumentHeight(E) : this
							.getViewportHeight(E)
				}]),
		getDocumentHeight : Ext.overload([Q.getDocumentHeight || M,
				function(A) {
					if (A = this.getDocument(A)) {
						return Math.max(!this.docIsStrict(A)
										? A.body.scrollHeight
										: A.documentElement.scrollHeight, this
										.getViewportHeight(A))
					}
					return undefined
				}]),
		getDocumentWidth : Ext.overload([Q.getDocumentWidth || M, function(A) {
			if (A = this.getDocument(A)) {
				return Math.max(!this.docIsStrict(A)
								? A.body.scrollWidth
								: A.documentElement.scrollWidth, this
								.getViewportWidth(A))
			}
			return undefined
		}]),
		getViewportHeight : Ext.overload([Q.getViewportHeight || M,
				function(A) {
					if (A = this.getDocument(A)) {
						if (Ext.isIE) {
							return this.docIsStrict(A)
									? A.documentElement.clientHeight
									: A.body.clientHeight
						} else {
							return A.defaultView.innerHeight
						}
					}
					return undefined
				}]),
		getViewportWidth : Ext.overload([Q.getViewportWidth || M, function(A) {
			if (A = this.getDocument(A)) {
				return !this.docIsStrict(A) && !Ext.isOpera
						? A.body.clientWidth
						: Ext.isIE
								? A.documentElement.clientWidth
								: A.defaultView.innerWidth
			}
			return undefined
		}]),
		getXY : Ext.overload([Q.getXY || M, function(A, ay) {
			A = Ext.getDom(A, null, ay);
			var ax = this.getDocument(A), E = ax
					? (ax.body || ax.documentElement)
					: null;
			if (!A || !E || A == E) {
				return [0, 0]
			}
			return this.getXY(A)
		}])
	});
	var ao = Q.getDocument, d = w._flyweights;
	Ext.fly = w.fly = function(ax, A, ay) {
		var E = null;
		A = A || "_global";
		if (ax = Ext.getDom(ax, null, ay)) {
			(E = d[A] = (d[A] || new w.Flyweight())).dom = ax;
			Ext.isDocument(ax) && (E._isDoc = true)
		}
		return E
	};
	var G = function() {
	};
	G.prototype = w.prototype;
	w.Flyweight = function(A) {
		this.dom = A
	};
	w.Flyweight.prototype = new G();
	w.Flyweight.prototype.isFlyweight = true;
	function f(ax, az, aC, ay, E, aE) {
		ax = Ext.getDom(ax);
		if (!ax) {
			return
		}
		var A = Ext.get(ax).id, aD = (W(ax)[A] || {}).events || {}, aA;
		aA = m.on(ax, az, E);
		aD[az] = aD[az] || [];
		aD[az].push([aC, E, aE, aA, ay]);
		if (ax.addEventListener && az == "mousewheel") {
			var aB = ["DOMMouseScroll", E, false];
			ax.addEventListener.apply(ax, aB);
			Ext.EventManager.addListener(window, "beforeunload", function() {
						ax.removeEventListener.apply(ax, aB)
					})
		}
		if (az == "mousedown" && Ext.isDocument(ax)) {
			Ext.EventManager.stoppedMouseDownEvent.addListener(E)
		}
	}
	function R(A, E) {
		return function() {
			var ax = Ext.toArray(arguments);
			if (E.target == Ext.EventObject.setEvent(ax[0]).target) {
				A.apply(this, ax)
			}
		}
	}
	function J(E, ax, A) {
		return function(ay) {
			A.delay(ax.buffer, E, null, [new Ext.EventObjectImpl(ay)])
		}
	}
	function aj(az, ay, A, ax, E) {
		return function(aA) {
			Ext.EventManager.removeListener(ay, A, ax, E);
			az(aA)
		}
	}
	function ar(E, ax, A) {
		return function(az) {
			var ay = new Ext.util.DelayedTask(E);
			(A.tasks || (A.tasks = [])).push(ay);
			ay.delay(ax.delay || 10, E, null, [new Ext.EventObjectImpl(az)])
		}
	}
	function aa(aA, az, A, aC, aD) {
		var E = !Ext.isObject(A) ? {} : A, ax = Ext.getDom(aA), ay;
		aC = aC || E.fn;
		aD = aD || E.scope;
		if (!ax) {
			throw 'Error listening for "' + az + '". Element "' + aA
					+ "\" doesn't exist."
		}
		function aB(aF) {
			if (!window.Ext) {
				return
			}
			aF = Ext.EventObject.setEvent(aF);
			var aE;
			if (E.delegate) {
				if (!(aE = aF.getTarget(E.delegate, ax))) {
					return
				}
			} else {
				aE = aF.target
			}
			if (E.stopEvent) {
				aF.stopEvent()
			}
			if (E.preventDefault) {
				aF.preventDefault()
			}
			if (E.stopPropagation) {
				aF.stopPropagation()
			}
			if (E.normalized) {
				aF = aF.browserEvent
			}
			aC.call(aD || ax, aF, aE, E)
		}
		if (E.target) {
			aB = R(aB, E)
		}
		if (E.delay) {
			aB = ar(aB, E, aC)
		}
		if (E.single) {
			aB = aj(aB, ax, az, aC, aD)
		}
		if (E.buffer) {
			ay = new Ext.util.DelayedTask(aB);
			aB = J(aB, E, ay)
		}
		f(ax, az, aC, ay, aB, aD);
		return aB
	}
	Ext.apply(y, {
		addListener : y.on = function(ax, A, az, ay, E) {
			if (Ext.isObject(A)) {
				var aC = A, aA, aB;
				for (aA in aC) {
					aB = aC[aA];
					if (!z.test(aA)) {
						if (Ext.isFunction(aB)) {
							aa(ax, aA, aC, aB, aC.scope)
						} else {
							aa(ax, aA, aB)
						}
					}
				}
			} else {
				aa(ax, A, E, az, ay)
			}
		},
		removeListener : y.un = function(aA, aB, aF, aH) {
			var E = Ext.getDom(aA);
			E && Ext.get(E);
			var aG = E ? W(E) : {}, aD = E && ((aG[E.id] || {
				events : {}
			}).events)[aB] || [], A, az, ax, ay, aC, aE;
			for (az = 0, aC = aD.length; az < aC; az++) {
				if (Ext.isArray(aE = aD[az]) && aE[0] == aF
						&& (!aH || aE[2] == aH)) {
					aE[4] && aE[4].cancel();
					ay = aF.tasks && aF.tasks.length;
					if (ay) {
						while (ay--) {
							aF.tasks[ay].cancel()
						}
						delete aF.tasks
					}
					A = aE[1];
					m.un(E, aB, m.extAdapter ? aE[3] : A);
					if (A && aB == "mousewheel" && E.addEventListener) {
						E.removeEventListener("DOMMouseScroll", A, false)
					}
					if (A && aB == "mousedown" && E == Y) {
						Ext.EventManager.stoppedMouseDownEvent
								.removeListener(A)
					}
					aD.splice(az, 1);
					if (aD.length === 0) {
						delete aG[E.id].events[aB]
					}
					for (ay in aG[E.id].events) {
						return false
					}
					aG[E.id].events = {};
					return false
				}
			}
		},
		removeAll : function(ax) {
			if (!(ax = Ext.getDom(ax))) {
				return
			}
			var E = ax.id, aF = W(ax) || {}, aG = aF[E] || {}, aE = aG.events
					|| {}, aB, aA, aC, ay, aD, az, A;
			for (ay in aE) {
				if (aE.hasOwnProperty(ay)) {
					aB = aE[ay];
					for (aA = 0, aC = aB.length; aA < aC; aA++) {
						aD = aB[aA];
						aD[4] && aD[4].cancel();
						if (aD[0].tasks && (az = aD[0].tasks.length)) {
							while (az--) {
								aD[0].tasks[az].cancel()
							}
							delete aD.tasks
						}
						A = aD[1];
						m.un(ax, ay, m.extAdapter ? aD[3] : A);
						if (A && ax.addEventListener && ay == "mousewheel") {
							ax.removeEventListener("DOMMouseScroll", A, false)
						}
						if (A && ax == Y && ay == "mousedown") {
							Ext.EventManager.stoppedMouseDownEvent
									.removeListener(A)
						}
					}
				}
			}
			aF[E] && (aF[E].events = {})
		},
		getListeners : function(ax, E) {
			ax = Ext.getDom(ax);
			if (!ax) {
				return
			}
			var az = (Ext.get(ax) || {}).id, A = W(ax), ay = (A[az] || {}).events
					|| {};
			return ay[E] || null
		},
		purgeElement : function(ax, A, az) {
			ax = Ext.getDom(ax);
			var E = ax.id, aC = W(ax), aD = (aC[E] || {}).events || {}, ay, aB, aA;
			if (az) {
				if (aD.hasOwnProperty(az)) {
					aB = aD[az];
					for (ay = 0, aA = aB.length; ay < aA; ay++) {
						y.removeListener(ax, az, aB[ay][0])
					}
				}
			} else {
				y.removeAll(ax)
			}
			if (A && ax && ax.childNodes) {
				for (ay = 0, aA = ax.childNodes.length; ay < aA; ay++) {
					y.purgeElement(ax.childNodes[ay], A, az)
				}
			}
		}
	});
	m.getListeners = function(E, A) {
		return Ext.EventManager.getListeners(E, A)
	};
	Ext.provide && Ext.provide("multidom")
})();
(function() {
	var El = Ext.Element, ElFrame, ELD = Ext.lib.Dom, EMPTYFN = function() {
	}, OP = Object.prototype, addListener = function() {
		var handler;
		if (window.addEventListener) {
			handler = function F(el, eventName, fn, capture) {
				el.addEventListener(eventName, fn, !!capture)
			}
		} else {
			if (window.attachEvent) {
				handler = function F(el, eventName, fn, capture) {
					el.attachEvent("on" + eventName, fn)
				}
			} else {
				handler = function F() {
				}
			}
		}
		var F = null;
		return handler
	}(), removeListener = function() {
		var handler;
		if (window.removeEventListener) {
			handler = function F(el, eventName, fn, capture) {
				el.removeEventListener(eventName, fn, (capture))
			}
		} else {
			if (window.detachEvent) {
				handler = function F(el, eventName, fn) {
					el.detachEvent("on" + eventName, fn)
				}
			} else {
				handler = function F() {
				}
			}
		}
		var F = null;
		return handler
	}();
	if (typeof ELD.getDocument != "function") {
		alert("MIF 2.1.1 requires multidom support")
	}
	if (!Ext.elCache || parseInt(Ext.version.replace(/\./g, ""), 10) < 311) {
		//alert("Ext Release " + Ext.version + " is not supported")
	}
	Ext.ns("Ext.ux.ManagedIFrame", "Ext.ux.plugin");
	var MIM, MIF = Ext.ux.ManagedIFrame, MIFC;
	var frameEvents = ["documentloaded", "domready", "focus", "blur", "resize",
			"scroll", "unload", "scroll", "exception", "message", "reset"];
	var reSynthEvents = new RegExp("^(" + frameEvents.join("|") + ")", "i");
	Ext.ux.ManagedIFrame.Element = Ext.extend(Ext.Element, {
		constructor : function(element, forceNew, doc) {
			var d = doc || document;
			var elCache = ELD.resolveDocumentCache(d);
			var dom = Ext.getDom(element, false, d);
			if (!dom || !(/^(iframe|frame)/i).test(dom.tagName)) {
				return null
			}
			var id = Ext.id(dom);
			this.dom = dom;
			this.id = id;
			(elCache[id] || (elCache[id] = {
				el : this,
				events : {},
				data : {}
			})).el = this;
			this.dom.name || (this.dom.name = this.id);
			if (Ext.isIE) {
				document.frames
						&& (document.frames[this.dom.name] || (document.frames[this.dom.name] = this.dom))
			}
			this.dom.ownerCt = this;
			MIM.register(this);
			if (!this._observable) {
				(this._observable = new Ext.util.Observable())
						.addEvents("documentloaded", "domready", "exception",
								"resize", "message", "blur", "focus", "unload",
								"scroll", "reset");
				this._observable.addEvents("_docready", "_docload")
			}
			var H = Ext.isIE ? "onreadystatechange" : "onload";
			this.dom[H] = this.loadHandler.createDelegate(this);
			this.dom.onerror = this.loadHandler.createDelegate(this)
		},
		destructor : function() {
			this.dom[Ext.isIE ? "onreadystatechange" : "onload"] = this.dom.onerror = EMPTYFN;
			MIM.deRegister(this);
			this.removeAllListeners();
			Ext.destroy(this.frameShim, this.DDM);
			this.hideMask(true);
			delete this.loadMask;
			this.reset();
			this.manager = null;
			this.dom.ownerCt = null
		},
		cleanse : function(forceReclean, deep) {
			if (this.isCleansed && forceReclean !== true) {
				return this
			}
			var d = this.dom, n = d.firstChild, nx;
			while (d && n) {
				nx = n.nextSibling;
				deep && Ext.fly(n).cleanse(forceReclean, deep);
				Ext.removeNode(n);
				n = nx
			}
			this.isCleansed = true;
			return this
		},
		src : null,
		CSS : null,
		manager : null,
		disableMessaging : true,
		domReadyRetries : 7500,
		focusOnLoad : Ext.isIE,
		eventsFollowFrameLinks : true,
		remove : function() {
			this.destructor.apply(this, arguments);
			ElFrame.superclass.remove.apply(this, arguments)
		},
		getDocument : function() {
			return this.dom ? this.dom.ownerDocument : document
		},
		submitAsTarget : function(submitCfg) {
			var opt = submitCfg || {}, D = this.getDocument(), form = Ext
					.getDom(opt.form ? opt.form.form || opt.form : null, false,
							D)
					|| Ext.DomHelper.append(D.body, {
								tag : "form",
								cls : "x-hidden x-mif-form",
								encoding : "multipart/form-data"
							}), formFly = Ext.fly(form, "_dynaForm"), formState = {
				target : form.target || "",
				method : form.method || "",
				encoding : form.encoding || "",
				enctype : form.enctype || "",
				action : form.action || ""
			}, encoding = opt.encoding || form.encoding, method = opt.method
					|| form.method || "POST";
			formFly.set({
						target : this.dom.name,
						method : method,
						encoding : encoding,
						action : opt.url || opt.action || form.action
					});
			if (method == "POST" || !!opt.enctype) {
				formFly.set({
							enctype : opt.enctype || form.enctype || encoding
						})
			}
			var hiddens, hd, ps;
			if (opt.params
					&& (ps = Ext.isFunction(opt.params)
							? opt.params()
							: opt.params)) {
				hiddens = [];
				Ext.iterate(ps = typeof ps == "string" ? Ext.urlDecode(ps,
								false) : ps, function(n, v) {
							Ext.fly(hd = D.createElement("input")).set({
										type : "hidden",
										name : n,
										value : v
									});
							form.appendChild(hd);
							hiddens.push(hd)
						})
			}
			opt.callback
					&& this._observable.addListener("_docready", opt.callback,
							opt.scope, {
								single : true
							});
			this._frameAction = true;
			this._targetURI = location.href;
			this.showMask();
	(function() {
				form.submit();
				hiddens && Ext.each(hiddens, Ext.removeNode, Ext);
				if (formFly.hasClass("x-mif-form")) {
					formFly.remove()
				} else {
					formFly.set(formState)
				}
				delete El._flyweights._dynaForm;
				formFly = null;
				this.hideMask(true)
			}).defer(100, this);
			return this
		},
		resetUrl : (function() {
			return Ext.isIE && Ext.isSecure
					? Ext.SSL_SECURE_URL
					: "about:blank"
		})(),
		setSrc : function(url, discardUrl, callback, scope) {
			var src = url || this.src || this.resetUrl;
			var O = this._observable;
			this._unHook();
			Ext.isFunction(callback)
					&& O.addListener("_docload", callback, scope || this, {
								single : true
							});
			this.showMask();
			(discardUrl !== true) && (this.src = src);
			var s = this._targetURI = (Ext.isFunction(src) ? src() || "" : src);
			try {
				this._frameAction = true;
				this.dom.src = s;
				this.checkDOM()
			} catch (ex) {
				O.fireEvent.call(O, "exception", this, ex)
			}
			return this
		},
		setLocation : function(url, discardUrl, callback, scope) {
			var src = url || this.src || this.resetUrl;
			var O = this._observable;
			this._unHook();
			Ext.isFunction(callback)
					&& O.addListener("_docload", callback, scope || this, {
								single : true
							});
			this.showMask();
			var s = this._targetURI = (Ext.isFunction(src) ? src() || "" : src);
			if (discardUrl !== true) {
				this.src = src
			}
			try {
				this._frameAction = true;
				this.getWindow().location.replace(s);
				this.checkDOM()
			} catch (ex) {
				O.fireEvent.call(O, "exception", this, ex)
			}
			return this
		},
		reset : function(src, callback, scope) {
			this._unHook();
			var loadMaskOff = false, s = src, win = this.getWindow(), O = this._observable;
			if (this.loadMask) {
				loadMaskOff = this.loadMask.disabled;
				this.loadMask.disabled = false
			}
			this.hideMask(true);
			if (win) {
				this.isReset = true;
				var cb = callback;
				O.addListener("_docload", function(frame) {
							if (this.loadMask) {
								this.loadMask.disabled = loadMaskOff
							}
							Ext.isFunction(cb)
									&& (cb = cb.apply(scope || this, arguments));
							O.fireEvent("reset", this)
						}, this, {
							single : true
						});
				Ext.isFunction(s) && (s = src());
				s = this._targetURI = Ext.isEmpty(s, true) ? this.resetUrl : s;
				win.location ? (win.location.href = s) : O.fireEvent(
						"_docload", this)
			}
			return this
		},
		scriptRE : /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/gi,
		update : function(content, loadScripts, callback, scope) {
			loadScripts = loadScripts || this.getUpdater().loadScripts || false;
			content = Ext.DomHelper.markup(content || "");
			content = loadScripts === true ? content : content.replace(
					this.scriptRE, "");
			var doc;
			if ((doc = this.getFrameDocument()) && !!content.length) {
				this._unHook();
				this.src = null;
				this.showMask();
				Ext.isFunction(callback)
						&& this._observable.addListener("_docload", callback,
								scope || this, {
									single : true
								});
				this._targetURI = location.href;
				doc.open();
				this._frameAction = true;
				doc.write(content);
				doc.close();
				this.checkDOM()
			} else {
				this.hideMask(true);
				Ext.isFunction(callback) && callback.call(scope, this)
			}
			return this
		},
		execCommand : function(command, userInterface, value, validate) {
			var doc, assert;
			if ((doc = this.getFrameDocument()) && !!command) {
				try {
					Ext.isIE && this.getWindow().focus();
					assert = validate
							&& Ext.isFunction(doc.queryCommandEnabled) ? doc
							.queryCommandEnabled(command) : true;
					return assert
							&& doc.execCommand(command, !!userInterface, value)
				} catch (eex) {
					return false
				}
			}
			return false
		},
		setDesignMode : function(active) {
			var doc;
			(doc = this.getFrameDocument())
					&& (doc.designMode = (/on|true/i).test(String(active))
							? "on"
							: "off")
		},
		getUpdater : function() {
			return this.updateManager
					|| (this.updateManager = new MIF.Updater(this))
		},
		getHistory : function() {
			var h = null;
			try {
				h = this.getWindow().history
			} catch (eh) {
			}
			return h
		},
		get : function(el) {
			var doc = this.getFrameDocument();
			return doc ? Ext.get(el, doc) : doc = null
		},
		fly : function(el, named) {
			var doc = this.getFrameDocument();
			return doc ? Ext.fly(el, named, doc) : null
		},
		getDom : function(el) {
			var d;
			if (!el || !(d = this.getFrameDocument())) {
				return (d = null)
			}
			return Ext.getDom(el, d)
		},
		select : function(selector, unique) {
			var d;
			return (d = this.getFrameDocument()) ? Ext.Element.select(selector,
					unique, d) : d = null
		},
		query : function(selector) {
			var d;
			return (d = this.getFrameDocument()) ? Ext.DomQuery.select(
					selector, d) : null
		},
		removeNode : Ext.removeNode,
		_renderHook : function() {
			this._windowContext = null;
			this.CSS = this.CSS ? this.CSS.destroy() : null;
			this._hooked = false;
			try {
				if (this
						.writeScript('(function(){(window.hostMIF = parent.document.getElementById("'
								+ this.id
								+ '").ownerCt)._windowContext='
								+ (Ext.isIE
										? "window"
										: '{eval:function(s){return new Function("return ("+s+")")();}}')
								+ ";})()")) {
					var w, p = this._frameProxy, D = this.getFrameDocument();
					if (w = this.getWindow()) {
						p
								|| (p = this._frameProxy = this._eventProxy
										.createDelegate(this));
						addListener(w, "focus", p);
						addListener(w, "blur", p);
						addListener(w, "resize", p);
						addListener(w, "unload", p);
						D && addListener(Ext.isIE ? w : D, "scroll", p)
					}
					D && (this.CSS = new Ext.ux.ManagedIFrame.CSS(D))
				}
			} catch (ex) {
			}
			return this.domWritable()
		},
		_unHook : function() {
			if (this._hooked) {
				this._windowContext && (this._windowContext.hostMIF = null);
				this._windowContext = null;
				var w, p = this._frameProxy;
				if (p && this.domWritable() && (w = this.getWindow())) {
					removeListener(w, "focus", p);
					removeListener(w, "blur", p);
					removeListener(w, "resize", p);
					removeListener(w, "unload", p);
					removeListener(Ext.isIE ? w : this.getFrameDocument(),
							"scroll", p)
				}
			}
			ELD.clearDocumentCache && ELD.clearDocumentCache(this.id);
			this.CSS = this.CSS ? this.CSS.destroy() : null;
			this.domFired = this._frameAction = this.domReady = this._hooked = false
		},
		_windowContext : null,
		getFrameDocument : function() {
			var win = this.getWindow(), doc = null;
			try {
				doc = (Ext.isIE && win ? win.document : null)
						|| this.dom.contentDocument
						|| window.frames[this.dom.name].document || null
			} catch (gdEx) {
				ELD.clearDocumentCache && ELD.clearDocumentCache(this.id);
				return false
			}
			doc = (doc && Ext.isFunction(ELD.getDocument)) ? ELD.getDocument(
					doc, true) : doc;
			return doc
		},
		getDoc : function() {
			var D = this.getFrameDocument();
			return Ext.get(D, D)
		},
		getBody : function() {
			var d;
			return (d = this.getFrameDocument()) ? this.get(d.body
					|| d.documentElement) : null
		},
		getDocumentURI : function() {
			var URI, d;
			try {
				URI = this.src && (d = this.getFrameDocument())
						? d.location.href
						: null
			} catch (ex) {
			}
			return URI || (Ext.isFunction(this.src) ? this.src() : this.src)
		},
		getWindowURI : function() {
			var URI, w;
			try {
				URI = (w = this.getWindow()) ? w.location.href : null
			} catch (ex) {
			}
			return URI || (Ext.isFunction(this.src) ? this.src() : this.src)
		},
		getWindow : function() {
			var dom = this.dom, win = null;
			try {
				win = dom.contentWindow || window.frames[dom.name] || null
			} catch (gwEx) {
			}
			return win
		},
		scrollChildIntoView : function(child, container, hscroll) {
			this.fly(child, "_scrollChildIntoView").scrollIntoView(
					this.getDom(container) || this.getBody().dom, hscroll);
			return this
		},
		print : function() {
			try {
				var win;
				if (win = this.getWindow()) {
					Ext.isIE && win.focus();
					win.print()
				}
			} catch (ex) {
				throw new MIF.Error("printexception", ex.description
								|| ex.message || ex)
			}
			return this
		},
		domWritable : function() {
			return !!Ext.isDocument(this.getFrameDocument(), true)
					&& !!this._windowContext
		},
		execScript : function(block, useDOM) {
			try {
				if (this.domWritable()) {
					if (useDOM) {
						this.writeScript(block)
					} else {
						return this._windowContext.eval(block)
					}
				} else {
					throw new MIF.Error("execscript-secure-context")
				}
			} catch (ex) {
				this._observable.fireEvent.call(this._observable, "exception",
						this, ex);
				return false
			}
			return true
		},
		writeScript : function(block, attributes) {
			attributes = Ext.apply({}, attributes || {}, {
						type : "text/javascript",
						text : block
					});
			try {
				var head, script, doc = this.getFrameDocument();
				if (doc && typeof doc.getElementsByTagName != "undefined") {
					if (!(head = doc.getElementsByTagName("head")[0])) {
						head = doc.createElement("head");
						doc.getElementsByTagName("html")[0].appendChild(head)
					}
					if (head && (script = doc.createElement("script"))) {
						for (var attrib in attributes) {
							if (attributes.hasOwnProperty(attrib)
									&& attrib in script) {
								script[attrib] = attributes[attrib]
							}
						}
						return !!head.appendChild(script)
					}
				}
			} catch (ex) {
				this._observable.fireEvent.call(this._observable, "exception",
						this, ex)
			} finally {
				script = head = null
			}
			return false
		},
		loadFunction : function(fn, useDOM, invokeIt) {
			var name = fn.name || fn;
			var fnSrc = fn.fn || window[fn];
			name && fnSrc && this.execScript(name + "=" + fnSrc, useDOM);
			invokeIt && this.execScript(name + "()")
		},
		loadHandler : function(e, target) {
			var rstatus = (this.dom || {}).readyState || (e || {}).type;
			if (this.eventsFollowFrameLinks || this._frameAction
					|| this.isReset) {
				switch (rstatus) {
					case "domready" :
					case "DOMFrameContentLoaded" :
					case "domfail" :
						this._onDocReady(rstatus);
						break;
					case "load" :
					case "complete" :
						this._onDocLoaded(rstatus);
						break;
					case "error" :
						this._observable.fireEvent.apply(this._observable, [
										"exception", this].concat(arguments));
						break;
					default :
				}
				this.frameState = rstatus
			}
		},
		_onDocReady : function(eventName) {
			var w, obv = this._observable, D;
			if (!this.isReset && this.focusOnLoad && (w = this.getWindow())) {
				w.focus()
			}
			obv.fireEvent("_docready", this);
			(D = this.getDoc()) && (D.isReady = true);
			if (!this.domFired && (this._hooked = this._renderHook())) {
				this.domFired = true;
				this.isReset || obv.fireEvent.call(obv, "domready", this)
			}
			this.domReady = true;
			this.hideMask()
		},
		_onDocLoaded : function(eventName) {
			var obv = this._observable, w;
			this.domReady || this._onDocReady("domready");
			obv.fireEvent("_docload", this);
			this.isReset || obv.fireEvent("documentloaded", this);
			this.hideMask(true);
			this._frameAction = this.isReset = false
		},
		checkDOM : function(win) {
			if (Ext.isGecko) {
				return
			}
			var n = 0, frame = this, domReady = false, b, l, d, max = this.domReadyRetries
					|| 2500, polling = false, startLocation = (this
					.getFrameDocument() || {
				location : {}
			}).location.href;
	(function() {
				d = frame.getFrameDocument() || {
					location : {}
				};
				polling = (d.location.href !== startLocation || d.location.href === frame._targetURI);
				if (frame.domReady) {
					return
				}
				domReady = polling
						&& ((b = frame.getBody()) && !!(b.dom.innerHTML || "").length)
						|| false;
				if (d.location.href && !domReady && (++n < max)) {
					setTimeout(arguments.callee, 2);
					return
				}
				frame.loadHandler({
							type : domReady ? "domready" : "domfail"
						})
			})()
		},
		filterEventOptionsRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
		addListener : function(eventName, fn, scope, options) {
			if (typeof eventName == "object") {
				var o = eventName;
				for (var e in o) {
					if (this.filterEventOptionsRe.test(e)) {
						continue
					}
					if (typeof o[e] == "function") {
						this.addListener(e, o[e], o.scope, o)
					} else {
						this.addListener(e, o[e].fn, o[e].scope, o[e])
					}
				}
				return
			}
			if (reSynthEvents.test(eventName)) {
				var O = this._observable;
				if (O) {
					O.events[eventName] || (O.addEvents(eventName));
					O.addListener
							.call(O, eventName, fn, scope || this, options)
				}
			} else {
				ElFrame.superclass.addListener.call(this, eventName, fn, scope
								|| this, options)
			}
			return this
		},
		removeListener : function(eventName, fn, scope) {
			var O = this._observable;
			if (reSynthEvents.test(eventName)) {
				O
						&& O.removeListener.call(O, eventName, fn, scope
										|| this, options)
			} else {
				ElFrame.superclass.removeListener.call(this, eventName, fn,
						scope || this)
			}
			return this
		},
		removeAllListeners : function() {
			Ext.EventManager.removeAll(this.dom);
			var O = this._observable;
			O && O.purgeListeners.call(this._observable);
			return this
		},
		showMask : function(msg, msgCls, maskCls) {
			var lmask = this.loadMask;
			if (lmask && !lmask.disabled) {
				this.mask(msg || lmask.msg, msgCls || lmask.msgCls, maskCls
								|| lmask.maskCls, lmask.maskEl)
			}
		},
		hideMask : function(forced) {
			var tlm = this.loadMask || {};
			if (forced || (tlm.hideOnReady && this.domReady)) {
				this.unmask()
			}
		},
		mask : function(msg, msgCls, maskCls, maskEl) {
			this._mask && this.unmask();
			var p = Ext.get(maskEl) || this.parent(".ux-mif-mask-target")
					|| this.parent();
			if (p.getStyle("position") == "static"
					&& !p.select("iframe,frame,object,embed").elements.length) {
				p.addClass("x-masked-relative")
			}
			p.addClass("x-masked");
			this._mask = Ext.DomHelper.append(p, {
						cls : maskCls || "ux-mif-el-mask"
					}, true);
			this._mask.setDisplayed(true);
			this._mask._agent = p;
			if (typeof msg == "string") {
				this._maskMsg = Ext.DomHelper.append(p, {
							cls : msgCls || "ux-mif-el-mask-msg",
							style : {
								visibility : "hidden"
							},
							cn : {
								tag : "div",
								html : msg
							}
						}, true);
				this._maskMsg.setVisibilityMode(Ext.Element.VISIBILITY)
						.center(p).setVisible(true)
			}
			if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
					&& this.getStyle("height") == "auto") {
				this._mask.setSize(undefined, this._mask.getHeight())
			}
			return this._mask
		},
		unmask : function() {
			var a;
			if (this._mask) {
				(a = this._mask._agent)
						&& a.removeClass(["x-masked-relative", "x-masked"]);
				if (this._maskMsg) {
					this._maskMsg.remove();
					delete this._maskMsg
				}
				this._mask.remove();
				delete this._mask
			}
		},
		createFrameShim : function(imgUrl, shimCls) {
			this.shimCls = shimCls || this.shimCls || "ux-mif-shim";
			this.frameShim
					|| (this.frameShim = this.next("." + this.shimCls)
							|| Ext.DomHelper.append(this.dom.parentNode, {
										tag : "img",
										src : imgUrl || Ext.BLANK_IMAGE_URL,
										cls : this.shimCls,
										galleryimg : "no"
									}, true));
			this.frameShim && (this.frameShim.autoBoxAdjust = false);
			return this.frameShim
		},
		toggleShim : function(show) {
			var shim = this.frameShim || this.createFrameShim();
			var cls = this.shimCls + "-on";
			!show && shim.removeClass(cls);
			show && !shim.hasClass(cls) && shim.addClass(cls)
		},
		load : function(loadCfg) {
			var um;
			if (um = this.getUpdater()) {
				if (loadCfg && loadCfg.renderer) {
					um.setRenderer(loadCfg.renderer);
					delete loadCfg.renderer
				}
				um.update.apply(um, arguments)
			}
			return this
		},
		_eventProxy : function(e) {
			if (!e) {
				return
			}
			e = Ext.EventObject.setEvent(e);
			var be = e.browserEvent || e, er, args = [e.type, this];
			if (!be.eventPhase || (be.eventPhase == (be.AT_TARGET || 2))) {
				if (e.type == "resize") {
					var doc = this.getFrameDocument();
					doc && (args.push({
								height : ELD.getDocumentHeight(doc),
								width : ELD.getDocumentWidth(doc)
							}, {
								height : ELD.getViewportHeight(doc),
								width : ELD.getViewportWidth(doc)
							}, {
								height : ELD.getViewHeight(false, doc),
								width : ELD.getViewWidth(false, doc)
							}))
				}
				er = this._observable ? this._observable.fireEvent.apply(
						this._observable, args.concat(Array.prototype.slice
								.call(arguments, 0))) : null;
				(e.type == "unload") && this._unHook()
			}
			return er
		},
		sendMessage : function(message, tag, origin) {
		},
		postMessage : function(message, ports, origin) {
		}
	});
	ElFrame = Ext.Element.IFRAME = Ext.Element.FRAME = Ext.ux.ManagedIFrame.Element;
	var fp = ElFrame.prototype;
	Ext.override(ElFrame, {
				on : fp.addListener,
				un : fp.removeListener,
				getUpdateManager : fp.getUpdater
			});
	Ext.ux.ManagedIFrame.ComponentAdapter = function() {
	};
	Ext.ux.ManagedIFrame.ComponentAdapter.prototype = {
		version : 2.01,
		defaultSrc : null,
		title : "&#160;",
		unsupportedText : "Inline frames are NOT enabled/supported by your browser.",
		hideMode : !Ext.isIE && !!Ext.ux.plugin.VisibilityMode
				? "nosize"
				: "display",
		animCollapse : Ext.isIE,
		animFloat : Ext.isIE,
		frameConfig : null,
		focusOnLoad : false,
		frameEl : null,
		useShim : false,
		autoScroll : true,
		autoLoad : null,
		getId : function() {
			return this.id
					|| (this.id = "mif-comp-" + (++Ext.Component.AUTO_ID))
		},
		stateEvents : ["documentloaded"],
		stateful : false,
		setAutoScroll : function(auto) {
			var scroll = Ext.value(auto, this.autoScroll === true);
			this.rendered
					&& this.getFrame()
					&& this.frameEl.setOverflow((this.autoScroll = scroll)
							? "auto"
							: "hidden");
			return this
		},
		getContentTarget : function() {
			return this.getFrame()
		},
		getFrame : function() {
			if (this.rendered) {
				if (this.frameEl) {
					return this.frameEl
				}
				var f = this.items && this.items.first
						? this.items.first()
						: null;
				f && (this.frameEl = f.frameEl);
				return this.frameEl
			}
			return null
		},
		getFrameWindow : function() {
			return this.getFrame() ? this.frameEl.getWindow() : null
		},
		getFrameDocument : function() {
			return this.getFrame() ? this.frameEl.getFrameDocument() : null
		},
		getFrameDoc : function() {
			return this.getFrame() ? this.frameEl.getDoc() : null
		},
		getFrameBody : function() {
			return this.getFrame() ? this.frameEl.getBody() : null
		},
		resetFrame : function() {
			this.getFrame()
					&& this.frameEl.reset.apply(this.frameEl, arguments);
			return this
		},
		submitAsTarget : function(submitCfg) {
			this.getFrame()
					&& this.frameEl.submitAsTarget.apply(this.frameEl,
							arguments);
			return this
		},
		load : function(loadCfg) {
			if (loadCfg && this.getFrame()) {
				var args = arguments;
				this.resetFrame(null, function() {
							loadCfg.submitAsTarget ? this.submitAsTarget.apply(
									this, args) : this.frameEl.load.apply(
									this.frameEl, args)
						}, this)
			}
			this.autoLoad = loadCfg;
			return this
		},
		doAutoLoad : function() {
			this.autoLoad
					&& this.load(typeof this.autoLoad == "object"
							? this.autoLoad
							: {
								url : this.autoLoad
							})
		},
		getUpdater : function() {
			return this.getFrame() ? this.frameEl.getUpdater() : null
		},
		setSrc : function(url, discardUrl, callback, scope) {
			this.getFrame()
					&& this.frameEl.setSrc.apply(this.frameEl, arguments);
			return this
		},
		setLocation : function(url, discardUrl, callback, scope) {
			this.getFrame()
					&& this.frameEl.setLocation.apply(this.frameEl, arguments);
			return this
		},
		getState : function() {
			var URI = this.getFrame()
					? this.frameEl.getDocumentURI() || null
					: null;
			var state = this.supr().getState.call(this);
			state = Ext.apply(state || {}, {
						defaultSrc : Ext.isFunction(URI) ? URI() : URI,
						autoLoad : this.autoLoad
					});
			return state
		},
		setMIFEvents : function() {
			this.addEvents("documentloaded", "domready", "exception",
					"message", "blur", "focus", "scroll", "resize", "unload",
					"reset")
		},
		sendMessage : function(message, tag, origin) {
		},
		onAdd : function(C) {
			C.relayTarget && this.suspendEvents(true)
		},
		initRef : function() {
			if (this.ref) {
				var t = this, levels = this.ref.split("/"), l = levels.length, i;
				for (i = 0; i < l; i++) {
					if (t.ownerCt) {
						t = t.ownerCt
					}
				}
				this.refName = levels[--i];
				t[this.refName] || (t[this.refName] = this);
				this.refOwner = t
			}
		}
	};
	Ext.ux.ManagedIFrame.Component = Ext.extend(Ext.BoxComponent, {
		ctype : "Ext.ux.ManagedIFrame.Component",
		initComponent : function() {
			var C = {
				monitorResize : this.monitorResize
						|| (this.monitorResize = !!this.fitToParent),
				plugins : (this.plugins || [])
						.concat(this.hideMode === "nosize"
								&& Ext.ux.plugin.VisibilityMode
								? [new Ext.ux.plugin.VisibilityMode({
											hideMode : "nosize",
											elements : ["bwrap"]
										})]
								: [])
			};
			MIF.Component.superclass.initComponent.call(Ext.apply(this, Ext
							.apply(this.initialConfig, C)));
			this.setMIFEvents()
		},
		onRender : function(ct, position) {
			var frCfg = this.frameCfg || this.frameConfig
					|| (this.relayTarget ? {
						name : this.relayTarget.id
					} : {}) || {};
			var frDOM = frCfg.autoCreate || frCfg;
			frDOM = Ext.apply({
						tag : "iframe",
						id : Ext.id()
					}, frDOM);
			var el = Ext.getDom(this.el);
			(el && el.tagName == "iframe") || (this.autoEl = Ext.apply({
						name : frDOM.id,
						frameborder : 0
					}, frDOM));
			MIF.Component.superclass.onRender.apply(this, arguments);
			if (this.unsupportedText) {
				ct.child("noframes") || ct.createChild({
							tag : "noframes",
							html : this.unsupportedText || null
						})
			}
			var frame = this.el;
			var F;
			if (F = this.frameEl = (this.el
					? new MIF.Element(this.el.dom, true)
					: null)) {
				(F.ownerCt = (this.relayTarget || this)).frameEl = F;
				F.addClass("ux-mif");
				if (this.loadMask) {
					var mEl = this.loadMask.maskEl;
					F.loadMask = Ext.apply({
								disabled : false,
								hideOnReady : false,
								msgCls : "ext-el-mask-msg x-mask-loading",
								maskCls : "ext-el-mask"
							}, {
								maskEl : F.ownerCt[String(mEl)]
										|| F.parent("." + String(mEl))
										|| F.parent(".ux-mif-mask-target")
										|| mEl
							}, Ext.isString(this.loadMask) ? {
								msg : this.loadMask
							} : this.loadMask);
					Ext.get(F.loadMask.maskEl)
							&& Ext.get(F.loadMask.maskEl)
									.addClass("ux-mif-mask-target")
				}
				F.disableMessaging = Ext.value(frCfg.disableMessaging, true);
				F._observable
						&& (this.relayTarget || this).relayEvents(
								F._observable, frameEvents
										.concat(this._msgTagHandlers || []));
				delete this.contentEl
			}
		},
		afterRender : function(container) {
			MIF.Component.superclass.afterRender.apply(this, arguments);
			if (this.fitToParent && !this.ownerCt) {
				var pos = this.getPosition(), size = (Ext.get(this.fitToParent) || this
						.getEl().parent()).getViewSize();
				this.setSize(size.width - pos[0], size.height - pos[1])
			}
			this.getEl().setOverflow("hidden");
			this.setAutoScroll();
			var F;
			if (F = this.frameEl) {
				var ownerCt = this.ownerCt;
				while (ownerCt) {
					ownerCt.on("afterlayout", function(container, layout) {
						Ext.each(["north", "south", "east", "west"], function(
								region) {
							var reg;
							if ((reg = layout[region]) && reg.split
									&& reg.split.dd && !reg._splitTrapped) {
								reg.split.dd.endDrag = reg.split.dd.endDrag
										.createSequence(MIM.hideShims, MIM);
								reg.split
										.on("beforeresize", MIM.showShims, MIM);
								reg._splitTrapped = MIM._splitTrapped = true
							}
						}, this)
					}, this, {
						single : true
					});
					ownerCt = ownerCt.ownerCt
				}
				if (!!this.ownerCt || this.useShim) {
					this.frameShim = F.createFrameShim()
				}
				this.getUpdater().showLoadIndicator = this.showLoadIndicator || false;
				var resumeEvents = this.relayTarget && this.ownerCt
						? this.ownerCt.resumeEvents
								.createDelegate(this.ownerCt)
						: null;
				if (this.autoload) {
					this.doAutoLoad()
				} else {
					if (this.frameMarkup || this.html) {
						F.update(this.frameMarkup || this.html, true,
								resumeEvents);
						delete this.html;
						delete this.frameMarkup;
						return
					} else {
						if (this.defaultSrc) {
							F.setSrc(this.defaultSrc, false)
						} else {
							F.reset(null, resumeEvents);
							return
						}
					}
				}
				resumeEvents && resumeEvents()
			}
		},
		beforeDestroy : function() {
			var F;
			if (F = this.getFrame()) {
				F.remove();
				this.frameEl = this.frameShim = null
			}
			this.relayTarget && (this.relayTarget.frameEl = null);
			MIF.Component.superclass.beforeDestroy.call(this)
		}
	});
	Ext.override(MIF.Component, MIF.ComponentAdapter.prototype);
	Ext.reg("mif", MIF.Component);
	function embed_MIF(config) {
		config || (config = {});
		config.layout = "fit";
		config.items = {
			xtype : "mif",
			ref : "mifChild",
			useShim : true,
			autoScroll : Ext.value(config.autoScroll, this.autoScroll),
			defaultSrc : Ext.value(config.defaultSrc, this.defaultSrc),
			frameMarkup : Ext.value(config.html, this.html),
			loadMask : Ext.value(config.loadMask, this.loadMask),
			focusOnLoad : Ext.value(config.focusOnLoad, this.focusOnLoad),
			frameConfig : Ext.value(config.frameConfig || config.frameCfg,
					this.frameConfig),
			relayTarget : this
		};
		delete config.html;
		this.setMIFEvents();
		return config
	}
	Ext.ux.ManagedIFrame.Panel = Ext.extend(Ext.Panel, {
				ctype : "Ext.ux.ManagedIFrame.Panel",
				bodyCssClass : "ux-mif-mask-target",
				constructor : function(config) {
					MIF.Panel.superclass.constructor.call(this, embed_MIF.call(
									this, config))
				}
			});
	Ext.override(MIF.Panel, MIF.ComponentAdapter.prototype);
	Ext.reg("iframepanel", MIF.Panel);
	Ext.ux.ManagedIFrame.Portlet = Ext.extend(Ext.ux.ManagedIFrame.Panel, {
				ctype : "Ext.ux.ManagedIFrame.Portlet",
				anchor : "100%",
				frame : true,
				collapseEl : "bwrap",
				collapsible : true,
				draggable : true,
				cls : "x-portlet"
			});
	Ext.reg("iframeportlet", MIF.Portlet);
	Ext.ux.ManagedIFrame.Window = Ext.extend(Ext.Window, {
				ctype : "Ext.ux.ManagedIFrame.Window",
				bodyCssClass : "ux-mif-mask-target",
				constructor : function(config) {
					MIF.Window.superclass.constructor.call(this, embed_MIF
									.call(this, config))
				}
			});
	Ext.override(MIF.Window, MIF.ComponentAdapter.prototype);
	Ext.reg("iframewindow", MIF.Window);
	Ext.ux.ManagedIFrame.Updater = Ext.extend(Ext.Updater, {
				showLoading : function() {
					this.showLoadIndicator && this.el
							&& this.el.mask(this.indicatorText)
				},
				hideLoading : function() {
					this.showLoadIndicator && this.el && this.el.unmask()
				},
				updateComplete : function(response) {
					MIF.Updater.superclass.updateComplete
							.apply(this, arguments);
					this.hideLoading()
				},
				processFailure : function(response) {
					MIF.Updater.superclass.processFailure
							.apply(this, arguments);
					this.hideLoading()
				}
			});
	var styleCamelRe = /(-[a-z])/gi;
	var styleCamelFn = function(m, a) {
		return a.charAt(1).toUpperCase()
	};
	Ext.ux.ManagedIFrame.CSS = function(hostDocument) {
		var doc;
		if (hostDocument) {
			doc = hostDocument;
			return {
				rules : null,
				destroy : function() {
					return doc = null
				},
				createStyleSheet : function(cssText, id) {
					var ss;
					if (!doc) {
						return
					}
					var head = doc.getElementsByTagName("head")[0];
					var rules = doc.createElement("style");
					rules.setAttribute("type", "text/css");
					Ext.isString(id) && rules.setAttribute("id", id);
					if (Ext.isIE) {
						head.appendChild(rules);
						ss = rules.styleSheet;
						ss.cssText = cssText
					} else {
						try {
							rules.appendChild(doc.createTextNode(cssText))
						} catch (e) {
							rules.cssText = cssText
						}
						head.appendChild(rules);
						ss = rules.styleSheet
								? rules.styleSheet
								: (rules.sheet || doc.styleSheets[doc.styleSheets.length
										- 1])
					}
					this.cacheStyleSheet(ss);
					return ss
				},
				removeStyleSheet : function(id) {
					if (!doc || !id) {
						return
					}
					var existing = doc.getElementById(id);
					if (existing) {
						existing.parentNode.removeChild(existing)
					}
				},
				swapStyleSheet : function(id, url) {
					if (!doc) {
						return
					}
					this.removeStyleSheet(id);
					var ss = doc.createElement("link");
					ss.setAttribute("rel", "stylesheet");
					ss.setAttribute("type", "text/css");
					Ext.isString(id) && ss.setAttribute("id", id);
					ss.setAttribute("href", url);
					doc.getElementsByTagName("head")[0].appendChild(ss)
				},
				refreshCache : function() {
					return this.getRules(true)
				},
				cacheStyleSheet : function(ss, media) {
					this.rules || (this.rules = {});
					try {
						Ext.each(ss.cssRules || ss.rules || [], function(rule) {
									this.hashRule(rule, ss, media)
								}, this);
						Ext.each(ss.imports || [], function(sheet) {
									sheet
											&& this
													.cacheStyleSheet(
															sheet,
															this
																	.resolveMedia([
																			sheet,
																			sheet.parentStyleSheet]))
								}, this)
					} catch (e) {
					}
				},
				hashRule : function(rule, sheet, mediaOverride) {
					var mediaSelector = mediaOverride
							|| this.resolveMedia(rule);
					if (rule.cssRules || rule.rules) {
						this.cacheStyleSheet(rule, this.resolveMedia([rule,
										rule.parentRule]))
					}
					if (rule.styleSheet) {
						this.cacheStyleSheet(rule.styleSheet, this
										.resolveMedia([rule, rule.ownerRule,
												rule.parentStyleSheet]))
					}
					rule.selectorText
							&& Ext.each((mediaSelector || "").split(","),
									function(media) {
										this.rules[((media
												? media.trim() + ":"
												: "") + rule.selectorText)
												.toLowerCase()] = rule
									}, this)
				},
				resolveMedia : function(rule) {
					var media;
					Ext.each([].concat(rule), function(r) {
								if (r && r.media && r.media.length) {
									media = r.media;
									return false
								}
							});
					return media
							? (Ext.isIE ? String(media) : media.mediaText)
							: ""
				},
				getRules : function(refreshCache) {
					if (!this.rules || refreshCache) {
						this.rules = {};
						if (doc) {
							var ds = doc.styleSheets;
							for (var i = 0, len = ds.length; i < len; i++) {
								try {
									this.cacheStyleSheet(ds[i])
								} catch (e) {
								}
							}
						}
					}
					return this.rules
				},
				getRule : function(selector, refreshCache, mediaSelector) {
					var rs = this.getRules(refreshCache);
					if (Ext.type(mediaSelector) == "string") {
						mediaSelector = mediaSelector.trim() + ":"
					} else {
						mediaSelector = ""
					}
					if (!Ext.isArray(selector)) {
						return rs[(mediaSelector + selector).toLowerCase()]
					}
					var select;
					for (var i = 0; i < selector.length; i++) {
						select = (mediaSelector + selector[i]).toLowerCase();
						if (rs[select]) {
							return rs[select]
						}
					}
					return null
				},
				updateRule : function(selector, property, value, mediaSelector) {
					Ext.each((mediaSelector || "").split(","), function(
							mediaSelect) {
						if (!Ext.isArray(selector)) {
							var rule = this.getRule(selector, false,
									mediaSelect);
							if (rule) {
								rule.style[property.replace(camelRe, camelFn)] = value;
								return true
							}
						} else {
							for (var i = 0; i < selector.length; i++) {
								if (this.updateRule(selector[i], property,
										value, mediaSelect)) {
									return true
								}
							}
						}
						return false
					}, this)
				}
			}
		}
	};
	Ext.ux.ManagedIFrame.Manager = function() {
		var frames = {};
		var implementation = {
			_DOMFrameReadyHandler : function(e) {
				try {
					var $frame;
					if ($frame = e.target.ownerCt) {
						$frame.loadHandler.call($frame, e)
					}
				} catch (rhEx) {
				}
			},
			shimCls : "ux-mif-shim",
			register : function(frame) {
				frame.manager = this;
				frames[frame.id] = frames[frame.name] = {
					ref : frame
				};
				return frame
			},
			deRegister : function(frame) {
				delete frames[frame.id];
				delete frames[frame.name]
			},
			hideShims : function() {
				var mm = MIF.Manager;
				mm.shimsApplied
						&& Ext.select("." + mm.shimCls, true)
								.removeClass(mm.shimCls + "-on");
				mm.shimsApplied = false
			},
			showShims : function() {
				var mm = MIF.Manager;
				!mm.shimsApplied
						&& Ext.select("." + mm.shimCls, true)
								.addClass(mm.shimCls + "-on");
				mm.shimsApplied = true
			},
			getFrameById : function(id) {
				return typeof id == "string" ? (frames[id] ? frames[id].ref
						|| null : null) : null
			},
			getFrameByName : function(name) {
				return this.getFrameById(name)
			},
			getFrameHash : function(frame) {
				return frames[frame.id] || frames[frame.id] || null
			},
			destroy : function() {
				if (document.addEventListener && !Ext.isOpera) {
					window.removeEventListener("DOMFrameContentLoaded",
							this._DOMFrameReadyHandler, false)
				}
			}
		};
		document.addEventListener
				&& !Ext.isOpera
				&& window.addEventListener("DOMFrameContentLoaded",
						implementation._DOMFrameReadyHandler, false);
		Ext.EventManager.on(window, "beforeunload", implementation.destroy,
				implementation);
		return implementation
	}();
	MIM = MIF.Manager;
	MIM.showDragMask = MIM.showShims;
	MIM.hideDragMask = MIM.hideShims;
	var winDD = Ext.Window.DD;
	Ext.override(winDD, {
				startDrag : winDD.prototype.startDrag
						.createInterceptor(MIM.showShims),
				endDrag : winDD.prototype.endDrag
						.createInterceptor(MIM.hideShims)
			});
	Ext.ux.ManagedIFramePanel = MIF.Panel;
	Ext.ux.ManagedIFramePortlet = MIF.Portlet;
	Ext.ux.ManagedIframe = function(el, opt) {
		var args = Array.prototype.slice.call(arguments, 0), el = Ext
				.get(args[0]), config = args[0];
		if (el && el.dom && el.dom.tagName == "IFRAME") {
			config = args[1] || {}
		} else {
			config = args[0] || args[1] || {};
			el = config.autoCreate ? Ext.get(Ext.DomHelper.append(
					config.autoCreate.parent || Ext.getBody(), Ext.apply({
								tag : "iframe",
								frameborder : 0,
								cls : "x-mif",
								src : (Ext.isIE && Ext.isSecure)
										? Ext.SSL_SECURE_URL
										: "about:blank"
							}, config.autoCreate))) : null;
			if (el && config.unsupportedText) {
				Ext.DomHelper.append(el.dom.parentNode, {
							tag : "noframes",
							html : config.unsupportedText
						})
			}
		}
		var mif = new MIF.Element(el, true);
		if (mif) {
			Ext.apply(mif, {
						disableMessaging : Ext.value(config.disableMessaging,
								true),
						loadMask : !!config.loadMask ? Ext.apply({
									msg : "Loading..",
									msgCls : "x-mask-loading",
									maskEl : null,
									hideOnReady : false,
									disabled : false
								}, config.loadMask) : false,
						_windowContext : null,
						eventsFollowFrameLinks : Ext.value(
								config.eventsFollowFrameLinks, true)
					});
			config.listeners && mif.on(config.listeners);
			if (!!config.html) {
				mif.update(config.html)
			} else {
				!!config.src && mif.setSrc(config.src)
			}
		}
		return mif
	};
	Ext.ux.ManagedIFrame.Error = Ext.extend(Ext.Error, {
				constructor : function(message, arg) {
					this.arg = arg;
					Ext.Error.call(this, message)
				},
				name : "Ext.ux.ManagedIFrame"
			});
	Ext.apply(Ext.ux.ManagedIFrame.Error.prototype, {
		lang : {
			"documentcontext-remove" : "An attempt was made to remove an Element from the wrong document context.",
			"execscript-secure-context" : "An attempt was made at script execution within a document context with limited access permissions.",
			printexception : "An Error was encountered attempting the print the frame contents (document access is likely restricted)."
		}
	});
	Ext.onReady(function() {
		var CSS = new Ext.ux.ManagedIFrame.CSS(document), rules = [];
		CSS.getRule(".ux-mif-fill")
				|| (rules.push(".ux-mif-fill{height:100%;width:100%;}"));
		CSS.getRule(".ux-mif-mask-target")
				|| (rules
						.push(".ux-mif-mask-target{position:relative;zoom:1;}"));
		CSS.getRule(".ux-mif-el-mask")
				|| (rules
						.push(
								".ux-mif-el-mask {z-index: 100;position: absolute;top:0;left:0;-moz-opacity: 0.5;opacity: .50;*filter: alpha(opacity=50);width: 100%;height: 100%;zoom: 1;} ",
								".ux-mif-el-mask-msg {z-index: 1;position: absolute;top: 0;left: 0;border:1px solid;background:repeat-x 0 -16px;padding:2px;} ",
								".ux-mif-el-mask-msg div {padding:5px 10px 5px 10px;border:1px solid;cursor:wait;} "));
		if (!CSS.getRule(".ux-mif-shim")) {
			rules
					.push(".ux-mif-shim {z-index:8500;position:absolute;top:0px;left:0px;background:transparent!important;overflow:hidden;display:none;}");
			rules
					.push(".ux-mif-shim-on{width:100%;height:100%;display:block;zoom:1;}");
			rules
					.push(".ext-ie6 .ux-mif-shim{margin-left:5px;margin-top:3px;}")
		}
		!!rules.length && CSS.createStyleSheet(rules.join(" "), "mifCSS")
	});
	Ext.provide && Ext.provide("mif")
})();