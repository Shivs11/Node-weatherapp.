const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast'); 

const help = (path.join(__dirname, '../public'));
const publicdirectory = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../Templates/views');
const partials = path.join(__dirname, '../Templates/partials')

const app = express();
const port = process.env.PORT || 3000


// Setting up handlebars engine and views location.
app.set('view engine','hbs');
app.set('views', viewspath);
hbs.registerPartials(partials);


// Setup static directory to serve.
app.use(express.static(publicdirectory));

app.get('', (req,res) =>{
    res.render('index', {
        title: "Weather",
        name: 'Shivam',
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send({
            error: "You have to provide an address!"
        })
    }
    else{
        console.log(req.query.address);
        geocode(req.query.address, (error, object) => {
            forecast(object.latitude, object.longitude, (errorfinal, finalobj) => {
                if(errorfinal){
                    res.send({
                        error: errorfinal,
                    })
                }
                else{
                    res.send({
                        place: finalobj.place,
                        temperature: finalobj.temperature,
                        description: finalobj.description,
                        
                    })
                }
            })
            
        })
    }
})

app.get('/products', (req,res)=>{
    res.send({
        products: [],
    })
        
})

app.get('/about', (req,res) => {
    res.render('about');

})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        heading: 'We will provide you with assistance.',
        
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Shivam Saraf',
        error: 'Help page not found.'
    });
})

// * means match anything we havent routed above for.
app.get('*', (req,res) => {
    res.render('404',{
        title: "Page Not Found.",
        error: "Error 404!"
    })
})
//Starting the server.

app.listen(port, () => {
    console.log("The server is up!");
});
