const Home = () => {
  const preparePage = () => {

    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <h1>${article.name}</h1>
          <h2>${article.released}</h2>
          <a href="#pagedetail/${article.id}">${article.id}</a>
        </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, numberOfResults = 9) => {
      const finalURL = numberOfResults ? `${url}&page_size=${numberOfResults}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results)
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}&dates=2022-10-30,2023-12-31`);
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

export default Home;