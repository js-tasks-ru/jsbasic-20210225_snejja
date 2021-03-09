function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    if (Number(salaries[key]) && salaries[key] !== NaN && salaries[key] !== Infinity && salaries[key] !== -Infinity) {
      sum += salaries[key];
    }    
  }   
  return sum;
}