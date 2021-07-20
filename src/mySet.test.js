/* eslint-disable no-undef */
describe('3. mySet', () => {
    it('конструктор с неитерируемым объектом порождает пустой MySet', () => {
        const set = new MySet({ hello: true });
        const arr = [...set];
        const expected = [];

        assert.deepEqual(arr, expected, 'MySet не пуст');
    });
    it('хранит только уникальные значения', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);
        const arr = [...set];
        const expected = [4, 8, 15, 16, 23, 42];

        assert.deepEqual(arr, expected, 'найдены повторяющиеся элементы');
    });
    it('есть свойство size', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.size, 'свойство size не определено');
        assert.equal(set.size, 6, 'неправильная длина');
    });
    it('работает в цикле for-of', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        const arr = [];
        for (const item of set) {
            arr.push(item);
        }
        const expected = [4, 8, 15, 16, 23, 42];

        assert.deepEqual(arr, expected, 'найдены повторяющиеся элементы');
    });
    it('есть метод keys', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.keys, 'метод keys не определен');

        const arr = [];
        for (const item of set.keys()) {
            arr.push(item);
        }
        const expected = [4, 8, 15, 16, 23, 42];

        assert.deepEqual(arr, expected, 'ошибка в set.keys');
    });
    it('есть метод values', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.values, 'метод values не определен');

        const arr = [];
        for (const item of set.values()) {
            arr.push(item);
        }
        const expected = [4, 8, 15, 16, 23, 42];

        assert.deepEqual(arr, expected, 'ошибка в set.values');
    });
    it('есть методы entries', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.entries, 'метод entries не определен');

        const arr = [];
        for (const item of set.entries()) {
            arr.push(item);
        }
        const expected = [
            [4, 4],
            [8, 8],
            [15, 15],
            [16, 16],
            [23, 23],
            [42, 42],
        ];

        assert.deepEqual(arr, expected, 'ошибка в set.entries');
    });
    it('есть метод clear', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.clear, 'метод clear не определено');

        set.clear();

        assert.equal(set.size, 0, 'метод clear не очищает set');
    });
    it('есть метод has', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.has, 'метод has не определен');

        assert.isTrue(set.has(4), 'has не обнаружил существующий элемент');
        assert.isFalse(set.has(5), 'has обнаружил не существующий элемент');
    });
    it('есть метод add', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.add, 'метод add не определен');

        let prevSize = set.size;
        const returned = set.add(5);

        assert.isTrue(set.has(5), 'элемент не добавлен');
        assert.equal(set.size, prevSize + 1, 'size не увеличился');
        assert.equal(set, returned, 'метод не поддерживает chaining');

        prevSize = set.size;
        set.add(5);

        assert.equal(
            set.size,
            prevSize,
            'дублирующий элемент добавлен, хотя не должен был',
        );
    });
    it('есть метод delete', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.delete, 'метод delete не определен');

        let prevSize = set.size;
        let result = set.delete(4);

        assert.isFalse(set.has(4), 'элемент не удален');
        assert.isTrue(result, 'не вернул true');
        assert.equal(set.size, prevSize - 1, 'size не уменьшился');

        prevSize = set.size;
        result = set.delete(4);

        assert.isFalse(result, 'не вернул false');
        assert.equal(set.size, prevSize, 'изменил size');
    });
    it('set === set.valueOf()', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);
        assert(set === set.valueOf());
    });
    it('String(set) => [object MySet]', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);
        assert.equal(String(set), '[object MySet]');
    });
    it('toStringTag: MySet', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);
        assert.equal(Object.prototype.toString.call(set), '[object MySet]');
    });
    it('есть forEach', () => {
        const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

        assert.isDefined(set.forEach, 'метод forEach не определен');

        const arr = [];
        let i = 0;
        set.forEach((item, index, currentSet) => {
            assert.equal(index, i++, 'Индексы не совпадают');
            assert.equal(set, currentSet, 'callback set !== original set');
            arr.push(item);
        });
        const expected = [4, 8, 15, 16, 23, 42];

        assert.deepEqual(arr, expected, 'ошибка в forEach');
    });
    it('forEach делает какие-то странные вещи...', () => {
        const set = new MySet();

        assert.isDefined(set.forEach, 'метод forEach не определен');

        const object = {
            getValue() {
                return this.value;
            },
        };

        const data = {
            value: 42,
        };

        set.add(object);

        const arr = [];
        set.forEach(function (item) {
            arr.push(item.getValue.call(this));
        }, data);
        const expected = [42];

        assert.deepEqual(arr, expected, 'ошибка в forEach');
    });
});
