const express = require('express');
const app = express();
const morgan = require('morgan');
 
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

// TODO Get a random (modern or actual) bike and normal price
app.get('/getFirstImage', (req, res) => {    
    
});

// TODO Suma ELO. 
app.get('/like', (req, res) => {    
    
});
 
// Iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});
	
// Routes
app.use(require('./routes/index'));