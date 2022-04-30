const { Router } = require('express');
const router = Router();
 
//Raiz
router.get('/hola', (req, res) => {    
    res.json(
        {
            "Title": "Hola mundo usando rutas!"
        }
    );
})
 
module.exports = router;