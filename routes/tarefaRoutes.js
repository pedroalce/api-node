const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController')

router.get('/tarefas', tarefaController.listarTarefas);
router.post('/tarefas', tarefaController.criarTarefas);
router.put('/tarefas/:id', tarefaController.atualizarTarefa);
router.delete('/tarefas/:id', tarefaController.excluirTarefa);
module.exports = router;