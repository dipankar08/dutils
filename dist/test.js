"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dlog_1 = require("./dlog");
const dtelemetry_1 = require("./dtelemetry");
const dassert_1 = require("./dassert");
dlog_1.DLog.d("debug");
dlog_1.DLog.e("Error");
dlog_1.DLog.s("Success");
dlog_1.DLog.i("Info");
dlog_1.DLog.ex(Error("Test"));
dlog_1.DLog.exe(Error("Test"));
dtelemetry_1.DTelemetry.init("test.app");
dtelemetry_1.DTelemetry.markHits({ "name": "dip" });
dtelemetry_1.DTelemetry.markException(Error('test'));
dtelemetry_1.DTelemetry.markAction("test", { "p": "p1" });
dassert_1.DAssert.verifyArray([], "not an array");
dassert_1.DAssert.verifyNotNullAndEmpty(null, "item must be null");
//# sourceMappingURL=test.js.map