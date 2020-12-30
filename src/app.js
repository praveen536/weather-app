require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

// Define paths for express config.
const public_dir_path = path.join(__dirname,'../public/');
const viewPath = path.join(__dirname,'../public/views/');
// partial path
const partialsPath = path.join(__dirname, '../public/views/partial/');
// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views',viewPath);
// registering partial path
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(public_dir_path));

app.get('/',(req,res)=>{
    res.render('index',{title:'index'});
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'about'});
});
app.get('/help',(req,res)=>{
    res.render('help',{title:'help'});
});

app.get('/about',(req,res)=>{
    res.send([{
        name:'tihsis name',
        age:22
    },{
        name:'sf name',
        age:23
    }]);
})
// Goal : Create a template for help page
// 
// 1. Setup a help template to render a help message to the screen.
// 2. Setup the help route and render the template with an example message.
// 3. Visit the route in the browser and see your help message print.

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({error:'you must provide an address'})
    }
     
    geocode(req.query.address,(err, {latitude,longitude,location}={})=>{
        if (err) {return res.send({err});}
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {return  res.send({error})}
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            });
        });
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404',name:'ram',errorMsg:'Help article not found'});
})

app.get('*',(req,res)=>{
    res.render('404',{title:'404',name:'ram',errorMsg:'Page not found'});
})

app.listen(3000, (err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log(`server running at 3000`);
    }
})

// goal setup two new routes

// 1. Setup an about route and render a page title.
// 2. Setup a weather route and rener a page title.
// 3. Test your work by visiting both in the browser.

// app.com
// app.com/help
// app.com/about