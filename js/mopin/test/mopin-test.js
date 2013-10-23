describe('Number', function() {
    describe('calc', function() {
        it('add', function() {
console.log(assert);
console.log(assert);
            assert(4+8 == 12);
        });
        it('sub', function() {
            assert(4-8 == -4);
        });
        it('mul', function() {
            assert(16*2 == 32);
        });
        it('div', function() {
            assert(8/2 == 4);
        });
    });
});

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            var arr = [1, 2, 3];
            assert(arr.indexOf(3) == 2);
            assert(arr.indexOf(5) ==-1);
            assert(arr.indexOf(0) ==-1);
        });
    });
});

describe('Mopin', function () {
    describe('name', function () {
        it('should be "Mopin"', function () {
            var expected = 'Mopin';
            var actual = Mopin.name;
            assert.equal(expected, actual);
        });
    });
    describe('version', function () {
        it('should be version 0.1', function () {
            var expected = '0.1';
            var actual = Mopin.version;
            assert.equal(expected, actual);
        });
    });
    describe('extend', function () {
        it('should be one parameter extended as parameter has one', function () {
            Mopin.extend({
                hoge: 'hogehoge'
            });
            var expected = 'hogehoge';
            var actual = Mopin.hoge;
            assert.equal(expected, actual);
        });
        it('should be multi parameter extended where extend parameter is multiple', function () {
            var param = {
                fuga: 'fugafuga',
                moge: function () {
                    return 'mogemoge'
                }
            };
            Mopin.extend(param);
            var expected = 'fugafuga';
            var actual = Mopin.fuga;
            assert.equal(expected, actual);

            var expected = 'mogemoge';
            var actual = Mopin.moge();
            assert.equal(expected, actual);
        });
    });
    describe('class', function () {
        it('make Class that should be instanceof Klass', function () {
            var klass = Mopin.class();
            console.log(klass.constructor);
        });
    });
});
