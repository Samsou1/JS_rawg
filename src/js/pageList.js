const platforms = {'PC' : 4, 'PlayStation 5' :187, 'Xbox One':1, 'PlayStation 4': 18,'Xbox Series S/X':186, 'Linux' : 6, 'Nintendo Switch':7 , 'iOS':3, 'Android':21, 'Nintendo 3DS':8, 'Nintendo DS':9, 'Nintendo DSi':13, 'macOS':5, 'Xbox 360':14, 'Xbox':80, 'PlayStation 3':16, 'PlayStation ':15, 'PS Vita':19, 'PSP':17, 'Wii U':10, 'Wii':11, 'GameCube':105, 'Nintendo 64':83, 'Game Boy Advance':24, 'Game Boy Color':43, 'Game Boy':26}
const PageList = (argument = '', items = 9, platform = '') => {
  const preparePage = () => {
    const cleanedArgument = argument.trim().replace(/\s+/g, '-');
    const displayResults = (articles) => {
      console.log(articles)
      const resultsContent = articles.map((article) => (
        `<article class="cardGame">
          <img src=${article.background_image} class="image">
          <div class="title-list">
          <a href="#pagedetail/${article.id}"><h3>${article.name}</h3></a>
          </div>
          <div class="icons">${article.parent_platforms.reduce(function(acc, element){
            let newImg = ''
            switch (element.parent_platform.name.toLowerCase()) {
              case "playstation":
                newImg = "<img src='/public/logos/ps4.svg' alt='playstation'  height='25' width='25'/>";
                break;
              case "pc":
                newImg = "<img src='/public/logos/windows.svg' alt='windows'  height='25' width='25'/>";
                break;
              case "xbox":
                newImg = "<img src='/public/logos/xbox.svg' alt='xbox'  height='25' width='25'/>";
                break;
              case "nintendo":
                newImg = "<img src='/public/logos/switch.svg' alt='switch'  height='25' width='25'/>";
                break;
              case "linux":
                newImg = "<img src='/public/logos/linux.svg' alt='linux'  height='25' width='25'/>";
                break;
              case "mobile":
                newImg = "<img src='/public/logos/mobile.svg' alt='mobile'  height='25' width='25'/>";
                break;
              case "switch":
                newImg = "<img src='/style/images/switch.svg' alt='switch'  height='25' width='25'/>";
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
      let finalURL = argument ? `${url}&search=${argument}&page_size=${items}` : `${url}&dates=2022-10-30,2023-12-31&page_size=${items}`;
      finalURL += platform ? `&platforms=${platform}` : '';
      console.log(finalURL)
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
  const button = document.querySelector('button');
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
      document.querySelector('button').remove();
    }
  })
};


export default PageList;

