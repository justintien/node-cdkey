# node-cdkey [![Build Status](https://travis-ci.org/up9cloud/node-cdkey.svg?branch=master)](https://travis-ci.org/up9cloud/node-cdkey)

generate the random string by template.

## Installation

```sh
npm install cdkey --save
```

## Usage

### basic usage

it's ok to use custom template with custom syntax.

```javascript
cdkey([string template], [number amount], [object syntax]);
```

```javascript
'use strict';
const cdkey = require("cdkey");

cdkey();
// eC8q-8ERg-fTZa-Vh2o

cdkey(2);
// [ 'kcsi-V5xR-1xv8-zq7q', 'cumh-jYVn-5vL9-mwLM' ]

cdkey('XXXX');
// 7F3K

cdkey('????', 2);
// [ 'cUwc', 'n9zu' ]

cdkey('AAAA', {
  A: 'AB'
});
// ABBA

cdkey('cccc', 2, {
  c: 'ABC'
});
// [ 'BCAA', 'ACAB' ]
```

###### default syntax

|syntax|chars|
|---|---|
|`0`|[0-9] - [0]|
|`A`|[A-Z] - [OI]|
|`a`|[a-z] - [l]|
|`X`|[0-9] + [A-Z] - [0OI]|
|`x`|[0-9] + [a-z] - [0l]|
|`?`|[0-9] + [A-Z] + [a-z] - [0OIl]|

```javascript
// to get default syntax object.
cdkey.syntax();
```

### option mode

char + length or template + syntax

the 2ed argument can override amount.

the 3rd argument can override template or length.

```javascript
cdkey([object options], [number amount, [string template|number length]]);
```

```javascript
cdkey({
  char: 'abc',
  length: 4
});
// acab

cdkey({
  template: 'aaaa',
  syntax: {
    a: '012'
  },
  amount: 2
});
// [ "1220", "2001" ]

cdkey({
  template: '0000',
  syntax: {
    a: '012'
  },
  amount: 2
}, 2, 'aaaa');
// [ "1220", "2001" ]
```

###### options

|attribute|type|description|
|---|---|---|
|char|string||
|length|number||
|template|string||
|syntax|object||
|amount|number||

#### build in options

cdkey.`?`

###### char + length style

default length is 32.

- `ALPHANUMERIC` - [0-9 a-z A-Z]
- `ALPHABETIC` - [a-z A-Z]
- `NUMBER` - [0-9]
- `NUMERIC` - same as cdkey.NUMBER
- `UPPER` - [A-Z]
- `LOWER` - [a-z]
- `HEX` - [0-9 A-F]

###### template + syntax style

- `DEFAULT` - '????-????-????-????'
- `DIABLE` - 'XXXX-XXXX-XXXX-XXXX'

```javascript

cdkey(cdkey.NUMBER);
// 22030189956236488846744098007707

cdkey(cdkey.NUMBER, 2, 8);
// [ '05250373', '42852368' ]

cdkey(cdkey.DIABLE, 2);
// [ '2F2L-HJTG-P4L6-QBTZ', 'F1XM-K9JZ-ED9L-EPL9' ]
```

### Fluent mode

similar options usage.

```javascript
cdkey(true)
    [.method(param)]
    .gen();
```

```javascript
cdkey(true)
  .char('012')
  .length(8)
  .gen();
// 01201002

cdkey(true)
  .template('AAAA')
  .syntax({
    A: 'ABC'
  })
  .amount(2)
  .gen();
// [ 'BCAA', 'ACAB' ]
```

###### methods

|method|param type|
|---|---|
|char|string|
|length|number|
|template|string|
|syntax|object|
|amount|number|

## Tests

```
npm test
```

## TODO

- escape string in template.
- command line support.
- browser support.
- debug output.
