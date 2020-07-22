module.exports = {
    //containing all the input data for main.js
    selectors : {
    //collection of selectors 
    //imdb
    titleSelector: '#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(1) > td.titleColumn > a',
    ratingSelector: '#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(1) > td.ratingColumn.imdbRating > strong',
    yearSelector: '#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(1) > td.titleColumn > span'
    },

    urls: {
        //imdb
        top: 'https://www.imdb.com/chart/top',
        bottom: 'https://www.imdb.com/chart/bottom',
        popular: 'https://www.imdb.com/chart/moviemeter'
    }
}