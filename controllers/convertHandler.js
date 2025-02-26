/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.getNum = function (input) {
    // Check if the input number is valid
    const regex = /^(([1-9]\d*(\.[1-9]\d*)?|0\.\d+)([\/\*-]([1-9]\d*(\.[1-9]\d*)?|0\.\d+))*)?[a-zA-Z]{0,3}$/;
    if (!regex.test(input)) {
      return 'invalid number';
    }

    // Extract number part from input
    const numPart = input.split(/[a-z]+/i)[0];
    let initNum;

    // Check if numPart is empty
    if (numPart === '') {
      initNum = undefined;
    } else if (!isNaN(numPart)) {
      // Check if numPart can directly convert to number
      initNum = Number(numPart);
    } else {
      // Evaluate the string as a math expression
      const numPartArray = numPart.split(/([\/\*-])/);
      let arithmeticOperation = '';
      initNum = numPartArray.reduce((acc, el) => {
        if (isNaN(el)) {
          arithmeticOperation = el;
          return Number(acc);
        } else if (arithmeticOperation) {
          switch (arithmeticOperation) {
            case '/':
              return Math.round((acc / Number(el)) * 100000) / 100000;
            case '*':
              return Math.round(acc * Number(el) * 100000) / 100000;
            case '-':
              return Math.round((acc - Number(el)) * 100000) / 100000;
            default:
              return acc;
          }
        }
      });
    }

    return initNum;
  };

  this.getUnit = function (input) {
    // Extract unit part from input
    const inputArray = input.split(/[^a-z]+/i);
    const initUnit = inputArray[inputArray.length - 1];

    // Check if unit is invalid
    const regex = /^(gal|l|lbs|kg|mi|km)$/i;
    return !initUnit
      ? 'no unit'
      : regex.test(initUnit)
      ? initUnit.toLowerCase()
      : 'invalid unit';
  };

  this.convert = function (initNum = 1, initUnit) {
    // Check if initNum or iniUnit is valid
    if (
      initNum === 'invalid number' ||
      initUnit === 'invalid unit' ||
      initUnit === 'no unit'
    ) {
      return;
    }

    const GAL_TO_L = 3.78541;
    const LBS_TO_KG = 0.453592;
    const MI_TO_KM = 1.60934;
    switch (initUnit) {
      case 'gal':
        return Math.floor(initNum * GAL_TO_L * 100000) / 100000;
      case 'lbs':
        return Math.floor(initNum * LBS_TO_KG * 100000) / 100000;
      case 'mi':
        return Math.floor(initNum * MI_TO_KM * 100000) / 100000;
      case 'l':
        return Math.floor((initNum / GAL_TO_L) * 100000) / 100000;
      case 'kg':
        return Math.floor((initNum / LBS_TO_KG) * 100000) / 100000;
      case 'km':
        return Math.floor((initNum / MI_TO_KM) * 100000) / 100000;
      default:
        return initNum;
    }
  };

  this.getReturnUnit = function (initUnit) {
    // Check if initUnit is valid
    if (initUnit === 'invalid unit' || initUnit === 'no unit') {
      return;
    }

    switch (initUnit) {
      case 'gal':
        return 'l';
      case 'lbs':
        return 'kg';
      case 'mi':
        return 'km';
      case 'l':
        return 'gal';
      case 'kg':
        return 'lbs';
      case 'km':
        return 'mi';
      default:
        return initUnit;
    }
  };

  this.spellOutUnit = function (initUnit, returnUnit) {
    const units = {
      gal: 'gallons',
      l: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers',
    };
    return [units[initUnit], units[returnUnit]];
  };

  this.getString = function (initNum = 1, initUnit, returnNum, returnUnit) {
    // Check if initNum or iniUnit is valid
    if (
      initNum === 'invalid number' ||
      initUnit === 'invalid unit' ||
      initUnit === 'no unit'
    ) {
      return;
    }

    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;