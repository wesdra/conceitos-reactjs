
import React, { useState, useEffect } from 'react'
import api from './services/api';

import "./styles.css";

function App() {
  const  [ projects, setProject ] = useState([]);

  /**
   * Listar os repositórios da sua API: Deve ser capaz de criar uma lista 
   * com o campo title de todos os repositórios que estão cadastrados na sua API.
   */
  useEffect(() => {
    api.get('/repositories').then(response =>{
        setProject(response.data);
    })
  }, [])

  /**
   * Adicionar um repositório a sua API: Deve ser capaz de adicionar um novo item na
   * sua API através de um botão com o texto Adicionar e, após a criação, deve ser 
   * capaz de exibir o nome dele após o cadastro.
   */
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      id: Date.now(),
      url: "https://github.com/josepholiveira",
      title: `Novo registro ${ Date.now() }`,
      techs: ["React Native", "NodeJs"],
    });
    const project = response.data;
    setProject([...projects, project]);
  }
/**
 * Remover um repositório da sua API: Para cada item da sua lista, deve possuir um botão 
 * com o texto Remover que, ao clicar, irá chamar uma função para remover esse item da 
 * lista do seu frontend e da sua API.
 * @param {*} id 
 */
  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setProject(projects.filter(project => project.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }


  return (
    <div>
      <ul  data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>{project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
