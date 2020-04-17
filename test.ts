import { DLog } from "./dlog";
import { DTelemetry } from "./dtelemetry";
import { DAssert } from "./dassert";

(async () => {
    await DTelemetry.init("test.app")
    DTelemetry.markHits({ "name": "dip" })
    DTelemetry.markException(Error('test'))
    DTelemetry.markAction("tag0", { "p": "p1" })
    DTelemetry.markAction("tag1", { "success": 10,"error":15})
})();

DLog.d("debug");
DLog.e("Error")
DLog.s("Success");
DLog.i("Info")
DLog.ex(Error("Test"))
DLog.exe(Error("Test"))

// check http://simplestore.dipankar.co.in/api/analytics?app_id=test.app





//Test ast the end.
DAssert.verifyArray([], "not an array")
//DAssert.verifyNotNullAndEmpty(null, "item must be null")