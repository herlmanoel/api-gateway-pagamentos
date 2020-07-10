const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');


module.exports = function(){
    const app = express();
    
    // midwlares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    // gerencia os diretorios
    consign()
        .include('controllers')
        .then('persistencia')
        .into(app);
    
    return app;
}
