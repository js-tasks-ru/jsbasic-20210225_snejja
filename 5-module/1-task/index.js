function hideSelf() {
  const button = document.body.querySelector('.hide-self-button');
  
  button.addEventListener('click', () => button.hidden = true);
}
