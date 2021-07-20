const proto = { value: 42 };
const testObject = Object.create(proto);

Object.defineProperty(testObject, 'year', {
    value: 2020,
    writable: true,
    configurable: true,
    enumerable: false,
});

const symbol = Symbol('bazzinga');
testObject[symbol] = 42;

// без proxy
// console.log('value' in testObject); // true
// console.log('year' in testObject); // true
// console.log(symbol in testObject); // true

// const proxy = new Proxy(testObject, {
//     has(target, prop) {
//         return (
//             Object.getOwnPropertyNames(target).includes(prop) ||
//             Object.getOwnPropertySymbols(target).includes(prop)
//         );
//     },
// });

// с proxy
// console.log('value' in proxy); // false
// console.log('year' in proxy); // true
// console.log(symbol in proxy); // true
