"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dlog_1 = require("./dlog");
const dtelemetry_1 = require("./dtelemetry");
const dassert_1 = require("./dassert");
(async () => {
    await dtelemetry_1.DTelemetry.init("test.app");
    dtelemetry_1.DTelemetry.markHits({ "name": "dip" });
    dtelemetry_1.DTelemetry.markException(Error('test'));
    dtelemetry_1.DTelemetry.markAction("tag0", { "p": "p1" });
    dtelemetry_1.DTelemetry.markAction("tag1", { "success": 10, "error": 15 });
})();
dlog_1.DLog.d("debug");
dlog_1.DLog.e("Error");
dlog_1.DLog.s("Success");
dlog_1.DLog.i("Info");
dlog_1.DLog.ex(Error("Test"));
dlog_1.DLog.exe(Error("Test"));
// check http://simplestore.dipankar.co.in/api/analytics?app_id=test.app
//Test ast the end.
dassert_1.DAssert.verifyArray([], "not an array");
//DAssert.verifyNotNullAndEmpty(null, "item must be null")
//# sourceMappingURL=test.js.map