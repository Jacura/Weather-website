const path = require('path');
const express = require('express');
const http = require('http');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { response } = require('express');
//path
//console.log(__dirname);
//console.log(path.join(__dirname,'../public'));



const app = express(); 

//Define paths for Express Config 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');



//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//creating dynamic page



app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'ankit babes'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Express',
        name: 'ankit babes'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: "ankit rawal"
    });
})



// passing an object
//**we can also pass an ab-server rray of objects */     --->>>


app.get('/help', (req, res) => {
    res.send({
        name: 'Ankit',
        hobby: 'singing',
        wants: 'a beautiful life'
    });
})



//challenge
//1. set up an about route and render a page title
//2. setup  an weather route and render a page title
//3. test ur work->>



app.get('/about', (req, res) => {
    res.send('<h1>Finally u are on about page</h1>');
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide a proper address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error});
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
    //res.send([
    //    {
      //      loation: 'Rohtak',
      //      forecast: 'weather in ur place is great',
     //       address:   req.query.address
  //      }
  //  ])
})




app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }


    console.log(req.query.rating);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mr. Ankit Rawal',
        errorMessage: 'Help article not found!'
    })
})
//app.get('*', (req, res) => {
//   res.send('<h1>My 404 page</h1>');
//})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mr. Ankit Rawal',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})