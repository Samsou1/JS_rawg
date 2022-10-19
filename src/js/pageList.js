const platforms = {'PC' : 4,'pc' : 4, 'PlayStation 5' :187, 'playstation-5' :187,'Xbox One':1,'xbox-one':1, 'PlayStation 4': 18,'playstation-4': 18,'Xbox Series S/X':186,'xbox-series-s/x':186, 'Linux' : 6,'linux' : 6, 'Nintendo Switch':7 ,'nintendo-switch':7, 'iOS':3,'ios':3, 'Android':21, 'android':21,'Nintendo 3DS':8, 'Nintendo DS':9, 'Nintendo DSi':13, 'macOS':5, 'Xbox 360':14, 'xbox-360':14,'Xbox':80, 'xbox':80,  'PlayStation 3':16, 'playStation-3':16,'PlayStation ':15, 'playStation ':15,'PS Vita':19, 'ps-vita':19,'PSP':17,'psp':17, 'Wii U':10,'wii-u':10, 'Wii':11,'wii':11, 'GameCube':105, 'Nintendo 64':83, 'Game Boy Advance':24, 'Game Boy Color':43, 'Game Boy':26}
const PageList = (argument = '', items = 9, platform = '',argumentType ='') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, "-").replace(/%20/g, "-").toLowerCase();
    const displayResults = (articles) => {
      const resultsContent = articles.map((article) => (
        `<article onclick="location.href='#pagedetail/${article.id}';" class="cardGame">
          <div class='overlay-image'>
            <img src=${article.background_image} class="image">
            <div class="hover">
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
        </div>
        <div class="title-list">
          <h2>${article.name}</h2>
        </div>
        <div class="icons">${article.parent_platforms.reduce(function(acc, element){
          let newImg = ''
          switch (element.platform.name.toLowerCase()) {
            case "playstation":
              newImg = "<img src='/public/logos/ps4.svg' alt='playstation'  height='20' width='20'/>";
              break;
            case "pc":
              newImg = "<img src='/public/logos/windows.svg' alt='windows'  height='20' width='20'/>";
              break;
            case "xbox":
              newImg = "<img src='/public/logos/xbox.svg' alt='xbox'  height='20' width='20'/>";
              break;
            case "nintendo":
              newImg = "<img src='/public/logos/switch.svg' alt='switch'  height='20' width='20'/>";
              break;
            case "linux":
              newImg = "<img src='/public/logos/linux.svg' alt='linux'  height='20' width='20'/>";
              break;
            case "mobile":
              newImg = "<img src='/public/logos/mobile.svg' alt='mobile'  height='20' width='20'/>";
              break;
            case "switch":
              newImg = "<img src='/style/images/switch.svg' alt='switch'  height='20' width='20'/>";
              break;
          }
          return acc + newImg;
        },'')}
        </div>
      </article>`
      ));
      const resultsContainer = document.querySelector('.page-list .articles');
      resultsContainer.innerHTML = resultsContent.join("\n");
    };
    const fetchList = (url, argument) => {
      let finalURL;
      console.log(cleanedArgument)
      console.log(argumentType)
      switch(argumentType){
        case 'developers':
          finalURL= argument ? `${url}&developers=${cleanedArgument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
          break;
        case 'publishers':
          finalURL= argument ? `${url}&publishers=${cleanedArgument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
          break;
        case 'genres':
          finalURL= argument ? `${url}&genres=${cleanedArgument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
          break;
        case 'platforms':
            finalURL= argument ? `${url}&platforms=${platforms[argument]}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
            break;
        case 'tags':
          finalURL= argument ? `${url}&tags=${cleanedArgument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
          break;
        default:
          finalURL= argument ? `${url}&search=${cleanedArgument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
          break;
      }
      finalURL += platform ? `&platforms=${platform}` : '';
      console.log(finalURL)
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
    <section class="page-list">
    <select class="sort">
        <option selected="">Please Select</option>
        <option>PC</option>
        <option>PlayStation 4</option>
        <option>PlayStation 5</option>
        <option>Xbox Series S/X</option>
        <option>Xbox One</option>
        <option>Nintendo Switch</option>
        <option>Linux</option>
    </select>
    <div class="articles">Loading...</div>
    </section>
    <button id="showmore"data-results='${items}'>Show more</button>
    
    `;
    preparePage();
    const select = document.querySelector('select');
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
    const pageArgument = pathParts[1] || '';
    select.addEventListener('change', () => {
      if(pageArgument.split('++').length > 1) {
        PageList(pageArgument.split('++')[1], '9', platforms[`${select.value}`], pageArgument.split('++')[0]);
      }else{
        PageList(pageArgument, '9', platforms[`${select.value}`]);
      }
    })
  };

  render();
  const button = document.querySelector("button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const select = document.querySelector('select');
    const { hash } = window.location;
    const pathParts = hash.substring(1).split("/");
    const pageArgument = pathParts[1] || "";
    if (button.dataset.results == "9") {
      button.dataset.results = "18";
      if(pageArgument.split('++').length > 1) {
        PageList(pageArgument.split('++')[1], '18', platforms[`${select.value}`], pageArgument.split('++')[0]);
      }else{
        PageList(pageArgument, '18', platforms[`${select.value}`]);
      }
    } else {
      if(pageArgument.split('++').length > 1) {
        PageList(pageArgument.split('++')[1], '27', platforms[`${select.value}`], pageArgument.split('++')[0]);
      }else{
        PageList(pageArgument, '27', platforms[`${select.value}`]);
      }
      document.querySelector("button").remove();
    }
  });
};

export default PageList;
