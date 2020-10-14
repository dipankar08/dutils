"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dvalidation_1 = require("./dvalidation");
const ut_1 = require("./ut");
const ut = new ut_1.UT();
// validate.ts test
ut.check(dvalidation_1.validate("x", 'hello', 'email'), "Validation failed: x must be email");
ut.check(dvalidation_1.validate("x", 'dutta@dii.com', 'email'), true);
ut.check(dvalidation_1.validate("x", 'dd@dd', 'email'), "Validation failed: x must be email");
ut.check(dvalidation_1.validate("x", 'hello@hello.com', 'list_of_email'), true);
ut.check(dvalidation_1.validate("x", 'dutta@dii.com,hello@hello.com', 'list_of_email'), true);
ut.check(dvalidation_1.validate("x", 'dd@dd.com, hello', 'list_of_email'), "Validation failed: x must be list of email");
ut.check(dvalidation_1.validate("x", 'hello, dd@dd.com', 'list_of_email'), "Validation failed: x must be list of email");
ut.check(dvalidation_1.validate("x", null, 'required'), "Validation failed: x is missing from input");
ut.check(dvalidation_1.validate("x", "", 'required'), "Validation failed: x Must not empty");
ut.check(dvalidation_1.validate("x", [], 'required'), "Validation failed: x Must not empty");
ut.check(dvalidation_1.validate("x", [1, 2], 'required'), true);
ut.check(dvalidation_1.validate("x", 1, 'number'), true);
ut.check(dvalidation_1.validate("x", 'hello', 'number'), "Validation failed: x must be a number");
ut.check(dvalidation_1.validate("x", [1, 2, 3], 'array'), true);
ut.check(dvalidation_1.validate("x", 'hello', 'array'), "Validation failed: x must be a array");
ut.check(dvalidation_1.validate("x", true, 'bool'), true);
ut.check(dvalidation_1.validate("x", [], 'bool'), "Validation failed: x must be a boolean");
ut.check(dvalidation_1.validate("x", 'true', 'string'), true);
ut.check(dvalidation_1.validate("x", true, 'string'), "Validation failed: x must be a string");
ut.check(dvalidation_1.validate("x", {}, 'object'), true);
ut.check(dvalidation_1.validate("x", [], 'object'), true); // this is not ok!
ut.check(dvalidation_1.validate("x", [{}], 'array_of_object'), true);
ut.check(dvalidation_1.validate("x", {}, 'array_of_object'), "Validation failed: x must be a array of objects");
ut.check(dvalidation_1.validate("x", [1], 'array_of_object'), "Validation failed: x must be a arry of objects");
ut.check(dvalidation_1.fullValidation({
    'name': 'dipankar',
    'roll': 2,
}, {
    name: 'required|string',
    roll: 'required|number'
}), true);
ut.check(dvalidation_1.fullValidation({
    'name': 'dipankar',
    'roll': 2,
}, {
    name: 'required|string',
    roll: 'required|string'
}), "Validation failed: roll must be a string");
ut.check(dvalidation_1.fullValidation({
    'name': 'dipankar',
    'roll': 2,
    email: 'dutta.dipankar08@gmail.com',
    tags: ["hello", "world"]
}, {
    name: 'required|string',
    roll: 'required|number',
    email: 'required|email',
    tags: 'required|array',
}), true);
ut.check(dvalidation_1.fullValidation({
    'name': 'dipankar',
    'roll': 2,
    email: 'dutta.dipankar08@gmailcom',
    tags: ["hello", "world"]
}, {
    name: 'required|string',
    roll: 'required|number',
    email: 'required|email',
    tags: 'required|array',
}), "Validation failed: email must be email");
ut.check(dvalidation_1.fullValidation({
    'name': 'dipankar',
}, {
    name: 'required|string',
    roll: 'required|string'
}), "Validation failed: roll is missing from input");
ut.check(dvalidation_1.partialValidation({
    'name': 'dipankar',
}, {
    name: 'required|string',
    roll: 'required|number',
    email: 'required|email',
    tags: 'required|array',
}), true);
ut.check(dvalidation_1.partialValidation({
    'name': 'dipankar',
    'email': 'dip@fb.com'
}, {
    name: 'required|string',
    roll: 'required|number',
    email: 'required|email',
    tags: 'required|array',
}), true);
ut.check(dvalidation_1.partialValidation({
    'name': 'dipankar',
    'email': 'dip@fbcom'
}, {
    name: 'required|string',
    roll: 'required|number',
    email: 'required|email',
    tags: 'required|array',
}), 'Validation failed: email must be email');
ut.check(dvalidation_1.partialValidation({
    'name': 'dipankar',
    'tags': 'dip@fbcom'
}, {
    name: 'required|string',
    roll: 'required|number',
    email: 'required|email',
    tags: 'required|array',
}), 'Validation failed: tags must be a array');
ut.report();
/*
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
*/ 
//# sourceMappingURL=test.js.map