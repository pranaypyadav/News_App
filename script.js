// https://newsapi.org/v2/everything?q=tesla&from=2023-07-23&sortBy=publishedAt&apiKey=de25c8837dde4f0e94e31b78a4a1f115


window.addEventListener('load', function(){
    getData('accident');
})

const apiKey="de25c8837dde4f0e94e31b78a4a1f115";
const URL="https://newsapi.org/v2/everything?q=";

async function getData(xyz){
    const response= await fetch(`${URL}${xyz}&apiKey=${apiKey}`);
    const data= await response.json();
    console.log(data)
    bindData(data.articles);
}


function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newscardContainer=document.getElementById('template-news-card')


    cardsContainer.innerHTML='';

    articles.forEach(article=> {
        if(!article.urlToImage) return;
        const cardClone=newscardContainer.content.cloneNode(true);

        fillDataInCard(cardClone,article);

        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');


    newsImg.src =article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    

    const istTimeString = new Date("2023-08-05T01:32:18Z").toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    newsSource.innerHTML=`${article.source.name} ${istTimeString}`;

    cardClone.firstElementChild.addEventListener('click',function(){
        window.open(article.url, "_blank");
    })
}

function onNavItemClick(id){
    getData(id);
}

const searchButton=document.querySelector('#search-button');
const searchInput=document.querySelector('#search-text');
const imgClick=document.querySelector('#img-logo');


searchButton.addEventListener("click",function (e) {
    e.preventDefault();
    const query = searchInput.value;
    if (!query) return;
    getData(query);
})

