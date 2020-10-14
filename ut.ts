import { endianness } from "os";
import { report } from "process";
import { checkServerIdentity } from "tls";
import { DLog } from "./dlog";

export class UT {
    p_count: number;
    f_count: number
    constructor() {
        this.p_count = 0;
        this.f_count = 0;
    }
    public check(observed: any, expected: any) {
        if (observed == expected) {
            DLog.s("Test pass")
            this.p_count++;
        } else {
            DLog.e(`Test Fail: Observed:<${observed}>, expected:<${expected}>`)
            this.f_count++
        }
    }
    public report() {
        DLog.i(`
               
    -----------------------------------------------
        U T report
    -----------------------------------------------
    Total TC: ${this.p_count+ this.f_count}
    Passed: ${this.p_count}
    Failed: ${this.f_count}
    -----------------------------------------------
    `)
    }
}