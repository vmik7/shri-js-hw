// eslint-disable-next-line no-unused-vars
class MySet {
    constructor(data) {
        this._data = [];
        if (data && data[Symbol.iterator]) {
            for (const item of data) {
                if (!this._data.includes(item)) {
                    this._data.push(item);
                }
            }
        }
        this.keys = this.values;

        this[Symbol.iterator] = this.values;
        this[Symbol.toStringTag] = 'MySet';
    }

    get size() {
        return this._data.length;
    }

    clear() {
        this._data = [];
    }

    has(value) {
        return this._data.includes(value);
    }

    add(value) {
        if (!this._data.includes(value)) {
            this._data.push(value);
        }
        return this;
    }

    delete(value) {
        const index = this._data.indexOf(value);
        if (index !== -1) {
            this._data.splice(index, 1);
            return true;
        }
        return false;
    }

    *values() {
        for (const value of this._data) {
            yield value;
        }
    }

    *entries() {
        for (const value of this._data) {
            yield [value, value];
        }
    }

    forEach(callbackFn, thisArg) {
        const self = this;
        this._data.forEach((item, index) => {
            callbackFn.call(thisArg, item, index, self);
        });
    }
}
