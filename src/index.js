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

// Retrieve the JSON object of a random motorbike
app.get('/getRandomMotorbike', (req, res) => {    
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        res.json(jsonObj[Math.floor(Math.random() * jsonObj.length)]);
    });
});

// TODO Suma ELO. 
app.get('/like', (req, res) => {    
    // Llega por parametro identificador moto actual
    
    // Comprueba si existe
        // Suma elo + 1
        // Comprueba ronda en la que esta, longitud parametro ids
        // Si la ronda es multiple de 10, 
            // llamar a funcion de calculo de parametros (compute_results)
            // Llamar funcion de calculo de dominio
            // llamar a la funcion de calculo de conjunto con dominio
            // ordernar el conjunto por porcentaje de beneficio
            // Guardar el conjunto del 50% mejor en una variable local
            // Devolver 1 entre el 50% mejor
        // Si no esta en la ronda 
            // Comprovar el conjunto en la variable local, si esta vacio
                // Devolver una moto aleatoria
            // Si no esta vacio 
                // Si es multiple de 4
                    // Devolver una moto aleatoria
                // Si no
                    // Devolver una moto del conjunto local

    // Si no existe
        // Devolver mensaje de error ("This motorcycle does not exist!")

});
 
// Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
	
// Routes
app.use(require('./routes/index'));