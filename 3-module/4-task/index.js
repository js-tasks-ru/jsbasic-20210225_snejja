const showSalary = (users, age) => users
  .filter(item => item.age <= age)
  .map((item) => `${item.name}, ${item.balance}`)
  .join('\n');