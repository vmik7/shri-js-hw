// eslint-disable-next-line no-unused-vars
class MySet {
    constructor(data) {
        this.data = [];
        if (data[Symbol.iterator]) {
            for (const item of data) {
                if (!this.data.includes(item)) {
                    this.data.push(item);
                }
            }
        }
        this.size = this.data.length;
        this.keys = this.values;

        this[Symbol.iterator] = this.values;
        this[Symbol.toStringTag] = 'MySet';
    }

    clear() {
        this.data = [];
        this.size = 0;
    }

    has(value) {
        return this.data.includes(value);
    }

    add(value) {
        if (!this.data.includes(value)) {
            this.data.push(value);
            this.size++;
        }
        return this;
    }

    delete(value) {
        const index = this.data.indexOf(value);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.size--;
            return true;
        }
        return false;
    }

    values() {
        const self = this;
        return {
            i: 0,
            next() {
                if (this.i < self.size) {
                    return { value: self.data[this.i++], done: false };
                }
                return { value: undefined, done: true };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    }

    entries() {
        const self = this;
        return {
            i: 0,
            next() {
                if (this.i < self.size) {
                    const value = self.data[this.i++];
                    return { value: [value, value], done: false };
                }
                return { value: undefined, done: true };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    }
}
