var _0x479ef5 = _0x11e2;
(function (_0x15ada4, _0x3a6993) {
  var _0xab325a = _0x11e2,
    _0x509838 = _0x15ada4();
  while (!![]) {
    try {
      var _0x101420 =
        -parseInt(_0xab325a(0xcd)) / 0x1 +
        parseInt(_0xab325a(0xaf)) / 0x2 +
        -parseInt(_0xab325a(0xd7)) / 0x3 +
        (parseInt(_0xab325a(0xad)) / 0x4) * (-parseInt(_0xab325a(0xfa)) / 0x5) +
        (-parseInt(_0xab325a(0xd5)) / 0x6) *
          (-parseInt(_0xab325a(0xe3)) / 0x7) +
        (-parseInt(_0xab325a(0xa0)) / 0x8) * (parseInt(_0xab325a(0xbf)) / 0x9) +
        parseInt(_0xab325a(0xb7)) / 0xa;
      if (_0x101420 === _0x3a6993) break;
      else _0x509838["push"](_0x509838["shift"]());
    } catch (_0x503bfa) {
      _0x509838["push"](_0x509838["shift"]());
    }
  }
})(_0x4ac7, 0x35b49);
if (document[_0x479ef5(0xe2)](_0x479ef5(0xd4))) {
  handlePageScroll(),
    sendAJAXRequest(
      {
        method: _0x479ef5(0xe1),
        url: _0x479ef5(0xb8) + bookId + _0x479ef5(0xc7),
      },
      function (_0x3e6809) {}
    ),
    document[_0x479ef5(0xbc)](_0x479ef5(0xc9), handleKeyboard, ![]);
  var loadingPages = [],
    sub = "sb",
    dm = "mbcdn",
    dot = "xyz",
    resPath = _0x479ef5(0xf5);
  async function loadAllImages() {
    var _0x13ec65 = _0x479ef5,
      _0x4f2ef2 = chapImages["split"](",")[_0x13ec65(0xbd)](0x2);
    let _0x2ff86b = _0x4f2ef2[_0x13ec65(0xa3)]((_0x427f45) => _0x427f45);
    async[_0x13ec65(0xc1)](
      _0x2ff86b,
      0x2,
      async function (_0x3c8ac2) {
        var _0x2f3db3 = _0x13ec65;
        let _0x3f0b5a = _0x2ff86b[_0x2f3db3(0xc6)](_0x3c8ac2);
        await loadImagePage(_0x3c8ac2, _0x3f0b5a);
      },
      (_0x38b17e, _0x2ecf0e) => {}
    );
  }
  async function loadImagePage(_0x2ac498, _0x475116) {
    return new Promise((_0x5df22a, _0x55a72a) => {
      var _0x49a6aa = _0x11e2;
      if (_0x2ac498 && !loadingPages[_0x49a6aa(0xa7)](_0x2ac498)) {
        loadingPages["push"](_0x2ac498);
        let _0x55d4aa = document[_0x49a6aa(0xe2)](
          "img-page-" + (_0x475116 + 0x3)
        );
        _0x55d4aa[_0x49a6aa(0xcf)][_0x49a6aa(0xab)](_0x49a6aa(0xf6));
        let _0x1e499c = document["createElement"]("img");
        (_0x1e499c[_0x49a6aa(0xc2)] = _0x49a6aa(0x9d)),
          _0x55d4aa["appendChild"](_0x1e499c);
        var _0x1020a7 = new Image();
        (_0x1020a7["alt"] =
          pageTitle +
          _0x49a6aa(0xc0) +
          pageSubTitle +
          _0x49a6aa(0xf9) +
          (_0x475116 + 0x3)),
          (_0x1020a7[_0x49a6aa(0xba)] = function () {
            var _0x380e07 = _0x49a6aa;
            return (
              (_0x55d4aa[_0x380e07(0xd8)] = "chapter-image\x20loaded"),
              _0x55d4aa["replaceChild"](this, _0x55d4aa[_0x380e07(0xb2)]),
              _0x5df22a(!![])
            );
          }),
          (_0x1020a7[_0x49a6aa(0xc5)] = function () {
            var _0x43b759 = _0x49a6aa;
            logImageError(this["src"]);
            const _0x1b408b = new URL(this["src"]);
            var _0x500992 =
              _0x43b759(0xd3) +
              sub +
              "." +
              dm +
              "." +
              dot +
              _0x1b408b[_0x43b759(0xcb)][_0x43b759(0xb3)](resPath, "/");
            return (
              (this[_0x43b759(0xc5)] = null),
              (this[_0x43b759(0xc2)] = _0x500992),
              _0x5df22a(![])
            );
          }),
          (_0x1020a7[_0x49a6aa(0xc2)] = _0x2ac498);
      } else return _0x5df22a(!![]);
    });
  }
  loadAllImages();
  function checkBookmark(_0x41184d) {
    var _0x2b0feb = _0x479ef5;
    _0x41184d["classList"][_0x2b0feb(0xab)](_0x2b0feb(0xf7)),
      checkBookmarkStatus(function () {
        var _0x3dfbec = _0x2b0feb;
        document["querySelector"](_0x3dfbec(0xed))[_0x3dfbec(0xcf)]["add"](
          _0x3dfbec(0xa6)
        ),
          document[_0x3dfbec(0xe9)](_0x3dfbec(0xb0))["classList"][
            _0x3dfbec(0xab)
          ](_0x3dfbec(0xa6));
      });
  }
  function onImgError(_0xf7dce4) {
    var _0x53a18a = _0x479ef5;
    const _0x47b885 = new URL(_0xf7dce4["src"]);
    logImageError(_0x47b885);
    var _0x11ecf4 =
      _0x53a18a(0xd3) +
      sub +
      "." +
      dm +
      "." +
      dot +
      _0x47b885[_0x53a18a(0xcb)][_0x53a18a(0xb3)](resPath, "/");
    (_0xf7dce4[_0x53a18a(0xc5)] = null),
      (_0xf7dce4[_0x53a18a(0xc2)] = _0x11ecf4);
  }
  function logImageError(_0x5abb7c) {
    var _0x3e62a1 = _0x479ef5;
    _0x5abb7c &&
      typeof gtag !== _0x3e62a1(0xac) &&
      gtag(_0x3e62a1(0x9c), _0x3e62a1(0xfc), {
        url: _0x5abb7c,
        user_agent: navigator[_0x3e62a1(0xf4)],
      });
  }
}
function _0x4ac7() {
  var _0x10ea59 = [
    "body",
    "max",
    "documentElement",
    "scrollTop",
    "userAgent",
    "/res/",
    "loading",
    "spinner",
    "target",
    "\x20-\x20Page\x20",
    "429225GNomRU",
    "chapter-list",
    "image_load_failed",
    "event",
    "/static/common/loading.svg",
    "abs",
    "selected",
    "866920KsHFyr",
    "GET",
    "disabled",
    "map",
    "getElementsByClassName",
    "remove",
    "show",
    "includes",
    ".viewer__container",
    "charCode",
    "scroll",
    "add",
    "undefined",
    "4rGHjFQ",
    "marginTop",
    "607814lWTMGR",
    ".dropdown-menu",
    "scrollHeight",
    "lastChild",
    "replace",
    "maxHeight",
    "showSpinner",
    "style",
    "1457760XTLZRJ",
    "/api/manga/",
    "tagName",
    "onload",
    "scroll-up",
    "addEventListener",
    "slice",
    "children",
    "18zXwSNR",
    "\x20-\x20",
    "mapLimit",
    "src",
    "viewer-header",
    "chapter-image",
    "onerror",
    "indexOf",
    "/views",
    "load-chapters",
    "keydown",
    "data-src",
    "pathname",
    "btn-prev",
    "311358TJjAth",
    "toLowerCase",
    "classList",
    "status",
    "value",
    ".chapter-lazy-image",
    "https://",
    "viewer-page",
    "30FCwfYB",
    "chapter__content",
    "50409PAaRlH",
    "className",
    "querySelectorAll",
    "length",
    "chapter-select",
    ".chapter-select\x20option",
    "location",
    "clientHeight",
    "outerHTML",
    "offsetHeight",
    "POST",
    "getElementById",
    "561442LhramQ",
    "href",
    "innerHeight",
    "/chapters",
    "input",
    "textarea",
    "querySelector",
    "smooth",
    "parentElement",
    "btn-next",
    ".btn-bookmark",
    "scroll-down",
    "getAttribute",
  ];
  _0x4ac7 = function () {
    return _0x10ea59;
  };
  return _0x4ac7();
}
function _0x11e2(_0x49befa, _0x59c73c) {
  var _0x4ac784 = _0x4ac7();
  return (
    (_0x11e2 = function (_0x11e28b, _0x100798) {
      _0x11e28b = _0x11e28b - 0x9c;
      var _0xe58be6 = _0x4ac784[_0x11e28b];
      return _0xe58be6;
    }),
    _0x11e2(_0x49befa, _0x59c73c)
  );
}
function updateSelectedChapter() {
  var _0x148163 = _0x479ef5,
    _0x3a531a = document[_0x148163(0xe9)](".chapter-select"),
    _0x411865 = document[_0x148163(0xd9)](_0x148163(0xdc)),
    _0x16a888 = bookSlug + "/" + chapterSlug;
  for (var _0x31e70b = 0x0; _0x31e70b < _0x411865["length"]; _0x31e70b++) {
    if (
      _0x411865[_0x31e70b][_0x148163(0xef)](_0x148163(0xd1))[_0x148163(0xa7)](
        _0x16a888
      )
    ) {
      _0x3a531a[_0x148163(0xbe)][_0x31e70b][_0x148163(0x9f)] = !![];
      break;
    }
  }
}
function goToTop() {
  var _0x2f682e = _0x479ef5;
  window[_0x2f682e(0xaa)]({ top: 0x0, left: 0x0, behavior: _0x2f682e(0xea) });
}
function handlePageScroll() {
  var _0x3b3687 = _0x479ef5;
  if (!document[_0x3b3687(0xe9)](_0x3b3687(0xa8))) return;
  var _0x226fb5,
    _0x402ba3 = 0x0,
    _0x4e38a5 = 0x190,
    _0x5eaeb9 = _0x3b3687(0xc3),
    _0x409d76 = document[_0x3b3687(0xe2)](_0x5eaeb9),
    _0x58c1e1 = _0x409d76[_0x3b3687(0xe0)];
  (document["getElementById"](_0x3b3687(0xd6))["style"][_0x3b3687(0xae)] =
    _0x58c1e1 + "px"),
    (_0x409d76[_0x3b3687(0xb6)][_0x3b3687(0xb4)] = _0x58c1e1 + "px"),
    window[_0x3b3687(0xbc)](_0x3b3687(0xaa), function (_0x5a18bd) {
      var _0x5b2fa1 = _0x3b3687;
      _0x226fb5 = !![];
      var _0x4054b3 =
        window["pageYOffset"] || document["documentElement"][_0x5b2fa1(0xf3)];
      _0x4054b3 <= _0x58c1e1 &&
        _0x409d76[_0x5b2fa1(0xcf)]["contains"]("scroll-down") &&
        (_0x409d76["classList"][_0x5b2fa1(0xa5)](_0x5b2fa1(0xee)),
        _0x409d76[_0x5b2fa1(0xcf)][_0x5b2fa1(0xab)]("scroll-up"),
        _0x3b031e());
    }),
    setInterval(function () {
      _0x226fb5 && (_0xab099c(), (_0x226fb5 = ![]));
    }, 0xfa);
  function _0x3b031e() {
    var _0x42d11d = _0x3b3687;
    _0x409d76[_0x42d11d(0xcf)]["remove"](_0x42d11d(0xbb));
  }
  function _0xab099c() {
    var _0x1b33c1 = _0x3b3687,
      _0x3f5ad5 =
        window["pageYOffset"] || document[_0x1b33c1(0xf2)][_0x1b33c1(0xf3)];
    if (
      Math[_0x1b33c1(0x9e)](_0x402ba3 - _0x3f5ad5) <= _0x4e38a5 ||
      _0x3f5ad5 <= _0x58c1e1
    )
      return;
    if (_0x3f5ad5 > _0x402ba3 && _0x3f5ad5 > _0x58c1e1)
      _0x409d76[_0x1b33c1(0xcf)]["contains"](_0x1b33c1(0xee)) &&
        (_0x409d76[_0x1b33c1(0xcf)][_0x1b33c1(0xab)](_0x1b33c1(0xbb)),
        _0x409d76[_0x1b33c1(0xcf)][_0x1b33c1(0xa5)](_0x1b33c1(0xee)));
    else {
      var _0xe8b95f = document[_0x1b33c1(0xf0)],
        _0x51d2cd = document[_0x1b33c1(0xf2)],
        _0x5acce7 = Math[_0x1b33c1(0xf1)](
          _0xe8b95f[_0x1b33c1(0xb1)],
          _0xe8b95f[_0x1b33c1(0xe0)],
          _0x51d2cd[_0x1b33c1(0xde)],
          _0x51d2cd[_0x1b33c1(0xb1)],
          _0x51d2cd[_0x1b33c1(0xe0)]
        );
      _0x3f5ad5 + window[_0x1b33c1(0xe5)] < _0x5acce7 &&
        _0x3f5ad5 > 0x5dc &&
        (_0x409d76[_0x1b33c1(0xcf)][_0x1b33c1(0xa5)](_0x1b33c1(0xbb)),
        _0x409d76[_0x1b33c1(0xcf)][_0x1b33c1(0xab)](_0x1b33c1(0xee)));
    }
    _0x402ba3 = _0x3f5ad5;
  }
}
function prefetchChapters(_0x17ecdf) {
  var _0x4ce16e = _0x479ef5;
  sendAJAXRequest({ method: _0x4ce16e(0xa1), url: _0x17ecdf });
}
function loadChapters(_0x2e0db2 = ![]) {
  var _0xa29f84 = _0x479ef5,
    _0x430415 = document["getElementsByClassName"](_0xa29f84(0xc8));
  for (var _0x46e620 = 0x0; _0x46e620 < _0x430415["length"]; _0x46e620++) {
    _0x430415[_0x46e620][_0xa29f84(0xb5)]();
  }
  sendAJAXRequest(
    {
      method: "GET",
      url: _0xa29f84(0xb8) + bookId + _0xa29f84(0xe6),
      isJson: ![],
    },
    function (_0x3ebf00) {
      var _0x12c8c5 = _0xa29f84;
      if (_0x3ebf00[_0x12c8c5(0xd0)] === 0xc8) {
        (document[_0x12c8c5(0xe2)](_0x12c8c5(0xfb))[_0x12c8c5(0xdf)] =
          _0x3ebf00["responseText"]),
          updateSelectedChapter();
        var _0x3b445e = document[_0x12c8c5(0xa4)](_0x12c8c5(0xdb));
        for (
          var _0x5bff69 = 0x0;
          _0x5bff69 < _0x3b445e["length"];
          _0x5bff69++
        ) {
          _0x3b445e[_0x5bff69]["onchange"] = function () {
            var _0x3476b3 = _0x12c8c5;
            window["location"][_0x3476b3(0xe4)] = this[_0x3476b3(0xd1)];
          };
        }
      }
    }
  );
}
function handleKeyboard(_0x547002) {
  var _0x646f4e = _0x479ef5,
    _0xf0074e = _0x547002[_0x646f4e(0xf8)][_0x646f4e(0xb9)][_0x646f4e(0xce)]();
  if (_0xf0074e === _0x646f4e(0xe7) || _0xf0074e === _0x646f4e(0xe8)) return;
  var _0x4d8f85 = document[_0x646f4e(0xe2)](_0x646f4e(0xec)),
    _0x46c5ad = document["getElementById"](_0x646f4e(0xcc)),
    _0x231587 = _0x547002[_0x646f4e(0xa9)]
      ? _0x547002[_0x646f4e(0xa9)]
      : _0x547002["keyCode"];
  if (_0x231587 === 0x27 || _0x231587 === 0x44)
    !_0x4d8f85[_0x646f4e(0xef)](_0x646f4e(0xa2)) &&
      (window[_0x646f4e(0xdd)] = _0x4d8f85[_0x646f4e(0xef)](_0x646f4e(0xe4)));
  else
    (_0x231587 === 0x25 || _0x231587 === 0x41) &&
      !_0x46c5ad[_0x646f4e(0xef)]("disabled") &&
      (window[_0x646f4e(0xdd)] = _0x46c5ad["getAttribute"](_0x646f4e(0xe4)));
}
function loadChapterImages() {
  var _0x503efa = _0x479ef5,
    _0x30e55a = document[_0x503efa(0xd9)](_0x503efa(0xd2));
  for (
    var _0x361fa4 = 0x0;
    _0x361fa4 < _0x30e55a[_0x503efa(0xda)];
    _0x361fa4++
  ) {
    var _0x149664 = _0x30e55a[_0x361fa4];
    _0x149664[_0x503efa(0xba)] = function () {
      var _0x5f4ea1 = _0x503efa;
      this[_0x5f4ea1(0xcf)]["remove"]("chapter-lazy-image"),
        this[_0x5f4ea1(0xeb)] &&
          this["parentElement"][_0x5f4ea1(0xd8)] &&
          this[_0x5f4ea1(0xeb)][_0x5f4ea1(0xd8)][_0x5f4ea1(0xc6)](
            _0x5f4ea1(0xc4)
          ) >= 0x0 &&
          this[_0x5f4ea1(0xeb)][_0x5f4ea1(0xcf)][_0x5f4ea1(0xa5)](
            _0x5f4ea1(0xf7)
          );
    };
    var _0x220070 = _0x149664[_0x503efa(0xef)](_0x503efa(0xca));
    _0x149664[_0x503efa(0xc2)] = _0x220070;
  }
}
