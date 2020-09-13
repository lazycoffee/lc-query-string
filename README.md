# lc-query-string
A npm package use for url string query parse and compose.

## parse
Parse a string with or without leading `?` url string. Return a JSON object.<br/>
Warning: It would not test passing string is a valid query string or not.

```js
const queryLib = require('lc-query-string');

// if you don't pass anything,
// it will try to parse window.location.search,
// if it dose not exist, it will return empty object.
queryLib.parse();

queryLib.parse('?page=1&pageSize=10');

```