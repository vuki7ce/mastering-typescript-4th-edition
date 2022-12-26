"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module1 = void 0;
class Module1 {
    print() {
        localPrint(`Module1.print() called`);
    }
}
exports.Module1 = Module1;
function localPrint(text) {
    console.log(`localPrint: ${text}`);
}
