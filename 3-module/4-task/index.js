const showSalary = (users, age) => users
  .filter(item => item.age <= age)
  .map(({name, balance}) => `${name}, ${balance}`)
  .join('\n');