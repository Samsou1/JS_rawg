import './style.css'
import './src/index'

const form = document.getElementById('form')
const search = document.getElementById('search')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  location.hash = `#pagelist/${search.value}`;
})
