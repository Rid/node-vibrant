"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../color");
var vbox_1 = require("./vbox");
var pqueue_1 = require("./pqueue");
var maxIterations = 1000;
var fractByPopulations = 0.75;
function _splitBoxes(pq, target) {
    var colorCount = 1;
    var iteration = 0;
    while (iteration < maxIterations) {
        iteration++;
        var vbox = pq.pop();
        if (!vbox || !vbox.count())
            continue;
        var _a = vbox.split(), vbox1 = _a[0], vbox2 = _a[1];
        pq.push(vbox1);
        if (vbox2) {
            pq.push(vbox2);
            colorCount++;
        }
        if (colorCount >= target || iteration > maxIterations)
            return;
    }
}
var MMCQ = function (pixels, opts) {
    if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
        throw new Error('Wrong MMCQ parameters');
    }
    var vbox = vbox_1.default.build(pixels);
    var hist = vbox.hist;
    var colorCount = Object.keys(hist).length;
    var pq = new pqueue_1.default(function (a, b) { return a.count() - b.count(); });
    pq.push(vbox);
    // first set of colors, sorted by population
    _splitBoxes(pq, fractByPopulations * opts.colorCount);
    // Re-order
    var pq2 = new pqueue_1.default(function (a, b) { return a.count() * a.volume() - b.count() * b.volume(); });
    pq2.contents = pq.contents;
    // next set - generate the median cuts using the (npix * vol) sorting.
    _splitBoxes(pq2, opts.colorCount - pq2.size());
    // calculate the actual colors
    var swatches = [];
    while (pq2.size()) {
        var v = pq2.pop();
        var color = v.avg();
        var r = color[0], g = color[1], b = color[2];
        swatches.push(new color_1.Swatch(color, v.count()));
    }
    return swatches;
};
exports.default = MMCQ;
//# sourceMappingURL=mmcq.js.map