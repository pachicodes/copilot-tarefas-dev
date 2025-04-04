import React, { useState, useEffect } from 'react';
import './EditarTarefa.css';

function EditarTarefa({ tarefa, onSalvar, onCancelar }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('normal');
  const [prazo, setPrazo] = useState('');

  // Carrega os dados da tarefa quando o componente é montado
  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo || '');
      setDescricao(tarefa.descricao || '');
      setPrioridade(tarefa.prioridade || 'normal');
      setPrazo(tarefa.prazo || '');
    }
  }, [tarefa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tarefaAtualizada = {
      ...tarefa,
      titulo,
      descricao,
      prioridade,
      prazo
    };
    onSalvar(tarefaAtualizada);
  };

  return (
    <div className="editar-tarefa">
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="prioridade">Prioridade</label>
          <select
            id="prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="baixa">Baixa</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prazo">Prazo</label>
          <input
            type="date"
            id="prazo"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-salvar">Salvar</button>
          <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditarTarefa;
