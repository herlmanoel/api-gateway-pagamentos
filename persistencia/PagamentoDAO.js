class PagamentoDao {

    constructor(connection) {
        this._connection = connection;
    }

    salva = function (pagamento, callback) {
        this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
    }

    buscaPorId = function (id, callback) {
        this._connection.query("select * from pagamentos where id = ?", [id], callback);
    }

}

module.exports = function () {
    return PagamentoDao;
};