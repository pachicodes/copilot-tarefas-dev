import React, { useState, useEffect } from 'react';
import AdicionarTarefa from './components/AdicionarTarefa';
import ListaTarefas from './components/ListaTarefas';
import EditarTarefa from './components/EditarTarefa';
import tarefasManager from './services/TarefasManager';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);
  
  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = () => {
    const tarefasCarregadas = tarefasManager.obterTarefas();
    setTarefas(tarefasCarregadas);
  };

  const handleAdicionarTarefa = (novaTarefa) => {
    tarefasManager.adicionarTarefa(novaTarefa);
    carregarTarefas();
  };

  const handleToggleStatus = (id) => {
    tarefasManager.alternarStatusTarefa(id);
    carregarTarefas();
  };

  const handleExcluirTarefa = (id) => {
    tarefasManager.excluirTarefa(id);
    carregarTarefas();
  };

  const handleEditarTarefa = (tarefa) => {
    setTarefaParaEditar(tarefa);
    setModoEdicao(true);
  };

  const handleSalvarEdicao = (tarefaAtualizada) => {
    tarefasManager.atualizarTarefa(tarefaAtualizada);
    setModoEdicao(false);
    setTarefaParaEditar(null);
    carregarTarefas();
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
    setTarefaParaEditar(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Gerenciador de Tarefas</h1>
      </header>
      <main>
        {modoEdicao ? (
          <EditarTarefa 
            tarefa={tarefaParaEditar} 
            onSalvar={handleSalvarEdicao} 
            onCancelar={handleCancelarEdicao} 
          />
        ) : (
          <AdicionarTarefa onAdicionarTarefa={handleAdicionarTarefa} />
        )}
        
        <ListaTarefas 
          tarefas={tarefas} 
          onToggleStatus={handleToggleStatus} 
          onExcluir={handleExcluirTarefa}
          onEditar={handleEditarTarefa}
        />
      </main>
    </div>
  );
}

export default App;
