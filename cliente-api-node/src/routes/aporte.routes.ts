router.post("/aportes", async (req, res) => {
    const { colaboradorId, valor, data } = req.body;
    const novoSaldo = await aporteService.registrarAporte(colaboradorId, valor, data);
    res.status(201).json({ success: true, saldoAtual: novoSaldo });
});