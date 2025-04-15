const api = "38743344780855c7a36db11ef5264ed7";
const url =`https://gnews.io/api/v4/top-headlines?lang=en&country=in&topic=technology&max=10&token=${api}`;

let spinner = document.querySelector("#loadingSpinner");
spinner.style.display = "block";
let Data = JSON.parse(localStorage.getItem("data"))|| null

function storeData(){
  const lastFetch = parseInt(localStorage.getItem("lastFetch"));
  const now = Date.now(); 

  if (!lastFetch || now - lastFetch > 3600000) {
    localStorage.removeItem("data");
    localStorage.removeItem("lastFetch");
    fetch(url)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem("lastFetch", now);
        Data = data;
        getData();
      })
  } else {
    getData();
  }
}


function getData(){
  let allArticles = Data.articles;
  document.querySelector('.news-container').innerHTML = "";
  allArticles.forEach(article => {
      let title = article.title;
      let description = article.description;
      let img = article.image;
      let link = article.url;
      let date = new Date(article.publishedAt);
      let localDate = date.toLocaleDateString('en-GB'); 
      createNews(title,description,img,link,localDate);
      
   });
   spinner.style.display = "none";
}



function createNews(title,description,img,link,date){
    document.querySelector('.news-container').innerHTML += `<div class="news-card">
                <div class="text">
                    <h2>${title}</h2>
                    <h4>Published On: ${date}</h4>
                    <p>${description}</p>
                    <a href="${link}" target="_main">Read more</a>
                </div>
                    <img src="${img}" alt="Image" >
                    
                </div>`;
}

window.addEventListener("load", () => {
  storeData()
});


setInterval(storeData,3600000);



