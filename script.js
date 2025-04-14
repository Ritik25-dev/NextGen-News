const api = "52ee31fb251395c29b8d163d39c07094";
const url =`https://gnews.io/api/v4/top-headlines?lang=en&country=in&topic=technology&max=30&token=${api}`;

document.getElementById("loadingSpinner").style.display = "block";
fetch(url)
  .then(response => response.json())
  .then(data => {
    let allArticles = data.articles;
    allArticles.forEach(article => {
        let title = article.title;
        let description = article.description;
        let img = article.image;
        let link = article.url;
        let date = article.publishedAt.split("T")[0];
        createNews(title,description,img,link,date);
        document.getElementById("loadingSpinner").style.display = "none";
     });
  });



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