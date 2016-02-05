# node-cdkey

<!-- TODO add travis-ci -->

## Installation

```sh
npm install cdkey --save
```

## Basic Usage

```javascript
cdkey([object options], [number amount], [string template|number length]);
```


```javascript
'use strict';
const cdkey = require("cdkey");

cdkey();
// eC8q-8ERg-fTZa-Vh2o

cdkey(2);
// [ 'kcsi-V5xR-1xv8-zq7q', 'cumh-jYVn-5vL9-mwLM' ]

cdkey(2, 'aaaa');
// [ 'wbhv', 'shuw' ]

cdkey(cdkey.NUMBER);
// 22030189956236488846744098007707

cdkey(cdkey.NUMBER, 2);
// [ '19683894730515804657548823714127', '21866105460848814223897519145505' ]

cdkey(cdkey.NUMBER, 2, 8);
// [ '05250373', '42852368' ]
```

## Template usage

```javascript
cdkey([string template], [number amount], [object syntax]);
```

```javascript
cdkey('XXXX');
// 7F3K

cdkey('????', 2);
// [ 'cUwc', 'n9zu' ]

cdkey('AAAA', {
  A: 'AB'
});
// ABBA

cdkey('aaaa', 2, {
  a: 'ABC'
});
// [ 'BCAA', 'ACAB' ]

cdkey(cdkey.DIABLE, 2);
// [ '2F2L-HJTG-P4L6-QBTZ', 'F1XM-K9JZ-ED9L-EPL9' ]
```

## Fluent mode

```javascript
cdkey(true);
    .method(value)
    .method(value)
    .gen();
```

```javascript
cdkey(true)
  .template('AAAA')
  .syntax({
    A: 'ABC'
  })
  .amount(2)
  .gen();
// [ 'BCAA', 'ACAB' ]
```

|group|method|param type|
|---|---|---|
|template|template|string|
|template|syntax|object|
|basic|char|string|
|basic|length|number|
||amount|number|

### build in options

cdkey.`?`

###### basic style

- `ALPHANUMERIC` - [0-9 a-z A-Z]
- `ALPHABETIC` - [a-z A-Z]
- `NUMBER` - [0-9]
- `NUMERIC` - same as cdkey.NUMBER
- `UPPER` - [A-Z]
- `LOWER` - [a-z]
- `HEX` - [0-9 A-F]

###### template style

- `DEFAULT` - '????-????-????-????'
- `DIABLE` - 'XXXX-XXXX-XXXX-XXXX'

### default syntax

```javascript
// get default syntax object.
cdkey.syntax();
```

|syntax|chars|
|---|---|
|`0`|0-9|
|`A`|A-Z|
|`a`|a-z|
|`X`|0-9 + A-Z - 0OI|
|`x`|0-9 + a-z - 0l|
|`?`|0-9 + a-z + A-z - 0OIl|

## Tests

```
npm test
```

## TODO

- travis-ci
- escape string in template.
- command line support.
- browser support.
- debug output.
