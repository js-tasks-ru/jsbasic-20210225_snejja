function renderTable({bodyTable}) {
  let table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    ${bodyTable.join('')}
    </tbody>
  `;
  return table;
}

function bodyTable({data = []}) {
  return data.map(el => `
    <tr>
      <td>${el.name}</td>
      <td>${el.age}</td>
      <td>${el.salary}</td>
      <td>${el.city}</td>
      <td><button data-action="remove">X</button></td>
    </tr>
  `);   
}

export default class UserTable {
  constructor(rows) { 
    this._rows = rows;  
    this.elem = renderTable({
      bodyTable: bodyTable({data: this._rows})
    });

    this._buttons.forEach(el => el.addEventListener('click', this._onButtonClick));
  }

  get _buttons() {
    return this.elem.querySelectorAll('[data-action="remove"]');
  }

  _onButtonClick(event) {
    const pane = event.target.closest('tr');
    if (!pane) {
      return;
    }
    
    pane.remove();
  }
}
