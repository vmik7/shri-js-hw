// eslint-disable-next-line no-unused-vars
function inProxy(obj) {
    return new Proxy(obj, {
        has(target, prop) {
            return (
                Object.getOwnPropertyNames(target).includes(prop) ||
                Object.getOwnPropertySymbols(target).includes(prop)
            );
        },
    });
}
