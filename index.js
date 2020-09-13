const lib = {
    parse(str) {
        var _a;
        if (str === undefined) {
            str = (_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.search;
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
        }
        else {
            queryStr = str;
        }
        if (!queryStr) {
            return {};
        }
        const queryObj = {};
        const queryArr = queryStr.split('&');
        queryArr.forEach((segment) => {
            const arr = segment.split('=');
            let key = arr[0];
            let val = arr[1] || '';
            if (key.includes('[]')) {
                key = key.replace('[]', '');
                if (!Array.isArray(queryObj[key])) {
                    queryObj[key] = [];
                }
                queryObj[key].push(val);
            }
            else {
                queryObj[key] = val;
            }
        });
        return queryObj;
    },
    stringVal(v) {
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
    stringify(queryObj) {
        if (!queryObj) {
            return '';
        }
        let segments = [];
        Object.keys(queryObj).forEach((key) => {
            let val = queryObj[key];
            if (Array.isArray(val)) {
                val.forEach((v) => {
                    v = lib.stringVal(v);
                    segments.push(`${key}[]=${v + ''}`);
                });
            }
            else {
                val = lib.stringVal(val);
                segments.push(`${key}=${val}`);
            }
        });
        return segments.join('&');
    },
};
module.exports = lib;
