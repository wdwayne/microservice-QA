/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const [spellOutInitUnit, spellOutReturnUnit] = convertHandler.spellOutUnit(
      initUnit,
      returnUnit
    );
    const toString = convertHandler.getString(
      initNum,
      spellOutInitUnit,
      returnNum,
      spellOutReturnUnit
    );

    if (
      (initNum === 'invalid number' || initNum === undefined) &&
      (initUnit === 'invalid unit' || initUnit === 'no unit')
    ) {
      res.status(400).json({ error: 'invalid number and unit' });
    } else if (initNum === 'invalid number') {
      res.status(400).json({ error: 'invalid number' });
    } else if (initUnit === 'invalid unit' || initUnit === 'no unit') {
      res.status(400).json({ error: initUnit });
    } else {
      res.json({
        initNum: initNum ? initNum : 1,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString,
      });
    }
  });
};