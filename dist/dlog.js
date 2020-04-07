"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let colorogs = require('color-logs');
let _log = colorogs(true, true, __filename);
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({
            filename: 'server.log',
            level: "error",
            maxsize: 1024 * 1024 * 5,
            maxFiles: 2
        })
    ]
});
logger.debug("Test");
var DLog;
(function (DLog) {
    function d(msg, msg2 = null) {
        _log.debug("[DEBUG] " + msg, msg2 ? msg2 : "");
        logger.debug("[DEBUG] " + msg, msg2);
    }
    DLog.d = d;
    function e(msg, msg2 = null) {
        _log.error("[ERROR] " + msg, msg2);
        logger.error("[ERROR] " + msg, msg2);
    }
    DLog.e = e;
    function i(msg, msg2 = null) {
        _log.info("[INFO] " + msg, msg2);
        logger.info("[INFO] " + msg, msg2);
    }
    DLog.i = i;
    function s(msg, msg2 = null) {
        _log.info("[INFO] " + msg, msg2);
        logger.info("[SUCCESS] " + msg, msg2);
    }
    DLog.s = s;
    // exception as fetal
    function ex(e) {
        _log.error("[EXCEPTON] Unwanted Exception: " + e.message, e.stack);
        logger.error("[FETAL] Some exception occurred in the code", e);
        console.log(e);
    }
    DLog.ex = ex;
    // exception as expected!
    function exe(e) {
        _log.debug("[EXCEPTON] Exception as Expected", e.message, e.stack);
    }
    DLog.exe = exe;
})(DLog = exports.DLog || (exports.DLog = {}));
//# sourceMappingURL=dlog.js.map