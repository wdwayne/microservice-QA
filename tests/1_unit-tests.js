/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Function convertHandler.getNum(input)', function () {
    test('Whole number input', function (done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', function (done) {
      const input = '12.3KG';
      assert.equal(convertHandler.getNum(input), 12.3);
      done();
    });

    test('Fractional Input', function (done) {
      const input = '12/3lbs';
      assert.equal(convertHandler.getNum(input), 4);
      done();
    });

    test('Fractional Input w/ Decimal', function (done) {
      const input = '12.5/2.4kg';
      assert.equal(convertHandler.getNum(input), 5.20833);
      done();
    });

    test('Double fraction', function (done) {
      const input = '3/7.2/4lbs';
      assert.equal(convertHandler.getNum(input), 0.10417);
      done();
    });

    test('No Numerical Input', function (done) {
      const input = 'kg';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'GAL',
        'L',
        'MI',
        'KM',
        'LBS',
        'KG',
      ];
      input.forEach(function (el, i) {
        assert.equal(convertHandler.getUnit(el), el.toLowerCase());
      });
      done();
    });

    test('Unknown Unit Input', function (done) {
      const input = '3kilos';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (el, i) {
        assert.equal(convertHandler.getReturnUnit(el), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {
    test('For Each Valid Unit Inputs', function (done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ];
      input.forEach((el, i) => {
        assert.equal(convertHandler.spellOutUnit(el)[0], expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function () {
    test('Gal to L', function (done) {
      const input = [5, 'gal'];
      const expected = 18.92705;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test('L to Gal', function (done) {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test('Mi to Km', function (done) {
      const input = [4, 'mi'];
      const expected = 6.43736;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test('Km to Mi', function (done) {
      const input = [4, 'km'];
      const expected = 2.48549;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test('Lbs to Kg', function (done) {
      const input = [4, 'lbs'];
      const expected = 1.81437;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test('Kg to Lbs', function (done) {
      const input = [4, 'kg'];
      const expected = 8.8185;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});