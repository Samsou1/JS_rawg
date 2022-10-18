const PageList = (argument = '', items = 9) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <img src=${article.background_image}>
          <a href="#pagedetail/${article.id}"><h1>${article.name}</h1></a>
          <p>${article.platforms.reduce(function(acc, element){
            return acc + ' ' + element.platform.name
          },'')}
          </p>
         </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`, cleanedArgument);
  };
  
  const render = () => {
    pageContent.innerHTML = `
    <select>
        <option selected="">Please Select</option>
        <option>PC</option>
        <option>PlayStation 4</option>
        <option>PlayStation 5</option>
        <option>Xbox Series S/X</option>
        <option>Xbox One</option>
        <option>Switch</option>
        <option>Wii</option>
        <option>Nintendo 3DS</option>
    </select>
    <section class="page-list">
        <div class="articles">Loading...</div>
    </section>
    <button data-results='${items}'>Show more</button>
    `;
    preparePage();
  };
  
  render();
  const button = document.querySelector('main > button');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
    const pageArgument = pathParts[1] || '';
    if(button.dataset.results == '9'){
      button.dataset.results = '18';
      PageList(pageArgument,'18');
    }else{
      PageList(pageArgument,'27');
      document.querySelector('main > button').remove();
    }
  })
};
export default PageList;

