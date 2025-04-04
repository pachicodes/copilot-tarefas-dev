class TarefasManager {
  constructor() {
    // ...existing code...
  }

  obterTarefas() {
    // ...existing code...
  }

  adicionarTarefa(tarefa) {
    // ...existing code...
  }

  // Adicionar método para atualizar tarefa existente
  atualizarTarefa(tarefaAtualizada) {
    const tarefas = this.obterTarefas();
    const index = tarefas.findIndex(t => t.id === tarefaAtualizada.id);
    
    if (index !== -1) {
      tarefas[index] = tarefaAtualizada;
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      return true;
    }
    return false;
  }

  alternarStatusTarefa(id) {
    // ...existing code...
  }

  excluirTarefa(id) {
    // ...existing code...
  }
}

export default new TarefasManager();
