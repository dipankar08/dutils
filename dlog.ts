let  colorogs = require('color-logs')
let _log = colorogs(true, true, __filename);

import winston from "winston"

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'server.log',
            level: "error",
            maxsize: 1024 * 1024 * 5, // 5MB
            maxFiles: 2
        })
    ]
});
logger.debug("Test");

export namespace DLog {
    export function d(msg: String, msg2: any = null) {
        _log.debug("[DEBUG] " + msg, msg2 ? msg2 : "");
        logger.debug("[DEBUG] " + msg, msg2);
    }
    export function e(msg: String, msg2: any = null) {
        _log.error("[ERROR] " + msg, msg2);
        logger.error("[ERROR] " + msg, msg2);
    }
    export function i(msg: String, msg2: any = null) {
        _log.info("[INFO] " + msg, msg2);
        logger.info("[INFO] " + msg, msg2);
    }
    export function s(msg: String, msg2: any = null) {
        _log.info("[INFO] " + msg, msg2);
        logger.info("[SUCCESS] " + msg, msg2);
    }
    // exception as fetal
    export function ex(e: any) {
        _log.error("[EXCEPTON] Unwanted Exception: "+e.message, e.stack);
        logger.error("[FETAL] Some exception occurred in the code", e);
        console.log(e);
    }
     // exception as expected!
     export function exe(e: Error) {
        _log.debug("[EXCEPTON] Exception as Expected", e.message, e.stack);
    }
}