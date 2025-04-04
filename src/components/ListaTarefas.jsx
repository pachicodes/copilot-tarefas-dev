import React from 'react';
import './ListaTarefas.css';

function ListaTarefas({ tarefas, onToggleStatus, onExcluir, onEditar }) {
  return (
    <div className="lista-tarefas">
      {tarefas.length === 0 ? (
        <p className="sem-tarefas">Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}>
              <div className="tarefa-cabecalho">
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => onToggleStatus(tarefa.id)}
                />
                <h3>{tarefa.titulo}</h3>
                <div className="tarefa-acoes">
                  <button 
                    className="btn-editar" 
                    onClick={() => onEditar(tarefa)}
                    title="Editar tarefa"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-excluir" 
                    onClick={() => onExcluir(tarefa.id)}
                    title="Excluir tarefa"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="tarefa-detalhes">
                {tarefa.descricao && <p>{tarefa.descricao}</p>}
                <div className="tarefa-meta">
                  <span className={`prioridade ${tarefa.prioridade}`}>
                    {tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}
                  </span>
                  {tarefa.prazo && (
                    <span className="prazo">
                      Prazo: {new Date(tarefa.prazo).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaTarefas;
