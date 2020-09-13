const lib = require('./index.js');

const cases = [
    '',
    'xxx=',
    'key=val',
    '?page=1&pageSize=10',
    'key=&key2=2',
    '?item[]=apple&item[]=banana&item[]=&total=10',
];
const shouldBe = [
    {},
    {xxx: ''},
    {key: 'val'},
    {page: '1', pageSize: '10'},
    {key: '', key2: '2'},
    {item: ['apple', 'banana', ''], total: '10'}
];
for (let i = 0; i < cases.length; i++) {
    const testCase = cases[i];
    const shouldRes = shouldBe[i];
    const result = lib.parse(testCase);
    const resultStr = JSON.stringify(result);
    if (resultStr !== JSON.stringify(shouldRes)) {
        console.log('test case: ' + testCase);
        console.log('test result: ' + result);
        throw new Error('Test "parse" not OK.');
    }
    const stringifyResult = lib.stringify(result);
    if (stringifyResult !== testCase.replace('?', '')) {
        console.log('origin: ' + testCase);
        console.log('test case: ' + resultStr);
        console.log('test result: ' + stringifyResult);
        throw new Error('test "stringify" not OK.');
    }
}
console.log('All test passed.');