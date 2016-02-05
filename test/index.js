#!/usr/bin/env node

'use strict';

const expect = require('chai').expect;
const cdkey = require('../index.js');

describe('basic', () => {
    let length = 19;
    let regex = /[^0-9a-zA-Z-]/g;
    it('generate one', () => {
        let str = cdkey();
        expect(str).to.be.a('string');
        expect(str.length).to.equal(length);
        let search = str.search(regex);
        expect(search).to.equal(-1);
    });
    it('generate multi', () => {
        let amount = 2;
        let list = cdkey(amount);
        expect(list).to.be.a('array');
        expect(list.length).to.equal(amount);
        list.forEach((str) => {
            expect(str).to.be.a('string');
            expect(str.length).to.equal(length);
            let search = str.search(regex);
            expect(search).to.equal(-1);
        });
    });
    it('generate limit length', () => {
        let length = 8;
        let amount = 2;
        let list = cdkey(amount, length);
        expect(list).to.be.a('array');
        expect(list.length).to.equal(amount);
        list.forEach((str) => {
            expect(str).to.be.a('string');
            expect(str.length).to.equal(length);
            let search = str.search(regex);
            expect(search).to.equal(-1);
        });
    });
});

describe('assign build in type', () => {
    [
        [cdkey.ALPHANUMERIC, /[^0-9A-Za-z]/g],
        [cdkey.ALPHABETIC, /[^A-Za-z]/g],
        [cdkey.NUMERIC, /[^0-9]/g],
        [cdkey.NUMBER, /[^0-9]/g],
        [cdkey.UPPER, /[^A-Z]/g],
        [cdkey.LOWER, /[^a-z]/g],
        [cdkey.HEX, /[^0-9ABCDEF]/g],
        [cdkey.DIABLO, /[^0-9A-Za-z-]/g],
    ].forEach((row) => {
        let option = row[0];
        let length;
        if(option.length){
            length = option.length;
        }else if(option.template){
            length = option.template.length;
        }
        let regex = row[1];
        it('generate one by ' + option.char, () => {
            let str = cdkey(option);
            expect(str).to.be.a('string');
            expect(str.length).to.equal(length);
            let search = str.search(regex);
            expect(search).to.equal(-1);
        });
        it('generate multi by ' + option.char, () => {
            let amount = 2;
            let list = cdkey(option, amount);
            expect(list).to.be.a('array');
            expect(list.length).to.equal(amount);
            list.forEach((str) => {
                expect(str).to.be.a('string');
                expect(str.length).to.equal(length);
                let search = str.search(regex);
                expect(search).to.equal(-1);
            });
        });
        it('generate multi, limit length by ' + option.char, () => {
            let amount = 2;
            let length = 8;
            let list = cdkey(option, amount, length);
            expect(list).to.be.a('array');
            expect(list.length).to.equal(amount);
            list.forEach((str) => {
                expect(str).to.be.a('string');
                expect(str.length).to.equal(length);
                let search = str.search(regex);
                expect(search).to.equal(-1);
            });
        });
    });
});

describe('assign template', () => {
    let excludes = /[0OIl]/g;
    [
        ['0000', /[^0-9]/g],
        ['AAAA', /[^A-Z]/g],
        ['aaaa', /[^a-z]/g],
        ['XXXX', /[^0-9A-Z]/g],
        ['xxxx', /[^0-9a-z]/g],
        ['????', /[^0-9A-Za-z]/g],
    ].forEach((row) => {
        let template = row[0];
        let regex = row[1];
        it('generate one by ' + template, () => {
            let str = cdkey(template);
            expect(str).to.be.a('string');
            expect(str.length).to.equal(template.length);
            expect(str.search(regex)).to.equal(-1);
            expect(str.search(excludes)).to.equal(-1);
        });
        it('generate multi by ' + template, () => {
            let amount = 2;
            let list = cdkey(template, amount);
            expect(list).to.be.a('array');
            expect(list.length).to.equal(amount);
            list.forEach((str) => {
                expect(str).to.be.a('string');
                expect(str.length).to.equal(template.length);
                expect(str.search(regex)).to.equal(-1);
                expect(str.search(excludes)).to.equal(-1);
            });
        });
    });
});

describe('assign template and syntax', () => {
    let template = '????';
    let regex = /[^ABC]/g;
    let syntax = {
        '?': 'ABC'
    };
    it('generate one by ' + template + ' syntax ' + syntax['?'], () => {
        let str = cdkey(template, syntax);
        expect(str).to.be.a('string');
        expect(str.length).to.equal(template.length);
        expect(str.search(regex)).to.equal(-1);
    });
    it('generate multi by ' + template + ' syntax ' + syntax['?'], () => {
        let amount = 2;
        let list = cdkey(template, amount, syntax);
        expect(list).to.be.a('array');
        expect(list.length).to.equal(amount);
        list.forEach((str) => {
            expect(str).to.be.a('string');
            expect(str.length).to.equal(template.length);
            expect(str.search(regex)).to.equal(-1);
        });
    });
});

describe('fluent basic', () => {
    let char = 'ABC';
    let length = 8;
    let regex = /[^ABC]/g;
    it('generate one by ' + char + ' length ' + length, () => {
        let str = cdkey(true)
            .length(length)
            .char(char)
            .gen();
        expect(str).to.be.a('string');
        expect(str.length).to.equal(length);
        expect(str.search(regex)).to.equal(-1);
    });
    it('generate multi by ' + char + ' length ' + length, () => {
        let amount = 2;
        let list = cdkey(true)
            .length(length)
            .char(char)
            .amount(amount)
            .gen();
        expect(list).to.be.a('array');
        expect(list.length).to.equal(amount);
        list.forEach((str) => {
            expect(str).to.be.a('string');
            expect(str.length).to.equal(length);
            expect(str.search(regex)).to.equal(-1);
        });
    });
});

describe('fluent template', () => {
    let template = '????';
    let regex = /[^ABC]/g;
    let syntax = {
        '?': 'ABC'
    };
    it('generate one by ' + template + ' syntax ' + syntax['?'], () => {
        let str = cdkey(true)
            .template(template)
            .syntax(syntax)
            .gen();
        expect(str).to.be.a('string');
        expect(str.length).to.equal(template.length);
        expect(str.search(regex)).to.equal(-1);
    });
    it('generate multi by ' + template + ' syntax ' + syntax['?'], () => {
        let amount = 2;
        let list = cdkey(true)
            .template(template)
            .syntax(syntax)
            .amount(amount)
            .gen();
        expect(list).to.be.a('array');
        expect(list.length).to.equal(amount);
        list.forEach((str) => {
            expect(str).to.be.a('string');
            expect(str.length).to.equal(template.length);
            expect(str.search(regex)).to.equal(-1);
        });
    });
});

describe('endless control', () => {
    let template = '0'; // 123456789
    let amount = 10;
    let regex = /[^0-9]/g;
    it('generate multi by ' + template, () => {
        let list = cdkey(template, amount); // [ '3', '5', '9', '7', '4', '2', '8', '6', '1' ]
        expect(list).to.be.a('array');
        expect(list.length).to.equal(9);
        list.forEach((str) => {
            expect(str).to.be.a('string');
            expect(str.length).to.equal(template.length);
            expect(str.search(regex)).to.equal(-1);
        });
    });
});