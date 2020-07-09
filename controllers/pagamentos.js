const { body, validationResult } = require('express-validator');

module.exports = function (app) {

    app.get('/pagamentos', (req, res) => {
        console.log('recebida a requisição');
        res.send('recebida a requisição');
    });

    // receberá um novo pagamento
    app.post('/pagamentos/pagamento', [ 
            body('forma_de_pagamento').isEmail(),
            body('valor').isFloat()            
        ], (req, res) => {
        
        const e = validationResult(req);
        if (e) {
            console.log('Erros de validação encontrados!');
            return res.status(400).send('ERRO!');
        }
        const pagamento = req.body;
        console.log('processando uma requisição de um novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        const connection = app.persistencia.connectionFactory;
        
        const pagamentoDAO = new app.persistencia.PagamentoDAO(connection);
        
        pagamentoDAO.salva(pagamento, (err, result) => {
            if (err) return res.status(400).send('ERRO AO ADICIONAR.');
            
            console.log('ADICIONADO');
            res.json(pagamento);
          }
            
            
        )
    });
    
}
