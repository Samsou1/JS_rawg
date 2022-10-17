const PageDetail = (argument) => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");

    const displayGame = (gameData) => {
      const { name, background_image, description, released, developers, tags, genres, publishers, platforms, website, metacritic_url, rating, ratings_count, screenshots, stores } = gameData;
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("div > img").src = background_image;
      developers.map(function(element){
        articleDOM.querySelector("p.developers span").innerHTML += `<a href='pageList/${element.name}'>${element.name}</a>` + ' ';
      })
      tags.map(function(element){
        articleDOM.querySelector("p.tags span").innerHTML += `<a href='pageList/${element.name}'>${element.name}</a>` + ' ';
      })
      genres.map(function(element){
        articleDOM.querySelector("p.genres span").innerHTML += `<a href='pageList/${element.name}'>${element.name}</a>` + ' ';
      })
      publishers.map(function(element){
        articleDOM.querySelector("p.publishers span").innerHTML += `<a href='pageList/${element.name}'>${element.name}</a>` + ' ';
      })
      platforms.map(function(element){
        articleDOM.querySelector("p.platforms span").innerHTML += `<a href='pageList/${element.platform.name}'>${element.platform.name}</a>` + ' ';
      })

      articleDOM.querySelector("p.website span").innerHTML = website;
      articleDOM.querySelector("p.video span").innerHTML = `<video width="640" height="480" controls>
        <source src="${metacritic_url}" type="video/mp4">
        Your browser does not support the video tag.
        </video>`;
      articleDOM.querySelector("p.rating span").innerHTML = rating;
      articleDOM.querySelector("p.ratingCount span").innerHTML = ratings_count;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description span").innerHTML = description;
      // screenshots.map(function(element){
      //   articleDOM.querySelectorAll("div.screenshots").innerHTML += `<img src=${element}>`;
      // })
      stores.map(function(element){
        articleDOM.querySelectorAll("div.stores span").innerHTML += element+ ' ';
      })
      articleDOM.querySelector("p.release-date span").innerHTML = released;
    };

    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=${import.meta.env.VITE_API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData)
          displayGame(responseData);
        });
    };

    fetchGame('https://api.rawg.io/api/games', cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <h1 class="title"></h1>
          <img>
          <p class='developers'>Developers: <span></span></p>
          <p class='tags'>Tags: <span></span></p>
          <p class='genres'>Genres: <span></span></p>
          <p class='publishers'>Publishers: <span></span></p>
          <p class='platforms'>Platforms: <span></span></p>
          <p class='website'>Website: <span></span></p>
          <p class='video'><span></span></p>
          <p class='rating'>Rating: <span></span></p>
          <p class='ratingCount'>Rating count: <span></span></p>
          <p class="release-date">Release date: <span></span></p>
          <p class="description"><span></span></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;