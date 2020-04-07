"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dlog_1 = require("./dlog");
var rp = require('request-promise');
const _ = require('underscore');
class DTelemetry {
    static markAction(tag, extra = {}) {
        var res = {};
        res['type'] = 'action';
        res['tag'] = tag;
        let obj = _.extend(res, extra);
        this.pump('http://simplestore.dipankar.co.in/api/_analytics/action', obj);
    }
    static markHits(extra = {}) {
        extra['type'] = 'hit_tracker';
        this.pump('http://simplestore.dipankar.co.in/api/_analytics/hit_tracker', extra);
    }
    static markException(e, extra = {}) {
        let errObj = { type: "exception", "error": e.name, location: 'Please see the stack', stack: e.stack };
        let obj = _.extend(errObj, extra);
        this.pump('http://simplestore.dipankar.co.in/api/_analytics/exception', obj);
    }
    static async init(napp_id) {
        this.app_id = napp_id;
        let body = { "type": "launch", "app_id": this.app_id, "app_version": "1.0", "device_os": "linux", "device_id": "linux", "device_api": "0" };
        try {
            let result = await rp({
                method: 'POST',
                uri: 'http://simplestore.dipankar.co.in/api/_analytics/launch',
                body: body,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            });
            dlog_1.DLog.d(result);
            this.session = result.out[0].session;
            this.pumpPending();
            dlog_1.DLog.s("Telemetry Init successs");
        }
        catch (e) {
            dlog_1.DLog.ex(e);
        }
    }
    static async onDestory() {
        await this.pumpPending();
    }
    static async pumpPending() {
        if (this.session != null) {
            for (var item of this.pendingItems) {
                await this.pump(item.url, item.data);
            }
            this.pendingItems = [];
        }
    }
    static async pump(url, data) {
        if (this.session == null) {
            this.pendingItems.push({ url: url, data: data });
        }
        else {
            if (data['type'] != 'hit_tracker') {
                data['session'] = this.session;
            }
            data['app_id'] = this.app_id;
            dlog_1.DLog.d(`Sending Logs: url: ${url}`, data);
            try {
                let result = await rp({
                    method: 'POST',
                    uri: url,
                    body: data,
                    headers: {
                        'User-Agent': 'Request-Promise'
                    },
                    json: true
                });
                dlog_1.DLog.d(result);
                dlog_1.DLog.s("Telemetry push success");
            }
            catch (e) {
                dlog_1.DLog.ex(e);
            }
        }
    }
}
exports.DTelemetry = DTelemetry;
DTelemetry.session = null;
DTelemetry.app_id = null;
DTelemetry.pendingItems = [];
//# sourceMappingURL=dtelemetry.js.map