module.exports = function (app) {

    app.get('/pagamentos', (req, res) => {
        console.log('recebida a requisição');
        res.send('recebida a requisição');
    });

    
}
