/* eslint-disable no-undef */
describe('1. allKeysAndSymbols', () => {
    it('находит перечисляемые свойства', () => {
        const obj = {
            name: 'Ivan',
            age: 20,
            sayHi() {
                console.log('Hello, I`m', this.name);
            },
        };

        const result = allKeysAndSymbols(obj);

        assert.isArray(result, 'результат выполнения не является массивом');
        assert.include(result, 'name', 'нет свойства name');
        assert.include(result, 'age', 'нет свойства age');
        assert.include(result, 'sayHi', 'нет свойства sayHi');
    });
    it('находит неперечисляемые свойства', () => {
        const obj = {};

        Object.defineProperty(obj, 'notEnumerable', {
            value: 'something',
            enumerable: false,
        });

        const result = allKeysAndSymbols(obj);

        assert.isArray(result, 'результат выполнения не является массивом');
        assert.include(result, 'notEnumerable', 'нет свойства notEnumerable');
    });
    it('находит символьные свойства', () => {
        const s1 = Symbol('mySymbol');
        const s2 = Symbol.for('myGlobalSymbol');

        const obj = {
            [s1]: 'Hello1',
            [s2]: 'Hello2',
            [Symbol.toPrimitive](hint) {
                switch (hint) {
                    case 'string':
                        return 'hello';
                    case 'number':
                        return 0;
                    default:
                        return 0;
                }
            },
        };

        const result = allKeysAndSymbols(obj);

        assert.isArray(result, 'результат выполнения не является массивом');
        assert.include(result, s1, 'нет символа s1');
        assert.include(result, s2, 'нет символа s2');
        assert.include(
            result,
            Symbol.toPrimitive,
            'нет символа Symbol.toPrimitive',
        );
    });
    it('проходит по всей цепочке прототипов', () => {
        const rootPrototype = {
            root: true,
        };
        const firstPrototype = {
            first: 1,
        };
        const secondPrototype = {
            second: 2,
        };

        Object.setPrototypeOf(firstPrototype, rootPrototype);
        Object.setPrototypeOf(secondPrototype, firstPrototype);

        const obj = Object.create(secondPrototype);
        obj.top = 5;

        const result = allKeysAndSymbols(obj);

        assert.isArray(result, 'результат выполнения не является массивом');
        assert.include(result, 'top', 'нет свойства top');
        assert.include(result, 'second', 'нет свойства second');
        assert.include(result, 'first', 'нет свойства first');
        assert.include(result, 'root', 'нет свойства root');
    });
    it('не содержит служебное свойство __proto__', () => {
        const obj = {
            hello: 'hello',
        };
        const result = allKeysAndSymbols(obj);

        assert.isArray(result, 'результат выполнения не является массивом');
        assert.notInclude(result, '__proto__', 'содержит __proto__');
    });
    it('правильно работает с массивом', () => {
        const arr = [1, 2, 3];
        const result = allKeysAndSymbols(arr);

        assert.isArray(result, 'результат выполнения не является массивом');

        assert.notInclude(result, '__proto__', 'содержит __proto__');

        assert.include(result, 'length', 'Не содержит length');

        assert.include(result, '0', 'Не содержит индексы');
        assert.include(result, '1', 'Не содержит индексы');
        assert.include(result, '2', 'Не содержит индексы');
        assert.notInclude(result, '3', 'содержит лишний индекс');

        assert.include(result, 'find', 'Не содержит метод find');
        assert.include(result, 'map', 'Не содержит метод map');
        assert.include(result, 'reduce', 'Не содержит метод reduce');

        assert.include(result, Symbol.iterator, 'Не содержит Symbol.iterator');

        assert.include(result, 'toString', 'Не содержит метод toString');
        assert.include(result, 'constructor', 'Не содержит метод constructor');
    });
});
