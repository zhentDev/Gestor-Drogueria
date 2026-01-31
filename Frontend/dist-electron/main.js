import Wt, { app as fi, BrowserWindow as Th, ipcMain as mv } from "electron";
import { fileURLToPath as gv } from "node:url";
import Ft from "node:path";
import pt from "fs";
import pe from "path";
import vv from "https";
import zr from "stream";
import Ml from "events";
import _v from "buffer";
import xn from "util";
import yv from "constants";
import Ah from "assert";
import co, { fork as wv } from "child_process";
import ki from "crypto";
import Ch from "tty";
import fo from "os";
import vr from "url";
import Ev from "string_decoder";
import xh from "zlib";
import bv from "http";
var se = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Oe = {}, Rh = {}, Oh = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.changePermissions = e.downloadFile = e.getPath = void 0;
  const t = Wt, r = pt, n = pe, i = vv, a = () => {
    const f = t.app.getPath("userData");
    return n.resolve(`${f}/extensions`);
  };
  e.getPath = a;
  const o = t.net ? t.net.request : i.get, s = (f, l) => new Promise((m, d) => {
    const p = o(f);
    p.on("response", (_) => {
      if (_.statusCode && _.statusCode >= 300 && _.statusCode < 400 && _.headers.location)
        return (0, e.downloadFile)(_.headers.location, l).then(m).catch(d);
      _.pipe(r.createWriteStream(l)).on("close", m), _.on("error", d);
    }), p.on("error", d), p.end();
  });
  e.downloadFile = s;
  const u = (f, l) => {
    r.readdirSync(f).forEach((d) => {
      const p = n.join(f, d);
      r.chmodSync(p, parseInt(`${l}`, 8)), r.statSync(p).isDirectory() && (0, e.changePermissions)(p, l);
    });
  };
  e.changePermissions = u;
})(Oh);
var Rn = {}, Qo = {}, xe = {}, sa = { exports: {} }, la = { exports: {} }, rc;
function ho() {
  if (rc) return la.exports;
  rc = 1, typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? la.exports = { nextTick: e } : la.exports = process;
  function e(t, r, n, i) {
    if (typeof t != "function")
      throw new TypeError('"callback" argument must be a function');
    var a = arguments.length, o, s;
    switch (a) {
      case 0:
      case 1:
        return process.nextTick(t);
      case 2:
        return process.nextTick(function() {
          t.call(null, r);
        });
      case 3:
        return process.nextTick(function() {
          t.call(null, r, n);
        });
      case 4:
        return process.nextTick(function() {
          t.call(null, r, n, i);
        });
      default:
        for (o = new Array(a - 1), s = 0; s < o.length; )
          o[s++] = arguments[s];
        return process.nextTick(function() {
          t.apply(null, o);
        });
    }
  }
  return la.exports;
}
var es, nc;
function Sv() {
  if (nc) return es;
  nc = 1;
  var e = {}.toString;
  return es = Array.isArray || function(t) {
    return e.call(t) == "[object Array]";
  }, es;
}
var ts, ic;
function Ih() {
  return ic || (ic = 1, ts = zr), ts;
}
var ua = { exports: {} }, ac;
function po() {
  return ac || (ac = 1, function(e, t) {
    var r = _v, n = r.Buffer;
    function i(o, s) {
      for (var u in o)
        s[u] = o[u];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = r : (i(r, t), t.Buffer = a);
    function a(o, s, u) {
      return n(o, s, u);
    }
    i(n, a), a.from = function(o, s, u) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return n(o, s, u);
    }, a.alloc = function(o, s, u) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var f = n(o);
      return s !== void 0 ? typeof u == "string" ? f.fill(s, u) : f.fill(s) : f.fill(0), f;
    }, a.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return n(o);
    }, a.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r.SlowBuffer(o);
    };
  }(ua, ua.exports)), ua.exports;
}
var Pe = {}, oc;
function Di() {
  if (oc) return Pe;
  oc = 1;
  function e(g) {
    return Array.isArray ? Array.isArray(g) : _(g) === "[object Array]";
  }
  Pe.isArray = e;
  function t(g) {
    return typeof g == "boolean";
  }
  Pe.isBoolean = t;
  function r(g) {
    return g === null;
  }
  Pe.isNull = r;
  function n(g) {
    return g == null;
  }
  Pe.isNullOrUndefined = n;
  function i(g) {
    return typeof g == "number";
  }
  Pe.isNumber = i;
  function a(g) {
    return typeof g == "string";
  }
  Pe.isString = a;
  function o(g) {
    return typeof g == "symbol";
  }
  Pe.isSymbol = o;
  function s(g) {
    return g === void 0;
  }
  Pe.isUndefined = s;
  function u(g) {
    return _(g) === "[object RegExp]";
  }
  Pe.isRegExp = u;
  function f(g) {
    return typeof g == "object" && g !== null;
  }
  Pe.isObject = f;
  function l(g) {
    return _(g) === "[object Date]";
  }
  Pe.isDate = l;
  function m(g) {
    return _(g) === "[object Error]" || g instanceof Error;
  }
  Pe.isError = m;
  function d(g) {
    return typeof g == "function";
  }
  Pe.isFunction = d;
  function p(g) {
    return g === null || typeof g == "boolean" || typeof g == "number" || typeof g == "string" || typeof g == "symbol" || // ES6 symbol
    typeof g > "u";
  }
  Pe.isPrimitive = p, Pe.isBuffer = Buffer.isBuffer;
  function _(g) {
    return Object.prototype.toString.call(g);
  }
  return Pe;
}
var ca = { exports: {} }, fa = { exports: {} }, sc;
function Tv() {
  return sc || (sc = 1, typeof Object.create == "function" ? fa.exports = function(t, r) {
    r && (t.super_ = r, t.prototype = Object.create(r.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : fa.exports = function(t, r) {
    if (r) {
      t.super_ = r;
      var n = function() {
      };
      n.prototype = r.prototype, t.prototype = new n(), t.prototype.constructor = t;
    }
  }), fa.exports;
}
var lc;
function Ni() {
  if (lc) return ca.exports;
  lc = 1;
  try {
    var e = require("util");
    if (typeof e.inherits != "function") throw "";
    ca.exports = e.inherits;
  } catch {
    ca.exports = Tv();
  }
  return ca.exports;
}
var rs = { exports: {} }, uc;
function Av() {
  return uc || (uc = 1, function(e) {
    function t(a, o) {
      if (!(a instanceof o))
        throw new TypeError("Cannot call a class as a function");
    }
    var r = po().Buffer, n = xn;
    function i(a, o, s) {
      a.copy(o, s);
    }
    e.exports = function() {
      function a() {
        t(this, a), this.head = null, this.tail = null, this.length = 0;
      }
      return a.prototype.push = function(s) {
        var u = { data: s, next: null };
        this.length > 0 ? this.tail.next = u : this.head = u, this.tail = u, ++this.length;
      }, a.prototype.unshift = function(s) {
        var u = { data: s, next: this.head };
        this.length === 0 && (this.tail = u), this.head = u, ++this.length;
      }, a.prototype.shift = function() {
        if (this.length !== 0) {
          var s = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, s;
        }
      }, a.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, a.prototype.join = function(s) {
        if (this.length === 0) return "";
        for (var u = this.head, f = "" + u.data; u = u.next; )
          f += s + u.data;
        return f;
      }, a.prototype.concat = function(s) {
        if (this.length === 0) return r.alloc(0);
        for (var u = r.allocUnsafe(s >>> 0), f = this.head, l = 0; f; )
          i(f.data, u, l), l += f.data.length, f = f.next;
        return u;
      }, a;
    }(), n && n.inspect && n.inspect.custom && (e.exports.prototype[n.inspect.custom] = function() {
      var a = n.inspect({ length: this.length });
      return this.constructor.name + " " + a;
    });
  }(rs)), rs.exports;
}
var ns, cc;
function $h() {
  if (cc) return ns;
  cc = 1;
  var e = ho();
  function t(i, a) {
    var o = this, s = this._readableState && this._readableState.destroyed, u = this._writableState && this._writableState.destroyed;
    return s || u ? (a ? a(i) : i && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, e.nextTick(n, this, i)) : e.nextTick(n, this, i)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(i || null, function(f) {
      !a && f ? o._writableState ? o._writableState.errorEmitted || (o._writableState.errorEmitted = !0, e.nextTick(n, o, f)) : e.nextTick(n, o, f) : a && a(f);
    }), this);
  }
  function r() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function n(i, a) {
    i.emit("error", a);
  }
  return ns = {
    destroy: t,
    undestroy: r
  }, ns;
}
var is, fc;
function Cv() {
  return fc || (fc = 1, is = xn.deprecate), is;
}
var as, dc;
function kh() {
  if (dc) return as;
  dc = 1;
  var e = ho();
  as = g;
  function t(S) {
    var C = this;
    this.next = null, this.entry = null, this.finish = function() {
      M(C, S);
    };
  }
  var r = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : e.nextTick, n;
  g.WritableState = p;
  var i = Object.create(Di());
  i.inherits = Ni();
  var a = {
    deprecate: Cv()
  }, o = Ih(), s = po().Buffer, u = (typeof se < "u" ? se : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function f(S) {
    return s.from(S);
  }
  function l(S) {
    return s.isBuffer(S) || S instanceof u;
  }
  var m = $h();
  i.inherits(g, o);
  function d() {
  }
  function p(S, C) {
    n = n || bn(), S = S || {};
    var I = C instanceof n;
    this.objectMode = !!S.objectMode, I && (this.objectMode = this.objectMode || !!S.writableObjectMode);
    var U = S.highWaterMark, W = S.writableHighWaterMark, V = this.objectMode ? 16 : 16 * 1024;
    U || U === 0 ? this.highWaterMark = U : I && (W || W === 0) ? this.highWaterMark = W : this.highWaterMark = V, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var te = S.decodeStrings === !1;
    this.decodeStrings = !te, this.defaultEncoding = S.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ae) {
      B(C, ae);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new t(this);
  }
  p.prototype.getBuffer = function() {
    for (var C = this.bufferedRequest, I = []; C; )
      I.push(C), C = C.next;
    return I;
  }, function() {
    try {
      Object.defineProperty(p.prototype, "buffer", {
        get: a.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var _;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (_ = Function.prototype[Symbol.hasInstance], Object.defineProperty(g, Symbol.hasInstance, {
    value: function(S) {
      return _.call(this, S) ? !0 : this !== g ? !1 : S && S._writableState instanceof p;
    }
  })) : _ = function(S) {
    return S instanceof this;
  };
  function g(S) {
    if (n = n || bn(), !_.call(g, this) && !(this instanceof n))
      return new g(S);
    this._writableState = new p(S, this), this.writable = !0, S && (typeof S.write == "function" && (this._write = S.write), typeof S.writev == "function" && (this._writev = S.writev), typeof S.destroy == "function" && (this._destroy = S.destroy), typeof S.final == "function" && (this._final = S.final)), o.call(this);
  }
  g.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function b(S, C) {
    var I = new Error("write after end");
    S.emit("error", I), e.nextTick(C, I);
  }
  function v(S, C, I, U) {
    var W = !0, V = !1;
    return I === null ? V = new TypeError("May not write null values to stream") : typeof I != "string" && I !== void 0 && !C.objectMode && (V = new TypeError("Invalid non-string/buffer chunk")), V && (S.emit("error", V), e.nextTick(U, V), W = !1), W;
  }
  g.prototype.write = function(S, C, I) {
    var U = this._writableState, W = !1, V = !U.objectMode && l(S);
    return V && !s.isBuffer(S) && (S = f(S)), typeof C == "function" && (I = C, C = null), V ? C = "buffer" : C || (C = U.defaultEncoding), typeof I != "function" && (I = d), U.ended ? b(this, I) : (V || v(this, U, S, I)) && (U.pendingcb++, W = A(this, U, V, S, C, I)), W;
  }, g.prototype.cork = function() {
    var S = this._writableState;
    S.corked++;
  }, g.prototype.uncork = function() {
    var S = this._writableState;
    S.corked && (S.corked--, !S.writing && !S.corked && !S.bufferProcessing && S.bufferedRequest && q(this, S));
  }, g.prototype.setDefaultEncoding = function(C) {
    if (typeof C == "string" && (C = C.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((C + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + C);
    return this._writableState.defaultEncoding = C, this;
  };
  function y(S, C, I) {
    return !S.objectMode && S.decodeStrings !== !1 && typeof C == "string" && (C = s.from(C, I)), C;
  }
  Object.defineProperty(g.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function A(S, C, I, U, W, V) {
    if (!I) {
      var te = y(C, U, W);
      U !== te && (I = !0, W = "buffer", U = te);
    }
    var ae = C.objectMode ? 1 : U.length;
    C.length += ae;
    var J = C.length < C.highWaterMark;
    if (J || (C.needDrain = !0), C.writing || C.corked) {
      var fe = C.lastBufferedRequest;
      C.lastBufferedRequest = {
        chunk: U,
        encoding: W,
        isBuf: I,
        callback: V,
        next: null
      }, fe ? fe.next = C.lastBufferedRequest : C.bufferedRequest = C.lastBufferedRequest, C.bufferedRequestCount += 1;
    } else
      R(S, C, !1, ae, U, W, V);
    return J;
  }
  function R(S, C, I, U, W, V, te) {
    C.writelen = U, C.writecb = te, C.writing = !0, C.sync = !0, I ? S._writev(W, C.onwrite) : S._write(W, V, C.onwrite), C.sync = !1;
  }
  function $(S, C, I, U, W) {
    --C.pendingcb, I ? (e.nextTick(W, U), e.nextTick(D, S, C), S._writableState.errorEmitted = !0, S.emit("error", U)) : (W(U), S._writableState.errorEmitted = !0, S.emit("error", U), D(S, C));
  }
  function j(S) {
    S.writing = !1, S.writecb = null, S.length -= S.writelen, S.writelen = 0;
  }
  function B(S, C) {
    var I = S._writableState, U = I.sync, W = I.writecb;
    if (j(I), C) $(S, I, U, C, W);
    else {
      var V = N(I);
      !V && !I.corked && !I.bufferProcessing && I.bufferedRequest && q(S, I), U ? r(z, S, I, V, W) : z(S, I, V, W);
    }
  }
  function z(S, C, I, U) {
    I || E(S, C), C.pendingcb--, U(), D(S, C);
  }
  function E(S, C) {
    C.length === 0 && C.needDrain && (C.needDrain = !1, S.emit("drain"));
  }
  function q(S, C) {
    C.bufferProcessing = !0;
    var I = C.bufferedRequest;
    if (S._writev && I && I.next) {
      var U = C.bufferedRequestCount, W = new Array(U), V = C.corkedRequestsFree;
      V.entry = I;
      for (var te = 0, ae = !0; I; )
        W[te] = I, I.isBuf || (ae = !1), I = I.next, te += 1;
      W.allBuffers = ae, R(S, C, !0, C.length, W, "", V.finish), C.pendingcb++, C.lastBufferedRequest = null, V.next ? (C.corkedRequestsFree = V.next, V.next = null) : C.corkedRequestsFree = new t(C), C.bufferedRequestCount = 0;
    } else {
      for (; I; ) {
        var J = I.chunk, fe = I.encoding, h = I.callback, c = C.objectMode ? 1 : J.length;
        if (R(S, C, !1, c, J, fe, h), I = I.next, C.bufferedRequestCount--, C.writing)
          break;
      }
      I === null && (C.lastBufferedRequest = null);
    }
    C.bufferedRequest = I, C.bufferProcessing = !1;
  }
  g.prototype._write = function(S, C, I) {
    I(new Error("_write() is not implemented"));
  }, g.prototype._writev = null, g.prototype.end = function(S, C, I) {
    var U = this._writableState;
    typeof S == "function" ? (I = S, S = null, C = null) : typeof C == "function" && (I = C, C = null), S != null && this.write(S, C), U.corked && (U.corked = 1, this.uncork()), U.ending || P(this, U, I);
  };
  function N(S) {
    return S.ending && S.length === 0 && S.bufferedRequest === null && !S.finished && !S.writing;
  }
  function Y(S, C) {
    S._final(function(I) {
      C.pendingcb--, I && S.emit("error", I), C.prefinished = !0, S.emit("prefinish"), D(S, C);
    });
  }
  function re(S, C) {
    !C.prefinished && !C.finalCalled && (typeof S._final == "function" ? (C.pendingcb++, C.finalCalled = !0, e.nextTick(Y, S, C)) : (C.prefinished = !0, S.emit("prefinish")));
  }
  function D(S, C) {
    var I = N(C);
    return I && (re(S, C), C.pendingcb === 0 && (C.finished = !0, S.emit("finish"))), I;
  }
  function P(S, C, I) {
    C.ending = !0, D(S, C), I && (C.finished ? e.nextTick(I) : S.once("finish", I)), C.ended = !0, S.writable = !1;
  }
  function M(S, C, I) {
    var U = S.entry;
    for (S.entry = null; U; ) {
      var W = U.callback;
      C.pendingcb--, W(I), U = U.next;
    }
    C.corkedRequestsFree.next = S;
  }
  return Object.defineProperty(g.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(S) {
      this._writableState && (this._writableState.destroyed = S);
    }
  }), g.prototype.destroy = m.destroy, g.prototype._undestroy = m.undestroy, g.prototype._destroy = function(S, C) {
    this.end(), C(S);
  }, as;
}
var os, hc;
function bn() {
  if (hc) return os;
  hc = 1;
  var e = ho(), t = Object.keys || function(m) {
    var d = [];
    for (var p in m)
      d.push(p);
    return d;
  };
  os = u;
  var r = Object.create(Di());
  r.inherits = Ni();
  var n = Dh(), i = kh();
  r.inherits(u, n);
  for (var a = t(i.prototype), o = 0; o < a.length; o++) {
    var s = a[o];
    u.prototype[s] || (u.prototype[s] = i.prototype[s]);
  }
  function u(m) {
    if (!(this instanceof u)) return new u(m);
    n.call(this, m), i.call(this, m), m && m.readable === !1 && (this.readable = !1), m && m.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, m && m.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", f);
  }
  Object.defineProperty(u.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function f() {
    this.allowHalfOpen || this._writableState.ended || e.nextTick(l, this);
  }
  function l(m) {
    m.end();
  }
  return Object.defineProperty(u.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(m) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = m, this._writableState.destroyed = m);
    }
  }), u.prototype._destroy = function(m, d) {
    this.push(null), this.end(), e.nextTick(d, m);
  }, os;
}
var ss = {}, pc;
function mc() {
  if (pc) return ss;
  pc = 1;
  var e = po().Buffer, t = e.isEncoding || function(v) {
    switch (v = "" + v, v && v.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function r(v) {
    if (!v) return "utf8";
    for (var y; ; )
      switch (v) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return v;
        default:
          if (y) return;
          v = ("" + v).toLowerCase(), y = !0;
      }
  }
  function n(v) {
    var y = r(v);
    if (typeof y != "string" && (e.isEncoding === t || !t(v))) throw new Error("Unknown encoding: " + v);
    return y || v;
  }
  ss.StringDecoder = i;
  function i(v) {
    this.encoding = n(v);
    var y;
    switch (this.encoding) {
      case "utf16le":
        this.text = m, this.end = d, y = 4;
        break;
      case "utf8":
        this.fillLast = u, y = 4;
        break;
      case "base64":
        this.text = p, this.end = _, y = 3;
        break;
      default:
        this.write = g, this.end = b;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = e.allocUnsafe(y);
  }
  i.prototype.write = function(v) {
    if (v.length === 0) return "";
    var y, A;
    if (this.lastNeed) {
      if (y = this.fillLast(v), y === void 0) return "";
      A = this.lastNeed, this.lastNeed = 0;
    } else
      A = 0;
    return A < v.length ? y ? y + this.text(v, A) : this.text(v, A) : y || "";
  }, i.prototype.end = l, i.prototype.text = f, i.prototype.fillLast = function(v) {
    if (this.lastNeed <= v.length)
      return v.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    v.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, v.length), this.lastNeed -= v.length;
  };
  function a(v) {
    return v <= 127 ? 0 : v >> 5 === 6 ? 2 : v >> 4 === 14 ? 3 : v >> 3 === 30 ? 4 : v >> 6 === 2 ? -1 : -2;
  }
  function o(v, y, A) {
    var R = y.length - 1;
    if (R < A) return 0;
    var $ = a(y[R]);
    return $ >= 0 ? ($ > 0 && (v.lastNeed = $ - 1), $) : --R < A || $ === -2 ? 0 : ($ = a(y[R]), $ >= 0 ? ($ > 0 && (v.lastNeed = $ - 2), $) : --R < A || $ === -2 ? 0 : ($ = a(y[R]), $ >= 0 ? ($ > 0 && ($ === 2 ? $ = 0 : v.lastNeed = $ - 3), $) : 0));
  }
  function s(v, y, A) {
    if ((y[0] & 192) !== 128)
      return v.lastNeed = 0, "�";
    if (v.lastNeed > 1 && y.length > 1) {
      if ((y[1] & 192) !== 128)
        return v.lastNeed = 1, "�";
      if (v.lastNeed > 2 && y.length > 2 && (y[2] & 192) !== 128)
        return v.lastNeed = 2, "�";
    }
  }
  function u(v) {
    var y = this.lastTotal - this.lastNeed, A = s(this, v);
    if (A !== void 0) return A;
    if (this.lastNeed <= v.length)
      return v.copy(this.lastChar, y, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    v.copy(this.lastChar, y, 0, v.length), this.lastNeed -= v.length;
  }
  function f(v, y) {
    var A = o(this, v, y);
    if (!this.lastNeed) return v.toString("utf8", y);
    this.lastTotal = A;
    var R = v.length - (A - this.lastNeed);
    return v.copy(this.lastChar, 0, R), v.toString("utf8", y, R);
  }
  function l(v) {
    var y = v && v.length ? this.write(v) : "";
    return this.lastNeed ? y + "�" : y;
  }
  function m(v, y) {
    if ((v.length - y) % 2 === 0) {
      var A = v.toString("utf16le", y);
      if (A) {
        var R = A.charCodeAt(A.length - 1);
        if (R >= 55296 && R <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = v[v.length - 2], this.lastChar[1] = v[v.length - 1], A.slice(0, -1);
      }
      return A;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = v[v.length - 1], v.toString("utf16le", y, v.length - 1);
  }
  function d(v) {
    var y = v && v.length ? this.write(v) : "";
    if (this.lastNeed) {
      var A = this.lastTotal - this.lastNeed;
      return y + this.lastChar.toString("utf16le", 0, A);
    }
    return y;
  }
  function p(v, y) {
    var A = (v.length - y) % 3;
    return A === 0 ? v.toString("base64", y) : (this.lastNeed = 3 - A, this.lastTotal = 3, A === 1 ? this.lastChar[0] = v[v.length - 1] : (this.lastChar[0] = v[v.length - 2], this.lastChar[1] = v[v.length - 1]), v.toString("base64", y, v.length - A));
  }
  function _(v) {
    var y = v && v.length ? this.write(v) : "";
    return this.lastNeed ? y + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : y;
  }
  function g(v) {
    return v.toString(this.encoding);
  }
  function b(v) {
    return v && v.length ? this.write(v) : "";
  }
  return ss;
}
var ls, gc;
function Dh() {
  if (gc) return ls;
  gc = 1;
  var e = ho();
  ls = y;
  var t = Sv(), r;
  y.ReadableState = v, Ml.EventEmitter;
  var n = function(h, c) {
    return h.listeners(c).length;
  }, i = Ih(), a = po().Buffer, o = (typeof se < "u" ? se : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(h) {
    return a.from(h);
  }
  function u(h) {
    return a.isBuffer(h) || h instanceof o;
  }
  var f = Object.create(Di());
  f.inherits = Ni();
  var l = xn, m = void 0;
  l && l.debuglog ? m = l.debuglog("stream") : m = function() {
  };
  var d = Av(), p = $h(), _;
  f.inherits(y, i);
  var g = ["error", "close", "destroy", "pause", "resume"];
  function b(h, c, x) {
    if (typeof h.prependListener == "function") return h.prependListener(c, x);
    !h._events || !h._events[c] ? h.on(c, x) : t(h._events[c]) ? h._events[c].unshift(x) : h._events[c] = [x, h._events[c]];
  }
  function v(h, c) {
    r = r || bn(), h = h || {};
    var x = c instanceof r;
    this.objectMode = !!h.objectMode, x && (this.objectMode = this.objectMode || !!h.readableObjectMode);
    var T = h.highWaterMark, Z = h.readableHighWaterMark, G = this.objectMode ? 16 : 16 * 1024;
    T || T === 0 ? this.highWaterMark = T : x && (Z || Z === 0) ? this.highWaterMark = Z : this.highWaterMark = G, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new d(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = h.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, h.encoding && (_ || (_ = mc().StringDecoder), this.decoder = new _(h.encoding), this.encoding = h.encoding);
  }
  function y(h) {
    if (r = r || bn(), !(this instanceof y)) return new y(h);
    this._readableState = new v(h, this), this.readable = !0, h && (typeof h.read == "function" && (this._read = h.read), typeof h.destroy == "function" && (this._destroy = h.destroy)), i.call(this);
  }
  Object.defineProperty(y.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(h) {
      this._readableState && (this._readableState.destroyed = h);
    }
  }), y.prototype.destroy = p.destroy, y.prototype._undestroy = p.undestroy, y.prototype._destroy = function(h, c) {
    this.push(null), c(h);
  }, y.prototype.push = function(h, c) {
    var x = this._readableState, T;
    return x.objectMode ? T = !0 : typeof h == "string" && (c = c || x.defaultEncoding, c !== x.encoding && (h = a.from(h, c), c = ""), T = !0), A(this, h, c, !1, T);
  }, y.prototype.unshift = function(h) {
    return A(this, h, null, !0, !1);
  };
  function A(h, c, x, T, Z) {
    var G = h._readableState;
    if (c === null)
      G.reading = !1, q(h, G);
    else {
      var K;
      Z || (K = $(G, c)), K ? h.emit("error", K) : G.objectMode || c && c.length > 0 ? (typeof c != "string" && !G.objectMode && Object.getPrototypeOf(c) !== a.prototype && (c = s(c)), T ? G.endEmitted ? h.emit("error", new Error("stream.unshift() after end event")) : R(h, G, c, !0) : G.ended ? h.emit("error", new Error("stream.push() after EOF")) : (G.reading = !1, G.decoder && !x ? (c = G.decoder.write(c), G.objectMode || c.length !== 0 ? R(h, G, c, !1) : re(h, G)) : R(h, G, c, !1))) : T || (G.reading = !1);
    }
    return j(G);
  }
  function R(h, c, x, T) {
    c.flowing && c.length === 0 && !c.sync ? (h.emit("data", x), h.read(0)) : (c.length += c.objectMode ? 1 : x.length, T ? c.buffer.unshift(x) : c.buffer.push(x), c.needReadable && N(h)), re(h, c);
  }
  function $(h, c) {
    var x;
    return !u(c) && typeof c != "string" && c !== void 0 && !h.objectMode && (x = new TypeError("Invalid non-string/buffer chunk")), x;
  }
  function j(h) {
    return !h.ended && (h.needReadable || h.length < h.highWaterMark || h.length === 0);
  }
  y.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, y.prototype.setEncoding = function(h) {
    return _ || (_ = mc().StringDecoder), this._readableState.decoder = new _(h), this._readableState.encoding = h, this;
  };
  var B = 8388608;
  function z(h) {
    return h >= B ? h = B : (h--, h |= h >>> 1, h |= h >>> 2, h |= h >>> 4, h |= h >>> 8, h |= h >>> 16, h++), h;
  }
  function E(h, c) {
    return h <= 0 || c.length === 0 && c.ended ? 0 : c.objectMode ? 1 : h !== h ? c.flowing && c.length ? c.buffer.head.data.length : c.length : (h > c.highWaterMark && (c.highWaterMark = z(h)), h <= c.length ? h : c.ended ? c.length : (c.needReadable = !0, 0));
  }
  y.prototype.read = function(h) {
    m("read", h), h = parseInt(h, 10);
    var c = this._readableState, x = h;
    if (h !== 0 && (c.emittedReadable = !1), h === 0 && c.needReadable && (c.length >= c.highWaterMark || c.ended))
      return m("read: emitReadable", c.length, c.ended), c.length === 0 && c.ended ? ae(this) : N(this), null;
    if (h = E(h, c), h === 0 && c.ended)
      return c.length === 0 && ae(this), null;
    var T = c.needReadable;
    m("need readable", T), (c.length === 0 || c.length - h < c.highWaterMark) && (T = !0, m("length less than watermark", T)), c.ended || c.reading ? (T = !1, m("reading or ended", T)) : T && (m("do read"), c.reading = !0, c.sync = !0, c.length === 0 && (c.needReadable = !0), this._read(c.highWaterMark), c.sync = !1, c.reading || (h = E(x, c)));
    var Z;
    return h > 0 ? Z = U(h, c) : Z = null, Z === null ? (c.needReadable = !0, h = 0) : c.length -= h, c.length === 0 && (c.ended || (c.needReadable = !0), x !== h && c.ended && ae(this)), Z !== null && this.emit("data", Z), Z;
  };
  function q(h, c) {
    if (!c.ended) {
      if (c.decoder) {
        var x = c.decoder.end();
        x && x.length && (c.buffer.push(x), c.length += c.objectMode ? 1 : x.length);
      }
      c.ended = !0, N(h);
    }
  }
  function N(h) {
    var c = h._readableState;
    c.needReadable = !1, c.emittedReadable || (m("emitReadable", c.flowing), c.emittedReadable = !0, c.sync ? e.nextTick(Y, h) : Y(h));
  }
  function Y(h) {
    m("emit readable"), h.emit("readable"), I(h);
  }
  function re(h, c) {
    c.readingMore || (c.readingMore = !0, e.nextTick(D, h, c));
  }
  function D(h, c) {
    for (var x = c.length; !c.reading && !c.flowing && !c.ended && c.length < c.highWaterMark && (m("maybeReadMore read 0"), h.read(0), x !== c.length); )
      x = c.length;
    c.readingMore = !1;
  }
  y.prototype._read = function(h) {
    this.emit("error", new Error("_read() is not implemented"));
  }, y.prototype.pipe = function(h, c) {
    var x = this, T = this._readableState;
    switch (T.pipesCount) {
      case 0:
        T.pipes = h;
        break;
      case 1:
        T.pipes = [T.pipes, h];
        break;
      default:
        T.pipes.push(h);
        break;
    }
    T.pipesCount += 1, m("pipe count=%d opts=%j", T.pipesCount, c);
    var Z = (!c || c.end !== !1) && h !== process.stdout && h !== process.stderr, G = Z ? ve : L;
    T.endEmitted ? e.nextTick(G) : x.once("end", G), h.on("unpipe", K);
    function K(H, Q) {
      m("onunpipe"), H === x && Q && Q.hasUnpiped === !1 && (Q.hasUnpiped = !0, we());
    }
    function ve() {
      m("onend"), h.end();
    }
    var ye = P(x);
    h.on("drain", ye);
    var Qe = !1;
    function we() {
      m("cleanup"), h.removeListener("close", ot), h.removeListener("finish", k), h.removeListener("drain", ye), h.removeListener("error", It), h.removeListener("unpipe", K), x.removeListener("end", ve), x.removeListener("end", L), x.removeListener("data", vt), Qe = !0, T.awaitDrain && (!h._writableState || h._writableState.needDrain) && ye();
    }
    var le = !1;
    x.on("data", vt);
    function vt(H) {
      m("ondata"), le = !1;
      var Q = h.write(H);
      Q === !1 && !le && ((T.pipesCount === 1 && T.pipes === h || T.pipesCount > 1 && fe(T.pipes, h) !== -1) && !Qe && (m("false write response, pause", T.awaitDrain), T.awaitDrain++, le = !0), x.pause());
    }
    function It(H) {
      m("onerror", H), L(), h.removeListener("error", It), n(h, "error") === 0 && h.emit("error", H);
    }
    b(h, "error", It);
    function ot() {
      h.removeListener("finish", k), L();
    }
    h.once("close", ot);
    function k() {
      m("onfinish"), h.removeListener("close", ot), L();
    }
    h.once("finish", k);
    function L() {
      m("unpipe"), x.unpipe(h);
    }
    return h.emit("pipe", x), T.flowing || (m("pipe resume"), x.resume()), h;
  };
  function P(h) {
    return function() {
      var c = h._readableState;
      m("pipeOnDrain", c.awaitDrain), c.awaitDrain && c.awaitDrain--, c.awaitDrain === 0 && n(h, "data") && (c.flowing = !0, I(h));
    };
  }
  y.prototype.unpipe = function(h) {
    var c = this._readableState, x = { hasUnpiped: !1 };
    if (c.pipesCount === 0) return this;
    if (c.pipesCount === 1)
      return h && h !== c.pipes ? this : (h || (h = c.pipes), c.pipes = null, c.pipesCount = 0, c.flowing = !1, h && h.emit("unpipe", this, x), this);
    if (!h) {
      var T = c.pipes, Z = c.pipesCount;
      c.pipes = null, c.pipesCount = 0, c.flowing = !1;
      for (var G = 0; G < Z; G++)
        T[G].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var K = fe(c.pipes, h);
    return K === -1 ? this : (c.pipes.splice(K, 1), c.pipesCount -= 1, c.pipesCount === 1 && (c.pipes = c.pipes[0]), h.emit("unpipe", this, x), this);
  }, y.prototype.on = function(h, c) {
    var x = i.prototype.on.call(this, h, c);
    if (h === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (h === "readable") {
      var T = this._readableState;
      !T.endEmitted && !T.readableListening && (T.readableListening = T.needReadable = !0, T.emittedReadable = !1, T.reading ? T.length && N(this) : e.nextTick(M, this));
    }
    return x;
  }, y.prototype.addListener = y.prototype.on;
  function M(h) {
    m("readable nexttick read 0"), h.read(0);
  }
  y.prototype.resume = function() {
    var h = this._readableState;
    return h.flowing || (m("resume"), h.flowing = !0, S(this, h)), this;
  };
  function S(h, c) {
    c.resumeScheduled || (c.resumeScheduled = !0, e.nextTick(C, h, c));
  }
  function C(h, c) {
    c.reading || (m("resume read 0"), h.read(0)), c.resumeScheduled = !1, c.awaitDrain = 0, h.emit("resume"), I(h), c.flowing && !c.reading && h.read(0);
  }
  y.prototype.pause = function() {
    return m("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (m("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function I(h) {
    var c = h._readableState;
    for (m("flow", c.flowing); c.flowing && h.read() !== null; )
      ;
  }
  y.prototype.wrap = function(h) {
    var c = this, x = this._readableState, T = !1;
    h.on("end", function() {
      if (m("wrapped end"), x.decoder && !x.ended) {
        var K = x.decoder.end();
        K && K.length && c.push(K);
      }
      c.push(null);
    }), h.on("data", function(K) {
      if (m("wrapped data"), x.decoder && (K = x.decoder.write(K)), !(x.objectMode && K == null) && !(!x.objectMode && (!K || !K.length))) {
        var ve = c.push(K);
        ve || (T = !0, h.pause());
      }
    });
    for (var Z in h)
      this[Z] === void 0 && typeof h[Z] == "function" && (this[Z] = /* @__PURE__ */ function(K) {
        return function() {
          return h[K].apply(h, arguments);
        };
      }(Z));
    for (var G = 0; G < g.length; G++)
      h.on(g[G], this.emit.bind(this, g[G]));
    return this._read = function(K) {
      m("wrapped _read", K), T && (T = !1, h.resume());
    }, this;
  }, Object.defineProperty(y.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), y._fromList = U;
  function U(h, c) {
    if (c.length === 0) return null;
    var x;
    return c.objectMode ? x = c.buffer.shift() : !h || h >= c.length ? (c.decoder ? x = c.buffer.join("") : c.buffer.length === 1 ? x = c.buffer.head.data : x = c.buffer.concat(c.length), c.buffer.clear()) : x = W(h, c.buffer, c.decoder), x;
  }
  function W(h, c, x) {
    var T;
    return h < c.head.data.length ? (T = c.head.data.slice(0, h), c.head.data = c.head.data.slice(h)) : h === c.head.data.length ? T = c.shift() : T = x ? V(h, c) : te(h, c), T;
  }
  function V(h, c) {
    var x = c.head, T = 1, Z = x.data;
    for (h -= Z.length; x = x.next; ) {
      var G = x.data, K = h > G.length ? G.length : h;
      if (K === G.length ? Z += G : Z += G.slice(0, h), h -= K, h === 0) {
        K === G.length ? (++T, x.next ? c.head = x.next : c.head = c.tail = null) : (c.head = x, x.data = G.slice(K));
        break;
      }
      ++T;
    }
    return c.length -= T, Z;
  }
  function te(h, c) {
    var x = a.allocUnsafe(h), T = c.head, Z = 1;
    for (T.data.copy(x), h -= T.data.length; T = T.next; ) {
      var G = T.data, K = h > G.length ? G.length : h;
      if (G.copy(x, x.length - h, 0, K), h -= K, h === 0) {
        K === G.length ? (++Z, T.next ? c.head = T.next : c.head = c.tail = null) : (c.head = T, T.data = G.slice(K));
        break;
      }
      ++Z;
    }
    return c.length -= Z, x;
  }
  function ae(h) {
    var c = h._readableState;
    if (c.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    c.endEmitted || (c.ended = !0, e.nextTick(J, c, h));
  }
  function J(h, c) {
    !h.endEmitted && h.length === 0 && (h.endEmitted = !0, c.readable = !1, c.emit("end"));
  }
  function fe(h, c) {
    for (var x = 0, T = h.length; x < T; x++)
      if (h[x] === c) return x;
    return -1;
  }
  return ls;
}
var us, vc;
function Nh() {
  if (vc) return us;
  vc = 1, us = n;
  var e = bn(), t = Object.create(Di());
  t.inherits = Ni(), t.inherits(n, e);
  function r(o, s) {
    var u = this._transformState;
    u.transforming = !1;
    var f = u.writecb;
    if (!f)
      return this.emit("error", new Error("write callback called multiple times"));
    u.writechunk = null, u.writecb = null, s != null && this.push(s), f(o);
    var l = this._readableState;
    l.reading = !1, (l.needReadable || l.length < l.highWaterMark) && this._read(l.highWaterMark);
  }
  function n(o) {
    if (!(this instanceof n)) return new n(o);
    e.call(this, o), this._transformState = {
      afterTransform: r.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, o && (typeof o.transform == "function" && (this._transform = o.transform), typeof o.flush == "function" && (this._flush = o.flush)), this.on("prefinish", i);
  }
  function i() {
    var o = this;
    typeof this._flush == "function" ? this._flush(function(s, u) {
      a(o, s, u);
    }) : a(this, null, null);
  }
  n.prototype.push = function(o, s) {
    return this._transformState.needTransform = !1, e.prototype.push.call(this, o, s);
  }, n.prototype._transform = function(o, s, u) {
    throw new Error("_transform() is not implemented");
  }, n.prototype._write = function(o, s, u) {
    var f = this._transformState;
    if (f.writecb = u, f.writechunk = o, f.writeencoding = s, !f.transforming) {
      var l = this._readableState;
      (f.needTransform || l.needReadable || l.length < l.highWaterMark) && this._read(l.highWaterMark);
    }
  }, n.prototype._read = function(o) {
    var s = this._transformState;
    s.writechunk !== null && s.writecb && !s.transforming ? (s.transforming = !0, this._transform(s.writechunk, s.writeencoding, s.afterTransform)) : s.needTransform = !0;
  }, n.prototype._destroy = function(o, s) {
    var u = this;
    e.prototype._destroy.call(this, o, function(f) {
      s(f), u.emit("close");
    });
  };
  function a(o, s, u) {
    if (s) return o.emit("error", s);
    if (u != null && o.push(u), o._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (o._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return o.push(null);
  }
  return us;
}
var cs, _c;
function xv() {
  if (_c) return cs;
  _c = 1, cs = r;
  var e = Nh(), t = Object.create(Di());
  t.inherits = Ni(), t.inherits(r, e);
  function r(n) {
    if (!(this instanceof r)) return new r(n);
    e.call(this, n);
  }
  return r.prototype._transform = function(n, i, a) {
    a(null, n);
  }, cs;
}
var yc;
function Ph() {
  return yc || (yc = 1, function(e, t) {
    var r = zr;
    process.env.READABLE_STREAM === "disable" && r ? (e.exports = r, t = e.exports = r.Readable, t.Readable = r.Readable, t.Writable = r.Writable, t.Duplex = r.Duplex, t.Transform = r.Transform, t.PassThrough = r.PassThrough, t.Stream = r) : (t = e.exports = Dh(), t.Stream = r || t, t.Readable = t, t.Writable = kh(), t.Duplex = bn(), t.Transform = Nh(), t.PassThrough = xv());
  }(sa, sa.exports)), sa.exports;
}
var wc, da;
xe.base64 = !0;
xe.array = !0;
xe.string = !0;
xe.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
xe.nodebuffer = typeof Buffer < "u";
xe.uint8array = typeof Uint8Array < "u";
if (typeof ArrayBuffer > "u")
  da = xe.blob = !1;
else {
  var Ec = new ArrayBuffer(0);
  try {
    da = xe.blob = new Blob([Ec], {
      type: "application/zip"
    }).size === 0;
  } catch {
    try {
      var Rv = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, bc = new Rv();
      bc.append(Ec), da = xe.blob = bc.getBlob("application/zip").size === 0;
    } catch {
      da = xe.blob = !1;
    }
  }
}
try {
  wc = xe.nodestream = !!Ph().Readable;
} catch {
  wc = xe.nodestream = !1;
}
var ha = {}, Sc;
function Fh() {
  if (Sc) return ha;
  Sc = 1;
  var e = Te(), t = xe, r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  return ha.encode = function(n) {
    for (var i = [], a, o, s, u, f, l, m, d = 0, p = n.length, _ = p, g = e.getTypeOf(n) !== "string"; d < n.length; )
      _ = p - d, g ? (a = n[d++], o = d < p ? n[d++] : 0, s = d < p ? n[d++] : 0) : (a = n.charCodeAt(d++), o = d < p ? n.charCodeAt(d++) : 0, s = d < p ? n.charCodeAt(d++) : 0), u = a >> 2, f = (a & 3) << 4 | o >> 4, l = _ > 1 ? (o & 15) << 2 | s >> 6 : 64, m = _ > 2 ? s & 63 : 64, i.push(r.charAt(u) + r.charAt(f) + r.charAt(l) + r.charAt(m));
    return i.join("");
  }, ha.decode = function(n) {
    var i, a, o, s, u, f, l, m = 0, d = 0, p = "data:";
    if (n.substr(0, p.length) === p)
      throw new Error("Invalid base64 input, it looks like a data url.");
    n = n.replace(/[^A-Za-z0-9+/=]/g, "");
    var _ = n.length * 3 / 4;
    if (n.charAt(n.length - 1) === r.charAt(64) && _--, n.charAt(n.length - 2) === r.charAt(64) && _--, _ % 1 !== 0)
      throw new Error("Invalid base64 input, bad content length.");
    var g;
    for (t.uint8array ? g = new Uint8Array(_ | 0) : g = new Array(_ | 0); m < n.length; )
      s = r.indexOf(n.charAt(m++)), u = r.indexOf(n.charAt(m++)), f = r.indexOf(n.charAt(m++)), l = r.indexOf(n.charAt(m++)), i = s << 2 | u >> 4, a = (u & 15) << 4 | f >> 2, o = (f & 3) << 6 | l, g[d++] = i, f !== 64 && (g[d++] = a), l !== 64 && (g[d++] = o);
    return g;
  }, ha;
}
var mo = {
  /**
   * True if this is running in Nodejs, will be undefined in a browser.
   * In a browser, browserify won't include this file and the whole module
   * will be resolved an empty object.
   */
  isNode: typeof Buffer < "u",
  /**
   * Create a new nodejs Buffer from an existing content.
   * @param {Object} data the data to pass to the constructor.
   * @param {String} encoding the encoding to use.
   * @return {Buffer} a new Buffer.
   */
  newBufferFrom: function(e, t) {
    if (Buffer.from && Buffer.from !== Uint8Array.from)
      return Buffer.from(e, t);
    if (typeof e == "number")
      throw new Error('The "data" argument must not be a number');
    return new Buffer(e, t);
  },
  /**
   * Create a new nodejs Buffer with the specified size.
   * @param {Integer} size the size of the buffer.
   * @return {Buffer} a new Buffer.
   */
  allocBuffer: function(e) {
    if (Buffer.alloc)
      return Buffer.alloc(e);
    var t = new Buffer(e);
    return t.fill(0), t;
  },
  /**
   * Find out if an object is a Buffer.
   * @param {Object} b the object to test.
   * @return {Boolean} true if the object is a Buffer, false otherwise.
   */
  isBuffer: function(e) {
    return Buffer.isBuffer(e);
  },
  isStream: function(e) {
    return e && typeof e.on == "function" && typeof e.pause == "function" && typeof e.resume == "function";
  }
}, fs, Tc;
function Ov() {
  if (Tc) return fs;
  Tc = 1;
  var e = se.MutationObserver || se.WebKitMutationObserver, t;
  if (process.browser)
    if (e) {
      var r = 0, n = new e(u), i = se.document.createTextNode("");
      n.observe(i, {
        characterData: !0
      }), t = function() {
        i.data = r = ++r % 2;
      };
    } else if (!se.setImmediate && typeof se.MessageChannel < "u") {
      var a = new se.MessageChannel();
      a.port1.onmessage = u, t = function() {
        a.port2.postMessage(0);
      };
    } else "document" in se && "onreadystatechange" in se.document.createElement("script") ? t = function() {
      var l = se.document.createElement("script");
      l.onreadystatechange = function() {
        u(), l.onreadystatechange = null, l.parentNode.removeChild(l), l = null;
      }, se.document.documentElement.appendChild(l);
    } : t = function() {
      setTimeout(u, 0);
    };
  else
    t = function() {
      process.nextTick(u);
    };
  var o, s = [];
  function u() {
    o = !0;
    for (var l, m, d = s.length; d; ) {
      for (m = s, s = [], l = -1; ++l < d; )
        m[l]();
      d = s.length;
    }
    o = !1;
  }
  fs = f;
  function f(l) {
    s.push(l) === 1 && !o && t();
  }
  return fs;
}
var ds, Ac;
function Iv() {
  if (Ac) return ds;
  Ac = 1;
  var e = Ov();
  function t() {
  }
  var r = {}, n = ["REJECTED"], i = ["FULFILLED"], a = ["PENDING"];
  if (!process.browser)
    var o = ["UNHANDLED"];
  ds = s;
  function s(v) {
    if (typeof v != "function")
      throw new TypeError("resolver must be a function");
    this.state = a, this.queue = [], this.outcome = void 0, process.browser || (this.handled = o), v !== t && m(this, v);
  }
  s.prototype.finally = function(v) {
    if (typeof v != "function")
      return this;
    var y = this.constructor;
    return this.then(A, R);
    function A($) {
      function j() {
        return $;
      }
      return y.resolve(v()).then(j);
    }
    function R($) {
      function j() {
        throw $;
      }
      return y.resolve(v()).then(j);
    }
  }, s.prototype.catch = function(v) {
    return this.then(null, v);
  }, s.prototype.then = function(v, y) {
    if (typeof v != "function" && this.state === i || typeof y != "function" && this.state === n)
      return this;
    var A = new this.constructor(t);
    if (process.browser || this.handled === o && (this.handled = null), this.state !== a) {
      var R = this.state === i ? v : y;
      f(A, R, this.outcome);
    } else
      this.queue.push(new u(A, v, y));
    return A;
  };
  function u(v, y, A) {
    this.promise = v, typeof y == "function" && (this.onFulfilled = y, this.callFulfilled = this.otherCallFulfilled), typeof A == "function" && (this.onRejected = A, this.callRejected = this.otherCallRejected);
  }
  u.prototype.callFulfilled = function(v) {
    r.resolve(this.promise, v);
  }, u.prototype.otherCallFulfilled = function(v) {
    f(this.promise, this.onFulfilled, v);
  }, u.prototype.callRejected = function(v) {
    r.reject(this.promise, v);
  }, u.prototype.otherCallRejected = function(v) {
    f(this.promise, this.onRejected, v);
  };
  function f(v, y, A) {
    e(function() {
      var R;
      try {
        R = y(A);
      } catch ($) {
        return r.reject(v, $);
      }
      R === v ? r.reject(v, new TypeError("Cannot resolve promise with itself")) : r.resolve(v, R);
    });
  }
  r.resolve = function(v, y) {
    var A = d(l, y);
    if (A.status === "error")
      return r.reject(v, A.value);
    var R = A.value;
    if (R)
      m(v, R);
    else {
      v.state = i, v.outcome = y;
      for (var $ = -1, j = v.queue.length; ++$ < j; )
        v.queue[$].callFulfilled(y);
    }
    return v;
  }, r.reject = function(v, y) {
    v.state = n, v.outcome = y, process.browser || v.handled === o && e(function() {
      v.handled === o && process.emit("unhandledRejection", y, v);
    });
    for (var A = -1, R = v.queue.length; ++A < R; )
      v.queue[A].callRejected(y);
    return v;
  };
  function l(v) {
    var y = v && v.then;
    if (v && (typeof v == "object" || typeof v == "function") && typeof y == "function")
      return function() {
        y.apply(v, arguments);
      };
  }
  function m(v, y) {
    var A = !1;
    function R(z) {
      A || (A = !0, r.reject(v, z));
    }
    function $(z) {
      A || (A = !0, r.resolve(v, z));
    }
    function j() {
      y($, R);
    }
    var B = d(j);
    B.status === "error" && R(B.value);
  }
  function d(v, y) {
    var A = {};
    try {
      A.value = v(y), A.status = "success";
    } catch (R) {
      A.status = "error", A.value = R;
    }
    return A;
  }
  s.resolve = p;
  function p(v) {
    return v instanceof this ? v : r.resolve(new this(t), v);
  }
  s.reject = _;
  function _(v) {
    var y = new this(t);
    return r.reject(y, v);
  }
  s.all = g;
  function g(v) {
    var y = this;
    if (Object.prototype.toString.call(v) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var A = v.length, R = !1;
    if (!A)
      return this.resolve([]);
    for (var $ = new Array(A), j = 0, B = -1, z = new this(t); ++B < A; )
      E(v[B], B);
    return z;
    function E(q, N) {
      y.resolve(q).then(Y, function(re) {
        R || (R = !0, r.reject(z, re));
      });
      function Y(re) {
        $[N] = re, ++j === A && !R && (R = !0, r.resolve(z, $));
      }
    }
  }
  s.race = b;
  function b(v) {
    var y = this;
    if (Object.prototype.toString.call(v) !== "[object Array]")
      return this.reject(new TypeError("must be an array"));
    var A = v.length, R = !1;
    if (!A)
      return this.resolve([]);
    for (var $ = -1, j = new this(t); ++$ < A; )
      B(v[$]);
    return j;
    function B(z) {
      y.resolve(z).then(function(E) {
        R || (R = !0, r.resolve(j, E));
      }, function(E) {
        R || (R = !0, r.reject(j, E));
      });
    }
  }
  return ds;
}
var hl = null;
typeof Promise < "u" ? hl = Promise : hl = Iv();
var Pi = {
  Promise: hl
};
(function(e, t) {
  if (e.setImmediate)
    return;
  var r = 1, n = {}, i = !1, a = e.document, o;
  function s(y) {
    typeof y != "function" && (y = new Function("" + y));
    for (var A = new Array(arguments.length - 1), R = 0; R < A.length; R++)
      A[R] = arguments[R + 1];
    var $ = { callback: y, args: A };
    return n[r] = $, o(r), r++;
  }
  function u(y) {
    delete n[y];
  }
  function f(y) {
    var A = y.callback, R = y.args;
    switch (R.length) {
      case 0:
        A();
        break;
      case 1:
        A(R[0]);
        break;
      case 2:
        A(R[0], R[1]);
        break;
      case 3:
        A(R[0], R[1], R[2]);
        break;
      default:
        A.apply(t, R);
        break;
    }
  }
  function l(y) {
    if (i)
      setTimeout(l, 0, y);
    else {
      var A = n[y];
      if (A) {
        i = !0;
        try {
          f(A);
        } finally {
          u(y), i = !1;
        }
      }
    }
  }
  function m() {
    o = function(y) {
      process.nextTick(function() {
        l(y);
      });
    };
  }
  function d() {
    if (e.postMessage && !e.importScripts) {
      var y = !0, A = e.onmessage;
      return e.onmessage = function() {
        y = !1;
      }, e.postMessage("", "*"), e.onmessage = A, y;
    }
  }
  function p() {
    var y = "setImmediate$" + Math.random() + "$", A = function(R) {
      R.source === e && typeof R.data == "string" && R.data.indexOf(y) === 0 && l(+R.data.slice(y.length));
    };
    e.addEventListener ? e.addEventListener("message", A, !1) : e.attachEvent("onmessage", A), o = function(R) {
      e.postMessage(y + R, "*");
    };
  }
  function _() {
    var y = new MessageChannel();
    y.port1.onmessage = function(A) {
      var R = A.data;
      l(R);
    }, o = function(A) {
      y.port2.postMessage(A);
    };
  }
  function g() {
    var y = a.documentElement;
    o = function(A) {
      var R = a.createElement("script");
      R.onreadystatechange = function() {
        l(A), R.onreadystatechange = null, y.removeChild(R), R = null;
      }, y.appendChild(R);
    };
  }
  function b() {
    o = function(y) {
      setTimeout(l, 0, y);
    };
  }
  var v = Object.getPrototypeOf && Object.getPrototypeOf(e);
  v = v && v.setTimeout ? v : e, {}.toString.call(e.process) === "[object process]" ? m() : d() ? p() : e.MessageChannel ? _() : a && "onreadystatechange" in a.createElement("script") ? g() : b(), v.setImmediate = s, v.clearImmediate = u;
})(typeof self > "u" ? se : self);
var Cc;
function Te() {
  return Cc || (Cc = 1, function(e) {
    var t = xe, r = Fh(), n = mo, i = Pi;
    function a(d) {
      var p = null;
      return t.uint8array ? p = new Uint8Array(d.length) : p = new Array(d.length), s(d, p);
    }
    e.newBlob = function(d, p) {
      e.checkSupport("blob");
      try {
        return new Blob([d], {
          type: p
        });
      } catch {
        try {
          var _ = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, g = new _();
          return g.append(d), g.getBlob(p);
        } catch {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function o(d) {
      return d;
    }
    function s(d, p) {
      for (var _ = 0; _ < d.length; ++_)
        p[_] = d.charCodeAt(_) & 255;
      return p;
    }
    var u = {
      /**
       * Transform an array of int into a string, chunk by chunk.
       * See the performances notes on arrayLikeToString.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @param {String} type the type of the array.
       * @param {Integer} chunk the chunk size.
       * @return {String} the resulting string.
       * @throws Error if the chunk is too big for the stack.
       */
      stringifyByChunk: function(d, p, _) {
        var g = [], b = 0, v = d.length;
        if (v <= _)
          return String.fromCharCode.apply(null, d);
        for (; b < v; )
          p === "array" || p === "nodebuffer" ? g.push(String.fromCharCode.apply(null, d.slice(b, Math.min(b + _, v)))) : g.push(String.fromCharCode.apply(null, d.subarray(b, Math.min(b + _, v)))), b += _;
        return g.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(d) {
        for (var p = "", _ = 0; _ < d.length; _++)
          p += String.fromCharCode(d[_]);
        return p;
      },
      applyCanBeUsed: {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array: function() {
          try {
            return t.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return !1;
          }
        }(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer: function() {
          try {
            return t.nodebuffer && String.fromCharCode.apply(null, n.allocBuffer(1)).length === 1;
          } catch {
            return !1;
          }
        }()
      }
    };
    function f(d) {
      var p = 65536, _ = e.getTypeOf(d), g = !0;
      if (_ === "uint8array" ? g = u.applyCanBeUsed.uint8array : _ === "nodebuffer" && (g = u.applyCanBeUsed.nodebuffer), g)
        for (; p > 1; )
          try {
            return u.stringifyByChunk(d, _, p);
          } catch {
            p = Math.floor(p / 2);
          }
      return u.stringifyByChar(d);
    }
    e.applyFromCharCode = f;
    function l(d, p) {
      for (var _ = 0; _ < d.length; _++)
        p[_] = d[_];
      return p;
    }
    var m = {};
    m.string = {
      string: o,
      array: function(d) {
        return s(d, new Array(d.length));
      },
      arraybuffer: function(d) {
        return m.string.uint8array(d).buffer;
      },
      uint8array: function(d) {
        return s(d, new Uint8Array(d.length));
      },
      nodebuffer: function(d) {
        return s(d, n.allocBuffer(d.length));
      }
    }, m.array = {
      string: f,
      array: o,
      arraybuffer: function(d) {
        return new Uint8Array(d).buffer;
      },
      uint8array: function(d) {
        return new Uint8Array(d);
      },
      nodebuffer: function(d) {
        return n.newBufferFrom(d);
      }
    }, m.arraybuffer = {
      string: function(d) {
        return f(new Uint8Array(d));
      },
      array: function(d) {
        return l(new Uint8Array(d), new Array(d.byteLength));
      },
      arraybuffer: o,
      uint8array: function(d) {
        return new Uint8Array(d);
      },
      nodebuffer: function(d) {
        return n.newBufferFrom(new Uint8Array(d));
      }
    }, m.uint8array = {
      string: f,
      array: function(d) {
        return l(d, new Array(d.length));
      },
      arraybuffer: function(d) {
        return d.buffer;
      },
      uint8array: o,
      nodebuffer: function(d) {
        return n.newBufferFrom(d);
      }
    }, m.nodebuffer = {
      string: f,
      array: function(d) {
        return l(d, new Array(d.length));
      },
      arraybuffer: function(d) {
        return m.nodebuffer.uint8array(d).buffer;
      },
      uint8array: function(d) {
        return l(d, new Uint8Array(d.length));
      },
      nodebuffer: o
    }, e.transformTo = function(d, p) {
      if (p || (p = ""), !d)
        return p;
      e.checkSupport(d);
      var _ = e.getTypeOf(p), g = m[_][d](p);
      return g;
    }, e.resolve = function(d) {
      for (var p = d.split("/"), _ = [], g = 0; g < p.length; g++) {
        var b = p[g];
        b === "." || b === "" && g !== 0 && g !== p.length - 1 || (b === ".." ? _.pop() : _.push(b));
      }
      return _.join("/");
    }, e.getTypeOf = function(d) {
      if (typeof d == "string")
        return "string";
      if (Object.prototype.toString.call(d) === "[object Array]")
        return "array";
      if (t.nodebuffer && n.isBuffer(d))
        return "nodebuffer";
      if (t.uint8array && d instanceof Uint8Array)
        return "uint8array";
      if (t.arraybuffer && d instanceof ArrayBuffer)
        return "arraybuffer";
    }, e.checkSupport = function(d) {
      var p = t[d.toLowerCase()];
      if (!p)
        throw new Error(d + " is not supported by this platform");
    }, e.MAX_VALUE_16BITS = 65535, e.MAX_VALUE_32BITS = -1, e.pretty = function(d) {
      var p = "", _, g;
      for (g = 0; g < (d || "").length; g++)
        _ = d.charCodeAt(g), p += "\\x" + (_ < 16 ? "0" : "") + _.toString(16).toUpperCase();
      return p;
    }, e.delay = function(d, p, _) {
      setImmediate(function() {
        d.apply(_ || null, p || []);
      });
    }, e.inherits = function(d, p) {
      var _ = function() {
      };
      _.prototype = p.prototype, d.prototype = new _();
    }, e.extend = function() {
      var d = {}, p, _;
      for (p = 0; p < arguments.length; p++)
        for (_ in arguments[p])
          Object.prototype.hasOwnProperty.call(arguments[p], _) && typeof d[_] > "u" && (d[_] = arguments[p][_]);
      return d;
    }, e.prepareContent = function(d, p, _, g, b) {
      var v = i.Promise.resolve(p).then(function(y) {
        var A = t.blob && (y instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(y)) !== -1);
        return A && typeof FileReader < "u" ? new i.Promise(function(R, $) {
          var j = new FileReader();
          j.onload = function(B) {
            R(B.target.result);
          }, j.onerror = function(B) {
            $(B.target.error);
          }, j.readAsArrayBuffer(y);
        }) : y;
      });
      return v.then(function(y) {
        var A = e.getTypeOf(y);
        return A ? (A === "arraybuffer" ? y = e.transformTo("uint8array", y) : A === "string" && (b ? y = r.decode(y) : _ && g !== !0 && (y = a(y))), y) : i.Promise.reject(
          new Error("Can't read the data of '" + d + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
        );
      });
    };
  }(Qo)), Qo;
}
function Lh(e) {
  this.name = e || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
    data: [],
    end: [],
    error: []
  }, this.previous = null;
}
Lh.prototype = {
  /**
   * Push a chunk to the next workers.
   * @param {Object} chunk the chunk to push
   */
  push: function(e) {
    this.emit("data", e);
  },
  /**
   * End the stream.
   * @return {Boolean} true if this call ended the worker, false otherwise.
   */
  end: function() {
    if (this.isFinished)
      return !1;
    this.flush();
    try {
      this.emit("end"), this.cleanUp(), this.isFinished = !0;
    } catch (e) {
      this.emit("error", e);
    }
    return !0;
  },
  /**
   * End the stream with an error.
   * @param {Error} e the error which caused the premature end.
   * @return {Boolean} true if this call ended the worker with an error, false otherwise.
   */
  error: function(e) {
    return this.isFinished ? !1 : (this.isPaused ? this.generatedError = e : (this.isFinished = !0, this.emit("error", e), this.previous && this.previous.error(e), this.cleanUp()), !0);
  },
  /**
   * Add a callback on an event.
   * @param {String} name the name of the event (data, end, error)
   * @param {Function} listener the function to call when the event is triggered
   * @return {GenericWorker} the current object for chainability
   */
  on: function(e, t) {
    return this._listeners[e].push(t), this;
  },
  /**
   * Clean any references when a worker is ending.
   */
  cleanUp: function() {
    this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
  },
  /**
   * Trigger an event. This will call registered callback with the provided arg.
   * @param {String} name the name of the event (data, end, error)
   * @param {Object} arg the argument to call the callback with.
   */
  emit: function(e, t) {
    if (this._listeners[e])
      for (var r = 0; r < this._listeners[e].length; r++)
        this._listeners[e][r].call(this, t);
  },
  /**
   * Chain a worker with an other.
   * @param {Worker} next the worker receiving events from the current one.
   * @return {worker} the next worker for chainability
   */
  pipe: function(e) {
    return e.registerPrevious(this);
  },
  /**
   * Same as `pipe` in the other direction.
   * Using an API with `pipe(next)` is very easy.
   * Implementing the API with the point of view of the next one registering
   * a source is easier, see the ZipFileWorker.
   * @param {Worker} previous the previous worker, sending events to this one
   * @return {Worker} the current worker for chainability
   */
  registerPrevious: function(e) {
    if (this.isLocked)
      throw new Error("The stream '" + this + "' has already been used.");
    this.streamInfo = e.streamInfo, this.mergeStreamInfo(), this.previous = e;
    var t = this;
    return e.on("data", function(r) {
      t.processChunk(r);
    }), e.on("end", function() {
      t.end();
    }), e.on("error", function(r) {
      t.error(r);
    }), this;
  },
  /**
   * Pause the stream so it doesn't send events anymore.
   * @return {Boolean} true if this call paused the worker, false otherwise.
   */
  pause: function() {
    return this.isPaused || this.isFinished ? !1 : (this.isPaused = !0, this.previous && this.previous.pause(), !0);
  },
  /**
   * Resume a paused stream.
   * @return {Boolean} true if this call resumed the worker, false otherwise.
   */
  resume: function() {
    if (!this.isPaused || this.isFinished)
      return !1;
    this.isPaused = !1;
    var e = !1;
    return this.generatedError && (this.error(this.generatedError), e = !0), this.previous && this.previous.resume(), !e;
  },
  /**
   * Flush any remaining bytes as the stream is ending.
   */
  flush: function() {
  },
  /**
   * Process a chunk. This is usually the method overridden.
   * @param {Object} chunk the chunk to process.
   */
  processChunk: function(e) {
    this.push(e);
  },
  /**
   * Add a key/value to be added in the workers chain streamInfo once activated.
   * @param {String} key the key to use
   * @param {Object} value the associated value
   * @return {Worker} the current worker for chainability
   */
  withStreamInfo: function(e, t) {
    return this.extraStreamInfo[e] = t, this.mergeStreamInfo(), this;
  },
  /**
   * Merge this worker's streamInfo into the chain's streamInfo.
   */
  mergeStreamInfo: function() {
    for (var e in this.extraStreamInfo)
      Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e) && (this.streamInfo[e] = this.extraStreamInfo[e]);
  },
  /**
   * Lock the stream to prevent further updates on the workers chain.
   * After calling this method, all calls to pipe will fail.
   */
  lock: function() {
    if (this.isLocked)
      throw new Error("The stream '" + this + "' has already been used.");
    this.isLocked = !0, this.previous && this.previous.lock();
  },
  /**
   *
   * Pretty print the workers chain.
   */
  toString: function() {
    var e = "Worker " + this.name;
    return this.previous ? this.previous + " -> " + e : e;
  }
};
var mt = Lh;
(function(e) {
  for (var t = Te(), r = xe, n = mo, i = mt, a = new Array(256), o = 0; o < 256; o++)
    a[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1;
  a[254] = a[254] = 1;
  var s = function(d) {
    var p, _, g, b, v, y = d.length, A = 0;
    for (b = 0; b < y; b++)
      _ = d.charCodeAt(b), (_ & 64512) === 55296 && b + 1 < y && (g = d.charCodeAt(b + 1), (g & 64512) === 56320 && (_ = 65536 + (_ - 55296 << 10) + (g - 56320), b++)), A += _ < 128 ? 1 : _ < 2048 ? 2 : _ < 65536 ? 3 : 4;
    for (r.uint8array ? p = new Uint8Array(A) : p = new Array(A), v = 0, b = 0; v < A; b++)
      _ = d.charCodeAt(b), (_ & 64512) === 55296 && b + 1 < y && (g = d.charCodeAt(b + 1), (g & 64512) === 56320 && (_ = 65536 + (_ - 55296 << 10) + (g - 56320), b++)), _ < 128 ? p[v++] = _ : _ < 2048 ? (p[v++] = 192 | _ >>> 6, p[v++] = 128 | _ & 63) : _ < 65536 ? (p[v++] = 224 | _ >>> 12, p[v++] = 128 | _ >>> 6 & 63, p[v++] = 128 | _ & 63) : (p[v++] = 240 | _ >>> 18, p[v++] = 128 | _ >>> 12 & 63, p[v++] = 128 | _ >>> 6 & 63, p[v++] = 128 | _ & 63);
    return p;
  }, u = function(d, p) {
    var _;
    for (p = p || d.length, p > d.length && (p = d.length), _ = p - 1; _ >= 0 && (d[_] & 192) === 128; )
      _--;
    return _ < 0 || _ === 0 ? p : _ + a[d[_]] > p ? _ : p;
  }, f = function(d) {
    var p, _, g, b, v = d.length, y = new Array(v * 2);
    for (_ = 0, p = 0; p < v; ) {
      if (g = d[p++], g < 128) {
        y[_++] = g;
        continue;
      }
      if (b = a[g], b > 4) {
        y[_++] = 65533, p += b - 1;
        continue;
      }
      for (g &= b === 2 ? 31 : b === 3 ? 15 : 7; b > 1 && p < v; )
        g = g << 6 | d[p++] & 63, b--;
      if (b > 1) {
        y[_++] = 65533;
        continue;
      }
      g < 65536 ? y[_++] = g : (g -= 65536, y[_++] = 55296 | g >> 10 & 1023, y[_++] = 56320 | g & 1023);
    }
    return y.length !== _ && (y.subarray ? y = y.subarray(0, _) : y.length = _), t.applyFromCharCode(y);
  };
  e.utf8encode = function(p) {
    return r.nodebuffer ? n.newBufferFrom(p, "utf-8") : s(p);
  }, e.utf8decode = function(p) {
    return r.nodebuffer ? t.transformTo("nodebuffer", p).toString("utf-8") : (p = t.transformTo(r.uint8array ? "uint8array" : "array", p), f(p));
  };
  function l() {
    i.call(this, "utf-8 decode"), this.leftOver = null;
  }
  t.inherits(l, i), l.prototype.processChunk = function(d) {
    var p = t.transformTo(r.uint8array ? "uint8array" : "array", d.data);
    if (this.leftOver && this.leftOver.length) {
      if (r.uint8array) {
        var _ = p;
        p = new Uint8Array(_.length + this.leftOver.length), p.set(this.leftOver, 0), p.set(_, this.leftOver.length);
      } else
        p = this.leftOver.concat(p);
      this.leftOver = null;
    }
    var g = u(p), b = p;
    g !== p.length && (r.uint8array ? (b = p.subarray(0, g), this.leftOver = p.subarray(g, p.length)) : (b = p.slice(0, g), this.leftOver = p.slice(g, p.length))), this.push({
      data: e.utf8decode(b),
      meta: d.meta
    });
  }, l.prototype.flush = function() {
    this.leftOver && this.leftOver.length && (this.push({
      data: e.utf8decode(this.leftOver),
      meta: {}
    }), this.leftOver = null);
  }, e.Utf8DecodeWorker = l;
  function m() {
    i.call(this, "utf-8 encode");
  }
  t.inherits(m, i), m.prototype.processChunk = function(d) {
    this.push({
      data: e.utf8encode(d.data),
      meta: d.meta
    });
  }, e.Utf8EncodeWorker = m;
})(Rn);
var Uh = mt, Bh = Te();
function jl(e) {
  Uh.call(this, "ConvertWorker to " + e), this.destType = e;
}
Bh.inherits(jl, Uh);
jl.prototype.processChunk = function(e) {
  this.push({
    data: Bh.transformTo(this.destType, e.data),
    meta: e.meta
  });
};
var $v = jl, hs, xc;
function kv() {
  if (xc) return hs;
  xc = 1;
  var e = Ph().Readable, t = Te();
  t.inherits(r, e);
  function r(n, i, a) {
    e.call(this, i), this._helper = n;
    var o = this;
    n.on("data", function(s, u) {
      o.push(s) || o._helper.pause(), a && a(u);
    }).on("error", function(s) {
      o.emit("error", s);
    }).on("end", function() {
      o.push(null);
    });
  }
  return r.prototype._read = function() {
    this._helper.resume();
  }, hs = r, hs;
}
var Nr = Te(), Dv = $v, Nv = mt, Pv = Fh(), Fv = xe, Lv = Pi, Mh = null;
if (Fv.nodestream)
  try {
    Mh = kv();
  } catch {
  }
function Uv(e, t, r) {
  switch (e) {
    case "blob":
      return Nr.newBlob(Nr.transformTo("arraybuffer", t), r);
    case "base64":
      return Pv.encode(t);
    default:
      return Nr.transformTo(e, t);
  }
}
function Bv(e, t) {
  var r, n = 0, i = null, a = 0;
  for (r = 0; r < t.length; r++)
    a += t[r].length;
  switch (e) {
    case "string":
      return t.join("");
    case "array":
      return Array.prototype.concat.apply([], t);
    case "uint8array":
      for (i = new Uint8Array(a), r = 0; r < t.length; r++)
        i.set(t[r], n), n += t[r].length;
      return i;
    case "nodebuffer":
      return Buffer.concat(t);
    default:
      throw new Error("concat : unsupported type '" + e + "'");
  }
}
function Mv(e, t) {
  return new Lv.Promise(function(r, n) {
    var i = [], a = e._internalType, o = e._outputType, s = e._mimeType;
    e.on("data", function(u, f) {
      i.push(u), t && t(f);
    }).on("error", function(u) {
      i = [], n(u);
    }).on("end", function() {
      try {
        var u = Uv(o, Bv(a, i), s);
        r(u);
      } catch (f) {
        n(f);
      }
      i = [];
    }).resume();
  });
}
function jh(e, t, r) {
  var n = t;
  switch (t) {
    case "blob":
    case "arraybuffer":
      n = "uint8array";
      break;
    case "base64":
      n = "string";
      break;
  }
  try {
    this._internalType = n, this._outputType = t, this._mimeType = r, Nr.checkSupport(n), this._worker = e.pipe(new Dv(n)), e.lock();
  } catch (i) {
    this._worker = new Nv("error"), this._worker.error(i);
  }
}
jh.prototype = {
  /**
   * Listen a StreamHelper, accumulate its content and concatenate it into a
   * complete block.
   * @param {Function} updateCb the update callback.
   * @return Promise the promise for the accumulation.
   */
  accumulate: function(e) {
    return Mv(this, e);
  },
  /**
   * Add a listener on an event triggered on a stream.
   * @param {String} evt the name of the event
   * @param {Function} fn the listener
   * @return {StreamHelper} the current helper.
   */
  on: function(e, t) {
    var r = this;
    return e === "data" ? this._worker.on(e, function(n) {
      t.call(r, n.data, n.meta);
    }) : this._worker.on(e, function() {
      Nr.delay(t, arguments, r);
    }), this;
  },
  /**
   * Resume the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  resume: function() {
    return Nr.delay(this._worker.resume, [], this._worker), this;
  },
  /**
   * Pause the flow of chunks.
   * @return {StreamHelper} the current helper.
   */
  pause: function() {
    return this._worker.pause(), this;
  },
  /**
   * Return a nodejs stream for this helper.
   * @param {Function} updateCb the update callback.
   * @return {NodejsStreamOutputAdapter} the nodejs stream.
   */
  toNodejsStream: function(e) {
    if (Nr.checkSupport("nodestream"), this._outputType !== "nodebuffer")
      throw new Error(this._outputType + " is not supported by this method");
    return new Mh(this, {
      objectMode: this._outputType !== "nodebuffer"
    }, e);
  }
};
var Hh = jh, gt = {};
gt.base64 = !1;
gt.binary = !1;
gt.dir = !1;
gt.createFolders = !0;
gt.date = null;
gt.compression = null;
gt.compressionOptions = null;
gt.comment = null;
gt.unixPermissions = null;
gt.dosPermissions = null;
var go = Te(), vo = mt, jv = 16 * 1024;
function On(e) {
  vo.call(this, "DataWorker");
  var t = this;
  this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, e.then(function(r) {
    t.dataIsReady = !0, t.data = r, t.max = r && r.length || 0, t.type = go.getTypeOf(r), t.isPaused || t._tickAndRepeat();
  }, function(r) {
    t.error(r);
  });
}
go.inherits(On, vo);
On.prototype.cleanUp = function() {
  vo.prototype.cleanUp.call(this), this.data = null;
};
On.prototype.resume = function() {
  return vo.prototype.resume.call(this) ? (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, go.delay(this._tickAndRepeat, [], this)), !0) : !1;
};
On.prototype._tickAndRepeat = function() {
  this._tickScheduled = !1, !(this.isPaused || this.isFinished) && (this._tick(), this.isFinished || (go.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
};
On.prototype._tick = function() {
  if (this.isPaused || this.isFinished)
    return !1;
  var e = jv, t = null, r = Math.min(this.max, this.index + e);
  if (this.index >= this.max)
    return this.end();
  switch (this.type) {
    case "string":
      t = this.data.substring(this.index, r);
      break;
    case "uint8array":
      t = this.data.subarray(this.index, r);
      break;
    case "array":
    case "nodebuffer":
      t = this.data.slice(this.index, r);
      break;
  }
  return this.index = r, this.push({
    data: t,
    meta: {
      percent: this.max ? this.index / this.max * 100 : 0
    }
  });
};
var zh = On, Hv = Te();
function zv() {
  for (var e, t = [], r = 0; r < 256; r++) {
    e = r;
    for (var n = 0; n < 8; n++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[r] = e;
  }
  return t;
}
var qh = zv();
function qv(e, t, r, n) {
  var i = qh, a = n + r;
  e = e ^ -1;
  for (var o = n; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t[o]) & 255];
  return e ^ -1;
}
function Gv(e, t, r, n) {
  var i = qh, a = n + r;
  e = e ^ -1;
  for (var o = n; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t.charCodeAt(o)) & 255];
  return e ^ -1;
}
var Hl = function(t, r) {
  if (typeof t > "u" || !t.length)
    return 0;
  var n = Hv.getTypeOf(t) !== "string";
  return n ? qv(r | 0, t, t.length, 0) : Gv(r | 0, t, t.length, 0);
}, Gh = mt, Wv = Hl, Vv = Te();
function zl() {
  Gh.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
}
Vv.inherits(zl, Gh);
zl.prototype.processChunk = function(e) {
  this.streamInfo.crc32 = Wv(e.data, this.streamInfo.crc32 || 0), this.push(e);
};
var Wh = zl, Yv = Te(), ql = mt;
function Gl(e) {
  ql.call(this, "DataLengthProbe for " + e), this.propName = e, this.withStreamInfo(e, 0);
}
Yv.inherits(Gl, ql);
Gl.prototype.processChunk = function(e) {
  if (e) {
    var t = this.streamInfo[this.propName] || 0;
    this.streamInfo[this.propName] = t + e.data.length;
  }
  ql.prototype.processChunk.call(this, e);
};
var Zv = Gl, Rc = Pi, Oc = zh, Xv = Wh, pl = Zv;
function Wl(e, t, r, n, i) {
  this.compressedSize = e, this.uncompressedSize = t, this.crc32 = r, this.compression = n, this.compressedContent = i;
}
Wl.prototype = {
  /**
   * Create a worker to get the uncompressed content.
   * @return {GenericWorker} the worker.
   */
  getContentWorker: function() {
    var e = new Oc(Rc.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new pl("data_length")), t = this;
    return e.on("end", function() {
      if (this.streamInfo.data_length !== t.uncompressedSize)
        throw new Error("Bug : uncompressed data size mismatch");
    }), e;
  },
  /**
   * Create a worker to get the compressed content.
   * @return {GenericWorker} the worker.
   */
  getCompressedWorker: function() {
    return new Oc(Rc.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
  }
};
Wl.createWorkerFrom = function(e, t, r) {
  return e.pipe(new Xv()).pipe(new pl("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new pl("compressedSize")).withStreamInfo("compression", t);
};
var Vl = Wl, Kv = Hh, Jv = zh, ps = Rn, ms = Vl, Ic = mt, Yl = function(e, t, r) {
  this.name = e, this.dir = r.dir, this.date = r.date, this.comment = r.comment, this.unixPermissions = r.unixPermissions, this.dosPermissions = r.dosPermissions, this._data = t, this._dataBinary = r.binary, this.options = {
    compression: r.compression,
    compressionOptions: r.compressionOptions
  };
};
Yl.prototype = {
  /**
   * Create an internal stream for the content of this object.
   * @param {String} type the type of each chunk.
   * @return StreamHelper the stream.
   */
  internalStream: function(e) {
    var t = null, r = "string";
    try {
      if (!e)
        throw new Error("No output type specified.");
      r = e.toLowerCase();
      var n = r === "string" || r === "text";
      (r === "binarystring" || r === "text") && (r = "string"), t = this._decompressWorker();
      var i = !this._dataBinary;
      i && !n && (t = t.pipe(new ps.Utf8EncodeWorker())), !i && n && (t = t.pipe(new ps.Utf8DecodeWorker()));
    } catch (a) {
      t = new Ic("error"), t.error(a);
    }
    return new Kv(t, r, "");
  },
  /**
   * Prepare the content in the asked type.
   * @param {String} type the type of the result.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Promise the promise of the result.
   */
  async: function(e, t) {
    return this.internalStream(e).accumulate(t);
  },
  /**
   * Prepare the content as a nodejs stream.
   * @param {String} type the type of each chunk.
   * @param {Function} onUpdate a function to call on each internal update.
   * @return Stream the stream.
   */
  nodeStream: function(e, t) {
    return this.internalStream(e || "nodebuffer").toNodejsStream(t);
  },
  /**
   * Return a worker for the compressed content.
   * @private
   * @param {Object} compression the compression object to use.
   * @param {Object} compressionOptions the options to use when compressing.
   * @return Worker the worker.
   */
  _compressWorker: function(e, t) {
    if (this._data instanceof ms && this._data.compression.magic === e.magic)
      return this._data.getCompressedWorker();
    var r = this._decompressWorker();
    return this._dataBinary || (r = r.pipe(new ps.Utf8EncodeWorker())), ms.createWorkerFrom(r, e, t);
  },
  /**
   * Return a worker for the decompressed content.
   * @private
   * @return Worker the worker.
   */
  _decompressWorker: function() {
    return this._data instanceof ms ? this._data.getContentWorker() : this._data instanceof Ic ? this._data : new Jv(this._data);
  }
};
var $c = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], Qv = function() {
  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};
for (var gs = 0; gs < $c.length; gs++)
  Yl.prototype[$c[gs]] = Qv;
var e_ = Yl, Vh = {}, _o = {}, yo = {}, Yt = {};
(function(e) {
  var t = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
  function r(a, o) {
    return Object.prototype.hasOwnProperty.call(a, o);
  }
  e.assign = function(a) {
    for (var o = Array.prototype.slice.call(arguments, 1); o.length; ) {
      var s = o.shift();
      if (s) {
        if (typeof s != "object")
          throw new TypeError(s + "must be non-object");
        for (var u in s)
          r(s, u) && (a[u] = s[u]);
      }
    }
    return a;
  }, e.shrinkBuf = function(a, o) {
    return a.length === o ? a : a.subarray ? a.subarray(0, o) : (a.length = o, a);
  };
  var n = {
    arraySet: function(a, o, s, u, f) {
      if (o.subarray && a.subarray) {
        a.set(o.subarray(s, s + u), f);
        return;
      }
      for (var l = 0; l < u; l++)
        a[f + l] = o[s + l];
    },
    // Join array of chunks to single array.
    flattenChunks: function(a) {
      var o, s, u, f, l, m;
      for (u = 0, o = 0, s = a.length; o < s; o++)
        u += a[o].length;
      for (m = new Uint8Array(u), f = 0, o = 0, s = a.length; o < s; o++)
        l = a[o], m.set(l, f), f += l.length;
      return m;
    }
  }, i = {
    arraySet: function(a, o, s, u, f) {
      for (var l = 0; l < u; l++)
        a[f + l] = o[s + l];
    },
    // Join array of chunks to single array.
    flattenChunks: function(a) {
      return [].concat.apply([], a);
    }
  };
  e.setTyped = function(a) {
    a ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, n)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, i));
  }, e.setTyped(t);
})(Yt);
var Fi = {}, Ut = {}, In = {}, t_ = Yt, r_ = 4, kc = 0, Dc = 1, n_ = 2;
function $n(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
var i_ = 0, Yh = 1, a_ = 2, o_ = 3, s_ = 258, Zl = 29, Li = 256, di = Li + 1 + Zl, gn = 30, Xl = 19, Zh = 2 * di + 1, $r = 15, vs = 16, l_ = 7, Kl = 256, Xh = 16, Kh = 17, Jh = 18, ml = (
  /* extra bits for each length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
), Ba = (
  /* extra bits for each distance code */
  [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
), u_ = (
  /* extra bits for each bit length code */
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
), Qh = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], c_ = 512, Gt = new Array((di + 2) * 2);
$n(Gt);
var Qn = new Array(gn * 2);
$n(Qn);
var hi = new Array(c_);
$n(hi);
var pi = new Array(s_ - o_ + 1);
$n(pi);
var Jl = new Array(Zl);
$n(Jl);
var Za = new Array(gn);
$n(Za);
function _s(e, t, r, n, i) {
  this.static_tree = e, this.extra_bits = t, this.extra_base = r, this.elems = n, this.max_length = i, this.has_stree = e && e.length;
}
var ep, tp, rp;
function ys(e, t) {
  this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}
function np(e) {
  return e < 256 ? hi[e] : hi[256 + (e >>> 7)];
}
function mi(e, t) {
  e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
}
function tt(e, t, r) {
  e.bi_valid > vs - r ? (e.bi_buf |= t << e.bi_valid & 65535, mi(e, e.bi_buf), e.bi_buf = t >> vs - e.bi_valid, e.bi_valid += r - vs) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r);
}
function Nt(e, t, r) {
  tt(
    e,
    r[t * 2],
    r[t * 2 + 1]
    /*.Len*/
  );
}
function ip(e, t) {
  var r = 0;
  do
    r |= e & 1, e >>>= 1, r <<= 1;
  while (--t > 0);
  return r >>> 1;
}
function f_(e) {
  e.bi_valid === 16 ? (mi(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}
function d_(e, t) {
  var r = t.dyn_tree, n = t.max_code, i = t.stat_desc.static_tree, a = t.stat_desc.has_stree, o = t.stat_desc.extra_bits, s = t.stat_desc.extra_base, u = t.stat_desc.max_length, f, l, m, d, p, _, g = 0;
  for (d = 0; d <= $r; d++)
    e.bl_count[d] = 0;
  for (r[e.heap[e.heap_max] * 2 + 1] = 0, f = e.heap_max + 1; f < Zh; f++)
    l = e.heap[f], d = r[r[l * 2 + 1] * 2 + 1] + 1, d > u && (d = u, g++), r[l * 2 + 1] = d, !(l > n) && (e.bl_count[d]++, p = 0, l >= s && (p = o[l - s]), _ = r[l * 2], e.opt_len += _ * (d + p), a && (e.static_len += _ * (i[l * 2 + 1] + p)));
  if (g !== 0) {
    do {
      for (d = u - 1; e.bl_count[d] === 0; )
        d--;
      e.bl_count[d]--, e.bl_count[d + 1] += 2, e.bl_count[u]--, g -= 2;
    } while (g > 0);
    for (d = u; d !== 0; d--)
      for (l = e.bl_count[d]; l !== 0; )
        m = e.heap[--f], !(m > n) && (r[m * 2 + 1] !== d && (e.opt_len += (d - r[m * 2 + 1]) * r[m * 2], r[m * 2 + 1] = d), l--);
  }
}
function ap(e, t, r) {
  var n = new Array($r + 1), i = 0, a, o;
  for (a = 1; a <= $r; a++)
    n[a] = i = i + r[a - 1] << 1;
  for (o = 0; o <= t; o++) {
    var s = e[o * 2 + 1];
    s !== 0 && (e[o * 2] = ip(n[s]++, s));
  }
}
function h_() {
  var e, t, r, n, i, a = new Array($r + 1);
  for (r = 0, n = 0; n < Zl - 1; n++)
    for (Jl[n] = r, e = 0; e < 1 << ml[n]; e++)
      pi[r++] = n;
  for (pi[r - 1] = n, i = 0, n = 0; n < 16; n++)
    for (Za[n] = i, e = 0; e < 1 << Ba[n]; e++)
      hi[i++] = n;
  for (i >>= 7; n < gn; n++)
    for (Za[n] = i << 7, e = 0; e < 1 << Ba[n] - 7; e++)
      hi[256 + i++] = n;
  for (t = 0; t <= $r; t++)
    a[t] = 0;
  for (e = 0; e <= 143; )
    Gt[e * 2 + 1] = 8, e++, a[8]++;
  for (; e <= 255; )
    Gt[e * 2 + 1] = 9, e++, a[9]++;
  for (; e <= 279; )
    Gt[e * 2 + 1] = 7, e++, a[7]++;
  for (; e <= 287; )
    Gt[e * 2 + 1] = 8, e++, a[8]++;
  for (ap(Gt, di + 1, a), e = 0; e < gn; e++)
    Qn[e * 2 + 1] = 5, Qn[e * 2] = ip(e, 5);
  ep = new _s(Gt, ml, Li + 1, di, $r), tp = new _s(Qn, Ba, 0, gn, $r), rp = new _s(new Array(0), u_, 0, Xl, l_);
}
function op(e) {
  var t;
  for (t = 0; t < di; t++)
    e.dyn_ltree[t * 2] = 0;
  for (t = 0; t < gn; t++)
    e.dyn_dtree[t * 2] = 0;
  for (t = 0; t < Xl; t++)
    e.bl_tree[t * 2] = 0;
  e.dyn_ltree[Kl * 2] = 1, e.opt_len = e.static_len = 0, e.last_lit = e.matches = 0;
}
function sp(e) {
  e.bi_valid > 8 ? mi(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}
function p_(e, t, r, n) {
  sp(e), mi(e, r), mi(e, ~r), t_.arraySet(e.pending_buf, e.window, t, r, e.pending), e.pending += r;
}
function Nc(e, t, r, n) {
  var i = t * 2, a = r * 2;
  return e[i] < e[a] || e[i] === e[a] && n[t] <= n[r];
}
function ws(e, t, r) {
  for (var n = e.heap[r], i = r << 1; i <= e.heap_len && (i < e.heap_len && Nc(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !Nc(t, n, e.heap[i], e.depth)); )
    e.heap[r] = e.heap[i], r = i, i <<= 1;
  e.heap[r] = n;
}
function Pc(e, t, r) {
  var n, i, a = 0, o, s;
  if (e.last_lit !== 0)
    do
      n = e.pending_buf[e.d_buf + a * 2] << 8 | e.pending_buf[e.d_buf + a * 2 + 1], i = e.pending_buf[e.l_buf + a], a++, n === 0 ? Nt(e, i, t) : (o = pi[i], Nt(e, o + Li + 1, t), s = ml[o], s !== 0 && (i -= Jl[o], tt(e, i, s)), n--, o = np(n), Nt(e, o, r), s = Ba[o], s !== 0 && (n -= Za[o], tt(e, n, s)));
    while (a < e.last_lit);
  Nt(e, Kl, t);
}
function gl(e, t) {
  var r = t.dyn_tree, n = t.stat_desc.static_tree, i = t.stat_desc.has_stree, a = t.stat_desc.elems, o, s, u = -1, f;
  for (e.heap_len = 0, e.heap_max = Zh, o = 0; o < a; o++)
    r[o * 2] !== 0 ? (e.heap[++e.heap_len] = u = o, e.depth[o] = 0) : r[o * 2 + 1] = 0;
  for (; e.heap_len < 2; )
    f = e.heap[++e.heap_len] = u < 2 ? ++u : 0, r[f * 2] = 1, e.depth[f] = 0, e.opt_len--, i && (e.static_len -= n[f * 2 + 1]);
  for (t.max_code = u, o = e.heap_len >> 1; o >= 1; o--)
    ws(e, r, o);
  f = a;
  do
    o = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[
      1
      /*SMALLEST*/
    ] = e.heap[e.heap_len--], ws(
      e,
      r,
      1
      /*SMALLEST*/
    ), s = e.heap[
      1
      /*SMALLEST*/
    ], e.heap[--e.heap_max] = o, e.heap[--e.heap_max] = s, r[f * 2] = r[o * 2] + r[s * 2], e.depth[f] = (e.depth[o] >= e.depth[s] ? e.depth[o] : e.depth[s]) + 1, r[o * 2 + 1] = r[s * 2 + 1] = f, e.heap[
      1
      /*SMALLEST*/
    ] = f++, ws(
      e,
      r,
      1
      /*SMALLEST*/
    );
  while (e.heap_len >= 2);
  e.heap[--e.heap_max] = e.heap[
    1
    /*SMALLEST*/
  ], d_(e, t), ap(r, u, e.bl_count);
}
function Fc(e, t, r) {
  var n, i = -1, a, o = t[0 * 2 + 1], s = 0, u = 7, f = 4;
  for (o === 0 && (u = 138, f = 3), t[(r + 1) * 2 + 1] = 65535, n = 0; n <= r; n++)
    a = o, o = t[(n + 1) * 2 + 1], !(++s < u && a === o) && (s < f ? e.bl_tree[a * 2] += s : a !== 0 ? (a !== i && e.bl_tree[a * 2]++, e.bl_tree[Xh * 2]++) : s <= 10 ? e.bl_tree[Kh * 2]++ : e.bl_tree[Jh * 2]++, s = 0, i = a, o === 0 ? (u = 138, f = 3) : a === o ? (u = 6, f = 3) : (u = 7, f = 4));
}
function Lc(e, t, r) {
  var n, i = -1, a, o = t[0 * 2 + 1], s = 0, u = 7, f = 4;
  for (o === 0 && (u = 138, f = 3), n = 0; n <= r; n++)
    if (a = o, o = t[(n + 1) * 2 + 1], !(++s < u && a === o)) {
      if (s < f)
        do
          Nt(e, a, e.bl_tree);
        while (--s !== 0);
      else a !== 0 ? (a !== i && (Nt(e, a, e.bl_tree), s--), Nt(e, Xh, e.bl_tree), tt(e, s - 3, 2)) : s <= 10 ? (Nt(e, Kh, e.bl_tree), tt(e, s - 3, 3)) : (Nt(e, Jh, e.bl_tree), tt(e, s - 11, 7));
      s = 0, i = a, o === 0 ? (u = 138, f = 3) : a === o ? (u = 6, f = 3) : (u = 7, f = 4);
    }
}
function m_(e) {
  var t;
  for (Fc(e, e.dyn_ltree, e.l_desc.max_code), Fc(e, e.dyn_dtree, e.d_desc.max_code), gl(e, e.bl_desc), t = Xl - 1; t >= 3 && e.bl_tree[Qh[t] * 2 + 1] === 0; t--)
    ;
  return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}
function g_(e, t, r, n) {
  var i;
  for (tt(e, t - 257, 5), tt(e, r - 1, 5), tt(e, n - 4, 4), i = 0; i < n; i++)
    tt(e, e.bl_tree[Qh[i] * 2 + 1], 3);
  Lc(e, e.dyn_ltree, t - 1), Lc(e, e.dyn_dtree, r - 1);
}
function v_(e) {
  var t = 4093624447, r;
  for (r = 0; r <= 31; r++, t >>>= 1)
    if (t & 1 && e.dyn_ltree[r * 2] !== 0)
      return kc;
  if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0)
    return Dc;
  for (r = 32; r < Li; r++)
    if (e.dyn_ltree[r * 2] !== 0)
      return Dc;
  return kc;
}
var Uc = !1;
function __(e) {
  Uc || (h_(), Uc = !0), e.l_desc = new ys(e.dyn_ltree, ep), e.d_desc = new ys(e.dyn_dtree, tp), e.bl_desc = new ys(e.bl_tree, rp), e.bi_buf = 0, e.bi_valid = 0, op(e);
}
function lp(e, t, r, n) {
  tt(e, (i_ << 1) + (n ? 1 : 0), 3), p_(e, t, r);
}
function y_(e) {
  tt(e, Yh << 1, 3), Nt(e, Kl, Gt), f_(e);
}
function w_(e, t, r, n) {
  var i, a, o = 0;
  e.level > 0 ? (e.strm.data_type === n_ && (e.strm.data_type = v_(e)), gl(e, e.l_desc), gl(e, e.d_desc), o = m_(e), i = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = r + 5, r + 4 <= i && t !== -1 ? lp(e, t, r, n) : e.strategy === r_ || a === i ? (tt(e, (Yh << 1) + (n ? 1 : 0), 3), Pc(e, Gt, Qn)) : (tt(e, (a_ << 1) + (n ? 1 : 0), 3), g_(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), Pc(e, e.dyn_ltree, e.dyn_dtree)), op(e), n && sp(e);
}
function E_(e, t, r) {
  return e.pending_buf[e.d_buf + e.last_lit * 2] = t >>> 8 & 255, e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255, e.pending_buf[e.l_buf + e.last_lit] = r & 255, e.last_lit++, t === 0 ? e.dyn_ltree[r * 2]++ : (e.matches++, t--, e.dyn_ltree[(pi[r] + Li + 1) * 2]++, e.dyn_dtree[np(t) * 2]++), e.last_lit === e.lit_bufsize - 1;
}
In._tr_init = __;
In._tr_stored_block = lp;
In._tr_flush_block = w_;
In._tr_tally = E_;
In._tr_align = y_;
function b_(e, t, r, n) {
  for (var i = e & 65535 | 0, a = e >>> 16 & 65535 | 0, o = 0; r !== 0; ) {
    o = r > 2e3 ? 2e3 : r, r -= o;
    do
      i = i + t[n++] | 0, a = a + i | 0;
    while (--o);
    i %= 65521, a %= 65521;
  }
  return i | a << 16 | 0;
}
var up = b_;
function S_() {
  for (var e, t = [], r = 0; r < 256; r++) {
    e = r;
    for (var n = 0; n < 8; n++)
      e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    t[r] = e;
  }
  return t;
}
var T_ = S_();
function A_(e, t, r, n) {
  var i = T_, a = n + r;
  e ^= -1;
  for (var o = n; o < a; o++)
    e = e >>> 8 ^ i[(e ^ t[o]) & 255];
  return e ^ -1;
}
var cp = A_, Ql = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
}, We = Yt, ct = In, fp = up, tr = cp, C_ = Ql, qr = 0, x_ = 1, R_ = 3, cr = 4, Bc = 5, Pt = 0, Mc = 1, ft = -2, O_ = -3, Es = -5, I_ = -1, $_ = 1, pa = 2, k_ = 3, D_ = 4, N_ = 0, P_ = 2, wo = 8, F_ = 9, L_ = 15, U_ = 8, B_ = 29, M_ = 256, vl = M_ + 1 + B_, j_ = 30, H_ = 19, z_ = 2 * vl + 1, q_ = 15, ie = 3, or = 258, St = or + ie + 1, G_ = 32, Eo = 42, _l = 69, Ma = 73, ja = 91, Ha = 103, kr = 113, Xn = 666, Ie = 1, Ui = 2, Lr = 3, kn = 4, W_ = 3;
function sr(e, t) {
  return e.msg = C_[t], t;
}
function jc(e) {
  return (e << 1) - (e > 4 ? 9 : 0);
}
function ir(e) {
  for (var t = e.length; --t >= 0; )
    e[t] = 0;
}
function rr(e) {
  var t = e.state, r = t.pending;
  r > e.avail_out && (r = e.avail_out), r !== 0 && (We.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, t.pending === 0 && (t.pending_out = 0));
}
function Fe(e, t) {
  ct._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, rr(e.strm);
}
function ue(e, t) {
  e.pending_buf[e.pending++] = t;
}
function Gn(e, t) {
  e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
}
function V_(e, t, r, n) {
  var i = e.avail_in;
  return i > n && (i = n), i === 0 ? 0 : (e.avail_in -= i, We.arraySet(t, e.input, e.next_in, i, r), e.state.wrap === 1 ? e.adler = fp(e.adler, t, i, r) : e.state.wrap === 2 && (e.adler = tr(e.adler, t, i, r)), e.next_in += i, e.total_in += i, i);
}
function dp(e, t) {
  var r = e.max_chain_length, n = e.strstart, i, a, o = e.prev_length, s = e.nice_match, u = e.strstart > e.w_size - St ? e.strstart - (e.w_size - St) : 0, f = e.window, l = e.w_mask, m = e.prev, d = e.strstart + or, p = f[n + o - 1], _ = f[n + o];
  e.prev_length >= e.good_match && (r >>= 2), s > e.lookahead && (s = e.lookahead);
  do
    if (i = t, !(f[i + o] !== _ || f[i + o - 1] !== p || f[i] !== f[n] || f[++i] !== f[n + 1])) {
      n += 2, i++;
      do
        ;
      while (f[++n] === f[++i] && f[++n] === f[++i] && f[++n] === f[++i] && f[++n] === f[++i] && f[++n] === f[++i] && f[++n] === f[++i] && f[++n] === f[++i] && f[++n] === f[++i] && n < d);
      if (a = or - (d - n), n = d - or, a > o) {
        if (e.match_start = t, o = a, a >= s)
          break;
        p = f[n + o - 1], _ = f[n + o];
      }
    }
  while ((t = m[t & l]) > u && --r !== 0);
  return o <= e.lookahead ? o : e.lookahead;
}
function Ur(e) {
  var t = e.w_size, r, n, i, a, o;
  do {
    if (a = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - St)) {
      We.arraySet(e.window, e.window, t, t, 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, n = e.hash_size, r = n;
      do
        i = e.head[--r], e.head[r] = i >= t ? i - t : 0;
      while (--n);
      n = t, r = n;
      do
        i = e.prev[--r], e.prev[r] = i >= t ? i - t : 0;
      while (--n);
      a += t;
    }
    if (e.strm.avail_in === 0)
      break;
    if (n = V_(e.strm, e.window, e.strstart + e.lookahead, a), e.lookahead += n, e.lookahead + e.insert >= ie)
      for (o = e.strstart - e.insert, e.ins_h = e.window[o], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask; e.insert && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + ie - 1]) & e.hash_mask, e.prev[o & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = o, o++, e.insert--, !(e.lookahead + e.insert < ie)); )
        ;
  } while (e.lookahead < St && e.strm.avail_in !== 0);
}
function Y_(e, t) {
  var r = 65535;
  for (r > e.pending_buf_size - 5 && (r = e.pending_buf_size - 5); ; ) {
    if (e.lookahead <= 1) {
      if (Ur(e), e.lookahead === 0 && t === qr)
        return Ie;
      if (e.lookahead === 0)
        break;
    }
    e.strstart += e.lookahead, e.lookahead = 0;
    var n = e.block_start + r;
    if ((e.strstart === 0 || e.strstart >= n) && (e.lookahead = e.strstart - n, e.strstart = n, Fe(e, !1), e.strm.avail_out === 0) || e.strstart - e.block_start >= e.w_size - St && (Fe(e, !1), e.strm.avail_out === 0))
      return Ie;
  }
  return e.insert = 0, t === cr ? (Fe(e, !0), e.strm.avail_out === 0 ? Lr : kn) : (e.strstart > e.block_start && (Fe(e, !1), e.strm.avail_out === 0), Ie);
}
function bs(e, t) {
  for (var r, n; ; ) {
    if (e.lookahead < St) {
      if (Ur(e), e.lookahead < St && t === qr)
        return Ie;
      if (e.lookahead === 0)
        break;
    }
    if (r = 0, e.lookahead >= ie && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ie - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), r !== 0 && e.strstart - r <= e.w_size - St && (e.match_length = dp(e, r)), e.match_length >= ie)
      if (n = ct._tr_tally(e, e.strstart - e.match_start, e.match_length - ie), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= ie) {
        e.match_length--;
        do
          e.strstart++, e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ie - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart;
        while (--e.match_length !== 0);
        e.strstart++;
      } else
        e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask;
    else
      n = ct._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
    if (n && (Fe(e, !1), e.strm.avail_out === 0))
      return Ie;
  }
  return e.insert = e.strstart < ie - 1 ? e.strstart : ie - 1, t === cr ? (Fe(e, !0), e.strm.avail_out === 0 ? Lr : kn) : e.last_lit && (Fe(e, !1), e.strm.avail_out === 0) ? Ie : Ui;
}
function Jr(e, t) {
  for (var r, n, i; ; ) {
    if (e.lookahead < St) {
      if (Ur(e), e.lookahead < St && t === qr)
        return Ie;
      if (e.lookahead === 0)
        break;
    }
    if (r = 0, e.lookahead >= ie && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ie - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = ie - 1, r !== 0 && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - St && (e.match_length = dp(e, r), e.match_length <= 5 && (e.strategy === $_ || e.match_length === ie && e.strstart - e.match_start > 4096) && (e.match_length = ie - 1)), e.prev_length >= ie && e.match_length <= e.prev_length) {
      i = e.strstart + e.lookahead - ie, n = ct._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - ie), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
      do
        ++e.strstart <= i && (e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + ie - 1]) & e.hash_mask, r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart);
      while (--e.prev_length !== 0);
      if (e.match_available = 0, e.match_length = ie - 1, e.strstart++, n && (Fe(e, !1), e.strm.avail_out === 0))
        return Ie;
    } else if (e.match_available) {
      if (n = ct._tr_tally(e, 0, e.window[e.strstart - 1]), n && Fe(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0)
        return Ie;
    } else
      e.match_available = 1, e.strstart++, e.lookahead--;
  }
  return e.match_available && (n = ct._tr_tally(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < ie - 1 ? e.strstart : ie - 1, t === cr ? (Fe(e, !0), e.strm.avail_out === 0 ? Lr : kn) : e.last_lit && (Fe(e, !1), e.strm.avail_out === 0) ? Ie : Ui;
}
function Z_(e, t) {
  for (var r, n, i, a, o = e.window; ; ) {
    if (e.lookahead <= or) {
      if (Ur(e), e.lookahead <= or && t === qr)
        return Ie;
      if (e.lookahead === 0)
        break;
    }
    if (e.match_length = 0, e.lookahead >= ie && e.strstart > 0 && (i = e.strstart - 1, n = o[i], n === o[++i] && n === o[++i] && n === o[++i])) {
      a = e.strstart + or;
      do
        ;
      while (n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && n === o[++i] && i < a);
      e.match_length = or - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
    }
    if (e.match_length >= ie ? (r = ct._tr_tally(e, 1, e.match_length - ie), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = ct._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (Fe(e, !1), e.strm.avail_out === 0))
      return Ie;
  }
  return e.insert = 0, t === cr ? (Fe(e, !0), e.strm.avail_out === 0 ? Lr : kn) : e.last_lit && (Fe(e, !1), e.strm.avail_out === 0) ? Ie : Ui;
}
function X_(e, t) {
  for (var r; ; ) {
    if (e.lookahead === 0 && (Ur(e), e.lookahead === 0)) {
      if (t === qr)
        return Ie;
      break;
    }
    if (e.match_length = 0, r = ct._tr_tally(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (Fe(e, !1), e.strm.avail_out === 0))
      return Ie;
  }
  return e.insert = 0, t === cr ? (Fe(e, !0), e.strm.avail_out === 0 ? Lr : kn) : e.last_lit && (Fe(e, !1), e.strm.avail_out === 0) ? Ie : Ui;
}
function $t(e, t, r, n, i) {
  this.good_length = e, this.max_lazy = t, this.nice_length = r, this.max_chain = n, this.func = i;
}
var ln;
ln = [
  /*      good lazy nice chain */
  new $t(0, 0, 0, 0, Y_),
  /* 0 store only */
  new $t(4, 4, 8, 4, bs),
  /* 1 max speed, no lazy matches */
  new $t(4, 5, 16, 8, bs),
  /* 2 */
  new $t(4, 6, 32, 32, bs),
  /* 3 */
  new $t(4, 4, 16, 16, Jr),
  /* 4 lazy matches */
  new $t(8, 16, 32, 32, Jr),
  /* 5 */
  new $t(8, 16, 128, 128, Jr),
  /* 6 */
  new $t(8, 32, 128, 256, Jr),
  /* 7 */
  new $t(32, 128, 258, 1024, Jr),
  /* 8 */
  new $t(32, 258, 258, 4096, Jr)
  /* 9 max compression */
];
function K_(e) {
  e.window_size = 2 * e.w_size, ir(e.head), e.max_lazy_match = ln[e.level].max_lazy, e.good_match = ln[e.level].good_length, e.nice_match = ln[e.level].nice_length, e.max_chain_length = ln[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = ie - 1, e.match_available = 0, e.ins_h = 0;
}
function J_() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = wo, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new We.Buf16(z_ * 2), this.dyn_dtree = new We.Buf16((2 * j_ + 1) * 2), this.bl_tree = new We.Buf16((2 * H_ + 1) * 2), ir(this.dyn_ltree), ir(this.dyn_dtree), ir(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new We.Buf16(q_ + 1), this.heap = new We.Buf16(2 * vl + 1), ir(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new We.Buf16(2 * vl + 1), ir(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
function hp(e) {
  var t;
  return !e || !e.state ? sr(e, ft) : (e.total_in = e.total_out = 0, e.data_type = P_, t = e.state, t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap ? Eo : kr, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = qr, ct._tr_init(t), Pt);
}
function pp(e) {
  var t = hp(e);
  return t === Pt && K_(e.state), t;
}
function Q_(e, t) {
  return !e || !e.state || e.state.wrap !== 2 ? ft : (e.state.gzhead = t, Pt);
}
function mp(e, t, r, n, i, a) {
  if (!e)
    return ft;
  var o = 1;
  if (t === I_ && (t = 6), n < 0 ? (o = 0, n = -n) : n > 15 && (o = 2, n -= 16), i < 1 || i > F_ || r !== wo || n < 8 || n > 15 || t < 0 || t > 9 || a < 0 || a > D_)
    return sr(e, ft);
  n === 8 && (n = 9);
  var s = new J_();
  return e.state = s, s.strm = e, s.wrap = o, s.gzhead = null, s.w_bits = n, s.w_size = 1 << s.w_bits, s.w_mask = s.w_size - 1, s.hash_bits = i + 7, s.hash_size = 1 << s.hash_bits, s.hash_mask = s.hash_size - 1, s.hash_shift = ~~((s.hash_bits + ie - 1) / ie), s.window = new We.Buf8(s.w_size * 2), s.head = new We.Buf16(s.hash_size), s.prev = new We.Buf16(s.w_size), s.lit_bufsize = 1 << i + 6, s.pending_buf_size = s.lit_bufsize * 4, s.pending_buf = new We.Buf8(s.pending_buf_size), s.d_buf = 1 * s.lit_bufsize, s.l_buf = 3 * s.lit_bufsize, s.level = t, s.strategy = a, s.method = r, pp(e);
}
function ey(e, t) {
  return mp(e, t, wo, L_, U_, N_);
}
function ty(e, t) {
  var r, n, i, a;
  if (!e || !e.state || t > Bc || t < 0)
    return e ? sr(e, ft) : ft;
  if (n = e.state, !e.output || !e.input && e.avail_in !== 0 || n.status === Xn && t !== cr)
    return sr(e, e.avail_out === 0 ? Es : ft);
  if (n.strm = e, r = n.last_flush, n.last_flush = t, n.status === Eo)
    if (n.wrap === 2)
      e.adler = 0, ue(n, 31), ue(n, 139), ue(n, 8), n.gzhead ? (ue(
        n,
        (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)
      ), ue(n, n.gzhead.time & 255), ue(n, n.gzhead.time >> 8 & 255), ue(n, n.gzhead.time >> 16 & 255), ue(n, n.gzhead.time >> 24 & 255), ue(n, n.level === 9 ? 2 : n.strategy >= pa || n.level < 2 ? 4 : 0), ue(n, n.gzhead.os & 255), n.gzhead.extra && n.gzhead.extra.length && (ue(n, n.gzhead.extra.length & 255), ue(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = tr(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = _l) : (ue(n, 0), ue(n, 0), ue(n, 0), ue(n, 0), ue(n, 0), ue(n, n.level === 9 ? 2 : n.strategy >= pa || n.level < 2 ? 4 : 0), ue(n, W_), n.status = kr);
    else {
      var o = wo + (n.w_bits - 8 << 4) << 8, s = -1;
      n.strategy >= pa || n.level < 2 ? s = 0 : n.level < 6 ? s = 1 : n.level === 6 ? s = 2 : s = 3, o |= s << 6, n.strstart !== 0 && (o |= G_), o += 31 - o % 31, n.status = kr, Gn(n, o), n.strstart !== 0 && (Gn(n, e.adler >>> 16), Gn(n, e.adler & 65535)), e.adler = 1;
    }
  if (n.status === _l)
    if (n.gzhead.extra) {
      for (i = n.pending; n.gzindex < (n.gzhead.extra.length & 65535) && !(n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = tr(e.adler, n.pending_buf, n.pending - i, i)), rr(e), i = n.pending, n.pending === n.pending_buf_size)); )
        ue(n, n.gzhead.extra[n.gzindex] & 255), n.gzindex++;
      n.gzhead.hcrc && n.pending > i && (e.adler = tr(e.adler, n.pending_buf, n.pending - i, i)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = Ma);
    } else
      n.status = Ma;
  if (n.status === Ma)
    if (n.gzhead.name) {
      i = n.pending;
      do {
        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = tr(e.adler, n.pending_buf, n.pending - i, i)), rr(e), i = n.pending, n.pending === n.pending_buf_size)) {
          a = 1;
          break;
        }
        n.gzindex < n.gzhead.name.length ? a = n.gzhead.name.charCodeAt(n.gzindex++) & 255 : a = 0, ue(n, a);
      } while (a !== 0);
      n.gzhead.hcrc && n.pending > i && (e.adler = tr(e.adler, n.pending_buf, n.pending - i, i)), a === 0 && (n.gzindex = 0, n.status = ja);
    } else
      n.status = ja;
  if (n.status === ja)
    if (n.gzhead.comment) {
      i = n.pending;
      do {
        if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > i && (e.adler = tr(e.adler, n.pending_buf, n.pending - i, i)), rr(e), i = n.pending, n.pending === n.pending_buf_size)) {
          a = 1;
          break;
        }
        n.gzindex < n.gzhead.comment.length ? a = n.gzhead.comment.charCodeAt(n.gzindex++) & 255 : a = 0, ue(n, a);
      } while (a !== 0);
      n.gzhead.hcrc && n.pending > i && (e.adler = tr(e.adler, n.pending_buf, n.pending - i, i)), a === 0 && (n.status = Ha);
    } else
      n.status = Ha;
  if (n.status === Ha && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && rr(e), n.pending + 2 <= n.pending_buf_size && (ue(n, e.adler & 255), ue(n, e.adler >> 8 & 255), e.adler = 0, n.status = kr)) : n.status = kr), n.pending !== 0) {
    if (rr(e), e.avail_out === 0)
      return n.last_flush = -1, Pt;
  } else if (e.avail_in === 0 && jc(t) <= jc(r) && t !== cr)
    return sr(e, Es);
  if (n.status === Xn && e.avail_in !== 0)
    return sr(e, Es);
  if (e.avail_in !== 0 || n.lookahead !== 0 || t !== qr && n.status !== Xn) {
    var u = n.strategy === pa ? X_(n, t) : n.strategy === k_ ? Z_(n, t) : ln[n.level].func(n, t);
    if ((u === Lr || u === kn) && (n.status = Xn), u === Ie || u === Lr)
      return e.avail_out === 0 && (n.last_flush = -1), Pt;
    if (u === Ui && (t === x_ ? ct._tr_align(n) : t !== Bc && (ct._tr_stored_block(n, 0, 0, !1), t === R_ && (ir(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), rr(e), e.avail_out === 0))
      return n.last_flush = -1, Pt;
  }
  return t !== cr ? Pt : n.wrap <= 0 ? Mc : (n.wrap === 2 ? (ue(n, e.adler & 255), ue(n, e.adler >> 8 & 255), ue(n, e.adler >> 16 & 255), ue(n, e.adler >> 24 & 255), ue(n, e.total_in & 255), ue(n, e.total_in >> 8 & 255), ue(n, e.total_in >> 16 & 255), ue(n, e.total_in >> 24 & 255)) : (Gn(n, e.adler >>> 16), Gn(n, e.adler & 65535)), rr(e), n.wrap > 0 && (n.wrap = -n.wrap), n.pending !== 0 ? Pt : Mc);
}
function ry(e) {
  var t;
  return !e || !e.state ? ft : (t = e.state.status, t !== Eo && t !== _l && t !== Ma && t !== ja && t !== Ha && t !== kr && t !== Xn ? sr(e, ft) : (e.state = null, t === kr ? sr(e, O_) : Pt));
}
function ny(e, t) {
  var r = t.length, n, i, a, o, s, u, f, l;
  if (!e || !e.state || (n = e.state, o = n.wrap, o === 2 || o === 1 && n.status !== Eo || n.lookahead))
    return ft;
  for (o === 1 && (e.adler = fp(e.adler, t, r, 0)), n.wrap = 0, r >= n.w_size && (o === 0 && (ir(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0), l = new We.Buf8(n.w_size), We.arraySet(l, t, r - n.w_size, n.w_size, 0), t = l, r = n.w_size), s = e.avail_in, u = e.next_in, f = e.input, e.avail_in = r, e.next_in = 0, e.input = t, Ur(n); n.lookahead >= ie; ) {
    i = n.strstart, a = n.lookahead - (ie - 1);
    do
      n.ins_h = (n.ins_h << n.hash_shift ^ n.window[i + ie - 1]) & n.hash_mask, n.prev[i & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = i, i++;
    while (--a);
    n.strstart = i, n.lookahead = ie - 1, Ur(n);
  }
  return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = ie - 1, n.match_available = 0, e.next_in = u, e.input = f, e.avail_in = s, n.wrap = o, Pt;
}
Ut.deflateInit = ey;
Ut.deflateInit2 = mp;
Ut.deflateReset = pp;
Ut.deflateResetKeep = hp;
Ut.deflateSetHeader = Q_;
Ut.deflate = ty;
Ut.deflateEnd = ry;
Ut.deflateSetDictionary = ny;
Ut.deflateInfo = "pako deflate (from Nodeca project)";
var Gr = {}, bo = Yt, gp = !0, vp = !0;
try {
  String.fromCharCode.apply(null, [0]);
} catch {
  gp = !1;
}
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  vp = !1;
}
var gi = new bo.Buf8(256);
for (var Jt = 0; Jt < 256; Jt++)
  gi[Jt] = Jt >= 252 ? 6 : Jt >= 248 ? 5 : Jt >= 240 ? 4 : Jt >= 224 ? 3 : Jt >= 192 ? 2 : 1;
gi[254] = gi[254] = 1;
Gr.string2buf = function(e) {
  var t, r, n, i, a, o = e.length, s = 0;
  for (i = 0; i < o; i++)
    r = e.charCodeAt(i), (r & 64512) === 55296 && i + 1 < o && (n = e.charCodeAt(i + 1), (n & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++)), s += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
  for (t = new bo.Buf8(s), a = 0, i = 0; a < s; i++)
    r = e.charCodeAt(i), (r & 64512) === 55296 && i + 1 < o && (n = e.charCodeAt(i + 1), (n & 64512) === 56320 && (r = 65536 + (r - 55296 << 10) + (n - 56320), i++)), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | r & 63) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | r & 63) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | r & 63);
  return t;
};
function _p(e, t) {
  if (t < 65534 && (e.subarray && vp || !e.subarray && gp))
    return String.fromCharCode.apply(null, bo.shrinkBuf(e, t));
  for (var r = "", n = 0; n < t; n++)
    r += String.fromCharCode(e[n]);
  return r;
}
Gr.buf2binstring = function(e) {
  return _p(e, e.length);
};
Gr.binstring2buf = function(e) {
  for (var t = new bo.Buf8(e.length), r = 0, n = t.length; r < n; r++)
    t[r] = e.charCodeAt(r);
  return t;
};
Gr.buf2string = function(e, t) {
  var r, n, i, a, o = t || e.length, s = new Array(o * 2);
  for (n = 0, r = 0; r < o; ) {
    if (i = e[r++], i < 128) {
      s[n++] = i;
      continue;
    }
    if (a = gi[i], a > 4) {
      s[n++] = 65533, r += a - 1;
      continue;
    }
    for (i &= a === 2 ? 31 : a === 3 ? 15 : 7; a > 1 && r < o; )
      i = i << 6 | e[r++] & 63, a--;
    if (a > 1) {
      s[n++] = 65533;
      continue;
    }
    i < 65536 ? s[n++] = i : (i -= 65536, s[n++] = 55296 | i >> 10 & 1023, s[n++] = 56320 | i & 1023);
  }
  return _p(s, n);
};
Gr.utf8border = function(e, t) {
  var r;
  for (t = t || e.length, t > e.length && (t = e.length), r = t - 1; r >= 0 && (e[r] & 192) === 128; )
    r--;
  return r < 0 || r === 0 ? t : r + gi[e[r]] > t ? r : t;
};
function iy() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var yp = iy, ei = Ut, ti = Yt, yl = Gr, wl = Ql, ay = yp, wp = Object.prototype.toString, oy = 0, Ss = 4, vn = 0, Hc = 1, zc = 2, sy = -1, ly = 0, uy = 8;
function Br(e) {
  if (!(this instanceof Br)) return new Br(e);
  this.options = ti.assign({
    level: sy,
    method: uy,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: ly,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ay(), this.strm.avail_out = 0;
  var r = ei.deflateInit2(
    this.strm,
    t.level,
    t.method,
    t.windowBits,
    t.memLevel,
    t.strategy
  );
  if (r !== vn)
    throw new Error(wl[r]);
  if (t.header && ei.deflateSetHeader(this.strm, t.header), t.dictionary) {
    var n;
    if (typeof t.dictionary == "string" ? n = yl.string2buf(t.dictionary) : wp.call(t.dictionary) === "[object ArrayBuffer]" ? n = new Uint8Array(t.dictionary) : n = t.dictionary, r = ei.deflateSetDictionary(this.strm, n), r !== vn)
      throw new Error(wl[r]);
    this._dict_set = !0;
  }
}
Br.prototype.push = function(e, t) {
  var r = this.strm, n = this.options.chunkSize, i, a;
  if (this.ended)
    return !1;
  a = t === ~~t ? t : t === !0 ? Ss : oy, typeof e == "string" ? r.input = yl.string2buf(e) : wp.call(e) === "[object ArrayBuffer]" ? r.input = new Uint8Array(e) : r.input = e, r.next_in = 0, r.avail_in = r.input.length;
  do {
    if (r.avail_out === 0 && (r.output = new ti.Buf8(n), r.next_out = 0, r.avail_out = n), i = ei.deflate(r, a), i !== Hc && i !== vn)
      return this.onEnd(i), this.ended = !0, !1;
    (r.avail_out === 0 || r.avail_in === 0 && (a === Ss || a === zc)) && (this.options.to === "string" ? this.onData(yl.buf2binstring(ti.shrinkBuf(r.output, r.next_out))) : this.onData(ti.shrinkBuf(r.output, r.next_out)));
  } while ((r.avail_in > 0 || r.avail_out === 0) && i !== Hc);
  return a === Ss ? (i = ei.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === vn) : (a === zc && (this.onEnd(vn), r.avail_out = 0), !0);
};
Br.prototype.onData = function(e) {
  this.chunks.push(e);
};
Br.prototype.onEnd = function(e) {
  e === vn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ti.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function eu(e, t) {
  var r = new Br(t);
  if (r.push(e, !0), r.err)
    throw r.msg || wl[r.err];
  return r.result;
}
function cy(e, t) {
  return t = t || {}, t.raw = !0, eu(e, t);
}
function fy(e, t) {
  return t = t || {}, t.gzip = !0, eu(e, t);
}
Fi.Deflate = Br;
Fi.deflate = eu;
Fi.deflateRaw = cy;
Fi.gzip = fy;
var Bi = {}, Tt = {}, ma = 30, dy = 12, hy = function(t, r) {
  var n, i, a, o, s, u, f, l, m, d, p, _, g, b, v, y, A, R, $, j, B, z, E, q, N;
  n = t.state, i = t.next_in, q = t.input, a = i + (t.avail_in - 5), o = t.next_out, N = t.output, s = o - (r - t.avail_out), u = o + (t.avail_out - 257), f = n.dmax, l = n.wsize, m = n.whave, d = n.wnext, p = n.window, _ = n.hold, g = n.bits, b = n.lencode, v = n.distcode, y = (1 << n.lenbits) - 1, A = (1 << n.distbits) - 1;
  e:
    do {
      g < 15 && (_ += q[i++] << g, g += 8, _ += q[i++] << g, g += 8), R = b[_ & y];
      t:
        for (; ; ) {
          if ($ = R >>> 24, _ >>>= $, g -= $, $ = R >>> 16 & 255, $ === 0)
            N[o++] = R & 65535;
          else if ($ & 16) {
            j = R & 65535, $ &= 15, $ && (g < $ && (_ += q[i++] << g, g += 8), j += _ & (1 << $) - 1, _ >>>= $, g -= $), g < 15 && (_ += q[i++] << g, g += 8, _ += q[i++] << g, g += 8), R = v[_ & A];
            r:
              for (; ; ) {
                if ($ = R >>> 24, _ >>>= $, g -= $, $ = R >>> 16 & 255, $ & 16) {
                  if (B = R & 65535, $ &= 15, g < $ && (_ += q[i++] << g, g += 8, g < $ && (_ += q[i++] << g, g += 8)), B += _ & (1 << $) - 1, B > f) {
                    t.msg = "invalid distance too far back", n.mode = ma;
                    break e;
                  }
                  if (_ >>>= $, g -= $, $ = o - s, B > $) {
                    if ($ = B - $, $ > m && n.sane) {
                      t.msg = "invalid distance too far back", n.mode = ma;
                      break e;
                    }
                    if (z = 0, E = p, d === 0) {
                      if (z += l - $, $ < j) {
                        j -= $;
                        do
                          N[o++] = p[z++];
                        while (--$);
                        z = o - B, E = N;
                      }
                    } else if (d < $) {
                      if (z += l + d - $, $ -= d, $ < j) {
                        j -= $;
                        do
                          N[o++] = p[z++];
                        while (--$);
                        if (z = 0, d < j) {
                          $ = d, j -= $;
                          do
                            N[o++] = p[z++];
                          while (--$);
                          z = o - B, E = N;
                        }
                      }
                    } else if (z += d - $, $ < j) {
                      j -= $;
                      do
                        N[o++] = p[z++];
                      while (--$);
                      z = o - B, E = N;
                    }
                    for (; j > 2; )
                      N[o++] = E[z++], N[o++] = E[z++], N[o++] = E[z++], j -= 3;
                    j && (N[o++] = E[z++], j > 1 && (N[o++] = E[z++]));
                  } else {
                    z = o - B;
                    do
                      N[o++] = N[z++], N[o++] = N[z++], N[o++] = N[z++], j -= 3;
                    while (j > 2);
                    j && (N[o++] = N[z++], j > 1 && (N[o++] = N[z++]));
                  }
                } else if ($ & 64) {
                  t.msg = "invalid distance code", n.mode = ma;
                  break e;
                } else {
                  R = v[(R & 65535) + (_ & (1 << $) - 1)];
                  continue r;
                }
                break;
              }
          } else if ($ & 64)
            if ($ & 32) {
              n.mode = dy;
              break e;
            } else {
              t.msg = "invalid literal/length code", n.mode = ma;
              break e;
            }
          else {
            R = b[(R & 65535) + (_ & (1 << $) - 1)];
            continue t;
          }
          break;
        }
    } while (i < a && o < u);
  j = g >> 3, i -= j, g -= j << 3, _ &= (1 << g) - 1, t.next_in = i, t.next_out = o, t.avail_in = i < a ? 5 + (a - i) : 5 - (i - a), t.avail_out = o < u ? 257 + (u - o) : 257 - (o - u), n.hold = _, n.bits = g;
}, qc = Yt, Qr = 15, Gc = 852, Wc = 592, Vc = 0, Ts = 1, Yc = 2, py = [
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
], my = [
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
], gy = [
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
], vy = [
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
], _y = function(t, r, n, i, a, o, s, u) {
  var f = u.bits, l = 0, m = 0, d = 0, p = 0, _ = 0, g = 0, b = 0, v = 0, y = 0, A = 0, R, $, j, B, z, E = null, q = 0, N, Y = new qc.Buf16(Qr + 1), re = new qc.Buf16(Qr + 1), D = null, P = 0, M, S, C;
  for (l = 0; l <= Qr; l++)
    Y[l] = 0;
  for (m = 0; m < i; m++)
    Y[r[n + m]]++;
  for (_ = f, p = Qr; p >= 1 && Y[p] === 0; p--)
    ;
  if (_ > p && (_ = p), p === 0)
    return a[o++] = 1 << 24 | 64 << 16 | 0, a[o++] = 1 << 24 | 64 << 16 | 0, u.bits = 1, 0;
  for (d = 1; d < p && Y[d] === 0; d++)
    ;
  for (_ < d && (_ = d), v = 1, l = 1; l <= Qr; l++)
    if (v <<= 1, v -= Y[l], v < 0)
      return -1;
  if (v > 0 && (t === Vc || p !== 1))
    return -1;
  for (re[1] = 0, l = 1; l < Qr; l++)
    re[l + 1] = re[l] + Y[l];
  for (m = 0; m < i; m++)
    r[n + m] !== 0 && (s[re[r[n + m]]++] = m);
  if (t === Vc ? (E = D = s, N = 19) : t === Ts ? (E = py, q -= 257, D = my, P -= 257, N = 256) : (E = gy, D = vy, N = -1), A = 0, m = 0, l = d, z = o, g = _, b = 0, j = -1, y = 1 << _, B = y - 1, t === Ts && y > Gc || t === Yc && y > Wc)
    return 1;
  for (; ; ) {
    M = l - b, s[m] < N ? (S = 0, C = s[m]) : s[m] > N ? (S = D[P + s[m]], C = E[q + s[m]]) : (S = 96, C = 0), R = 1 << l - b, $ = 1 << g, d = $;
    do
      $ -= R, a[z + (A >> b) + $] = M << 24 | S << 16 | C | 0;
    while ($ !== 0);
    for (R = 1 << l - 1; A & R; )
      R >>= 1;
    if (R !== 0 ? (A &= R - 1, A += R) : A = 0, m++, --Y[l] === 0) {
      if (l === p)
        break;
      l = r[n + s[m]];
    }
    if (l > _ && (A & B) !== j) {
      for (b === 0 && (b = _), z += d, g = l - b, v = 1 << g; g + b < p && (v -= Y[g + b], !(v <= 0)); )
        g++, v <<= 1;
      if (y += 1 << g, t === Ts && y > Gc || t === Yc && y > Wc)
        return 1;
      j = A & B, a[j] = _ << 24 | g << 16 | z - o | 0;
    }
  }
  return A !== 0 && (a[z + A] = l - b << 24 | 64 << 16 | 0), u.bits = _, 0;
}, at = Yt, El = up, kt = cp, yy = hy, ri = _y, wy = 0, Ep = 1, bp = 2, Zc = 4, Ey = 5, ga = 6, Mr = 0, by = 1, Sy = 2, ht = -2, Sp = -3, Tp = -4, Ty = -5, Xc = 8, Ap = 1, Kc = 2, Jc = 3, Qc = 4, ef = 5, tf = 6, rf = 7, nf = 8, af = 9, of = 10, Xa = 11, Ht = 12, As = 13, sf = 14, Cs = 15, lf = 16, uf = 17, cf = 18, ff = 19, va = 20, _a = 21, df = 22, hf = 23, pf = 24, mf = 25, gf = 26, xs = 27, vf = 28, _f = 29, _e = 30, Cp = 31, Ay = 32, Cy = 852, xy = 592, Ry = 15, Oy = Ry;
function yf(e) {
  return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
}
function Iy() {
  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new at.Buf16(320), this.work = new at.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
function xp(e) {
  var t;
  return !e || !e.state ? ht : (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = Ap, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new at.Buf32(Cy), t.distcode = t.distdyn = new at.Buf32(xy), t.sane = 1, t.back = -1, Mr);
}
function Rp(e) {
  var t;
  return !e || !e.state ? ht : (t = e.state, t.wsize = 0, t.whave = 0, t.wnext = 0, xp(e));
}
function Op(e, t) {
  var r, n;
  return !e || !e.state || (n = e.state, t < 0 ? (r = 0, t = -t) : (r = (t >> 4) + 1, t < 48 && (t &= 15)), t && (t < 8 || t > 15)) ? ht : (n.window !== null && n.wbits !== t && (n.window = null), n.wrap = r, n.wbits = t, Rp(e));
}
function Ip(e, t) {
  var r, n;
  return e ? (n = new Iy(), e.state = n, n.window = null, r = Op(e, t), r !== Mr && (e.state = null), r) : ht;
}
function $y(e) {
  return Ip(e, Oy);
}
var wf = !0, Rs, Os;
function ky(e) {
  if (wf) {
    var t;
    for (Rs = new at.Buf32(512), Os = new at.Buf32(32), t = 0; t < 144; )
      e.lens[t++] = 8;
    for (; t < 256; )
      e.lens[t++] = 9;
    for (; t < 280; )
      e.lens[t++] = 7;
    for (; t < 288; )
      e.lens[t++] = 8;
    for (ri(Ep, e.lens, 0, 288, Rs, 0, e.work, { bits: 9 }), t = 0; t < 32; )
      e.lens[t++] = 5;
    ri(bp, e.lens, 0, 32, Os, 0, e.work, { bits: 5 }), wf = !1;
  }
  e.lencode = Rs, e.lenbits = 9, e.distcode = Os, e.distbits = 5;
}
function $p(e, t, r, n) {
  var i, a = e.state;
  return a.window === null && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new at.Buf8(a.wsize)), n >= a.wsize ? (at.arraySet(a.window, t, r - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > n && (i = n), at.arraySet(a.window, t, r - n, i, a.wnext), n -= i, n ? (at.arraySet(a.window, t, r - n, n, 0), a.wnext = n, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}
function Dy(e, t) {
  var r, n, i, a, o, s, u, f, l, m, d, p, _, g, b = 0, v, y, A, R, $, j, B, z, E = new at.Buf8(4), q, N, Y = (
    /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
  );
  if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0)
    return ht;
  r = e.state, r.mode === Ht && (r.mode = As), o = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, n = e.input, s = e.avail_in, f = r.hold, l = r.bits, m = s, d = u, z = Mr;
  e:
    for (; ; )
      switch (r.mode) {
        case Ap:
          if (r.wrap === 0) {
            r.mode = As;
            break;
          }
          for (; l < 16; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          if (r.wrap & 2 && f === 35615) {
            r.check = 0, E[0] = f & 255, E[1] = f >>> 8 & 255, r.check = kt(r.check, E, 2, 0), f = 0, l = 0, r.mode = Kc;
            break;
          }
          if (r.flags = 0, r.head && (r.head.done = !1), !(r.wrap & 1) || /* check if zlib header allowed */
          (((f & 255) << 8) + (f >> 8)) % 31) {
            e.msg = "incorrect header check", r.mode = _e;
            break;
          }
          if ((f & 15) !== Xc) {
            e.msg = "unknown compression method", r.mode = _e;
            break;
          }
          if (f >>>= 4, l -= 4, B = (f & 15) + 8, r.wbits === 0)
            r.wbits = B;
          else if (B > r.wbits) {
            e.msg = "invalid window size", r.mode = _e;
            break;
          }
          r.dmax = 1 << B, e.adler = r.check = 1, r.mode = f & 512 ? of : Ht, f = 0, l = 0;
          break;
        case Kc:
          for (; l < 16; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          if (r.flags = f, (r.flags & 255) !== Xc) {
            e.msg = "unknown compression method", r.mode = _e;
            break;
          }
          if (r.flags & 57344) {
            e.msg = "unknown header flags set", r.mode = _e;
            break;
          }
          r.head && (r.head.text = f >> 8 & 1), r.flags & 512 && (E[0] = f & 255, E[1] = f >>> 8 & 255, r.check = kt(r.check, E, 2, 0)), f = 0, l = 0, r.mode = Jc;
        case Jc:
          for (; l < 32; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          r.head && (r.head.time = f), r.flags & 512 && (E[0] = f & 255, E[1] = f >>> 8 & 255, E[2] = f >>> 16 & 255, E[3] = f >>> 24 & 255, r.check = kt(r.check, E, 4, 0)), f = 0, l = 0, r.mode = Qc;
        case Qc:
          for (; l < 16; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          r.head && (r.head.xflags = f & 255, r.head.os = f >> 8), r.flags & 512 && (E[0] = f & 255, E[1] = f >>> 8 & 255, r.check = kt(r.check, E, 2, 0)), f = 0, l = 0, r.mode = ef;
        case ef:
          if (r.flags & 1024) {
            for (; l < 16; ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            r.length = f, r.head && (r.head.extra_len = f), r.flags & 512 && (E[0] = f & 255, E[1] = f >>> 8 & 255, r.check = kt(r.check, E, 2, 0)), f = 0, l = 0;
          } else r.head && (r.head.extra = null);
          r.mode = tf;
        case tf:
          if (r.flags & 1024 && (p = r.length, p > s && (p = s), p && (r.head && (B = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), at.arraySet(
            r.head.extra,
            n,
            a,
            // extra field is limited to 65536 bytes
            // - no need for additional size check
            p,
            /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
            B
          )), r.flags & 512 && (r.check = kt(r.check, n, p, a)), s -= p, a += p, r.length -= p), r.length))
            break e;
          r.length = 0, r.mode = rf;
        case rf:
          if (r.flags & 2048) {
            if (s === 0)
              break e;
            p = 0;
            do
              B = n[a + p++], r.head && B && r.length < 65536 && (r.head.name += String.fromCharCode(B));
            while (B && p < s);
            if (r.flags & 512 && (r.check = kt(r.check, n, p, a)), s -= p, a += p, B)
              break e;
          } else r.head && (r.head.name = null);
          r.length = 0, r.mode = nf;
        case nf:
          if (r.flags & 4096) {
            if (s === 0)
              break e;
            p = 0;
            do
              B = n[a + p++], r.head && B && r.length < 65536 && (r.head.comment += String.fromCharCode(B));
            while (B && p < s);
            if (r.flags & 512 && (r.check = kt(r.check, n, p, a)), s -= p, a += p, B)
              break e;
          } else r.head && (r.head.comment = null);
          r.mode = af;
        case af:
          if (r.flags & 512) {
            for (; l < 16; ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            if (f !== (r.check & 65535)) {
              e.msg = "header crc mismatch", r.mode = _e;
              break;
            }
            f = 0, l = 0;
          }
          r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = Ht;
          break;
        case of:
          for (; l < 32; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          e.adler = r.check = yf(f), f = 0, l = 0, r.mode = Xa;
        case Xa:
          if (r.havedict === 0)
            return e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = s, r.hold = f, r.bits = l, Sy;
          e.adler = r.check = 1, r.mode = Ht;
        case Ht:
          if (t === Ey || t === ga)
            break e;
        case As:
          if (r.last) {
            f >>>= l & 7, l -= l & 7, r.mode = xs;
            break;
          }
          for (; l < 3; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          switch (r.last = f & 1, f >>>= 1, l -= 1, f & 3) {
            case 0:
              r.mode = sf;
              break;
            case 1:
              if (ky(r), r.mode = va, t === ga) {
                f >>>= 2, l -= 2;
                break e;
              }
              break;
            case 2:
              r.mode = uf;
              break;
            case 3:
              e.msg = "invalid block type", r.mode = _e;
          }
          f >>>= 2, l -= 2;
          break;
        case sf:
          for (f >>>= l & 7, l -= l & 7; l < 32; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          if ((f & 65535) !== (f >>> 16 ^ 65535)) {
            e.msg = "invalid stored block lengths", r.mode = _e;
            break;
          }
          if (r.length = f & 65535, f = 0, l = 0, r.mode = Cs, t === ga)
            break e;
        case Cs:
          r.mode = lf;
        case lf:
          if (p = r.length, p) {
            if (p > s && (p = s), p > u && (p = u), p === 0)
              break e;
            at.arraySet(i, n, a, p, o), s -= p, a += p, u -= p, o += p, r.length -= p;
            break;
          }
          r.mode = Ht;
          break;
        case uf:
          for (; l < 14; ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          if (r.nlen = (f & 31) + 257, f >>>= 5, l -= 5, r.ndist = (f & 31) + 1, f >>>= 5, l -= 5, r.ncode = (f & 15) + 4, f >>>= 4, l -= 4, r.nlen > 286 || r.ndist > 30) {
            e.msg = "too many length or distance symbols", r.mode = _e;
            break;
          }
          r.have = 0, r.mode = cf;
        case cf:
          for (; r.have < r.ncode; ) {
            for (; l < 3; ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            r.lens[Y[r.have++]] = f & 7, f >>>= 3, l -= 3;
          }
          for (; r.have < 19; )
            r.lens[Y[r.have++]] = 0;
          if (r.lencode = r.lendyn, r.lenbits = 7, q = { bits: r.lenbits }, z = ri(wy, r.lens, 0, 19, r.lencode, 0, r.work, q), r.lenbits = q.bits, z) {
            e.msg = "invalid code lengths set", r.mode = _e;
            break;
          }
          r.have = 0, r.mode = ff;
        case ff:
          for (; r.have < r.nlen + r.ndist; ) {
            for (; b = r.lencode[f & (1 << r.lenbits) - 1], v = b >>> 24, y = b >>> 16 & 255, A = b & 65535, !(v <= l); ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            if (A < 16)
              f >>>= v, l -= v, r.lens[r.have++] = A;
            else {
              if (A === 16) {
                for (N = v + 2; l < N; ) {
                  if (s === 0)
                    break e;
                  s--, f += n[a++] << l, l += 8;
                }
                if (f >>>= v, l -= v, r.have === 0) {
                  e.msg = "invalid bit length repeat", r.mode = _e;
                  break;
                }
                B = r.lens[r.have - 1], p = 3 + (f & 3), f >>>= 2, l -= 2;
              } else if (A === 17) {
                for (N = v + 3; l < N; ) {
                  if (s === 0)
                    break e;
                  s--, f += n[a++] << l, l += 8;
                }
                f >>>= v, l -= v, B = 0, p = 3 + (f & 7), f >>>= 3, l -= 3;
              } else {
                for (N = v + 7; l < N; ) {
                  if (s === 0)
                    break e;
                  s--, f += n[a++] << l, l += 8;
                }
                f >>>= v, l -= v, B = 0, p = 11 + (f & 127), f >>>= 7, l -= 7;
              }
              if (r.have + p > r.nlen + r.ndist) {
                e.msg = "invalid bit length repeat", r.mode = _e;
                break;
              }
              for (; p--; )
                r.lens[r.have++] = B;
            }
          }
          if (r.mode === _e)
            break;
          if (r.lens[256] === 0) {
            e.msg = "invalid code -- missing end-of-block", r.mode = _e;
            break;
          }
          if (r.lenbits = 9, q = { bits: r.lenbits }, z = ri(Ep, r.lens, 0, r.nlen, r.lencode, 0, r.work, q), r.lenbits = q.bits, z) {
            e.msg = "invalid literal/lengths set", r.mode = _e;
            break;
          }
          if (r.distbits = 6, r.distcode = r.distdyn, q = { bits: r.distbits }, z = ri(bp, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, q), r.distbits = q.bits, z) {
            e.msg = "invalid distances set", r.mode = _e;
            break;
          }
          if (r.mode = va, t === ga)
            break e;
        case va:
          r.mode = _a;
        case _a:
          if (s >= 6 && u >= 258) {
            e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = s, r.hold = f, r.bits = l, yy(e, d), o = e.next_out, i = e.output, u = e.avail_out, a = e.next_in, n = e.input, s = e.avail_in, f = r.hold, l = r.bits, r.mode === Ht && (r.back = -1);
            break;
          }
          for (r.back = 0; b = r.lencode[f & (1 << r.lenbits) - 1], v = b >>> 24, y = b >>> 16 & 255, A = b & 65535, !(v <= l); ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          if (y && !(y & 240)) {
            for (R = v, $ = y, j = A; b = r.lencode[j + ((f & (1 << R + $) - 1) >> R)], v = b >>> 24, y = b >>> 16 & 255, A = b & 65535, !(R + v <= l); ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            f >>>= R, l -= R, r.back += R;
          }
          if (f >>>= v, l -= v, r.back += v, r.length = A, y === 0) {
            r.mode = gf;
            break;
          }
          if (y & 32) {
            r.back = -1, r.mode = Ht;
            break;
          }
          if (y & 64) {
            e.msg = "invalid literal/length code", r.mode = _e;
            break;
          }
          r.extra = y & 15, r.mode = df;
        case df:
          if (r.extra) {
            for (N = r.extra; l < N; ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            r.length += f & (1 << r.extra) - 1, f >>>= r.extra, l -= r.extra, r.back += r.extra;
          }
          r.was = r.length, r.mode = hf;
        case hf:
          for (; b = r.distcode[f & (1 << r.distbits) - 1], v = b >>> 24, y = b >>> 16 & 255, A = b & 65535, !(v <= l); ) {
            if (s === 0)
              break e;
            s--, f += n[a++] << l, l += 8;
          }
          if (!(y & 240)) {
            for (R = v, $ = y, j = A; b = r.distcode[j + ((f & (1 << R + $) - 1) >> R)], v = b >>> 24, y = b >>> 16 & 255, A = b & 65535, !(R + v <= l); ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            f >>>= R, l -= R, r.back += R;
          }
          if (f >>>= v, l -= v, r.back += v, y & 64) {
            e.msg = "invalid distance code", r.mode = _e;
            break;
          }
          r.offset = A, r.extra = y & 15, r.mode = pf;
        case pf:
          if (r.extra) {
            for (N = r.extra; l < N; ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            r.offset += f & (1 << r.extra) - 1, f >>>= r.extra, l -= r.extra, r.back += r.extra;
          }
          if (r.offset > r.dmax) {
            e.msg = "invalid distance too far back", r.mode = _e;
            break;
          }
          r.mode = mf;
        case mf:
          if (u === 0)
            break e;
          if (p = d - u, r.offset > p) {
            if (p = r.offset - p, p > r.whave && r.sane) {
              e.msg = "invalid distance too far back", r.mode = _e;
              break;
            }
            p > r.wnext ? (p -= r.wnext, _ = r.wsize - p) : _ = r.wnext - p, p > r.length && (p = r.length), g = r.window;
          } else
            g = i, _ = o - r.offset, p = r.length;
          p > u && (p = u), u -= p, r.length -= p;
          do
            i[o++] = g[_++];
          while (--p);
          r.length === 0 && (r.mode = _a);
          break;
        case gf:
          if (u === 0)
            break e;
          i[o++] = r.length, u--, r.mode = _a;
          break;
        case xs:
          if (r.wrap) {
            for (; l < 32; ) {
              if (s === 0)
                break e;
              s--, f |= n[a++] << l, l += 8;
            }
            if (d -= u, e.total_out += d, r.total += d, d && (e.adler = r.check = /*UPDATE(state.check, put - _out, _out);*/
            r.flags ? kt(r.check, i, d, o - d) : El(r.check, i, d, o - d)), d = u, (r.flags ? f : yf(f)) !== r.check) {
              e.msg = "incorrect data check", r.mode = _e;
              break;
            }
            f = 0, l = 0;
          }
          r.mode = vf;
        case vf:
          if (r.wrap && r.flags) {
            for (; l < 32; ) {
              if (s === 0)
                break e;
              s--, f += n[a++] << l, l += 8;
            }
            if (f !== (r.total & 4294967295)) {
              e.msg = "incorrect length check", r.mode = _e;
              break;
            }
            f = 0, l = 0;
          }
          r.mode = _f;
        case _f:
          z = by;
          break e;
        case _e:
          z = Sp;
          break e;
        case Cp:
          return Tp;
        case Ay:
        default:
          return ht;
      }
  return e.next_out = o, e.avail_out = u, e.next_in = a, e.avail_in = s, r.hold = f, r.bits = l, (r.wsize || d !== e.avail_out && r.mode < _e && (r.mode < xs || t !== Zc)) && $p(e, e.output, e.next_out, d - e.avail_out), m -= e.avail_in, d -= e.avail_out, e.total_in += m, e.total_out += d, r.total += d, r.wrap && d && (e.adler = r.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
  r.flags ? kt(r.check, i, d, e.next_out - d) : El(r.check, i, d, e.next_out - d)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === Ht ? 128 : 0) + (r.mode === va || r.mode === Cs ? 256 : 0), (m === 0 && d === 0 || t === Zc) && z === Mr && (z = Ty), z;
}
function Ny(e) {
  if (!e || !e.state)
    return ht;
  var t = e.state;
  return t.window && (t.window = null), e.state = null, Mr;
}
function Py(e, t) {
  var r;
  return !e || !e.state || (r = e.state, !(r.wrap & 2)) ? ht : (r.head = t, t.done = !1, Mr);
}
function Fy(e, t) {
  var r = t.length, n, i, a;
  return !e || !e.state || (n = e.state, n.wrap !== 0 && n.mode !== Xa) ? ht : n.mode === Xa && (i = 1, i = El(i, t, r, 0), i !== n.check) ? Sp : (a = $p(e, t, r, r), a ? (n.mode = Cp, Tp) : (n.havedict = 1, Mr));
}
Tt.inflateReset = Rp;
Tt.inflateReset2 = Op;
Tt.inflateResetKeep = xp;
Tt.inflateInit = $y;
Tt.inflateInit2 = Ip;
Tt.inflate = Dy;
Tt.inflateEnd = Ny;
Tt.inflateGetHeader = Py;
Tt.inflateSetDictionary = Fy;
Tt.inflateInfo = "pako inflate (from Nodeca project)";
var kp = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
function Ly() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Uy = Ly, _n = Tt, ni = Yt, za = Gr, Ae = kp, bl = Ql, By = yp, My = Uy, Dp = Object.prototype.toString;
function jr(e) {
  if (!(this instanceof jr)) return new jr(e);
  this.options = ni.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ""
  }, e || {});
  var t = this.options;
  t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new By(), this.strm.avail_out = 0;
  var r = _n.inflateInit2(
    this.strm,
    t.windowBits
  );
  if (r !== Ae.Z_OK)
    throw new Error(bl[r]);
  if (this.header = new My(), _n.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = za.string2buf(t.dictionary) : Dp.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (r = _n.inflateSetDictionary(this.strm, t.dictionary), r !== Ae.Z_OK)))
    throw new Error(bl[r]);
}
jr.prototype.push = function(e, t) {
  var r = this.strm, n = this.options.chunkSize, i = this.options.dictionary, a, o, s, u, f, l = !1;
  if (this.ended)
    return !1;
  o = t === ~~t ? t : t === !0 ? Ae.Z_FINISH : Ae.Z_NO_FLUSH, typeof e == "string" ? r.input = za.binstring2buf(e) : Dp.call(e) === "[object ArrayBuffer]" ? r.input = new Uint8Array(e) : r.input = e, r.next_in = 0, r.avail_in = r.input.length;
  do {
    if (r.avail_out === 0 && (r.output = new ni.Buf8(n), r.next_out = 0, r.avail_out = n), a = _n.inflate(r, Ae.Z_NO_FLUSH), a === Ae.Z_NEED_DICT && i && (a = _n.inflateSetDictionary(this.strm, i)), a === Ae.Z_BUF_ERROR && l === !0 && (a = Ae.Z_OK, l = !1), a !== Ae.Z_STREAM_END && a !== Ae.Z_OK)
      return this.onEnd(a), this.ended = !0, !1;
    r.next_out && (r.avail_out === 0 || a === Ae.Z_STREAM_END || r.avail_in === 0 && (o === Ae.Z_FINISH || o === Ae.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (s = za.utf8border(r.output, r.next_out), u = r.next_out - s, f = za.buf2string(r.output, s), r.next_out = u, r.avail_out = n - u, u && ni.arraySet(r.output, r.output, s, u, 0), this.onData(f)) : this.onData(ni.shrinkBuf(r.output, r.next_out))), r.avail_in === 0 && r.avail_out === 0 && (l = !0);
  } while ((r.avail_in > 0 || r.avail_out === 0) && a !== Ae.Z_STREAM_END);
  return a === Ae.Z_STREAM_END && (o = Ae.Z_FINISH), o === Ae.Z_FINISH ? (a = _n.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === Ae.Z_OK) : (o === Ae.Z_SYNC_FLUSH && (this.onEnd(Ae.Z_OK), r.avail_out = 0), !0);
};
jr.prototype.onData = function(e) {
  this.chunks.push(e);
};
jr.prototype.onEnd = function(e) {
  e === Ae.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ni.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function tu(e, t) {
  var r = new jr(t);
  if (r.push(e, !0), r.err)
    throw r.msg || bl[r.err];
  return r.result;
}
function jy(e, t) {
  return t = t || {}, t.raw = !0, tu(e, t);
}
Bi.Inflate = jr;
Bi.inflate = tu;
Bi.inflateRaw = jy;
Bi.ungzip = tu;
var Hy = Yt.assign, zy = Fi, qy = Bi, Gy = kp, Np = {};
Hy(Np, zy, qy, Gy);
var Wy = Np, Vy = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", Yy = Wy, Pp = Te(), So = mt, Zy = Vy ? "uint8array" : "array";
yo.magic = "\b\0";
function Wr(e, t) {
  So.call(this, "FlateWorker/" + e), this._pako = null, this._pakoAction = e, this._pakoOptions = t, this.meta = {};
}
Pp.inherits(Wr, So);
Wr.prototype.processChunk = function(e) {
  this.meta = e.meta, this._pako === null && this._createPako(), this._pako.push(Pp.transformTo(Zy, e.data), !1);
};
Wr.prototype.flush = function() {
  So.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
};
Wr.prototype.cleanUp = function() {
  So.prototype.cleanUp.call(this), this._pako = null;
};
Wr.prototype._createPako = function() {
  this._pako = new Yy[this._pakoAction]({
    raw: !0,
    level: this._pakoOptions.level || -1
    // default compression
  });
  var e = this;
  this._pako.onData = function(t) {
    e.push({
      data: t,
      meta: e.meta
    });
  };
};
yo.compressWorker = function(e) {
  return new Wr("Deflate", e);
};
yo.uncompressWorker = function() {
  return new Wr("Inflate", {});
};
var Ef = mt;
_o.STORE = {
  magic: "\0\0",
  compressWorker: function() {
    return new Ef("STORE compression");
  },
  uncompressWorker: function() {
    return new Ef("STORE decompression");
  }
};
_o.DEFLATE = yo;
var _r = {};
_r.LOCAL_FILE_HEADER = "PK";
_r.CENTRAL_FILE_HEADER = "PK";
_r.CENTRAL_DIRECTORY_END = "PK";
_r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
_r.ZIP64_CENTRAL_DIRECTORY_END = "PK";
_r.DATA_DESCRIPTOR = "PK\x07\b";
var un = Te(), Dn = mt, Is = Rn, bf = Hl, Ka = _r, me = function(e, t) {
  var r = "", n;
  for (n = 0; n < t; n++)
    r += String.fromCharCode(e & 255), e = e >>> 8;
  return r;
}, Xy = function(e, t) {
  var r = e;
  return e || (r = t ? 16893 : 33204), (r & 65535) << 16;
}, Ky = function(e) {
  return (e || 0) & 63;
}, Fp = function(e, t, r, n, i, a) {
  var o = e.file, s = e.compression, u = a !== Is.utf8encode, f = un.transformTo("string", a(o.name)), l = un.transformTo("string", Is.utf8encode(o.name)), m = o.comment, d = un.transformTo("string", a(m)), p = un.transformTo("string", Is.utf8encode(m)), _ = l.length !== o.name.length, g = p.length !== m.length, b, v, y = "", A = "", R = "", $ = o.dir, j = o.date, B = {
    crc32: 0,
    compressedSize: 0,
    uncompressedSize: 0
  };
  (!t || r) && (B.crc32 = e.crc32, B.compressedSize = e.compressedSize, B.uncompressedSize = e.uncompressedSize);
  var z = 0;
  t && (z |= 8), !u && (_ || g) && (z |= 2048);
  var E = 0, q = 0;
  $ && (E |= 16), i === "UNIX" ? (q = 798, E |= Xy(o.unixPermissions, $)) : (q = 20, E |= Ky(o.dosPermissions)), b = j.getUTCHours(), b = b << 6, b = b | j.getUTCMinutes(), b = b << 5, b = b | j.getUTCSeconds() / 2, v = j.getUTCFullYear() - 1980, v = v << 4, v = v | j.getUTCMonth() + 1, v = v << 5, v = v | j.getUTCDate(), _ && (A = // Version
  me(1, 1) + // NameCRC32
  me(bf(f), 4) + // UnicodeName
  l, y += // Info-ZIP Unicode Path Extra Field
  "up" + // size
  me(A.length, 2) + // content
  A), g && (R = // Version
  me(1, 1) + // CommentCRC32
  me(bf(d), 4) + // UnicodeName
  p, y += // Info-ZIP Unicode Path Extra Field
  "uc" + // size
  me(R.length, 2) + // content
  R);
  var N = "";
  N += `
\0`, N += me(z, 2), N += s.magic, N += me(b, 2), N += me(v, 2), N += me(B.crc32, 4), N += me(B.compressedSize, 4), N += me(B.uncompressedSize, 4), N += me(f.length, 2), N += me(y.length, 2);
  var Y = Ka.LOCAL_FILE_HEADER + N + f + y, re = Ka.CENTRAL_FILE_HEADER + // version made by (00: DOS)
  me(q, 2) + // file header (common to file and central directory)
  N + // file comment length
  me(d.length, 2) + // disk number start
  "\0\0\0\0" + // external file attributes
  me(E, 4) + // relative offset of local header
  me(n, 4) + // file name
  f + // extra field
  y + // file comment
  d;
  return {
    fileRecord: Y,
    dirRecord: re
  };
}, Jy = function(e, t, r, n, i) {
  var a = "", o = un.transformTo("string", i(n));
  return a = Ka.CENTRAL_DIRECTORY_END + // number of this disk
  "\0\0\0\0" + // total number of entries in the central directory on this disk
  me(e, 2) + // total number of entries in the central directory
  me(e, 2) + // size of the central directory   4 bytes
  me(t, 4) + // offset of start of central directory with respect to the starting disk number
  me(r, 4) + // .ZIP file comment length
  me(o.length, 2) + // .ZIP file comment
  o, a;
}, Qy = function(e) {
  var t = "";
  return t = Ka.DATA_DESCRIPTOR + // crc-32                          4 bytes
  me(e.crc32, 4) + // compressed size                 4 bytes
  me(e.compressedSize, 4) + // uncompressed size               4 bytes
  me(e.uncompressedSize, 4), t;
};
function At(e, t, r, n) {
  Dn.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t, this.zipPlatform = r, this.encodeFileName = n, this.streamFiles = e, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
}
un.inherits(At, Dn);
At.prototype.push = function(e) {
  var t = e.meta.percent || 0, r = this.entriesCount, n = this._sources.length;
  this.accumulate ? this.contentBuffer.push(e) : (this.bytesWritten += e.data.length, Dn.prototype.push.call(this, {
    data: e.data,
    meta: {
      currentFile: this.currentFile,
      percent: r ? (t + 100 * (r - n - 1)) / r : 100
    }
  }));
};
At.prototype.openedSource = function(e) {
  this.currentSourceOffset = this.bytesWritten, this.currentFile = e.file.name;
  var t = this.streamFiles && !e.file.dir;
  if (t) {
    var r = Fp(e, t, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
    this.push({
      data: r.fileRecord,
      meta: { percent: 0 }
    });
  } else
    this.accumulate = !0;
};
At.prototype.closedSource = function(e) {
  this.accumulate = !1;
  var t = this.streamFiles && !e.file.dir, r = Fp(e, t, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
  if (this.dirRecords.push(r.dirRecord), t)
    this.push({
      data: Qy(e),
      meta: { percent: 100 }
    });
  else
    for (this.push({
      data: r.fileRecord,
      meta: { percent: 0 }
    }); this.contentBuffer.length; )
      this.push(this.contentBuffer.shift());
  this.currentFile = null;
};
At.prototype.flush = function() {
  for (var e = this.bytesWritten, t = 0; t < this.dirRecords.length; t++)
    this.push({
      data: this.dirRecords[t],
      meta: { percent: 100 }
    });
  var r = this.bytesWritten - e, n = Jy(this.dirRecords.length, r, e, this.zipComment, this.encodeFileName);
  this.push({
    data: n,
    meta: { percent: 100 }
  });
};
At.prototype.prepareNextSource = function() {
  this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
};
At.prototype.registerPrevious = function(e) {
  this._sources.push(e);
  var t = this;
  return e.on("data", function(r) {
    t.processChunk(r);
  }), e.on("end", function() {
    t.closedSource(t.previous.streamInfo), t._sources.length ? t.prepareNextSource() : t.end();
  }), e.on("error", function(r) {
    t.error(r);
  }), this;
};
At.prototype.resume = function() {
  if (!Dn.prototype.resume.call(this))
    return !1;
  if (!this.previous && this._sources.length)
    return this.prepareNextSource(), !0;
  if (!this.previous && !this._sources.length && !this.generatedError)
    return this.end(), !0;
};
At.prototype.error = function(e) {
  var t = this._sources;
  if (!Dn.prototype.error.call(this, e))
    return !1;
  for (var r = 0; r < t.length; r++)
    try {
      t[r].error(e);
    } catch {
    }
  return !0;
};
At.prototype.lock = function() {
  Dn.prototype.lock.call(this);
  for (var e = this._sources, t = 0; t < e.length; t++)
    e[t].lock();
};
var ew = At, tw = _o, rw = ew, nw = function(e, t) {
  var r = e || t, n = tw[r];
  if (!n)
    throw new Error(r + " is not a valid compression method !");
  return n;
};
Vh.generateWorker = function(e, t, r) {
  var n = new rw(t.streamFiles, r, t.platform, t.encodeFileName), i = 0;
  try {
    e.forEach(function(a, o) {
      i++;
      var s = nw(o.options.compression, t.compression), u = o.options.compressionOptions || t.compressionOptions || {}, f = o.dir, l = o.date;
      o._compressWorker(s, u).withStreamInfo("file", {
        name: a,
        dir: f,
        date: l,
        comment: o.comment || "",
        unixPermissions: o.unixPermissions,
        dosPermissions: o.dosPermissions
      }).pipe(n);
    }), n.entriesCount = i;
  } catch (a) {
    n.error(a);
  }
  return n;
};
var iw = Te(), To = mt;
function Mi(e, t) {
  To.call(this, "Nodejs stream input adapter for " + e), this._upstreamEnded = !1, this._bindStream(t);
}
iw.inherits(Mi, To);
Mi.prototype._bindStream = function(e) {
  var t = this;
  this._stream = e, e.pause(), e.on("data", function(r) {
    t.push({
      data: r,
      meta: {
        percent: 0
      }
    });
  }).on("error", function(r) {
    t.isPaused ? this.generatedError = r : t.error(r);
  }).on("end", function() {
    t.isPaused ? t._upstreamEnded = !0 : t.end();
  });
};
Mi.prototype.pause = function() {
  return To.prototype.pause.call(this) ? (this._stream.pause(), !0) : !1;
};
Mi.prototype.resume = function() {
  return To.prototype.resume.call(this) ? (this._upstreamEnded ? this.end() : this._stream.resume(), !0) : !1;
};
var aw = Mi, ow = Rn, ii = Te(), Lp = mt, sw = Hh, Up = gt, Sf = Vl, lw = e_, uw = Vh, Tf = mo, cw = aw, Bp = function(e, t, r) {
  var n = ii.getTypeOf(t), i, a = ii.extend(r || {}, Up);
  a.date = a.date || /* @__PURE__ */ new Date(), a.compression !== null && (a.compression = a.compression.toUpperCase()), typeof a.unixPermissions == "string" && (a.unixPermissions = parseInt(a.unixPermissions, 8)), a.unixPermissions && a.unixPermissions & 16384 && (a.dir = !0), a.dosPermissions && a.dosPermissions & 16 && (a.dir = !0), a.dir && (e = Mp(e)), a.createFolders && (i = fw(e)) && jp.call(this, i, !0);
  var o = n === "string" && a.binary === !1 && a.base64 === !1;
  (!r || typeof r.binary > "u") && (a.binary = !o);
  var s = t instanceof Sf && t.uncompressedSize === 0;
  (s || a.dir || !t || t.length === 0) && (a.base64 = !1, a.binary = !0, t = "", a.compression = "STORE", n = "string");
  var u = null;
  t instanceof Sf || t instanceof Lp ? u = t : Tf.isNode && Tf.isStream(t) ? u = new cw(e, t) : u = ii.prepareContent(e, t, a.binary, a.optimizedBinaryString, a.base64);
  var f = new lw(e, u, a);
  this.files[e] = f;
}, fw = function(e) {
  e.slice(-1) === "/" && (e = e.substring(0, e.length - 1));
  var t = e.lastIndexOf("/");
  return t > 0 ? e.substring(0, t) : "";
}, Mp = function(e) {
  return e.slice(-1) !== "/" && (e += "/"), e;
}, jp = function(e, t) {
  return t = typeof t < "u" ? t : Up.createFolders, e = Mp(e), this.files[e] || Bp.call(this, e, null, {
    dir: !0,
    createFolders: t
  }), this.files[e];
};
function Af(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var dw = {
  /**
   * @see loadAsync
   */
  load: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Call a callback function for each entry at this folder level.
   * @param {Function} cb the callback function:
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   */
  forEach: function(e) {
    var t, r, n;
    for (t in this.files)
      n = this.files[t], r = t.slice(this.root.length, t.length), r && t.slice(0, this.root.length) === this.root && e(r, n);
  },
  /**
   * Filter nested files/folders with the specified function.
   * @param {Function} search the predicate to use :
   * function (relativePath, file) {...}
   * It takes 2 arguments : the relative path and the file.
   * @return {Array} An array of matching elements.
   */
  filter: function(e) {
    var t = [];
    return this.forEach(function(r, n) {
      e(r, n) && t.push(n);
    }), t;
  },
  /**
   * Add a file to the zip file, or search a file.
   * @param   {string|RegExp} name The name of the file to add (if data is defined),
   * the name of the file to find (if no data) or a regex to match files.
   * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
   * @param   {Object} o     File options
   * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
   * a file (when searching by string) or an array of files (when searching by regex).
   */
  file: function(e, t, r) {
    if (arguments.length === 1)
      if (Af(e)) {
        var n = e;
        return this.filter(function(a, o) {
          return !o.dir && n.test(a);
        });
      } else {
        var i = this.files[this.root + e];
        return i && !i.dir ? i : null;
      }
    else
      e = this.root + e, Bp.call(this, e, t, r);
    return this;
  },
  /**
   * Add a directory to the zip file, or search.
   * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
   * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
   */
  folder: function(e) {
    if (!e)
      return this;
    if (Af(e))
      return this.filter(function(i, a) {
        return a.dir && e.test(i);
      });
    var t = this.root + e, r = jp.call(this, t), n = this.clone();
    return n.root = r.name, n;
  },
  /**
   * Delete a file, or a directory and all sub-files, from the zip
   * @param {string} name the name of the file to delete
   * @return {JSZip} this JSZip object
   */
  remove: function(e) {
    e = this.root + e;
    var t = this.files[e];
    if (t || (e.slice(-1) !== "/" && (e += "/"), t = this.files[e]), t && !t.dir)
      delete this.files[e];
    else
      for (var r = this.filter(function(i, a) {
        return a.name.slice(0, e.length) === e;
      }), n = 0; n < r.length; n++)
        delete this.files[r[n].name];
    return this;
  },
  /**
   * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
   */
  generate: function() {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
  },
  /**
   * Generate the complete zip file as an internal stream.
   * @param {Object} options the options to generate the zip file :
   * - compression, "STORE" by default.
   * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
   * @return {StreamHelper} the streamed zip file.
   */
  generateInternalStream: function(e) {
    var t, r = {};
    try {
      if (r = ii.extend(e || {}, {
        streamFiles: !1,
        compression: "STORE",
        compressionOptions: null,
        type: "",
        platform: "DOS",
        comment: null,
        mimeType: "application/zip",
        encodeFileName: ow.utf8encode
      }), r.type = r.type.toLowerCase(), r.compression = r.compression.toUpperCase(), r.type === "binarystring" && (r.type = "string"), !r.type)
        throw new Error("No output type specified.");
      ii.checkSupport(r.type), (r.platform === "darwin" || r.platform === "freebsd" || r.platform === "linux" || r.platform === "sunos") && (r.platform = "UNIX"), r.platform === "win32" && (r.platform = "DOS");
      var n = r.comment || this.comment || "";
      t = uw.generateWorker(this, r, n);
    } catch (i) {
      t = new Lp("error"), t.error(i);
    }
    return new sw(t, r.type || "string", r.mimeType);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateAsync: function(e, t) {
    return this.generateInternalStream(e).accumulate(t);
  },
  /**
   * Generate the complete zip file asynchronously.
   * @see generateInternalStream
   */
  generateNodeStream: function(e, t) {
    return e = e || {}, e.type || (e.type = "nodebuffer"), this.generateInternalStream(e).toNodejsStream(t);
  }
}, hw = dw, pw = Te();
function Hp(e) {
  this.data = e, this.length = e.length, this.index = 0, this.zero = 0;
}
Hp.prototype = {
  /**
   * Check that the offset will not go too far.
   * @param {string} offset the additional offset to check.
   * @throws {Error} an Error if the offset is out of bounds.
   */
  checkOffset: function(e) {
    this.checkIndex(this.index + e);
  },
  /**
   * Check that the specified index will not be too far.
   * @param {string} newIndex the index to check.
   * @throws {Error} an Error if the index is out of bounds.
   */
  checkIndex: function(e) {
    if (this.length < this.zero + e || e < 0)
      throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?");
  },
  /**
   * Change the index.
   * @param {number} newIndex The new index.
   * @throws {Error} if the new index is out of the data.
   */
  setIndex: function(e) {
    this.checkIndex(e), this.index = e;
  },
  /**
   * Skip the next n bytes.
   * @param {number} n the number of bytes to skip.
   * @throws {Error} if the new index is out of the data.
   */
  skip: function(e) {
    this.setIndex(this.index + e);
  },
  /**
   * Get the byte at the specified index.
   * @param {number} i the index to use.
   * @return {number} a byte.
   */
  byteAt: function() {
  },
  /**
   * Get the next number with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {number} the corresponding number.
   */
  readInt: function(e) {
    var t = 0, r;
    for (this.checkOffset(e), r = this.index + e - 1; r >= this.index; r--)
      t = (t << 8) + this.byteAt(r);
    return this.index += e, t;
  },
  /**
   * Get the next string with a given byte size.
   * @param {number} size the number of bytes to read.
   * @return {string} the corresponding string.
   */
  readString: function(e) {
    return pw.transformTo("string", this.readData(e));
  },
  /**
   * Get raw data without conversion, <size> bytes.
   * @param {number} size the number of bytes to read.
   * @return {Object} the raw data, implementation specific.
   */
  readData: function() {
  },
  /**
   * Find the last occurrence of a zip signature (4 bytes).
   * @param {string} sig the signature to find.
   * @return {number} the index of the last occurrence, -1 if not found.
   */
  lastIndexOfSignature: function() {
  },
  /**
   * Read the signature (4 bytes) at the current position and compare it with sig.
   * @param {string} sig the expected signature
   * @return {boolean} true if the signature matches, false otherwise.
   */
  readAndCheckSignature: function() {
  },
  /**
   * Get the next date.
   * @return {Date} the date.
   */
  readDate: function() {
    var e = this.readInt(4);
    return new Date(Date.UTC(
      (e >> 25 & 127) + 1980,
      // year
      (e >> 21 & 15) - 1,
      // month
      e >> 16 & 31,
      // day
      e >> 11 & 31,
      // hour
      e >> 5 & 63,
      // minute
      (e & 31) << 1
    ));
  }
};
var zp = Hp, qp = zp, mw = Te();
function Nn(e) {
  qp.call(this, e);
  for (var t = 0; t < this.data.length; t++)
    e[t] = e[t] & 255;
}
mw.inherits(Nn, qp);
Nn.prototype.byteAt = function(e) {
  return this.data[this.zero + e];
};
Nn.prototype.lastIndexOfSignature = function(e) {
  for (var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), a = this.length - 4; a >= 0; --a)
    if (this.data[a] === t && this.data[a + 1] === r && this.data[a + 2] === n && this.data[a + 3] === i)
      return a - this.zero;
  return -1;
};
Nn.prototype.readAndCheckSignature = function(e) {
  var t = e.charCodeAt(0), r = e.charCodeAt(1), n = e.charCodeAt(2), i = e.charCodeAt(3), a = this.readData(4);
  return t === a[0] && r === a[1] && n === a[2] && i === a[3];
};
Nn.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return [];
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var Gp = Nn, Wp = zp, gw = Te();
function Pn(e) {
  Wp.call(this, e);
}
gw.inherits(Pn, Wp);
Pn.prototype.byteAt = function(e) {
  return this.data.charCodeAt(this.zero + e);
};
Pn.prototype.lastIndexOfSignature = function(e) {
  return this.data.lastIndexOf(e) - this.zero;
};
Pn.prototype.readAndCheckSignature = function(e) {
  var t = this.readData(4);
  return e === t;
};
Pn.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var vw = Pn, Vp = Gp, _w = Te();
function ru(e) {
  Vp.call(this, e);
}
_w.inherits(ru, Vp);
ru.prototype.readData = function(e) {
  if (this.checkOffset(e), e === 0)
    return new Uint8Array(0);
  var t = this.data.subarray(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var Yp = ru, Zp = Yp, yw = Te();
function nu(e) {
  Zp.call(this, e);
}
yw.inherits(nu, Zp);
nu.prototype.readData = function(e) {
  this.checkOffset(e);
  var t = this.data.slice(this.zero + this.index, this.zero + this.index + e);
  return this.index += e, t;
};
var ww = nu, ya = Te(), Cf = xe, Ew = Gp, bw = vw, Sw = ww, Tw = Yp, Xp = function(e) {
  var t = ya.getTypeOf(e);
  return ya.checkSupport(t), t === "string" && !Cf.uint8array ? new bw(e) : t === "nodebuffer" ? new Sw(e) : Cf.uint8array ? new Tw(ya.transformTo("uint8array", e)) : new Ew(ya.transformTo("array", e));
}, $s = Xp, Qt = Te(), Aw = Vl, xf = Hl, wa = Rn, Ea = _o, Cw = xe, xw = 0, Rw = 3, Ow = function(e) {
  for (var t in Ea)
    if (Object.prototype.hasOwnProperty.call(Ea, t) && Ea[t].magic === e)
      return Ea[t];
  return null;
};
function Kp(e, t) {
  this.options = e, this.loadOptions = t;
}
Kp.prototype = {
  /**
   * say if the file is encrypted.
   * @return {boolean} true if the file is encrypted, false otherwise.
   */
  isEncrypted: function() {
    return (this.bitFlag & 1) === 1;
  },
  /**
   * say if the file has utf-8 filename/comment.
   * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
   */
  useUTF8: function() {
    return (this.bitFlag & 2048) === 2048;
  },
  /**
   * Read the local part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readLocalPart: function(e) {
    var t, r;
    if (e.skip(22), this.fileNameLength = e.readInt(2), r = e.readInt(2), this.fileName = e.readData(this.fileNameLength), e.skip(r), this.compressedSize === -1 || this.uncompressedSize === -1)
      throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
    if (t = Ow(this.compressionMethod), t === null)
      throw new Error("Corrupted zip : compression " + Qt.pretty(this.compressionMethod) + " unknown (inner file : " + Qt.transformTo("string", this.fileName) + ")");
    this.decompressed = new Aw(this.compressedSize, this.uncompressedSize, this.crc32, t, e.readData(this.compressedSize));
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readCentralPart: function(e) {
    this.versionMadeBy = e.readInt(2), e.skip(2), this.bitFlag = e.readInt(2), this.compressionMethod = e.readString(2), this.date = e.readDate(), this.crc32 = e.readInt(4), this.compressedSize = e.readInt(4), this.uncompressedSize = e.readInt(4);
    var t = e.readInt(2);
    if (this.extraFieldsLength = e.readInt(2), this.fileCommentLength = e.readInt(2), this.diskNumberStart = e.readInt(2), this.internalFileAttributes = e.readInt(2), this.externalFileAttributes = e.readInt(4), this.localHeaderOffset = e.readInt(4), this.isEncrypted())
      throw new Error("Encrypted zip are not supported");
    e.skip(t), this.readExtraFields(e), this.parseZIP64ExtraField(e), this.fileComment = e.readData(this.fileCommentLength);
  },
  /**
   * Parse the external file attributes and get the unix/dos permissions.
   */
  processAttributes: function() {
    this.unixPermissions = null, this.dosPermissions = null;
    var e = this.versionMadeBy >> 8;
    this.dir = !!(this.externalFileAttributes & 16), e === xw && (this.dosPermissions = this.externalFileAttributes & 63), e === Rw && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), !this.dir && this.fileNameStr.slice(-1) === "/" && (this.dir = !0);
  },
  /**
   * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
   * @param {DataReader} reader the reader to use.
   */
  parseZIP64ExtraField: function() {
    if (this.extraFields[1]) {
      var e = $s(this.extraFields[1].value);
      this.uncompressedSize === Qt.MAX_VALUE_32BITS && (this.uncompressedSize = e.readInt(8)), this.compressedSize === Qt.MAX_VALUE_32BITS && (this.compressedSize = e.readInt(8)), this.localHeaderOffset === Qt.MAX_VALUE_32BITS && (this.localHeaderOffset = e.readInt(8)), this.diskNumberStart === Qt.MAX_VALUE_32BITS && (this.diskNumberStart = e.readInt(4));
    }
  },
  /**
   * Read the central part of a zip file and add the info in this object.
   * @param {DataReader} reader the reader to use.
   */
  readExtraFields: function(e) {
    var t = e.index + this.extraFieldsLength, r, n, i;
    for (this.extraFields || (this.extraFields = {}); e.index + 4 < t; )
      r = e.readInt(2), n = e.readInt(2), i = e.readData(n), this.extraFields[r] = {
        id: r,
        length: n,
        value: i
      };
    e.setIndex(t);
  },
  /**
   * Apply an UTF8 transformation if needed.
   */
  handleUTF8: function() {
    var e = Cw.uint8array ? "uint8array" : "array";
    if (this.useUTF8())
      this.fileNameStr = wa.utf8decode(this.fileName), this.fileCommentStr = wa.utf8decode(this.fileComment);
    else {
      var t = this.findExtraFieldUnicodePath();
      if (t !== null)
        this.fileNameStr = t;
      else {
        var r = Qt.transformTo(e, this.fileName);
        this.fileNameStr = this.loadOptions.decodeFileName(r);
      }
      var n = this.findExtraFieldUnicodeComment();
      if (n !== null)
        this.fileCommentStr = n;
      else {
        var i = Qt.transformTo(e, this.fileComment);
        this.fileCommentStr = this.loadOptions.decodeFileName(i);
      }
    }
  },
  /**
   * Find the unicode path declared in the extra field, if any.
   * @return {String} the unicode path, null otherwise.
   */
  findExtraFieldUnicodePath: function() {
    var e = this.extraFields[28789];
    if (e) {
      var t = $s(e.value);
      return t.readInt(1) !== 1 || xf(this.fileName) !== t.readInt(4) ? null : wa.utf8decode(t.readData(e.length - 5));
    }
    return null;
  },
  /**
   * Find the unicode comment declared in the extra field, if any.
   * @return {String} the unicode comment, null otherwise.
   */
  findExtraFieldUnicodeComment: function() {
    var e = this.extraFields[25461];
    if (e) {
      var t = $s(e.value);
      return t.readInt(1) !== 1 || xf(this.fileComment) !== t.readInt(4) ? null : wa.utf8decode(t.readData(e.length - 5));
    }
    return null;
  }
};
var Iw = Kp, $w = Xp, zt = Te(), yt = _r, kw = Iw, Dw = xe;
function Jp(e) {
  this.files = [], this.loadOptions = e;
}
Jp.prototype = {
  /**
   * Check that the reader is on the specified signature.
   * @param {string} expectedSignature the expected signature.
   * @throws {Error} if it is an other signature.
   */
  checkSignature: function(e) {
    if (!this.reader.readAndCheckSignature(e)) {
      this.reader.index -= 4;
      var t = this.reader.readString(4);
      throw new Error("Corrupted zip or bug: unexpected signature (" + zt.pretty(t) + ", expected " + zt.pretty(e) + ")");
    }
  },
  /**
   * Check if the given signature is at the given index.
   * @param {number} askedIndex the index to check.
   * @param {string} expectedSignature the signature to expect.
   * @return {boolean} true if the signature is here, false otherwise.
   */
  isSignature: function(e, t) {
    var r = this.reader.index;
    this.reader.setIndex(e);
    var n = this.reader.readString(4), i = n === t;
    return this.reader.setIndex(r), i;
  },
  /**
   * Read the end of the central directory.
   */
  readBlockEndOfCentral: function() {
    this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
    var e = this.reader.readData(this.zipCommentLength), t = Dw.uint8array ? "uint8array" : "array", r = zt.transformTo(t, e);
    this.zipComment = this.loadOptions.decodeFileName(r);
  },
  /**
   * Read the end of the Zip 64 central directory.
   * Not merged with the method readEndOfCentral :
   * The end of central can coexist with its Zip64 brother,
   * I don't want to read the wrong number of bytes !
   */
  readBlockZip64EndOfCentral: function() {
    this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
    for (var e = this.zip64EndOfCentralSize - 44, t = 0, r, n, i; t < e; )
      r = this.reader.readInt(2), n = this.reader.readInt(4), i = this.reader.readData(n), this.zip64ExtensibleData[r] = {
        id: r,
        length: n,
        value: i
      };
  },
  /**
   * Read the end of the Zip 64 central directory locator.
   */
  readBlockZip64EndOfCentralLocator: function() {
    if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1)
      throw new Error("Multi-volumes zip are not supported");
  },
  /**
   * Read the local files, based on the offset read in the central part.
   */
  readLocalFiles: function() {
    var e, t;
    for (e = 0; e < this.files.length; e++)
      t = this.files[e], this.reader.setIndex(t.localHeaderOffset), this.checkSignature(yt.LOCAL_FILE_HEADER), t.readLocalPart(this.reader), t.handleUTF8(), t.processAttributes();
  },
  /**
   * Read the central directory.
   */
  readCentralDir: function() {
    var e;
    for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(yt.CENTRAL_FILE_HEADER); )
      e = new kw({
        zip64: this.zip64
      }, this.loadOptions), e.readCentralPart(this.reader), this.files.push(e);
    if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
      throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
  },
  /**
   * Read the end of central directory.
   */
  readEndOfCentral: function() {
    var e = this.reader.lastIndexOfSignature(yt.CENTRAL_DIRECTORY_END);
    if (e < 0) {
      var t = !this.isSignature(0, yt.LOCAL_FILE_HEADER);
      throw t ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
    }
    this.reader.setIndex(e);
    var r = e;
    if (this.checkSignature(yt.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === zt.MAX_VALUE_16BITS || this.diskWithCentralDirStart === zt.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === zt.MAX_VALUE_16BITS || this.centralDirRecords === zt.MAX_VALUE_16BITS || this.centralDirSize === zt.MAX_VALUE_32BITS || this.centralDirOffset === zt.MAX_VALUE_32BITS) {
      if (this.zip64 = !0, e = this.reader.lastIndexOfSignature(yt.ZIP64_CENTRAL_DIRECTORY_LOCATOR), e < 0)
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
      if (this.reader.setIndex(e), this.checkSignature(yt.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, yt.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(yt.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
        throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
      this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(yt.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
    }
    var n = this.centralDirOffset + this.centralDirSize;
    this.zip64 && (n += 20, n += 12 + this.zip64EndOfCentralSize);
    var i = r - n;
    if (i > 0)
      this.isSignature(r, yt.CENTRAL_FILE_HEADER) || (this.reader.zero = i);
    else if (i < 0)
      throw new Error("Corrupted zip: missing " + Math.abs(i) + " bytes.");
  },
  prepareReader: function(e) {
    this.reader = $w(e);
  },
  /**
   * Read a zip file and create ZipEntries.
   * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
   */
  load: function(e) {
    this.prepareReader(e), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
  }
};
var Nw = Jp, ks = Te(), qa = Pi, Pw = Rn, Fw = Nw, Lw = Wh, Rf = mo;
function Uw(e) {
  return new qa.Promise(function(t, r) {
    var n = e.decompressed.getContentWorker().pipe(new Lw());
    n.on("error", function(i) {
      r(i);
    }).on("end", function() {
      n.streamInfo.crc32 !== e.decompressed.crc32 ? r(new Error("Corrupted zip : CRC32 mismatch")) : t();
    }).resume();
  });
}
var Bw = function(e, t) {
  var r = this;
  return t = ks.extend(t || {}, {
    base64: !1,
    checkCRC32: !1,
    optimizedBinaryString: !1,
    createFolders: !1,
    decodeFileName: Pw.utf8decode
  }), Rf.isNode && Rf.isStream(e) ? qa.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : ks.prepareContent("the loaded zip file", e, !0, t.optimizedBinaryString, t.base64).then(function(n) {
    var i = new Fw(t);
    return i.load(n), i;
  }).then(function(i) {
    var a = [qa.Promise.resolve(i)], o = i.files;
    if (t.checkCRC32)
      for (var s = 0; s < o.length; s++)
        a.push(Uw(o[s]));
    return qa.Promise.all(a);
  }).then(function(i) {
    for (var a = i.shift(), o = a.files, s = 0; s < o.length; s++) {
      var u = o[s], f = u.fileNameStr, l = ks.resolve(u.fileNameStr);
      r.file(l, u.decompressed, {
        binary: !0,
        optimizedBinaryString: !0,
        date: u.date,
        dir: u.dir,
        comment: u.fileCommentStr.length ? u.fileCommentStr : null,
        unixPermissions: u.unixPermissions,
        dosPermissions: u.dosPermissions,
        createFolders: t.createFolders
      }), u.dir || (r.file(l).unsafeOriginalName = f);
    }
    return a.zipComment.length && (r.comment = a.zipComment), r;
  });
};
function dt() {
  if (!(this instanceof dt))
    return new dt();
  if (arguments.length)
    throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
  this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
    var e = new dt();
    for (var t in this)
      typeof this[t] != "function" && (e[t] = this[t]);
    return e;
  };
}
dt.prototype = hw;
dt.prototype.loadAsync = Bw;
dt.support = xe;
dt.defaults = gt;
dt.version = "3.10.1";
dt.loadAsync = function(e, t) {
  return new dt().loadAsync(e, t);
};
dt.external = Pi;
var Mw = dt, ai = pe, Qp = pt, e0 = parseInt("0777", 8), jw = yn.mkdirp = yn.mkdirP = yn;
function yn(e, t, r, n) {
  typeof t == "function" ? (r = t, t = {}) : (!t || typeof t != "object") && (t = { mode: t });
  var i = t.mode, a = t.fs || Qp;
  i === void 0 && (i = e0), n || (n = null);
  var o = r || /* istanbul ignore next */
  function() {
  };
  e = ai.resolve(e), a.mkdir(e, i, function(s) {
    if (!s)
      return n = n || e, o(null, n);
    switch (s.code) {
      case "ENOENT":
        if (ai.dirname(e) === e) return o(s);
        yn(ai.dirname(e), t, function(u, f) {
          u ? o(u, f) : yn(e, t, o, f);
        });
        break;
      default:
        a.stat(e, function(u, f) {
          u || !f.isDirectory() ? o(s, n) : o(null, n);
        });
        break;
    }
  });
}
yn.sync = function e(t, r, n) {
  (!r || typeof r != "object") && (r = { mode: r });
  var i = r.mode, a = r.fs || Qp;
  i === void 0 && (i = e0), n || (n = null), t = ai.resolve(t);
  try {
    a.mkdirSync(t, i), n = n || t;
  } catch (s) {
    switch (s.code) {
      case "ENOENT":
        n = e(ai.dirname(t), r, n), e(t, r, n);
        break;
      default:
        var o;
        try {
          o = a.statSync(t);
        } catch {
          throw s;
        }
        if (!o.isDirectory()) throw s;
        break;
    }
  }
  return n;
};
var t0 = { exports: {} };
(function() {
  var e, t = null, r = typeof window == "object" ? window : se, n = !1, i = r.process, a = Array, o = Error, s = 0, u = 1, f = 2, l = "Symbol", m = "iterator", d = "species", p = l + "(" + d + ")", _ = "return", g = "_uh", b = "_pt", v = "_st", y = "Invalid this", A = "Invalid argument", R = `
From previous `, $ = "Chaining cycle detected for promise", j = "Uncaught (in promise)", B = "rejectionHandled", z = "unhandledRejection", E, q, N = { e: t }, Y = function() {
  }, re = /^.+\/node_modules\/yaku\/.+\n?/mg, D = t0.exports = function(L) {
    var H = this, Q;
    if (!S(H) || H._s !== e)
      throw fe(y);
    if (H._s = f, n && (H[b] = h()), L !== Y) {
      if (!C(L))
        throw fe(A);
      Q = te(L)(
        K(H, u),
        K(H, s)
      ), Q === N && le(H, s, Q.e);
    }
  };
  D.default = D, M(D, {
    /**
     * Appends fulfillment and rejection handlers to the promise,
     * and returns a new promise resolving to the return value of the called handler.
     * @param  {Function} onFulfilled Optional. Called when the Promise is resolved.
     * @param  {Function} onRejected  Optional. Called when the Promise is rejected.
     * @return {Yaku} It will return a new Yaku which will resolve or reject after
     * @example
     * the current Promise.
     * ```js
     * var Promise = require('yaku');
     * var p = Promise.resolve(10);
     *
     * p.then((v) => {
     *     console.log(v);
     * });
     * ```
     */
    then: function(L, H) {
      if (this._s === void 0) throw fe();
      return ve(
        this,
        G(D.speciesConstructor(this, D)),
        L,
        H
      );
    },
    /**
     * The `catch()` method returns a Promise and deals with rejected cases only.
     * It behaves the same as calling `Promise.prototype.then(undefined, onRejected)`.
     * @param  {Function} onRejected A Function called when the Promise is rejected.
     * This function has one argument, the rejection reason.
     * @return {Yaku} A Promise that deals with rejected cases only.
     * @example
     * ```js
     * var Promise = require('yaku');
     * var p = Promise.reject(new Error("ERR"));
     *
     * p['catch']((v) => {
     *     console.log(v);
     * });
     * ```
     */
    catch: function(k) {
      return this.then(e, k);
    },
    // The number of current promises that attach to this Yaku instance.
    _pCount: 0,
    // The parent Yaku.
    _pre: t,
    // A unique type flag, it helps different versions of Yaku know each other.
    _Yaku: 1
  }), D.resolve = function(L) {
    return Z(L) ? L : vt(G(this), L);
  }, D.reject = function(L) {
    return le(G(this), s, L);
  }, D.race = function(L) {
    var H = this, Q = G(H), de = function(He) {
      le(Q, u, He);
    }, ce = function(He) {
      le(Q, s, He);
    }, et = te(J)(L, function(He) {
      H.resolve(He).then(de, ce);
    });
    return et === N ? H.reject(et.e) : Q;
  }, D.all = function(L) {
    var H = this, Q = G(H), de = [], ce;
    function et(He) {
      le(Q, s, He);
    }
    return ce = te(J)(L, function(He, st) {
      H.resolve(He).then(function(Qi) {
        de[st] = Qi, --ce || le(Q, u, de);
      }, et);
    }), ce === N ? H.reject(ce.e) : (ce || le(Q, u, []), Q);
  }, D.Symbol = r[l] || {}, te(function() {
    Object.defineProperty(D, P(), {
      get: function() {
        return this;
      }
    });
  })(), D.speciesConstructor = function(k, L) {
    var H = k.constructor;
    return H && H[P()] || L;
  }, D.unhandledRejection = function(k, L) {
    try {
      r.console.error(
        j,
        n ? L.longStack : Qe(k, L)
      );
    } catch {
    }
  }, D.rejectionHandled = Y, D.enableLongStackTrace = function() {
    n = !0;
  }, D.nextTick = i ? i.nextTick : function(k) {
    setTimeout(k);
  }, D._Yaku = 1;
  function P() {
    return D[l][d] || p;
  }
  function M(k, L) {
    for (var H in L)
      k.prototype[H] = L[H];
    return k;
  }
  function S(k) {
    return k && typeof k == "object";
  }
  function C(k) {
    return typeof k == "function";
  }
  function I(k, L) {
    return k instanceof L;
  }
  function U(k) {
    return I(k, o);
  }
  function W(k, L, H) {
    if (!L(k)) throw fe(H);
  }
  function V() {
    try {
      return E.apply(q, arguments);
    } catch (k) {
      return N.e = k, N;
    }
  }
  function te(k, L) {
    return E = k, q = L, V;
  }
  function ae(k, L) {
    var H = a(k), Q = 0;
    function de() {
      for (var ce = 0; ce < Q; )
        L(H[ce], H[ce + 1]), H[ce++] = e, H[ce++] = e;
      Q = 0, H.length > k && (H.length = k);
    }
    return function(ce, et) {
      H[Q++] = ce, H[Q++] = et, Q === 2 && D.nextTick(de);
    };
  }
  function J(k, L) {
    var H, Q = 0, de, ce, et;
    if (!k) throw fe(A);
    var He = k[D[l][m]];
    if (C(He))
      de = He.call(k);
    else if (C(k.next))
      de = k;
    else if (I(k, a)) {
      for (H = k.length; Q < H; )
        L(k[Q], Q++);
      return Q;
    } else
      throw fe(A);
    for (; !(ce = de.next()).done; )
      if (et = te(L)(ce.value, Q++), et === N)
        throw C(de[_]) && de[_](), et.e;
    return Q;
  }
  function fe(k) {
    return new TypeError(k);
  }
  function h(k) {
    return (k ? "" : R) + new o().stack;
  }
  var c = ae(999, function(k, L) {
    var H, Q;
    if (Q = k._s ? L._onFulfilled : L._onRejected, Q === e) {
      le(L, k._s, k._v);
      return;
    }
    if (H = te(we)(Q, k._v), H === N) {
      le(L, s, H.e);
      return;
    }
    vt(L, H);
  }), x = ae(9, function(k) {
    ye(k) || (k[g] = 1, T(z, k));
  });
  function T(k, L) {
    var H = "on" + k.toLowerCase(), Q = r[H];
    i && i.listeners(k).length ? k === z ? i.emit(k, L._v, L) : i.emit(k, L) : Q ? Q({ reason: L._v, promise: L }) : D[k](L._v, L);
  }
  function Z(k) {
    return k && k._Yaku;
  }
  function G(k) {
    if (Z(k)) return new k(Y);
    var L, H, Q;
    return L = new k(function(de, ce) {
      if (L) throw fe();
      H = de, Q = ce;
    }), W(H, C), W(Q, C), L;
  }
  function K(k, L) {
    return function(H) {
      n && (k[v] = h(!0)), L === u ? vt(k, H) : le(k, L, H);
    };
  }
  function ve(k, L, H, Q) {
    return C(H) && (L._onFulfilled = H), C(Q) && (k[g] && T(B, k), L._onRejected = Q), n && (L._pre = k), k[k._pCount++] = L, k._s !== f && c(k, L), L;
  }
  function ye(k) {
    if (k._umark)
      return !0;
    k._umark = !0;
    for (var L = 0, H = k._pCount, Q; L < H; )
      if (Q = k[L++], Q._onRejected || ye(Q)) return !0;
  }
  function Qe(k, L) {
    var H = [];
    function Q(de) {
      return H.push(de.replace(/^\s+|\s+$/g, ""));
    }
    return n && (L[v] && Q(L[v]), function de(ce) {
      ce && b in ce && (de(ce._next), Q(ce[b] + ""), de(ce._pre));
    }(L)), (k && k.stack ? k.stack : k) + (`
` + H.join(`
`)).replace(re, "");
  }
  function we(k, L) {
    return k(L);
  }
  function le(k, L, H) {
    var Q = 0, de = k._pCount;
    if (k._s === f)
      for (k._s = L, k._v = H, L === s && (n && U(H) && (H.longStack = Qe(H, k)), x(k)); Q < de; )
        c(k, k[Q++]);
    return k;
  }
  function vt(k, L) {
    if (L === k && L)
      return le(k, s, fe($)), k;
    if (L !== t && (C(L) || S(L))) {
      var H = te(It)(L);
      if (H === N)
        return le(k, s, H.e), k;
      C(H) ? (n && Z(L) && (k._next = L), Z(L) ? ot(k, L, H) : D.nextTick(function() {
        ot(k, L, H);
      })) : le(k, u, L);
    } else
      le(k, u, L);
    return k;
  }
  function It(k) {
    return k.then;
  }
  function ot(k, L, H) {
    var Q = te(H, L)(function(de) {
      L && (L = t, vt(k, de));
    }, function(de) {
      L && (L = t, le(k, s, de));
    });
    Q === N && L && (le(k, s, Q.e), L = t);
  }
})();
var Hw = t0.exports, zw = Hw, qw = {
  isFunction: function(e) {
    return typeof e == "function";
  },
  Promise: zw
}, r0 = qw, en = r0.isFunction, Gw = function(e, t) {
  return function(r, n, i, a, o) {
    var s = arguments.length, u, f, l, m;
    f = new r0.Promise(function(_, g) {
      l = _, m = g;
    });
    function d(_, g) {
      _ == null ? l(g) : m(_);
    }
    switch (s) {
      case 0:
        e.call(t, d);
        break;
      case 1:
        en(r) ? e.call(t, r) : e.call(t, r, d);
        break;
      case 2:
        en(n) ? e.call(t, r, n) : e.call(t, r, n, d);
        break;
      case 3:
        en(i) ? e.call(t, r, n, i) : e.call(t, r, n, i, d);
        break;
      case 4:
        en(a) ? e.call(t, r, n, i, a) : e.call(t, r, n, i, a, d);
        break;
      case 5:
        en(o) ? e.call(t, r, n, i, a, o) : e.call(t, r, n, i, a, o, d);
        break;
      default:
        u = new Array(s);
        for (var p = 0; p < s; p++)
          u[p] = arguments[p];
        if (en(u[s - 1]))
          return e.apply(t, u);
        u[p] = d, e.apply(t, u);
    }
    return f;
  };
}, n0 = pt, Cr = pe, Ww = Mw, Vw = jw, iu = Gw, Yw = iu(n0.writeFile), Zw = iu(n0.readFile), Xw = iu(Vw);
function Kw(e) {
  function t(f, l, m, d) {
    var p = 0;
    return p += f, p += l << 8, p += m << 16, p += d << 24, p;
  }
  if (e[0] === 80 && e[1] === 75 && e[2] === 3 && e[3] === 4)
    return e;
  if (e[0] !== 67 || e[1] !== 114 || e[2] !== 50 || e[3] !== 52)
    throw new Error("Invalid header: Does not start with Cr24");
  var r = e[4] === 3, n = e[4] === 2;
  if (!n && !r || e[5] || e[6] || e[7])
    throw new Error("Unexpected crx format version number.");
  if (n) {
    var i = t(e[8], e[9], e[10], e[11]), a = t(e[12], e[13], e[14], e[15]), o = 16 + i + a;
    return e.slice(o, e.length);
  }
  var s = t(e[8], e[9], e[10], e[11]), u = 12 + s;
  return e.slice(u, e.length);
}
function Jw(e, t) {
  var r = Cr.resolve(e), n = Cr.extname(e), i = Cr.basename(e, n), a = Cr.dirname(e);
  return t = t || Cr.resolve(a, i), Zw(r).then(function(o) {
    return Ww.loadAsync(Kw(o));
  }).then(function(o) {
    var s = Object.keys(o.files);
    return Promise.all(s.map(function(u) {
      var f = !o.files[u].dir, l = Cr.join(t, u), m = f && Cr.dirname(l) || l, d = o.files[u].async("nodebuffer");
      return Xw(m).then(function() {
        return f ? d : !1;
      }).then(function(p) {
        return p ? Yw(l, p) : !0;
      });
    }));
  });
}
var Qw = Jw;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.downloadChromeExtension = void 0;
  const t = pt, r = pe, n = Oh, i = Qw, a = async (o, { forceDownload: s = !1, attempts: u = 5 } = {}) => {
    const f = (0, n.getPath)();
    t.existsSync(f) || await t.promises.mkdir(f, { recursive: !0 });
    const l = r.resolve(`${f}/${o}`);
    if (!t.existsSync(l) || s) {
      t.existsSync(l) && await t.promises.rmdir(l, {
        recursive: !0
      });
      const m = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${o}%26uc&prodversion=${process.versions.chrome}`, d = r.resolve(`${l}.crx`);
      try {
        await (0, n.downloadFile)(m, d);
        try {
          return await i(d, l), (0, n.changePermissions)(l, 755), l;
        } catch (p) {
          if (!t.existsSync(r.resolve(l, "manifest.json")))
            throw p;
        }
      } catch (p) {
        if (console.error(`Failed to fetch extension, trying ${u - 1} more times`), u <= 1)
          throw p;
        return await new Promise((_) => setTimeout(_, 200)), await (0, e.downloadChromeExtension)(o, {
          forceDownload: s,
          attempts: u - 1
        });
      }
    }
    return l;
  };
  e.downloadChromeExtension = a;
})(Rh);
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.MOBX_DEVTOOLS = Oe.REDUX_DEVTOOLS = Oe.VUEJS_DEVTOOLS_BETA = Oe.VUEJS_DEVTOOLS = Oe.JQUERY_DEBUGGER = Oe.BACKBONE_DEBUGGER = i0 = Oe.REACT_DEVELOPER_TOOLS = Oe.EMBER_INSPECTOR = void 0;
Oe.installExtension = au;
const eE = Wt, tE = Rh;
async function au(e, t = {}) {
  const { forceDownload: r, loadExtensionOptions: n, session: i } = t, a = i || eE.session.defaultSession;
  if (process.type !== "browser")
    return Promise.reject(new Error("electron-devtools-installer can only be used from the main process"));
  if (Array.isArray(e))
    return e.reduce((f, l) => f.then(async (m) => {
      const d = await au(l, t);
      return [...m, d];
    }), Promise.resolve([]));
  let o;
  if (typeof e == "object" && e.id)
    o = e.id;
  else if (typeof e == "string")
    o = e;
  else
    throw new Error(`Invalid extensionReference passed in: "${e}"`);
  const s = a.getAllExtensions().find((f) => f.id === o);
  if (!r && s)
    return s;
  const u = await (0, tE.downloadChromeExtension)(o, {
    forceDownload: r || !1
  });
  if (s != null && s.id) {
    const f = new Promise((l) => {
      const m = (d, p) => {
        p.id === s.id && (a.removeListener("extension-unloaded", m), l());
      };
      a.on("extension-unloaded", m);
    });
    a.removeExtension(s.id), await f;
  }
  return a.loadExtension(u, n);
}
var rE = Oe.default = au;
Oe.EMBER_INSPECTOR = {
  id: "bmdblncegkenkacieihfhpjfppoconhi"
};
var i0 = Oe.REACT_DEVELOPER_TOOLS = {
  id: "fmkadmapgofadopljbjfkapdkoienihi"
};
Oe.BACKBONE_DEBUGGER = {
  id: "bhljhndlimiafopmmhjlgfpnnchjjbhd"
};
Oe.JQUERY_DEBUGGER = {
  id: "dbhhnnnpaeobfddmlalhnehgclcmjimi"
};
Oe.VUEJS_DEVTOOLS = {
  id: "nhdogjmejiglipccpnnnanhbledajbpd"
};
Oe.VUEJS_DEVTOOLS_BETA = {
  id: "ljjemllljcmogpfapbkkighbhhppjdbg"
};
Oe.REDUX_DEVTOOLS = {
  id: "lmhkpmbekcpmknklioeibfkpmmfibljd"
};
Oe.MOBX_DEVTOOLS = {
  id: "pfgnfdagidkfgccljigdamigbcnndkod"
};
var ji = {}, Vr = {}, Ze = {};
Ze.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, a) => i != null ? n(i) : r(a)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ze.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var er = yv, nE = process.cwd, Ga = null, iE = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Ga || (Ga = nE.call(process)), Ga;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Of = process.chdir;
  process.chdir = function(e) {
    Ga = null, Of.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Of);
}
var aE = oE;
function oE(e) {
  er.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = u(e.statSync), e.fstatSync = u(e.fstatSync), e.lstatSync = u(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, m, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, m, d, p) {
    p && process.nextTick(p);
  }, e.lchownSync = function() {
  }), iE === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function m(d, p, _) {
      var g = Date.now(), b = 0;
      l(d, p, function v(y) {
        if (y && (y.code === "EACCES" || y.code === "EPERM" || y.code === "EBUSY") && Date.now() - g < 6e4) {
          setTimeout(function() {
            e.stat(p, function(A, R) {
              A && A.code === "ENOENT" ? l(d, p, v) : _(y);
            });
          }, b), b < 100 && (b += 10);
          return;
        }
        _ && _(y);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(m, l), m;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function m(d, p, _, g, b, v) {
      var y;
      if (v && typeof v == "function") {
        var A = 0;
        y = function(R, $, j) {
          if (R && R.code === "EAGAIN" && A < 10)
            return A++, l.call(e, d, p, _, g, b, y);
          v.apply(this, arguments);
        };
      }
      return l.call(e, d, p, _, g, b, y);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(m, l), m;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(m, d, p, _, g) {
      for (var b = 0; ; )
        try {
          return l.call(e, m, d, p, _, g);
        } catch (v) {
          if (v.code === "EAGAIN" && b < 10) {
            b++;
            continue;
          }
          throw v;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(m, d, p) {
      l.open(
        m,
        er.O_WRONLY | er.O_SYMLINK,
        d,
        function(_, g) {
          if (_) {
            p && p(_);
            return;
          }
          l.fchmod(g, d, function(b) {
            l.close(g, function(v) {
              p && p(b || v);
            });
          });
        }
      );
    }, l.lchmodSync = function(m, d) {
      var p = l.openSync(m, er.O_WRONLY | er.O_SYMLINK, d), _ = !0, g;
      try {
        g = l.fchmodSync(p, d), _ = !1;
      } finally {
        if (_)
          try {
            l.closeSync(p);
          } catch {
          }
        else
          l.closeSync(p);
      }
      return g;
    };
  }
  function r(l) {
    er.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(m, d, p, _) {
      l.open(m, er.O_SYMLINK, function(g, b) {
        if (g) {
          _ && _(g);
          return;
        }
        l.futimes(b, d, p, function(v) {
          l.close(b, function(y) {
            _ && _(v || y);
          });
        });
      });
    }, l.lutimesSync = function(m, d, p) {
      var _ = l.openSync(m, er.O_SYMLINK), g, b = !0;
      try {
        g = l.futimesSync(_, d, p), b = !1;
      } finally {
        if (b)
          try {
            l.closeSync(_);
          } catch {
          }
        else
          l.closeSync(_);
      }
      return g;
    }) : l.futimes && (l.lutimes = function(m, d, p, _) {
      _ && process.nextTick(_);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(m, d, p) {
      return l.call(e, m, d, function(_) {
        f(_) && (_ = null), p && p.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(m, d) {
      try {
        return l.call(e, m, d);
      } catch (p) {
        if (!f(p)) throw p;
      }
    };
  }
  function a(l) {
    return l && function(m, d, p, _) {
      return l.call(e, m, d, p, function(g) {
        f(g) && (g = null), _ && _.apply(this, arguments);
      });
    };
  }
  function o(l) {
    return l && function(m, d, p) {
      try {
        return l.call(e, m, d, p);
      } catch (_) {
        if (!f(_)) throw _;
      }
    };
  }
  function s(l) {
    return l && function(m, d, p) {
      typeof d == "function" && (p = d, d = null);
      function _(g, b) {
        b && (b.uid < 0 && (b.uid += 4294967296), b.gid < 0 && (b.gid += 4294967296)), p && p.apply(this, arguments);
      }
      return d ? l.call(e, m, d, _) : l.call(e, m, _);
    };
  }
  function u(l) {
    return l && function(m, d) {
      var p = d ? l.call(e, m, d) : l.call(e, m);
      return p && (p.uid < 0 && (p.uid += 4294967296), p.gid < 0 && (p.gid += 4294967296)), p;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var m = !process.getuid || process.getuid() !== 0;
    return !!(m && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var If = zr.Stream, sE = lE;
function lE(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    If.call(this);
    var a = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), s = 0, u = o.length; s < u; s++) {
      var f = o[s];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, m) {
      if (l) {
        a.emit("error", l), a.readable = !1;
        return;
      }
      a.fd = m, a.emit("open", m), a._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    If.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
      var u = a[o];
      this[u] = i[u];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var uE = fE, cE = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function fE(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: cE(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var be = pt, dE = aE, hE = sE, pE = uE, ba = xn, Le, Ja;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Le = Symbol.for("graceful-fs.queue"), Ja = Symbol.for("graceful-fs.previous")) : (Le = "___graceful-fs.queue", Ja = "___graceful-fs.previous");
function mE() {
}
function a0(e, t) {
  Object.defineProperty(e, Le, {
    get: function() {
      return t;
    }
  });
}
var Pr = mE;
ba.debuglog ? Pr = ba.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Pr = function() {
  var e = ba.format.apply(ba, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!be[Le]) {
  var gE = se[Le] || [];
  a0(be, gE), be.close = function(e) {
    function t(r, n) {
      return e.call(be, r, function(i) {
        i || $f(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ja, {
      value: e
    }), t;
  }(be.close), be.closeSync = function(e) {
    function t(r) {
      e.apply(be, arguments), $f();
    }
    return Object.defineProperty(t, Ja, {
      value: e
    }), t;
  }(be.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Pr(be[Le]), Ah.equal(be[Le].length, 0);
  });
}
se[Le] || a0(se, be[Le]);
var Xe = ou(pE(be));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !be.__patched && (Xe = ou(be), be.__patched = !0);
function ou(e) {
  dE(e), e.gracefulify = ou, e.createReadStream = $, e.createWriteStream = j;
  var t = e.readFile;
  e.readFile = r;
  function r(E, q, N) {
    return typeof q == "function" && (N = q, q = null), Y(E, q, N);
    function Y(re, D, P, M) {
      return t(re, D, function(S) {
        S && (S.code === "EMFILE" || S.code === "ENFILE") ? tn([Y, [re, D, P], S, M || Date.now(), Date.now()]) : typeof P == "function" && P.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(E, q, N, Y) {
    return typeof N == "function" && (Y = N, N = null), re(E, q, N, Y);
    function re(D, P, M, S, C) {
      return n(D, P, M, function(I) {
        I && (I.code === "EMFILE" || I.code === "ENFILE") ? tn([re, [D, P, M, S], I, C || Date.now(), Date.now()]) : typeof S == "function" && S.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = o);
  function o(E, q, N, Y) {
    return typeof N == "function" && (Y = N, N = null), re(E, q, N, Y);
    function re(D, P, M, S, C) {
      return a(D, P, M, function(I) {
        I && (I.code === "EMFILE" || I.code === "ENFILE") ? tn([re, [D, P, M, S], I, C || Date.now(), Date.now()]) : typeof S == "function" && S.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = u);
  function u(E, q, N, Y) {
    return typeof N == "function" && (Y = N, N = 0), re(E, q, N, Y);
    function re(D, P, M, S, C) {
      return s(D, P, M, function(I) {
        I && (I.code === "EMFILE" || I.code === "ENFILE") ? tn([re, [D, P, M, S], I, C || Date.now(), Date.now()]) : typeof S == "function" && S.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = m;
  var l = /^v[0-5]\./;
  function m(E, q, N) {
    typeof q == "function" && (N = q, q = null);
    var Y = l.test(process.version) ? function(P, M, S, C) {
      return f(P, re(
        P,
        M,
        S,
        C
      ));
    } : function(P, M, S, C) {
      return f(P, M, re(
        P,
        M,
        S,
        C
      ));
    };
    return Y(E, q, N);
    function re(D, P, M, S) {
      return function(C, I) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? tn([
          Y,
          [D, P, M],
          C,
          S || Date.now(),
          Date.now()
        ]) : (I && I.sort && I.sort(), typeof M == "function" && M.call(this, C, I));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = hE(e);
    v = d.ReadStream, A = d.WriteStream;
  }
  var p = e.ReadStream;
  p && (v.prototype = Object.create(p.prototype), v.prototype.open = y);
  var _ = e.WriteStream;
  _ && (A.prototype = Object.create(_.prototype), A.prototype.open = R), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return v;
    },
    set: function(E) {
      v = E;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return A;
    },
    set: function(E) {
      A = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = v;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return g;
    },
    set: function(E) {
      g = E;
    },
    enumerable: !0,
    configurable: !0
  });
  var b = A;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return b;
    },
    set: function(E) {
      b = E;
    },
    enumerable: !0,
    configurable: !0
  });
  function v(E, q) {
    return this instanceof v ? (p.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function y() {
    var E = this;
    z(E.path, E.flags, E.mode, function(q, N) {
      q ? (E.autoClose && E.destroy(), E.emit("error", q)) : (E.fd = N, E.emit("open", N), E.read());
    });
  }
  function A(E, q) {
    return this instanceof A ? (_.apply(this, arguments), this) : A.apply(Object.create(A.prototype), arguments);
  }
  function R() {
    var E = this;
    z(E.path, E.flags, E.mode, function(q, N) {
      q ? (E.destroy(), E.emit("error", q)) : (E.fd = N, E.emit("open", N));
    });
  }
  function $(E, q) {
    return new e.ReadStream(E, q);
  }
  function j(E, q) {
    return new e.WriteStream(E, q);
  }
  var B = e.open;
  e.open = z;
  function z(E, q, N, Y) {
    return typeof N == "function" && (Y = N, N = null), re(E, q, N, Y);
    function re(D, P, M, S, C) {
      return B(D, P, M, function(I, U) {
        I && (I.code === "EMFILE" || I.code === "ENFILE") ? tn([re, [D, P, M, S], I, C || Date.now(), Date.now()]) : typeof S == "function" && S.apply(this, arguments);
      });
    }
  }
  return e;
}
function tn(e) {
  Pr("ENQUEUE", e[0].name, e[1]), be[Le].push(e), su();
}
var Sa;
function $f() {
  for (var e = Date.now(), t = 0; t < be[Le].length; ++t)
    be[Le][t].length > 2 && (be[Le][t][3] = e, be[Le][t][4] = e);
  su();
}
function su() {
  if (clearTimeout(Sa), Sa = void 0, be[Le].length !== 0) {
    var e = be[Le].shift(), t = e[0], r = e[1], n = e[2], i = e[3], a = e[4];
    if (i === void 0)
      Pr("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Pr("TIMEOUT", t.name, r);
      var o = r.pop();
      typeof o == "function" && o.call(null, n);
    } else {
      var s = Date.now() - a, u = Math.max(a - i, 1), f = Math.min(u * 1.2, 100);
      s >= f ? (Pr("RETRY", t.name, r), t.apply(null, r.concat([i]))) : be[Le].push(e);
    }
    Sa === void 0 && (Sa = setTimeout(su, 0));
  }
}
(function(e) {
  const t = Ze.fromCallback, r = Xe, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, a) {
    return typeof a == "function" ? r.exists(i, a) : new Promise((o) => r.exists(i, o));
  }, e.read = function(i, a, o, s, u, f) {
    return typeof f == "function" ? r.read(i, a, o, s, u, f) : new Promise((l, m) => {
      r.read(i, a, o, s, u, (d, p, _) => {
        if (d) return m(d);
        l({ bytesRead: p, buffer: _ });
      });
    });
  }, e.write = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.write(i, a, ...o) : new Promise((s, u) => {
      r.write(i, a, ...o, (f, l, m) => {
        if (f) return u(f);
        s({ bytesWritten: l, buffer: m });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, a, ...o) {
    return typeof o[o.length - 1] == "function" ? r.writev(i, a, ...o) : new Promise((s, u) => {
      r.writev(i, a, ...o, (f, l, m) => {
        if (f) return u(f);
        s({ bytesWritten: l, buffers: m });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Vr);
var lu = {}, o0 = {};
const vE = pe;
o0.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(vE.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const s0 = Vr, { checkPath: l0 } = o0, u0 = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
lu.makeDir = async (e, t) => (l0(e), s0.mkdir(e, {
  mode: u0(t),
  recursive: !0
}));
lu.makeDirSync = (e, t) => (l0(e), s0.mkdirSync(e, {
  mode: u0(t),
  recursive: !0
}));
const _E = Ze.fromPromise, { makeDir: yE, makeDirSync: Ds } = lu, Ns = _E(yE);
var Bt = {
  mkdirs: Ns,
  mkdirsSync: Ds,
  // alias
  mkdirp: Ns,
  mkdirpSync: Ds,
  ensureDir: Ns,
  ensureDirSync: Ds
};
const wE = Ze.fromPromise, c0 = Vr;
function EE(e) {
  return c0.access(e).then(() => !0).catch(() => !1);
}
var Yr = {
  pathExists: wE(EE),
  pathExistsSync: c0.existsSync
};
const wn = Xe;
function bE(e, t, r, n) {
  wn.open(e, "r+", (i, a) => {
    if (i) return n(i);
    wn.futimes(a, t, r, (o) => {
      wn.close(a, (s) => {
        n && n(o || s);
      });
    });
  });
}
function SE(e, t, r) {
  const n = wn.openSync(e, "r+");
  return wn.futimesSync(n, t, r), wn.closeSync(n);
}
var f0 = {
  utimesMillis: bE,
  utimesMillisSync: SE
};
const Sn = Vr, De = pe, TE = xn;
function AE(e, t, r) {
  const n = r.dereference ? (i) => Sn.stat(i, { bigint: !0 }) : (i) => Sn.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, a]) => ({ srcStat: i, destStat: a }));
}
function CE(e, t, r) {
  let n;
  const i = r.dereference ? (o) => Sn.statSync(o, { bigint: !0 }) : (o) => Sn.lstatSync(o, { bigint: !0 }), a = i(e);
  try {
    n = i(t);
  } catch (o) {
    if (o.code === "ENOENT") return { srcStat: a, destStat: null };
    throw o;
  }
  return { srcStat: a, destStat: n };
}
function xE(e, t, r, n, i) {
  TE.callbackify(AE)(e, t, n, (a, o) => {
    if (a) return i(a);
    const { srcStat: s, destStat: u } = o;
    if (u) {
      if (Hi(s, u)) {
        const f = De.basename(e), l = De.basename(t);
        return r === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: s, destStat: u, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !u.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && u.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && uu(e, t) ? i(new Error(Ao(e, t, r))) : i(null, { srcStat: s, destStat: u });
  });
}
function RE(e, t, r, n) {
  const { srcStat: i, destStat: a } = CE(e, t, n);
  if (a) {
    if (Hi(i, a)) {
      const o = De.basename(e), s = De.basename(t);
      if (r === "move" && o !== s && o.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: a, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !a.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && a.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && uu(e, t))
    throw new Error(Ao(e, t, r));
  return { srcStat: i, destStat: a };
}
function d0(e, t, r, n, i) {
  const a = De.resolve(De.dirname(e)), o = De.resolve(De.dirname(r));
  if (o === a || o === De.parse(o).root) return i();
  Sn.stat(o, { bigint: !0 }, (s, u) => s ? s.code === "ENOENT" ? i() : i(s) : Hi(t, u) ? i(new Error(Ao(e, r, n))) : d0(e, t, o, n, i));
}
function h0(e, t, r, n) {
  const i = De.resolve(De.dirname(e)), a = De.resolve(De.dirname(r));
  if (a === i || a === De.parse(a).root) return;
  let o;
  try {
    o = Sn.statSync(a, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Hi(t, o))
    throw new Error(Ao(e, r, n));
  return h0(e, t, a, n);
}
function Hi(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function uu(e, t) {
  const r = De.resolve(e).split(De.sep).filter((i) => i), n = De.resolve(t).split(De.sep).filter((i) => i);
  return r.reduce((i, a, o) => i && n[o] === a, !0);
}
function Ao(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Fn = {
  checkPaths: xE,
  checkPathsSync: RE,
  checkParentPaths: d0,
  checkParentPathsSync: h0,
  isSrcSubdir: uu,
  areIdentical: Hi
};
const rt = Xe, vi = pe, OE = Bt.mkdirs, IE = Yr.pathExists, $E = f0.utimesMillis, _i = Fn;
function kE(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), _i.checkPaths(e, t, "copy", r, (i, a) => {
    if (i) return n(i);
    const { srcStat: o, destStat: s } = a;
    _i.checkParentPaths(e, o, t, "copy", (u) => u ? n(u) : r.filter ? p0(kf, s, e, t, r, n) : kf(s, e, t, r, n));
  });
}
function kf(e, t, r, n, i) {
  const a = vi.dirname(r);
  IE(a, (o, s) => {
    if (o) return i(o);
    if (s) return Qa(e, t, r, n, i);
    OE(a, (u) => u ? i(u) : Qa(e, t, r, n, i));
  });
}
function p0(e, t, r, n, i, a) {
  Promise.resolve(i.filter(r, n)).then((o) => o ? e(t, r, n, i, a) : a(), (o) => a(o));
}
function DE(e, t, r, n, i) {
  return n.filter ? p0(Qa, e, t, r, n, i) : Qa(e, t, r, n, i);
}
function Qa(e, t, r, n, i) {
  (n.dereference ? rt.stat : rt.lstat)(t, (o, s) => o ? i(o) : s.isDirectory() ? ME(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? NE(s, e, t, r, n, i) : s.isSymbolicLink() ? zE(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function NE(e, t, r, n, i, a) {
  return t ? PE(e, r, n, i, a) : m0(e, r, n, i, a);
}
function PE(e, t, r, n, i) {
  if (n.overwrite)
    rt.unlink(r, (a) => a ? i(a) : m0(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function m0(e, t, r, n, i) {
  rt.copyFile(t, r, (a) => a ? i(a) : n.preserveTimestamps ? FE(e.mode, t, r, i) : Co(r, e.mode, i));
}
function FE(e, t, r, n) {
  return LE(e) ? UE(r, e, (i) => i ? n(i) : Df(e, t, r, n)) : Df(e, t, r, n);
}
function LE(e) {
  return (e & 128) === 0;
}
function UE(e, t, r) {
  return Co(e, t | 128, r);
}
function Df(e, t, r, n) {
  BE(t, r, (i) => i ? n(i) : Co(r, e, n));
}
function Co(e, t, r) {
  return rt.chmod(e, t, r);
}
function BE(e, t, r) {
  rt.stat(e, (n, i) => n ? r(n) : $E(t, i.atime, i.mtime, r));
}
function ME(e, t, r, n, i, a) {
  return t ? g0(r, n, i, a) : jE(e.mode, r, n, i, a);
}
function jE(e, t, r, n, i) {
  rt.mkdir(r, (a) => {
    if (a) return i(a);
    g0(t, r, n, (o) => o ? i(o) : Co(r, e, i));
  });
}
function g0(e, t, r, n) {
  rt.readdir(e, (i, a) => i ? n(i) : v0(a, e, t, r, n));
}
function v0(e, t, r, n, i) {
  const a = e.pop();
  return a ? HE(e, a, t, r, n, i) : i();
}
function HE(e, t, r, n, i, a) {
  const o = vi.join(r, t), s = vi.join(n, t);
  _i.checkPaths(o, s, "copy", i, (u, f) => {
    if (u) return a(u);
    const { destStat: l } = f;
    DE(l, o, s, i, (m) => m ? a(m) : v0(e, r, n, i, a));
  });
}
function zE(e, t, r, n, i) {
  rt.readlink(t, (a, o) => {
    if (a) return i(a);
    if (n.dereference && (o = vi.resolve(process.cwd(), o)), e)
      rt.readlink(r, (s, u) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? rt.symlink(o, r, i) : i(s) : (n.dereference && (u = vi.resolve(process.cwd(), u)), _i.isSrcSubdir(o, u) ? i(new Error(`Cannot copy '${o}' to a subdirectory of itself, '${u}'.`)) : e.isDirectory() && _i.isSrcSubdir(u, o) ? i(new Error(`Cannot overwrite '${u}' with '${o}'.`)) : qE(o, r, i)));
    else
      return rt.symlink(o, r, i);
  });
}
function qE(e, t, r) {
  rt.unlink(t, (n) => n ? r(n) : rt.symlink(e, t, r));
}
var GE = kE;
const Me = Xe, yi = pe, WE = Bt.mkdirsSync, VE = f0.utimesMillisSync, wi = Fn;
function YE(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = wi.checkPathsSync(e, t, "copy", r);
  return wi.checkParentPathsSync(e, n, t, "copy"), ZE(i, e, t, r);
}
function ZE(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = yi.dirname(r);
  return Me.existsSync(i) || WE(i), _0(e, t, r, n);
}
function XE(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return _0(e, t, r, n);
}
function _0(e, t, r, n) {
  const a = (n.dereference ? Me.statSync : Me.lstatSync)(t);
  if (a.isDirectory()) return n1(a, e, t, r, n);
  if (a.isFile() || a.isCharacterDevice() || a.isBlockDevice()) return KE(a, e, t, r, n);
  if (a.isSymbolicLink()) return o1(e, t, r, n);
  throw a.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : a.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function KE(e, t, r, n, i) {
  return t ? JE(e, r, n, i) : y0(e, r, n, i);
}
function JE(e, t, r, n) {
  if (n.overwrite)
    return Me.unlinkSync(r), y0(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function y0(e, t, r, n) {
  return Me.copyFileSync(t, r), n.preserveTimestamps && QE(e.mode, t, r), cu(r, e.mode);
}
function QE(e, t, r) {
  return e1(e) && t1(r, e), r1(t, r);
}
function e1(e) {
  return (e & 128) === 0;
}
function t1(e, t) {
  return cu(e, t | 128);
}
function cu(e, t) {
  return Me.chmodSync(e, t);
}
function r1(e, t) {
  const r = Me.statSync(e);
  return VE(t, r.atime, r.mtime);
}
function n1(e, t, r, n, i) {
  return t ? w0(r, n, i) : i1(e.mode, r, n, i);
}
function i1(e, t, r, n) {
  return Me.mkdirSync(r), w0(t, r, n), cu(r, e);
}
function w0(e, t, r) {
  Me.readdirSync(e).forEach((n) => a1(n, e, t, r));
}
function a1(e, t, r, n) {
  const i = yi.join(t, e), a = yi.join(r, e), { destStat: o } = wi.checkPathsSync(i, a, "copy", n);
  return XE(o, i, a, n);
}
function o1(e, t, r, n) {
  let i = Me.readlinkSync(t);
  if (n.dereference && (i = yi.resolve(process.cwd(), i)), e) {
    let a;
    try {
      a = Me.readlinkSync(r);
    } catch (o) {
      if (o.code === "EINVAL" || o.code === "UNKNOWN") return Me.symlinkSync(i, r);
      throw o;
    }
    if (n.dereference && (a = yi.resolve(process.cwd(), a)), wi.isSrcSubdir(i, a))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${a}'.`);
    if (Me.statSync(r).isDirectory() && wi.isSrcSubdir(a, i))
      throw new Error(`Cannot overwrite '${a}' with '${i}'.`);
    return s1(i, r);
  } else
    return Me.symlinkSync(i, r);
}
function s1(e, t) {
  return Me.unlinkSync(t), Me.symlinkSync(e, t);
}
var l1 = YE;
const u1 = Ze.fromCallback;
var fu = {
  copy: u1(GE),
  copySync: l1
};
const Nf = Xe, E0 = pe, he = Ah, Ei = process.platform === "win32";
function b0(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Nf[r], r = r + "Sync", e[r] = e[r] || Nf[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function du(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), he(e, "rimraf: missing path"), he.strictEqual(typeof e, "string", "rimraf: path should be a string"), he.strictEqual(typeof r, "function", "rimraf: callback function required"), he(t, "rimraf: invalid options argument provided"), he.strictEqual(typeof t, "object", "rimraf: options should be object"), b0(t), Pf(e, t, function i(a) {
    if (a) {
      if ((a.code === "EBUSY" || a.code === "ENOTEMPTY" || a.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const o = n * 100;
        return setTimeout(() => Pf(e, t, i), o);
      }
      a.code === "ENOENT" && (a = null);
    }
    r(a);
  });
}
function Pf(e, t, r) {
  he(e), he(t), he(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Ei)
      return Ff(e, t, n, r);
    if (i && i.isDirectory())
      return Wa(e, t, n, r);
    t.unlink(e, (a) => {
      if (a) {
        if (a.code === "ENOENT")
          return r(null);
        if (a.code === "EPERM")
          return Ei ? Ff(e, t, a, r) : Wa(e, t, a, r);
        if (a.code === "EISDIR")
          return Wa(e, t, a, r);
      }
      return r(a);
    });
  });
}
function Ff(e, t, r, n) {
  he(e), he(t), he(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (a, o) => {
      a ? n(a.code === "ENOENT" ? null : r) : o.isDirectory() ? Wa(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Lf(e, t, r) {
  let n;
  he(e), he(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Va(e, t, r) : t.unlinkSync(e);
}
function Wa(e, t, r, n) {
  he(e), he(t), he(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? c1(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function c1(e, t, r) {
  he(e), he(t), he(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let a = i.length, o;
    if (a === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      du(E0.join(e, s), t, (u) => {
        if (!o) {
          if (u) return r(o = u);
          --a === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function S0(e, t) {
  let r;
  t = t || {}, b0(t), he(e, "rimraf: missing path"), he.strictEqual(typeof e, "string", "rimraf: path should be a string"), he(t, "rimraf: missing options"), he.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Ei && Lf(e, t, n);
  }
  try {
    r && r.isDirectory() ? Va(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Ei ? Lf(e, t, n) : Va(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Va(e, t, n);
  }
}
function Va(e, t, r) {
  he(e), he(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      f1(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function f1(e, t) {
  if (he(e), he(t), t.readdirSync(e).forEach((r) => S0(E0.join(e, r), t)), Ei) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var d1 = du;
du.sync = S0;
const eo = Xe, h1 = Ze.fromCallback, T0 = d1;
function p1(e, t) {
  if (eo.rm) return eo.rm(e, { recursive: !0, force: !0 }, t);
  T0(e, t);
}
function m1(e) {
  if (eo.rmSync) return eo.rmSync(e, { recursive: !0, force: !0 });
  T0.sync(e);
}
var xo = {
  remove: h1(p1),
  removeSync: m1
};
const g1 = Ze.fromPromise, A0 = Vr, C0 = pe, x0 = Bt, R0 = xo, Uf = g1(async function(t) {
  let r;
  try {
    r = await A0.readdir(t);
  } catch {
    return x0.mkdirs(t);
  }
  return Promise.all(r.map((n) => R0.remove(C0.join(t, n))));
});
function Bf(e) {
  let t;
  try {
    t = A0.readdirSync(e);
  } catch {
    return x0.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = C0.join(e, r), R0.removeSync(r);
  });
}
var v1 = {
  emptyDirSync: Bf,
  emptydirSync: Bf,
  emptyDir: Uf,
  emptydir: Uf
};
const _1 = Ze.fromCallback, O0 = pe, lr = Xe, I0 = Bt;
function y1(e, t) {
  function r() {
    lr.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  lr.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const a = O0.dirname(e);
    lr.stat(a, (o, s) => {
      if (o)
        return o.code === "ENOENT" ? I0.mkdirs(a, (u) => {
          if (u) return t(u);
          r();
        }) : t(o);
      s.isDirectory() ? r() : lr.readdir(a, (u) => {
        if (u) return t(u);
      });
    });
  });
}
function w1(e) {
  let t;
  try {
    t = lr.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = O0.dirname(e);
  try {
    lr.statSync(r).isDirectory() || lr.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") I0.mkdirsSync(r);
    else throw n;
  }
  lr.writeFileSync(e, "");
}
var E1 = {
  createFile: _1(y1),
  createFileSync: w1
};
const b1 = Ze.fromCallback, $0 = pe, ar = Xe, k0 = Bt, S1 = Yr.pathExists, { areIdentical: D0 } = Fn;
function T1(e, t, r) {
  function n(i, a) {
    ar.link(i, a, (o) => {
      if (o) return r(o);
      r(null);
    });
  }
  ar.lstat(t, (i, a) => {
    ar.lstat(e, (o, s) => {
      if (o)
        return o.message = o.message.replace("lstat", "ensureLink"), r(o);
      if (a && D0(s, a)) return r(null);
      const u = $0.dirname(t);
      S1(u, (f, l) => {
        if (f) return r(f);
        if (l) return n(e, t);
        k0.mkdirs(u, (m) => {
          if (m) return r(m);
          n(e, t);
        });
      });
    });
  });
}
function A1(e, t) {
  let r;
  try {
    r = ar.lstatSync(t);
  } catch {
  }
  try {
    const a = ar.lstatSync(e);
    if (r && D0(a, r)) return;
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  const n = $0.dirname(t);
  return ar.existsSync(n) || k0.mkdirsSync(n), ar.linkSync(e, t);
}
var C1 = {
  createLink: b1(T1),
  createLinkSync: A1
};
const ur = pe, oi = Xe, x1 = Yr.pathExists;
function R1(e, t, r) {
  if (ur.isAbsolute(e))
    return oi.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = ur.dirname(t), i = ur.join(n, e);
    return x1(i, (a, o) => a ? r(a) : o ? r(null, {
      toCwd: i,
      toDst: e
    }) : oi.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: ur.relative(n, e)
    })));
  }
}
function O1(e, t) {
  let r;
  if (ur.isAbsolute(e)) {
    if (r = oi.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = ur.dirname(t), i = ur.join(n, e);
    if (r = oi.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = oi.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: ur.relative(n, e)
    };
  }
}
var I1 = {
  symlinkPaths: R1,
  symlinkPathsSync: O1
};
const N0 = Xe;
function $1(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  N0.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function k1(e, t) {
  let r;
  if (t) return t;
  try {
    r = N0.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var D1 = {
  symlinkType: $1,
  symlinkTypeSync: k1
};
const N1 = Ze.fromCallback, P0 = pe, bt = Vr, F0 = Bt, P1 = F0.mkdirs, F1 = F0.mkdirsSync, L0 = I1, L1 = L0.symlinkPaths, U1 = L0.symlinkPathsSync, U0 = D1, B1 = U0.symlinkType, M1 = U0.symlinkTypeSync, j1 = Yr.pathExists, { areIdentical: B0 } = Fn;
function H1(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, bt.lstat(t, (i, a) => {
    !i && a.isSymbolicLink() ? Promise.all([
      bt.stat(e),
      bt.stat(t)
    ]).then(([o, s]) => {
      if (B0(o, s)) return n(null);
      Mf(e, t, r, n);
    }) : Mf(e, t, r, n);
  });
}
function Mf(e, t, r, n) {
  L1(e, t, (i, a) => {
    if (i) return n(i);
    e = a.toDst, B1(a.toCwd, r, (o, s) => {
      if (o) return n(o);
      const u = P0.dirname(t);
      j1(u, (f, l) => {
        if (f) return n(f);
        if (l) return bt.symlink(e, t, s, n);
        P1(u, (m) => {
          if (m) return n(m);
          bt.symlink(e, t, s, n);
        });
      });
    });
  });
}
function z1(e, t, r) {
  let n;
  try {
    n = bt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = bt.statSync(e), u = bt.statSync(t);
    if (B0(s, u)) return;
  }
  const i = U1(e, t);
  e = i.toDst, r = M1(i.toCwd, r);
  const a = P0.dirname(t);
  return bt.existsSync(a) || F1(a), bt.symlinkSync(e, t, r);
}
var q1 = {
  createSymlink: N1(H1),
  createSymlinkSync: z1
};
const { createFile: jf, createFileSync: Hf } = E1, { createLink: zf, createLinkSync: qf } = C1, { createSymlink: Gf, createSymlinkSync: Wf } = q1;
var G1 = {
  // file
  createFile: jf,
  createFileSync: Hf,
  ensureFile: jf,
  ensureFileSync: Hf,
  // link
  createLink: zf,
  createLinkSync: qf,
  ensureLink: zf,
  ensureLinkSync: qf,
  // symlink
  createSymlink: Gf,
  createSymlinkSync: Wf,
  ensureSymlink: Gf,
  ensureSymlinkSync: Wf
};
function W1(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const a = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + a;
}
function V1(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var hu = { stringify: W1, stripBom: V1 };
let Tn;
try {
  Tn = Xe;
} catch {
  Tn = pt;
}
const Ro = Ze, { stringify: M0, stripBom: j0 } = hu;
async function Y1(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Tn, n = "throws" in t ? t.throws : !0;
  let i = await Ro.fromCallback(r.readFile)(e, t);
  i = j0(i);
  let a;
  try {
    a = JSON.parse(i, t ? t.reviver : null);
  } catch (o) {
    if (n)
      throw o.message = `${e}: ${o.message}`, o;
    return null;
  }
  return a;
}
const Z1 = Ro.fromPromise(Y1);
function X1(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Tn, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = j0(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function K1(e, t, r = {}) {
  const n = r.fs || Tn, i = M0(t, r);
  await Ro.fromCallback(n.writeFile)(e, i, r);
}
const J1 = Ro.fromPromise(K1);
function Q1(e, t, r = {}) {
  const n = r.fs || Tn, i = M0(t, r);
  return n.writeFileSync(e, i, r);
}
var eb = {
  readFile: Z1,
  readFileSync: X1,
  writeFile: J1,
  writeFileSync: Q1
};
const Ta = eb;
var tb = {
  // jsonfile exports
  readJson: Ta.readFile,
  readJsonSync: Ta.readFileSync,
  writeJson: Ta.writeFile,
  writeJsonSync: Ta.writeFileSync
};
const rb = Ze.fromCallback, si = Xe, H0 = pe, z0 = Bt, nb = Yr.pathExists;
function ib(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = H0.dirname(e);
  nb(i, (a, o) => {
    if (a) return n(a);
    if (o) return si.writeFile(e, t, r, n);
    z0.mkdirs(i, (s) => {
      if (s) return n(s);
      si.writeFile(e, t, r, n);
    });
  });
}
function ab(e, ...t) {
  const r = H0.dirname(e);
  if (si.existsSync(r))
    return si.writeFileSync(e, ...t);
  z0.mkdirsSync(r), si.writeFileSync(e, ...t);
}
var pu = {
  outputFile: rb(ib),
  outputFileSync: ab
};
const { stringify: ob } = hu, { outputFile: sb } = pu;
async function lb(e, t, r = {}) {
  const n = ob(t, r);
  await sb(e, n, r);
}
var ub = lb;
const { stringify: cb } = hu, { outputFileSync: fb } = pu;
function db(e, t, r) {
  const n = cb(t, r);
  fb(e, n, r);
}
var hb = db;
const pb = Ze.fromPromise, Ye = tb;
Ye.outputJson = pb(ub);
Ye.outputJsonSync = hb;
Ye.outputJSON = Ye.outputJson;
Ye.outputJSONSync = Ye.outputJsonSync;
Ye.writeJSON = Ye.writeJson;
Ye.writeJSONSync = Ye.writeJsonSync;
Ye.readJSON = Ye.readJson;
Ye.readJSONSync = Ye.readJsonSync;
var mb = Ye;
const gb = Xe, Sl = pe, vb = fu.copy, q0 = xo.remove, _b = Bt.mkdirp, yb = Yr.pathExists, Vf = Fn;
function wb(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  Vf.checkPaths(e, t, "move", r, (a, o) => {
    if (a) return n(a);
    const { srcStat: s, isChangingCase: u = !1 } = o;
    Vf.checkParentPaths(e, s, t, "move", (f) => {
      if (f) return n(f);
      if (Eb(t)) return Yf(e, t, i, u, n);
      _b(Sl.dirname(t), (l) => l ? n(l) : Yf(e, t, i, u, n));
    });
  });
}
function Eb(e) {
  const t = Sl.dirname(e);
  return Sl.parse(t).root === t;
}
function Yf(e, t, r, n, i) {
  if (n) return Ps(e, t, r, i);
  if (r)
    return q0(t, (a) => a ? i(a) : Ps(e, t, r, i));
  yb(t, (a, o) => a ? i(a) : o ? i(new Error("dest already exists.")) : Ps(e, t, r, i));
}
function Ps(e, t, r, n) {
  gb.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : bb(e, t, r, n) : n());
}
function bb(e, t, r, n) {
  vb(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (a) => a ? n(a) : q0(e, n));
}
var Sb = wb;
const G0 = Xe, Tl = pe, Tb = fu.copySync, W0 = xo.removeSync, Ab = Bt.mkdirpSync, Zf = Fn;
function Cb(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: a = !1 } = Zf.checkPathsSync(e, t, "move", r);
  return Zf.checkParentPathsSync(e, i, t, "move"), xb(t) || Ab(Tl.dirname(t)), Rb(e, t, n, a);
}
function xb(e) {
  const t = Tl.dirname(e);
  return Tl.parse(t).root === t;
}
function Rb(e, t, r, n) {
  if (n) return Fs(e, t, r);
  if (r)
    return W0(t), Fs(e, t, r);
  if (G0.existsSync(t)) throw new Error("dest already exists.");
  return Fs(e, t, r);
}
function Fs(e, t, r) {
  try {
    G0.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Ob(e, t, r);
  }
}
function Ob(e, t, r) {
  return Tb(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), W0(e);
}
var Ib = Cb;
const $b = Ze.fromCallback;
var kb = {
  move: $b(Sb),
  moveSync: Ib
}, yr = {
  // Export promiseified graceful-fs:
  ...Vr,
  // Export extra methods:
  ...fu,
  ...v1,
  ...G1,
  ...mb,
  ...Bt,
  ...kb,
  ...pu,
  ...Yr,
  ...xo
}, Zr = {}, dr = {}, $e = {}, hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
hr.CancellationError = hr.CancellationToken = void 0;
const Db = Ml;
class Nb extends Db.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Al());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, a) => {
      let o = null;
      if (n = () => {
        try {
          o != null && (o(), o = null);
        } finally {
          a(new Al());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, a, (s) => {
        o = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
hr.CancellationToken = Nb;
class Al extends Error {
  constructor() {
    super("cancelled");
  }
}
hr.CancellationError = Al;
var Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.newError = Pb;
function Pb(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var Ve = {}, Cl = { exports: {} }, Aa = { exports: {} }, Ls, Xf;
function Fb() {
  if (Xf) return Ls;
  Xf = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, a = n * 365.25;
  Ls = function(l, m) {
    m = m || {};
    var d = typeof l;
    if (d === "string" && l.length > 0)
      return o(l);
    if (d === "number" && isFinite(l))
      return m.long ? u(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var m = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (m) {
        var d = parseFloat(m[1]), p = (m[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * a;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(l) {
    var m = Math.abs(l);
    return m >= n ? Math.round(l / n) + "d" : m >= r ? Math.round(l / r) + "h" : m >= t ? Math.round(l / t) + "m" : m >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function u(l) {
    var m = Math.abs(l);
    return m >= n ? f(l, m, n, "day") : m >= r ? f(l, m, r, "hour") : m >= t ? f(l, m, t, "minute") : m >= e ? f(l, m, e, "second") : l + " ms";
  }
  function f(l, m, d, p) {
    var _ = m >= d * 1.5;
    return Math.round(l / d) + " " + p + (_ ? "s" : "");
  }
  return Ls;
}
var Us, Kf;
function V0() {
  if (Kf) return Us;
  Kf = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = s, n.enable = a, n.enabled = u, n.humanize = Fb(), n.destroy = l, Object.keys(t).forEach((m) => {
      n[m] = t[m];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(m) {
      let d = 0;
      for (let p = 0; p < m.length; p++)
        d = (d << 5) - d + m.charCodeAt(p), d |= 0;
      return n.colors[Math.abs(d) % n.colors.length];
    }
    n.selectColor = r;
    function n(m) {
      let d, p = null, _, g;
      function b(...v) {
        if (!b.enabled)
          return;
        const y = b, A = Number(/* @__PURE__ */ new Date()), R = A - (d || A);
        y.diff = R, y.prev = d, y.curr = A, d = A, v[0] = n.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let $ = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (B, z) => {
          if (B === "%%")
            return "%";
          $++;
          const E = n.formatters[z];
          if (typeof E == "function") {
            const q = v[$];
            B = E.call(y, q), v.splice($, 1), $--;
          }
          return B;
        }), n.formatArgs.call(y, v), (y.log || n.log).apply(y, v);
      }
      return b.namespace = m, b.useColors = n.useColors(), b.color = n.selectColor(m), b.extend = i, b.destroy = n.destroy, Object.defineProperty(b, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (_ !== n.namespaces && (_ = n.namespaces, g = n.enabled(m)), g),
        set: (v) => {
          p = v;
        }
      }), typeof n.init == "function" && n.init(b), b;
    }
    function i(m, d) {
      const p = n(this.namespace + (typeof d > "u" ? ":" : d) + m);
      return p.log = this.log, p;
    }
    function a(m) {
      n.save(m), n.namespaces = m, n.names = [], n.skips = [];
      const d = (typeof m == "string" ? m : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const p of d)
        p[0] === "-" ? n.skips.push(p.slice(1)) : n.names.push(p);
    }
    function o(m, d) {
      let p = 0, _ = 0, g = -1, b = 0;
      for (; p < m.length; )
        if (_ < d.length && (d[_] === m[p] || d[_] === "*"))
          d[_] === "*" ? (g = _, b = p, _++) : (p++, _++);
        else if (g !== -1)
          _ = g + 1, b++, p = b;
        else
          return !1;
      for (; _ < d.length && d[_] === "*"; )
        _++;
      return _ === d.length;
    }
    function s() {
      const m = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), m;
    }
    function u(m) {
      for (const d of n.skips)
        if (o(m, d))
          return !1;
      for (const d of n.names)
        if (o(m, d))
          return !0;
      return !1;
    }
    function f(m) {
      return m instanceof Error ? m.stack || m.message : m;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return Us = e, Us;
}
var Jf;
function Lb() {
  return Jf || (Jf = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = a, t.useColors = r, t.storage = o(), t.destroy = /* @__PURE__ */ (() => {
      let u = !1;
      return () => {
        u || (u = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let u;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (u = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(u[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(u) {
      if (u[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + u[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      u.splice(1, 0, f, "color: inherit");
      let l = 0, m = 0;
      u[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (l++, d === "%c" && (m = l));
      }), u.splice(m, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(u) {
      try {
        u ? t.storage.setItem("debug", u) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function a() {
      let u;
      try {
        u = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !u && typeof process < "u" && "env" in process && (u = process.env.DEBUG), u;
    }
    function o() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = V0()(t);
    const { formatters: s } = e.exports;
    s.j = function(u) {
      try {
        return JSON.stringify(u);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(Aa, Aa.exports)), Aa.exports;
}
var Ca = { exports: {} }, Bs, Qf;
function Ub() {
  return Qf || (Qf = 1, Bs = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), Bs;
}
var Ms, ed;
function Bb() {
  if (ed) return Ms;
  ed = 1;
  const e = fo, t = Ch, r = Ub(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1);
  function a() {
    if ("FORCE_COLOR" in n)
      return n.FORCE_COLOR === "true" ? 1 : n.FORCE_COLOR === "false" ? 0 : n.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(n.FORCE_COLOR, 10), 3);
  }
  function o(f) {
    return f === 0 ? !1 : {
      level: f,
      hasBasic: !0,
      has256: f >= 2,
      has16m: f >= 3
    };
  }
  function s(f, { streamIsTTY: l, sniffFlags: m = !0 } = {}) {
    const d = a();
    d !== void 0 && (i = d);
    const p = m ? i : d;
    if (p === 0)
      return 0;
    if (m) {
      if (r("color=16m") || r("color=full") || r("color=truecolor"))
        return 3;
      if (r("color=256"))
        return 2;
    }
    if (f && !l && p === void 0)
      return 0;
    const _ = p || 0;
    if (n.TERM === "dumb")
      return _;
    if (process.platform === "win32") {
      const g = e.release().split(".");
      return Number(g[0]) >= 10 && Number(g[2]) >= 10586 ? Number(g[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((g) => g in n) || n.CI_NAME === "codeship" ? 1 : _;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const g = Number.parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return g >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : _;
  }
  function u(f, l = {}) {
    const m = s(f, {
      streamIsTTY: f && f.isTTY,
      ...l
    });
    return o(m);
  }
  return Ms = {
    supportsColor: u,
    stdout: u({ isTTY: t.isatty(1) }),
    stderr: u({ isTTY: t.isatty(2) })
  }, Ms;
}
var td;
function Mb() {
  return td || (td = 1, function(e, t) {
    const r = Ch, n = xn;
    t.init = l, t.log = s, t.formatArgs = a, t.save = u, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = Bb();
      d && (d.stderr || d).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, p) => {
      const _ = p.substring(6).toLowerCase().replace(/_([a-z])/g, (b, v) => v.toUpperCase());
      let g = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(g) ? g = !0 : /^(no|off|false|disabled)$/i.test(g) ? g = !1 : g === "null" ? g = null : g = Number(g), d[_] = g, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function a(d) {
      const { namespace: p, useColors: _ } = this;
      if (_) {
        const g = this.color, b = "\x1B[3" + (g < 8 ? g : "8;5;" + g), v = `  ${b};1m${p} \x1B[0m`;
        d[0] = v + d[0].split(`
`).join(`
` + v), d.push(b + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = o() + p + " " + d[0];
    }
    function o() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function u(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(d) {
      d.inspectOpts = {};
      const p = Object.keys(t.inspectOpts);
      for (let _ = 0; _ < p.length; _++)
        d.inspectOpts[p[_]] = t.inspectOpts[p[_]];
    }
    e.exports = V0()(t);
    const { formatters: m } = e.exports;
    m.o = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, m.O = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts);
    };
  }(Ca, Ca.exports)), Ca.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Cl.exports = Lb() : Cl.exports = Mb();
var jb = Cl.exports, zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.ProgressCallbackTransform = void 0;
const Hb = zr;
class zb extends Hb.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
zi.ProgressCallbackTransform = zb;
Object.defineProperty(Ve, "__esModule", { value: !0 });
Ve.DigestTransform = Ve.HttpExecutor = Ve.HttpError = void 0;
Ve.createHttpError = Rl;
Ve.parseJson = Kb;
Ve.configureRequestOptionsFromUrl = Z0;
Ve.configureRequestUrl = gu;
Ve.safeGetHeader = En;
Ve.configureRequestOptions = to;
Ve.safeStringifyJson = ro;
const qb = ki, Gb = jb, Wb = pt, Vb = zr, xl = vr, Yb = hr, rd = Ln, Zb = zi, xr = (0, Gb.default)("electron-builder");
function Rl(e, t = null) {
  return new mu(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + ro(e.headers), t);
}
const Xb = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class mu extends Error {
  constructor(t, r = `HTTP error: ${Xb.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ve.HttpError = mu;
function Kb(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class cn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new Yb.CancellationToken(), n) {
    to(t);
    const i = n == null ? void 0 : JSON.stringify(n), a = i ? Buffer.from(i) : void 0;
    if (a != null) {
      xr(i);
      const { headers: o, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": a.length,
          ...o
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (o) => o.end(a));
  }
  doApiRequest(t, r, n, i = 0) {
    return xr.enabled && xr(`Request: ${ro(t)}`), r.createPromise((a, o, s) => {
      const u = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, a, o, i, n);
        } catch (l) {
          o(l);
        }
      });
      this.addErrorAndTimeoutHandlers(u, o, t.timeout), this.addRedirectHandlers(u, t, o, i, (f) => {
        this.doApiRequest(f, r, n, i).then(a).catch(o);
      }), n(u, o), s(() => u.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, a) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, a, o, s) {
    var u;
    if (xr.enabled && xr(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${ro(r)}`), t.statusCode === 404) {
      a(Rl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (u = t.statusCode) !== null && u !== void 0 ? u : 0, l = f >= 300 && f < 400, m = En(t, "location");
    if (l && m != null) {
      if (o > this.maxRedirects) {
        a(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(cn.prepareRedirectUrlOptions(m, r), n, s, o).then(i).catch(a);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", a), t.on("data", (p) => d += p), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const p = En(t, "content-type"), _ = p != null && (Array.isArray(p) ? p.find((g) => g.includes("json")) != null : p.includes("json"));
          a(Rl(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${_ ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (p) {
        a(p);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, a) => {
      const o = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      gu(t, s), to(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: a,
        callback: (u) => {
          u == null ? n(Buffer.concat(o)) : i(u);
        },
        responseHandler: (u, f) => {
          let l = 0;
          u.on("data", (m) => {
            if (l += m.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            o.push(m);
          }), u.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (a) => {
      if (a.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${a.statusCode}: ${a.statusMessage}`));
        return;
      }
      a.on("error", r.callback);
      const o = En(a, "location");
      if (o != null) {
        n < this.maxRedirects ? this.doDownload(cn.prepareRedirectUrlOptions(o, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Qb(r, a) : r.responseHandler(a, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (a) => {
      this.doDownload(a, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Z0(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const a = cn.reconstructOriginalUrl(r), o = Y0(t, r);
      cn.isCrossOriginRedirect(a, o) && (xr.enabled && xr(`Given the cross-origin redirect (from ${a.host} to ${o.host}), the Authorization header will be stripped out.`), delete i.authorization);
    }
    return n;
  }
  static reconstructOriginalUrl(t) {
    const r = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const n = t.hostname, i = t.port ? `:${t.port}` : "", a = t.path || "/";
    return new xl.URL(`${r}//${n}${i}${a}`);
  }
  static isCrossOriginRedirect(t, r) {
    if (t.hostname.toLowerCase() !== r.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && r.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(r.port))
      return !1;
    if (t.protocol !== r.protocol)
      return !0;
    const n = t.port, i = r.port;
    return n !== i;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof mu && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Ve.HttpExecutor = cn;
function Y0(e, t) {
  try {
    return new xl.URL(e);
  } catch {
    const r = t.hostname, n = t.protocol || "https:", i = t.port ? `:${t.port}` : "", a = `${n}//${r}${i}`;
    return new xl.URL(e, a);
  }
}
function Z0(e, t) {
  const r = to(t), n = Y0(e, t);
  return gu(n, r), r;
}
function gu(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ol extends Vb.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, qb.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, rd.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, rd.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ve.DigestTransform = Ol;
function Jb(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function En(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Qb(e, t) {
  if (!Jb(En(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const o = En(t, "content-length");
    o != null && r.push(new Zb.ProgressCallbackTransform(parseInt(o, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new Ol(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new Ol(e.options.sha2, "sha256", "hex"));
  const i = (0, Wb.createWriteStream)(e.destination);
  r.push(i);
  let a = t;
  for (const o of r)
    o.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), a = a.pipe(o);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function to(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function ro(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.MemoLazy = void 0;
class eS {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && X0(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Oo.MemoLazy = eS;
function X0(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), a = Object.keys(t);
    return i.length === a.length && i.every((o) => X0(e[o], t[o]));
  }
  return e === t;
}
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.githubUrl = tS;
qi.githubTagPrefix = rS;
qi.getS3LikeProviderBaseUrl = nS;
function tS(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function rS(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function nS(e) {
  const t = e.provider;
  if (t === "s3")
    return iS(e);
  if (t === "spaces")
    return aS(e);
  throw new Error(`Not supported provider: ${t}`);
}
function iS(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return K0(t, e.path);
}
function K0(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function aS(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return K0(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var vu = {};
Object.defineProperty(vu, "__esModule", { value: !0 });
vu.retry = J0;
const oS = hr;
async function J0(e, t) {
  var r;
  const { retries: n, interval: i, backoff: a = 0, attempt: o = 0, shouldRetry: s, cancellationToken: u = new oS.CancellationToken() } = t;
  try {
    return await e();
  } catch (f) {
    if (await Promise.resolve((r = s == null ? void 0 : s(f)) !== null && r !== void 0 ? r : !0) && n > 0 && !u.cancelled)
      return await new Promise((l) => setTimeout(l, i + a * o)), await J0(e, { ...t, retries: n - 1, attempt: o + 1 });
    throw f;
  }
}
var _u = {};
Object.defineProperty(_u, "__esModule", { value: !0 });
_u.parseDn = sS;
function sS(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const a = /* @__PURE__ */ new Map();
  for (let o = 0; o <= e.length; o++) {
    if (o === e.length) {
      r !== null && a.set(r, n);
      break;
    }
    const s = e[o];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        o++;
        const u = parseInt(e.slice(o, o + 2), 16);
        Number.isNaN(u) ? n += e[o] : (o++, n += String.fromCharCode(u));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && a.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (o > i) {
        let u = o;
        for (; e[u] === " "; )
          u++;
        i = u;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        o = i - 1;
        continue;
      }
    }
    n += s;
  }
  return a;
}
var An = {};
Object.defineProperty(An, "__esModule", { value: !0 });
An.nil = An.UUID = void 0;
const Q0 = ki, em = Ln, lS = "options.name must be either a string or a Buffer", nd = (0, Q0.randomBytes)(16);
nd[0] = nd[0] | 1;
const Ya = {}, oe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ya[t] = e, oe[e] = t;
}
class Hr {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = Hr.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return uS(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = cS(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ya[t[14] + t[15]] & 240) >> 4,
        variant: id((Ya[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: id((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, em.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = Ya[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
An.UUID = Hr;
Hr.OID = Hr.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function id(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var li;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(li || (li = {}));
function uS(e, t, r, n, i = li.ASCII) {
  const a = (0, Q0.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, em.newError)(lS, "ERR_INVALID_UUID_NAME");
  a.update(n), a.update(e);
  const s = a.digest();
  let u;
  switch (i) {
    case li.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, u = s;
      break;
    case li.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, u = new Hr(s);
      break;
    default:
      u = oe[s[0]] + oe[s[1]] + oe[s[2]] + oe[s[3]] + "-" + oe[s[4]] + oe[s[5]] + "-" + oe[s[6] & 15 | r] + oe[s[7]] + "-" + oe[s[8] & 63 | 128] + oe[s[9]] + "-" + oe[s[10]] + oe[s[11]] + oe[s[12]] + oe[s[13]] + oe[s[14]] + oe[s[15]];
      break;
  }
  return u;
}
function cS(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
An.nil = new Hr("00000000-0000-0000-0000-000000000000");
var Gi = {}, tm = {};
(function(e) {
  (function(t) {
    t.parser = function(h, c) {
      return new n(h, c);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(h, c) {
      if (!(this instanceof n))
        return new n(h, c);
      var x = this;
      a(x), x.q = x.c = "", x.bufferCheckPosition = t.MAX_BUFFER_LENGTH, x.opt = c || {}, x.opt.lowercase = x.opt.lowercase || x.opt.lowercasetags, x.looseCase = x.opt.lowercase ? "toLowerCase" : "toUpperCase", x.tags = [], x.closed = x.closedRoot = x.sawRoot = !1, x.tag = x.error = null, x.strict = !!h, x.noscript = !!(h || x.opt.noscript), x.state = E.BEGIN, x.strictEntities = x.opt.strictEntities, x.ENTITIES = x.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), x.attribList = [], x.opt.xmlns && (x.ns = Object.create(g)), x.opt.unquotedAttributeValues === void 0 && (x.opt.unquotedAttributeValues = !h), x.trackPosition = x.opt.position !== !1, x.trackPosition && (x.position = x.line = x.column = 0), N(x, "onready");
    }
    Object.create || (Object.create = function(h) {
      function c() {
      }
      c.prototype = h;
      var x = new c();
      return x;
    }), Object.keys || (Object.keys = function(h) {
      var c = [];
      for (var x in h) h.hasOwnProperty(x) && c.push(x);
      return c;
    });
    function i(h) {
      for (var c = Math.max(t.MAX_BUFFER_LENGTH, 10), x = 0, T = 0, Z = r.length; T < Z; T++) {
        var G = h[r[T]].length;
        if (G > c)
          switch (r[T]) {
            case "textNode":
              re(h);
              break;
            case "cdata":
              Y(h, "oncdata", h.cdata), h.cdata = "";
              break;
            case "script":
              Y(h, "onscript", h.script), h.script = "";
              break;
            default:
              P(h, "Max buffer length exceeded: " + r[T]);
          }
        x = Math.max(x, G);
      }
      var K = t.MAX_BUFFER_LENGTH - x;
      h.bufferCheckPosition = K + h.position;
    }
    function a(h) {
      for (var c = 0, x = r.length; c < x; c++)
        h[r[c]] = "";
    }
    function o(h) {
      re(h), h.cdata !== "" && (Y(h, "oncdata", h.cdata), h.cdata = ""), h.script !== "" && (Y(h, "onscript", h.script), h.script = "");
    }
    n.prototype = {
      end: function() {
        M(this);
      },
      write: fe,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        o(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var u = t.EVENTS.filter(function(h) {
      return h !== "error" && h !== "end";
    });
    function f(h, c) {
      return new l(h, c);
    }
    function l(h, c) {
      if (!(this instanceof l))
        return new l(h, c);
      s.apply(this), this._parser = new n(h, c), this.writable = !0, this.readable = !0;
      var x = this;
      this._parser.onend = function() {
        x.emit("end");
      }, this._parser.onerror = function(T) {
        x.emit("error", T), x._parser.error = null;
      }, this._decoder = null, u.forEach(function(T) {
        Object.defineProperty(x, "on" + T, {
          get: function() {
            return x._parser["on" + T];
          },
          set: function(Z) {
            if (!Z)
              return x.removeAllListeners(T), x._parser["on" + T] = Z, Z;
            x.on(T, Z);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(s.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(h) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(h)) {
        if (!this._decoder) {
          var c = Ev.StringDecoder;
          this._decoder = new c("utf8");
        }
        h = this._decoder.write(h);
      }
      return this._parser.write(h.toString()), this.emit("data", h), !0;
    }, l.prototype.end = function(h) {
      return h && h.length && this.write(h), this._parser.end(), !0;
    }, l.prototype.on = function(h, c) {
      var x = this;
      return !x._parser["on" + h] && u.indexOf(h) !== -1 && (x._parser["on" + h] = function() {
        var T = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        T.splice(0, 0, h), x.emit.apply(x, T);
      }), s.prototype.on.call(x, h, c);
    };
    var m = "[CDATA[", d = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", _ = "http://www.w3.org/2000/xmlns/", g = { xml: p, xmlns: _ }, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, A = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(h) {
      return h === " " || h === `
` || h === "\r" || h === "	";
    }
    function $(h) {
      return h === '"' || h === "'";
    }
    function j(h) {
      return h === ">" || R(h);
    }
    function B(h, c) {
      return h.test(c);
    }
    function z(h, c) {
      return !B(h, c);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(h) {
      var c = t.ENTITIES[h], x = typeof c == "number" ? String.fromCharCode(c) : c;
      t.ENTITIES[h] = x;
    });
    for (var q in t.STATE)
      t.STATE[t.STATE[q]] = q;
    E = t.STATE;
    function N(h, c, x) {
      h[c] && h[c](x);
    }
    function Y(h, c, x) {
      h.textNode && re(h), N(h, c, x);
    }
    function re(h) {
      h.textNode = D(h.opt, h.textNode), h.textNode && N(h, "ontext", h.textNode), h.textNode = "";
    }
    function D(h, c) {
      return h.trim && (c = c.trim()), h.normalize && (c = c.replace(/\s+/g, " ")), c;
    }
    function P(h, c) {
      return re(h), h.trackPosition && (c += `
Line: ` + h.line + `
Column: ` + h.column + `
Char: ` + h.c), c = new Error(c), h.error = c, N(h, "onerror", c), h;
    }
    function M(h) {
      return h.sawRoot && !h.closedRoot && S(h, "Unclosed root tag"), h.state !== E.BEGIN && h.state !== E.BEGIN_WHITESPACE && h.state !== E.TEXT && P(h, "Unexpected end"), re(h), h.c = "", h.closed = !0, N(h, "onend"), n.call(h, h.strict, h.opt), h;
    }
    function S(h, c) {
      if (typeof h != "object" || !(h instanceof n))
        throw new Error("bad call to strictFail");
      h.strict && P(h, c);
    }
    function C(h) {
      h.strict || (h.tagName = h.tagName[h.looseCase]());
      var c = h.tags[h.tags.length - 1] || h, x = h.tag = { name: h.tagName, attributes: {} };
      h.opt.xmlns && (x.ns = c.ns), h.attribList.length = 0, Y(h, "onopentagstart", x);
    }
    function I(h, c) {
      var x = h.indexOf(":"), T = x < 0 ? ["", h] : h.split(":"), Z = T[0], G = T[1];
      return c && h === "xmlns" && (Z = "xmlns", G = ""), { prefix: Z, local: G };
    }
    function U(h) {
      if (h.strict || (h.attribName = h.attribName[h.looseCase]()), h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName)) {
        h.attribName = h.attribValue = "";
        return;
      }
      if (h.opt.xmlns) {
        var c = I(h.attribName, !0), x = c.prefix, T = c.local;
        if (x === "xmlns")
          if (T === "xml" && h.attribValue !== p)
            S(
              h,
              "xml: prefix must be bound to " + p + `
Actual: ` + h.attribValue
            );
          else if (T === "xmlns" && h.attribValue !== _)
            S(
              h,
              "xmlns: prefix must be bound to " + _ + `
Actual: ` + h.attribValue
            );
          else {
            var Z = h.tag, G = h.tags[h.tags.length - 1] || h;
            Z.ns === G.ns && (Z.ns = Object.create(G.ns)), Z.ns[T] = h.attribValue;
          }
        h.attribList.push([h.attribName, h.attribValue]);
      } else
        h.tag.attributes[h.attribName] = h.attribValue, Y(h, "onattribute", {
          name: h.attribName,
          value: h.attribValue
        });
      h.attribName = h.attribValue = "";
    }
    function W(h, c) {
      if (h.opt.xmlns) {
        var x = h.tag, T = I(h.tagName);
        x.prefix = T.prefix, x.local = T.local, x.uri = x.ns[T.prefix] || "", x.prefix && !x.uri && (S(h, "Unbound namespace prefix: " + JSON.stringify(h.tagName)), x.uri = T.prefix);
        var Z = h.tags[h.tags.length - 1] || h;
        x.ns && Z.ns !== x.ns && Object.keys(x.ns).forEach(function(k) {
          Y(h, "onopennamespace", {
            prefix: k,
            uri: x.ns[k]
          });
        });
        for (var G = 0, K = h.attribList.length; G < K; G++) {
          var ve = h.attribList[G], ye = ve[0], Qe = ve[1], we = I(ye, !0), le = we.prefix, vt = we.local, It = le === "" ? "" : x.ns[le] || "", ot = {
            name: ye,
            value: Qe,
            prefix: le,
            local: vt,
            uri: It
          };
          le && le !== "xmlns" && !It && (S(h, "Unbound namespace prefix: " + JSON.stringify(le)), ot.uri = le), h.tag.attributes[ye] = ot, Y(h, "onattribute", ot);
        }
        h.attribList.length = 0;
      }
      h.tag.isSelfClosing = !!c, h.sawRoot = !0, h.tags.push(h.tag), Y(h, "onopentag", h.tag), c || (!h.noscript && h.tagName.toLowerCase() === "script" ? h.state = E.SCRIPT : h.state = E.TEXT, h.tag = null, h.tagName = ""), h.attribName = h.attribValue = "", h.attribList.length = 0;
    }
    function V(h) {
      if (!h.tagName) {
        S(h, "Weird empty close tag."), h.textNode += "</>", h.state = E.TEXT;
        return;
      }
      if (h.script) {
        if (h.tagName !== "script") {
          h.script += "</" + h.tagName + ">", h.tagName = "", h.state = E.SCRIPT;
          return;
        }
        Y(h, "onscript", h.script), h.script = "";
      }
      var c = h.tags.length, x = h.tagName;
      h.strict || (x = x[h.looseCase]());
      for (var T = x; c--; ) {
        var Z = h.tags[c];
        if (Z.name !== T)
          S(h, "Unexpected close tag");
        else
          break;
      }
      if (c < 0) {
        S(h, "Unmatched closing tag: " + h.tagName), h.textNode += "</" + h.tagName + ">", h.state = E.TEXT;
        return;
      }
      h.tagName = x;
      for (var G = h.tags.length; G-- > c; ) {
        var K = h.tag = h.tags.pop();
        h.tagName = h.tag.name, Y(h, "onclosetag", h.tagName);
        var ve = {};
        for (var ye in K.ns)
          ve[ye] = K.ns[ye];
        var Qe = h.tags[h.tags.length - 1] || h;
        h.opt.xmlns && K.ns !== Qe.ns && Object.keys(K.ns).forEach(function(we) {
          var le = K.ns[we];
          Y(h, "onclosenamespace", { prefix: we, uri: le });
        });
      }
      c === 0 && (h.closedRoot = !0), h.tagName = h.attribValue = h.attribName = "", h.attribList.length = 0, h.state = E.TEXT;
    }
    function te(h) {
      var c = h.entity, x = c.toLowerCase(), T, Z = "";
      return h.ENTITIES[c] ? h.ENTITIES[c] : h.ENTITIES[x] ? h.ENTITIES[x] : (c = x, c.charAt(0) === "#" && (c.charAt(1) === "x" ? (c = c.slice(2), T = parseInt(c, 16), Z = T.toString(16)) : (c = c.slice(1), T = parseInt(c, 10), Z = T.toString(10))), c = c.replace(/^0+/, ""), isNaN(T) || Z.toLowerCase() !== c ? (S(h, "Invalid character entity"), "&" + h.entity + ";") : String.fromCodePoint(T));
    }
    function ae(h, c) {
      c === "<" ? (h.state = E.OPEN_WAKA, h.startTagPosition = h.position) : R(c) || (S(h, "Non-whitespace before first tag."), h.textNode = c, h.state = E.TEXT);
    }
    function J(h, c) {
      var x = "";
      return c < h.length && (x = h.charAt(c)), x;
    }
    function fe(h) {
      var c = this;
      if (this.error)
        throw this.error;
      if (c.closed)
        return P(
          c,
          "Cannot write after close. Assign an onready handler."
        );
      if (h === null)
        return M(c);
      typeof h == "object" && (h = h.toString());
      for (var x = 0, T = ""; T = J(h, x++), c.c = T, !!T; )
        switch (c.trackPosition && (c.position++, T === `
` ? (c.line++, c.column = 0) : c.column++), c.state) {
          case E.BEGIN:
            if (c.state = E.BEGIN_WHITESPACE, T === "\uFEFF")
              continue;
            ae(c, T);
            continue;
          case E.BEGIN_WHITESPACE:
            ae(c, T);
            continue;
          case E.TEXT:
            if (c.sawRoot && !c.closedRoot) {
              for (var Z = x - 1; T && T !== "<" && T !== "&"; )
                T = J(h, x++), T && c.trackPosition && (c.position++, T === `
` ? (c.line++, c.column = 0) : c.column++);
              c.textNode += h.substring(Z, x - 1);
            }
            T === "<" && !(c.sawRoot && c.closedRoot && !c.strict) ? (c.state = E.OPEN_WAKA, c.startTagPosition = c.position) : (!R(T) && (!c.sawRoot || c.closedRoot) && S(c, "Text data outside of root node."), T === "&" ? c.state = E.TEXT_ENTITY : c.textNode += T);
            continue;
          case E.SCRIPT:
            T === "<" ? c.state = E.SCRIPT_ENDING : c.script += T;
            continue;
          case E.SCRIPT_ENDING:
            T === "/" ? c.state = E.CLOSE_TAG : (c.script += "<" + T, c.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (T === "!")
              c.state = E.SGML_DECL, c.sgmlDecl = "";
            else if (!R(T)) if (B(b, T))
              c.state = E.OPEN_TAG, c.tagName = T;
            else if (T === "/")
              c.state = E.CLOSE_TAG, c.tagName = "";
            else if (T === "?")
              c.state = E.PROC_INST, c.procInstName = c.procInstBody = "";
            else {
              if (S(c, "Unencoded <"), c.startTagPosition + 1 < c.position) {
                var G = c.position - c.startTagPosition;
                T = new Array(G).join(" ") + T;
              }
              c.textNode += "<" + T, c.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (c.sgmlDecl + T === "--") {
              c.state = E.COMMENT, c.comment = "", c.sgmlDecl = "";
              continue;
            }
            c.doctype && c.doctype !== !0 && c.sgmlDecl ? (c.state = E.DOCTYPE_DTD, c.doctype += "<!" + c.sgmlDecl + T, c.sgmlDecl = "") : (c.sgmlDecl + T).toUpperCase() === m ? (Y(c, "onopencdata"), c.state = E.CDATA, c.sgmlDecl = "", c.cdata = "") : (c.sgmlDecl + T).toUpperCase() === d ? (c.state = E.DOCTYPE, (c.doctype || c.sawRoot) && S(
              c,
              "Inappropriately located doctype declaration"
            ), c.doctype = "", c.sgmlDecl = "") : T === ">" ? (Y(c, "onsgmldeclaration", c.sgmlDecl), c.sgmlDecl = "", c.state = E.TEXT) : ($(T) && (c.state = E.SGML_DECL_QUOTED), c.sgmlDecl += T);
            continue;
          case E.SGML_DECL_QUOTED:
            T === c.q && (c.state = E.SGML_DECL, c.q = ""), c.sgmlDecl += T;
            continue;
          case E.DOCTYPE:
            T === ">" ? (c.state = E.TEXT, Y(c, "ondoctype", c.doctype), c.doctype = !0) : (c.doctype += T, T === "[" ? c.state = E.DOCTYPE_DTD : $(T) && (c.state = E.DOCTYPE_QUOTED, c.q = T));
            continue;
          case E.DOCTYPE_QUOTED:
            c.doctype += T, T === c.q && (c.q = "", c.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            T === "]" ? (c.doctype += T, c.state = E.DOCTYPE) : T === "<" ? (c.state = E.OPEN_WAKA, c.startTagPosition = c.position) : $(T) ? (c.doctype += T, c.state = E.DOCTYPE_DTD_QUOTED, c.q = T) : c.doctype += T;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            c.doctype += T, T === c.q && (c.state = E.DOCTYPE_DTD, c.q = "");
            continue;
          case E.COMMENT:
            T === "-" ? c.state = E.COMMENT_ENDING : c.comment += T;
            continue;
          case E.COMMENT_ENDING:
            T === "-" ? (c.state = E.COMMENT_ENDED, c.comment = D(c.opt, c.comment), c.comment && Y(c, "oncomment", c.comment), c.comment = "") : (c.comment += "-" + T, c.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            T !== ">" ? (S(c, "Malformed comment"), c.comment += "--" + T, c.state = E.COMMENT) : c.doctype && c.doctype !== !0 ? c.state = E.DOCTYPE_DTD : c.state = E.TEXT;
            continue;
          case E.CDATA:
            T === "]" ? c.state = E.CDATA_ENDING : c.cdata += T;
            continue;
          case E.CDATA_ENDING:
            T === "]" ? c.state = E.CDATA_ENDING_2 : (c.cdata += "]" + T, c.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            T === ">" ? (c.cdata && Y(c, "oncdata", c.cdata), Y(c, "onclosecdata"), c.cdata = "", c.state = E.TEXT) : T === "]" ? c.cdata += "]" : (c.cdata += "]]" + T, c.state = E.CDATA);
            continue;
          case E.PROC_INST:
            T === "?" ? c.state = E.PROC_INST_ENDING : R(T) ? c.state = E.PROC_INST_BODY : c.procInstName += T;
            continue;
          case E.PROC_INST_BODY:
            if (!c.procInstBody && R(T))
              continue;
            T === "?" ? c.state = E.PROC_INST_ENDING : c.procInstBody += T;
            continue;
          case E.PROC_INST_ENDING:
            T === ">" ? (Y(c, "onprocessinginstruction", {
              name: c.procInstName,
              body: c.procInstBody
            }), c.procInstName = c.procInstBody = "", c.state = E.TEXT) : (c.procInstBody += "?" + T, c.state = E.PROC_INST_BODY);
            continue;
          case E.OPEN_TAG:
            B(v, T) ? c.tagName += T : (C(c), T === ">" ? W(c) : T === "/" ? c.state = E.OPEN_TAG_SLASH : (R(T) || S(c, "Invalid character in tag name"), c.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            T === ">" ? (W(c, !0), V(c)) : (S(c, "Forward-slash in opening tag not followed by >"), c.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (R(T))
              continue;
            T === ">" ? W(c) : T === "/" ? c.state = E.OPEN_TAG_SLASH : B(b, T) ? (c.attribName = T, c.attribValue = "", c.state = E.ATTRIB_NAME) : S(c, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            T === "=" ? c.state = E.ATTRIB_VALUE : T === ">" ? (S(c, "Attribute without value"), c.attribValue = c.attribName, U(c), W(c)) : R(T) ? c.state = E.ATTRIB_NAME_SAW_WHITE : B(v, T) ? c.attribName += T : S(c, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (T === "=")
              c.state = E.ATTRIB_VALUE;
            else {
              if (R(T))
                continue;
              S(c, "Attribute without value"), c.tag.attributes[c.attribName] = "", c.attribValue = "", Y(c, "onattribute", {
                name: c.attribName,
                value: ""
              }), c.attribName = "", T === ">" ? W(c) : B(b, T) ? (c.attribName = T, c.state = E.ATTRIB_NAME) : (S(c, "Invalid attribute name"), c.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (R(T))
              continue;
            $(T) ? (c.q = T, c.state = E.ATTRIB_VALUE_QUOTED) : (c.opt.unquotedAttributeValues || P(c, "Unquoted attribute value"), c.state = E.ATTRIB_VALUE_UNQUOTED, c.attribValue = T);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (T !== c.q) {
              T === "&" ? c.state = E.ATTRIB_VALUE_ENTITY_Q : c.attribValue += T;
              continue;
            }
            U(c), c.q = "", c.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            R(T) ? c.state = E.ATTRIB : T === ">" ? W(c) : T === "/" ? c.state = E.OPEN_TAG_SLASH : B(b, T) ? (S(c, "No whitespace between attributes"), c.attribName = T, c.attribValue = "", c.state = E.ATTRIB_NAME) : S(c, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!j(T)) {
              T === "&" ? c.state = E.ATTRIB_VALUE_ENTITY_U : c.attribValue += T;
              continue;
            }
            U(c), T === ">" ? W(c) : c.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (c.tagName)
              T === ">" ? V(c) : B(v, T) ? c.tagName += T : c.script ? (c.script += "</" + c.tagName, c.tagName = "", c.state = E.SCRIPT) : (R(T) || S(c, "Invalid tagname in closing tag"), c.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(T))
                continue;
              z(b, T) ? c.script ? (c.script += "</" + T, c.state = E.SCRIPT) : S(c, "Invalid tagname in closing tag.") : c.tagName = T;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (R(T))
              continue;
            T === ">" ? V(c) : S(c, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var K, ve;
            switch (c.state) {
              case E.TEXT_ENTITY:
                K = E.TEXT, ve = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                K = E.ATTRIB_VALUE_QUOTED, ve = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                K = E.ATTRIB_VALUE_UNQUOTED, ve = "attribValue";
                break;
            }
            if (T === ";") {
              var ye = te(c);
              c.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ye) ? (c.entity = "", c.state = K, c.write(ye)) : (c[ve] += ye, c.entity = "", c.state = K);
            } else B(c.entity.length ? A : y, T) ? c.entity += T : (S(c, "Invalid character in entity name"), c[ve] += "&" + c.entity + T, c.entity = "", c.state = K);
            continue;
          default:
            throw new Error(c, "Unknown state: " + c.state);
        }
      return c.position >= c.bufferCheckPosition && i(c), c;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var h = String.fromCharCode, c = Math.floor, x = function() {
        var T = 16384, Z = [], G, K, ve = -1, ye = arguments.length;
        if (!ye)
          return "";
        for (var Qe = ""; ++ve < ye; ) {
          var we = Number(arguments[ve]);
          if (!isFinite(we) || // `NaN`, `+Infinity`, or `-Infinity`
          we < 0 || // not a valid Unicode code point
          we > 1114111 || // not a valid Unicode code point
          c(we) !== we)
            throw RangeError("Invalid code point: " + we);
          we <= 65535 ? Z.push(we) : (we -= 65536, G = (we >> 10) + 55296, K = we % 1024 + 56320, Z.push(G, K)), (ve + 1 === ye || Z.length > T) && (Qe += h.apply(null, Z), Z.length = 0);
        }
        return Qe;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: x,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = x;
    }();
  })(e);
})(tm);
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.XElement = void 0;
Gi.parseXml = pS;
const fS = tm, xa = Ln;
class rm {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, xa.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!hS(t))
      throw (0, xa.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, xa.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, xa.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (ad(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => ad(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
Gi.XElement = rm;
const dS = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function hS(e) {
  return dS.test(e);
}
function ad(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function pS(e) {
  let t = null;
  const r = fS.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const a = new rm(i.name);
    if (a.attributes = i.attributes, t === null)
      t = a;
    else {
      const o = n[n.length - 1];
      o.elements == null && (o.elements = []), o.elements.push(a);
    }
    n.push(a);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const a = n[n.length - 1];
    a.value = i, a.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = m;
  var t = hr;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var r = Ln;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return r.newError;
  } });
  var n = Ve;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } });
  var i = Oo;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var a = zi;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var o = qi;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return o.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return o.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return o.githubTagPrefix;
  } });
  var s = vu;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return s.retry;
  } });
  var u = _u;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return u.parseDn;
  } });
  var f = An;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return f.UUID;
  } });
  var l = Gi;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function m(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})($e);
var Ue = {}, yu = {}, Ct = {};
function nm(e) {
  return typeof e > "u" || e === null;
}
function mS(e) {
  return typeof e == "object" && e !== null;
}
function gS(e) {
  return Array.isArray(e) ? e : nm(e) ? [] : [e];
}
function vS(e, t) {
  var r, n, i, a;
  if (t)
    for (a = Object.keys(t), r = 0, n = a.length; r < n; r += 1)
      i = a[r], e[i] = t[i];
  return e;
}
function _S(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function yS(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Ct.isNothing = nm;
Ct.isObject = mS;
Ct.toArray = gS;
Ct.repeat = _S;
Ct.isNegativeZero = yS;
Ct.extend = vS;
function im(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function bi(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = im(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
bi.prototype = Object.create(Error.prototype);
bi.prototype.constructor = bi;
bi.prototype.toString = function(t) {
  return this.name + ": " + im(this, t);
};
var Wi = bi, Kn = Ct;
function js(e, t, r, n, i) {
  var a = "", o = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (a = " ... ", t = n - s + a.length), r - n > s && (o = " ...", r = n + s - o.length), {
    str: a + e.slice(t, r).replace(/\t/g, "→") + o,
    pos: n - t + a.length
    // relative position
  };
}
function Hs(e, t) {
  return Kn.repeat(" ", t - e.length) + e;
}
function wS(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], a, o = -1; a = r.exec(e.buffer); )
    i.push(a.index), n.push(a.index + a[0].length), e.position <= a.index && o < 0 && (o = n.length - 2);
  o < 0 && (o = n.length - 1);
  var s = "", u, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, m = t.maxLength - (t.indent + l + 3);
  for (u = 1; u <= t.linesBefore && !(o - u < 0); u++)
    f = js(
      e.buffer,
      n[o - u],
      i[o - u],
      e.position - (n[o] - n[o - u]),
      m
    ), s = Kn.repeat(" ", t.indent) + Hs((e.line - u + 1).toString(), l) + " | " + f.str + `
` + s;
  for (f = js(e.buffer, n[o], i[o], e.position, m), s += Kn.repeat(" ", t.indent) + Hs((e.line + 1).toString(), l) + " | " + f.str + `
`, s += Kn.repeat("-", t.indent + l + 3 + f.pos) + `^
`, u = 1; u <= t.linesAfter && !(o + u >= i.length); u++)
    f = js(
      e.buffer,
      n[o + u],
      i[o + u],
      e.position - (n[o] - n[o + u]),
      m
    ), s += Kn.repeat(" ", t.indent) + Hs((e.line + u + 1).toString(), l) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var ES = wS, od = Wi, bS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], SS = [
  "scalar",
  "sequence",
  "mapping"
];
function TS(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function AS(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (bS.indexOf(r) === -1)
      throw new od('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = TS(t.styleAliases || null), SS.indexOf(this.kind) === -1)
    throw new od('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Ke = AS, Wn = Wi, zs = Ke;
function sd(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(a, o) {
      a.tag === n.tag && a.kind === n.kind && a.multi === n.multi && (i = o);
    }), r[i] = n;
  }), r;
}
function CS() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Il(e) {
  return this.extend(e);
}
Il.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof zs)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new Wn("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(a) {
    if (!(a instanceof zs))
      throw new Wn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (a.loadKind && a.loadKind !== "scalar")
      throw new Wn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (a.multi)
      throw new Wn("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(a) {
    if (!(a instanceof zs))
      throw new Wn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Il.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = sd(i, "implicit"), i.compiledExplicit = sd(i, "explicit"), i.compiledTypeMap = CS(i.compiledImplicit, i.compiledExplicit), i;
};
var am = Il, xS = Ke, om = new xS("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), RS = Ke, sm = new RS("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), OS = Ke, lm = new OS("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), IS = am, um = new IS({
  explicit: [
    om,
    sm,
    lm
  ]
}), $S = Ke;
function kS(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function DS() {
  return null;
}
function NS(e) {
  return e === null;
}
var cm = new $S("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: kS,
  construct: DS,
  predicate: NS,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), PS = Ke;
function FS(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function LS(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function US(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var fm = new PS("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: FS,
  construct: LS,
  predicate: US,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), BS = Ct, MS = Ke;
function jS(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function HS(e) {
  return 48 <= e && e <= 55;
}
function zS(e) {
  return 48 <= e && e <= 57;
}
function qS(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!jS(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!HS(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!zS(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function GS(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function WS(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !BS.isNegativeZero(e);
}
var dm = new MS("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: qS,
  construct: GS,
  predicate: WS,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), hm = Ct, VS = Ke, YS = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ZS(e) {
  return !(e === null || !YS.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function XS(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var KS = /^[-+]?[0-9]+e/;
function JS(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (hm.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), KS.test(r) ? r.replace("e", ".e") : r;
}
function QS(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || hm.isNegativeZero(e));
}
var pm = new VS("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ZS,
  construct: XS,
  predicate: QS,
  represent: JS,
  defaultStyle: "lowercase"
}), mm = um.extend({
  implicit: [
    cm,
    fm,
    dm,
    pm
  ]
}), gm = mm, eT = Ke, vm = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), _m = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function tT(e) {
  return e === null ? !1 : vm.exec(e) !== null || _m.exec(e) !== null;
}
function rT(e) {
  var t, r, n, i, a, o, s, u = 0, f = null, l, m, d;
  if (t = vm.exec(e), t === null && (t = _m.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (a = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (u = t[7].slice(0, 3); u.length < 3; )
      u += "0";
    u = +u;
  }
  return t[9] && (l = +t[10], m = +(t[11] || 0), f = (l * 60 + m) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(r, n, i, a, o, s, u)), f && d.setTime(d.getTime() - f), d;
}
function nT(e) {
  return e.toISOString();
}
var ym = new eT("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: tT,
  construct: rT,
  instanceOf: Date,
  represent: nT
}), iT = Ke;
function aT(e) {
  return e === "<<" || e === null;
}
var wm = new iT("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: aT
}), oT = Ke, wu = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function sT(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, a = wu;
  for (r = 0; r < i; r++)
    if (t = a.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function lT(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, a = wu, o = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | a.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : r === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : r === 12 && s.push(o >> 4 & 255), new Uint8Array(s);
}
function uT(e) {
  var t = "", r = 0, n, i, a = e.length, o = wu;
  for (n = 0; n < a; n++)
    n % 3 === 0 && n && (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]), r = (r << 8) + e[n];
  return i = a % 3, i === 0 ? (t += o[r >> 18 & 63], t += o[r >> 12 & 63], t += o[r >> 6 & 63], t += o[r & 63]) : i === 2 ? (t += o[r >> 10 & 63], t += o[r >> 4 & 63], t += o[r << 2 & 63], t += o[64]) : i === 1 && (t += o[r >> 2 & 63], t += o[r << 4 & 63], t += o[64], t += o[64]), t;
}
function cT(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Em = new oT("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: sT,
  construct: lT,
  predicate: cT,
  represent: uT
}), fT = Ke, dT = Object.prototype.hasOwnProperty, hT = Object.prototype.toString;
function pT(e) {
  if (e === null) return !0;
  var t = [], r, n, i, a, o, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], o = !1, hT.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (dT.call(i, a))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function mT(e) {
  return e !== null ? e : [];
}
var bm = new fT("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: pT,
  construct: mT
}), gT = Ke, vT = Object.prototype.toString;
function _T(e) {
  if (e === null) return !0;
  var t, r, n, i, a, o = e;
  for (a = new Array(o.length), t = 0, r = o.length; t < r; t += 1) {
    if (n = o[t], vT.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    a[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function yT(e) {
  if (e === null) return [];
  var t, r, n, i, a, o = e;
  for (a = new Array(o.length), t = 0, r = o.length; t < r; t += 1)
    n = o[t], i = Object.keys(n), a[t] = [i[0], n[i[0]]];
  return a;
}
var Sm = new gT("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: _T,
  construct: yT
}), wT = Ke, ET = Object.prototype.hasOwnProperty;
function bT(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (ET.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function ST(e) {
  return e !== null ? e : {};
}
var Tm = new wT("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: bT,
  construct: ST
}), Eu = gm.extend({
  implicit: [
    ym,
    wm
  ],
  explicit: [
    Em,
    bm,
    Sm,
    Tm
  ]
}), Ir = Ct, Am = Wi, TT = ES, AT = Eu, pr = Object.prototype.hasOwnProperty, no = 1, Cm = 2, xm = 3, io = 4, qs = 1, CT = 2, ld = 3, xT = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, RT = /[\x85\u2028\u2029]/, OT = /[,\[\]\{\}]/, Rm = /^(?:!|!!|![a-z\-]+!)$/i, Om = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ud(e) {
  return Object.prototype.toString.call(e);
}
function Lt(e) {
  return e === 10 || e === 13;
}
function Fr(e) {
  return e === 9 || e === 32;
}
function nt(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function fn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function IT(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function $T(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function kT(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function cd(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function DT(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Im = new Array(256), $m = new Array(256);
for (var rn = 0; rn < 256; rn++)
  Im[rn] = cd(rn) ? 1 : 0, $m[rn] = cd(rn);
function NT(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || AT, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function km(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = TT(r), new Am(t, r);
}
function ee(e, t) {
  throw km(e, t);
}
function ao(e, t) {
  e.onWarning && e.onWarning.call(null, km(e, t));
}
var fd = {
  YAML: function(t, r, n) {
    var i, a, o;
    t.version !== null && ee(t, "duplication of %YAML directive"), n.length !== 1 && ee(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && ee(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), o = parseInt(i[2], 10), a !== 1 && ee(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && ao(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, a;
    n.length !== 2 && ee(t, "TAG directive accepts exactly two arguments"), i = n[0], a = n[1], Rm.test(i) || ee(t, "ill-formed tag handle (first argument) of the TAG directive"), pr.call(t.tagMap, i) && ee(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Om.test(a) || ee(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      a = decodeURIComponent(a);
    } catch {
      ee(t, "tag prefix is malformed: " + a);
    }
    t.tagMap[i] = a;
  }
};
function fr(e, t, r, n) {
  var i, a, o, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, a = s.length; i < a; i += 1)
        o = s.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || ee(e, "expected valid JSON character");
    else xT.test(s) && ee(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function dd(e, t, r, n) {
  var i, a, o, s;
  for (Ir.isObject(r) || ee(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), o = 0, s = i.length; o < s; o += 1)
    a = i[o], pr.call(t, a) || (t[a] = r[a], n[a] = !0);
}
function dn(e, t, r, n, i, a, o, s, u) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && ee(e, "nested arrays are not supported inside keys"), typeof i == "object" && ud(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && ud(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (f = 0, l = a.length; f < l; f += 1)
        dd(e, t, a[f], r);
    else
      dd(e, t, a, r);
  else
    !e.json && !pr.call(r, i) && pr.call(t, i) && (e.line = o || e.line, e.lineStart = s || e.lineStart, e.position = u || e.position, ee(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: a
    }) : t[i] = a, delete r[i];
  return t;
}
function bu(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : ee(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ce(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Fr(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Lt(i))
      for (bu(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && ao(e, "deficient indentation"), n;
}
function Io(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || nt(r)));
}
function Su(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Ir.repeat(`
`, t - 1));
}
function PT(e, t, r) {
  var n, i, a, o, s, u, f, l, m = e.kind, d = e.result, p;
  if (p = e.input.charCodeAt(e.position), nt(p) || fn(p) || p === 35 || p === 38 || p === 42 || p === 33 || p === 124 || p === 62 || p === 39 || p === 34 || p === 37 || p === 64 || p === 96 || (p === 63 || p === 45) && (i = e.input.charCodeAt(e.position + 1), nt(i) || r && fn(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = o = e.position, s = !1; p !== 0; ) {
    if (p === 58) {
      if (i = e.input.charCodeAt(e.position + 1), nt(i) || r && fn(i))
        break;
    } else if (p === 35) {
      if (n = e.input.charCodeAt(e.position - 1), nt(n))
        break;
    } else {
      if (e.position === e.lineStart && Io(e) || r && fn(p))
        break;
      if (Lt(p))
        if (u = e.line, f = e.lineStart, l = e.lineIndent, Ce(e, !1, -1), e.lineIndent >= t) {
          s = !0, p = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = u, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    s && (fr(e, a, o, !1), Su(e, e.line - u), a = o = e.position, s = !1), Fr(p) || (o = e.position + 1), p = e.input.charCodeAt(++e.position);
  }
  return fr(e, a, o, !1), e.result ? !0 : (e.kind = m, e.result = d, !1);
}
function FT(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (fr(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else Lt(r) ? (fr(e, n, i, !0), Su(e, Ce(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Io(e) ? ee(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  ee(e, "unexpected end of the stream within a single quoted scalar");
}
function LT(e, t) {
  var r, n, i, a, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return fr(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (fr(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), Lt(s))
        Ce(e, !1, t);
      else if (s < 256 && Im[s])
        e.result += $m[s], e.position++;
      else if ((o = $T(s)) > 0) {
        for (i = o, a = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (o = IT(s)) >= 0 ? a = (a << 4) + o : ee(e, "expected hexadecimal character");
        e.result += DT(a), e.position++;
      } else
        ee(e, "unknown escape sequence");
      r = n = e.position;
    } else Lt(s) ? (fr(e, r, n, !0), Su(e, Ce(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Io(e) ? ee(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  ee(e, "unexpected end of the stream within a double quoted scalar");
}
function UT(e, t) {
  var r = !0, n, i, a, o = e.tag, s, u = e.anchor, f, l, m, d, p, _ = /* @__PURE__ */ Object.create(null), g, b, v, y;
  if (y = e.input.charCodeAt(e.position), y === 91)
    l = 93, p = !1, s = [];
  else if (y === 123)
    l = 125, p = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), y = e.input.charCodeAt(++e.position); y !== 0; ) {
    if (Ce(e, !0, t), y = e.input.charCodeAt(e.position), y === l)
      return e.position++, e.tag = o, e.anchor = u, e.kind = p ? "mapping" : "sequence", e.result = s, !0;
    r ? y === 44 && ee(e, "expected the node content, but found ','") : ee(e, "missed comma between flow collection entries"), b = g = v = null, m = d = !1, y === 63 && (f = e.input.charCodeAt(e.position + 1), nt(f) && (m = d = !0, e.position++, Ce(e, !0, t))), n = e.line, i = e.lineStart, a = e.position, Cn(e, t, no, !1, !0), b = e.tag, g = e.result, Ce(e, !0, t), y = e.input.charCodeAt(e.position), (d || e.line === n) && y === 58 && (m = !0, y = e.input.charCodeAt(++e.position), Ce(e, !0, t), Cn(e, t, no, !1, !0), v = e.result), p ? dn(e, s, _, b, g, v, n, i, a) : m ? s.push(dn(e, null, _, b, g, v, n, i, a)) : s.push(g), Ce(e, !0, t), y = e.input.charCodeAt(e.position), y === 44 ? (r = !0, y = e.input.charCodeAt(++e.position)) : r = !1;
  }
  ee(e, "unexpected end of the stream within a flow collection");
}
function BT(e, t) {
  var r, n, i = qs, a = !1, o = !1, s = t, u = 0, f = !1, l, m;
  if (m = e.input.charCodeAt(e.position), m === 124)
    n = !1;
  else if (m === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; m !== 0; )
    if (m = e.input.charCodeAt(++e.position), m === 43 || m === 45)
      qs === i ? i = m === 43 ? ld : CT : ee(e, "repeat of a chomping mode identifier");
    else if ((l = kT(m)) >= 0)
      l === 0 ? ee(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? ee(e, "repeat of an indentation width identifier") : (s = t + l - 1, o = !0);
    else
      break;
  if (Fr(m)) {
    do
      m = e.input.charCodeAt(++e.position);
    while (Fr(m));
    if (m === 35)
      do
        m = e.input.charCodeAt(++e.position);
      while (!Lt(m) && m !== 0);
  }
  for (; m !== 0; ) {
    for (bu(e), e.lineIndent = 0, m = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && m === 32; )
      e.lineIndent++, m = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), Lt(m)) {
      u++;
      continue;
    }
    if (e.lineIndent < s) {
      i === ld ? e.result += Ir.repeat(`
`, a ? 1 + u : u) : i === qs && a && (e.result += `
`);
      break;
    }
    for (n ? Fr(m) ? (f = !0, e.result += Ir.repeat(`
`, a ? 1 + u : u)) : f ? (f = !1, e.result += Ir.repeat(`
`, u + 1)) : u === 0 ? a && (e.result += " ") : e.result += Ir.repeat(`
`, u) : e.result += Ir.repeat(`
`, a ? 1 + u : u), a = !0, o = !0, u = 0, r = e.position; !Lt(m) && m !== 0; )
      m = e.input.charCodeAt(++e.position);
    fr(e, r, e.position, !1);
  }
  return !0;
}
function hd(e, t) {
  var r, n = e.tag, i = e.anchor, a = [], o, s = !1, u;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), u = e.input.charCodeAt(e.position); u !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, ee(e, "tab characters must not be used in indentation")), !(u !== 45 || (o = e.input.charCodeAt(e.position + 1), !nt(o)))); ) {
    if (s = !0, e.position++, Ce(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), u = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Cn(e, t, xm, !1, !0), a.push(e.result), Ce(e, !0, -1), u = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && u !== 0)
      ee(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function MT(e, t, r) {
  var n, i, a, o, s, u, f = e.tag, l = e.anchor, m = {}, d = /* @__PURE__ */ Object.create(null), p = null, _ = null, g = null, b = !1, v = !1, y;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = m), y = e.input.charCodeAt(e.position); y !== 0; ) {
    if (!b && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, ee(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), a = e.line, (y === 63 || y === 58) && nt(n))
      y === 63 ? (b && (dn(e, m, d, p, _, null, o, s, u), p = _ = g = null), v = !0, b = !0, i = !0) : b ? (b = !1, i = !0) : ee(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = n;
    else {
      if (o = e.line, s = e.lineStart, u = e.position, !Cn(e, r, Cm, !1, !0))
        break;
      if (e.line === a) {
        for (y = e.input.charCodeAt(e.position); Fr(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), nt(y) || ee(e, "a whitespace character is expected after the key-value separator within a block mapping"), b && (dn(e, m, d, p, _, null, o, s, u), p = _ = g = null), v = !0, b = !1, i = !1, p = e.tag, _ = e.result;
        else if (v)
          ee(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (v)
        ee(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === a || e.lineIndent > t) && (b && (o = e.line, s = e.lineStart, u = e.position), Cn(e, t, io, !0, i) && (b ? _ = e.result : g = e.result), b || (dn(e, m, d, p, _, g, o, s, u), p = _ = g = null), Ce(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === a || e.lineIndent > t) && y !== 0)
      ee(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return b && dn(e, m, d, p, _, null, o, s, u), v && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = m), v;
}
function jT(e) {
  var t, r = !1, n = !1, i, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && ee(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (r = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : ee(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !nt(o); )
      o === 33 && (n ? ee(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Rm.test(i) || ee(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), OT.test(a) && ee(e, "tag suffix cannot contain flow indicator characters");
  }
  a && !Om.test(a) && ee(e, "tag name cannot contain such characters: " + a);
  try {
    a = decodeURIComponent(a);
  } catch {
    ee(e, "tag name is malformed: " + a);
  }
  return r ? e.tag = a : pr.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : ee(e, 'undeclared tag handle "' + i + '"'), !0;
}
function HT(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && ee(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !nt(r) && !fn(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && ee(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function zT(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !nt(n) && !fn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && ee(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), pr.call(e.anchorMap, r) || ee(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ce(e, !0, -1), !0;
}
function Cn(e, t, r, n, i) {
  var a, o, s, u = 1, f = !1, l = !1, m, d, p, _, g, b;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = o = s = io === r || xm === r, n && Ce(e, !0, -1) && (f = !0, e.lineIndent > t ? u = 1 : e.lineIndent === t ? u = 0 : e.lineIndent < t && (u = -1)), u === 1)
    for (; jT(e) || HT(e); )
      Ce(e, !0, -1) ? (f = !0, s = a, e.lineIndent > t ? u = 1 : e.lineIndent === t ? u = 0 : e.lineIndent < t && (u = -1)) : s = !1;
  if (s && (s = f || i), (u === 1 || io === r) && (no === r || Cm === r ? g = t : g = t + 1, b = e.position - e.lineStart, u === 1 ? s && (hd(e, b) || MT(e, b, g)) || UT(e, g) ? l = !0 : (o && BT(e, g) || FT(e, g) || LT(e, g) ? l = !0 : zT(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && ee(e, "alias node should not have any properties")) : PT(e, g, no === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : u === 0 && (l = s && hd(e, b))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && ee(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), m = 0, d = e.implicitTypes.length; m < d; m += 1)
      if (_ = e.implicitTypes[m], _.resolve(e.result)) {
        e.result = _.construct(e.result), e.tag = _.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (pr.call(e.typeMap[e.kind || "fallback"], e.tag))
      _ = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (_ = null, p = e.typeMap.multi[e.kind || "fallback"], m = 0, d = p.length; m < d; m += 1)
        if (e.tag.slice(0, p[m].tag.length) === p[m].tag) {
          _ = p[m];
          break;
        }
    _ || ee(e, "unknown tag !<" + e.tag + ">"), e.result !== null && _.kind !== e.kind && ee(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + _.kind + '", not "' + e.kind + '"'), _.resolve(e.result, e.tag) ? (e.result = _.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ee(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function qT(e) {
  var t = e.position, r, n, i, a = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (o = e.input.charCodeAt(e.position)) !== 0 && (Ce(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (a = !0, o = e.input.charCodeAt(++e.position), r = e.position; o !== 0 && !nt(o); )
      o = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && ee(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; Fr(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !Lt(o));
        break;
      }
      if (Lt(o)) break;
      for (r = e.position; o !== 0 && !nt(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    o !== 0 && bu(e), pr.call(fd, n) ? fd[n](e, n, i) : ao(e, 'unknown document directive "' + n + '"');
  }
  if (Ce(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ce(e, !0, -1)) : a && ee(e, "directives end mark is expected"), Cn(e, e.lineIndent - 1, io, !1, !0), Ce(e, !0, -1), e.checkLineBreaks && RT.test(e.input.slice(t, e.position)) && ao(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Io(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ce(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    ee(e, "end of the stream or a document separator is expected");
  else
    return;
}
function Dm(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new NT(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, ee(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    qT(r);
  return r.documents;
}
function GT(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = Dm(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, a = n.length; i < a; i += 1)
    t(n[i]);
}
function WT(e, t) {
  var r = Dm(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Am("expected a single document in the stream, but found more");
  }
}
yu.loadAll = GT;
yu.load = WT;
var Nm = {}, $o = Ct, Vi = Wi, VT = Eu, Pm = Object.prototype.toString, Fm = Object.prototype.hasOwnProperty, Tu = 65279, YT = 9, Si = 10, ZT = 13, XT = 32, KT = 33, JT = 34, $l = 35, QT = 37, eA = 38, tA = 39, rA = 42, Lm = 44, nA = 45, oo = 58, iA = 61, aA = 62, oA = 63, sA = 64, Um = 91, Bm = 93, lA = 96, Mm = 123, uA = 124, jm = 125, je = {};
je[0] = "\\0";
je[7] = "\\a";
je[8] = "\\b";
je[9] = "\\t";
je[10] = "\\n";
je[11] = "\\v";
je[12] = "\\f";
je[13] = "\\r";
je[27] = "\\e";
je[34] = '\\"';
je[92] = "\\\\";
je[133] = "\\N";
je[160] = "\\_";
je[8232] = "\\L";
je[8233] = "\\P";
var cA = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], fA = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function dA(e, t) {
  var r, n, i, a, o, s, u;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, a = n.length; i < a; i += 1)
    o = n[i], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), u = e.compiledTypeMap.fallback[o], u && Fm.call(u.styleAliases, s) && (s = u.styleAliases[s]), r[o] = s;
  return r;
}
function hA(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Vi("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + $o.repeat("0", n - t.length) + t;
}
var pA = 1, Ti = 2;
function mA(e) {
  this.schema = e.schema || VT, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = $o.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = dA(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ti : pA, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function pd(e, t) {
  for (var r = $o.repeat(" ", t), n = 0, i = -1, a = "", o, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (o = e.slice(n), n = s) : (o = e.slice(n, i + 1), n = i + 1), o.length && o !== `
` && (a += r), a += o;
  return a;
}
function kl(e, t) {
  return `
` + $o.repeat(" ", e.indent * t);
}
function gA(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function so(e) {
  return e === XT || e === YT;
}
function Ai(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Tu || 65536 <= e && e <= 1114111;
}
function md(e) {
  return Ai(e) && e !== Tu && e !== ZT && e !== Si;
}
function gd(e, t, r) {
  var n = md(e), i = n && !so(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Lm && e !== Um && e !== Bm && e !== Mm && e !== jm) && e !== $l && !(t === oo && !i) || md(t) && !so(t) && e === $l || t === oo && i
  );
}
function vA(e) {
  return Ai(e) && e !== Tu && !so(e) && e !== nA && e !== oA && e !== oo && e !== Lm && e !== Um && e !== Bm && e !== Mm && e !== jm && e !== $l && e !== eA && e !== rA && e !== KT && e !== uA && e !== iA && e !== aA && e !== tA && e !== JT && e !== QT && e !== sA && e !== lA;
}
function _A(e) {
  return !so(e) && e !== oo;
}
function Jn(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Hm(e) {
  var t = /^\n* /;
  return t.test(e);
}
var zm = 1, Dl = 2, qm = 3, Gm = 4, sn = 5;
function yA(e, t, r, n, i, a, o, s) {
  var u, f = 0, l = null, m = !1, d = !1, p = n !== -1, _ = -1, g = vA(Jn(e, 0)) && _A(Jn(e, e.length - 1));
  if (t || o)
    for (u = 0; u < e.length; f >= 65536 ? u += 2 : u++) {
      if (f = Jn(e, u), !Ai(f))
        return sn;
      g = g && gd(f, l, s), l = f;
    }
  else {
    for (u = 0; u < e.length; f >= 65536 ? u += 2 : u++) {
      if (f = Jn(e, u), f === Si)
        m = !0, p && (d = d || // Foldable line = too long, and not more-indented.
        u - _ - 1 > n && e[_ + 1] !== " ", _ = u);
      else if (!Ai(f))
        return sn;
      g = g && gd(f, l, s), l = f;
    }
    d = d || p && u - _ - 1 > n && e[_ + 1] !== " ";
  }
  return !m && !d ? g && !o && !i(e) ? zm : a === Ti ? sn : Dl : r > 9 && Hm(e) ? sn : o ? a === Ti ? sn : Dl : d ? Gm : qm;
}
function wA(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ti ? '""' : "''";
    if (!e.noCompatMode && (cA.indexOf(t) !== -1 || fA.test(t)))
      return e.quotingType === Ti ? '"' + t + '"' : "'" + t + "'";
    var a = e.indent * Math.max(1, r), o = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function u(f) {
      return gA(e, f);
    }
    switch (yA(
      t,
      s,
      e.indent,
      o,
      u,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case zm:
        return t;
      case Dl:
        return "'" + t.replace(/'/g, "''") + "'";
      case qm:
        return "|" + vd(t, e.indent) + _d(pd(t, a));
      case Gm:
        return ">" + vd(t, e.indent) + _d(pd(EA(t, o), a));
      case sn:
        return '"' + bA(t) + '"';
      default:
        throw new Vi("impossible error: invalid scalar style");
    }
  }();
}
function vd(e, t) {
  var r = Hm(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : n ? "" : "-";
  return r + a + `
`;
}
function _d(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function EA(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, yd(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", a, o; o = r.exec(e); ) {
    var s = o[1], u = o[2];
    a = u[0] === " ", n += s + (!i && !a && u !== "" ? `
` : "") + yd(u, t), i = a;
  }
  return n;
}
function yd(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, a, o = 0, s = 0, u = ""; n = r.exec(e); )
    s = n.index, s - i > t && (a = o > i ? o : s, u += `
` + e.slice(i, a), i = a + 1), o = s;
  return u += `
`, e.length - i > t && o > i ? u += e.slice(i, o) + `
` + e.slice(o + 1) : u += e.slice(i), u.slice(1);
}
function bA(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Jn(e, i), n = je[r], !n && Ai(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || hA(r);
  return t;
}
function SA(e, t, r) {
  var n = "", i = e.tag, a, o, s;
  for (a = 0, o = r.length; a < o; a += 1)
    s = r[a], e.replacer && (s = e.replacer.call(r, String(a), s)), (Vt(e, t, s, !1, !1) || typeof s > "u" && Vt(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function wd(e, t, r, n) {
  var i = "", a = e.tag, o, s, u;
  for (o = 0, s = r.length; o < s; o += 1)
    u = r[o], e.replacer && (u = e.replacer.call(r, String(o), u)), (Vt(e, t + 1, u, !0, !0, !1, !0) || typeof u > "u" && Vt(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += kl(e, t)), e.dump && Si === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function TA(e, t, r) {
  var n = "", i = e.tag, a = Object.keys(r), o, s, u, f, l;
  for (o = 0, s = a.length; o < s; o += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), u = a[o], f = r[u], e.replacer && (f = e.replacer.call(r, u, f)), Vt(e, t, u, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Vt(e, t, f, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function AA(e, t, r, n) {
  var i = "", a = e.tag, o = Object.keys(r), s, u, f, l, m, d;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Vi("sortKeys must be a boolean or a function");
  for (s = 0, u = o.length; s < u; s += 1)
    d = "", (!n || i !== "") && (d += kl(e, t)), f = o[s], l = r[f], e.replacer && (l = e.replacer.call(r, f, l)), Vt(e, t + 1, f, !0, !0, !0) && (m = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, m && (e.dump && Si === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, m && (d += kl(e, t)), Vt(e, t + 1, l, !0, m) && (e.dump && Si === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = a, e.dump = i || "{}";
}
function Ed(e, t, r) {
  var n, i, a, o, s, u;
  for (i = r ? e.explicitTypes : e.implicitTypes, a = 0, o = i.length; a < o; a += 1)
    if (s = i[a], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (u = e.styleMap[s.tag] || s.defaultStyle, Pm.call(s.represent) === "[object Function]")
          n = s.represent(t, u);
        else if (Fm.call(s.represent, u))
          n = s.represent[u](t, u);
        else
          throw new Vi("!<" + s.tag + '> tag resolver accepts not "' + u + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Vt(e, t, r, n, i, a, o) {
  e.tag = null, e.dump = r, Ed(e, r, !1) || Ed(e, r, !0);
  var s = Pm.call(e.dump), u = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = s === "[object Object]" || s === "[object Array]", m, d;
  if (l && (m = e.duplicates.indexOf(r), d = m !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[m])
    e.dump = "*ref_" + m;
  else {
    if (l && d && !e.usedDuplicates[m] && (e.usedDuplicates[m] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (AA(e, t, e.dump, i), d && (e.dump = "&ref_" + m + e.dump)) : (TA(e, t, e.dump), d && (e.dump = "&ref_" + m + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !o && t > 0 ? wd(e, t - 1, e.dump, i) : wd(e, t, e.dump, i), d && (e.dump = "&ref_" + m + e.dump)) : (SA(e, t, e.dump), d && (e.dump = "&ref_" + m + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && wA(e, e.dump, t, a, u);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Vi("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function CA(e, t) {
  var r = [], n = [], i, a;
  for (Nl(e, r, n), i = 0, a = n.length; i < a; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(a);
}
function Nl(e, t, r) {
  var n, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        Nl(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, a = n.length; i < a; i += 1)
        Nl(e[n[i]], t, r);
}
function xA(e, t) {
  t = t || {};
  var r = new mA(t);
  r.noRefs || CA(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Vt(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Nm.dump = xA;
var Wm = yu, RA = Nm;
function Au(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ue.Type = Ke;
Ue.Schema = am;
Ue.FAILSAFE_SCHEMA = um;
Ue.JSON_SCHEMA = mm;
Ue.CORE_SCHEMA = gm;
Ue.DEFAULT_SCHEMA = Eu;
Ue.load = Wm.load;
Ue.loadAll = Wm.loadAll;
Ue.dump = RA.dump;
Ue.YAMLException = Wi;
Ue.types = {
  binary: Em,
  float: pm,
  map: lm,
  null: cm,
  pairs: Sm,
  set: Tm,
  timestamp: ym,
  bool: fm,
  int: dm,
  merge: wm,
  omap: bm,
  seq: sm,
  str: om
};
Ue.safeLoad = Au("safeLoad", "load");
Ue.safeLoadAll = Au("safeLoadAll", "loadAll");
Ue.safeDump = Au("safeDump", "dump");
var ko = {};
Object.defineProperty(ko, "__esModule", { value: !0 });
ko.Lazy = void 0;
class OA {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
ko.Lazy = OA;
var Pl = { exports: {} };
const IA = "2.0.0", Vm = 256, $A = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, kA = 16, DA = Vm - 6, NA = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Do = {
  MAX_LENGTH: Vm,
  MAX_SAFE_COMPONENT_LENGTH: kA,
  MAX_SAFE_BUILD_LENGTH: DA,
  MAX_SAFE_INTEGER: $A,
  RELEASE_TYPES: NA,
  SEMVER_SPEC_VERSION: IA,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const PA = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var No = PA;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Do, a = No;
  t = e.exports = {};
  const o = t.re = [], s = t.safeRe = [], u = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let m = 0;
  const d = "[a-zA-Z0-9-]", p = [
    ["\\s", 1],
    ["\\d", i],
    [d, n]
  ], _ = (b) => {
    for (const [v, y] of p)
      b = b.split(`${v}*`).join(`${v}{0,${y}}`).split(`${v}+`).join(`${v}{1,${y}}`);
    return b;
  }, g = (b, v, y) => {
    const A = _(v), R = m++;
    a(b, R, v), l[b] = R, u[R] = v, f[R] = A, o[R] = new RegExp(v, y ? "g" : void 0), s[R] = new RegExp(A, y ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), g("MAINVERSION", `(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})\\.(${u[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})\\.(${u[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${u[l.NONNUMERICIDENTIFIER]}|${u[l.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${u[l.NONNUMERICIDENTIFIER]}|${u[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${u[l.PRERELEASEIDENTIFIER]}(?:\\.${u[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${u[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${d}+`), g("BUILD", `(?:\\+(${u[l.BUILDIDENTIFIER]}(?:\\.${u[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${u[l.MAINVERSION]}${u[l.PRERELEASE]}?${u[l.BUILD]}?`), g("FULL", `^${u[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${u[l.MAINVERSIONLOOSE]}${u[l.PRERELEASELOOSE]}?${u[l.BUILD]}?`), g("LOOSE", `^${u[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${u[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${u[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:\\.(${u[l.XRANGEIDENTIFIER]})(?:${u[l.PRERELEASE]})?${u[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[l.XRANGEIDENTIFIERLOOSE]})(?:${u[l.PRERELEASELOOSE]})?${u[l.BUILD]}?)?)?`), g("XRANGE", `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${u[l.GTLT]}\\s*${u[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${u[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", u[l.COERCEPLAIN] + `(?:${u[l.PRERELEASE]})?(?:${u[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", u[l.COERCE], !0), g("COERCERTLFULL", u[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${u[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${u[l.LONETILDE]}${u[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${u[l.LONETILDE]}${u[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${u[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${u[l.LONECARET]}${u[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${u[l.LONECARET]}${u[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${u[l.GTLT]}\\s*(${u[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${u[l.GTLT]}\\s*(${u[l.LOOSEPLAIN]}|${u[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${u[l.XRANGEPLAIN]})\\s+-\\s+(${u[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${u[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Pl, Pl.exports);
var Yi = Pl.exports;
const FA = Object.freeze({ loose: !0 }), LA = Object.freeze({}), UA = (e) => e ? typeof e != "object" ? FA : e : LA;
var Cu = UA;
const bd = /^[0-9]+$/, Ym = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const r = bd.test(e), n = bd.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, BA = (e, t) => Ym(t, e);
var Zm = {
  compareIdentifiers: Ym,
  rcompareIdentifiers: BA
};
const Ra = No, { MAX_LENGTH: Sd, MAX_SAFE_INTEGER: Oa } = Do, { safeRe: Ia, t: $a } = Yi, MA = Cu, { compareIdentifiers: Gs } = Zm;
let jA = class Dt {
  constructor(t, r) {
    if (r = MA(r), t instanceof Dt) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Sd)
      throw new TypeError(
        `version is longer than ${Sd} characters`
      );
    Ra("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Ia[$a.LOOSE] : Ia[$a.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Oa || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Oa || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Oa || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const a = +i;
        if (a >= 0 && a < Oa)
          return a;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Ra("SemVer.compare", this.version, this.options, t), !(t instanceof Dt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Dt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Dt || (t = new Dt(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof Dt || (t = new Dt(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (Ra("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Gs(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof Dt || (t = new Dt(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (Ra("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return Gs(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = `-${r}`.match(this.options.loose ? Ia[$a.PRERELEASELOOSE] : Ia[$a.PRERELEASE]);
        if (!i || i[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let a = [r, i];
          n === !1 && (a = [r]), Gs(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Je = jA;
const Td = Je, HA = (e, t, r = !1) => {
  if (e instanceof Td)
    return e;
  try {
    return new Td(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Un = HA;
const zA = Un, qA = (e, t) => {
  const r = zA(e, t);
  return r ? r.version : null;
};
var GA = qA;
const WA = Un, VA = (e, t) => {
  const r = WA(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var YA = VA;
const Ad = Je, ZA = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Ad(
      e instanceof Ad ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var XA = ZA;
const Cd = Un, KA = (e, t) => {
  const r = Cd(e, null, !0), n = Cd(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const a = i > 0, o = a ? r : n, s = a ? n : r, u = !!o.prerelease.length;
  if (!!s.prerelease.length && !u) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(o) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const l = u ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var JA = KA;
const QA = Je, eC = (e, t) => new QA(e, t).major;
var tC = eC;
const rC = Je, nC = (e, t) => new rC(e, t).minor;
var iC = nC;
const aC = Je, oC = (e, t) => new aC(e, t).patch;
var sC = oC;
const lC = Un, uC = (e, t) => {
  const r = lC(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var cC = uC;
const xd = Je, fC = (e, t, r) => new xd(e, r).compare(new xd(t, r));
var xt = fC;
const dC = xt, hC = (e, t, r) => dC(t, e, r);
var pC = hC;
const mC = xt, gC = (e, t) => mC(e, t, !0);
var vC = gC;
const Rd = Je, _C = (e, t, r) => {
  const n = new Rd(e, r), i = new Rd(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var xu = _C;
const yC = xu, wC = (e, t) => e.sort((r, n) => yC(r, n, t));
var EC = wC;
const bC = xu, SC = (e, t) => e.sort((r, n) => bC(n, r, t));
var TC = SC;
const AC = xt, CC = (e, t, r) => AC(e, t, r) > 0;
var Po = CC;
const xC = xt, RC = (e, t, r) => xC(e, t, r) < 0;
var Ru = RC;
const OC = xt, IC = (e, t, r) => OC(e, t, r) === 0;
var Xm = IC;
const $C = xt, kC = (e, t, r) => $C(e, t, r) !== 0;
var Km = kC;
const DC = xt, NC = (e, t, r) => DC(e, t, r) >= 0;
var Ou = NC;
const PC = xt, FC = (e, t, r) => PC(e, t, r) <= 0;
var Iu = FC;
const LC = Xm, UC = Km, BC = Po, MC = Ou, jC = Ru, HC = Iu, zC = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return LC(e, r, n);
    case "!=":
      return UC(e, r, n);
    case ">":
      return BC(e, r, n);
    case ">=":
      return MC(e, r, n);
    case "<":
      return jC(e, r, n);
    case "<=":
      return HC(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Jm = zC;
const qC = Je, GC = Un, { safeRe: ka, t: Da } = Yi, WC = (e, t) => {
  if (e instanceof qC)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? ka[Da.COERCEFULL] : ka[Da.COERCE]);
  else {
    const u = t.includePrerelease ? ka[Da.COERCERTLFULL] : ka[Da.COERCERTL];
    let f;
    for (; (f = u.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), u.lastIndex = f.index + f[1].length + f[2].length;
    u.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", a = r[4] || "0", o = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return GC(`${n}.${i}.${a}${o}${s}`, t);
};
var VC = WC;
class YC {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var ZC = YC, Ws, Od;
function Rt() {
  if (Od) return Ws;
  Od = 1;
  const e = /\s+/g;
  class t {
    constructor(P, M) {
      if (M = i(M), P instanceof t)
        return P.loose === !!M.loose && P.includePrerelease === !!M.includePrerelease ? P : new t(P.raw, M);
      if (P instanceof a)
        return this.raw = P.value, this.set = [[P]], this.formatted = void 0, this;
      if (this.options = M, this.loose = !!M.loose, this.includePrerelease = !!M.includePrerelease, this.raw = P.trim().replace(e, " "), this.set = this.raw.split("||").map((S) => this.parseRange(S.trim())).filter((S) => S.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const S = this.set[0];
        if (this.set = this.set.filter((C) => !g(C[0])), this.set.length === 0)
          this.set = [S];
        else if (this.set.length > 1) {
          for (const C of this.set)
            if (C.length === 1 && b(C[0])) {
              this.set = [C];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let P = 0; P < this.set.length; P++) {
          P > 0 && (this.formatted += "||");
          const M = this.set[P];
          for (let S = 0; S < M.length; S++)
            S > 0 && (this.formatted += " "), this.formatted += M[S].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(P) {
      const S = ((this.options.includePrerelease && p) | (this.options.loose && _)) + ":" + P, C = n.get(S);
      if (C)
        return C;
      const I = this.options.loose, U = I ? u[f.HYPHENRANGELOOSE] : u[f.HYPHENRANGE];
      P = P.replace(U, Y(this.options.includePrerelease)), o("hyphen replace", P), P = P.replace(u[f.COMPARATORTRIM], l), o("comparator trim", P), P = P.replace(u[f.TILDETRIM], m), o("tilde trim", P), P = P.replace(u[f.CARETTRIM], d), o("caret trim", P);
      let W = P.split(" ").map((J) => y(J, this.options)).join(" ").split(/\s+/).map((J) => N(J, this.options));
      I && (W = W.filter((J) => (o("loose invalid filter", J, this.options), !!J.match(u[f.COMPARATORLOOSE])))), o("range list", W);
      const V = /* @__PURE__ */ new Map(), te = W.map((J) => new a(J, this.options));
      for (const J of te) {
        if (g(J))
          return [J];
        V.set(J.value, J);
      }
      V.size > 1 && V.has("") && V.delete("");
      const ae = [...V.values()];
      return n.set(S, ae), ae;
    }
    intersects(P, M) {
      if (!(P instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((S) => v(S, M) && P.set.some((C) => v(C, M) && S.every((I) => C.every((U) => I.intersects(U, M)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(P) {
      if (!P)
        return !1;
      if (typeof P == "string")
        try {
          P = new s(P, this.options);
        } catch {
          return !1;
        }
      for (let M = 0; M < this.set.length; M++)
        if (re(this.set[M], P, this.options))
          return !0;
      return !1;
    }
  }
  Ws = t;
  const r = ZC, n = new r(), i = Cu, a = Fo(), o = No, s = Je, {
    safeRe: u,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: m,
    caretTrimReplace: d
  } = Yi, { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: _ } = Do, g = (D) => D.value === "<0.0.0-0", b = (D) => D.value === "", v = (D, P) => {
    let M = !0;
    const S = D.slice();
    let C = S.pop();
    for (; M && S.length; )
      M = S.every((I) => C.intersects(I, P)), C = S.pop();
    return M;
  }, y = (D, P) => (D = D.replace(u[f.BUILD], ""), o("comp", D, P), D = j(D, P), o("caret", D), D = R(D, P), o("tildes", D), D = z(D, P), o("xrange", D), D = q(D, P), o("stars", D), D), A = (D) => !D || D.toLowerCase() === "x" || D === "*", R = (D, P) => D.trim().split(/\s+/).map((M) => $(M, P)).join(" "), $ = (D, P) => {
    const M = P.loose ? u[f.TILDELOOSE] : u[f.TILDE];
    return D.replace(M, (S, C, I, U, W) => {
      o("tilde", D, S, C, I, U, W);
      let V;
      return A(C) ? V = "" : A(I) ? V = `>=${C}.0.0 <${+C + 1}.0.0-0` : A(U) ? V = `>=${C}.${I}.0 <${C}.${+I + 1}.0-0` : W ? (o("replaceTilde pr", W), V = `>=${C}.${I}.${U}-${W} <${C}.${+I + 1}.0-0`) : V = `>=${C}.${I}.${U} <${C}.${+I + 1}.0-0`, o("tilde return", V), V;
    });
  }, j = (D, P) => D.trim().split(/\s+/).map((M) => B(M, P)).join(" "), B = (D, P) => {
    o("caret", D, P);
    const M = P.loose ? u[f.CARETLOOSE] : u[f.CARET], S = P.includePrerelease ? "-0" : "";
    return D.replace(M, (C, I, U, W, V) => {
      o("caret", D, C, I, U, W, V);
      let te;
      return A(I) ? te = "" : A(U) ? te = `>=${I}.0.0${S} <${+I + 1}.0.0-0` : A(W) ? I === "0" ? te = `>=${I}.${U}.0${S} <${I}.${+U + 1}.0-0` : te = `>=${I}.${U}.0${S} <${+I + 1}.0.0-0` : V ? (o("replaceCaret pr", V), I === "0" ? U === "0" ? te = `>=${I}.${U}.${W}-${V} <${I}.${U}.${+W + 1}-0` : te = `>=${I}.${U}.${W}-${V} <${I}.${+U + 1}.0-0` : te = `>=${I}.${U}.${W}-${V} <${+I + 1}.0.0-0`) : (o("no pr"), I === "0" ? U === "0" ? te = `>=${I}.${U}.${W}${S} <${I}.${U}.${+W + 1}-0` : te = `>=${I}.${U}.${W}${S} <${I}.${+U + 1}.0-0` : te = `>=${I}.${U}.${W} <${+I + 1}.0.0-0`), o("caret return", te), te;
    });
  }, z = (D, P) => (o("replaceXRanges", D, P), D.split(/\s+/).map((M) => E(M, P)).join(" ")), E = (D, P) => {
    D = D.trim();
    const M = P.loose ? u[f.XRANGELOOSE] : u[f.XRANGE];
    return D.replace(M, (S, C, I, U, W, V) => {
      o("xRange", D, S, C, I, U, W, V);
      const te = A(I), ae = te || A(U), J = ae || A(W), fe = J;
      return C === "=" && fe && (C = ""), V = P.includePrerelease ? "-0" : "", te ? C === ">" || C === "<" ? S = "<0.0.0-0" : S = "*" : C && fe ? (ae && (U = 0), W = 0, C === ">" ? (C = ">=", ae ? (I = +I + 1, U = 0, W = 0) : (U = +U + 1, W = 0)) : C === "<=" && (C = "<", ae ? I = +I + 1 : U = +U + 1), C === "<" && (V = "-0"), S = `${C + I}.${U}.${W}${V}`) : ae ? S = `>=${I}.0.0${V} <${+I + 1}.0.0-0` : J && (S = `>=${I}.${U}.0${V} <${I}.${+U + 1}.0-0`), o("xRange return", S), S;
    });
  }, q = (D, P) => (o("replaceStars", D, P), D.trim().replace(u[f.STAR], "")), N = (D, P) => (o("replaceGTE0", D, P), D.trim().replace(u[P.includePrerelease ? f.GTE0PRE : f.GTE0], "")), Y = (D) => (P, M, S, C, I, U, W, V, te, ae, J, fe) => (A(S) ? M = "" : A(C) ? M = `>=${S}.0.0${D ? "-0" : ""}` : A(I) ? M = `>=${S}.${C}.0${D ? "-0" : ""}` : U ? M = `>=${M}` : M = `>=${M}${D ? "-0" : ""}`, A(te) ? V = "" : A(ae) ? V = `<${+te + 1}.0.0-0` : A(J) ? V = `<${te}.${+ae + 1}.0-0` : fe ? V = `<=${te}.${ae}.${J}-${fe}` : D ? V = `<${te}.${ae}.${+J + 1}-0` : V = `<=${V}`, `${M} ${V}`.trim()), re = (D, P, M) => {
    for (let S = 0; S < D.length; S++)
      if (!D[S].test(P))
        return !1;
    if (P.prerelease.length && !M.includePrerelease) {
      for (let S = 0; S < D.length; S++)
        if (o(D[S].semver), D[S].semver !== a.ANY && D[S].semver.prerelease.length > 0) {
          const C = D[S].semver;
          if (C.major === P.major && C.minor === P.minor && C.patch === P.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Ws;
}
var Vs, Id;
function Fo() {
  if (Id) return Vs;
  Id = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, m) {
      if (m = r(m), l instanceof t) {
        if (l.loose === !!m.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, m), this.options = m, this.loose = !!m.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const m = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], d = l.match(m);
      if (!d)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new s(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, m) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new u(l.value, m).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new u(this.value, m).test(l.semver) : (m = r(m), m.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !m.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, m) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, m) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Vs = t;
  const r = Cu, { safeRe: n, t: i } = Yi, a = Jm, o = No, s = Je, u = Rt();
  return Vs;
}
const XC = Rt(), KC = (e, t, r) => {
  try {
    t = new XC(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Lo = KC;
const JC = Rt(), QC = (e, t) => new JC(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var ex = QC;
const tx = Je, rx = Rt(), nx = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new rx(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || i.compare(o) === -1) && (n = o, i = new tx(n, r));
  }), n;
};
var ix = nx;
const ax = Je, ox = Rt(), sx = (e, t, r) => {
  let n = null, i = null, a = null;
  try {
    a = new ox(t, r);
  } catch {
    return null;
  }
  return e.forEach((o) => {
    a.test(o) && (!n || i.compare(o) === 1) && (n = o, i = new ax(n, r));
  }), n;
};
var lx = sx;
const Ys = Je, ux = Rt(), $d = Po, cx = (e, t) => {
  e = new ux(e, t);
  let r = new Ys("0.0.0");
  if (e.test(r) || (r = new Ys("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let a = null;
    i.forEach((o) => {
      const s = new Ys(o.semver.version);
      switch (o.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!a || $d(s, a)) && (a = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || $d(r, a)) && (r = a);
  }
  return r && e.test(r) ? r : null;
};
var fx = cx;
const dx = Rt(), hx = (e, t) => {
  try {
    return new dx(e, t).range || "*";
  } catch {
    return null;
  }
};
var px = hx;
const mx = Je, Qm = Fo(), { ANY: gx } = Qm, vx = Rt(), _x = Lo, kd = Po, Dd = Ru, yx = Iu, wx = Ou, Ex = (e, t, r, n) => {
  e = new mx(e, n), t = new vx(t, n);
  let i, a, o, s, u;
  switch (r) {
    case ">":
      i = kd, a = yx, o = Dd, s = ">", u = ">=";
      break;
    case "<":
      i = Dd, a = wx, o = kd, s = "<", u = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (_x(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let m = null, d = null;
    if (l.forEach((p) => {
      p.semver === gx && (p = new Qm(">=0.0.0")), m = m || p, d = d || p, i(p.semver, m.semver, n) ? m = p : o(p.semver, d.semver, n) && (d = p);
    }), m.operator === s || m.operator === u || (!d.operator || d.operator === s) && a(e, d.semver))
      return !1;
    if (d.operator === u && o(e, d.semver))
      return !1;
  }
  return !0;
};
var $u = Ex;
const bx = $u, Sx = (e, t, r) => bx(e, t, ">", r);
var Tx = Sx;
const Ax = $u, Cx = (e, t, r) => Ax(e, t, "<", r);
var xx = Cx;
const Nd = Rt(), Rx = (e, t, r) => (e = new Nd(e, r), t = new Nd(t, r), e.intersects(t, r));
var Ox = Rx;
const Ix = Lo, $x = xt;
var kx = (e, t, r) => {
  const n = [];
  let i = null, a = null;
  const o = e.sort((l, m) => $x(l, m, r));
  for (const l of o)
    Ix(l, t, r) ? (a = l, i || (i = l)) : (a && n.push([i, a]), a = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [l, m] of n)
    l === m ? s.push(l) : !m && l === o[0] ? s.push("*") : m ? l === o[0] ? s.push(`<=${m}`) : s.push(`${l} - ${m}`) : s.push(`>=${l}`);
  const u = s.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return u.length < f.length ? u : t;
};
const Pd = Rt(), ku = Fo(), { ANY: Zs } = ku, Vn = Lo, Du = xt, Dx = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Pd(e, r), t = new Pd(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const a of t.set) {
      const o = Px(i, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Nx = [new ku(">=0.0.0-0")], Fd = [new ku(">=0.0.0")], Px = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Zs) {
    if (t.length === 1 && t[0].semver === Zs)
      return !0;
    r.includePrerelease ? e = Nx : e = Fd;
  }
  if (t.length === 1 && t[0].semver === Zs) {
    if (r.includePrerelease)
      return !0;
    t = Fd;
  }
  const n = /* @__PURE__ */ new Set();
  let i, a;
  for (const p of e)
    p.operator === ">" || p.operator === ">=" ? i = Ld(i, p, r) : p.operator === "<" || p.operator === "<=" ? a = Ud(a, p, r) : n.add(p.semver);
  if (n.size > 1)
    return null;
  let o;
  if (i && a) {
    if (o = Du(i.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (i.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const p of n) {
    if (i && !Vn(p, String(i), r) || a && !Vn(p, String(a), r))
      return null;
    for (const _ of t)
      if (!Vn(p, String(_), r))
        return !1;
    return !0;
  }
  let s, u, f, l, m = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, d = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  m && m.prerelease.length === 1 && a.operator === "<" && m.prerelease[0] === 0 && (m = !1);
  for (const p of t) {
    if (l = l || p.operator === ">" || p.operator === ">=", f = f || p.operator === "<" || p.operator === "<=", i) {
      if (d && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === d.major && p.semver.minor === d.minor && p.semver.patch === d.patch && (d = !1), p.operator === ">" || p.operator === ">=") {
        if (s = Ld(i, p, r), s === p && s !== i)
          return !1;
      } else if (i.operator === ">=" && !Vn(i.semver, String(p), r))
        return !1;
    }
    if (a) {
      if (m && p.semver.prerelease && p.semver.prerelease.length && p.semver.major === m.major && p.semver.minor === m.minor && p.semver.patch === m.patch && (m = !1), p.operator === "<" || p.operator === "<=") {
        if (u = Ud(a, p, r), u === p && u !== a)
          return !1;
      } else if (a.operator === "<=" && !Vn(a.semver, String(p), r))
        return !1;
    }
    if (!p.operator && (a || i) && o !== 0)
      return !1;
  }
  return !(i && f && !a && o !== 0 || a && l && !i && o !== 0 || d || m);
}, Ld = (e, t, r) => {
  if (!e)
    return t;
  const n = Du(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Ud = (e, t, r) => {
  if (!e)
    return t;
  const n = Du(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Fx = Dx;
const Xs = Yi, Bd = Do, Lx = Je, Md = Zm, Ux = Un, Bx = GA, Mx = YA, jx = XA, Hx = JA, zx = tC, qx = iC, Gx = sC, Wx = cC, Vx = xt, Yx = pC, Zx = vC, Xx = xu, Kx = EC, Jx = TC, Qx = Po, eR = Ru, tR = Xm, rR = Km, nR = Ou, iR = Iu, aR = Jm, oR = VC, sR = Fo(), lR = Rt(), uR = Lo, cR = ex, fR = ix, dR = lx, hR = fx, pR = px, mR = $u, gR = Tx, vR = xx, _R = Ox, yR = kx, wR = Fx;
var eg = {
  parse: Ux,
  valid: Bx,
  clean: Mx,
  inc: jx,
  diff: Hx,
  major: zx,
  minor: qx,
  patch: Gx,
  prerelease: Wx,
  compare: Vx,
  rcompare: Yx,
  compareLoose: Zx,
  compareBuild: Xx,
  sort: Kx,
  rsort: Jx,
  gt: Qx,
  lt: eR,
  eq: tR,
  neq: rR,
  gte: nR,
  lte: iR,
  cmp: aR,
  coerce: oR,
  Comparator: sR,
  Range: lR,
  satisfies: uR,
  toComparators: cR,
  maxSatisfying: fR,
  minSatisfying: dR,
  minVersion: hR,
  validRange: pR,
  outside: mR,
  gtr: gR,
  ltr: vR,
  intersects: _R,
  simplifyRange: yR,
  subset: wR,
  SemVer: Lx,
  re: Xs.re,
  src: Xs.src,
  tokens: Xs.t,
  SEMVER_SPEC_VERSION: Bd.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Bd.RELEASE_TYPES,
  compareIdentifiers: Md.compareIdentifiers,
  rcompareIdentifiers: Md.rcompareIdentifiers
}, Zi = {}, lo = { exports: {} };
lo.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, a = 2, o = 9007199254740991, s = "[object Arguments]", u = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", m = "[object Date]", d = "[object Error]", p = "[object Function]", _ = "[object GeneratorFunction]", g = "[object Map]", b = "[object Number]", v = "[object Null]", y = "[object Object]", A = "[object Promise]", R = "[object Proxy]", $ = "[object RegExp]", j = "[object Set]", B = "[object String]", z = "[object Symbol]", E = "[object Undefined]", q = "[object WeakMap]", N = "[object ArrayBuffer]", Y = "[object DataView]", re = "[object Float32Array]", D = "[object Float64Array]", P = "[object Int8Array]", M = "[object Int16Array]", S = "[object Int32Array]", C = "[object Uint8Array]", I = "[object Uint8ClampedArray]", U = "[object Uint16Array]", W = "[object Uint32Array]", V = /[\\^$.*+?()[\]{}|]/g, te = /^\[object .+?Constructor\]$/, ae = /^(?:0|[1-9]\d*)$/, J = {};
  J[re] = J[D] = J[P] = J[M] = J[S] = J[C] = J[I] = J[U] = J[W] = !0, J[s] = J[u] = J[N] = J[l] = J[Y] = J[m] = J[d] = J[p] = J[g] = J[b] = J[y] = J[$] = J[j] = J[B] = J[q] = !1;
  var fe = typeof se == "object" && se && se.Object === Object && se, h = typeof self == "object" && self && self.Object === Object && self, c = fe || h || Function("return this")(), x = t && !t.nodeType && t, T = x && !0 && e && !e.nodeType && e, Z = T && T.exports === x, G = Z && fe.process, K = function() {
    try {
      return G && G.binding && G.binding("util");
    } catch {
    }
  }(), ve = K && K.isTypedArray;
  function ye(w, O) {
    for (var F = -1, X = w == null ? 0 : w.length, ge = 0, ne = []; ++F < X; ) {
      var Se = w[F];
      O(Se, F, w) && (ne[ge++] = Se);
    }
    return ne;
  }
  function Qe(w, O) {
    for (var F = -1, X = O.length, ge = w.length; ++F < X; )
      w[ge + F] = O[F];
    return w;
  }
  function we(w, O) {
    for (var F = -1, X = w == null ? 0 : w.length; ++F < X; )
      if (O(w[F], F, w))
        return !0;
    return !1;
  }
  function le(w, O) {
    for (var F = -1, X = Array(w); ++F < w; )
      X[F] = O(F);
    return X;
  }
  function vt(w) {
    return function(O) {
      return w(O);
    };
  }
  function It(w, O) {
    return w.has(O);
  }
  function ot(w, O) {
    return w == null ? void 0 : w[O];
  }
  function k(w) {
    var O = -1, F = Array(w.size);
    return w.forEach(function(X, ge) {
      F[++O] = [ge, X];
    }), F;
  }
  function L(w, O) {
    return function(F) {
      return w(O(F));
    };
  }
  function H(w) {
    var O = -1, F = Array(w.size);
    return w.forEach(function(X) {
      F[++O] = X;
    }), F;
  }
  var Q = Array.prototype, de = Function.prototype, ce = Object.prototype, et = c["__core-js_shared__"], He = de.toString, st = ce.hasOwnProperty, Qi = function() {
    var w = /[^.]+$/.exec(et && et.keys && et.keys.IE_PROTO || "");
    return w ? "Symbol(src)_1." + w : "";
  }(), Mu = ce.toString, vg = RegExp(
    "^" + He.call(st).replace(V, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ju = Z ? c.Buffer : void 0, ea = c.Symbol, Hu = c.Uint8Array, zu = ce.propertyIsEnumerable, _g = Q.splice, Er = ea ? ea.toStringTag : void 0, qu = Object.getOwnPropertySymbols, yg = ju ? ju.isBuffer : void 0, wg = L(Object.keys, Object), Vo = Kr(c, "DataView"), jn = Kr(c, "Map"), Yo = Kr(c, "Promise"), Zo = Kr(c, "Set"), Xo = Kr(c, "WeakMap"), Hn = Kr(Object, "create"), Eg = Tr(Vo), bg = Tr(jn), Sg = Tr(Yo), Tg = Tr(Zo), Ag = Tr(Xo), Gu = ea ? ea.prototype : void 0, Ko = Gu ? Gu.valueOf : void 0;
  function br(w) {
    var O = -1, F = w == null ? 0 : w.length;
    for (this.clear(); ++O < F; ) {
      var X = w[O];
      this.set(X[0], X[1]);
    }
  }
  function Cg() {
    this.__data__ = Hn ? Hn(null) : {}, this.size = 0;
  }
  function xg(w) {
    var O = this.has(w) && delete this.__data__[w];
    return this.size -= O ? 1 : 0, O;
  }
  function Rg(w) {
    var O = this.__data__;
    if (Hn) {
      var F = O[w];
      return F === n ? void 0 : F;
    }
    return st.call(O, w) ? O[w] : void 0;
  }
  function Og(w) {
    var O = this.__data__;
    return Hn ? O[w] !== void 0 : st.call(O, w);
  }
  function Ig(w, O) {
    var F = this.__data__;
    return this.size += this.has(w) ? 0 : 1, F[w] = Hn && O === void 0 ? n : O, this;
  }
  br.prototype.clear = Cg, br.prototype.delete = xg, br.prototype.get = Rg, br.prototype.has = Og, br.prototype.set = Ig;
  function Mt(w) {
    var O = -1, F = w == null ? 0 : w.length;
    for (this.clear(); ++O < F; ) {
      var X = w[O];
      this.set(X[0], X[1]);
    }
  }
  function $g() {
    this.__data__ = [], this.size = 0;
  }
  function kg(w) {
    var O = this.__data__, F = ra(O, w);
    if (F < 0)
      return !1;
    var X = O.length - 1;
    return F == X ? O.pop() : _g.call(O, F, 1), --this.size, !0;
  }
  function Dg(w) {
    var O = this.__data__, F = ra(O, w);
    return F < 0 ? void 0 : O[F][1];
  }
  function Ng(w) {
    return ra(this.__data__, w) > -1;
  }
  function Pg(w, O) {
    var F = this.__data__, X = ra(F, w);
    return X < 0 ? (++this.size, F.push([w, O])) : F[X][1] = O, this;
  }
  Mt.prototype.clear = $g, Mt.prototype.delete = kg, Mt.prototype.get = Dg, Mt.prototype.has = Ng, Mt.prototype.set = Pg;
  function Sr(w) {
    var O = -1, F = w == null ? 0 : w.length;
    for (this.clear(); ++O < F; ) {
      var X = w[O];
      this.set(X[0], X[1]);
    }
  }
  function Fg() {
    this.size = 0, this.__data__ = {
      hash: new br(),
      map: new (jn || Mt)(),
      string: new br()
    };
  }
  function Lg(w) {
    var O = na(this, w).delete(w);
    return this.size -= O ? 1 : 0, O;
  }
  function Ug(w) {
    return na(this, w).get(w);
  }
  function Bg(w) {
    return na(this, w).has(w);
  }
  function Mg(w, O) {
    var F = na(this, w), X = F.size;
    return F.set(w, O), this.size += F.size == X ? 0 : 1, this;
  }
  Sr.prototype.clear = Fg, Sr.prototype.delete = Lg, Sr.prototype.get = Ug, Sr.prototype.has = Bg, Sr.prototype.set = Mg;
  function ta(w) {
    var O = -1, F = w == null ? 0 : w.length;
    for (this.__data__ = new Sr(); ++O < F; )
      this.add(w[O]);
  }
  function jg(w) {
    return this.__data__.set(w, n), this;
  }
  function Hg(w) {
    return this.__data__.has(w);
  }
  ta.prototype.add = ta.prototype.push = jg, ta.prototype.has = Hg;
  function Zt(w) {
    var O = this.__data__ = new Mt(w);
    this.size = O.size;
  }
  function zg() {
    this.__data__ = new Mt(), this.size = 0;
  }
  function qg(w) {
    var O = this.__data__, F = O.delete(w);
    return this.size = O.size, F;
  }
  function Gg(w) {
    return this.__data__.get(w);
  }
  function Wg(w) {
    return this.__data__.has(w);
  }
  function Vg(w, O) {
    var F = this.__data__;
    if (F instanceof Mt) {
      var X = F.__data__;
      if (!jn || X.length < r - 1)
        return X.push([w, O]), this.size = ++F.size, this;
      F = this.__data__ = new Sr(X);
    }
    return F.set(w, O), this.size = F.size, this;
  }
  Zt.prototype.clear = zg, Zt.prototype.delete = qg, Zt.prototype.get = Gg, Zt.prototype.has = Wg, Zt.prototype.set = Vg;
  function Yg(w, O) {
    var F = ia(w), X = !F && uv(w), ge = !F && !X && Jo(w), ne = !F && !X && !ge && ec(w), Se = F || X || ge || ne, ke = Se ? le(w.length, String) : [], Ne = ke.length;
    for (var Ee in w)
      st.call(w, Ee) && !(Se && // Safari 9 has enumerable `arguments.length` in strict mode.
      (Ee == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ge && (Ee == "offset" || Ee == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ne && (Ee == "buffer" || Ee == "byteLength" || Ee == "byteOffset") || // Skip index properties.
      iv(Ee, Ne))) && ke.push(Ee);
    return ke;
  }
  function ra(w, O) {
    for (var F = w.length; F--; )
      if (Xu(w[F][0], O))
        return F;
    return -1;
  }
  function Zg(w, O, F) {
    var X = O(w);
    return ia(w) ? X : Qe(X, F(w));
  }
  function zn(w) {
    return w == null ? w === void 0 ? E : v : Er && Er in Object(w) ? rv(w) : lv(w);
  }
  function Wu(w) {
    return qn(w) && zn(w) == s;
  }
  function Vu(w, O, F, X, ge) {
    return w === O ? !0 : w == null || O == null || !qn(w) && !qn(O) ? w !== w && O !== O : Xg(w, O, F, X, Vu, ge);
  }
  function Xg(w, O, F, X, ge, ne) {
    var Se = ia(w), ke = ia(O), Ne = Se ? u : Xt(w), Ee = ke ? u : Xt(O);
    Ne = Ne == s ? y : Ne, Ee = Ee == s ? y : Ee;
    var it = Ne == y, _t = Ee == y, Be = Ne == Ee;
    if (Be && Jo(w)) {
      if (!Jo(O))
        return !1;
      Se = !0, it = !1;
    }
    if (Be && !it)
      return ne || (ne = new Zt()), Se || ec(w) ? Yu(w, O, F, X, ge, ne) : ev(w, O, Ne, F, X, ge, ne);
    if (!(F & i)) {
      var lt = it && st.call(w, "__wrapped__"), ut = _t && st.call(O, "__wrapped__");
      if (lt || ut) {
        var Kt = lt ? w.value() : w, jt = ut ? O.value() : O;
        return ne || (ne = new Zt()), ge(Kt, jt, F, X, ne);
      }
    }
    return Be ? (ne || (ne = new Zt()), tv(w, O, F, X, ge, ne)) : !1;
  }
  function Kg(w) {
    if (!Qu(w) || ov(w))
      return !1;
    var O = Ku(w) ? vg : te;
    return O.test(Tr(w));
  }
  function Jg(w) {
    return qn(w) && Ju(w.length) && !!J[zn(w)];
  }
  function Qg(w) {
    if (!sv(w))
      return wg(w);
    var O = [];
    for (var F in Object(w))
      st.call(w, F) && F != "constructor" && O.push(F);
    return O;
  }
  function Yu(w, O, F, X, ge, ne) {
    var Se = F & i, ke = w.length, Ne = O.length;
    if (ke != Ne && !(Se && Ne > ke))
      return !1;
    var Ee = ne.get(w);
    if (Ee && ne.get(O))
      return Ee == O;
    var it = -1, _t = !0, Be = F & a ? new ta() : void 0;
    for (ne.set(w, O), ne.set(O, w); ++it < ke; ) {
      var lt = w[it], ut = O[it];
      if (X)
        var Kt = Se ? X(ut, lt, it, O, w, ne) : X(lt, ut, it, w, O, ne);
      if (Kt !== void 0) {
        if (Kt)
          continue;
        _t = !1;
        break;
      }
      if (Be) {
        if (!we(O, function(jt, Ar) {
          if (!It(Be, Ar) && (lt === jt || ge(lt, jt, F, X, ne)))
            return Be.push(Ar);
        })) {
          _t = !1;
          break;
        }
      } else if (!(lt === ut || ge(lt, ut, F, X, ne))) {
        _t = !1;
        break;
      }
    }
    return ne.delete(w), ne.delete(O), _t;
  }
  function ev(w, O, F, X, ge, ne, Se) {
    switch (F) {
      case Y:
        if (w.byteLength != O.byteLength || w.byteOffset != O.byteOffset)
          return !1;
        w = w.buffer, O = O.buffer;
      case N:
        return !(w.byteLength != O.byteLength || !ne(new Hu(w), new Hu(O)));
      case l:
      case m:
      case b:
        return Xu(+w, +O);
      case d:
        return w.name == O.name && w.message == O.message;
      case $:
      case B:
        return w == O + "";
      case g:
        var ke = k;
      case j:
        var Ne = X & i;
        if (ke || (ke = H), w.size != O.size && !Ne)
          return !1;
        var Ee = Se.get(w);
        if (Ee)
          return Ee == O;
        X |= a, Se.set(w, O);
        var it = Yu(ke(w), ke(O), X, ge, ne, Se);
        return Se.delete(w), it;
      case z:
        if (Ko)
          return Ko.call(w) == Ko.call(O);
    }
    return !1;
  }
  function tv(w, O, F, X, ge, ne) {
    var Se = F & i, ke = Zu(w), Ne = ke.length, Ee = Zu(O), it = Ee.length;
    if (Ne != it && !Se)
      return !1;
    for (var _t = Ne; _t--; ) {
      var Be = ke[_t];
      if (!(Se ? Be in O : st.call(O, Be)))
        return !1;
    }
    var lt = ne.get(w);
    if (lt && ne.get(O))
      return lt == O;
    var ut = !0;
    ne.set(w, O), ne.set(O, w);
    for (var Kt = Se; ++_t < Ne; ) {
      Be = ke[_t];
      var jt = w[Be], Ar = O[Be];
      if (X)
        var tc = Se ? X(Ar, jt, Be, O, w, ne) : X(jt, Ar, Be, w, O, ne);
      if (!(tc === void 0 ? jt === Ar || ge(jt, Ar, F, X, ne) : tc)) {
        ut = !1;
        break;
      }
      Kt || (Kt = Be == "constructor");
    }
    if (ut && !Kt) {
      var aa = w.constructor, oa = O.constructor;
      aa != oa && "constructor" in w && "constructor" in O && !(typeof aa == "function" && aa instanceof aa && typeof oa == "function" && oa instanceof oa) && (ut = !1);
    }
    return ne.delete(w), ne.delete(O), ut;
  }
  function Zu(w) {
    return Zg(w, dv, nv);
  }
  function na(w, O) {
    var F = w.__data__;
    return av(O) ? F[typeof O == "string" ? "string" : "hash"] : F.map;
  }
  function Kr(w, O) {
    var F = ot(w, O);
    return Kg(F) ? F : void 0;
  }
  function rv(w) {
    var O = st.call(w, Er), F = w[Er];
    try {
      w[Er] = void 0;
      var X = !0;
    } catch {
    }
    var ge = Mu.call(w);
    return X && (O ? w[Er] = F : delete w[Er]), ge;
  }
  var nv = qu ? function(w) {
    return w == null ? [] : (w = Object(w), ye(qu(w), function(O) {
      return zu.call(w, O);
    }));
  } : hv, Xt = zn;
  (Vo && Xt(new Vo(new ArrayBuffer(1))) != Y || jn && Xt(new jn()) != g || Yo && Xt(Yo.resolve()) != A || Zo && Xt(new Zo()) != j || Xo && Xt(new Xo()) != q) && (Xt = function(w) {
    var O = zn(w), F = O == y ? w.constructor : void 0, X = F ? Tr(F) : "";
    if (X)
      switch (X) {
        case Eg:
          return Y;
        case bg:
          return g;
        case Sg:
          return A;
        case Tg:
          return j;
        case Ag:
          return q;
      }
    return O;
  });
  function iv(w, O) {
    return O = O ?? o, !!O && (typeof w == "number" || ae.test(w)) && w > -1 && w % 1 == 0 && w < O;
  }
  function av(w) {
    var O = typeof w;
    return O == "string" || O == "number" || O == "symbol" || O == "boolean" ? w !== "__proto__" : w === null;
  }
  function ov(w) {
    return !!Qi && Qi in w;
  }
  function sv(w) {
    var O = w && w.constructor, F = typeof O == "function" && O.prototype || ce;
    return w === F;
  }
  function lv(w) {
    return Mu.call(w);
  }
  function Tr(w) {
    if (w != null) {
      try {
        return He.call(w);
      } catch {
      }
      try {
        return w + "";
      } catch {
      }
    }
    return "";
  }
  function Xu(w, O) {
    return w === O || w !== w && O !== O;
  }
  var uv = Wu(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Wu : function(w) {
    return qn(w) && st.call(w, "callee") && !zu.call(w, "callee");
  }, ia = Array.isArray;
  function cv(w) {
    return w != null && Ju(w.length) && !Ku(w);
  }
  var Jo = yg || pv;
  function fv(w, O) {
    return Vu(w, O);
  }
  function Ku(w) {
    if (!Qu(w))
      return !1;
    var O = zn(w);
    return O == p || O == _ || O == f || O == R;
  }
  function Ju(w) {
    return typeof w == "number" && w > -1 && w % 1 == 0 && w <= o;
  }
  function Qu(w) {
    var O = typeof w;
    return w != null && (O == "object" || O == "function");
  }
  function qn(w) {
    return w != null && typeof w == "object";
  }
  var ec = ve ? vt(ve) : Jg;
  function dv(w) {
    return cv(w) ? Yg(w) : Qg(w);
  }
  function hv() {
    return [];
  }
  function pv() {
    return !1;
  }
  e.exports = fv;
})(lo, lo.exports);
var ER = lo.exports;
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.DownloadedUpdateHelper = void 0;
Zi.createTempUpdateFile = CR;
const bR = ki, SR = pt, jd = ER, Rr = yr, ui = pe;
class TR {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return ui.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return jd(this.versionInfo, r) && jd(this.fileInfo.info, n.info) && await (0, Rr.pathExists)(t) ? t : null;
    const a = await this.getValidCachedUpdateFile(n, i);
    return a === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = a, a);
  }
  async setDownloadedFile(t, r, n, i, a, o) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: a,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, o && await (0, Rr.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Rr.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, Rr.pathExists)(n))
      return null;
    let a;
    try {
      a = await (0, Rr.readJson)(n);
    } catch (f) {
      let l = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${f.message})`), r.info(l), null;
    }
    if (!((a == null ? void 0 : a.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = ui.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, Rr.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const u = await AR(s);
    return t.info.sha512 !== u ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${u}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, s);
  }
  getUpdateInfoFile() {
    return ui.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Zi.DownloadedUpdateHelper = TR;
function AR(e, t = "sha512", r = "base64", n) {
  return new Promise((i, a) => {
    const o = (0, bR.createHash)(t);
    o.on("error", a).setEncoding(r), (0, SR.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", a).on("end", () => {
      o.end(), i(o.read());
    }).pipe(o, { end: !1 });
  });
}
async function CR(e, t, r) {
  let n = 0, i = ui.join(t, e);
  for (let a = 0; a < 3; a++)
    try {
      return await (0, Rr.unlink)(i), i;
    } catch (o) {
      if (o.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${o}`), i = ui.join(t, `${n++}-${e}`);
    }
  return i;
}
var Uo = {}, Nu = {};
Object.defineProperty(Nu, "__esModule", { value: !0 });
Nu.getAppCacheDir = RR;
const Ks = pe, xR = fo;
function RR() {
  const e = (0, xR.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Ks.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Ks.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Ks.join(e, ".cache"), t;
}
Object.defineProperty(Uo, "__esModule", { value: !0 });
Uo.ElectronAppAdapter = void 0;
const Hd = pe, OR = Nu;
class IR {
  constructor(t = Wt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Hd.join(process.resourcesPath, "app-update.yml") : Hd.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, OR.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Uo.ElectronAppAdapter = IR;
var tg = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = $e;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Wt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(a) {
      super(), this.proxyLoginCallback = a, this.cachedSession = null;
    }
    async download(a, o, s) {
      return await s.cancellationToken.createPromise((u, f, l) => {
        const m = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(a, m), (0, t.configureRequestOptions)(m), this.doDownload(m, {
          destination: o,
          options: s,
          onCancel: l,
          callback: (d) => {
            d == null ? u(o) : f(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(a, o) {
      a.headers && a.headers.Host && (a.host = a.headers.Host, delete a.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Wt.net.request({
        ...a,
        session: this.cachedSession
      });
      return s.on("response", o), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(a, o, s, u, f) {
      a.on("redirect", (l, m, d) => {
        a.abort(), u > this.maxRedirects ? s(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(d, o));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(tg);
var Xi = {}, Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.newBaseUrl = $R;
Ot.newUrlFromBase = kR;
Ot.getChannelFilename = DR;
const rg = vr;
function $R(e) {
  const t = new rg.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function kR(e, t, r = !1) {
  const n = new rg.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function DR(e) {
  return `${e}.yml`;
}
var Re = {}, NR = "[object Symbol]", ng = /[\\^$.*+?()[\]{}|]/g, PR = RegExp(ng.source), FR = typeof se == "object" && se && se.Object === Object && se, LR = typeof self == "object" && self && self.Object === Object && self, UR = FR || LR || Function("return this")(), BR = Object.prototype, MR = BR.toString, zd = UR.Symbol, qd = zd ? zd.prototype : void 0, Gd = qd ? qd.toString : void 0;
function jR(e) {
  if (typeof e == "string")
    return e;
  if (zR(e))
    return Gd ? Gd.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function HR(e) {
  return !!e && typeof e == "object";
}
function zR(e) {
  return typeof e == "symbol" || HR(e) && MR.call(e) == NR;
}
function qR(e) {
  return e == null ? "" : jR(e);
}
function GR(e) {
  return e = qR(e), e && PR.test(e) ? e.replace(ng, "\\$&") : e;
}
var ig = GR;
Object.defineProperty(Re, "__esModule", { value: !0 });
Re.Provider = void 0;
Re.findFile = XR;
Re.parseUpdateInfo = KR;
Re.getFileList = ag;
Re.resolveFiles = JR;
const mr = $e, WR = Ue, VR = vr, uo = Ot, YR = ig;
class ZR {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, r, n, i = null) {
    const a = (0, uo.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, uo.newUrlFromBase)(`${t.pathname.replace(new RegExp(YR(n), "g"), r)}.blockmap`, i ? new VR.URL(i) : t), a];
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, mr.configureRequestUrl)(t, n), n;
  }
}
Re.Provider = ZR;
function XR(e, t, r) {
  var n;
  if (e.length === 0)
    throw (0, mr.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((o) => o.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), a = (n = i.find((o) => [o.url.pathname, o.info.url].some((s) => s.includes(process.arch)))) !== null && n !== void 0 ? n : i.shift();
  return a || (r == null ? e[0] : e.find((o) => !r.some((s) => o.url.pathname.toLowerCase().endsWith(`.${s.toLowerCase()}`))));
}
function KR(e, t, r) {
  if (e == null)
    throw (0, mr.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, WR.load)(e);
  } catch (i) {
    throw (0, mr.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function ag(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, mr.newError)(`No files provided: ${(0, mr.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function JR(e, t, r = (n) => n) {
  const i = ag(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, mr.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, mr.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, uo.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), a = e.packages, o = a == null ? null : a[process.arch] || a.ia32;
  return o != null && (i[0].packageInfo = {
    ...o,
    path: (0, uo.newUrlFromBase)(r(o.path), t).href
  }), i;
}
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.GenericProvider = void 0;
const Wd = $e, Js = Ot, Qs = Re;
class QR extends Qs.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Js.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Js.getChannelFilename)(this.channel), r = (0, Js.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Qs.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof Wd.HttpError && i.statusCode === 404)
          throw (0, Wd.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((a, o) => {
            try {
              setTimeout(a, 1e3 * n);
            } catch (s) {
              o(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Qs.resolveFiles)(t, this.baseUrl);
  }
}
Xi.GenericProvider = QR;
var Bo = {}, Mo = {};
Object.defineProperty(Mo, "__esModule", { value: !0 });
Mo.BitbucketProvider = void 0;
const Vd = $e, el = Ot, tl = Re;
class eO extends tl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: a } = t;
    this.baseUrl = (0, el.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${a}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Vd.CancellationToken(), r = (0, el.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, el.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, tl.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Vd.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, tl.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Mo.BitbucketProvider = eO;
var gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
gr.GitHubProvider = gr.BaseGitHubProvider = void 0;
gr.computeReleaseNotes = sg;
const qt = $e, hn = eg, tO = vr, pn = Ot, Fl = Re, rl = /\/tag\/([^/]+)$/;
class og extends Fl.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, pn.newBaseUrl)((0, qt.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, pn.newBaseUrl)((0, qt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
gr.BaseGitHubProvider = og;
class rO extends og {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, a;
    const o = new qt.CancellationToken(), s = await this.httpRequest((0, pn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), u = (0, qt.parseXml)(s);
    let f = u.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const b = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = hn.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (b === null)
          l = rl.exec(f.element("link").attribute("href"))[1];
        else
          for (const v of u.getElements("entry")) {
            const y = rl.exec(v.element("link").attribute("href"));
            if (y === null)
              continue;
            const A = y[1], R = ((n = hn.prerelease(A)) === null || n === void 0 ? void 0 : n[0]) || null, $ = !b || ["alpha", "beta"].includes(b), j = R !== null && !["alpha", "beta"].includes(String(R));
            if ($ && !j && !(b === "beta" && R === "alpha")) {
              l = A;
              break;
            }
            if (R && R === b) {
              l = A;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(o);
        for (const b of u.getElements("entry"))
          if (rl.exec(b.element("link").attribute("href"))[1] === l) {
            f = b;
            break;
          }
      }
    } catch (b) {
      throw (0, qt.newError)(`Cannot parse releases feed: ${b.stack || b.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, qt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let m, d = "", p = "";
    const _ = async (b) => {
      d = (0, pn.getChannelFilename)(b), p = (0, pn.newUrlFromBase)(this.getBaseDownloadPath(String(l), d), this.baseUrl);
      const v = this.createRequestOptions(p);
      try {
        return await this.executor.request(v, o);
      } catch (y) {
        throw y instanceof qt.HttpError && y.statusCode === 404 ? (0, qt.newError)(`Cannot find ${d} in the latest release artifacts (${p}): ${y.stack || y.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : y;
      }
    };
    try {
      let b = this.channel;
      this.updater.allowPrerelease && (!((i = hn.prerelease(l)) === null || i === void 0) && i[0]) && (b = this.getCustomChannelName(String((a = hn.prerelease(l)) === null || a === void 0 ? void 0 : a[0]))), m = await _(b);
    } catch (b) {
      if (this.updater.allowPrerelease)
        m = await _(this.getDefaultChannelName());
      else
        throw b;
    }
    const g = (0, Fl.parseUpdateInfo)(m, d, p);
    return g.releaseName == null && (g.releaseName = f.elementValueOrEmpty("title")), g.releaseNotes == null && (g.releaseNotes = sg(this.updater.currentVersion, this.updater.fullChangelog, u, f)), {
      tag: l,
      ...g
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, pn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new tO.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, qt.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Fl.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
gr.GitHubProvider = rO;
function Yd(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function sg(e, t, r, n) {
  if (!t)
    return Yd(n);
  const i = [];
  for (const a of r.getElements("entry")) {
    const o = /\/tag\/v?([^/]+)$/.exec(a.element("link").attribute("href"))[1];
    hn.lt(e, o) && i.push({
      version: o,
      note: Yd(a)
    });
  }
  return i.sort((a, o) => hn.rcompare(a.version, o.version));
}
var jo = {};
Object.defineProperty(jo, "__esModule", { value: !0 });
jo.GitLabProvider = void 0;
const ze = $e, nl = vr, nO = ig, Na = Ot, il = Re;
class iO extends il.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, r, n) {
    super({
      ...n,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = r, this.cachedLatestVersion = null;
    const a = t.host || "gitlab.com";
    this.baseApiUrl = (0, Na.newBaseUrl)(`https://${a}/api/v4`);
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new ze.CancellationToken(), r = (0, Na.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
    let n;
    try {
      const d = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, p = await this.httpRequest(r, d, t);
      if (!p)
        throw (0, ze.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      n = JSON.parse(p);
    } catch (d) {
      throw (0, ze.newError)(`Unable to find latest release on GitLab (${r}): ${d.stack || d.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    const i = n.tag_name;
    let a = null, o = "", s = null;
    const u = async (d) => {
      o = (0, Na.getChannelFilename)(d);
      const p = n.assets.links.find((g) => g.name === o);
      if (!p)
        throw (0, ze.newError)(`Cannot find ${o} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      s = new nl.URL(p.direct_asset_url);
      const _ = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
      try {
        const g = await this.httpRequest(s, _, t);
        if (!g)
          throw (0, ze.newError)(`Empty response from ${s}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return g;
      } catch (g) {
        throw g instanceof ze.HttpError && g.statusCode === 404 ? (0, ze.newError)(`Cannot find ${o} in the latest release artifacts (${s}): ${g.stack || g.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : g;
      }
    };
    try {
      a = await u(this.channel);
    } catch (d) {
      if (this.channel !== this.getDefaultChannelName())
        a = await u(this.getDefaultChannelName());
      else
        throw d;
    }
    if (!a)
      throw (0, ze.newError)(`Unable to parse channel data from ${o}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, il.parseUpdateInfo)(a, o, s);
    f.releaseName == null && (f.releaseName = n.name), f.releaseNotes == null && (f.releaseNotes = n.description || null);
    const l = /* @__PURE__ */ new Map();
    for (const d of n.assets.links)
      l.set(this.normalizeFilename(d.name), d.direct_asset_url);
    const m = {
      tag: i,
      assets: l,
      ...f
    };
    return this.cachedLatestVersion = m, m;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const r = /* @__PURE__ */ new Map();
    for (const n of t.links)
      r.set(this.normalizeFilename(n.name), n.direct_asset_url);
    return r;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, r) {
    const n = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
    for (const i of n) {
      const a = t.get(i);
      if (a)
        return new nl.URL(a);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const r = new ze.CancellationToken(), n = [`v${t}`, t];
    for (const i of n) {
      const a = (0, Na.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const o = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, s = await this.httpRequest(a, o, r);
        if (s)
          return JSON.parse(s);
      } catch (o) {
        if (o instanceof ze.HttpError && o.statusCode === 404)
          continue;
        throw (0, ze.newError)(`Unable to find release ${i} on GitLab (${a}): ${o.stack || o.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, ze.newError)(`Unable to find release with version ${t} (tried: ${n.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const r = {};
    return t != null && (t.startsWith("Bearer") ? r.authorization = t : r["PRIVATE-TOKEN"] = t), r;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const r = await this.fetchReleaseInfoByVersion(t);
    return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, r, n) {
    let i = null, a = null;
    const o = await this.getVersionInfoForBlockMap(r);
    o && (i = this.findBlockMapInAssets(o, n));
    const s = await this.getVersionInfoForBlockMap(t);
    if (s) {
      const u = n.replace(new RegExp(nO(r), "g"), t);
      a = this.findBlockMapInAssets(s, u);
    }
    return [a, i];
  }
  async getBlockMapFiles(t, r, n, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const a = t.pathname.split("/").pop() || "", [o, s] = await this.findBlockMapUrlsFromAssets(r, n, a);
      if (!s)
        throw (0, ze.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!o)
        throw (0, ze.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [o, s];
    } else
      return super.getBlockMapFiles(t, r, n, i);
  }
  resolveFiles(t) {
    return (0, il.getFileList)(t).map((r) => {
      const i = [
        r.url,
        // Original filename
        this.normalizeFilename(r.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((o) => t.assets.has(o)), a = i ? t.assets.get(i) : void 0;
      if (!a)
        throw (0, ze.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new nl.URL(a),
        info: r
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
jo.GitLabProvider = iO;
var Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
Ho.KeygenProvider = void 0;
const Zd = $e, al = Ot, ol = Re;
class aO extends ol.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, al.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Zd.CancellationToken(), r = (0, al.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, al.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, ol.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, Zd.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, ol.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
Ho.KeygenProvider = aO;
var zo = {};
Object.defineProperty(zo, "__esModule", { value: !0 });
zo.PrivateGitHubProvider = void 0;
const nn = $e, oO = Ue, sO = pe, Xd = vr, Kd = Ot, lO = gr, uO = Re;
class cO extends lO.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new nn.CancellationToken(), r = (0, Kd.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, nn.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const a = new Xd.URL(i.url);
    let o;
    try {
      o = (0, oO.load)(await this.httpRequest(a, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof nn.HttpError && s.statusCode === 404 ? (0, nn.newError)(`Cannot find ${r} in the latest release artifacts (${a}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return o.assets = n.assets, o;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, Kd.newUrlFromBase)(n, this.baseUrl);
    try {
      const a = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? a.find((o) => o.prerelease) || a[0] : a;
    } catch (a) {
      throw (0, nn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${a.stack || a.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, uO.getFileList)(t).map((r) => {
      const n = sO.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((a) => a != null && a.name === n);
      if (i == null)
        throw (0, nn.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Xd.URL(i.url),
        info: r
      };
    });
  }
}
zo.PrivateGitHubProvider = cO;
Object.defineProperty(Bo, "__esModule", { value: !0 });
Bo.isUrlProbablySupportMultiRangeRequests = lg;
Bo.createClient = gO;
const Pa = $e, fO = Mo, Jd = Xi, dO = gr, hO = jo, pO = Ho, mO = zo;
function lg(e) {
  return !e.includes("s3.amazonaws.com");
}
function gO(e, t, r) {
  if (typeof e == "string")
    throw (0, Pa.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, a = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return a == null ? new dO.GitHubProvider(i, t, r) : new mO.PrivateGitHubProvider(i, t, a, r);
    }
    case "bitbucket":
      return new fO.BitbucketProvider(e, t, r);
    case "gitlab":
      return new hO.GitLabProvider(e, t, r);
    case "keygen":
      return new pO.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new Jd.GenericProvider({
        provider: "generic",
        url: (0, Pa.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Jd.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && lg(i.url)
      });
    }
    case "custom": {
      const i = e, a = i.updateProvider;
      if (!a)
        throw (0, Pa.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new a(i, t, r);
    }
    default:
      throw (0, Pa.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var qo = {}, Ki = {}, Bn = {}, Xr = {};
Object.defineProperty(Xr, "__esModule", { value: !0 });
Xr.OperationKind = void 0;
Xr.computeOperations = vO;
var Dr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Dr || (Xr.OperationKind = Dr = {}));
function vO(e, t, r) {
  const n = eh(e.files), i = eh(t.files);
  let a = null;
  const o = t.files[0], s = [], u = o.name, f = n.get(u);
  if (f == null)
    throw new Error(`no file ${u} in old blockmap`);
  const l = i.get(u);
  let m = 0;
  const { checksumToOffset: d, checksumToOldSize: p } = yO(n.get(u), f.offset, r);
  let _ = o.offset;
  for (let g = 0; g < l.checksums.length; _ += l.sizes[g], g++) {
    const b = l.sizes[g], v = l.checksums[g];
    let y = d.get(v);
    y != null && p.get(v) !== b && (r.warn(`Checksum ("${v}") matches, but size differs (old: ${p.get(v)}, new: ${b})`), y = void 0), y === void 0 ? (m++, a != null && a.kind === Dr.DOWNLOAD && a.end === _ ? a.end += b : (a = {
      kind: Dr.DOWNLOAD,
      start: _,
      end: _ + b
      // oldBlocks: null,
    }, Qd(a, s, v, g))) : a != null && a.kind === Dr.COPY && a.end === y ? a.end += b : (a = {
      kind: Dr.COPY,
      start: y,
      end: y + b
      // oldBlocks: [checksum]
    }, Qd(a, s, v, g));
  }
  return m > 0 && r.info(`File${o.name === "file" ? "" : " " + o.name} has ${m} changed blocks`), s;
}
const _O = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Qd(e, t, r, n) {
  if (_O && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const a = [i.start, i.end, e.start, e.end].reduce((o, s) => o < s ? o : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Dr[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - a} until ${i.end - a} and ${e.start - a} until ${e.end - a}`);
    }
  }
  t.push(e);
}
function yO(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let a = t;
  for (let o = 0; o < e.checksums.length; o++) {
    const s = e.checksums[o], u = e.sizes[o], f = i.get(s);
    if (f === void 0)
      n.set(s, a), i.set(s, u);
    else if (r.debug != null) {
      const l = f === u ? "(same size)" : `(size: ${f}, this size: ${u})`;
      r.debug(`${s} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    a += u;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function eh(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.DataSplitter = void 0;
Bn.copyData = ug;
const Fa = $e, wO = pt, EO = zr, bO = Xr, th = Buffer.from(`\r
\r
`);
var nr;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(nr || (nr = {}));
function ug(e, t, r, n, i) {
  const a = (0, wO.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  a.on("error", n), a.once("end", i), a.pipe(t, {
    end: !1
  });
}
class SO extends EO.Writable {
  constructor(t, r, n, i, a, o) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = a, this.finishHandler = o, this.partIndex = -1, this.headerListBuffer = null, this.readState = nr.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Fa.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === nr.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = nr.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === nr.BODY)
          this.readState = nr.INIT;
        else {
          this.partIndex++;
          let o = this.partIndexToTaskIndex.get(this.partIndex);
          if (o == null)
            if (this.isFinished)
              o = this.options.end;
            else
              throw (0, Fa.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < o)
            await this.copyExistingData(s, o);
          else if (s > o)
            throw (0, Fa.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = nr.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, a = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, a), this.remainingPartDataCount = n - (a - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const a = () => {
        if (t === r) {
          n();
          return;
        }
        const o = this.options.tasks[t];
        if (o.kind !== bO.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        ug(o, this.out, this.options.oldFileFd, i, () => {
          t++, a();
        });
      };
      a();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(th, r);
    if (n !== -1)
      return n + th.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Fa.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((a, o) => {
      i.on("error", o), i.once("drain", () => {
        i.removeListener("error", o), a();
      });
    });
  }
}
Bn.DataSplitter = SO;
var Go = {};
Object.defineProperty(Go, "__esModule", { value: !0 });
Go.executeTasksUsingMultipleRangeRequests = TO;
Go.checkIsRangesSupported = Ul;
const Ll = $e, rh = Bn, nh = Xr;
function TO(e, t, r, n, i) {
  const a = (o) => {
    if (o >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = o + 1e3;
    AO(e, {
      tasks: t,
      start: o,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => a(s), i);
  };
  return a;
}
function AO(e, t, r, n, i) {
  let a = "bytes=", o = 0;
  const s = /* @__PURE__ */ new Map(), u = [];
  for (let m = t.start; m < t.end; m++) {
    const d = t.tasks[m];
    d.kind === nh.OperationKind.DOWNLOAD && (a += `${d.start}-${d.end - 1}, `, s.set(o, m), o++, u.push(d.end - d.start));
  }
  if (o <= 1) {
    const m = (d) => {
      if (d >= t.end) {
        n();
        return;
      }
      const p = t.tasks[d++];
      if (p.kind === nh.OperationKind.COPY)
        (0, rh.copyData)(p, r, t.oldFileFd, i, () => m(d));
      else {
        const _ = e.createRequestOptions();
        _.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const g = e.httpExecutor.createRequest(_, (b) => {
          b.on("error", i), Ul(b, i) && (b.pipe(r, {
            end: !1
          }), b.once("end", () => m(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(g, i), g.end();
      }
    };
    m(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = a.substring(0, a.length - 2);
  const l = e.httpExecutor.createRequest(f, (m) => {
    if (!Ul(m, i))
      return;
    const d = (0, Ll.safeGetHeader)(m, "content-type"), p = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(d);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const _ = new rh.DataSplitter(r, t, s, p[1] || p[2], u, n);
    _.on("error", i), m.pipe(_), m.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function Ul(e, t) {
  if (e.statusCode >= 400)
    return t((0, Ll.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Ll.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Wo = {};
Object.defineProperty(Wo, "__esModule", { value: !0 });
Wo.ProgressDifferentialDownloadCallbackTransform = void 0;
const CO = zr;
var mn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(mn || (mn = {}));
class xO extends CO.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = mn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == mn.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = mn.COPY;
  }
  beginRangeDownload() {
    this.operationType = mn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
Wo.ProgressDifferentialDownloadCallbackTransform = xO;
Object.defineProperty(Ki, "__esModule", { value: !0 });
Ki.DifferentialDownloader = void 0;
const Yn = $e, sl = yr, RO = pt, OO = Bn, IO = vr, La = Xr, ih = Go, $O = Wo;
class kO {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, Yn.configureRequestUrl)(this.options.newUrl, t), (0, Yn.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, La.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let a = 0, o = 0;
    for (const u of i) {
      const f = u.end - u.start;
      u.kind === La.OperationKind.DOWNLOAD ? a += f : o += f;
    }
    const s = this.blockAwareFileInfo.size;
    if (a + o + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${a}, copySize: ${o}, newSize: ${s}`);
    return n.info(`Full: ${ah(s)}, To download: ${ah(a)} (${Math.round(a / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, sl.close)(i.descriptor).catch((a) => {
      this.logger.error(`cannot close file "${i.path}": ${a}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((a) => {
      try {
        this.logger.error(`cannot close files: ${a}`);
      } catch (o) {
        try {
          console.error(o);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, sl.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, sl.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const a = (0, RO.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((o, s) => {
      const u = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const v = [];
        let y = 0;
        for (const R of t)
          R.kind === La.OperationKind.DOWNLOAD && (v.push(R.end - R.start), y += R.end - R.start);
        const A = {
          expectedByteCounts: v,
          grandTotal: y
        };
        f = new $O.ProgressDifferentialDownloadCallbackTransform(A, this.options.cancellationToken, this.options.onProgress), u.push(f);
      }
      const l = new Yn.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, u.push(l), a.on("finish", () => {
        a.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (v) {
            s(v);
            return;
          }
          o(void 0);
        });
      }), u.push(a);
      let m = null;
      for (const v of u)
        v.on("error", s), m == null ? m = v : m = m.pipe(v);
      const d = u[0];
      let p;
      if (this.options.isUseMultipleRangeRequest) {
        p = (0, ih.executeTasksUsingMultipleRangeRequests)(this, t, d, n, s), p(0);
        return;
      }
      let _ = 0, g = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const b = this.createRequestOptions();
      b.redirect = "manual", p = (v) => {
        var y, A;
        if (v >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const R = t[v++];
        if (R.kind === La.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, OO.copyData)(R, d, n, s, () => p(v));
          return;
        }
        const $ = `bytes=${R.start}-${R.end - 1}`;
        b.headers.range = $, (A = (y = this.logger) === null || y === void 0 ? void 0 : y.debug) === null || A === void 0 || A.call(y, `download range: ${$}`), f && f.beginRangeDownload();
        const j = this.httpExecutor.createRequest(b, (B) => {
          B.on("error", s), B.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), B.statusCode >= 400 && s((0, Yn.createHttpError)(B)), B.pipe(d, {
            end: !1
          }), B.once("end", () => {
            f && f.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => p(v), 1e3)) : p(v);
          });
        });
        j.on("redirect", (B, z, E) => {
          this.logger.info(`Redirect to ${DO(E)}`), g = E, (0, Yn.configureRequestUrl)(new IO.URL(g), b), j.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(j, s), j.end();
      }, p(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let a = 0;
    if (await this.request(i, (o) => {
      o.copy(n, a), a += o.length;
    }), a !== n.length)
      throw new Error(`Received data length ${a} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const a = this.httpExecutor.createRequest(t, (o) => {
        (0, ih.checkIsRangesSupported)(o, i) && (o.on("error", i), o.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), o.on("data", r), o.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(a, i), a.end();
    });
  }
}
Ki.DifferentialDownloader = kO;
function ah(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function DO(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(qo, "__esModule", { value: !0 });
qo.GenericDifferentialDownloader = void 0;
const NO = Ki;
class PO extends NO.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
qo.GenericDifferentialDownloader = PO;
var wr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = n;
  const t = $e;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class r {
    constructor(a) {
      this.emitter = a;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(a) {
      n(this.emitter, "login", a);
    }
    progress(a) {
      n(this.emitter, e.DOWNLOAD_PROGRESS, a);
    }
    updateDownloaded(a) {
      n(this.emitter, e.UPDATE_DOWNLOADED, a);
    }
    updateCancelled(a) {
      n(this.emitter, "update-cancelled", a);
    }
  }
  e.UpdaterSignal = r;
  function n(i, a, o) {
    i.on(a, o);
  }
})(wr);
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.NoOpLogger = dr.AppUpdater = void 0;
const qe = $e, FO = ki, LO = fo, UO = Ml, wt = yr, BO = Ue, ll = ko, Et = pe, Or = eg, oh = Zi, MO = Uo, sh = tg, jO = Xi, ul = Bo, cl = xh, HO = qo, an = wr;
class Pu extends UO.EventEmitter {
  /**
   * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
   */
  get channel() {
    return this._channel;
  }
  /**
   * Set the update channel. Overrides `channel` in the update configuration.
   *
   * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
   */
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, qe.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, qe.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, sh.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new cg();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new ll.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, r) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new an.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (a) => this.checkIfUpdateSupported(a), this._isUserWithinRollout = (a) => this.isStagingMatch(a), this.clientPromise = null, this.stagingUserIdPromise = new ll.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new ll.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (a) => {
      this._logger.error(`Error: ${a.stack || a.message}`);
    }), r == null ? (this.app = new MO.ElectronAppAdapter(), this.httpExecutor = new sh.ElectronHttpExecutor((a, o) => this.emit("login", a, o))) : (this.app = r, this.httpExecutor = null);
    const n = this.app.version, i = (0, Or.parse)(n);
    if (i == null)
      throw (0, qe.newError)(`App version is not a valid semver version: "${n}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = zO(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const r = this.createProviderRuntimeOptions();
    let n;
    typeof t == "string" ? n = new jO.GenericProvider({ provider: "generic", url: t }, this, {
      ...r,
      isUseMultipleRangeRequest: (0, ul.isUrlProbablySupportMultiRangeRequests)(t)
    }) : n = (0, ul.createClient)(t, this, r), this.clientPromise = Promise.resolve(n);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const r = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((n) => (r(), n)).catch((n) => {
      throw r(), this.emit("error", n, `Cannot check for updates: ${(n.stack || n).toString()}`), n;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((r) => r != null && r.downloadPromise ? (r.downloadPromise.then(() => {
      const n = Pu.formatDownloadNotification(r.updateInfo.version, this.app.name, t);
      new Wt.Notification(n).show();
    }), r) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), r));
  }
  static formatDownloadNotification(t, r, n) {
    return n == null && (n = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), n = {
      title: n.title.replace("{appName}", r).replace("{version}", t),
      body: n.body.replace("{appName}", r).replace("{version}", t)
    }, n;
  }
  async isStagingMatch(t) {
    const r = t.stagingPercentage;
    let n = r;
    if (n == null)
      return !0;
    if (n = parseInt(n, 10), isNaN(n))
      return this._logger.warn(`Staging percentage is NaN: ${r}`), !0;
    n = n / 100;
    const i = await this.stagingUserIdPromise.value, o = qe.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${n}, percentage: ${o}, user id: ${i}`), o < n;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const r = (0, Or.parse)(t.version);
    if (r == null)
      throw (0, qe.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const n = this.currentVersion;
    if ((0, Or.eq)(r, n) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const a = (0, Or.gt)(r, n), o = (0, Or.lt)(r, n);
    return a ? !0 : this.allowDowngrade && o;
  }
  checkIfUpdateSupported(t) {
    const r = t == null ? void 0 : t.minimumSystemVersion, n = (0, LO.release)();
    if (r)
      try {
        if ((0, Or.lt)(n, r))
          return this._logger.info(`Current OS version ${n} is less than the minimum OS version required ${r} for version ${n}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${n}) with minimum OS version(${r}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((n) => (0, ul.createClient)(n, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, r = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": r })), {
      info: await t.getLatestVersion(),
      provider: t
    };
  }
  createProviderRuntimeOptions() {
    return {
      isUseMultipleRangeRequest: !0,
      platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
      executor: this.httpExecutor
    };
  }
  async doCheckForUpdates() {
    this.emit("checking-for-update");
    const t = await this.getUpdateInfoAndProvider(), r = t.info;
    if (!await this.isUpdateAvailable(r))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${r.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", r), {
        isUpdateAvailable: !1,
        versionInfo: r,
        updateInfo: r
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(r);
    const n = new qe.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: r,
      updateInfo: r,
      cancellationToken: n,
      downloadPromise: this.autoDownload ? this.downloadUpdate(n) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, qe.asArray)(t.files).map((r) => r.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new qe.CancellationToken()) {
    const r = this.updateInfoAndProvider;
    if (r == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
    this._logger.info(`Downloading update from ${(0, qe.asArray)(r.info.files).map((i) => i.url).join(", ")}`);
    const n = (i) => {
      if (!(i instanceof qe.CancellationError))
        try {
          this.dispatchError(i);
        } catch (a) {
          this._logger.warn(`Cannot dispatch error event: ${a.stack || a}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: r,
      requestHeaders: this.computeRequestHeaders(r.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw n(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise;
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(an.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, BO.load)(await (0, wt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const r = t.fileExtraDownloadHeaders;
    if (r != null) {
      const n = this.requestHeaders;
      return n == null ? r : {
        ...r,
        ...n
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = Et.join(this.app.userDataPath, ".updaterId");
    try {
      const n = await (0, wt.readFile)(t, "utf-8");
      if (qe.UUID.check(n))
        return n;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${n}`);
    } catch (n) {
      n.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${n}`);
    }
    const r = qe.UUID.v5((0, FO.randomBytes)(4096), qe.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${r}`);
    try {
      await (0, wt.outputFile)(t, r);
    } catch (n) {
      this._logger.warn(`Couldn't write out staging user ID: ${n}`);
    }
    return r;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const r of Object.keys(t)) {
      const n = r.toLowerCase();
      if (n === "authorization" || n === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const r = (await this.configOnDisk.value).updaterCacheDirName, n = this._logger;
      r == null && n.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = Et.join(this.app.baseCachePath, r || this.app.name);
      n.debug != null && n.debug(`updater cache dir: ${i}`), t = new oh.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const r = t.fileInfo, n = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: r.info.sha2,
      sha512: r.info.sha512
    };
    this.listenerCount(an.DOWNLOAD_PROGRESS) > 0 && (n.onProgress = (y) => this.emit(an.DOWNLOAD_PROGRESS, y));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, a = i.version, o = r.packageInfo;
    function s() {
      const y = decodeURIComponent(t.fileInfo.url.pathname);
      return y.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? Et.basename(y) : t.fileInfo.info.url;
    }
    const u = await this.getOrCreateDownloadHelper(), f = u.cacheDirForPendingUpdate;
    await (0, wt.mkdir)(f, { recursive: !0 });
    const l = s();
    let m = Et.join(f, l);
    const d = o == null ? null : Et.join(f, `package-${a}${Et.extname(o.path) || ".7z"}`), p = async (y) => {
      await u.setDownloadedFile(m, d, i, r, l, y), await t.done({
        ...i,
        downloadedFile: m
      });
      const A = Et.join(f, "current.blockmap");
      return await (0, wt.pathExists)(A) && await (0, wt.copyFile)(A, Et.join(u.cacheDir, "current.blockmap")), d == null ? [m] : [m, d];
    }, _ = this._logger, g = await u.validateDownloadedPath(m, i, r, _);
    if (g != null)
      return m = g, await p(!1);
    const b = async () => (await u.clear().catch(() => {
    }), await (0, wt.unlink)(m).catch(() => {
    })), v = await (0, oh.createTempUpdateFile)(`temp-${l}`, f, _);
    try {
      await t.task(v, n, d, b), await (0, qe.retry)(() => (0, wt.rename)(v, m), {
        retries: 60,
        interval: 500,
        shouldRetry: (y) => y instanceof Error && /^EBUSY:/.test(y.message) ? !0 : (_.warn(`Cannot rename temp file to final file: ${y.message || y.stack}`), !1)
      });
    } catch (y) {
      throw await b(), y instanceof qe.CancellationError && (_.info("cancelled"), this.emit("update-cancelled", i)), y;
    }
    return _.info(`New version ${a} has been downloaded to ${m}`), await p(!0);
  }
  async differentialDownloadInstaller(t, r, n, i, a) {
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const o = r.updateInfoAndProvider.provider, s = await o.getBlockMapFiles(t.url, this.app.version, r.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${s[0]}", new: ${s[1]})`);
      const u = async (_) => {
        const g = await this.httpExecutor.downloadToBuffer(_, {
          headers: r.requestHeaders,
          cancellationToken: r.cancellationToken
        });
        if (g == null || g.length === 0)
          throw new Error(`Blockmap "${_.href}" is empty`);
        try {
          return JSON.parse((0, cl.gunzipSync)(g).toString());
        } catch (b) {
          throw new Error(`Cannot parse blockmap "${_.href}", error: ${b}`);
        }
      }, f = {
        newUrl: t.url,
        oldFile: Et.join(this.downloadedUpdateHelper.cacheDir, a),
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: o.isUseMultipleRangeRequest,
        requestHeaders: r.requestHeaders,
        cancellationToken: r.cancellationToken
      };
      this.listenerCount(an.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (_) => this.emit(an.DOWNLOAD_PROGRESS, _));
      const l = async (_, g) => {
        const b = Et.join(g, "current.blockmap");
        await (0, wt.outputFile)(b, (0, cl.gzipSync)(JSON.stringify(_)));
      }, m = async (_) => {
        const g = Et.join(_, "current.blockmap");
        try {
          if (await (0, wt.pathExists)(g))
            return JSON.parse((0, cl.gunzipSync)(await (0, wt.readFile)(g)).toString());
        } catch (b) {
          this._logger.warn(`Cannot parse blockmap "${g}", error: ${b}`);
        }
        return null;
      }, d = await u(s[1]);
      await l(d, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let p = await m(this.downloadedUpdateHelper.cacheDir);
      return p == null && (p = await u(s[0])), await new HO.GenericDifferentialDownloader(t.info, this.httpExecutor, f).download(p, d), !1;
    } catch (o) {
      if (this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), this._testOnlyOptions != null)
        throw o;
      return !0;
    }
  }
}
dr.AppUpdater = Pu;
function zO(e) {
  const t = (0, Or.prerelease)(e);
  return t != null && t.length > 0;
}
class cg {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
dr.NoOpLogger = cg;
Object.defineProperty(Zr, "__esModule", { value: !0 });
Zr.BaseUpdater = void 0;
const lh = co, qO = dr;
class GO extends qO.AppUpdater {
  constructor(t, r) {
    super(t, r), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, r = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? r : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Wt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (r) => (this.dispatchUpdateDownloaded(r), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, r = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const n = this.downloadedUpdateHelper, i = this.installerPath, a = n == null ? null : n.downloadedFileInfo;
    if (i == null || a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${r}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: r,
        isAdminRightsRequired: a.isAdminRightsRequired
      });
    } catch (o) {
      return this.dispatchError(o), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  spawnSyncLog(t, r = [], n = {}) {
    this._logger.info(`Executing: ${t} with args: ${r}`);
    const i = (0, lh.spawnSync)(t, r, {
      env: { ...process.env, ...n },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: o, stdout: s, stderr: u } = i;
    if (a != null)
      throw this._logger.error(u), a;
    if (o != null && o !== 0)
      throw this._logger.error(u), new Error(`Command ${t} exited with code ${o}`);
    return s.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, r = [], n = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${r}`), new Promise((a, o) => {
      try {
        const s = { stdio: i, env: n, detached: !0 }, u = (0, lh.spawn)(t, r, s);
        u.on("error", (f) => {
          o(f);
        }), u.unref(), u.pid !== void 0 && a(!0);
      } catch (s) {
        o(s);
      }
    });
  }
}
Zr.BaseUpdater = GO;
var Ci = {}, Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const on = yr, WO = Ki, VO = xh;
class YO extends WO.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = fg(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await ZO(this.options.oldFile), i);
  }
}
Ji.FileWithEmbeddedBlockMapDifferentialDownloader = YO;
function fg(e) {
  return JSON.parse((0, VO.inflateRawSync)(e).toString());
}
async function ZO(e) {
  const t = await (0, on.open)(e, "r");
  try {
    const r = (await (0, on.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, on.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, on.read)(t, i, 0, i.length, r - n.length - i.length), await (0, on.close)(t), fg(i);
  } catch (r) {
    throw await (0, on.close)(t), r;
  }
}
Object.defineProperty(Ci, "__esModule", { value: !0 });
Ci.AppImageUpdater = void 0;
const uh = $e, ch = co, XO = yr, KO = pt, Zn = pe, JO = Zr, QO = Ji, eI = Re, fh = wr;
class tI extends JO.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, eI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        const o = process.env.APPIMAGE;
        if (o == null)
          throw (0, uh.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(n, o, i, r, t)) && await this.httpExecutor.download(n.url, i, a), await (0, XO.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, r, n, i, a) {
    try {
      const o = {
        newUrl: t.url,
        oldFile: r,
        logger: this._logger,
        newFile: n,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: a.requestHeaders,
        cancellationToken: a.cancellationToken
      };
      return this.listenerCount(fh.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(fh.DOWNLOAD_PROGRESS, s)), await new QO.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, o).download(), !1;
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const r = process.env.APPIMAGE;
    if (r == null)
      throw (0, uh.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, KO.unlinkSync)(r);
    let n;
    const i = Zn.basename(r), a = this.installerPath;
    if (a == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Zn.basename(a) === i || !/\d+\.\d+\.\d+/.test(i) ? n = r : n = Zn.join(Zn.dirname(r), Zn.basename(a)), (0, ch.execFileSync)("mv", ["-f", a, n]), n !== r && this.emit("appimage-filename-updated", n);
    const o = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(n, [], o) : (o.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, ch.execFileSync)(n, [], { env: o })), !0;
  }
}
Ci.AppImageUpdater = tI;
var xi = {}, Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.LinuxUpdater = void 0;
const rI = Zr;
class nI extends rI.BaseUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizies the installer path for using with command line tools.
   */
  get installerPath() {
    var t, r;
    return (r = (t = super.installerPath) === null || t === void 0 ? void 0 : t.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && r !== void 0 ? r : null;
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: r } = this.app, n = `"${r} would like to update"`, i = this.sudoWithArgs(n);
    this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
    let a = '"';
    return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (a = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${a}/bin/bash`, "-c", `'${t.join(" ")}'${a}`]);
  }
  sudoWithArgs(t) {
    const r = this.determineSudoCommand(), n = [r];
    return /kdesudo/i.test(r) ? (n.push("--comment", t), n.push("-c")) : /gksudo/i.test(r) ? n.push("--message", t) : /pkexec/i.test(r) && n.push("--disable-internal-agent"), n;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const r of t)
      if (this.hasCommand(r))
        return r;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var r;
    const n = (r = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || r === void 0 ? void 0 : r.trim();
    if (n)
      return n;
    for (const i of t)
      if (this.hasCommand(i))
        return i;
    return this._logger.warn(`No package manager found in the list: ${t.join(", ")}. Defaulting to the first one: ${t[0]}`), t[0];
  }
}
Mn.LinuxUpdater = nI;
Object.defineProperty(xi, "__esModule", { value: !0 });
xi.DebUpdater = void 0;
const iI = Re, dh = wr, aI = Mn;
class Fu extends aI.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, iI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(dh.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(dh.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const n = ["dpkg", "apt"], i = this.detectPackageManager(n);
    try {
      Fu.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    var a;
    if (t === "dpkg")
      try {
        n(["dpkg", "-i", r]);
      } catch (o) {
        i.warn((a = o.message) !== null && a !== void 0 ? a : o), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), n(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), n([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        r
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
xi.DebUpdater = Fu;
var Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
Ri.PacmanUpdater = void 0;
const hh = wr, oI = Re, sI = Mn;
class Lu extends sI.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, oI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(hh.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(hh.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      Lu.installWithCommandRunner(r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (n) {
      return this.dispatchError(n), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n) {
    var i;
    try {
      r(["pacman", "-U", "--noconfirm", t]);
    } catch (a) {
      n.warn((i = a.message) !== null && i !== void 0 ? i : a), n.warn("pacman installation failed, attempting to update package database and retry");
      try {
        r(["pacman", "-Sy", "--noconfirm"]), r(["pacman", "-U", "--noconfirm", t]);
      } catch (o) {
        throw n.error("Retry after pacman -Sy failed"), o;
      }
    }
  }
}
Ri.PacmanUpdater = Lu;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
Oi.RpmUpdater = void 0;
const ph = wr, lI = Re, uI = Mn;
class Uu extends uI.LinuxUpdater {
  constructor(t, r) {
    super(t, r);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, lI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: n,
      downloadUpdateOptions: t,
      task: async (i, a) => {
        this.listenerCount(ph.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(ph.DOWNLOAD_PROGRESS, o)), await this.httpExecutor.download(n.url, i, a);
      }
    });
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(n);
    try {
      Uu.installWithCommandRunner(i, r, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (a) {
      return this.dispatchError(a), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, r, n, i) {
    if (t === "zypper")
      return n(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", r]);
    if (t === "dnf")
      return n(["dnf", "install", "--nogpgcheck", "-y", r]);
    if (t === "yum")
      return n(["yum", "install", "--nogpgcheck", "-y", r]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), n(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", r]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
Oi.RpmUpdater = Uu;
var Ii = {};
Object.defineProperty(Ii, "__esModule", { value: !0 });
Ii.MacUpdater = void 0;
const mh = $e, fl = yr, cI = pt, gh = pe, fI = bv, dI = dr, hI = Re, vh = co, _h = ki;
class pI extends dI.AppUpdater {
  constructor(t, r) {
    super(t, r), this.nativeUpdater = Wt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (n) => {
      this._logger.warn(n), this.emit("error", n);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let r = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const n = this._logger, i = "sysctl.proc_translated";
    let a = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), a = (0, vh.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), n.info(`Checked for macOS Rosetta environment (isRosetta=${a})`);
    } catch (m) {
      n.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${m}`);
    }
    let o = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const d = (0, vh.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      n.info(`Checked 'uname -a': arm64=${d}`), o = o || d;
    } catch (m) {
      n.warn(`uname shell command to check for arm64 failed: ${m}`);
    }
    o = o || process.arch === "arm64" || a;
    const s = (m) => {
      var d;
      return m.url.pathname.includes("arm64") || ((d = m.info.url) === null || d === void 0 ? void 0 : d.includes("arm64"));
    };
    o && r.some(s) ? r = r.filter((m) => o === s(m)) : r = r.filter((m) => !s(m));
    const u = (0, hI.findFile)(r, "zip", ["pkg", "dmg"]);
    if (u == null)
      throw (0, mh.newError)(`ZIP file not provided: ${(0, mh.safeStringifyJson)(r)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const f = t.updateInfoAndProvider.provider, l = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: u,
      downloadUpdateOptions: t,
      task: async (m, d) => {
        const p = gh.join(this.downloadedUpdateHelper.cacheDir, l), _ = () => (0, fl.pathExistsSync)(p) ? !t.disableDifferentialDownload : (n.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let g = !0;
        _() && (g = await this.differentialDownloadInstaller(u, t, m, f, l)), g && await this.httpExecutor.download(u.url, m, d);
      },
      done: async (m) => {
        if (!t.disableDifferentialDownload)
          try {
            const d = gh.join(this.downloadedUpdateHelper.cacheDir, l);
            await (0, fl.copyFile)(m.downloadedFile, d);
          } catch (d) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${d.message}`);
          }
        return this.updateDownloaded(u, m);
      }
    });
  }
  async updateDownloaded(t, r) {
    var n;
    const i = r.downloadedFile, a = (n = t.info.size) !== null && n !== void 0 ? n : (await (0, fl.stat)(i)).size, o = this._logger, s = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${s})`), this.server = (0, fI.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${s})`), this.server.on("close", () => {
      o.info(`Proxy server for native Squirrel.Mac is closed (${s})`);
    });
    const u = (f) => {
      const l = f.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((f, l) => {
      const m = (0, _h.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), d = Buffer.from(`autoupdater:${m}`, "ascii"), p = `/${(0, _h.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (_, g) => {
        const b = _.url;
        if (o.info(`${b} requested`), b === "/") {
          if (!_.headers.authorization || _.headers.authorization.indexOf("Basic ") === -1) {
            g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), o.warn("No authenthication info");
            return;
          }
          const A = _.headers.authorization.split(" ")[1], R = Buffer.from(A, "base64").toString("ascii"), [$, j] = R.split(":");
          if ($ !== "autoupdater" || j !== m) {
            g.statusCode = 401, g.statusMessage = "Invalid Authentication Credentials", g.end(), o.warn("Invalid authenthication credentials");
            return;
          }
          const B = Buffer.from(`{ "url": "${u(this.server)}${p}" }`);
          g.writeHead(200, { "Content-Type": "application/json", "Content-Length": B.length }), g.end(B);
          return;
        }
        if (!b.startsWith(p)) {
          o.warn(`${b} requested, but not supported`), g.writeHead(404), g.end();
          return;
        }
        o.info(`${p} requested by Squirrel.Mac, pipe ${i}`);
        let v = !1;
        g.on("finish", () => {
          v || (this.nativeUpdater.removeListener("error", l), f([]));
        });
        const y = (0, cI.createReadStream)(i);
        y.on("error", (A) => {
          try {
            g.end();
          } catch (R) {
            o.warn(`cannot end response: ${R}`);
          }
          v = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${A}`));
        }), g.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": a
        }), y.pipe(g);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${s})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${u(this.server)}, ${s})`), this.nativeUpdater.setFeedURL({
          url: u(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${d.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(r), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : f([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Ii.MacUpdater = pI;
var $i = {}, Bu = {};
Object.defineProperty(Bu, "__esModule", { value: !0 });
Bu.verifySignature = gI;
const yh = $e, dg = co, mI = fo, wh = pe;
function hg(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function gI(e, t, r) {
  return new Promise((n, i) => {
    const a = t.replace(/'/g, "''");
    r.info(`Verifying signature ${a}`), (0, dg.execFile)(...hg(`"Get-AuthenticodeSignature -LiteralPath '${a}' | ConvertTo-Json -Compress"`, 20 * 1e3), (o, s, u) => {
      var f;
      try {
        if (o != null || u) {
          dl(r, o, u, i), n(null);
          return;
        }
        const l = vI(s);
        if (l.Status === 0) {
          try {
            const _ = wh.normalize(l.Path), g = wh.normalize(t);
            if (r.info(`LiteralPath: ${_}. Update Path: ${g}`), _ !== g) {
              dl(r, new Error(`LiteralPath of ${_} is different than ${g}`), u, i), n(null);
              return;
            }
          } catch (_) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = _.message) !== null && f !== void 0 ? f : _.stack}`);
          }
          const d = (0, yh.parseDn)(l.SignerCertificate.Subject);
          let p = !1;
          for (const _ of e) {
            const g = (0, yh.parseDn)(_);
            if (g.size ? p = Array.from(g.keys()).every((v) => g.get(v) === d.get(v)) : _ === d.get("CN") && (r.warn(`Signature validated using only CN ${_}. Please add your full Distinguished Name (DN) to publisherNames configuration`), p = !0), p) {
              n(null);
              return;
            }
          }
        }
        const m = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (d, p) => d === "RawData" ? void 0 : p, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${m}`), n(m);
      } catch (l) {
        dl(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function vI(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function dl(e, t, r, n) {
  if (_I()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, dg.execFileSync)(...hg("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function _I() {
  const e = mI.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty($i, "__esModule", { value: !0 });
$i.NsisUpdater = void 0;
const Ua = $e, Eh = pe, yI = Zr, wI = Ji, bh = wr, EI = Re, bI = yr, SI = Bu, Sh = vr;
class TI extends yI.BaseUpdater {
  constructor(t, r) {
    super(t, r), this._verifyUpdateCodeSignature = (n, i) => (0, SI.verifySignature)(n, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const r = t.updateInfoAndProvider.provider, n = (0, EI.findFile)(r.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: n,
      task: async (i, a, o, s) => {
        const u = n.packageInfo, f = u != null && o != null;
        if (f && t.disableWebInstaller)
          throw (0, Ua.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !f && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (f || t.disableDifferentialDownload || await this.differentialDownloadInstaller(n, t, i, r, Ua.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(n.url, i, a);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await s(), (0, Ua.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (f && await this.differentialDownloadWebPackage(t, u, o, r))
          try {
            await this.httpExecutor.download(new Sh.URL(u.path), o, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: u.sha512
            });
          } catch (m) {
            try {
              await (0, bI.unlink)(o);
            } catch {
            }
            throw m;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let r;
    try {
      if (r = (await this.configOnDisk.value).publisherName, r == null)
        return null;
    } catch (n) {
      if (n.code === "ENOENT")
        return null;
      throw n;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(r) ? r : [r], t);
  }
  doInstall(t) {
    const r = this.installerPath;
    if (r == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const n = ["--updated"];
    t.isSilent && n.push("/S"), t.isForceRunAfter && n.push("--force-run"), this.installDirectory && n.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && n.push(`--package-file=${i}`);
    const a = () => {
      this.spawnLog(Eh.join(process.resourcesPath, "elevate.exe"), [r].concat(n)).catch((o) => this.dispatchError(o));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), a(), !0) : (this.spawnLog(r, n).catch((o) => {
      const s = o.code;
      this._logger.info(`Cannot run installer: error code: ${s}, error message: "${o.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), s === "UNKNOWN" || s === "EACCES" ? a() : s === "ENOENT" ? Wt.shell.openPath(r).catch((u) => this.dispatchError(u)) : this.dispatchError(o);
    }), !0);
  }
  async differentialDownloadWebPackage(t, r, n, i) {
    if (r.blockMapSize == null)
      return !0;
    try {
      const a = {
        newUrl: new Sh.URL(r.path),
        oldFile: Eh.join(this.downloadedUpdateHelper.cacheDir, Ua.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: n,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(bh.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (o) => this.emit(bh.DOWNLOAD_PROGRESS, o)), await new wI.FileWithEmbeddedBlockMapDifferentialDownloader(r, this.httpExecutor, a).download();
    } catch (a) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), process.platform === "win32";
    }
    return !1;
  }
}
$i.NsisUpdater = TI;
(function(e) {
  var t = se && se.__createBinding || (Object.create ? function(b, v, y, A) {
    A === void 0 && (A = y);
    var R = Object.getOwnPropertyDescriptor(v, y);
    (!R || ("get" in R ? !v.__esModule : R.writable || R.configurable)) && (R = { enumerable: !0, get: function() {
      return v[y];
    } }), Object.defineProperty(b, A, R);
  } : function(b, v, y, A) {
    A === void 0 && (A = y), b[A] = v[y];
  }), r = se && se.__exportStar || function(b, v) {
    for (var y in b) y !== "default" && !Object.prototype.hasOwnProperty.call(v, y) && t(v, b, y);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const n = yr, i = pe;
  var a = Zr;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return a.BaseUpdater;
  } });
  var o = dr;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return o.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return o.NoOpLogger;
  } });
  var s = Re;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return s.Provider;
  } });
  var u = Ci;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return u.AppImageUpdater;
  } });
  var f = xi;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return f.DebUpdater;
  } });
  var l = Ri;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var m = Oi;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return m.RpmUpdater;
  } });
  var d = Ii;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return d.MacUpdater;
  } });
  var p = $i;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return p.NsisUpdater;
  } }), r(wr, e);
  let _;
  function g() {
    if (process.platform === "win32")
      _ = new $i.NsisUpdater();
    else if (process.platform === "darwin")
      _ = new Ii.MacUpdater();
    else {
      _ = new Ci.AppImageUpdater();
      try {
        const b = i.join(process.resourcesPath, "package-type");
        if (!(0, n.existsSync)(b))
          return _;
        console.info("Checking for beta autoupdate feature for deb/rpm distributions");
        const v = (0, n.readFileSync)(b).toString().trim();
        switch (console.info("Found package-type:", v), v) {
          case "deb":
            _ = new xi.DebUpdater();
            break;
          case "rpm":
            _ = new Oi.RpmUpdater();
            break;
          case "pacman":
            _ = new Ri.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (b) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", b.message);
      }
    }
    return _;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => _ || g()
  });
})(ji);
const pg = Ft.dirname(gv(import.meta.url));
process.env.APP_ROOT = Ft.join(pg, "..");
const Bl = process.env.VITE_DEV_SERVER_URL, WI = Ft.join(process.env.APP_ROOT, "dist-electron"), mg = Ft.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Bl ? Ft.join(process.env.APP_ROOT, "public") : mg;
let Ge;
function gg() {
  Ge = new Th({
    icon: Ft.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: Ft.join(pg, "preload.mjs"),
      nodeIntegration: !0,
      contextIsolation: !0
    },
    fullscreen: !1
  }), ji.autoUpdater.checkForUpdatesAndNotify(), Ge.maximize(), Ge.webContents.on("did-finish-load", () => {
    Ge == null || Ge.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Bl ? Ge.loadURL(Bl) : Ge.loadFile(Ft.join(mg, "index.html"));
}
fi.on("window-all-closed", () => {
  process.platform !== "darwin" && (fi.quit(), Ge = null);
});
fi.on("activate", () => {
  Th.getAllWindows().length === 0 && gg();
});
ji.autoUpdater.on("update-available", () => {
  Ge == null || Ge.webContents.send("update_available");
});
ji.autoUpdater.on("update-downloaded", () => {
  Ge == null || Ge.webContents.send("update_downloaded");
});
mv.on("restart_app", () => {
  ji.autoUpdater.quitAndInstall();
});
fi.whenReady().then(async () => {
  if (process.env.VITE_DEV_SERVER_URL)
    try {
      await rE(i0), console.log("Added Extension: React DevTools");
    } catch (e) {
      console.log("An error occurred loading DevTools: ", e);
    }
  else
    AI();
  gg();
});
let ci = null;
function AI() {
  const e = Ft.join(process.resourcesPath, "backend"), t = Ft.join(e, "bin", "www");
  console.log("Starting backend from:", t), ci = wv(t, [], {
    cwd: e,
    env: { ...process.env, PORT: "3000", NODE_ENV: "production" }
  }), ci.on("error", (r) => {
    console.error("Backend failed to start:", r);
  }), ci.on("exit", (r, n) => {
    console.log(`Backend process exited with code ${r} and signal ${n}`);
  });
}
fi.on("before-quit", () => {
  ci && (console.log("Killing backend process..."), ci.kill());
});
export {
  WI as MAIN_DIST,
  mg as RENDERER_DIST,
  Bl as VITE_DEV_SERVER_URL
};
