
  function getMinMax(str) {
    let numbers = str.split(' ').filter(isFinite);
    
    let minimal = numbers.reduce((min, currentNumber) => Math.min(min, currentNumber), Infinity);
    let maximum = numbers.reduce((max, currentNumber) => Math.max(max, currentNumber), -Infinity);
    
    return {
      min: minimal,
      max: maximum
    };
  }
