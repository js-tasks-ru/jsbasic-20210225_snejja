function highlight(table) {
  let dataPersons = table.querySelector('tbody');

  for (let i = 0; i < dataPersons.rows.length; i++) {
    const cellAge = dataPersons.rows[i].cells[1];
    const cellGender = cellAge.nextElementSibling;
    const cellStatus = cellGender.nextElementSibling;    

    if (cellStatus.hasAttribute('data-available')) {        
      dataPersons.rows[i].classList.add(cellStatus.dataset.available === 'true' ? 'available' : 'unavailable');
    } else {
      dataPersons.rows[i].setAttribute("hidden", "true");
    }

    dataPersons.rows[i].classList.add(cellGender.textContent === "m" ? "male" : "female");
    dataPersons.rows[i].style = Number(cellAge.textContent) < 18 ? "text-decoration: line-through" : "";
  } 
}
