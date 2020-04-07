import { DLog } from "./dlog";
import { DTelemetry } from "./dtelemetry";
import { DAssert } from "./dassert";

(async () => {
    await DTelemetry.init("test.app")
    DTelemetry.markHits({ "name": "dip" })
    DTelemetry.markException(Error('test'))
    DTelemetry.markAction("test", { "p": "p1" })
})();

DLog.d("debug");
DLog.e("Error")
DLog.s("Success");
DLog.i("Info")
DLog.ex(Error("Test"))
DLog.exe(Error("Test"))





//Test ast the end.
DAssert.verifyArray([], "not an array")
//DAssert.verifyNotNullAndEmpty(null, "item must be null")