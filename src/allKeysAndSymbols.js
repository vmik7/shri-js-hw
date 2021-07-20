function allKeysAndSymbols(obj) {
    const keys = Object.keys(obj);

    let prototype = Object.getPrototypeOf(obj);
    while (prototype) {
        keys.push(...Object.getOwnPropertyNames(prototype));
        keys.push(...Object.getOwnPropertySymbols(prototype));

        prototype = Object.getPrototypeOf(prototype);
    }

    const set = new Set(keys);
    set.delete('__proto__');

    return Array.from(set);
}

export default allKeysAndSymbols;
