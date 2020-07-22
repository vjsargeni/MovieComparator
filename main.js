const puppeteer = require('puppeteer');
const axios = require('axios');
const ex = require('./exports.js');

let movies =[];

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const url = ex.urls.bottom;
    let numOfMovies = 100;
  
    // Instructs the blank page to navigate a URL
    await page.goto(ex.urls.top);
    
    //wait for first selector to load
    await page.waitForSelector(ex.selectors.titleSelector);

    if (url === ex.urls.top){
      numOfMovies = 250
    }
    else if (url === ex.urls.popular)

    for(var i = 1; i <= numOfMovies; i++){
      
      let name = await page.$(ex.selectors.titleSelector.replace('tr:nth-child(1)', 'tr:nth-child('+ i +')'));
      let score = await page.$(ex.selectors.ratingSelector.replace('tr:nth-child(1)', 'tr:nth-child('+ i +')'));
      let released = await page.$(ex.selectors.yearSelector.replace('tr:nth-child(1)', 'tr:nth-child('+ i +')'));

      let title = await page.evaluate(el => el.textContent, name);
      let rating = await page.evaluate(el => el.textContent, score);
      let year = await page.evaluate(el => el.textContent, released);


      movies.push({
        title: title,
        rating: parseFloat(rating),
        year: parseInt(year.replace('(','').replace(')',''))
      });
    }
    movies.sort((x,y) => x.rating - y.rating);

    movies.forEach(function(el){
      if (el.year >= 2000){
        console.log(el);
      }
    });
    

    //await getOMDB(title);
  
    await browser.close();
  })();


  async function getOMDB(title){
    axios.get('http://www.omdbapi.com/?t='+ title + '&apikey=d5ed3baa')
  .then(response => {

    movies.push({
    movieTitle: response.data.Runtime,
    rating: response.data.imdbRating,
    runTime: response.data.Runtime
    });
    
  })
  .catch(error => {
    console.log(error);
  });
  }