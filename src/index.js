/* eslint-disable import/extensions */
import allKeysAndSymbols from './allKeysAndSymbols.js';

const obj = {
    name: 'Ivan',
    age: 20,
    sayHi() {
        console.log('Hello, I`m', this.name);
    },
};

const arr = [1, 2, 3];

console.log(allKeysAndSymbols(obj));
console.log(allKeysAndSymbols(arr));
