const porta = 3333;
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());//Usando Json
app.use(routes);//Usando o arquivo de rotas.


app.listen(porta, () => {
    console.log(`Executando... env:${process.env.NODE_ENV}`);
});