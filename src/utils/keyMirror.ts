// "use strict";

export default function KeyMirror<T>(obj: T): {[K in keyof T]: K | T[K]} {
    const ret: any = {};
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('argument must be an object')
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = obj[key] || key;
        }
    }
    return ret;
}