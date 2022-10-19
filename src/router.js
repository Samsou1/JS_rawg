import "./style/main.scss"
import PageDetail from './js/pageDetail.js'
import PageList from './js/pageList.js'

// This const allows to call the right function once the route has been identified
const routes = {
  '': PageList,
  'pagelist': PageList,
  'pagedetail': PageDetail,
};

// This function allows to call the right route depending on the hash (window.location)
const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];
  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};
// This is the event listener that call the new route when the hash changes
window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());

// What follows is just the event listener when somebody makes a new query
const form = document.getElementById('form')
const search = document.getElementById('search')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  location.hash = `#pagelist/${search.value}`;
})
