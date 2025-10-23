// Importando o módulo express para lidar com rotas e middlewares
const express = require('express');

// Inicializando a aplicação Express
const app = express();

const tarefaRoutes = require('./routes/tarefaRoutes');

// Definindo a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

app.use('/api', tarefaRoutes);

// Inicializando o servidor e fazendo com que ele escute na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
