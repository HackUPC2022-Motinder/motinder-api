const express = require('express');
const app = express();
const morgan = require('morgan');
const csvFilePath = 'data/appraisal.csv';
const csv = require('csvtojson');
 
// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
 
// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 
// Nuestro primer WS Get
app.get('/', (req, res) => {    
    res.json(
        {
            "Title": "Hola mundo"
        }
    );
});

// Retrieve a JSON object with all motorbikes
app.get('/getAllMotorbikes', (req, res) => {    
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        res.json(jsonObj);
    });
});

// TODO Get a random (modern or actual) bike and normal price

// TODO Suma ELO. 
app.get('/like', (req, res) => {    
    
});
 
// Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
	
// Routes
app.use(require('./routes/index'));