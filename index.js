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
};
module.exports = lib;
