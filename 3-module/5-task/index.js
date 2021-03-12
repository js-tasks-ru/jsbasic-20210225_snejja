function getMinMax(str) {
  let arrNumbers = str.split(' ')
    .join(',')
    .split(',')
    .filter(item => isFinite(item) && item !== '');
  
  const result = {};
  result.min = Math.min(...arrNumbers);
  result.max = Math.max(...arrNumbers);
  return result;
}