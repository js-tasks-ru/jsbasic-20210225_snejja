function getMinMax(str) {
  let arrNumbers = str.split(',')
    .map(item => item.split(' '))
    .reduce((arr, item) => arr.concat(item))
    .filter(item => isFinite(item) && item !== '')
    .map(item => parseFloat(item))
    .sort((a, b) => a - b);
  
  const result = {};
  result.min = arrNumbers[0];
  result.max = arrNumbers[arrNumbers.length - 1];
  return result;
}