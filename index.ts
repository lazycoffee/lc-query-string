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
};

module.exports =  lib;
