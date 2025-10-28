const express = require('express');
const router = express.Router();
const tarefaController = require('../cliente-api-node/src/controllers/tarefaController')

router.get('/tarefas', tarefaController.listarTarefas);
router.post('/tarefas', tarefaController.criarTarefas);
router.put('/tarefas/:id', tarefaController.atualizarTarefa);
router.delete('/tarefas/:id', tarefaController.excluirTarefa);
module.exports = router;