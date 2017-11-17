"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("./browser");
var worker_1 = require("./quantizer/worker");
(function (ns) {
    ns.Vibrant = browser_1.default;
    browser_1.default.Quantizer.WebWorker = worker_1.default;
})((typeof window === 'object' && window instanceof Window) ? window : module.exports);
//# sourceMappingURL=bundle.worker.js.map