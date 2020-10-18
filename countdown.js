/**
 * Forked from: https://codepen.io/MarkAlmond/pen/rLyymL
 * Fork modifications:
 * - Simplified style to look more vintage
 * - Extended coundown to 10
 * - Added animated film grain background
 * - Added jitter (projector shake)
 * - Added transition after countdown
 * - Changed sweep to start from 12 instead of 3 o'clock
 * - Changed from 2:1 to 16:9 ratio
 * - Made it 100% fluid
 */

// requestAnimationFrame polyfill by Erik Möller; fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// https://gist.github.com/paulirish/1579671
// MIT license
// Modifications by T. H. Doan
(function () {
  if (!window.requestAnimationFrame) {
    var nLastTime = 0,
      aVendors = ["moz", "ms", "o", "webkit"];
    for (var i = 0; i < aVendors.length; ++i) {
      window.requestAnimationFrame =
        window[aVendors[i] + "RequestAnimationFrame"];
      window.cancelAnimationFrame =
        window[aVendors[i] + "CancelAnimationFrame"] ||
        window[aVendors[i] + "CancelRequestAnimationFrame"];
    }
    window.requestAnimationFrame = function (callback, element) {
      var nCurrentTime = new Date().getTime(),
        nTimeToCall = Math.max(0, 16 - (nCurrentTime - nLastTime)),
        nTimer = window.setTimeout(function () {
          callback(nCurrentTime + nTimeToCall);
        }, nTimeToCall);
      nLastTime = nCurrentTime + nTimeToCall;
      return nTimer;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (nTimer) {
      clearTimeout(nTimer);
    };
  }
})();

var circleOuter = document.getElementById("circle-outer"),
  circleInner = document.getElementById("circle-inner"),
  lineH = document.getElementById("line-h"),
  lineV = document.getElementById("line-v"),
  numbers = document.getElementById("numbers"),
  nCircleCx = +circleOuter.getAttribute("cx"),
  nCircleCy = +circleOuter.getAttribute("cy"),
  nLineY = +lineH.getAttribute("y1"),
  nLineX = +lineV.getAttribute("x1"),
  nFps = 12, // Just like vintage silent films :]
  nJitterLevel = 2.5, // How shaky is the projector?
  nTick = 0;

function jitter() {
  setTimeout(function () {
    if (nTick === nFps * 9) {
      // Reset position
      circleOuter.setAttribute("cx", nCircleCx);
      circleInner.setAttribute("cx", nCircleCx);
      circleOuter.setAttribute("cy", nCircleCy);
      circleInner.setAttribute("cy", nCircleCy);
      lineH.setAttribute("y1", nLineY);
      lineH.setAttribute("y2", nLineY);
      lineV.setAttribute("x1", nLineX);
      lineV.setAttribute("x2", nLineX);
      numbers.style.transform = "";
      return;
    }
    // Use rAF for improved performance
    requestAnimationFrame(jitter);
    // Repaint!
    var nOffsetX =
        Math.random() * nJitterLevel * (Math.random() >= 0.5 ? 1 : -1),
      nOffsetY = Math.random() * nJitterLevel * (Math.random() >= 0.5 ? 1 : -1);
    circleOuter.setAttribute("cx", nCircleCx + nOffsetX);
    circleInner.setAttribute("cx", nCircleCx + nOffsetX);
    circleOuter.setAttribute("cy", nCircleCy + nOffsetY);
    circleInner.setAttribute("cy", nCircleCy + nOffsetY);
    lineH.setAttribute("y1", nLineY + nOffsetY);
    lineH.setAttribute("y2", nLineY + nOffsetY);
    lineV.setAttribute("x1", nLineX + nOffsetX);
    lineV.setAttribute("x2", nLineX + nOffsetX);
    numbers.style.transform =
      "translate3d(" + nOffsetX + "px, " + nOffsetY + "px, 0)";
    ++nTick;
  }, 5700 / nFps);
}

setTimeout(() => {
  jitter();
}, 0);
