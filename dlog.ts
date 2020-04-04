let  colorogs = require('color-logs')
let _log = colorogs(true, true, __filename);

export namespace DLog{
    export function d(msg) {
        _log.debug(msg)
    }
    export function e(msg) {
        _log.error(msg)
    }
    export function i(msg) {
        _log.info(msg)
    }
    export function s(msg) {
        _log.info(msg)
    }
}