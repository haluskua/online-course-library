// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/colors.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//Global selections and variables
var colorDivs = document.querySelectorAll(".color");
var generateBtn = document.querySelector(".generate");
var sliders = document.querySelectorAll('input[type="range"]');
var currentHexes = document.querySelectorAll(".color h2");
var popup = document.querySelector(".copy-container");
var adjustButton = document.querySelectorAll(".adjust");
var lockButton = document.querySelectorAll(".lock");
var closeAdjustments = document.querySelectorAll(".close-adjustment");
var sliderContainers = document.querySelectorAll(".sliders");
var initialColors; //This is for local storage

var savedPalettes = []; //Add our event listeners

generateBtn.addEventListener("click", randomColors);
sliders.forEach(function (slider) {
  slider.addEventListener("input", hslControls);
});
colorDivs.forEach(function (div, index) {
  div.addEventListener("change", function () {
    updateTextUI(index);
  });
});
currentHexes.forEach(function (hex) {
  hex.addEventListener("click", function () {
    copyToClipboard(hex);
  });
});
popup.addEventListener("transitionend", function () {
  var popupBox = popup.children[0];
  popup.classList.remove("active");
  popupBox.classList.remove("active");
});
adjustButton.forEach(function (button, index) {
  button.addEventListener("click", function () {
    openAdjustmentPanel(index);
  });
});
closeAdjustments.forEach(function (button, index) {
  button.addEventListener("click", function () {
    closeAdjustmentPanel(index);
  });
});
lockButton.forEach(function (button, index) {
  button.addEventListener("click", function (e) {
    lockLayer(e, index);
  });
}); //Functions
//Color Generator

function generateHex() {
  var hexColor = chroma.random();
  return hexColor;
}

function randomColors() {
  initialColors = [];
  colorDivs.forEach(function (div, index) {
    var hexText = div.children[0];
    var randomColor = generateHex(); //Add it to the array

    if (div.classList.contains("locked")) {
      initialColors.push(hexText.innerText);
      return;
    } else {
      initialColors.push(chroma(randomColor).hex());
    } //Add the color to the bg


    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor; //Check for contrast

    checkTextContrast(randomColor, hexText); //Initial Colorize Sliders

    var color = chroma(randomColor);
    var sliders = div.querySelectorAll(".sliders input");
    var hue = sliders[0];
    var brightness = sliders[1];
    var saturation = sliders[2];
    colorizeSliders(color, hue, brightness, saturation);
  }); //Reset Inputs

  resetInputs(); //Check For Button Contrast

  adjustButton.forEach(function (button, index) {
    checkTextContrast(initialColors[index], button);
    checkTextContrast(initialColors[index], lockButton[index]);
  });
}

function checkTextContrast(color, text) {
  var luminance = chroma(color).luminance();

  if (luminance > 0.5) {
    text.style.color = "black";
  } else {
    text.style.color = "white";
  }
}

function colorizeSliders(color, hue, brightness, saturation) {
  //Scale Saturation
  var noSat = color.set("hsl.s", 0);
  var fullSat = color.set("hsl.s", 1);
  var scaleSat = chroma.scale([noSat, color, fullSat]); //Scale Brightness

  var midBright = color.set("hsl.l", 0.5);
  var scaleBright = chroma.scale(["black", midBright, "white"]); //Update Input Colors

  saturation.style.backgroundImage = "linear-gradient(to right,".concat(scaleSat(0), ", ").concat(scaleSat(1), ")");
  brightness.style.backgroundImage = "linear-gradient(to right,".concat(scaleBright(0), ",").concat(scaleBright(0.5), " ,").concat(scaleBright(1), ")");
  hue.style.backgroundImage = "linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))";
}

function hslControls(e) {
  var index = e.target.getAttribute("data-bright") || e.target.getAttribute("data-sat") || e.target.getAttribute("data-hue");
  var sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
  var hue = sliders[0];
  var brightness = sliders[1];
  var saturation = sliders[2];
  var bgColor = initialColors[index];
  var color = chroma(bgColor).set("hsl.s", saturation.value).set("hsl.l", brightness.value).set("hsl.h", hue.value);
  colorDivs[index].style.backgroundColor = color; //Colorize inputs/sliders

  colorizeSliders(color, hue, brightness, saturation);
}

function updateTextUI(index) {
  var activeDiv = colorDivs[index];
  var color = chroma(activeDiv.style.backgroundColor);
  var textHex = activeDiv.querySelector("h2");
  var icons = activeDiv.querySelectorAll(".controls button");
  textHex.innerText = color.hex(); //Check Contrast

  checkTextContrast(color, textHex);

  var _iterator = _createForOfIteratorHelper(icons),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      icon = _step.value;
      checkTextContrast(color, icon);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function resetInputs() {
  var sliders = document.querySelectorAll(".sliders input");
  sliders.forEach(function (slider) {
    if (slider.name === "hue") {
      var hueColor = initialColors[slider.getAttribute("data-hue")];
      var hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }

    if (slider.name === "brightness") {
      var brightColor = initialColors[slider.getAttribute("data-bright")];
      var brightValue = chroma(brightColor).hsl()[2];
      slider.value = Math.floor(brightValue * 100) / 100;
    }

    if (slider.name === "saturation") {
      var satColor = initialColors[slider.getAttribute("data-sat")];
      var satValue = chroma(satColor).hsl()[1];
      slider.value = Math.floor(satValue * 100) / 100;
    }
  });
}

function copyToClipboard(hex) {
  var el = document.createElement("textarea");
  el.value = hex.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el); //Pop up animation

  var popupBox = popup.children[0];
  popup.classList.add("active");
  popupBox.classList.add("active");
}

function openAdjustmentPanel(index) {
  sliderContainers[index].classList.toggle("active");
}

function closeAdjustmentPanel(index) {
  sliderContainers[index].classList.remove("active");
}

function lockLayer(e, index) {
  var lockSVG = e.target.children[0];
  var activeBg = colorDivs[index];
  activeBg.classList.toggle("locked");

  if (lockSVG.classList.contains("fa-lock-open")) {
    e.target.innerHTML = '<i class="fas fa-lock"></i>';
  } else {
    e.target.innerHTML = '<i class="fas fa-lock-open"></i>';
  }
} //Implement Save to palette and LOCAL STORAGE STUFF


var saveBtn = document.querySelector(".save");
var submitSave = document.querySelector(".submit-save");
var closeSave = document.querySelector(".close-save");
var saveContainer = document.querySelector(".save-container");
var saveInput = document.querySelector(".save-container input");
var libraryContainer = document.querySelector(".library-container");
var libraryBtn = document.querySelector(".library");
var closeLibraryBtn = document.querySelector(".close-library"); //Event Listeners

saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
libraryBtn.addEventListener("click", openLibrary);
closeLibraryBtn.addEventListener("click", closeLibrary);

function openPalette(e) {
  var popup = saveContainer.children[0];
  saveContainer.classList.add("active");
  popup.classList.add("active");
}

function closePalette(e) {
  var popup = saveContainer.children[0];
  saveContainer.classList.remove("active");
  popup.classList.add("remove");
}

function savePalette(e) {
  saveContainer.classList.remove("active");
  popup.classList.remove("active");
  var name = saveInput.value;
  var colors = [];
  currentHexes.forEach(function (hex) {
    colors.push(hex.innerText);
  }); //Generate Object
  //*1
  // const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
  // let paletteNr;
  // if (paletteObjects) {
  //   paletteNr = paletteObjects.length;
  // } else {
  //   paletteNr = savedPalettes.length;
  // }

  var paletteNr;
  var paletteObjects = JSON.parse(localStorage.getItem("palettes"));

  if (paletteObjects) {
    paletteNr = paletteObjects.length;
  } else {
    paletteNr = savedPalettes.length;
  }

  var paletteObj = {
    name: name,
    colors: colors,
    nr: paletteNr
  };
  savedPalettes.push(paletteObj); //Save to localStorage

  savetoLocal(paletteObj);
  saveInput.value = ""; //Generate the palette for Library

  var palette = document.createElement("div");
  palette.classList.add("custom-palette");
  var title = document.createElement("h4");
  title.innerText = paletteObj.name;
  var preview = document.createElement("div");
  preview.classList.add("small-preview");
  paletteObj.colors.forEach(function (smallColor) {
    var smallDiv = document.createElement("div");
    smallDiv.style.backgroundColor = smallColor;
    preview.appendChild(smallDiv);
  });
  var paletteBtn = document.createElement("button");
  paletteBtn.classList.add("pick-palette-btn");
  paletteBtn.classList.add(paletteObj.nr);
  paletteBtn.innerText = "Select"; //Attach event to the btn

  paletteBtn.addEventListener("click", function (e) {
    closeLibrary();
    var paletteIndex = e.target.classList[1];
    initialColors = [];
    savedPalettes[paletteIndex].colors.forEach(function (color, index) {
      initialColors.push(color);
      colorDivs[index].style.backgroundColor = color;
      var text = colorDivs[index].children[0];
      checkTextContrast(color, text);
      updateTextUI(index);
    });
    resetInputs();
  }); //Append to Library

  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteBtn);
  libraryContainer.children[0].appendChild(palette);
}

function savetoLocal(paletteObj) {
  var localPalettes;

  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }

  localPalettes.push(paletteObj);
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

function openLibrary() {
  var popup = libraryContainer.children[0];
  libraryContainer.classList.add("active");
  popup.classList.add("active");
}

function closeLibrary() {
  var popup = libraryContainer.children[0];
  libraryContainer.classList.remove("active");
  popup.classList.remove("active");
}

function getLocal() {
  if (localStorage.getItem("palettes") === null) {
    //Local Palettes
    localPalettes = [];
  } else {
    var paletteObjects = JSON.parse(localStorage.getItem("palettes")); // *2

    savedPalettes = _toConsumableArray(paletteObjects);
    paletteObjects.forEach(function (paletteObj) {
      //Generate the palette for Library
      var palette = document.createElement("div");
      palette.classList.add("custom-palette");
      var title = document.createElement("h4");
      title.innerText = paletteObj.name;
      var preview = document.createElement("div");
      preview.classList.add("small-preview");
      paletteObj.colors.forEach(function (smallColor) {
        var smallDiv = document.createElement("div");
        smallDiv.style.backgroundColor = smallColor;
        preview.appendChild(smallDiv);
      });
      var paletteBtn = document.createElement("button");
      paletteBtn.classList.add("pick-palette-btn");
      paletteBtn.classList.add(paletteObj.nr);
      paletteBtn.innerText = "Select"; //Attach event to the btn

      paletteBtn.addEventListener("click", function (e) {
        closeLibrary();
        var paletteIndex = e.target.classList[1];
        initialColors = [];
        paletteObjects[paletteIndex].colors.forEach(function (color, index) {
          initialColors.push(color);
          colorDivs[index].style.backgroundColor = color;
          var text = colorDivs[index].children[0];
          checkTextContrast(color, text);
          updateTextUI(index);
        });
        resetInputs();
      }); //Append to Library

      palette.appendChild(title);
      palette.appendChild(preview);
      palette.appendChild(paletteBtn);
      libraryContainer.children[0].appendChild(palette);
    });
  }
}

getLocal();
randomColors();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55638" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/colors.js"], null)
//# sourceMappingURL=/colors.e2215229.js.map