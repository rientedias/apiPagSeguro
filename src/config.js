/**
 * Arquivos de Configuração
 */

const pagseguro = require('pagseguro-nodejs');
require('dotenv/config');

const pag = new pagseguro({
    email: process.env.EMAIL,
    token: process.env.TOKEN_SANDBOX,
    mode: process.env.NODE_ENV === 'development' ? pagseguro.MODE_SANDBOX : pagseguro.MODE_PAYMENT

})

pag.currency('BRL');
pag.reference('EDER123');

module.exports = pag;