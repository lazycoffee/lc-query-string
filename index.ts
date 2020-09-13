interface QueryObject {
    [key: string]: string | Array<string>;
}
const lib = {
    parse(str?: string) {
        if (str === undefined) {
            str = window?.location?.search;
        }
        if (!str) {
            return {};
        }
        if (typeof str !== 'string') {
            return {};
        }
        let queryStr = '';
        if (str.includes('?')) {
            const arr = str.split('?');
            queryStr = arr[arr.length - 1];
        } else {
            queryStr = str;
        }
        if (!queryStr) {
            return {};
        }
        const queryObj: {
            [key: string]: string | Array<string>;
        } = {};
        const queryArr = queryStr.split('&');
        queryArr.forEach((segment: string) => {
            const arr = segment.split('=');
            let key = arr[0];
            let val = arr[1] || '';
            if (key.includes('[]')) {
                key = key.replace('[]', '');
                if (!Array.isArray(queryObj[key])) {
                    queryObj[key] = [];
                }
                (queryObj[key] as Array<string>).push(val);
            } else {
                queryObj[key] = val;
            }
        });
        return queryObj;
    },
    stringVal(v: any): string {
        const type = Object.prototype.toString
            .call(v)
            .match(/\[object (\w+)\]/)[1]
            .toLowerCase();
        if (['undefined', 'null'].includes(type)) {
            return '';
        }
        if (Number.isNaN(v)) {
            return '';
        }
        if (['object', 'array'].includes(type)) {
            return JSON.stringify(type);
        }
        return v + '';
    },
    stringify(queryObj?: QueryObject) {
        if (!queryObj) {
            return '';
        }
        let segments: Array<string> = [];
        Object.keys(queryObj).forEach((key) => {
            let val = queryObj[key];
            if (Array.isArray(val)) {
                val.forEach((v) => {
                    v = lib.stringVal(v);
                    segments.push(`${key}[]=${v + ''}`);
                });
            } else {
                val = lib.stringVal(val);
                segments.push(`${key}=${val}`);
            }
        });
        return segments.join('&');
    },
};

module.exports = lib;
