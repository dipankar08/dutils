import { DLog } from "./dlog";

var rp = require('request-promise');
const _ = require('underscore');

type Item = {
    url: String,
    data: Object,
}

export class DTelemetry {
    static session: string = null;
    static app_id: string = null;

    static pendingItems: Array<Item> = []

    static markAction(tag: string, extra: Object = {}) {
        var res = {}
        res['type'] = 'action';
        res['tag'] = tag
        let obj = _.extend(res, extra)
        this.pump('http://simplestore.dipankar.co.in/api/_analytics/action', obj)
    }

    static markHits(extra: Object = {}) {
        extra['type'] = 'hit_tracker';
        this.pump('http://simplestore.dipankar.co.in/api/_analytics/hit_tracker', extra)
    }

    static markException(e: Error, extra: Object = {}) {
        let errObj = { type: "exception", "error": e.name, location: 'Please see the stack', stack: e.stack };
        let obj = _.extend(errObj, extra)
        this.pump('http://simplestore.dipankar.co.in/api/_analytics/exception', obj)
    }

    static async init(napp_id: string) {
        this.app_id = napp_id
        let body = { "type": "launch", "app_id": this.app_id, "app_version": "1.0", "device_os": "linux", "device_id": "linux", "device_api": "0" }
        try {
            let result = await rp({
                method: 'POST',
                uri: 'http://simplestore.dipankar.co.in/api/_analytics/launch',
                body: body,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            })
            DLog.d(result);
            this.session = result.out[0].session;
            this.pumpPending();
            DLog.s("Telemetry Init successs")
        } catch (e) {
            DLog.ex(e);
        }

    }

    static async onDestory() {
        await this.pumpPending();
    }

    private static async pumpPending() {
        if (this.session != null) {
            for (var item of this.pendingItems) {
                await this.pump(item.url, item.data);
            }
            this.pendingItems = [];
        }
    }

    private static async pump(url: String, data: Object) {
        if (this.session == null) {
            this.pendingItems.push({ url: url, data: data })
        } else {
            if (data['type'] != 'hit_tracker') {
                data['session'] = this.session;
            }
            data['app_id'] = this.app_id;
            DLog.d(`Sending Logs: url: ${url}`, data)
            try {
                let result = await rp({
                    method: 'POST',
                    uri: url,
                    body: data,
                    headers: {
                        'User-Agent': 'Request-Promise'
                    },
                    json: true
                })
                DLog.d(result);
                DLog.s("Telemetry push success")
            } catch (e) {
                DLog.ex(e);
            }
        }
    }
}