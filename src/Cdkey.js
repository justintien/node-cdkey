'use strict';

const _ = require('lodash');

const Option = require('./Option.js');
const Generator = require('./Generator.js');

let Cdkey = function (arg1, arg2, arg3) {
    let options, amount, length, template, syntax;

    if (arguments.length === 0) {
        // nothing.
    } else if (arg1 === true) {
        return new Generator;
    } else if (_.isInteger(arg1)) {
        amount = arg1;
        if (arg2) {
            length = arg2;
        }
    } else if (_.isObject(arg1)) {
        options = _.clone(arg1);
        if (arg2) {
            amount = arg2;
            if (arg3) {
                if (_.isInteger(arg3)) {
                    length = arg3;
                } else {
                    template = arg3;
                }
            }
        }
    } else {
        template = arg1;
        if (arg2) {
            if (_.isObject(arg2)) {
                syntax = _.clone(arg2);
                if (arg3) {
                    amount = arg3;
                }
            } else {
                amount = arg2;
                if (arg3) {
                    syntax = _.clone(arg3);
                }
            }
        }
    }
    if (!options) {
        options = Option.DEFAULT;
    }
    if (amount) {
        options.amount = amount;
    }
    if (template) {
        options.length = null;
        options.char = null;
        options.template = template;
        if (syntax) {
            options.syntax = syntax;
        } else if (!options.syntax) {
            options.syntax = Option.DEFAULT.syntax;
        }
    }
    if (length) {
        options.template = null;
        options.syntax = null;
        options.length = length;
        if (!options.char) {
            options.char = Option.DEFAULT.syntax['?'];
        }
    }
    let holder = new Generator(options);
    if (Cdkey.debug) {
        let r = holder.gen();
        Cdkey.debug(r);
        return r;
    } else {
        return holder.gen();
    }
};
Cdkey.syntax = () => syntax;
Cdkey.debug = false;

Cdkey.ALPHANUMERIC = Option.ALPHANUMERIC;
Cdkey.ALPHABETIC = Option.ALPHABETIC;
Cdkey.NUMERIC = Option.NUMERIC;
Cdkey.NUMBER = Option.NUMBER;
Cdkey.UPPER = Option.UPPER;
Cdkey.LOWER = Option.LOWER;
Cdkey.HEX = Option.HEX;

Cdkey.DIABLO = Option.DIABLO;

module.exports = Cdkey;