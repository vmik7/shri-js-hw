/* eslint-disable no-undef */
describe('2. inProxy', () => {
    it('игнорирует свойства прототипа', () => {
        const proto = { value: 42 };
        const testObject = Object.create(proto);

        const proxy = inProxy(testObject);

        // без proxy: true
        assert.isFalse(
            'value' in proxy,
            'прототипное свойство value не игнорируется proxy',
        );
    });
    it('находит неперечисляемые свойства', () => {
        const proto = { value: 42 };
        const obj = Object.create(proto);

        Object.defineProperty(obj, 'year', {
            value: 2020,
            writable: true,
            configurable: true,
            enumerable: false,
        });

        const proxy = inProxy(obj);

        // без proxy: true
        assert.isTrue(
            'year' in proxy,
            'не найдено неперечисляемое свойство year',
        );
    });
    it('находит символы', () => {
        const proto = { value: 42 };
        const obj = Object.create(proto);

        const symbol = Symbol('bazzinga');
        obj[symbol] = 42;

        const proxy = inProxy(obj);

        // без proxy: true
        assert.isTrue(symbol in proxy, 'не найден символ bazzinga');
    });
});
