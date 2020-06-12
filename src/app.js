const path = require('path');
const express = require('express');
const hbs=require('hbs');
const geocode=require('../utilities/geocode');
const weather=require('../utilities/weather');

const app = express();
const address = process.argv[2];

//setup heroku port with local backup
const port = process.env.PORT || 3000;

//Define paths for express configuration
const publicDirectory=path.join(__dirname, '../');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.engine('hbs', require('hbs').__express);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather Forecast',
        name: 'Jon Dreisbach'
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Jon Dreisbach'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'You need help?',
        name: 'Jon Dreisbach'
    });
});
// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>');

// });

// app.get('/help', (req,res)=>{
//     res.send([{
//         name:'jon',
//         age: 31
//     },
//         {name: 'Vicki',
//         age:21
//     },
//     {  name: 'Dave',
//         age: 92
//     }]);
// });

// app.get('/about', (req, res)=>{
//     res.send('<h1> About Us</h1>');
// });

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must Provide an Address'
        });
    }
       geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
           if (error){
               return res.send({error});
           }
        
        weather(latitude, longitude, (error, weatherData)=>{
            if(error){
                return res.send({error});
            }
            
            res.send({
                location,
                address: req.query.address,
                Forecast: weatherData
                
            });
        });
    });
});
       



app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: "404 Error Help Article Not Found",
        name: "Jon Dreisbach"
    });
});

app.get('*',(req, res)=>{
    res.render('404',{
        message: "404 Error Page Not Found",
        name: "Jon Dreisbach"
    });
});

app.listen(port, ()=>{
    console.log('server is connected on port ' + port);
});