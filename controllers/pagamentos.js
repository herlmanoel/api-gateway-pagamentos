const { body, validationResult } = require('express-validator');

function criarConexao(app) {

    const connection = app.persistencia.connectionFactory;
    return new app.persistencia.PagamentoDAO(connection);
}

module.exports = function (app) {

    app.get('/pagamentos', (req, res) => {
        console.log('recebida a requisição');
        res.send('recebida a requisição');
    });

    app.put('/pagamentos/pagamento/:id', (req, res) => {
        
        const pagamento = {};
        const id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';
        
        pagamentoDAO = criarConexao(app);
        pagamentoDAO.atualiza(pagamento, (erro) => {
            if(erro) {
                return res.status(500).send(erro);
            }
            res.send(pagamento);
        });


    })

    // receberá um novo pagamento
    app.post('/pagamentos/pagamento', [ 
            body('forma_de_pagamento').notEmpty(),
            body('valor').isFloat()            
        ], (req, res) => {
        
        const err = validationResult(req);
        if (!err.isEmpty()) {

            console.log('Erros de validação encontrados!');
            return res.status(400).send('ERRO!');
        }

        const pagamento = req.body;
        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        
        pagamentoDAO = criarConexao(app);
        pagamentoDAO.salva(pagamento, (err, result) => {
            if (err) return res.status(500).send('ERRO AO ADICIONAR.');
            
            // essa localização pode ser usada para consulta, um novo recurso
            res.location('/pagamentos/pagamento/' +
                result.insertId);
            // result.insertId pega o id que foi criado

            res.status(201).json(pagamento);
          }
            
            
        )
    });
    
}
