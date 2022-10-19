const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, background_image, description, released, developers, tags, genres, publishers, platforms, website, metacritic_url, rating, ratings_count, screenshots, stores } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("div > img").src = background_image;
      developers.map(function(element){
        articleDOM.querySelector("p.developers span").innerHTML += `<a href='#pagelist/developers++${element.name}'>${element.name}</a>` + ' ';
      })
      tags.map(function(element){
        articleDOM.querySelector("p.tags span").innerHTML += `<a href='#pagelist/tags++${element.name}'>${element.name}</a>` + ' ';
      })
      genres.map(function(element){
        articleDOM.querySelector("p.genres span").innerHTML += `<a href='#pagelist/genres++${element.name}'>${element.name}</a>` + ' ';
      })
      publishers.map(function(element){
        articleDOM.querySelector("p.publishers span").innerHTML += `<a href='#pagelist/publishers++${element.name}'>${element.name}</a>` + ' ';
      })
      platforms.map(function(element){
        articleDOM.querySelector("p.platforms span").innerHTML += `<a href='#pagelist/platforms++${element.platform.name}'>${element.platform.name}</a>` + ' ';
      })

      articleDOM.querySelector("a#website").setAttribute("href",website);
      articleDOM.querySelector("p.video span").innerHTML = `<video controls>
        <source src="${metacritic_url}" type="video/mp4">
        Your browser does not support the video tag.
        </video>`;
        articleDOM.querySelector(".rating").innerHTML = rating.toString() + '/5';
        articleDOM.querySelector(".ratingcount").innerHTML = ratings_count.toString() + ' ' + 'votes';
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description span").innerHTML = description;
      stores.map(function(element){
        articleDOM.querySelector(".stores").innerHTML += `<span><a href='http://${element.store.domain}' target="_blank">${element.store.name}</p></span>`;
      })
      articleDOM.querySelector("p.release-date span").innerHTML = released;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${import.meta.env.VITE_API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <img>
          <div class='game-header'>
            <h1 class="title"></h1>
            <p><span class="rating"></span> - <span class="ratingcount"></span></p>
          </div>
          <div class="subtitle">
          <h3>Plot:</h3>
          <p class="description"><span></span></p>
          </div>
          <div class='game-informations'>
            <p class="release-date">Release date: <span class="date-release"></span></p>
            <p class='developers'>Developers: <span></span></p>
            <p class='platforms'>Platforms: <span></span></p>
            <p class='publishers'>Publishers: <span></span></p>
            <p class='tags'>Tags: <span></span></p>
            <p class='genres'>Genres: <span></span></p>
          </div>
          <div class="stores">Stores: </div>
          <a id="website" href="" target="_blank">Game website<span></span></a>
          <p class='video'><span></span></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;