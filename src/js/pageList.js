const PageList = (argument = '', items = 9) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");
    const displayResults = (articles) => {
      console.log(articles)
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <img src=${article.background_image} class="image">
          <a href="#pagedetail/${article.id}"><h2>${article.name}</h2></a>
          <div class="overlay">
            <div class="text">
              <p>Released: ${article.released}</p>
              <p>Genres: ${article.genres.reduce(function (acc, element) {
                return (
                  acc +
                  `<a href='pageList/${element.name}'>${element.name}</a>` +
                  " "
                );
              }, "")}</p>
              <p>Rating: ${article.rating} (${article.ratings_count} votes)</p>
            </div>
          </div>
          <p>${article.parent_platforms.reduce(function (acc, element) {
            // switch (element.platform.name) {
            //   case "playstation":
            //     <img src='/style/images/ps4.svg' alt="playstation"  height='100' width='100'/>;
            //     break;
            //   case "pc":
            //     break;
            //   case "xbox":
            //     break;
            //   case "nintendo":
            //     break;
            //   case "linux":
            //     break;
            //   case "mobile":
            //     break;
            //   case "switch":
            // }
            return acc + " " + element.platform.name;
          }, "")}
         
          </p>
         </article>
         `
      ));
      const resultsContainer = document.querySelector(".page-list .articles");
      resultsContainer.innerHTML = resultsContent.join("\n");
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };

    fetchList(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`,
      cleanedArgument
    );
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
        <option>Nintendo Switch</option>
        <option>Wii</option>
        <option>Nintendo 3DS</option>
    </select>
    <section class="page-list">
    <div class="articles">Loading...</div>
    </section>
    <button id="showmore"data-results='${items}'>Show more</button>
    
    `;
    preparePage();
    const select = document.querySelector('select');
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
    const pageArgument = pathParts[1] || '';
    select.addEventListener('change', () => PageList(pageArgument, '9', platforms[`${select.value}`]))
  };

  render();
  const button = document.querySelector("button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const { hash } = window.location;
    const pathParts = hash.substring(1).split("/");
    const pageArgument = pathParts[1] || "";
    if (button.dataset.results == "9") {
      button.dataset.results = "18";
      PageList(pageArgument, "18");
    } else {
      PageList(pageArgument, "27");
      document.querySelector("button").remove();
    }
  });
};


export default PageList;
