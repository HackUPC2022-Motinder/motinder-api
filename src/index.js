const express = require('express');
const app = express();
const morgan = require('morgan');
const csvFilePath = 'data/appraisal.csv';
const csv = require('csvtojson');
const elo = new Map();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)
 
// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

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

// Retrieve the JSON object of a random motorbike
app.get('/getRandomMotorbike', (req, res) => {    
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        res.json(jsonObj[Math.floor(Math.random() * jsonObj.length)]);
    });
});

// Adds up ELO to a given motorbike
app.get('/addELO', (req, res) => {    
    // Llega por parametro identificador moto actual
    var id = req.query.id;
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        var filtered = jsonObj.filter(a => a.id == id);
        if (filtered.length < 1) {
            console.log("ERROR: This motorcycle does not exist!");
            throw exception;
        }
        if (filtered.length > 1) {
            console.log("ERROR: There's more than one bike with this id!");
            throw exception;
        }
        if (isNaN(elo.get(filtered[0].id)))
            elo.set(filtered[0].id, 1);
        else
            elo.set(filtered[0].id, elo.get(filtered[0].id) + 1);
        console.log(elo);
    });
});
 
// Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
	
// Routes
app.use(require('./routes/index'));