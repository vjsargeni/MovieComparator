const puppeteer = require('puppeteer');
const axios = require('axios');

var movies =[];

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
  
    // Instructs the blank page to navigate a URL
    await page.goto('https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm');
    
    //wait for first selector to load
    await page.waitForSelector('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(1) > td.titleColumn > a');
    for(var i = 1; i <= 250; i++){
      let element = await page.$('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child('+ i + ') > td.titleColumn > a');
      let title = await page.evaluate(el => el.textContent, element)
      movies.push(title);
    }
    
    for(el in movies){
      console.log(el);
    }
    

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