const PageList = (argument = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <a href="#pagedetail/${article.id}"><h1>${article.name}</h1></a>
          <h2>${article.released}</h2>
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument, numberOfResults = 9) => {
      const finalURL = argument ? `${url}&search=${argument}&page_size=${numberOfResults}` : url;
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
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
      <button>Show more</button>
    `;

    preparePage();
  };

  render();
};
export default PageList;